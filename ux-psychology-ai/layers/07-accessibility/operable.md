# Layer 07 — Operable

**WCAG Principle 2:** Operable — User interface components and navigation must be operable.

---

## 2.1 Keyboard Accessible

### 2.1.1 Keyboard (Level A)
All functionality available through a pointer device is also available through a keyboard interface, without requiring specific timing of individual keystrokes.

**UI Rules:**
- All interactive elements are reachable by Tab key
- All interactive elements can be activated by Enter or Space
- Custom controls (dropdowns, sliders, date pickers) implement keyboard interaction patterns per WAI-ARIA Authoring Practices
- Modal dialogs: Tab cycles within the dialog; Escape closes it
- Menus: Arrow keys navigate items; Escape closes

**Critical:** Never use `tabindex` values > 0 (which override natural DOM tab order).

### 2.1.2 No Keyboard Trap (Level A)
If keyboard focus can be moved to a component using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.

**UI Rule:** Modal dialogs intentionally trap focus — but must provide an Escape or Close button that releases it. Modals that cannot be escaped by keyboard violate this criterion.

---

## 2.4 Navigable

### 2.4.1 Bypass Blocks (Level A)
A mechanism is available to bypass blocks of content that are repeated across pages.

**UI Rule:** Provide a "Skip to main content" link as the first focusable element on every page with repeated navigation.

### 2.4.3 Focus Order (Level A)
If a Web page can be navigated sequentially and navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operation.

**UI Rules:**
- DOM order must match visual order for logical tab sequence
- After opening a dialog, move focus to the first focusable element inside the dialog
- After closing a dialog, return focus to the element that opened it
- After dynamic content insertion, manage focus appropriately

### 2.4.6 Headings and Labels (Level AA)
Headings and labels describe topic or purpose.

**UI Rule:** Headings must be descriptive, not decorative. Labels must describe the purpose of the field, not just format instructions.

### 2.4.7 Focus Visible (Level AA)
Any keyboard operable UI component has a mode of operation where the keyboard focus indicator is visible.

**UI Rule:** Never suppress focus rings with `outline: none` or `outline: 0` without providing a replacement focus indicator.

### 2.4.11 Focus Appearance (Level AA, WCAG 2.2)
When a UI component receives focus, it must:
- Have a focus indicator area of at least the perimeter of the unfocused component × 2 CSS px
- Have a contrast ratio of at least 3:1 between focused and unfocused states

---

## 2.5 Input Modalities

### 2.5.3 Label in Name (Level A, WCAG 2.1)
For UI components with labels that include text or images of text, the accessible name contains the visible text.

**UI Rule:** The visible button label must be in the accessible name. A button labeled "Search" must not have `aria-label="Submit query"`.

### 2.5.8 Target Size (Minimum) (Level AA, WCAG 2.2)
The size of the target for pointer inputs is at least 24 by 24 CSS pixels.

**Note:** Exceptions apply for inline text links, targets offset from adjacent targets by at least 24px spacing, and essential targets with a standardized size.

---

## Sources

**Standards:**
- W3C. (2018). WCAG 2.1. https://www.w3.org/TR/WCAG21/
- W3C. (2023). WCAG 2.2. https://www.w3.org/TR/WCAG22/
- W3C WAI. (2023). *ARIA Authoring Practices Guide*. https://www.w3.org/WAI/ARIA/apg/

**Last verified:** 2024-01-01
