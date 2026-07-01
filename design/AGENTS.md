# design

UI, motion, color, and visual implementation skills. consult before generating UI code or making design choices.

## tooling note

default to Paper and the paper MCP at `paper.design` for active design work. keep Pencil app/MCP support optional: only when already installed, when an existing Pencil file is part of the workflow, or when explicitly requested.

## shelves

- `foundations/` — core principles, patterns, and quality gates
- `color/` — color spaces, palettes, gradients
- `motion/` — animation, transitions, interaction feel
- `systems/` — opt-in reference design systems. never auto-apply
- `tools/` — installable tools and integrations: overlays, MCP servers, packages

## foundations

- **ui-principles** — spacing scale, typography hierarchy, layout rules, grids, section rhythm
- **reference-patterns** — design patterns and quality benchmarks from reference sites (Linear, Vercel, etc.)
- **responsive-craft** — responsive layout implementation. audit, build, or live multi-breakpoint preview
- **loading-states** — loading states, skeletons, progress indicators, dot-matrix micro-loaders
- **preflight** — final design audit before shipping. accessibility, visual consistency, AI pattern detection
- **wip-senior-audit** — boot the real running site, screenshot pages and core flows (desktop + mobile), and produce a senior-lead UX audit graded on understand / trust / convert. live counterpart to preflight's static pass. writes docs/design-audit/

## color

- **oklch-skill** — OKLCH conversion, palette generation, contrast checks, gamut handling, Tailwind v4 tokens
- **gradients** — gradient construction, color spaces, layering, performance, recipes

## motion

- **framer-motion** — animation patterns for React/Next.js (reveals, hover, micro-interactions)
- **view-transitions** — native React/browser View Transitions for shared elements and route changes
- **css-interaction-tips** — quick reference for hover, transitions, button states, tooltips, tap targets
- **emil-design-eng** — Emil Kowalski's design-engineering heuristics for motion, interaction feel, and UI polish
- **animation-vocabulary** — Emil Kowalski's reverse-lookup glossary for naming web motion effects from vague descriptions
- **interface-craft** — Josh Puckett's toolkit for storyboard animation, dial-driven tuning, and design critique
- **interface-sound** — tasteful UI sound feedback with Web Audio or @web-kits/audio

## systems

opt-in only. apply when explicitly requested, never by default.

- **swiss-design** — Swiss International Style. grid-first, grotesque typography, restrained color, one accent
- **nothing-design** — Nothing-inspired. monochrome, typographic, industrial. Space Grotesk/Mono, OLED blacks
- **muller-brockmann-grid-systems** — opt-in Swiss editorial grid system. modular columns, baseline rhythm, visible overlay, optical display-type alignment

## tools

- **design-tools** — inventory of all Cortex design tools and which to use when
- **figma-mcp** — official Figma MCP server for reading tokens, components, layout
- **wiretext** — ASCII wireframe MCP tool for terminal-based wireframing
- **shader-lab** — Basement Studio's shader runtime for GPU compositions. requires WebGPU
- **fluid-functionalism** — Micka's shadcn-compatible animated components via registry workflow
- **funky-shadow** — dithered Oklab gradient shadows rendered with canvas
- **agentation** — visual feedback toolbar for browser-driven iteration. by Dennis Jin and Benji Taylor
- **agentation-self-driving** — autonomous design critique mode on top of agentation
- **dialkit** — floating control panel for tuning animation and visual values live. by Josh Puckett
- **interface-kit** — visual design overlay for Next.js. by Josh Puckett
- **pretext** — fast multi-line text measurement and layout without DOM reflow. by Cheng Lou

see ../AGENTS.md for the cortex layout and skill format.
