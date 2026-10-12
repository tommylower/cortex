# Flexoki

A ready-made palette to offer when the user wants a warm, ink-on-paper look for reading, writing or code and doesn't want to design a color system. It's a Cortex addition to this skill, not part of the upstream source.

Flexoki is Steph Ango's color scheme, inspired by analog printing inks and warm paper. It's minimal and high-contrast, and its colors are derived in Oklab, so lightness relationships hold at both ends of each ramp. It's MIT licensed.

## When to offer it

- A reading, writing, notes, docs or code surface where warmth and legibility matter more than brand color.
- A new project with no established palette, where the user asks for something "inky", "paper-like" or calm.
- Not when the project already has a palette or brand colors. Keep the established system ([SKILL.md](SKILL.md)).

## How it's structured

- **Base:** a neutral ramp from `paper` through `50`–`950` to `black`.
- **Accents:** eight hues (red, orange, yellow, green, cyan, blue, purple, magenta), each with its own `50`–`950` ramp.
- **Roles:** Flexoki names its own semantic roles for each appearance: `bg`, `bg-2` (backgrounds), `ui`, `ui-2`, `ui-3` (borders and interactive states) and `tx`, `tx-2`, `tx-3` (text, from primary to faint).

Its roles line up with the role-first model in [palette-structure.md](palette-structure.md) and [token-naming.md](token-naming.md).

## Using it

1. Take the values from the canonical source, never from memory: the palette on [stephango.com/flexoki](https://stephango.com/flexoki) or the [repository](https://github.com/kepano/flexoki).
2. Load them as primitives in the project's notation ([color-formats.md](color-formats.md)), then point the project's semantic tokens at them. Components never reference a Flexoki hue directly.
3. Prefer an existing port when the stack has one: the repository lists Tailwind and shadcn ports, plus editor and terminal themes.
4. Pick one accent for interactive elements and keep the others for status and syntax ([color-usage.md](color-usage.md)).
5. Measure contrast on the rendered pairs before reporting ([contrast.md](contrast.md)). The palette being high-contrast doesn't excuse measuring.

## Sources

- [Flexoki](https://stephango.com/flexoki) by Steph Ango
- [kepano/flexoki](https://github.com/kepano/flexoki), [MIT license](https://github.com/kepano/flexoki/blob/main/LICENSE)
