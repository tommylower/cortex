# Workspace contract

## One workspace per folder

`workspace/` is the operator layer for one folder: a repository, a standalone
engagement, or an umbrella over several repositories. Each folder you work in
keeps its own, so a session working in a folder reads and writes that folder's
workspace.

An umbrella's workspace holds only material that spans its children and
routes to them. Each child repository keeps its own workspace inside the
repository, created when it first has real material. Don't keep a child's
material in a subfolder of the umbrella workspace: a `projects/<child>/`
folder duplicates the child's own folder, splits its truth, and lets sessions
working on different children collide.

A package, generated directory, dependency checkout, category folder, or
archive gets no workspace. A collection of packages keeps one workspace for
the collection.

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

For an umbrella, map the child repositories and their workspaces here and
explain their handoffs. Keep mutable status out of this router.

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
  outside the authored repository, or is explicitly ignored. A workspace is a
  plain folder: no nested Git repository inside it. A child repository's
  workspace is local by default: ignore it with `/workspace/` in that
  repository's `.git/info/exclude`, which stays on this machine and changes
  no tracked file. Tools that don't read git's ignore rules still see an ignored folder
  (a local deploy CLI uploads it unless its own ignore file excludes it), and
  `git clean -x` deletes it; check both before creating one.
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
| `WRAP-UP.md` | A finished work block produced a decision or lesson for the operator's own notes. It holds only what hasn't been sent there yet; delete it once it's sent. |
| `inbox/` | Unprocessed material actually arrives and needs an explicit landing place. |
| `plans/` | An approved active effort needs more detail than the changing-state file can hold. |
| `references/` | Outside source material must be retained, understood, and connected to active work. |
| `handoffs/` | Paused work needs restart notes that outlive one session. |

Do not create empty optional files or directories. Do not add a second status
ledger, decision system, archive, or task tracker under another name.

Code isn't operator material. Keep worktrees and build snapshots out of
workspaces, and move frozen ones to the archive with the project's other
historical material.

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

For an umbrella, its workspace owns cross-repository decisions, handoffs, and
shared open loops. A child workspace owns only that child's work and links
upward for shared context.

## Front doors that stay fresh

Every folder in scope has an `AGENTS.md` (rules and routing; `CLAUDE.md` links
to it or imports it with `@AGENTS.md`) and a root `README.md` (what the folder
is and a map of what's inside). An umbrella's README also lists child
repositories that aren't checked out on this machine, each with what it is and
its clone command, so a missing folder reads as a choice, not a loss. Keep a
checkout only while someone works on it.

## Sessions and parallel agents

- **Start:** read the folder's `AGENTS.md`, then `workspace/PROJECT.md`, then
  `git status` and `git worktree list`. Uncommitted work you didn't make
  belongs to someone else: leave it and say so.
- **Parallel work:** one agent per checkout. A second agent works in a
  worktree outside the project tree (for example `~/.worktrees/<repo>/<branch>`),
  never inside a workspace or an archive.
- **End:** commit or state why not; remove your worktree once its branch is
  merged and delete merged branches; update `PROJECT.md`'s Current and Next;
  leave no stash, scratch file or build snapshot behind.

## Elevation

A workspace note becomes truth by a copy into its owner, one level at a time:
the repository (an issue, a PR, its decision record), then the umbrella (its
workspace or policy repository), then the operator's own notes through a
`WRAP-UP.md`. Each level links to the one below; none mirrors another's state.

## Drift check

Run a hygiene check over the code root on a schedule and before calling a
cleanup done. It should report linked worktrees, branches already merged,
local-only commits and uncommitted changes older than a week, stashes, nested
Git inside workspaces, and folders missing `AGENTS.md`. Fix findings in the
folder's own next session; don't let them pile up.

## Naming and collisions

Use `workspace/` for this operator layer. Do not introduce active aliases such
as `control/`, `control-room/`, or `project-hq/`.

If `workspace/` already has an unrelated build, package-manager, or runtime
meaning, stop and surface the collision. Do not overwrite it or silently give
two concepts the same path.

If a repository's tracked files already use `workspace/` to mean the
umbrella's lane (for example, policy saying capture lives in
`workspace/INBOX.md`), don't create a workspace inside that repository. Its
operator material belongs to the umbrella.
