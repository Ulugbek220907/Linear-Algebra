import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Math as Tex } from '../lib/rich';

interface AxiomCheck {
  id: number;
  name: string;
  formal: string;
  pass: boolean;
  explanation: string;
}

interface VectorSpaceCase {
  title: string;
  source: string;
  description: string;
  operations: string;
  axioms: AxiomCheck[];
  verdict: boolean;
}

const CASES: VectorSpaceCase[] = [
  {
    title: 'Standard Euclidean Space ℝⁿ',
    source: 'Lay Section 4.1 Example 1',
    description: 'The set of all n-tuples of real numbers with standard componentwise addition and scalar multiplication.',
    operations: '\\vec{u} + \\vec{v} = [u_1+v_1, \\dots, u_n+v_n]^T, \\quad c\\vec{u} = [cu_1, \\dots, cu_n]^T',
    verdict: true,
    axioms: [
      { id: 1, name: 'Closed under Addition', formal: '\\vec{u} + \\vec{v} \\in V', pass: true, explanation: 'Sum of real numbers is real.' },
      { id: 2, name: 'Addition Commutative', formal: '\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}', pass: true, explanation: 'u_i + v_i = v_i + u_i.' },
      { id: 3, name: 'Addition Associative', formal: '(\\vec{u} + \\vec{v}) + \\vec{w} = \\vec{u} + (\\vec{v} + \\vec{w})', pass: true, explanation: 'Inherited from real number associativity.' },
      { id: 4, name: 'Zero Vector Exists', formal: '\\vec{u} + \\vec{0} = \\vec{u}', pass: true, explanation: 'Zero vector is [0, 0, ..., 0]^T.' },
      { id: 5, name: 'Additive Inverse Exists', formal: '\\vec{u} + (-\\vec{u}) = \\vec{0}', pass: true, explanation: 'Inverse is -u = [-u_1, ..., -u_n]^T.' },
      { id: 6, name: 'Closed under Scalar Mult', formal: 'c\\vec{u} \\in V', pass: true, explanation: 'Scalar multiple of real numbers is real.' },
      { id: 7, name: 'Distributive over Vectors', formal: 'c(\\vec{u} + \\vec{v}) = c\\vec{u} + c\\vec{v}', pass: true, explanation: 'c(u_i + v_i) = c u_i + c v_i.' },
      { id: 8, name: 'Distributive over Scalars', formal: '(c + d)\\vec{u} = c\\vec{u} + d\\vec{u}', pass: true, explanation: '(c + d)u_i = c u_i + d u_i.' },
      { id: 9, name: 'Scalar Associative', formal: 'c(d\\vec{u}) = (cd)\\vec{u}', pass: true, explanation: 'c(d u_i) = (cd)u_i.' },
      { id: 10, name: 'Identity Scalar', formal: '1\\vec{u} = \\vec{u}', pass: true, explanation: '1 u_i = u_i.' },
    ],
  },
  {
    title: 'Board: u ⊕ v = [x₁+x₂-1, y₁+y₂]ᵀ with c ⊙ u = [cx-c+1, c²y]ᵀ',
    source: 'Board Photos 21-28-51 to 21-28-55 (Midterm Prep)',
    description: 'The professor’s advanced board exam problem on ℝ² with non-standard operations. Notice how identity and inverse work, but distributivity over scalars fails!',
    operations: '\\vec{u} \\oplus \\vec{v} = \\begin{bmatrix} x_1 + x_2 - 1 \\\\ y_1 + y_2 \\end{bmatrix}, \\quad c \\odot \\vec{u} = \\begin{bmatrix} c x - c + 1 \\\\ c^2 y \\end{bmatrix}',
    verdict: false,
    axioms: [
      { id: 1, name: 'Closed under Addition', formal: '\\vec{u} \\oplus \\vec{v} \\in V', pass: true, explanation: 'Resulting pair is in ℝ².' },
      { id: 2, name: 'Addition Commutative', formal: '\\vec{u} \\oplus \\vec{v} = \\vec{v} \\oplus \\vec{u}', pass: true, explanation: 'x_1+x_2-1 = x_2+x_1-1 and y_1+y_2 = y_2+y_1.' },
      { id: 3, name: 'Addition Associative', formal: '(\\vec{u} \\oplus \\vec{v}) \\oplus \\vec{w} = \\vec{u} \\oplus (\\vec{v} \\oplus \\vec{w})', pass: true, explanation: 'Both sides equal [x_1+x_2+x_3-2, y_1+y_2+y_3]^T.' },
      { id: 4, name: 'Zero Vector Exists', formal: '\\vec{u} \\oplus \\vec{e} = \\vec{u}', pass: true, explanation: 'Zero vector is e = [1, 0]^T, because x + 1 - 1 = x and y + 0 = y.' },
      { id: 5, name: 'Additive Inverse Exists', formal: '\\vec{u} \\oplus (-\\vec{u}) = \\vec{e}', pass: true, explanation: 'Inverse is [-u] = [2 - x, -y]^T, because x + (2 - x) - 1 = 1 and y + (-y) = 0.' },
      { id: 6, name: 'Closed under Scalar Mult', formal: 'c \\odot \\vec{u} \\in V', pass: true, explanation: 'Coordinates cx-c+1 and c²y are real.' },
      { id: 7, name: 'Distributive over Vectors', formal: 'c \\odot (\\vec{u} \\oplus \\vec{v}) = c \\odot \\vec{u} \\oplus c \\odot \\vec{v}', pass: true, explanation: 'LHS: [c(x₁+x₂-1)-c+1, c²(y₁+y₂)] = [cx₁+cx₂-2c+1, c²y₁+c²y₂]. RHS: (cx₁-c+1)+(cx₂-c+1)-1 = cx₁+cx₂-2c+1. Matches!' },
      { id: 8, name: 'Distributive over Scalars', formal: '(k + l) \\odot \\vec{u} = k \\odot \\vec{u} \\oplus l \\odot \\vec{u}', pass: false, explanation: 'FAILS on 2nd coordinate! LHS gives (k+l)²y. RHS gives k²y + l²y. In general (k+l)²y ≠ (k²+l²)y because of the missing 2kly cross term!' },
      { id: 9, name: 'Scalar Associative', formal: 'k \\odot (l \\odot \\vec{u}) = (kl) \\odot \\vec{u}', pass: true, explanation: 'First coordinate: k(lx-l+1)-k+1 = klx-kl+1. Second coordinate: k²(l²y) = (kl)²y.' },
      { id: 10, name: 'Identity Scalar', formal: '1 \\odot \\vec{u} = \\vec{u}', pass: true, explanation: '1x-1+1 = x, 1²y = y.' },
    ],
  },
  {
    title: 'Board: Multiplicative Vector Space V = (0, ∞)',
    source: 'Board Photos 21-28-33 to 21-28-35',
    description: 'The professor’s remarkable proof: positive real numbers form a vector space where “addition” is ordinary multiplication and “scalar multiplication” is powering!',
    operations: 'x \\oplus y = x \\cdot y, \\quad c \\odot x = x^c \\quad (x, y > 0, \\ c \\in \\mathbb{R})',
    verdict: true,
    axioms: [
      { id: 1, name: 'Closed under Addition', formal: 'x \\oplus y \\in V', pass: true, explanation: 'If x > 0 and y > 0, then xy > 0.' },
      { id: 2, name: 'Addition Commutative', formal: 'x \\oplus y = y \\oplus x', pass: true, explanation: 'xy = yx.' },
      { id: 3, name: 'Addition Associative', formal: '(x \\oplus y) \\oplus z = x \\oplus (y \\oplus z)', pass: true, explanation: '(xy)z = x(yz).' },
      { id: 4, name: 'Zero Vector Exists', formal: 'x \\oplus e = x', pass: true, explanation: 'Zero vector is e = 1! Because x · 1 = x.' },
      { id: 5, name: 'Additive Inverse Exists', formal: 'x \\oplus x^{-1} = e', pass: true, explanation: 'Inverse is 1/x > 0! Because x · (1/x) = 1 = e.' },
      { id: 6, name: 'Closed under Scalar Mult', formal: 'c \\odot x \\in V', pass: true, explanation: 'x^c > 0 for any x > 0 and c ∈ ℝ.' },
      { id: 7, name: 'Distributive over Vectors', formal: 'c \\odot (x \\oplus y) = c \\odot x \\oplus c \\odot y', pass: true, explanation: '(xy)^c = x^c · y^c.' },
      { id: 8, name: 'Distributive over Scalars', formal: '(c + d) \\odot x = c \\odot x \\oplus d \\odot x', pass: true, explanation: 'x^(c+d) = x^c · x^d.' },
      { id: 9, name: 'Scalar Associative', formal: 'c \\odot (d \\odot x) = (cd) \\odot x', pass: true, explanation: '(x^d)^c = x^(cd).' },
      { id: 10, name: 'Identity Scalar', formal: '1 \\odot x = x', pass: true, explanation: 'x^1 = x.' },
    ],
  },
  {
    title: 'Upper Half-Plane: {(x, y) | y ≥ 0}',
    source: 'Lay Section 4.1 Example 4',
    description: 'The set of points in the first and second quadrants including the x-axis, with standard addition and scalar mult.',
    operations: 'H = \\{(x, y) \\in \\mathbb{R}^2 : y \\ge 0\\}',
    verdict: false,
    axioms: [
      { id: 1, name: 'Closed under Addition', formal: '\\vec{u} + \\vec{v} \\in H', pass: true, explanation: 'If y₁ ≥ 0 and y₂ ≥ 0, then y₁ + y₂ ≥ 0.' },
      { id: 2, name: 'Addition Commutative', formal: '\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}', pass: true, explanation: 'Standard vector addition.' },
      { id: 3, name: 'Addition Associative', formal: '(\\vec{u} + \\vec{v}) + \\vec{w} = \\vec{u} + (\\vec{v} + \\vec{w})', pass: true, explanation: 'Standard vector addition.' },
      { id: 4, name: 'Zero Vector Exists', formal: '\\vec{u} + \\vec{0} = \\vec{u}', pass: true, explanation: '[0, 0]^T has y = 0 ≥ 0, so 0 is in H.' },
      { id: 5, name: 'Additive Inverse Exists', formal: '\\vec{u} + (-\\vec{u}) = \\vec{0}', pass: false, explanation: 'FAILS! For [0, 1]^T in H, its inverse [0, -1]^T has y = -1 < 0, NOT in H!' },
      { id: 6, name: 'Closed under Scalar Mult', formal: 'c\\vec{u} \\in H', pass: false, explanation: 'FAILS! If c = -1 and u = [0, 1]^T, (-1)u = [0, -1]^T is outside H.' },
      { id: 7, name: 'Distributive over Vectors', formal: 'c(\\vec{u} + \\vec{v}) = c\\vec{u} + c\\vec{v}', pass: true, explanation: 'Standard vectors.' },
      { id: 8, name: 'Distributive over Scalars', formal: '(c + d)\\vec{u} = c\\vec{u} + d\\vec{u}', pass: true, explanation: 'Standard vectors.' },
      { id: 9, name: 'Scalar Associative', formal: 'c(d\\vec{u}) = (cd)\\vec{u}', pass: true, explanation: 'Standard vectors.' },
      { id: 10, name: 'Identity Scalar', formal: '1\\vec{u} = \\vec{u}', pass: true, explanation: '1 u = u.' },
    ],
  },
  {
    title: 'Polynomial Space ℙₙ of degree ≤ n',
    source: 'Lay Section 4.1 Example 2',
    description: 'Set of all polynomials p(t) = a₀ + a₁t + ... + aₙtⁿ of degree at most n with real coefficients.',
    operations: '(p + q)(t) = p(t) + q(t), \\quad (cp)(t) = c\\,p(t)',
    verdict: true,
    axioms: [
      { id: 1, name: 'Closed under Addition', formal: 'p(t) + q(t) \\in \\mathbb{P}_n', pass: true, explanation: 'Sum of degree ≤ n is degree ≤ n.' },
      { id: 2, name: 'Addition Commutative', formal: 'p(t) + q(t) = q(t) + p(t)', pass: true, explanation: 'Real coefficient addition commutes.' },
      { id: 3, name: 'Addition Associative', formal: '(p + q) + r = p + (q + r)', pass: true, explanation: 'Polynomial addition is associative.' },
      { id: 4, name: 'Zero Polynomial Exists', formal: 'p(t) + 0 = p(t)', pass: true, explanation: 'The zero polynomial 0(t) = 0 for all t.' },
      { id: 5, name: 'Additive Inverse Exists', formal: 'p(t) + (-p(t)) = 0', pass: true, explanation: '-p(t) = -a₀ - a₁t - ... - aₙtⁿ.' },
      { id: 6, name: 'Closed under Scalar Mult', formal: 'c\\,p(t) \\in \\mathbb{P}_n', pass: true, explanation: 'c a_i are real numbers.' },
      { id: 7, name: 'Distributive over Polynomials', formal: 'c(p + q) = cp + cq', pass: true, explanation: 'Distributes across each coefficient.' },
      { id: 8, name: 'Distributive over Scalars', formal: '(c + d)p = cp + dp', pass: true, explanation: '(c + d)a_i = c a_i + d a_i.' },
      { id: 9, name: 'Scalar Associative', formal: 'c(d p) = (cd)p', pass: true, explanation: 'c(d a_i) = (cd)a_i.' },
      { id: 10, name: 'Identity Scalar', formal: '1 p = p', pass: true, explanation: '1 a_i = a_i.' },
    ],
  },
];

