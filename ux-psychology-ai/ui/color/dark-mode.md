# UI — Dark Mode

Dark mode is not an inverted color scheme. It is a separate, deliberate color system designed for low-light conditions.

---

## Why Dark Mode Requires a Separate Color System

A naive dark mode implementation inverts colors. This produces:
- White text on black backgrounds (high contrast, but can cause halation/blooming for some users)
- Inverted semantic colors (red now appears as cyan, green as magenta)
- Destroyed visual hierarchy (previously dark text elements now become light backgrounds)
- Broken elevation system (shadows become invisible or inverted)

A correct dark mode requires independently defined color values for every design token.

---

## Core Dark Mode Principles

### 1. Use dark grey, not pure black
Pure black (#000000) on a dark background creates maximum luminance contrast, which can cause halation (text appears to bleed into the background) for some users under dark conditions. Material Design recommends #121212 as the base dark surface. Apple uses layered grays.

```css
/* Surface scale (dark mode) */
--surface-base:       #121212;  /* Page background */
--surface-raised:     #1e1e1e;  /* Card / component */
--surface-overlay:    #252525;  /* Dropdown, modal */
--surface-highest:    #2d2d2d;  /* Tooltip, top-level popover */
```

### 2. Elevation is expressed through surface lightness, not shadow
In light mode, elevation is expressed through shadows (darker shadow = higher elevation).
In dark mode, shadows are not visible against dark backgrounds. Instead, elevation is expressed through surface lightness:

```
Higher elevation = lighter surface color
Base:      #121212
Card:      #1e1e1e  (+8% lighter)
Dropdown:  #252525  (+12% lighter)
Modal:     #2d2d2d  (+16% lighter)
```

### 3. Do not simply reduce opacity of light-mode colors
Opaque dark colors must be used — semi-transparent light colors on dark surfaces produce muddy, unpredictable results due to compositing.

### 4. Reduce color saturation in dark mode
Highly saturated colors on dark backgrounds cause vibration (visual fatigue). Desaturate primary and accent colors slightly for dark mode.

```css
/* Light mode primary */
--color-primary: hsl(220, 85%, 55%);

/* Dark mode primary — same hue, reduced saturation, increased lightness */
--color-primary: hsl(220, 70%, 65%);
```

### 5. White text is not always the right choice
Pure white text (#FFFFFF) on very dark backgrounds can feel harsh. Use near-white:
```css
--text-primary:    rgba(255, 255, 255, 0.87);  /* ~87% opacity white */
--text-secondary:  rgba(255, 255, 255, 0.60);
--text-disabled:   rgba(255, 255, 255, 0.38);
```

---

## Dark Mode Color Token Pattern

```css
/* ── LIGHT MODE ── */
:root {
  --color-surface:        #ffffff;
  --color-surface-raised: #f5f5f5;
  --color-text-primary:   rgba(0, 0, 0, 0.87);
  --color-text-secondary: rgba(0, 0, 0, 0.60);
  --color-primary:        hsl(220, 85%, 55%);
  --color-error:          hsl(4, 75%, 45%);
  --color-success:        hsl(134, 55%, 35%);
  --color-border:         rgba(0, 0, 0, 0.12);
}

/* ── DARK MODE ── */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface:        #121212;
    --color-surface-raised: #1e1e1e;
    --color-text-primary:   rgba(255, 255, 255, 0.87);
    --color-text-secondary: rgba(255, 255, 255, 0.60);
    --color-primary:        hsl(220, 70%, 68%);
    --color-error:          hsl(4, 80%, 65%);
    --color-success:        hsl(134, 60%, 55%);
    --color-border:         rgba(255, 255, 255, 0.12);
  }
}
```

---

## Contrast Requirements in Dark Mode

WCAG contrast requirements apply equally in dark mode. Re-verify all contrast ratios with dark mode color values:

| Text type | Minimum ratio | WCAG Criterion |
|---|---|---|
| Body text | 4.5:1 | 1.4.3 AA |
| Large text | 3:1 | 1.4.3 AA |
| UI components | 3:1 | 1.4.11 AA |

**Dark mode commonly fails on:**
- Secondary/muted text that was borderline in light mode — now fails in dark mode
- Placeholder text (near white at low opacity on near-black)
- Disabled text (often too low contrast to even be distinguishable)
- Border colors on form inputs

Test every color combination independently in dark mode with a contrast checker.

---

## Images in Dark Mode

- Photographs: generally fine in dark mode without modification
- Icons: SVG icons filled with `currentColor` will automatically invert with text color
- Illustrations with light backgrounds: add a CSS filter or provide dark-mode variants

```css
/* Soften photographs in dark mode to reduce jarring contrast */
@media (prefers-color-scheme: dark) {
  img:not([src$=".svg"]) {
    filter: brightness(0.85);
  }
}
```

---

## System Preference vs. Manual Toggle

- Respect `prefers-color-scheme` as the default behavior
- Provide a manual toggle for users who want to override the system preference
- Persist the manual toggle in localStorage
- Include `color-scheme: light dark` in the CSS `<meta name="color-scheme">` tag

```html
<meta name="color-scheme" content="light dark">
```

---

## Reduced Motion in Dark Mode

Dark mode has no effect on motion requirements. `prefers-reduced-motion` must be implemented independently.

---

## Accessibility Notes

- Dark mode can improve readability for users with photophobia, migraines, and certain visual conditions
- High contrast dark mode (not standard dark mode) serves users with low vision — these are different
- Do not rely on dark mode as a substitute for WCAG contrast compliance
- `prefers-color-scheme: dark` has no WCAG requirement to support — it is a usability enhancement, not an accessibility requirement

---

## Sources

**Secondary:**
- Google Material Design 3 — Dark Theme. https://m3.material.io/styles/color/dark-theme
- Apple Human Interface Guidelines — Dark Mode. https://developer.apple.com/design/human-interface-guidelines/dark-mode

**Last verified:** 2024-01-01
