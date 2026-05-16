# Nothing Design System — Responsive

## Breakpoints

| Token | Width | Target |
| --- | --- | --- |
| `sm` | `640px` | Large phones |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Small laptops |
| `xl` | `1280px` | Desktop |
| `2xl` | `1440px` | Wide desktop |

## Escalation rules

- Start with one column and strong vertical hierarchy.
- Add columns only when each column preserves readable type and 44px interactive targets.
- Data-dense layouts may compress spacing, but not labels below 11px or body text below 14px.
- Keep hero display moments above 36px. If they no longer fit, reduce copy before reducing the display role.

## Touch and hover

- Minimum tap target is 44px.
- Hover effects must not be the only state signal.
- Pointer-coarse devices get persistent labels instead of hover-only reveal.

## Gotchas

- Avoid `100vh` on mobile; use dynamic viewport units when available.
- Avoid max-width-only media queries.
- Keep input font size at 16px or above on mobile.
