# L01-P01 — Proximity

**Layer:** 01-human-perception
**Evidence level:** A
**Type:** Perceptual principle
**Domain:** Visual perception, Gestalt psychology

---

## Definition

Elements that are spatially close to one another are perceived as belonging to the same group, regardless of whether they share visual properties such as color, shape, or size.

---

## Research Basis

Proximity is one of the original Gestalt principles of perceptual organization, articulated by Wertheimer (1923) in his foundational work on Gestalt psychology. The principle has been reproduced extensively in perceptual psychology research and has strong empirical support for its effects on grouping perception.

**Evidence level A:** The grouping effect of proximity is one of the most robust and replicated findings in visual perception research.

---

## Why It Matters

Users do not read every element of an interface individually. Their visual system automatically groups nearby elements before conscious processing begins. If proximity grouping in a UI is incorrect — if unrelated elements are close together, or related elements are far apart — users will form wrong mental models of the interface structure before they read a single label.

---

## When to Apply

- Designing form layouts (label–input proximity)
- Grouping navigation items into categories
- Creating card-based content layouts
- Designing data tables and dashboards
- Associating help text or validation messages with their fields

---

## UI Implications

1. **Place labels immediately adjacent to their inputs.** A label separated from its field by significant vertical space will not reliably be perceived as belonging to that field.
2. **Group related controls with tighter internal spacing than the gap between groups.** The ratio of within-group to between-group space determines perceived grouping strength.
3. **Increase whitespace between distinct sections** to create clear visual separation — not borders or background colors alone.
4. **Validation messages must be visually adjacent to the field they describe.** A message placed at the top of a form for a field at the bottom violates proximity and disrupts error identification.
5. **Navigation items within a category should have less space between them than between categories.**

---

## Implementation Rules

- Within-group spacing: typically 4–8px
- Between-group spacing: typically 16–32px or more depending on density
- Never rely on color alone to create grouping when proximity is contradicted

---

## Anti-Patterns

❌ Placing a form label above one field with spacing that is visually ambiguous about which field it belongs to.

❌ Grouping navigation categories by color while spacing them equidistantly — proximity will dominate and users will not perceive the color-based grouping reliably.

❌ Placing a "Required field" note at the top of a form with required indicators (*) scattered throughout — users must mentally connect distant elements.

---

## Exceptions and Limitations

- Proximity grouping can be overridden by strong similarity cues (same color, shape) when they conflict. In practice, both proximity and similarity should reinforce the same grouping.
- In very dense interfaces (e.g., data tables), proximity grouping becomes harder to establish and explicit visual separators become more important.
- Mobile interfaces with limited screen width require careful proximity management across reflow breakpoints.

---

## Accessibility Considerations

- Proximity supports cognitive accessibility by reducing the need to search for related information. (WCAG 1.3.1 Info and Relationships)
- Do not rely on spatial proximity alone to convey relationships — the DOM and ARIA relationships must also be explicit for screen reader users. (`for`/`id` attribute pairing, `aria-describedby`)
- Users with low vision who zoom in may lose proximity relationships. Ensure semantic markup encodes the same relationships that proximity communicates visually.

---

## Related Principles

- L01-P02 Similarity — Similarity can reinforce or conflict with proximity grouping
- L01-P03 Common Region — Explicit boundaries can reinforce proximity grouping
- L02-P01 Cognitive Load — Correct proximity reduces the cognitive effort of parsing structure
- L07 Perceivable — Relationships must be programmatically determinable, not just visual

---

## Sources

**Primary:**
- Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt, II. *Psychologische Forschung*, 4, 301–350.

**Secondary:**
- Palmer, S. E. (1992). Common region: A new principle of perceptual grouping. *Cognitive Psychology*, 24(3), 436–447.
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.

**Last verified:** 2024-01-01
