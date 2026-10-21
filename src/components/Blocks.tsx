import { useState } from 'react';
import {
  AlertTriangle, BookOpen, Check, ChevronRight, Eye, Info, Lightbulb, MessageCircle, Pencil, RotateCcw, Sparkles,
} from 'lucide-react';
import type { Block, CalloutKind, Step } from '../content/types';
import { Math as Tex, Rich, RichBlock } from '../lib/rich';
import { BoardPhoto } from './BoardPhoto';
import { QuestionView } from './Quiz';
import { WidgetView } from '../widgets';
import { useTeacher } from '../lib/teacherCtx';

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const CALLOUT_ICON: Record<CalloutKind, typeof Info> = {
  idea: Lightbulb,
  note: Info,
  trap: AlertTriangle,
  why: Sparkles,
  slide: BookOpen,
  try: Pencil,
};
const CALLOUT_DEFAULT_TITLE: Record<CalloutKind, string> = {
  idea: 'The Key Idea',
  note: 'Important Note',
  trap: 'Common Pitfall & Trap',
  why: 'Why it Works (Theorem)',
  slide: 'From the Professor’s Board',
  try: 'Try it Yourself',
};

function Callout({ kind, title, text }: { kind: CalloutKind; title?: string; text: string | string[] }) {
  const Icon = CALLOUT_ICON[kind];
  return (
    <aside className={`callout ${kind}`}>
      <Icon aria-hidden="true" />
      <div className="callout-body">
        <div className="callout-title">
          <Rich text={title ?? CALLOUT_DEFAULT_TITLE[kind]} />
        </div>
        <RichBlock text={text} />
      </div>
    </aside>
  );
}

function StepMath({ math }: { math?: string | string[] }) {
  if (!math) return null;
  const lines = Array.isArray(math) ? math : [math];
  return (
    <>
      {lines.map((m, i) => (
        <Tex key={i} tex={m} display />
      ))}
    </>
  );
}

function Example({
  title,
  source,
  problem,
  boardPhoto,
  steps,
  answer,
}: {
  title: string;
  source?: string;
  problem: string;
  boardPhoto?: string;
  steps: Step[];
  answer: string;
}) {
  const [shown, setShown] = useState(0);
  const { ask } = useTeacher();
  const all = shown >= steps.length;

  return (
    <section className="example" aria-label={`Worked example: ${title.replace(/\$/g, '')}`}>
      <div className="example-head">
        <h3>
          Worked Example: <Rich text={title} />
        </h3>
        {source && <span className="example-src">{source}</span>}
      </div>
      <div className="example-problem">
        <p>
          <Rich text={problem} />
        </p>
        {boardPhoto && (
          <div style={{ margin: 'var(--s3) 0' }}>
            <BoardPhoto photo={boardPhoto} caption={`Board record for ${title.replace(/\$/g, '')}`} />
          </div>
        )}
        {shown === 0 && (
          <p className="q-hint">
            Try working this out on paper first, then reveal one step at a time and compare your solution.
          </p>
        )}
      </div>
      {shown > 0 && (
        <ol className="example-steps" aria-live="polite">
          {steps.slice(0, shown).map((s, i) => (
            <li key={i} className={i === shown - 1 && !all ? 'is-current' : ''}>
              <div>
                <p>
                  <Rich text={s.say} />
                </p>
                <StepMath math={s.math} />
              </div>
            </li>
          ))}
        </ol>
      )}
      {all && (
        <div className="example-answer">
          <Check aria-hidden="true" />
          <div>
            <strong>Answer: </strong>
            <Rich text={answer} />
          </div>
        </div>
      )}
      <div className="example-controls">
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
            <RotateCcw /> Hide
          </button>
        )}
        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={() =>
            ask(
              `I'm working through the worked example "${title.replace(/\$/g, '')}". ${problem.replace(/\$/g, '')}${
                shown > 0 ? ` I'm stuck around step ${Math.max(shown, 1)}.` : ' Can you give me a conceptual hint without giving away the full answer?'
              }`
            )
          }
        >
          <MessageCircle /> Ask the teacher
        </button>
      </div>
    </section>
  );
}

export function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return (
        <p>
          <Rich text={b.text} />
        </p>
      );
    case 'h2':
      return <h2 id={b.id ?? slug(b.text)}>{b.text}</h2>;
    case 'h3':
      return <h3>{b.text}</h3>;
    case 'ul':
      return (
        <ul>
          {b.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {b.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ol>
      );
    case 'formula':
      return (
        <div className="formula">
          {b.title && (
            <div className="formula-title">
              <Rich text={b.title} />
            </div>
          )}
          {b.tex.map((t, i) => (
            <Tex key={i} tex={t} display />
          ))}
          {b.note && (
            <p className="formula-note">
              <Rich text={b.note} />
            </p>
          )}
        </div>
      );
    case 'callout':
      return <Callout kind={b.kind} title={b.title} text={b.text} />;
    case 'board':
      return <BoardPhoto photo={b.photo} caption={b.caption} note={b.note} badge={b.badge} />;
    case 'example':
      return <Example {...b} />;
    case 'table':
      return (
        <div className="table-wrap">
          <table className="data">
            {b.caption && <caption>{b.caption}</caption>}
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i} scope="col">
                    <Rich text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>
                      <Rich text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'widget':
      return <WidgetView id={b.id} />;
    case 'check':
      return <QuestionView q={b.q} label="Quick check" />;
    case 'steps':
      return (
        <div className="steps-block">
          {b.title && (
            <p className="t-md block-title" style={{ marginBottom: 'var(--s3)', fontWeight: 650 }}>
              <Rich text={b.title} />
            </p>
          )}
          <ol className="method-steps">
            {b.items.map((it, i) => (
              <li key={i}>
                <div>
                  <strong className="step-title">
                    <Rich text={it.title} />
                  </strong>
                  <Rich text={it.text} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'compare':
      return (
        <div className="compare">
          {[b.left, b.right].map((c, i) => (
            <div key={i}>
              <h3 className="t-base">
                <Rich text={c.title} />
              </h3>
              <ul>
                {c.items.map((it, j) => (
                  <li key={j}>
                    <Rich text={it} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case 'reveal':
      return (
        <details className="reveal">
          <summary>
            <ChevronRight aria-hidden="true" /> {b.summary}
          </summary>
          <div>
            <RichBlock text={b.text} />
          </div>
        </details>
      );
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </div>
  );
}
