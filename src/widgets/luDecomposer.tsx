import { useState } from 'react';
import { Math as Tex, Rich } from '../lib/rich';

export function LuDecomposer() {
  // Classic Lay Section 2.5 example:
  // A = [ [3, -7, -2], [-3, 5, 1], [6, -4, 0] ]
  // Step 1: R2 + 1*R1 -> R2 (multiplier -1 placed into L21)
  // Step 2: R3 - 2*R1 -> R3 (multiplier 2 placed into L31)
  // Resulting row 2: [0, -2, -1]
  // Resulting row 3: [0, 10, 4]
  // Step 3: R3 + 5*R2 -> R3 (multiplier -5 placed into L32)
  // Resulting row 3: [0, 0, -1]
  //
  // U = [ [3, -7, -2], [0, -2, -1], [0, 0, -1] ]
  // L = [ [1, 0, 0], [-1, 1, 0], [2, -5, 1] ]

  const [step, setStep] = useState<number>(0);

  const stepsData = [
    {
      title: 'Original Matrix A',
      desc: 'We want to factor A = LU without row swaps, using only row addition/subtraction operations.',
      L: [
        ['1', '0', '0'],
        ['?', '1', '0'],
        ['?', '?', '1'],
      ],
      U: [
        ['3', '-7', '-2'],
        ['-3', '5', '1'],
        ['6', '-4', '0'],
      ],
      op: 'Begin forward elimination on column 1.',
    },
    {
      title: 'Eliminate Column 1',
      desc: 'Row 2 + (1)·Row 1 -> Row 2  (Multiplier c = -1 goes into L₂₁ = -1). Row 3 - (2)·Row 1 -> Row 3 (Multiplier c = 2 goes into L₃₁ = 2).',
      L: [
        ['1', '0', '0'],
        ['-1', '1', '0'],
        ['2', '?', '1'],
      ],
      U: [
        ['3', '-7', '-2'],
        ['0', '-2', '-1'],
        ['0', '10', '4'],
      ],
      op: 'R_2 + R_1 \\to R_2, \\quad R_3 - 2R_1 \\to R_3',
    },
    {
      title: 'Eliminate Column 2',
      desc: 'Row 3 + (5)·Row 2 -> Row 3  (Multiplier c = -5 goes into L₃₂ = -5). Now U is completely in Upper Triangular form!',
      L: [
        ['1', '0', '0'],
        ['-1', '1', '0'],
        ['2', '-5', '1'],
      ],
      U: [
        ['3', '-7', '-2'],
        ['0', '-2', '-1'],
        ['0', '0', '-1'],
      ],
      op: 'R_3 + 5R_2 \\to R_3',
    },
    {
      title: 'Solving Ax = b via LU',
      desc: 'Given b = [-7, 5, 2]^T. Step 1: Forward-substitute Ly = b to get y = [-7, -2, 6]^T. Step 2: Back-substitute Ux = y to get x = [3, 4, -6]^T.',
      L: [
        ['1', '0', '0'],
        ['-1', '1', '0'],
        ['2', '-5', '1'],
      ],
      U: [
        ['3', '-7', '-2'],
        ['0', '-2', '-1'],
        ['0', '0', '-1'],
      ],
      op: 'L\\vec{y} = \\vec{b} \\implies \\vec{y}, \\quad U\\vec{x} = \\vec{y} \\implies \\vec{x}',
    },
  ];

  const cur = stepsData[step];

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>LU Matrix Factorization Stepper</h3>
        <span className="widget-badge">Section 2.5</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          <Rich text="An $LU$ factorization expresses $A$ as $A = LU$, where $L$ is a unit lower triangular matrix (1s on diagonal) and $U$ is an echelon form of $A$. It is widely used in scientific computing because once factored, solving $A\vec{x} = \vec{b}$ for many different $\vec{b}$ requires only fast forward- and back-substitution!" />
        </p>

        <div className="geom-presets">
          {stepsData.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              className={`btn btn-sm ${step === idx ? 'btn-primary' : ''}`}
              onClick={() => setStep(idx)}
            >
              Step {idx}: {s.title}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--s4)', alignItems: 'center' }}>
          {/* L Matrix */}
          <div className="card" style={{ padding: 'var(--s3)', textAlign: 'center' }}>
            <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--s2)' }}>
              Unit Lower Triangular $L$:
            </strong>
            <div className="matrix-wrap">
              <div className="matrix-bracket">
                <div className="matrix-grid" style={{ gridTemplateColumns: 'repeat(3, 2.5rem)' }}>
                  {cur.L.map((row, r) =>
                    row.map((cell, c) => (
                      <div
                        key={`l-${r}-${c}`}
                        className={`matrix-cell ${cell === '?' ? 'target-op' : cell !== '0' ? 'pivot' : ''}`}
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-3)', marginTop: 'var(--s1)' }}>
              Stores row multipliers
            </div>
          </div>

          {/* U Matrix */}
          <div className="card" style={{ padding: 'var(--s3)', textAlign: 'center' }}>
            <strong style={{ color: '#059669', display: 'block', marginBottom: 'var(--s2)' }}>
              Upper Triangular $U$:
            </strong>
            <div className="matrix-wrap">
              <div className="matrix-bracket">
                <div className="matrix-grid" style={{ gridTemplateColumns: 'repeat(3, 2.5rem)' }}>
                  {cur.U.map((row, r) =>
                    row.map((cell, c) => (
                      <div
                        key={`u-${r}-${c}`}
                        className={`matrix-cell ${r <= c && cell !== '0' ? 'active-op' : ''}`}
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-3)', marginTop: 'var(--s1)' }}>
              Row echelon form
            </div>
          </div>
        </div>

        <div className="step-note-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <strong>{cur.title}:</strong>
            <span className="chip ok"><Tex tex={cur.op} /></span>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--t-sm)', color: 'var(--ink-2)' }}>
            {cur.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
