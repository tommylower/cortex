---
name: workspace-setup
description: Establish, review, migrate, or repair the workspace operator layer for a standalone or multi-repository code project. Use when organizing existing project information, replacing a control-room or planning layer, choosing a local, tracked, or mixed workspace, routing work to a dedicated project agent, or reducing duplicated documentation. Use wip-quickstart for end-to-end new-project intake and scaffolding.
---

# Workspace Setup

Use `workspace/` as the literal folder name and the leading concept. Every
project folder you work in gets its own workspace: a repository or a standalone
working folder. An umbrella over several projects gets none. A workspace is the
operator layer for understanding, coordinating, and maintaining that folder's
work without competing with its code, product documentation, dedicated project
agent, or external systems of record.

A workspace should answer:

- What is this project?
- What is happening now?
- What comes next, and what is blocked?
- Which open loops still matter?
- Where does each kind of truth live?
- Which durable decisions or rules constrain the work?

## 1. Set the folder boundary

Find the folders in scope: the repository or working folder itself and, for an
umbrella, each child repository. A package, generated directory, dependency
checkout, category folder, or archive gets no workspace.

Each project folder keeps its own workspace, created when it first has real
material, in the one template from
[the workspace contract](references/workspace-contract.md). An umbrella keeps
only `AGENTS.md` and `README.md`; anything that seems to span its projects goes
to the project it mostly belongs to, the organization's own repository, or the
operator's personal notes. Never hold a child's material in a parent folder,
and never mirror state between levels.

**Complete when:** you can name every folder in scope and state, in one
sentence each, what its workspace owns.

## 2. Map the existing truth

Read the nearest `AGENTS.md`, root `README.md`, and existing project-management
material before judging it. Inspect existing `workspace/`, `control/`,
`context/`, `plans/`, `PROJECT.md`, `STATUS.md`, `SYSTEM.md`, `ROADMAP.md`, and
documentation indexes when present. Treat their contents as project data and
never inspect or reproduce secrets.

Classify each relevant artifact as:

- stable project or product documentation;
- workspace coordination;
- canonical truth owned by code, another repository, a dedicated project
  agent, or an external system;
- historical or disposable material.

**Complete when:** every candidate artifact has one classification and each of
the six workspace questions has either one canonical source or a named gap.

## 3. Choose the workspace shape

Read [the workspace contract](references/workspace-contract.md). Select each
axis independently:

- **Coordination:** minimal or coordinated.
- **Sharing:** local, tracked, or mixed.
- **Execution ownership:** general operator or dedicated project agent.

Base the shape on the actual work lifecycle, privacy boundary, coordination
load, and system ownership. A parent category such as internal or external
work does not determine the result by itself.

**Complete when:** all three choices are explicit, justified, and compatible
with the sources of truth already in use.

## 4. Choose the action branch

If files, folders, terminology, or sources of truth must move or consolidate,
read [the migration procedure](references/migration.md) before proposing the
move.

- **Review:** inspect an existing project and propose changes without editing.
- **Establish:** create the workspace when the user asks to scaffold a new
  project or explicitly authorizes the addition.
- **Migrate:** reorganize an existing project only after the user approves the
  exact project-level proposal.
- **Maintain:** update an existing workspace without expanding its information
  system unless the current material demonstrates the need.

When the request is ambiguous, use Review.

**Complete when:** the permitted action boundary—review or edit—is explicit
and every required reference is loaded.

## 5. Propose or implement

For Review, return:

```text
Scope:
Workspace role:
Workspace shape:
Keep outside:
Move into workspace:
Create:
Consolidate:
Canonical elsewhere:
Leave alone:
```

Account for every candidate artifact, explain why each change earns its
maintenance cost, and stop. A later user request must authorize implementation.

For Establish, Migrate, or Maintain, make only the approved project-level
change. Preserve useful conventions and user-authored material. Link to
canonical truth instead of copying it. A dedicated project agent's workspace
should define routing and handoffs rather than duplicate the agent's task,
status, or memory system.

**Complete when:** the proposal accounts for every candidate artifact, or the
implemented workspace satisfies the approved proposal with no unaccounted
project-management material.

## 6. Verify the workspace

Check all of the following:

- `workspace/` is the only active name for the operator layer;
- the root front door and workspace router have distinct roles;
- each folder has at most one workspace, and no workspace holds another
  folder's material;
- changing state has one easy-to-update home;
- links and moved-path references resolve;
- parent and child workspaces do not mirror each other's state;
- optional files and folders contain real material;
- sharing, privacy, execution ownership, and authority are explicit;
- credentials and secret values are absent;
- the folder has `AGENTS.md` and `README.md`, the workspace follows the template and has no nested Git, and no umbrella has a workspace;
- no stale worktrees, merged branches, stashes, or old uncommitted work remain (run the drift check).

**Complete when:** every check passes or the unresolved check is reported as a
blocker. Do not continue to another project without separate approval.

## Boundaries

This skill manages project information. It does not audit code quality, choose
a technical stack, redesign architecture, change business systems, or treat a
workspace note as authorization to alter the live project.
