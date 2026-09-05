---
name: workbench
description: Opt-in component review canvas (the "workbench"). NEVER auto-load. Load ONLY when the operator explicitly asks for the workbench or a review canvas by name. Starting a project, scaffolding, or design work are NOT triggers; the default scaffold path is studio doctrine. When called, it ports a project into a /workbench canvas that reviews any registered section at 375/768/1024/1440 and runs the intake -> review -> elevate pipeline. The workbench is the tool; studio is the law.
---

# workbench

## Parked reference

The original application and template are archived locally as of 2026-09-05.
Existing project-owned copies remain usable under their own project rules.
The installation procedure below is historical reference; a new installation or
redesign begins with an explicit project brief rather than resuming old tasks.

## the tool and the law

a repeatable browser/dev canvas for building and organizing code-based
component libraries. bring a project in, get a workspace per section, review
every component across the state matrix, port in whatever libraries or tooling
the work pulls for, elevate approved sections into pages. minimal, shadcn,
token-driven, lightweight.

this skill is the TOOL's installer and operating manual. `studio` is the LAW.
load `studio` first, every session. where the two ever conflict, the law wins.
this skill never duplicates a studio rule, it instantiates one.

the tool itself lives in its own repo, `~/Developer/code/_archive/workbench`: the
stamp template (`template/`), a runnable showroom canvas stamped from it, and
the tool's docs. improvements to the tool are made there and reach projects
through the next stamp; this skill is how a project gets stamped.

## read first, every time

1. `studio` (the skill): the design law that governs everything here.
   its `doctrine/codebase-scaffold.md` defines the four strata this skill
   lays down; its `doctrine/component-intake.md` defines the intake loop the
   review pipeline funnels into.
2. `doctrine/css-invariants.md` (here): the load-bearing CSS rules the canvas
   depends on. read before touching `globals.css`.
3. `doctrine/review-pipeline.md` (here): how a mock from anywhere becomes an
   approved, elevated section. the workbench-specific procedure.

## what it is

the workbench is a canvas with one workspace per section. `/workbench` is the
index of every registered section; `/workbench/[section]` is that section's
isolated workspace, rendering it across the breakpoint state matrix. it is the
review surface between "a component exists" and "a component ships in a page."
it mirrors the studio strata 1:1:

| stratum | path | holds |
|---|---|---|
| tokens | `app/globals.css` `@theme` | the vocabulary. raw values ONLY here |
| primitives | `components/ui/*` | headless engine + cva axes + token classes. domain-blind |
| product | `components/*` | domain compositions. speak only tokens |
| screens | `app/*` | arrangement + data. zero new visual decisions |

the canvas is the screen-stratum mirror of the whole thing: sections register,
the canvas arranges them for review. nothing on the canvas states a raw value.
the workspace renders every state cell twice, light and dark; the dark cells are
where the operator actually sees it. (.dark role completeness is enforced in
css-invariants.)

## profiles: set once per project, in `workbench.config.ts`

everything here is a studio DEFAULT (swappable, no shame), not law. the
template ships one default profile; a project may switch it without touching
any boundary.

| knob | default | alt |
|---|---|---|
| framework | next.js app router | (skill is next-only today) |
| engine | `base-ui` (`@base-ui/react`) | `radix` (standard shadcn) |
| css | single `.brand-*` skin class + tokens | cva + tailwind utilities |
| skin prefix | `.brand-*` | rename per project (`.acme-*`, etc.) |

renaming the skin prefix is a single-commit find/replace across
`globals.css`, the canvas tsx, and `workbench.config.ts` together. preflight
follows the config: an orphaned old-prefix block stops being checked the
moment the config renames, so sweep every old-prefix class in the same
commit. the `--brand-*` PRIMITIVES keep their namespace regardless (they are
internal, collision guard, not the skin prefix).

the css knob governs how PRODUCT components are skinned. the canvas chrome
itself (the `.brand-canvas*` classes the seed ships) is single-skin under
every profile; it is the tool's own skin, not a component under review.
switching to cva-utilities changes which preflight checks run and how new
components enter, it does not rewrite the seed.

the engine profile asserts which behavior floor the primitives use, and every
pull is VERIFIED against it in both directions. do not trust the supplier's
default to match the profile; it drifts either way (css-invariants enforcement
owns the symmetric check and the supplier-drift fact). when a
pull lands on the wrong engine, reject it and rebuild the primitive on the
profile's engine, or switch the profile deliberately.

## the procedure: init a workbench into a project

### 1. classify the target

- **fresh project**: nothing exists. scaffold Next.js first (app router,
  typescript, tailwind, NO src dir, import alias `@/*`; the template files require the
  alias to resolve to the project root, `@/* -> ./*`), then lay the template files. the
  `src/design/` registry lives under `src/` by design; everything else is root.