export function AxiomTester() {
  const [selectedCase, setSelectedCase] = useState<number>(1); // default to professor's board problem
  const cur = CASES[selectedCase];

  return (
    <div className="widget-card">
      <div className="widget-card-head">
        <h3>10 Vector Space Axioms Interactive Tester</h3>
        <span className="widget-badge">Section 4.1 & Week 6 Board</span>
      </div>

      <div className="widget-body">
        <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 'var(--t-sm)' }}>
          To be a vector space, a set with addition $\oplus$ and scalar multiplication $\odot$ must satisfy <strong>all 10 axioms</strong>.
          If even a single axiom fails, the set is NOT a vector space. Test how non-standard operations violate distribution or closure!
        </p>

        <div className="geom-presets">
          {CASES.map((c, idx) => (
            <button
              key={c.title}
              type="button"
              className={`btn btn-sm ${selectedCase === idx ? 'btn-primary' : ''}`}
              onClick={() => setSelectedCase(idx)}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="step-note-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <strong>{cur.title}:</strong>
            <span className={`chip ${cur.verdict ? 'ok' : 'bad'}`} style={{ fontWeight: 700 }}>
              {cur.verdict ? 'Valid Vector Space' : 'NOT a Vector Space'}
            </span>
          </div>
          <p style={{ margin: '0 0 var(--s2) 0', fontSize: 'var(--t-sm)', color: 'var(--ink-2)' }}>
            {cur.description}
          </p>
          <div style={{ background: 'var(--raised)', padding: 'var(--s2) var(--s3)', borderRadius: 'var(--r-sm)' }}>
            <Tex tex={cur.operations} display />
          </div>
        </div>

        {/* 10 Axiom Cards Grid */}
        <div className="axiom-grid">
          {cur.axioms.map((ax) => (
            <div key={ax.id} className={`axiom-card ${ax.pass ? 'pass' : 'fail'}`}>
              <div className="axiom-card-header">
                <span className="axiom-name">
                  Axiom {ax.id}: {ax.name}
                </span>
                <span className={`axiom-status ${ax.pass ? 'pass' : 'fail'}`}>
                  {ax.pass ? <Check size={14} /> : <X size={14} />}
                  {ax.pass ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <div style={{ margin: 'var(--s1) 0' }}>
                <Tex tex={ax.formal} />
              </div>
              <p style={{ margin: 0, fontSize: 'var(--t-xs)', color: 'var(--ink-2)' }}>
                {ax.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
