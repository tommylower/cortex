# agent-workflows

workflows, conventions, and setup guides for working with AI coding agents.

## index

- **agent-interviewer** — interview the user and produce a personalized agent behavior file. preset or interview mode
- **agent-swarm** — multi-agent parallel workflow. wave execution, review loops, adversarial dual-review
- **asbuilt** — derive a design-system package from a finished project's code, read-only. one verb (derive); init/diff/generate seed-only in groundwork/asbuilt.md
- **claude-workflow** — claude code working patterns. plan mode, subagents, verification, context, hooks
- **codex-review** — codex plugin setup for cross-model review and task delegation inside claude code
- **conventions** — code style, naming, file structure, git conventions for Next.js + TypeScript projects
- **dev-setup** — development setup, deployment flow, environment variable management
- **fable-codex** — opt-in split-stack session mode: fable 5 plans, codex gpt-5.5 xhigh executes (ChatGPT plan, no API), fable 5 reviews. slash-command only, never auto-applied
- **fable-prompting** — how to prompt fable 5 for next-gen results: goal-not-steps, house rules, a hard self-checkable bar, loop against it, builder never grades itself. ships three drop-in files (house-rules block for CLAUDE.md, /loop template, verifier sub-agent prompt). source: "How I Prompt Fable"
- **improve** — audit any codebase as a read-only senior advisor, then write prioritized, self-contained plans for cheaper models/agents to execute. never edits source. by shadcn, MIT. this is the async hand-off counterpart to the in-session engineering skills (grill-with-docs, tdd, diagnose); see [../engineering/AGENTS.md](../engineering/AGENTS.md) for the routing rule and how they stack
- **nightcap** — nightly agent journal. summarizes the day's Claude Code and Codex transcripts into first-person narrative entries in your own voice. mirrored to [tommylower/nightcap](https://github.com/tommylower/nightcap)
- **stack** — default technology choices for new projects. Next.js, Tailwind, Supabase, Bun, OKLCH
- **vercel-deploy** — deploy or manage Vercel projects, preview deployments, project linking, and token-based CLI flow

see ../AGENTS.md for the cortex layout and skill format.
