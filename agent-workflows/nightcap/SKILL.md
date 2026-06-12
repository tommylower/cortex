---
name: nightcap
description: Nightcap, a nightly agent journal. Reads recent Claude Code and Codex transcripts off disk, skips trivial sessions, and writes one first-person narrative journal entry per real session, like a handwritten end-of-day journal. Use when the user wants an agent session journal, a daily log of AI sessions, transcript summaries, "what did i work on today/this week", to set up or troubleshoot nightcap, or to customize its voice. Triggers: nightcap, journal, session journal, agent journal, daily log, summarize my sessions, what did i do today.
---

# nightcap

A stdlib-only Python script that turns raw agent transcripts into a narrative journal. Every night (or on demand) it:

1. discovers recent sessions: `~/.claude/projects/*/*.jsonl` (skipping `agent-*` subagent files) and `~/.codex/sessions/**/rollout-*.jsonl`, filtered by file mtime within a lookback window (default 3 days)
2. parses each transcript down to user/assistant text, filtering noise (command wrappers, system reminders, environment context). grabs cwd (first-seen wins, since cwd can drift mid-session), timestamps, model, and the session title
3. applies a substance filter: a session needs ≥2 user messages and ≥200 user chars, or 1 message ≥1500 chars. one-shot trivia never gets journaled
4. condenses to ~24k chars (user messages truncated at 700, assistant at 400, middle trimmed)
5. summarizes via `claude -p` (haiku by default) into 1-3 first-person paragraphs in the owner's voice
6. writes one markdown entry per session and records it in `<journal_dir>/.state.json` so nothing is journaled twice. failed summaries stay pending and retry next run

Filenames are `YYYY/YYYY-MM-DD-HHMM-<agent>-<projectslug>.md`, keyed on session **start** time. Nice side effect: duplicate transcripts from resumed sessions collapse into one entry.

A `NIGHTCAP-SUMMARIZER` sentinel leads the summarizer prompt and is in the noise filters, so nightcap never journals its own headless runs.

## entry format

```markdown
# 2026-06-10 — Integrate GitHub repository as a skill

- date: 2026-06-10, 15:18 to 15:31
- agent: Claude Code (claude-opus-4-8)
- project: `/Users/you/dev/somerepo`
- chat: `claude --resume <session-id>  (from /Users/you/dev/somerepo)`
- transcript: `~/.claude/projects/.../<session-id>.jsonl`

1-3 paragraphs of first-person narrative: tone and energy, the kind of
thinking (debugging, designing, planning), what the session was actually
about, and how the agent helped.
```

The `chat:` line is a working resume command (`claude --resume <id>` / `codex resume <id>`), so every entry links back to the live conversation.

## setup

```bash
# 1. try it
scripts/nightcap.py --dry-run          # list what would be journaled
scripts/nightcap.py --limit 1          # write one entry to check the voice

# 2. personalize (optional but recommended)
mkdir -p ~/.config/nightcap
cp assets/config.example.json ~/.config/nightcap/config.json
# then edit: your name, speaker label, voice rules, journal location

# 3. schedule nightly (macOS launchd, 23:30 or next wake)
SCRIPT="$(pwd)/scripts/nightcap.py"
sed -e "s|__SCRIPT_PATH__|$SCRIPT|g" -e "s|__HOME__|$HOME|g" \
  assets/local.nightcap.plist > ~/Library/LaunchAgents/local.nightcap.plist
launchctl load ~/Library/LaunchAgents/local.nightcap.plist
```

On Linux, schedule the same command with cron or a systemd timer instead.

## configuration

`~/.config/nightcap/config.json` (or `--config <path>`, or `NIGHTCAP_CONFIG` env var). Every key is optional:

| key | default | meaning |
| --- | --- | --- |
| `journal_dir` | `~/notes/agent-journal` | where entries and `.state.json` live |
| `name` | `the user` | who the journal belongs to; the summarizer writes as this person |
| `speaker_label` | `USER` | label for your lines in the condensed transcript (use your first name) |
| `voice` | plain understated prose | stylistic rules for the narrative (casing, punctuation, tone) |
| `model` | `haiku` | model for `claude -p --model` |
| `claude_bin` | found on PATH | explicit path to the claude CLI if it isn't on launchd's PATH |

Structural rules are fixed regardless of voice: first person, past tense, 1-3 short paragraphs, no headers, no lists, no invented specifics.

## usage

```bash
scripts/nightcap.py                 # sweep now
scripts/nightcap.py --dry-run       # preview pending sessions
scripts/nightcap.py --days 7        # widen the lookback window
scripts/nightcap.py --limit 3       # cap entries written this run
```

Journal entries are personal: keep `journal_dir` out of any public repo (gitignore it if it lives inside one).

## troubleshooting

- no entries written: check `--dry-run` output. sessions already in `.state.json` or below the substance thresholds are skipped silently
- summarizer failures: the run logs to stderr (`~/Library/Logs/nightcap.log` under launchd) and retries those sessions next sweep
- wrong or missing claude CLI under launchd: set `claude_bin` in the config, launchd's PATH is minimal
- entries in the wrong voice: edit `voice` in the config; the next sweep uses it (already-written entries are not rewritten)
