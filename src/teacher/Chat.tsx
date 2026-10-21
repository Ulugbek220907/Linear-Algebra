import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, ImagePlus, KeyRound, RotateCcw, Send, Settings as Cog, Square, X } from 'lucide-react';
import { saveApiKey, useSettings } from '../lib/store';
import { useTeacher, type LessonContext } from '../lib/teacherCtx';
import { ApiError, modelKnownVision, streamChat, type ApiMessage } from './api';
import { buildSystem } from './prompt';
import { Md } from './Markdown';
import { createThread, uid, updateThread, useThreads, type ChatMsg } from './threads';

const GENERIC_ASK = [
  'Explain the difference between REF and RREF with an example.',
  'How do I find the parametric vector form of a solution set?',
  'Explain column space Col(A) vs null space Nul(A) intuitively.',
  'Why does det(AB) = det(A)·det(B), and what does det mean geometrically?',
  'Quiz me on the 10 Vector Space axioms and subspaces.',
];

/** Shrink a photo so it uploads quickly and uses fewer tokens. */
async function shrinkImage(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error('That file could not be read as an image.'));
      i.src = url;
    });
    const max = 1400;
    const k = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * k);
    c.height = Math.round(img.height * k);
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function KeySetup({ compact }: { compact?: boolean }) {
  const s = useSettings();
  const [key, setKey] = useState('');
  const [remember, setRemember] = useState(s.remember);
  return (
    <form
      className="key-setup"
      onSubmit={(e) => {
        e.preventDefault();
        if (key.trim()) saveApiKey(key.trim(), remember);
      }}
    >
      <h2 className="t-md">
        <KeyRound aria-hidden="true" /> Connect your OpenRouter Key
      </h2>
      <ol>
        <li>
          Get an API key at{' '}
          <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer noopener">
            openrouter.ai/keys
          </a>.
        </li>
        <li>Paste it below. It starts with <code>sk-or-</code>.</li>
      </ol>
      <label className="field">
        <span>API key</span>
        <input
          type="password"
          autoComplete="off"
          spellCheck={false}
          placeholder="sk-or-v1-…"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </label>
      <label className="check-row">
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        <span>Remember it on this device</span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={!key.trim()}>
        Save key
      </button>
      {!compact && (
        <p className="q-hint">
          Your key stays in this browser. Queries travel directly from your browser to openrouter.ai; there is no backend proxy.
        </p>
      )}
    </form>
  );
}

interface ChatProps {
  threadId: string;
  lesson?: LessonContext | null;
  variant: 'dock' | 'page';
}

