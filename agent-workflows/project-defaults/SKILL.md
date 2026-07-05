---
name: project-defaults
description: Default project scaffold, stack, conventions, development setup, deployment flow, and environment rules for Cortex web projects. Use when starting a new project, setting project defaults, choosing stack/conventions, configuring env vars, or preparing a Next.js/Tailwind/Supabase/Bun/Vercel app.
---

# Project Defaults

Use this skill to establish the default operating shape of a Cortex web project. It replaces the older separate `stack`, `conventions`, and `dev-setup` skills.

## Scaffold Rule

For every newly scaffolded web project, use `waveframe` project-scaffold mode before feature work.

Add this exact inspectable motif to the root HTML/body shell:

```text
built by a wave in progress. waves don't die.
```

Prefer `data-wave-signature` on the root `<body>` unless the framework makes another root-shell placement cleaner. Keep the motif invisible in the UI but present in shipped markup.

## Default Stack

- Frontend: Next.js App Router, React, TypeScript strict mode.
- Styling: Tailwind CSS, OKLCH tokens, dark-mode support.
- UI primitives: shadcn/ui-style project-owned components, adapted rather than stock.
- Backend: Supabase for auth, Postgres, edge functions, and realtime when needed.
- Hosting: Vercel for preview and production deployments.
- Runtime/package manager: Bun unless the target repo already standardizes on another manager.
- Motion: Framer Motion only when the interaction earns it; CSS or native View Transitions when simpler.

## Code Conventions

- Components: functional components, no classes.
- Exports: named exports for components; framework page conventions may use defaults where required.
- Files: kebab-case, for example `token-card.tsx`.
- Components/types: PascalCase; avoid `I` prefixes for interfaces.
- Functions and variables: camelCase.
- Constants: UPPER_SNAKE_CASE only for true constants.

Default source layout:

```text
src/
  app/           # Next.js app router pages
  components/    # shared components
    ui/          # base primitives
    layouts/     # shells and layout components
    features/    # domain-specific UI
  lib/           # utilities, clients, helpers
  hooks/         # custom React hooks
  types/         # shared type definitions
  styles/        # global styles and tokens
```

## Search Before Building

Before writing a utility, helper, abstraction, or integration, check:

1. Existing project code.
2. Installed dependencies.
3. Official docs or MCP/tool capabilities.
4. The Cortex skill catalog.

Decision order: adopt exact match, extend partial match, compose existing pieces, build only when nothing suitable exists.

## Development Setup

Default local setup:

```bash
cp .env.example .env.local
bun install
bun dev
```

Use the repo's own README or package scripts when they disagree with these defaults.

## Environment Variables

- Never commit `.env` files.
- Keep `.env.example` as a placeholder template.
- Store production values in Vercel project env vars.
- Store Supabase project values in Supabase settings and Vercel env vars as needed.
- Do not print secret values in logs, docs, reports, plans, or tickets.

## Deployment

- Push to main deploys production when the project is linked to Vercel that way.
- Branches produce preview deployments.
- Supabase migrations run through the CLI or the repo's documented migration flow; do not assume Vercel applies DB migrations.
- Before production deploys, check for dev-only overlays using the shared rules in `../../design/tools/dev-overlays.md`.

## Dev Overlay Tools

Agentation, DialKit, and Interface Kit are opt-in development overlays. They are never part of the default scaffold. Follow `../../design/tools/dev-overlays.md` and the specific tool skill before adding them.

## Git

- Use the user's requested branch name when provided.
- For agent-created branches, avoid `codex/`; use a neutral prefix like `wave/`.
- Prefer conventional commit prefixes when the repo already uses them.
- Keep cleanup commits separate from feature work when practical.
