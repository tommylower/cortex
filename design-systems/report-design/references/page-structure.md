# Page Structure

Status: **ready for the current runtime**.

This file documents the current route and section order. It describes what exists in code, not every page listed in older planning docs.

## Global Structure

All long pages use the report shell:

```text
Hero
Section chrome
Section gap
Body section
Section chrome
Section gap
...
Closing CTA
Section gap
Footer
```

The footer is shared and includes vertical, about, connect, and legal link columns plus the binary chrome label.

## Routes

### Home - `/`

Runtime: `app/page.tsx`.

Order:

1. `ReportHero`
2. `EntityDefinition`
3. `ThreeVerticals`
4. `PractitionerStack`
5. `TrustQuestions`
6. `ClosingCTA`
7. `Footer`

Purpose:

- Establish the organization as the expertise layer for digital assets.
- Define the firm.
- Route audiences.
- Explain the three-service flywheel.
- Show practitioner proof and trust.
- Convert to call or Institute learning.

### Investigations - `/investigations`

Runtime: `app/investigations/page.tsx`.

Order:

1. `InvestigateHero`
2. `DefinitionBlock`
3. `MattersWeSupport`
4. `FourPhases`
5. `HowToEngage`
6. `InvestigateFAQ`
7. `InvestigateClosingCTA`
8. `Footer`

Purpose:

- Position court-ready blockchain investigations and blockchain analytics.
- Explain what clients receive.
- Surface legal, investigative, accounting, and advisory matter types before the process.
- Show the engagement flow.
- Give buyers four ways to engage.
- Answer evidence, billing, tooling, speed, and tracing questions.

### Compliance - `/compliance`

Runtime: `app/compliance/page.tsx`.

Order:

1. `ComplianceHero`
2. `EngagementSpectrum`
3. `WhatYouStopWorryingAbout`
4. `ComplianceFAQ`
5. `ComplianceClosingCTA`
6. `Footer`

Purpose:

- Position digital asset compliance advisory.
- Show the scale from advisory call to fractional CCO immediately after the hero.
- Translate value into relief.
- Convert to a call and surface subtle links into Investigations and Institute.

### Institute - `/institute`

Runtime: `app/institute/page.tsx`.

Order:

1. `InstituteHero`
2. `DefinitionBlock`
3. `VideoPreview`
4. `ThesisSection`
5. `FourPaths`
6. `ThreeWaysIn`
7. `InstituteFAQ`
8. `InstituteClosingCTA`
9. `Footer`

Notes:

- `VideoPreview` is a video-ready overview panel until the final Institute video asset is available.
- `ThesisSection` is intentionally kept per approved rollout decisions.

Purpose:

- Position the training institute as continuously updated digital asset training.
- Explain the 18-month thesis.
- Route learners by role path.
- Route buyers by individual, team, or partner access.
- Convert to subscription or team demo.

### Who We Serve - `/who-we-serve`

Runtime: `app/who-we-serve/page.tsx`.

Order:

1. `WhoWeServeHero`
2. `SegmentsAnchorNav`
3. `Segments`
4. `WhoWeServeClosingCTA`
5. `Footer`

Purpose:

- Help each audience identify where to start.
- Use sticky anchor navigation for the long-scroll segment directory.
- Connect each segment back to Investigations, compliance, institute, or a call.

Canonical segments:

1. Digital Asset Firms
2. Financial Institutions
3. Legal
4. Enterprise
5. Tech
6. Individuals
7. Public Sector

### About - `/about`

Runtime: `app/about/page.tsx`.

Order:

1. `AboutHero`
2. `FoundingStory`
3. `Team`
4. `Values` rendered as the visible Principles section
5. `AboutClosingCTA`
6. `Footer`

Purpose:

- Establish practitioner credibility.
- Make individual expertise legible for search and generative engines.
- Show the team and principles. Partners and advisors are not currently rendered.

### Insights - `/insights`

Runtime: `app/insights/page.tsx`.

Order:

1. Minimal coming-soon panel
2. `Footer`

Purpose:

- Reserve the visible Insights route while the content program is prepared.
- Keep the page intentionally minimal until case studies, analysis, and resources are ready.

### Careers - `/careers`

Runtime: `app/careers/page.tsx`.

Order:

1. `CareersHero`
2. `OpenPositions`
3. `Footer`

Purpose:

- Communicate hiring posture.
- List open positions and application path.

### Legal Routes

Runtime:

- `app/privacy/page.tsx`
- `app/eula/page.tsx`

Structure:

1. `LegalPageShell` content inside `FrameBody`
2. `SectionChrome inverse`
3. `SectionGap`
4. `Footer`

## Content Source Rules

- Use approved project source material for copy.
- Keep proof claims aligned with the attribution rules in `voice.md`.
- Do not promote private `.waveframe/` planning drafts into client-facing pages without approval.

## Page Anti-Patterns

- Do not create pages outside the shell.
- Do not add a route without adding it to nav/footer/page-structure when it becomes visible.
- Do not use H1 more than once per route.
- Do not make every section a unique layout if an existing section family works.
