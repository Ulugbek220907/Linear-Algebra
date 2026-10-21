import type { Chapter } from './types';
const r = String.raw;

export const ch1: Chapter = {
  n: 1,
  title: 'Linear Systems, Matrices & Network Flow',
  blurb: 'Lay Sections 1.1, 1.2, 1.4 & 1.6: Elementary row operations, REF/RREF, the 3 solution formats taught on the board, and traffic flow network modeling.',
  slides: 'Lay 1.1–1.6 · Week 1',
  lessons: [
    {
      id: '1.1',
      chapter: 1,
      title: 'Systems of Linear Equations & Row Operations',
      summary: 'Represent linear systems with augmented matrices and solve them using the three elementary row operations.',
      minutes: 18,
      slides: 'Lay §1.1',
      blocks: [
        {
          t: 'p',
          text: 'A {{linear equation|An equation that can be written in the form $a_1 x_1 + a_2 x_2 + \dots + a_n x_n = b$, where $a_1, \dots, a_n$ are coefficients and $b$ is a constant}} contains only variables to the first power. A collection of one or more such equations involving the same variables is a **system of linear equations**.',
        },
        {
          t: 'formula',
          title: 'General m × n Linear System',
          tex: [
            r`\begin{aligned} a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= b_1 \\ a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n &= b_2 \\ &\ \ \vdots \\ a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n &= b_m \end{aligned}`,
          ],
          note: r`Here $m$ is the number of equations (rows) and $n$ is the number of variables (columns).`,
        },
        {
          t: 'callout',
          kind: 'idea',
          title: 'The Fundamental Existence & Uniqueness Theorem',
          text: [
            'A linear system has either:',
            '1. **No solution** (inconsistent system: parallel hyperplanes that never meet, row $\\begin{bmatrix} 0 & \\dots & 0 & b \\end{bmatrix}$ with $b \\ne 0$).',
            '2. **Exactly one unique solution** (consistent system with a pivot in every variable column: lines/planes intersecting at a single point).',
            '3. **Infinitely many solutions** (consistent system with at least one free variable: intersection is a line, plane, or higher subspace).',
            'There is NO other case in linear algebra (a system can never have exactly 2 or 3 solutions!).',
          ],
        },
        {
          t: 'h2',
          text: 'The Three Elementary Row Operations',
        },
        {
          t: 'p',
          text: 'Instead of repeatedly writing variables $x_1, x_2, \dots$, we capture the coefficients and right-hand side numbers in an **augmented matrix** $\\begin{bmatrix} A & \\vec{b} \\end{bmatrix}$. We transform the matrix using three reversible operations:',
        },
        {
          t: 'steps',
          title: 'Elementary Row Operations (ERO)',
          items: [
            {
              title: '1. Replacement ($R_i + c R_j \\to R_i$):',
              text: 'Add to one row a multiple of another row. This eliminates variables below or above a pivot.',
            },
            {
              title: '2. Interchange ($R_i \\leftrightarrow R_j$):',
              text: 'Swap two rows. Used when the current pivot position contains a zero.',
            },
            {
              title: '3. Scaling ($c R_i \\to R_i$, with $c \\ne 0$):',
              text: 'Multiply all entries in a row by a non-zero scalar. Used to turn a leading entry into a leading $1$.',
            },
          ],
        },
        {
          t: 'h2',
          text: 'Worked Board Example: 2 Equations with 2 Unknowns',
        },
        {
          t: 'example',
          title: 'Row Reducing a 2 × 3 Augmented Matrix',
          source: 'Lecture Board Problem',
          problem: r`Solve the linear system $\begin{cases} x_1 - 2x_2 = -1 \\ -x_1 + 3x_2 = 3 \end{cases}$ using elementary row operations on its augmented matrix.`,
          steps: [
            {
              say: r`Write the augmented matrix representing the system:`,
              math: r`\left[\begin{array}{cc|c} 1 & -2 & -1 \\ -1 & 3 & 3 \end{array}\right]`,
            },
            {
              say: r`Row 1 already has a leading 1 in column 1. Add Row 1 to Row 2 ($R_2 + R_1 \to R_2$) to eliminate the $-1$ below the pivot:`,
              math: r`\left[\begin{array}{cc|c} 1 & -2 & -1 \\ 0 & 1 & 2 \end{array}\right]`,
            },
            {
              say: r`Row 2 now has a leading 1. Eliminate the $-2$ above it by adding twice Row 2 to Row 1 ($R_1 + 2R_2 \to R_1$):`,
              math: r`\left[\begin{array}{cc|c} 1 & 0 & 3 \\ 0 & 1 & 2 \end{array}\right]`,
            },
            {
              say: r`Read off the unique solution directly from the matrix: $x_1 = 3$ and $x_2 = 2$. Check: $3 - 2(2) = -1 \checkmark$ and $-3 + 3(2) = 3 \checkmark$.`,
            },
          ],
          answer: r`$x_1 = 3,\ x_2 = 2$. The solution set is the single point $(3, 2) \in \mathbb{R}^2$.`,
        },
        {
          t: 'widget',
          id: 'rrefStepper',
          title: 'Interactive Row Reduction Stepper',
        },
      ],
      quiz: [
        {
          id: 'q1.1.1',
          type: 'mc',
          q: 'Which of the following is NOT an elementary row operation?',
          options: [
            'Multiply a row by a non-zero scalar ($c R_i \\to R_i$)',
            'Add a constant scalar $k$ to every entry of a row ($R_i + k \\to R_i$)',
            'Interchange two rows ($R_i \\leftrightarrow R_j$)',
            'Add a multiple of one row to another row ($R_i + c R_j \\to R_i$)',
          ],
          answer: 1,
          why: 'Adding a constant scalar directly to matrix entries alters the linear equations completely! Only row addition, scaling by non-zero scalar, and row swapping preserve the solution set.',
          hint: 'Think about what operations correspond to valid manipulations of algebraic equations.',
        },
        {
          id: 'q1.1.2',
          type: 'mc',
          q: 'If the augmented matrix of a system has a row $\\begin{bmatrix} 0 & 0 & 0 & 5 \\end{bmatrix}$, what does this indicate?',
          options: [
            'The system has infinitely many solutions with $x_3 = 5$',
            'The system has a unique solution',
            'The system is inconsistent (no solution)',
            'Variable $x_4$ is free',
          ],
          answer: 2,
          why: 'The row corresponds to $0x_1 + 0x_2 + 0x_3 = 5$, i.e. $0 = 5$, an impossible contradiction. Therefore, no solution exists.',
        },
        {
          id: 'q1.1.3',
          type: 'num',
          q: 'In the system $\\begin{cases} 2x_1 + 4x_2 = 10 \\\\ x_1 - x_2 = 2 \\end{cases}$, find the value of $x_1$.',
          answer: 3,
          why: 'From eq 2, $x_1 = x_2 + 2$. Substitute into eq 1: $2(x_2 + 2) + 4x_2 = 10 \\implies 6x_2 + 4 = 10 \\implies 6x_2 = 6 \\implies x_2 = 1$. Then $x_1 = 1 + 2 = 3$.',
        },
      ],
      recap: [
        'A linear system has 0, 1, or infinitely many solutions.',
        'Elementary row operations are: row replacement, row interchange, and non-zero scaling.',
        'Row operations are completely reversible; they produce row equivalent matrices with identical solution sets.',
        'A row of the form $[0\\ \\dots\\ 0\\ |\\ b]$ with $b \\ne 0$ means the system is inconsistent.',
      ],
      ask: [
        'Why does a linear system never have exactly two solutions?',
        'Can I multiply a row by zero in row reduction?',
        'What is the difference between a coefficient matrix and an augmented matrix?',
      ],
    },
    {
      id: '1.2',
      chapter: 1,
      title: 'Row Reduction, REF, RREF & The 3 Solution Formats',
      summary: 'Master the algorithm to reach Reduced Row Echelon Form and write free-variable solutions in the 3 formats taught on the board.',
      minutes: 24,
      slides: 'Lay §1.2 · Board Photo 21-27-46',
      blocks: [
        {
          t: 'p',
          text: 'A matrix is in **Row Echelon Form (REF)** if all non-zero rows are above any all-zero rows, and each leading entry (pivot) is strictly to the right of the pivot in the row above. It is in **Reduced Row Echelon Form (RREF)** if every pivot is $1$ and is the *only* non-zero entry in its entire column.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-27-46.jpg',
          caption: 'Lecture Board: RREF elimination and the 3 solution formats (System Form, Vector Form, Parametric Vector Form)',
          note: 'Notice how the professor carefully separates basic variables (pivots in cols 1 & 3) from free variable x₂.',
        },
        {
          t: 'callout',
          kind: 'why',
          title: 'Uniqueness of the Reduced Echelon Form',
          text: [
            'While a matrix can have *many* different echelon forms (REF) depending on the row operations chosen, **each matrix has exactly ONE unique Reduced Row Echelon Form (RREF)**.',
            'Pivot positions and pivot columns are invariants of the matrix.',
          ],
        },
        {
          t: 'h2',
          text: 'The 3 Solution Formats (Board Standard)',
        },
        {
          t: 'p',
          text: 'When a consistent system has free variables, the professor strictly requires students to recognize and write the answer in three standard forms:',
        },
        {
          t: 'steps',
          title: 'The 3 Forms of Presenting Solutions',
          items: [
            {
              title: 'Format 1: System Form',
              text: 'Solve each basic variable explicitly in terms of the free variables. State which variables are free (e.g. $x_1 = 3 + 2x_2$, $x_3 = -1$, with $x_2$ free).',
            },
            {
              title: 'Format 2: Vector Form',
              text: 'Combine all coordinates into a single column vector $\\vec{x} = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = \\begin{bmatrix} 3 + 2x_2 \\\\ x_2 \\\\ -1 \\end{bmatrix}$.',
            },
            {
              title: 'Format 3: Parametric Vector Form',
              text: 'Decompose $\\vec{x}$ into a constant particular vector $\\vec{p}$ plus linear combinations of vectors with free variables as parameters: $\\vec{x} = \\begin{bmatrix} 3 \\\\ 0 \\\\ -1 \\end{bmatrix} + x_2 \\begin{bmatrix} 2 \\\\ 1 \\\\ 0 \\end{bmatrix}$.',
            },
          ],
        },
        {
          t: 'example',
          title: 'Board Problem: Underdetermined System with Free Variable',
          source: 'Board Photo 21-27-46',
          problem: r`Solve the system $\left[\begin{array}{ccc|c} 1 & -2 & -1 & 3 \\ 3 & -6 & -2 & 2 \end{array}\right]$ and present the solution in all 3 formats.`,
          boardPhoto: 'photo_2026-10-21_21-27-46.jpg',
          steps: [
            {
              say: r`Eliminate entry below the first pivot using $R_2 - 3R_1 \to R_2$:`,
              math: [
                r`R_2: [3, -6, -2, 2] - 3[1, -2, -1, 3] = [0, 0, 1, -7]`,
                r`\left[\begin{array}{ccc|c} 1 & -2 & -1 & 3 \\ 0 & 0 & 1 & -7 \end{array}\right]`,
              ],
            },
            {
              say: r`Row 2 has pivot in column 3 with value 1. Eliminate the $-1$ above it in Row 1 via $R_1 + R_2 \to R_1$:`,
              math: r`\left[\begin{array}{ccc|c} 1 & -2 & 0 & -4 \\ 0 & 0 & 1 & -7 \end{array}\right]`,
            },
            {
              say: r`Identify the variables: Column 1 has pivot $\implies x_1$ is basic. Column 3 has pivot $\implies x_3$ is basic. Column 2 has NO pivot $\implies x_2$ is a FREE variable.`,
            },
            {
              say: r`Format 1 (System Form):`,
              math: r`\begin{cases} x_1 = -4 + 2x_2 \\ x_2 \text{ is free} \\ x_3 = -7 \end{cases}`,
            },
            {
              say: r`Format 2 (Vector Form):`,
              math: r`\vec{x} = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = \begin{bmatrix} -4 + 2x_2 \\ x_2 \\ -7 \end{bmatrix}`,
            },
            {
              say: r`Format 3 (Parametric Vector Form): Separate the constant vector from the term containing $x_2$:`,
              math: r`\vec{x} = \begin{bmatrix} -4 \\ 0 \\ -7 \end{bmatrix} + x_2 \begin{bmatrix} 2 \\ 1 \\ 0 \end{bmatrix}, \quad x_2 \in \mathbb{R}`,
            },
          ],
          answer: r`$\vec{x} = \begin{bmatrix} -4 \\ 0 \\ -7 \end{bmatrix} + x_2 \begin{bmatrix} 2 \\ 1 \\ 0 \end{bmatrix}$. Geometrically, this describes a line in $\mathbb{R}^3$ passing through $\vec{p} = [-4, 0, -7]^T$ in the direction $\vec{d} = [2, 1, 0]^T$.`,
        },
      ],
      quiz: [
        {
          id: 'q1.2.1',
          type: 'mc',
          q: 'In an augmented matrix with 4 variable columns, if columns 1 and 3 are pivot columns and the system is consistent, how many free variables are there?',
          options: ['0 free variables', '1 free variable', '2 free variables ($x_2$ and $x_4$)', '3 free variables'],
          answer: 2,
          why: 'The free variables correspond precisely to the columns without pivots. Since columns 2 and 4 have no pivots, $x_2$ and $x_4$ are free (2 free variables).',
        },
        {
          id: 'q1.2.2',
          type: 'mc',
          q: 'Which matrix is in Reduced Row Echelon Form (RREF)?',
          options: [
            r`$\begin{bmatrix} 1 & 2 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$`,
            r`$\begin{bmatrix} 1 & 0 & 3 \\ 0 & 1 & -2 \\ 0 & 0 & 0 \end{bmatrix}$`,
            r`$\begin{bmatrix} 2 & 0 & 4 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix}$`,
            r`$\begin{bmatrix} 0 & 1 & 2 \\ 1 & 0 & 3 \end{bmatrix}$`,
          ],
          answer: 1,
          why: 'Option B satisfies all RREF conditions: pivots are 1, each pivot is the only non-zero entry in its column, and zero rows are at the bottom. In Option A, the entry above the second pivot is 2, not 0.',
        },
      ],
      recap: [
        'RREF is unique for every matrix.',
        'Basic variables correspond to pivot columns; free variables correspond to non-pivot columns.',
        'Parametric vector form decomposes solutions into a particular solution plus a span of direction vectors: x = p + s u + t v.',
        'Geometrically: 0 free variables = point, 1 free variable = line, 2 free variables = plane.',
      ],
      ask: [
        'How do I convert from system form to parametric vector form quickly?',
        'Can a system with more variables than equations have a unique solution?',
        'What does RREF tell us about linear independence?',
      ],
    },
    {
      id: '1.4',
      chapter: 1,
      title: 'Matrix Equation Ax = b, Span & Network Traffic Flow',
      summary: 'Connect matrix-vector multiplication Ax as linear combinations of columns, understand Span, and model real-world traffic network flow.',
      minutes: 22,
      slides: 'Lay §1.4 & §1.6',
      blocks: [
        {
          t: 'p',
          text: 'If $A$ is an $m \\times n$ matrix with columns $\\vec{a}_1, \\dots, \\vec{a}_n$, and $\\vec{x} \\in \\mathbb{R}^n$, then the product $A\\vec{x}$ is defined as the **linear combination of the columns of $A$** using the entries of $\\vec{x}$ as weights:',
        },
        {
          t: 'formula',
          title: 'Matrix-Vector Product (Column Definition)',
          tex: [
            r`A\vec{x} = \begin{bmatrix} \vec{a}_1 & \vec{a}_2 & \dots & \vec{a}_n \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix} = x_1\vec{a}_1 + x_2\vec{a}_2 + \dots + x_n\vec{a}_n`,
          ],
          note: r`The equation $A\vec{x} = \vec{b}$ has a solution if and only if $\vec{b}$ is in the span of the columns of $A$.`,
        },
        {
          t: 'callout',
          kind: 'note',
          title: 'Four Equivalent Statements (Lay Theorem 4)',
          text: [
            'For an $m \\times n$ matrix $A$, the following statements are logically equivalent (all true or all false):',
            'a. For each $\\vec{b} \\in \\mathbb{R}^m$, the equation $A\\vec{x} = \\vec{b}$ has a solution.',
            'b. Each $\\vec{b} \\in \\mathbb{R}^m$ is a linear combination of the columns of $A$.',
            'c. The columns of $A$ span $\\mathbb{R}^m$ (i.e. $\\operatorname{Span}\\{\\vec{a}_1, \\dots, \\vec{a}_n\\} = \\mathbb{R}^m$).',
            'd. $A$ has a **pivot position in every row** (m pivot positions).',
          ],
        },
        {
          t: 'h2',
          text: 'Kirchhoff’s Law for Network Traffic Flow',
        },
        {
          t: 'p',
          text: 'In Section 1.6 and the Week 1 board lectures, systems of linear equations model urban traffic networks. At each intersection or junction node, the conservation law applies:',
        },
        {
          t: 'formula',
          title: 'Junction Flow Conservation Law',
          tex: [r`\sum \text{Flow In} = \sum \text{Flow Out}`],
          note: r`Every one-way street requires $x_i \ge 0$ (cars cannot travel in reverse on a one-way street).`,
        },
        {
          t: 'widget',
          id: 'trafficFlowLab',
          title: 'Interactive 4-Junction Traffic Network',
        },
      ],
      quiz: [
        {
          id: 'q1.4.1',
          type: 'mc',
          q: 'If matrix $A$ is $4 \\times 5$ and has 4 pivot positions, which of the following is true?',
          options: [
            'The equation $A\\vec{x} = \\vec{b}$ has a solution for every $\\vec{b} \\in \\mathbb{R}^4$',
            'The columns of $A$ are linearly independent',
            'The equation $A\\vec{x} = \\vec{0}$ has only the trivial solution',
            'The system has no free variables',
          ],
          answer: 0,
          why: 'By Lay Theorem 4, because $A$ has a pivot position in every row (4 pivots in 4 rows), its columns span $\\mathbb{R}^4$, so $A\\vec{x} = \\vec{b}$ is consistent for every $\\vec{b} \\in \\mathbb{R}^4$.',
        },
        {
          id: 'q1.4.2',
          type: 'num',
          q: 'Compute the entry in row 1 of $A\\vec{x}$ where $A = \\begin{bmatrix} 3 & -2 \\\\ 1 & 4 \\end{bmatrix}$ and $\\vec{x} = \\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix}$.',
          answer: 2,
          why: 'Row 1 entry is $3(4) + (-2)(5) = 12 - 10 = 2$.',
        },
      ],
      recap: [
        'Ax is a linear combination of the columns of A with weights from x.',
        'Ax = b has a solution iff b is in Span{a₁, ..., a_n}.',
        'A has a pivot in every row iff its columns span the entire codomain R^m.',
        'In network flow models, Total Inflow = Total Outflow at every node, and physical realism requires x_i ≥ 0.',
      ],
      ask: [
        'What is the difference between Span{v1, v2} and the matrix [v1 v2]?',
        'Why does a pivot in every row guarantee a solution for any b?',
        'How do negative solutions in traffic flow get interpreted physically?',
      ],
    },
  ],
};
