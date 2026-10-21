import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, Eye, MessageCircle } from 'lucide-react';
import { homeworks } from '../content/homework';
import { lessonById } from '../content';
import { BoardPhoto } from '../components/BoardPhoto';
import { Math as Tex, Rich } from '../lib/rich';
import { useTeacher } from '../lib/teacherCtx';
import type { HwProblem } from '../content/types';

function Problem({ hw, p }: { hw: string; p: HwProblem }) {
  const [shown, setShown] = useState(0);
  const { ask } = useTeacher();
  const steps = p.steps ?? [];
  const all = shown >= steps.length;

  return (
    <section className="hw-problem" aria-labelledby={`p-${hw}-${p.n}`}>
      <h2 className="t-md" id={`p-${hw}-${p.n}`}>
        Exercise {p.n}
        {p.page && (
          <span className="chip" style={{ marginLeft: 'var(--s3)', verticalAlign: 'middle' }}>
            Textbook {p.page}
          </span>
        )}
      </h2>
      {p.prompt && (
        <p>
          <Rich text={p.prompt} />
        </p>
      )}
      {p.boardPhoto && (
        <div style={{ margin: 'var(--s3) 0' }}>
          <BoardPhoto photo={p.boardPhoto} caption={`Homework problem reference ${p.n}`} />
        </div>
      )}
      {steps.length > 0 && (
        <>
          {shown === 0 && <p className="q-hint">Solve it on paper first, then reveal the solution step-by-step.</p>}
          {shown > 0 && (
            <ol className="example-steps" style={{ padding: 0 }}>
              {steps.slice(0, shown).map((s, i) => (
                <li key={i} className={i === shown - 1 && !all ? 'is-current' : ''}>
                  <div>
                    <p>
                      <Rich text={s.say} />
                    </p>
                    {s.math && (Array.isArray(s.math) ? s.math : [s.math]).map((m, k) => <Tex key={k} tex={m} display />)}
                  </div>
                </li>
              ))}
            </ol>
          )}
          {all && p.answer && (
            <div className="example-answer" style={{ margin: 0 }}>
              <Check aria-hidden="true" />
              <div>
                <strong>Answer: </strong>
                <Rich text={p.answer} />
              </div>
            </div>
          )}
          <div className="example-controls" style={{ padding: 0, border: 0 }}>
            {!all && (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setShown((n) => n + 1)}>
                {shown === 0 ? 'Show step 1' : `Show step ${shown + 1}`} <ChevronRight />
              </button>
            )}
            {!all && (
              <button type="button" className="btn btn-sm" onClick={() => setShown(steps.length)}>
                <Eye /> Show all steps
              </button>
            )}
            {shown > 0 && (
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => setShown(0)}>
                Hide
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() =>
                ask(
                  `I'm working on Homework ${hw}, Problem ${p.n}: ${p.prompt ? p.prompt.replace(/\$/g, '') : ''}. Can you give me a conceptual hint on how to start?`
                )
              }
            >
              <MessageCircle /> Ask the teacher
            </button>
          </div>
        </>
      )}
      {p.review && (
        <p className="q-hint">
          Review:{' '}
          {p.review.map((id, i) => (
            <span key={id}>
              {i > 0 && ', '}
              <Link to={`/lesson/${id}`}>
                {id} {lessonById(id)?.title}
              </Link>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}

export default function HomeworkPage() {
  const { id } = useParams();
  const current = id ? homeworks.find((h) => h.id === id) : undefined;

  useEffect(() => {
    document.title = current ? `${current.title} · Linear Algebra` : 'Homework · Linear Algebra';
  }, [current]);

  if (current) {
    return (
      <div className="page page-narrow">
        <div className="page-head">
          <nav className="crumbs" aria-label="Breadcrumb" style={{ marginBottom: 'var(--s2)' }}>
            <Link to="/homework">All Homeworks</Link>
            <ChevronRight aria-hidden="true" />
            <span>{current.title}</span>
          </nav>
          <h1>{current.title}</h1>
          <p>
            <Rich text={current.intro} />
          </p>
        </div>

        <div style={{ display: 'grid', gap: 'var(--s7)' }}>
          {current.problems.map((p) => (
            <Problem key={p.n} hw={current.id} p={p} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <div className="page-head">
        <h1>Homework Problem Sets & Solutions</h1>
        <p>Complete step-by-step solutions for exercises assigned in David C. Lay's textbook and lecture presentations across Weeks 1 to 7.</p>
      </div>

      <div className="hw-list">
        {homeworks.map((h) => (
          <article className="hw-card" key={h.id}>
            <h2>
              <Link to={`/homework/${h.id}`}>{h.title}</Link>
            </h2>
            <p>
              <Rich text={h.intro} />
            </p>
            <div className="hw-problems">
              {h.problems.map((p) => (
                <span className="chip" key={p.n}>
                  Problem {p.n}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 'var(--s3)' }}>
              <Link className="btn btn-sm btn-primary" to={`/homework/${h.id}`}>
                View worked solutions <ArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
