# AGENTS.md

This example package describes the derived design system for Tiny App.

## Read Order

1. `README.md`
2. `SKILL.md`
3. `references/tokens.md`
4. `references/architecture.md`
5. `references/components.md`
6. `references/platform-mapping.md`

## Source Of Truth

Example code at `https://github.com/example/tiny-app` / `abc1234` wins over this package.

## Allowed Edits

- Update docs only from implementation evidence.
- Add proposed tokens only in `references/tokens.md`.
- Add component cards only when a real component exists.

## Do Not

- Do not invent a visual system.
- Do not copy external skin.
- Do not mark unresolved states as done.

## Validation

```bash
node scripts/validate-package.mjs examples/minimal-package
```
