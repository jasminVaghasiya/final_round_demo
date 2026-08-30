# UI — Layout

## Core Layout Principles

### Grid System
- Use a defined grid (8px or 4px base unit) for all spacing and sizing decisions
- Align all elements to the grid — ad-hoc sizing creates visual inconsistency
- Column grids: 12 columns for desktop, 4–6 for mobile
- Gutters: 16–32px desktop, 16px mobile

### Spacing Scale
Define spacing on a geometric or linear scale. Example 8px base scale:
```
4px   (0.5×) — minimal separation (icon internal padding)
8px   (1×)   — tight grouping (label to input)
16px  (2×)   — within-section spacing
24px  (3×)   — between related sections
32px  (4×)   — between distinct sections
48px  (6×)   — major page sections
64px  (8×)   — hero / page-level separation
```

### Visual Hierarchy Through Layout
- Most important content: top-left quadrant (LTR interfaces)
- Related elements: visually proximate (Layer 01 Proximity)
- Sectional grouping: distinct spacing ratios between vs. within groups
- Single dominant element per view

### Responsive Layout
- Mobile-first approach: design for 360–390px viewport width first
- Breakpoints: ~768px (tablet), ~1024px (small desktop), ~1440px (large desktop)
- No horizontal scroll at any breakpoint except intentional horizontal scroll components
- Test at 200% browser zoom (WCAG 1.4.4) and 400% (WCAG 1.4.10 Reflow)

### Content Width
- Comfortable reading line length: 60–80 characters (approximately 600–800px for body text)
- Do not stretch body content to fill wide viewports
- Use max-width containers for reading content; use full-width for data tables and dashboards
