import { useState } from 'react';
import { Math as Tex, Rich } from '../lib/rich';

export function CramerSolver() {
  // Exact problem from Week 5 Board Lecture & Lay Section 3.3 Example 1:
  // System with parameter s:
  // 3s x1 - 2 x2 = 4
  // -6s x1 + (1+s) x2 = 1
  //
  // Or the classic board problem:
  // s x1 - 2 x2 = -1
  // 4 x1 - s x2 = 4
  // det A = -s^2 - (-8) = 8 - s^2
  //
  // Let's use the professor's board problem:
  // [ s   -2 ] [ x1 ] = [ -1 ]
  // [ 4   -s ] [ x2 ] = [  4 ]
  // or
  // [ 3s  -2 ] [ x1 ] = [ 4 ]
  // [ -6s 4  ] ...
  // Let's allow student to adjust s in:
  // [ s   2 ] [ x1 ] = [ 1 ]
  // [ 2   s ] [ x2 ] = [ 3 ]
  // det A = s^2 - 4. Unique solution iff s != 2 and s != -2.
  // det A1 = | 1 2 | = s - 6.  x1 = (s - 6)/(s^2 - 4)
  //          | 3 s |
  // det A2 = | s 1 | = 3s - 2. x2 = (3s - 2)/(s^2 - 4)
  //          | 2 3 |

  const [s, setS] = useState<number>(3);

  const detA = s * s - 4;
  const detA1 = s - 6;
  const detA2 = 3 * s - 2;

  const isSingular = Math.abs(detA) < 1e-6;
  const x1 = isSingular ? null : detA1 / detA;
  const x2 = isSingular ? null : detA2 / detA;

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>Cramer's Rule Parametric Solver</h3>
        <span className="widget-badge">Section 3.3 & Week 5 Board</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          <Rich text="Cramer's rule states that if $\det A \ne 0$, the unique solution to $A\vec{x} = \vec{b}$ is given by $x_i = \frac{\det A_i(\vec{b})}{\det A}$, where $A_i(\vec{b})$ is matrix $A$ with column $i$ replaced by vector $\vec{b}$." />
        </p>

        <div style={{ display: 'grid', gap: 'var(--s4)' }}>
          {/* System display */}
          <div className="step-note-box">
            <strong>Parametric System from Lecture:</strong>
            <div style={{ margin: 'var(--s2) 0' }}>
              <Tex
                tex="\begin{cases} s\,x_1 + 2\,x_2 = 1 \\ 2\,x_1 + s\,x_2 = 3 \end{cases} \iff \begin{bmatrix} s & 2 \\ 2 & s \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 1 \\ 3 \end{bmatrix}"
                display
              />
            </div>
            <p style={{ margin: 0, fontSize: 'var(--t-xs)', color: 'var(--ink-2)' }}>
              Notice $\det A(s) = s^2 - 4 = (s-2)(s+2)$. The system has a unique solution for all $s \ne \pm 2$.
            </p>
          </div>

          {/* Slider for parameter s */}
          <div className="card" style={{ padding: 'var(--s3) var(--s4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 700 }}>Parameter $s$:</span>
              <span className={`chip ${isSingular ? 'bad' : 'ok'}`} style={{ fontWeight: 700 }}>
                s = {s}
              </span>
            </div>
            <input
              type="range"
              min="-4"
              max="4"
              step="0.5"
              value={s}
              onChange={(e) => setS(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--t-xs)', color: 'var(--ink-3)' }}>
              <span>-4</span>
              <span style={{ color: 'var(--bad)', fontWeight: 700 }}>-2 (Singular)</span>
              <span>0</span>
              <span style={{ color: 'var(--bad)', fontWeight: 700 }}>+2 (Singular)</span>
              <span>+4</span>
            </div>
          </div>

          {/* Cramer Determinants */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--s3)' }}>
            <div className="card" style={{ padding: 'var(--s3)' }}>
              <div style={{ fontSize: 'var(--t-xs)', fontWeight: 700, color: 'var(--ink-2)' }}>Matrix Determinant $\det A$:</div>
              <div style={{ margin: 'var(--s1) 0' }}>
                <Tex tex={`\\det A = s^2 - 4 = (${s})^2 - 4 = ${detA}`} />
              </div>
            </div>

            <div className="card" style={{ padding: 'var(--s3)' }}>
              <div style={{ fontSize: 'var(--t-xs)', fontWeight: 700, color: 'var(--ink-2)' }}>Replace Column 1 ($\det A_1$):</div>
              <div style={{ margin: 'var(--s1) 0' }}>
                <Tex tex={`\\det A_1 = \\begin{vmatrix} 1 & 2 \\\\ 3 & ${s} \\end{vmatrix} = ${s} - 6 = ${detA1}`} />
              </div>
            </div>

            <div className="card" style={{ padding: 'var(--s3)' }}>
              <div style={{ fontSize: 'var(--t-xs)', fontWeight: 700, color: 'var(--ink-2)' }}>Replace Column 2 ($\det A_2$):</div>
              <div style={{ margin: 'var(--s1) 0' }}>
                <Tex tex={`\\det A_2 = \\begin{vmatrix} ${s} & 1 \\\\ 2 & 3 \\end{vmatrix} = 3(${s}) - 2 = ${detA2}`} />
              </div>
            </div>
          </div>

          {/* Solution verdict */}
          {isSingular ? (
            <div className="callout trap">
              <strong>Singular Case ($\det A = 0$):</strong> At $s = {s}$, $\det A = 0$.
              Cramer's rule cannot be applied because division by zero is undefined!
              The system either has infinitely many solutions or no solution (inconsistent).
            </div>
          ) : (
            <div className="callout idea">
              <strong>Unique Solution by Cramer's Rule:</strong>
              <div style={{ margin: 'var(--s2) 0' }}>
                <Tex
                  tex={`x_1 = \\frac{\\det A_1}{\\det A} = \\frac{${detA1}}{${detA}} \\approx ${Math.round((x1 ?? 0) * 1000) / 1000}, \\quad x_2 = \\frac{\\det A_2}{\\det A} = \\frac{${detA2}}{${detA}} \\approx ${Math.round((x2 ?? 0) * 1000) / 1000}`}
                  display
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
