---
name: emil-design-eng
description: Design-engineering craft and motion advisor. Use for UI polish, animation decisions, motion-only review, a codebase motion audit with implementation plans, or finding restrained animation opportunities.
author: Emil Kowalski (https://github.com/emilkowalski/skills)
---

# Design Engineering

Use Emil Kowalski's craft heuristics as a supplier beneath the active project
and Studio. Project tokens, behavior engines, and Studio motion defaults always
win; values in these references are examples when the project has no answer.

This Cortex adaptation folds the upstream `review-animations`,
`improve-animations`, and `find-animation-opportunities` workflows into one
owner instead of maintaining three copies of the same motion standard.
Source:
[emilkowalski/skills](https://github.com/emilkowalski/skills), reviewed at
commit `70744e3816f1d93eafb697161a8b880a7384c5ff`.

## Pick a branch

| User need | Branch |
| --- | --- |
| Build or polish an interaction | `craft` |
| Review an animation diff or focused surface | `review` |
| Survey existing motion and prepare a prioritized roadmap | `audit` |
| Find places that would genuinely benefit from motion | `opportunities` |

If invoked without a task, say you can help with craft, review, audit, or
opportunity finding and ask which surface to inspect.

## Shared posture

- Train taste by studying why strong interfaces work, not by copying their
  skin.
- Assume invisible details compound: response, origin, interruption, edge
  cases, and reduced-motion behavior matter together.
- Default to restraint. The best motion change is often deletion.
- Judge frequency before style. Keyboard and very high-frequency actions
  should feel immediate.
- Give every animation one functional purpose: feedback, spatial continuity,
  state indication, explanation, or preventing a jarring change.

## Workflow

1. **Load project truth.** Read the active Studio profile when present, then
   identify the stack, motion libraries, tokens, component engine, product
   personality, and interaction frequency. This step is complete when a
   recommendation cannot accidentally introduce a parallel motion language.
2. **Choose the branch.** Do not combine a read-only audit with implementation
   unless the user explicitly asks to move from one to the other.
3. **Load only the needed references:**
   - [Animation Framework](references/animation-framework.md) for the shared
     decision gate, timing examples, springs, and debugging.
   - [Component Patterns](references/component-patterns.md) for press,
     popover, transition, clip-path, and drag behavior.
   - [Performance and Accessibility](references/performance-and-accessibility.md)
     for rendering, input, and user-preference constraints.
   - [Review and Audit](references/review-checklist.md) for `review`, `audit`,
     or `opportunities` execution and output.
   - [Plan Template](references/plan-template.md) only after an audit finding
     has been selected for a durable plan.
4. **Execute the branch.**
   - `craft`: implement only the requested interaction, using the project's
     existing primitives and tokens.
   - `review`: inspect the stated diff or surface and report motion findings;
     do not edit.
   - `audit`: survey the requested codebase scope, vet every cited finding,
     and stop for selection before writing plans. Source code remains
     read-only.
   - `opportunities`: sweep for missing feedback or continuity, reject most
     candidates through the gate, and report at most seven.
5. **Verify at the right level.** Mechanical checks prove the code runs.
   Slow-motion, frame-by-frame, interruption, reduced-motion, and real-device
   checks prove the interaction feels right. Name any check you could not run.

## Completion

- `craft` is complete when the requested state graph works with project
  primitives and tokens, build checks pass, and the interaction has been
  feel-checked.
- `review` is complete when every finding cites evidence and the verdict is
  explicit.
- `audit` is complete when the scoped motion surface is accounted for and
  selected plans are self-contained enough for a context-free executor.
- `opportunities` is complete when every reported candidate passed the full
  gate and considered-but-rejected candidates are visible.
