import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ClipboardList, FileText, MessageCircle, Target } from 'lucide-react';
import { chapters, allLessons, questionBank } from '../content';
import { useProgress } from '../lib/store';
import { useTeacher } from '../lib/teacherCtx';
import { NoBreak } from '../lib/nobreak';

export default function Home() {
  const progress = useProgress();
  const { setOpen } = useTeacher();

  useEffect(() => {
    document.title = 'Linear Algebra · Interactive Study Platform';
  }, []);

  const taught = allLessons;
  const doneTaught = taught.filter((l) => progress.done[l.id]).length;
  const lastLesson = progress.last ? allLessons.find((l) => l.id === progress.last) : undefined;
  const nextUndone = taught.find((l) => !progress.done[l.id]);
  const resume = lastLesson && !progress.done[lastLesson.id] ? lastLesson : nextUndone;
  const quizEntries = Object.values(progress.quiz);
  const avg = quizEntries.length
    ? Math.round((quizEntries.reduce((s, q) => s + q.best / q.total, 0) / quizEntries.length) * 100)
    : null;
  const mistakes = Object.keys(progress.wrong).filter((id) => questionBank.some((b) => b.q.id === id)).length;
  const started = doneTaught > 0 || !!progress.last;

  return (
    <div className="page">
      <div className="home-top">
        <div>
          <h1>Linear Algebra, from zero to Midterm</h1>
          <p>
            MATH2110 university course based on David C. Lay's <em>Linear Algebra and Its Applications</em> and 8 weeks of lecture board presentations. Interactive row elimination, 2D geometric transformations, network traffic flow, and an AI teacher in English, Uzbek, and Russian.
          </p>
        </div>
        <div className="continue">
          {resume ? (
            <>
              <strong>
                {resume.id} · {resume.title}
              </strong>
              <div className="continue-actions">
                <Link className="btn btn-primary" to={`/lesson/${resume.id}`}>
                  {started ? 'Continue' : 'Start first lesson'} <ArrowRight />
                </Link>
                <button type="button" className="btn" onClick={() => setOpen(true)}>
                  <MessageCircle /> Ask the teacher
                </button>
              </div>
            </>
          ) : (
            <>
              <strong>All lessons are completed! Now drill exam questions.</strong>
              <div className="continue-actions">
                <Link className="btn btn-primary" to="/practice">
                  Go to Practice <ArrowRight />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="home-grid">
        <div>
          <div className="stats-line" aria-label="Your progress">
            <span>
              <b>
                {doneTaught} of {taught.length}
              </b>{' '}
              lessons done
            </span>
            <span>
              Quiz average <b>{avg === null ? '–' : `${avg}%`}</b>
            </span>
            <span>
              Questions to review <b>{mistakes}</b>
            </span>
          </div>

          {chapters.map((c) => {
            const done = c.lessons.filter((l) => progress.done[l.id]).length;
            const pct = Math.round((done / c.lessons.length) * 100);
            return (
              <section className="path-chapter" key={c.n} aria-labelledby={`ch${c.n}`}>
                <div className="path-chapter-head">
                  <h2 id={`ch${c.n}`}>
                    {c.n > 0 ? `Chapter ${c.n}: ` : ''}
                    {c.title}
                    {c.preview && (
                      <span className="chip chip-warn" style={{ marginLeft: 'var(--s3)', verticalAlign: 'middle' }}>
                        Preview
                      </span>
                    )}
                  </h2>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-valuenow={done}
                    aria-valuemin={0}
                    aria-valuemax={c.lessons.length}
                    aria-label={`Progress in chapter ${c.n}`}
                  >
                    <i style={{ width: `${pct}%` }} />
                  </div>
                  <p>{c.blurb}</p>
                </div>
                <ul className="lesson-rows">
                  {c.lessons.map((l) => {
                    const isDone = !!progress.done[l.id];
                    const isNext = resume?.id === l.id;
                    return (
                      <li key={l.id}>
                        <Link className={`lesson-row ${isNext ? 'is-next' : ''}`} to={`/lesson/${l.id}`}>
                          <span className="num">{l.id}</span>
                          <span className="title">
                            <NoBreak text={l.title} />
                            <span className="sub">{l.summary}</span>
                          </span>
                          <span className="min">{l.minutes} min</span>
                          <span className="state">
                            {isDone ? (
                              <Check aria-label="Completed" />
                            ) : isNext ? (
                              <ArrowRight aria-label="Next lesson to study" />
                            ) : null}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <aside className="modes" aria-label="Study modes">
          <Link to="/practice">
            <strong>
              <Target aria-hidden="true" /> Practice
            </strong>
            <small>Drill exam questions by chapter or review mistake bank ({mistakes} flagged)</small>
          </Link>
          <Link to="/revise">
            <strong>
              <FileText aria-hidden="true" /> Revise
            </strong>
            <small>The night-before cheat sheet: formulas, theorems, and which method to choose</small>
          </Link>
          <Link to="/homework">
            <strong>
              <ClipboardList aria-hidden="true" /> Homework
            </strong>
            <small>Step-by-step worked solutions to assigned textbook & board homework problems</small>
          </Link>
          <Link to="/teacher">
            <strong>
              <MessageCircle aria-hidden="true" /> AI Teacher
            </strong>
            <small>Deep interactive discussions, picture solving, and personalized guidance</small>
          </Link>
        </aside>
      </div>
    </div>
  );
}
