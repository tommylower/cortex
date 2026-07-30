---
name: studio-audit
description: Senior Studio audit for finished UI. Use for a quick or full ship check of a component, page, flow, app, or branch before handoff, commit, or deployment, including requests for better-interface.
author: Cortex, with whole-interface review guidance adapted from Jakub Krehel (https://github.com/jakubkrehel/skills)
---

# studio-audit

Use this when the user feels "done" and wants the work judged like a senior
designer would judge it before handoff. This is an umbrella review skill, not a
new visual system. It composes the existing Cortex design review and craft
skills, then synthesizes one priority-ordered report.

Its domain-owner coverage and evidence discipline incorporate
[Jakub Krehel's `better-interface`](https://github.com/jakubkrehel/skills/tree/main/skills/better-interface)
at commit `a67333399dabbc71d7778962cb9c4fb9b86a00d0`.

## law

Read [references/studio-law.md](references/studio-law.md) before judging. Read
[references/report-template.md](references/report-template.md) before writing
the final report.

Default to audit-only. Do not edit code, run formatters, or apply fixes unless
the user explicitly asks for fixes. If a delegated skill offers to fix safe
small issues, keep it in report-only mode unless the invocation includes
`fix`, `apply`, or equivalent explicit permission.

## modes

| mode | coverage | finding cap |
| --- | --- | --- |
| `quick` | primary path and highest-risk states; report P0-P2 only | 5 |
| `full` | requested scope across every domain and relevant state | 15 |

Default to `full`. If the requested scope is too large to inspect credibly,
narrow it to the highest-traffic complete flow and state the boundary. Never
claim coverage for an uninspected surface.

## workflow

1. **resolve scope and mode.** Identify whether the target is a component,
   page, flow, whole app, screenshot, URL, or branch. If scope is missing,
   audit the current visible app or branch and state that assumption. This
   step is complete when the mode, exact target, and review boundary are
   explicit.
2. **load project truth.** Read local design docs, existing component
   conventions, recent changed files, and any asbuilt package if one is
   present. Do not require asbuilt; treat it as extra project-specific
   evidence. This step is complete when the stack, styling system, behavior
   engine, tokens, supported viewports, and available preview or test commands
   are accounted for.
3. **review every domain.** Load the owning skills in this order:
   - `better-accessibility`, with `preflight` for broad static risks
   - `better-layout`, with `responsive-craft` for viewport behavior
   - `better-writing`
   - `better-typography`
   - `oklch-skill`
   - `better-ui`

   When orchestrated here, use their principles and references but ignore
   their standalone output formats. In `quick` mode inspect every domain and
   spend depth where evidence shows the greatest risk. In `full` mode complete
   each domain review. Mark any unavailable or untested domain `not covered`;
   never reconstruct its rules from memory.
4. **inspect the rendered product.** Use `responsive-craft preview` or its
   snapshot workflow when the target can run in a browser. Cover mobile and
   desktop at minimum. Use `wip-senior-audit` for live first impressions,
   navigation, hierarchy, states, trust, and conversion. A claim that depends
   on runtime behavior or appearance requires rendered evidence; otherwise
   mark it `not verified`.
5. **apply Studio taste.** Use `interface-craft critique` for composition,
   hierarchy, density, user context, and cohesion. Use
   `emil-design-eng review` for motion, feedback, timing, interruption, and
   interaction feel. Its standalone verdict yields to this audit's one final
   verdict. Studio law and the project profile adjudicate every supplier
   opinion.
6. **synthesize one verdict.** One root cause is one finding even when several
   domains observe it. Cite a file and line, route, viewport, screenshot, or
   interaction step for every finding. Rank by Studio priority, then reach and
   leverage; a shared token or component outranks the same symptom in one
   leaf. Record real candidates considered and rejected because the evidence,
   project convention, or user value did not justify a change. The audit is
   complete when every domain has a coverage result, every reported finding
   has evidence and a concrete fix, and every verification gap is named.

## output

Write the final answer in the format from
[references/report-template.md](references/report-template.md).

If working inside a repo and the audit is more than a quick chat critique, also
write the durable report to `docs/design-audit/studio-audit.md`. If screenshots
were captured, store them under `docs/design-audit/assets/` and reference them
from the report.

Close with:

- `ship`: no blocking issues
- `fix first`: P0/P1 issues exist
- `review again`: the audit could not cover the live flow, mobile, or another
  required surface
