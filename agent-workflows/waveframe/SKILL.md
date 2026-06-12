---
name: waveframe
description: Studio workflow for scaffolding client projects, synthesizing or extracting reusable design systems, and auditing drift between project docs, design systems, and code. Use when the user says waveframe, scaffold a client project, synthesize a design system, extract a design system from finished code, create a client design skill, update project design docs, audit design-system drift, or prepare design-system handoff structure.
---

# waveframe

Use this as the studio router for design-system and project setup work. waveframe is private Cortex machinery. Client repos receive clean project docs and design-system files, not this workflow.

## Core model

- **Design systems** live in `cortex/local/<name>-design/` as opt-in skills, beside `nothing-design`.
- **Client repos** may receive a project-local `design-system/` folder for handoff and implementation.
- **Cortex design skills** supply reusable craft rules: responsive behavior, UI principles, motion, interaction details, and preflight checks.
- **README.md** is the human map.
- **AGENTS.md** is the agent operating guide.
- **Private process notes** stay in `.waveframe/` and should be gitignored by default.

Use `cortex/design/systems/nothing-design/` as the quality reference for how design-system skills should feel: concise operating brief, deeper references, opinionated visual rules, and enough specificity for agents to produce consistent UI.

Do not treat `nothing-design` or any older WIP waveframe format as the required file tree for new client scaffolds. It is a quality exemplar, not a migration contract.

## Mode boundary

Always identify the mode before acting. Do not require the user to type internal mode names.

In Claude Code, prefer dedicated slash-command adapters for each mode so the user can choose from the native `/` command picker:

- `/design-scaffold`
- `/design-system-synthesize`
- `/design-system-extract`
- `/design-handoff-hardening`
- `/design-architecture`
- `/design-content-map`
- `/design-structure`
- `/design-product-ui-system`
- `/design-system-update`
- `/design-drift-audit`

If the user invokes the generic `/waveframe` command, infer the route from any provided context. If the route is still unclear, ask with the numbered menu in Startup questions and wait for the user to answer by number, name, or free-form text.

Modes:

- `project-scaffold` — scaffold or update a repo so it can use Cortex and a project design system.
- `design-system-synthesis` — turn messy brand exploration into a clean design-system skill.
- `design-system-extract` — post-delivery extraction from a finished or manually built codebase into the same design-system package.
- `handoff-hardening` — audit a finished implementation for repeated visual patterns, propose safe code normalization, then use the stabilized code for handoff extraction.
- `design-architecture` — synthesize visual, structural, or component references into the correct design-system reference file after approval.
- `content-map` — turn approved sitemaps, docs, or wireframes into private content maps, ASCII wireframes, and section briefs.
- `design-structure` — apply one of your private reusable output templates, such as a design-system deck, brand overview deck, product UI system board, landing-page variant, or other prebuilt structure, to a selected design system and target surface.
- `product-ui-system` — audit product color exploration and scaffold software UI design-system guidance for tokens, semantic roles, app shell, components, states, and code mapping before implementation.
- `design-system-update` — fold stable decisions from manual/code work back into an existing design system.
- `drift-audit` — compare README, AGENTS, design-system docs, and code for mismatches.
- `landing-page` — deferred. Apply a selected design system to a landing-page structure.
- `dashboard` — deferred. Apply a selected design system to dashboard structures.

Do not mix modes unless the user explicitly approves a mode switch.

## Startup questions

Ask only for missing context that cannot be inferred.

Treat any text after a waveframe slash command as task context. Use it to infer missing details when possible, but do not make the user provide exact mode syntax.

For a loose `/waveframe` request, ask exactly this first:

```text
What do you want to do?

1. Scaffold or update a project
2. Synthesize messy brand exploration into a design system
3. Extract design system from a finished codebase
4. Harden a finished implementation before handoff
5. Turn visual references into a front-end architecture brief
6. Map approved sitemap or wireframes into content structure
7. Apply a reusable output template
8. Scaffold a product UI design system from exploration
9. Update an existing design system from recent work
10. Audit drift between docs, design system, and code
11. Something else - type what you want me to do
```

Accept `1`, `2`, `3`, etc., the option text, or a free-form description. If the user chooses `11`, route from their description or ask one focused follow-up.

After the route is chosen, ask only for missing fields:

