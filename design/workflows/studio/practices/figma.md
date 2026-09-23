# practices: figma

figma, figjam, and figma mcp mechanics, graded by `rules.md`. read this
before the first figma call in a session.

## experiments

| topic | rule | evidence | recheck when |
|---|---|---|---|
| auto-layout text | when wrapping a TEXT node in auto-layout with the plugin api, set textAutoResize to 'HEIGHT' and a fixed width with resize(). never rely on FILL alone: it can resolve to width 0, and the node explodes into a vertical thread thousands of px tall | 2026-07-04, two debug rounds | next figma build session |
| icon pulls | download_assets without defaultFormat returns per-path svgs and a 24px png, so pass `defaultFormat: "svg"`. the export carries the parent section's chrome (a 24×24 #E5E5E5 rect and two large background paths): keep only `<g id="<icon-name>">`. imagemagick renders these svgs blank, so for a local raster check scale the svg to 96 and use `qlmanage -t -s 96`, then montage with `-label` placed before the inputs | 2026-09-08, two blank contact sheets and one chrome-strip round | next icon pull |
| figjam text shapes | ROUNDED_RECTANGLE shapes ellipsize text that a SQUARE of the same size shows in full: the rounded text inset is far larger than the 32px a fitShapeToText utility assumes, so measured heights under-size rounded shapes by about 40%. use SQUARE for text-heavy nodes, or budget 1.45 × the measured height + 72 for rounded ones | 2026-09-11, two clip-fix rounds | next figjam build |
| clipped containers | `createComponent()` and `createFrame()` keep their default 100px counter axis fixed even after layoutMode and children are set, silently clipping content. use `createAutoLayout()` for containers, or set `counterAxisSizingMode = 'AUTO'` immediately, and sweep for frames stuck at 100px before shipping | 2026-07-06, 6 component sets and 131 screen frames shipped clipped, two fix sweeps | next figma library build |
| dashed strokes | `dashPattern` on a LINE is refit to the line's length (an [18, 18] pattern rendered at about 35.7 pitch) and opens with a clipped stub, so dash phase can't match a reference. draw dashes as explicit rects. judge any raster-to-vector rebuild by a pixel diff against the source, not by eye | 2026-07-27, the eye passed it twice before a diff caught it | next build with dashed strokes |
| token binding | bind every fill and stroke to the token variable, never to a hex that happens to match, and read `boundVariables.color` back before building on top. if a value isn't in the palette, create the variable instead of inlining it. a lookup by bare name misses grouped variables (`Brand/Navy`, not `Navy`) and falls through to a raw hex that looks right in every screenshot | 2026-07-27, every fill shipped raw and couldn't be fixed once the image was posted | next canvas build against a token palette |
