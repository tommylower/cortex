# Page Structure

## Routes

- `/` - landing page
- `/platform` - platform explanation
- `/pricing` - plans, router, matrix, FAQ
- `/industries/protocols`
- `/industries/wallet`
- `/industries/stablecoin`
- `/industries/exchanges`
- `/industries/banks`
- `/industries/public-sector`
- `/about` - story, team, advisors, backers
- `/trust` - security, certifications, controls, operations
- `/glossary` - glossary list and sidebar
- `/privacy` - privacy policy
- `/blog`
- `/blog/all`
- `/blog/[slug]`

## Landing Page

Current sequence:

1. Hero
2. What
3. How it works
4. Intelligence Layer
5. Trusted By
6. Why this matters
7. Industries
8. CTA

## Platform

Current sequence:

1. PlatformHero
2. PlatformModules
3. PlatformIntelligence
4. PlatformCta

## Pricing

Current sequence:

1. PricingHero
2. PricingPlans
3. PricingRouter
4. PricingMatrix
5. PricingFaq
6. PricingCta

## About

Current sequence:

1. OurStoryHero
2. OurStoryTeam
3. OurStoryAdvisors
4. OurStoryBackedBy
5. CTA

## Trust

Current sequence:

1. TrustHero
2. TrustCommitment
3. TrustCertifications
4. TrustInfrastructure
5. TrustTransparency
6. TrustOperations
7. CTA

## Industries

Industry pages share `IndustryPage` and pull content from `src/lib/industries.ts`.

Each industry page includes:

- centered hero with industry label
- hero card/callout
- "What you get" card grid
- CTA

## Blog

The blog is Notion-backed in structure but currently uses placeholder article behavior in `src/app/blog/data.ts`. The blog UI is implemented and should be represented in handoff as an editorial/card system, with CMS content status marked separately.
