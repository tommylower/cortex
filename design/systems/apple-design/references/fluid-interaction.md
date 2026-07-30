# Fluid Interaction

The through-line is continuity: the interface responds at the moment of
input, follows the user's movement, carries velocity, and can be redirected
without a jump.

## Response and direct manipulation

- Give visible feedback on press, not only after activation.
- During a drag or swipe, update continuously and keep the content attached to
  the original grab offset.
- Use Pointer Events and pointer capture so tracking survives leaving the
  element bounds.
- Track a short position-and-time history so release velocity is real rather
  than guessed.
- Keep tap cancellation and small movement hysteresis; a user should be able
  to drag away before release to cancel.
- Detect plausible gestures together, then cancel losing recognizers once the
  intent is clear.

## Interruption

- Never lock input until an animation finishes.
- Retarget from the current rendered value, not the previous logical target.
- Carry velocity through reversals; a hard reset creates a visible wall.
- Decompose two-dimensional motion when horizontal and vertical velocities
  need independent springs.
- Prefer a velocity-aware spring for gesture-driven motion. Fixed sequences
  are acceptable only when the user cannot redirect them.

## Velocity handoff and projection

At release, the settling animation begins with the gesture's velocity.
Libraries differ on whether they accept absolute or normalized velocity;
verify the API rather than assuming.

For a flick or throw, choose the destination from projected momentum, not only
the release position:

```js
function project(initialVelocity, decelerationRate = 0.998) {
  return (
    (initialVelocity / 1000) *
    decelerationRate /
    (1 - decelerationRate)
  );
}

const endpoint = currentPosition + project(releaseVelocity);
const target = nearestSnapPoint(endpoint);
```

The deceleration number is a supplier example. Tune through project motion
controls before shipping.

## Space and boundaries

- Enter and exit along the same spatial path.
- Anchor a trigger-owned surface to its trigger; centered modals are the
  exception.
- Let intermediate frames point toward the outcome instead of blindly
  interpolating.
- Use rising resistance beyond a boundary instead of a hard stop:

```js
function rubberband(overshoot, dimension, constant = 0.55) {
  return (
    overshoot *
    dimension *
    constant /
    (dimension + constant * Math.abs(overshoot))
  );
}
```

- Choose a commit or return target from velocity and intent, not a position
  threshold alone.

## Frame quality

- Use the display clock (`requestAnimationFrame`) only for state that must be
  calculated per frame.
- Prefer compositor-friendly transform and opacity changes for moving
  surfaces.
- Keep input response work out of debounced or artificial delay paths.
- Judge the frames, not only the average frame rate: fast sharp movement can
  still strobe even at 60fps.

## Materials and depth

Translucency can communicate hierarchy, but it is skin unless it also changes
interaction behavior.

- Float navigation or tool surfaces only when content is intentionally allowed
  to continue beneath them.
- Use heavier separation for structural layers and lighter separation for
  controls.
- Avoid stacking translucent foregrounds until text contrast collapses.
- A blocking modal needs separation and focus; a parallel tool panel should
  preserve context without implying a modal stop.
- When transparency is used, verify legibility against changing content and
  provide a solid reduced-transparency state.

Do not import Apple's blur, shadow, or color values. Rebuild the material in
project tokens.

## Multimodal feedback

Combine visual, sound, or haptic feedback only when:

1. the cause is obvious;
2. all channels align at the same event;
3. each channel improves a meaningful commit, warning, success, snap, or
   error.

Extra feedback on routine actions becomes noise quickly.

## Preference and accessibility states

- Reduced motion keeps comprehension while removing vestibular movement:
  replace large travel, spring, or parallax with opacity or a static state.
- Reduced transparency replaces blur with a more solid surface.
- Increased contrast strengthens separation and text contrast.
- Avoid large looping motion, abrupt full-screen brightness changes, and
  slow ambient oscillation.
- Keyboard operation remains immediate even when touch and pointer paths are
  physically animated.

## Verification

- interrupt and reverse every gesture before it settles
- release at low and high velocity
- drag beyond each boundary
- switch between pointer, touch, and keyboard
- test reduced motion, reduced transparency, and increased contrast
- inspect slow motion for jumps at handoff and reversal
- test on real hardware when the interaction depends on touch feel
