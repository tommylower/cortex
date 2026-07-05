# Tooling Bridges

Use this only when the target repo already has the relevant tooling or when the user explicitly asks for a machine-readable sidecar. The markdown package remains the primary artifact.

## AGENTS.md

Every derived package gets an `AGENTS.md` because future agents need local operating rules: read order, source of truth, validation, allowed edits, and what not to do.

## DTCG Tokens

If token data needs to move into tooling, mirror stable tokens into `references/tokens.dtcg.json` using the DTCG-style `$value` / `$type` shape.

Rules:

- Keep `references/tokens.md` as the human-readable source.
- Put proposed tokens in markdown first.
- JSON sidecars should contain stable tokens only unless the file clearly separates proposals.

## Tailwind Theme Variables

If the target uses Tailwind v4, inspect `@theme` variables before treating utility classes as one-off values. `@theme` variables influence generated utilities, so they may be the real token bridge.

Rules:

- Record the actual theme source path.
- Do not force Tailwind if the target does not use it.
- Do not move tokens into `@theme` unless conform has been requested.

## Storybook Coverage

If the target has Storybook, use stories as evidence for component axes and states.

Rules:

- Args map well to closed axes.
- ArgTypes and controls reveal intended value sets.
- Stories are evidence, not truth; implementation still wins.
- Missing stories are a coverage gap, not proof that a state does not exist.

## shadcn Registry Metadata

If the target has `components.json` or registry files, record the registry shape in `platform-mapping.md`.

Rules:

- Do not create registry files unless conform or publishing is explicitly requested.
- Registry metadata is useful for installable components, not required for a design-system package.
- Keep runtime dependencies in `platform-mapping.md`.

## Structured Output

Use `schemas/` when an agent or app can emit structured output.

Rules:

- Schemas support automation; they do not replace the markdown package.
- If structured output and markdown disagree, code wins, then the markdown package, then generated JSON.
