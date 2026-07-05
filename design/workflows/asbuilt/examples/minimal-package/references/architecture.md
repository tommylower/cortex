# Architecture

## Strata

| Layer | Purpose | Real Paths |
| --- | --- | --- |
| tokens | CSS variables and Tailwind bridge | `app/globals.css` |
| primitives | Button, Card | `components/ui/*` |
| components | feature sections | `components/*` |
| screens | route assembly | `app/page.tsx` |

## Dependency Rule

```text
screens -> components -> primitives -> tokens
```

Violations:

- `components/Hero.tsx:18` uses raw border color instead of token.

## Mechanical Checks

```bash
node scripts/scan-raw-values.mjs <target-repo>
node scripts/scan-components.mjs <target-repo>
```

Additional project checks:

```bash
pnpm lint
pnpm build
```

## Shell And Layout

`app/layout.tsx` owns the document shell. `app/page.tsx` composes the visible app surface.

## Responsive Strategy

Single-column mobile layout shifts to two-column content panels at the medium breakpoint.

## Known Violations

| Violation | Evidence | Impact | Proposed Fix |
| --- | --- | --- | --- |
| raw border color | `components/Hero.tsx:18` | repeated color role | add `--color-border-muted` |
