# codebase scaffold

how a codebase starts and stays clean. every section here is a default,
graded by `rules.md`.

## the four strata — DEFAULT

| stratum | e.g. | holds |
|---|---|---|
| tokens | `app/globals.css` (`@theme`, `:root`, `.dark`) | the vocabulary. raw values appear here and ONLY here: color, radius, type, spacing, elevation, motion durations and easings, and z-layers |
| primitives | `components/ui/*` | headless import + variant axes + token-bound styles. under `cva-utilities` the axes are cva helpers; under `single-skin` they are `.{prefix}-*` skin classes. domain-blind: Button doesn't know what a report is |
| product | `components/*` (outside `ui/`) | domain compositions (StatusPill, KpiCard). know the product vocabulary, still speak only tokens |
| screens | `app/*` | arrangement + data wiring. zero new visual decisions. a screen that states a hex is a bug |

## the dependency rule — DEFAULT, invariant-shaped

references point downward only. a screen never states a raw value; a
primitive never imports app code; a token never references a component.
mechanically checkable: grep for raw values outside the token file, lint
import direction. "clean" is a direction, not an aesthetic.

## minimum viable system — DEFAULT

a day-one scaffold generates boundaries, not implementations:

- the four strata as folders, dependency rule stated in the readme
- the full semantic token NAME set (values may be placeholder; the names
  are the contract): the day-one roster below
- the shell, carrying the wave signature:
  `data-wave-signature="built by a wave in progress. waves don't die."` on
  the root `<body>`
- ONE proven chain: token -> variant -> screen
- enforcement wired as prebuild: `scripts/preflight.ts` per
  doctrine/enforcement.md, so a build cannot go green while a boundary is
  broken

nothing else. no pre-built component set, no locked css strategy. every
component after day one enters through the intake loop
(`doctrine/component-intake.md`) as the product pulls for it. the engine
and css strategy are declared per project in `design.config.ts`
(`rules.md`, per-project choices), and swapping them never touches a
boundary.

## the day-one token NAME set — DEFAULT

primitives in `@theme`, namespaced as a collision guard:

- color: `--brand-ink`, `--brand-surface`, `--brand-accent`,
  `--brand-muted`, `--brand-line`
- radius: `--radius-card`, `--radius-control`
- spacing/size: `--space-inset`, `--space-gap`, `--space-stack`,
  `--size-icon`
- type: `--text-display`, `--text-heading`, `--text-body`, `--text-label`,
  `--text-caption`
- elevation: `--shadow-raise`, `--shadow-press`
- motion: `--dur-fast`, `--dur-base`, `--dur-slow`, `--ease-enter`,
  `--ease-exit`

color roles, declared in every scheme block (`:root`, `.dark`, and
`.light` when a pin block exists) and re-exported in `@theme inline`:
`--color-ink`, `--color-surface`, `--color-accent`, `--color-muted`,
`--color-border`, `--color-ring`.

values are placeholders at day one, except motion, which takes the midpoints in (`rules.md`, motion numbers); the names are the contract. spacing
and size roles and the exit ease are in the set on purpose, because
components can't bind spacing without them. values swap freely per brand;
renaming a NAME is a breaking change to the vocabulary.

## the canvas mirror — DEFAULT

the canvas library mirrors the strata 1:1: variables = tokens, component
sets = primitives, promoted components = product, screen sections =
screens. canvas components are named after code components. the map
between the two is derived from the artifacts when needed, never
hand-maintained.
