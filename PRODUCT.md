# Product: Linear Algebra & Its Applications (MATH2110)

<!-- impeccable:product-schema 1 -->

## Platform

web (single-file production bundle + static SPA deployment)

## Stack

React 18 + Vite 8 + TypeScript 5. Client-side execution with exact rational arithmetic math engine (`Fraction` and `Matrix`), KaTeX math rendering, SVG geometric visualizers, interactive steppers, and an embedded AI teacher dock powered by OpenRouter with direct client-side API key configuration stored in `localStorage`.

## Users

Primary user: A Computer Science & Engineering (CSE) undergraduate at Inha University in Tashkent taking **Linear Algebra (MATH2110), 2026 Fall**.
- Target: Mastering both theoretical foundations (general vector space axioms, subspace proofs, linear transformation kernels/ranges, isomorphism) and algorithmic calculation methods (RREF, matrix inversion, LU decomposition, Cramer's rule, cofactor expansion, coordinate mapping).
- Studying context: Preparing for midterms and final exams following David C. Lay's *Linear Algebra and Its Applications* and the professor's 52 blackboard lectures.

## Product Purpose

A comprehensive, interactive study platform that mirrors and teaches everything written on the blackboard across all 8 weeks of lectures, split into digestible lessons with live visualizers, self-checking quizzes, verified homework solutions, and an interactive AI teacher.

## Core Capabilities

1. **Exact Mathematical Engine**:
   - Arbitrary rational numbers (`Frac`) preventing floating-point rounding errors in pivots, determinants, and matrix inverses.
   - Matrix operations: Gaussian elimination step-tracking, RREF, LU decomposition ($A = LU$), determinant computation via cofactor expansion and elementary row operations, adjugate matrix calculation ($A^{-1} = \frac{1}{\det A}\operatorname{adj}(A)$), rank, nullity, and subspace basis extraction.
2. **Interactive Visualizers**:
   - `MatrixExplorer`: 2D geometric transformation canvas illustrating standard basis vectors $\vec{e}_1, \vec{e}_2$, rotations, shears, reflections, projections, and scalings.
   - `VectorSpanLab`: Interactive linear combination parallelogram and span visualization $c_1\vec{v}_1 + c_2\vec{v}_2$.
   - `TrafficFlowLab`: Kirchhoff network flow conservation ($\sum \text{In} = \sum \text{Out}$) with live free parameter sliders.
   - `RrefStepper`: Step-by-step row reduction showing elementary row operations (swap, scale, replacement).
   - `DeterminantLab`: Matrix determinant properties, cofactor expansions, and row operation tracking.
   - `CramerSolver`: Parametric systems solver with singular condition testing ($s = \pm 2$).
   - `LuDecomposer`: $A = LU$ factorization stepper and forward/back substitution solver ($L\vec{y} = \vec{b}$, $U\vec{x} = \vec{y}$).
   - `AxiomTester`: 10 vector space axioms tester including standard spaces ($\mathbb{R}^n, \mathbb{P}_n$) and the professor's board problems ($\mathbf{u} \oplus \mathbf{v} = [x_1+x_2-1, y_1+y_2]^T$ with scalar distributivity failure, and $(0, \infty)$ with $x \oplus y = xy$).
3. **Board Lecture Integration**:
   - High-resolution blackboard photos for every lecture topic with mathematical commentary, step-by-step derivations, and full-screen enlargement modal.
4. **Complete Assigned Homework Solutions**:
   - Full, verified, step-by-step solutions for all assigned textbook exercises across Weeks 1 to 7 and Midterm examination samples.
5. **AI Teacher Dock**:
   - Embedded floating assistant with OpenRouter integration, persistent chat threads, LaTeX rendering, and deep context awareness of the 8-week syllabus and blackboard notes.
