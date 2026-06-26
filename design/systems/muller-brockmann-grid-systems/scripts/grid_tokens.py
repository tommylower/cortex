#!/usr/bin/env python3
"""Generate a Muller-Brockmann editorial grid scaffold.

The output keeps grid content, guides, baseline rhythm, and display-type optical
alignment wired to one CSS-variable source of truth.
"""

from __future__ import annotations

import argparse
import sys


def warn_if_off_baseline(name: str, value: int, baseline: int) -> None:
    if value % baseline:
        print(
            f"warning: --{name} ({value}) is not a multiple of --baseline ({baseline})",
            file=sys.stderr,
        )


def css(args: argparse.Namespace) -> str:
    leading = args.baseline * args.leading_multiple
    pad = args.baseline * args.pad_baselines
    return f""":root {{
  --mb-cols: {args.cols};
  --mb-baseline: {args.baseline}px;
  --mb-leading: {leading}px;
  --mb-gutter: {args.gutter}px;
  --mb-margin: {args.margin}px;
  --mb-pad: {pad}px;
  --mb-max-width: {args.maxw}px;
  --mb-paper: #ffffff;
  --mb-ink: #111315;
  --mb-muted: #5d6269;
  --mb-accent: {args.accent};
  --mb-guide-column: rgba(228, 0, 43, 0.075);
  --mb-guide-edge: rgba(228, 0, 43, 0.4);
  --mb-guide-major: rgba(0, 142, 132, 0.34);
  --mb-guide-minor: rgba(0, 142, 132, 0.12);
}}

* {{ box-sizing: border-box; }}
html {{ background: var(--mb-paper); }}
body {{
  margin: 0;
  background: var(--mb-paper);
  color: var(--mb-ink);
  font-family: Inter, "Helvetica Neue", Arial, system-ui, sans-serif;
  font-size: 16px;
  line-height: var(--mb-leading);
  -webkit-font-smoothing: antialiased;
}}
img {{ display: block; width: 100%; height: 100%; object-fit: cover; }}

.mb-spread {{ position: relative; width: 100%; }}
.mb-wrap {{
  position: relative;
  max-width: var(--mb-max-width);
  margin: 0 auto;
  padding: var(--mb-pad) var(--mb-margin);
}}
.mb-grid {{
  display: grid;
  grid-template-columns: repeat(var(--mb-cols), minmax(0, 1fr));
  column-gap: var(--mb-gutter);
  row-gap: var(--mb-leading);
}}
.mb-band {{
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  column-gap: var(--mb-gutter);
  row-gap: var(--mb-leading);
  align-items: start;
}}
@supports not (grid-template-columns: subgrid) {{
  .mb-band {{ grid-template-columns: repeat(var(--mb-cols), minmax(0, 1fr)); }}
}}

.mb-kicker {{
  margin: 0 0 var(--mb-leading);
  color: var(--mb-accent);
  font-family: "Space Mono", ui-monospace, monospace;
  font-size: 12px;
  line-height: var(--mb-leading);
  text-transform: uppercase;
}}
.mb-masthead {{
  margin: 0;
  font-size: clamp(64px, 12vw, 176px);
  font-weight: 800;
  line-height: {leading * 6}px;
  letter-spacing: 0;
}}
.mb-lede {{
  margin: 0;
  max-width: 34rem;
  font-size: 20px;
  line-height: var(--mb-leading);
}}
.mb-rule {{
  grid-column: 1 / -1;
  height: var(--mb-leading);
  border-top: 1px solid var(--mb-ink);
}}
.mb-media {{ height: {leading * 12}px; margin: 0; background: #e6e6e6; }}
.mb-caption {{
  margin: calc(var(--mb-baseline) * 2) 0 0;
  color: var(--mb-muted);
  font-family: "Space Mono", ui-monospace, monospace;
  font-size: 12px;
  line-height: calc(var(--mb-baseline) * 2);
}}

.mb-guides {{
  position: absolute;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms ease;
}}
body.mb-grid-on .mb-guides {{ opacity: 1; }}
.mb-guides__cols {{
  position: absolute;
  inset: 0 var(--mb-margin);
  display: grid;
  grid-template-columns: repeat(var(--mb-cols), minmax(0, 1fr));
  column-gap: var(--mb-gutter);
}}
.mb-guides__col {{
  position: relative;
  background: var(--mb-guide-column);
  box-shadow: inset 1px 0 0 var(--mb-guide-edge), inset -1px 0 0 var(--mb-guide-edge);
}}
.mb-guides__col span {{
  position: absolute;
  top: calc(var(--mb-baseline) * 4);
  left: 0;
  right: 0;
  color: var(--mb-accent);
  font-family: "Space Mono", ui-monospace, monospace;
  font-size: 10px;
  line-height: 1;
  text-align: center;
}}
.mb-guides__rows {{
  position: absolute;
  top: var(--mb-pad);
  bottom: 0;
  left: var(--mb-margin);
  right: var(--mb-margin);
  background-image:
    repeating-linear-gradient(to bottom, var(--mb-guide-major) 0 1px, transparent 1px var(--mb-leading)),
    repeating-linear-gradient(to bottom, var(--mb-guide-minor) 0 1px, transparent 1px var(--mb-baseline));
}}
.mb-guides__margin {{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--mb-guide-edge);
}}
.mb-guides__margin--left {{ left: var(--mb-margin); }}
.mb-guides__margin--right {{ right: var(--mb-margin); }}

.mb-toggle {{
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 200;
  min-height: 44px;
  padding: 0 14px;
  border: 0;
  background: var(--mb-ink);
  color: #fff;
  cursor: pointer;
  font-family: "Space Mono", ui-monospace, monospace;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}}
body.mb-grid-on .mb-toggle {{ background: var(--mb-accent); }}

@media (max-width: 760px) {{
  :root {{ --mb-cols: 4; --mb-margin: 24px; --mb-pad: 64px; }}
  .mb-masthead {{ font-size: clamp(48px, 20vw, 88px); line-height: {leading * 4}px; }}
  .mb-lede, .mb-media {{ grid-column: 1 / -1 !important; }}
}}"""


