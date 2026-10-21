import { Frac } from './fraction';

export interface RowOp {
  type: 'swap' | 'scale' | 'replace';
  i: number; // 0-indexed row
  j?: number; // 0-indexed row
  factor?: Frac;
  explanation: string;
  texOp: string;
  matrixAfter: Frac[][];
}

export interface ParametricSolution {
  consistent: boolean;
  unique: boolean;
  basicVars: number[]; // 0-indexed column indices
  freeVars: number[]; // 0-indexed column indices
  particular: Frac[];
  vectors: { freeVar: number; symbol: string; vec: Frac[] }[];
  systemForm: string[];
  systemFormTex: string;
  vectorFormTex: string;
  parametricTex: string;
  kind: 'inconsistent' | 'unique' | 'infinite';
}

export class Matrix {
  readonly rows: number;
  readonly cols: number;
  readonly data: Frac[][];

  constructor(data: (number | Frac)[][]) {
    this.rows = data.length;
    this.cols = data[0]?.length ?? 0;
    this.data = data.map((row) => row.map((v) => Frac.from(v)));
  }

  static fromNumbers(raw: number[][]): Matrix {
    return new Matrix(raw);
  }

  static identity(n: number): Matrix {
    const d: Frac[][] = [];
    for (let i = 0; i < n; i++) {
      const row: Frac[] = [];
      for (let j = 0; j < n; j++) {
        row.push(i === j ? Frac.ONE : Frac.ZERO);
      }
      d.push(row);
    }
    return new Matrix(d);
  }

  static zero(rows: number, cols: number): Matrix {
    const d: Frac[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: Frac[] = [];
      for (let j = 0; j < cols; j++) row.push(Frac.ZERO);
      d.push(row);
    }
    return new Matrix(d);
  }

  cloneData(): Frac[][] {
    return this.data.map((row) => [...row]);
  }

  get(i: number, j: number): Frac {
    return this.data[i][j];
  }

  col(j: number): Frac[] {
    return this.data.map((row) => row[j]);
  }

  row(i: number): Frac[] {
    return [...this.data[i]];
  }

