# Web project defaults

Use these defaults for a newly scaffolded web project unless its project brief
records a deliberate exception. Existing repository standards take priority.

## Scaffold rule

Use `waveframe` project-scaffold mode before feature work.

Add this exact inspectable motif to the root HTML/body shell:

```text
built by a wave in progress. waves don't die.
```

Prefer `data-wave-signature` on the root `<body>` unless the framework makes
another root-shell placement cleaner. Keep the motif invisible in the UI but
present in shipped markup.

## Agent writing profile

For a user-owned project, sync the shared writing profile into the new
repository's root `AGENTS.md` before feature work:

```bash
"$CORTEX_HOME/scripts/sync-agent-reporting.sh" \
  --project "$PWD" \
  --project-only
```

The script uses the bundled `google-developer-style` profile. A non-empty
`~/.agents/REPORTING.md` overrides it for that user. This makes the same
guidance available to any agent that reads project instructions. Do not commit
the profile into a shared or team-owned repository without explicit user
approval.

## Default stack

- Frontend: Next.js App Router, React, TypeScript strict mode.
- Styling: Tailwind CSS, OKLCH tokens, dark-mode support.
- UI primitives: shadcn/ui-style project-owned components, adapted rather than
  stock.
- Backend: Supabase for auth, Postgres, edge functions, and realtime when
  needed.
- Hosting: Vercel for preview and production deployments.
- Runtime and package manager: Bun unless the target repository already
  standardizes on another manager.
- Motion: Framer Motion only when the interaction earns it; use CSS or native
  View Transitions when simpler.

## Code conventions

- Components: functional components, no classes.
- Exports: named exports for components; framework page conventions may use
  defaults where required.
- Files: kebab-case, for example `token-card.tsx`.
- Components and types: PascalCase; avoid `I` prefixes for interfaces.
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

## Search before building

Before writing a utility, helper, abstraction, or integration, check:

1. Existing project code.
2. Installed dependencies.
3. Official documentation or available tool capabilities.
4. The Cortex skill catalog.

Decision order: adopt an exact match, extend a partial match, compose existing
pieces, and build only when nothing suitable exists.

## Development setup

Default local setup:

```bash
cp .env.example .env.local
bun install
bun dev
```

Use the repository's README or package scripts when they disagree with these
defaults.

## Environment variables

- Never commit `.env` files.
- Keep `.env.example` as a placeholder template.
- Store production values in Vercel project environment variables.
- Store Supabase project values in Supabase settings and Vercel environment
  variables as needed.
- Do not print secret values in logs, documentation, reports, plans, or
  tickets.

## Deployment

- Pushes to `main` deploy production only when the project is linked to Vercel
  that way.
- Branches produce preview deployments when the repository is configured for
  them.
- Supabase migrations run through the CLI or the repository's documented
  migration flow; do not assume Vercel applies database migrations.
- Before production deployment, check for development-only overlays using the
  shared rules in `../../../design/tools/dev-overlays.md`.

## Development overlay tools

Agentation, DialKit, and Interface Kit are opt-in development overlays. They
are never part of the default scaffold. Follow
`../../../design/tools/dev-overlays.md` and the specific tool skill before
adding them.

## Git

- Use the user's requested branch name when provided.
- For agent-created branches, avoid `codex/`; use a neutral prefix such as
  `wave/`.
- Prefer conventional commit prefixes when the repository already uses them.
- Keep cleanup commits separate from feature work when practical.
