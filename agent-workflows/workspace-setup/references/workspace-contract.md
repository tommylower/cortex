# Workspace contract

## One workspace per operated project

`workspace/` is the operator layer for one independently operated project. A
single-repository project normally places it in that repository. An umbrella
operated across several repositories may place one workspace at the umbrella
root and route to the child repositories from there.

Repository count does not determine workspace count. Create another workspace
only when a child has its own work lifecycle, changing state, decisions, and
operator boundary. A category folder alone does not earn a workspace.

## Core shape

The minimum workspace is:

```text
<project>/
└── workspace/
    ├── README.md
    └── PROJECT.md
```

Keep the stable product or repository front door in the root `README.md`. Keep
project-wide editing constraints and verification commands in the nearest
applicable `AGENTS.md`; moving them into `workspace/` would narrow their scope.
For a non-repository umbrella, the root README may be a thin pointer to
`workspace/README.md`.

Preserve useful root conventions in an existing project. Add or strengthen a
root `README.md` or `AGENTS.md` only when its product-facing, build-facing, or
instructional role is genuinely missing.

### `workspace/README.md`

Make this the stable operator router. It should identify:

- the workspace's scope and what it does not own;
- where each kind of work or information belongs;
- canonical repositories, documents, project agents, and external systems;
- how inbound or tentative material becomes verified project truth;
- the workspace's sharing, privacy, and durability boundary;
- who or what owns execution and how handoffs occur.

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
only when genuinely inapplicable; write `None` when an empty state is
meaningful.

## Choose the shape on three axes

The axes are independent. For example, an external project can be minimal and
tracked, coordinated and local, or mixed with a dedicated project agent.

### Coordination

- **Minimal:** use only `workspace/README.md` and `workspace/PROJECT.md`. Choose
  this when one compact current view and one router can hold the real work.
- **Coordinated:** add only the files or directories earned by multiple
  repositories, systems, handoffs, plans, access boundaries, or sustained
  inbound material.

### Sharing

- **Local:** private operator material remains inside the project boundary but
  outside the authored repository, or is explicitly ignored. A nested local
  Git repository with no remote may version it when independent local history
  is useful; do not introduce nested Git by default.
- **Tracked:** the workspace is safe for the repository's audience and is
  reviewed with the code.
- **Mixed:** a tracked safe router or shared state is separated explicitly from
  ignored local material. Tracked documentation must not depend on ignored
  files as though every collaborator has them.

Treat client and personal material as private unless the project explicitly
defines a shareable surface. Keep credentials, tokens, recovery codes, and
secret-bearing URLs out of every mode.

### Execution ownership

- **General operator:** the workspace itself is the primary human-and-agent
  coordination surface, subject to any external systems of record.
- **Dedicated project agent:** the workspace describes what the agent may see,
  what it owns, where inputs arrive, how work is routed, and how outputs are
  elevated. The agent's own task, status, memory, or record system remains
  canonical; do not build a competing copy in the workspace.

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
- The nearest independently operated child project owns its local
  implementation state.
- Dedicated project agents and external applications retain the tasks,
  records, memory, and live state assigned to them.
- Workspace notes may receive, propose, connect, route, and verify. They do not
  change another source merely by existing.

For nested projects, the parent workspace owns cross-project decisions,
handoffs, and shared open loops. A child workspace owns only its independent
local work and links upward for shared context.

## Naming and collisions

Use `workspace/` for this operator layer. Do not introduce active aliases such
as `control/`, `control-room/`, or `project-hq/`.

If `workspace/` already has an unrelated build, package-manager, or runtime
meaning, stop and surface the collision. Do not overwrite it or silently give
two concepts the same path.
