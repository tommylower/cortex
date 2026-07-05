# asbuilt

Derive a design-system package from an existing codebase.

`asbuilt` is an agent skill for teams that already have a shipped UI and need to recover the design system hiding inside it. It treats code as the source of truth, extracts tokens/components/states from what actually exists, and produces a package an agent can use to build future UI consistently.

It is not a greenfield design-system generator. It is for reverse-engineering the grammar of a finished product, then optionally conforming the codebase back to that grammar without changing the rendered look.

## What It Does

- Verifies the target repo is the real production source before deriving anything.
- Inventories tokens, raw values, component anatomy, interaction states, and accessibility floors.
- Emits a design-system package with clear status vocabulary and unresolved gaps.
- Separates facts from proposals, so the codebase stays the source of truth.
- Supports a second conform phase where duplicated structure and raw values are cleaned up locally with visual parity.

## How To Use

Point an agent at [`SKILL.md`](SKILL.md) and ask it to run `asbuilt` against a target repo:

```text
Use asbuilt to derive the design-system package from this existing codebase.
Do not modify the target repo. Clone it to a scratch directory and produce the package.
```

The agent should read:

1. [`SKILL.md`](SKILL.md)
2. [`references/design-system-package.md`](references/design-system-package.md)
3. [`references/component-intake.md`](references/component-intake.md)
4. [`references/rule-grades.md`](references/rule-grades.md)

## Output Shape

The derived package should be usable on its own by a future agent. A good package lets that agent:

- create a new conforming component
- classify a new idea into the right layer
- know which rules are hard invariants and which are defaults
- see unresolved gaps instead of pretending the system is finished

## Source

`asbuilt` is developed in [cortex](https://github.com/tommylower/cortex), a public library of agent skills, workflows, and tools. This repository is a standalone mirror of `design/workflows/asbuilt/`.

MIT, by [Tommy Lower](https://github.com/tommylower).
