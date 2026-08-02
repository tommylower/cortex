# css invariants

the load-bearing rules for `app/globals.css`. break one and components stop
being predictable. generalized from the reference project's css-system-invariants;
project-agnostic. governs the skin contract in `review-pipeline.md`.

## profile scope

css strategy is a studio DEFAULT, not law; this file is the contract for one
profile, not universal law. which rules apply where:

- universal, every profile: the cascade truth, role completeness, the
  accessibility floor, and enforcement.
- single-skin `.brand-*` only (the workbench default): single skin layer, tokens
  only, locked tokens, one elevation model, one type api. everything in these
  sections assumes the single-skin profile is active.

a project on the cva + tailwind profile does not inherit the single-skin and
tokens-only rules; its skin contract is the shadcn/cva convention.

## the cascade truth

the rule everything depends on, and the opposite of what the code looks like it
assumes. layer order in built tailwind v4 CSS:

```text
theme  <  base  <  components  <  utilities  <  unlayered
```

later wins. so:

- tailwind and shadcn utility classes (`@layer utilities`) BEAT `.brand-*`
  component classes (`@layer components`) on any shared property.
- a `.brand-x.brand-x` double-class does NOT win across layers. the specificity
  bump only resolves conflicts INSIDE the components layer. against a utility,
  the utility still wins. never rely on the double-class hack to beat a utility.
- the only genuine escape above utilities is being unlayered. reserve unlayered
  rules for true global chrome (scrollbar, `html` / `body` resets). do not
  author component CSS unlayered to win a fight.
- never author CSS before `@import "tailwindcss"`, and never reorder the top
  imports. layer precedence is set by first appearance.

## single skin layer

exactly one `.brand-*` class per component owns all visuals.

- never put tailwind or cva utility classes (`buttonVariants()` output) on a
  `.brand-*` element. they live in the utilities layer and win. one class, no
  utilities, no fight.
- cva skins stay inside `components/ui`. system and section wrappers emit one
  `.brand-*` class plus data-attributes, nothing else.
- under single-skin, cva carries the closed axis CONTRACT only: its variant
  values are empty strings that map to `data-*` attributes, and the `.brand-*`
  css keys off those attributes. cva never emits utility classes onto the
  element under this profile.
- "exactly one `.brand-*` class" means one class NAME per component. a
  compound component whose parts are DOM siblings (a portal's backdrop and
  popup) applies the same name across its parts, differentiated by
  `data-slot`.

## tokens only

- every value in a component class resolves to a token via `var()`. no hex, no
  one-off px. this is grep-checkable and is the workbench's hard bar.
- applies to NEW components. accepted skins are grandfathered; retokenize only
  on the operator's explicit say-so. the token rule is not a license to churn
  accepted code.
- color and state flips happen by reassigning a `:root` (or `.dark`) role, never
  by re-declaring a value inside a component.

## role completeness

name every color role `--color-<role>`, always. the dark-completeness check is
scoped to that convention: a color role named outside it is invisible to the
check (see enforcement).

adding a semantic role is coordinated edits across every scheme block:

- declare the primitive in `@theme`
- map the role in `:root` AND add a `.dark` override
- when a `.light` pin block exists (the canvas review cells depend on one),
  add the `.light` key too, or the role's light cell collapses under a
  global dark toggle
- if it must generate a utility, re-export in `@theme inline` as
  `--color-<role>: var(--<role>)`

a role added to `:root` without its `.dark` override degrades dark mode
silently. `next build` does not catch this; the prebuild check does (see
enforcement).

## locked tokens

some role tokens are locked: their value is a settled design decision, not a
knob. record locked tokens and the doc or decision that locked them in one
place, a `locked:` comment on the token line in `globals.css`. a mock or
template value never overwrites a locked token, even in greenfield with no
conflicting code. unlock only on the operator's explicit say-so.

## one elevation model

one elevation language, not two. pick the project's shadow system (bevel, float,
dithered lift) and name it in tokens. use only those shadow tokens. reintroduce
a second shadow family only for a real overlay case, documented here.

a shadow or radius token with zero consumers (grep-confirmed) is dead. cut it
on the next css pass; never build new work on a dead token. the cut is a
manual grep pass, preflight has no unused-token check. retirement of a ROLE
removes it from all of `:root` / `.dark` / `.light` / `@theme inline`
together; a stale key in any block is invisible to the completeness check.

## one type api

- `.type-display` / `-heading` / `-body` / `-label` / `-caption` are the text
  API. one class is the full style.
- `@theme` still emits `text-*` font-size utilities. do not hand-author with
  them on elements that should carry a `.type-*` class. tune hierarchy from the
  tokens, in one place.
- inside a `.brand-*` skin block, bind type via the `--text-*` tokens; the
  `.type-*` classes are for bare text elements. one canonical path per
  element, never both.

## accessibility floor

enforced globally in `@layer base` (studio invariant 4); preserve it.

- `*` carries `border-border` + `outline-ring/50` and font smoothing
- inputs / textarea / select `font-size: max(16px, 1em)` (iOS zoom guard)
- `@media (pointer: coarse)` sets 44px min on `button`, `[role="button"]`;
  custom interactives add their own
- `@media (prefers-reduced-motion: reduce)` zeroes CSS durations
- JS motion must check reduced motion itself and resolve to the visible end
  state; CSS-first by default

## enforcement: the prebuild check

`next build` catches none of the above. these invariants rot without guards. the
scaffold ships a `scripts/preflight.ts` prebuild check (wire it into the build):

- `.dark` role completeness: every `--color-*` role in the first `:root` block
  has a `.dark` key and an `@theme inline` re-export where it generates a
  utility, plus a `.light` key whenever a `.light` pin block exists. scoped to
  `--color-*` so pre-existing product tokens (often themed via
  `@media (prefers-color-scheme)`) do not trip it on the existing-project
  path
- no utility on skin: fail when a tailwind utility shares a `className` with a
  `.brand-*` class
- tokens only: fail on raw hex / one-off px in any `.brand-*` block. the
  1px/2px allowance covers width-bearing border/outline props ONLY;
  `outline-offset`, `border-radius`, shadow lengths, and every other px must
  be a token
- cva import boundary: `buttonVariants` / cva importable only from
  `components/ui/**`
- engine resolution: symmetric against the profile engine. engine `base-ui`
  fails any `@radix-ui/*` import; engine `radix` fails any `@base-ui/*`
  import. a wrong-engine pull is rejected and rebuilt on the profile's
  engine, whichever way the supplier's default drifts
- engine import boundary: any `@base-ui/*` or `@radix-ui/*` import outside
  `components/ui/**` fails; engines live in the primitive stratum, a second
  consumer imports the existing primitive, never a forked copy
- registry ids unique: duplicate section ids in `src/design/sections.tsx`
  fail; the second registration is silently unreachable on the canvas

grandfathering: preflight reads a root `.preflightignore` (one path prefix per
line) as the accepted-skin list; listed files are exempt from the per-file
checks and reported as grandfathered. this instantiates the tokens-only
grandfather rule above; the list is written at init on the existing-project
path and grows only on operator say-so. a prefix that covers `components/ui`,
`app/globals.css`, or the whole `app/` / `components/` / `src/` tree is a
smell, not accepted skin; preflight warns on it.

preflight's EXIT CODE is the gate, not its stdout: piping its output (through
tail, grep, tee) can mask a failure from an eyeball check, but `prebuild`
still fails the build. trust the exit code.

until preflight is green in CI, single-skin and tokens-only are conventions held
by review. green preflight is part of the acceptance test.
