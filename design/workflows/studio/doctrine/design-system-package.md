# the design-system package

the portable format for a design system. entered 2026-07-04, upgraded from
waveframe's output-package.md (waveframe deleted the same day; its salvageable
concepts live here now). grades per rules.md: everything in this file is
DEFAULT. use #1 is the next package emitted; nothing here is law until the
format survives two real packages.

## the acceptance test — what the format exists to pass

an agent loading ONLY the package (no codebase, no cortex, no chat history)
must be able to:

1. produce a new conforming component ("create a new card"): correct slots,
   closed axes, full state graph, token bindings, motion numbers.
2. correctly bucket a new idea (composition / behavior-exists-headless /
   genuinely novel) via the intake pointer.

a package that can't pass this isn't ready. say so in its status field
instead of shipping it as done.

## the smallest-useful-artifact rule (salvaged)

don't emit a package when notes are enough. the package is for handoff,
archive, rebuild, or a second agent inheriting the system. lighter work gets
lighter records.

## shape

```text
design-system/
├── README.md                 # for humans
├── SKILL.md                  # for agents
└── references/
    ├── tokens.md             # the name contract
    ├── architecture.md       # strata + dependency rule
    ├── components.md         # anatomy cards
    └── platform-mapping.md   # what makes it buildable
```

six files. no more unless a real package pulls for more.

## required fields per file

### README.md — for humans

- **status**: `none` | `draft` | `partial` | `ready` | `archived` (salvaged
  vocabulary; use these words exactly)
- **source of truth**: which artifact wins when docs and artifact disagree.
  once code exists, code. say it explicitly.
- **unresolved**: open decisions listed, never hidden. an empty list is
  written as `unresolved: none`, which is a claim, not an omission.
- how to read the folder.

### SKILL.md — for agents

- when to use the package.
- the design thesis in a few lines.
- hard rules and anti-patterns.
- **the extend-don't-copy pointer**: new components enter via the intake
  loop (`component-intake.md`, alongside this file in the studio
  skill). an
  inheriting agent extends the system through that loop; it never forks the
  package or invents a parallel one.
- reference index.

### references/tokens.md — the name contract

- the full semantic token name set. **names are law, values are skin.**
  every name is listed even when its value is a placeholder.
- names are role-based (`--color-surface`, never `--color-gray-100`).
- raw values appear here and only here (stratum 1 of codebase-scaffold.md).
- motion numbers (durations, easings) live here as tokens, sourced from the
  margins and rules.md defaults, never from a skill's defaults.
- theme/mode behavior when present.

### references/architecture.md — strata + dependency rule

- the four strata (tokens / primitives / product / screens) with the
  project's REAL paths, not example paths.
- the dependency rule stated: references point downward only. mechanically
  checkable, and the check is named (grep raw values outside the token
  file, lint import direction).
- the shell, and the responsive strategy.

### references/components.md — anatomy cards

one card per component, this exact grammar:

```text
## <ComponentName>
bucket:  composition | headless-floor | novel
floor:   <engine primitive + doc link> | none — state machine described below
slots:   <named parts, in order>
axes:    <closed variant axes and their values, e.g. variant: primary|secondary|ghost · size: sm|md|lg>
states:  <the graph: every state and what transitions into it>
motion:  <numbers for this component's transitions>
tokens:  <the semantic names this component binds. no raw values>
notes:   <usage rules, anti-patterns>
status:  draft | partial | ready
```

- a card whose states line is a happy frame alone is nonconforming.
- a `novel` card must describe its state machine in full, since no floor
  documents it. novelty is more work, not an exemption (component-intake.md).
- axes are closed sets. adding a value to an axis is a system change and
  gets recorded in the package, not slipped into code.

### references/platform-mapping.md — what makes it buildable (salvaged, kept deliberately)

- framework and runtime.
- REAL file paths: token file, global stylesheet, component directories.
- the translation layer as actually used (css variables, `@theme` mapping,
  or the older config shape — never pretend the project is on a stack it
  isn't).
- runtime dependencies that ship in code.
- where implementation is known to diverge from the docs.

## the client split (salvaged)

the package is the client-facing artifact. encode rules, don't cite
suppliers: "cards use a lifted dithered shadow on editorial surfaces," not
"use funky-shadow" — unless the supplier is a real runtime dependency, in
which case it belongs in platform-mapping. provenance and process notes stay
out of the package entirely (record-keeping rule: process rules go to
rules.md on pain, design decisions live in artifacts).

## the derivation rule

packages are DERIVED from artifacts, never hand-maintained. when code and
package disagree, code wins and the package is re-derived. drift is measured
between two derived truths, never between a journal and reality.
