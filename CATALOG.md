# Cortex Catalog

This is the human route map. The machine source of truth for shelves is [`catalog/shelves.json`](catalog/shelves.json); scripts and validation read from it.

## How To Choose

Start by choosing the kind of work:

| Need | Start Here |
| --- | --- |
| Agent orchestration, setup, delegation, session patterns | `agent-workflows/` |
| UI design fundamentals, responsive layout, reference patterns | `design/foundations/` |
| Color, gradients, OKLCH, contrast, tokens | `design/color/` |
| Animation primitives, transitions, motion names, UI sound | `design/motion/` |
| Taste, polish, interaction feel, critique heuristics | `design/craft/` |
| Static/live design review, audits, annotations | `design/review/` |
| Opt-in visual systems like Swiss or Nothing | `design/systems/` |
| Design-system extraction and design operations | `design/workflows/` |
| Component kits and registry-backed UI systems | `design/kits/` |
| Installable visual tooling, MCPs, overlays, packages | `design/tools/` |
| Engineering process discipline | `engineering/` |
| Marketing strategy, growth, SEO, copy, analytics | `marketing/skills/` |
| Private/client/local-only material | `local/` |

## Routing Rules

- Use `design/ROUTING.md` before picking a design skill.
- Use `marketing/README.md` for upstream marketing categories, but treat `product-marketing` as the root context skill.
- Use `engineering/AGENTS.md` for in-session engineering discipline.
- Use `agent-workflows/AGENTS.md` for cross-agent and setup workflows.
- Use `COMMANDS.md` when deciding whether something is an installed slash command or only a skill trigger.
- Use `SOURCES.md` before vendoring, moving, or republishing third-party material.

## Packaging Rules

- A shelf is a human navigation unit. Add one only when it makes a skill easier to find before the human knows its name.
- A skill name is the invocation unit. Moving a skill folder is acceptable when the `name:` stays stable and references are updated.
- A reference file belongs beside the skill that owns its behavior. Shared reference belongs in a neutral docs/catalog file, not copied between skills.
- Local/private skills may sync to local agents, but public validation does not assume they exist.
