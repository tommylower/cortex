---
name: component-libraries
description: UI component-library supply shelf. Use when saving a UI library, asking what Cortex has, choosing a component supplier, or when Studio needs existing component anatomy before building.
author: Cortex, with selection guidance adapted from Emil Kowalski (https://github.com/emilkowalski/skills)
---

# Component Libraries

Studio law decides how a component is built; this skill records and chooses
suppliers.

The task-first, one-recommendation selection posture is adapted from
[Emil Kowalski's `pick-ui-library`](https://github.com/emilkowalski/skills/tree/main/skills/pick-ui-library).

## Save

1. Read `references/catalog.md`, then verify the library's canonical source,
   license, delivery method, stack, and component focus.
2. Add or update one entry using every field in the catalog's adding
   instructions. Missing reuse permission requires `reference-only` status.

Completion requires one co-located entry with no unknown represented as fact.

## Browse or Choose

For a browse-only request, read `references/catalog.md`, return only entries
matching the stated interest, and stop.

For a project choice:

1. Name the task before naming a supplier. Treat a requested library as a
   candidate, not the requirement. Read Studio's current behavior-engine default in
   `../../workflows/studio/rules.md`, then inspect the target project's
   component configuration. Continue only when the project's engine and
   delivery model are explicit.
2. Search the project for an existing component that already satisfies the
   need. Continue only when a library pull will not duplicate or unknowingly
   overwrite project-owned behavior.
3. Read `references/catalog.md` and inspect only entries matching the stated
   need. Recommend one supplier by default. Give a comparison only when two
   candidates remain genuinely viable, or say clearly that none fits.
4. Before installing or copying, verify the current upstream source, license,
   dependencies, delivery method, and supported states. A missing reuse grant
   makes the entry reference-only.
5. Read and apply
   `../../workflows/studio/doctrine/component-intake.md`. Completion requires
   behavior, grammar, and skin to be separated; every relevant state verified;
   and the project's build checks passing.
