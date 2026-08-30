# UI — Typography

## Type Scale

Define a clear typographic scale derived from a mathematical ratio:

```
Modular scale (Major Third, ×1.25):
xs:  0.75rem   (12px)   — labels, captions, helper text
sm:  0.875rem  (14px)   — secondary body, table cells
base: 1rem     (16px)   — primary body text
md:  1.125rem  (18px)   — large body, lead text
lg:  1.25rem   (20px)   — small headings
xl:  1.5rem    (24px)   — component headings
2xl: 1.875rem  (30px)   — section headings
3xl: 2.25rem   (36px)   — page headings
4xl: 3rem      (48px)   — hero / display
```

## Font Selection
- Choose typefaces with high legibility at body sizes
- Prefer system font stacks for performance or web fonts with limited weights
- Maximum 2 typefaces in one interface (heading + body, or single family)
- Avoid decorative fonts for interface labels, captions, or body text

## Line Height
- Body text: 1.5–1.6× font size minimum (WCAG 1.4.12)
- Headings: 1.2–1.3× font size
- Line height < 1.4 for body text reduces readability significantly

## Measure (Line Length)
- Body text: 60–80 characters (45–75 is optimal for print; web can extend to 80)
- Avoid full-width body text on wide screens — use max-width on content containers

## Weight Usage
- Regular (400): body text
- Medium (500): emphasized body, labels
- Semibold (600): component headings, strong emphasis
- Bold (700): page headings, display
- Do not use more than 3 weights in one interface

## Accessibility
- Minimum body text size: 16px (1rem) for primary reading content — 14px acceptable for secondary/UI text
- All text must meet WCAG 1.4.3 contrast: 4.5:1 for body, 3:1 for large (≥18pt / ≥14pt bold)
- Text must be resizable to 200% without loss of content (WCAG 1.4.4)
- Line height, letter spacing, and word spacing must be overridable without loss of content (WCAG 1.4.12)
