# Imagery

## Visual Language

The imagery is primarily interface-like and diagrammatic:

- radar sweeps
- scan icons
- node graphs
- transaction paths
- grid matrices
- masked SVG symbols
- pixel/battery loading motifs
- compliance/control tables

The site uses product-adjacent abstraction rather than generic photography.

## Hero Scene

`HeroGrid` loads the Unicorn Studio scene lazily and uses `/images/hero.webp` as the placeholder. The scene should support the brand thesis without becoming the content.

## Icons

Icons are SVG masks colored with `currentColor` or the local accent. Repeated mask usage should go through `MaskedIcon` when the icon is simple and static.

## Diagrams

Diagrams should:

- use hairlines
- stay square and precise
- use paper/ink contrast
- use green only for active signal
- use module accents only where they identify categories or stages

## Avoid

- stock photos
- soft abstract gradients
- blobs, bokeh, floating orbs
- rounded 3D SaaS illustrations
- decorative images that do not reveal product, workflow, risk, compliance, or evidence
