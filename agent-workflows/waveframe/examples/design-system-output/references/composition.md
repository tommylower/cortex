# composition

this file explains how surfaces, sections, and repeated blocks should sit together.

## general rhythm

northstar uses compact, aligned layouts.

- keep page headers shallow.
- avoid wrapping every section in a large decorative card.
- use table, list, and panel boundaries for structure.
- let whitespace separate major regions, then use borders inside dense regions.

## surface hierarchy

| level | treatment | examples |
| --- | --- | --- |
| canvas | `background` | page background |
| base surface | `surface` with subtle border | rows, forms, panels |
| raised surface | `surface-raised` with subtle border | nav, toolbar, sticky header |
| overlay | `surface` with shadow | menu, dialog, popover |

## page structure

typical dashboard page:

1. page header.
2. optional metric strip.
3. toolbar.
4. primary list, table, or workflow area.
5. secondary notes or detail panel when needed.

## density

- default row height: `44px`.
- compact row height: `36px`.
- panel padding: `16px`.
- page gutter: `24px` desktop, `16px` mobile.

open decisions:

- empty-state composition.
- split-pane detail behavior.
- whether charts get a separate composition rule set.
