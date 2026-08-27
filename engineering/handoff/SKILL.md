---
name: handoff
description: Create a compact restart capsule before leaving or clearing an active session. Use proactively at a natural stopping point while the session is still cache-warm.
author: Matt Pocock (https://github.com/mattpocock/skills)
---

# Handoff

Create a compact restart capsule before the user steps away or clears context. Optimize for continuity per token: preserve only what a fresh agent needs to continue without guessing.

## Closeout check

Use information already present in the conversation. Before writing the capsule:

- If the branch or working-tree state is unknown or may have changed, run one combined status check. Do not inspect the repository again when the current state is already known.
- Identify whether there is completed work that should be committed, staged, pushed, tested, or documented before clearing context.
- Suggest concrete next actions when needed, but do not stage, commit, push, install dependencies, or run expensive verification unless the user explicitly asked for that.

## Handoff content

The capsule should include only:

- Current objective and what the next session should optimize for.
- Completed work, with file paths, issue links, PR links, commit hashes, or artifact paths instead of copied content.
- Current repo state: branch, notable uncommitted files, verification already run, verification still missing.
- Decisions made, constraints, and user preferences that are still relevant.
- Open questions, blockers, and the exact next 1-3 actions.
- Skills or commands the fresh agent must load immediately. Omit optional suggestions.

Do not duplicate content already captured in PRDs, plans, ADRs, issues, commits, diffs, or docs. Reference those artifacts by path or URL instead.

Redact secrets, tokens, private keys, passwords, personal data, and sensitive customer information.

If the user passed arguments, treat them as the intended next-session focus and tailor the handoff around that.

## Token budget

Keep the capsule inline and aim for 200-400 tokens. Exceed that only when omission would force the next agent to repeat material work. Do not include diffs or long code excerpts.

## Final response

End with one paste-ready capsule. Keep the marker comments exact so session-recovery tooling can extract it from a saved transcript:

```text
Closeout:
- <commit/test/push/doc action needed before clearing, or "Nothing required before clearing context.">

<!-- cortex-handoff:start -->
Continue in <repo or project>. <Current objective and desired outcome.>

State:
- <completed work and durable artifact references>
- <branch, notable uncommitted files, and verification state>

Constraints:
- <only constraints and decisions that still affect the work>

Next:
1. <immediate action>
2. <optional second or third action>
<!-- cortex-handoff:end -->
```