- target repo or folder
- design-system status: `none`, `draft`, `partial`, or `ready`
- design-system source, only when needed
- source material path, only for synthesis/update work
- finished codebase path and package target, only for extraction work
- finished codebase path and whether code normalization is allowed, only for handoff-hardening work
- visual reference path, only for architecture work
- sitemap, doc, or wireframe path, only for content-map work
- reusable output template and target surface, only for structure work
- product UI exploration source, target product/repo, and code mapping intent, only for product-ui-system work

For project scaffold, also ask what kind of project this is before recommending architecture:

- What is the project?
- Who is it for?
- Is it marketing, product UI, content/docs, dashboard, ecommerce, community, or mixed?
- Does it need forms, CRM, CMS, auth, payments, analytics, AI, search, blog, docs, dashboards, or integrations?
- Is there a preferred stack or deployment target?

Recommend a stack from the project context. Give one clear recommendation, or two options when there is a real tradeoff. Explain the tradeoff briefly and ask the user to confirm.

## Status fields

Use these statuses for design systems:

- `none` — no design system exists yet.
- `draft` — placeholder or incomplete; use Cortex craft skills as fallback.
- `partial` — usable for some UI decisions; missing areas must be called out.
- `ready` — approved enough to use as source of truth.
- `archived` — preserved for reference, not current.

## Proposal before write

For major changes, propose before editing:

- new project scaffold
- architecture recommendation
- design-system synthesis
- design-system extraction from finished code
- handoff hardening or implementation normalization
- front-end architecture brief
- design-architecture phase and destination
- structure-template application
- design-system status change
- README or AGENTS rewrite

After approval, write files, validate, summarize changes, and ask before committing locally. Never push unless explicitly asked.

## Private and client-facing split

Client-facing:

```text
README.md
AGENTS.md
design-system/
```

Private/local:

```text
.waveframe/
```

Keep `.waveframe/` gitignored unless the user explicitly wants to promote something.

## Craft-source handling

Cortex skills can inform the work privately. This includes project-owned skills and borrowed craft references such as responsive layout, CSS interaction patterns, UI principles, motion guidance, and Emil-style design engineering notes.

Client-facing `design-system/` docs should describe the resulting project rules, not cite private source skills as the authority. Write "cards use a lifted dithered shadow only on primary editorial surfaces" instead of "use funky-shadow" unless the package is an actual runtime dependency the client must install or maintain.

Use `.waveframe/decisions.md`, `.waveframe/extraction.md`, or `.waveframe/hardening.md` to log provenance when useful:

```text
- Source influence: cortex/design/foundations/responsive-craft
  Decision: section grids collapse from asymmetric 12-column layouts to single-column content blocks below 760px.
  Client-facing rule: documented in design-system/references/composition.md.
```

When a tool or package is shipped in code, document it as implementation mapping in `design-system/references/platform-mapping.md` and the relevant component or motion reference. Examples: `funky-shadow`, `@web-kits/audio`, Motion, shader tooling, or a deployment integration.

## References

- `references/project-scaffold.md` — use for project intake, architecture recommendation, repo scaffold, README, AGENTS, and draft design-system setup.
- `references/design-system-synthesis.md` — use for turning messy brand exploration into a Cortex design-system skill or project-local design system.
- `references/handoff-hardening.md` — use for finished sites that need repeated-pattern audit and safe code normalization before handoff extraction.
- `references/design-system-extract.md` — use for post-delivery extraction from finished code into client-facing docs and local reusable design-system skills.
- `references/design-architecture.md` — use for synthesizing visual, structural, or component references into the correct design-system reference file.
- `references/content-map.md` — use for turning approved sitemaps, docs, or existing wireframes into private content maps, ASCII wireframes, and promotable section briefs.
- `references/structure.md` — use for applying private reusable output templates to a selected design system and target surface.
- `references/product-ui-system.md` — use for auditing color exploration and scaffolding software product UI design-system guidance before implementation.
- `references/design-system-update.md` — use for folding stable decisions from recent code or manual work back into the project record or design system.
- `references/output-package.md` — use when the work is stable enough to become a reusable markdown design package for handoff, archive, or rebuild.
- `references/drift-audit.md` — use for checking mismatch between docs, design-system files, code, and actual project structure.