  add(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error(`Matrix dimension mismatch in add: ${this.rows}x${this.cols} vs ${other.rows}x${other.cols}`);
    }
    const d = this.data.map((row, i) => row.map((val, j) => val.add(other.data[i][j])));
    return new Matrix(d);
  }

  scale(factor: Frac | number): Matrix {
    const f = Frac.from(factor);
    const d = this.data.map((row) => row.map((val) => val.mul(f)));
    return new Matrix(d);
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(`Cannot multiply ${this.rows}x${this.cols} with ${other.rows}x${other.cols}`);
    }
    const res: Frac[][] = [];
    for (let i = 0; i < this.rows; i++) {
      const row: Frac[] = [];
      for (let j = 0; j < other.cols; j++) {
        let sum = Frac.ZERO;
        for (let k = 0; k < this.cols; k++) {
          sum = sum.add(this.data[i][k].mul(other.data[k][j]));
        }
        row.push(sum);
      }
      res.push(row);
    }
    return new Matrix(res);
  }

  mul(other: Matrix): Matrix {
    return this.multiply(other);
  }

  equals(other: Matrix): boolean {
    if (this.rows !== other.rows || this.cols !== other.cols) return false;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (!this.data[i][j].equals(other.data[i][j])) return false;
      }
    }
    return true;
  }

  transpose(): Matrix {
    const res: Frac[][] = [];
    for (let j = 0; j < this.cols; j++) {
      const row: Frac[] = [];
      for (let i = 0; i < this.rows; i++) {
        row.push(this.data[i][j]);
      }
      res.push(row);
    }
    return new Matrix(res);
  }

  /**
   * Performs Gauss-Jordan elimination to compute RREF, recording every elementary row operation step.
   * If augmented is true, the last column is treated as the right-hand side b.
   */
  rowReduce(isAugmented = false): {
    rref: Matrix;
    steps: RowOp[];
    pivots: { r: number; c: number }[];
    rank: number;
  } {
    const m = this.cloneData();
    const steps: RowOp[] = [];
    const pivots: { r: number; c: number }[] = [];
    const maxCols = isAugmented ? this.cols - 1 : this.cols;

    let leadRow = 0;
    for (let c = 0; c < maxCols && leadRow < this.rows; c++) {
      // Find pivot
      let pivotRow = leadRow;
      while (pivotRow < this.rows && m[pivotRow][c].isZero()) {
        pivotRow++;
      }
      if (pivotRow === this.rows) continue; // column is all zero below leadRow

      // Swap if needed
      if (pivotRow !== leadRow) {
        const tmp = m[leadRow];
        m[leadRow] = m[pivotRow];
        m[pivotRow] = tmp;
        steps.push({
          type: 'swap',
          i: leadRow,
          j: pivotRow,
          explanation: `Interchange row ${leadRow + 1} with row ${pivotRow + 1}`,
          texOp: `R_{${leadRow + 1}} \\leftrightarrow R_{${pivotRow + 1}}`,
          matrixAfter: m.map((r) => [...r]),
        });
      }

      // Scale pivot to 1
      const pivotVal = m[leadRow][c];
      if (!pivotVal.isOne()) {
        const scaleFactor = pivotVal.inv();
        for (let j = 0; j < this.cols; j++) {
          m[leadRow][j] = m[leadRow][j].mul(scaleFactor);
        }
        steps.push({
          type: 'scale',
          i: leadRow,
          factor: scaleFactor,
          explanation: `Scale row ${leadRow + 1} by ${scaleFactor.toTex()}`,
          texOp: `R_{${leadRow + 1}} \\to ${scaleFactor.toTex()} R_{${leadRow + 1}}`,
          matrixAfter: m.map((r) => [...r]),
        });
      }

      pivots.push({ r: leadRow, c });

      // Eliminate all other rows in this column
      for (let r = 0; r < this.rows; r++) {
        if (r === leadRow) continue;
        const factor = m[r][c];
        if (!factor.isZero()) {
          const negFactor = factor.neg();
          for (let j = 0; j < this.cols; j++) {
            m[r][j] = m[r][j].add(negFactor.mul(m[leadRow][j]));
          }
          steps.push({
            type: 'replace',
            i: r,
            j: leadRow,
            factor: negFactor,
            explanation: `Row replacement: R_${r + 1} -> R_${r + 1} + (${negFactor.toTex()}) R_${leadRow + 1}`,
            texOp: `R_{${r + 1}} \\to R_{${r + 1}} ${negFactor.toNumber() < 0 ? '-' : '+'} ${negFactor.abs().isOne() ? '' : negFactor.abs().toTex() + '\\,'}R_{${leadRow + 1}}`,
            matrixAfter: m.map((r) => [...r]),
          });
        }
      }

      leadRow++;
    }

    return {
      rref: new Matrix(m),
      steps,
      pivots,
      rank: pivots.length,
    };
  }

  /**
   * Solves the augmented linear system [A | b] and returns parametric vector solution,
   * matching the 3 formats taught on the board: System form, Vector form, Parametric form.
   */
  solveAugmented(numVarsInput?: number): ParametricSolution {
    const numVars = numVarsInput ?? (this.cols - 1);
    const { rref, pivots } = this.rowReduce(true);

    // Check consistency: pivot in the last column
    for (let r = 0; r < this.rows; r++) {
      let allZero = true;
      for (let c = 0; c < numVars; c++) {
        if (!rref.data[r][c].isZero()) {
          allZero = false;
          break;
        }
      }
      if (allZero && !rref.data[r][numVars].isZero()) {
        return {
          consistent: false,
          unique: false,
          basicVars: [],
          freeVars: [],
          particular: [],
          vectors: [],
          systemForm: ['0 = ' + rref.data[r][numVars].toTex() + ' \\implies \\text{Inconsistent (No solution)}'],
          systemFormTex: '0 = 1 \\implies \\text{Inconsistent (No solution)}',
          vectorFormTex: '\\text{No solution (inconsistent)}',
          parametricTex: '\\text{No solution}',
          kind: 'inconsistent',
        };
      }
    }

    const pivotCols = new Set(pivots.map((p) => p.c));
    const basicVars: number[] = [];
    const freeVars: number[] = [];

    for (let c = 0; c < numVars; c++) {
      if (pivotCols.has(c)) basicVars.push(c);
      else freeVars.push(c);
    }

    // Particular solution p (set free vars = 0)
    const particular: Frac[] = Array(numVars).fill(Frac.ZERO);
    for (const p of pivots) {
      particular[p.c] = rref.data[p.r][numVars];
    }

    // Free variable vectors
    const symbols = ['s', 't', 'u', 'v', 'w', 'r'];
    const vectors: { freeVar: number; symbol: string; vec: Frac[] }[] = [];

    freeVars.forEach((freeCol, idx) => {
      const vec: Frac[] = Array(numVars).fill(Frac.ZERO);
      vec[freeCol] = Frac.ONE; // free variable coefficient is 1 for itself
      for (const p of pivots) {
        // x_pivot = b_i - sum(a_ij * x_j) => coeff is -a_ij
        const coeff = rref.data[p.r][freeCol].neg();
        vec[p.c] = coeff;
      }
      vectors.push({
        freeVar: freeCol,
        symbol: symbols[idx % symbols.length],
        vec,
      });
    });

    // 1. System form
    const systemForm: string[] = [];
    for (const p of pivots) {
      let eq = `x_${p.c + 1} = ${rref.data[p.r][numVars].toTex()}`;
      for (const f of freeVars) {
        const coef = rref.data[p.r][f].neg();
        if (!coef.isZero()) {
          const sign = coef.toNumber() > 0 ? ' + ' : ' - ';
          const mag = coef.toNumber() > 0 ? coef : coef.neg();
          eq += `${sign}${mag.isOne() ? '' : mag.toTex()} x_${f + 1}`;
        }
      }
      systemForm.push(eq);
    }
    for (const f of freeVars) {
      systemForm.push(`x_${f + 1} \\text{ is free}`);
    }

    // 2. Vector form
    const vecEntries = particular.map((pVal, i) => {
      let line = pVal.isZero() && freeVars.some((fv) => !vectors.find((v) => v.freeVar === fv)!.vec[i].isZero()) ? '' : pVal.toTex();
      for (const v of vectors) {
        const val = v.vec[i];
        if (!val.isZero()) {
          const sign = val.toNumber() > 0 ? (line ? ' + ' : '') : ' - ';
          const mag = val.toNumber() > 0 ? val : val.neg();
          line += `${sign}${mag.isOne() ? '' : mag.toTex()} x_${v.freeVar + 1}`;
        }
      }
      return line || '0';
    });
    const vectorFormTex = `\\vec{x} = \\begin{bmatrix} ${vecEntries.join(' \\\\ ')} \\end{bmatrix}`;

    // 3. Parametric vector form x = p + s v1 + t v2
    const pTex = `\\begin{bmatrix} ${particular.map((f) => f.toTex()).join(' \\\\ ')} \\end{bmatrix}`;
    let parametricTex = `\\vec{x} = ${pTex}`;
    for (const v of vectors) {
      const vTex = `\\begin{bmatrix} ${v.vec.map((f) => f.toTex()).join(' \\\\ ')} \\end{bmatrix}`;
      parametricTex += ` + ${v.symbol} ${vTex}`;
    }
    if (vectors.length > 0) {
      parametricTex += ` \\quad (${vectors.map((v) => v.symbol).join(', ')} \\in \\mathbb{R})`;
    }

    const systemFormTex = systemForm.length > 0 ? `\\begin{cases} ${systemForm.join(' \\\\ ')} \\end{cases}` : '\\text{All variables free}';
    return {
      consistent: true,
      unique: freeVars.length === 0,
      basicVars,
      freeVars,
      particular,
      vectors,
      systemForm,
      systemFormTex,
      vectorFormTex,
      parametricTex,
      kind: freeVars.length === 0 ? 'unique' : 'infinite',
    };
  }

  /** Determinant of square matrix */
  det(): Frac {
    if (this.rows !== this.cols) throw new Error('Determinant requires square matrix');
    const n = this.rows;
    if (n === 1) return this.data[0][0];
    if (n === 2) {
      return this.data[0][0].mul(this.data[1][1]).sub(this.data[0][1].mul(this.data[1][0]));
    }

    // Row reduction with tracking sign swaps & scaling
    const m = this.cloneData();
    let sign = 1;
    let det = Frac.ONE;

    for (let c = 0; c < n; c++) {
      let pivotRow = c;
      while (pivotRow < n && m[pivotRow][c].isZero()) pivotRow++;
      if (pivotRow === n) return Frac.ZERO; // singular!

      if (pivotRow !== c) {
        const tmp = m[c];
        m[c] = m[pivotRow];
        m[pivotRow] = tmp;
        sign = -sign;
      }

      const pivot = m[c][c];
      det = det.mul(pivot);

      // eliminate below
      for (let r = c + 1; r < n; r++) {
        if (!m[r][c].isZero()) {
          const factor = m[r][c].div(pivot);
          for (let j = c; j < n; j++) {
            m[r][j] = m[r][j].sub(factor.mul(m[c][j]));
          }
        }
      }
    }

    return sign === 1 ? det : det.neg();
  }

  /** Inverse of square matrix using [A | I] */
  inv(): Matrix | null {
    return this.inverse();
  }

  inverse(): Matrix | null {
    if (this.rows !== this.cols) return null;
    const n = this.rows;
    const aug: Frac[][] = [];
    for (let i = 0; i < n; i++) {
      const row: Frac[] = [...this.data[i]];
      for (let j = 0; j < n; j++) {
        row.push(i === j ? Frac.ONE : Frac.ZERO);
      }
      aug.push(row);
    }

    const augMat = new Matrix(aug);
    const { rref, rank } = augMat.rowReduce(false);
    if (rank < n) return null; // not invertible

    const invData: Frac[][] = [];
    for (let i = 0; i < n; i++) {
      invData.push(rref.data[i].slice(n));
    }
    return new Matrix(invData);
  }

  /** LU Factorization without pivoting: A = L * U */
  lu(): { L: Matrix; U: Matrix } | null {
    if (this.rows !== this.cols) return null;
    const n = this.rows;
    const L: Frac[][] = [];
    const U: Frac[][] = this.cloneData();

    for (let i = 0; i < n; i++) {
      const row: Frac[] = [];
      for (let j = 0; j < n; j++) {
        row.push(i === j ? Frac.ONE : Frac.ZERO);
      }
      L.push(row);
    }

    for (let c = 0; c < n; c++) {
      if (U[c][c].isZero()) return null; // zero pivot encountered
      for (let r = c + 1; r < n; r++) {
        if (!U[r][c].isZero()) {
          const multiplier = U[r][c].div(U[c][c]);
          L[r][c] = multiplier;
          for (let j = c; j < n; j++) {
            U[r][j] = U[r][j].sub(multiplier.mul(U[c][j]));
          }
        }
      }
    }

    return { L: new Matrix(L), U: new Matrix(U) };
  }

  /** Cramer's Rule solver for Ax = b */
  cramer(b: (number | Frac)[]): {
    detA: Frac;
    detAi: Frac[];
    solution: Frac[] | null;
  } {
    if (this.rows !== this.cols || b.length !== this.rows) {
      throw new Error('Cramer rule requires square matrix and matching dimension');
    }
    const detA = this.det();
    if (detA.isZero()) {
      return { detA, detAi: [], solution: null };
    }

    const bFrac = b.map((val) => Frac.from(val));
    const detAi: Frac[] = [];
    const solution: Frac[] = [];

    for (let j = 0; j < this.cols; j++) {
      const colData = this.cloneData();
      for (let i = 0; i < this.rows; i++) {
        colData[i][j] = bFrac[i];
      }
      const matJ = new Matrix(colData);
      const detJ = matJ.det();
      detAi.push(detJ);
      solution.push(detJ.div(detA));
    }

    return { detA, detAi, solution };
  }

  /** Column Space basis: pivot columns of the original matrix */
  colSpaceBasis(): Frac[][] {
    const { pivots } = this.rowReduce(false);
    return pivots.map((p) => this.col(p.c));
  }

  /** Null Space basis from Ax = 0 */
  nulSpaceBasis(): Frac[][] {
    const aug = this.cloneData().map((row) => [...row, Frac.ZERO]);
    const augMat = new Matrix(aug);
    const sol = augMat.solveAugmented();
    return sol.vectors.map((v) => v.vec);
  }

  toTex(): string {
    const rows = this.data.map((r) => r.map((c) => c.toTex()).join(' & '));
    return `\\begin{bmatrix} ${rows.join(' \\\\ ')} \\end{bmatrix}`;
  }
}

