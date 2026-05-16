---
name: design-tools
description: "Inventory of Cortex design tools and what each one can do. Use when the user asks what design tools are available, what can we do visually, what design tooling exists in Cortex, which tool to use for UI polish, or how Paper, Figma, Shader Lab, Funky Shadow, DialKit, Interface Kit, Agentation, Wiretext, Pretext, and responsive preview fit together."
---

# Design Tools

Use this skill to answer tool-discovery questions. It is an index, not a replacement for the specific tool skills. Load the named skill before installing or applying a tool.

## Canvas & Design Work

- **Paper** — default active design canvas at `paper.design`; use for visual layout work, artboards, and design iteration.
- **Figma MCP** (`figma-mcp`) — read Figma frames, variables, component structure, and generate code from Figma context.
- **Wiretext** (`wiretext`) — quick ASCII wireframes with editable browser links before committing to code or Figma.

## Visual Effects

- **Shader Lab** (`shader-lab`) — WebGPU shader compositions for hero visuals, warped text, image layers, liquid backgrounds, and post-processing.
- **Funky Shadow** (`funky-shadow`) — dithered, Oklab gradient shadows rendered with canvas behind cards, tiles, icons, or visual accents.
- **Gradients** (`gradients`) — CSS gradient construction, color-space choices, glow recipes, masks, and gradient performance rules.
- **Loading States** (`loading-states`) — skeletons, progress states, and crafted dot-matrix micro-loaders.

## Motion & Interaction

- **Framer Motion** (`framer-motion`) — React/Next.js motion patterns: reveals, hover/tap states, layout animations, and page transitions.
- **View Transitions** (`view-transitions`) — native browser/React shared-element and route transitions.
- **CSS Interaction Tips** (`css-interaction-tips`) — small interaction fixes: hover flicker, button press, tap targets, tooltip timing, popover origins.
- **Interface Sound** (`interface-sound`) — tasteful UI sound feedback and procedural web audio.

## Live Tuning & Feedback

- **DialKit** (`dialkit`) — dev-only floating controls for tuning animation, spacing, color, blur, and shadow values in React.
- **Interface Kit** (`interface-kit`) — dev-only browser overlay for editing visual styles directly.
- **Agentation** (`agentation`) — dev-only visual annotation toolbar for design feedback.
- **Agentation Self-Driving** (`agentation-self-driving`) — autonomous browser annotation workflow when Agentation is installed.

## Layout & Verification

- **Responsive Craft** (`responsive-craft`) — responsive build/audit workflow and multi-breakpoint preview.
- **Pretext** (`pretext`) — deterministic text measurement for labels, headings, virtualized rows, masonry, and layout-shift prevention.
- **Preflight** (`preflight`) — final design audit for accessibility, visual consistency, responsive issues, and AI-pattern tells.

## Choosing Quickly

| Need | Start with |
| --- | --- |
| Sketch page structure | `wiretext` or Paper |
| Extract from Figma | `figma-mcp` |
| Build a shader hero | `shader-lab` |
| Add textured card shadows | `funky-shadow` |
| Add a crafted loader | `loading-states` |
| Add native shared-element transitions | `view-transitions` |
| Add UI sound feedback | `interface-sound` |
| Tune live visual values | `dialkit` |
| Edit visual styles in browser | `interface-kit` |
| Collect design feedback | `agentation` |
| Fix mobile/responsive layout | `responsive-craft` |
| Verify text fit | `pretext` |
| Ship-check a UI | `preflight` |

## Rule

Tools are opt-in unless their specific skill says otherwise. For dev-only overlays, install as dev dependencies and mount only behind a development gate.
