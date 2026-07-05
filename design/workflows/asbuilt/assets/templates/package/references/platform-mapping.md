# Platform Mapping

## Framework And Runtime

| Item | Value |
| --- | --- |
| framework | {{Next.js / React / Vue / other}} |
| package manager | {{pnpm / npm / bun / yarn}} |
| styling | {{Tailwind / CSS modules / CSS vars / other}} |
| component libraries | {{Radix / Base UI / React Aria / shadcn / local}} |

## Real Paths

| Surface | Path |
| --- | --- |
| global stylesheet | `{{path}}` |
| token source | `{{path}}` |
| component root | `{{path}}` |
| app shell | `{{path}}` |
| tests/stories | `{{path}}` |

## Translation Layer

{{how semantic tokens map to CSS variables, Tailwind @theme, config files, JS constants, or another local system}}

## Dependencies

Runtime dependencies that affect design-system behavior:

| Dependency | Used For | Evidence |
| --- | --- | --- |
| `{{package}}` | {{purpose}} | `{{file:line}}` |

## Build And Verification Commands

```bash
{{install_command}}
{{typecheck_command}}
{{lint_command}}
{{test_command}}
{{build_command}}
```

## Divergences

| Divergence | Code Evidence | Package Decision |
| --- | --- | --- |
| {{divergence}} | `{{file:line}}` | {{decision}} |

## Re-Derivation Note

Re-run `asbuilt` when component paths, token files, styling strategy, or behavior floors change.