export function rowReduceSteps(m: (number | Frac)[][] | Matrix, toRref = true) {
  const mat = m instanceof Matrix ? m : new Matrix(m);
  const result = mat.rowReduce(toRref);
  const initialStep = {
    matrix: mat.data,
    pivots: [] as { r: number; c: number }[],
    explanation: 'Initial augmented matrix [A | b]',
    texOp: '',
  };
  const mappedSteps = result.steps.map((s) => ({
    matrix: s.matrixAfter,
    pivots: result.pivots.filter((p) => p.r <= s.i),
    explanation: s.explanation,
    texOp: s.texOp,
  }));
  return {
    steps: [initialStep, ...mappedSteps],
    rref: result.rref,
    pivots: result.pivots,
    rank: result.rank,
  };
}

export function solveSystem(mat: Matrix, numVars?: number): ParametricSolution {
  return mat.solveAugmented(numVars);
}

export function toAugmentedTex(mat: Matrix | (number | Frac)[][], _augCol?: number): string {
  const data = mat instanceof Matrix ? mat.data : mat.map((r) => r.map((c) => Frac.from(c)));
  const rows = data.map((r) => r.map((c) => c.toTex()).join(' & '));
  return `\\begin{bmatrix} ${rows.join(' \\\\ ')} \\end{bmatrix}`;
}

