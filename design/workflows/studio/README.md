# studio

a working design practice packaged as an agent skill. an agent loads it
before any design work, in any project, canvas or code, and follows one
house law instead of improvising per session.

## what's inside

- [SKILL.md](SKILL.md), the entry point: the reading order and the loop the agent enforces
- [rules.md](rules.md), the house law: graded rules (invariants, defaults, experiments) and pain-earned deposits with dates and provenance
- [playbook.md](playbook.md), the path through a session: fresh project, existing project, component work, shipping, stuck
- [inventory.md](inventory.md), every tool, skill, and mcp in the practice with a verdict on each
- [doctrine/](doctrine/), component intake, codebase scaffold, and the design-system package format

## how to use

copy this folder into your agent's skills directory, `.claude/skills/studio`
for one project or `~/.claude/skills/studio` for all of them. the skill fires
on design work and tells the agent what to read and when. nothing else to
install, the package is self-contained.

borrow freely, but note the practice's own law: rules here were earned from
real incidents, so anything you take enters your version as an experiment,
not an invariant, until it survives two real uses of your own.

## the ideas

- operator intent first. references give anatomy, never skin
- deliverables are state graphs, not happy frames
- motion numbers live in the margins of the law, tuned by hand, promoted by use
- second-use gate: nothing enters the law until it survives a second real use
- pain-only deposits: rules cite the incident that earned them

## provenance

the canonical copy lives in [cortex](https://github.com/tommylower/cortex)
at `design/workflows/studio/`, mirrored standalone at
[tommylower/studio](https://github.com/tommylower/studio). client projects
appear as neutral aliases (project-a, project-b, ...); dates and incidents
are real. a few pointers, like the learning-journal path in SKILL.md, are
specific to the author's machine.
