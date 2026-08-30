# UI — Spacing

## Spacing Scale

Use a consistent spacing scale based on a base unit (typically 4px or 8px):

```
Base unit: 8px

Tokens:
space-1:  4px   (0.5×)
space-2:  8px   (1×)
space-3:  12px  (1.5×)
space-4:  16px  (2×)
space-5:  24px  (3×)
space-6:  32px  (4×)
space-7:  48px  (6×)
space-8:  64px  (8×)
space-9:  96px  (12×)
space-10: 128px (16×)
```

## Spacing Principles

### Internal vs. External Spacing
- Internal spacing (padding within a component): typically space-2 to space-4
- Between related elements in a group: space-2 to space-3
- Between groups: space-5 to space-6
- Between major sections: space-7 to space-8

The ratio of between-group to within-group spacing creates perceptual grouping (Layer 01 Proximity).

### Touch Target Spacing
- Adjacent interactive elements need at least 8px spacing (non-touch)
- Adjacent touch targets need at least 8px to prevent accidental activation
- Minimum touch target size: 24×24px (WCAG 2.5.8); recommended 44×44px

### Form Spacing
- Label to input: 4–8px
- Input to next label: 16–24px
- Form section to next section: 32–48px
- Form help text to next input: 8px
