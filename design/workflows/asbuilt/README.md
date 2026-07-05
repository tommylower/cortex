# asbuilt

I use `asbuilt` when an interface already exists and I want an agent to recover the design system from the code instead of inventing one from taste.

The point is simple: inspect the shipped UI, extract the tokens/components/states/floors that are actually there, and produce a design-system package that another agent can use later without needing the original conversation.

It is not a greenfield design-system generator or a public-facing pitch. It is a working tool for making an existing codebase easier to understand, extend, and conform.

## When I Use It

- I finished a UI and want to know the system hiding inside it.
- I inherited a messy codebase and need the real component grammar.
- I want an agent to stop making one-off components and extend the existing patterns.
- I need a package another agent can load before doing design or UI work.
- I want a local conform pass that improves structure without changing the rendered look.

## How I Run It

Point an agent at [`SKILL.md`](SKILL.md) and ask it to run `asbuilt` against a target repo:

```text
Use asbuilt to derive the design-system package from this existing codebase.
Do not modify the target repo. Clone it to a scratch directory and produce the package.
```

For larger repos, have the agent use the specialist prompts in [`agents/`](agents/) and the evidence scripts in [`scripts/`](scripts/). The output should start from [`assets/templates/package/`](assets/templates/package/) rather than a blank file.

## What Good Output Includes

- provenance: repo URL, branch, short SHA, and whether it is production truth
- semantic tokens, split into existing and proposed
- architecture strata mapped to real paths
- component anatomy cards with slots, axes, state graph, motion, tokens, floor, and status
- platform mapping for framework, styling, dependencies, and known divergences
- `AGENTS.md` so future agents know how to use the package
- unresolved decisions listed honestly

## What Not To Do

- Do not use it for greenfield design systems.
- Do not copy a reference site's skin.
- Do not let the agent skip evidence and write vibes.
- Do not call the package ready unless `scripts/validate-package.mjs` passes.
- Do not conform the target repo during derive; conform is a second phase.

## Read Order

The agent should read:

1. [`SKILL.md`](SKILL.md)
2. [`references/design-system-package.md`](references/design-system-package.md)
3. [`references/component-intake.md`](references/component-intake.md)
4. [`references/rule-grades.md`](references/rule-grades.md)
5. [`references/headless-floors.md`](references/headless-floors.md) when interactive components are involved
6. [`references/tooling-bridges.md`](references/tooling-bridges.md) when the target already uses tokens JSON, Tailwind `@theme`, Storybook, shadcn registry files, or structured output

## Included Helpers

- `assets/templates/package/` — copyable package skeleton
- `agents/` — short prompts for specialist subagents
- `scripts/scan-raw-values.mjs` — raw values, arbitrary Tailwind values, motion values
- `scripts/scan-components.mjs` — component exports, floors, variant hints, state hints
- `scripts/validate-package.mjs` — package shape validation
- `examples/minimal-package/` — small finished example

## Author

Created and maintained by [Tommy Lower](https://github.com/tommylower). MIT licensed.
