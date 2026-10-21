import type { Chapter } from './types';
const r = String.raw;

export const ch5: Chapter = {
  n: 5,
  title: 'Determinants & Cramer’s Rule',
  blurb: 'Lay Sections 3.1, 3.2 & 3.3: Cofactor expansion, row operations on determinants, Cramer’s rule with parameter s, the adjugate matrix inverse, and geometric volume.',
  slides: 'Lay 3.1–3.3 · Week 5',
  lessons: [
    {
      id: '3.1',
      chapter: 5,
      title: 'Introduction to Determinants & Cofactor Expansions',
      summary: 'Compute determinants of any n×n matrix using cofactor expansions along the row or column with the most zeros.',
      minutes: 20,
      slides: 'Lay §3.1',
      blocks: [
        {
          t: 'p',
          text: 'For a $1 \\times 1$ matrix $A = [a]$, $\\det A = a$. For a $2 \\times 2$ matrix $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, $\\det A = ad - bc$. For any $n \\times n$ matrix $A$, the determinant is computed recursively using **cofactor expansions**.',
        },
        {
          t: 'formula',
          title: 'Cofactor Definition & Sign Pattern',
          tex: [
            r`C_{ij} = (-1)^{i+j} \det A_{ij}`,
            r`\begin{bmatrix} + & - & + & \dots \\ - & + & - & \dots \\ + & - & + & \dots \\ \vdots & \vdots & \vdots & \ddots \end{bmatrix}`,
          ],
          note: r`$A_{ij}$ is the $(n-1) \times (n-1)$ submatrix obtained by deleting row $i$ and column $j$.`,
        },
        {
          t: 'callout',
          kind: 'idea',
          title: 'The Golden Strategy for Hand Calculation',
          text: [
            'By Lay Theorem 1, you can compute $\\det A$ by expanding along **ANY ROW OR ANY COLUMN**!',
            '**Always choose the row or column containing the greatest number of ZEROS**, as those terms vanish ($0 \\times C_{ij} = 0$), saving vast calculation time.',
          ],
        },
        {
          t: 'formula',
          title: 'Triangular Matrix Determinant Theorem',
          tex: [
            r`\det A = a_{11} a_{22} \dots a_{nn} = \prod_{i=1}^n a_{ii}`,
          ],
          note: r`If $A$ is upper triangular, lower triangular, or diagonal, its determinant is simply the product of entries on the main diagonal!`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-20.jpg',
          caption: 'Lecture Board: Cofactor expansion along a column with multiple zeros',
          note: 'Choosing the column with the most zeros reduces a 4×4 determinant to simple 2×2 or 3×3 calculations.',
        },
      ],
      quiz: [
        {
          id: 'q3.1.1',
          type: 'num',
          q: r`Compute the determinant of the upper triangular matrix $\begin{bmatrix} 2 & 9 & -4 \\ 0 & 3 & 7 \\ 0 & 0 & 5 \end{bmatrix}$.`,
          answer: 30,
          why: 'For any triangular matrix, det(A) is the product of its diagonal entries: 2 × 3 × 5 = 30.',
        },
      ],
      recap: [
        'det(A) can be expanded across ANY row or ANY column.',
        'C_{ij} = (-1)^{i+j} det(A_{ij}) incorporates checkerboard sign (-1)^{i+j}.',
        'Determinant of any triangular matrix is the product of diagonal entries.',
      ],
      ask: [
        'How does cofactor expansion compare in computational speed to Gaussian row elimination?',
      ],
    },
    {
      id: '3.2',
      chapter: 5,
      title: 'Properties of Determinants & Row Operations',
      summary: 'Understand how elementary row operations affect det(A), and apply the multiplicative identity det(AB) = det(A)det(B).',
      minutes: 22,
      slides: 'Lay §3.2 · Board Photo 21-28-09',
      blocks: [
        {
          t: 'p',
          text: 'Row operations provide the fastest method to evaluate determinants for matrices larger than $3 \\times 3$. Each of the three row operations affects the determinant in a precise, predictable way:',
        },
        {
          t: 'table',
          caption: 'Effect of Elementary Row Operations on Determinant',
          head: ['Row Operation', 'Effect on Determinant', 'Formula'],
          rows: [
            ['Row Swap ($R_i \\leftrightarrow R_j$)', 'Reverses sign of determinant', r`$\det B = -\det A$`],
            ['Row Scaling ($c R_i \\to R_i$)', 'Scales determinant by factor $c$', r`$\det B = c \det A$`],
            ['Row Replacement ($R_i + k R_j \\to R_i$)', '**LEAVES DETERMINANT UNCHANGED!**', r`$\det B = \det A$`],
          ],
        },
        {
          t: 'callout',
          kind: 'why',
          title: 'Determinant Multiplicative Theorem (Lay Theorem 6)',
          text: [
            'For any two $n \\times n$ square matrices $A$ and $B$:',
            '$$\\det(AB) = \\det(A) \\cdot \\det(B)$$',
            'Important consequences:',
            '• $\\det(A^{-1}) = \\frac{1}{\\det A}$',
            '• $\\det(A^k) = (\\det A)^k$',
            '• $\\det(A^T) = \\det(A)$',
            '• $\\det(cA) = c^n \\det(A)$ (each of the $n$ rows is multiplied by $c$!).',
            '• Warning: In general, $\\det(A + B) \\ne \\det(A) + \\det(B)$!',
          ],
        },
        {
          t: 'widget',
          id: 'determinantLab',
          title: 'Interactive Determinant & Area Lab',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-16.jpg',
          caption: 'Lecture Board: Effect of row operations on determinants (swap negates, row addition preserves)',
          note: 'The professor demonstrates how row replacement $R_i + c R_j \\to R_i$ leaves $\\det A$ completely unchanged.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-19.jpg',
          caption: 'Lecture Board: Evaluating a 4×4 determinant combining row operations with cofactor expansion',
          note: 'First create zeros in a column using row replacement, then expand along that column for rapid evaluation.',
        },
      ],
      quiz: [
        {
          id: 'q3.2.1',
          type: 'num',
          q: 'If $A$ is a $3 \\times 3$ matrix with $\\det(A) = 4$, compute $\\det(2A)$.',
          answer: 32,
          why: 'For an n × n matrix, det(c A) = cⁿ det(A). Here n = 3, c = 2, so det(2A) = 2³ × 4 = 8 × 4 = 32.',
        },
        {
          id: 'q3.2.2',
          type: 'mc',
          q: 'If matrix $A$ has two identical rows, what is $\\det A$?',
          options: ['1', '-1', '0', 'Depends on the matrix entries'],
          answer: 2,
          why: 'Swapping the two identical rows gives the same matrix, so det(A) = -det(A) => 2 det(A) = 0 => det(A) = 0.',
        },
      ],
      recap: [
        'Row swap changes sign; row scaling scales det; row addition leaves det UNCHANGED.',
        'det(AB) = det(A)det(B).',
        'det(A⁻¹) = 1/det(A).',
        'det(cA) = cⁿ det(A) for n×n matrix.',
        'A matrix is invertible if and only if det(A) ≠ 0.',
      ],
      ask: [
        'Why does det(A+B) not equal det(A) + det(B)?',
        'What is multilinearity of determinants?',
      ],
    },
    {
      id: '3.3',
      chapter: 5,
      title: 'Cramer’s Rule, Adjugate Inverse & Area/Volume',
      summary: 'Solve parametric systems with Cramer’s rule, find matrix inverses using the classical adjugate, and compute geometric volumes.',
      minutes: 24,
      slides: 'Lay §3.3 · Board Photo 21-28-10',
      blocks: [
        {
          t: 'p',
          text: 'When a linear system contains unknown parameters (e.g. engineering parameters, material constants, circuit resistance ratios), numerical row elimination involves messy algebraic expressions. **Cramer’s rule** gives an explicit formula for each variable as a ratio of determinants:',
        },
        {
          t: 'formula',
          title: 'Cramer’s Rule (Lay Theorem 7)',
          tex: [
            r`x_i = \frac{\det A_i(\vec{b})}{\det A}, \quad i = 1, 2, \dots, n`,
          ],
          note: r`Here $A_i(\vec{b})$ is matrix $A$ with column $i$ replaced by the right-hand side vector $\vec{b}$. This formula applies whenever $\det A \ne 0$.`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-10.jpg',
          caption: 'Lecture Board: Cramer’s rule with parameter s, det A(s) roots, and singular failure cases.',
          note: 'Notice the board discussion: when det A(s) = 0, Cramer’s rule cannot be used and the system has 0 or infinitely many solutions.',
        },
        {
          t: 'widget',
          id: 'cramerSolver',
          title: 'Interactive Parametric Cramer Solver',
        },
        {
          t: 'h2',
          text: 'The Classical Adjugate Inverse Formula',
        },
        {
          t: 'formula',
          title: 'Inverse via Adjugate (Lay Theorem 8)',
          tex: [
            r`A^{-1} = \frac{1}{\det A} \operatorname{adj}(A) = \frac{1}{\det A} \begin{bmatrix} C_{11} & C_{21} & \dots & C_{n1} \\ C_{12} & C_{22} & \dots & C_{n2} \\ \vdots & \vdots & \ddots & \vdots \\ C_{1n} & C_{2n} & \dots & C_{nn} \end{bmatrix}`,
          ],
          note: r`CRITICAL: The adjugate matrix $\operatorname{adj}(A)$ is the TRANSPOSE of the cofactor matrix ($C_{ji}$ in row $i$, column $j$)!`,
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-28.jpg',
          caption: 'Lecture Board: Parametric Cramer system with parameter s and singular analysis at s = ±2',
          note: 'Notice the board derivation: $\\det A = 3s^2 - 12 = 3(s^2 - 4)$. The system has a unique solution iff $s \\ne 2$ and $s \\ne -2$.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-29.jpg',
          caption: 'Lecture Board: Classical adjugate formula A⁻¹ = (1/det A) adj(A)',
          note: 'The professor highlights transposing the cofactors: $C_{ji}$ is placed at row $i$, column $j$.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-30.jpg',
          caption: 'Lecture Board: Computing all 9 cofactors C_ij = (-1)^(i+j) det A_ij for a 3×3 matrix',
          note: 'Step-by-step sign tracking with the checkerboard pattern: $+ - + / - + - / + - +$.',
        },
        {
          t: 'board',
          photo: 'photo_2026-10-21_21-28-31.jpg',
          caption: 'Lecture Board: Geometric interpretation of determinant as area of parallelogram in ℝ² and volume in ℝ³',
          note: 'Area is $|\\det [\\vec{u} \\ \\vec{v}]|$; a linear transformation $T(\\vec{x}) = A\\vec{x}$ scales any area by factor $|\\det A|$.',
        },
      ],
      quiz: [
        {
          id: 'q3.3.1',
          type: 'mc',
          q: 'In the adjugate formula $A^{-1} = \\frac{1}{\\det A} \\operatorname{adj}(A)$, what is the $(i, j)$ entry of $\\operatorname{adj}(A)$?',
          options: [
            'Cofactor $C_{ij}$',
            'Cofactor $C_{ji}$ (the transpose of the cofactor matrix)',
            'Minor entry $A_{ij}$',
            '$-C_{ij}$',
          ],
          answer: 1,
          why: 'The adjugate $\\operatorname{adj}(A)$ is defined specifically as the transpose of the matrix of cofactors: entry (i, j) is $C_{ji}$.',
        },
      ],
      recap: [
        'Cramer’s rule: x_i = det(A_i(b)) / det(A).',
        'Cramer’s rule works whenever det(A) ≠ 0; it is invaluable for systems with symbolic parameters.',
        'A⁻¹ = (1/det A) adj(A), where adj(A) is the transpose of the cofactor matrix.',
        'Area of parallelogram is |det [u v]|; volume of parallelepiped is |det [u v w]|.',
      ],
      ask: [
        'Why does the adjugate matrix have transposed cofactor indices?',
        'When is Cramer’s rule preferred over Gaussian elimination?',
      ],
    },
  ],
};
