---
name: apple-design
description: Opt-in Apple interface reference for translating WWDC principles into web UI. Use when the user explicitly asks for Apple-style, iOS-like, or fluid physical interaction behavior.
author: Emil Kowalski (https://github.com/emilkowalski/skills)
---

# Apple Design

Use this as an opt-in reference system, never as a default skin. It adapts
Emil Kowalski's Apple and WWDC synthesis for the web.

Studio and the project remain authoritative. Apple supplies behavior and
reasoning; project tokens supply color, type, spacing, material treatment, and
motion values.

## Choose a branch

- For drag, swipe, sheets, springs, momentum, interruption, materials, and
  reduced-motion behavior, read
  [Fluid Interaction](references/fluid-interaction.md).
- For product principles, feedback, agency, simplicity, typography, and
  prototyping, read [Design Foundations](references/design-foundations.md).
- Read both only when the task spans interaction behavior and product-level
  design direction.

## Workflow

1. Confirm the user explicitly wants an Apple or fluid-physical reference.
   State the interaction or product quality being borrowed; "make it look like
   Apple" is not yet specific enough.
2. Read the active Studio rules and project profile. Identify the current
   behavior engine, motion tokens, platform, input methods, and accessibility
   requirements.
3. Translate the reference through Studio's three layers:
   - **behavior:** response, interruption, velocity, boundaries, focus, and
     state machinery may cross over.
   - **grammar:** spatial continuity, hierarchy, feedback types, and state
     relationships may cross over.
   - **skin:** glass, blur, color, typography, radius, density, and numeric
     motion values remain project decisions.
4. Build or review the full interaction state graph, including interrupted,
   reversed, reduced-motion, touch, pointer, keyboard, loading, and error
   states that apply.
5. Verify the rendered interaction. Gesture work requires a real-device check
   when hardware is available; otherwise name the unverified risk.

## Completion

The task is complete when the borrowed principle is named, behavior and skin
are separated, project tokens remain authoritative, every relevant state is
verified, and no supplier value silently became house law.

## Source

Adapted from
[emilkowalski/skills: apple-design](https://github.com/emilkowalski/skills/tree/main/skills/apple-design),
which synthesizes Apple's WWDC design material for web implementation.
