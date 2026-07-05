# Cortex Sources

Cortex mixes original skills, adapted skills, vendored snapshots, submodules, private local material, and generated adapter output. Keep these surfaces separate.

## Source Types

| Type | Where | Rule |
| --- | --- | --- |
| Original Cortex skills | Most `agent-workflows/`, several `design/`, some `engineering/` | No `author:` required. |
| Adapted skills | Individual skill folders with `author:` frontmatter | Keep source credit in frontmatter and body. |
| Vendored snapshot | `engineering/` | Refresh deliberately; preserve author lines. |
| Git submodule | `marketing/` | Do not reorganize internals from Cortex; wrap with Cortex docs instead. |
| Local/private | `local/` | May sync locally, never ships publicly. |
| Generated adapters | `~/.claude/skills`, `~/.codex/skills`, `~/.claude/commands` | Owned by sync scripts, not edited by hand. |

## Move Rules

- Move original Cortex skills freely when the shelf is wrong.
- Move adapted skills only when the source credit remains intact.
- Do not move upstream marketing skills inside `marketing/skills`; make a Cortex-side router instead.
- Do not promote anything from `local/` into a public shelf without explicit approval.
- Keep standalone mirrors, such as `nightcap`, exact when using `scripts/publish.sh`.

## Attribution Check

Before committing source changes:

1. Run `scripts/validate-skills.sh`.
2. Check every non-original skill has `author:` in frontmatter.
3. Confirm no client names or license-restricted content moved out of `local/`.
4. Confirm `catalog/shelves.json` matches the public and local sync behavior.
