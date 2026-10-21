import type { Chapter } from './types';
const r = String.raw;

export const ch7: Chapter = {
  n: 7,
  title: 'Kernel, Range & Coordinate Isomorphisms',
  blurb: 'Lay Sections 4.2 & 4.4: Kernel and range of linear transformations, bases for abstract vector spaces, and coordinate vector isomorphism [x]_B connecting ℙ₂ to ℝ³.',
  slides: 'Lay 4.2, 4.4 · Week 7',
  lessons: [
    {
      id: '4.2',
      chapter: 7,
      title: 'Null Spaces, Column Spaces & Kernel/Range',
      summary: 'Extend Nul(A) and Col(A) to abstract linear transformations as Kernel (ker T) and Range (range T).',
      minutes: 22,
      slides: 'Lay §4.2 · Board Photo 21-28-17',
      blocks: [
        {
          t: 'p',
          text: 'For an abstract linear transformation $T: V \\to W$ between arbitrary vector spaces $V$ and $W$:',
        },
        {
          t: 'formula',
          title: 'Kernel and Range Definitions',
          tex: [
            r`\operatorname{ker}(T) = \{\vec{u} \in V : T(\vec{u}) = \vec{0}_W\} \quad (\text{Subspace of Domain } V)`,
            r`\operatorname{range}(T) = \{\vec{w} \in W : \vec{w} = T(\vec{x}) \text{ for some } \vec{x} \in V\} \quad (\text{Subspace of Codomain } W)`,
          ],
          note: r`When $T(\vec{x}) = A\vec{x}$, $\operatorname{ker}(T) = \operatorname{Nul}(A)$ and $\operatorname{range}(T) = \operatorname{Col}(A)$.`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-17.jpg',
          caption: 'Lecture Board: Kernel (ker T) in domain V mapped to 0_W, and Range in codomain W.',
          note: 'T is one-to-one (injective) if and only if ker(T) = {0_V}!',
        },
        {
          t: 'callout',
          kind: 'why',
          title: 'The Injective (One-to-One) Kernel Theorem',
          text: [
            'A linear transformation $T: V \\to W$ is **one-to-one** if and only if its kernel contains ONLY the zero vector:',
            '$$\\operatorname{ker}(T) = \\{\\vec{0}_V\\}$$',
            'If $\\operatorname{ker}(T)$ contains any non-zero vector $\\vec{v} \\ne \\vec{0}$, then $T(\\vec{u} + \\vec{v}) = T(\\vec{u}) + T(\\vec{v}) = T(\\vec{u}) + \\vec{0} = T(\\vec{u})$, so $T$ cannot be one-to-one.',
          ],
        },
      ],
      quiz: [
        {
          id: 'q4.2.1',
          type: 'mc',
          q: 'Let $D: \\mathbb{P}_3 \\to \\mathbb{P}_2$ be the differentiation operator $D(p) = p\'(t)$. What is $\\operatorname{ker}(D)$?',
          options: [
            'Only the zero polynomial $0$',
            'All constant polynomials $p(t) = c$',
            'All polynomials of degree 1',
            '$\\mathbb{P}_2$',
          ],
          answer: 1,
          why: 'The derivative of a polynomial is zero if and only if the polynomial is a constant: $p(t) = c$. Thus $\\operatorname{ker}(D)$ is the 1-dimensional subspace of constant polynomials.',
        },
      ],
      recap: [
        'ker(T) is the set of inputs mapped to 0; it is a subspace of Domain V.',
        'range(T) is the set of all outputs; it is a subspace of Codomain W.',
        'T is 1-to-1 iff ker(T) = {0}.',
      ],
      ask: [
        'What is the difference between null space and kernel?',
        'Can ker(T) and range(T) ever be the same set?',
      ],
    },
    {
      id: '4.4',
      chapter: 7,
      title: 'Coordinate Systems & The Isomorphism ℙ₂ → ℝ³',
      summary: 'Represent abstract vectors using unique coordinate vectors [x]_B and harness the coordinate isomorphism between polynomial spaces and Euclidean space.',
      minutes: 24,
      slides: 'Lay §4.4 · Board Photo 21-28-21',
      blocks: [
        {
          t: 'p',
          text: 'If $\\mathcal{B} = \\{\\vec{b}_1, \\dots, \\vec{b}_n\\}$ is an ordered basis for a vector space $V$, then for each $\\vec{x} \\in V$, there exists a **unique** set of scalars $c_1, \\dots, c_n$ such that $\\vec{x} = c_1\\vec{b}_1 + \\dots + c_n\\vec{b}_n$. The vector of weights is the **coordinate vector of $\\vec{x}$ relative to $\\mathcal{B}$**:',
        },
        {
          t: 'formula',
          title: 'Coordinate Vector in ℝⁿ',
          tex: [
            r`[\vec{x}]_{\mathcal{B}} = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix} \in \mathbb{R}^n`,
          ],
          note: r`The mapping $\vec{x} \mapsto [\vec{x}]_{\mathcal{B}}$ is a bijective linear transformation (an **isomorphism**)!`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-21.jpg',
          caption: 'Lecture Board: Coordinate isomorphism [p]_B connecting polynomials in ℙ₂ to vectors in ℝ³.',
          note: 'Standard basis B = {1, t, t²} maps p(t) = a₀ + a₁ t + a₂ t² to [a₀, a₁, a₂]ᵀ in ℝ³!',
        },
        {
          t: 'example',
          title: 'Testing Independence of Polynomials via ℝ³',
          source: 'Board Photo 21-28-21',
          problem: r`Use coordinate vectors to determine whether the polynomials $p_1(t) = 1 + 2t^2$, $p_2(t) = 4 + t + 5t^2$, and $p_3(t) = 3 + 2t$ are linearly independent in $\mathbb{P}_2$.`,
          boardPhoto: 'photo_2026-10-21_21-28-21.jpg',
          steps: [
            {
              say: r`Choose the standard basis $\mathcal{B} = \{1, t, t^2\}$ for $\mathbb{P}_2$. Find coordinate vectors in $\mathbb{R}^3$:`,
              math: [
                r`[p_1]_{\mathcal{B}} = \begin{bmatrix} 1 \\ 0 \\ 2 \end{bmatrix}, \quad [p_2]_{\mathcal{B}} = \begin{bmatrix} 4 \\ 1 \\ 5 \end{bmatrix}, \quad [p_3]_{\mathcal{B}} = \begin{bmatrix} 3 \\ 2 \\ 0 \end{bmatrix}`,
              ],
            },
            {
              say: r`Place these coordinate vectors into a matrix $A$ and evaluate its determinant:`,
              math: [
                r`A = \begin{bmatrix} 1 & 4 & 3 \\ 0 & 1 & 2 \\ 2 & 5 & 0 \end{bmatrix}`,
                r`\det A = 1(0 - 10) - 4(0 - 4) + 3(0 - 2) = -10 + 16 - 6 = 0`,
              ],
            },
            {
              say: r`Since $\det A = 0$, the coordinate vectors in $\mathbb{R}^3$ are linearly dependent. Because the coordinate mapping is an isomorphism, the original polynomials $\{p_1, p_2, p_3\}$ are ALSO **linearly dependent** in $\mathbb{P}_2$!`,
            },
          ],
          answer: r`The polynomials are linearly dependent because their coordinate vectors in $\mathbb{R}^3$ have determinant $0$.`,
        },
      ],
      quiz: [
        {
          id: 'q4.4.1',
          type: 'mc',
          q: 'What is the coordinate vector of the polynomial $p(t) = 5 - 3t + 2t^2$ relative to the standard basis $\\mathcal{B} = \\{1, t, t^2\\}$ of $\\mathbb{P}_2$?',
          options: [
            r`$\begin{bmatrix} 5 \\ -3 \\ 2 \end{bmatrix}$`,
            r`$\begin{bmatrix} 2 \\ -3 \\ 5 \end{bmatrix}$`,
            r`$\begin{bmatrix} 5 \\ 3 \\ 2 \end{bmatrix}$`,
            r`$\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$`,
          ],
          answer: 0,
          why: 'p(t) = 5(1) + (-3)(t) + 2(t²). The weights in order are 5, -3, 2, so the coordinate vector is [5, -3, 2]ᵀ.',
        },
      ],
      recap: [
        'Coordinate vector [x]_B stores the unique weights needed to write x as a combination of basis vectors.',
        'The coordinate mapping x ↦ [x]_B is an isomorphism: it preserves all vector space properties.',
        'Abstract vector problems (in polynomials, matrices) can be solved by converting to Rⁿ and using standard row reduction!',
      ],
      ask: [
        'What is an isomorphism in linear algebra?',
        'How does changing the basis change the coordinate vector?',
      ],
    },
  ],
};
