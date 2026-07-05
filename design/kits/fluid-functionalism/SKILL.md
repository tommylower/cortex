---
name: fluid-functionalism
description: Fluid Functionalism component-kit workflow for React/Next.js. Use when the user asks for @fluid components, animated shadcn components, proximity hover, spring controls, Micka components, or polished form/control micro-interactions.
author: Micka (https://github.com/mickadesign/fluid-functionalism)
---

# Fluid Functionalism

Use this skill to bring Fluid Functionalism into a React/Next.js project as selective shadcn registry components, not as a vendored library.

Sources:
- Docs: https://www.fluidfunctionalism.com/docs
- Registry: https://www.fluidfunctionalism.com/r/registry.json
- GitHub: https://github.com/mickadesign/fluid-functionalism

## Fit

Use Fluid Functionalism when the project already uses, or can reasonably adopt:

- React or Next.js
- Tailwind CSS
- shadcn/ui registry workflow
- Framer Motion for interactive motion
- Radix UI by default, or Base UI when the project already uses Base UI

Do not install it wholesale. Pull only the components needed for the current interface, then adapt the generated files to the project's local tokens, component names, and import aliases.

## Design Principle

Fluid Functionalism is strongest for operational UI and AI/product surfaces where motion clarifies state:

- Motion communicates state changes.
- Hover acts as preview, especially through proximity hover.
- Spring animation should adapt when a user reverses direction.
- Components should inherit the existing shadcn theme instead of imposing a new visual brand.

For one-off hover fixes, use `css-interaction-tips`. For custom React animation work, use `framer-motion`. For final visual QA, use `preflight`.

## Install Workflow

1. Confirm the project has shadcn configured (`components.json`) and Tailwind available.
2. Check whether the target file already exists, especially `components/ui/button.tsx`, `components/ui/dialog.tsx`, and similar shared primitives.
3. If existing shared primitives would be overwritten, install in a throwaway branch/project or fetch the registry JSON and port the useful pattern manually.
4. Add the registry when repeated use is likely:

```bash
npx shadcn@latest registry add @fluid
```

5. Install selected components:

```bash
npx shadcn@latest add @fluid/button
```

6. For one-off installs, use the direct registry URL:

```bash
npx shadcn@latest add https://www.fluidfunctionalism.com/r/button.json
```

7. Prefer Radix variants unless the project already uses Base UI. Base UI variants use `-base` names, such as `button-base`, `dialog-base`, `tabs-base`, and `tooltip-base`.
8. If keeping font-weight animation, ensure the app loads Inter variable or adjust the generated font-weight helper to the project's variable font.
9. Run the app, check light and dark themes, and browser-test the exact interaction. Pay attention to hover previews, keyboard focus, reduced-motion behavior, and overwritten local components.

## Component Selection

Read `references/component-inventory.md` when choosing components. For the freshest list, query the live registry:

```bash
curl -LfsS https://www.fluidfunctionalism.com/r/registry.json \
  | jq -r '.items[] | select(.type == "registry:ui") | [.name, .title, .description] | @tsv'
```

Fast choices:

- Core controls: `button`, `tabs`, `tabs-subtle`, `switch`, `slider`, `select`, `dropdown`, `tooltip`.
- Forms: `input-group`, `input-copy`, `checkbox-group`, `radio-group`, `color-picker`.
- AI/chat UI: `input-message`, `chat-message`, `thinking-indicator`, `thinking-steps`, `ask-user-questions`.
- Data and layout: `table`, `accordion`, `dialog`, `surfaces`, `elevated`.

## Adaptation Rules

- Preserve local design-system ownership. Do not replace established primitives unless the user asked for a Fluid Functionalism skin.
- Keep generated code inspectable and project-owned, like normal shadcn components.
- Normalize imports after install. The registry commonly uses `@/lib/*` and `@/components/ui/*`.
- If a component brings icon switching, decide whether the project really needs Tabler, Phosphor, and HugeIcons. Prefer the existing icon set when possible.
- Treat `surfaces` and `elevated` as a system-level choice. Install them when nested popovers, dialogs, or dropdowns need a consistent elevation ladder.
- Keep MIT attribution when copying substantial source out of the upstream repo instead of installing through the registry.

## Validation

After integration:

- Run the repo's lint/build/test commands.
- Use a browser check for the changed screen.
- Verify keyboard focus, disabled states, loading states, and dark mode.
- Inspect generated CSS variables and dependencies for unintended palette or package sprawl.
