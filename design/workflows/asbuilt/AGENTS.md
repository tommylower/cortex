# AGENTS.md

This repo is Tommy Lower's `asbuilt` skill. Keep it practical and agent-facing.

## Purpose

`asbuilt` derives a design-system package from an existing codebase. It is not a greenfield generator or a public-facing pitch.

## Working Rules

- Keep `SKILL.md` as the short operational path.
- Put supporting detail in `references/`.
- Put copyable package shapes in `assets/templates/`.
- Put reusable evidence helpers in `scripts/`.
- Put specialist subagent prompts in `agents/`.
- Do not add local machine paths, client names, or private examples.
- Do not add promotional language.

## Validation

Run before committing:

```bash
bash -n scripts/publish.sh 2>/dev/null || true
node scripts/validate-package.mjs examples/minimal-package
```

When edited inside Cortex, also run Cortex validation from the repo root:

```bash
scripts/validate-skills.sh
scripts/skill-catalog.js validate
```

## Publishing

The standalone repo should appear authored by Tommy Lower. Do not use bot or Cortex publisher identities.
