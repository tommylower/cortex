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

### Process

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

Swap the `-s` system prompt each round to rotate perspectives. Replace `gpt-5.2` with whatever external model you prefer — the key is using a different model than the one writing the code.

### Why Looping Works

- Round 1 catches the obvious bugs
- Round 2 catches bugs introduced by Round 1 fixes
- Round 3 from a different perspective catches what both rounds missed
- Consecutive approvals mean the code is actually stable, not just "fixed the last thing"
- Different perspectives catch different classes of bugs — security reviewers miss UX issues and vice versa

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

## Required Tooling

Before using this workflow, install:

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
