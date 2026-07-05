# Architecture

## Strata

| Layer | Purpose | Real Paths |
| --- | --- | --- |
| tokens | semantic values and theme contract | `{{path}}` |
| primitives | lowest reusable UI parts | `{{path}}` |
| components | reusable compositions | `{{path}}` |
| screens | route/page-specific assembly | `{{path}}` |

## Dependency Rule

References point downward:

```text
screens -> components -> primitives -> tokens
```

Violations:

- `{{file:line}}` imports {{violation}}

## Mechanical Checks

Run or reproduce:

```bash
node scripts/scan-raw-values.mjs <target-repo>
node scripts/scan-components.mjs <target-repo>
```

Additional project checks:

```bash
{{lint_or_typecheck_command}}
```

## Shell And Layout

{{root app shell, layout constraints, viewport strategy, responsive rules}}

## Responsive Strategy

{{breakpoints, container queries, density shifts, mobile differences}}

## Known Violations

| Violation | Evidence | Impact | Proposed Fix |
| --- | --- | --- | --- |
| {{violation}} | `{{file:line}}` | {{impact}} | {{fix}} |
