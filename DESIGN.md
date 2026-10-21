---
name: Linear Algebra Study Companion
description: An impeccable, high-density academic study platform for linear algebra students. Warm mathematical neutrals, deep cobalt/indigo accents, crisp vectors, KaTeX mathematical typography, and verified pedagogical widgets.
colors:
  bg: "oklch(99% 0.005 240)"
  panel: "oklch(96.5% 0.01 242)"
  raised: "oklch(100% 0.002 240)"
  sunk: "oklch(97.2% 0.008 242)"
  line: "oklch(90.5% 0.015 242)"
  line-strong: "oklch(81% 0.02 242)"
  ink: "oklch(22% 0.035 255)"
  ink-2: "oklch(42% 0.03 255)"
  ink-3: "oklch(52% 0.028 255)"
  accent: "oklch(48% 0.17 260)"
  accent-hover: "oklch(42% 0.18 260)"
  on-accent: "oklch(99% 0.01 260)"
  accent-soft: "oklch(96% 0.03 260)"
  accent-line: "oklch(82% 0.07 260)"
  vector-u: "oklch(50% 0.18 255)"
  vector-u-soft: "oklch(95.5% 0.035 255)"
  vector-v: "oklch(55% 0.19 35)"
  vector-v-soft: "oklch(95.5% 0.04 35)"
  vector-w: "oklch(52% 0.16 150)"
  vector-w-soft: "oklch(95.5% 0.04 150)"
  pivot: "oklch(48% 0.15 195)"
  pivot-soft: "oklch(95.5% 0.035 195)"
  ok: "oklch(45% 0.14 150)"
  ok-soft: "oklch(96% 0.04 150)"
  ok-line: "oklch(80% 0.09 150)"
  bad: "oklch(48% 0.18 25)"
  bad-soft: "oklch(96% 0.035 25)"
  bad-line: "oklch(82% 0.09 25)"
  warn: "oklch(48% 0.14 75)"
  warn-soft: "oklch(96.5% 0.05 85)"
  warn-line: "oklch(82% 0.1 80)"
  selection: "oklch(88% 0.07 260)"
  focus: "oklch(56% 0.16 260)"
typography:
  display:
    fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "2.4rem"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "1.9rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 650
    lineHeight: 1.3
  body:
    fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  code:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "0.9375rem"
---

# Design System: Linear Algebra Study Companion

A design system created for university mathematics instruction following the `.impeccable` standard.

## 1. Mathematical Visual Language
- **Matrices & Brackets**: Rendered with KaTeX `\begin{bmatrix}` with crisp hairline grid lines and bracket styling.
- **Vectors Color Scheme**:
  - Vector $\vec{u}$: Cobalt Blue (`oklch(50% 0.18 255)`)
  - Vector $\vec{v}$: Coral/Amber (`oklch(55% 0.19 35)`)
  - Linear combination $\vec{w} = c_1\vec{u} + c_2\vec{v}$: Emerald (`oklch(52% 0.16 150)`)
- **Pivots & Highlights**: Cyan wash (`oklch(95.5% 0.035 195)`) for pivot positions in RREF and LU decomposition.

## 2. Layout & Surfaces
- Three-level elevation hierarchy:
  1. Base surface `--bg`: Cool paper white in light mode, deep obsidian in dark mode.
  2. Sidebar & navigation `--panel`: Tinted mist separating hierarchy.
  3. Cards & interactive widgets `--raised`: Pure white with crisp 1px borders and subtle elevation shadows.

## 3. Responsive Behavior
- Desktop: Split layout with chapter tree sidebar, central lesson reading pane, and collapsible AI teacher dock.
- Tablet & Mobile: Auto-collapsing sidebar behind hamburger menu, horizontal scrolling for high-dimensional matrices, and touch-friendly visualizer controls.
