# UI — Color

## Color System Architecture

### Role-Based Color
Define colors by function, not by name:

```
color/primary           — Brand / primary action
color/primary-hover     — Hover state of primary
color/primary-active    — Pressed state of primary

color/secondary         — Secondary actions
color/secondary-hover

color/surface           — Page/card background
color/surface-raised    — Elevated surface (card, dropdown)
color/surface-overlay   — Modal backdrop

color/text/primary      — Primary body text
color/text/secondary    — Supporting text
color/text/disabled     — Disabled text
color/text/inverse      — Text on dark backgrounds

color/feedback/error    — Error state
color/feedback/warning  — Warning state
color/feedback/success  — Success state
color/feedback/info     — Informational

color/border/default    — Default border
color/border/focus      — Focus ring
color/border/error      — Error field border
```

## Contrast Requirements (WCAG)
All color combinations must be tested:

| Use | Minimum ratio | WCAG Criterion |
|---|---|---|
| Body text on background | 4.5:1 | 1.4.3 AA |
| Large text on background | 3:1 | 1.4.3 AA |
| UI components on background | 3:1 | 1.4.11 AA |
| Focus ring on adjacent color | 3:1 | 2.4.11 AA (WCAG 2.2) |
| Enhanced text | 7:1 | 1.4.6 AAA |

## Color Independence Rule
Color must never be the only means of conveying information. (WCAG 1.4.1)

Every use of color for meaning must have a non-color reinforcement:
- Error fields: border color + error icon + error text
- Required fields: asterisk + "(required)" text label
- Chart series: color + pattern/shape/label

## Semantic Color Usage
- One primary action color per interface — do not dilute with competing accent colors
- Destructive actions (delete, remove): distinct color with non-color icon
- Disabled states: reduced contrast, no hover effects
- Error states: red family with non-color reinforcement
