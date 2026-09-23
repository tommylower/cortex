---
name: marketing
description: Router to the upstream Marketing Skills library by Corey Haines. Use for marketing and growth work of any kind, including copy and content, SEO and AI search, paid ads and ad creative, email and SMS, conversion and onboarding, pricing and offers, launches, PR and events, sales and prospecting, and analytics and attribution. It names the specialist skill to read and where it lives.
author: Corey Haines (https://github.com/coreyhaines31/marketingskills), routed by Cortex
---

# marketing

Cortex keeps the upstream [Marketing Skills](https://github.com/coreyhaines31/marketingskills) library as a git submodule at `marketing/`. Its skills are not installed into agent skill directories one by one. This skill routes to them instead.

## find the files

This skill's folder is a symlink into the Cortex checkout. Resolve its real path and go up two levels to reach the Cortex root. The library lives at `marketing/` under that root.

## pick the skill

1. Read the **Available Skills** table in `marketing/README.md`. It lists every skill with its purpose, and upstream keeps it current. **How Skills Work Together** in the same file explains how the skills hand off to each other.
2. Read `marketing/skills/<name>/SKILL.md` in full for the skill whose purpose matches the task, and follow it. Each skill loads its own `references/` files relative to its own folder.

When a task spans two areas, such as landing-page copy plus the A/B test for it, read both skills.
