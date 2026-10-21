import type { Chapter } from './types';
const r = String.raw;

export const ch2: Chapter = {
  n: 2,
  title: 'Linear Independence & 2D Transformations',
  blurb: 'Lay Sections 1.7, 1.8 & 1.9: Independence vs dependence, linear transformations T(x) = Ax, 2D geometric matrices (rotations, shears, reflections), and injective/surjective mappings.',
  slides: 'Lay 1.7–1.9 · Week 2',
  lessons: [
    {
      id: '1.7',
      chapter: 2,
      title: 'Linear Independence & Geometric Meaning',
      summary: 'Determine whether a set of vectors is linearly independent and understand geometric collinearity and coplanarity.',
      minutes: 20,
      slides: 'Lay §1.7 · Board Photo 21-27-49',
      blocks: [
        {
          t: 'p',
          text: 'An indexed set of vectors $\\{\\vec{v}_1, \\dots, \\vec{v}_p\\}$ in $\\mathbb{R}^n$ is said to be **linearly independent** if the vector equation $c_1\\vec{v}_1 + c_2\\vec{v}_2 + \\dots + c_p\\vec{v}_p = \\vec{0}$ has **ONLY the trivial solution** $c_1 = c_2 = \\dots = c_p = 0$.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-27-49.jpg',
          caption: 'Lecture Board: Linear independence definition, homogeneous system Ax = 0, and column pivot conditions.',
          note: 'Notice the theorem: columns of A are linearly independent iff A has a pivot in EVERY column (no free variables).',
        },
        {
          t: 'formula',
          title: 'Linear Dependence Condition',
          tex: [
            r`c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_p\vec{v}_p = \vec{0} \quad \text{with at least one } c_j \ne 0`,
          ],
          note: r`Equivalently, at least one vector is a linear combination of the others.`,
        },
        {
          t: 'callout',
          kind: 'trap',
          title: 'Crucial Quick Tests for Dependence',
          text: [
            '1. **Zero Vector:** Any set containing the zero vector $\\vec{0}$ is AUTOMATICALLY linearly dependent (since $1\\cdot \\vec{0} + 0\\cdot \\vec{v}_1 + \\dots = \\vec{0}$).',
            '2. **Too Many Vectors (Pigeonhole Principle):** If a set in $\\mathbb{R}^n$ contains more than $n$ vectors ($p > n$), it is AUTOMATICALLY linearly dependent (e.g., 3 vectors in $\\mathbb{R}^2$ or 4 vectors in $\\mathbb{R}^3$).',
            '3. **Two Vectors:** A set of two non-zero vectors is linearly dependent IF AND ONLY IF one vector is a multiple of the other (they lie on the same line through the origin).',
          ],
        },
        {
          t: 'widget',
          id: 'vectorSpanLab',
          title: 'Interactive Vector Span & Independence Visualizer',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-04.jpg',
          caption: 'Lecture Board: Testing independence of three vectors by row reducing [v₁ v₂ v₃ | 0]',
          note: 'Because row reduction produces a pivot in every column, only the trivial solution exists, confirming linear independence.',
        },
      ],
      quiz: [
        {
          id: 'q1.7.1',
          type: 'mc',
          q: 'Is the set $\\left\\{ \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}, \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix}, \\begin{bmatrix} 5 \\\\ 4 \\end{bmatrix} \\right\\}$ in $\\mathbb{R}^2$ linearly independent?',
          options: [
            'Yes, because none of them are scalar multiples of each other',
            'No, because there are 3 vectors in $\\mathbb{R}^2$ ($p > n$, so more vectors than entries)',
            'Yes, because the determinant is non-zero',
            'Cannot be determined without row reduction',
          ],
          answer: 1,
          why: 'By Lay Theorem 8, any set of $p$ vectors in $\\mathbb{R}^n$ with $p > n$ must be linearly dependent because there are more columns than rows, guaranteeing at least one free variable.',
        },
        {
          id: 'q1.7.2',
          type: 'mc',
          q: 'The columns of an $m \\times n$ matrix $A$ are linearly independent if and only if:',
          options: [
            'Matrix $A$ has a pivot position in every row',
            'The equation $A\\vec{x} = \\vec{0}$ has only the trivial solution (pivot in every column)',
            'Determinant of $A$ is 0',
            'Number of rows equals number of columns',
          ],
          answer: 1,
          why: 'Linear independence means no non-trivial solution to $A\\vec{x} = \\vec{0}$, which requires zero free variables $\\implies$ a pivot in every column ($n$ pivots).',
        },
      ],
      recap: [
        'Linear independence means c₁v₁ + ... + c_p v_p = 0 only has the trivial solution c = 0.',
        'Columns of A are independent iff Ax = 0 has NO free variables (pivot in every column).',
        'Any set with the zero vector is dependent.',
        'p > n vectors in Rⁿ are always dependent.',
      ],
      ask: [
        'How does linear independence relate to the null space Nul(A)?',
        'Can 3 vectors in R³ be dependent if no two are multiples of each other?',
        'What is the difference between independence and spanning?',
      ],
    },
    {
      id: '1.8',
      chapter: 2,
      title: 'Introduction to Linear Transformations',
      summary: 'Define linear mappings T(x) = Ax, verify linearity axioms, and connect domain, codomain, and range.',
      minutes: 20,
      slides: 'Lay §1.8 · Board Photo 21-27-52',
      blocks: [
        {
          t: 'p',
          text: 'A **transformation (or mapping)** $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is a rule that assigns to each vector $\\vec{x} \\in \\mathbb{R}^n$ a vector $T(\\vec{x}) \\in \\mathbb{R}^m$. The space $\\mathbb{R}^n$ is the **domain**, $\\mathbb{R}^m$ is the **codomain**, and the set of all images $T(\\vec{x})$ is the **range**.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-27-52.jpg',
          caption: 'Lecture Board: Linearity definition, T(u+v) = T(u) + T(v), T(cu) = cT(u), and domain/codomain sets.',
          note: 'Notice the immediate consequence: T(0) = 0 for ANY linear transformation!',
        },
        {
          t: 'formula',
          title: 'Axioms of a Linear Transformation',
          tex: [
            r`1.\ T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v}) \quad \text{for all } \vec{u}, \vec{v} \in \text{Domain}`,
            r`2.\ T(c\vec{u}) = c\,T(\vec{u}) \quad \text{for all scalars } c \text{ and vectors } \vec{u}`,
          ],
          note: r`Superposition property: $T(c_1\vec{u}_1 + \dots + c_p\vec{u}_p) = c_1 T(\vec{u}_1) + \dots + c_p T(\vec{u}_p)$.`,
        },
        {
          t: 'example',
          title: 'Testing Linearity',
          source: 'Lecture Board Problem',
          problem: r`Determine whether $T: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $T(x_1, x_2) = (x_1 + 2, x_2)$ is a linear transformation.`,
          steps: [
            {
              say: r`First check the mandatory zero vector test: Does $T(\vec{0}) = \vec{0}$?`,
              math: r`T(0, 0) = (0 + 2, 0) = (2, 0) \ne (0, 0)`,
            },
            {
              say: r`Since $T(\vec{0}) \ne \vec{0}$, this mapping **fails the first necessary condition of linearity**!`,
            },
            {
              say: r`Geometrically, this is an affine translation (shifting points by 2 units along the x-axis). Translations do NOT preserve the origin and are NOT linear transformations.`,
            },
          ],
          answer: r`$T$ is NOT a linear transformation because $T(\vec{0}) \ne \vec{0}$.`,
        },
      ],
      quiz: [
        {
          id: 'q1.8.1',
          type: 'mc',
          q: 'Which of the following functions $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ is a linear transformation?',
          options: [
            r`$T(x_1, x_2) = (x_1 x_2, x_2)$`,
            r`$T(x_1, x_2) = (x_1 + 1, x_2 - 1)$`,
            r`$T(x_1, x_2) = (3x_1 - 2x_2, x_1 + 5x_2)$`,
            r`$T(x_1, x_2) = (x_1^2, x_2)$`,
          ],
          answer: 2,
          why: 'Option C is defined by matrix multiplication $\\begin{bmatrix} 3 & -2 \\\\ 1 & 5 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix}$, which satisfies both linearity axioms. Options A, B, and D contain non-linear terms or translations.',
        },
      ],
      recap: [
        'A linear transformation preserves addition and scalar multiplication.',
        'Every linear transformation maps 0 to 0: T(0) = 0.',
        'Matrix transformations T(x) = Ax are always linear.',
      ],
      ask: [
        'Why does T(0) = 0 have to hold for every linear map?',
        'Can a rotation about a point other than the origin be a linear transformation?',
      ],
    },
    {
      id: '1.9',
      chapter: 2,
      title: 'The Matrix of a Linear Transformation & 2D Geometry',
      summary: 'Find the standard matrix of any linear transformation using basis vectors e₁, e₂, and master 2D geometric transformations.',
      minutes: 26,
      slides: 'Lay §1.9 · Board Photo 21-27-55',
      blocks: [
        {
          t: 'p',
          text: 'Every linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is completely determined by what it does to the columns of the $n \\times n$ identity matrix $\\vec{e}_1, \\dots, \\vec{e}_n$. The unique matrix $A$ such that $T(\\vec{x}) = A\\vec{x}$ is the **standard matrix** of $T$:',
        },
        {
          t: 'formula',
          title: 'Standard Matrix Theorem (Lay Theorem 10)',
          tex: [
            r`A = \begin{bmatrix} T(\vec{e}_1) & T(\vec{e}_2) & \dots & T(\vec{e}_n) \end{bmatrix}`,
          ],
          note: r`To construct the matrix of ANY geometric transformation, simply calculate where $\vec{e}_1 = [1, 0]^T$ and $\vec{e}_2 = [0, 1]^T$ land!`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-27-55.jpg',
          caption: 'Lecture Board: Standard matrices for counterclockwise rotation by θ, horizontal shear, reflection across y=x, and projection.',
          note: 'Notice the rotation matrix: [cos θ, -sin θ; sin θ, cos θ].',
        },
        {
          t: 'h2',
          text: '2D Geometric Transformations Catalog',
        },
        {
          t: 'table',
          caption: 'Standard 2D Matrix Transformations',
          head: ['Transformation', 'Standard Matrix $A$', 'Effect on Unit Square'],
          rows: [
            [
              'Rotation by angle $\\theta$ CCW',
              r`$\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$`,
              'Rigid rotation around the origin; area and lengths preserved',
            ],
            [
              'Horizontal Shear with factor $k$',
              r`$\begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$`,
              'Pushes top edge horizontally; area preserved (det = 1)',
            ],
            [
              'Vertical Shear with factor $k$',
              r`$\begin{bmatrix} 1 & 0 \\ k & 1 \end{bmatrix}$`,
              'Pushes right edge vertically; area preserved (det = 1)',
            ],
            [
              'Reflection across y-axis',
              r`$\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$`,
              'Flips x-coordinates; reverses orientation (det = -1)',
            ],
            [
              'Reflection across line $y = x$',
              r`$\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$`,
              'Swaps coordinates: $T([x, y]^T) = [y, x]^T$',
            ],
            [
              'Orthogonal Projection onto x-axis',
              r`$\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$`,
              'Flattens entire 2D plane onto horizontal line (det = 0, singular)',
            ],
          ],
        },
        {
          t: 'widget',
          id: 'matrixExplorer',
          title: 'Interactive 2D Matrix Transformation Visualizer',
        },
      ],
      quiz: [
        {
          id: 'q1.9.1',
          type: 'mc',
          q: 'What is the standard matrix of a linear transformation that rotates points in $\\mathbb{R}^2$ counterclockwise by $90^\\circ$ ($\\pi/2$ radians)?',
          options: [
            r`$\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$`,
            r`$\begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}$`,
            r`$\begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}$`,
            r`$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$`,
          ],
          answer: 0,
          why: 'Under 90° CCW rotation, e₁ = [1, 0]ᵀ rotates to [0, 1]ᵀ, and e₂ = [0, 1]ᵀ rotates to [-1, 0]ᵀ. Putting these as columns gives [0 -1; 1 0].',
        },
        {
          id: 'q1.9.2',
          type: 'mc',
          q: 'A linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is ONE-TO-ONE (injective) if and only if:',
          options: [
            'Its standard matrix has a pivot in every column (columns are linearly independent)',
            'Its standard matrix has a pivot in every row',
            'm > n',
            'det A = 0',
          ],
          answer: 0,
          why: 'By Lay Theorem 12, T is one-to-one iff T(x) = 0 has only the trivial solution, which means the columns of standard matrix A are linearly independent (pivot in every column).',
        },
      ],
      recap: [
        'A = [T(e₁) T(e₂) ... T(e_n)] gives the standard matrix of any linear map.',
        'Rotation by θ: [cos θ, -sin θ; sin θ, cos θ].',
        'One-to-one (injective) means pivot in every column (Nul A = {0}).',
        'Onto (surjective) means pivot in every row (Col A = R^m).',
      ],
      ask: [
        'How do I find the matrix for reflection across an arbitrary line y = mx?',
        'Can a transformation from R³ to R² ever be one-to-one?',
        'What is the connection between onto and spanning the codomain?',
      ],
    },
  ],
};
