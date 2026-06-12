---
name: fable-codex
description: Opt-in split-stack session mode — Claude (Fable 5) plans at high effort, Codex (gpt-5.5 at xhigh reasoning, via ChatGPT plan, no API) executes, Claude reviews at maximum scrutiny. Use only when the user invokes /fable-codex; never auto-apply. Requires the openai-codex plugin and an authenticated codex CLI.
disable-model-invocation: true
argument-hint: "[optional: the task to run through the pipeline]"
---

# fable-codex

Session mode splitting every substantive coding task into three roles:

1. **Plan** — Claude (Fable 5), careful and explicit
2. **Execute** — Codex `gpt-5.5` at `xhigh` effort, write-capable, via the codex plugin (ChatGPT plan auth, never the API)
3. **Review** — Claude (Fable 5), maximum scrutiny

Once invoked, the mode stays on for the rest of the session until the user ends it ("drop fable-codex", "stop using codex"). It applies to coding tasks only — conversation, research, planning-only questions, and ops/publishing tasks proceed normally.

If the user passed arguments, treat them as the first task and start Phase 1 immediately.

## Preconditions

- Codex CLI on PATH and `codex login status` shows ChatGPT auth. If missing or unauthenticated, stop and tell the user to run `/codex:setup`.
- This mode assumes the session model is Fable 5 (the user opts into that themselves). If it isn't, say so once and continue.

## Phase 1 — Plan (Claude)

- Explore the codebase first. Read `CONTEXT.md`, `docs/adr/`, and `docs/agents/*.md` if present; use the glossary's vocabulary throughout.
- Produce a precise implementation plan: scope, modules and interfaces touched, behavior expected, **acceptance criteria as a checklist**, test plan (test-first if the repo has adopted TDD), and explicit out-of-scope lines.
- Surface genuine decision forks to the user before handoff. Trivial defaults: just pick and note them.
- Do not write implementation code in this phase.

## Phase 2 — Execute (Codex)

- Hand off via the `codex:codex-rescue` subagent (Agent tool), exactly one task per handoff.
- The forwarded request must include the flags `--model gpt-5.5 --effort xhigh --write` followed by the full plan: context, conventions, file paths, acceptance criteria, and test commands Codex should run itself.
- Write the prompt tight and self-contained (see the plugin's `gpt-5-4-prompting` skill) — Codex gets no conversation history, only what's in the prompt.
- Pre-resolve repo guard scripts. If the repo mandates preflight checks before edits (branch checks, foundation guards), Claude runs them outside the sandbox during Phase 1 and the prompt must state they passed — with an explicit instruction NOT to re-run network- or credential-dependent guards inside the sandbox. They false-fail there, and Codex will stall on the contradiction between "guard failed, stop" and "proceed". (Learned 2026-06-12: a `branch:check` needing credentialed GitHub access froze a run for 14 minutes with zero edits.)
- Include a sandbox fallback clause: verification failures caused by the sandbox itself (network, registry, credentials, font fetches) are report-and-continue — never grounds to change code or retry endlessly. Claude re-runs all verification outside the sandbox in Phase 3 regardless.
- Do not implement alongside Codex, monitor progress, or duplicate its work. Wait for the result.

## Phase 3 — Review (Claude)

Review as if the diff came from an untrusted contributor:

- Read every changed file in full, not just the diff hunks.
- Check each acceptance criterion from the plan explicitly.
- Run the tests and build; verify claims rather than trusting the report.
- Check glossary/ADR compliance and codebase-convention fit.
- Hunt for real bugs (edge cases, error paths, state corruption), not style nits.

Verdict:

- **Accept** — report what shipped against the plan.
- **Fix loop** — mechanical fixes up to a few lines: apply directly and say so. Anything substantive: send back to Codex with `--resume` plus a precise findings list. After two failed round trips, stop and escalate to the user with the open findings.

## Logistics

- One pipeline run per task; don't batch unrelated tasks into one Codex handoff.
- Commits remain Claude-side work, follow the repo's commit conventions and approval gates.
- Stall watchdog: "wait for the result" is not "wait forever". If a job's log emits no new events for several minutes, read the log tail for a guard contradiction or sandbox block before assuming deep reasoning; cancel and re-dispatch with the contradiction resolved in the prompt rather than waiting it out.
