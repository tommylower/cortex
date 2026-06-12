# Output Package

use this reference when the work is stable enough to become a reusable markdown package.

## goal

produce a design package that helps someone recreate, extend, and implement the work without guessing.

the package can support a client handoff, future build work, a case study, a design archive, or another collaborator or agent continuing the project.

## default shape

```text
design-system/
├── README.md
├── SKILL.md
└── references/
    ├── tokens.md
    ├── architecture.md
    ├── composition.md
    ├── components.md
    ├── page-structure.md
    ├── motion.md
    ├── imagery.md
    ├── voice.md
    └── platform-mapping.md
```

use `design-direction/` instead when the work needs lighter guidance and is not ready to become a formal reusable package.

## file roles

`README.md`:

- human map of the package
- status of the system
- source of truth notes
- visual handoff links, if any
- how to read the folder

`SKILL.md`:

- agent-readable operating guide
- when to use the package
- core design thesis
- hard rules and anti-patterns
- reference index

`references/tokens.md`:

- color roles and raw values
- type stack and scale
- spacing, radius, borders, shadows
- motion durations and easing
- light/dark mode or theme behavior when present

`references/architecture.md`:

- app/page shell
- layout primitives
- navigation and persistent chrome
- grid behavior
- responsive strategy
- implementation primitives and file structure

`references/composition.md`:

- repeated section patterns
- density and rhythm
- card/panel relationships
- surface hierarchy
- spacing rules across real pages

`references/components.md`:

- buttons, cards, inputs, nav, chips, tables, lists, and other repeated parts
- variants
- states
- accessibility notes
- usage rules and anti-patterns

`references/page-structure.md`:

- page types or screen types
- section order
- workflow states
- content slots
- cta hierarchy
- reusable section candidates

`references/motion.md`:

- durations
- easing
- hover/focus behavior
- entrance and reveal behavior
- reduced-motion rules

`references/imagery.md`:

- photo, illustration, icon, diagram, texture, and placeholder rules
- crop/framing
- overlays and masks
- asset handling

`references/voice.md`:

- tone
- labels
- casing
- metadata patterns
- empty/error/loading copy

`references/platform-mapping.md`:

- framework and runtime
- tailwind config or `@theme` mapping
- css variables and token files
- `globals.css` or global stylesheet locations
- font loading
- component paths
- theme switching
- runtime dependencies
- where implementation may diverge from docs

## platform mapping detail

platform mapping is what turns the design package from descriptive into buildable.

include real paths when they exist:

```text
src/app/globals.css
tailwind.config.ts
src/styles/tokens.css
src/components/Button.tsx
src/components/SiteHeader.tsx
```

include the translation layer:

```css
:root {
  --color-background: #f7f4ed;
  --color-foreground: #15110c;
  --color-accent: #e33b2f;
}
```

for tailwind v4, document `@theme` or `@theme inline` mappings when used:

```css
@theme inline {
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-accent: var(--color-accent);
}
```

for older tailwind config, document the config extension shape instead of pretending the project uses v4.

## done criteria

- the package tells a human what the system is and when to use it.
- the package tells an agent where to start before editing code.
- tokens map to real values or clearly marked open decisions.
- component rules describe actual reusable behavior, not vague taste.
- platform mapping points to actual files, config, variables, and component paths.
- unresolved decisions are listed instead of hidden.
- code is named as source of truth when code and docs can diverge.
