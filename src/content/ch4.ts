import type { Chapter } from './types';
const r = String.raw;

export const ch4: Chapter = {
  n: 4,
  title: 'Subspaces, Dimension & The Rank Theorem',
  blurb: 'Lay Sections 2.7, 2.8 & 2.9: Subspaces of ℝⁿ, finding bases for Col(A) and Nul(A), dimension, the Rank-Nullity Theorem, and computer graphics homogeneous coordinates.',
  slides: 'Lay 2.7–2.9 · Week 4',
  lessons: [
    {
      id: '2.8',
      chapter: 4,
      title: 'Subspaces of ℝⁿ, Col(A) & Nul(A)',
      summary: 'Define subspaces, verify the 3 closure properties, and construct bases for Column Space and Null Space.',
      minutes: 24,
      slides: 'Lay §2.8 · Board Photo 21-28-03',
      blocks: [
        {
          t: 'p',
          text: 'A **subspace** of $\\mathbb{R}^n$ is any subset $H$ of $\\mathbb{R}^n$ that has three specific properties:',
        },
        {
          t: 'formula',
          title: 'The 3 Subspace Axioms',
          tex: [
            r`1.\ \vec{0} \in H \quad \text{(Contains the zero vector)}`,
            r`2.\ \vec{u}, \vec{v} \in H \implies \vec{u} + \vec{v} \in H \quad \text{(Closed under vector addition)}`,
            r`3.\ \vec{u} \in H, c \in \mathbb{R} \implies c\vec{u} \in H \quad \text{(Closed under scalar multiplication)}`,
          ],
          note: r`Geometrically in $\mathbb{R}^3$, subspaces can ONLY be: the origin $\{\vec{0}\}$, a line passing through the origin, a plane passing through the origin, or the entire space $\mathbb{R}^3$!`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-03.jpg',
          caption: 'Lecture Board: Subspace definition, Col(A) in Rᵐ vs Nul(A) in Rⁿ, and finding bases.',
          note: 'Col(A) is spanned by all columns of A; Nul(A) is the set of all solutions to Ax = 0.',
        },
        {
          t: 'compare',
          left: {
            title: 'Column Space: Col(A)',
            items: [
              'Subspace of **$\\mathbb{R}^m$** (codomain dimension = number of rows)',
              'Defined as the span of the columns of $A$: $\\operatorname{Col} A = \\operatorname{Span}\\{\\vec{a}_1, \\dots, \\vec{a}_n\\}$',
              'Composed of all vectors $\\vec{b}$ for which $A\\vec{x} = \\vec{b}$ is consistent',
              '**Basis:** The **PIVOT COLUMNS OF ORIGINAL MATRIX $A$** (never use columns of RREF!)',
            ],
          },
          right: {
            title: 'Null Space: Nul(A)',
            items: [
              'Subspace of **$\\mathbb{R}^n$** (domain dimension = number of columns)',
              'Defined as the set of all solutions to $A\\vec{x} = \\vec{0}$: $\\operatorname{Nul} A = \\{\\vec{x} \\in \\mathbb{R}^n : A\\vec{x} = \\vec{0}\\}$',
              'Implicitly described by an equation; made explicit via row reduction',
              '**Basis:** The vectors attached to free variables in the **parametric vector form** of $A\\vec{x} = \\vec{0}$',
            ],
          },
        },
        {
          t: 'callout',
          kind: 'trap',
          title: 'The #1 Column Space Exam Mistake!',
          text: [
            'Row operations change the column space! $\\operatorname{Col}(\\text{RREF}) \\ne \\operatorname{Col}(A)$.',
            'To find a basis for $\\operatorname{Col} A$, identify which columns have pivots in RREF, but **ALWAYS select the corresponding columns from the ORIGINAL matrix $A$**!',
          ],
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-09.jpg',
          caption: 'Lecture Board: Extracting basis for Col A from original pivot columns of A',
          note: 'The professor marks pivot columns in REF, then reaches back to matrix A to extract the basis vectors.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-11.jpg',
          caption: 'Lecture Board: Extracting basis for Nul A from free variable vectors in parametric form',
          note: 'Each free variable corresponds to one independent basis vector in Nul A.',
        },
      ],
      quiz: [
        {
          id: 'q2.8.1',
          type: 'mc',
          q: 'If $A$ is a $4 \\times 7$ matrix, then $\\operatorname{Col} A$ is a subspace of __ and $\\operatorname{Nul} A$ is a subspace of __.',
          options: [
            '$\\mathbb{R}^4$ and $\\mathbb{R}^7$',
            '$\\mathbb{R}^7$ and $\\mathbb{R}^4$',
            '$\\mathbb{R}^4$ and $\\mathbb{R}^4$',
            '$\\mathbb{R}^7$ and $\\mathbb{R}^7$',
          ],
          answer: 0,
          why: 'The columns of $A$ have 4 entries (vectors in $\\mathbb{R}^4$), so $\\operatorname{Col} A$ is in $\\mathbb{R}^4$. Vectors $\\vec{x}$ that multiply $A$ have 7 entries, so $\\operatorname{Nul} A$ is in $\\mathbb{R}^7$.',
        },
        {
          id: 'q2.8.2',
          type: 'mc',
          q: 'Is the set $H = \\left\\{ \\begin{bmatrix} x \\\\ y \\end{bmatrix} \\in \\mathbb{R}^2 : x + 2y = 1 \\right\\}$ a subspace of $\\mathbb{R}^2$?',
          options: [
            'Yes, because it is a straight line',
            'No, because it does not contain the zero vector $\\vec{0} = [0, 0]^T$ ($0 + 2(0) = 0 \\ne 1$)',
            'Yes, because it is closed under addition',
            'Cannot be determined without a matrix',
          ],
          answer: 1,
          why: 'A line not passing through the origin does NOT contain the zero vector $\\vec{0}$, immediately violating the first axiom of a subspace.',
        },
      ],
      recap: [
        'A subspace must contain 0 and be closed under addition and scalar multiplication.',
        'Col(A) is in Rᵐ (spanned by columns); basis is original pivot columns of A.',
        'Nul(A) is in Rⁿ (solutions to Ax = 0); basis comes from parametric vector form.',
        'Never take basis vectors for Col(A) from the reduced echelon form.',
      ],
      ask: [
        'Why does a plane have to pass through the origin to be a subspace?',
        'How do I find a basis for Nul(A) if there are no free variables?',
      ],
    },
    {
      id: '2.9',
      chapter: 4,
      title: 'Dimension, Rank & The Rank-Nullity Theorem',
      summary: 'Calculate dimension and rank, and apply the cornerstone Rank-Nullity Theorem rank(A) + nullity(A) = n.',
      minutes: 22,
      slides: 'Lay §2.9 · Board Photo 21-28-05',
      blocks: [
        {
          t: 'p',
          text: 'The **dimension** of a non-zero subspace $H$, denoted $\\dim H$, is the number of vectors in any basis for $H$. The dimension of the zero subspace $\\{\\vec{0}\\}$ is defined to be $0$.',
        },
        {
          t: 'formula',
          title: 'Rank of a Matrix',
          tex: [
            r`\operatorname{rank}(A) = \dim(\operatorname{Col} A) = \text{number of pivot columns in } A`,
            r`\operatorname{nullity}(A) = \dim(\operatorname{Nul} A) = \text{number of free variables in } A\vec{x} = \vec{0}`,
          ],
          note: r`Every column of $A$ is either a pivot column or a free variable column.`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-05.jpg',
          caption: 'Lecture Board: Rank-Nullity Theorem statement, proofs, and 4x6 matrix rank dimension analysis.',
          note: 'Notice the fundamental identity: rank(A) + dim(Nul A) = number of columns = n.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-14.jpg',
          caption: 'Lecture Board: Dimensions of subspaces and verifying rank(A) + nullity(A) = n',
          note: 'Notice the dimension count across rows vs columns and the partition of domain ℝⁿ.',
        },
        {
          t: 'callout',
          kind: 'why',
          title: 'The Rank-Nullity Theorem (Lay Theorem 14)',
          text: [
            'If a matrix $A$ has $n$ columns, then:',
            '$$\\operatorname{rank}(A) + \\dim(\\operatorname{Nul} A) = n$$',
            '• $\\operatorname{rank}(A)$ is the number of pivot columns.',
            '• $\\dim(\\operatorname{Nul} A)$ is the number of non-pivot (free variable) columns.',
            'Their sum must equal the total number of columns $n$!',
          ],
        },
      ],
      quiz: [
        {
          id: 'q2.9.1',
          type: 'num',
          q: 'If a $5 \\times 8$ matrix $A$ has $\\operatorname{rank}(A) = 3$, what is $\\dim(\\operatorname{Nul} A)$?',
          answer: 5,
          why: 'By the Rank-Nullity Theorem, rank(A) + dim(Nul A) = n (number of columns). Here n = 8, so 3 + dim(Nul A) = 8 => dim(Nul A) = 5.',
        },
        {
          id: 'q2.9.2',
          type: 'mc',
          q: 'Can a $3 \\times 5$ matrix have a 1-dimensional null space?',
          options: [
            'Yes, if rank(A) = 4',
            'No, because the maximum possible rank of a 3 × 5 matrix is 3, so dim(Nul A) = 5 - rank(A) ≥ 5 - 3 = 2',
            'Yes, if all rows are independent',
            'Cannot be determined',
          ],
          answer: 1,
          why: 'A matrix cannot have more pivot positions than rows. Since rows = 3, max rank(A) is 3. By Rank-Nullity, dim(Nul A) = 5 - rank(A) ≥ 5 - 3 = 2. It can never be 1!',
        },
      ],
      recap: [
        'Dimension is the number of vectors in any basis.',
        'rank(A) = number of pivot columns = dim(Col A).',
        'nullity(A) = number of free variables = dim(Nul A).',
        'Rank-Nullity Theorem: rank(A) + dim(Nul A) = n (total columns).',
      ],
      ask: [
        'Why does a matrix have the same row rank and column rank?',
        'Can rank(A) be greater than the number of rows of A?',
      ],
    },
    {
      id: '2.7',
      chapter: 4,
      title: 'Computer Graphics & Homogeneous Coordinates',
      summary: 'Represent 2D and 3D affine transformations (translations, rotations, scaling) seamlessly using 3×3 and 4×4 homogeneous coordinates.',
      minutes: 18,
      slides: 'Lay §2.7 · Board Photo 21-28-08',
      blocks: [
        {
          t: 'p',
          text: 'In 2D computer graphics, a translation $(x, y) \\to (x + h, y + k)$ cannot be represented by a $2 \\times 2$ matrix because linear maps must send $\\vec{0}$ to $\\vec{0}$. To solve this, graphics systems map $(x, y) \\in \\mathbb{R}^2$ to **homogeneous coordinates** $(x, y, 1) \\in \\mathbb{R}^3$!',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-08.jpg',
          caption: 'Lecture Board: 3x3 homogeneous transformation matrix combining rotation, scaling, and translation.',
          note: 'Notice the last row is [0, 0, 1], keeping the homogeneous coordinate 1 invariant.',
        },
        {
          t: 'formula',
          title: '3 × 3 2D Graphics Transformation Matrix',
          tex: [
            r`\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} a & b & h \\ c & d & k \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix} = \begin{bmatrix} ax + by + h \\ cx + dy + k \\ 1 \end{bmatrix}`,
          ],
          note: r`Here $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ performs linear operations (rotation/scaling/shearing) and $\begin{bmatrix} h \\ k \end{bmatrix}$ performs the translation!`,
        },
      ],
      quiz: [
        {
          id: 'q2.7.1',
          type: 'mc',
          q: 'Why do computer graphics engines use $4 \\times 4$ matrices to represent 3D transformations?',
          options: [
            'Because 3D space actually has 4 physical dimensions',
            'To represent translations as matrix multiplications alongside rotations and scaling',
            'To make calculation slower and more precise',
            'Because inverse matrices do not exist in 3D',
          ],
          answer: 1,
          why: 'Homogeneous coordinates allow affine translations (which are not linear in 3D) to be computed as linear matrix multiplications in 4D projective space.',
        },
      ],
      recap: [
        'Translations are affine, not linear: they cannot be represented by 2x2 matrices.',
        'Homogeneous coordinates add a coordinate of 1: [x, y, 1]ᵀ in 2D and [x, y, z, 1]ᵀ in 3D.',
        'Compositions of rotations, shears, and translations are achieved by multiplying 3x3 or 4x4 homogeneous matrices.',
      ],
      ask: [
        'How does rotation around an arbitrary point (x0, y0) work using homogeneous matrices?',
      ],
    },
  ],
};
