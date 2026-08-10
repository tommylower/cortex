#!/usr/bin/env node
// cmyk_proof.mjs — ICC-accurate print proofing for screen-native design tools.
//
// every color that enters the canvas is born here: give a brand hex, get the
// CMYK recipe plus the print-simulated sRGB hex to use on canvas. give a CMYK
// recipe, get the canvas hex directly. tint a recipe without minting new hexes.
// soft-proof a whole exported board through the press profile.
//
//   node cmyk_proof.mjs hex '#AF2430' '#2F6F95' ...
//   node cmyk_proof.mjs cmyk '0,85,75,30' ...            (percent)
//   node cmyk_proof.mjs tint '0,85,75,30' 15 20 40       (recipe, then tint %s)
//   node cmyk_proof.mjs image export.png proof.png       (full-board soft proof)
//
// options:
//   --profile <path>   CMYK press ICC profile (or CMYK_PROFILE env var).
//                      auto-detects common installs if omitted.
//   --srgb <path>      display-side ICC profile override.
//   --intent <name>    Relative (default) | Perceptual | Absolute | Saturation
//   --tac <n>          total-ink warning threshold in percent, default 300.
//   --json             machine-readable output.
//
// requires ImageMagick 7 (`magick`) and a real press profile. free,
// redistributable profiles: PSOcoated_v3 / ISOcoated_v2 from eci.org.
// GRACoL2013_CRPC6 ships with Adobe apps. a "Generic CMYK" profile is a
// last-resort preview, not a press target.

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';

const CMYK_CANDIDATES = [
  process.env.CMYK_PROFILE,
  '/Library/Application Support/Adobe/Color Profiles/GRACoL2013_CRPC6.icc',
  `${homedir()}/Library/ColorSync/Profiles/PSOcoated_v3.icc`,
  '/Library/ColorSync/Profiles/PSOcoated_v3.icc',
  `${homedir()}/Library/ColorSync/Profiles/ISOcoated_v2_eci.icc`,
  '/Library/ColorSync/Profiles/ISOcoated_v2_eci.icc',
  '/usr/share/color/icc/PSOcoated_v3.icc',
  '/usr/share/color/icc/ISOcoated_v2_eci.icc',
  '/System/Library/ColorSync/Profiles/Generic CMYK Profile.icc',
].filter(Boolean);

const SRGB_CANDIDATES = [
  '/System/Library/ColorSync/Profiles/sRGB Profile.icc',
  '/usr/share/color/icc/colord/sRGB.icc',
  '/usr/share/color/icc/sRGB.icc',
];

function parseArgs(argv) {
  const opts = { intent: 'Relative', tac: 300, json: false };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') opts.json = true;
    else if (a === '--profile') opts.cmykProfile = argv[++i];
    else if (a === '--srgb') opts.srgbProfile = argv[++i];
    else if (a === '--intent') opts.intent = argv[++i];
    else if (a === '--tac') opts.tac = Number(argv[++i]);
    else rest.push(a);
  }
  return { opts, rest };
}

const { opts, rest } = parseArgs(process.argv.slice(2));
const [mode, ...inputs] = rest;

const MODES = ['hex', 'cmyk', 'tint', 'image'];
if (!MODES.includes(mode) || inputs.length === 0) {
  console.error(
    "usage: cmyk_proof.mjs hex '#RRGGBB' ...  |  cmyk 'C,M,Y,K' ...  |  tint 'C,M,Y,K' <pct> ...  |  image in.png out.png\n" +
      '       [--profile press.icc] [--srgb display.icc] [--intent Relative] [--tac 300] [--json]'
  );
  process.exit(1);
}

function findProfile(explicit, candidates, kind) {
  if (explicit) {
    if (!existsSync(explicit)) {
      console.error(`${kind} profile not found: ${explicit}`);
      process.exit(1);
    }
    return explicit;
  }
  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    console.error(
      `no ${kind} profile found. pass --profile <path> or set CMYK_PROFILE.\n` +
        'free press profiles (PSOcoated_v3, ISOcoated_v2): https://www.eci.org/en/downloads'
    );
    process.exit(1);
  }
  return found;
}

const SRGB = findProfile(opts.srgbProfile, SRGB_CANDIDATES, 'display');
const CMYK = findProfile(opts.cmykProfile, CMYK_CANDIDATES, 'CMYK press');
if (/Generic CMYK/i.test(CMYK)) {
  console.error('warning: using Generic CMYK profile. previews only, get a real press profile from eci.org.');
}

const im = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();
const q = (s) => `'${String(s).replace(/'/g, "'\\''")}'`;
const CHAIN_IN = `-profile ${q(SRGB)} -black-point-compensation -intent ${q(opts.intent)} -profile ${q(CMYK)}`;
const CHAIN_OUT = `-profile ${q(CMYK)} -black-point-compensation -intent ${q(opts.intent)} -profile ${q(SRGB)}`;

