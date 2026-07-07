---
name: studio-audit
description: Senior studio design audit for finished UI. Use when the user says a page, flow, app, or branch feels done and wants a final senior-designer flaw pass, studio law review (the `studio` skill), ship check, or design QA before handing off or deploying.
---

# studio-audit

Use this when the user feels "done" and wants the work judged like a senior
designer would judge it before handoff. This is an umbrella review skill, not a
new visual system. It composes the existing Cortex design review and craft
skills, then synthesizes one priority-ordered report.

## law

Read [references/studio-law.md](references/studio-law.md) before judging. Read
[references/report-template.md](references/report-template.md) before writing
the final report.

Default to audit-only. Do not edit code, run formatters, or apply fixes unless
the user explicitly asks for fixes. If a delegated skill offers to fix safe
small issues, keep it in report-only mode unless the invocation includes
`fix`, `apply`, or equivalent explicit permission.

## workflow

1. **scope the artifact.** Identify whether the target is a component, page,
   flow, whole app, screenshot, URL, or branch. If scope is missing, audit the
   current visible app or current branch and state that assumption.
2. **load project truth.** Read local design docs, existing component
   conventions, recent changed files, and any asbuilt package if one is
   present. Do not require asbuilt; treat it as extra project-specific
   evidence.
3. **static ship check.** Use `preflight` for code-level accessibility,
   visual consistency, responsive footguns, and AI-pattern tells.
4. **viewport check.** Use `responsive-craft preview` or its snapshot workflow
   when the target can run in a browser. At minimum cover mobile and desktop;
   note any untested viewport range.
5. **live experience check.** Use `wip-senior-audit` as the live-site engine
   when the app can boot or a URL is available. It covers first impressions,
   navigation, hierarchy, consistency, states, trust, and conversion. If the
   app cannot run, mark live flow coverage as `not covered`.
6. **taste and interaction check.** Use `interface-craft critique` for
   composition, hierarchy, density, user context, and pattern cohesion. Use
   `emil-design-eng` for motion, feedback, timing, and interaction feel.
7. **synthesize.** Deduplicate findings across lenses. Order by severity,
   not by the skill that found them. Every finding must name the evidence,
   why it matters, and a concrete fix.

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
