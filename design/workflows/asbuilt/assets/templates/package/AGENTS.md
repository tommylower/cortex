# AGENTS.md

This package describes the derived design system for `{{project_name}}`.

## Read Order

1. `README.md`
2. `SKILL.md`
3. `references/tokens.md`
4. `references/architecture.md`
5. `references/components.md`
6. `references/platform-mapping.md`

## Source Of Truth

Code at `{{repo_url}}` / `{{short_sha}}` wins over this package. If code and package disagree, re-derive or mark the package status lower.

## Allowed Edits

- Update package docs when new evidence comes from code.
- Add proposed tokens only in `references/tokens.md`.
- Add component cards only when derived from implementation or an approved conform branch.

## Do Not

- Do not invent a system from taste.
- Do not copy external skin.
- Do not mark a package `ready` with unresolved component states.
- Do not edit target code during derive.

## Validation

From the asbuilt skill folder:

```bash
node scripts/validate-package.mjs <this-package-dir>
```

If validation fails, fix the package or lower its status.
