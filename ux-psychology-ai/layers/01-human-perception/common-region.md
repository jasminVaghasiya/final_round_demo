# L01-P03 — Common Region

**Layer:** 01-human-perception
**Evidence level:** B
**Type:** Perceptual principle
**Domain:** Visual perception, Gestalt psychology

---

## Definition

Elements enclosed within a visible boundary — such as a box, card, background, or border — are perceived as belonging to the same group, even if they differ in shape, color, or size.

---

## Research Basis

Common region was introduced by Palmer (1992) as an extension of classical Gestalt grouping principles. Palmer's experiments demonstrated that enclosure is a powerful grouping cue that operates independently of proximity and similarity.

**Evidence level B:** Established by Palmer's original experiments; the principle is widely accepted and applied in visual design research. Direct replications in HCI contexts are less numerous than for proximity and similarity.

---

## Why It Matters

Common region is the primary mechanism by which cards, panels, dialogs, toolbars, and section containers communicate grouping. It allows designers to group elements that are not spatially adjacent or visually similar. Misuse creates visual containers that imply false relationships.

---

## When to Apply

- Card-based layouts (content cards, product cards, article cards)
- Modal dialogs and drawers
- Form sections grouped within bordered or background-colored containers
- Navigation panels and sidebars
- Dashboards with distinct widget regions
- Toolbars containing grouped controls

---

## UI Implications

1. **Use a consistent container style for a consistent grouping type.** If cards represent content items, all cards should use the same visual container treatment.
2. **Do not nest containers unnecessarily.** Each nesting level adds visual complexity and implies a hierarchical relationship. Flatten when hierarchy does not exist.
3. **Ensure container boundaries are clearly perceivable.** A 1px border on a white background over a white page may not create sufficient grouping.
4. **Do not use a container boundary to imply grouping that does not exist semantically.** Empty containers, decorative borders, and background blocks that do not correspond to meaningful content groups mislead users.
5. **Distinguish between grouping containers and interactive containers.** A card that is clickable should communicate interactivity through affordances — not merely through being enclosed.

---

## Anti-Patterns

❌ Placing unrelated items inside a shared card or panel — users will assume they are related because of common region.

❌ Using heavy card styling for non-interactive content and lighter styling for interactive cards — the container style will override the intended affordance hierarchy.

❌ Creating a bordered section purely for visual decoration with no semantic or relational meaning.

---

## Exceptions and Limitations

- Common region is a perceptual cue. It communicates grouping visually. It does not substitute for semantic structure (HTML landmarks, ARIA regions) needed by assistive technologies.
- Very subtle common region cues (e.g., very light background tint) may not be perceived by users with low contrast sensitivity.
- Overuse of common region creates visual fragmentation where everything appears equally important.

---

## Accessibility Considerations

- Containers that group information must be represented semantically in the DOM (e.g., `<section>`, `<fieldset>`, `<article>`, `role="region"` with `aria-label`). (WCAG 1.3.1 Info and Relationships)
- Background color used as a common region cue must maintain sufficient contrast for enclosed text. (WCAG 1.4.3 Contrast Minimum)
- Modal dialogs as common region containers must implement proper focus management and ARIA dialog pattern. (WCAG 2.1.2 No Keyboard Trap)

---

## Related Principles

- L01-P01 Proximity — Common region can override proximity in certain conditions
- L01-P02 Similarity — Common region groups elements that might otherwise not be perceived as similar
- L05-P02 Affordances — Whether a common-region container is interactive requires explicit affordance signals

---

## Sources

**Primary:**
- Palmer, S. E. (1992). Common region: A new principle of perceptual grouping. *Cognitive Psychology*, 24(3), 436–447.

**Secondary:**
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.

**Last verified:** 2024-01-01
