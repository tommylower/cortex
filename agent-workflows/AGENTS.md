# agent-workflows

workflows, conventions, and setup guides for working with AI coding agents.

## index

- **agent-interviewer** — interview the user and produce a personalized agent behavior file. preset or interview mode
- **agent-swarm** — multi-agent parallel workflow. wave execution, review loops, adversarial dual-review
- **claude-workflow** — claude code working patterns. plan mode, subagents, verification, context, hooks
- **codex-review** — codex plugin setup for cross-model review and task delegation inside claude code
- **designing-loops** — pick the loop primitive for a task (turn-based, /goal, /loop, /schedule, proactive) and define its stop condition and token bound. adapted from the claude code team's "getting started with loops"
- **fable-codex** — opt-in split-stack session mode: claude (the session model) plans, codex gpt-5.5 xhigh executes (subscription or API key), claude reviews. slash-command only, never auto-applied
- **fable-prompting** — how to prompt fable for next-gen results: goal-not-steps, house rules, a hard self-checkable bar, loop against it, builder never grades itself. ships three drop-in files (house-rules block for CLAUDE.md, /loop template, verifier sub-agent prompt). source: "How I Prompt Fable"
- **google-developer-style** — clear, scannable, accessible technical writing for agent messages, explanations, reports, and documentation. adapts the Google developer documentation style guide for any agent
- **improve** — audit any codebase as a read-only senior advisor, then write prioritized, self-contained plans for cheaper models/agents to execute. never edits source. by shadcn, MIT. this is the async hand-off counterpart to the in-session engineering skills (grill-with-docs, tdd, diagnose); see [../engineering/AGENTS.md](../engineering/AGENTS.md) for the routing rule and how they stack
- **pickup** — restore a compact handoff from the latest cleared session without loading its full transcript into the current context
- **wip-quickstart** — turn a rough brief, voice dump, or idea into a compact project brief, correctly shaped workspace, and operable scaffold; applies the web defaults when relevant
- **workspace-setup** — establish, review, migrate, or repair the `workspace/` operator layer for a standalone or multi-repository project; supports minimal or coordinated, local or tracked, and general or dedicated-agent variants
- **vercel-deploy** — deploy or manage Vercel projects, preview deployments, project linking, and token-based CLI flow
- **marketing** — router to the upstream Marketing Skills submodule. points the agent at the right specialist skill in `marketing/skills/` instead of syncing all of them into agent skill listings

Design-system extraction workflows live in [../design/workflows](../design/workflows/), including **asbuilt**.

see ../AGENTS.md for the cortex layout and skill format.
