# L05-P07 — Interaction States

**Layer:** 05-interaction-usability
**Evidence level:** C
**Type:** Design principle
**Domain:** Interaction design, visual design

---

## Definition

Interaction states are the distinct visual and functional conditions that an interface element can be in, each communicating different information about what has happened and what is possible.

---

## Why It Matters

An interface element without defined states is ambiguous. Users cannot tell whether it is loading, disabled, selected, or failed. State design is the language through which an interface communicates with the user about system status and available actions.

---

## Core States

Every interactive element should have defined visual treatment for all applicable states:

| State | Communicates | Visual signal |
|---|---|---|
| **Default** | Available, ready | Base appearance |
| **Hover** | Interactive, pointer is here | Subtle highlight/elevation |
| **Focus** | Keyboard location | Clear focus ring |
| **Active/Pressed** | Input being received | Compressed or brightened |
| **Disabled** | Not available in current context | Reduced contrast, no hover |
| **Loading** | System is working | Spinner, skeleton, progress |
| **Success** | Action completed | Green/check, confirmation |
| **Error** | Action failed or invalid | Red/warning, description |
| **Selected** | Item is chosen/active | Filled/highlighted/checked |
| **Empty** | No content yet | Empty state illustration + action |

---

## UI Implications

1. **Design all states before implementation.** A component without a defined disabled state, loading state, and error state is incomplete.
2. **Focus state must always be visible.** It must meet contrast requirements against the element's default background. Never suppress focus outlines with `outline: none` without replacement.
3. **Disabled states must communicate why they are disabled** (tooltip, adjacent text, or conditional help message) when the reason is not obvious.
4. **Loading states should appear immediately on trigger.** A button with no loading indicator for 2 seconds will be pressed again.
5. **Success and error states should be localized to the relevant element.** A global toast notification is insufficient for field-level outcomes.
6. **Empty states should not be blank.** Explain why the content is empty and offer a path to populate it.

---

## Anti-Patterns

❌ Suppressing the focus ring for aesthetic reasons — keyboard users lose location tracking.

❌ A submit button with no loading state — users cannot tell if the action was received.

❌ Disabled button with no tooltip or explanation — users do not know what to do to enable it.

❌ Empty table with no message — users cannot tell if no data exists, if data failed to load, or if a filter is hiding results.

---

## Accessibility Considerations

- Focus state: WCAG 2.4.7 (Focus Visible, AA), 2.4.11 (Focus Appearance, WCAG 2.2 AA)
- Loading states: must be announced to screen readers. Use `aria-busy` or `role="status"`.
- Error states: WCAG 3.3.1 (Error Identification) and 3.3.3 (Error Suggestion)
- Disabled states: still require an accessible name; `aria-disabled="true"` is preferred over `disabled` when context is needed.

---

## Related Principles

- L08 Motion — State transitions should use appropriate motion to communicate change
- L04-P03 Change Blindness — State changes must be perceptible where users are attending

**Last verified:** 2024-01-01
