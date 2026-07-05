# Headless Floors

Use this reference when deriving interactive components. The rule is simple:
borrow behavior floors when they exist; rebuild only the skin.

## Floor Checklist

For each interactive component, record:

- component name and target file
- floor used: existing local primitive, Radix, Base UI, React Aria, WAI-ARIA/manual, or none
- keyboard model
- focus behavior
- aria roles/states
- open/close control model
- scroll lock / dismissal / focus restore when relevant
- gaps versus the expected pattern

## Common Floors

| Pattern | Prefer Existing Floor For | Notes |
| --- | --- | --- |
| Dialog / sheet / modal | focus trap, escape, restore, aria labeling, scroll lock | WAI-ARIA modal dialogs keep tab focus inside the dialog. Radix Dialog traps focus in modal mode. |
| Alert dialog | focus trap, screen reader announcement, destructive confirmation flow | Treat as stronger than a generic modal. |
| Popover | trigger relationship, dismissal, positioning, focus behavior | Check whether it is modal or non-modal. |
| Menu / dropdown menu | roving focus, typeahead, arrow keys, dismissal | Do not replace with a styled div list. |
| Combobox / autocomplete | text input semantics, listbox relationship, keyboard model, active option state | Prefer a mature floor when possible. |
| Select | trigger/value/listbox behavior, keyboard selection, typeahead | Native select may be enough; custom select needs a floor. |
| Tabs | roving focus, selected tab state, panel relationship | Capture activation mode when implemented. |
| Accordion / disclosure | expanded state, heading relationship, keyboard support | Record whether multiple panels can be open. |
| Tooltip | hover/focus trigger behavior, delay, accessible description | Never hide required information only in a tooltip. |

## Source Guidance

- WAI-ARIA APG defines expected roles, states, and keyboard patterns for common widgets.
- Radix Primitives, Base UI, and React Aria provide unstyled behavior floors.
- If the target already has a local primitive, inspect it first. Do not replace a proven local floor just because a public library exists.

## Output Rule

In `references/components.md`, every interactive component card must name its floor. If no floor exists, mark it `novel` and write the state machine in full.
