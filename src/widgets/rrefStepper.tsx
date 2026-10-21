import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { Frac } from '../engine/fraction';
import { rowReduceSteps, solveSystem, toAugmentedTex } from '../engine/matrix';
import { Math as Tex, Rich } from '../lib/rich';

interface ProblemPreset {
  name: string;
  source: string;
  matrix: number[][];
  numVars: number;
}

const PRESETS: ProblemPreset[] = [
  {
    name: 'Board Problem (Free Variable)',
    source: 'Board Photo 21-27-46',
    matrix: [
      [1, -2, -1, 3],
      [3, -6, -2, 2],
    ],
    numVars: 3,
  },
  {
    name: '3x4 Standard System (Unique Solution)',
    source: 'Lay Section 1.2 Example 1',
    matrix: [
      [1, 0, -5, 1],
      [0, 1, 1, 4],
      [0, 0, 0, 0],
    ],
    numVars: 3,
  },
  {
    name: 'Inconsistent System (0 = 1 contradiction)',
    source: 'Lay Section 1.2 Example 4',
    matrix: [
      [1, -1, 2, 4],
      [2, -2, 5, 11],
      [-1, 1, -2, -3],
    ],
    numVars: 3,
  },
  {
    name: 'Two Free Variables (Plane in R³)',
    source: 'Lay Section 1.5 Board Lecture',
    matrix: [
      [1, 2, -1, 5],
      [2, 4, -2, 10],
      [-1, -2, 1, -5],
    ],
    numVars: 3,
  },
];

export function RrefStepper() {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const current = PRESETS[selectedPreset];

  const fracMatrix = current.matrix.map((row) => row.map((v) => new Frac(v)));
  const reduction = rowReduceSteps(fracMatrix, true);
  const totalSteps = reduction.steps.length;

  const [stepIdx, setStepIdx] = useState<number>(0);
  const activeStep = reduction.steps[Math.min(stepIdx, totalSteps - 1)];

  const finalMat = reduction.rref;
  const sol = solveSystem(finalMat, current.numVars);

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>Gauss-Jordan Row Elimination Stepper</h3>
        <span className="widget-badge">Section 1.1 & 1.2</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          Step through the exact Elementary Row Operations ($R_i \leftrightarrow R_j$, $c R_i \to R_i$, $R_i + c R_j \to R_i$) to reduce any augmented matrix to Reduced Row Echelon Form (RREF).
        </p>

        <div className="geom-presets">
          {PRESETS.map((p, idx) => (
            <button
              key={p.name}
              type="button"
              className={`btn btn-sm ${selectedPreset === idx ? 'btn-primary' : ''}`}
              onClick={() => {
                setSelectedPreset(idx);
                setStepIdx(0);
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Current Matrix State Display */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s3)', margin: 'var(--s2) 0' }}>
          <div className="matrix-wrap">
            <div className="matrix-bracket">
              <div
                className="matrix-grid"
                style={{
                  gridTemplateColumns: `repeat(${activeStep.matrix[0].length}, minmax(2.8rem, auto))`,
                }}
              >
                {activeStep.matrix.map((row: Frac[], r: number) =>
                  row.map((val: Frac, c: number) => {
                    const isAugCol = c === row.length - 1;
                    const isPivot = activeStep.pivots.some((p: { r: number; c: number }) => p.r === r && p.c === c);
                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`matrix-cell ${isPivot ? 'pivot' : ''} ${isAugCol ? 'matrix-aug-divider' : ''}`}
                      >
                        <Tex tex={val.toTex()} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="step-note-box" style={{ width: '100%', maxWidth: '38rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <strong>Step {stepIdx + 1} of {totalSteps}:</strong>
              {activeStep.texOp && <span className="chip ok"><Tex tex={activeStep.texOp} /></span>}
            </div>
            <div>{activeStep.explanation}</div>
          </div>

          {/* Stepper Navigation */}
          <div className="stepper-nav">
            <button
              type="button"
              className="btn btn-sm"
              disabled={stepIdx === 0}
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            >
              <ChevronLeft /> Previous
            </button>
            <span className="stepper-count">
              {stepIdx + 1} / {totalSteps}
            </span>
            <button
              type="button"
              className="btn btn-sm"
              disabled={stepIdx === totalSteps - 1}
              onClick={() => setStepIdx((i) => Math.min(totalSteps - 1, i + 1))}
            >
              Next <ChevronRight />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setStepIdx(totalSteps - 1)}
              title="Jump directly to final RREF"
            >
              <Sparkles /> Jump to RREF
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setStepIdx(0)}
              title="Reset to beginning"
            >
              <RotateCcw /> Reset
            </button>
          </div>
        </div>

        {/* 3 Answer Forms Box */}
        {stepIdx === totalSteps - 1 && (
          <div style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 'var(--s4)' }}>
            <h4 style={{ margin: '0 0 var(--s3) 0', fontSize: 'var(--t-md)' }}>
              The 3 Solution Formats (As taught on the Professor's Board)
            </h4>

            {sol.kind === 'inconsistent' ? (
              <div className="callout trap">
                <strong>Inconsistent System:</strong> <Rich text="There is a row $\begin{bmatrix} 0 & \dots & 0 & b \end{bmatrix}$ with $b \ne 0$. No solution exists ($0 = 1$ contradiction)." />
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 'var(--s3)' }}>
                {/* 1. System Form */}
                <div className="card" style={{ padding: 'var(--s3) var(--s4)' }}>
                  <div style={{ fontWeight: 700, fontSize: 'var(--t-sm)', color: 'var(--ink-2)', marginBottom: '0.25rem' }}>
                    1. System Form (Express basic variables in terms of free variables):
                  </div>
                  <div>
                    <Tex tex={sol.systemFormTex} display />
                  </div>
                </div>

                {/* 2. Vector Form */}
                <div className="card" style={{ padding: 'var(--s3) var(--s4)' }}>
                  <div style={{ fontWeight: 700, fontSize: 'var(--t-sm)', color: 'var(--ink-2)', marginBottom: '0.25rem' }}>
                    2. Vector Form (Single column vector of formulas):
                  </div>
                  <div>
                    <Tex tex={sol.vectorFormTex} display />
                  </div>
                </div>

                {/* 3. Parametric Vector Form */}
                <div className="card" style={{ padding: 'var(--s3) var(--s4)', borderLeft: '4px solid var(--accent)' }}>
                  <div style={{ fontWeight: 700, fontSize: 'var(--t-sm)', color: 'var(--accent)', marginBottom: '0.25rem' }}>
                    <Rich text="3. Parametric Vector Form ($\vec{x} = \vec{p} + s_1\vec{u}_1 + \dots$):" />
                  </div>
                  <div>
                    <Tex tex={sol.parametricTex} display />
                  </div>
                  <p style={{ margin: '0.35rem 0 0 0', fontSize: 'var(--t-xs)', color: 'var(--ink-2)' }}>
                    <Rich text="Here $\vec{p}$ is a particular solution to $A\vec{x} = \vec{b}$, and the vectors multiplied by free variables span the null space $\operatorname{Nul} A$." />
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
