import type { Chapter } from './types';
const r = String.raw;

export const ch8: Chapter = {
  n: 8,
  title: 'Midterm Preparation, Synthesis & Review',
  blurb: 'Week 8 Midterm Exam mastery: Connecting all chapters via the Invertible Matrix Theorem, high-yield exam patterns, and worked sample exam problems.',
  slides: 'Midterm Prep · Week 8',
  lessons: [
    {
      id: '8.1',
      chapter: 8,
      title: 'Midterm Comprehensive Review & IMT Synthesis',
      summary: 'Synthesize the core theorems from Weeks 1 to 7 into a unified mental model for the midterm examination.',
      minutes: 25,
      slides: 'Midterm Synthesis',
      blocks: [
        {
          t: 'p',
          text: 'The university midterm exam tests how seamlessly you can move between five fundamental perspectives in linear algebra: **linear systems, vector equations, matrix equations, linear transformations, and subspaces**.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-50.jpg',
          caption: 'Lecture Board: The Professor’s Midterm Examination Structure',
          note: 'Q1: Matrices & Determinants (Cofactors & Adjugate inverse). Q2: Systems (Row reduction, $A^{-1}\\vec{b}$, Cramer’s rule). Q3: Linear Transformations (Col A range, Nul A kernel, Rank-Nullity). Q4: Vector Spaces (10 Axioms proof).',
        },
        {
          t: 'table',
          caption: 'The Master Translation Dictionary of Linear Algebra',
          head: ['Algebraic View', 'Vector View', 'Matrix View', 'Geometric / Mapping View', 'Subspace View'],
          rows: [
            [
              'System has unique solution for all $\\vec{b}$',
              'Columns $\\{\\vec{a}_j\\}$ span $\\mathbb{R}^n$ and are linearly independent',
              '$A$ is row equivalent to $I_n$; $\\det A \\ne 0$',
              '$T(\\vec{x}) = A\\vec{x}$ is both one-to-one and onto',
              '$\\operatorname{Col} A = \\mathbb{R}^n$ and $\\operatorname{Nul} A = \\{\\vec{0}\\}$',
            ],
            [
              'Homogeneous system $A\\vec{x} = \\vec{0}$ has non-trivial solution',
              'Columns of $A$ are linearly dependent',
              'Pivot in fewer than $n$ columns; $\\det A = 0$',
              '$T(\\vec{x}) = A\\vec{x}$ is NOT one-to-one; squashes space',
              '$\\dim(\\operatorname{Nul} A) \\ge 1$; $\\operatorname{nullity}(A) > 0$',
            ],
            [
              '$A\\vec{x} = \\vec{b}$ is inconsistent for some $\\vec{b}$',
              'Columns of $A$ do NOT span $\\mathbb{R}^m$',
              'At least one row has no pivot ($< m$ pivots)',
              '$T(\\vec{x}) = A\\vec{x}$ is NOT onto',
              '$\\operatorname{Col} A$ is a strict proper subspace of $\\mathbb{R}^m$',
            ],
          ],
        },
        {
          t: 'callout',
          kind: 'why',
          title: 'The Golden Midterm Rule: Check Matrix Shape!',
          text: [
            '• If $A$ is **$m \\times n$ with $m < n$** (more columns than rows, "wide" matrix):',
            '  It CANNOT be one-to-one! The columns MUST be linearly dependent (at least $n-m$ free variables).',
            '• If $A$ is **$m \\times n$ with $m > n$** (more rows than columns, "tall" matrix):',
            '  It CANNOT be onto! Its columns CANNOT span $\\mathbb{R}^m$ (at most $n$ pivots, fewer than $m$ rows).',
          ],
        },
        {
          t: 'h2',
          text: 'Midterm Sample Exam Question: The Parameter Challenge',
        },
        {
          t: 'example',
          title: 'Midterm Exam Level: For which values of h is the system consistent?',
          source: 'Midterm Sample Problem',
          problem: r`Given the vectors $\vec{v}_1 = \begin{bmatrix} 1 \\ 4 \\ -2 \end{bmatrix}$, $\vec{v}_2 = \begin{bmatrix} -2 \\ -3 \\ 7 \end{bmatrix}$, and $\vec{y} = \begin{bmatrix} 5 \\ 7 \\ h \end{bmatrix}$. For which values of $h$ is $\vec{y}$ in $\operatorname{Span}\{\vec{v}_1, \vec{v}_2\}$?`,
          steps: [
            {
              say: r`Vector $\vec{y}$ is in $\operatorname{Span}\{\vec{v}_1, \vec{v}_2\}$ iff the augmented matrix $[\vec{v}_1\ \vec{v}_2\ |\ \vec{y}]$ is consistent:`,
              math: r`\left[\begin{array}{cc|c} 1 & -2 & 5 \\ 4 & -3 & 7 \\ -2 & 7 & h \end{array}\right]`,
            },
            {
              say: r`Eliminate entries in column 1 using $R_2 - 4R_1 \to R_2$ and $R_3 + 2R_1 \to R_3$:`,
              math: [
                r`R_2: [4, -3, 7] - 4[1, -2, 5] = [0, 5, -13]`,
                r`R_3: [-2, 7, h] + 2[1, -2, 5] = [0, 3, h + 10]`,
                r`\left[\begin{array}{cc|c} 1 & -2 & 5 \\ 0 & 5 & -13 \\ 0 & 3 & h + 10 \end{array}\right]`,
              ],
            },
            {
              say: r`Eliminate entry in row 3, column 2 using $R_3 - \frac{3}{5}R_2 \to R_3$ (or $5R_3 - 3R_2 \to R_3$):`,
              math: [
                r`5R_3 - 3R_2 = [0, 15, 5h + 50] - [0, 15, -39] = [0, 0, 5h + 89]`,
                r`\left[\begin{array}{cc|c} 1 & -2 & 5 \\ 0 & 5 & -13 \\ 0 & 0 & 5h + 89 \end{array}\right]`,
              ],
            },
            {
              say: r`The system is consistent if and only if there is NO pivot in the augmented column! This requires row 3 to NOT read $[0, 0\ |\ \text{non-zero}]$:`,
              math: r`5h + 89 = 0 \implies 5h = -89 \implies h = -\frac{89}{5} = -17.8`,
            },
          ],
          answer: r`$\vec{y} \in \operatorname{Span}\{\vec{v}_1, \vec{v}_2\}$ if and only if $h = -\frac{89}{5}$ (or $-17.8$). For any other value of $h$, the system is inconsistent.`,
        },
      ],
      quiz: [
        {
          id: 'q8.1.1',
          type: 'mc',
          q: 'If $A$ is a $5 \\times 5$ matrix with $\\det A = 0$, what can you deduce about $A\\vec{x} = \\vec{0}$?',
          options: [
            'It has only the trivial solution',
            'It has infinitely many non-trivial solutions (null space dimension ≥ 1)',
            'It has no solution',
            'The columns span $\\mathbb{R}^5$',
          ],
          answer: 1,
          why: 'By the Invertible Matrix Theorem, det(A) = 0 means A is singular, meaning its columns are linearly dependent and Ax = 0 has non-trivial solutions (free variables).',
        },
      ],
      recap: [
        'Midterm questions frequently feature unknown parameter h or s.',
        'A system is consistent iff there is no row of the form [0 ... 0 | b] with b ≠ 0.',
        'Wide matrices (m < n) cannot be 1-to-1; tall matrices (m > n) cannot be onto.',
        'Master the IMT: 10 equivalent conditions for invertibility.',
      ],
      ask: [
        'What are the most heavily weighted topics on the midterm?',
        'How can I quickly check my arithmetic on exam row reductions?',
      ],
    },
    {
      id: '8.2',
      chapter: 8,
      title: 'Practice Exam Problems & Common Mistakes',
      summary: 'Work through typical midterm exam questions and avoid the classical traps in vector spaces, rank, and determinants.',
      minutes: 20,
      slides: 'Midterm Practice Problems',
      blocks: [
        {
          t: 'p',
          text: 'Review the high-frequency exam questions that professors use to test deep conceptual understanding rather than rote mechanical steps.',
        },
        {
          t: 'callout',
          kind: 'trap',
          title: 'The Top 5 Midterm Exam Pitfalls',
          text: [
            '1. **Column Space Basis:** Writing down columns from the RREF instead of the ORIGINAL matrix $A$.',
            '2. **Determinant of $cA$:** Writing $\\det(2A) = 2\\det A$ instead of $2^n \\det A$ for an $n \\times n$ matrix.',
            '3. **Subspace Zero Test:** Forgetting to verify that $\\vec{0} \\in H$ before doing algebraic closure proofs.',
            '4. **Non-standard Axiom 7:** Confusing $c(\\vec{u} \\oplus \\vec{v})$ with $c\\vec{u} \\oplus c\\vec{v}$ in shifted operations.',
            '5. **Sign in 2×2 Inverse:** Forgetting the minus signs in the off-diagonals of $\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.',
          ],
        },
      ],
      quiz: [
        {
          id: 'q8.2.1',
          type: 'mc',
          q: 'Which set is guaranteed to be a subspace of $\\mathbb{R}^3$?',
          options: [
            'The set of all points $(x, y, z)$ such that $x + y + z = 1$',
            'The set of all vectors $(x, y, z)$ such that $xy = 0$',
            'The set of all solutions to the homogeneous linear equation $2x - 3y + z = 0$',
            'The set of all vectors with integer coordinates',
          ],
          answer: 2,
          why: 'Option C is the null space of the 1 × 3 matrix [2 -3 1], which is a plane passing through the origin, guaranteed to be a subspace. Option A does not contain (0,0,0); Option B fails closure under addition; Option D fails closure under real scalar multiplication.',
        },
      ],
      recap: [
        'Subspaces must contain 0, be closed under addition, and closed under scalar mult.',
        'Col(A) basis comes from ORIGINAL matrix columns; Nul(A) basis comes from parametric vector form.',
        'Always check matrix dimensions m × n before starting any calculation.',
      ],
      ask: [
        'How should I allocate my time during the midterm exam?',
      ],
    },
  ],
};
