import { useState } from 'react';
import { Math as Tex, Rich } from '../lib/rich';

interface Preset {
  name: string;
  a: number;
  b: number;
  c: number;
  d: number;
  desc: string;
}

const PRESETS: Preset[] = [
  { name: 'Identity (No change)', a: 1, b: 0, c: 0, d: 1, desc: 'Every vector remains in place.' },
  { name: 'Rotate 90° CCW', a: 0, b: -1, c: 1, d: 0, desc: 'Rotates the plane 90 degrees counterclockwise.' },
  { name: 'Rotate 45° CCW', a: 0.71, b: -0.71, c: 0.71, d: 0.71, desc: 'Rotates by pi/4 (approx sqrt(2)/2).' },
  { name: 'Horizontal Shear', a: 1, b: 1.5, c: 0, d: 1, desc: 'Slides horizontal lines parallel to the x-axis.' },
  { name: 'Vertical Shear', a: 1, b: 0, c: 1, d: 1, desc: 'Slides vertical lines parallel to the y-axis.' },
  { name: 'Reflection across y-axis', a: -1, b: 0, c: 0, d: 1, desc: 'Negates x coordinate: T([x,y]) = [-x,y].' },
  { name: 'Reflection across line y = x', a: 0, b: 1, c: 1, d: 0, desc: 'Swaps coordinates: T([x,y]) = [y,x].' },
  { name: 'Projection onto x-axis', a: 1, b: 0, c: 0, d: 0, desc: 'Flattens plane onto line (det = 0, singular).' },
  { name: 'Non-uniform Scaling', a: 2, b: 0, c: 0, d: 0.5, desc: 'Stretches x by 2, compresses y by 0.5 (area preserved).' },
];

