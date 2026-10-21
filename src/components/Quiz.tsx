import { useEffect, useMemo, useState } from 'react';
import { Check, CircleHelp, Lightbulb, RotateCcw, X } from 'lucide-react';
import type { NumQuestion, Question } from '../content/types';
import { Rich, RichBlock, speakable } from '../lib/rich';
import { BoardPhoto } from './BoardPhoto';
import { recordAnswer } from '../lib/store';

export function parseFractionOrDecimal(raw: string): number | null {
  const cleaned = raw.trim().replace(',', '.').replace('−', '-');
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return num / den;
      }
    }
  }
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(cleaned)) return null;
  const x = parseFloat(cleaned);
  return isNaN(x) ? null : x;
}

export function isNumRight(q: NumQuestion, raw: string): boolean | null {
  const val = parseFractionOrDecimal(raw);
  if (val === null) return null;
  const tol = q.abs !== undefined ? q.abs : Math.max(Math.abs(q.answer) * (q.tol ?? 0.01), 1e-6);
  return Math.abs(val - q.answer) <= tol;
}

interface QProps {
  q: Question;
  /** called once with the result of the first attempt */
  onResult?: (ok: boolean) => void;
  /** record the result in the mistake bank */
  track?: boolean;
  label?: string;
}

export function QuestionView({ q, onResult, track = true, label }: QProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [verdict, setVerdict] = useState<null | boolean>(null);
  const [hint, setHint] = useState(false);
  const [bad, setBad] = useState(false);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    setPicked(null);
    setText('');
    setVerdict(null);
    setHint(false);
    setBad(false);
    setFirst(true);
  }, [q.id]);

  const done = verdict !== null;

  function finish(ok: boolean) {
    setVerdict(ok);
    if (first) {
      setFirst(false);
      if (track) recordAnswer(q.id, ok);
      onResult?.(ok);
    }
  }

  const answerText = useMemo(() => {
    if (q.type === 'num') return `${q.answer}${q.unit ? ' ' + q.unit : ''}`;
    return q.options[q.answer];
  }, [q]);

  return (
    <div className="q" role="group" aria-label={label ?? 'Question'} data-qid={q.id}>
      <div className="q-text">
        {label && <div className="label">{label}</div>}
        <p>
          <Rich text={q.q} />
        </p>
      </div>
      {q.boardPhoto && (
        <div style={{ margin: 'var(--s3) 0' }}>
          <BoardPhoto photo={q.boardPhoto} caption="Board problem figure" />
        </div>
      )}

      {q.type === 'mc' ? (
        <ul className="q-options">
          {q.options.map((o, i) => {
            const isRight = done && i === q.answer;
            const isWrong = done && picked === i && i !== q.answer;
            return (
              <li key={i}>
                <button
                  type="button"
                  className={`q-opt ${picked === i ? 'is-picked' : ''} ${isRight ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                  disabled={done}
                  aria-label={o.includes('$') ? speakable(o) : undefined}
                  onClick={() => {
                    setPicked(i);
                    finish(i === q.answer);
                  }}
                >
                  <span className="radio" aria-hidden="true">
                    {isRight && <Check />}
                    {isWrong && <X />}
                  </span>
                  <span>
                    <Rich text={o} />
                  </span>
                  <span className="mark">
                    {isRight && 'Correct answer'}
                    {isWrong && 'Your answer'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <form
          className="q-num"
          onSubmit={(e) => {
            e.preventDefault();
            const r = isNumRight(q, text);
            if (r === null) {
              setBad(true);
              return;
            }
            setBad(false);
            finish(r);
          }}
        >
          <label className="sr-only" htmlFor={`in-${q.id}`}>
            Your answer
          </label>
          <input
            id={`in-${q.id}`}
            type="text"
            inputMode="text"
            autoComplete="off"
            placeholder="e.g. 3, -1/2, or 0.75"
            value={text}
            disabled={done && verdict === true}
            onChange={(e) => {
              setText(e.target.value);
              if (verdict === false) setVerdict(null);
              setBad(false);
            }}
          />
          {q.unit && <span className="q-unit">{q.unit}</span>}
          <button className="btn btn-primary" type="submit" disabled={done && verdict === true}>
            Check
          </button>
          {bad && <span className="q-hint" role="alert">Enter a number or fraction, like 4, -1/2, or 2.5</span>}
        </form>
      )}

      {!done && (
        <div className="q-actions">
          {q.hint && (
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setHint((h) => !h)} aria-expanded={hint}>
              <Lightbulb /> {hint ? 'Hide hint' : 'Hint'}
            </button>
          )}
        </div>
      )}
      {hint && !done && q.hint && (
        <p className="q-hint">
          <Rich text={q.hint} />
        </p>
      )}

      {done && (
        <div className={`q-feedback ${verdict ? 'ok' : 'bad'}`} role="status">
          {verdict ? <Check /> : <CircleHelp />}
          <div>
            <div className="q-verdict">{verdict ? 'Correct.' : 'Not quite.'}</div>
            {!verdict && (
              <p>
                {q.type === 'num' ? 'The answer is ' : 'The right answer is '}
                <strong>{q.type === 'num' ? answerText : <Rich text={answerText as string} />}</strong>.
              </p>
            )}
            <RichBlock text={q.why} />
            {!verdict && q.type === 'num' && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  setVerdict(null);
                  setText('');
                }}
              >
                <RotateCcw /> Try again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function QuizSet({
  title,
  questions,
  onComplete,
}: {
  title: string;
  questions: Question[];
  onComplete?: (score: number, total: number) => void;
}) {
  const [results, setResults] = useState<Record<string, boolean>>({});
  const answered = Object.keys(results).length;
  const score = Object.values(results).filter(Boolean).length;
  const total = questions.length;

  useEffect(() => {
    if (answered === total && total > 0) onComplete?.(score, total);
  }, [answered, total, onComplete, score]);

  return (
    <section aria-label={title}>
      <div className="quiz-head">
        <h2 id="check-yourself">{title}</h2>
        <span className="chip" aria-live="polite">
          {answered === total && total > 0 ? `Score ${score} / ${total}` : `${answered} of ${total} answered`}
        </span>
      </div>
      <ol className="quiz-list" style={{ marginTop: 'var(--s4)' }}>
        {questions.map((q, i) => (
          <li key={q.id}>
            <QuestionView
              q={q}
              label={`Question ${i + 1}`}
              onResult={(ok) => setResults((r) => ({ ...r, [q.id]: ok }))}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
