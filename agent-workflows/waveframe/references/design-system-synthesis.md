# Design-System Synthesis

Use this mode to turn messy brand exploration into a clean, reusable design-system skill.

## Goal

Produce an agent-usable design system that can guide UI generation the way `cortex/design-systems/nothing-design/` does, without copying its visual style.

Target locations:

- Cortex reusable system: `cortex/design-systems/<client-name>-design/`
- Client-facing copy: `<client-repo>/design-system/`

The Cortex version is the studio repository. The client-facing version is the clean handoff and implementation guide.

For client-specific systems that should stay recognizable in your local repository, prefer the naming convention:

```text
<client-slug>-wip-design-system
```

Use this name for the local Cortex design-system skill unless the user specifies another name. Ask before using a final/non-WIP name.

## Inputs

Read only what is relevant:

- brand kit notes
- palette files
- font decisions
- screenshots
- code explorations
- Paper/Figma frames
- reference sites
- pasted direction from the user
- existing project `design-system/`, if present

Ask where source material lives if unclear.

## Default synthesis scope

Default to foundation plus composition:

- colors
- typography
- spacing
- radius
- borders
- shadows
- buttons
- composition

Buttons are foundational. Capture button variants, shape, typography, surface, accent treatment, states, and usage rules.

Do not infer a full component library unless the user explicitly includes components in scope.

For product UI systems, treat reusable components, app shell, and workflow states as a separate scope decision. Use `structures/product-ui-system-board/STRUCTURE.md` when the user is still exploring product interface direction and wants agents to keep building the system over time.

If needed, ask:

```text
What should synthesis focus on?
1. Foundation only
2. Foundation + composition
3. Foundation + buttons
4. Foundation + reusable components
5. Full design system
6. Product UI system: foundation + shell + components + states
```

## Output shape

Create or update:

```text
SKILL.md
references/
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

Keep `SKILL.md` short and opinionated. Put detailed rules in references.

## SKILL.md contract

Include:

- frontmatter with `name` and `description`
- status: `draft`, `partial`, or `ready`
- when to use this design system
- role in Cortex or project
- visual handoff links, when available
- core design philosophy
- rules for applying the brand to UI
- reference file index

If a visual design-system representation exists, include:

```text
## Visual handoff

A visual representation of this design system lives in:

- Figma: <url>
- Paper: <url>
- Pencil: <url>

Use the visual file for inspecting layout, token presentation, component examples, and handoff decks. Use this markdown design system as the agent-readable source of truth.
```

Only include tools/links that actually exist.

## Reference contracts

`tokens.md`:

- color roles, not just swatches
- typography stack and usage
- spacing, radius, borders, shadows
- light/dark mode if applicable

`composition.md`:

- layout rhythm
- density
- hierarchy
- section structure
- how the brand shows up in UI surfaces

`page-structure.md`:

- approved sitemap-derived page order
- section sequence
- content hierarchy
- CTA hierarchy
- reusable section candidates
- low-fidelity build notes promoted from `.waveframe/`

`architecture.md`:

- visual structure references translated into layout primitives
- reusable front-end primitive names
- responsive strategy
- SVG/CSS geometry rules
- anti-patterns for implementation
- proposed component/file structure

`components.md`:

- buttons by default
- only other components explicitly in scope
- states and usage rules

`motion.md`:

- durations, easing, hover, focus, entrance behavior
- what not to animate

`imagery.md`:

- image style rules: photography, illustration, vector, icon, texture, shader, diagrams, overlays, crop/framing, treatment, and misuse rules

`voice.md`:

- tone, labels, interface copy, casing

`platform-mapping.md`:

- framework
- CSS system
- font loading
- token target files
- dark-mode strategy
- stack-specific notes
- shipped runtime dependencies or tools used by the design system

## Source handling

Use Cortex craft skills and outside references as private inputs. The client-facing design system should encode the useful output as project rules, not as a reading list.

Log provenance in `.waveframe/decisions.md` when it helps future work:

- source skill or reference
- adopted decision
- destination file where the project rule was documented

Only name an external skill, author, package, or tool in client-facing docs when it is directly relevant to implementation, licensing, or maintenance.

## Proposal before write

Before editing, summarize:

- source material read
- proposed synthesis scope
- design-system status
- files to create or update
- unresolved decisions

Ask approval. After approval, write files.

## Done criteria

- `SKILL.md` is valid and agent-usable
- references exist and are not empty placeholders
- status reflects reality
- README/AGENTS are updated if writing to a client repo
- unresolved decisions are listed in `.waveframe/decisions.md` or the relevant local process file
- borrowed craft guidance is translated into project-specific rules before handoff
- validation passes when working in Cortex
