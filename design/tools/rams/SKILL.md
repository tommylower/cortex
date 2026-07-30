---
name: rams
description: Rams review routing for its local skill, hosted MCP, and GitHub App. Use when the user names Rams, requests its scored external UI review, or wants to configure Rams. For Cortex-native review, use studio-audit or preflight.
author: Rams (https://rams.ai/)
---

# Rams

Rams is an external review supplier. It can provide a local checklist, a scored
hosted review before commit, or automatic pull-request reviews. Rams findings
never override Studio law.

## Boundary

- Use Rams only when the user explicitly names it or opts into an external
  review.
- The local skill stays on-device. The MCP and GitHub App send reviewed files
  to Rams and are metered.
- Before the first hosted review in a task, state the data boundary and confirm
  the exact file scope. Exclude secrets and restricted material.
- Treat every result as supplier input. The project profile, Studio rules, and
  operator intent win conflicts.

## Choose a Surface

| Surface | Use it for | Boundary |
| --- | --- | --- |
| Local skill | Fast, stateless checklist pass with no score | Runs in the agent; files stay local |
| Hosted MCP | On-demand scored review of selected UI files before commit | Sends only passed files; uses workspace quota |
| GitHub App | Automatic review of changed UI files on pull requests | Hosted repository integration |

If the user wants installation or configuration, read
[`references/setup.md`](references/setup.md) before changing anything.

## Run a Review

1. Choose the surface and scope. For a hosted surface, list the UI files that
   will be sent and obtain explicit approval. This step is complete when the
   surface and safe file list are unambiguous.
2. Run the selected review:
   - Local skill: invoke the installed Rams workflow against the scoped files.
   - MCP: call Rams `review_files` with only the approved files.
   - GitHub App: inspect the review attached to the current pull request.
   This step is complete when the full response and any score are captured.
3. Adjudicate every finding against the code, rendered interface, project
   profile, and Studio rules. Fix it, decline it with a reason, or defer it
   with operator approval.
4. Verify applied fixes in the product. Re-run Rams only when the change
   warrants another metered review or the user requests it. The review is
   complete when every finding is accounted for and the Cortex-native ship
   check still passes.

## Studio Routing

- Use `studio-audit` as Studio's canonical ship check.
- Use `preflight` for a focused static design, accessibility, and AI-pattern
  review.
- Add Rams as an explicit second opinion after the changed UI is stable and
  before commit.
- The GitHub App is a pull-request backstop, not a replacement for Studio
  review.
