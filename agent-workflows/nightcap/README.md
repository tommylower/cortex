# nightcap

a nightly journal of your AI agent sessions, written in your voice.

every night, nightcap reads the day's Claude Code and Codex transcripts off your disk, skips the trivial ones, and writes one short first-person journal entry per real session. like a handwritten end-of-day journal, except your agents keep it for you.

```markdown
# 2026-06-10 — Integrate GitHub repository as a skill

- date: 2026-06-10, 15:18 to 15:31
- agent: Claude Code (claude-opus-4-8)
- project: `/Users/you/dev/somerepo`
- chat: `claude --resume 76f4486b-...  (from /Users/you/dev/somerepo)`
- transcript: `~/.claude/projects/.../76f4486b-....jsonl`

had Claude Code help me integrate the improve skill into my library. i pointed
it at the repo and asked how to drop it in, and it explored the structure
methodically, understanding how the categories and conventions work. the push
hit a snag with the wrong GitHub account active, so it caught that, switched
accounts, and got it through. felt good to ship with verification done instead
of guessing.
```

every entry links back to the live conversation with a working `claude --resume` / `codex resume` command.

## why

transcripts are write-only memory. you generate dozens a week and never look at them again. nightcap turns them into something you'd actually reread: a narrative of what you were working on, how you were thinking, and what your agents helped with. a month in, you have a diary of your work.

## how it works

- **discovers** recent sessions from `~/.claude/projects/` and `~/.codex/sessions/`
- **filters** noise (command wrappers, system reminders) and trivial one-shot sessions
- **condenses** each transcript to ~24k chars
- **summarizes** with `claude -p` (haiku by default) into 1-3 first-person paragraphs in your configured voice
- **remembers** what it journaled in a state file, so nothing is written twice and failed summaries retry next run

one stdlib-only python script. no dependencies beyond the `claude` CLI.

## quick start

```bash
./scripts/nightcap.py --dry-run     # see what would be journaled
./scripts/nightcap.py --limit 1     # write one entry, check the voice
```

personalize it (name, voice rules, journal location):

```bash
mkdir -p ~/.config/nightcap
cp assets/config.example.json ~/.config/nightcap/config.json
```

schedule it nightly on macOS:

```bash
SCRIPT="$(pwd)/scripts/nightcap.py"
sed -e "s|__SCRIPT_PATH__|$SCRIPT|g" -e "s|__HOME__|$HOME|g" \
  assets/local.nightcap.plist > ~/Library/LaunchAgents/local.nightcap.plist
launchctl load ~/Library/LaunchAgents/local.nightcap.plist
```

linux: run the same command from cron or a systemd timer.

full docs, configuration reference, and troubleshooting: [SKILL.md](SKILL.md). the skill format follows the [Agent Skills specification](https://agentskills.io/specification.md), so any agent that reads markdown can operate and troubleshoot nightcap for you.

## part of cortex

nightcap is developed in [cortex](https://github.com/tommylower/cortex), an agent-agnostic library of skills, workflows, and tools. this repo is a published mirror of `agent-workflows/nightcap/`.

MIT, by [Tommy Lower](https://github.com/tommylower).
