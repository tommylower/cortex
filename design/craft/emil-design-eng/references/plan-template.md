# Motion Plan Template

Use this only after an `audit` finding has been selected. The executor has no
conversation context, so every decision must be local and checkable.

```md
# NNN — <Imperative title>

- **Status:** TODO
- **Commit:** <current short commit>
- **Severity:** high | medium | low
- **Category:** <audit category>
- **Estimated scope:** <files and rough size>

## Problem

Explain what is wrong, why it affects the experience, and cite each location
as `path/file.tsx:123`. Include the smallest current-code excerpt needed to
recognize the target.

## Target

Describe the exact end state using the project's token names, component
contracts, and motion primitives. If a value does not exist yet, state the
provisional value and where it should become a token.

## Project conventions

Name the existing file, component, or token the executor should imitate.

## Steps

1. <One concrete edit with file and expected result.>
2. ...

## Boundaries

- Do not touch <out-of-scope files or behavior>.
- Do not add dependencies unless this plan explicitly requires one.
- Stop and report if the cited code has drifted enough that the plan no longer
  matches.

## Verification

- **Mechanical:** exact lint, typecheck, test, or build commands.
- **Behavior:** exact interaction and state sequence to exercise.
- **Feel:** slow-motion, rapid interruption, reduced-motion, and real-device
  checks that apply.
- **Done when:** observable completion criteria.
```

After writing plans, create or update a plan index with number, title,
severity, status, execution order, and dependencies.
