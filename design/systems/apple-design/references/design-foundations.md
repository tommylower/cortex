# Design Foundations

Use these principles to explain why a design decision helps the user. They are
not a visual recipe.

## Eight lenses

1. **Purpose:** spend the user's time, attention, and trust only on work that
   advances the product's core job.
2. **Agency:** keep the user in control, make slips recoverable, and reserve
   confirmation for genuinely costly or irreversible actions.
3. **Responsibility:** request only necessary data, explain why, anticipate
   misuse, and remove a feature when its risk exceeds its value.
4. **Familiarity:** use learned platform patterns so users can predict
   behavior. Break convention only with evidence.
5. **Flexibility:** adapt to platform, device, language, expertise, context,
   and ability. Personalization can resolve conflicts that one layout cannot.
6. **Simplicity:** expose the common path and place advanced choices one level
   deeper. Minimal appearance is not the same as a simple task.
7. **Craft:** treat typography, icon alignment, responsive behavior, state
   feedback, and performance as trust signals.
8. **Delight:** let delight emerge from the other seven lenses rather than
   attaching decoration at the end.

## Feedback and wayfinding

Feedback generally communicates status, completion, warning, or error. Put it
at the causal moment and near the thing it describes.

Every surface should make these answers available:

- Where am I?
- What is here?
- Where can I go?
- How do I leave or undo?

Place controls near what they affect. If a label must explain the mapping, the
spatial relationship may be weak.

Use specific labels that predict content or action. Generic labels can appear
safe while making navigation harder to learn.

## Typography

- Treat tracking as size-dependent: large display text usually tightens while
  small text may need more room.
- Treat leading as a coupled part of the type scale, not a fixed global
  multiplier.
- Build hierarchy with size, weight, leading, and spacing together.
- Use relative units so text-size preferences reshape the layout instead of
  overflowing it.
- Start with a platform or project type system; choose a custom face only when
  its role is clear.

All numeric type values remain project tokens.

## Process

- Prototype interactions, not only static frames. A working model exposes
  behavior and timing errors earlier.
- Design interaction and appearance together while keeping their ownership
  separate: behavior may come from a proven engine, skin comes from the
  project.
- Test with people in the real context when the decision changes a core flow.
- Review motion in slow motion and with fresh eyes, then verify the normal
  speed again.

## Review questions

- Which lens justifies this change?
- What familiar behavior does the user already bring?
- Does this preserve agency and recovery?
- Does the interface answer its wayfinding questions?
- Is the common path obvious without hiding necessary context?
- Does the design adapt to different inputs and abilities?
- Is delight the result of correctness, or a separate decoration?