- **existing project**: an app exists. add the canvas + strata folders without
  disturbing what ships. never overwrite a file that already carries product
  code; register instead.

### 2. lay the boundaries, not the implementations

copy the template (`~/Developer/code/_archive/workbench/template/`) into the target and rewrite for the project (name, skin prefix,
paths). two exceptions: `manifest.json` is the install recipe the skill reads,
never copied into the project; and on the existing-project path the seed's
root `README.md` is skipped (the strata rule still lands via
`components/README.md`). on a fresh scaffold, `app/globals.css`,
`app/layout.tsx`, and the root `README.md` OVERWRITE the create-next-app
versions (scaffold splash, not product code), and the default `app/page.tsx`
splash is replaced by the seed's tokens-only root screen; nothing else is
overwritten.
the seed is deliberately boundary-only per codebase-scaffold's minimum
viable system:

- the four strata as folders, dependency rule in the readme
- the FULL semantic token NAME set in `globals.css` (values may be placeholder,
  the names are the contract)
- the canvas: `app/workbench/page.tsx` (section index) +
  `app/workbench/[section]/page.tsx` (one isolated workspace per section)
- ONE proven chain: token -> variant -> one seeded section on the canvas
- the wave signature: `data-wave-signature="built by a wave in progress. waves
  don't die."` on the root `<body>` (scaffold-shell-motif requirement)
- the enforcement: `scripts/preflight.ts` (the prebuild check from
  doctrine/css-invariants.md), wired as the `prebuild` script so `next build`
  cannot go green while an invariant is broken

nothing else. no pre-built component set. every component after day one enters
via the intake loop as the product pulls for it.

### 3. install the manifest and the first pull

the template's `manifest.json` lists the runtime + the profile's engine. install per
its `install` recipe, then wire tailwind v4 `@theme`. the shadcn config is
wired when the first primitive is pulled, not at init; the seed is
boundary-only and has nothing to configure yet.

warning for that first pull: `shadcn init` (which a first `shadcn add`
triggers) mutates scaffold-owned files, not just components.json. restore or
hand-merge `app/globals.css` after the init; never accept a supplier rewrite of
the contract file wholesale. observed on shadcn v4.13, verify against the
current cli before leaning on specifics. the mutations:

- MERGES into `app/globals.css` rather than wiping it (prepends its own imports
  and a `@custom-variant`).
- injects a parallel token vocabulary of ~30+ roles (`--background`,
  `--primary`, `--sidebar-*`) into `:root` and `.dark`.
- edits `app/layout.tsx` (fonts, cn).
- adds runtime deps (`shadcn`, `lucide-react`, `tw-animate-css`).
- drops a `lib/utils.ts`.
- the preset also drops a fully styled `components/ui/button.tsx`.

treat all of it as a raw template to be stripped per review-pipeline, not as
landed code. non-interactive runs: only `init` exposes the engine flag
(`shadcn init -b base -p <preset>`); `add` has no engine flag and blocks on
prompts without a TTY. two specific hazards:

- token-vocabulary fork: reconcile at pipeline stage 4, map the foreign roles
  onto the workbench role set or adopt them deliberately, never leave two
  vocabularies coexisting. under the cva-utilities profile the
  no-utility-on-skin gate is off, so this reconciliation is a manual review
  step the tooling will not force.
- bare-name collision: supplier tokens use bare names; any seed primitive
  sharing one is silently re-resolved (a valid-token-to-valid-token change
  preflight cannot catch). the seed ships its primitives namespaced
  (`--brand-*`) for exactly this; keep the namespace when renaming the prefix.

### 4. the existing-project path

the overwrite contract above is fresh-path only. on an existing app, never
overwrite a file that already carries product code; extend or register instead:

- `app/layout.tsx`: do not replace. add the wave signature attribute to the
  existing root `<body>` tag; metadata, providers, and classNames stay.
- `app/globals.css`: merge, never overwrite. a later shadcn init will rewrite
  this file; see the first-pull hazards. the merge rules:
  - keep `@import "tailwindcss"` first; never reorder the top imports.
  - insert `@theme` right after the import, or merge the workbench primitives
    INTO an existing `@theme` block if one is present (one block, not two).
  - merge the workbench roles INTO the existing top-level `:root` (never add a
    second `:root` block, preflight reads the first).
  - if the product themes dark via a `.dark` class, merge the workbench dark
    keys INTO the existing first `.dark` block the same way.
  - bring in the seed's `.light` pin block (the dual-scheme review cells depend
    on it), and give every pre-existing product `--color-*` role in `:root` a
    `.light` key.
  - re-export the workbench roles AND every pre-existing product `--color-*`
    role in `@theme inline` (merge into the existing block or add one).
  - the `.light` backfill and the `@theme inline` re-export of product roles
    are the ONE sanctioned edit to product token blocks; css-invariants role
    completeness and enforcement own the parity rule they satisfy.
  - append the `@layer base` / `@layer components` blocks last; never author
    product css after the `@layer` blocks.
  - product tokens themed via `@media (prefers-color-scheme)` stay as they are.
