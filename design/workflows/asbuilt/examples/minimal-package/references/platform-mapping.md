# Platform Mapping

## Framework And Runtime

| Item | Value |
| --- | --- |
| framework | Next.js |
| package manager | pnpm |
| styling | Tailwind plus CSS variables |
| component libraries | local primitives |

## Real Paths

| Surface | Path |
| --- | --- |
| global stylesheet | `app/globals.css` |
| token source | `app/globals.css` |
| component root | `components/` |
| app shell | `app/layout.tsx` |
| tests/stories | none found |

## Translation Layer

CSS variables are declared in `app/globals.css` and consumed through utility classes and direct `var(...)` references.

## Dependencies

Runtime dependencies that affect design-system behavior:

| Dependency | Used For | Evidence |
| --- | --- | --- |
| `lucide-react` | icons | `components/ui/Button.tsx:2` |

## Build And Verification Commands

```bash
pnpm install
pnpm lint
pnpm build
```

## Divergences

| Divergence | Code Evidence | Package Decision |
| --- | --- | --- |
| border color is raw | `components/Hero.tsx:18` | proposed `--color-border-muted` |

## Re-Derivation Note

Re-run `asbuilt` when component paths, token files, styling strategy, or behavior floors change.
