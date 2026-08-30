# UI — Interaction States

All interactive components must have defined visual treatments for every applicable state.
Reference: Layer 05-P07 (Interaction States)

---

## State Definitions

| State | Visual Signal | Communicates |
|---|---|---|
| **Default** | Base component appearance | Available, ready |
| **Hover** | Subtle highlight, cursor change | Pointer is on interactive element |
| **Focus** | Visible focus ring | Keyboard location |
| **Active/Pressed** | Compressed or brightened | Input is being received |
| **Loading** | Spinner or skeleton | System is working |
| **Success** | Green/check confirmation | Action completed |
| **Error** | Red/warning + text | Action failed or invalid input |
| **Disabled** | Reduced contrast, no hover | Not available |
| **Selected** | Filled/highlighted | Item is chosen |
| **Empty** | Empty state layout | No content yet |

---

## State Implementation Requirements

### Focus State
- Never suppress with `outline: none` without replacement
- Must be visible against the component's background and surrounding context
- WCAG 2.4.7 (Level AA): focus must be visible
- WCAG 2.4.11 (Level AA, WCAG 2.2): focus area ≥ perimeter × 2px; contrast ≥ 3:1

```css
/* Base focus ring */
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Reduced motion: focus is not motion-dependent */
@media (prefers-reduced-motion: reduce) {
  :focus-visible {
    /* no change needed — focus ring has no animation by default */
  }
}
```

### Disabled State
- Reduced opacity (typically 40–60%) or reduced contrast
- Remove hover effects
- `disabled` attribute on native elements; `aria-disabled="true"` on custom elements
- Disabled elements are not focusable by default with `disabled` attribute
- When context is needed (explaining why disabled), use `aria-disabled="true"` and keep it focusable

### Loading State
- Appear within 300ms of trigger
- Replace interactive controls with loading indicator to prevent double-submission
- Announce loading state to screen readers: `aria-busy="true"` or `role="status"` live region

### Empty State
- Explain why the content area is empty
- Distinguish between: no data exists / data failed to load / filter is hiding results
- Provide a path to add content or resolve the issue

---

## CSS Custom Property Pattern

```css
/* State tokens */
--color-state-hover:    rgba(0, 0, 0, 0.04);
--color-state-focus:    #005fcc;   /* must meet contrast */
--color-state-active:   rgba(0, 0, 0, 0.12);
--color-state-disabled: rgba(0, 0, 0, 0.38);
--color-state-error:    #c62828;
--color-state-success:  #2e7d32;
```
