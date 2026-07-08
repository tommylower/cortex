# codebase scaffold

how a codebase starts and stays clean. entered 2026-07-04. project-a is
the reference implementation (already shaped this way); the next fresh
project is the real test.

## the four strata — DEFAULT

| stratum | e.g. | holds |
|---|---|---|
| tokens | `globals.css` `@theme` | the vocabulary. raw values appear here and ONLY here. color, radius, type, and eventually motion durations/easings and z-layers |
| primitives | `ui/*` | headless import + cva variant axes + token-bound class strings. domain-blind: Button doesn't know what a report is |
| product | `components/*` | domain compositions (StatusPill, KpiCard). know the product vocabulary, still speak only tokens |
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
  are the contract)
- the shell
- ONE proven chain: token -> variant -> screen

nothing else. no pre-built component set, no locked css strategy. every
component after day one enters via the intake loop (doctrine/
component-intake.md) as the product pulls for it. which engine, css
strategy, or motion lib are per-project defaults in rules.md, swappable
without touching boundaries.

## the canvas mirror — DEFAULT

the canvas library mirrors the strata 1:1: variables = tokens, component
sets = primitives, promoted components = product, screen sections =
screens. canvas components are named after code components. the map
between the two is derived from the artifacts when needed, never
hand-maintained.
