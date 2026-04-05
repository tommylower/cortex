---
name: dev-setup
description: Development setup, deployment flow, and environment variable management
---

# Dev Setup & Deployment

## Deployment
- Push to main → Vercel auto-deploys to production
- Push to any branch → Vercel preview deployment
- Supabase migrations run via CLI, not auto-deployed

## Development
1. Clone repo
2. `cp .env.example .env.local` (fill in keys)
3. `bun install`
4. `bun dev`

## Environment Variables
- Never commit `.env` files
- Use `.env.example` as the template with placeholder values
- Vercel env vars for production
- Supabase project settings for DB keys
