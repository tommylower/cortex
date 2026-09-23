---
name: claude-workflow
description: Claude Code working patterns — plan mode, subagents, verification, context management, hooks
---

# Claude Code Workflow

## Workflow Orchestration

For recurring or self-iterating work (`/goal`, `/loop`, `/schedule`, proactive routines), pick the primitive with the `designing-loops` skill.

### 1. Plan Mode
- Use plan mode when the approach is open, the change is architectural, or a wrong direction would be costly to redo
- If the plan stops matching what you find, re-plan instead of patching forward

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- When a user correction would apply to future sessions, save it to auto-memory as a rule with its reason

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness
- For high-risk changes (auth, data, infra): run `/codex:adversarial-review` for cross-model review before shipping (see `codex-review` skill)

### 5. Demand Elegance (Balanced)
- For non-trivial changes, a fix that feels hacky isn't finished: replace it with the clean solution before presenting
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Context Management

### Strategic Compaction

Don't rely on auto-compaction — it fires at arbitrary points. Use `/compact` deliberately at natural task boundaries.

**When to compact:**
- After exploration/research, before starting implementation
- After debugging a hard problem, before continuing feature work
- After completing a major subtask, before starting the next
- When context feels bloated with old search results or failed attempts

**When NOT to compact:**
- Mid-implementation — you'll lose the mental model of what you're building
- While debugging — you need the error context and what you've already tried
- Right after planning — the plan context is what drives implementation

### Context Budget Awareness

Every loaded component costs tokens. Be deliberate about what's active.

- With many MCP tools enabled, Claude Code defers them: only tool names load until a schema is fetched through tool search
- Skill descriptions and agent-type descriptions ride in every request whether or not they are used
- `/usage` breaks down spend by skills, subagents, and MCPs
- Quick estimate: prose = `words × 1.3` tokens, code = `chars / 4` tokens

## Hooks

### Config Protection

Prevent Claude from weakening linter/formatter/type configs instead of fixing the actual code. Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'PROTECTED=\".eslintrc .eslintrc.js .eslintrc.json eslint.config.js eslint.config.mjs .prettierrc .prettierrc.js prettier.config.js tsconfig.json biome.json\"; FILE=$(jq -r \".tool_input.file_path // empty\"); BASE=$(basename \"$FILE\" 2>/dev/null); for p in $PROTECTED; do if [ \"$BASE\" = \"$p\" ]; then echo \"BLOCKED: fix the code, not the config. do not weaken linter/formatter/type settings.\" >&2; exit 2; fi; done'"
          }
        ]
      }
    ]
  }
}
```

### Stop-Time Batch Processing

Instead of running prettier/tsc after every single edit, accumulate edited files and run format + typecheck once when Claude pauses. Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path // empty' >> /tmp/claude-edited-files.txt" }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [{ "type": "command", "command": "bash -c 'if [ -f /tmp/claude-edited-files.txt ]; then FILES=$(sort -u /tmp/claude-edited-files.txt | grep -E \"\\.(ts|tsx|js|jsx)$\"); if [ -n \"$FILES\" ]; then echo \"$FILES\" | xargs bunx prettier --write 2>/dev/null; echo \"$FILES\" | xargs bunx tsc --noEmit 2>&1 | head -20; fi; rm /tmp/claude-edited-files.txt; fi'" }]
      }
    ]
  }
}
```

## Task Management

- For multi-step work, keep a checkable plan in `tasks/todo.md` and mark items complete as you go
- Check in before implementing only when the plan changes scope or architecture, or would be costly to undo; bug reports go straight to a fix (see Autonomous Bug Fixing)
- Finish with what changed and how you verified it
- Save corrections as described in Self-Improvement Loop

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **Root Causes**: Fix the underlying cause, not the symptom; don't ship temporary fixes.
- **Minimal Impact**: Changes should only touch what's necessary.