export function Chat({ threadId, lesson, variant }: ChatProps) {
  const settings = useSettings();
  const threads = useThreads();
  const thread = threads.find((t) => t.id === threadId);
  const { pending, clearPending } = useTeacher();
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imgErr, setImgErr] = useState('');
  const [live, setLive] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const stick = useRef(true);

  const messages = thread?.messages ?? [];

  useEffect(() => {
    if (pending) {
      setInput(pending);
      clearPending();
      setTimeout(() => area.current?.focus(), 60);
    }
  }, [pending, clearPending]);

  useEffect(() => {
    const el = scroller.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [messages.length, live]);

  useEffect(() => () => abort.current?.abort(), []);

  const run = useCallback(
    async (history: ChatMsg[], img: string | null) => {
      const s = settings;
      if (!s.apiKey) return;
      setBusy(true);
      setLive('');
      stick.current = true;
      const ctl = new AbortController();
      abort.current = ctl;
      const api: ApiMessage[] = [{ role: 'system', content: buildSystem(s, lesson ?? null) }];
      history.forEach((m, i) => {
        if (m.error && !m.content) return;
        const last = i === history.length - 1;
        if (m.role === 'user' && last && img) {
          api.push({
            role: 'user',
            content: [
              { type: 'text', text: m.content || 'Please look at the attached board or textbook photo.' },
              { type: 'image_url', image_url: { url: img } },
            ],
          });
        } else api.push({ role: m.role, content: m.content });
      });
      let acc = '';
      let errMsg: string | undefined;
      try {
        await streamChat({
          baseUrl: s.baseUrl,
          apiKey: s.apiKey,
          model: s.model,
          messages: api,
          signal: ctl.signal,
          onToken: (t) => {
            acc += t;
            setLive(acc);
          },
        });
      } catch (e) {
        if ((e as Error).name !== 'AbortError') errMsg = e instanceof ApiError ? e.message : (e as Error).message || 'Something went wrong.';
      }
      const reply: ChatMsg = { id: uid(), role: 'assistant', content: acc, error: errMsg, ts: Date.now() };
      if (acc || errMsg) updateThread(threadId, (t) => ({ ...t, messages: [...t.messages, reply] }));
      setLive(null);
      setBusy(false);
      abort.current = null;
    },
    [settings, lesson, threadId]
  );

  const send = useCallback(
    (text?: string) => {
      const content = (text ?? input).trim();
      if ((!content && !image) || busy || !thread) return;
      const msg: ChatMsg = { id: uid(), role: 'user', content, hadImage: !!image, image: image ?? undefined, ts: Date.now() };
      const history = [...thread.messages, msg];
      updateThread(threadId, (t) => ({
        ...t,
        title: t.messages.length === 0 ? (content || 'Photo question').slice(0, 48) : t.title,
        messages: history,
      }));
      const img = image;
      setInput('');
      setImage(null);
      void run(history, img);
    },
    [input, image, busy, thread, threadId, run]
  );

  function retry() {
    if (!thread || busy) return;
    const msgs = [...thread.messages];
    while (msgs.length && msgs[msgs.length - 1].role === 'assistant') msgs.pop();
    if (!msgs.length) return;
    const lastUser = msgs[msgs.length - 1];
    updateThread(threadId, (t) => ({ ...t, messages: msgs }));
    void run(msgs, lastUser.image ?? null);
  }

  const visionHint = useMemo(() => modelKnownVision(settings.model) === false, [settings.model]);

  if (!settings.apiKey) {
    return (
      <div className={`chat chat-${variant}`}>
        <div className="chat-scroll">
          <KeySetup compact={variant === 'dock'} />
        </div>
      </div>
    );
  }

  const suggestions = lesson?.id ? undefined : GENERIC_ASK;

  return (
    <div className={`chat chat-${variant}`}>
      <div
        className="chat-scroll"
        ref={scroller}
        onScroll={(e) => {
          const el = e.currentTarget;
          stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the AI teacher"
      >
        {messages.length === 0 && live === null && (
          <div className="chat-empty">
            <p className="chat-empty-title">
              {lesson ? `Ask anything about Lesson ${lesson.id}, or about the course.` : 'Ask anything about Linear Algebra.'}
            </p>
            <p className="q-hint">
              Attach a photo of any board problem or homework exercise with the camera button! Mode:{' '}
              <b>{{ explain: 'Explain', guide: 'Guide me', solve: 'Solve fully', quiz: 'Quiz me' }[settings.mode]}</b>.
            </p>
            <div className="chat-suggest">
              {(lesson ? [] : suggestions!).map((q) => (
                <button key={q} type="button" className="btn btn-sm" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={m.id} className={`msg ${m.role === 'user' ? 'user' : 'ai'}`}>
            <div className="msg-who">{m.role === 'user' ? 'You' : 'Teacher'}</div>
            {m.role === 'user' ? (
              <div className="msg-body">
                {m.image && <img className="msg-img" src={m.image} alt="Your attached problem" />}
                {m.hadImage && !m.image && <p className="q-hint">(photo attached earlier)</p>}
                {m.content && <p style={{ whiteSpace: 'pre-wrap' }}>{m.content}</p>}
              </div>
            ) : (
              <div className="msg-body">
                {m.content && <Md text={m.content} />}
                {m.error && (
                  <div className="chat-error" role="alert">
                    <p>{m.error}</p>
                    <div className="q-actions">
                      <button type="button" className="btn btn-sm" onClick={retry}>
                        <RotateCcw /> Try again
                      </button>
                      <Link className="btn btn-sm" to="/settings">
                        <Cog /> Settings
                      </Link>
                    </div>
                  </div>
                )}
                {m.content && !m.error && (
                  <div className="msg-actions">
                    <button type="button" className="btn btn-sm btn-ghost" onClick={() => navigator.clipboard?.writeText(m.content)}>
                      <Copy /> Copy
                    </button>
                    {i === messages.length - 1 && !busy && (
                      <button type="button" className="btn btn-sm btn-ghost" onClick={retry}>
                        <RotateCcw /> Regenerate
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {live !== null && (
          <div className="msg ai">
            <div className="msg-who">Teacher</div>
            <div className="msg-body">
              {live ? <Md text={live} /> : <p className="typing" aria-label="The teacher is thinking">Thinking…</p>}
            </div>
          </div>
        )}
      </div>

      {lesson && messages.length === 0 && live === null && (
        <div className="chat-suggest chat-suggest-bottom">
          {[
            `Explain Lesson ${lesson.id} in simple terms.`,
            'Walk me through a board example for this topic.',
            'What is the most common mistake students make here?',
          ].map((q) => (
            <button key={q} type="button" className="btn btn-sm" onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        {image && (
          <div className="attach">
            <img src={image} alt="Attached problem preview" />
            <button type="button" className="icon-btn" aria-label="Remove picture" onClick={() => setImage(null)}>
              <X />
            </button>
            {visionHint && <span className="q-hint">This model may not read images. Choose a vision model in Settings.</span>}
          </div>
        )}
        {imgErr && <p className="q-hint" role="alert">{imgErr}</p>}
        <div className="chat-input-row">
          <label className="icon-btn" title="Attach a photo of a problem" style={{ cursor: 'pointer' }}>
            <ImagePlus aria-hidden="true" />
            <span className="sr-only">Attach a photo</span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = '';
                if (!f) return;
                try {
                  setImgErr('');
                  setImage(await shrinkImage(f));
                } catch (err) {
                  setImgErr((err as Error).message);
                }
              }}
            />
          </label>
          <textarea
            ref={area}
            rows={variant === 'dock' ? 2 : 3}
            placeholder="Ask a question about Linear Algebra… (Enter to send, Shift+Enter for new line)"
            value={input}
            aria-label="Your question"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          {busy ? (
            <button type="button" className="btn btn-primary" onClick={() => abort.current?.abort()} aria-label="Stop answering">
              <Square /> Stop
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={!input.trim() && !image} aria-label="Send">
              <Send /> Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export function ensureThread(lessonId: string | undefined, threads: ReturnType<typeof useThreads>): string {
  const found = lessonId ? threads.find((t) => t.lessonId === lessonId) : threads.find((t) => !t.lessonId);
  if (found) return found.id;
  return createThread(lessonId).id;
}
