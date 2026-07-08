---
name: agent-swarm
description: Multi-agent parallel workflow — wave execution, review loops, adversarial dual-review
---

# Parallel Agent Swarm Workflow

Use this for complex projects requiring multiple parallel workstreams and rigorous review.

## When to Use

- Multi-feature builds with independent components
- Projects where quality/security is critical
- Anything taking more than a few hours of work

## Pattern

1. Decompose the feature into independent sub-tasks
2. `TeamCreate` with a descriptive name
3. `TaskCreate` all tasks with dependencies (`blockedBy`)
4. Wave execution: spawn 2-4 agents per wave for independent tasks
5. Review loop after each wave (see below)
6. Fix findings immediately
7. Commit after each logical milestone
8. Shutdown agents after completion, `TeamDelete` to clean up
9. Update docs: keep project status, memory, and instructions current

## Agent Rules

- Always read existing code before modifying
- Use `bypassPermissions` mode for background agents
- Every agent must verify the project builds before reporting completion
- Max 4 parallel agents per wave (prevents merge conflicts)
- Shutdown agents immediately after task completion
- Never skip external review — it catches real bugs every time

---

## Review Loop (Ralph Loop)

For any significant design or implementation work, use an iterative review loop with an external model. The loop continues until you get consecutive approvals — not just one pass.

### Quick Path: Codex Plugin

If the Codex plugin is installed (see `codex-review` skill), use it instead of manual piping:

```bash
/codex:adversarial-review challenge the auth design and look for race conditions
/codex:adversarial-review --background look for data loss scenarios in the migration
```

Run adversarial review after each wave. Append focus text to steer the review toward the risk area that matters most for that wave. This replaces the manual repomix + llm flow below.

### Manual Process (Universal Fallback)

Use this if you don't have a ChatGPT subscription or need models the Codex plugin doesn't support.

1. **Design/Implement** — create initial design or code
2. **Submit for review** — flatten with repomix, pipe to external LLM with high reasoning
3. **Iterate** — address every finding, resubmit
4. **Approval gate** — continue until receiving N consecutive approvals (recommend 2-3)
5. **Rotate perspectives** — each review round should use a different review lens:
   - **Security/Attacker** — "Find exploits, injection vectors, race conditions, privilege escalation"
   - **User/UX** — "Find confusing flows, poor error messages, unnecessary friction"
   - **Correctness** — "Find logic bugs, off-by-ones, missed edge cases, broken invariants"
   - **Equivalence** — "Compare against the spec/reference implementation for deviations"
   - **Performance** — "Find N+1 queries, unnecessary allocations, missing indexes"

### Review Command

```bash
cd path/to/package
repomix --style plain --include "src/relevant/**" . -o repomix-output.txt && \
cat repomix-output.txt | llm -m gpt-5.2 -o reasoning_effort high \
  -s "Review this code from a SECURITY perspective. You are an attacker trying to break this system. Find exploits, race conditions, input validation gaps, and privilege escalation paths." \
  > code-reviews/review-$(date +%Y%m%d-%H%M%S).md && \
rm repomix-output.txt
```

Swap the `-s` system prompt each round to rotate perspectives.

### Why Looping Works

- Round 1 catches the obvious bugs
- Round 2 catches bugs introduced by Round 1 fixes
- Round 3 from a different perspective catches what both rounds missed
- Consecutive approvals mean the code is actually stable, not just "fixed the last thing"
- Different perspectives catch different classes of bugs

### Example Loop

```
Wave 1: Build auth module (3 agents in parallel)
  → Review round 1 (security lens): Found 2 CRITICAL, 1 HIGH
  → Fix all 3 findings
  → Review round 2 (correctness lens): Found 1 MEDIUM
  → Fix finding
  → Review round 3 (security lens): APPROVED ✓
  → Review round 4 (UX lens): APPROVED ✓
  → 2 consecutive approvals → commit and move to Wave 2
```

---

## Adversarial Dual-Review (Santa Method)

For code that ships without human review, use two independent reviewers — ideally different models — that must both approve before merging.

### Quick Path: Codex Plugin + Claude

With the Codex plugin installed, the dual-review is built in — Claude writes, Codex reviews. Enable the review gate for automatic cross-model checking:

```bash
/codex:setup --enable-review-gate
```

For manual dual-review or when you need more control:

### Process

1. **Implement** — build the feature or fix
2. **Reviewer A** — pipe to external model (e.g. GPT via `llm` CLI) with a specific review lens
3. **Reviewer B** — pipe to a different model or same model with a different lens
4. **Gate** — both must approve. If either flags issues, fix all findings, commit, re-run with fresh reviewers
5. **Max 3 rounds** — if still failing after 3 rounds, escalate to a human

### Why Two Reviewers

- Single-model review has blind spots — the model that wrote the code shares biases with the model reviewing it
- Fresh agents each round prevents anchoring
- Different models catch different classes of issues

### Example

```bash
# reviewer A: security lens via GPT
repomix --style plain --include "src/auth/**" . -o /tmp/review.txt && \
cat /tmp/review.txt | llm -m gpt-5.2 -o reasoning_effort high \
  -s "Review this code for security vulnerabilities. Find injection vectors, auth bypasses, race conditions." \
  > reviews/security-$(date +%Y%m%d).md

# reviewer B: correctness lens via Gemini
cat /tmp/review.txt | llm -m gemini-2.5-pro \
  -s "Review this code for logic bugs, edge cases, broken invariants, and spec deviations." \
  > reviews/correctness-$(date +%Y%m%d).md

rm /tmp/review.txt
```

Both return APPROVED → merge. Either flags issues → fix, re-run both.

---

## Required Tooling

```bash
# repomix — flattens codebase into single file
npm install -g repomix

# llm CLI — pipes to external models
pip install llm
llm keys set openai  # or whatever provider
```

---

## Tips

- Use `MEMORY.md` (in `.claude/`) to persist lessons learned across sessions
- Keep a regression checklist — every bug you hit becomes a checklist item
- Document each review round's findings — future sessions learn from past mistakes
- The two patterns complement each other: swarm handles parallelism and throughput, review loop handles quality and correctness
- To run a swarm or review loop on a trigger or schedule instead of by hand, pick the loop primitive with the `designing-loops` skill
