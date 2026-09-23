# practices: print and assets

local image processing and pdf output, graded by `rules.md`. read this
before processing images or post-processing a pdf. paper's own export
mechanics are in `practices/paper.md`; print color conversion is the
`cmyk-proof` skill.

## experiments

| topic | rule | evidence | recheck when |
|---|---|---|---|
| imagemagick colorspace | before `-compose CopyOpacity` or `-fill`/`-opaque` color mapping, force `-colorspace sRGB -type TrueColor` on gray or bilevel intermediates; a gray destination silently yields transparent output. also `-alpha off` every intermediate, or resize and dither smear the art into the alpha channel | 2026-08-24, two debug rounds | next local image pass |
| ghostscript output profiles | gs pdfwrite with `-sOutputICCProfile` exits 1 at the end of the run ("/undefined in --runpdf--", "Permission denied") while the pages look fine. the cause is gs's own SAFER sandbox blocking the profile re-read, not the input file. add `--permit-file-read=<profile dir>/` | 2026-08-24, a six-round bisect | next gs color conversion |
| pdf content-stream edits | before editing a pdf content stream by regex, mask literal `(...)` and hex `<...>` string spans. Type3 text strings are arbitrary bytes that can match operators such as `q`, `BT`, or `0 0 0 rg` and get spliced | precaution found 2026-08-24 while debugging a pdf pipeline; never seen biting | next content-stream edit |
