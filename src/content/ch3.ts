import type { Chapter } from './types';
const r = String.raw;

export const ch3: Chapter = {
  n: 3,
  title: 'Matrix Algebra, Inverses & LU Factorization',
  blurb: 'Lay Sections 2.1, 2.2 & 2.5: Matrix multiplication mechanics, inverse matrix algorithms, the Invertible Matrix Theorem (IMT), and LU matrix decomposition.',
  slides: 'Lay 2.1, 2.2, 2.5 · Week 3',
  lessons: [
    {
      id: '2.1',
      chapter: 3,
      title: 'Matrix Operations & Properties of Multiplication',
      summary: 'Master matrix addition, scalar multiplication, matrix-matrix multiplication (row-column rule vs column combinations), and recognize non-commutativity.',
      minutes: 20,
      slides: 'Lay §2.1',
      blocks: [
        {
          t: 'p',
          text: 'If $A$ is an $m \\times n$ matrix and $B$ is an $n \\times p$ matrix, the product $AB$ is an $m \\times p$ matrix whose columns are $A\\vec{b}_1, A\\vec{b}_2, \\dots, A\\vec{b}_p$. Notice that the number of columns in $A$ must equal the number of rows in $B$ for the product to be defined!',
        },
        {
          t: 'formula',
          title: 'Row-Column Rule for Matrix Entry (i, j)',
          tex: [
            r`(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj} = \sum_{k=1}^n a_{ik} b_{kj}`,
          ],
          note: r`Entry $(i, j)$ is the dot product of Row $i$ of $A$ and Column $j$ of $B$.`,
        },
        {
          t: 'callout',
          kind: 'trap',
          title: 'Crucial Warnings about Matrix Algebra',
          text: [
            '1. **Matrix multiplication is NOT commutative:** in general, $AB \\ne BA$.',
            '2. **Cancellation law does NOT hold:** $AB = AC$ does NOT imply $B = C$ (even if $A \\ne 0$).',
            '3. **Zero divisor property does NOT hold:** $AB = 0$ does NOT imply $A = 0$ or $B = 0$ (two non-zero matrices can multiply to the zero matrix!).',
          ],
        },
        {
          t: 'formula',
          title: 'Transpose Properties',
          tex: [
            r`(A + B)^T = A^T + B^T, \quad (cA)^T = cA^T, \quad (AB)^T = B^T A^T`,
          ],
          note: r`The transpose of a product reverses the order of factors: $(AB)^T = B^T A^T$!`,
        },
      ],
      quiz: [
        {
          id: 'q2.1.1',
          type: 'mc',
          q: 'If $A$ is a $3 \\times 4$ matrix and $B$ is a $4 \\times 2$ matrix, what are the dimensions of $AB$?',
          options: ['4 × 4', '3 × 2', '2 × 3', 'Product is undefined'],
          answer: 1,
          why: 'Inner dimensions (4 and 4) match, so the product is defined and has outer dimensions: 3 rows and 2 columns ($3 \\times 2$).',
        },
        {
          id: 'q2.1.2',
          type: 'mc',
          q: 'Which statement about matrices $A$ and $B$ is generally FALSE?',
          options: [
            '$A(BC) = (AB)C$ (Associative property)',
            '$A(B + C) = AB + AC$ (Distributive property)',
            '$AB = BA$ (Commutative property)',
            '$(AB)^T = B^T A^T$ (Transpose of product)',
          ],
          answer: 2,
          why: 'Matrix multiplication is strictly non-commutative in general: $AB \\ne BA$.',
        },
      ],
      recap: [
        'AB is defined only when cols(A) = rows(B).',
        'Entry (i,j) is row i of A dotted with col j of B.',
        'In general AB ≠ BA, and AB = 0 does not mean A=0 or B=0.',
        '(AB)ᵀ = Bᵀ Aᵀ reverses factor order.',
      ],
      ask: [
        'Can you give an example of two non-zero matrices whose product is zero?',
        'Why does (AB)ᵀ reverse the order of multiplication?',
      ],
    },
    {
      id: '2.2',
      chapter: 3,
      title: 'The Inverse of a Matrix & The Invertible Matrix Theorem',
      summary: 'Calculate matrix inverses using the 2×2 formula and the [A | I] Gauss-Jordan row reduction algorithm, and apply the IMT.',
      minutes: 24,
      slides: 'Lay §2.2 & §2.3 · Board Photo 21-28-02',
      blocks: [
        {
          t: 'p',
          text: 'An $n \\times n$ square matrix $A$ is **invertible (or non-singular)** if there exists an $n \\times n$ matrix $C$ such that $CA = AC = I_n$. The unique matrix $C$ is denoted $A^{-1}$.',
        },
        {
          t: 'formula',
          title: '2 × 2 Matrix Inverse Formula',
          tex: [
            r`A = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \implies A^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}`,
          ],
          note: r`$A$ is invertible if and only if its determinant $\det A = ad - bc \ne 0$.`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-02.jpg',
          caption: 'Lecture Board: Gauss-Jordan inversion algorithm [A | I] ~ [I | A⁻¹] and elementary matrices.',
          note: 'If row reduction of [A | I] fails to produce I on the left, then A is singular (not invertible).',
        },
        {
          t: 'steps',
          title: 'Gauss-Jordan Inversion Algorithm',
          items: [
            {
              title: 'Step 1: Form Augmented Matrix',
              text: 'Set up $\\left[\\begin{array}{c|c} A & I_n \\end{array}\\right]$ by placing the $n \\times n$ identity matrix on the right.',
            },
            {
              title: 'Step 2: Row Reduce to RREF',
              text: 'Apply elementary row operations to reduce the left block $A$ to the identity matrix $I_n$.',
            },
            {
              title: 'Step 3: Read Off Inverse',
              text: 'If $A \\sim I_n$, then $\\left[\\begin{array}{c|c} A & I_n \\end{array}\\right] \\sim \\left[\\begin{array}{c|c} I_n & A^{-1} \\end{array}\\right]$. The right block is $A^{-1}$!',
            },
          ],
        },
        {
          t: 'callout',
          kind: 'why',
          title: 'The Invertible Matrix Theorem (IMT)',
          text: [
            'Let $A$ be a square $n \\times n$ matrix. The following statements are all logically equivalent to $A$ being invertible:',
            '• $A$ is row equivalent to $I_n$ ($n$ pivot positions).',
            '• The columns of $A$ are linearly independent.',
            '• $A\\vec{x} = \\vec{0}$ has only the trivial solution $\\vec{x} = \\vec{0}$ ($\\operatorname{Nul} A = \\{\\vec{0}\\}$).',
            '• For every $\\vec{b} \\in \\mathbb{R}^n$, $A\\vec{x} = \\vec{b}$ has a unique solution $\\vec{x} = A^{-1}\\vec{b}$.',
            '• The columns of $A$ span $\\mathbb{R}^n$ ($\\operatorname{Col} A = \\mathbb{R}^n$).',
            '• The linear transformation $T(\\vec{x}) = A\\vec{x}$ is both one-to-one and onto.',
            '• $A^T$ is an invertible matrix.',
            '• $\\det A \\ne 0$.',
          ],
        },
      ],
      quiz: [
        {
          id: 'q2.2.1',
          type: 'mc',
          q: r`Compute the inverse of $A = \begin{bmatrix} 2 & 3 \\ 1 & 2 \end{bmatrix}$.`,
          options: [
            r`$\begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix}$`,
            r`$\begin{bmatrix} -2 & 3 \\ 1 & -2 \end{bmatrix}$`,
            r`$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$`,
            r`$\begin{bmatrix} 2 & 1 \\ 3 & 2 \end{bmatrix}$`,
          ],
          answer: 0,
          why: 'det(A) = (2)(2) - (3)(1) = 4 - 3 = 1. Using the 2x2 formula: A⁻¹ = (1/1) [2 -3; -1 2] = [2 -3; -1 2]. Check: [2 3; 1 2][2 -3; -1 2] = [4-3 -6+6; 2-2 -3+4] = [1 0; 0 1].',
        },
        {
          id: 'q2.2.2',
          type: 'mc',
          q: 'If $A$ and $B$ are invertible $n \\times n$ matrices, what is $(AB)^{-1}$?',
          options: [
            '$A^{-1} B^{-1}$',
            '$B^{-1} A^{-1}$',
            '$A B^{-1}$',
            '$(A+B)^{-1}$',
          ],
          answer: 1,
          why: 'The inverse of a product reverses order: $(AB)(B^{-1} A^{-1}) = A(B B^{-1})A^{-1} = A I A^{-1} = A A^{-1} = I$.',
        },
      ],
      recap: [
        'For 2x2: A⁻¹ = 1/(ad-bc) [d -b; -c a].',
        'Invertibility algorithm: [A | I] ~ [I | A⁻¹].',
        '(AB)⁻¹ = B⁻¹ A⁻¹ (order reverses).',
        'The Invertible Matrix Theorem ties together pivots, independence, span, determinant != 0, and trivial null space.',
      ],
      ask: [
        'How do I know if a 3x3 matrix is invertible without computing the full inverse?',
        'Why does (AB)⁻¹ reverse the order?',
      ],
    },
    {
      id: '2.5',
      chapter: 3,
      title: 'Matrix Factorization: LU Decomposition',
      summary: 'Factor matrix A into LU (unit lower triangular and upper triangular) and solve Ax = b via forward and back substitution.',
      minutes: 24,
      slides: 'Lay §2.5 · Board Photo 21-27-58',
      blocks: [
        {
          t: 'p',
          text: 'An **$LU$ factorization** decomposes an $m \\times n$ matrix $A$ as $A = LU$, where $L$ is an $m \\times m$ **unit lower triangular matrix** (1s along the main diagonal) and $U$ is an $m \\times n$ **upper triangular (echelon) matrix**.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-27-58.jpg',
          caption: 'Lecture Board: LU factorization algorithm, recording row multipliers in L, and the two-step substitution solve.',
          note: 'Notice: LU requires no row swaps. The multiplier c in row op R_i - c R_j -> R_i goes directly into L_ij = c.',
        },
        {
          t: 'formula',
          title: 'Solving Ax = b using LU Decomposition',
          tex: [
            r`A\vec{x} = \vec{b} \iff (LU)\vec{x} = \vec{b} \iff \begin{cases} 1.\ \text{Solve } L\vec{y} = \vec{b} & \text{(Forward Substitution)} \\ 2.\ \text{Solve } U\vec{x} = \vec{y} & \text{(Back Substitution)} \end{cases}`,
          ],
          note: r`Triangular systems require $O(n^2)$ arithmetic operations, whereas full Gaussian elimination takes $O(n^3)$!`,
        },
        {
          t: 'widget',
          id: 'luDecomposer',
          title: 'Interactive LU Decomposition Stepper',
        },
      ],
      quiz: [
        {
          id: 'q2.5.1',
          type: 'mc',
          q: 'In an LU factorization $A = LU$, what must be true about matrix $L$?',
          options: [
            'It is upper triangular with arbitrary diagonal entries',
            'It is unit lower triangular (entries above diagonal are 0, entries on diagonal are 1)',
            'It must be an orthogonal matrix',
            'It is equal to the transpose of $U$',
          ],
          answer: 1,
          why: 'By definition in Lay Section 2.5, $L$ is a unit lower triangular matrix with 1s along the main diagonal, while $U$ is an echelon form of $A$.',
        },
      ],
      recap: [
        'A = LU factors A into unit lower triangular L and upper triangular U.',
        'Solved in two quick steps: Forward solve Ly = b, then Back substitute Ux = y.',
        'Multipliers used during elimination to create zeros below pivots go directly into the corresponding positions of L.',
      ],
      ask: [
        'What happens to LU decomposition if a row swap is required?',
        'Why is LU factorization preferred over computing A⁻¹ directly in computers?',
      ],
    },
  ],
};
