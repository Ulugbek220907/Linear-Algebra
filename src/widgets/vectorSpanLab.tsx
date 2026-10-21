import { useState } from 'react';
import { Math as Tex, Rich } from '../lib/rich';

export function VectorSpanLab() {
  const [v1, setV1] = useState<[number, number]>([2, 1]);
  const [v2, setV2] = useState<[number, number]>([1, 2]);
  const [c1, setC1] = useState<number>(1.5);
  const [c2, setC2] = useState<number>(-0.5);

  // Resulting vector v = c1*v1 + c2*v2
  const vx = Math.round((c1 * v1[0] + c2 * v2[0]) * 100) / 100;
  const vy = Math.round((c1 * v1[1] + c2 * v2[1]) * 100) / 100;

  // Independence check: det([v1 v2]) != 0
  const det = v1[0] * v2[1] - v1[1] * v2[0];
  const isIndependent = Math.abs(det) > 1e-5;

  const cx = 175;
  const cy = 175;
  const scale = 32;

  const toSvgX = (x: number) => cx + x * scale;
  const toSvgY = (y: number) => cy - y * scale;

  // Intermediate points for parallelogram addition:
  // (0,0) -> c1*v1 -> c1*v1 + c2*v2
  const pStart = `${cx},${cy}`;
  const pC1 = `${toSvgX(c1 * v1[0])},${toSvgY(c1 * v1[1])}`;
  const pSum = `${toSvgX(vx)},${toSvgY(vy)}`;
  const pC2 = `${toSvgX(c2 * v2[0])},${toSvgY(c2 * v2[1])}`;

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>Vector Linear Combinations & Span Visualizer</h3>
        <span className="widget-badge">Section 1.3 & 1.7</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          <Rich text="A vector $\vec{y}$ is a linear combination of $\vec{v}_1, \vec{v}_2$ if $\vec{y} = c_1\vec{v}_1 + c_2\vec{v}_2$ for some scalars $c_1, c_2$. The collection of all such linear combinations is called $\operatorname{Span}\{\vec{v}_1, \vec{v}_2\}$." />
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s5)', alignItems: 'center' }}>
          {/* Canvas */}
          <div className="geom-canvas-wrap">
            <svg viewBox="0 0 350 350" aria-label="Vector addition and span plane">
              <defs>
                <marker id="arrow-v1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                </marker>
                <marker id="arrow-v2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#059669" />
                </marker>
                <marker id="arrow-sum" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                </marker>
              </defs>

              {/* Grid lines */}
              {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((n) => (
                <g key={n} opacity="0.15" stroke="currentColor">
                  <line x1={toSvgX(n)} y1={0} x2={toSvgX(n)} y2={350} strokeDasharray="2 2" />
                  <line x1={0} y1={toSvgY(n)} x2={350} y2={toSvgY(n)} strokeDasharray="2 2" />
                </g>
              ))}

              {/* Axes */}
              <line x1={0} y1={cy} x2={350} y2={cy} stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
              <line x1={cx} y1={0} x2={cx} y2={350} stroke="currentColor" strokeWidth="1.2" opacity="0.4" />

              {/* Parallelogram Addition Dashed Lines */}
              <line x1={toSvgX(c1 * v1[0])} y1={toSvgY(c1 * v1[1])} x2={toSvgX(vx)} y2={toSvgY(vy)} stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
              <line x1={toSvgX(c2 * v2[0])} y1={toSvgY(c2 * v2[1])} x2={toSvgX(vx)} y2={toSvgY(vy)} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

              {/* Scaled v1 (Blue) */}
              <line x1={cx} y1={cy} x2={toSvgX(c1 * v1[0])} y2={toSvgY(c1 * v1[1])} stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrow-v1)" />

              {/* Scaled v2 (Green) */}
              <line x1={cx} y1={cy} x2={toSvgX(c2 * v2[0])} y2={toSvgY(c2 * v2[1])} stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrow-v2)" />

              {/* Linear Combination Result v (Purple) */}
              <line x1={cx} y1={cy} x2={toSvgX(vx)} y2={toSvgY(vy)} stroke="#7c3aed" strokeWidth="3.5" markerEnd="url(#arrow-sum)" />

              {/* Labels */}
              <text x={toSvgX(c1 * v1[0]) + 6} y={toSvgY(c1 * v1[1]) - 4} fill="#2563eb" fontSize="12" fontWeight="700">
                c₁v₁
              </text>
              <text x={toSvgX(c2 * v2[0]) + 6} y={toSvgY(c2 * v2[1]) - 4} fill="#059669" fontSize="12" fontWeight="700">
                c₂v₂
              </text>
              <text x={toSvgX(vx) + 8} y={toSvgY(vy) + 4} fill="#7c3aed" fontSize="13" fontWeight="800">
                y
              </text>
            </svg>
          </div>

          {/* Controls & Math Info */}
          <div style={{ display: 'grid', gap: 'var(--s3)' }}>
            <div className="card" style={{ padding: 'var(--s3) var(--s4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700 }}>Scalar Weight $c_1$:</span>
                <span className="chip ok">{c1}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={c1}
                onChange={(e) => setC1(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="card" style={{ padding: 'var(--s3) var(--s4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700 }}>Scalar Weight $c_2$:</span>
                <span className="chip ok">{c2}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={c2}
                onChange={(e) => setC2(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="step-note-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <strong>Linear Independence Status:</strong>
                <span className={`chip ${isIndependent ? 'ok' : 'bad'}`}>
                  {isIndependent ? 'Linearly Independent' : 'Linearly Dependent (Collinear)'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--t-sm)', color: 'var(--ink-2)' }}>
                {isIndependent ? (
                  <Rich text="$\operatorname{Span}\{\vec{v}_1, \vec{v}_2\} = \mathbb{R}^2$ (the entire 2D plane). Any vector in $\mathbb{R}^2$ can be uniquely formed." />
                ) : (
                  <Rich text="$\vec{v}_1$ and $\vec{v}_2$ are multiples of each other. Their span is only a **line through the origin**." />
                )}
              </p>
            </div>

            <div style={{ fontSize: 'var(--t-sm)', padding: 'var(--s2) var(--s3)', background: 'var(--panel)', borderRadius: 'var(--r)' }}>
              <strong>Resulting Combination:</strong>
              <div>
                <Tex tex={`\\vec{y} = ${c1}\\begin{bmatrix} ${v1[0]} \\\\ ${v1[1]} \\end{bmatrix} + ${c2}\\begin{bmatrix} ${v2[0]} \\\\ ${v2[1]} \\end{bmatrix} = \\begin{bmatrix} ${vx} \\\\ ${vy} \\end{bmatrix}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
