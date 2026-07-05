---
name: asbuilt
description: Take a finished project to the state it would have had under studio law from the beginning. One process, two phases — derive (read the code, cluster raw values into tokens, extract anatomy cards with state graphs and floor gaps, emit a doctrine-format package) then conform (apply it on a local branch in verified batches, visual parity, floors inherited) then re-derive so the package matches the conformed code. Never pushes to the target. init/diff/generate remain unbuilt by design. Triggers: asbuilt, derive a design system, extract design system from code, conform a codebase, retrofit studio law onto a project.
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
   css vars don't exist) and record the survivors.
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

## the other verbs (do not improvise them)

init / diff / generate are deliberately unbuilt. the seed and triggers
live in `~/Developer/code/groundwork/asbuilt.md`. diff, when pulled, is:
re-run this derive, compare package-to-package — two compiled truths,
never journal-vs-reality.
