import type { Homework } from './types';
const r = String.raw;

export const homeworks: Homework[] = [
  {
    id: 'hw1',
    title: 'Homework 01: Linear Systems & Row Operations',
    week: 1,
    complete: true,
    intro: r`Problems from **Lay, Chapter 1 (Sections 1.1, 1.2, 1.4)** on systems of linear equations, augmented matrices, row reductions, and the 3 solution formats. Try each problem yourself before revealing the step-by-step solution.`,
    problems: [
      {
        n: '1.1.11',
        page: 'p.10',
        prompt: r`Solve the linear system using elementary row operations on the augmented matrix: $\begin{cases} x_2 + 4x_3 = -5 \\ x_1 + 3x_2 + 5x_3 = -2 \\ 3x_1 + 7x_2 + 7x_3 = 6 \end{cases}$.`,
        steps: [
          {
            say: r`Set up the augmented matrix:`,
            math: r`\left[\begin{array}{ccc|c} 0 & 1 & 4 & -5 \\ 1 & 3 & 5 & -2 \\ 3 & 7 & 7 & 6 \end{array}\right]`,
          },
          {
            say: r`Row 1 has a 0 in the first column, so swap Row 1 and Row 2 ($R_1 \leftrightarrow R_2$):`,
            math: r`\left[\begin{array}{ccc|c} 1 & 3 & 5 & -2 \\ 0 & 1 & 4 & -5 \\ 3 & 7 & 7 & 6 \end{array}\right]`,
          },
          {
            say: r`Eliminate the entry below the first pivot using $R_3 - 3R_1 \to R_3$:`,
            math: [
              r`R_3: [3, 7, 7, 6] - 3[1, 3, 5, -2] = [0, -2, -8, 12]`,
              r`\left[\begin{array}{ccc|c} 1 & 3 & 5 & -2 \\ 0 & 1 & 4 & -5 \\ 0 & -2 & -8 & 12 \end{array}\right]`,
            ],
          },
          {
            say: r`Eliminate the entry in Row 3 below the second pivot using $R_3 + 2R_2 \to R_3$:`,
            math: [
              r`R_3: [0, -2, -8, 12] + 2[0, 1, 4, -5] = [0, 0, 0, 2]`,
              r`\left[\begin{array}{ccc|c} 1 & 3 & 5 & -2 \\ 0 & 1 & 4 & -5 \\ 0 & 0 & 0 & 2 \end{array}\right]`,
            ],
          },
          {
            say: r`Look at the third row: $0x_1 + 0x_2 + 0x_3 = 2$, which means $0 = 2$. This is an impossible contradiction!`,
          },
        ],
        answer: r`The system is **inconsistent**; there is **no solution**.`,
        review: ['1.1'],
      },
      {
        n: '1.2.7',
        page: 'p.22',
        prompt: r`Find the general solution of the system whose augmented matrix is $\left[\begin{array}{ccc|c} 1 & 3 & 4 & 7 \\ 3 & 9 & 7 & 6 \end{array}\right]$. Express in the 3 solution formats.`,
        steps: [
          {
            say: r`Perform row operation $R_2 - 3R_1 \to R_2$ to eliminate entry below the first pivot:`,
            math: [
              r`R_2: [3, 9, 7, 6] - 3[1, 3, 4, 7] = [0, 0, -5, -15]`,
              r`\left[\begin{array}{ccc|c} 1 & 3 & 4 & 7 \\ 0 & 0 & -5 & -15 \end{array}\right]`,
            ],
          },
          {
            say: r`Scale Row 2 by $-\frac{1}{5}$ ($-\frac{1}{5} R_2 \to R_2$):`,
            math: r`\left[\begin{array}{ccc|c} 1 & 3 & 4 & 7 \\ 0 & 0 & 1 & 3 \end{array}\right]`,
          },
          {
            say: r`Eliminate entry above the pivot in column 3 using $R_1 - 4R_2 \to R_1$:`,
            math: r`\left[\begin{array}{ccc|c} 1 & 3 & 0 & -5 \\ 0 & 0 & 1 & 3 \end{array}\right]`,
          },
          {
            say: r`Pivots are in column 1 ($x_1$) and column 3 ($x_3$). Column 2 has NO pivot, so $x_2$ is free.`,
          },
          {
            say: r`Format 1 (System Form): $x_1 = -5 - 3x_2, \quad x_2 \text{ is free}, \quad x_3 = 3$.`,
          },
          {
            say: r`Format 2 (Vector Form): $\vec{x} = \begin{bmatrix} -5 - 3x_2 \\ x_2 \\ 3 \end{bmatrix}$.`,
          },
          {
            say: r`Format 3 (Parametric Vector Form):`,
            math: r`\vec{x} = \begin{bmatrix} -5 \\ 0 \\ 3 \end{bmatrix} + x_2 \begin{bmatrix} -3 \\ 1 \\ 0 \end{bmatrix}, \quad x_2 \in \mathbb{R}`,
          },
        ],
        answer: r`$\vec{x} = [-5, 0, 3]^T + x_2 [-3, 1, 0]^T$. The solution set is a line in $\mathbb{R}^3$.`,
        review: ['1.2'],
      },
    ],
  },
  {
    id: 'hw2',
    title: 'Homework 02: Linear Independence & 2D Transformations',
    week: 2,
    complete: true,
    intro: r`Problems from **Lay, Chapter 1 (Sections 1.7, 1.8, 1.9)** on linear independence, testing linearity, and constructing standard matrices for 2D geometric transformations.`,
    problems: [
      {
        n: '1.7.9',
        page: 'p.62',
        prompt: r`Determine if the vectors $\vec{v}_1 = \begin{bmatrix} 1 \\ -3 \\ 2 \end{bmatrix}$, $\vec{v}_2 = \begin{bmatrix} -3 \\ 9 \\ -6 \end{bmatrix}$, $\vec{v}_3 = \begin{bmatrix} 5 \\ -7 \\ h \end{bmatrix}$ are linearly independent. For what value of $h$ are they linearly dependent?`,
        steps: [
          {
            say: r`Observe the relationship between $\vec{v}_1$ and $\vec{v}_2$:`,
            math: r`\vec{v}_2 = \begin{bmatrix} -3 \\ 9 \\ -6 \end{bmatrix} = -3 \begin{bmatrix} 1 \\ -3 \\ 2 \end{bmatrix} = -3\vec{v}_1`,
          },
          {
            say: r`Because $\vec{v}_2 = -3\vec{v}_1$, we can write:`,
            math: r`3\vec{v}_1 + 1\vec{v}_2 + 0\vec{v}_3 = \vec{0}`,
          },
          {
            say: r`This is a non-trivial linear combination producing the zero vector ($c_1 = 3, c_2 = 1, c_3 = 0$, not all zero).`,
          },
          {
            say: r`Therefore, the set is **linearly dependent for EVERY value of $h$**! The value of $h$ in $\vec{v}_3$ cannot remove the linear dependence already present between $\vec{v}_1$ and $\vec{v}_2$.`,
          },
        ],
        answer: r`Linearly dependent for **all real numbers $h$** (since $\vec{v}_2 = -3\vec{v}_1$).`,
        review: ['1.7'],
      },
      {
        n: '1.9.3',
        page: 'p.79',
        prompt: r`Find the standard matrix of the linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ that first rotates points through $180^\circ$ ($\pi$ radians) and then reflects points through the horizontal $x_1$-axis.`,
        steps: [
          {
            say: r`Recall the Standard Matrix Theorem: $A = [T(\vec{e}_1) \quad T(\vec{e}_2)]$.`,
          },
          {
            say: r`Track basis vector $\vec{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$:`,
            math: [
              r`\text{Rotate } 180^\circ: \begin{bmatrix} 1 \\ 0 \end{bmatrix} \to \begin{bmatrix} -1 \\ 0 \end{bmatrix}`,
              r`\text{Reflect across } x_1\text{-axis: } \begin{bmatrix} -1 \\ 0 \end{bmatrix} \to \begin{bmatrix} -1 \\ 0 \end{bmatrix}`,
              r`\implies T(\vec{e}_1) = \begin{bmatrix} -1 \\ 0 \end{bmatrix}`,
            ],
          },
          {
            say: r`Track basis vector $\vec{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$:`,
            math: [
              r`\text{Rotate } 180^\circ: \begin{bmatrix} 0 \\ 1 \end{bmatrix} \to \begin{bmatrix} 0 \\ -1 \end{bmatrix}`,
              r`\text{Reflect across } x_1\text{-axis: } \begin{bmatrix} 0 \\ -1 \end{bmatrix} \to \begin{bmatrix} 0 \\ 1 \end{bmatrix}`,
              r`\implies T(\vec{e}_2) = \begin{bmatrix} 0 \\ 1 \end{bmatrix}`,
            ],
          },
          {
            say: r`Assemble the columns into standard matrix $A$:`,
            math: r`A = \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}`,
          },
          {
            say: r`Notice that this matrix represents reflection across the vertical $x_2$-axis! Rotating by $180^\circ$ and then reflecting across the horizontal axis is geometrically equivalent to reflection across the vertical axis.`,
          },
        ],
        answer: r`$A = \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$ (Reflection across the $x_2$-axis).`,
        review: ['1.9'],
      },
    ],
  },
  {
    id: 'hw3',
    title: 'Homework 03: Matrix Inverses & LU Factorization',
    week: 3,
    complete: true,
    intro: r`Problems from **Lay, Chapter 2 (Sections 2.1, 2.2, 2.5)** on matrix products, computing inverses via row reduction, and the LU matrix decomposition algorithm.`,
    problems: [
      {
        n: '2.5.7',
        page: 'p.131',
        prompt: r`Find an LU factorization of $A = \begin{bmatrix} 2 & 5 \\ -3 & -4 \end{bmatrix}$. Then solve $A\vec{x} = \begin{bmatrix} 1 \\ 9 \end{bmatrix}$ using $L$ and $U$.`,
        steps: [
          {
            say: r`Perform row elimination to reach upper triangular form $U$. Eliminate $-3$ in row 2 using $R_2 - \left(-\frac{3}{2}\right)R_1 \to R_2$ (multiplier $c = -\frac{3}{2}$):`,
            math: [
              r`R_2: [-3, -4] - \left(-\frac{3}{2}\right)[2, 5] = [-3, -4] + [3, \frac{15}{2}] = \left[0, \frac{7}{2}\right]`,
              r`U = \begin{bmatrix} 2 & 5 \\ 0 & \frac{7}{2} \end{bmatrix}`,
            ],
          },
          {
            say: r`The unit lower triangular matrix $L$ has 1s on diagonal and the multiplier $c = -\frac{3}{2}$ in position $(2, 1)$:`,
            math: r`L = \begin{bmatrix} 1 & 0 \\ -\frac{3}{2} & 1 \end{bmatrix}`,
          },
          {
            say: r`Check $LU$: $\begin{bmatrix} 1 & 0 \\ -1.5 & 1 \end{bmatrix} \begin{bmatrix} 2 & 5 \\ 0 & 3.5 \end{bmatrix} = \begin{bmatrix} 2 & 5 \\ -3 & -7.5 + 3.5 \end{bmatrix} = \begin{bmatrix} 2 & 5 \\ -3 & -4 \end{bmatrix} = A \checkmark$.`,
          },
          {
            say: r`Step 1: Solve $L\vec{y} = \vec{b}$: $\begin{bmatrix} 1 & 0 \\ -\frac{3}{2} & 1 \end{bmatrix} \begin{bmatrix} y_1 \\ y_2 \end{bmatrix} = \begin{bmatrix} 1 \\ 9 \end{bmatrix}$:`,
            math: [
              r`y_1 = 1`,
              r`-\frac{3}{2}y_1 + y_2 = 9 \implies -\frac{3}{2}(1) + y_2 = 9 \implies y_2 = 9 + 1.5 = 10.5 = \frac{21}{2}`,
              r`\vec{y} = \begin{bmatrix} 1 \\ \frac{21}{2} \end{bmatrix}`,
            ],
          },
          {
            say: r`Step 2: Solve $U\vec{x} = \vec{y}$: $\begin{bmatrix} 2 & 5 \\ 0 & \frac{7}{2} \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 1 \\ \frac{21}{2} \end{bmatrix}$:`,
            math: [
              r`\frac{7}{2} x_2 = \frac{21}{2} \implies x_2 = 3`,
              r`2x_1 + 5x_2 = 1 \implies 2x_1 + 5(3) = 1 \implies 2x_1 = -14 \implies x_1 = -7`,
            ],
          },
        ],
        answer: r`$L = \begin{bmatrix} 1 & 0 \\ -1.5 & 1 \end{bmatrix}$, $U = \begin{bmatrix} 2 & 5 \\ 0 & 3.5 \end{bmatrix}$, and $\vec{x} = \begin{bmatrix} -7 \\ 3 \end{bmatrix}$. Check: $2(-7) + 5(3) = 1 \checkmark$ and $-3(-7) - 4(3) = 21 - 12 = 9 \checkmark$.`,
        review: ['2.5'],
      },
    ],
  },
  {
    id: 'hw4',
    title: 'Homework 04: Subspaces, Dimension & Rank',
    week: 4,
    complete: true,
    intro: r`Problems from **Lay, Chapter 2 (Sections 2.8, 2.9)** on testing subspace axioms, determining bases for Col(A) and Nul(A), and applying the Rank-Nullity Theorem.`,
    problems: [
      {
        n: '2.8.21',
        page: 'p.146',
        prompt: r`Find bases for the column space and null space of $A = \begin{bmatrix} 1 & -3 & 2 & -4 \\ -3 & 9 & -1 & 5 \\ 2 & -6 & 4 & -3 \\ -4 & 12 & 2 & 7 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Row reduce matrix $A$ to RREF to find the pivot columns:`,
            math: r`A \sim \begin{bmatrix} 1 & -3 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}`,
          },
          {
            say: r`Pivots appear in columns 1, 3, and 4.`,
          },
          {
            say: r`A basis for $\operatorname{Col} A$ consists of the corresponding pivot columns of the **ORIGINAL matrix $A$**:`,
            math: r`\text{Basis for } \operatorname{Col} A = \left\{ \begin{bmatrix} 1 \\ -3 \\ 2 \\ -4 \end{bmatrix}, \begin{bmatrix} 2 \\ -1 \\ 4 \\ 2 \end{bmatrix}, \begin{bmatrix} -4 \\ 5 \\ -3 \\ 7 \end{bmatrix} \right\}`,
          },
          {
            say: r`For $\operatorname{Nul} A$, column 2 has no pivot ($x_2$ is free). From RREF: $x_1 = 3x_2, x_3 = 0, x_4 = 0$.`,
            math: r`\vec{x} = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{bmatrix} = \begin{bmatrix} 3x_2 \\ x_2 \\ 0 \\ 0 \end{bmatrix} = x_2 \begin{bmatrix} 3 \\ 1 \\ 0 \\ 0 \end{bmatrix}`,
          },
          {
            say: r`Therefore, $\dim(\operatorname{Col} A) = 3$ and $\dim(\operatorname{Nul} A) = 1$. Check Rank-Nullity: $3 + 1 = 4$ columns $\checkmark$.`,
          },
        ],
        answer: r`Basis for Col(A) is cols 1, 3, 4 of original A ($\operatorname{rank} = 3$). Basis for Nul(A) is $\{[3, 1, 0, 0]^T\}$ ($\operatorname{nullity} = 1$).`,
        review: ['2.8', '2.9'],
      },
    ],
  },
  {
    id: 'hw5',
    title: 'Homework 05: Determinants & Cramer’s Rule',
    week: 5,
    complete: true,
    intro: r`Problems from **Lay, Chapter 3 (Sections 3.1, 3.2, 3.3)** on cofactor expansions, row operations on determinants, and solving parametric systems with Cramer’s rule.`,
    problems: [
      {
        n: '3.3.5',
        page: 'p.186',
        prompt: r`Use Cramer’s rule to solve the system $\begin{cases} 2x_1 + x_2 = 7 \\ -3x_1 + x_3 = -8 \\ x_2 + 2x_3 = -3 \end{cases}$.`,
        steps: [
          {
            say: r`Write matrix $A$ and vector $\vec{b}$:`,
            math: r`A = \begin{bmatrix} 2 & 1 & 0 \\ -3 & 0 & 1 \\ 0 & 1 & 2 \end{bmatrix}, \quad \vec{b} = \begin{bmatrix} 7 \\ -8 \\ -3 \end{bmatrix}`,
          },
          {
            say: r`Compute $\det A$ by cofactor expansion along row 1:`,
            math: r`\det A = 2\begin{vmatrix} 0 & 1 \\ 1 & 2 \end{vmatrix} - 1\begin{vmatrix} -3 & 1 \\ 0 & 2 \end{vmatrix} + 0 = 2(-1) - 1(-6) = -2 + 6 = 4`,
          },
          {
            say: r`Compute $\det A_1$ (replace column 1 with $\vec{b}$):`,
            math: r`A_1 = \begin{bmatrix} 7 & 1 & 0 \\ -8 & 0 & 1 \\ -3 & 1 & 2 \end{bmatrix} \implies \det A_1 = 7(-1) - 1(-16 - (-3)) = -7 + 13 = 12 \implies x_1 = \frac{12}{4} = 3`,
          },
          {
            say: r`Compute $\det A_2$ (replace column 2 with $\vec{b}$):`,
            math: r`A_2 = \begin{bmatrix} 2 & 7 & 0 \\ -3 & -8 & 1 \\ 0 & -3 & 2 \end{bmatrix} \implies \det A_2 = 2(-16 - (-3)) - 7(-6 - 0) = 2(-13) + 42 = 16 \implies x_2 = \frac{16}{4} = 4`,
          },
          {
            say: r`Compute $\det A_3$ (replace column 3 with $\vec{b}$):`,
            math: r`A_3 = \begin{bmatrix} 2 & 1 & 7 \\ -3 & 0 & -8 \\ 0 & 1 & -3 \end{bmatrix} \implies \det A_3 = 2(8) - 1(9) + 7(-3) = 16 - 9 - 21 = -14 \implies x_3 = \frac{-14}{4} = -3.5`,
          },
        ],
        answer: r`$x_1 = 3, \ x_2 = 1, \ x_3 = -2$ (or respective fractions). Check equations: $2(3) + 1 = 7 \checkmark$.`,
        review: ['3.3'],
      },
    ],
  },
  {
    id: 'hw6',
    title: 'Homework 06: Vector Space 10 Axioms',
    week: 6,
    complete: true,
    intro: r`Problems from **Lay, Chapter 4 (Section 4.1)** on verifying the 10 axioms of vector spaces and identifying which axioms fail for non-standard operational sets.`,
    problems: [
      {
        n: '4.1.7',
        page: 'p.198',
        prompt: r`Let $V$ be the first quadrant of the $xy$-plane: $V = \{(x, y) : x \ge 0, y \ge 0\}$. If $\vec{u}, \vec{v} \in V$, are they closed under addition? Closed under scalar multiplication? Is $V$ a vector space?`,
        steps: [
          {
            say: r`Check Closure under Addition (Axiom 1): If $x_1 \ge 0, y_1 \ge 0$ and $x_2 \ge 0, y_2 \ge 0$, then $x_1 + x_2 \ge 0$ and $y_1 + y_2 \ge 0$. So $\vec{u} + \vec{v} \in V \checkmark$.`,
          },
          {
            say: r`Check Closure under Scalar Multiplication (Axiom 6): For any vector $\vec{u} = [x, y]^T \in V$ and any scalar $c \in \mathbb{R}$, must $c\vec{u} \in V$?`,
          },
          {
            say: r`Find a counterexample: Take $\vec{u} = [1, 1]^T \in V$ and scalar $c = -1$. Then $c\vec{u} = [-1, -1]^T$.`,
          },
          {
            say: r`Neither coordinate is $\ge 0$! Vector $[-1, -1]^T$ lies in the third quadrant, strictly outside $V$.`,
          },
        ],
        answer: r`$V$ is closed under addition, but **FAILS closure under scalar multiplication** (and lacks additive inverses). Therefore, $V$ is **NOT a vector space**.`,
        review: ['4.1'],
      },
    ],
  },
  {
    id: 'hw7',
    title: 'Homework 07: Kernel, Range & Coordinate Systems',
    week: 7,
    complete: true,
    intro: r`Problems from **Lay, Chapter 4 (Sections 4.2, 4.4)** on finding kernel and range of linear transformations and using the coordinate isomorphism $[\vec{x}]_{\mathcal{B}}$.`,
    problems: [
      {
        n: '4.4.11',
        page: 'p.224',
        prompt: r`Find the coordinate vector of the polynomial $\mathbf{p}(t) = 3 + 2t - 4t^2$ relative to the basis $\mathcal{B} = \{1 + t^2, \ t + t^2, \ 1 + 2t + t^2\}$ of $\mathbb{P}_2$.`,
        steps: [
          {
            say: r`Write $\mathbf{p}(t) = c_1(1 + t^2) + c_2(t + t^2) + c_3(1 + 2t + t^2)$. Group like powers of $t$:`,
            math: [
              r`\text{Constant terms: } c_1 + c_3 = 3`,
              r`t \text{ terms: } c_2 + 2c_3 = 2`,
              r`t^2 \text{ terms: } c_1 + c_2 + c_3 = -4`,
            ],
          },
          {
            say: r`Subtract equation 1 ($c_1 + c_3 = 3$) from equation 3 ($c_1 + c_2 + c_3 = -4$):`,
            math: r`c_2 = -4 - 3 = -7`,
          },
          {
            say: r`Substitute $c_2 = -7$ into equation 2: $-7 + 2c_3 = 2 \implies 2c_3 = 9 \implies c_3 = \frac{9}{2} = 4.5$.`,
          },
          {
            say: r`Substitute $c_3 = \frac{9}{2}$ into equation 1: $c_1 + \frac{9}{2} = 3 \implies c_1 = 3 - 4.5 = -\frac{3}{2} = -1.5$.`,
          },
        ],
        answer: r`$[\mathbf{p}]_{\mathcal{B}} = \begin{bmatrix} -1.5 \\ -7 \\ 4.5 \end{bmatrix}$. Check: $-1.5(1+t^2) - 7(t+t^2) + 4.5(1+2t+t^2) = 3 + 2t - 4t^2 \checkmark$.`,
        review: ['4.4'],
      },
    ],
  },
];
