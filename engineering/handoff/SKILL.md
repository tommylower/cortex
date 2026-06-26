---
name: handoff
description: Close out a token-heavy session with compact continuity notes, pre-clear checks, and a short restart prompt. Use when the user asks to hand off, close out, clear context, compact context, restart, re-anchor, save tokens, or prepare a prompt for a fresh session.
author: Matt Pocock (https://github.com/mattpocock/skills)
---

# Handoff

Close the current session so the user can clear context and restart cheaply.

Optimize for continuity per token. Do not recap everything. Preserve only the facts a fresh agent needs to continue without guessing.

## Closeout check

Before writing the handoff, do a cheap readiness check:

- If in a git repo, inspect `git status --short` and the current branch.
- Identify whether there is completed work that should be committed, staged, pushed, tested, or documented before clearing context.
- Suggest concrete next actions when needed, but do not stage, commit, push, install dependencies, or run expensive verification unless the user explicitly asked for that.
- If no pre-clear action is needed, say so directly.

## Handoff content

Include only:

- Current objective and what the next session should optimize for.
- Completed work, with file paths, issue links, PR links, commit hashes, or artifact paths instead of copied content.
- Current repo state: branch, notable uncommitted files, verification already run, verification still missing.
- Decisions made, constraints, and user preferences that are still relevant.
- Open questions, blockers, and the exact next 1-3 actions.
- Suggested skills or commands the fresh agent should load.

Do not duplicate content already captured in PRDs, plans, ADRs, issues, commits, diffs, or docs. Reference those artifacts by path or URL instead.

Redact secrets, tokens, private keys, passwords, personal data, and sensitive customer information.

If the user passed arguments, treat them as the intended next-session focus and tailor the handoff around that.

## Token budget

Default to a short inline handoff. Use a temporary handoff file only when it materially shortens the restart prompt or the session has too much state to fit cleanly inline.

When writing a file:

- Save it in the operating system temp directory, not the current workspace.
- Name it `handoff-YYYYMMDD-HHMM-<short-topic>.md`.
- Keep it compact: headings plus bullets, no full diffs, no long code excerpts.

## Final response

End with this shape:

```text
Closeout:
- <commit/test/push/doc action needed before clearing, or "Nothing required before clearing context.">

Handoff:
- <inline handoff bullets, or "Saved to /tmp/...">

Restart prompt:
<one short prompt the user can paste into a fresh session>
```

The restart prompt should usually be 3-6 sentences. It should name the repo or project, the goal, any handoff file path, the immediate next action, and the relevant skills or commands to load.
