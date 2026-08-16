# inventory: everything on the shelf, one line each

absorbed from groundwork/skills-audit.md (v2, 2026-07-04) and the
design-tools catalog on 2026-07-06. verdicts: supplier (catalog, rank
resolves conflicts) / rewrite (proposal, needs tommy) / demote / delete.
cortex skills are supplier catalogs, doctrine is house law, motion numbers
never come from a skill's defaults.

## the house (not suppliers)

- studio (this skill): the law, the playbook, this inventory. not a supplier, outranks this audit's frame, lives in ~/.claude-wip/skills, outlives groundwork.
- workbench: the tool, opt-in only. a component review canvas loaded ONLY on operator ask, never auto, never part of scaffolding. the default scaffold path is doctrine/codebase-scaffold.md + doctrine/enforcement.md.
- studio-audit (cortex): the ship check. owns scope, evidence, domain coverage, deduplication, and the final ship / fix-first / review-again verdict.
- asbuilt (cortex): derive + conform a design system from existing code, built 2026-07-04 on the project-c pull. init/diff/generate still seed-only.

## design tools

from the design-tools catalog. tools are opt-in; dev-only overlays install as dev dependencies behind a development gate.

- paper: active design canvas at paper.design. visual layout work, artboards, design iteration.
- figma mcp: read Figma frames, variables, component structure. generate code from Figma context.
- shader lab: WebGPU shader compositions for hero visuals, warped text, liquid backgrounds, post-processing.
- funky shadow: dithered Oklab gradient shadows behind cards, tiles, icons, accents.
- dialkit: dev-only floating controls for tuning animation, spacing, color, blur, shadow values in React.
- leva: saved dev-only React parameter GUI. use for general control panels;
  DialKit remains the Studio default for motion and visual tuning.
- interface kit: dev-only browser overlay for editing visual styles directly.
- agentation: dev-only visual annotation toolbar for design feedback. self-driving variant runs it autonomously.
- rams: optional external review supplier. local skill stays on-device; MCP and GitHub App are hosted. explicit opt-in only.
- wiretext: quick ASCII wireframes with editable browser links before committing to code or Figma.
- pretext: deterministic text measurement for labels, headings, virtualized rows, masonry, layout-shift prevention.
- responsive preview: multi-breakpoint preview inside responsive-craft's build/audit workflow.

## mcps

- figma: reach when reading or writing real Figma files: frames, variables, tokens, code generation from designs.
- paper: reach when designing on the Paper canvas: artboards, write_html, code-to-design and design-to-code.
- claude-in-chrome: reach when a live browser is the surface: driving pages, screenshots, console and network reads.
- linear: reach for issue and project tracking, not design decisions.
- mobbin: reach for reference anatomy from shipped apps: flows, screens, sections. anatomy only, skin stays ours.

## suppliers (cortex skills)

verdicts and notes carried from skills-audit.md v2, unedited in substance.

### foundations

- ui-principles: supplier. spacing/type/layout anatomy. carries numeric opinions; they're catalog examples, margins win.
- better-accessibility: supplier. deep platform, keyboard, focus, semantics, form, assistive-technology, zoom, and motion-reduction reference.
- better-layout: supplier. grouping, alignment, reading order, adaptivity, safe areas, and RTL. numeric values are starting points.
- better-typography: supplier. font systems, rendered hierarchy, text behavior, and typography review.
- oklch-skill: supplier. color math, ramps, gamut, contrast, semantic color use, and appearance variants. no law claims.
- gradients: supplier. color-space choices, recipes.
- responsive-craft: supplier, WATCH. workflows hardcode breakpoints and durations in imperative voice. fine under rank; the likeliest leak if loaded without the studio skill.
- loading-states: supplier, WATCH. skeleton/loader patterns with durations. examples only.
- reference-patterns: supplier, WATCH. carries motion numbers. same caveat.
- preflight: supplier. ship checklist. process-shaped but invoked deliberately, not a ritual.
- wip-senior-audit: supplier. critique pass.

### craft and content

