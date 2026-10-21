import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { chapters } from '../content';
import { formulaGroups, methodTable } from '../content/formulas';
import { Math as Tex, Rich } from '../lib/rich';

export default function Revise() {
  useEffect(() => {
    document.title = 'Revise · Linear Algebra';
  }, []);

  return (
    <div className="page">
      <div className="page-head">
        <h1>Revise & Exam Cheat Sheet</h1>
        <p>The night-before reference: every core formula, which method to choose, and a quick recap of every lecture.</p>
        <div className="no-print">
          <button type="button" className="btn" onClick={() => window.print()}>
            <Printer /> Print or Save as PDF
          </button>
        </div>
      </div>

      <h2 style={{ marginBottom: 'var(--s4)' }}>Core Formula Reference</h2>
      <div className="sheet-grid">
        {formulaGroups.map((g) => (
          <section className="sheet-group" key={g.title}>
            <h3>{g.title}</h3>
            {g.items.map((it) => (
              <div className="sheet-item" key={it.name}>
                <div className="name">{it.name}</div>
                {it.tex && (Array.isArray(it.tex) ? it.tex : [it.tex]).map((t, i) => <Tex key={i} tex={t} display />)}
                {it.note && (
                  <p>
                    <Rich text={it.note} />
                  </p>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>

      <h2 style={{ margin: 'var(--s8) 0 var(--s4)' }}>Which Method to Choose?</h2>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th scope="col">If the problem looks like this…</th>
              <th scope="col">Reach for</th>
              <th scope="col">Because</th>
            </tr>
          </thead>
          <tbody>
            {methodTable.map((m) => (
              <tr key={m.situation}>
                <td>
                  <Rich text={m.situation} />
                </td>
                <td>
                  <b>{m.method}</b>
                </td>
                <td>
                  <Rich text={m.why} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ margin: 'var(--s8) 0 var(--s4)' }}>Sanity Checks & Common Pitfalls</h2>
      <ol className="prose" style={{ maxWidth: 'var(--measure)', display: 'grid', gap: 'var(--s2)', paddingLeft: '1.4em' }}>
        <li><Rich text="Always count pivots! In an $m \times n$ matrix, $\operatorname{rank}(A) \le \min(m, n)$." /></li>
        <li><Rich text="For $\operatorname{Col} A$ basis, always take the columns from the **original** matrix $A$, not the RREF!" /></li>
        <li><Rich text="For $\operatorname{Nul} A$ basis, solve $A\vec{x} = \vec{0}$ and decompose into parametric vector form." /></li>
        <li><Rich text="Remember that $\det(cA) = c^n \det(A)$ for an $n \times n$ matrix." /></li>
        <li><Rich text="The Rank-Nullity Theorem is your arithmetic check: $\operatorname{rank}(A) + \operatorname{nullity}(A) = n$ (total columns)." /></li>
      </ol>

      <h2 style={{ margin: 'var(--s8) 0 var(--s4)' }}>One-Line Course Recaps</h2>
      {chapters
        .filter((c) => c.lessons.length)
        .map((c) => (
          <section className="recap-chapter" key={c.n}>
            <h3>
              {c.n > 0 ? `Chapter ${c.n}: ` : ''}
              {c.title}
              {c.preview ? ' (preview)' : ''}
            </h3>
            {c.lessons.map((l) => (
              <div className="recap-lesson" key={l.id}>
                <h4>
                  <Link to={`/lesson/${l.id}`}>
                    {l.id} · {l.title}
                  </Link>
                </h4>
                <ul>
                  {l.recap.map((r, i) => (
                    <li key={i}>
                      <Rich text={r} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
    </div>
  );
}
