# L02-P05 — Progressive Disclosure

**Layer:** 02-cognitive-psychology
**Evidence level:** C
**Type:** Design principle
**Domain:** Information architecture, cognitive load management

---

## Definition

Progressive disclosure is the design strategy of presenting only the information and controls necessary for the user's current task at the current moment, revealing additional complexity only when needed.

---

## Research Basis

Progressive disclosure is a design principle attributed to information architecture research, particularly associated with the work of Nielsen (1994) and earlier information design traditions. It is not derived from a single experiment but from accumulated design practice and usability research.

**Evidence level C:** Well-established design principle with strong practitioner support and usability research backing, though not derived from a single experimental source.

---

## Why It Matters

Showing all options and information simultaneously maximizes extraneous cognitive load and often overwhelms users with irrelevant choices. Progressive disclosure matches interface complexity to user need at each step.

---

## When to Apply

- Complex multi-field forms with conditional sections
- Settings screens with basic and advanced options
- Data-rich dashboards where some data is rarely needed
- Onboarding flows introducing a complex product
- Feature discovery in mature products
- Mobile interfaces with limited screen space

---

## UI Implications

1. **Determine the minimum information needed for the most common task.** Start from that minimum, not from a complete feature inventory.
2. **Progressively reveal detail on demand** — "show more", expandable sections, secondary tabs, inline expansion.
3. **Design clear paths to more detail.** Users should know that more exists. Information scent must be maintained.
4. **Do not progressively disclose required information.** If a user must see it to complete a task, it must be visible.
5. **Separate basic and advanced options explicitly.** "Advanced settings", "More options", and expandable sections create a consistent disclosure pattern.
6. **Match disclosure depth to the frequency of use.** The most frequently used options should be immediately visible; rare options can be progressively disclosed.

---

## Anti-Patterns

❌ Hiding required fields or critical error information behind "show more" — this forces users to hunt for information they must have.

❌ Using progressive disclosure to hide complex interaction without simplifying the underlying system — users still encounter the complexity later with less context.

❌ Inconsistent disclosure — some sections expand inline, others navigate away, others open a modal — users cannot predict behavior.

---

## Exceptions and Limitations

- Progressive disclosure adds navigation steps. When tasks are frequent, the extra click/tap cost may outweigh the cognitive benefit of reducing displayed complexity.
- Expert users often prefer seeing all options at once to enable faster access. Consider user segmentation.
- Do not confuse progressive disclosure with hiding important information.

---

## Accessibility Considerations

- Expandable/collapsible sections must use appropriate ARIA (`aria-expanded`, `aria-controls`). (WCAG 4.1.2)
- Users must be able to access all disclosed content by keyboard. (WCAG 2.1.1)
- Disclosure controls must have descriptive labels — "Show more" is less helpful than "Show billing details". (WCAG 2.4.6 Headings and Labels)

---

## Related Principles

- L02-P01 Cognitive Load — Progressive disclosure reduces extraneous load
- L04-P04 Information Scent — Users need cues that more information exists
- L03-P02 Choice Overload — Reducing visible choices reduces decision load
- L06-P08 Minimalist Design — Heuristic 8 supports showing only what is needed

---

## Sources

**Secondary:**
- Nielsen, J. (1994). *Usability Engineering*. Morgan Kaufmann.
- Cooper, A., Reimann, R., & Cronin, D. (2007). *About Face 3: The Essentials of Interaction Design*. Wiley.

**Last verified:** 2024-01-01
