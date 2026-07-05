# Tokens

## Source Files

| Path | Role |
| --- | --- |
| `{{path}}` | {{global stylesheet / theme config / token source}} |

## Existing Tokens

| Token | Value | Source | Usage | Notes |
| --- | --- | --- | --- | --- |
| `--color-surface` | `{{value}}` | `{{file:line}}` | {{where used}} | {{notes}} |

## Proposed Tokens

Proposals are not law until code adopts them.

| Proposed Token | Current Raw Value | Evidence | Reason |
| --- | --- | --- | --- |
| `--color-{{role}}` | `{{value}}` | `{{count}} uses` | {{reason}} |

## Raw Value Clusters

Generated or checked with:

```bash
node scripts/scan-raw-values.mjs <target-repo>
```

| Value | Type | Count | Existing Token | Examples |
| --- | --- | --- | --- | --- |
| `{{value}}` | color / space / motion / arbitrary | {{count}} | yes/no | `{{file:line}}` |

## Modes And Themes

{{dark mode, themes, density, brand modes, or "none found"}}

## Motion Tokens

Motion numbers come from code.

| Token | Value | Source | Usage |
| --- | --- | --- | --- |
| `--motion-duration-fast` | `{{value}}` | `{{file:line}}` | {{usage}} |

## DTCG Sidecar

If useful for tooling, mirror stable tokens into `tokens.dtcg.json`. Keep this markdown file as the human-readable source.
