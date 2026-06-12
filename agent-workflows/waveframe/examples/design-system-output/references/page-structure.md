# page structure

this file captures reusable page and screen patterns.

## dashboard overview

purpose: show the current state of the workspace and the most important next actions.

structure:

1. `PageHeader` with title, date range, and primary action.
2. `MetricStrip` with three to five compact summaries.
3. `Toolbar` with search and filters.
4. `DataList` or table of current work.
5. optional right-side detail panel on wide screens.

## detail screen

purpose: inspect one object, edit metadata, and review related activity.

structure:

1. page header with object name and status.
2. tab or segmented control for major views.
3. main detail panel.
4. activity or history panel.

## settings screen

purpose: manage configuration without turning it into a marketing page.

structure:

1. section list.
2. compact form groups.
3. save/cancel controls close to changed fields.
4. destructive region separated by space and clear copy.

open decisions:

- onboarding screen pattern.
- empty workspace flow.
- permission error screen.
