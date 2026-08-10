---
name: spec-map
description: turn a spec into a hand-editable system map in paper
disable-model-invocation: true
---

# spec-map

turn a spec into a system map on a paper canvas. the map is an **edit** of the spec, never a transcription: the spec keeps the detail, the map keeps the shape.

built for paper via its MCP, but the flow is tool-agnostic: any canvas tool that can mint tokens and place flat, absolutely positioned frames works — only the mechanics lines in step 4 are paper-specific. before intake, confirm the canvas tool's MCP responds. if it doesn't, stop and have the operator connect or auth it (or name a substitute tool); never fall back to writing loose html files.

## 1. intake

three things before touching paper: the **spec** (paste, file path, or pointer), the **goal** (what the map must make visible, and for whom), and the **target paper file**. take whatever the invocation already gave; ask ONE question covering only the missing pieces, then wait. once all three exist, build directly — no brief theater.

## 2. edit the spec

extract a content model:

- entities (agents, services, stores, people) → cards: name, one-sentence job, numbered responsibilities
- relationships → edges labeled with a short verb phrase
- planned / future / peripheral → dashed panels
- system-wide invariants → a strip
- human approval gates → marked explicitly; usually the most important fact on the map
- boundaries → a touches / surfaces / never footer, when the spec defines them

density caps: every description one sentence, six rows max per card. needing more means the map is at the wrong zoom — go up a level. done when every element traces to a line of the spec and the map reads without it.

## 3. tokens

read the file's tokens first. an existing palette wins — bind its names by role (ground, surface, ink, body, muted, hairline). no palette → mint this neutral set as paper tokens before drawing:

`paper #FFFFFF · surface #FAFAF9 · ink #111111 · body #555555 · muted #8C8C8C · line #111111 · line-soft #E3E3E3 · radius 2/4/6`

every fill, stroke, and text color binds a token name. raw hex only inside svg defs, where css vars silently render black — use the token's literal value there.

## 4. build

type: geist mono only. **every text node: line-height 110%, letter-spacing -0.01em.** voices: title 13 bold caps ink · chip 11 bold caps muted right-aligned · row name 12 bold caps ink · body 12 · label 10 caps muted.

vocabulary: cards (ground fill, 1px solid border, radius 2, 40px header with bottom hairline, one 24px pixel icon at left 20 / top 8) · dashed panels (surface fill, `4 4` dash) · edges (1px, orthogonal only, stepped pixel arrowheads, labels on ground-colored plates) · strips. icons inline from `icons/` in this skill folder so `currentColor` binds — one per card, header only, never icon grids.

composition comes from the goal, never a template: lanes for flow, a tree for hierarchy, adjacency for shared state.

paper mechanics: every container a plain freeform frame, no auto layout anywhere — the canvas gets hand-edited. top level flat and absolutely positioned. write html single-line. after retinting an svg, rewrite the whole `<svg>` so attributes match.

## 5. verify

screenshot the board and check: every color bound to a token · both type constants on every text node · no auto-layout frames in the layer tree · edges orthogonal, alignment exact (shared edges, even gaps) · a first-time reader can follow it without the spec. fix every miss before reporting done.
