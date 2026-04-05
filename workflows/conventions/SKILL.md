---
name: conventions
description: Code style, naming, file structure, git conventions for Next.js + TypeScript projects
---

# Conventions

## Code Style
- TypeScript strict mode
- Functional components, no classes
- Named exports for components, default exports for pages
- Collocate styles, tests, and types with components

## Naming
- Files: kebab-case (e.g. `token-card.tsx`)
- Components: PascalCase (e.g. `TokenCard`)
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/interfaces: PascalCase, no I- prefix

## File Structure
```
src/
  app/           # next.js app router pages
  components/    # shared components
    ui/          # base primitives (button, input, card)
    layouts/     # page layouts, shells
    features/    # domain-specific components
  lib/           # utilities, helpers, clients
  hooks/         # custom react hooks
  types/         # shared type definitions
  styles/        # global styles, tokens
```

## Search Before You Build
- Before writing any utility, helper, or abstraction: check npm, existing project code, and MCP servers for an existing solution
- Decision order: **adopt** (exact match exists) > **extend** (partial match, add what's missing) > **compose** (combine multiple partial matches) > **build** (nothing suitable)
- This applies to agents too — don't let Claude write a date formatter when `date-fns` is already installed

## Git
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- Branch naming: `feature/description`, `fix/description`
- Squash merge to main
