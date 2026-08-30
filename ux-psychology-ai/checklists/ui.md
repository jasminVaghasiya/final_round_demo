# UI Pre-Release Checklist

---

## Visual Hierarchy

- [ ] One dominant element per view
- [ ] Maximum 4 distinct hierarchy levels
- [ ] Type size corresponds to importance hierarchy
- [ ] Contrast corresponds to importance hierarchy
- [ ] No equally-weighted competing primary actions

## Spacing and Layout

- [ ] Within-group spacing is tighter than between-group spacing
- [ ] Alignment is consistent (grid-based)
- [ ] Touch targets have adequate spacing between them (≥ 8px)
- [ ] Line length for body text is 60–80 characters max

## Typography

- [ ] Typeface is readable at intended sizes
- [ ] Line height ≥ 1.5× for body text
- [ ] Typographic scale is defined (not arbitrary sizes)
- [ ] No more than 3 font weights in use
- [ ] Minimum 16px for primary body text

## Color

- [ ] One primary action color used for one action type
- [ ] Error, success, warning states are visually distinct
- [ ] Error states have non-color reinforcement
- [ ] Color palette limited to maintain clear hierarchy

## Interaction States

- [ ] All states defined: default, hover, focus, active, disabled, loading, success, error
- [ ] Focus state is visible without color alone
- [ ] Loading states appear within 300ms
- [ ] Disabled states explain why they are disabled (if reason is non-obvious)
- [ ] Empty states are informative (reason + action)

## Responsive

- [ ] Layout reflows correctly at 360px, 768px, 1024px, 1440px
- [ ] Touch targets meet minimum size at mobile breakpoints
- [ ] No horizontal scroll at any standard breakpoint
- [ ] Content reflows correctly at 200% zoom and 400% zoom
