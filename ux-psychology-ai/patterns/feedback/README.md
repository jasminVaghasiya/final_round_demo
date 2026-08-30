# Pattern — Feedback Systems

## User Goal
Understand what happened after an action; know whether the system is working; recover from errors.

---

## Feedback Types

| Type | When | Placement | Priority |
|---|---|---|---|
| **Inline validation** | After field blur | Below field | High |
| **Toast / Snackbar** | After low-stakes action | Bottom/top of screen | Low |
| **Banner / Alert** | Persistent important status | Top of content area | High |
| **Modal confirmation** | Before irreversible action | Center overlay | High |
| **Page-level success** | After significant action | Main content area | High |
| **Loading state** | During async operation | Within triggering element | High |
| **Empty state** | No content exists | Content area | Medium |

---

## Timing Requirements

Based on perception research (Miller, 1968) and usability standards:

| Duration | Experience |
|---|---|
| < 100ms | Feels instantaneous — direct manipulation |
| 100–300ms | Feels immediate but perceivably delayed |
| 300ms–1s | Slight delay — loading indicator not required but beneficial |
| 1–3s | Significant delay — loading indicator required |
| > 3s | Long delay — progress indicator with estimated time |

---

## Feedback Writing

### Error messages
Must: identify the specific problem + provide specific corrective action
```
❌ "Invalid input"
✅ "Email address is invalid — enter an address in the format name@example.com"

❌ "Error occurred"
✅ "Could not save changes. Check your internet connection and try again."
```

### Success messages
Must: confirm what happened (not just "Success")
```
❌ "Success"
✅ "Application submitted — confirmation sent to you@example.com"
```

### Warning messages
Must: describe the risk and provide a clear next action
```
❌ "Warning: unsaved changes"
✅ "You have unsaved changes. Leave without saving?"
   [Stay on page] [Leave without saving]
```

---

## Accessibility

- Toast/snackbar: `role="status"` (polite) or `role="alert"` (urgent) — announced without focus move (WCAG 4.1.3)
- Error messages: `aria-live="assertive"` when appearing due to user action
- Modal confirmations: focus moves to dialog; Escape or Cancel closes; focus returns to trigger
- Progress indicators: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Loading states: `aria-busy="true"` on the updating element; announce completion with `role="status"`

---

## Motion in Feedback

- Toast/notification: fade in (ease-out, 200ms) + fade out (ease-in, 150ms) — not slide from edge
- Error appearance: localized shake (300ms) + color + border + text (never shake alone)
- Success: brief scale bounce (200ms) or checkmark draw
- Loading: continuous smooth spinner (no jerky animation)
- All: `prefers-reduced-motion` must substitute opacity transitions for position/scale animations

---

## Common Mistakes

❌ Silent success — no confirmation that action completed
❌ Toast notification in top-right for a critical error — low attention probability, changes missed
❌ Error message at top of page for a field error at the bottom
❌ Loading states that take > 1 second to appear — users assume the action did not register and retry
❌ Feedback announced only visually — no screen reader announcement (violates WCAG 4.1.3)
