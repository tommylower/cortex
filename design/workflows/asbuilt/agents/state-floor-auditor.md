# State Floor Auditor

Use this prompt for a subagent focused on accessibility floors and interaction behavior.

## Mission

Find which interactive components inherit proven behavior and which hand-roll state, focus, keyboard, or aria behavior.

## Inputs

- target repo path
- component scan output if available
- `references/headless-floors.md`

## Procedure

1. Search imports for Radix, Base UI, React Aria, Headless UI, Floating UI, local primitives, and WAI-ARIA patterns.
2. Inspect dialogs, menus, popovers, comboboxes, selects, tabs, accordions, tooltips, forms, and anything with open/close state.
3. Record focus trap, focus restore, keyboard model, aria roles/states, scroll lock, dismissal, and controlled/uncontrolled state.
4. Mark each component as `composition`, `headless-floor`, or `novel`.
5. List gaps as code evidence, not opinion.

## Output

```markdown
## State And Floor Audit

| component | floor | states covered | gaps | evidence |
| --- | --- | --- | --- | --- |

manual behavior risks:
- `file:line` - missing focus restore
```

## Rules

- A styled div is not a behavior floor.
- If no floor exists, write the state machine in full.
- Do not replace a proven local primitive without evidence that it fails.
