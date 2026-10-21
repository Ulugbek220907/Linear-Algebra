import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, FileText, ListTree, MessageCircle } from 'lucide-react';
import { chapterOf, lessonById, neighbors } from '../content';
import { Blocks, slug } from '../components/Blocks';
import { QuizSet } from '../components/Quiz';
import { Sidebar } from '../components/Sidebar';
import { Rich } from '../lib/rich';
import { markDone, recordQuiz, setLast, useProgress } from '../lib/store';
import { NoBreak } from '../lib/nobreak';
import { useTeacher } from '../lib/teacherCtx';

export default function LessonPage() {
  const { id = '' } = useParams();
  const lesson = lessonById(id);
  const progress = useProgress();
  const { setLesson, ask, setOpen } = useTeacher();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lesson) return;
    setLast(lesson.id);
    setLesson({ id: lesson.id, title: lesson.title, summary: lesson.summary, recap: lesson.recap });
    window.scrollTo(0, 0);
    document.title = `${lesson.id} ${lesson.title} · Linear Algebra`;
    return () => setLesson(null);
  }, [lesson, setLesson]);

  const heads = useMemo(
    () =>
      lesson
        ? [
            ...lesson.blocks
              .filter((b): b is { t: 'h2'; text: string; id?: string } => b.t === 'h2')
              .map((b) => ({ id: b.id ?? slug(b.text), text: b.text })),
            { id: 'check-yourself', text: 'Check yourself' },
            { id: 'recap', text: 'Quick recap' },
          ]
        : [],
    [lesson]
  );

  useEffect(() => {
    if (!heads.length) return;
    const els = heads.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [heads, id]);

  if (!lesson) return <Navigate to="/" replace />;
  const ch = chapterOf(lesson);
  const { prev, next } = neighbors(lesson.id);
  const done = !!progress.done[lesson.id];
  const quiz = progress.quiz[lesson.id];

  return (
    <div className="lesson-layout">
      <Sidebar open={menu} onClose={() => setMenu(false)} />
      <div className="lesson-main">
        <article className="lesson-article" ref={articleRef}>
          <header className="lesson-head">
            <nav className="crumbs" aria-label="Breadcrumb">
              <button type="button" className="btn btn-sm sidebar-toggle" onClick={() => setMenu(true)}>
                <ListTree /> Contents
              </button>
              <Link to="/">Course</Link>
              <ChevronRight aria-hidden="true" />
              <span>{ch.n > 0 ? `Chapter ${ch.n}: ${ch.title}` : ch.title}</span>
            </nav>
            {ch.preview && (
              <p>
                <span className="chip chip-warn">Preview material</span>
              </p>
            )}
            <h1>
              <NoBreak text={lesson.title} />
            </h1>
            <div className="lesson-meta">
              <span style={{ fontWeight: 650, color: 'var(--ink)' }}>Lesson {lesson.id}</span>
              <span>
                <Clock className="icon" aria-hidden="true" /> {lesson.minutes} min
              </span>
              {lesson.slides && (
                <span>
                  <FileText className="icon" aria-hidden="true" /> {lesson.slides}
                </span>
              )}
              {done && (
                <span style={{ color: 'var(--ok)', fontWeight: 650 }}>
                  <Check className="icon" aria-hidden="true" /> Completed
                </span>
              )}
            </div>
            <div className="objective">
              <strong>By the end you can:</strong>
              <Rich text={lesson.summary} />
            </div>
          </header>

          <Blocks blocks={lesson.blocks} />

          <QuizSet
            title="Check yourself"
            questions={lesson.quiz}
            onComplete={(s, t) => recordQuiz(lesson.id, s, t)}
          />

          <section className="recap" id="recap" aria-labelledby="recap-h">
            <h2 id="recap-h">Quick recap</h2>
            <ul>
              {lesson.recap.map((r, i) => (
                <li key={i}>
                  <Rich text={r} />
                </li>
              ))}
            </ul>
          </section>

          <div className="complete-row no-print">
            <button
              type="button"
              className={`btn ${done ? '' : 'btn-primary'}`}
              onClick={() => markDone(lesson.id, !done)}
              aria-pressed={done}
            >
              <Check /> {done ? 'Completed (undo)' : 'Mark lesson complete'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setOpen(true);
              }}
            >
              <MessageCircle /> Ask about this lesson
            </button>
            {quiz && (
              <span className="chip">
                Best quiz score {quiz.best} / {quiz.total}
              </span>
            )}
          </div>
          {lesson.ask.length > 0 && (
            <div className="no-print">
              <p className="label" style={{ marginBottom: 'var(--s2)' }}>
                Questions students ask about this lesson
              </p>
              <div className="chat-suggest">
                {lesson.ask.map((q) => (
                  <button key={q} type="button" className="btn btn-sm" onClick={() => ask(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <footer className="lesson-foot lesson-foot-nav">
            {prev ? (
              <Link className="navcard" to={`/lesson/${prev.id}`}>
                <small>
                  <ArrowLeft className="icon" aria-hidden="true" /> Previous
                </small>
                <strong>
                  {prev.id} · {prev.title}
                </strong>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link className="navcard next" to={`/lesson/${next.id}`}>
                <small>
                  Next <ArrowRight className="icon" aria-hidden="true" />
                </small>
                <strong>
                  {next.id} · {next.title}
                </strong>
              </Link>
            )}
          </footer>
        </article>

        <aside className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ul>
            {heads.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  aria-current={active === h.id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
