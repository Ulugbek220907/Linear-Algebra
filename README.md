# Linear Algebra & Its Applications (MATH2110) · Study Companion

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Ulugbek220907/Linear-Algebra)

An interactive, rigorous academic study companion built for **Linear Algebra (MATH2110)**. Designed in accordance with David C. Lay's *Linear Algebra and Its Applications* and real blackboard lectures.

---

## 🚀 Hosting on Render

This repository is **100% pre-configured and ready to host on [Render](https://render.com)**.

### Option 1: 1-Click Blueprint Deploy (Recommended)
1. Click the **[Deploy to Render](https://render.com/deploy?repo=https://github.com/Ulugbek220907/Linear-Algebra)** button above.
2. Render detects `render.yaml` automatically and configures the static site, build commands, and SPA rewrite rules.
3. Click **Apply** to deploy.

### Option 2: Manual Static Site on Render (Free)
1. Go to your [Render Dashboard](https://dashboard.render.com/) and click **New +** &rarr; **Static Site**.
2. Connect the GitHub repository `https://github.com/Ulugbek220907/Linear-Algebra.git`.
3. Configure the settings:
   - **Name**: `linear-algebra-companion`
   - **Branch**: `master`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Advanced** / **Redirects/Rewrites**, add a rewrite rule:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
5. Click **Create Static Site**.

### Option 3: Web Service on Render (Node.js)
If you prefer deploying as a Node.js Web Service:
1. Click **New +** &rarr; **Web Service**.
2. Settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. Render automatically sets `$PORT` and runs the built-in production static server (`tools/serve.mjs`), which listens on `0.0.0.0:$PORT` with SPA fallbacks.

---

## 🌟 Core Features

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
   - `AxiomTester`: 10 vector space axioms tester including standard spaces ($\mathbb{R}^n, \mathbb{P}_n$) and blackboard problems.

3. **52 Blackboard Lecture Photos & Notes**:
   - High-resolution blackboard lecture captures integrated into their respective curriculum chapters with detailed mathematical commentary, step-by-step derivations, and full-screen modal zoom.

4. **Complete Assigned Homework Solutions**:
   - Full, verified, step-by-step solutions for assigned textbook exercises across Weeks 1 to 7 and Midterm examination samples.

5. **AI Teacher Dock**:
   - Embedded floating assistant with OpenRouter integration, persistent chat threads, LaTeX rendering, and deep context awareness of the syllabus and blackboard notes.

---

## 🛠️ Local Development

### Prerequisites
- Node.js 20+ installed (`node -v`)

### Commands
```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Run comprehensive test suite (engine verification, content linting, server test)
npm run verify

# Build single-file production bundle in dist/
npm run build

# Preview production build locally via custom static server
npm run start
```

---

## 📂 Project Structure

```
.
├── render.yaml          # Render Blueprint deployment specification
├── .node-version        # Node runtime pin for deployment platforms (v22.14.0)
├── .nvmrc               # NVM configuration
├── src/
│   ├── App.tsx          # Root router & layout
│   ├── components/      # UI components (Shell, BoardPhoto, KaTeX math blocks)
│   ├── content/         # Curriculum chapters, lessons, homework sets, question bank
│   ├── engine/          # Exact rational arithmetic (Frac) and Matrix algorithms
│   ├── lib/             # Teacher context, rich text parsing, state
│   ├── pages/           # Lesson, Chapter, Homework, Practice, Revise, Settings
│   ├── styles/          # Impeccable CSS tokens, typography, math & component themes
│   └── widgets/         # Interactive visualizers (MatrixExplorer, RrefStepper, etc.)
├── tools/
│   ├── check-linux-case.mjs # Linux filesystem case-sensitivity verifier
│   ├── katex-lite.mjs   # Optimized KaTeX CSS builder
│   ├── lint-content.ts  # Verification for LaTeX expressions and lessons
│   ├── serve.mjs        # Production static server for Render Web Service
│   ├── test-serve.mjs   # Server verification test suite
│   └── verify.ts        # Exact mathematical engine unit tests
├── index.html           # SPA entry point
├── package.json         # Scripts and dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite bundler configuration (single-file bundle)
```

---

## 📄 License
MIT
