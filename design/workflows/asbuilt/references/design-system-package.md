# Design-System Package

This is the portable output format for an as-built design system.

## Acceptance Test

An agent loading only the package, with no original codebase, Cortex context, or chat history, must be able to:

1. Produce a new conforming component with the right slots, closed axes, state graph, token bindings, and motion numbers.
2. Correctly bucket a new idea as `composition`, `headless-floor`, or `novel` using the component intake loop.

If a package cannot pass this, mark its status honestly instead of calling it ready.

## Smallest Useful Artifact

Do not emit a package when notes are enough. The package is for handoff, archive, rebuild, or a second agent inheriting the system.

## Shape

```text
design-system/
├── AGENTS.md
├── README.md
├── SKILL.md
└── references/
    ├── tokens.md
    ├── tokens.dtcg.json        optional
    ├── architecture.md
    ├── components.md
    └── platform-mapping.md
```

Start from `assets/templates/package/` when deriving a real package. Templates
are not examples; they are the required skeleton.

## AGENTS.md

For future agents. Must include:

- Read order.
- Source of truth.
- Allowed edit surface.
- Validation command.
- Component intake rule.
- Explicit warning against copying skin from references.

## README.md

For humans. Must include:

- `status`: `none`, `draft`, `partial`, `ready`, or `archived`.
- `source of truth`: which artifact wins when docs and code disagree. Once code exists, code wins.
- `unresolved`: open decisions listed explicitly. If none, write `unresolved: none`.
- How to read the package.

## SKILL.md

For agents. Must include:

- When to use the package.
- The design thesis.
- Hard rules and anti-patterns.
- The extend-don't-copy pointer: new components enter through the component intake loop.
- Reference index.

## references/tokens.md

The name contract.

- List every semantic token name, even if a value is placeholder.
- Names are role-based, for example `--color-surface`, not `--color-gray-100`.
- Raw values appear here and only here.
- Motion numbers live here as tokens and come from the target artifact, not from Cortex defaults.
- Theme and mode behavior is documented when present.

If useful, also emit `references/tokens.dtcg.json` as a machine-readable
sidecar using the DTCG-style `$value` / `$type` shape. The markdown file stays
the human source; the JSON is for tooling.

## references/architecture.md

The strata and dependency rule.

- Tokens, primitives, product, and screens mapped to real project paths.
- References point downward only.
- Name the mechanical checks, such as raw-value search outside the token file and import-direction linting.
- Document the shell and responsive strategy.

## references/components.md

One anatomy card per component:

```text
## <ComponentName>
bucket:  composition | headless-floor | novel
floor:   <engine primitive + doc link> | none — state machine described below
slots:   <named parts, in order>
axes:    <closed variant axes and values>
states:  <full state graph>
motion:  <transition numbers>
tokens:  <semantic token names; no raw values>
notes:   <usage rules and anti-patterns>
status:  draft | partial | ready
```

A component card with only a happy-path state is not conforming.

## references/platform-mapping.md

What makes the package buildable:

- Framework and runtime.
- Real file paths for token file, global stylesheet, and component directories.
- Translation layer as actually used: CSS variables, `@theme`, config mapping, or another project-specific path.
- Runtime dependencies that ship in code.
- Known divergences between implementation and docs.

## Client Split

The package is the portable handoff artifact. Encode rules, not suppliers, unless the supplier is a real runtime dependency that belongs in `platform-mapping.md`.

Process notes stay out of the package. Design decisions live in artifacts and enter records only when the package is derived.

## Derivation Rule

Packages are derived from artifacts, never hand-maintained. When code and package disagree, code wins and the package is re-derived.

## Validation Rule

Before marking a package `ready`, run:

```bash
node scripts/validate-package.mjs <package-dir>
```

Fix every failure or lower the status. Passing validation means the package has
the required shape; it does not replace human review of the evidence.
