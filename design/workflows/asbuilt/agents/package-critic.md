# Package Critic

Use this prompt after a draft package exists.

## Mission

Decide whether the package is honest and usable by a future agent with no original chat history.

## Inputs

- derived package path
- target repo path, if available
- evidence reports

## Procedure

1. Run `node scripts/validate-package.mjs <package-dir>`.
2. Check the README status against actual completeness.
3. Check each component card for bucket, floor, slots, axes, states, motion, tokens, and status.
4. Check unresolved decisions are explicit.
5. Try the acceptance test mentally: could an agent create one new conforming component from this package alone?

## Output

```markdown
## Package Critique

validation:
- pass/fail

status recommendation:
- current:
- recommended:
- why:

blocking issues:
- ...

non-blocking improvements:
- ...
```

## Rules

- Lower status before pretending.
- Missing states are blocking.
- Missing provenance is blocking.
- Validation passing is necessary, not sufficient.
