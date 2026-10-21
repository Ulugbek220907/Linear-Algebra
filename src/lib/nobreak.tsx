import type { ReactNode } from 'react';

/** Keeps hyphenated terms or compound notation on one line when titles or phrases wrap. */
export function NoBreak({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split(/(\s+)/).map((w, i) =>
        /\w-\w/.test(w) ? (
          <span key={i} style={{ whiteSpace: 'nowrap' }}>
            {w}
          </span>
        ) : (
          w
        )
      )}
    </>
  );
}
