# {{project_name}} Design System

status: draft
source of truth: code at `{{repo_url}}` / `{{short_sha}}`
unresolved:

- {{decision_or_gap}}

This package was derived from the implementation. When this package and the code disagree, the code wins and the package should be re-derived.

## How To Read This

- [`SKILL.md`](SKILL.md) tells agents how to use this package.
- [`AGENTS.md`](AGENTS.md) gives repo-local operating rules for future agents.
- [`references/tokens.md`](references/tokens.md) names the token contract.
- [`references/architecture.md`](references/architecture.md) maps system layers to real paths.
- [`references/components.md`](references/components.md) records component anatomy.
- [`references/platform-mapping.md`](references/platform-mapping.md) explains how the package maps to the actual stack.

## Provenance

| Field | Value |
| --- | --- |
| repo | `{{repo_url}}` |
| branch | `{{branch}}` |
| commit | `{{short_sha}}` |
| derived on | `{{date}}` |
| production truth | `yes/no/reference-only` |

## Package Status

- `none`: no usable system yet
- `draft`: useful notes, not safe for autonomous use
- `partial`: some areas usable, unresolved gaps remain
- `ready`: future agents can create conforming work from this package alone
- `archived`: historical reference only

## Current Scope

{{surfaces_or_flows_covered}}

## Unresolved

- {{unresolved_item}}

If there are no unresolved items, write `unresolved: none` above and `none` here.