// 12-char (16-bit) or 6-char hex -> #rrggbb
function hexFrom(imHex) {
  const h = imHex.replace(/^#/, '');
  if (h.length >= 12) return '#' + [0, 4, 8].map((i) => h.slice(i, i + 2)).join('');
  return '#' + h.slice(0, 6);
}

function parseCmykPixel(s) {
  const m = s.match(/cmyk\(([^)]+)\)/);
  if (!m) {
    console.error(`unexpected pixel output: ${s}`);
    process.exit(1);
  }
  return m[1].split(',').map((v) => Math.round((parseFloat(v) / 255) * 1000) / 10);
}

function srgbToCmyk(hex) {
  const base = `magick xc:${q(hex)} ${CHAIN_IN}`;
  const cmyk = parseCmykPixel(im(`${base} -format '%[pixel:p{0,0}]' info:`));
  const sim = hexFrom(im(`${base} -profile ${q(SRGB)} -format '%[hex:p{0,0}]' info:`));
  return { cmyk, sim };
}

function cmykToSrgb(recipe) {
  const [c, m, y, k] = recipe;
  const px = `cmyk(${c}%,${m}%,${y}%,${k}%)`;
  const sim = hexFrom(im(`magick xc:${q(px)} ${CHAIN_OUT} -format '%[hex:p{0,0}]' info:`));
  return { cmyk: recipe, sim };
}

function parseRecipe(input) {
  const recipe = input.split(',').map(Number);
  if (recipe.length !== 4 || recipe.some((v) => Number.isNaN(v) || v < 0 || v > 100)) {
    console.error(`bad recipe '${input}': expected 'C,M,Y,K' in percent, e.g. '0,85,75,30'`);
    process.exit(1);
  }
  return recipe;
}

const tac = (recipe) => Math.round(recipe.reduce((a, b) => a + b, 0) * 10) / 10;
const tacWarn = (recipe) => (tac(recipe) > opts.tac ? `TAC ${tac(recipe)}% > ${opts.tac}%` : null);

const chan = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const drift = (a, b) => Math.max(...chan(a).map((v, i) => Math.abs(v - chan(b)[i])));

if (mode === 'image') {
  const [src, dst] = inputs;
  if (!dst) {
    console.error('usage: cmyk_proof.mjs image <in.png> <out.png>');
    process.exit(1);
  }
  if (!existsSync(src)) {
    console.error(`input not found: ${src}`);
    process.exit(1);
  }
  // print has no alpha: flatten onto white before the round-trip.
  im(`magick ${q(src)} -background white -alpha remove -alpha off ${CHAIN_IN} -profile ${q(SRGB)} ${q(dst)}`);
  const out = { input: src, proof: dst, profile: CMYK };
  console.log(opts.json ? JSON.stringify(out, null, 2) : `${src}  ->  ${dst}  (soft-proofed via ${CMYK})`);
  process.exit(0);
}

let rows;
if (mode === 'tint') {
  const [recipeInput, ...pcts] = inputs;
  const recipe = parseRecipe(recipeInput);
  if (pcts.length === 0) {
    console.error('usage: cmyk_proof.mjs tint \'C,M,Y,K\' <pct> [<pct> ...]');
    process.exit(1);
  }
  rows = pcts.map((p) => {
    const pct = Number(p);
    const scaled = recipe.map((v) => Math.round(v * pct) / 100);
    const { sim } = cmykToSrgb(scaled);
    return { input: `cmyk(${recipeInput}) @ ${pct}%`, cmyk: scaled, sim: sim.toUpperCase(), drift: 0, tac: tac(scaled), verdict: 'exact (born cmyk)', warning: tacWarn(scaled) };
  });
} else {
  rows = inputs.map((input) => {
    if (mode === 'hex') {
      const hex = (input.startsWith('#') ? input : `#${input}`).toUpperCase();
      if (!/^#[0-9A-F]{6}$/.test(hex)) {
        console.error(`bad hex '${input}': expected #RRGGBB`);
        process.exit(1);
      }
      const { cmyk, sim } = srgbToCmyk(hex);
      const d = drift(hex, sim.toUpperCase());
      return {
        input: hex,
        cmyk,
        sim: sim.toUpperCase(),
        drift: d,
        tac: tac(cmyk),
        verdict: d <= 8 ? 'safe' : d <= 24 ? 'shifts' : 'out of gamut',
        warning: tacWarn(cmyk),
      };
    }
    const recipe = parseRecipe(input);
    const { cmyk, sim } = cmykToSrgb(recipe);
    return { input: `cmyk(${input})`, cmyk, sim: sim.toUpperCase(), drift: 0, tac: tac(cmyk), verdict: 'exact (born cmyk)', warning: tacWarn(recipe) };
  });
}

if (opts.json) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  for (const r of rows) {
    const recipe = `C${r.cmyk[0]} M${r.cmyk[1]} Y${r.cmyk[2]} K${r.cmyk[3]}`;
    const notes = [r.verdict + (r.drift ? `, drift ${r.drift}` : ''), r.warning].filter(Boolean).join('; ');
    console.log(`${r.input}  ->  ${recipe}  ->  canvas ${r.sim}  (${notes})`);
  }
}
