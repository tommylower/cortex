---
name: nothing-design
description: Nothing-inspired design system — monochrome, typographic, industrial. Swiss typography, OLED blacks, Space Grotesk/Mono font stack, segmented widgets. Only use when explicitly asked for "Nothing style" or "Nothing design". Never auto-apply.
version: 3.0.0
---

# Nothing-Inspired UI/UX Design System

A senior product designer's toolkit trained in Swiss typography, industrial design (Braun, Teenage Engineering), and modern interface craft. Monochromatic, typographically driven, information-dense without clutter. Dark and light mode with equal rigor.

**Before starting any design work, declare which Google Fonts are required and how to load them** (see `references/tokens.md` Section 1). Never assume fonts are already available.

---

## 1. DESIGN PHILOSOPHY

- **Subtract, don't add.** Every element must earn its pixel. Default to removal.
- **Structure is ornament.** Expose the grid, the data, the hierarchy itself.
- **Monochrome is the canvas.** Color is an event, not a default — except when encoding data status (see Section 3).
- **Type does the heavy lifting.** Scale, weight, and spacing create hierarchy — not color, not icons, not borders.
- **Both modes are first-class.** Dark mode: OLED black. Light mode: warm off-white. Neither is "derived" — both get full design attention. Ask the user which mode to start with.
- **Industrial warmth.** Technical and precise, but never cold. A human hand should be felt.

---

## 2. CRAFT RULES — HOW TO COMPOSE

### 2.1 Visual Hierarchy: The Three-Layer Rule

Every screen has exactly **three layers of importance.** Not two, not five. Three.

| Layer | What | How |
|-------|------|-----|
| **Primary** | The ONE thing the user sees first. A number, a headline, a state. | Doto or Space Grotesk at display size. `--text-display`. 48–96px breathing room. |
| **Secondary** | Supporting context. Labels, descriptions, related data. | Space Grotesk at body/subheading. `--text-primary`. Grouped tight (8–16px) to the primary. |
| **Tertiary** | Metadata, navigation, system info. Visible but never competing. | Space Mono at caption/label. `--text-secondary` or `--text-disabled`. ALL CAPS. Pushed to edges or bottom. |

**The test:** Squint at the screen. Can you still tell what's most important? If two things compete, one needs to shrink, fade, or move.

### 2.2 Font Discipline

Per screen, use maximum:
- **2 font families** (Space Grotesk + Space Mono. Doto only for hero moments.)
- **3 font sizes** (one large, one medium, one small)
- **2 font weights** (Regular + one other — usually Light or Medium, rarely Bold)

### 2.3 Spacing as Meaning

```
Tight (4–8px)   = "These belong together" (icon + label, number + unit)
Medium (16px)    = "Same group, different items" (list items, form fields)
Wide (32–48px)   = "New group starts here" (section breaks)
Vast (64–96px)   = "This is a new context" (hero to content, major divisions)
```

**If a divider line is needed, the spacing is probably wrong.**

### 2.4 Color as Hierarchy

Max 4 levels per screen:

```
--text-display (100%) → Hero numbers. One per screen.
--text-primary (90%)  → Body text, primary content.
--text-secondary (60%) → Labels, captions, metadata.
--text-disabled (40%) → Disabled, timestamps, hints.
```

**Red (#D71921) is not part of the hierarchy.** It's an interrupt — "look HERE, NOW."

### 2.5 The Nothing Vibe

1. **Confidence through emptiness.** Large uninterrupted background areas.
2. **Precision in the small things.** Letter-spacing, exact gray values, 4px gaps.
3. **Data as beauty.** `36GB/s` in Space Mono at 48px IS the visual.
4. **Mechanical honesty.** Controls look like controls. A toggle = physical switch.
5. **One moment of surprise.** A dot-matrix headline. A circular widget. A red dot.
6. **Percussive, not fluid.** Click not swoosh, tick not chime.

---

## 3. ANTI-PATTERNS

- No gradients in UI chrome
- No shadows. No blur. Flat surfaces, border separation.
- No skeleton loading screens. Use `[LOADING...]` text or segmented spinner.
- No toast popups. Use inline status text: `[SAVED]`, `[ERROR: ...]`
- No spring/bounce easing. Use subtle ease-out only.
- No border-radius > 16px on cards. Buttons are pill (999px) or technical (4–8px).

---

## 4. REFERENCE FILES

- **`references/tokens.md`** — Fonts, type scale, color system (dark + light), spacing, grid, motion, iconography
- **`references/components.md`** — Cards, buttons, inputs, lists, tables, nav, tags, progress bars, charts, widgets, overlays
- **`references/platform-mapping.md`** — HTML/CSS, SwiftUI, React/Tailwind output conventions

---

Credit: [dominikmartn/nothing-design-skill](https://github.com/dominikmartn/nothing-design-skill)
