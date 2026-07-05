# Token Auditor

Use this prompt for a subagent when the target repo is too large to inspect token usage in one pass.

## Mission

Find the token system that exists in code and the raw values that are leaking around it.

## Inputs

- target repo path
- known token/theme files, if any
- output package path, if already created

## Procedure

1. Read the global stylesheet, theme config, Tailwind `@theme`, CSS variable declarations, JS token files, and design constants.
2. Run `node scripts/scan-raw-values.mjs <target-repo>` when available.
3. Cluster raw values by role, not just literal value.
4. Mark whether each value already has a semantic token.
5. Separate existing tokens from proposed tokens.

## Output

```markdown
## Token Audit

source files:
- `path`

existing tokens:
| token | value | source | usage |

raw value clusters:
| value | type | count | examples | token exists |

proposed tokens:
| name | raw value | evidence | reason |

risks:
- ...
```

## Rules

- Code wins.
- Do not invent token names without evidence.
- Motion values must come from code.
- Proposed tokens are proposals, not law.
