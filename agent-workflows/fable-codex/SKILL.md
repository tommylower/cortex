---
name: fable-codex
description: Opt-in split-stack session mode — one strong model plans and reviews from the orchestrating harness while a model from a different vendor executes via CLI handoff. Reference configuration. Claude (Fable 5) plans at high effort, Codex (gpt-5.5 at xhigh reasoning) executes, Claude reviews at maximum scrutiny. Use only when the user invokes /fable-codex; never auto-apply. Requires the openai-codex plugin and an authenticated codex CLI.
disable-model-invocation: true
argument-hint: "[optional: the task to run through the pipeline]"
---

# fable-codex

A split-stack pattern: split every substantive coding task across two models from different vendors, in three roles.

1. **Plan** — a strong reasoning model in the orchestrating harness, careful and explicit
2. **Execute** — a strong coding model from a *different* vendor, write-capable, reached via CLI handoff
3. **Review** — the planner again, treating the diff as untrusted contributor work

Why the vendor split: the executor never grades its own homework, the planner never rubber-stamps code it wrote itself, and the handoff forces plans to be self-contained enough that any capable model could execute them. The roles matter more than the specific models.

## reference configuration

This skill's defaults, swap any row for your own stack:

| role | reference | swap for |
| --- | --- | --- |
| plan + review | Claude (Fable 5), the session model | any strong reasoning model running the session |
| execute | Codex `gpt-5.5` at `xhigh` effort via the openai-codex plugin | any second-vendor coding CLI that accepts a self-contained brief |
| auth | whatever the codex CLI is already logged in with | subscription or API key, the pattern doesn't care |

Once invoked, the mode stays on for the rest of the session until the user ends it ("drop fable-codex", "stop using codex"). It applies to coding tasks only — conversation, research, planning-only questions, and ops/publishing tasks proceed normally.

If the user passed arguments, treat them as the first task and start Phase 1 immediately.

## Preconditions

- Executor CLI on PATH and authenticated (for the reference setup: `codex login status` succeeds). If missing or unauthenticated, stop and tell the user to run `/codex:setup`.
- This mode assumes the session is running the strong planner/reviewer model the user intends. If it isn't, say so once and continue.

## Phase 1 — Plan (planner)

- Explore the codebase first. Read `CONTEXT.md`, `docs/adr/`, and `docs/agents/*.md` if present; use the glossary's vocabulary throughout.
- Produce a precise implementation plan: scope, modules and interfaces touched, behavior expected, **acceptance criteria as a checklist**, test plan (test-first if the repo has adopted TDD), and explicit out-of-scope lines.
- Surface genuine decision forks to the user before handoff. Trivial defaults: just pick and note them.
- Do not write implementation code in this phase.

## Phase 2 — Execute (executor)

- Hand off via the `codex:codex-rescue` subagent (Agent tool), exactly one task per handoff.
- The forwarded request must include the executor flags (reference: `--model gpt-5.5 --effort xhigh --write`) followed by the full plan: context, conventions, file paths, acceptance criteria, and test commands the executor should run itself.
- Write the prompt tight and self-contained (see the plugin's `gpt-5-4-prompting` skill) — the executor gets no conversation history, only what's in the prompt.
- Pre-resolve repo guard scripts. If the repo mandates preflight checks before edits (branch checks, foundation guards), the planner runs them outside the sandbox during Phase 1 and the prompt must state they passed — with an explicit instruction NOT to re-run network- or credential-dependent guards inside the sandbox. They false-fail there, and the executor will stall on the contradiction between "guard failed, stop" and "proceed". (Learned 2026-06-12: a `branch:check` needing credentialed GitHub access froze a run for 14 minutes with zero edits.)
- Include a sandbox fallback clause: verification failures caused by the sandbox itself (network, registry, credentials, font fetches) are report-and-continue — never grounds to change code or retry endlessly. The reviewer re-runs all verification outside the sandbox in Phase 3 regardless.
- Do not implement alongside the executor, monitor progress, or duplicate its work. Wait for the result.

## Phase 3 — Review (reviewer)

Review as if the diff came from an untrusted contributor:

- Read every changed file in full, not just the diff hunks.
- Check each acceptance criterion from the plan explicitly.
- Run the tests and build; verify claims rather than trusting the report.
- Check glossary/ADR compliance and codebase-convention fit.
- Hunt for real bugs (edge cases, error paths, state corruption), not style nits.

Verdict:

- **Accept** — report what shipped against the plan.
- **Fix loop** — mechanical fixes up to a few lines: apply directly and say so. Anything substantive: send back to the executor with `--resume` plus a precise findings list. After two failed round trips, stop and escalate to the user with the open findings.

## Logistics

- One pipeline run per task; don't batch unrelated tasks into one executor handoff.
- Commits remain planner-side work, follow the repo's commit conventions and approval gates.
- Working root: the executor can only write inside the directory it starts in. If the target repo differs from the session cwd, pass `--cwd <repo>` in the forwarded flags or the run completes having changed nothing. Job state is keyed by that root too: `--resume` only finds threads started under the same `--cwd`, and status/result/cancel must run from that directory.
- Stall watchdog: "wait for the result" is not "wait forever". If a job's log emits no new events for several minutes, read the log tail for a guard contradiction or sandbox block before assuming deep reasoning; cancel and re-dispatch with the contradiction resolved in the prompt rather than waiting it out.
