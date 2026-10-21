import type { Chapter } from './types';
const r = String.raw;

export const ch6: Chapter = {
  n: 6,
  title: 'Abstract Vector Spaces & The 10 Axioms',
  blurb: 'Lay Section 4.1: General vector spaces over ℝ, the 10 formal axioms, verification proofs, and the professor’s exact board counterexamples of non-standard operations.',
  slides: 'Lay 4.1 · Week 6',
  lessons: [
    {
      id: '4.1',
      chapter: 6,
      title: 'Vector Spaces: The 10 Axioms & Board Counterexamples',
      summary: 'Define general vector spaces over ℝ, verify the 10 axioms, and study the exact board counterexamples where distributive laws fail.',
      minutes: 26,
      slides: 'Lay §4.1 · Board Photos 21-28-13 to 21-28-16',
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
          t: 'h2',
          text: 'The Professor’s Board Counterexample',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-15.jpg',
          caption: 'Lecture Board: Full proof showing that V = ℝ² with u ⊕ v = [u₁ + v₁ - 1, u₂ + v₂]ᵀ FAILS Axioms 7 & 8.',
          note: 'The zero vector is [1, 0]ᵀ and the inverse is [2 - u₁, -u₂]ᵀ, but scalar multiplication does not distribute!',
        },
        {
          t: 'example',
          title: 'Board Counterexample Proof',
          source: 'Board Photos 21-28-15 & 21-28-16',
          problem: r`Let $V = \mathbb{R}^2$ with standard scalar multiplication $c\vec{u} = [c u_1, c u_2]^T$, but non-standard addition $\vec{u} \oplus \vec{v} = \begin{bmatrix} u_1 + v_1 - 1 \\ u_2 + v_2 \end{bmatrix}$. Prove whether $V$ is a vector space.`,
          boardPhoto: 'photo_2026-10-21_21-28-15.jpg',
          steps: [
            {
              say: r`Find the zero vector $\vec{e} = [e_1, e_2]^T$ satisfying $\vec{u} \oplus \vec{e} = \vec{u}$:`,
              math: [
                r`\begin{bmatrix} u_1 + e_1 - 1 \\ u_2 + e_2 \end{bmatrix} = \begin{bmatrix} u_1 \\ u_2 \end{bmatrix}`,
                r`u_1 + e_1 - 1 = u_1 \implies e_1 = 1, \quad u_2 + e_2 = u_2 \implies e_2 = 0`,
                r`\text{Thus the zero element is } \vec{0}_V = \begin{bmatrix} 1 \\ 0 \end{bmatrix}`,
              ],
            },
            {
              say: r`Find the additive inverse $-\vec{u} = [w_1, w_2]^T$ satisfying $\vec{u} \oplus (-\vec{u}) = \vec{0}_V = [1, 0]^T$:`,
              math: [
                r`u_1 + w_1 - 1 = 1 \implies w_1 = 2 - u_1, \quad u_2 + w_2 = 0 \implies w_2 = -u_2`,
                r`\text{Thus } -\vec{u} = \begin{bmatrix} 2 - u_1 \\ -u_2 \end{bmatrix}`,
              ],
            },
            {
              say: r`Now test Axiom 7: Does $c(\vec{u} \oplus \vec{v}) = c\vec{u} \oplus c\vec{v}$ hold? Calculate left-hand side:`,
              math: [
                r`\vec{u} \oplus \vec{v} = \begin{bmatrix} u_1 + v_1 - 1 \\ u_2 + v_2 \end{bmatrix}`,
                r`\text{LHS } = c(\vec{u} \oplus \vec{v}) = \begin{bmatrix} c(u_1 + v_1 - 1) \\ c(u_2 + v_2) \end{bmatrix} = \begin{bmatrix} cu_1 + cv_1 - c \\ cu_2 + cv_2 \end{bmatrix}`,
              ],
            },
            {
              say: r`Calculate right-hand side using the custom addition rule $\oplus$:`,
              math: [
                r`c\vec{u} = \begin{bmatrix} cu_1 \\ cu_2 \end{bmatrix}, \quad c\vec{v} = \begin{bmatrix} cv_1 \\ cv_2 \end{bmatrix}`,
                r`\text{RHS } = c\vec{u} \oplus c\vec{v} = \begin{bmatrix} cu_1 + cv_1 - 1 \\ cu_2 + cv_2 \end{bmatrix}`,
              ],
            },
            {
              say: r`Compare the first components: LHS has $-c$, whereas RHS has $-1$. For any scalar $c \ne 1$ (for instance, $c = 2$), LHS $\ne$ RHS!`,
              math: r`cu_1 + cv_1 - c \ne cu_1 + cv_1 - 1 \quad (\text{when } c \ne 1)`,
            },
          ],
          answer: r`Axiom 7 fails! Therefore, $V$ is NOT a vector space over $\mathbb{R}$.`,
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
      ],
      recap: [
        'A vector space requires ALL 10 axioms to hold.',
        'Axioms 1-5 govern vector addition; Axioms 6-10 govern scalar multiplication.',
        'In non-standard operations, the zero vector and inverse may not look like standard zeros (e.g. e = [1, 0]ᵀ).',
        'Distributive axioms c(u ⊕ v) = cu ⊕ cv and (c+d)u = cu ⊕ du are the most common to fail under shifted operations.',
      ],
      ask: [
        'Can the zero vector of a vector space ever be something other than [0, 0, ..., 0]?',
        'How do we test if the set of all polynomials P_n is a vector space?',
      ],
    },
  ],
};
