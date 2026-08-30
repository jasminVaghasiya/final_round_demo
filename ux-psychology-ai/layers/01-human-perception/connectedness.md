# L01-P10 — Connectedness

**Layer:** 01-human-perception
**Evidence level:** B
**Type:** Perceptual principle
**Domain:** Visual perception, Gestalt psychology

---

## Definition

Elements that are physically connected by a line, border, or visible linking element are perceived as more strongly related than elements that are merely proximate or similar — even when they are spatially distant.

---

## Research Basis

Connectedness as a formal Gestalt principle was identified by Palmer and Rock (1994) as a particularly powerful grouping cue that can override other Gestalt principles including proximity and similarity. Their research demonstrated that connected elements were grouped together even when proximity and similarity predicted other groupings.

**Evidence level B:** Established by Palmer and Rock's experimental work; accepted in visual perception research as a robust grouping principle.

---

## Why It Matters

Visual connections — lines, borders, arrows, brackets, background bands — are among the strongest available grouping tools in interface design. They work even when spatial proximity is constrained. They can be used to connect elements across otherwise empty or crowded space. But they can also inadvertently create false relationships when used carelessly.

---

## When to Apply

- Connecting data points in charts and graphs (lines in line charts connect data that belongs to the same series)
- Breadcrumb navigation (connectors between levels)
- Step indicators / wizard progress (lines connecting steps)
- Form section connectors (vertical lines indicating sub-fields belong to one question)
- Tooltip/popover anchors (the caret connecting the popover to its trigger)
- Relationship diagrams, flowcharts, network graphs
- Timeline connectors

---

## UI Implications

1. **Use connecting lines in charts to signal that connected data points belong to a continuous series.** A bar chart does not connect bars; a line chart does — and users correctly perceive the line chart as representing continuous change over time.
2. **Connecting stepper/wizard steps with a line communicates sequence.** The line reinforces that each step leads to the next in a defined order.
3. **A popover/tooltip's caret must point to its trigger element.** The visual connection (caret) anchors the popover to its source, preventing figure–ground confusion about what the popover relates to.
4. **Relationship diagrams must use explicit lines to show relationships.** Proximity alone is insufficient when elements could be related to multiple neighbors.
5. **Remove visual connections that imply false relationships.** A decorative horizontal rule between two unrelated sections does not create a problematic connection, but a line with an arrowhead does.
6. **Background band / zebra striping in tables connects cells in the same row.** This is a functional application of connectedness for scannable rows.

---

## Anti-Patterns

❌ Connecting two unrelated UI sections with a decorative bracketing element — users will interpret the bracket as meaning the sections are related.

❌ A progress stepper with steps that are NOT connected by a line — users may not perceive the steps as sequential.

❌ A popover with no caret or visual anchor — users must infer what it relates to from context alone.

❌ Lines connecting data series in a bar chart — this is a line chart pattern applied incorrectly; it implies continuous change where only discrete measurements exist.

---

## Exceptions and Limitations

- Connectedness is a very strong grouping cue but can be overridden in cases of extreme spatial separation.
- Cultural reading direction affects how connecting lines are interpreted (left-to-right implies temporal order in LTR cultures).
- In data visualization, connecting lines carry specific semantic meaning (continuous vs. discrete data). Misapplying them is a data literacy issue, not just a visual design issue.

---

## Accessibility Considerations

- Visual connections (lines, borders) that convey relationships must have semantic equivalents for screen reader users. A step connector line does not convey the step sequence to a screen reader — an ordered list (`<ol>`) or `aria-current="step"` does. (WCAG 1.3.1)
- Color of connection lines must meet WCAG 1.4.11 Non-text Contrast (3:1 against adjacent colors) to be perceivable by users with low vision.
- Do not use connecting lines as the only means of indicating a relationship — provide text labels or semantic structure in addition.

---

## Related Principles

- L01-P01 Proximity — Connectedness is often stronger than proximity as a grouping cue
- L01-P03 Common Region — Both use explicit visual boundaries; common region encloses, connectedness links
- L01-P05 Continuity — Lines that connect elements also create perceptual continuity

---

## Sources

**Primary:**
- Palmer, S. E., & Rock, I. (1994). Rethinking perceptual organization: The role of uniform connectedness. *Psychonomic Bulletin & Review*, 1(1), 29–55.

**Secondary:**
- Ware, C. (2004). *Information Visualization: Perception for Design* (2nd ed.). Morgan Kaufmann.

**Last verified:** 2024-01-01
