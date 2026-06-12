# Color Conversion

When converting existing colors to OKLCH, convert the color values and leave the surrounding CSS structure unchanged. Do not change gradient interpolation or restructure CSS as part of a pure conversion.

## Supported Input Formats

| Format | Examples |
| --- | --- |
| Hex | `#f00`, `#ff0000`, `#ff000080` |
| `rgb()` / `rgba()` | `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)` |
| `hsl()` / `hsla()` | `hsl(0, 100%, 50%)`, `hsla(0, 100%, 50%, 0.5)` |

## Examples

```css
/* Before */
color: #3b82f6;
background: #1e293b;
border-color: #e2e8f0;

/* After */
color: oklch(0.623 0.188 259.815);
background: oklch(0.279 0.037 260.031);
border-color: oklch(0.929 0.013 255.508);
```

```css
/* Before */
color: rgb(59, 130, 246);
border: 1px solid rgba(0, 0, 0, 0.1);

/* After */
color: oklch(0.623 0.188 259.815);
border: 1px solid oklch(0 0 0 / 0.1);
```

Alpha uses forward-slash syntax. Omit alpha when it is `1`.

## Leave Alone

- CSS keywords: `currentColor`, `inherit`, `initial`, `unset`, `transparent`
- Gradient interpolation methods: only convert the color stops
- Third-party library config values that explicitly require hex input

## Bulk Conversion

1. Replace hex colors with OKLCH equivalents.
2. Replace `rgb()`, `rgba()`, `hsl()`, and `hsla()` calls.
3. Leave gradient functions unchanged and convert only color stops inside them.
4. Preserve CSS keywords such as `currentColor`, `inherit`, and `transparent`.
5. Preserve comments and formatting.
