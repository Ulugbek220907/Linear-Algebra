import { Frac } from '../src/engine/fraction';
import { Matrix, rowReduceSteps, solveSystem } from '../src/engine/matrix';

let failures = 0;
let tests = 0;

function assert(cond: boolean, msg: string) {
  tests++;
  if (!cond) {
    failures++;
    console.error(`✗ FAIL: ${msg}`);
  } else {
    // console.log(`✓ PASS: ${msg}`);
  }
}

console.log('=== Running Linear Algebra Engine Verification Tests ===\n');

// 1. Exact Rational Arithmetic (Frac) Tests
{
  const f1 = new Frac(1, 2);
  const f2 = new Frac(1, 3);
  assert(f1.add(f2).equals(new Frac(5, 6)), 'Frac 1/2 + 1/3 = 5/6');
  assert(f1.sub(f2).equals(new Frac(1, 6)), 'Frac 1/2 - 1/3 = 1/6');
  assert(f1.mul(f2).equals(new Frac(1, 6)), 'Frac 1/2 * 1/3 = 1/6');
  assert(f1.div(f2).equals(new Frac(3, 2)), 'Frac (1/2) / (1/3) = 3/2');
  assert(new Frac(-4, -6).equals(new Frac(2, 3)), 'Frac normalization -4/-6 = 2/3');
  assert(new Frac(-3, 4).abs().equals(new Frac(3, 4)), 'Frac abs(-3/4) = 3/4');
  assert(new Frac(5, 1).isOne() === false, 'Frac 5/1 is not one');
  assert(new Frac(1, 1).isOne() === true, 'Frac 1/1 is one');
  assert(new Frac(0, 7).isZero() === true, 'Frac 0/7 is zero');

  let caughtDivZero = false;
  try {
    new Frac(1, 0);
  } catch {
    caughtDivZero = true;
  }
  assert(caughtDivZero, 'Frac denominator 0 throws error');
}

// 2. Matrix Determinant & Inversion Tests
{
  const a2 = new Matrix([
    [3, 8],
    [4, 6],
  ]);
  // det = 3*6 - 8*4 = 18 - 32 = -14
  assert(a2.det().equals(new Frac(-14, 1)), '2x2 Determinant = -14');

  const invA2 = a2.inv();
  assert(invA2 !== null, 'Invertible 2x2 matrix returns inverse');
  if (invA2) {
    const prod = a2.mul(invA2);
    const I = Matrix.identity(2);
    assert(prod.equals(I), 'A * A^(-1) = I for 2x2');
  }

  // 3x3 Determinant:
  // [1, 2, 3]
  // [0, 4, 5]
  // [1, 0, 6]
  // det = 1*(24) - 2*(-5) + 3*(-4) = 24 + 10 - 12 = 22
  const a3 = new Matrix([
    [1, 2, 3],
    [0, 4, 5],
    [1, 0, 6],
  ]);
  assert(a3.det().equals(new Frac(22, 1)), '3x3 Determinant = 22');
  assert(a3.transpose().det().equals(a3.det()), 'det(A^T) = det(A)');

  const invA3 = a3.inv();
  assert(invA3 !== null, 'Invertible 3x3 matrix returns inverse');
  if (invA3) {
    const prod = a3.mul(invA3);
    assert(prod.equals(Matrix.identity(3)), 'A * A^(-1) = I for 3x3');
  }
}

// 3. LU Factorization
{
  // Matrix from Lay Section 2.5:
  // [ 3, -7, -2]
  // [-3,  5,  1]
  // [ 6, -4,  0]
  const m = new Matrix([
    [3, -7, -2],
    [-3, 5, 1],
    [6, -4, 0],
  ]);
  const lu = m.lu();
  assert(lu !== null, 'LU factorization computed');
  if (lu) {
    const prod = lu.L.mul(lu.U);
    assert(prod.equals(m), 'L * U = A');
    // Verify L is unit lower triangular
    assert(lu.L.data[0][0].isOne() && lu.L.data[1][1].isOne() && lu.L.data[2][2].isOne(), 'L has 1s on diagonal');
    assert(lu.L.data[0][1].isZero() && lu.L.data[0][2].isZero() && lu.L.data[1][2].isZero(), 'L is lower triangular');
    // Verify U is upper triangular
    assert(lu.U.data[1][0].isZero() && lu.U.data[2][0].isZero() && lu.U.data[2][1].isZero(), 'U is upper triangular');
  }
}