- better-writing: supplier. product voice, terminology, labels, errors, and empty-state copy.
- better-ui: supplier, WATCH. surface and icon craft plus motion recipes. project tokens and house.md motion defaults always win.

### motion

grep-verified: every skill here carries concrete numbers (durations,
springs, easings). all stay suppliers under one standing rule: their
numbers are catalog examples. tuned numbers come from the margins and land
in house.md defaults.

- emil-design-eng: supplier. the taste anchor and one motion owner with craft, focused review, codebase audit/plan, and opportunity-finding branches. its numbers are emil's, not mine.
- interface-craft: supplier. storyboard DSL + critique + dialkit patterns. DSL is the value; default timings are examples.
- css-interaction-tips: supplier. press feel, popover origins, hover bugs.
- framer-motion: supplier. code-phase patterns (library is now "motion", motion.dev).
- view-transitions: supplier. native shared-element transitions.
- animation-vocabulary: supplier. naming what i want; brief-writing aid.
- interface-sound: supplier. audio feedback. no pull yet.

### graphics

- shader-lab: supplier. webgpu compositions. garnish layer only (attention-is-salt).
- funky-shadow: supplier. dithered oklab shadows. same caveat. when shipped in code it's a runtime dep -> platform-mapping.
- (gap) three.js: no skill. learn on first real pull, don't pre-build.

### systems

- nothing-design: supplier, opt-in. full visual system, never auto-applied by its own terms. no conflict while opt-in.
- swiss-design, muller-brockmann-grid-systems: supplier, opt-in. reference doctrine, explicitly invoked.
- apple-design: supplier, opt-in. Apple/WWDC interaction and product principles translated to web behavior; project skin and rules.md motion values always win.

### tool bridges

- figma-mcp + figma plugin skills: supplier. proven hard in project-a.
- paper-desktop plugins (code-to-design, design-to-code): supplier. proven in project-b mocks.
- wiretext: supplier. pre-canvas wireframes.
- dialkit: supplier. the tuning instrument, how margin numbers get FOUND, not a source of them.
- interface-kit: supplier.
- agentation, agentation-self-driving: supplier. annotation + autonomous critique. critique isn't law.
- component-libraries: supplier. the saved UI component supply shelf. its entries never override house.md or component intake.
- fluid-functionalism: supplier. installable animated registry. its spring values ship as a runtime dep or not at all.
- pretext: supplier. deterministic text measurement.
- design-tools: supplier. the index. verified: no references to the deleted commands.

### process + engineering

- handoff / closeout: supplier. session continuity only. v1 called this "the natural home for the deposit ritual", WRONG since the ritual was killed; deposits are pain-driven and happen at the moment of pain, not at close.
- grill-me, grill-with-docs, blindspot, merge-quiz, diagnose, tdd, triage, zoom-out, teach: supplier. thinking/review aids, no design-law claims.
- improve, improve-codebase-architecture, deadcode, prototype, to-issues, to-prd, conventions, stack, dev-setup, claude-workflow, agent-swarm, agent-interviewer, codex-review, fable-codex, caveman/grug, write-a-skill, writing-great-skills, setup-matt-pocock-skills, find-skills, nightcap, vercel-deploy: supplier. engineering/workflow catalogs, out of design-law scope.
- interview (command): supplier. interviewer adapter.

### non-design (cortex/marketing, ~40 skills)

one-line pass, whole category: supplier catalogs (ads, emails, seo,
pricing, launch, etc.). out of design scope, no doctrine conflicts, keep.
flagged only if one ever starts dictating on-page visual/motion decisions.

## watchlist

for the next digest to re-check. no rewrites or demotes are pending;
skills-audit v2 closed with "none urgent, the library is clean under rank."

- responsive-craft: WATCH. hardcoded breakpoints and durations in imperative voice.
- loading-states: WATCH. patterns carry durations.
- reference-patterns: WATCH. carries motion numbers.
- better-ui: WATCH. concrete polish recipes remain supplier defaults only.
- all of motion: standing watch. only matters in a session where the studio skill isn't loaded; the fix if that ever bites is a one-line pain deposit in house.md, not a mass rewrite.
