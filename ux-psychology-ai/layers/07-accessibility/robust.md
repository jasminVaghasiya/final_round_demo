# Layer 07 — Robust

**WCAG Principle 4:** Robust — Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

---

## 4.1 Compatible

### 4.1.2 Name, Role, Value (Level A)
For all user interface components: the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically determined; and notification of changes to these items is available to user agents, including assistive technologies.

**UI Rules:**
- All interactive elements have an accessible name (via `<label>`, `aria-label`, `aria-labelledby`, or button text)
- All roles are communicated (native HTML elements carry implicit roles; custom elements need explicit `role`)
- States are exposed: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-disabled`
- `aria-controls` / `aria-owns` link controls to the content they control

**Common custom component patterns:**

| Component | Role | Key states |
|---|---|---|
| Accordion | `button` (trigger), `region` (panel) | `aria-expanded` |
| Tab panel | `tablist`, `tab`, `tabpanel` | `aria-selected` |
| Modal dialog | `dialog` | `aria-modal`, `aria-labelledby` |
| Combobox / autocomplete | `combobox` | `aria-expanded`, `aria-activedescendant` |
| Toggle | `button` | `aria-pressed` |
| Alert | `role="alert"` | (auto-announces on insertion) |
| Status | `role="status"` | (polite announcement) |

### 4.1.3 Status Messages (Level AA, WCAG 2.1)
Status messages conveyed visually (success, error, loading complete) must be available to assistive technologies without receiving focus.

**UI Rules:**
- Use `role="alert"` or `aria-live="assertive"` for error/urgent status messages
- Use `role="status"` or `aria-live="polite"` for non-urgent updates
- Use `aria-atomic="true"` when the full message should be re-announced on change

**Examples:**
```html
<!-- Error message -->
<div role="alert">Email address is invalid. Please enter a valid email address.</div>

<!-- Success toast -->
<div role="status" aria-live="polite">Your changes have been saved.</div>

<!-- Loading complete -->
<div role="status" aria-live="polite" aria-atomic="true">Search results loaded: 24 items found.</div>
```

---

## Implementation Notes

### WAI-ARIA should supplement, not replace, semantic HTML

Use native HTML elements where possible. `<button>` provides role, keyboard interaction, and focusability automatically. `<div role="button" tabindex="0">` requires manual keyboard event handling.

Priority:
1. Use the correct native HTML element
2. Use HTML with ARIA attributes for state/property
3. Use custom elements with full ARIA implementation only when necessary

---

## Sources

**Standards:**
- W3C. (2018). WCAG 2.1. SC 4.1.2, 4.1.3. https://www.w3.org/TR/WCAG21/
- W3C. (2023). WCAG 2.2. https://www.w3.org/TR/WCAG22/
- W3C WAI. (2023). *WAI-ARIA 1.2*. https://www.w3.org/TR/wai-aria-1.2/
- W3C WAI. (2023). *ARIA Authoring Practices Guide*. https://www.w3.org/WAI/ARIA/apg/

**Last verified:** 2024-01-01
