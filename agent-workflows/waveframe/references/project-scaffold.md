# Project Scaffold

Use this mode to create or update a client repo so it is ready for design-led implementation.

## Goal

Set up the repo with the right architecture, Cortex access, project docs, and design-system status without requiring the design system to be finished.

## Intake

Start by understanding the project:

- one-liner description
- target audience
- site/app type
- required surfaces: marketing pages, product UI, docs, blog, dashboard, ecommerce, community, etc.
- required capabilities: forms, CRM, CMS, auth, payments, analytics, AI, search, email, file uploads, localization
- content ownership: static, CMS-managed, database-backed, generated
- preferred stack or constraints
- deployment target
- design-system status: `none`, `draft`, `partial`, `ready`
- visual architecture status: `none`, `draft`, `ready`

## Architecture recommendation

Recommend the stack from the project context. Do not force a fixed default.

Use clear reasoning:

- Static marketing/content-heavy site: consider Astro, Next.js static output, or another simple static-first stack.
- Marketing plus interactive/product surfaces: consider Next.js or another full-stack capable framework.
- Dashboard/app/auth/API-heavy product: consider a full-stack app architecture.
- Heavy CMS/editorial needs: include CMS integration options.
- AI or agent features: include provider, API routes/server functions, env vars, and observability considerations.

When there is a real tradeoff, give two options with consequences and ask the user to choose.

## Front-end architecture guardrail

For visually complex marketing, editorial, dashboard, or brand-forward sites, do not jump from references to a one-off page recreation.

Before implementing pages, create or request a front-end architecture brief. Use `references/design-architecture.md` when visual references are available.

The scaffold should prefer:

- reusable primitives over page-local hacks
- tokenized borders, lines, typography, spacing, shadows, and button treatments
- CSS grid for page structure
- contained SVG/CSS geometry for instruments, diagrams, frames, and fine lines
- responsive behavior defined before page implementation

Do not build screenshot-matched CSS with magic offsets across the full page.

## Scaffold contract

Create or update:

```text
README.md
AGENTS.md
cortex -> ~/Developer/code/cortex
design-system/          # only if status is none/draft/partial/ready and useful for this project
.waveframe/        # private/local process notes
```

Add `.waveframe/` and `cortex` to `.gitignore` unless the project intentionally tracks them.

## README contract

`README.md` is the human map. Keep it accurate to what exists.

Include:

- project one-liner
- stack and major dependencies
- folder structure
- development commands
- integration notes
- deployment notes
- Cortex note if symlinked
- design-system section only when `design-system/` exists

If the design system is draft, say so plainly.

## AGENTS contract

`AGENTS.md` is the agent operating guide.

Include:

- read order
- current project phase
- design-system status and path
- fallback Cortex skills for UI work, only as private agent guidance while project rules are incomplete
- rules for updating README and design-system docs
- rule to avoid pushing unless explicitly asked

Recommended UI fallback chain:

```text
1. project design-system/SKILL.md, when present
2. cortex/design-skills/ui-principles
3. cortex/design-skills/responsive-craft
4. cortex/design-skills/css-interaction-tips
5. cortex/design-skills/framer-motion or emil-design-eng when motion/interaction matters
6. cortex/design-skills/preflight before calling UI work done
```

Once `design-system/` exists and is usable, tell agents to start there. Cortex craft skills remain fallback and source material for decisions, not client-facing citations.

## Draft design system

When design-system status is `none` or `draft`, create placeholders only if useful:

```text
design-system/
├── README.md
├── SKILL.md
└── references/
    ├── tokens.md
    ├── composition.md
    ├── page-structure.md
    ├── architecture.md
    ├── components.md
    ├── motion.md
    ├── imagery.md
    ├── voice.md
    └── platform-mapping.md
```

Use `Status: draft`. Tell agents to use Cortex craft skills as fallback and record stable decisions back into the relevant reference file.

Do not write borrowed skill names into client-facing design-system rules unless a named tool or package is actually shipped. Fold the relevant principle into project-specific language and log source influence in `.waveframe/decisions.md` when provenance matters.

## Private files

Create:

```text
.waveframe/project-context.md
.waveframe/decisions.md
```

Keep these local process files concise. They are for continuity, not client handoff.
