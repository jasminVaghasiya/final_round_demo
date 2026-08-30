# L01-P08 — Common Fate

**Layer:** 01-human-perception
**Evidence level:** B
**Type:** Perceptual principle
**Domain:** Visual perception, Gestalt psychology

---

## Definition

Elements that move or change in the same direction, at the same speed, or in the same way are perceived as belonging to the same group — regardless of their shape, size, color, or proximity.

---

## Research Basis

Common fate is one of Wertheimer's original Gestalt principles (1923). It extends grouping from static relationships into dynamic motion. The principle is well-established in perceptual psychology and applies to both actual motion and implied motion (such as arrows pointing in the same direction).

**Evidence level B:** Classical Gestalt principle with original research support. Less experimentally elaborated in HCI contexts than proximity or similarity, but widely applied and accepted in perceptual research.

---

## Why It Matters

Interfaces increasingly use motion to communicate grouping and relationships. When multiple elements animate together, users perceive them as a single unit. This is both an opportunity and a risk: coordinated animation can create clear group identity, but unintentional common fate can mislead users about what belongs together.

---

## When to Apply

- Multi-element enter/exit animations (e.g., a card expanding and its child elements appearing together)
- Drag-and-drop interactions (dragged item and its shadow or ghost image)
- Menu items that all animate in together as a group
- Dismissing a set of related notifications simultaneously
- Form fields that all shake simultaneously on submission error
- Dashboard widgets that all update simultaneously when a filter changes

---

## UI Implications

1. **Animate related elements together.** Items that belong to the same logical group should share the same entrance/exit timing and direction. This reinforces grouping visually and kinetically.
2. **Do not animate unrelated elements simultaneously.** Coincidental simultaneous animation implies a relationship that does not exist.
3. **Use staggered timing within groups, identical timing between groups.** Items in the same list can stagger slightly (20–40ms); distinct groups should have clearly different motion signatures.
4. **Drag targets and their feedback should move as one.** The dragged element and any drop-zone highlight should animate with the same timing to communicate their relationship.
5. **Filter changes that affect multiple sections should animate all affected sections simultaneously** — this communicates that they were all affected by the same action.

---

## Anti-Patterns

❌ Animating a navigation sidebar and an unrelated toast notification with identical timing — users may perceive them as related.

❌ Staggering list items with such large delays (200ms+) that the first and last items do not appear to be part of the same group animation.

❌ A deletion animation where only the item being deleted moves while a repositioning list stays still — the list should animate its reflow simultaneously.

---

## Exceptions and Limitations

- Common fate applies to perceived grouping in the moment of animation. It does not establish persistent grouping the way spatial proximity does.
- The effect is strongest when elements move in exactly the same direction and speed. Slight variations in speed create sub-groups within the animated set.
- Under `prefers-reduced-motion: reduce`, motion-based grouping cues disappear. Ensure static grouping (proximity, common region, similarity) is sufficient without motion.

---

## Accessibility Considerations

- Common fate animations must have a `prefers-reduced-motion` alternative. The grouping must be perceivable without motion via spatial layout. (WCAG 2.3.3)
- Simultaneous animations across large areas of the screen can be disorienting for users with vestibular disorders. Limit the number of simultaneously moving elements.
- Do not use simultaneous motion as the only group indicator — static visual grouping must also exist. (WCAG 1.3.1 Info and Relationships)

---

## Related Principles

- L01-P01 Proximity — Primary static grouping mechanism; common fate is the dynamic counterpart
- L01-P02 Similarity — Common fate extends similarity into the motion domain
- L08 Motion Taxonomy — Common fate is the mechanism behind navigation motion and spatial motion categories
- L08 Reduced Motion — All common fate animations need reduced-motion alternatives

---

## Sources

**Primary:**
- Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt, II. *Psychologische Forschung*, 4, 301–350.

**Secondary:**
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.

**Last verified:** 2024-01-01
