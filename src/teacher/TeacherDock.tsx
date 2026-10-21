import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2, Plus, X } from 'lucide-react';
import { settingsStore, useSettings } from '../lib/store';
import { useTeacher } from '../lib/teacherCtx';
import { Seg } from '../widgets/ui';
import { Chat, ensureThread } from './Chat';
import { createThread, getThreads, useThreads } from './threads';

export const MODE_OPTIONS = [
  { value: 'explain' as const, label: 'Explain' },
  { value: 'guide' as const, label: 'Guide me' },
  { value: 'solve' as const, label: 'Solve' },
  { value: 'quiz' as const, label: 'Quiz me' },
];

export function TeacherDock() {
  const { open, setOpen, lesson } = useTeacher();
  const settings = useSettings();
  const threads = useThreads();
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    if (open) setThreadId(ensureThread(lesson?.id, getThreads()));
  }, [open, lesson?.id]);

  useEffect(() => {
    document.body.classList.toggle('dock-open', open);
    return () => document.body.classList.remove('dock-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, setOpen]);

  if (!open) return null;
  const current = threads.find((t) => t.id === threadId);

  return (
    <aside className="dock" aria-label="AI linear algebra teacher">
      <div className="dock-head">
        <div className="dock-title">
          <h2>AI Teacher</h2>
          {lesson && <span className="chip chip-accent">Lesson {lesson.id}</span>}
        </div>
        <div className="dock-actions">
          <button
            type="button"
            className="icon-btn"
            title="New chat"
            aria-label="New chat"
            onClick={() => {
              if (!current || current.messages.length) setThreadId(createThread(lesson?.id).id);
            }}
          >
            <Plus />
          </button>
          <Link className="icon-btn" to="/teacher" title="Open the full page" aria-label="Open the full page" onClick={() => setOpen(false)}>
            <Maximize2 />
          </Link>
          <button type="button" className="icon-btn" title="Close" aria-label="Close the AI teacher" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
      </div>
      <div className="dock-mode">
        <Seg label="Teaching style" value={settings.mode} onChange={(m) => settingsStore.set({ mode: m })} options={MODE_OPTIONS} />
      </div>
      {threadId && <Chat key={threadId} threadId={threadId} lesson={lesson} variant="dock" />}
    </aside>
  );
}
