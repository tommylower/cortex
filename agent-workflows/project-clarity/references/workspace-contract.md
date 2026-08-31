# Workspace contract

## Core shape

The core project-information layer is:

```text
<project>/
├── README.md
├── AGENTS.md
└── workspace/
    ├── README.md
    └── PROJECT.md
```

For an existing project, preserve useful root conventions. Add or strengthen a
root `README.md` or `AGENTS.md` only when its product-facing or build-facing
role is genuinely missing.

### Root `README.md`

Keep the stable product or repository front door at the root. It explains what
the project is, how to use or run it, and where durable technical material
lives. For a non-repository umbrella, it may be a thin pointer to
`workspace/README.md`.

### Root `AGENTS.md`

Keep project-wide editing constraints and verification commands where they
apply to the code. Do not move them into `workspace/`, where their scope would
no longer cover root-level work.

### `workspace/README.md`

Make this the stable operator router. It should identify:

- the workspace's scope and what it does not own;
- where each kind of work or information belongs;
- canonical repositories, documents, and external systems;
- how tentative workspace material becomes verified project truth;
- the workspace's sharing, privacy, and durability boundary.

For a multi-repository project, map the child repositories here and explain
their handoffs. Keep mutable status out of this router.

### `workspace/PROJECT.md`

Make this the shortest useful management view:

```markdown
# Project

## Purpose

## Current

## Next

## Open loops

## Map

## Key decisions
```

Keep each section compact. Link to detail instead of copying it. Omit a section
only when it is genuinely inapplicable; write `None` when an empty state is
meaningful.

## Earned additions

Add these only when real material no longer fits the two core files:

| Path | Add when |
| --- | --- |
| `WORKING.md` | One active effort needs a detailed, frequently updated view. `PROJECT.md` links to it instead of mirroring it. |
| `BACKLOG.md` | Future work has outgrown a short Open loops section. |
| `DECISIONS.md` | Durable choices would cost meaningful time to reconstruct. |
| `SYSTEM.md` | Several repositories or systems need one human-readable authority and flow map. |
| `ACCESS.md` | Access scopes, account names, or recovery pointers need a home. Never store secret values. |
| `AGENTS.md` | Maintaining the workspace requires constraints not already supplied by project or global guidance. |
| `inbox/` | Unprocessed material actually arrives and needs an explicit landing place. |
| `plans/` | An approved active effort needs more detail than the changing-state file can hold. |
| `references/` | Outside source material must be retained, understood, and connected to active work. |

Do not create empty optional files or directories. Do not add a second status
ledger, decision system, archive, or task tracker under another name.

## Authority model

The workspace is an operator layer, not a runtime or business system of record.

```text
input -> workspace deliberation -> build -> verify -> canonical project truth
```

- Code and its tests own implemented behavior.
- Root project documentation owns stable product and developer guidance.
- The nearest child project owns its local implementation state.
- External applications retain the tasks, records, and live state assigned to
  them.
- Workspace notes may propose, connect, and verify. They do not change another
  source merely by existing.

For nested projects, the parent workspace owns cross-project decisions,
handoffs, and shared open loops. A child workspace owns only its local work and
links upward for shared context.

## Sharing boundary

Choose and state one sharing mode:

- **Tracked:** safe for the repository's audience and reviewed with the code.
- **Local:** private operator material, ignored or outside the authored
  repository while remaining inside the project root.
- **Mixed:** a tracked safe router with explicitly separated local material.

Do not make tracked documentation link to ignored files as though they exist
for every collaborator. Treat client material as private unless the project
explicitly defines a shareable surface. Keep credentials, tokens, recovery
codes, and secret-bearing URLs out of every mode.

## Naming and collisions

Use `workspace/` for this operator layer. Do not introduce active aliases such
as `control/`, `control-room/`, or `project-hq/`.

If `workspace/` already has an unrelated build, package-manager, or runtime
meaning, stop and surface the collision. Do not overwrite it or silently give
two concepts the same path.
