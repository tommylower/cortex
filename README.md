# cortex

Public skill library for AI-assisted development. Cortex is the portable, agent-agnostic version of how I work: design craft, engineering discipline, agent workflows, marketing skills, and the small adapters that make those skills available to tools like Claude Code and Codex.

Skills are plain markdown. Cortex is not a package, dependency, or runtime. Agents can read it directly from a project, or consume it through thin sync adapters.

## structure

```text
cortex/
├── agent-workflows/   workflows, conventions, setup guides for working with AI agents
├── design/            everything visual, indexed by shelf
│   ├── foundations/   principles, patterns, responsive, loading states
│   ├── color/         oklch, gradients, cmyk print proofing
│   ├── motion/        animation, transitions, interaction feel, sound
│   ├── craft/         interaction craft, taste, animation critique, UI polish
│   ├── review/        static and live UI/UX review workflows
│   ├── systems/       opt-in reference design systems, never auto-applied
│   ├── workflows/     design-system extraction and design operations
│   ├── kits/          component kits and registry-backed UI systems
│   └── tools/         installable tools and integrations
├── engineering/       process-discipline skills (mostly vendored from mattpocock/skills)
├── marketing/         marketing skills and tooling (git submodule)
├── catalog/           shelf registry, resource inbox, and third-party notices
└── scripts/           agent adapters, validation, publishing, journal sweep
```

Every category has an `AGENTS.md` index. Start there. The library rule: you should find a skill by walking the folders, not by searching. Shelf paths live in `catalog/shelves.json`; update that before changing sync or validation behavior.

Resources worth preserving before they have a verified permanent home live in
`catalog/inbox.md`. Saving an entry does not endorse or install it.

## skill menu

<!-- skill-menu:start -->
_Generated from public skill frontmatter. Run `node scripts/update-readme-menu.js` to refresh it._

### agent workflows
- [`agent-interviewer`](agent-workflows/agent-interviewer/SKILL.md) — Interview the user and produce a personalized, agent-agnostic behavior file (CLAUDE.md, AGENT.md, PERSONALIZATION.md, etc.) that defines how an AI agent should think, disagree,…
- [`agent-swarm`](agent-workflows/agent-swarm/SKILL.md) — Multi-agent parallel workflow — wave execution, review loops, adversarial dual-review
- [`claude-workflow`](agent-workflows/claude-workflow/SKILL.md) — Claude Code working patterns — plan mode, subagents, verification, context management, hooks
- [`codex-review`](agent-workflows/codex-review/SKILL.md) — Set up Codex plugin for cross-model code review and task delegation inside Claude Code
- [`designing-loops`](agent-workflows/designing-loops/SKILL.md) — Design agent loops — pick the loop primitive that fits a task and define its stop condition.
- [`fable-codex`](agent-workflows/fable-codex/SKILL.md) — Opt-in split-stack session mode — one strong model plans and reviews from the orchestrating harness while a model from a different vendor executes via CLI handoff. Reference…
- [`fable-prompting`](agent-workflows/fable-prompting/SKILL.md) — Router for prompting Fable 5 so it performs like a next-generation model instead of a current one — give it the goal not the steps, hold it to a hard self-checkable bar, loop…
- [`google-developer-style`](agent-workflows/google-developer-style/SKILL.md) — Applies an agent-focused adaptation of the Google developer documentation style guide to substantial technical prose.
- [`improve`](agent-workflows/improve/SKILL.md) — Survey any codebase as a senior advisor and produce prioritized, self-contained implementation plans for OTHER models/agents to execute. Strictly read-only on source code — never…
- [`nightcap`](agent-workflows/nightcap/SKILL.md) — Nightcap, a nightly agent journal. Reads recent Claude Code and Codex transcripts off disk, skips trivial sessions, and writes one first-person narrative journal entry per real…
- [`pickup`](agent-workflows/pickup/SKILL.md) — Restore compact continuity from the latest cleared session in the current project. Use in a fresh session after clearing context when the user asks to pick up or continue prior…
- [`vercel-deploy`](agent-workflows/vercel-deploy/SKILL.md) — Deploy or manage projects on Vercel from an agent workflow.
- [`wip-quickstart`](agent-workflows/wip-quickstart/SKILL.md) — New-project intake and scaffold workflow for turning a rough brief, voice dump, or idea into an operable code project.
- [`workspace-setup`](agent-workflows/workspace-setup/SKILL.md) — Establish, review, migrate, or repair the workspace operator layer for a standalone or multi-repository code project.

### design

