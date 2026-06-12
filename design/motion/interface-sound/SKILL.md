---
name: interface-sound
description: "Design and implement tasteful interface sound for web apps using @web-kits/audio or Web Audio. Use when the user asks for UI sounds, sound effects, audio feedback, button clicks, success tones, error tones, notification sounds, procedural audio, sound patches, or wants to audit whether sound belongs in an interface."
author: raphaelsalaja/audio adapted for Cortex
---

# Interface Sound

Use sound as interaction feedback, not decoration. Sound should clarify state, confirm rare actions, or make a product moment more legible.

Sources:

- https://audio.raphaelsalaja.com/
- https://github.com/raphaelsalaja/audio

## When Sound Belongs

Use sound for:

- success or completion moments
- error, warning, or destructive feedback
- notification or mention events
- tactile controls in creative tools, games, and playful apps
- onboarding or first-run moments where feedback is part of the product feel

Avoid sound for:

- high-frequency hover states
- normal navigation
- dense productivity workflows unless the user opted in
- anything that could fire repeatedly in a loop

## Accessibility & UX Rules

- Default to muted or low volume unless the product category implies sound.
- Provide a visible sound setting when sounds can repeat or persist.
- Never autoplay sound on page load.
- Initialize audio from a user gesture.
- Respect reduced-motion style preferences as a signal to keep sensory feedback restrained.
- Pair every sound with visual feedback; sound must never be the only state indicator.

## Install

```bash
bun add @web-kits/audio
pnpm add @web-kits/audio
npm install @web-kits/audio
```

## Basic Pattern

```ts
import { defineSound, ensureReady } from "@web-kits/audio";

const successTone = defineSound({
  source: { type: "sine", frequency: { start: 660, end: 880 } },
  envelope: { attack: 0.005, decay: 0.12, release: 0.04 },
  gain: 0.18,
});

export async function playSuccessTone() {
  await ensureReady();
  successTone();
}
```

Call from an intentional user action, such as a completed submit or confirmed command.

## Sound Vocabulary

| Event | Direction |
| --- | --- |
| click / tap | very short, low gain, fast decay |
| toggle on | two small ascending tones |
| toggle off | two small descending tones |
| success | soft ascending interval or small chord |
| error | short descending tone, restrained distortion |
| notification | clear but quiet bell-like tone |
| modal open | subtle ascending whoosh |
| modal close | shorter descending whoosh |

## Implementation Notes

- Keep per-sound gain conservative; start around `0.12` to `0.25`.
- Keep most UI sounds under `200ms`.
- Use patches when a project has more than a couple sounds.
- Store reusable patches under `.web-kits/` or a project-specific `src/sounds/` directory.
- Add a single sound preference in app settings before adding many sounds.

## Verification

Before shipping:

1. Confirm sound only plays after user interaction.
2. Confirm mute/off works.
3. Test repeated actions for annoyance.
4. Test with system volume high.
5. Confirm the same state is visible without sound.
