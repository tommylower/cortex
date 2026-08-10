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
- **better-accessibility** — semantics, keyboard and focus behavior, ARIA, forms, screen readers, hit areas, zoom, and reduced motion. by Jakub Krehel
- **better-layout** — grouping, alignment, reading order, progressive disclosure, responsive adaptation, safe areas, and RTL. by Jakub Krehel
- **better-typography** — font choice and loading, OpenType, type hierarchy, spacing, wrapping, truncation, punctuation, and text accessibility. by Jakub Krehel
- **reference-patterns** — design patterns and quality benchmarks from reference sites (Linear, Vercel, etc.)
- **responsive-craft** — responsive layout implementation. audit, build, or live multi-breakpoint preview
- **loading-states** — loading states, skeletons, progress indicators, dot-matrix micro-loaders

## color

- **oklch-skill** — OKLCH conversion, palette generation, contrast, gamut, semantic color use, appearance variants, and Tailwind v4 tokens. by Jakub Krehel
- **gradients** — gradient construction, color spaces, layering, performance, recipes

## motion

- **framer-motion** — animation patterns for React/Next.js (reveals, hover, micro-interactions)
- **view-transitions** — native React/browser View Transitions for shared elements and route changes
- **animation-vocabulary** — Emil Kowalski's reverse-lookup glossary for naming web motion effects from vague descriptions
- **interface-sound** — tasteful UI sound feedback with Web Audio or @web-kits/audio

## craft

- **better-writing** — UX writing for labels, links, errors, settings, onboarding, notifications, and empty states. by Jakub Krehel
- **better-ui** — surface, icon, micro-interaction, and motion-polish principles. by Jakub Krehel
- **emil-design-eng** — Emil Kowalski's design-engineering owner for UI polish, motion decisions, focused review, codebase motion audits, and restrained opportunity finding
- **interface-craft** — Josh Puckett's toolkit for storyboard animation, dial-driven tuning, and design critique
- **css-interaction-tips** — quick reference for hover, transitions, button states, tooltips, tap targets

## review

- **studio-audit** — umbrella final design QA when a UI feels done. covers accessibility, layout, writing, typography, color, UI craft, responsive behavior, and live flow under Studio law
- **preflight** — final design audit before shipping. accessibility, visual consistency, AI pattern detection
- **wip-senior-audit** — boot the real running site, screenshot pages and core flows (desktop + mobile), and produce a senior-lead UX audit graded on understand / trust / convert. live counterpart to preflight's static pass. writes docs/design-audit/
- **agentation-self-driving** — autonomous design critique mode on top of agentation

## systems

opt-in only. apply when explicitly requested, never by default.

- **swiss-design** — Swiss International Style. grid-first, grotesque typography, restrained color, one accent
- **nothing-design** — Nothing-inspired. monochrome, typographic, industrial. Space Grotesk/Mono, OLED blacks
- **muller-brockmann-grid-systems** — opt-in Swiss editorial grid system. modular columns, baseline rhythm, visible overlay, optical display-type alignment
- **apple-design** — opt-in Apple/WWDC reference for fluid physical interaction and product-design principles on the web

## workflows

- **asbuilt** — derive and conform a design-system package from a finished codebase
- **studio** — the front door to the whole design practice. house law (rules.md the grading system, house.md this install's earned rows; gitignored), playbook (what to do per situation), tool inventory, and doctrine (intake, scaffold, package format). load before any design work; every other design skill hangs off it

## kits

- **component-libraries** — Studio-aligned supply shelf of saved UI component libraries
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
- **rams** — optional external design review via local skill, hosted MCP, or GitHub App
- **pretext** — fast multi-line text measurement and layout without DOM reflow. by Cheng Lou

see ../AGENTS.md for the cortex layout and skill format.
