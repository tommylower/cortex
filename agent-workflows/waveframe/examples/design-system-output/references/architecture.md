# architecture

this file describes the structure of the interface and how layout decisions map into implementation.

## shell

the default product shell has:

- persistent left navigation on desktop.
- top utility row for search, account, and environment controls.
- main content region with a maximum readable width only when the screen type needs it.
- full-width data screens when comparison and scanning matter.

## layout primitives

use these primitive names in code or design docs:

- `AppShell` for persistent navigation and page chrome.
- `PageHeader` for title, metadata, and primary action.
- `Toolbar` for filtering, search, sorting, and view controls.
- `Panel` for grouped controls or summary regions.
- `DataList` for repeated rows.
- `MetricStrip` for compact status summaries.

## responsive strategy

- below `760px`, navigation collapses into a compact top-level menu.
- data tables should become stacked records only when column comparison is no longer useful.
- toolbars wrap into two rows before controls are hidden.
- primary actions stay reachable in the page header or bottom action region.

## source of truth

in a real project, list the actual paths here:

```text
src/app/layout.tsx
src/app/globals.css
src/components/app-shell.tsx
src/components/page-header.tsx
src/components/ui/panel.tsx
```

open decisions:

- exact navigation behavior on mobile.
- whether filters persist in the URL.
- whether page chrome is owned by app routes or shared layout components.
