# Drift Audit

Use this mode to find mismatch between project docs, design-system files, and actual implementation.

## Goal

Report drift before it compounds. Do not rewrite everything automatically.

## Check surfaces

- `README.md`
- `AGENTS.md`
- `design-system/SKILL.md`
- `design-system/references/*`
- `cortex/local/<name>-design/`, when used
- `package.json`
- framework config
- global CSS/tokens
- component folders
- page/app routes
- Paper/Figma target notes, if relevant

## Findings

Report:

- docs mention missing files
- files exist but docs do not mention them
- design-system status conflicts with actual completeness
- platform mapping conflicts with package/framework
- token docs conflict with CSS variables or Tailwind config
- Figma local variables or paint styles conflict with documented/code color tokens
- final Figma handoff decks contain raw unbound solid fills or strokes where variables should be used
- component docs conflict with implemented reusable components
- README and AGENTS disagree
- private process notes leaked into client-facing docs
- client-facing design-system docs cite private Cortex skills or external craft references instead of encoding project-local rules
- shipped packages or tools are used in code but missing from platform mapping

## Output format

Use concise findings:

```text
Severity: high | medium | low
Location:
Issue:
Why it matters:
Recommended fix:
```

## Rules

- Do not delete files during audit.
- Do not rewrite docs unless the user asks for fixes.
- If fixes are requested, propose a scoped patch first.
- Keep client-facing docs clean. Keep process notes in `.waveframe/`.
