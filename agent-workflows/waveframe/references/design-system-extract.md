# Design-System Extract

Use this mode after a project has been designed or built manually and the design system needs to be recovered from the finished codebase.

## Goal

Turn a real shipped or near-shipped codebase into the same end-state package that `design-system-synthesis` produces:

```text
finished codebase -> audited design decisions -> client-facing design-system/ -> optional local Cortex design skill -> visual handoff references
```

This mode is for post-delivery or late-phase cleanup. Code wins over stale docs.

If the finished implementation has repeated visual patterns that are still one-off in code, run `handoff-hardening.md` first. Extraction should describe stabilized implementation patterns whenever there is time to normalize them safely.

## Outputs

Default client-facing output:

```text
<client-repo>/design-system/
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

Optional local/studio output:

```text
cortex/design-systems/<client-or-project>-wip-design-system/
├── SKILL.md
└── references/
    └── ...
```

Use the user's naming convention when provided. If not provided, recommend:

```text
<client-slug>-wip-design-system
```

For finalized non-WIP systems, ask before dropping `wip` from the name.

## Intake

Ask only for missing context:

- client/project name
- finished codebase path
- whether the output is client-facing, local Cortex reference, or both
- desired skill name, if different from `<client-slug>-wip-design-system`
- live URL or local dev URL, if available
- Figma/Paper/Pencil visual handoff link, if available
- whether the codebase is final, near-final, or still exploratory

## Read order

Prefer source of truth in this order:

1. running site screenshots or browser inspection, when available
2. code: `app/`, `src/`, `components/`, stylesheets, tokens, config, layouts
3. existing `design-system/`, `README.md`, `AGENTS.md`
4. private `.waveframe/` notes
5. Figma/Paper/Pencil files and decks
6. user notes

If docs conflict with code, code wins. Record conflicts before overwriting docs.

## Extraction areas

Audit and extract:

- tokens: colors, type, spacing, radius, lines, shadows, surfaces
- platform mapping: framework, CSS system, font loading, token files, dark mode
- shell and architecture: layout wrappers, persistent chrome, navigation, page containers
- composition: repeated section structure, layout rhythm, density, responsive behavior
- components: buttons, labels, cards, nav, footer, forms, tables, chips, repeated UI parts
- motion: durations, easing, transitions, hover/focus behavior
- imagery: photography, illustration, icon, texture, diagram, overlay, crop/framing rules
- voice: tone, UI labels, casing, CTA language, naming rules
- page structure: only when the page structure is approved or represented by shipped code

Do not invent missing system rules. Mark missing areas as `Status: draft` or `Unresolved`.

## Visual handoff metadata

When a visual representation exists, add it to `SKILL.md` and `README.md`.

Use this copy shape:

```text
## Visual handoff

A visual representation of this design system lives in:

- Figma: <url>
- Paper: <url>
- Pencil: <url>

Use the visual file for inspecting layout, token presentation, component examples, and handoff decks. Use this markdown design system as the agent-readable source of truth.

Suggested ways to use this system:

- Open the visual handoff in Figma, Paper, or Pencil for inspection.
- Use the markdown files directly with Claude Code, Codex, Cursor, or another agent.
- In browser-based agent work, load the site and this design-system folder together so code and docs can be compared.
```

Only include tools/links that actually exist. Do not imply a Figma file exists if the user has not provided one.

## Figma library extraction

When a Figma handoff file exists or will be created, extraction should include a Figma library pass.

Source tokens from code and docs first:

- global CSS variables
- Tailwind or CSS-system tokens
- font loading and semantic theme files
- `design-system/references/tokens.md`
- `design-system/references/platform-mapping.md`

Then create or refresh local Figma paint styles and color variables that mirror those tokens. Use one variable collection named after the client or project, such as `<client>-colors`.

If the codebase includes only one live mode but the design-system docs define both light and dark, create both modes in Figma. The visual deck can still present the production mode first.

Before handoff, bind final deck fills and strokes to the local variables and audit the result:

- unbound solid fills/strokes should be `0`
- image fills are allowed to remain unbound
- any raw color that cannot be mapped should be documented as a missing or unresolved token

Do not use the Figma deck as the source of truth for token values when code disagrees. Code wins; the Figma library mirrors it.

## Client-facing vs local split

Client-facing:

- `README.md`
- `AGENTS.md`
- `design-system/`
- visual handoff links that the client may access

Local/studio:

- `cortex/design-systems/<client-or-project>-wip-design-system/`
- `.waveframe/`
- private process notes
- raw extraction notes and conflict logs

The local Cortex skill may include studio naming and reference-packaging conventions. The client-facing design system should read as clean handoff documentation.

## Source handling

During extraction, Cortex skills can supply best-practice checks for responsiveness, CSS interactions, UI polish, motion, accessibility, and implementation quality. Treat those as private source material.

Client-facing docs should describe the site-specific rule that made it into the implementation:

- Good: "Feature cards use the `--shadow-feature` token on hover and never on static list rows."
- Good: "Below 760px, comparison tables become stacked rows with persistent row labels."
- Avoid: "Use the responsive-craft skill here."
- Avoid: "Follow Emil design engineering."

Log useful provenance in `.waveframe/extraction.md` or `.waveframe/decisions.md`. Name packages or tools in client docs only when they are shipped or required by the codebase, such as `funky-shadow`, Motion, `@web-kits/audio`, shader tooling, or Vercel configuration.

## Proposal before write

Before editing, summarize:

- code areas inspected
- existing docs inspected
- proposed package targets
- proposed design-system skill name
- visual handoff links to include
- files to create or update
- conflicts or stale docs found
- unresolved questions

Ask approval before writing.

## Extraction workflow

1. Inspect code and existing docs.
2. Decide whether handoff hardening is needed. If repeated implementation patterns should be normalized first, switch to `handoff-hardening.md`, propose safe refactors, and continue only after approved changes or an explicit skip.
3. Build an extraction inventory in `.waveframe/extraction.md` when useful.
4. Identify drift: docs that disagree with code, missing docs for real code, or code patterns not represented in docs.
5. Propose target package shape and skill name.
6. Translate borrowed craft guidance into project-local rules and log provenance privately.
7. After approval, write client-facing docs.
8. If requested, create/update the local Cortex design-system skill.
9. Run drift audit.
10. Ask before committing.

## Done criteria

- `design-system/SKILL.md` explains when and how to use the system.
- `design-system/README.md` explains human/agent use and visual handoff links.
- references describe real code, not aspirational guesses.
- platform mapping points to actual runtime files.
- Figma handoff files, when present, include local color variables/paint styles and final deck solid paints are bound to them.
- local Cortex skill exists when requested and uses the approved name.
- client-facing docs contain project rules, not private source-skill citations.
- drift findings are resolved or listed clearly.
