---
name: wip-senior-audit
description: Senior live-site UX audit. Use when the user asks to audit a whole running product, review the live app, judge first impressions, or diagnose understanding/trust/conversion across desktop and mobile. Distinct from preflight: this boots the site and writes docs/design-audit/.
---

# wip-senior-audit

Audit the live product the way a senior design lead would on their first day. The bar is not "does the UI look nice." It is: can a normal user **understand** what this is, **trust** it enough to act, and **finish** the core action without reading docs. Everything you flag must trace back to one of those three.

## Quick start

`/wip-senior-audit` boots the real site, screenshots the main pages and core flows on desktop and mobile, writes a graded report to `docs/design-audit/README.md` with screenshots in `docs/design-audit/assets/`, fixes safe small issues on the spot, and ends with the 5 issues hurting conversion most and 5 quick wins fixable today.

## Workflow

1. **Boot the real site.** Find and run the project's dev command (use the `run` skill if present, else `package.json` scripts / README). Open the actual running app in a browser with debugging, not a static mockup or placeholder. If it will not boot, stop and report what is blocking, do not audit from source alone.
2. **Map the surface.** List the main pages, the core user flow(s) that lead to the primary action (sign up, buy, book, create), and confirm a mobile viewport. Say what you are covering before you capture.
3. **Capture.** Screenshot every main page and each step of the core flow at desktop and mobile widths into `docs/design-audit/assets/`. Use built-in browser debugging to drive the flow. Name files by page/flow and viewport.
4. **Audit across the 7 dimensions** in [REFERENCE.md](REFERENCE.md): first impressions, navigation, visual hierarchy, component consistency, loading/empty/error states, trust signals, conversion paths. Read REFERENCE.md before judging.
5. **Tag every issue.** Each finding gets: a priority `P0`–`P3`, which axis it hurts (`understanding` / `trust` / `conversion`), the screenshot it appears in, and a **specific** fix (not "improve hierarchy" but "drop the secondary CTA to a text link so the primary stands alone"). No vibes-only findings. See the rubric in REFERENCE.md.
6. **Fix safe small stuff on the spot** under the boundaries below. Big changes stay recommendations.
7. **Write the report** to `docs/design-audit/README.md` using the template in REFERENCE.md: scorecard, findings table, per-dimension notes with embedded screenshots, what was fixed live, what is recommended.
8. **Close with two lists:** the **5 issues hurting conversion most** (ranked, with the fix) and **5 quick wins fixable today** (small, safe, high-leverage).

## Boundaries (hard)

- **Never trigger payment, delete, publish, or any destructive/irreversible action** while driving the site. Screenshot up to the confirm step, never confirm.
- **Fix on the spot only** safe, reversible, low-blast-radius edits: copy wording, spacing/padding, button hierarchy and labels, obvious contrast/alt-text misses, empty-state text. Anything structural, data-affecting, or design-system-wide is a recommendation, not an edit.
- If a fix needs a judgment call you cannot make from the screenshots, recommend it and say what decision it is waiting on.

## Composes with

- **preflight** — run it for the static code-level a11y and AI-slop pass; this skill covers the live end-to-end experience preflight cannot see.
- **responsive-craft** — use its multi-breakpoint preview when the mobile audit surfaces layout forks worth fixing.