#### foundations
- [`better-accessibility`](design/foundations/better-accessibility/SKILL.md) — Accessibility engineering for product interfaces.
- [`better-layout`](design/foundations/better-layout/SKILL.md) — Layout structure for web interfaces.
- [`better-typography`](design/foundations/better-typography/SKILL.md) — Web typography from font choice through rendered text behavior.
- [`loading-states`](design/foundations/loading-states/SKILL.md) — Design and implement loading states, skeletons, spinners, progress indicators, and dot-matrix micro-loaders.
- [`reference-patterns`](design/foundations/reference-patterns/SKILL.md) — Curated design patterns from high-quality reference sites (Linear, Vercel, Lovable, and others): hero layouts, feature sections, navigation styles, motion timing, card treatments,…
- [`responsive-craft`](design/foundations/responsive-craft/SKILL.md) — Implement responsive design for websites and web apps — from standard mobile-first layouts to complex patterns (sticky elements, scroll coordination, data tables, dashboards).…
- [`ui-principles`](design/foundations/ui-principles/SKILL.md) — Core principles for building high-quality UI: spacing scale, typography hierarchy, layout rules, max content widths, grid systems, card consistency, proximity grouping, and…

#### color
- [`cmyk-proof`](design/color/cmyk-proof/SKILL.md) — ICC-accurate CMYK proofing for print work designed in screen-native canvas tools (Paper, Figma, or any hex-only design surface). Converts brand hexes to press recipes plus…
- [`gradients`](design/color/gradients/SKILL.md) — Patterns and principles for building high-quality CSS gradients: choosing the right color space (sRGB vs oklab vs oklch), linear / radial / conic gradient syntax, layering,…
- [`oklch-skill`](design/color/oklch-skill/SKILL.md) — OKLCH color systems and semantic color usage.

