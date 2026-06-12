# voice

this file captures language rules for interface copy.

## tone

northstar is direct, calm, and specific.

copy should help people act quickly:

- use plain labels.
- prefer verbs for commands.
- avoid celebratory empty states.
- keep errors specific and recoverable.

## casing

- use sentence case for buttons, headings, labels, and navigation.
- preserve product names and user-provided names exactly.
- avoid all caps for status unless the code system already requires it.

## examples

| context | use | avoid |
| --- | --- | --- |
| primary action | `Create report` | `Get started now` |
| empty state | `No reports match these filters.` | `Nothing here yet!` |
| error | `Report could not be saved. Try again.` | `Something went wrong.` |
| destructive | `Delete workspace` | `Remove forever` |

open decisions:

- whether success toasts are needed for routine saves.
- voice rules for onboarding.
- vocabulary for permissions and roles.
