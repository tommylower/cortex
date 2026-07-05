# studio audit report

Use this shape for the final answer and for
`docs/design-audit/studio-audit.md` when a durable report is written.

```markdown
# Studio Audit - <target>, <date>

Verdict: ship | fix first | review again

## Coverage

- Target:
- Surfaces reviewed:
- Viewports:
- Live flow:
- Not covered:

## Top Findings

| Priority | Lens | Evidence | Issue | Fix |
| --- | --- | --- | --- | --- |
| P1 | hierarchy | route/screenshot/file | ... | ... |

## Lens Notes

### Studio Law

Clarity, hierarchy, trust, visual confidence, and generated-design residue.

### Static Preflight

Accessibility, visual consistency, code-level UI risks, and AI-pattern tells.

### Responsive

Mobile, tablet, desktop, in-between widths, overflow, sticky/fixed behavior, and
touch constraints.

### Live Flow

First impressions, navigation, states, trust, and conversion path.

### Craft

Composition, density, typography, spacing rhythm, component cohesion, motion,
feedback, and interaction feel.

## Fix Now

1. ...

## Polish Later

1. ...
```

Keep the chat version compact: lead with the verdict and top findings. Move
supporting lens notes below the findings.
