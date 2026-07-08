---
name: asbuilt
description: Asbuilt design-system extraction and conformance. Use when the user asks to derive a design system from existing code, extract tokens/components/states, conform a finished UI to a derived package, or retrofit studio law onto a project. Never for greenfield design systems.
---

# asbuilt — derive

turns a finished project into the design-system package it would have had
if the studio practice had been there from the beginning. code is the
source of truth: existing design docs in the target are evidence of
intent, never truth.

## law

read first, every run:

1. [references/design-system-package.md](references/design-system-package.md) —
   the output format and its acceptance test
2. [references/component-intake.md](references/component-intake.md) — the
   three-layer model and buckets the cards must speak
3. [references/rule-grades.md](references/rule-grades.md) — rule strength,
   invariants, defaults, and experiments
4. [references/headless-floors.md](references/headless-floors.md) when the
   target has dialogs, menus, popovers, comboboxes, selects, tabs, accordions,
   tooltips, or other interactive components
5. [references/tooling-bridges.md](references/tooling-bridges.md) when the
   target already uses DTCG-style tokens, Tailwind `@theme`, Storybook, shadcn
   registry files, or structured-output automation

hard rules: the target repo is READ-ONLY — clone shallow to a scratch
directory, never commit or push to it. derive records what IS; proposals
(new tokens, consolidations) are labeled proposals and the codebase decides
when to conform. motion numbers in the package come from the target's own
code, never from any skill's defaults.

start every package from [assets/templates/package/](assets/templates/package/).
do not invent the package shape from memory. when the repo is large, use the
short specialist prompts in [agents/](agents/) for evidence gathering, then
audit their output yourself.

all relative paths in this skill resolve from this `asbuilt` skill folder, not
from the target repo. when running helper scripts from another working
directory, use their full path.

## the procedure

0. **verify production truth first.** before reading a single file, confirm
   the target is the live source: search for other copies (`gh search
   repos <name>` — org repos, forks, mirrors), compare pushed dates, and
   check ancestry between candidates. deriving from a stale snapshot
   demotes the whole conform output to reference-only.
1. **provenance**: note repo + short sha. the package must say what it was
   derived from.
2. **token layer first**: read the global stylesheet / `@theme` / theme
   config in full. many projects half-declare a system; capture what
   exists before hunting what leaked.
3. **evidence sweep**: run the helper scripts when the stack permits:
   `node scripts/scan-raw-values.mjs <scratch-repo>` and
   `node scripts/scan-components.mjs <scratch-repo>`. these scripts are
   evidence, not truth; follow up manually on every important cluster.
4. **raw-value sweep** (subagent-friendly, mechanical): cluster every hex /
   rgb(a) / oklch, arbitrary tailwind value, duration, easing, and repeated
   magic number OUTSIDE the token file. for each cluster: value, count,
   example file:line, whether a token already exists for it. output: the
   top values that earn token candidacy by frequency (3+ real uses).
5. **state + floor inventory** (subagent-friendly): for every interactive
   component — nav, overlays, forms, accordions, anything with open/close —
   record states implemented vs missing (default/hover/focus-visible/
   active/disabled/loading/success/error/empty), whether behavior is
   hand-rolled or inherited, and the specific machinery gaps (focus trap,
   scroll lock, keyboard model, aria wiring, focus restore).
6. **anatomy extraction**: read the primitives yourself. diff duplicated
   component families to name the closed axes (four button files = one
   button, two axes). find parallel token stores (JS constants, per-file
   color consts) — those are violations to record.
7. **drift check**: if the target carries older design docs, compare —
   they show intent and drift, and the package supersedes them for grammar
   only where the code disagrees.
8. **emit the package** per the doctrine format: README (status vocab
   none/draft/partial/ready/archived, source of truth, unresolved list —
   never hidden), SKILL (thesis, hard rules, anti-patterns SEEN IN THE
   CODE, extend-don't-copy pointer), references/tokens (existing vs
   proposed, clearly split), references/architecture (strata mapped to
   real paths, dependency rule, the mechanical grep check, violations),
   references/components (anatomy cards, exact grammar, per-card status),
   references/platform-mapping (stack, real paths, divergences,
   re-derivation note), and AGENTS.md (agent operating rules for future use).
