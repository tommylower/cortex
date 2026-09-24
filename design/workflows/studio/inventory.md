# inventory

the verdict on every skill, mcp, and tool in the design practice. suppliers
are catalogs: their numbers and styles are examples, and `rules.md` wins
every conflict. a skill not listed here is outside the design practice and
carries no design law.

verdicts:

- **house**: part of the practice itself.
- **supplier**: a catalog to draw from.
- **watch**: a supplier that states numbers (durations, breakpoints) in an
  imperative voice. read its values as examples, never as rules.
- **opt-in**: a full visual system or external service, used only when
  the operator asks for it.

## skills

### house

- `studio`: this skill. the rules, playbook, practices, inventory, and doctrine.
- `studio-audit`: the ship check. owns scope, evidence, domain coverage, deduplication, and the final verdict.
- `asbuilt`: derives a design system from existing code, conforms code back to it, and owns the design-system package format.

### foundations

- `ui-principles`: supplier. spacing, type, and layout anatomy.
- `better-accessibility`: supplier. keyboard, focus, semantics, forms, assistive technology, zoom, and reduced motion.
- `better-layout`: supplier. grouping, alignment, reading order, adaptivity, safe areas, and rtl.
- `better-typography`: supplier. font systems, hierarchy, and text behavior.
- `oklch-skill`: supplier. color math, ramps, gamut, contrast, and semantic color.
- `gradients`: supplier. color-space choices and recipes.
- `responsive-craft`: watch. its workflows hardcode breakpoints and durations.
- `loading-states`: watch. its patterns carry durations.
- `reference-patterns`: watch. it carries motion numbers.
- `preflight`: supplier. a static design and accessibility review of a component or page, separate from the `scripts/preflight.ts` build gate.
- `wip-senior-audit`: supplier. the live-site pass inside `studio-audit`.

### craft and writing

- `better-writing`: supplier. product voice, labels, errors, and empty states.
- `better-ui`: watch. surface and icon craft plus motion recipes.

### motion

every motion supplier carries concrete durations, springs, and easings.
they are examples; tuned numbers land in `rules.md`.

- `emil-design-eng`: supplier. the taste anchor.
- `improve-animations`: supplier. codebase motion audit and fix plans. read-only.
- `review-animations`: supplier. strict motion review of one diff or surface.
- `find-animation-opportunities`: supplier. where motion belongs, and where it doesn't. read-only.
- `animate`: supplier. builds a new animation decision by decision.
- `interface-craft`: supplier. storyboard notation, critique, and tuning patterns.
- `css-interaction-tips`: supplier. press feel, popover origins, and hover bugs.
- `framer-motion`: supplier. code-phase animation patterns (the library is now published as `motion`).
- `view-transitions`: supplier. native shared-element transitions.
- `animation-vocabulary`: supplier. names for motion, for writing briefs.
- `interface-sound`: supplier. audio feedback.
- `mobile-native`: supplier. platform-layer fixes that make web apps feel native on phones.

### graphics

- `shader-lab`: supplier. webgpu compositions, as garnish only (invariant 7).
- `funky-shadow`: supplier. dithered oklab shadows, as garnish only. in shipped code it is a runtime dependency.

### systems

- `nothing-design`: opt-in. a full visual system, never auto-applied.
- `swiss-design`: opt-in. reference doctrine.
- `muller-brockmann-grid-systems`: opt-in. reference doctrine.
- `apple-design`: opt-in. apple interaction principles translated to the web. lives in `design/emil/`.

### tools and kits

- `figma-mcp`: supplier. reading and generating from figma files.
- `paper`: supplier. the paper canvas workflow; mechanics are in `practices/paper.md`.
- `wiretext`: supplier. ascii wireframes before canvas or code.
- `dialkit`: supplier. the tuning instrument: how better motion numbers get found, never a source of them.
- `interface-kit`: supplier. a dev-only style-editing overlay.
- `agentation`: supplier. a dev-only annotation toolbar.
- `agentation-self-driving`: supplier. autonomous critique through that toolbar. critique is input, not law.
- `component-libraries`: supplier. the shelf of saved component libraries, for behavior and anatomy.
- `fluid-functionalism`: supplier. an installable animated registry. its spring values ship as a runtime dependency or not at all.
- `pretext`: supplier. deterministic text measurement.
- `design-tools`: supplier. the index of design tools.
- `spec-map`: supplier. turns a spec into a system-map diagram.
- `cmyk-proof`: supplier. cmyk proofing for print work designed on screen.
- `rams`: opt-in. an external review service.

## mcps

- figma: reading or writing real figma files.
- paper: designing on the paper canvas.
- claude-in-chrome: a live browser as the surface, including reading paper's inspector state.
- mobbin: reference anatomy from shipped apps. anatomy only; the skin stays ours.

## tools and plugins outside cortex

- leva: a dev-only react parameter panel for general controls. dialkit stays the default for motion and visual tuning.
- paper-desktop plugin: ships its own `code-to-design` and `design-to-code` skills, outside cortex.
- three.js: no skill yet. learn it on the first real pull.
