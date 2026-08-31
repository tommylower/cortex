---
name: wip-quickstart
description: New-project intake and scaffold workflow for turning a rough brief, voice dump, or idea into an operable code project. Use when the user wants to start, scaffold, bootstrap, or set defaults for a project. It establishes the right workspace through workspace-setup and applies the Cortex web defaults when appropriate. Use workspace-setup directly for workspace-only review, repair, or migration.
---

# WIP Quickstart

Turn the context the user already supplied into a compact project brief, fill
only the gaps that affect the project shape, and then create the smallest
operable project. Do not make the user repeat facts from a voice note, ticket,
conversation, document, or existing directory.

## 1. Set the action boundary

Classify the request as one of these modes:

- **Brief:** clarify the project and return a ready-to-use project brief.
- **Propose:** inspect context and propose the scaffold without editing.
- **Scaffold:** create or update the local project after the user asks to
  start, create, bootstrap, or scaffold it.

Scaffold mode authorizes the necessary local files. It does not authorize
creating a remote repository, pushing, deploying, writing to an external
system, purchasing anything, or exposing private material unless the user also
requests that action.

**Complete when:** the permitted local and external actions are explicit.

## 2. Extract known facts before asking questions

Read the supplied context and inspect the target path when one exists. Record
what is already known about:

- the project, intended user, and desired outcome;
- whether it is personal, team, client, or public work;
- whether it is new, existing, standalone, or a multi-repository project;
- what may be shared and what must remain local;
- whether a dedicated project agent or external system already owns part of
  the workflow;
- whether it is a web project and any requested deviation from the defaults;
- its intended local category and path;
- its GitHub owner or account and deployment target, when relevant.

Treat contradictions as gaps. Do not turn every topic above into a required
field.

**Complete when:** every fact in the source material has been captured once,
and only material unknowns remain.

## 3. Ask only material questions

Ask a short batch of questions covering only choices that would change the
scaffold, authority, privacy boundary, or destination. Prefer plain questions
that the user can answer conversationally. Accept another voice dump as the
answer.

Typical material gaps are:

1. What are you making, for whom, and what outcome marks a useful first
   version?
2. Is this personal, team, client, or public work, and what may be shared?
3. Is this a new standalone project, an existing project, or one operated
   umbrella over several repositories?
4. Does a dedicated project agent or external system already own tasks,
   decisions, records, or execution?
5. Is it a web project, and should any standard technical default change?
6. Where should it live locally, and which remote owner and deploy target
   apply if those actions are in scope?

Skip answered or irrelevant questions. Do not ask for secrets or secret
values.

**Complete when:** no unanswered choice would materially change the proposed
local result.

## 4. Form the project brief

Summarize the working contract in this shape:

```markdown
# Project brief

## Outcome
## Audience
## First useful version
## Project boundary
## Workspace and sharing
## Execution ownership
## Technical shape
## Local and remote destinations
## Constraints and assumptions
## Deferred decisions
```

Keep it compact and omit irrelevant sections. Before editing, surface any
assumption that changes the project location, privacy, ownership, or technical
foundation. Stop for confirmation only when a safe inference is not possible.

**Complete when:** the brief can guide both workspace setup and implementation
without consulting the intake again.

## 5. Establish the workspace

Read [Workspace Setup](../workspace-setup/SKILL.md) and follow it as the single
authority for the project's `workspace/` operator layer. Select the workspace
shape from the project boundary, sharing needs, coordination load, and
execution ownership—not merely from the parent category folder.

Create one workspace for one independently operated project. A multi-repository
project may have one top-level workspace when the umbrella is the actual unit
of operation. Do not create one workspace per child repository unless each
child genuinely has an independent work lifecycle.

When a dedicated project agent owns execution, make the workspace define
routes, authority, availability, and handoffs. Do not duplicate the agent's
task or status system.

**Complete when:** the workspace shape is explicit and the authorized
Workspace Setup branch is complete.

## 6. Scaffold the implementation

For a web project, read [the web project defaults](references/web-defaults.md)
and apply them unless the brief records a deliberate exception. Use
`waveframe` project-scaffold mode before feature work.

For a non-web project, use the ecosystem and commands named in the brief or
already established by the repository. Do not force the web stack onto it.

Create only files needed for the first operable state. Preserve existing
repository conventions, user-authored material, and unrelated working-tree
changes.

**Complete when:** the local project can be opened and its first intended
workflow can begin without speculative infrastructure.

## 7. Verify and hand off

Verify, as applicable:

- the workspace passes the Workspace Setup checks;
- install, build, lint, typecheck, or test commands pass;
- links and documented paths resolve;
- ignored, local, tracked, and public material respect the brief;
- no secret value was written or printed;
- Git state contains only the intended changes;
- any unperformed remote, deployment, or external-system action is named.

Report what now exists, what you verified, and only the approvals or decisions
still required.
