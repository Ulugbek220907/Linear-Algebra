import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import katex from 'katex';

export function Math({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: 'ignore',
        trust: false,
        output: 'htmlAndMathml',
      }),
    [tex, display]
  );
  const Tag = display ? 'div' : 'span';
  const long = !display && tex.replace(/\\[a-zA-Z]+/g, 'x').replace(/[{}^_]/g, '').length > 22;
  const cls = display ? 'math-display' : long ? 'math-inline math-long' : 'math-inline';
  return <Tag className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Inline definition: click or focus the word to read it. */
function Term({ word, def }: { word: string; def: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent && ref.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);
  return (
    <span className="term-wrap" ref={ref}>
      <button type="button" className="term" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {word}
      </button>
      {open && (
        <span className="term-pop" role="note">
          <Rich text={def} />
        </span>
      )}
    </span>
  );
}

const TOKEN = /(\$[^$]+\$|\{\{[^}]+\}\}|\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/;

export function Rich({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith('$') && p.endsWith('$') && p.length > 2) return <Math key={i} tex={p.slice(1, -1)} />;
        if (p.startsWith('{{') && p.endsWith('}}')) {
          const [word, ...def] = p.slice(2, -2).split('|');
          return <Term key={i} word={word} def={def.join('|')} />;
        }
        if (p.startsWith('[[') && p.endsWith(']]')) {
          const [id, label] = p.slice(2, -2).split('|');
          return (
            <Link key={i} to={`/lesson/${id}`} className="lesson-link">
              {label ?? `Lesson ${id}`}
            </Link>
          );
        }
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}><Rich text={p.slice(2, -2)} /></strong>;
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}><Rich text={p.slice(1, -1)} /></em>;
        if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

/** Rich text that may be one paragraph or several. */
export function RichBlock({ text }: { text: string | string[] }) {
  const arr = Array.isArray(text) ? text : [text];
  return (
    <>
      {arr.map((t, i) => (
        <p key={i}>
          <Rich text={t} />
        </p>
      ))}
    </>
  );
}

/** TeX to something a screen reader can say: used for the accessible name of buttons that contain math. */
export function speakTex(t: string): string {
  let s = t;
  for (let k = 0; k < 4; k++) s = s.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '($1 over $2)');
  return s
    .replace(/\\vec\{([^{}]*)\}/g, 'vector $1')
    .replace(/\\mathbf\{([^{}]*)\}/g, 'vector $1')
    .replace(/\\mathbb\{R\}/g, 'R')
    .replace(/\\mathbb\{P\}/g, 'P')
    .replace(/\\det/g, 'determinant')
    .replace(/\\operatorname\{rank\}/g, 'rank')
    .replace(/\\operatorname\{nullity\}/g, 'nullity')
    .replace(/\\operatorname\{Nul\}/g, 'null space of')
    .replace(/\\operatorname\{Col\}/g, 'column space of')
    .replace(/\\sqrt\{([^{}]*)\}/g, 'square root of $1')
    .replace(/\^2/g, ' squared')
    .replace(/\^\{([^{}]*)\}/g, ' to the $1')
    .replace(/\^(\w)/g, ' to the $1')
    .replace(/_\{([^{}]*)\}/g, ' sub $1')
    .replace(/_(\w)/g, ' sub $1')
    .replace(/\\(times|cdot)/g, ' times ')
    .replace(/\\oplus/g, ' plus ')
    .replace(/\\odot/g, ' circle dot ')
    .replace(/\\lambda/g, ' lambda ')
    .replace(/\\(left|right|quad|qquad|text|mathrm)\b|\\[,;:! ]/g, ' ')
    .replace(/\\([a-zA-Z]+)/g, ' $1 ')
    .replace(/[{}]/g, '')
    .replace(/=/g, ' equals ')
    .replace(/\+/g, ' plus ')
    .replace(/-/g, ' minus ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Plain, speakable version of a Rich string (markup removed, maths spelled out). */
export function speakable(text: string): string {
  return text
    .split(TOKEN)
    .map((p) => {
      if (p.startsWith('$') && p.endsWith('$') && p.length > 2) return speakTex(p.slice(1, -1));
      if (p.startsWith('{{') && p.endsWith('}}')) return p.slice(2, -2).split('|')[0];
      if (p.startsWith('[[') && p.endsWith(']]')) return p.slice(2, -2).split('|').pop() ?? '';
      if (p.startsWith('**') && p.endsWith('**')) return speakable(p.slice(2, -2));
      if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return speakable(p.slice(1, -1));
      if (p.startsWith('`') && p.endsWith('`')) return p.slice(1, -1);
      return p;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}