def javascript() -> str:
    return r"""(() => {
  const button = document.getElementById("mbGridToggle");
  const setGrid = (enabled) => {
    document.body.classList.toggle("mb-grid-on", enabled);
    button?.setAttribute("aria-pressed", enabled ? "true" : "false");
  };

  button?.addEventListener("click", () => setGrid(!document.body.classList.contains("mb-grid-on")));
  document.addEventListener("keydown", (event) => {
    if ((event.key === "g" || event.key === "G") && !event.metaKey && !event.ctrlKey && !event.altKey) {
      setGrid(!document.body.classList.contains("mb-grid-on"));
    }
  });

  const syncGuideColumns = () => {
    const count = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--mb-cols"), 10) || 12;
    document.querySelectorAll(".mb-guides__cols").forEach((container) => {
      if (Number.parseInt(container.dataset.mbCols || "0", 10) === count) return;
      container.dataset.mbCols = String(count);
      container.replaceChildren();
      for (let index = 1; index <= count; index += 1) {
        const column = document.createElement("div");
        column.className = "mb-guides__col";
        const label = document.createElement("span");
        label.textContent = String(index);
        column.append(label);
        container.append(column);
      }
    });
  };

  syncGuideColumns();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const opticalSelector = "[data-mb-optical], .mb-masthead, .mb-numeral, .mb-section-title";

  const alignOpticalInk = () => {
    if (!context) return;
    document.querySelectorAll(opticalSelector).forEach((element) => {
      element.style.marginLeft = "0px";
      const style = getComputedStyle(element);
      let glyph = (element.textContent || "").trim().charAt(0);
      if (!glyph) return;
      if (style.textTransform === "uppercase") glyph = glyph.toUpperCase();
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const offset = context.measureText(glyph).actualBoundingBoxLeft;
      if (Number.isFinite(offset)) element.style.marginLeft = `${offset.toFixed(2)}px`;
    });
  };

  document.fonts?.ready.then(alignOpticalInk);
  alignOpticalInk();
  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      syncGuideColumns();
      alignOpticalInk();
    }, 120);
  });
})();"""


def band_markup() -> str:
    return """      <div class="mb-band">
        <div style="grid-column: 1 / 6">
          <p class="mb-kicker">Archive / 1961</p>
          <h1 class="mb-masthead" data-mb-optical>Grid<br>Systems</h1>
        </div>
        <p class="mb-lede" style="grid-column: 8 / 13">A modular editorial spread built from column lines, baseline rhythm, and visible structure.</p>
      </div>
      <div class="mb-band">
        <div class="mb-rule"></div>
      </div>
      <div class="mb-band">
        <figure class="mb-media" style="grid-column: 1 / 8">
          <img alt="" src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80">
        </figure>
        <div style="grid-column: 8 / 13">
          <p class="mb-caption">01 / Image, caption, and copy all occupy measured modules.</p>
        </div>
      </div>"""


def guides_markup() -> str:
    return """    <div class="mb-guides" aria-hidden="true">
      <div class="mb-guides__cols"></div>
      <div class="mb-guides__rows"></div>
      <div class="mb-guides__margin mb-guides__margin--left"></div>
      <div class="mb-guides__margin mb-guides__margin--right"></div>
    </div>"""


def scaffold(args: argparse.Namespace) -> str:
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Muller-Brockmann Grid Scaffold</title>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
{css(args)}
  </style>
</head>
<body data-wave-signature="built by a wave in progress. waves don't die.">
  <button class="mb-toggle" id="mbGridToggle" type="button" aria-pressed="false">Grid</button>
  <section class="mb-spread">
    <div class="mb-wrap">
      <div class="mb-grid">
{band_markup()}
      </div>
{guides_markup()}
    </div>
  </section>
  <script>
{javascript()}
  </script>
</body>
</html>"""


def snippet(args: argparse.Namespace) -> str:
    return "\n\n".join(
        [
            "/* CSS */\n" + css(args),
            "/* HTML band pattern */\n" + band_markup(),
            "/* HTML guides pattern */\n" + guides_markup(),
            "/* JS */\n" + javascript(),
        ]
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate Muller-Brockmann grid CSS, markup, and JS.")
    parser.add_argument("--cols", type=int, default=12)
    parser.add_argument("--baseline", type=int, default=8)
    parser.add_argument("--leading-multiple", type=int, default=3)
    parser.add_argument("--gutter", type=int, default=24)
    parser.add_argument("--margin", type=int, default=72)
    parser.add_argument("--maxw", type=int, default=1296)
    parser.add_argument("--pad-baselines", type=int, default=12)
    parser.add_argument("--accent", default="#e4002b")
    parser.add_argument("--scaffold", action="store_true", help="emit a complete HTML page")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    warn_if_off_baseline("gutter", args.gutter, args.baseline)
    warn_if_off_baseline("margin", args.margin, args.baseline)
    output = scaffold(args) if args.scaffold else snippet(args)
    sys.stdout.write(output + "\n")


if __name__ == "__main__":
    main()
