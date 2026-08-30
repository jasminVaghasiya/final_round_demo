# L01-P04 — Figure–Ground

**Layer:** 01-human-perception
**Evidence level:** A
**Type:** Perceptual principle
**Domain:** Visual perception, Gestalt psychology

---

## Definition

The visual system automatically separates a scene into a primary subject (figure) perceived as having a defined shape in the foreground, and a less distinct background (ground) that recedes behind it.

---

## Research Basis

Figure–ground separation is a foundational concept in Gestalt psychology (Rubin, 1915/1921; Köhler, 1929). It is among the most studied phenomena in visual perception, with decades of experimental support for its automatic, pre-attentive nature.

**Evidence level A:** One of the most established phenomena in perceptual psychology.

---

## Why It Matters

Every interface has a figure–ground relationship. Content areas, dialogs, menus, and focused elements must read as figures against the interface ground. When figure–ground separation fails — when content blurs into the background, or when a modal does not visually separate from the page — users struggle to identify what they should attend to.

---

## When to Apply

- Modal dialogs and overlays
- Dropdown menus and popovers
- Focused input fields
- Content cards on background surfaces
- Navigation areas vs. content areas
- Disabled state visual treatment

---

## UI Implications

1. **Modals must visually separate from the page.** A backdrop overlay, shadow, or sufficient luminance contrast between the modal surface and the page creates the necessary figure–ground separation.
2. **Focused elements must read as figure.** A focus ring creates figure–ground separation for the focused element. Insufficient contrast makes the focus ring disappear into the ground.
3. **Menus and popovers must float above the interface.** Elevation (shadow, border, background contrast) establishes the menu as figure against the page ground.
4. **Active content areas should have more contrast with the background than inactive areas.**
5. **Disabled elements should recede into the ground** through reduced contrast — communicating that they are not actionable without requiring the user to read a label.

---

## Anti-Patterns

❌ A modal dialog with a white background on a white page with no shadow or backdrop — the figure–ground boundary is undefined.

❌ Focus indicators with contrast ratios below the threshold needed to separate them from adjacent elements.

❌ Dropdown menus that share the same background color as the page without a border or shadow — they do not read as figure.

---

## Exceptions and Limitations

- Figure–ground relationships can be ambiguous or reversible (as in classic visual illusions). In interfaces, ambiguity should be eliminated.
- Dark mode interfaces require careful re-evaluation of figure–ground relationships — luminance relationships invert.
- The same surface color can be figure in one context and ground in another depending on surrounding elements.

---

## Accessibility Considerations

- Focus visibility depends on figure–ground separation. WCAG 2.4.11 (Focus Appearance, WCAG 2.2 Level AA) requires focus indicators to have a minimum area and contrast ratio to ensure they read as figure.
- Modal dialogs must not allow the background to be operable while the dialog is open. The background becomes ground — it must be inert. (WCAG 2.1.2 No Keyboard Trap, ARIA dialog pattern)
- Luminance contrast of 3:1 minimum for UI components against adjacent colors (WCAG 1.4.11 Non-text Contrast).

---

## Related Principles

- L01-P07 Contrast and Salience — Contrast is the primary mechanism for creating figure–ground separation
- L07 Operable — Focus visibility requires clear figure–ground separation
- L08 Motion — Overlays entering and exiting communicate figure–ground transitions spatially

---

## Sources

**Primary:**
- Rubin, E. (1921). *Visuell wahrgenommene Figuren*. Gyldendals.
- Köhler, W. (1929). *Gestalt Psychology*. Liveright.

**Secondary:**
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.

**Last verified:** 2024-01-01
