# enforcement: the prebuild gate

the profile-agnostic rules every studio codebase enforces mechanically,
and the check that enforces them. `next build` catches none of this;
without a guard it rots.

the reference implementation is `scripts/preflight.ts` in this skill. copy it into the project's `scripts/`, wire it as the
`prebuild` script, and keep a standalone `preflight` script. zero runtime
deps beyond node builtins; run with `npx tsx scripts/preflight.ts`. it is
plain typescript with no agent-specific machinery: any agent, human, or
CI runs it the same way.

## tokens only

every visual value in component code resolves to a token via `var()`. no
raw hex, no raw color function, no one-off px. raw values live only in
the token file (`app/globals.css` `@theme` / `:root` / `.dark` /
`.light`). the px policy: 0 is always allowed; 1px and 2px only on
width-bearing border/outline properties; everything else is a token or a
relative unit.

applies to NEW code. accepted skins are grandfathered (below); the token
rule is not a license to churn accepted code.

## role completeness

name every color role `--color-<role>`, always; the completeness check is
scoped to that convention and a role named outside it is invisible.
adding a role is coordinated edits across every scheme block: declare the
primitive in `@theme`, map the role in `:root` AND `.dark`, add the
`.light` key when a `.light` pin block exists, and re-export in
`@theme inline` where it generates a utility. a role missing from any
block degrades a scheme silently.

## dependency and import boundaries

references point downward only (`doctrine/codebase-scaffold.md`, the dependency rule),
made mechanical:

- cva boundary: `class-variance-authority` and `*Variants` helpers import
  only from `components/ui/`. skin machinery stays in the primitive
  stratum.
- engine boundary: any headless-engine import (`@base-ui/*`,
  `@radix-ui/*`) outside `components/ui/` is a stratum leak. a second
  consumer imports the existing primitive, never a forked copy.
- engine resolution: when a profile declares an engine, the check is
  symmetric; a wrong-engine pull fails whichever way the supplier's
  default drifts. reject and rebuild on the profile's engine, or switch
  the profile deliberately.

## grandfathering

preflight reads a root `.preflightignore` (one path prefix per line, `#`
comments) as the accepted-skin list; listed files are exempt from the
per-file checks and reported as grandfathered. the list is written at
init on the existing-project path and grows only on operator say-so. a
prefix covering the token file, `components/ui`, or a whole stratum tree
is a smell and warns, not accepted skin. after writing the list, verify
preflight still bites: plant a raw hex in a new file, watch it fail,
remove it.

## profiles

the checks above run everywhere, config or not. profile-scoped checks
(single-skin's no-utility-on-skin, the engine-resolution ban) activate
when a project declares a profile in a `design.config.ts`:

- `skinPrefix`: the class prefix of the skin layer (default `brand`).
- `css`: `single-skin` (one `.{prefix}-*` class layer, no utilities mixed
  in) or `cva-utilities` (cva variant helpers with tailwind utilities).
  a config without `css` runs as `single-skin`.
- `engine`: `base-ui` or `radix`. a config without `engine` runs as
  `base-ui`, and the check bans the other engine's imports.

the file sits at the project root, beside `app/`:

```ts
// design.config.ts
export default { skinPrefix: "brand", css: "cva-utilities", engine: "base-ui" };
```

preflight reads the token file at `app/globals.css` from the project root. a
`src/app/` layout is not supported yet: the token checks silently skip, so
keep `app/` at the root, or treat dark-mode completeness as a manual check.

no config means universal checks only, never a failure. law specific to
one profile (a single skin layer, one type api, one elevation model) lives
in the project that declares the profile, in its own docs, not here.

## lint gate — EXPERIMENT

projects on the `cva-utilities` profile add `@shadcn/lint` (an eslint or
oxlint plugin for tailwind v4) beside preflight. the two gates split the
work:

- preflight owns the token file, role completeness, import boundaries,
  and raw hex anywhere.
- the lint gate owns what a lexical scan cannot see: classes a screen
  puts on a primitive (`no-restyle` is "screens make zero new visual
  decisions" made mechanical), arbitrary values and palette colors in
  class strings, classes tailwind cannot generate, and class strings
  built at runtime.

the starting config:

```js
"shadcn/no-restyle": ["error", { allow: ["layout"] }],
"shadcn/no-raw-colors": "error",
"shadcn/no-arbitrary-values": "error",
"shadcn/no-unknown-classes": "error",
"shadcn/require-static-classes": "error",
```

turn `require-static-classes` off inside `components/ui/`, where
primitives call their own variant helpers. widen `no-restyle` per
primitive with contracts only when a screen proves the need.

the `--brand-*` primitives sit in `@theme`, so tailwind generates
utilities for them and `no-raw-colors` passes them as theme colors.
screens bind color roles (`--color-*`), never primitives; on the trial,
deny `*-brand-*` outside `components/ui/` and confirm the rule reports it.

wire it as a `lint` script and run it in `prebuild` next to preflight. a
raw hex inside an arbitrary class (`bg-[#fff]`) is reported by both gates,
which is harmless. `single-skin` projects skip this gate: their screens
style through skin classes, so the rules have little to check.

until two real projects run it, preflight stays the gate of record and
this section is an experiment.

## the exit code is the gate

preflight's EXIT CODE is the gate, not its stdout. piping output through
tail, grep, or tee can mask a failure from an eyeball check, but
`prebuild` still fails the build. trust the exit code. until preflight is
green in CI, these rules are conventions held by review; green preflight
is part of any scaffold's acceptance.
