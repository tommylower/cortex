# studio

the house practice for design and front-end product work, packaged as an
agent skill. an agent loads it before design work in any project, canvas
or code, and follows one set of rules instead of improvising per session.

## what's inside

- [SKILL.md](SKILL.md): the entry point, what to read when, and the working loop
- [rules.md](rules.md): the law. how rules are graded, and every rule in force
- [playbook.md](playbook.md): the path through a session
- [practices/](practices/): tool mechanics for paper, figma, print and assets, and front-end builds, read when that tool is in play
- [inventory.md](inventory.md): the verdict on every design skill, mcp, and tool
- [doctrine/](doctrine/): component intake, codebase scaffold, and enforcement. the design-system package format belongs to the `asbuilt` skill
- [scripts/preflight.ts](scripts/preflight.ts): the prebuild gate a studio codebase runs

## how the rules stay current

a row is added when a mistake costs real time, promoted by evidence, and
deleted when it proves wrong. git keeps the history. in cortex, the skill
validator runs a studio check. its header lists exactly what it covers: for
example, that studio's own paths and references resolve, that git ignores no
studio file, that every studio file is listed in SKILL.md, and that retired
files stay gone. it is a
guard against the known ways this went wrong, not a proof, so review still
matters.

## using it elsewhere

copy this folder into an agent's skills directory. the rules are this
practice's own; anything you borrow enters your version as an experiment
until it survives two real uses of your own.

the canonical copy lives in [cortex](https://github.com/tommylower/cortex)
at `design/workflows/studio/`, mirrored at
[tommylower/studio](https://github.com/tommylower/studio).
