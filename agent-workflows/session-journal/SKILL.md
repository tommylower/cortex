---
name: session-journal
description: "Maintain a markdown journal of AI-assisted work sessions and a rolling profile of the user's preferences, reasoning patterns, coding habits, and workflow tendencies. Use when the user asks to summarize a session, log lessons learned, track how they think or code over time, preserve decisions across agents, or keep a durable markdown memory in the repo. Triggers: session summary, log this session, journal this work, update my profile, track how I code, session notes, working style log."
---

# Session Journal

Keep a lightweight markdown record of agent sessions so future work has durable context.

## Default Paths

Use these paths unless the user asks for a different location:

- `notes/agent-journal/README.md` — local auto-generated dashboard with latest sessions first
- `notes/agent-journal/OVERVIEW.md` — stable docs for how the journal works
- `notes/agent-journal/profile.md` — rolling profile of stable and tentative patterns
- `notes/agent-journal/sessions/YYYY/YYYY-MM-DD-short-title.md` — one note per meaningful session

If the paths do not exist, create them.

## Goals

- Capture what happened in a session without replaying the entire transcript
- Record durable preferences about how the user thinks, codes, decides, and wants help
- Keep future sessions easier to start, even across different agents
- Avoid diary noise, flattery, or speculative personality analysis

## Workflow

1. Write or update the session note first.
2. Update `profile.md` only when there is a durable signal or an explicit user preference.
3. Prefer evidence from repeated sessions over one-off guesses.
4. Mark early observations as tentative instead of treating them as stable truth.

## Automatic Capture

If Claude hooks are available, use:

- `scripts/session-journal-start.sh` on `SessionStart`
- `scripts/session-journal-stop.sh` on `Stop`

If Codex `notify` is available, use:

- `scripts/codex-turn-ended-notify.sh` as the `notify` wrapper

Automatic capture is best for metadata, touched files, branch, and git status snapshots.

The auto-capture scripts should also rebuild `notes/agent-journal/README.md` so the latest sessions and aggregate stats stay current without manual upkeep.

For a high-quality narrative summary, still run this skill explicitly near the end of an important session.

## Session Note Rules

- Focus on outcome, decisions, lessons, and open loops
- Link to the key files that changed or matter
- Keep it factual and compact
- Include only the context a future agent would actually need
- Always include the agent or tool used for the session
- Include a one-line work summary near the top of the note

Use the structure in `assets/session-template.md`.

## Profile Rules

- Store stable preferences, recurring patterns, and workflow constraints
- Separate stable preferences from tentative signals
- Do not write private speculation or unnecessary biography
- Promote a pattern from tentative to stable only when it repeats or the user states it directly

Use the structure in `assets/profile-template.md`.

## What Belongs in the Journal

- How the user likes explanations framed
- How much structure versus flexibility they prefer
- Recurring coding or design preferences
- Preferred verification style
- Tooling preferences and workflow habits
- Important repo-specific decisions that future sessions should inherit

## What Does Not Belong

- Raw transcript dumps
- Compliments or personality fanfiction
- Sensitive secrets or credentials
- Low-signal chatter with no future value

## Output

When you finish a journal update, report:

- which session file was created or updated
- whether `profile.md` changed
- the one-line summary of any new durable preference recorded
