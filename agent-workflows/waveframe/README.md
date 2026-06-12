# waveframe

design like a human. hand off like an agent.

waveframe is a companion to the design process.

it gives you room to make a mess, follow ideas, collect references, and work through the beginning, middle, and end of a project without pretending the final package is already known.

it helps track the decisions that start to matter: what you tried, what changed, what stuck, what needs to carry forward.

the input can be loose references, sketches, docs, half-built sites, code, decks, screenshots, art direction, or finished work. the output can become project notes, reusable direction, a client handoff, a case study, a design archive, or context another person or agent can keep building from.

enough structure to keep momentum. not so much that the work gets locked too early.

built by a wave in progress. waves don't die.

## what is inside

waveframe is a set of markdown workflows and reusable structures. each part is meant to help at a different state of the work.

| part | what it does |
| --- | --- |
| `project-scaffold` | starts a project with the right folders, notes, status, and context before the output is fully known. |
| `design-system-synthesis` | turns messy references, sketches, screenshots, brand exploration, and notes into direction that can keep moving. |
| `design-system-extract` | looks at built work and pulls out the decisions, patterns, and language that actually survived implementation. |
| `handoff-hardening` | finds drift, repeated one-offs, unclear decisions, and fragile implementation before handoff. |
| `design-architecture` | turns visual references and structural ideas into practical front-end guidance. |
| `content-map` | maps pages, sections, wireframes, and message structure before the visual layer is final. |
| `structure` | applies reusable boards, decks, and handoff formats to a project. |
| `product-ui-system` | shapes product ui direction for portals, dashboards, workflow tools, and software surfaces. |
| `design-system-update` | folds stable decisions from recent work back into the project record. |
| `output-package` | defines the markdown design package you can use to rebuild, implement, hand off, or archive the work. |
| `drift-audit` | compares docs, code, design direction, and implementation so the project does not split into competing versions. |

design systems are one possible output. waveframe is broader than that. it is for tracking craft, keeping useful context alive, and turning creative work into something durable enough to use again.

## what you get

the most useful end state is usually a markdown design package: a folder that explains how to recreate, extend, and implement the work.

it can be light, or it can become a full design system when the project needs that level of detail.

```text
design-system/
├── README.md
├── SKILL.md
└── references/
    ├── tokens.md
    ├── architecture.md
    ├── composition.md
    ├── components.md
    ├── page-structure.md
    ├── motion.md
    ├── imagery.md
    ├── voice.md
    └── platform-mapping.md
```

that package should capture the useful details: color roles, type, spacing, radius, borders, shadows, layout primitives, component rules, states, motion, imagery, voice, and implementation mapping.

`platform-mapping.md` is where the system touches code. it should point to the actual files and patterns: tailwind config, css variables, `globals.css`, font loading, component paths, token files, theme behavior, and runtime dependencies.

the goal is not a pretty document. the goal is a reusable record that lets you rebuild the work, hand it to a client, write a case study, or give another person or agent enough context to keep building without guessing.

## files

- `SKILL.md` - the main operating guide.
- `references/` - deeper workflows for each kind of work.
- `structures/` - reusable deck, board, and handoff formats.
- `examples/` - small example outputs that show how the pieces work together.
- `.waveframe/` - optional local process notes created inside a project using waveframe.

## structures

| structure | what it does |
| --- | --- |
| `brand-overview-deck` | creates a fast visual overview of a brand direction for review, discussion, or early handoff. |
| `design-system-deck` | turns reusable design decisions into an editable deck that can explain the work clearly. |
| `product-ui-system-board` | maps product ui foundation, shell, components, states, and workflow screens while the product direction is still forming. |
| `social-asset-handoff` | lays out correctly sized frames for social, article, and asset handoff work. |

## use

read `SKILL.md` first. then open the reference file that matches the current state of the work.

the workflow should produce the smallest useful artifact: notes when notes are enough, project docs when the project needs them, a handoff when someone else needs to inherit it, a case study when the work needs to be explained, or a reusable package when the direction is stable enough to become one.

## examples

`examples/design-system-output/` shows a small draft markdown design-system package. it is intentionally not a polished finished system. it explains the folder shape, how the files depend on each other, and how unresolved decisions should stay visible.

use it as a starting reference for what waveframe can produce, then replace the example frame with real project context, source material, and implementation paths.

## part of cortex

waveframe is developed in [cortex](https://github.com/tommylower/cortex), an agent-agnostic library of skills, workflows, and tools. this repo is a published mirror of `agent-workflows/waveframe/`. some workflow files reference sibling cortex skills by path; inside cortex those resolve directly, and outside it they read as pointers to equivalent skills in your own library.

## license

waveframe is open source under the MIT license.

the license covers the code and markdown workflows in this repository. it does not grant rights to use the waveframe name or Wave in Progress marks to imply endorsement.
