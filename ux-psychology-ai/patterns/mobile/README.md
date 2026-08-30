# Pattern — Mobile Interfaces

## User Goal
Accomplish tasks quickly, on a small screen, often with one hand, in variable conditions.

---

## Mobile Design Principles

### Thumb Zone
Consider thumb reach zones for right-hand one-handed use:
- Easy reach: bottom-center of screen
- Moderate reach: middle of screen
- Hard reach: top corners

Place primary actions and most frequent interactions in the easy and moderate reach zones.
Place destructive or irreversible actions in harder-to-reach zones.

### Touch Target Size
- Minimum: 24×24px (WCAG 2.5.8, WCAG 2.2)
- Recommended: 44×44px (Apple HIG, Material Design)
- Spacing between adjacent targets: ≥ 8px to prevent accidental activation

### One-Handed Usability
- Navigation: bottom tab bar (5 items max) preferred over top tabs for one-handed use
- Primary actions: bottom of screen or FAB (floating action button)
- Do not require bimanual operation for common tasks

---

## Information Density

Mobile screens require more aggressive information hierarchy:
- Show less content per screen; use progressive disclosure
- Prioritize the most critical content above the fold (no-scroll area)
- Use clear visual hierarchy — smaller screens amplify the effect of poor hierarchy

---

## Mobile Navigation Patterns

### Bottom Tab Bar
- Maximum 5 tabs (typically 4)
- Each tab: icon + label
- Active tab: clearly distinguished with color + bold label + indicator
- Touch target: full tab bar cell, not just icon

### Hamburger Menu
- Use when primary destinations exceed 5
- Accessible: button with aria-expanded, keyboard accessible, Escape to close
- Avoid hiding frequently accessed destinations in a hamburger menu

### Back Navigation
- System-provided back (swipe) supplemented by in-app back button where needed
- Back button: top-left (matches system convention)

---

## Input on Mobile

- Minimize keyboard entry: prefer selection (picker, checkbox, toggle) over typing
- Show appropriate keyboard type: `inputmode="numeric"` for numbers, `type="email"` for email
- Support autocomplete: `autocomplete` attributes for personal data fields
- Avoid very small tap targets for text selection

---

## Mobile-Specific States

- Pull to refresh: show loading indicator immediately on pull; announce to screen reader
- Swipe to delete: show confirmation or undo; do not delete on first swipe
- Long-press: appropriate for secondary actions; ensure primary action is accessible without long-press

---

## Accessibility on Mobile

- VoiceOver (iOS) / TalkBack (Android): test with system screen readers
- Touch target size: 44×44pt (iOS) / 48dp (Android)
- Do not rely on gestures as the only method: swipe-based deletion must have a button alternative (WCAG 2.5.1)
- No orientation lock (WCAG 1.3.4)

---

## Common Mistakes

❌ Primary actions placed in the top corners — hardest to reach for thumb
❌ Icon-only bottom tab bar without labels — weak information scent
❌ Touch targets below 44×44px for primary actions
❌ Input forms that require pinch-to-zoom to read labels — layout not mobile-optimized
❌ Assuming mobile users have slow connections — optimize assets but test at realistic speeds
