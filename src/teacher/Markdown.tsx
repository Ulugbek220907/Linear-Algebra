import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';

/** Models often reply with \( \) and \[ \]; remark-math expects $ and $$. */
export function normalizeMath(src: string): string {
  const parts = src.split(/(```[\s\S]*?```|`[^`\n]*`)/g);
  return parts
    .map((p, i) =>
      i % 2 === 1
        ? p
        : p
            .replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => `\n$$\n${m}\n$$\n`)
            .replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => `$${m}$`)
    )
    .join('');
}

export function Md({ text }: { text: string }) {
  const t = useMemo(() => normalizeMath(text), [text]);
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer noopener">
              {children}
            </a>
          ),
        }}
      >
        {t}
      </ReactMarkdown>
    </div>
  );
}
