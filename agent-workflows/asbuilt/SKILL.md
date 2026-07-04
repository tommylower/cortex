---
name: asbuilt
description: Derive a design-system package from a finished project's code. An as-built drawing is redrawn from what was actually constructed, not from the plans. Reads a codebase (read-only, never pushes), clusters raw values into proposed tokens, extracts anatomy cards with state graphs and behavior-floor gaps, and emits a doctrine-format package. One verb today (derive); init/diff/generate are unbuilt by design. Triggers: asbuilt, derive a design system, extract design system from code, retrofit studio law onto a project.
---

# asbuilt — derive

turns a finished project into the design-system package it would have had
if the studio practice had been there from the beginning. code is the
source of truth: existing design docs in the target are evidence of
intent, never truth. built 2026-07-04; proven on cipherowl
(use #1, `wip-design-systems/cipherowl-design`).

## law

read first, every run:

1. `~/Developer/code/groundwork/doctrine/design-system-package.md` — the
   output format and its acceptance test
2. `~/Developer/code/groundwork/doctrine/component-intake.md` — the
   three-layer model and buckets the cards must speak
3. `~/Developer/code/groundwork/rules.md` — grades; nothing derived here
   becomes prescription without the operator's pen

hard rules: the target repo is READ-ONLY — clone shallow to a scratch
directory, never commit or push to it. derive records what IS; proposals
(new tokens, consolidations) are labeled proposals and the codebase decides
when to conform. motion numbers in the package come from the target's own
code, never from any skill's defaults.

## the procedure

1. **provenance**: note repo + short sha. the package must say what it was
   derived from.
2. **token layer first**: read the global stylesheet / `@theme` / theme
   config in full. many projects half-declare a system; capture what
   exists before hunting what leaked.
3. **raw-value sweep** (subagent-friendly, mechanical): cluster every hex /
   rgb(a) / oklch, arbitrary tailwind value, duration, easing, and repeated
   magic number OUTSIDE the token file. for each cluster: value, count,
   example file:line, whether a token already exists for it. output: the
   top values that earn token candidacy by frequency (3+ real uses).
4. **state + floor inventory** (subagent-friendly): for every interactive
   component — nav, overlays, forms, accordions, anything with open/close —
   record states implemented vs missing (default/hover/focus-visible/
   active/disabled/loading/success/error/empty), whether behavior is
   hand-rolled or inherited, and the specific machinery gaps (focus trap,
   scroll lock, keyboard model, aria wiring, focus restore).
5. **anatomy extraction**: read the primitives yourself. diff duplicated
   component families to name the closed axes (four button files = one
   button, two axes). find parallel token stores (JS constants, per-file
   color consts) — those are violations to record.
6. **drift check**: if the target carries older design docs, compare —
   they show intent and drift, and the package supersedes them for grammar
   only where the code disagrees.
7. **emit the package** per the doctrine format: README (status vocab
   none/draft/partial/ready/archived, source of truth, unresolved list —
   never hidden), SKILL (thesis, hard rules, anti-patterns SEEN IN THE
   CODE, extend-don't-copy pointer), references/tokens (existing vs
   proposed, clearly split), references/architecture (strata mapped to
   real paths, dependency rule, the mechanical grep check, violations),
   references/components (anatomy cards, exact grammar, per-card status),
   references/platform-mapping (stack, real paths, divergences,
   re-derivation note).
8. **acceptance test before calling it done**: could an agent loading only
   the package create a new conforming component and correctly bucket a
   new idea? if not, it isn't ready — say so in status.

## the other verbs (do not improvise them)

init / diff / generate are deliberately unbuilt. the seed and triggers
live in `~/Developer/code/groundwork/asbuilt.md`. diff, when pulled, is:
re-run this derive, compare package-to-package — two compiled truths,
never journal-vs-reality.
