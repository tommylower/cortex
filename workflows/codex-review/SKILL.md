---
name: codex-review
description: Set up Codex plugin for cross-model code review and task delegation inside Claude Code
author: OpenAI (https://github.com/openai/codex-plugin-cc)
---

# Codex Review Plugin

Set up the Codex plugin for Claude Code — cross-model code review and task delegation without leaving your session.

## Install

1. **Add the marketplace and install the plugin:**
   ```bash
   /plugin marketplace add openai/codex-plugin-cc
   /plugin install codex@openai-codex
   /reload-plugins
   ```

2. **Run setup to verify Codex is ready:**
   ```bash
   /codex:setup
   ```
   If Codex isn't installed, it can install it for you. If not logged in:
   ```bash
   !codex login
   ```

3. **Verify with a quick test:**
   ```bash
   /codex:review --background
   /codex:status
   /codex:result
   ```

## Commands

### `/codex:review`

Standard code review on uncommitted changes or a branch diff. Read-only.

```bash
/codex:review                    # review uncommitted changes
/codex:review --base main        # review branch vs main
/codex:review --background       # run in background
```

### `/codex:adversarial-review`

Steerable review that challenges design decisions, not just syntax. Append free-form text to focus the review on specific risk areas.

```bash
/codex:adversarial-review
/codex:adversarial-review --base main challenge whether this caching strategy handles invalidation correctly
/codex:adversarial-review --background look for race conditions in the auth flow
```

Use this before shipping:
- auth changes
- infra scripts
- anything involving data loss or migrations
- complex state management

### `/codex:rescue`

Hands a task to Codex when Claude gets stuck or you want a different model's take.

```bash
/codex:rescue investigate why the tests started failing
/codex:rescue fix the failing test with the smallest safe patch
/codex:rescue --resume           # continue from last run
/codex:rescue --model spark      # use a faster/cheaper model
```

### `/codex:status`, `/codex:result`, `/codex:cancel`

Manage background jobs.

```bash
/codex:status                    # check running/recent jobs
/codex:result                    # get output from finished job
/codex:cancel                    # cancel active job
```

## Review Gate

Auto-reviews every time Claude finishes. Blocks completion if issues are found.

```bash
/codex:setup --enable-review-gate    # turn on
/codex:setup --disable-review-gate   # turn off
```

**Warning:** the review gate creates a Claude/Codex loop that can drain usage limits quickly. Only enable when actively monitoring.

## When to Use What

| Situation | Command |
|-----------|---------|
| Pre-ship sanity check | `/codex:review` |
| Pressure-test design decisions | `/codex:adversarial-review` |
| Claude is stuck or looping | `/codex:rescue` |
| Auth, infra, data-loss risk | `/codex:adversarial-review` with focus text |
| Want continuous cross-model review | review gate (use sparingly) |

## Requirements

- ChatGPT subscription (incl. Free) or OpenAI API key
- Node.js 18.18+
- Codex CLI (`npm install -g @openai/codex`)

## Notes

- This replaces the manual `repomix` + `llm` approach for cross-model review — same idea, built-in
- For review without a ChatGPT subscription, the manual approach in the agent-swarm skill still works with any model
- Works alongside the agent-swarm workflow — use `/codex:adversarial-review` during wave review steps instead of manual piping
- Codex config lives in `~/.codex/config.toml` (user) or `.codex/config.toml` (project)
