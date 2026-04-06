---
name: claude-workflow
description: Claude Code working patterns — plan mode, subagents, verification, context management, hooks
---

# Claude Code Workflow

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity
- **Golden rule**: capture everything during planning so implementation doesn't need to search the codebase. If you'd need to grep during implementation, find it now and put it in the plan.

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness
- For high-risk changes (auth, data, infra): run `/codex:adversarial-review` for cross-model review before shipping (see `codex-review` skill)

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
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

- Each MCP tool costs ~500 tokens just being registered (tool description in context)
- A 30-tool MCP server costs more context than all your skills combined
- Keep under 10 MCP servers enabled, under 80 total tools active
- Agent descriptions load into every Task tool invocation even if the agent is never spawned
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
        "command": "bash -c 'PROTECTED=\".eslintrc .eslintrc.js .eslintrc.json eslint.config.js eslint.config.mjs .prettierrc .prettierrc.js prettier.config.js tsconfig.json biome.json\"; FILE=\"$CLAUDE_FILE_PATH\"; BASE=$(basename \"$FILE\" 2>/dev/null); for p in $PROTECTED; do if [ \"$BASE\" = \"$p\" ]; then echo \"BLOCKED: fix the code, not the config. do not weaken linter/formatter/type settings.\"; exit 2; fi; done'"
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
        "command": "bash -c 'echo \"$CLAUDE_FILE_PATH\" >> /tmp/claude-edited-files.txt'"
      }
    ],
    "Stop": [
      {
        "command": "bash -c 'if [ -f /tmp/claude-edited-files.txt ]; then FILES=$(sort -u /tmp/claude-edited-files.txt | grep -E \"\\.(ts|tsx|js|jsx)$\"); if [ -n \"$FILES\" ]; then echo \"$FILES\" | xargs bunx prettier --write 2>/dev/null; echo \"$FILES\" | xargs bunx tsc --noEmit 2>&1 | head -20; fi; rm /tmp/claude-edited-files.txt; fi'"
      }
    ]
  }
}
```

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
