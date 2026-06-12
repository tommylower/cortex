# components

this file documents repeated parts, their variants, and their states.

## buttons

variants:

| variant | use |
| --- | --- |
| primary | one main action per region |
| secondary | common commands and reversible actions |
| ghost | toolbar actions and low-emphasis commands |
| danger | destructive actions after confirmation |

rules:

- buttons use semantic tokens, not raw color values.
- icon-only buttons need accessible labels.
- primary buttons should not be used for every action in a toolbar.
- danger buttons should not use the primary accent color.

states:

- hover adjusts background or border, not size.
- focus uses `focus` or `accent` ring depending on final token mapping.
- disabled state is visible but not decorative.

## panels

use panels for grouped controls, summaries, and repeated tools.

do not put full page sections inside nested panels.

## chips and status

chips are for filters or compact states.

status dots can use `success`, `warning`, `danger`, and `info`, but labels must stay textual for accessibility.

## forms

- labels sit above controls in forms.
- inline labels are reserved for dense filter bars.
- validation copy appears below the field.
- destructive confirmation should require a clear user action.

open decisions:

- table component variants.
- command menu behavior.
- toast and alert patterns.
