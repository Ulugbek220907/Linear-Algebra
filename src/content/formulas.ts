import type { FormulaGroup } from './types';
const r = String.raw;

export const formulaGroups: FormulaGroup[] = [
  {
    title: 'Linear Systems & Solution Forms (Ch. 1)',
    items: [
      { name: 'Linear System Form', tex: r`a_{i1}x_1 + a_{i2}x_2 + \dots + a_{in}x_n = b_i`, note: 'Augmented matrix [A | b]' },
      { name: 'Elementary Row Operations', tex: [r`R_i + c R_j \to R_i \ (\text{replacement})`, r`R_i \leftrightarrow R_j \ (\text{interchange})`, r`c R_i \to R_i \ (c \ne 0, \text{scaling})`] },
      { name: 'Matrix-Vector Product', tex: r`A\vec{x} = x_1\vec{a}_1 + x_2\vec{a}_2 + \dots + x_n\vec{a}_n`, note: 'Linear combination of columns of A' },
      { name: 'Parametric Vector Form', tex: r`\vec{x} = \vec{p} + s_1\vec{u}_1 + s_2\vec{u}_2 + \dots`, note: 'p is a particular solution; u_i span Nul(A)' },
      { name: 'Network Flow Balance', tex: r`\sum \text{Flow In} = \sum \text{Flow Out}`, note: 'At every junction; x_i ≥ 0 for physical feasibility' },
    ],
  },
  {
    title: 'Linear Independence & Transformations (Ch. 1)',
    items: [
      { name: 'Linear Independence', tex: r`c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_p\vec{v}_p = \vec{0} \implies c_1=c_2=\dots=c_p=0`, note: 'Only the trivial solution exists' },
      { name: 'Linear Transformation Axioms', tex: [r`T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v})`, r`T(c\vec{u}) = c\,T(\vec{u})`] },
      { name: 'Standard Matrix of T', tex: r`A = \begin{bmatrix} T(\vec{e}_1) & T(\vec{e}_2) & \dots & T(\vec{e}_n) \end{bmatrix}` },
      { name: '2D Rotation Matrix by θ', tex: r`R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}`, note: 'det = 1; preserves lengths and areas' },
      { name: '2D Horizontal Shear', tex: r`\begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}`, note: 'det = 1; preserves areas' },
      { name: 'Reflection across y = x', tex: r`\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}`, note: 'det = -1; reverses orientation' },
      { name: 'One-to-One (Injective)', tex: r`\operatorname{Nul} A = \{\vec{0}\} \iff \text{Pivot in every column}`, note: 'No free variables' },
      { name: 'Onto (Surjective)', tex: r`\operatorname{Col} A = \mathbb{R}^m \iff \text{Pivot in every row}`, note: 'Columns span the codomain' },
    ],
  },
  {
    title: 'Matrix Algebra, Inverses & LU (Ch. 2)',
    items: [
      { name: 'Row-Column Product Rule', tex: r`(AB)_{ij} = \sum_{k=1}^n a_{ik} b_{kj}` },
      { name: 'Transpose of Product', tex: r`(AB)^T = B^T A^T`, note: 'Order of factors reverses' },
      { name: '2 × 2 Matrix Inverse', tex: r`A^{-1} = \dfrac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}`, note: 'Valid iff det A = ad - bc ≠ 0' },
      { name: 'Inverse of Product', tex: r`(AB)^{-1} = B^{-1} A^{-1}`, note: 'Order of factors reverses' },
      { name: 'Inversion Algorithm', tex: r`\left[\begin{array}{c|c} A & I_n \end{array}\right] \sim \left[\begin{array}{c|c} I_n & A^{-1} \end{array}\right]` },
      { name: 'LU Factorization', tex: r`A = LU`, note: 'L is unit lower triangular; U is upper triangular (echelon form)' },
      { name: 'Solving via LU', tex: [r`L\vec{y} = \vec{b} \quad (\text{Forward solve for } \vec{y})`, r`U\vec{x} = \vec{y} \quad (\text{Back substitute for } \vec{x})`] },
    ],
  },
  {
    title: 'Subspaces, Dimension & Rank (Ch. 2)',
    items: [
      { name: 'Subspace Axioms', note: '1. Zero vector 0 ∈ H; 2. Closed under vector addition; 3. Closed under scalar multiplication.' },
      { name: 'Column Space Col(A)', tex: r`\operatorname{Col} A = \operatorname{Span}\{\vec{a}_1, \dots, \vec{a}_n\} \subseteq \mathbb{R}^m`, note: 'Basis = Pivot columns of the ORIGINAL matrix A' },
      { name: 'Null Space Nul(A)', tex: r`\operatorname{Nul} A = \{\vec{x} \in \mathbb{R}^n : A\vec{x} = \vec{0}\} \subseteq \mathbb{R}^n`, note: 'Basis = Direction vectors of parametric vector form' },
      { name: 'Rank-Nullity Theorem', tex: r`\operatorname{rank}(A) + \operatorname{nullity}(A) = n`, note: 'rank = pivot columns; nullity = free variables; n = total columns' },
      { name: 'Computer Graphics Homogeneous', tex: r`\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} a & b & h \\ c & d & k \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}`, note: 'Enables translation [h, k]ᵀ via matrix multiplication' },
    ],
  },
  {
    title: 'Determinants & Cramer’s Rule (Ch. 3)',
    items: [
      { name: 'Cofactor Expansion', tex: r`\det A = \sum_{j=1}^n a_{ij} C_{ij} = \sum_{i=1}^n a_{ij} C_{ij}`, note: 'C_{ij} = (-1)^{i+j} det(A_{ij})' },
      { name: 'Row Operations on Determinant', note: 'Swap negates (-1); Scale scales by c; Row addition leaves determinant UNCHANGED.' },
      { name: 'Multiplicative Theorem', tex: r`\det(AB) = \det(A) \cdot \det(B)`, note: 'det(A⁻¹) = 1/det(A); det(Aᵀ) = det(A); det(cA) = cⁿ det(A)' },
      { name: 'Cramer’s Rule', tex: r`x_i = \dfrac{\det A_i(\vec{b})}{\det A}`, note: 'A_i(b) replaces column i with b. Valid when det A ≠ 0.' },
      { name: 'Classical Adjugate Inverse', tex: r`A^{-1} = \dfrac{1}{\det A} \operatorname{adj}(A)`, note: 'adj(A) = (Cofactor matrix)ᵀ' },
      { name: 'Geometric Area and Volume', tex: [r`\text{Area of Parallelogram in } \mathbb{R}^2 = |\det[\vec{u} \quad \vec{v}]|`, r`\text{Volume of Parallelepiped in } \mathbb{R}^3 = |\det[\vec{u} \quad \vec{v} \quad \vec{w}]|`] },
    ],
  },
  {
    title: 'Abstract Vector Spaces & Isomorphisms (Ch. 4)',
    items: [
      { name: '10 Vector Space Axioms', note: 'Addition: closure, commutativity, associativity, zero element, additive inverse. Scalar: closure, vector distributive, scalar distributive, scalar associative, 1·u = u.' },
      { name: 'Kernel & Range', tex: [r`\operatorname{ker}(T) = \{\vec{v} \in V : T(\vec{v}) = \vec{0}_W\}`, r`\operatorname{range}(T) = \{T(\vec{v}) : \vec{v} \in V\}`], note: 'T is 1-to-1 iff ker(T) = {0_V}' },
      { name: 'Coordinate Vector', tex: r`[\vec{x}]_{\mathcal{B}} = [c_1, c_2, \dots, c_n]^T \in \mathbb{R}^n`, note: 'Unique weights for basis B = {b₁, ..., b_n}' },
      { name: 'Isomorphism ℙ₂ → ℝ³', tex: r`a_0 + a_1 t + a_2 t^2 \iff \begin{bmatrix} a_0 \\ a_1 \\ a_2 \end{bmatrix}`, note: 'Preserves linear combinations, independence, and dimension' },
    ],
  },
];