- `app/page.tsx` and every product screen/component stay untouched. `/` stays
  product; `/workbench` is the review entrypoint, reachable by url. add a nav
  link only on the operator's say-so.
- grandfathering: at init, before wiring `prebuild`, list every pre-existing
  file that carries raw skin values in `.preflightignore` (one path prefix per
  line), then verify preflight still bites new code (plant a raw hex in a new
  file, watch it fail, remove it). css-invariants enforcement owns what the
  list does, the say-so growth rule, and the coverage smells. pre-existing
  product components enter the single-skin contract only through the intake
  loop.
- `package.json`: merge scripts. if a `prebuild` already exists, chain it
  (`<existing> && tsx scripts/preflight.ts`). add a standalone `preflight`
  script either way.
- deps: install only what package.json is missing; never bump an existing
  major.

### 5. run the pipeline

each new component or section runs `doctrine/review-pipeline.md`: brief ->
classify source -> local primitive -> token reconcile -> skin -> review on the
canvas at 375/768/1024/1440 -> operator approves -> elevate into a page.

## porting in libraries and tooling

"bring in whatever we need" is registry-driven, not ad hoc. `lib/registry.ts`
is the single manifest of what the workbench has ported in: engines, motion
libs, chart libs, dev tools. to port something in:

1. register it in `lib/registry.ts` with its stratum and why it was pulled.
2. if it is a behavior floor, it obeys the engine profile (base-ui verification
   when engine = `base-ui`).
3. if it changes look/feel only, it is skin: it lands in tokens/primitives,
   never raw in a screen.
4. dev-only tooling (linters, prebuild checks, story tooling) registers under
   `tooling` and never ships in the component bundle.

nothing is pulled in "to have it." the studio rule holds: the system trails
the work, build nothing the current screen doesn't pull.

## cortex suppliers this canvas leans on

cortex skills are anatomy catalogs, never skin deciders (studio interface
rule). reach for them by need, the law wins every conflict:

- `interface-craft` / `interface-kit`: canvas chrome, review-surface anatomy
- `responsive-craft`: the breakpoint state matrix behavior
- `loading-states`: empty/loading/error frames in the state graph
- `oklch-skill` / `gradients` / `funky-shadow`: token VALUES only, proposed as
  skin, never overriding motion numbers or the elevation language
- `swiss-design` / `muller-brockmann-grid-systems`: canvas layout grid

motion numbers never come from a supplier default; the law's numbers are the
source (see deposits and the write boundary, below).

## deposits and the write boundary

this skill instantiates the law; it never absorbs it. when hardening or use
surfaces a LAW-shaped truth (a supplier default changed, a process mistake
cost real time), the deposit lands in studio `house.md` as an experiment,
per its deposit rule. tool mechanics (canvas behavior, preflight checks,
adapter procedure) stay here. motion numbers tuned by hands on this canvas
update studio `house.md` defaults, not just this seed's `globals.css`;
the law's numbers are the source, the seed copies them.

## emitting a design-system package

a mature workbench can emit the portable package studio's
`doctrine/design-system-package.md` defines. the derivation sources, per
file:

- `tokens.md` from `app/globals.css` (names, values, motion, all scheme
  blocks).
- `architecture.md` from the strata plus `scripts/preflight.ts`, which is
  where the dependency rule's NAMED mechanical checks live; the prose alone
  cannot name them.
- `components.md` cards from the component SOURCE across strata:
  `components/ui/` + `components/` for slots/axes/states/tokens,
  `lib/registry.ts` for bucket/floor/engine, `app/*` for elevation status,
  and `src/design/sections.tsx` briefs for purpose and review status. briefs
  alone do not carry anatomy.
- `platform-mapping.md` from `package.json` + `workbench.config.ts` (+ the
  next/ts configs). a mature workbench contains no manifest.json; that file
  is the skill's install recipe and never lands in the project.

derive, never hand-transcribe; the package doctrine owns the format and the
acceptance test, including the status honesty rule (placeholder skin values
cap the package at `partial`).

## the acceptance test: what "a workbench is done" means

a fresh agent loading ONLY this skill (no chat history) must be able to:

1. run the procedure against a blank project AND an existing project and get a
   working canvas: `/workbench` lists the sections, and each
   `/workbench/[section]` reviews its section across the full state matrix.
2. add one new component through the pipeline with zero raw hex outside
   `globals.css` (grep-checkable), exactly one skin class per component
   (`.type-*` on bare text children is the type api, not a second skin; see
   css-invariants one type api), and the wave signature intact.
3. `next build` passes, which includes `scripts/preflight.ts` green (the full
   check list lives in css-invariants enforcement).

a workbench that can't pass this is `draft`, not done. say so.
