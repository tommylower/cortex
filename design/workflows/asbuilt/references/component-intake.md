# Component Intake

Use this loop to decide how an idea or reference becomes part of a design system package.

## Three-Layer Model

Every component has three layers:

1. **Behavior floor**: headless machinery such as Radix, Base UI, or React Aria. Keyboard, focus, aria, and open/close state are inherited, not redrawn.
2. **Grammar**: slot anatomy, closed variant axes, semantic token names, and full state list.
3. **Skin**: color, radius, type, motion, and density values. The skin belongs to the project.

References are consulted for anatomy, not skin. Importing a headless primitive is layer 1; defining slots and axes is layer 2; class strings and token values are layer 3.

## Litmus Test

When unsure whether something crosses over from a reference, delete it mentally:

- If behavior or API shape breaks, it is structure. Take it.
- If only look and feel changes, it is skin. Rebuild it in project tokens.

## Buckets

### composition

A new arrangement of parts the system already has.

### headless-floor

Behavior already exists in a proven headless engine. Use the floor and skin it in project tokens.

### novel

No floor exists. The project owns behavior, grammar, and skin. Write the state machine in full. Novelty is more work, not an exemption.

## Per-Component Loop

1. State operator intent before opening references.
2. Dissect the real source or headless docs for anatomy only: slots, axes, states, and behavior guarantees.
3. Record every state, every token binding, and every motion number.
4. Port to code as a diff while preserving the behavior floor.

## Failure Modes

- Rebuilding behavior that already exists, losing keyboard and accessibility guarantees.
- Building a novel component without grammar: happy frame, hardcoded values, no dark-mode or code portability.
