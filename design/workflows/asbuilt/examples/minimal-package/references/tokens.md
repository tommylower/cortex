# Tokens

## Source Files

| Path | Role |
| --- | --- |
| `app/globals.css` | CSS variables and Tailwind theme bridge |

## Existing Tokens

| Token | Value | Source | Usage | Notes |
| --- | --- | --- | --- | --- |
| `--color-surface` | `#ffffff` | `app/globals.css:4` | cards, panels | base surface |
| `--color-text` | `#111827` | `app/globals.css:5` | body, headings | primary text |
| `--space-2` | `8px` | `app/globals.css:8` | button gap, card padding | compact unit |
| `--radius-control` | `6px` | `app/globals.css:12` | buttons, inputs | control radius |

## Proposed Tokens

Proposals are not law until code adopts them.

| Proposed Token | Current Raw Value | Evidence | Reason |
| --- | --- | --- | --- |
| `--color-border-muted` | `#e5e7eb` | 5 uses | repeated border role |

## Raw Value Clusters

Generated or checked with:

```bash
node scripts/scan-raw-values.mjs <target-repo>
```

| Value | Type | Count | Existing Token | Examples |
| --- | --- | --- | --- | --- |
| `#e5e7eb` | color | 5 | no | `components/Card.tsx:14` |
| `150ms` | motion | 3 | no | `components/Button.tsx:21` |

## Modes And Themes

No dark mode found in the example.

## Motion Tokens

| Token | Value | Source | Usage |
| --- | --- | --- | --- |
| `--motion-duration-control` | `150ms` | `components/Button.tsx:21` | hover/focus transition |

## DTCG Sidecar

Stable tokens may be mirrored into `tokens.dtcg.json` for tooling.
