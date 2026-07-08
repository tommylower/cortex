# agent-workflows

workflows, conventions, and setup guides for working with AI coding agents.

## index

- **agent-interviewer** — interview the user and produce a personalized agent behavior file. preset or interview mode
- **agent-swarm** — multi-agent parallel workflow. wave execution, review loops, adversarial dual-review
- **claude-workflow** — claude code working patterns. plan mode, subagents, verification, context, hooks
- **codex-review** — codex plugin setup for cross-model review and task delegation inside claude code
- **designing-loops** — pick the loop primitive for a task (turn-based, /goal, /loop, /schedule, proactive) and define its stop condition and token bound. adapted from the claude code team's "getting started with loops"
- **fable-codex** — opt-in split-stack session mode: fable 5 plans, codex gpt-5.5 xhigh executes (ChatGPT plan, no API), fable 5 reviews. slash-command only, never auto-applied
- **fable-prompting** — how to prompt fable 5 for next-gen results: goal-not-steps, house rules, a hard self-checkable bar, loop against it, builder never grades itself. ships three drop-in files (house-rules block for CLAUDE.md, /loop template, verifier sub-agent prompt). source: "How I Prompt Fable"
- **improve** — audit any codebase as a read-only senior advisor, then write prioritized, self-contained plans for cheaper models/agents to execute. never edits source. by shadcn, MIT. this is the async hand-off counterpart to the in-session engineering skills (grill-with-docs, tdd, diagnose); see [../engineering/AGENTS.md](../engineering/AGENTS.md) for the routing rule and how they stack
- **nightcap** — nightly agent journal. summarizes the day's Claude Code and Codex transcripts into first-person narrative entries in your own voice. mirrored to [tommylower/nightcap](https://github.com/tommylower/nightcap)
- **project-defaults** — default scaffold, stack, conventions, env setup, deployment flow, and dev-overlay boundaries for Cortex web projects
- **vercel-deploy** — deploy or manage Vercel projects, preview deployments, project linking, and token-based CLI flow

Design-system extraction workflows live in [../design/workflows](../design/workflows/), including **asbuilt**.

see ../AGENTS.md for the cortex layout and skill format.
