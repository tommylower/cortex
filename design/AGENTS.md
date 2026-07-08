# design

UI, motion, color, and visual implementation skills. consult before generating UI code or making design choices.

## tooling note

use the `paper` skill when active design work should happen in Paper or `paper.design`. keep Pencil app/MCP support optional: only when already installed, when an existing Pencil file is part of the workflow, or when explicitly requested.

## shelves

- `foundations/` — core principles, patterns, and quality gates
- `color/` — color spaces, palettes, gradients
- `motion/` — animation primitives, transitions, motion vocabulary, and sound
- `craft/` — interaction craft, taste, animation critique, UI polish
- `review/` — static and live UI/UX review workflows
- `systems/` — opt-in reference design systems. never auto-apply
- `workflows/` — design-system extraction and design operations
- `kits/` — component kits and registry-backed UI systems
- `tools/` — installable tools and integrations: overlays, MCP servers, packages

## foundations

- **ui-principles** — spacing scale, typography hierarchy, layout rules, grids, section rhythm
- **reference-patterns** — design patterns and quality benchmarks from reference sites (Linear, Vercel, etc.)
- **responsive-craft** — responsive layout implementation. audit, build, or live multi-breakpoint preview
- **loading-states** — loading states, skeletons, progress indicators, dot-matrix micro-loaders

## color

- **oklch-skill** — OKLCH conversion, palette generation, contrast checks, gamut handling, Tailwind v4 tokens
- **gradients** — gradient construction, color spaces, layering, performance, recipes

## motion

- **framer-motion** — animation patterns for React/Next.js (reveals, hover, micro-interactions)
- **view-transitions** — native React/browser View Transitions for shared elements and route changes
- **animation-vocabulary** — Emil Kowalski's reverse-lookup glossary for naming web motion effects from vague descriptions
- **interface-sound** — tasteful UI sound feedback with Web Audio or @web-kits/audio

## craft

- **emil-design-eng** — Emil Kowalski's design-engineering heuristics for motion, interaction feel, and UI polish
- **interface-craft** — Josh Puckett's toolkit for storyboard animation, dial-driven tuning, and design critique
- **css-interaction-tips** — quick reference for hover, transitions, button states, tooltips, tap targets

## review

- **studio-audit** — umbrella final design QA when a UI feels done. orchestrates preflight, responsive-craft, wip-senior-audit, interface-craft, and emil-design-eng under the studio rubric (the `studio` skill, formerly studio-law)
- **preflight** — final design audit before shipping. accessibility, visual consistency, AI pattern detection
- **wip-senior-audit** — boot the real running site, screenshot pages and core flows (desktop + mobile), and produce a senior-lead UX audit graded on understand / trust / convert. live counterpart to preflight's static pass. writes docs/design-audit/
- **agentation-self-driving** — autonomous design critique mode on top of agentation

## systems

opt-in only. apply when explicitly requested, never by default.

- **swiss-design** — Swiss International Style. grid-first, grotesque typography, restrained color, one accent
- **nothing-design** — Nothing-inspired. monochrome, typographic, industrial. Space Grotesk/Mono, OLED blacks
- **muller-brockmann-grid-systems** — opt-in Swiss editorial grid system. modular columns, baseline rhythm, visible overlay, optical display-type alignment

## workflows

- **asbuilt** — derive and conform a design-system package from a finished codebase
- **studio** — the front door to the whole design practice. house law (rules.md grades, invariants, motion defaults), playbook (what to do per situation), tool inventory, and doctrine (intake, scaffold, package format). load before any design work; every other design skill hangs off it

## kits

- **fluid-functionalism** — Micka's shadcn-compatible animated components via registry workflow

## tools

- **design-tools** — inventory of all Cortex design tools and which to use when
- **paper** — Paper / paper.design canvas workflow when Paper tooling is available
- **figma-mcp** — official Figma MCP server for reading tokens, components, layout
- **wiretext** — ASCII wireframe MCP tool for terminal-based wireframing
- **shader-lab** — Basement Studio's shader runtime for GPU compositions. requires WebGPU
- **funky-shadow** — dithered Oklab gradient shadows rendered with canvas
- **agentation** — visual feedback toolbar for browser-driven iteration. by Dennis Jin and Benji Taylor
- **dialkit** — floating control panel for tuning animation and visual values live. by Josh Puckett
- **interface-kit** — visual design overlay for Next.js. by Josh Puckett
- **rams** — external Rams design-review command when explicitly requested
- **pretext** — fast multi-line text measurement and layout without DOM reflow. by Cheng Lou

see ../AGENTS.md for the cortex layout and skill format.
