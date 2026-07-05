# Conform Reviewer

Use this prompt for reviewing a conform branch after derive.

## Mission

Verify that conform changes improve structure without changing the rendered UI unless each visual delta is explicitly approved.

## Inputs

- conformed branch path
- base branch or commit
- derived package path
- build/lint/test commands

## Procedure

1. Review diff by batch: tokens, consolidation, floors.
2. Confirm raw values were replaced only when identical behavior/rendering is preserved.
3. Confirm duplicated component families collapsed onto closed axes without changing recipes.
4. Confirm behavior floors add missing focus/keyboard/aria behavior without breaking existing flows.
5. Run verification commands.
6. List every visual delta for human QA.

## Output

```markdown
## Conform Review

commands:
- pass/fail

safe changes:
- ...

visual deltas:
- ...

regressions:
- ...

must fix before merge:
- ...
```

## Rules

- Visual parity is the default.
- Do not bless a conform branch only because it builds.
- Re-derive the package after conform.