export const methodTable: { situation: string; method: string; why: string }[] = [
  {
    situation: 'Solve a general system with free variables',
    method: 'Gauss-Jordan Row Elimination to RREF',
    why: 'Directly yields basic vs free variables and easily writes out the 3 answer forms (System, Vector, Parametric).',
  },
  {
    situation: 'Solve Ax = b for many different vectors b',
    method: 'LU Factorization (A = LU)',
    why: 'Factor once; each solve requires only fast O(n²) forward and back substitutions without repeating elimination.',
  },
  {
    situation: 'Parametric system with symbolic variable s in coefficients',
    method: 'Cramer’s Rule',
    why: 'Gives explicit formulas x_i = det A_i(b) / det A without dividing by expressions that might be zero.',
  },
  {
    situation: 'Test if vectors in Rⁿ are linearly independent',
    method: 'Row reduce matrix [v1 ... vp]',
    why: 'Independent iff every column has a pivot (no free variables). If p > n, immediately dependent without calculating.',
  },
  {
    situation: 'Find a basis for Col(A)',
    method: 'Row reduce to find pivot columns; pick ORIGINAL columns of A',
    why: 'Row operations preserve linear dependence relations among columns, but alter the column space itself.',
  },
  {
    situation: 'Find a basis for Nul(A)',
    method: 'Row reduce [A | 0] to RREF and write parametric vector form',
    why: 'Vectors multiplying free variables form a linearly independent spanning set for Nul(A).',
  },
  {
    situation: 'Test independence in abstract spaces (like polynomials P_n)',
    method: 'Coordinate mapping isomorphism [p]_B in Rⁿ',
    why: 'Converts abstract polynomial problems into concrete matrix determinant and pivot calculations in Euclidean space.',
  },
];
