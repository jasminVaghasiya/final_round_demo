# L01-P02 — Similarity

**Layer:** 01-human-perception
**Evidence level:** A
**Type:** Perceptual principle
**Domain:** Visual perception, Gestalt psychology

---

## Definition

Elements that share visual properties — such as color, shape, size, orientation, or texture — are perceived as belonging to the same group, even when they are not spatially adjacent.

---

## Research Basis

Similarity is a core Gestalt principle (Wertheimer, 1923). It is well-supported by perceptual research as a driver of pre-attentive visual grouping. The mechanism operates rapidly and automatically before conscious attention is deployed.

**Evidence level A:** One of the most replicated perceptual grouping principles.

---

## Why It Matters

Visual consistency is not merely aesthetic. When interactive elements share a consistent visual form (color, shape, size), users automatically learn to recognize the category without reading every label. When consistency is violated — when two different types of elements look the same — users will group them incorrectly and make prediction errors.

---

## When to Apply

- Defining button styles for different action types (primary, secondary, destructive)
- Designing icon systems
- Creating typographic hierarchies
- Distinguishing interactive from non-interactive elements
- Indicating selection states across a set of items

---

## UI Implications

1. **Use consistent visual form for all interactive elements of the same type.** All primary buttons should look identical across the interface.
2. **Do not make non-interactive elements look like interactive ones.** Underlined non-link text, box-shadowed static cards, and styled headings that look like buttons violate similarity expectations.
3. **Use a single accent color for primary actions.** Multiple competing accent colors prevent users from forming a consistent similarity group for "the thing I click to proceed."
4. **Distinguish action categories visually.** Primary, secondary, and destructive actions should have distinct visual treatments so similarity groups them correctly.
5. **Apply consistent iconography within categories.** Navigation icons, action icons, and status icons should have distinct visual styles within each category.

---

## Anti-Patterns

❌ Using the same blue link color for both hyperlinks and informational highlighted text — users will attempt to click the highlighted text.

❌ Designing different components (e.g., a badge and a button) with similar shapes and sizes — users will attempt to interact with the badge.

❌ Alternating between two primary button colors across different screens — users cannot form a consistent "primary action" similarity group.

---

## Exceptions and Limitations

- Similarity and proximity can conflict. When they do, proximity tends to be a stronger grouping cue in many conditions. Designers should align both cues, not rely on one to override the other.
- Very subtle similarity differences (e.g., 5% opacity change) may not be reliably perceived, especially by users with low vision.
- Cultural context can affect the interpretation of colors and shapes.

---

## Accessibility Considerations

- Color similarity alone is insufficient for accessibility. Use shape, size, or label reinforcement alongside color. (WCAG 1.4.1 Use of Color)
- Ensure focus indicators are visually distinct from the similar-looking elements around them. (WCAG 2.4.7 Focus Visible; 2.4.11 Focus Appearance in WCAG 2.2)
- Interactive and non-interactive elements must be distinguishable beyond color for users with color vision deficiencies.

---

## Related Principles

- L01-P01 Proximity — Proximity and similarity work together to create perceptual groups
- L01-P06 Visual Hierarchy — Similarity creates categories; hierarchy orders them by importance
- L06-P04 Consistency and Standards — Similarity principle is the perceptual basis for design system consistency
- L05-P02 Affordances — Visual similarity helps users predict interactive behavior

---

## Sources

**Primary:**
- Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt, II. *Psychologische Forschung*, 4, 301–350.

**Secondary:**
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.
- Norman, D. A. (1988). *The Design of Everyday Things*. Basic Books.

**Last verified:** 2024-01-01
