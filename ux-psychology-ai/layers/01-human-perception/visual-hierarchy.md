# L01-P06 — Visual Hierarchy

**Layer:** 01-human-perception
**Evidence level:** C
**Type:** Design principle
**Domain:** Visual perception, information design

---

## Definition

Visual hierarchy is the deliberate organization of interface elements using visual weight, size, contrast, position, and spacing to communicate their relative importance and to guide the user's attention in the intended order.

---

## Research Basis

Visual hierarchy is a design principle derived from perceptual psychology research on how humans parse visual scenes. It integrates Gestalt principles of proximity, similarity, and figure–ground with research on eye movement and visual scanning. As a design principle rather than a single empirical phenomenon, it has established practice support (C) but is not a single testable law.

---

## Why It Matters

Without visual hierarchy, all elements compete for attention equally. Users cannot identify where to start, what is most important, or what is optional. Hierarchy turns a flat collection of information into a structured communication with a clear reading path.

---

## When to Apply

- Every screen in an interface
- Page headers and section organization
- Content cards
- Forms (field labels vs. help text vs. validation)
- Data tables (column headers vs. data cells vs. totals)
- Navigation systems

---

## UI Implications

1. **Establish a clear primary element on every screen.** Every view should have one element with the highest visual weight — the most important piece of information or the primary action.
2. **Use at most 3–4 levels of hierarchy.** More than four levels creates visual noise where nothing stands out.
3. **Use size as a primary hierarchy signal.** Larger type and elements are perceived as more important. Do not assign large size to low-importance content.
4. **Use contrast as a secondary hierarchy signal.** High-contrast elements are more prominent. Reduce contrast for supporting, secondary, and disabled content.
5. **Use position to reinforce hierarchy.** Top-left positioning (in LTR interfaces) receives the earliest visual attention; place important content there.
6. **Use spacing to separate hierarchy levels.** Increase spacing before higher-level headings. This applies proximity and continuity simultaneously.

---

## Implementation Rules

Typical typographic scale for hierarchy:
- Level 1 (Page title): largest size, highest contrast, heaviest weight
- Level 2 (Section heading): medium-large, high contrast
- Level 3 (Component heading): medium, high contrast
- Body text: standard size, standard contrast
- Supporting text: smaller, reduced contrast
- Disabled/metadata: smallest, lowest contrast

Do not use arbitrary font sizes. Use a defined typographic scale.

---

## Anti-Patterns

❌ Making every heading the same size and weight — no hierarchy is established; users must read everything to find what matters.

❌ Using color as the only hierarchy signal — fails for color-blind users and in high-ambient-light conditions.

❌ Making a legal disclaimer or metadata the most visually prominent element on a screen.

❌ Using all-caps for body text to create emphasis — it reduces readability and creates false hierarchy.

---

## Exceptions and Limitations

- Some interface types deliberately flatten hierarchy for aesthetic reasons (minimalist design). This is an intentional trade-off that must be evaluated against task efficiency.
- Hierarchy should serve the user's primary task — not the designer's or organization's preferred emphasis.

---

## Accessibility Considerations

- Heading hierarchy must be reflected in semantic HTML (`<h1>`–`<h6>`) and must match visual hierarchy. Screen reader users navigate by headings. (WCAG 1.3.1)
- Do not skip heading levels. A visually large sub-heading that is actually `<h4>` after an `<h1>` with no `<h2>` or `<h3>` breaks structural hierarchy.
- Contrast requirements apply to all levels of hierarchy. Even reduced-contrast supporting text must meet WCAG 1.4.3 (4.5:1 for text).

---

## Related Principles

- L01-P01–P04 Gestalt principles — The perceptual building blocks of hierarchy
- L01-P07 Contrast and Salience — Primary mechanism for hierarchy weight
- L02-P01 Cognitive Load — Good hierarchy reduces cognitive load by creating processing order
- L04 Attention — Hierarchy directs where attention goes first

---

## Sources

**Secondary:**
- Lidwell, W., Holden, K., & Butler, J. (2003). *Universal Principles of Design*. Rockport.
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.
- Lupton, E. (Ed.). (2014). *Type on Screen*. Princeton Architectural Press.

**Last verified:** 2024-01-01
