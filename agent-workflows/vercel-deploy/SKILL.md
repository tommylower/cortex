---
name: vercel-deploy
description: "Deploy or manage projects on Vercel from an agent workflow. Use when the user asks to deploy to Vercel, create a preview deployment, push a Vercel preview, link a project to Vercel, explain Vercel deployment flow, or work with Vercel CLI/token setup."
author: Vercel Labs pattern adapted for Cortex
---

# Vercel Deploy

Use this for deployment workflow, not design work. Default to preview deployments unless the user explicitly asks for production.

## What Vercel Deployment Does

Vercel can deploy in two common ways:

- **Git integration:** pushing a branch triggers a Vercel build. Non-production branches produce preview URLs; the production branch produces the production deployment.
- **CLI deployment:** `vercel deploy` uploads the current project and returns a deployment URL. This is useful for unlinked projects, prototypes, or repos without git integration.

Linking creates `.vercel/project.json` or `.vercel/repo.json`, which tells the CLI which Vercel project/team the local repo belongs to.

## Initial Checks

Run these before choosing a path:

```bash
git remote get-url origin 2>/dev/null
cat .vercel/project.json 2>/dev/null || cat .vercel/repo.json 2>/dev/null
vercel whoami 2>/dev/null
vercel teams list --format json 2>/dev/null
```

If multiple teams are available and the project is not already linked, ask which team slug to use. If `.vercel/` already exists, use the linked org/project.

## Preferred Flow

1. If the project is linked and has a git remote, ask before committing or pushing.
2. Commit intentionally, push the branch, and let Vercel create the preview deployment.
3. Use `vercel ls --format json` or the git provider checks to find the preview URL.

## CLI Flow

Use CLI deploy when there is no git remote or the user explicitly wants direct deployment:

```bash
vercel deploy -y --no-wait
vercel inspect <deployment-url>
```

Production deploys require explicit user wording:

```bash
vercel deploy --prod -y --no-wait
```

## Token-Based Flow

If using a token, prefer `VERCEL_TOKEN` in the environment. Do not pass tokens through command-line flags.

```bash
export VERCEL_TOKEN="<token>"
vercel deploy -y --no-wait
```

If available, also export both project variables:

```bash
export VERCEL_ORG_ID="<org-id>"
export VERCEL_PROJECT_ID="<project-id>"
```

## Safety Rules

- Preview by default.
- Never push, create production deployments, or modify Vercel environment variables without explicit user intent.
- Never commit `.env` files or token values.
- Do not rely on interactive commands when a non-interactive flag or state check exists.
- If a build fails after adding dev tools, inspect top-level imports for dev-only packages first.
