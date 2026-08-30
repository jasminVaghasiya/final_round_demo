# L01-P05 — Closure and Continuity

**Layer:** 01-human-perception
**Evidence level:** B
**Type:** Perceptual principle
**Domain:** Visual perception, Gestalt psychology

---

## Closure

### Definition
The visual system tends to perceive incomplete shapes as complete, filling in missing information to form a coherent whole.

### UI Implications
1. Partially visible elements (e.g., a card whose edge is cut off by the screen) communicate that more content exists — an affordance for scrolling.
2. Icon design can use negative space to imply enclosed shapes without drawing complete outlines.
3. Deliberate incompleteness in carousels, horizontal scroll areas, and content lists signals continuation.
4. Do not rely on closure for essential information — if the content must be read, it must be fully visible.

### Anti-Patterns
❌ Cropping informational text to imply more content exists — users may miss critical information if they do not scroll.
❌ Using closure-based icons in contexts where users are unfamiliar with the convention — the gap between designed intention and perception widens.

---

## Continuity

### Definition
Elements arranged along a smooth line or curve are perceived as a connected sequence, even when interrupted by other elements.

### UI Implications
1. Horizontal and vertical alignment of elements creates implicit lines that guide the eye and communicate sequence.
2. Progress indicators (steppers, progress bars) depend on continuity to communicate sequential flow.
3. Breadcrumb navigation uses a continuous line to communicate hierarchical path.
4. Lists, timelines, and feeds use continuity to communicate ordered sequence.
5. Misaligned elements break the perceived continuation and interrupt scanning.

### Anti-Patterns
❌ Breaking a navigation breadcrumb's visual line with inconsistent spacing — the sequence is disrupted.
❌ Using a zigzag layout for a step-by-step process — continuity suggests linear sequence; zigzag implies alternating relationship.

---

## Evidence Level

**B:** Both closure and continuity are classical Gestalt principles with original research basis (Wertheimer, 1923). Substantial perceptual research supports their existence. HCI-specific experimental validation is less extensive.

---

## Accessibility Considerations

- Do not rely on closure or continuity to communicate essential content relationships — these are visual perceptual effects and are not conveyed to screen reader users.
- Progress and sequence must be communicated via semantic markup (ordered lists, ARIA progressbar, step indicators with `aria-current`). (WCAG 1.3.1)

---

## Related Principles

- L01-P01 Proximity — Continuity extends proximity into directional sequence
- L04-P05 Visual Scanning — Continuity aligns with F-pattern and Z-pattern scanning along lines
- L05-P08 Interaction States — Progress states depend on continuity to communicate sequential flow

---

## Sources

**Primary:**
- Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt, II. *Psychologische Forschung*, 4, 301–350.

**Secondary:**
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.