#### motion
- [`animation-vocabulary`](design/motion/animation-vocabulary/SKILL.md) — Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term ("the bouncy thing when a popover opens" → Pop in; "the iOS…
- [`framer-motion`](design/motion/framer-motion/SKILL.md) — Production-ready Framer Motion patterns for React/Next.js: scroll-triggered fade-ups, staggered children for grids and lists, hover and tap micro-interactions, page transitions,…
- [`interface-sound`](design/motion/interface-sound/SKILL.md) — Design and implement tasteful interface sound for web apps using @web-kits/audio or Web Audio.
- [`view-transitions`](design/motion/view-transitions/SKILL.md) — Implement native React and browser View Transitions for page transitions, route changes, shared element transitions, list reorder animations, Suspense reveals, and directional…

#### craft
- [`better-ui`](design/craft/better-ui/SKILL.md) — UI-polish principles for product interfaces.
- [`better-writing`](design/craft/better-writing/SKILL.md) — UX writing for product interfaces.
- [`css-interaction-tips`](design/craft/css-interaction-tips/SKILL.md) — Quick-reference recipes for common CSS interaction and animation problems: button press feedback, smooth element entrances, hover flicker fixes, popover transform-origin,…
- [`emil-design-eng`](design/craft/emil-design-eng/SKILL.md) — Design-engineering craft and motion advisor. Use for UI polish, animation decisions, motion-only review, a codebase motion audit with implementation plans, or finding restrained…
- [`interface-craft`](design/craft/interface-craft/SKILL.md) — Interface Craft for polished React interfaces. Use for three branches: storyboard animation, DialKit-style live tuning, or design critique. Trigger on storyboard, dialkit,…

#### review
- [`agentation-self-driving`](design/review/agentation-self-driving/SKILL.md) — Agentation self-driving design review.
- [`preflight`](design/review/preflight/SKILL.md) — Preflight design review before shipping. Use for static UI/a11y checks, visual consistency, AI-slop detection, or a final component/page ship check.
- [`studio-audit`](design/review/studio-audit/SKILL.md) — Senior Studio audit for finished UI. Use for a quick or full ship check of a component, page, flow, app, or branch before handoff, commit, or deployment, including requests for…
- [`wip-senior-audit`](design/review/wip-senior-audit/SKILL.md) — Senior live-site UX audit.

#### systems
- [`apple-design`](design/systems/apple-design/SKILL.md) — Opt-in Apple interface reference for translating WWDC principles into web UI.
- [`muller-brockmann-grid-systems`](design/systems/muller-brockmann-grid-systems/SKILL.md) — Opt-in Muller-Brockmann grid system for editorial, magazine, report, and longform web pages: modular columns, baseline rhythm, grotesque type, restrained color, inspectable grid…
- [`nothing-design`](design/systems/nothing-design/SKILL.md) — Nothing-inspired design system — monochrome, typographic, industrial. Swiss typography, OLED blacks, Space Grotesk/Mono font stack, segmented widgets. Only use when explicitly…
- [`swiss-design`](design/systems/swiss-design/SKILL.md) — Opt-in Swiss International Style design system for clean editorial interfaces: grid discipline, grotesque typography, restrained color, generous whitespace, opacity hierarchy, and…

#### workflows
- [`asbuilt`](design/workflows/asbuilt/SKILL.md) — Asbuilt design-system extraction and conformance.
- [`spec-map`](design/workflows/spec-map/SKILL.md) — turn a spec into a hand-editable system map in paper
- [`studio`](design/workflows/studio/SKILL.md) — Load before ANY design work (canvas or code, any project). The single front door to the design practice: the house law (rules.md the grading system, house.md this install's earned…
- [`workbench`](design/workflows/workbench/SKILL.md) — Opt-in component review canvas (the "workbench"). NEVER auto-load. Load ONLY when the operator explicitly asks for the workbench or a review canvas by name. Starting a project,…

#### kits
- [`component-libraries`](design/kits/component-libraries/SKILL.md) — UI component-library supply shelf.
- [`fluid-functionalism`](design/kits/fluid-functionalism/SKILL.md) — Fluid Functionalism component-kit workflow for React/Next.js.

#### tools
- [`agentation`](design/tools/agentation/SKILL.md) — Add Agentation visual feedback toolbar to a Next.js project.
- [`design-tools`](design/tools/design-tools/SKILL.md) — Inventory of Cortex design tools and what each one can do.
- [`dialkit`](design/tools/dialkit/SKILL.md) — Add DialKit floating control panel for tuning animations and visual properties.
- [`figma-mcp`](design/tools/figma-mcp/SKILL.md) — Set up and use the official Figma MCP server in Claude Code to read design tokens, components, frame layouts, and variables directly from Figma files, and to generate code from…
- [`funky-shadow`](design/tools/funky-shadow/SKILL.md) — Install and use the funky-shadow package for dithered, gradient-colored shadows behind UI elements.
- [`interface-kit`](design/tools/interface-kit/SKILL.md) — Add Interface Kit visual design overlay to a Next.js project.
- [`paper`](design/tools/paper/SKILL.md) — Paper design canvas workflow for active design work through paper.design or a Paper MCP when available.
- [`pretext`](design/tools/pretext/SKILL.md) — Pretext by Cheng Lou. Pure JavaScript/TypeScript library for fast, accurate multi-line text measurement and layout without DOM reflow.
- [`rams`](design/tools/rams/SKILL.md) — Rams review routing for its local skill, hosted MCP, and GitHub App.
- [`shader-lab`](design/tools/shader-lab/SKILL.md) — Install and use Basement Studio's Shader Lab runtime to drop GPU shader compositions into a Next.js or React app.
- [`wiretext`](design/tools/wiretext/SKILL.md) — ASCII wireframe tool with an MCP server for Claude Code. Generate and edit wireframes from the terminal using primitives (box, text, line, arrow) and components (button, input,…

### engineering
- [`blindspot`](engineering/blindspot/SKILL.md) — Pre-mortem pass before infra, deploy, data-model, or unfamiliar-territory work. Surfaces unknown unknowns by cross-referencing the task against past gotchas in memory and the…
- [`caveman`](engineering/caveman/SKILL.md) — Ultra-compressed technical communication mode. Cuts token usage by dropping filler, articles, and pleasantries while keeping exact technical terms. Use only when user explicitly…
- [`deadcode`](engineering/deadcode/SKILL.md) — find and remove dead code. scans for unused files, exports, dependencies, and types using knip. lists every finding with reasoning before deleting anything.
- [`diagnose`](engineering/diagnose/SKILL.md) — Disciplined diagnosis loop for hard bugs and performance regressions. Reproduce → minimise → hypothesise → instrument → fix → regression-test.
- [`grill-me`](engineering/grill-me/SKILL.md) — Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree.
- [`grill-with-docs`](engineering/grill-with-docs/SKILL.md) — Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates documentation (CONTEXT.md, ADRs) inline as decisions crystallise.
- [`grug`](engineering/grug/SKILL.md) — shortest possible ELI5 answers in simple words. jargon dies, correctness stays. user-invoked and session-sticky until "grug off". For expert technical compression, use caveman…
- [`handoff`](engineering/handoff/SKILL.md) — Create a compact restart capsule before leaving or clearing an active session. Use proactively at a natural stopping point while the session is still cache-warm.
- [`improve-codebase-architecture`](engineering/improve-codebase-architecture/SKILL.md) — Find deepening opportunities in a codebase, informed by the domain language in CONTEXT.md and the decisions in docs/adr/.
- [`merge-quiz`](engineering/merge-quiz/SKILL.md) — Before merging or deploying a diff the user didn't watch being written (delegated to Codex, parallel chats, long autonomous runs), build an HTML report explaining the change with…
- [`prototype`](engineering/prototype/SKILL.md) — Build a throwaway prototype to flesh out a design before committing to it. Routes between two branches — a runnable terminal app for state/business-logic questions, or several…
- [`seo-aeo-best-practices`](engineering/seo-aeo-best-practices/SKILL.md) — SEO and AEO best practices for metadata, Open Graph, sitemaps, robots.txt, hreflang, JSON-LD structured data, EEAT, and content optimized for search engines and AI answer surfaces.
- [`setup-matt-pocock-skills`](engineering/setup-matt-pocock-skills/SKILL.md) — Sets up an `## Agent skills` block in AGENTS.md/CLAUDE.md and `docs/agents/` so the engineering skills know this repo's issue tracker (GitHub or local markdown), triage label…
- [`tdd`](engineering/tdd/SKILL.md) — Test-driven development with red-green-refactor loop.
- [`teach`](engineering/teach/SKILL.md) — Teach the user a new skill or concept, within this workspace.
- [`to-issues`](engineering/to-issues/SKILL.md) — Break a plan, spec, or PRD into independently-grabbable issues on the project issue tracker using tracer-bullet vertical slices.
- [`to-prd`](engineering/to-prd/SKILL.md) — Turn the current conversation context into a PRD and publish it to the project issue tracker.
- [`triage`](engineering/triage/SKILL.md) — Triage issues through a state machine driven by triage roles.
- [`write-a-skill`](engineering/write-a-skill/SKILL.md) — Create new agent skills with proper structure, progressive disclosure, and bundled resources.
- [`writing-great-skills`](engineering/writing-great-skills/SKILL.md) — Reference for writing and editing skills well — the vocabulary and principles that make a skill predictable.
- [`zoom-out`](engineering/zoom-out/SKILL.md) — Tell the agent to zoom out and give broader context or a higher-level perspective.
<!-- skill-menu:end -->

### marketing

The `marketing/` submodule brings in the full Marketing Skills library by Corey Haines (MIT). See `marketing/AGENTS.md`.

It's a submodule because upstream updates constantly. The pin moves two ways: a weekly GitHub Action bumps it automatically, or run `scripts/update-marketing.sh` to bump on demand. Clone with `git clone --recurse-submodules` to get it on a fresh machine.

By contrast, `engineering/` is a vendored MIT snapshot of [mattpocock/skills](https://github.com/mattpocock/skills) — it only changes when deliberately re-vendored.

## clone

```bash
git clone --recurse-submodules https://github.com/tommylower/cortex.git
cd cortex
bash scripts/validate-skills.sh
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

## mount cortex into a project

```bash
export CORTEX_HOME=/path/to/cortex
ln -s "$CORTEX_HOME" <project>/cortex
echo cortex >> <project>/.gitignore
```

Once mounted, any agent that can read markdown from the workspace can use `cortex/` directly.

## agent adapters

One-command setup on a new machine:

```bash
$CORTEX_HOME/scripts/setup-local-agents.sh
```

Or run the per-agent syncs directly:

```bash
$CORTEX_HOME/scripts/sync-claude-skills.sh     # symlinks skills into ~/.claude/skills/
$CORTEX_HOME/scripts/sync-claude-commands.sh   # installs cortex slash commands
$CORTEX_HOME/scripts/sync-claude-agents.sh     # installs cortex Claude subagents
$CORTEX_HOME/scripts/sync-codex-skills.sh      # symlinks skills into ~/.codex/skills/
$CORTEX_HOME/scripts/sync-agent-reporting.sh   # installs shared writing guidance
```

Recommended: a `SessionStart` hook in `~/.claude/settings.json` that runs the Claude syncs, so new skills appear automatically every session. See `AGENTS.md` for the snippet and adapter details. Skills stay agent-agnostic markdown; agent-specific automation lives in adapter scripts, never inside a skill folder.

One-command setup also syncs the bundled `google-developer-style` writing
profile into the global Claude and Codex guidance files. A non-empty
`~/.agents/REPORTING.md` overrides the bundled profile for that user. Use
`scripts/sync-agent-reporting.sh --project /path/to/project --project-only`
to give any agent the same project guidance. Do this only for a user-owned
repository, or with explicit approval from the owner of a shared repository.
Use the repeatable `--target /path/to/guidance.md` option for another agent's
global instruction file. Setup detects existing Gemini and Clawdbot guidance.

## journal

[nightcap](https://github.com/tommylower/nightcap) (`agent-workflows/nightcap/`) reads the day's Claude Code and Codex transcripts every night and writes one narrative entry per substantial session, first person, in your own voice, like a handwritten journal. Each entry records the date, agent, project, a resume command linking back to the chat, and a 1-3 paragraph summary of the work and thinking.

Personalization (name, voice, journal location) lives in `~/.config/nightcap/config.json`. Entries are local-only and never committed. See the skill's `SKILL.md` for setup, scheduling, and on-demand sweeps.

Standalone repos like nightcap, asbuilt, and studio can be refreshed with `scripts/publish.sh <folder> <owner/repo>`. They are presented as Tommy Lower projects; Cortex only keeps their source folders in one place.

## skill format

Cortex skills follow the [Agent Skills specification](https://agentskills.io/specification.md): one directory per skill, a `SKILL.md` with `name` and `description` frontmatter, supporting detail in `references/`. Skills that are not original carry an `author:` line crediting the source. `scripts/validate-skills.sh` enforces the basics. `catalog/shelves.json` is the single source of truth for which shelves validate and sync.

## public safety

- `local/`, `.agents/`, `.claude/`, `.DS_Store`, `skills-lock.json`, and generated journal notes are ignored.
- Public shelves must validate with `scripts/validate-skills.sh`.
- Private client material and unlicensed third-party material stay out of public shelves.
- Skills must not require machine-specific absolute paths. Put reusable references inside the skill folder.

## credits

Cortex mixes original skills with adapted and vendored work. Credit is preserved wherever the work is not original, in each skill's frontmatter and body. Currently that includes:

- [Matt Pocock](https://github.com/mattpocock/skills) — the engineering process set
- [Corey Haines](https://github.com/coreyhaines31/marketingskills) — the marketing submodule
- [Emil Kowalski](https://github.com/emilkowalski/skills) — design-engineering philosophy, motion review and planning, animation vocabulary, Apple design synthesis, and UI prototyping patterns ([MIT notice](catalog/licenses/emilkowalski-skills-MIT.txt))
- [Josh Puckett](https://github.com/joshpuckett) — Interface Craft, DialKit, Interface Kit
- [shadcn](https://github.com/shadcn) — improve
- [Jakub Krehel](https://github.com/jakubkrehel/skills) — whole-interface review, accessibility, layout, typography, UX writing, UI polish, OKLCH, and gradients ([MIT notice](catalog/licenses/jakubkrehel-skills-MIT.txt))
- [Dominik Martin](https://github.com/dominikmartn/nothing-design-skill) — nothing-design
- [Zeke](https://github.com/zeke/swiss-design-skill) — swiss-design
- [Micka](https://github.com/mickadesign/fluid-functionalism) — fluid-functionalism
- [Vercel Labs](https://github.com/vercel-labs) — view transitions, deploy patterns
- [Basement Studio](https://github.com/basementstudio/shader-lab) — shader-lab
- [Cheng Lou](https://github.com/chenglou) — pretext
- Dennis Jin & Benji Taylor — agentation
- [raphaelsalaja](https://audio.raphaelsalaja.com/) — interface-sound
- [zzzzshawn](https://github.com/zzzzshawn) — loading-states
- [iamnoman](https://www.npmjs.com/package/funky-shadow) — funky-shadow
- OpenAI — codex plugin setup
- [Google for Developers](https://developers.google.com/style) — agent-message adaptation of the Google developer documentation style guide ([CC BY 4.0 notice](catalog/licenses/google-developer-documentation-style-guide-CC-BY-4.0.txt))

If something here is yours and miscredited or unwelcome, open an issue.

## license

Cortex's original material is MIT licensed unless a file or directory says otherwise. Third-party and adapted skills keep their own licenses and source credit. The Google-derived skill and writing profile remain [CC BY 4.0](catalog/licenses/google-developer-documentation-style-guide-CC-BY-4.0.txt), and the marketing submodule keeps its upstream license in `marketing/`.

## where this is going

- keep the library shallow and obvious: new shelves only when a real cluster forms, merge skills that start saying the same thing
- grow the original skill set; vendor less, write more
- keep everything readable by any agent, with adapters as the only agent-specific layer
