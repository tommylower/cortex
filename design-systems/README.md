# design systems

These are opt-in design-system packages. Use them when the requested direction matches the system, or as examples for creating a new project-specific system with waveframe.

A useful design system here is not just a moodboard. It should give enough structure to rebuild the work:

- a short operating brief in `SKILL.md`
- tokens for color, type, spacing, radius, and motion
- component and composition rules
- imagery, logo, and voice guidance when relevant
- platform mapping for CSS variables, Tailwind config, dependencies, and runtime files
- handoff notes that explain what is approved, what is inferred, and what still needs a decision

## how this fits with waveframe

waveframe can synthesize a new design system from messy exploration, extract one from finished code, update it after manual changes, or audit drift between docs and implementation.

The end deliverable is usually a markdown package that can be used three ways:

- by a designer or builder trying to continue the craft without losing the decisions
- by an agent rebuilding, extending, or checking the implementation
- by a client or collaborator reading the system as handoff material

## systems

| system | status | use it for |
| --- | --- | --- |
| `nothing-design` | reference | monochrome, industrial, typography-led product and editorial interfaces |
| `swiss-design` | reference | grid-first editorial interfaces with restrained color and clear type hierarchy |
| `report-design` | extracted | report marketing pages with framed shell, paper texture, and signal red |
| `infrastructure-design` | extracted | dark technical marketing with hairlines, square geometry, and sparse signal color |

Use the `README.md` in each folder for the human overview. Use `SKILL.md` and `references/` when an agent needs operational detail.
