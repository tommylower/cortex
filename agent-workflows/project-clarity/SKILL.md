---
name: project-clarity
description: Workspace operator-layer establishment and repair for code projects. Use when starting a project, organizing an existing repository or multi-repository engagement, migrating a control-room or planning layer, or reducing duplicated project documentation. Use improve for codebase audits and project-defaults for web stack conventions.
---

# Project Clarity

Use `workspace/` as the literal folder name and the leading concept. Every
independently operated code project gets one workspace: the operator layer for
understanding, coordinating, and maintaining the project without competing
with its code, product documentation, or external systems of record.

A workspace should answer:

- What is this project?
- What is happening now?
- What comes next, and what is blocked?
- Which open loops still matter?
- Where does each kind of truth live?
- Which durable decisions or rules constrain the work?

## 1. Set the project boundary

Find the independently operated project root. A repository, standalone
engagement, or multi-repository umbrella can be a project; a package, generated
directory, dependency checkout, category folder, or archive is not one unless
it has its own work lifecycle.

For nested projects, the parent workspace owns only cross-project coordination.
Each independently operated child owns its local work. Do not mirror state
between them.

**Complete when:** you can name every project root in scope and state, in one
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
- canonical truth owned by code, another repository, or an external system;
- historical or disposable material.

**Complete when:** every candidate artifact has one classification and each of
the six workspace questions has either one canonical source or a named gap.

## 3. Choose the action branch

Read [the workspace contract](references/workspace-contract.md) before
proposing, establishing, migrating, or maintaining a workspace.

If files, folders, terminology, or sources of truth must move or consolidate,
also read [the migration procedure](references/migration.md) before proposing
the move.

- **Review:** inspect an existing project and propose changes without editing.
- **Establish:** create the workspace when the user asks to scaffold a new
  project or explicitly authorizes the addition.
- **Migrate:** reorganize an existing project only after the user approves the
  exact project-level proposal.
- **Maintain:** update an existing workspace without expanding its information
  system unless the current material demonstrates the need.

When the request is ambiguous, use Review.

**Complete when:** the required reference is loaded and the permitted action
boundary—review or edit—is explicit.

## 4. Propose or implement

For Review, return:

```text
Scope:
Workspace role:
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
canonical truth instead of copying it.

**Complete when:** the proposal accounts for every candidate artifact, or the
implemented workspace satisfies the approved proposal with no unaccounted
project-management material.

## 5. Verify the workspace

Check all of the following:

- `workspace/` is the only active name for the operator layer;
- the root front door and the workspace router have distinct roles;
- changing state has one easy-to-update home;
- links and moved-path references resolve;
- parent and child workspaces do not mirror each other's state;
- optional files and folders contain real material;
- sharing and privacy boundaries are explicit;
- credentials and secret values are absent.

**Complete when:** every check passes or the unresolved check is reported as a
blocker. Do not continue to another project without separate approval.

## Boundaries

This skill manages project information. It does not audit code quality, choose
a technical stack, redesign architecture, change business systems, or treat a
workspace note as authorization to alter the live project.
