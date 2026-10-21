import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Settings as Cog, Trash2 } from 'lucide-react';
import { lessonById } from '../content';
import { Chat } from '../teacher/Chat';
import { MODE_OPTIONS } from '../teacher/TeacherDock';
import { createThread, deleteThread, useThreads } from '../teacher/threads';
import { settingsStore, useSettings } from '../lib/store';
import { useTeacher } from '../lib/teacherCtx';
import { Seg } from '../widgets/ui';

export default function TeacherPage() {
  const threads = useThreads();
  const settings = useSettings();
  const { setOpen } = useTeacher();
  const [id, setId] = useState<string | null>(null);
  const made = useRef(false);

  useEffect(() => {
    document.title = 'AI Teacher · Linear Algebra';
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (id && threads.some((t) => t.id === id)) return;
    if (threads.length) setId(threads[0].id);
    else if (!made.current) {
      made.current = true;
      setId(createThread().id);
    }
  }, [threads, id]);

  const current = threads.find((t) => t.id === id);
  const lesson = current?.lessonId ? lessonById(current.lessonId) : undefined;

  return (
    <div className="page">
      <div className="page-head">
        <h1>AI Linear Algebra Teacher</h1>
        <p>
          Ask about any concept, theorem, or proof in Linear Algebra. The AI teacher knows David C. Lay's textbook,
          understands the professor's board examples, reads attached photo questions, and supports English, Uzbek, and Russian.
        </p>
        <div style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Seg label="Teaching style" value={settings.mode} onChange={(m) => settingsStore.set({ mode: m })} options={MODE_OPTIONS} />
          <Link className="btn btn-sm" to="/settings">
            <Cog /> Key and model settings
          </Link>
        </div>
      </div>
      <div className="teacher-layout">
        <div>
          <button
            type="button"
            className="btn btn-sm"
            style={{ marginBottom: 'var(--s3)' }}
            onClick={() => {
              if (!current || current.messages.length) setId(createThread().id);
            }}
          >
            <Plus /> New conversation
          </button>
          <ul className="thread-list" aria-label="Your conversations">
            {threads.map((t) => (
              <li key={t.id}>
                <button type="button" className="thread-btn" aria-current={t.id === id} onClick={() => setId(t.id)}>
                  <strong>{t.title}</strong>
                  <small>
                    {t.lessonId ? `Lesson ${t.lessonId} · ` : ''}
                    {new Date(t.updated).toLocaleDateString()}
                  </small>
                </button>
                <button type="button" className="icon-btn" aria-label={`Delete chat: ${t.title}`} onClick={() => deleteThread(t.id)}>
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {id && (
          <Chat
            key={id}
            threadId={id}
            variant="page"
            lesson={lesson ? { id: lesson.id, title: lesson.title, summary: lesson.summary, recap: lesson.recap } : null}
          />
        )}
      </div>
    </div>
  );
}