// 4. Cramer's Rule Solver
{
  // System:
  // 3 x1 - 2 x2 = 6
  // -5 x1 + 4 x2 = 8
  const A = new Matrix([
    [3, -2],
    [-5, 4],
  ]);
  const b = [6, 8];
  const res = A.cramer(b);
  assert(!res.detA.isZero(), 'Cramer matrix is non-singular');
  assert(res.solution !== null, 'Cramer found solution');
  if (res.solution) {
    // 3(20) - 2(27) = 60 - 54 = 6
    // -5(20) + 4(27) = -100 + 108 = 8
    assert(res.solution[0].equals(new Frac(20, 1)), 'Cramer x1 = 20');
    assert(res.solution[1].equals(new Frac(27, 1)), 'Cramer x2 = 27');
  }
}

// 5. Gauss-Jordan Elimination & 3 Solution Formats
{
  // System with free variable from Board Photo 21-27-46:
  // [ 1, -2, -1 | 3 ]
  // [ 3, -6, -2 | 2 ]
  // R2 -> R2 - 3*R1:
  // [ 1, -2, -1 | 3 ]
  // [ 0,  0,  1 | -7 ]
  // R1 -> R1 + R2:
  // [ 1, -2,  0 | -4 ]
  // [ 0,  0,  1 | -7 ]
  // x1 = -4 + 2 x2
  // x2 is free
  // x3 = -7
  const boardSys = new Matrix([
    [1, -2, -1, 3],
    [3, -6, -2, 2],
  ]);
  const steps = rowReduceSteps(boardSys, true);
  assert(steps.rref.data[0][0].equals(new Frac(1)), 'RREF row 1 col 0 is 1');
  assert(steps.rref.data[0][1].equals(new Frac(-2)), 'RREF row 1 col 1 is -2');
  assert(steps.rref.data[0][2].equals(new Frac(0)), 'RREF row 1 col 2 is 0');
  assert(steps.rref.data[0][3].equals(new Frac(-4)), 'RREF row 1 col 3 is -4');
  assert(steps.rref.data[1][2].equals(new Frac(1)), 'RREF row 2 col 2 is 1');
  assert(steps.rref.data[1][3].equals(new Frac(-7)), 'RREF row 2 col 3 is -7');

  const sol = solveSystem(steps.rref, 3);
  assert(sol.consistent === true, 'Board system is consistent');
  assert(sol.unique === false, 'Board system has free variables');
  assert(sol.freeVars.includes(1), 'x2 is free variable');
  assert(sol.basicVars.includes(0) && sol.basicVars.includes(2), 'x1 and x3 are basic variables');
  assert(sol.particular[0].equals(new Frac(-4)), 'Particular x1 = -4');
  assert(sol.particular[1].equals(new Frac(0)), 'Particular x2 = 0');
  assert(sol.particular[2].equals(new Frac(-7)), 'Particular x3 = -7');

  // Check Inconsistent System Detection
  const inc = new Matrix([
    [1, 1, 2],
    [1, 1, 5],
  ]);
  const incSol = solveSystem(inc);
  assert(incSol.consistent === false, 'Inconsistent system detected');
  assert(incSol.kind === 'inconsistent', 'System marked kind = inconsistent');
}

// 6. Subspace Bases: Col A and Nul A
{
  const m = new Matrix([
    [1, 2, 0, 1],
    [0, 1, 1, 0],
    [1, 3, 1, 1],
  ]);
  const colBasis = m.colSpaceBasis();
  // Rank is 2, pivot cols are 0 and 1
  assert(colBasis.length === 2, 'Col A dimension (rank) is 2');
  assert(colBasis[0][0].equals(new Frac(1)) && colBasis[0][2].equals(new Frac(1)), 'Col A basis vector from original matrix');

  const nulBasis = m.nulSpaceBasis();
  // Total cols (4) - rank (2) = nullity (2)
  assert(nulBasis.length === 2, 'Rank-Nullity theorem: nullity = 4 - 2 = 2');
}

console.log(`\n========================================`);
console.log(`Summary: ${tests} passed, ${failures} failed`);
console.log(`========================================\n`);

process.exit(failures ? 1 : 0);
