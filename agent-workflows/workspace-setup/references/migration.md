# Workspace migration

## Preserve the boundary

Migration moves operator material, not all documentation. Keep product usage,
technical contracts, code constraints, and canonical system records in their
existing authoritative homes. Do not move archives back into active context.

Before changing files, inspect the working tree and project instructions.
Preserve unrelated user changes and stop if the proposed move would overwrite
an existing path.

## Propose one project at a time

For each project, provide an exact move table:

```text
Current path | Proposed path | Action | Why
```

Include files that stay outside the workspace and sources that will be linked
rather than copied. When several projects are in scope, you may assess them
together, but implement one project at a time. Stop after each project so the
user can give pointed feedback unless the user explicitly requests a batch.

## Migrate after approval

1. Establish `workspace/README.md` and `workspace/PROJECT.md` from the material
   already present. Do not seed generic prose that the project has not earned.
2. Move active operator material into `workspace/`. Preserve useful filenames
   when they already express a distinct job.
3. Choose one source for every changing fact. Replace obsolete active copies
   with a thin pointer only when an old entry path must remain discoverable.
4. Update relative links, absolute paths, scripts, ignore rules, setup commands,
   automation, and documentation that refer to moved material.
5. Normalize active terminology to `workspace`. Do not keep a compatibility
   alias unless a verified external dependency requires it.
6. Record the naming or authority change as a new decision when the project
   maintains durable decisions. Preserve historical wording; mark an older
   decision superseded instead of rewriting what it originally said.

## Retire an umbrella workspace

An umbrella workspace is retired, not split. Route each item to its real home,
one at a time with the owner's approval: a project's plans and notes into that
project's `workspace/`; organization knowledge into the organization's own
repository; personal notes into the operator's notes system; work with no
repository into a new project folder of its own; and anything stale to
deletion. If its folder was a git repository, keep a `git bundle` of it in the
archive first. Move git worktrees out of the tree with `git worktree move`, or
move them and run `git worktree repair <new-path>...` from each owning
repository. Fix every link that pointed at the old paths, then remove the
umbrella's `workspace/`.

## Verify the migration

Search the project for the retired path and terminology. Every remaining match
must be historical, external, or deliberately compatible. Verify that:

- every moved file exists at its intended path;
- every link and path reference resolves;
- root and workspace front doors point to the correct next layer;
- changing state has one owner;
- tracked and local material respect the stated sharing boundary;
- no secret, generated artifact, or unrelated user change moved with the
  workspace.

The migration is complete only when every item in the approved move table and
every retired-path match is accounted for.