export function MatrixExplorer() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);

  const det = a * d - b * c;
  const detRounded = Math.round(det * 1000) / 1000;

  // Coordinate system mapping: center is at (175, 175), 1 unit = 50px
  const cx = 175;
  const cy = 175;
  const scale = 50;

  const toSvgX = (x: number) => cx + x * scale;
  const toSvgY = (y: number) => cy - y * scale;

  // Transformed corners of unit square: (0,0), (1,0), (1,1), (0,1)
  // (0,0) -> (0,0)
  // (1,0) -> (a, c) = T(e1)
  // (0,1) -> (b, d) = T(e2)
  // (1,1) -> (a+b, c+d)
  const p0 = `${toSvgX(0)},${toSvgY(0)}`;
  const p1 = `${toSvgX(a)},${toSvgY(c)}`;
  const p2 = `${toSvgX(a + b)},${toSvgY(c + d)}`;
  const p3 = `${toSvgX(b)},${toSvgY(d)}`;

  const u0 = `${toSvgX(0)},${toSvgY(0)}`;
  const u1 = `${toSvgX(1)},${toSvgY(0)}`;
  const u2 = `${toSvgX(1)},${toSvgY(1)}`;
  const u3 = `${toSvgX(0)},${toSvgY(1)}`;

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>2D Linear Transformation Visualizer</h3>
        <span className="widget-badge">Section 1.8 & 1.9</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          <Rich text="Any $2 \times 2$ matrix $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ defines a linear transformation $T(\vec{x}) = A\vec{x}$. The columns of $A$ are simply where the standard basis vectors land: $T(\vec{e}_1) = \begin{bmatrix} a \\ c \end{bmatrix}$ and $T(\vec{e}_2) = \begin{bmatrix} b \\ d \end{bmatrix}$." />
        </p>

        <div className="geom-presets">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              className="btn btn-sm"
              onClick={() => {
                setA(p.a);
                setB(p.b);
                setC(p.c);
                setD(p.d);
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s5)', alignItems: 'center' }}>
          {/* Canvas SVG */}
          <div className="geom-canvas-wrap">
            <svg viewBox="0 0 350 350" aria-label="2D coordinate transformation grid">
              <defs>
                <marker id="arrow-e1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                </marker>
                <marker id="arrow-e2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
                </marker>
              </defs>

              {/* Grid lines */}
              {[-3, -2, -1, 1, 2, 3].map((n) => (
                <g key={n} opacity="0.18" stroke="currentColor">
                  <line x1={toSvgX(n)} y1={0} x2={toSvgX(n)} y2={350} strokeDasharray="3 3" />
                  <line x1={0} y1={toSvgY(n)} x2={350} y2={toSvgY(n)} strokeDasharray="3 3" />
                </g>
              ))}

              {/* Coordinate Axes */}
              <line x1={0} y1={cy} x2={350} y2={cy} stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <line x1={cx} y1={0} x2={cx} y2={350} stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

              {/* Original Unit Square */}
              <polygon points={`${u0} ${u1} ${u2} ${u3}`} fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.35" />

              {/* Transformed Parallelogram */}
              <polygon
                points={`${p0} ${p1} ${p2} ${p3}`}
                fill={det === 0 ? 'none' : det > 0 ? 'rgba(37, 99, 235, 0.18)' : 'rgba(220, 38, 38, 0.18)'}
                stroke={det === 0 ? '#d97706' : '#2563eb'}
                strokeWidth="2"
              />

              {/* T(e1) vector in Blue */}
              <line x1={cx} y1={cy} x2={toSvgX(a)} y2={toSvgY(c)} stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrow-e1)" />
              {/* T(e2) vector in Red */}
              <line x1={cx} y1={cy} x2={toSvgX(b)} y2={toSvgY(d)} stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrow-e2)" />

              {/* Labels */}
              <text x={toSvgX(a) + 6} y={toSvgY(c) - 4} fill="#2563eb" fontSize="12" fontWeight="700">
                T(e₁)
              </text>
              <text x={toSvgX(b) + 6} y={toSvgY(d) - 4} fill="#dc2626" fontSize="12" fontWeight="700">
                T(e₂)
              </text>
            </svg>
          </div>

          {/* Matrix Controls & Details */}
          <div style={{ display: 'grid', gap: 'var(--s3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--t-lg)' }}>Matrix $A$:</span>
              <div className="matrix-wrap">
                <div className="matrix-bracket">
                  <div className="matrix-grid" style={{ gridTemplateColumns: 'repeat(2, 3.2rem)' }}>
                    <input
                      type="number"
                      step="0.1"
                      value={a}
                      onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3.2rem', textAlign: 'center' }}
                      title="a = T(e1)_1"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={b}
                      onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3.2rem', textAlign: 'center' }}
                      title="b = T(e2)_1"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={c}
                      onChange={(e) => setC(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3.2rem', textAlign: 'center' }}
                      title="c = T(e1)_2"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={d}
                      onChange={(e) => setD(parseFloat(e.target.value) || 0)}
                      className="matrix-cell"
                      style={{ border: '1px solid var(--line-strong)', width: '3.2rem', textAlign: 'center' }}
                      title="d = T(e2)_2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="step-note-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <strong>Determinant / Area Scale:</strong>
                <span className={`chip ${det === 0 ? 'bad' : 'ok'}`} style={{ fontWeight: 700 }}>
                  det(A) = {detRounded}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--t-sm)', color: 'var(--ink-2)' }}>
                {det === 0 ? (
                  <span>Matrix is <strong>singular</strong> (not invertible). It squashes the 2D plane into a 1D line or point.</span>
                ) : det > 0 ? (
                  <span>Orientation preserved. Unit square area scaled by <strong>{Math.abs(detRounded)}</strong>.</span>
                ) : (
                  <span>Orientation <strong>reversed</strong> (flipped reflection). Area scaled by <strong>{Math.abs(detRounded)}</strong>.</span>
                )}
              </p>
            </div>

            <div className="geom-legend">
              <span className="geom-legend-item">
                <span className="geom-legend-dot" style={{ background: '#2563eb' }} />
                <span><Rich text={`$T(\\vec{e}_1) = [${a}, ${c}]^T$ (Column 1)`} /></span>
              </span>
              <span className="geom-legend-item">
                <span className="geom-legend-dot" style={{ background: '#dc2626' }} />
                <span><Rich text={`$T(\\vec{e}_2) = [${b}, ${d}]^T$ (Column 2)`} /></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
