import type { Chapter } from './types';
const r = String.raw;

export const ch6: Chapter = {
  n: 6,
  title: 'Abstract Vector Spaces & The 10 Axioms',
  blurb: 'Lay Section 4.1: General vector spaces over ℝ, the 10 formal axioms, verification proofs, the multiplicative space (0, ∞), and the professor’s exact board counterexamples.',
  slides: 'Lay 4.1 · Week 6',
  lessons: [
    {
      id: '4.1',
      chapter: 6,
      title: 'Vector Spaces: The 10 Axioms & Board Counterexamples',
      summary: 'Define general vector spaces over ℝ, verify the 10 axioms, and study the exact board counterexamples where distributive laws fail.',
      minutes: 28,
      slides: 'Lay §4.1 · Board Photos 21-28-13 to 21-28-55',
      blocks: [
        {
          t: 'p',
          text: 'A **vector space** $V$ is a non-empty set of objects (called vectors) on which are defined two operations: **vector addition** ($\\vec{u} + \\vec{v}$) and **scalar multiplication** ($c\\vec{u}$), satisfying **ALL TEN axioms** for all $\\vec{u}, \\vec{v}, \\vec{w} \\in V$ and all real scalars $c, d \\in \\mathbb{R}$.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-13.jpg',
          caption: 'Lecture Board: The 10 Vector Space Axioms, closure, zero element, additive inverse, and distributive laws.',
          note: 'Notice the grouping: Axioms 1-5 govern addition; Axioms 6-10 govern scalar multiplication.',
        },
        {
          t: 'h2',
          text: 'The 10 Formal Vector Space Axioms',
        },
        {
          t: 'steps',
          title: 'Axioms 1 to 5: Vector Addition',
          items: [
            { title: 'Axiom 1 (Closure under Addition):', text: '$\\vec{u} + \\vec{v} \\in V$.' },
            { title: 'Axiom 2 (Commutativity):', text: '$\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}$.' },
            { title: 'Axiom 3 (Associativity):', text: '$(\\vec{u} + \\vec{v}) + \\vec{w} = \\vec{u} + (\\vec{v} + \\vec{w})$.' },
            { title: 'Axiom 4 (Zero Vector):', text: 'There exists a vector $\\vec{0} \\in V$ such that $\\vec{u} + \\vec{0} = \\vec{u}$.' },
            { title: 'Axiom 5 (Additive Inverse):', text: 'For each $\\vec{u} \\in V$, there exists $-\\vec{u} \\in V$ such that $\\vec{u} + (-\\vec{u}) = \\vec{0}$.' },
          ],
        },
        {
          t: 'steps',
          title: 'Axioms 6 to 10: Scalar Multiplication',
          items: [
            { title: 'Axiom 6 (Closure under Scalar Mult):', text: '$c\\vec{u} \\in V$.' },
            { title: 'Axiom 7 (Distributive over Vectors):', text: '$c(\\vec{u} + \\vec{v}) = c\\vec{u} + c\\vec{v}$.' },
            { title: 'Axiom 8 (Distributive over Scalars):', text: '$(c + d)\\vec{u} = c\\vec{u} + d\\vec{u}$.' },
            { title: 'Axiom 9 (Scalar Associativity):', text: '$c(d\\vec{u}) = (cd)\\vec{u}$.' },
            { title: 'Axiom 10 (Multiplicative Identity):', text: '$1\\vec{u} = \\vec{u}$.' },
          ],
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-35.jpg',
          caption: 'Lecture Board: Formal uniqueness proofs for the zero vector and additive inverse',
          note: 'The professor proves that if e and e\' both satisfy the zero axiom, then e = e + e\' = e\'.',
        },
        {
          t: 'h2',
          text: 'The Multiplicative Vector Space V = (0, ∞)',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-33.jpg',
          caption: 'Lecture Board: Vector space structure on positive reals V = (0, ∞) under x ⊕ y = xy',
          note: 'Notice the zero element: e = 1 because x · 1 = x. The additive inverse of x is 1/x because x · (1/x) = 1.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-34.jpg',
          caption: 'Lecture Board: Scalar multiplication c ⊙ x = x^c verification',
          note: 'Exponents turn addition of scalars into multiplication of vectors: x^(c+d) = x^c · x^d!',
        },
        {
          t: 'h2',
          text: 'Counterexamples & Subspace Criteria',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-36.jpg',
          caption: 'Lecture Board: Classic counterexamples failing vector space closure or zero element',
          note: 'Testing sets where negative scalars eject vectors from the domain (e.g. upper half-plane).',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-37.jpg',
          caption: 'Lecture Board: The 3 fundamental criteria for a subspace H ≤ V',
          note: '1. Zero vector in H; 2. Closed under addition; 3. Closed under scalar multiplication.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-38.jpg',
          caption: 'Lecture Board: Subspaces in polynomial spaces ℙₙ and real function spaces C[a, b]',
          note: 'The set of polynomials with p(0) = 0 is a subspace; polynomials with p(0) = 1 is NOT.',
        },
        {
          t: 'h2',
          text: 'The Professor’s Advanced Midterm Counterexample',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-51.jpg',
          caption: 'Lecture Board: Definition of non-standard operations on ℝ²',
          note: 'Addition u ⊕ v = [x₁+x₂-1, y₁+y₂]ᵀ with scalar multiplication c ⊙ u = [cx-c+1, c²y]ᵀ.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-52.jpg',
          caption: 'Lecture Board: Finding zero vector e = [1, 0]ᵀ and additive inverse [-u] = [2-x, -y]ᵀ',
          note: 'The identity element works on both coordinates: x + 1 - 1 = x and y + 0 = y.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-54.jpg',
          caption: 'Lecture Board: Testing Axiom 7: c ⊙ (u ⊕ v) = c ⊙ u ⊕ c ⊙ v',
          note: 'Axiom 7 surprisingly holds because the constant terms match on both sides!',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-55.jpg',
          caption: 'Lecture Board: Proving failure of Axiom 8: (k+l) ⊙ u ≠ k ⊙ u ⊕ l ⊙ u',
          note: 'The second coordinate gives (k+l)²y on LHS vs (k²+l²)y on RHS. The missing 2kly cross-term breaks distributivity!',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-15.jpg',
          caption: 'Lecture Board: Summary proof that non-standard operational sets fail to form vector spaces',
          note: 'A set is a vector space if and only if EVERY ONE of the 10 axioms passes.',
        },
        {
          t: 'widget',
          id: 'axiomTester',
          title: 'Interactive 10 Vector Space Axioms Tester',
        },
      ],
      quiz: [
        {
          id: 'q4.1.1',
          type: 'mc',
          q: 'If a set $V$ with operations satisfies 9 of the 10 vector space axioms, is $V$ a vector space?',
          options: [
            'Yes, if the 9 include closure and zero vector',
            'No, a vector space must satisfy ALL 10 axioms without exception',
            'Yes, by approximation theorem',
            'Only if the dimension is finite',
          ],
          answer: 1,
          why: 'By definition, a vector space must satisfy every single one of the 10 axioms. Even a single violation disqualifies the set.',
        },
        {
          id: 'q4.1.2',
          type: 'mc',
          q: 'In the multiplicative vector space $V = (0, \\infty)$ where $\\vec{u} \\oplus \\vec{v} = uv$, what is the zero vector $\\vec{0}_V$?',
          options: ['0', '1', '-1', 'e (Euler’s constant)'],
          answer: 1,
          why: 'The zero vector must satisfy u ⊕ e = u. Here u · e = u implies e = 1.',
        },
      ],
      recap: [
        'A vector space requires ALL 10 axioms to hold.',
        'Axioms 1-5 govern vector addition; Axioms 6-10 govern scalar multiplication.',
        'In non-standard operations, the zero vector and inverse may not look like standard zeros (e.g. e = [1, 0]ᵀ or e = 1 in (0, ∞)).',
        'Distributive axioms c(u ⊕ v) = cu ⊕ cv and (c+d)u = cu ⊕ du are the most common to fail under shifted operations.',
      ],
      ask: [
        'Can the zero vector of a vector space ever be something other than [0, 0, ..., 0]?',
        'How does the vector space (0, ∞) connect to logarithms?',
      ],
    },
  ],
};