9. **validate before calling it done**: run
   `node scripts/validate-package.mjs <package-dir>`. fix every failure or
   lower the package status. validation passing does not make the package
   true, but failing validation means it is not ready.
10. **acceptance test before calling it done**: could an agent loading only
   the package create a new conforming component and correctly bucket a
   new idea? if not, it isn't ready — say so in status.

## verify — audit before trusting the package

verify is a read-only audit of a derived package. it does not modify the
target repo and it does not run conform.

use verify when a package exists and the user wants to know whether future
agents can rely on it. read the package, run
`node scripts/validate-package.mjs <package-dir>`, then use
[agents/package-critic.md](agents/package-critic.md) as the review bar.

check:

1. **shape**: required files exist, frontmatter is valid, provenance is
   present, unresolved decisions are explicit, and validation passes.
2. **evidence**: tokens, components, architecture, and platform mapping cite
   real code paths or clearly say when evidence is missing.
3. **component cards**: every card names bucket, floor, source, slots, axes,
   states, motion, tokens, and status.
4. **truthfulness**: status is no higher than the evidence allows. lower
   `ready` to `partial` or `draft` before pretending.
5. **agent-use test**: could an agent loading only the package create a
   simple conforming card or classify a new idea as composition,
   headless-floor, or novel? if not, say exactly what blocks it.

output a short verdict:

- `ready`: package passes validation and the agent-use test
- `partial`: package is useful but has named gaps
- `draft`: package needs more derivation before another agent should rely on it

## conform — phase two of the same process

after the package exists, apply it to the code on a LOCAL branch in the
scratch clone (never push; local commits per batch for a reviewable
history). the rule of the phase: **visual parity** — conform changes
structure and floors, never the rendered look; every sanctioned visual
delta is enumerated for the operator's QA. run in three verified batches,
`build` + `lint` green after each:

1. **tokens**: land the proposed names in the token file, replace raw
   values with bindings. skip any replacement that can't resolve
   identically (hex-alpha concat like `${color}80`, metadata files where
   css vars don't exist) and record the survivors. color constants
   consumed as SVG presentation attributes (`fill={C}` / `stroke={C}`)
   cannot become `var()` strings — var() never resolves in presentation
   attributes; fill silently falls back to black, stroke to none. move
   those sites to inline `style={{ fill: C }}` (var() resolves there) or
   leave them raw hex. caught 2026-07-07: the cipherowl reference bundle
   shipped this bug undetected, so a reference implementation is a
   pattern to re-apply critically, never truth to copy.
2. **consolidation**: collapse duplicated component families onto their
   closed axes (byte-preserve the class recipes), factor copy-pasted
   structures into data-driven components, unify duplicated machinery
   (form status hooks, repeated chips).
3. **floors**: inherit the proven engine (e.g. radix dialog) under every
   hand-rolled overlay — focus trap, restore, escape, scroll lock come
   from the floor, never hand-built beside it. add missing aria semantics
   (role=alert on errors). know the radix mechanic: modal content sets
   body pointer-events none — outside controls that must stay live need
   pointer-events-auto.

then **re-derive**: update the package from the conformed branch so spec
and code are the same truth again, statuses honest, remaining gaps in the
unresolved list. batches are subagent-friendly; audit their reports
critically (one batch here arrived "already done" and still contained a
real regression a critical audit caught).

two survival rules: scratch clones are disposable — when conform output
must outlive the session, `git bundle` the branch to durable storage. and
if the target's base moved under you, RE-RUN the batches on the new head,
never rebase; the old branch stays valuable as the reference
implementation that makes the re-run cheap.

## unbuilt verbs (do not improvise them)

init / diff / generate are deliberately unbuilt in this skill.

- **init** will scaffold the boundary skeleton when a real project pulls for it.
- **diff** will re-run derive and compare package-to-package: two compiled truths, never journal-vs-reality.
- **generate** will use a finished package to create a new conforming component.

Do not add these branches until a real use case earns them.
