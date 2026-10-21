import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shuffle } from 'lucide-react';
import { chapters, questionBank, type BankQuestion } from '../content';
import { QuestionView } from '../components/Quiz';
import { Rich } from '../lib/rich';
import { useProgress } from '../lib/store';

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function Practice() {
  const progress = useProgress();
  const available = chapters.filter((c) => c.n > 0 && c.lessons.length > 0);
  const [sel, setSel] = useState<Set<number>>(new Set(available.filter((c) => !c.preview).map((c) => c.n)));
  const [only, setOnly] = useState<'all' | 'mistakes'>('all');
  const [size, setSize] = useState(10);
  const [session, setSession] = useState<{ qs: BankQuestion[]; i: number; results: Record<string, boolean> } | null>(null);
  const [answered, setAnswered] = useState(false);

  const pool = useMemo(
    () =>
      questionBank.filter(
        (b) => sel.has(b.chapter) && (only === 'all' || progress.wrong[b.q.id] !== undefined)
      ),
    [sel, only, progress.wrong]
  );
  const mistakesCount = questionBank.filter((b) => progress.wrong[b.q.id] !== undefined).length;

  function start() {
    const qs = shuffle(pool).slice(0, size === 0 ? pool.length : size);
    setSession({ qs, i: 0, results: {} });
    setAnswered(false);
    window.scrollTo(0, 0);
  }

  if (session) {
    const done = session.i >= session.qs.length;
    const score = Object.values(session.results).filter(Boolean).length;
    if (done) {
      const missed = session.qs.filter((b) => session.results[b.q.id] === false);
      const lessons = [...new Set(missed.map((m) => m.lessonId))];
      return (
        <div className="page page-narrow">
          <div className="page-head">
            <h1>Practice Session Complete</h1>
            <p>
              You got <b>{score}</b> of {session.qs.length} correct on your first attempt.
            </p>
          </div>
          {missed.length > 0 ? (
            <>
              <h2 style={{ marginBottom: 'var(--s3)' }}>Recommended Lessons to Review</h2>
              <ul className="result-list">
                {lessons.map((id) => {
                  const l = chapters.flatMap((c) => c.lessons).find((x) => x.id === id)!;
                  return (
                    <li key={id}>
                      <Link className="btn" to={`/lesson/${id}`}>
                        {id} · {l.title} <ArrowRight />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p>Outstanding! Zero mistakes. Try another round or drill all chapters.</p>
          )}
          <div style={{ display: 'flex', gap: 'var(--s3)', marginTop: 'var(--s6)', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={start}>
              <Shuffle /> Another round
            </button>
            <button type="button" className="btn" onClick={() => setSession(null)}>
              Change configuration
            </button>
          </div>
        </div>
      );
    }
    const cur = session.qs[session.i];
    return (
      <div className="page page-narrow">
        <div className="session-bar">
          <span className="chip">
            Question {session.i + 1} of {session.qs.length}
          </span>
          <div className="progress" role="progressbar" aria-valuenow={session.i} aria-valuemin={0} aria-valuemax={session.qs.length} aria-label="Session progress">
            <i style={{ width: `${(session.i / session.qs.length) * 100}%` }} />
          </div>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => setSession(null)}>
            End session
          </button>
        </div>

        <QuestionView
          key={cur.q.id}
          q={cur.q}
          label={`Question ${session.i + 1} · Lesson ${cur.lessonId}`}
          onResult={(ok) => {
            setAnswered(true);
            setSession((s) => s && { ...s, results: { ...s.results, [cur.q.id]: ok } });
          }}
        />

        <div style={{ marginTop: 'var(--s5)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!answered}
            onClick={() => {
              setSession((s) => s && { ...s, i: s.i + 1 });
              setAnswered(false);
            }}
          >
            {session.i + 1 >= session.qs.length ? 'Finish session' : 'Next question'} <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <div className="page-head">
        <h1>Practice & Exam Drill</h1>
        <p>Targeted quizzes compiled across all course chapters. Test conceptual understanding and arithmetic precision under exam conditions.</p>
      </div>

      <div className="filters">
        <div className="field">
          <span className="label">Filter by Chapter</span>
          <div className="check-chips">
            {available.map((c) => {
              const on = sel.has(c.n);
              return (
                <label key={c.n} className="check-chip">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) => {
                      const next = new Set(sel);
                      if (e.target.checked) next.add(c.n);
                      else next.delete(c.n);
                      setSel(next);
                    }}
                  />
                  <span>
                    Ch. {c.n}: {c.title.split(':')[0]}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="field">
          <span className="label">Focus</span>
          <div className="check-chips">
            <label className="check-chip">
              <input type="radio" name="only" checked={only === 'all'} onChange={() => setOnly('all')} />
              <span>All questions ({pool.length})</span>
            </label>
            <label className="check-chip">
              <input
                type="radio"
                name="only"
                checked={only === 'mistakes'}
                disabled={mistakesCount === 0}
                onChange={() => setOnly('mistakes')}
              />
              <span>Mistake bank only ({mistakesCount})</span>
            </label>
          </div>
        </div>

        <div className="field">
          <span className="label">Session Size</span>
          <div className="check-chips">
            {[5, 10, 20].map((n) => (
              <label key={n} className="check-chip">
                <input type="radio" name="size" checked={size === n} onChange={() => setSize(n)} />
                <span>{n} questions</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--s6)' }}>
        {pool.length === 0 ? (
          <div className="empty">
            <strong>No questions match this selection.</strong>
            <p>Select at least one chapter above, or switch from "Mistake bank only" to "All questions".</p>
          </div>
        ) : (
          <button type="button" className="btn btn-primary" onClick={start}>
            <Shuffle /> Start {Math.min(size, pool.length)} Questions
          </button>
        )}
      </div>
    </div>
  );
}
