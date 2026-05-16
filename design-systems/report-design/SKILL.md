---
name: report-design
description: Runtime-backed design system for an editorial report marketing site. Use for page, section, component, copy, motion, imagery, and handoff work in this project.
status: ready
---

# Report Design System

This system was extracted from a digital asset readiness marketing site. The site should feel like an operational report from senior practitioners: precise, inspectable, restrained, and direct. The visual system is a cream paper surface inside an ink frame, with red reserved for signal and action.

## Core Rules

- Build inside the existing shell. Do not replace or re-wrap the global frame.
- Use semantic tokens only. Components do not reference palette primitives directly.
- Use the line system before shadows. Frame, rails, dividers, section chrome, and card borders are 1px ink hairlines.
- Red is signal. Use `--color-accent` for CTAs, active states, proof markers, and state reveals. Do not use red as a general surface.
- Production UI uses no rounded corners. Keep cards, buttons, panels, and frames square unless a new approved rule changes this.
- Use approved vocabulary exactly: **Investigations**, **compliance**, **institute** for visible practice labels. The public Investigations route is `/investigations`; keep `investigate` only for existing internal component names and asset identifiers. Never use "comply" as a vertical name.
- The product model is a **flywheel**, not doors or entry doors.
- Landing and product copy comes from approved project source material. Do not improvise marketing claims.

## Shell Pattern

Every page is composed as:

```tsx
<FrameBody fill>
  <Hero />
</FrameBody>
<SectionChrome inverse />

<SectionGap />

<FrameBody>
  <Section />
</FrameBody>
<SectionChrome inverse />

<SectionGap />
<Footer />
```

Rules:

- Only the hero normally uses `fill`.
- Every major section sits in `FrameBody`.
- Most sections end with `SectionChrome inverse`.
- `SectionGap` is a 72px shell row between a section chrome row and the next section body.
- The pre-footer gap exists, but the final content section does not need its own chrome if it flows directly into that gap and footer.

## Visual Language

- Background: procedural paper texture over `--color-surface-page`.
- Shell: max width 1440px, sticky dark nav, left/right gutter rails, per-section dark chrome rows.
- Typography: Satoshi body/UI through `--font-sans`; JetBrains Mono for display and mono labels through `--font-display` and `--font-mono`.
- Eyebrow kickers: mono uppercase, `text-[14px]`, `leading-[14px]`, `tracking-[0.08em]`, square red (`bg-accent`) or inverse (`bg-surface-inverse`) fill. Matches nav font-size.
- In-card metadata pills (date chips, tags): mono uppercase at `text-[10px]` to `text-[11px]`, tighter tracking. Distinct from eyebrow kicker.
- Headings: uppercase `font-display`, tight leading, balanced wrapping.
- Cards: square, bordered, raised with the default subtle shadow, and active on hover through a small red reveal.
- Icons: Streamline Cyber set for interface icons; custom product marks for product identity.

## Use These References

- Tokens: `references/tokens.md`
- Shell and architecture: `references/architecture.md`
- Section composition: `references/composition.md`
- Page order: `references/page-structure.md`
- Components: `references/components.md`
- Motion: `references/motion.md`
- Imagery: `references/imagery.md`
- Voice: `references/voice.md`
- Runtime mapping: `references/platform-mapping.md`

## Current Runtime Notes

- The runtime includes a `MobileBreakpointBlocker` below `768px`. Until that is removed, mobile behavior below `md` is intentionally blocked by code.
- Figma audit notes include possible future typography and component cleanup. Those are not active system rules until runtime code changes.
- Keep `.waveframe/` local. Client-facing rules belong here, not in process notes.
