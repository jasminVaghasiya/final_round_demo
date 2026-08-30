# UI — Responsive Design

## Breakpoint System

```
Breakpoint definitions:
xs:   0–359px     (small mobile)
sm:   360–767px   (mobile)
md:   768–1023px  (tablet)
lg:   1024–1439px (small desktop)
xl:   1440px+     (large desktop)
```

## Responsive Principles

### Mobile-First
Design for the smallest viewport first. Progressive enhancement adds complexity for larger viewports.

### Content Priority
Not all content needs to appear at all breakpoints. Define content priority:
1. **Critical**: must appear at all sizes
2. **Important**: appears at md+ or can be accessed via expansion
3. **Optional**: desktop-only or accessible via secondary navigation

### Touch vs. Pointer
- Mobile (sm): touch targets ≥ 44×44px; touch-optimized spacing
- Desktop (lg+): pointer targets can be smaller; hover states active

### Navigation Patterns
- Mobile: hamburger / bottom tab bar / bottom sheet
- Desktop: horizontal top nav / sidebar

## WCAG Responsive Requirements

| Requirement | WCAG Criterion |
|---|---|
| Text resize to 200% without loss of content | 1.4.4 |
| Reflow at 400% zoom without horizontal scroll | 1.4.10 |
| No orientation restriction | 1.3.4 |

## Testing Checklist

```
□ 360px viewport — primary mobile size
□ 375px viewport — iPhone standard
□ 768px viewport — tablet portrait
□ 1024px viewport — tablet landscape / small desktop
□ 1440px viewport — standard desktop
□ 200% browser zoom — text resize
□ 400% browser zoom — reflow (WCAG 1.4.10)
□ Landscape on mobile — orientation change
□ Touch target size on mobile breakpoints
```
