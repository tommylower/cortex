---
name: blindspot
description: Pre-mortem pass before infra, deploy, data-model, or unfamiliar-territory work. Surfaces unknown unknowns by cross-referencing the task against past gotchas in memory and the actual repo surfaces it touches. Use before schema changes, deploys, auth work, or any task in territory the user hasn't worked in. Triggers on "blindspot pass", "blind spots", "unknown unknowns", "what am i missing".
---

before implementing, find what the prompt doesn't know it's missing. the goal is to pre-pay gotchas that would otherwise become debugging sessions.

## process

1. **classify the territory.** restate the task in one line and name the surfaces it touches: deploy config, database schema, migrations, auth, env vars, external services, unfamiliar domain.

2. **sweep memory for prior incidents.** read the memory index and any gotcha/reference files matching this territory. past incidents in the same territory are the strongest predictor of the next one.

3. **sweep the actual repo surfaces.** don't reason from the prompt alone. inspect the real deploy config, schema and migration state, env var usage, middleware, and anything the task assumes but doesn't state. check whether prod and local actually match where the task assumes they do.

4. **report ranked blindspots.** for each one: what could break, how you'd find out (loud prod failure vs silent drift), and the cheapest probe to de-risk it right now. rank by blast radius, not likelihood. lead with anything that takes down prod.

5. **end with a prompt upgrade.** rewrite the original task prompt with the discovered constraints baked in, ready to paste into a fresh implementation session. include this standing instruction in it:

   > keep an implementation-notes.md. if an edge case forces a deviation from the plan, pick the conservative option, log it under "deviations", and keep going.

## notes

- if a blindspot can be resolved by reading code or running a cheap read-only command, resolve it in-pass instead of reporting it as open.
- this is not a code review or a plan review. it only hunts for the gap between what the prompt assumes and what the territory actually is.
- complement to grill-me: grill-me stress-tests a plan the user has. blindspot hunts for what neither the user nor the plan has considered.
