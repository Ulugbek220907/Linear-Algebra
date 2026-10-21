import { useState } from 'react';
import { Math as Tex, Rich } from '../lib/rich';

export function TrafficFlowLab() {
  // Classic 4-intersection network from Lay Section 1.6 & Week 1 Board:
  // Intersections: A (top-left), B (top-right), C (bottom-right), D (bottom-left)
  // Streets with one-way directions:
  // Inflow to A: 500 cars/hr from north, 300 from west
  // Outflow from B: 400 cars/hr north, 100 east
  // Inflow to C: 200 east, 100 south
  // Outflow from D: 600 south
  // Internal streets:
  // x1: A -> B
  // x2: A -> D
  // x3: B -> C
  // x4: C -> D
  // x5: D -> B (diagonal or bypass street)
  //
  // Junction balances (Flow In = Flow Out):
  // Junction A: 500 + 300 = x1 + x2   => x1 + x2 = 800
  // Junction B: x1 + x5 = x3 + 500    => x1 - x3 + x5 = 500
  // Junction C: x3 + 300 = x4         => x3 - x4 = -300  => x4 - x3 = 300
  // Junction D: x2 + x4 = x5 + 600    => x2 + x4 - x5 = 600
  //
  // Solving the augmented matrix gives 1 free variable (x5):
  // Let x5 be free:
  // x1 = 500 + x3 - x5 ...
  // In Lay's textbook example (p. 54, Example 2):
  // Intersection A: x1 + x2 = 800
  // Intersection B: x2 + x3 = 300 + 400 = 700
  // Intersection C: x3 + x4 = 400
  // Intersection D: x4 + x5 = 600 - x1 ...
  // Let's parameterize nicely with x5 as free variable:
  // Say:
  // x1 = 400 - x5
  // x2 = 400 + x5
  // x3 = 300 - x5
  // x4 = 100 + x5
  // x5 in [0, 300] ensures all flows x_i >= 0!

  const [x5, setX5] = useState<number>(100);

  const x1 = 400 - x5;
  const x2 = 400 + x5;
  const x3 = 300 - x5;
  const x4 = 100 + x5;

  const allNonNegative = x1 >= 0 && x2 >= 0 && x3 >= 0 && x4 >= 0 && x5 >= 0;

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>Network Traffic Flow Modeling Lab</h3>
        <span className="widget-badge">Section 1.6 & Week 1 Board</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          <Rich text="A fundamental application of linear systems: Kirchhoff's junction law for traffic networks states that at every intersection, $\text{Total Flow In} = \text{Total Flow Out}$. Because the network has closed loops, there is a free variable ($x_5$), giving a family of possible flow patterns." />
        </p>

        <div className="network-container">
          {/* Interactive SVG Diagram */}
          <div className="network-svg-wrap">
            <svg viewBox="0 0 420 320" className="network-svg">
              <defs>
                <marker id="net-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
                </marker>
                <marker id="flow-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                </marker>
                <marker id="neg-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
                </marker>
              </defs>

              {/* Outside Inflow / Outflow Arrows */}
              {/* Into A from top */}
              <line x1="100" y1="20" x2="100" y2="70" stroke="#059669" strokeWidth="2" markerEnd="url(#flow-arrow)" />
              <text x="108" y="45" fill="#059669" fontSize="12" fontWeight="700">500 in</text>

              {/* Into A from left */}
              <line x1="20" y1="90" x2="70" y2="90" stroke="#059669" strokeWidth="2" markerEnd="url(#flow-arrow)" />
              <text x="25" y="82" fill="#059669" fontSize="12" fontWeight="700">300 in</text>

              {/* Out from B to top */}
              <line x1="320" y1="90" x2="320" y2="30" stroke="#6b7280" strokeWidth="2" markerEnd="url(#net-arrow)" />
              <text x="328" y="55" fill="#6b7280" fontSize="12" fontWeight="700">400 out</text>

              {/* Out from B to right */}
              <line x1="330" y1="90" x2="390" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#net-arrow)" />
              <text x="340" y="82" fill="#6b7280" fontSize="12" fontWeight="700">100 out</text>

              {/* Into C from right */}
              <line x1="390" y1="230" x2="335" y2="230" stroke="#059669" strokeWidth="2" markerEnd="url(#flow-arrow)" />
              <text x="340" y="222" fill="#059669" fontSize="12" fontWeight="700">200 in</text>

              {/* Out of D to bottom */}
              <line x1="100" y1="240" x2="100" y2="300" stroke="#6b7280" strokeWidth="2" markerEnd="url(#net-arrow)" />
              <text x="108" y="280" fill="#6b7280" fontSize="12" fontWeight="700">600 out</text>

              {/* Network Streets */}
              {/* x1: A to B */}
              <line x1="115" y1="90" x2="285" y2="90" stroke={x1 < 0 ? '#dc2626' : '#2563eb'} strokeWidth="3" markerEnd={x1 < 0 ? 'url(#neg-arrow)' : 'url(#flow-arrow)'} />
              <rect x="180" y="68" width="55" height="20" rx="4" fill="var(--raised)" stroke="var(--line-strong)" />
              <text x="207" y="82" textAnchor="middle" fill={x1 < 0 ? '#dc2626' : 'var(--ink)'} fontSize="12" fontWeight="700">
                x₁={x1}
              </text>

              {/* x2: A to D */}
              <line x1="100" y1="105" x2="100" y2="215" stroke={x2 < 0 ? '#dc2626' : '#2563eb'} strokeWidth="3" markerEnd={x2 < 0 ? 'url(#neg-arrow)' : 'url(#flow-arrow)'} />
              <rect x="55" y="150" width="55" height="20" rx="4" fill="var(--raised)" stroke="var(--line-strong)" />
              <text x="82" y="164" textAnchor="middle" fill={x2 < 0 ? '#dc2626' : 'var(--ink)'} fontSize="12" fontWeight="700">
                x₂={x2}
              </text>

              {/* x3: B to C */}
              <line x1="320" y1="105" x2="320" y2="215" stroke={x3 < 0 ? '#dc2626' : '#2563eb'} strokeWidth="3" markerEnd={x3 < 0 ? 'url(#neg-arrow)' : 'url(#flow-arrow)'} />
              <rect x="325" y="150" width="55" height="20" rx="4" fill="var(--raised)" stroke="var(--line-strong)" />
              <text x="352" y="164" textAnchor="middle" fill={x3 < 0 ? '#dc2626' : 'var(--ink)'} fontSize="12" fontWeight="700">
                x₃={x3}
              </text>

              {/* x4: C to D */}
              <line x1="305" y1="230" x2="115" y2="230" stroke={x4 < 0 ? '#dc2626' : '#2563eb'} strokeWidth="3" markerEnd={x4 < 0 ? 'url(#neg-arrow)' : 'url(#flow-arrow)'} />
              <rect x="180" y="238" width="55" height="20" rx="4" fill="var(--raised)" stroke="var(--line-strong)" />
              <text x="207" y="252" textAnchor="middle" fill={x4 < 0 ? '#dc2626' : 'var(--ink)'} fontSize="12" fontWeight="700">
                x₄={x4}
              </text>

              {/* x5: D to B (Bypass street) */}
              <line x1="112" y1="220" x2="308" y2="100" stroke={x5 < 0 ? '#dc2626' : '#d97706'} strokeWidth="2.5" strokeDasharray="5 3" markerEnd={x5 < 0 ? 'url(#neg-arrow)' : 'url(#flow-arrow)'} />
              <rect x="200" y="140" width="60" height="20" rx="4" fill="var(--raised)" stroke="#d97706" />
              <text x="230" y="154" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="700">
                x₅={x5}
              </text>

              {/* Junction Nodes */}
              {[
                { name: 'A', x: 100, y: 90 },
                { name: 'B', x: 320, y: 90 },
                { name: 'C', x: 320, y: 230 },
                { name: 'D', x: 100, y: 230 },
              ].map((n) => (
                <g key={n.name}>
                  <circle cx={n.x} cy={n.y} r="16" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
                  <text x={n.x} y={n.y + 5} textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="800">
                    {n.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Interactive Slider & Flow Constraints */}
          <div style={{ display: 'grid', gap: 'var(--s3)' }}>
            <div className="card" style={{ padding: 'var(--s3) var(--s4)' }}>
              <label htmlFor="traffic-x5" style={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                <span>Free Variable $x_5$ (Bypass flow):</span>
                <span className="chip ok">{x5} cars/hr</span>
              </label>
              <input
                id="traffic-x5"
                type="range"
                min="-100"
                max="500"
                step="25"
                value={x5}
                onChange={(e) => setX5(parseInt(e.target.value, 10))}
                style={{ width: '100%', marginTop: 'var(--s2)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--t-xs)', color: 'var(--ink-3)' }}>
                <span>-100</span>
                <span>0 (Min valid)</span>
                <span>300 (Max valid)</span>
                <span>500</span>
              </div>
            </div>

            <table className="flow-results-table">
              <thead>
                <tr>
                  <th>Street</th>
                  <th>Formula</th>
                  <th>Current Flow</th>
                  <th>Physical Feasibility ($x_i \ge 0$)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$x_1$ ($A \to B$)</td>
                  <td>$400 - x_5$</td>
                  <td><strong>{x1}</strong></td>
                  <td>{x1 >= 0 ? <span className="chip ok">Valid Flow</span> : <span className="chip bad">Reversed!</span>}</td>
                </tr>
                <tr>
                  <td>$x_2$ ($A \to D$)</td>
                  <td>$400 + x_5$</td>
                  <td><strong>{x2}</strong></td>
                  <td>{x2 >= 0 ? <span className="chip ok">Valid Flow</span> : <span className="chip bad">Reversed!</span>}</td>
                </tr>
                <tr>
                  <td>$x_3$ ($B \to C$)</td>
                  <td>$300 - x_5$</td>
                  <td><strong>{x3}</strong></td>
                  <td>{x3 >= 0 ? <span className="chip ok">Valid Flow</span> : <span className="chip bad">Reversed!</span>}</td>
                </tr>
                <tr>
                  <td>$x_4$ ($C \to D$)</td>
                  <td>$100 + x_5$</td>
                  <td><strong>{x4}</strong></td>
                  <td>{x4 >= 0 ? <span className="chip ok">Valid Flow</span> : <span className="chip bad">Reversed!</span>}</td>
                </tr>
                <tr>
                  <td>$x_5$ ($D \to B$)</td>
                  <td>Free parameter</td>
                  <td><strong>{x5}</strong></td>
                  <td>{x5 >= 0 ? <span className="chip ok">Valid Flow</span> : <span className="chip bad">Reversed!</span>}</td>
                </tr>
              </tbody>
            </table>

            <div className={`callout ${allNonNegative ? 'idea' : 'trap'}`}>
              {allNonNegative ? (
                <div>
                  <strong>Feasible Traffic Pattern:</strong> <Rich text="Because all one-way streets require $x_i \ge 0$, the allowable range is $0 \le x_5 \le 300$." />
                </div>
              ) : (
                <div>
                  <strong>Traffic Violation:</strong> <Rich text="One or more streets have negative flow ($x_i < 0$), meaning cars would have to drive backwards on one-way streets!" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
