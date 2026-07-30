# studio audit report

Use this shape for the final answer and for
`docs/design-audit/studio-audit.md` when a durable report is written.

```markdown
# Studio Audit - <target>, <date>

Verdict: ship | fix first | review again

## Coverage

- Mode:
- Target and boundary:
- Stack and conventions:

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | files, states, keyboard/assistive checks | clear / findings / not covered |
| Layout | viewports, reading order, responsive behavior | clear / findings / not covered |
| Writing | labels, errors, empty states, flow copy | clear / findings / not covered |
| Typography | rendered hierarchy, wrapping, font behavior | clear / findings / not covered |
| Color | tokens, appearances, measured pairs | clear / findings / not covered |
| UI craft | surfaces, icons, motion, interaction feel | clear / findings / not covered |
| Live flow | routes and interactions | clear / findings / not covered |

## Top Findings

| Priority | Lens | Evidence | Issue | Fix |
| --- | --- | --- | --- | --- |
| P1 | hierarchy | route/screenshot/file | ... | ... |

One root cause gets one row. Respect the selected mode's finding cap.

## Considered but Rejected

| Location | Candidate | Rejected because |
| --- | --- | --- |
| ... | ... | project convention, insufficient evidence, or no user benefit |

Include only real candidates inspected during the review. A short table or no
candidate is better than invented restraint.

## Verification

- Passed:
- Not verified:

## Fix Now

1. ...

## Polish Later

1. ...
```

Keep the chat version compact: lead with the verdict and top findings. Move
supporting lens notes below the findings.
