import type { Homework } from './types';
const r = String.raw;

export const homeworks: Homework[] = [
  {
    id: 'hw1',
    title: 'Homework 01: Linear Systems, Augmented Matrices & Solution Formats',
    week: 1,
    complete: true,
    intro: r`Weekly assigned problems from **Lay Sections 1.1 (p.10 #11, 13, 15, 23, 27), 1.2 (p.22 #13), and 1.4 (p.40 #5, 7)**. Covers elementary row operations, consistency, general solutions with free variables in the 3 formats, and matrix-vector equations.`,
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
        n: '1.1.13',
        page: 'p.10',
        prompt: r`Solve the linear system using elementary row operations: $\begin{cases} x_1 - 3x_3 = 8 \\ 2x_1 + 2x_2 + 9x_3 = 7 \\ x_2 + 5x_3 = -2 \end{cases}$.`,
        steps: [
          {
            say: r`Write down the augmented matrix:`,
            math: r`\left[\begin{array}{ccc|c} 1 & 0 & -3 & 8 \\ 2 & 2 & 9 & 7 \\ 0 & 1 & 5 & -2 \end{array}\right]`,
          },
          {
            say: r`Eliminate $x_1$ from row 2 using $R_2 - 2R_1 \to R_2$:`,
            math: [
              r`R_2: [2, 2, 9, 7] - 2[1, 0, -3, 8] = [0, 2, 15, -9]`,
              r`\left[\begin{array}{ccc|c} 1 & 0 & -3 & 8 \\ 0 & 2 & 15 & -9 \\ 0 & 1 & 5 & -2 \end{array}\right]`,
            ],
          },
          {
            say: r`Eliminate $x_2$ from row 2 by subtracting $2R_3$ from $R_2$ ($R_2 - 2R_3 \to R_2$):`,
            math: [
              r`[0, 2, 15, -9] - 2[0, 1, 5, -2] = [0, 0, 5, -5]`,
              r`\text{Scaling gives: } R_2 \to \frac{1}{5}R_2: [0, 0, 1, -1] \implies x_3 = -1`,
            ],
          },
          {
            say: r`Substitute $x_3 = -1$ into row 3 ($x_2 + 5(-1) = -2 \implies x_2 = 3$) and row 1 ($x_1 - 3(-1) = 8 \implies x_1 = 5$).`,
          },
        ],
        answer: r`Unique solution: $x_1 = 5, \quad x_2 = 3, \quad x_3 = -1$.`,
        review: ['1.1'],
      },
      {
        n: '1.1.15',
        page: 'p.10',
        prompt: r`Solve the $4 \times 4$ system: $\begin{cases} x_1 + 3x_3 = 2 \\ x_2 - 3x_4 = 3 \\ -2x_2 + 3x_3 + 2x_4 = 1 \\ 3x_1 + 7x_4 = -5 \end{cases}$.`,
        steps: [
          {
            say: r`Set up the $4 \times 5$ augmented matrix:`,
            math: r`\left[\begin{array}{cccc|c} 1 & 0 & 3 & 0 & 2 \\ 0 & 1 & 0 & -3 & 3 \\ 0 & -2 & 3 & 2 & 1 \\ 3 & 0 & 0 & 7 & -5 \end{array}\right]`,
          },
          {
            say: r`Perform row operations: $R_4 - 3R_1 \to R_4$ and $R_3 + 2R_2 \to R_3$:`,
            math: [
              r`R_4: [3, 0, 0, 7, -5] - 3[1, 0, 3, 0, 2] = [0, 0, -9, 7, -11]`,
              r`R_3: [0, -2, 3, 2, 1] + 2[0, 1, 0, -3, 3] = [0, 0, 3, -4, 7]`,
            ],
          },
          {
            say: r`Eliminate entry below pivot in column 3: $R_4 + 3R_3 \to R_4$:`,
            math: r`[0, 0, -9, 7, -11] + 3[0, 0, 3, -4, 7] = [0, 0, 0, -5, 10] \implies -5x_4 = 10 \implies x_4 = -2`,
          },
          {
            say: r`Back-substitute: $3x_3 - 4(-2) = 7 \implies 3x_3 = -1 \implies x_3 = -\frac{1}{3}$. Then $x_2 - 3(-2) = 3 \implies x_2 = -3$. Finally $x_1 + 3(-1/3) = 2 \implies x_1 = 3$.`,
          },
        ],
        answer: r`Unique solution: $x_1 = 3, \quad x_2 = -3, \quad x_3 = -\frac{1}{3}, \quad x_4 = -2$.`,
        review: ['1.1'],
      },
      {
        n: '1.1.23',
        page: 'p.11',
        prompt: r`Mark each statement True or False, and justify your answer based on Section 1.1 definitions and theorems: (a) Every elementary row operation is reversible. (b) A $5 \times 6$ matrix has six rows. (c) The solution set of a linear system is a list of numbers that satisfies every equation simultaneously. (d) Two fundamental questions about a linear system involve existence and uniqueness.`,
        steps: [
          {
            say: r`(a) **True**: Row replacement is reversed by subtracting the same multiple; row scaling by $c \ne 0$ is reversed by scaling by $1/c$; row interchange is reversed by swapping the same two rows back.`,
          },
          {
            say: r`(b) **False**: By standard convention, an $m \times n$ matrix has $m$ rows and $n$ columns. Therefore, a $5 \times 6$ matrix has **5 rows** and **6 columns**, not six rows.`,
          },
          {
            say: r`(c) **True**: By definition, a solution of a system is an ordered list $(s_1, \dots, s_n)$ making each equation a true statement simultaneously.`,
          },
          {
            say: r`(d) **True**: The two fundamental questions introduced in Section 1.1 are: (1) Does at least one solution exist? (2) If a solution exists, is it unique?`,
          },
        ],
        answer: r`(a) True, (b) False, (c) True, (d) True.`,
        review: ['1.1'],
      },
      {
        n: '1.1.27',
        page: 'p.11',
        prompt: r`Suppose the system $\begin{cases} x_1 + 3x_2 = f \\ c x_1 + d x_2 = g \end{cases}$ is consistent for all possible values of $f$ and $g$. What can you say about the coefficients $c$ and $d$? Justify your answer.`,
        steps: [
          {
            say: r`Row reduce the augmented matrix $\left[\begin{array}{cc|c} 1 & 3 & f \\ c & d & g \end{array}\right]$ by $R_2 - c R_1 \to R_2$:`,
            math: r`\left[\begin{array}{cc|c} 1 & 3 & f \\ 0 & d - 3c & g - c f \end{array}\right]`,
          },
          {
            say: r`If $d - 3c = 0$, then the second row becomes $\begin{bmatrix} 0 & 0 & g - c f \end{bmatrix}$. If we choose $g$ and $f$ such that $g - c f \ne 0$, the system becomes inconsistent ($0 = \text{nonzero}$).`,
          },
          {
            say: r`Therefore, for the system to remain consistent for **every** choice of $f$ and $g$, the coefficient $d - 3c$ must NOT be zero.`,
          },
        ],
        answer: r`$d - 3c \ne 0$ (or equivalently $d \ne 3c$). When $d \ne 3c$, there is a pivot in every row, so the system is consistent for all $f$ and $g$.`,
        review: ['1.1'],
      },
      {
        n: '1.2.13',
        page: 'p.22',
        prompt: r`Find the general solution of the system whose augmented matrix is: $\left[\begin{array}{ccccc|c} 1 & -3 & 0 & -1 & 0 & -2 \\ 0 & 1 & 0 & 0 & -4 & 1 \\ 0 & 0 & 0 & 1 & 9 & 4 \\ 0 & 0 & 0 & 0 & 0 & 0 \end{array}\right]$. Express in the 3 solution formats.`,
        steps: [
          {
            say: r`Eliminate entries above pivots to achieve Reduced Row Echelon Form (RREF). First, eliminate $-1$ in row 1 above the pivot in column 4 ($R_1 + R_3 \to R_1$):`,
            math: r`\left[\begin{array}{ccccc|c} 1 & -3 & 0 & 0 & 9 & 2 \\ 0 & 1 & 0 & 0 & -4 & 1 \\ 0 & 0 & 0 & 1 & 9 & 4 \\ 0 & 0 & 0 & 0 & 0 & 0 \end{array}\right]`,
          },
          {
            say: r`Eliminate $-3$ in row 1 above the pivot in column 2 ($R_1 + 3R_2 \to R_1$):`,
            math: [
              r`[1, -3, 0, 0, 9, 2] + 3[0, 1, 0, 0, -4, 1] = [1, 0, 0, 0, -3, 5]`,
              r`\text{RREF: } \left[\begin{array}{ccccc|c} 1 & 0 & 0 & 0 & -3 & 5 \\ 0 & 1 & 0 & 0 & -4 & 1 \\ 0 & 0 & 0 & 1 & 9 & 4 \\ 0 & 0 & 0 & 0 & 0 & 0 \end{array}\right]`,
            ],
          },
          {
            say: r`Identify basic variables (pivot columns 1, 2, 4 $\implies x_1, x_2, x_4$) and free variables (columns 3, 5 $\implies x_3, x_5$).`,
          },
          {
            say: r`Format 1 (System Form): $x_1 = 5 + 3x_5, \quad x_2 = 1 + 4x_5, \quad x_3 \text{ is free}, \quad x_4 = 4 - 9x_5, \quad x_5 \text{ is free}$.`,
          },
          {
            say: r`Format 2 (Vector Form): $\vec{x} = [5 + 3x_5, \ 1 + 4x_5, \ x_3, \ 4 - 9x_5, \ x_5]^T$.`,
          },
          {
            say: r`Format 3 (Parametric Vector Form):`,
            math: r`\vec{x} = \begin{bmatrix} 5 \\ 1 \\ 0 \\ 4 \\ 0 \end{bmatrix} + x_3 \begin{bmatrix} 0 \\ 0 \\ 1 \\ 0 \\ 0 \end{bmatrix} + x_5 \begin{bmatrix} 3 \\ 4 \\ 0 \\ -9 \\ 1 \end{bmatrix}, \quad x_3, x_5 \in \mathbb{R}`,
          },
        ],
        answer: r`$\vec{x} = \vec{p} + x_3 \vec{u} + x_5 \vec{v}$. Solution set is a 2-dimensional plane in $\mathbb{R}^5$ translated by particular solution $\vec{p} = [5, 1, 0, 4, 0]^T$.`,
        review: ['1.2'],
      },
      {
        n: '1.4.5',
        page: 'p.40',
        prompt: r`Use the definition of $A\vec{x}$ to write the matrix equation as a vector equation: $\begin{bmatrix} 5 & 1 & -8 & 4 \\ -2 & -7 & 3 & -5 \end{bmatrix} \begin{bmatrix} 5 \\ -1 \\ 3 \\ -2 \end{bmatrix} = \begin{bmatrix} -8 \\ 16 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Recall the definition of $A\vec{x}$: If $A = [\vec{a}_1 \ \vec{a}_2 \ \dots \ \vec{a}_n]$ and $\vec{x} = [x_1, \dots, x_n]^T$, then $A\vec{x} = x_1\vec{a}_1 + x_2\vec{a}_2 + \dots + x_n\vec{a}_n$.`,
          },
          {
            say: r`Expand as a linear combination of the columns of $A$:`,
            math: r`5 \begin{bmatrix} 5 \\ -2 \end{bmatrix} + (-1) \begin{bmatrix} 1 \\ -7 \end{bmatrix} + 3 \begin{bmatrix} -8 \\ 3 \end{bmatrix} + (-2) \begin{bmatrix} 4 \\ -5 \end{bmatrix} = \begin{bmatrix} -8 \\ 16 \end{bmatrix}`,
          },
          {
            say: r`Check arithmetic: Top: $25 - 1 - 24 - 8 = -8 \checkmark$. Bottom: $-10 + 7 + 9 + 10 = 16 \checkmark$.`,
          },
        ],
        answer: r`$5 \begin{bmatrix} 5 \\ -2 \end{bmatrix} - \begin{bmatrix} 1 \\ -7 \end{bmatrix} + 3 \begin{bmatrix} -8 \\ 3 \end{bmatrix} - 2 \begin{bmatrix} 4 \\ -5 \end{bmatrix} = \begin{bmatrix} -8 \\ 16 \end{bmatrix}$.`,
        review: ['1.4'],
      },
      {
        n: '1.4.7',
        page: 'p.40',
        prompt: r`Write the vector equation as a matrix equation $A\vec{x} = \vec{b}$: $x_1 \begin{bmatrix} 4 \\ -1 \\ 7 \\ -4 \end{bmatrix} + x_2 \begin{bmatrix} -5 \\ 3 \\ -5 \\ 1 \end{bmatrix} + x_3 \begin{bmatrix} 7 \\ -8 \\ 0 \\ 2 \end{bmatrix} = \begin{bmatrix} 6 \\ -8 \\ 0 \\ -7 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Place each vector vector multiplier as a column of coefficient matrix $A$:`,
            math: r`A = \begin{bmatrix} 4 & -5 & 7 \\ -1 & 3 & -8 \\ 7 & -5 & 0 \\ -4 & 1 & 2 \end{bmatrix}, \quad \vec{x} = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix}, \quad \vec{b} = \begin{bmatrix} 6 \\ -8 \\ 0 \\ -7 \end{bmatrix}`,
          },
        ],
        answer: r`$\begin{bmatrix} 4 & -5 & 7 \\ -1 & 3 & -8 \\ 7 & -5 & 0 \\ -4 & 1 & 2 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = \begin{bmatrix} 6 \\ -8 \\ 0 \\ -7 \end{bmatrix}$.`,
        review: ['1.4'],
      },
    ],
  },
  {
    id: 'hw2',
    title: 'Homework 02: Linear Independence & Standard Matrices of Transformations',
    week: 2,
    complete: true,
    intro: r`Weekly assigned problems from **Lay Sections 1.7 (p.62 #17, 29) and 1.9 (p.79 #1, 3, 5, 7, 15, 17)**. Covers linear dependence inspections, matrix construction for transformations (rotations, shears, reflections, projections).`,
    problems: [
      {
        n: '1.7.17',
        page: 'p.62',
        prompt: r`Determine by inspection if the vectors are linearly independent: $\vec{v}_1 = \begin{bmatrix} 3 \\ 5 \\ -1 \end{bmatrix}, \quad \vec{v}_2 = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}, \quad \vec{v}_3 = \begin{bmatrix} -6 \\ 5 \\ 4 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Observe that vector $\vec{v}_2 = \vec{0}$ is the zero vector!`,
          },
          {
            say: r`By **Theorem 9 (Sets Containing the Zero Vector)**: If a set $S = \{\vec{v}_1, \dots, \vec{v}_p\}$ in $\mathbb{R}^n$ contains the zero vector, then the set is automatically **linearly dependent**.`,
          },
          {
            say: r`Proof: The non-trivial linear combination $0\vec{v}_1 + 1\vec{v}_2 + 0\vec{v}_3 = \vec{0}$ has non-zero scalar $c_2 = 1 \ne 0$.`,
          },
        ],
        answer: r`**Linearly dependent** by inspection, because the set contains the zero vector $\vec{0}$.`,
        review: ['1.7'],
      },
      {
        n: '1.7.29',
        page: 'p.63',
        prompt: r`Construct $3 \times 2$ matrices $A$ and $B$ such that $A\vec{x} = \vec{0}$ has only the trivial solution and $B\vec{x} = \vec{0}$ has a nontrivial solution.`,
        steps: [
          {
            say: r`For $A\vec{x} = \vec{0}$ to have only the trivial solution, the 2 columns of $A$ must be linearly independent (a pivot in every column, rank = 2).`,
            math: r`A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix}`,
          },
          {
            say: r`For $B\vec{x} = \vec{0}$ to have a nontrivial solution, the columns of $B$ must be linearly dependent (at least one free variable column, rank < 2).`,
            math: r`B = \begin{bmatrix} 1 & 2 \\ 2 & 4 \\ 3 & 6 \end{bmatrix} \quad (\text{column 2 is } 2 \times \text{column 1})`,
          },
        ],
        answer: r`$A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix}$ (independent columns) and $B = \begin{bmatrix} 1 & 2 \\ 2 & 4 \\ 3 & 6 \end{bmatrix}$ (dependent columns).`,
        review: ['1.7'],
      },
      {
        n: '1.9.1',
        page: 'p.79',
        prompt: r`Find the standard matrix of the linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^4$ given that $T(\vec{e}_1) = [3, 1, 3, 1]^T$ and $T(\vec{e}_2) = [-5, 2, 0, 0]^T$, where $\vec{e}_1 = [1, 0]^T, \vec{e}_2 = [0, 1]^T$.`,
        steps: [
          {
            say: r`By Theorem 10, the standard matrix $A$ for any linear transformation $T$ has columns equal to the images of the standard basis vectors: $A = [T(\vec{e}_1) \ T(\vec{e}_2)]$.`,
          },
          {
            say: r`Assemble the $4 \times 2$ matrix:`,
            math: r`A = \begin{bmatrix} 3 & -5 \\ 1 & 2 \\ 3 & 0 \\ 1 & 0 \end{bmatrix}`,
          },
        ],
        answer: r`$A = \begin{bmatrix} 3 & -5 \\ 1 & 2 \\ 3 & 0 \\ 1 & 0 \end{bmatrix}$.`,
        review: ['1.9'],
      },
      {
        n: '1.9.3',
        page: 'p.79',
        prompt: r`Find the standard matrix of $T: \mathbb{R}^2 \to \mathbb{R}^2$ that rotates points about the origin through $\frac{3\pi}{2}$ radians ($270^\circ$) counterclockwise.`,
        steps: [
          {
            say: r`Recall the standard 2D rotation matrix: $R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$.`,
          },
          {
            say: r`Substitute $\theta = \frac{3\pi}{2}$: $\cos(3\pi/2) = 0$ and $\sin(3\pi/2) = -1$:`,
            math: r`A = \begin{bmatrix} 0 & -(-1) \\ -1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}`,
          },
        ],
        answer: r`$A = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}$.`,
        review: ['1.9'],
      },
      {
        n: '1.9.5',
        page: 'p.79',
        prompt: r`Find the standard matrix of $T: \mathbb{R}^2 \to \mathbb{R}^2$ that is a vertical shear mapping $\vec{e}_1 \to \vec{e}_1 - 2\vec{e}_2$ and leaving $\vec{e}_2$ unchanged.`,
        steps: [
          {
            say: r`Compute the images of the standard basis vectors:`,
            math: [
              r`T(\vec{e}_1) = \begin{bmatrix} 1 \\ 0 \end{bmatrix} - 2\begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \\ -2 \end{bmatrix}`,
              r`T(\vec{e}_2) = \vec{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}`,
            ],
          },
          {
            say: r`Put columns together into $A = [T(\vec{e}_1) \ T(\vec{e}_2)]$:`,
            math: r`A = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix}`,
          },
        ],
        answer: r`$A = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix}$.`,
        review: ['1.9'],
      },
      {
        n: '1.9.7',
        page: 'p.79',
        prompt: r`Find the standard matrix of $T: \mathbb{R}^2 \to \mathbb{R}^2$ that first rotates points through $-\frac{3\pi}{4}$ radian ($135^\circ$ clockwise) and then reflects points through the horizontal $x_1$-axis.`,
        steps: [
          {
            say: r`Rotation matrix for $\theta = -\frac{3\pi}{4}$: $\cos(-3\pi/4) = -\frac{\sqrt{2}}{2}, \sin(-3\pi/4) = -\frac{\sqrt{2}}{2}$:`,
            math: r`R = \begin{bmatrix} -\frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} \\ -\frac{\sqrt{2}}{2} & -\frac{\sqrt{2}}{2} \end{bmatrix} = \frac{\sqrt{2}}{2} \begin{bmatrix} -1 & 1 \\ -1 & -1 \end{bmatrix}`,
          },
          {
            say: r`Reflection matrix across the $x_1$-axis: $M = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$.`,
          },
          {
            say: r`The composite transformation is $T(\vec{x}) = M(R\vec{x}) = (MR)\vec{x}$:`,
            math: r`A = MR = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix} \frac{\sqrt{2}}{2} \begin{bmatrix} -1 & 1 \\ -1 & -1 \end{bmatrix} = \frac{\sqrt{2}}{2} \begin{bmatrix} -1 & 1 \\ 1 & 1 \end{bmatrix}`,
          },
        ],
        answer: r`$A = \frac{\sqrt{2}}{2} \begin{bmatrix} -1 & 1 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} -\sqrt{2}/2 & \sqrt{2}/2 \\ \sqrt{2}/2 & \sqrt{2}/2 \end{bmatrix}$.`,
        review: ['1.9'],
      },
      {
        n: '1.9.15',
        page: 'p.80',
        prompt: r`Fill in the missing entries in $A$ such that $A \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = \begin{bmatrix} 3x_1 - 2x_3 \\ 4x_1 \\ x_1 - x_2 + x_3 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Inspect each row of the output vector to read off coefficients of $x_1, x_2, x_3$:`,
            math: [
              r`\text{Row 1: } 3x_1 + 0x_2 - 2x_3 \implies [3, 0, -2]`,
              r`\text{Row 2: } 4x_1 + 0x_2 + 0x_3 \implies [4, 0, 0]`,
              r`\text{Row 3: } 1x_1 - 1x_2 + 1x_3 \implies [1, -1, 1]`,
            ],
          },
        ],
        answer: r`$A = \begin{bmatrix} 3 & 0 & -2 \\ 4 & 0 & 0 \\ 1 & -1 & 1 \end{bmatrix}$.`,
        review: ['1.9'],
      },
      {
        n: '1.9.17',
        page: 'p.80',
        prompt: r`Show that $T$ is a linear transformation by finding a matrix that implements $T(x_1, x_2, x_3, x_4) = [0, \ x_1 + x_2, \ x_2 + x_3, \ x_3 + x_4]^T$.`,
        steps: [
          {
            say: r`Read the coefficients for each row in $\mathbb{R}^4$:`,
            math: r`A = \begin{bmatrix} 0 & 0 & 0 & 0 \\ 1 & 1 & 0 & 0 \\ 0 & 1 & 1 & 0 \\ 0 & 0 & 1 & 1 \end{bmatrix}`,
          },
          {
            say: r`Since $T(\vec{x}) = A\vec{x}$ for all $\vec{x} \in \mathbb{R}^4$, $T$ is automatically a linear transformation.`,
          },
        ],
        answer: r`$A = \begin{bmatrix} 0 & 0 & 0 & 0 \\ 1 & 1 & 0 & 0 \\ 0 & 1 & 1 & 0 \\ 0 & 0 & 1 & 1 \end{bmatrix}$.`,
        review: ['1.9'],
      },
    ],
  },
  {
    id: 'hw3',
    title: 'Homework 03: LU Matrix Factorization & Fast Solvers',
    week: 3,
    complete: true,
    intro: r`Weekly assigned problems from **Lay Section 2.5 (p.131 #1, 3, 11, 13)**. Covers solving $A\vec{x} = \vec{b}$ via forward- and back-substitution ($L\vec{y} = \vec{b}$, $U\vec{x} = \vec{y}$) and finding $LU$ factorizations without computer packages.`,
    problems: [
      {
        n: '2.5.1',
        page: 'p.131',
        prompt: r`Solve $A\vec{x} = \vec{b}$ using the given LU factorization: $A = \begin{bmatrix} 3 & -7 & -2 \\ -3 & 5 & 1 \\ 6 & -4 & 0 \end{bmatrix}$, $\vec{b} = \begin{bmatrix} -7 \\ 5 \\ 2 \end{bmatrix}$, with $L = \begin{bmatrix} 1 & 0 & 0 \\ -1 & 1 & 0 \\ 2 & -5 & 1 \end{bmatrix}$ and $U = \begin{bmatrix} 3 & -7 & -2 \\ 0 & -2 & -1 \\ 0 & 0 & -1 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Step 1: Forward-substitute $L\vec{y} = \vec{b}$:`,
            math: [
              r`y_1 = -7`,
              r`-y_1 + y_2 = 5 \implies -(-7) + y_2 = 5 \implies y_2 = 5 - 7 = -2`,
              r`2y_1 - 5y_2 + y_3 = 2 \implies 2(-7) - 5(-2) + y_3 = 2 \implies -14 + 10 + y_3 = 2 \implies y_3 = 6`,
              r`\vec{y} = \begin{bmatrix} -7 \\ -2 \\ 6 \end{bmatrix}`,
            ],
          },
          {
            say: r`Step 2: Back-substitute $U\vec{x} = \vec{y}$:`,
            math: [
              r`-x_3 = 6 \implies x_3 = -6`,
              r`-2x_2 - x_3 = -2 \implies -2x_2 - (-6) = -2 \implies -2x_2 = -8 \implies x_2 = 4`,
              r`3x_1 - 7x_2 - 2x_3 = -7 \implies 3x_1 - 7(4) - 2(-6) = -7 \implies 3x_1 - 16 = -7 \implies 3x_1 = 9 \implies x_1 = 3`,
            ],
          },
        ],
        answer: r`$\vec{x} = \begin{bmatrix} 3 \\ 4 \\ -6 \end{bmatrix}$. Check: $A\vec{x} = [3(3)-7(4)-2(-6), -3(3)+5(4)+1(-6), 6(3)-4(4)+0] = [-7, 5, 2]^T \checkmark$.`,
        review: ['2.5'],
      },
      {
        n: '2.5.3',
        page: 'p.131',
        prompt: r`Solve $A\vec{x} = \vec{b}$ using the given LU factorization: $A = \begin{bmatrix} 2 & -1 & 2 \\ -6 & 0 & -2 \\ 8 & -1 & 5 \end{bmatrix}$, $\vec{b} = \begin{bmatrix} 1 \\ 0 \\ 4 \end{bmatrix}$, with $L = \begin{bmatrix} 1 & 0 & 0 \\ -3 & 1 & 0 \\ 4 & -1 & 1 \end{bmatrix}$ and $U = \begin{bmatrix} 2 & -1 & 2 \\ 0 & -3 & 4 \\ 0 & 0 & 1 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Step 1: Solve $L\vec{y} = \vec{b}$ via forward substitution:`,
            math: [
              r`y_1 = 1`,
              r`-3y_1 + y_2 = 0 \implies y_2 = 3(1) = 3`,
              r`4y_1 - y_2 + y_3 = 4 \implies 4(1) - 3 + y_3 = 4 \implies y_3 = 3`,
              r`\vec{y} = [1, 3, 3]^T`,
            ],
          },
          {
            say: r`Step 2: Solve $U\vec{x} = \vec{y}$ via back substitution:`,
            math: [
              r`x_3 = 3`,
              r`-3x_2 + 4(3) = 3 \implies -3x_2 = -9 \implies x_2 = 3`,
              r`2x_1 - (3) + 2(3) = 1 \implies 2x_1 + 3 = 1 \implies 2x_1 = -2 \implies x_1 = -1`,
            ],
          },
        ],
        answer: r`$\vec{x} = \begin{bmatrix} -1 \\ 3 \\ 3 \end{bmatrix}$.`,
        review: ['2.5'],
      },
      {
        n: '2.5.11',
        page: 'p.132',
        prompt: r`Find an LU factorization of $A = \begin{bmatrix} 3 & -6 & 3 \\ 6 & -7 & 2 \\ -1 & 7 & 0 \end{bmatrix}$ without using row swaps.`,
        steps: [
          {
            say: r`Eliminate column 1 entries below pivot $A_{11} = 3$:`,
            math: [
              r`R_2 - 2R_1 \to R_2 \quad (\text{multiplier } c = 2 \text{ goes into } L_{21}): \ [0, 5, -4]`,
              r`R_3 - \left(-\frac{1}{3}\right)R_1 \to R_3 \quad (\text{multiplier } c = -1/3 \text{ goes into } L_{31}): \ [0, 5, 1]`,
            ],
          },
          {
            say: r`Eliminate column 2 entry below pivot $U_{22} = 5$:`,
            math: [
              r`R_3 - 1R_2 \to R_3 \quad (\text{multiplier } c = 1 \text{ goes into } L_{32}): \ [0, 0, 5]`,
            ],
          },
          {
            say: r`Assemble upper-triangular echelon form $U$ and unit lower-triangular matrix $L$:`,
            math: [
              r`L = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1/3 & 1 & 1 \end{bmatrix}, \quad U = \begin{bmatrix} 3 & -6 & 3 \\ 0 & 5 & -4 \\ 0 & 0 & 5 \end{bmatrix}`,
            ],
          },
        ],
        answer: r`$L = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1/3 & 1 & 1 \end{bmatrix}$, $U = \begin{bmatrix} 3 & -6 & 3 \\ 0 & 5 & -4 \\ 0 & 0 & 5 \end{bmatrix}$. Check: $LU = A \checkmark$.`,
        review: ['2.5'],
      },
      {
        n: '2.5.13',
        page: 'p.132',
        prompt: r`Find an LU factorization of the $4 \times 4$ matrix $A = \begin{bmatrix} 1 & 3 & -5 & -3 \\ -1 & -5 & 8 & 4 \\ 4 & 2 & -5 & -7 \\ -2 & -4 & 7 & 5 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Eliminate column 1 below pivot 1:`,
            math: [
              r`R_2 + 1R_1 \to R_2 \quad (\text{multiplier } -1 \text{ into } L_{21}): \ [0, -2, 3, 1]`,
              r`R_3 - 4R_1 \to R_3 \quad (\text{multiplier } 4 \text{ into } L_{31}): \ [0, -10, 15, 5]`,
              r`R_4 + 2R_1 \to R_4 \quad (\text{multiplier } -2 \text{ into } L_{41}): \ [0, 2, -3, -1]`,
            ],
          },
          {
            say: r`Eliminate column 2 below pivot $-2$:`,
            math: [
              r`R_3 - 5R_2 \to R_3 \quad (\text{multiplier } 5 \text{ into } L_{32}): \ [0, 0, 0, 0]`,
              r`R_4 + 1R_2 \to R_4 \quad (\text{multiplier } -1 \text{ into } L_{42}): \ [0, 0, 0, 0]`,
            ],
          },
          {
            say: r`Rows 3 and 4 of $U$ are completely zero, so forward elimination is complete. Put 1s on diagonal of $L$:`,
            math: [
              r`L = \begin{bmatrix} 1 & 0 & 0 & 0 \\ -1 & 1 & 0 & 0 \\ 4 & 5 & 1 & 0 \\ -2 & -1 & 0 & 1 \end{bmatrix}, \quad U = \begin{bmatrix} 1 & 3 & -5 & -3 \\ 0 & -2 & 3 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}`,
            ],
          },
        ],
        answer: r`$L = \begin{bmatrix} 1 & 0 & 0 & 0 \\ -1 & 1 & 0 & 0 \\ 4 & 5 & 1 & 0 \\ -2 & -1 & 0 & 1 \end{bmatrix}$, $U = \begin{bmatrix} 1 & 3 & -5 & -3 \\ 0 & -2 & 3 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}$.`,
        review: ['2.5'],
      },
    ],
  },
  {
    id: 'hw4',
    title: 'Homework 04: Computer Graphics, Subspaces & Rank-Nullity',
    week: 4,
    complete: true,
    intro: r`Weekly assigned problems from **Lay Sections 2.7 (p.146 #3, 5, 7), 2.8 (p.154 #23, 25, 27), and 2.9 (p.160 #9, 11)**. Covers affine transformations in homogeneous coordinates, bases for column and null spaces, and the Rank-Nullity Theorem.`,
    problems: [
      {
        n: '2.7.3',
        page: 'p.146',
        prompt: r`Find the $3 \times 3$ matrix in homogeneous coordinates that translates points in $\mathbb{R}^2$ by $(3, 1)$ and then rotates them $45^\circ$ about the origin.`,
        steps: [
          {
            say: r`Matrix for translation by $(3, 1)$: $T = \begin{bmatrix} 1 & 0 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{bmatrix}$.`,
          },
          {
            say: r`Matrix for counterclockwise rotation by $45^\circ$ ($\cos 45^\circ = \sin 45^\circ = \frac{\sqrt{2}}{2}$): $R = \begin{bmatrix} \sqrt{2}/2 & -\sqrt{2}/2 & 0 \\ \sqrt{2}/2 & \sqrt{2}/2 & 0 \\ 0 & 0 & 1 \end{bmatrix}$.`,
          },
          {
            say: r`The combined operation (translate first, then rotate) is given by $M = R T$:`,
            math: r`M = \begin{bmatrix} \sqrt{2}/2 & -\sqrt{2}/2 & 0 \\ \sqrt{2}/2 & \sqrt{2}/2 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} \sqrt{2}/2 & -\sqrt{2}/2 & \sqrt{2} \\ \sqrt{2}/2 & \sqrt{2}/2 & 2\sqrt{2} \\ 0 & 0 & 1 \end{bmatrix}`,
          },
        ],
        answer: r`$M = \begin{bmatrix} \sqrt{2}/2 & -\sqrt{2}/2 & \sqrt{2} \\ \sqrt{2}/2 & \sqrt{2}/2 & 2\sqrt{2} \\ 0 & 0 & 1 \end{bmatrix}$.`,
        review: ['2.7'],
      },
      {
        n: '2.7.5',
        page: 'p.146',
        prompt: r`Find the $3 \times 3$ matrix that reflects points through the $x$-axis and then rotates them $30^\circ$ about the origin.`,
        steps: [
          {
            say: r`Reflection matrix through $x$-axis: $M_x = \begin{bmatrix} 1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$.`,
          },
          {
            say: r`Rotation matrix through $30^\circ$: $R_{30} = \begin{bmatrix} \sqrt{3}/2 & -1/2 & 0 \\ 1/2 & \sqrt{3}/2 & 0 \\ 0 & 0 & 1 \end{bmatrix}$.`,
          },
          {
            say: r`Composite matrix $A = R_{30} M_x$:`,
            math: r`A = \begin{bmatrix} \sqrt{3}/2 & -1/2 & 0 \\ 1/2 & \sqrt{3}/2 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} \sqrt{3}/2 & 1/2 & 0 \\ 1/2 & -\sqrt{3}/2 & 0 \\ 0 & 0 & 1 \end{bmatrix}`,
          },
        ],
        answer: r`$A = \begin{bmatrix} \sqrt{3}/2 & 1/2 & 0 \\ 1/2 & -\sqrt{3}/2 & 0 \\ 0 & 0 & 1 \end{bmatrix}$.`,
        review: ['2.7'],
      },
      {
        n: '2.7.7',
        page: 'p.146',
        prompt: r`Construct the $3 \times 3$ matrix that rotates points through $60^\circ$ about the point $(6, 8)$ using homogeneous coordinates.`,
        steps: [
          {
            say: r`To rotate about a point $\vec{p} = (6, 8)$: (1) Translate by $-\vec{p} = (-6, -8)$, (2) Rotate by $60^\circ$ about origin, (3) Translate back by $\vec{p} = (6, 8)$.`,
            math: r`M = T_{(6,8)} R_{60} T_{(-6,-8)} = \begin{bmatrix} 1 & 0 & 6 \\ 0 & 1 & 8 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1/2 & -\sqrt{3}/2 & 0 \\ \sqrt{3}/2 & 1/2 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & -6 \\ 0 & 1 & -8 \\ 0 & 0 & 1 \end{bmatrix}`,
          },
          {
            say: r`Multiplying the first two matrices: $\begin{bmatrix} 1/2 & -\sqrt{3}/2 & 6 \\ \sqrt{3}/2 & 1/2 & 8 \\ 0 & 0 & 1 \end{bmatrix}$. Then multiplying by $T_{(-6,-8)}$:`,
            math: r`M = \begin{bmatrix} 1/2 & -\sqrt{3}/2 & 3 + 4\sqrt{3} \\ \sqrt{3}/2 & 1/2 & 4 - 3\sqrt{3} \\ 0 & 0 & 1 \end{bmatrix}`,
          },
        ],
        answer: r`$M = \begin{bmatrix} 1/2 & -\sqrt{3}/2 & 3 + 4\sqrt{3} \\ \sqrt{3}/2 & 1/2 & 4 - 3\sqrt{3} \\ 0 & 0 & 1 \end{bmatrix}$.`,
        review: ['2.7'],
      },
      {
        n: '2.8.23',
        page: 'p.154',
        prompt: r`Find a basis for $\operatorname{Col} A$ and a basis for $\operatorname{Nul} A$ given $A = \begin{bmatrix} 4 & 5 & 9 & -2 \\ 6 & 5 & 1 & 12 \\ 3 & 4 & 8 & -3 \end{bmatrix}$ and its echelon form $B = \begin{bmatrix} 1 & 2 & 6 & -5 \\ 0 & 1 & 5 & -6 \\ 0 & 0 & 0 & 0 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Pivot positions of $B$ are in columns 1 and 2. Therefore, columns 1 and 2 of the **original matrix** $A$ form a basis for $\operatorname{Col} A$:`,
            math: r`\text{Basis for } \operatorname{Col} A = \left\{ \begin{bmatrix} 4 \\ 6 \\ 3 \end{bmatrix}, \begin{bmatrix} 5 \\ 5 \\ 4 \end{bmatrix} \right\}`,
          },
          {
            say: r`To find $\operatorname{Nul} A$, row reduce $B$ to RREF ($R_1 - 2R_2 \to R_1$):`,
            math: [
              r`[1, 2, 6, -5] - 2[0, 1, 5, -6] = [1, 0, -4, 7]`,
              r`\text{RREF: } \begin{bmatrix} 1 & 0 & -4 & 7 \\ 0 & 1 & 5 & -6 \\ 0 & 0 & 0 & 0 \end{bmatrix} \implies \begin{cases} x_1 = 4x_3 - 7x_4 \\ x_2 = -5x_3 + 6x_4 \end{cases}`,
            ],
          },
          {
            say: r`Decompose into parametric vector form: $\vec{x} = x_3 \begin{bmatrix} 4 \\ -5 \\ 1 \\ 0 \end{bmatrix} + x_4 \begin{bmatrix} -7 \\ 6 \\ 0 \\ 1 \end{bmatrix}$.`,
          },
        ],
        answer: r`Basis for $\operatorname{Col} A$: $\{[4, 6, 3]^T, [5, 5, 4]^T\}$. Basis for $\operatorname{Nul} A$: $\{[4, -5, 1, 0]^T, [-7, 6, 0, 1]^T\}$.`,
        review: ['2.8'],
      },
      {
        n: '2.8.25',
        page: 'p.154',
        prompt: r`Find bases for $\operatorname{Col} A$ and $\operatorname{Nul} A$ given $A = \begin{bmatrix} 1 & 4 & 8 & -3 & -7 \\ -1 & 2 & 7 & 3 & 4 \\ -2 & 2 & 9 & 5 & 5 \\ 3 & 6 & 9 & -5 & -2 \end{bmatrix}$ and echelon form $B = \begin{bmatrix} 1 & 4 & 8 & 0 & 5 \\ 0 & 2 & 5 & 0 & -1 \\ 0 & 0 & 0 & 1 & 4 \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Pivot columns of $B$ are columns 1, 2, and 4. The corresponding columns of original matrix $A$ form a basis for $\operatorname{Col} A$:`,
            math: r`\text{Basis for } \operatorname{Col} A = \left\{ \begin{bmatrix} 1 \\ -1 \\ -2 \\ 3 \end{bmatrix}, \begin{bmatrix} 4 \\ 2 \\ 2 \\ 6 \end{bmatrix}, \begin{bmatrix} -3 \\ 3 \\ 5 \\ -5 \end{bmatrix} \right\}`,
          },
          {
            say: r`The free variables are $x_3$ and $x_5$. Solving $B\vec{x} = \vec{0}$ gives $\dim \operatorname{Nul} A = 2$.`,
          },
        ],
        answer: r`$\dim \operatorname{Col} A = 3$, $\dim \operatorname{Nul} A = 2$. Notice $3 + 2 = 5$ columns.`,
        review: ['2.8'],
      },
      {
        n: '2.8.27',
        page: 'p.154',
        prompt: r`Construct a nonzero $3 \times 3$ matrix $A$ and a nonzero vector $\vec{b}$ such that $\vec{b} \in \operatorname{Col} A$, but $\vec{b}$ is not equal to any column of $A$.`,
        steps: [
          {
            say: r`Recall that $\operatorname{Col} A$ is the set of all linear combinations of the columns of $A$.`,
          },
          {
            say: r`Take $A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix}$. Its columns are $\vec{a}_1 = [1, 0, 0]^T, \vec{a}_2 = [0, 1, 0]^T, \vec{a}_3 = [0, 0, 0]^T$.`,
          },
          {
            say: r`Let $\vec{b} = \vec{a}_1 + \vec{a}_2 = [1, 1, 0]^T$. Then $\vec{b} \in \operatorname{Col} A$, and $\vec{b}$ is distinct from each column of $A$.`,
          },
        ],
        answer: r`$A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix}$ and $\vec{b} = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$.`,
        review: ['2.8'],
      },
      {
        n: '2.9.9',
        page: 'p.160',
        prompt: r`Find the dimensions of $\operatorname{Col} A$ and $\operatorname{Nul} A$ for $A = \begin{bmatrix} 1 & -3 & 2 & -4 \\ -3 & 9 & -1 & 5 \\ 2 & -6 & 4 & -3 \\ -4 & 12 & 2 & 7 \end{bmatrix}$ with echelon form $B = \begin{bmatrix} 1 & -3 & 2 & -4 \\ 0 & 0 & 5 & -7 \\ 0 & 0 & 0 & 5 \\ 0 & 0 & 0 & 0 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Count the pivot positions in echelon form $B$: Pivots appear in column 1 (row 1), column 3 (row 2), and column 4 (row 3).`,
          },
          {
            say: r`Thus there are 3 pivot columns. $\operatorname{rank} A = \dim \operatorname{Col} A = 3$.`,
          },
          {
            say: r`Column 2 has no pivot, so $x_2$ is the only free variable. $\operatorname{nullity} A = \dim \operatorname{Nul} A = 1$.`,
          },
          {
            say: r`Rank-Nullity Theorem Check: $\operatorname{rank} A + \dim \operatorname{Nul} A = 3 + 1 = 4 = n$ (number of columns of $A$).`,
          },
        ],
        answer: r`$\dim \operatorname{Col} A = 3$, $\dim \operatorname{Nul} A = 1$. Rank-Nullity: $3 + 1 = 4 \checkmark$.`,
        review: ['2.9'],
      },
      {
        n: '2.9.11',
        page: 'p.160',
        prompt: r`Find the dimensions of $\operatorname{Col} A$ and $\operatorname{Nul} A$ for $4 \times 5$ matrix $A$ having echelon form $B = \begin{bmatrix} 1 & 2 & -5 & 0 & -1 \\ 0 & 1 & 2 & 4 & 5 \\ 0 & 0 & 0 & 1 & 2 \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Identify pivot columns in $B$: Columns 1, 2, and 4 contain pivots. Hence $\operatorname{rank} A = 3$.`,
          },
          {
            say: r`Identify free variable columns: Columns 3 and 5 contain no pivots ($x_3, x_5$ are free). Hence $\dim \operatorname{Nul} A = 2$.`,
          },
          {
            say: r`Verify Rank-Nullity: $\operatorname{rank} A + \dim \operatorname{Nul} A = 3 + 2 = 5 = n$.`,
          },
        ],
        answer: r`$\operatorname{rank} A = 3$, $\dim \operatorname{Nul} A = 2$.`,
        review: ['2.9'],
      },
    ],
  },
  {
    id: 'hw5',
    title: 'Homework 05: Determinants, Cramer’s Rule & Adjugates',
    week: 5,
    complete: true,
    intro: r`Weekly assigned problems from **Lay Sections 3.1 (p.170 #25, 27, 33, 35, 37), 3.2 (p.177 #15, 24), and 3.3 (p.186 #5, 7, 9)**. Covers elementary matrix determinants, cofactor properties, Cramer’s rule with singular analysis, and adjugate formulas.`,
    problems: [
      {
        n: '3.1.25',
        page: 'p.170',
        prompt: r`Compute the determinant of the elementary matrix $E = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & k & 1 \end{bmatrix}$.`,
        steps: [
          {
            say: r`$E$ is a lower triangular matrix. The determinant of any triangular matrix is simply the product of its diagonal entries:`,
            math: r`\det E = 1 \cdot 1 \cdot 1 = 1`,
          },
          {
            say: r`Geometrically and operationally: $E$ represents the row operation $R_3 + k R_2 \to R_3$. Row replacement leaves the determinant unchanged ($\det E = 1$).`,
          },
        ],
        answer: r`$\det E = 1$.`,
        review: ['3.1'],
      },
      {
        n: '3.1.27',
        page: 'p.170',
        prompt: r`Compute the determinant of the elementary matrix $E = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ k & 0 & 1 \end{bmatrix}$.`,
        steps: [
          {
            say: r`This is again a unit lower triangular matrix (or row replacement $R_3 + k R_1 \to R_3$).`,
            math: r`\det E = 1 \cdot 1 \cdot 1 = 1`,
          },
        ],
        answer: r`$\det E = 1$.`,
        review: ['3.1'],
      },
      {
        n: '3.1.33',
        page: 'p.170',
        prompt: r`Verify that $\det(EA) = (\det E)(\det A)$ for $E = \begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$ and $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$.`,
        steps: [
          {
            say: r`Compute $\det E = 1(1) - k(0) = 1$ and $\det A = ad - bc$.`,
          },
          {
            say: r`Compute product $EA$:`,
            math: r`EA = \begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix} \begin{bmatrix} a & b \\ c & d \end{bmatrix} = \begin{bmatrix} a + kc & b + kd \\ c & d \end{bmatrix}`,
          },
          {
            say: r`Compute $\det(EA) = (a + kc)d - (b + kd)c = ad + kcd - bc - kcd = ad - bc$.`,
          },
          {
            say: r`Notice $(\det E)(\det A) = 1 \cdot (ad - bc) = ad - bc = \det(EA) \checkmark$.`,
          },
        ],
        answer: r`$\det(EA) = ad - bc = (\det E)(\det A)$. Verified!`,
        review: ['3.1'],
      },
      {
        n: '3.1.35',
        page: 'p.170',
        prompt: r`Verify that $\det(EA) = (\det E)(\det A)$ for row interchange matrix $E = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ and $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$.`,
        steps: [
          {
            say: r`Compute $\det E = 0(0) - 1(1) = -1$ and $\det A = ad - bc$.`,
          },
          {
            say: r`Compute $EA = \begin{bmatrix} c & d \\ a & b \end{bmatrix}$. Then $\det(EA) = cb - da = -(ad - bc)$.`,
          },
          {
            say: r`Notice $(\det E)(\det A) = (-1)(ad - bc) = -(ad - bc) = \det(EA) \checkmark$.`,
          },
        ],
        answer: r`$\det(EA) = -(ad - bc) = (\det E)(\det A)$. Row swap negates the determinant.`,
        review: ['3.1'],
      },
      {
        n: '3.1.37',
        page: 'p.170',
        prompt: r`Let $A = \begin{bmatrix} 3 & 1 \\ 4 & 2 \end{bmatrix}$. Write $5A$. Is $\det(5A) = 5\det A$?`,
        steps: [
          {
            say: r`$\det A = 3(2) - 1(4) = 6 - 4 = 2$.`,
          },
          {
            say: r`Multiply every entry by scalar 5: $5A = \begin{bmatrix} 15 & 5 \\ 20 & 10 \end{bmatrix}$.`,
          },
          {
            say: r`Compute $\det(5A) = 15(10) - 5(20) = 150 - 100 = 50$.`,
          },
          {
            say: r`Check whether $50 = 5(2) = 10$: **No!** For an $n \times n$ matrix ($n = 2$), scaling by $c$ scales each row, giving $\det(cA) = c^n \det A = 5^2(2) = 50$.`,
          },
        ],
        answer: r`$\det(5A) = 50 \ne 5\det A$. In general for $n \times n$ matrices, $\det(cA) = c^n \det A$.`,
        review: ['3.1'],
      },
      {
        n: '3.2.15',
        page: 'p.177',
        prompt: r`Find the determinant of $\begin{vmatrix} a & b & c \\ d & e & f \\ 3g & 3h & 3i \end{vmatrix}$ given that $\begin{vmatrix} a & b & c \\ d & e & f \\ g & h & i \end{vmatrix} = 7$.`,
        steps: [
          {
            say: r`Row 3 has a common factor of 3: $[3g, 3h, 3i] = 3[g, h, i]$. By Theorem 3(c), factoring a scalar out of a single row factors it out of the determinant.`,
            math: r`\begin{vmatrix} a & b & c \\ d & e & f \\ 3g & 3h & 3i \end{vmatrix} = 3 \begin{vmatrix} a & b & c \\ d & e & f \\ g & h & i \end{vmatrix} = 3(7) = 21`,
          },
        ],
        answer: r`The determinant is $21$.`,
        review: ['3.2'],
      },
      {
        n: '3.2.24',
        page: 'p.177',
        prompt: r`Use a determinant to decide if the vectors are linearly independent: $\vec{v}_1 = \begin{bmatrix} 4 \\ 6 \\ 2 \end{bmatrix}, \quad \vec{v}_2 = \begin{bmatrix} -7 \\ 0 \\ 7 \end{bmatrix}, \quad \vec{v}_3 = \begin{bmatrix} -3 \\ -5 \\ -2 \end{bmatrix}$.`,
        steps: [
          {
            say: r`By the Invertible Matrix Theorem, $n$ vectors in $\mathbb{R}^n$ are linearly independent if and only if the determinant of the matrix formed by them is non-zero. Form matrix $A = [\vec{v}_1 \ \vec{v}_2 \ \vec{v}_3]$:`,
            math: r`\det A = \begin{vmatrix} 4 & -7 & -3 \\ 6 & 0 & -5 \\ 2 & 7 & -2 \end{vmatrix}`,
          },
          {
            say: r`Add row 1 to row 3 ($R_3 + R_1 \to R_3$) to create another zero in column 2:`,
            math: r`\begin{vmatrix} 4 & -7 & -3 \\ 6 & 0 & -5 \\ 6 & 0 & -5 \end{vmatrix}`,
          },
          {
            say: r`Row 2 and Row 3 are identical ($[6, 0, -5]$)! A matrix with two identical rows has determinant equal to 0.`,
          },
        ],
        answer: r`$\det A = 0$. Therefore, the vectors are **linearly dependent**.`,
        review: ['3.2'],
      },
      {
        n: '3.3.5',
        page: 'p.186',
        prompt: r`Use Cramer’s rule to compute the exact solution of the system: $\begin{cases} x_1 + x_2 = 3 \\ -3x_1 + 2x_3 = 0 \\ x_2 - 2x_3 = 2 \end{cases}$.`,
        steps: [
          {
            say: r`Write coefficient matrix $A$ and right-hand side vector $\vec{b}$:`,
            math: r`A = \begin{bmatrix} 1 & 1 & 0 \\ -3 & 0 & 2 \\ 0 & 1 & -2 \end{bmatrix}, \quad \vec{b} = \begin{bmatrix} 3 \\ 0 \\ 2 \end{bmatrix}`,
          },
          {
            say: r`Compute $\det A$ by cofactor expansion across row 1:`,
            math: r`\det A = 1 \begin{vmatrix} 0 & 2 \\ 1 & -2 \end{vmatrix} - 1 \begin{vmatrix} -3 & 2 \\ 0 & -2 \end{vmatrix} + 0 = 1(-2) - 1(6) = -2 - 6 = -8`,
          },
          {
            say: r`Compute $\det A_1$ (replace column 1 with $\vec{b}$):`,
            math: [
              r`A_1 = \begin{bmatrix} 3 & 1 & 0 \\ 0 & 0 & 2 \\ 2 & 1 & -2 \end{bmatrix} \implies \text{expand along row 2: } -2(3(1) - 1(2)) = -2(1) = -2`,
              r`x_1 = \frac{\det A_1}{\det A} = \frac{-2}{-8} = \frac{1}{4}`,
            ],
          },
          {
            say: r`Compute $\det A_2$ (replace column 2 with $\vec{b}$):`,
            math: [
              r`A_2 = \begin{bmatrix} 1 & 3 & 0 \\ -3 & 0 & 2 \\ 0 & 2 & -2 \end{bmatrix} \implies \text{expand row 1: } 1(0 - 4) - 3(6 - 0) = -4 - 18 = -22`,
              r`x_2 = \frac{\det A_2}{\det A} = \frac{-22}{-8} = \frac{11}{4}`,
            ],
          },
          {
            say: r`Compute $\det A_3$ (replace column 3 with $\vec{b}$):`,
            math: [
              r`A_3 = \begin{bmatrix} 1 & 1 & 3 \\ -3 & 0 & 0 \\ 0 & 1 & 2 \end{bmatrix} \implies \text{expand row 2: } -(-3)(2 - 3) = 3(-1) = -3`,
              r`x_3 = \frac{\det A_3}{\det A} = \frac{-3}{-8} = \frac{3}{8}`,
            ],
          },
          {
            say: r`Verify in original equations: (1) $1/4 + 11/4 = 12/4 = 3 \checkmark$. (2) $-3(1/4) + 2(3/8) = -3/4 + 3/4 = 0 \checkmark$. (3) $11/4 - 2(3/8) = 11/4 - 3/4 = 8/4 = 2 \checkmark$.`,
          },
        ],
        answer: r`Exact rational solution by Cramer's rule: $x_1 = \frac{1}{4}, \quad x_2 = \frac{11}{4}, \quad x_3 = \frac{3}{8}$.`,
        review: ['3.3'],
      },
      {
        n: '3.3.7',
        page: 'p.186',
        prompt: r`Determine the values of the parameter $s$ for which the system has a unique solution, and describe the solution using Cramer’s rule: $\begin{cases} 6s x_1 + 4x_2 = 5 \\ 9x_1 + 2s x_2 = -2 \end{cases}$.`,
        steps: [
          {
            say: r`Compute the determinant of coefficient matrix $A = \begin{bmatrix} 6s & 4 \\ 9 & 2s \end{bmatrix}$:`,
            math: r`\det A = (6s)(2s) - (4)(9) = 12s^2 - 36 = 12(s^2 - 3)`,
          },
          {
            say: r`The system has a unique solution if and only if $\det A \ne 0 \iff s^2 \ne 3 \iff s \ne \pm\sqrt{3}$.`,
          },
          {
            say: r`Compute $\det A_1$ and $\det A_2$:`,
            math: [
              r`\det A_1 = \begin{vmatrix} 5 & 4 \\ -2 & 2s \end{vmatrix} = 10s - (-8) = 10s + 8`,
              r`\det A_2 = \begin{vmatrix} 6s & 5 \\ 9 & -2 \end{vmatrix} = -12s - 45`,
            ],
          },
          {
            say: r`Apply Cramer’s rule:`,
            math: [
              r`x_1 = \frac{10s + 8}{12(s^2 - 3)} = \frac{5s + 4}{6(s^2 - 3)}`,
              r`x_2 = \frac{-12s - 45}{12(s^2 - 3)} = \frac{-4s - 15}{4(s^2 - 3)}`,
            ],
          },
        ],
        answer: r`Unique solution iff $s \ne \pm\sqrt{3}$. Solution: $x_1 = \frac{5s+4}{6(s^2-3)}, \quad x_2 = \frac{-4s-15}{4(s^2-3)}$.`,
        review: ['3.3'],
      },
      {
        n: '3.3.9',
        page: 'p.186',
        prompt: r`Determine the values of parameter $s$ for which the system has a unique solution, and solve: $\begin{cases} s x_1 + 2s x_2 = -1 \\ 3x_1 + 6s x_2 = 4 \end{cases}$.`,
        steps: [
          {
            say: r`Compute determinant of $A = \begin{bmatrix} s & 2s \\ 3 & 6s \end{bmatrix}$:`,
            math: r`\det A = s(6s) - (2s)(3) = 6s^2 - 6s = 6s(s - 1)`,
          },
          {
            say: r`Unique solution iff $\det A \ne 0 \iff s \ne 0$ and $s \ne 1$.`,
          },
          {
            say: r`Compute $\det A_1$ and $\det A_2$:`,
            math: [
              r`\det A_1 = \begin{vmatrix} -1 & 2s \\ 4 & 6s \end{vmatrix} = -6s - 8s = -14s \implies x_1 = \frac{-14s}{6s(s-1)} = \frac{-7}{3(s-1)}`,
              r`\det A_2 = \begin{vmatrix} s & -1 \\ 3 & 4 \end{vmatrix} = 4s - (-3) = 4s + 3 \implies x_2 = \frac{4s + 3}{6s(s-1)}`,
            ],
          },
        ],
        answer: r`Unique solution iff $s \ne 0$ and $s \ne 1$. Solution: $x_1 = \frac{-7}{3(s-1)}, \quad x_2 = \frac{4s+3}{6s(s-1)}$.`,
        review: ['3.3'],
      },
    ],
  },
  {
    id: 'hw6',
    title: 'Homework 06: Vector Space 10 Axioms & Subspace Verification',
    week: 6,
    complete: true,
    intro: r`Weekly assigned problems from **Lay Section 4.1 (p.198 #11, 13, 17)**. Covers span definitions of subspaces, checking membership in subspaces, and verifying closure properties.`,
    problems: [
      {
        n: '4.1.11',
        page: 'p.198',
        prompt: r`Let $W$ be the set of all vectors of the form $\begin{bmatrix} 5b + 2c \\ b \\ c \end{bmatrix}$, where $b$ and $c$ are arbitrary real numbers. Find vectors $\vec{u}$ and $\vec{v}$ such that $W = \operatorname{span}\{\vec{u}, \vec{v}\}$. Why does this show that $W$ is a subspace of $\mathbb{R}^3$?`,
        steps: [
          {
            say: r`Decompose the general vector in terms of parameters $b$ and $c$:`,
            math: r`\begin{bmatrix} 5b + 2c \\ b \\ c \end{bmatrix} = b \begin{bmatrix} 5 \\ 1 \\ 0 \end{bmatrix} + c \begin{bmatrix} 2 \\ 0 \\ 1 \end{bmatrix}`,
          },
          {
            say: r`Let $\vec{u} = \begin{bmatrix} 5 \\ 1 \\ 0 \end{bmatrix}$ and $\vec{v} = \begin{bmatrix} 2 \\ 0 \\ 1 \end{bmatrix}$. Then $W = \operatorname{span}\{\vec{u}, \vec{v}\}$.`,
          },
          {
            say: r`By **Theorem 1 (Section 4.1)**: If $\vec{v}_1, \dots, \vec{v}_p$ are in a vector space $V$, then $\operatorname{span}\{\vec{v}_1, \dots, \vec{v}_p\}$ is a subspace of $V$. Because $W$ is the span of two vectors in $\mathbb{R}^3$, $W$ is automatically a subspace of $\mathbb{R}^3$!`,
          },
        ],
        answer: r`$\vec{u} = [5, 1, 0]^T$ and $\vec{v} = [2, 0, 1]^T$. By Theorem 1, the span of any set of vectors is guaranteed to be a subspace.`,
        review: ['4.1'],
      },
      {
        n: '4.1.13',
        page: 'p.198',
        prompt: r`Let $\vec{v}_1 = \begin{bmatrix} 1 \\ 0 \\ -1 \end{bmatrix}, \vec{v}_2 = \begin{bmatrix} 2 \\ 1 \\ 3 \end{bmatrix}, \vec{v}_3 = \begin{bmatrix} 4 \\ 2 \\ 6 \end{bmatrix}$, and $\vec{w} = \begin{bmatrix} 3 \\ 1 \\ 2 \end{bmatrix}$. (a) Is $\vec{w} \in \{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$? How many vectors are in $\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$? (b) How many vectors are in $\operatorname{span}\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$? (c) Is $\vec{w}$ in the subspace spanned by $\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$?`,
        steps: [
          {
            say: r`(a) The set $\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$ contains **exactly 3 vectors**. $\vec{w}$ does not match any of the three vectors, so $\vec{w} \notin \{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$.`,
          },
          {
            say: r`(b) $\operatorname{span}\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$ contains all linear combinations $c_1\vec{v}_1 + c_2\vec{v}_2 + c_3\vec{v}_3$. Since scalars $c_i \in \mathbb{R}$ are infinite, there are **infinitely many vectors** in the span.`,
          },
          {
            say: r`(c) Test if $\vec{w} \in \operatorname{span}\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$ by solving $c_1\vec{v}_1 + c_2\vec{v}_2 + c_3\vec{v}_3 = \vec{w}$. Notice $\vec{v}_1 + \vec{v}_2 = [1+2, 0+1, -1+3]^T = [3, 1, 2]^T = \vec{w}$!`,
          },
          {
            say: r`Since $\vec{w} = 1\vec{v}_1 + 1\vec{v}_2 + 0\vec{v}_3$, $\vec{w}$ is indeed in $\operatorname{span}\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$.`,
          },
        ],
        answer: r`(a) No, exactly 3 vectors. (b) Infinitely many vectors. (c) Yes, because $\vec{w} = \vec{v}_1 + \vec{v}_2$.`,
        review: ['4.1'],
      },
      {
        n: '4.1.17',
        page: 'p.198',
        prompt: r`Let $W$ be the set of all vectors of the form $\begin{bmatrix} a - b \\ b - c \\ c - a \\ b \end{bmatrix}$ in $\mathbb{R}^4$, where $a, b, c$ are real. Show that $W$ is a subspace of $\mathbb{R}^4$.`,
        steps: [
          {
            say: r`Decompose the general vector into a linear combination of constant vectors:`,
            math: r`\begin{bmatrix} a - b \\ b - c \\ c - a \\ b \end{bmatrix} = a \begin{bmatrix} 1 \\ 0 \\ -1 \\ 0 \end{bmatrix} + b \begin{bmatrix} -1 \\ 1 \\ 0 \\ 1 \end{bmatrix} + c \begin{bmatrix} 0 \\ -1 \\ 1 \\ 0 \end{bmatrix}`,
          },
          {
            say: r`Thus $W = \operatorname{span}\{\vec{u}, \vec{v}, \vec{w}\}$ where $\vec{u} = [1, 0, -1, 0]^T, \vec{v} = [-1, 1, 0, 1]^T, \vec{w} = [0, -1, 1, 0]^T$.`,
          },
          {
            say: r`By Theorem 1, any set formed by the span of a collection of vectors in $\mathbb{R}^4$ is a subspace of $\mathbb{R}^4$.`,
          },
        ],
        answer: r`$W = \operatorname{span}\{[1, 0, -1, 0]^T, [-1, 1, 0, 1]^T, [0, -1, 1, 0]^T\}$, which is a subspace of $\mathbb{R}^4$ by Theorem 1.`,
        review: ['4.1'],
      },
    ],
  },
  {
    id: 'hw7',
    title: 'Homework 07: Null Spaces, Column Spaces & Abstract Linear Maps',
    week: 7,
    complete: true,
    intro: r`Weekly assigned problems from **Lay Section 4.2 (p.207 #1, 3, 5, 7, 9, 11, 13, 15)**. Covers kernel and range definitions, testing whether sets are null spaces or column spaces, and subspace criteria.`,
    problems: [
      {
        n: '4.2.1',
        page: 'p.207',
        prompt: r`Determine if $\vec{w} = \begin{bmatrix} 1 \\ 3 \\ -4 \end{bmatrix}$ is in $\operatorname{Nul} A$, where $A = \begin{bmatrix} 3 & -5 & -3 \\ 6 & -2 & 0 \\ -8 & 4 & 1 \end{bmatrix}$.`,
        steps: [
          {
            say: r`By definition, $\vec{w} \in \operatorname{Nul} A$ if and only if $A\vec{w} = \vec{0}$. Multiply matrix $A$ by vector $\vec{w}$:`,
            math: [
              r`A\vec{w} = \begin{bmatrix} 3 & -5 & -3 \\ 6 & -2 & 0 \\ -8 & 4 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 3 \\ -4 \end{bmatrix} = \begin{bmatrix} 3(1) - 5(3) - 3(-4) \\ 6(1) - 2(3) + 0(-4) \\ -8(1) + 4(3) + 1(-4) \end{bmatrix}`,
              r`= \begin{bmatrix} 3 - 15 + 12 \\ 6 - 6 + 0 \\ -8 + 12 - 4 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} = \vec{0}`,
            ],
          },
        ],
        answer: r`Yes, $\vec{w} \in \operatorname{Nul} A$ because $A\vec{w} = \vec{0}$.`,
        review: ['4.2'],
      },
      {
        n: '4.2.3',
        page: 'p.207',
        prompt: r`Determine if $\vec{w} = \begin{bmatrix} -1 \\ 0 \\ 2 \end{bmatrix}$ is in $\operatorname{Nul} A$, where $A = \begin{bmatrix} 1 & -2 & 3 \\ 5 & 2 & -1 \\ -3 & 4 & -5 \end{bmatrix}$.`,
        steps: [
          {
            say: r`Compute product $A\vec{w}$:`,
            math: r`A\vec{w} = \begin{bmatrix} 1(-1) + 0 + 3(2) \\ 5(-1) + 0 - 1(2) \\ -3(-1) + 0 - 5(2) \end{bmatrix} = \begin{bmatrix} 5 \\ -7 \\ -7 \end{bmatrix} \ne \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}`,
          },
        ],
        answer: r`No, $\vec{w} \notin \operatorname{Nul} A$ because $A\vec{w} \ne \vec{0}$.`,
        review: ['4.2'],
      },
      {
        n: '4.2.5',
        page: 'p.207',
        prompt: r`Determine if the set $W = \left\{ \begin{bmatrix} a \\ b \\ c \end{bmatrix} : a + b + c = 2 \right\}$ is a subspace of $\mathbb{R}^3$.`,
        steps: [
          {
            say: r`Test Axiom 1: Does the zero vector $\vec{0} = [0, 0, 0]^T$ belong to $W$?`,
          },
          {
            say: r`Substitute $a = 0, b = 0, c = 0$: $0 + 0 + 0 = 0 \ne 2$. The zero vector does NOT satisfy the defining equation!`,
          },
        ],
        answer: r`**Not a subspace**, because the zero vector $\vec{0}$ is not in the set.`,
        review: ['4.2'],
      },
      {
        n: '4.2.7',
        page: 'p.207',
        prompt: r`Determine if $W = \left\{ \begin{bmatrix} a \\ b \\ c \end{bmatrix} : a - 2b = 0 \text{ and } c = 3a \right\}$ is a subspace of $\mathbb{R}^3$.`,
        steps: [
          {
            say: r`Write the conditions as a system of homogeneous linear equations:`,
            math: r`\begin{cases} a - 2b + 0c = 0 \\ -3a + 0b + c = 0 \end{cases} \iff \begin{bmatrix} 1 & -2 & 0 \\ -3 & 0 & 1 \end{bmatrix} \begin{bmatrix} a \\ b \\ c \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}`,
          },
          {
            say: r`$W$ is precisely the null space $\operatorname{Nul} A$ of matrix $A = \begin{bmatrix} 1 & -2 & 0 \\ -3 & 0 & 1 \end{bmatrix}$.`,
          },
          {
            say: r`By Theorem 2 (Section 4.2), the null space of any $m \times n$ matrix is a subspace of $\mathbb{R}^n$.`,
          },
        ],
        answer: r`**Yes, it is a subspace**, because it is the null space of a matrix ($W = \operatorname{Nul} A$).`,
        review: ['4.2'],
      },
      {
        n: '4.2.9',
        page: 'p.207',
        prompt: r`Determine if $W = \left\{ \begin{bmatrix} a \\ b \\ c \\ d \end{bmatrix} \in \mathbb{R}^4 : a - 2b = 4c \text{ and } 2a = c + 3d \right\}$ is a subspace of $\mathbb{R}^4$.`,
        steps: [
          {
            say: r`Rewrite the conditions in standard homogeneous linear form:`,
            math: r`\begin{cases} a - 2b - 4c + 0d = 0 \\ 2a + 0b - c - 3d = 0 \end{cases}`,
          },
          {
            say: r`This set is the null space $\operatorname{Nul} A$ of $2 \times 4$ matrix $A = \begin{bmatrix} 1 & -2 & -4 & 0 \\ 2 & 0 & -1 & -3 \end{bmatrix}$.`,
          },
        ],
        answer: r`**Yes, it is a subspace of $\mathbb{R}^4$** (it is the null space of a $2 \times 4$ matrix).`,
        review: ['4.2'],
      },
      {
        n: '4.2.11',
        page: 'p.207',
        prompt: r`Determine if the set of all vectors of the form $\begin{bmatrix} b - 2d \\ 5 + d \\ b + 3d \\ d \end{bmatrix}$ (for all real $b, d$) is a subspace of $\mathbb{R}^4$.`,
        steps: [
          {
            say: r`Examine the second coordinate: $x_2 = 5 + d$.`,
          },
          {
            say: r`For the zero vector to be in the set, we would need $d = 0$ (from coordinate 4) and $5 + d = 0 \implies d = -5$. This is an impossible contradiction ($0 \ne -5$).`,
          },
          {
            say: r`Therefore, $\vec{0} \notin W$.`,
          },
        ],
        answer: r`**Not a subspace**, because the zero vector is not in the set (failed zero vector axiom).`,
        review: ['4.2'],
      },
      {
        n: '4.2.13',
        page: 'p.207',
        prompt: r`Determine if the set of vectors $\begin{bmatrix} c - 6d \\ d \\ c \end{bmatrix}$ (for real $c, d$) is a subspace of $\mathbb{R}^3$.`,
        steps: [
          {
            say: r`Express in terms of free parameters $c$ and $d$:`,
            math: r`\begin{bmatrix} c - 6d \\ d \\ c \end{bmatrix} = c \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} + d \begin{bmatrix} -6 \\ 1 \\ 0 \end{bmatrix}`,
          },
          {
            say: r`The set is the span of $\vec{u} = [1, 0, 1]^T$ and $\vec{v} = [-6, 1, 0]^T$. By Theorem 1, the span of any set of vectors in $\mathbb{R}^3$ is a subspace.`,
          },
        ],
        answer: r`**Yes, it is a subspace of $\mathbb{R}^3$** (it is $\operatorname{span}\{[1, 0, 1]^T, [-6, 1, 0]^T\}$).`,
        review: ['4.2'],
      },
      {
        n: '4.2.15',
        page: 'p.207',
        prompt: r`Find a matrix $A$ such that the set $W = \left\{ \begin{bmatrix} 2s + 3t \\ r + s - 2t \\ 4r + s \\ 3r - s - t \end{bmatrix} : r, s, t \in \mathbb{R} \right\}$ is $\operatorname{Col} A$.`,
        steps: [
          {
            say: r`Decompose the general vector into a linear combination of parameters $r, s, t$:`,
            math: r`\begin{bmatrix} 2s + 3t \\ r + s - 2t \\ 4r + s \\ 3r - s - t \end{bmatrix} = r \begin{bmatrix} 0 \\ 1 \\ 4 \\ 3 \end{bmatrix} + s \begin{bmatrix} 2 \\ 1 \\ 1 \\ -1 \end{bmatrix} + t \begin{bmatrix} 3 \\ -2 \\ 0 \\ -1 \end{bmatrix}`,
          },
          {
            say: r`Make these vectors the columns of matrix $A$:`,
            math: r`A = \begin{bmatrix} 0 & 2 & 3 \\ 1 & 1 & -2 \\ 4 & 1 & 0 \\ 3 & -1 & -1 \end{bmatrix}`,
          },
        ],
        answer: r`$A = \begin{bmatrix} 0 & 2 & 3 \\ 1 & 1 & -2 \\ 4 & 1 & 0 \\ 3 & -1 & -1 \end{bmatrix}$. Then $W = \operatorname{Col} A$.`,
        review: ['4.2'],
      },
    ],
  },
  {
    id: 'hw8',
    title: 'Homework 08: Midterm Examination Full Sample Drill',
    week: 8,
    complete: true,
    intro: r`Comprehensive Midterm Exam practice sets based directly on the professor's blackboard midterm review structure (**Board Photo 21-28-50**): **Q1 Matrices & Determinants**, **Q2 Systems of Equations**, **Q3 Linear Transformations (Range & Kernel)**, and **Q4 Vector Spaces (10 Axioms Proofs)**.`,
    problems: [
      {
        n: 'Midterm.Q1',
        page: 'Board 21-28-50',
        prompt: r`[Midterm Question 1: Matrices & Determinants] (a) Evaluate $\det A$ for $A = \begin{bmatrix} 1 & -2 & 5 & 2 \\ 0 & 0 & 3 & 0 \\ 2 & -4 & -1 & 5 \\ 3 & 1 & 0 & -2 \end{bmatrix}$ using cofactor expansion. (b) For $B = \begin{bmatrix} 1 & 0 & 2 \\ 2 & -1 & 3 \\ 4 & 1 & 8 \end{bmatrix}$, compute $\det B$ and find $B^{-1}$ using the adjugate formula $B^{-1} = \frac{1}{\det B}\operatorname{adj}(B)$.`,
        steps: [
          {
            say: r`Part (a): Row 2 of $A$ has only one nonzero entry: $A_{23} = 3$. Expand along row 2:`,
            math: r`\det A = 3 \cdot (-1)^{2+3} \begin{vmatrix} 1 & -2 & 2 \\ 2 & -4 & 5 \\ 3 & 1 & -2 \end{vmatrix} = -3 \begin{vmatrix} 1 & -2 & 2 \\ 2 & -4 & 5 \\ 3 & 1 & -2 \end{vmatrix}`,
          },
          {
            say: r`Row reduce the $3 \times 3$ minor ($R_2 - 2R_1 \to R_2$ and $R_3 - 3R_1 \to R_3$):`,
            math: [
              r`\begin{vmatrix} 1 & -2 & 2 \\ 0 & 0 & 1 \\ 0 & 7 & -8 \end{vmatrix} = 1 \begin{vmatrix} 0 & 1 \\ 7 & -8 \end{vmatrix} = 0 - 7 = -7`,
              r`\det A = -3(-7) = 21`,
            ],
          },
          {
            say: r`Part (b): Compute $\det B$ by row operations ($R_2 - 2R_1 \to R_2, R_3 - 4R_1 \to R_3$):`,
            math: r`\begin{vmatrix} 1 & 0 & 2 \\ 0 & -1 & -1 \\ 0 & 1 & 0 \end{vmatrix} = 1((-1)(0) - (-1)(1)) = 1 \implies \det B = 1`,
          },
          {
            say: r`Calculate the 9 cofactors $C_{ij} = (-1)^{i+j} \det B_{ij}$ to construct $\operatorname{adj}(B) = [C_{ij}]^T$:`,
            math: [
              r`C_{11} = -11, \quad C_{12} = -4, \quad C_{13} = 6`,
              r`C_{21} = 2, \quad C_{22} = 0, \quad C_{23} = -1`,
              r`C_{31} = 2, \quad C_{32} = 1, \quad C_{33} = -1`,
              r`\operatorname{adj}(B) = \begin{bmatrix} -11 & 2 & 2 \\ -4 & 0 & 1 \\ 6 & -1 & -1 \end{bmatrix} \implies B^{-1} = \frac{1}{1}\operatorname{adj}(B) = \begin{bmatrix} -11 & 2 & 2 \\ -4 & 0 & 1 \\ 6 & -1 & -1 \end{bmatrix}`,
            ],
          },
        ],
        answer: r`(a) $\det A = 21$. (b) $\det B = 1$, $B^{-1} = \begin{bmatrix} -11 & 2 & 2 \\ -4 & 0 & 1 \\ 6 & -1 & -1 \end{bmatrix}$. Check: $B B^{-1} = I \checkmark$.`,
        review: ['3.1', '3.2', '3.3'],
      },
      {
        n: 'Midterm.Q2',
        page: 'Board 21-28-50',
        prompt: r`[Midterm Question 2: Systems of Linear Equations] (a) Solve the parametric system $\begin{cases} 3s x_1 - 2x_2 = 4 \\ -6x_1 + s x_2 = 1 \end{cases}$ using Cramer's rule. For what values of $s$ does a unique solution exist? (b) Write the solution in parametric vector form for the consistent system with augmented matrix $\left[\begin{array}{cccc|c} 1 & -2 & 3 & 1 & 4 \\ 2 & -4 & 7 & 1 & 5 \end{array}\right]$.`,
        steps: [
          {
            say: r`Part (a): Compute $\det A$:`,
            math: r`\det A = \begin{vmatrix} 3s & -2 \\ -6 & s \end{vmatrix} = 3s^2 - (-2)(-6) = 3s^2 - 12 = 3(s^2 - 4)`,
          },
          {
            say: r`Unique solution exists if and only if $\det A \ne 0 \iff s^2 \ne 4 \iff s \ne \pm 2$.`,
          },
          {
            say: r`Evaluate $\det A_1$ and $\det A_2$:`,
            math: [
              r`\det A_1 = \begin{vmatrix} 4 & -2 \\ 1 & s \end{vmatrix} = 4s - (-2) = 4s + 2 \implies x_1 = \frac{4s + 2}{3(s^2 - 4)}`,
              r`\det A_2 = \begin{vmatrix} 3s & 4 \\ -6 & 1 \end{vmatrix} = 3s - (-24) = 3s + 24 \implies x_2 = \frac{3s + 24}{3(s^2 - 4)} = \frac{s + 8}{s^2 - 4}`,
            ],
          },
          {
            say: r`Part (b): Row reduce augmented matrix ($R_2 - 2R_1 \to R_2$):`,
            math: r`\left[\begin{array}{cccc|c} 1 & -2 & 3 & 1 & 4 \\ 0 & 0 & 1 & -1 & -3 \end{array}\right] \xrightarrow{R_1 - 3R_2 \to R_1} \left[\begin{array}{cccc|c} 1 & -2 & 0 & 4 & 13 \\ 0 & 0 & 1 & -1 & -3 \end{array}\right]`,
          },
          {
            say: r`Basic variables: $x_1, x_3$. Free variables: $x_2, x_4$. Parametric vector form:`,
            math: r`\vec{x} = \begin{bmatrix} 13 \\ 0 \\ -3 \\ 0 \end{bmatrix} + x_2 \begin{bmatrix} 2 \\ 1 \\ 0 \\ 0 \end{bmatrix} + x_4 \begin{bmatrix} -4 \\ 0 \\ 1 \\ 1 \end{bmatrix}`,
          },
        ],
        answer: r`(a) Unique solution iff $s \ne \pm 2$: $x_1 = \frac{4s+2}{3(s^2-4)}, x_2 = \frac{s+8}{s^2-4}$. (b) $\vec{x} = [13, 0, -3, 0]^T + x_2 [2, 1, 0, 0]^T + x_4 [-4, 0, 1, 1]^T$.`,
        review: ['1.2', '3.3'],
      },
      {
        n: 'Midterm.Q3',
        page: 'Board 21-28-50',
        prompt: r`[Midterm Question 3: Linear Transformations, Range & Kernel] Let $T: \mathbb{R}^4 \to \mathbb{R}^3$ be defined by $T(x_1, x_2, x_3, x_4) = \begin{bmatrix} x_1 - 2x_2 + 3x_3 + x_4 \\ 2x_1 - 3x_2 + 4x_3 + 5x_4 \\ x_1 - x_2 + x_3 + 4x_4 \end{bmatrix}$. (a) Find the standard matrix $A$ of $T$. (b) Find a basis for the Range of $T$ ($\operatorname{Col} A$) and its dimension. (c) Find a basis for the Kernel of $T$ ($\operatorname{Nul} A$) and its dimension. (d) State and verify the Rank-Nullity Theorem for $T$.`,
        steps: [
          {
            say: r`Part (a): Write matrix $A$ from the coefficients:`,
            math: r`A = \begin{bmatrix} 1 & -2 & 3 & 1 \\ 2 & -3 & 4 & 5 \\ 1 & -1 & 1 & 4 \end{bmatrix}`,
          },
          {
            say: r`Row reduce $A$ ($R_2 - 2R_1 \to R_2, R_3 - R_1 \to R_3$):`,
            math: r`\begin{bmatrix} 1 & -2 & 3 & 1 \\ 0 & 1 & -2 & 3 \\ 0 & 1 & -2 & 3 \end{bmatrix} \xrightarrow{R_3 - R_2 \to R_3} \begin{bmatrix} 1 & -2 & 3 & 1 \\ 0 & 1 & -2 & 3 \\ 0 & 0 & 0 & 0 \end{bmatrix} \xrightarrow{R_1 + 2R_2 \to R_1} \begin{bmatrix} 1 & 0 & -1 & 7 \\ 0 & 1 & -2 & 3 \\ 0 & 0 & 0 & 0 \end{bmatrix}`,
          },
          {
            say: r`Part (b): Pivot columns are 1 and 2. Thus a basis for $\operatorname{Range}(T) = \operatorname{Col} A$ is:`,
            math: r`\text{Basis for } \operatorname{Range}(T) = \left\{ \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix}, \begin{bmatrix} -2 \\ -3 \\ -1 \end{bmatrix} \right\}, \quad \dim \operatorname{Range}(T) = \operatorname{rank}(A) = 2`,
          },
          {
            say: r`Part (c): Free variables are $x_3$ and $x_4$. From RREF: $x_1 = x_3 - 7x_4$ and $x_2 = 2x_3 - 3x_4$:`,
            math: r`\text{Basis for } \operatorname{Ker}(T) = \operatorname{Nul} A = \left\{ \begin{bmatrix} 1 \\ 2 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} -7 \\ -3 \\ 0 \\ 1 \end{bmatrix} \right\}, \quad \dim \operatorname{Ker}(T) = \operatorname{nullity}(A) = 2`,
          },
          {
            say: r`Part (d): Rank-Nullity Theorem: $\dim \operatorname{Ker}(T) + \dim \operatorname{Range}(T) = \dim(\text{Domain}) = 2 + 2 = 4 = n \checkmark$.`,
          },
        ],
        answer: r`(a) $A = \begin{bmatrix} 1 & -2 & 3 & 1 \\ 2 & -3 & 4 & 5 \\ 1 & -1 & 1 & 4 \end{bmatrix}$. (b) $\dim \operatorname{Range}(T) = 2$. (c) $\dim \operatorname{Ker}(T) = 2$. (d) $2 + 2 = 4$ verified.`,
        review: ['1.8', '1.9', '2.8', '2.9'],
      },
      {
        n: 'Midterm.Q4',
        page: 'Board 21-28-50',
        prompt: r`[Midterm Question 4: Vector Spaces & Axiom Proofs] (a) Prove that the set of positive real numbers $V = (0, \infty)$ forms a real vector space under operations $x \oplus y = xy$ and $c \odot x = x^c$. Identify the zero vector and additive inverse. (b) On $\mathbb{R}^2$, define $\vec{u} \oplus \vec{v} = \begin{bmatrix} x_1 + x_2 - 1 \\ y_1 + y_2 \end{bmatrix}$ and $c \odot \vec{u} = \begin{bmatrix} cx - c + 1 \\ c^2 y \end{bmatrix}$. Prove whether or not $V$ is a vector space by checking the scalar distributive axiom $(k + l) \odot \vec{u} = k \odot \vec{u} \oplus l \odot \vec{u}$.`,
        steps: [
          {
            say: r`Part (a): Check vector space axioms on $V = (0, \infty)$:`,
            math: [
              r`\text{1. Closure under addition: If } x, y > 0 \implies xy > 0 \in V`,
              r`\text{2. Commutativity: } x \oplus y = xy = yx = y \oplus x`,
              r`\text{3. Associativity: } (x \oplus y) \oplus z = (xy)z = x(yz) = x \oplus (y \oplus z)`,
              r`\text{4. Zero vector: Find } e \text{ such that } x \oplus e = x \implies xe = x \implies e = 1 \in V`,
              r`\text{5. Additive inverse: Find } x' \text{ such that } x \oplus x' = 1 \implies x x' = 1 \implies x' = 1/x > 0 \in V`,
              r`\text{6. Scalar closure: } x^c > 0 \text{ for all } x > 0, c \in \mathbb{R}`,
              r`\text{7. Distributive 1: } c \odot (x \oplus y) = (xy)^c = x^c y^c = (c \odot x) \oplus (c \odot y)`,
              r`\text{8. Distributive 2: } (c + d) \odot x = x^{c+d} = x^c x^d = (c \odot x) \oplus (d \odot x)`,
              r`\text{9. Scalar associativity: } c \odot (d \odot x) = (x^d)^c = x^{cd} = (cd) \odot x`,
              r`\text{10. Scalar identity: } 1 \odot x = x^1 = x \checkmark`,
            ],
          },
          {
            say: r`Part (b): Test Axiom 8: $(k + l) \odot \vec{u} = k \odot \vec{u} \oplus l \odot \vec{u}$ for $\vec{u} = [x, y]^T$:`,
            math: [
              r`\text{LHS: } (k + l) \odot \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} (k+l)x - (k+l) + 1 \\ (k+l)^2 y \end{bmatrix}`,
              r`\text{RHS: } k \odot \vec{u} \oplus l \odot \vec{u} = \begin{bmatrix} kx - k + 1 \\ k^2 y \end{bmatrix} \oplus \begin{bmatrix} lx - l + 1 \\ l^2 y \end{bmatrix} = \begin{bmatrix} (kx-k+1) + (lx-l+1) - 1 \\ k^2 y + l^2 y \end{bmatrix} = \begin{bmatrix} (k+l)x - (k+l) + 1 \\ (k^2 + l^2)y \end{bmatrix}`,
            ],
          },
          {
            say: r`Compare second coordinates: $(k + l)^2 y = (k^2 + 2kl + l^2)y \ne (k^2 + l^2)y$ whenever $kl \ne 0$ and $y \ne 0$!`,
          },
          {
            say: r`Concrete counterexample: Let $k = 1, l = 1, \vec{u} = [0, 1]^T$. LHS second coordinate is $(1+1)^2(1) = 4$. RHS second coordinate is $(1^2 + 1^2)(1) = 2$. $4 \ne 2$!`,
          },
        ],
        answer: r`(a) $V = (0, \infty)$ is a valid vector space with zero vector $e = 1$ and inverse $x^{-1} = 1/x$. (b) NOT a vector space because $(k+l)\odot\vec{u} \ne k\odot\vec{u} \oplus l\odot\vec{u}$ ($4 \ne 2$ for $k=l=1, y=1$).`,
        review: ['4.1'],
      },
    ],
  },
];
