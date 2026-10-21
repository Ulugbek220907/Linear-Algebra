import { useState } from 'react';
import { Math as Tex, Rich } from '../lib/rich';

export function DeterminantLab() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);
  const [d, setD] = useState(2);

  const det2 = a * d - b * c;
  const area = Math.abs(det2);

  const cx = 175;
  const cy = 175;
  const scale = 35;

  const toSvgX = (x: number) => cx + x * scale;
  const toSvgY = (y: number) => cy - y * scale;

  // Parallelogram corners: (0,0), (a, c), (a+b, c+d), (b, d)
  const p0 = `${toSvgX(0)},${toSvgY(0)}`;
  const p1 = `${toSvgX(a)},${toSvgY(c)}`;
  const p2 = `${toSvgX(a + b)},${toSvgY(c + d)}`;
  const p3 = `${toSvgX(b)},${toSvgY(d)}`;

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>Determinant & Geometric Area Lab</h3>
        <span className="widget-badge">Section 3.1, 3.2 & 3.3</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          <Rich text="The determinant of a $2 \times 2$ matrix $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ is $\det A = ad - bc$. Geometrically, $|\det A|$ equals the **exact area** of the parallelogram formed by its column vectors $\vec{u}$ and $\vec{v}$." />
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s5)', alignItems: 'center' }}>
          {/* Canvas */}
          <div className="geom-canvas-wrap">
            <svg viewBox="0 0 350 350" aria-label="Parallelogram area determinant visualization">
              <defs>
                <marker id="det-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                </marker>
                <marker id="det-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#059669" />
                </marker>
              </defs>

              {/* Grid */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((n) => (
                <g key={n} opacity="0.15" stroke="currentColor">
                  <line x1={toSvgX(n)} y1={0} x2={toSvgX(n)} y2={350} strokeDasharray="2 2" />
                  <line x1={0} y1={toSvgY(n)} x2={350} y2={toSvgY(n)} strokeDasharray="2 2" />
                </g>
              ))}

              {/* Axes */}
              <line x1={0} y1={cy} x2={350} y2={cy} stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
              <line x1={cx} y1={0} x2={cx} y2={350} stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

              {/* Parallelogram Body */}
              <polygon
                points={`${p0} ${p1} ${p2} ${p3}`}
                fill={det2 === 0 ? 'none' : det2 > 0 ? 'rgba(37, 99, 235, 0.22)' : 'rgba(220, 38, 38, 0.22)'}
                stroke={det2 === 0 ? '#d97706' : '#2563eb'}
                strokeWidth="2"
              />

              {/* Vector u (col 1) */}
              <line x1={cx} y1={cy} x2={toSvgX(a)} y2={toSvgY(c)} stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#det-u)" />
              {/* Vector v (col 2) */}
              <line x1={cx} y1={cy} x2={toSvgX(b)} y2={toSvgY(d)} stroke="#059669" strokeWidth="2.5" markerEnd="url(#det-v)" />

              {/* Labels */}
              <text x={toSvgX(a) + 6} y={toSvgY(c) - 4} fill="#2563eb" fontSize="12" fontWeight="700">
                u=[{a},{c}]
              </text>
              <text x={toSvgX(b) + 6} y={toSvgY(d) - 4} fill="#059669" fontSize="12" fontWeight="700">
                v=[{b},{d}]
              </text>
            </svg>
          </div>

          {/* Matrix inputs and calculations */}
          <div style={{ display: 'grid', gap: 'var(--s3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
              <span style={{ fontWeight: 700 }}>Matrix $A$:</span>
              <div className="matrix-wrap">
                <div className="matrix-bracket">
                  <div className="matrix-grid" style={{ gridTemplateColumns: 'repeat(2, 3rem)' }}>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3rem', textAlign: 'center' }}
                    />
                    <input
                      type="number"
                      value={b}
                      onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3rem', textAlign: 'center' }}
                    />
                    <input
                      type="number"
                      value={c}
                      onChange={(e) => setC(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3rem', textAlign: 'center' }}
                    />
                    <input
                      type="number"
                      value={d}
                      onChange={(e) => setD(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3rem', textAlign: 'center' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="step-note-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <strong>Formula Calculation:</strong>
                <span className={`chip ${det2 === 0 ? 'bad' : 'ok'}`} style={{ fontWeight: 700 }}>
                  det(A) = {det2}
                </span>
              </div>
              <div>
                <Tex tex={`\\det A = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det2}`} />
              </div>
              <div style={{ marginTop: '0.35rem', fontSize: 'var(--t-xs)', color: 'var(--ink-2)' }}>
                Parallelogram Area = $|\det A| =$ <strong>{area}</strong> sq units.
              </div>
            </div>

            {/* Properties summary */}
            <div style={{ fontSize: 'var(--t-sm)', borderTop: '1px solid var(--line-strong)', paddingTop: 'var(--s3)' }}>
              <strong>Key Theorem Properties:</strong>
              <ul style={{ paddingLeft: '1.2rem', margin: 'var(--s1) 0 0 0', display: 'grid', gap: '0.2rem' }}>
                <li><Rich text="$\det(AB) = \det(A)\det(B)$ (Multiplicative property)" /></li>
                <li><Rich text="$\det(A^{-1}) = \frac{1}{\det A}$ (Inverse property)" /></li>
                <li><Rich text="$\det(A^T) = \det(A)$ (Transpose property)" /></li>
                <li><Rich text="$\det(cA) = c^n \det(A)$ for $n \times n$ matrix!" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
