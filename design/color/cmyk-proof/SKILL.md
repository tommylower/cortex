---
name: cmyk-proof
description: ICC-accurate CMYK proofing for print work designed in screen-native canvas tools (Paper, Figma, or any hex-only design surface). Converts brand hexes to press recipes plus print-simulated canvas hexes, soft-proofs whole exports, derives ink tints, and flags out-of-gamut colors and total-ink violations via a bundled ImageMagick script. Use when designing anything physically printed (brochures, posters, packaging, stationery) in a tool without CMYK support, or when the user mentions CMYK, print-ready, gamut, ICC, press profiles, or colors that must survive printing.
---

# CMYK Proof

Screen design tools speak sRGB hex. Presses speak CMYK ink under a specific ICC profile. Saturated screen colors (neon reds, electric blues, vivid greens) silently desaturate at print time, and a naive hex-to-CMYK formula conversion tells you nothing about it. This skill closes the gap: every color is proofed through a real press profile before it touches the canvas, so what the client approves on screen is what the press can actually make.

## Requirements

- ImageMagick 7 (`magick` on PATH).
- A press ICC profile. Free and redistributable: [PSOcoated_v3 or ISOcoated_v2 from eci.org](https://www.eci.org/en/downloads) (European standard). GRACoL2013_CRPC6 ships with Adobe apps (US standard, common digital-press target). Ask the print vendor which profile they proof against; when in doubt, coated defaults above are right for most commercial work.
- The script auto-detects installed profiles, or takes `--profile <path>` / the `CMYK_PROFILE` env var.

## Quick start

```bash
# brand hex -> press recipe + the hex to actually use on canvas
node scripts/cmyk_proof.mjs hex '#FF003D' '#2F6F95'
# #FF003D -> C0 M96.2 Y74 K0 -> canvas #E72038 (out of gamut, drift 32)
# #2F6F95 -> C79.2 M38.5 Y13.5 K19.1 -> canvas #2E6F95 (safe, drift 1)

# recipe (percent) -> canvas hex, for colors born in ink
node scripts/cmyk_proof.mjs cmyk '0,96,74,0'

# tints of a recipe, without minting new colors
node scripts/cmyk_proof.mjs tint '20,70,0,15' 15 20 40

# soft-proof a whole exported board
node scripts/cmyk_proof.mjs image export.png proof.png
```

Verdicts: `safe` (drift ≤ 8/255 per channel), `shifts` (≤ 24), `out of gamut` (> 24). Every row also reports TAC (total area coverage, the four ink percentages summed); the script warns above 300%, a common coated-stock limit. Confirm the vendor's actual limit. `--json` for machine-readable output, `--intent` and `--tac` to override defaults.

## The born-CMYK workflow

The law: **only print-simulated hexes enter the canvas, and production files are rebuilt from recipes, never converted from canvas hexes.**

1. Every candidate color goes through the script before use. Canvas gets the `canvas` hex from the output, not the original.
2. Record the recipe with the color wherever the tool allows: token descriptions, style notes, a palette board. Each color is dual-value, recipe for the press, sim hex for the screen. When print files are built (InDesign, Affinity, or direct to the vendor), colors are re-entered from the recorded recipes.
3. If a brand color is out of gamut, do not quietly use it. Show the owner the original next to the print simulation, offer in-gamut candidates, and get an explicit pick. If the unprintable original must stay in the file as a reference, keep it raw and visibly labeled not printable, never as a reusable token.
4. Tints come from the `tint` mode (scaled ink recipes), not from screen opacity. A 20% opacity overlay and a 20% ink tint are different colors.
5. Judge candidates in context: proof swatches sitting on the background color they will print over, never isolated on white.

## Ink discipline

- Body text and fine rules: single-ink black (`cmyk '0,0,0,100'`, or a K-only tint for grays). Four-ink builds on small type risk registration fringing and color casts.
- Large dark solids: rich black, e.g. `cmyk '60,40,40,100'` (confirm the vendor's preferred build). A hex near-black converted from screen becomes an accidental four-ink build, the TAC warning will usually catch it.
- Grays: K-only tints via `tint '0,0,0,100' <pct>`, not CMY mixes.
- Avoid reversing small type out of multi-ink builds for the same registration reason.

## Canvas hygiene

- If the tool supports variables or tokens, bind every swatch and fill to them. After copying nodes between files, verify the bindings survived, copies often flatten to raw hex. Re-check by reading values back, not by eye.
- The canvas is the spec, not the print artwork. Exports are for approval and mockups; final artwork is rebuilt in a print-capable tool from the recorded recipes and the geometry spec.
- Before client review of near-final boards, run the full export through `image` mode and look at the proof, not the raw export.

## Physical geometry

Pixel-native tools also lack print units, bleed, and fold handling. See [references/print-geometry.md](references/print-geometry.md) for the ppi math, bleed/trim/safe setup, and fold-allowance rules.
