# L01-P07 — Contrast and Salience

**Layer:** 01-human-perception
**Evidence level:** B
**Type:** Design principle
**Domain:** Visual perception, attention

---

## Definition

Contrast is the perceptible difference between an element and its surrounding context. Salience is the degree to which an element stands out from its environment and attracts attention pre-attentively.

---

## Research Basis

Contrast sensitivity research has extensive experimental support in visual psychophysics. Salience as a pre-attentive feature is supported by feature integration theory (Treisman & Gelade, 1980) and subsequent pop-out effect research. WCAG contrast requirements derive from empirical research on contrast sensitivity in aging and low-vision populations.

**Evidence level B:** Multiple research traditions support contrast and salience as fundamental perceptual mechanisms.

---

## Why It Matters

Contrast is the primary mechanism for making things visible. Salience determines which elements are noticed first and without effort. An interface that does not deliberately manage contrast and salience will fail to communicate hierarchy, status, and interactivity.

---

## When to Apply

- Defining foreground–background text contrast
- Designing interactive vs. non-interactive element distinctions
- Error state and warning indicators
- Call-to-action buttons
- Focus indicators
- Status indicators
- Notification badges

---

## UI Implications

1. **Text must have sufficient contrast against its background.** Use WCAG thresholds as minimum requirements, not design constraints to minimize.
2. **The primary action on a screen should have the highest color/contrast salience.** Other actions should have lower contrast to reduce competition.
3. **Status indicators (error, warning, success) rely on salience for urgency.** Error states must stand out immediately, not require scanning.
4. **Reduce salience for disabled, placeholder, and supporting text.** These elements should not compete with actionable content.
5. **Focus indicators must be salient against their surrounding context.** A focus ring that matches the surrounding color disappears.
6. **Do not create salience through color alone.** Size, shape, position, and weight must reinforce the contrast cue for color-blind users.

---

## Anti-Patterns

❌ Light gray text on white background for body content — the contrast ratio fails WCAG 1.4.3.

❌ Equally high-contrast primary and secondary buttons — both demand attention; neither establishes priority.

❌ Red error text with no icon or shape reinforcement — red is invisible to red-green color blind users.

❌ Blue hyperlinks in a blue-themed interface — links lose salience when they share the interface's primary color.

---

## Accessibility Thresholds (WCAG 2.1 / 2.2)

| Context | Minimum contrast ratio | WCAG Criterion |
|---|---|---|
| Normal text (< 18pt / < 14pt bold) | 4.5:1 | 1.4.3 (AA) |
| Large text (≥ 18pt / ≥ 14pt bold) | 3:1 | 1.4.3 (AA) |
| UI components and graphical objects | 3:1 | 1.4.11 (AA) |
| Enhanced text contrast | 7:1 | 1.4.6 (AAA) |

---

## Exceptions and Limitations

- Decorative elements, logos, and inactive UI components have no WCAG contrast requirement — but they should still be distinguishable for usability.
- Contrast ratios are calculated in the standard color space. Gradient backgrounds require checking contrast at the worst point.

---

## Related Principles

- L01-P04 Figure–Ground — Contrast creates figure–ground separation
- L01-P06 Visual Hierarchy — Contrast difference establishes hierarchy levels
- L04-P02 Visual Salience — Extends contrast into the attention domain
- L07 Perceivable — WCAG contrast requirements enforce minimum salience for accessibility

---

## Sources

**Primary:**
- Treisman, A. M., & Gelade, G. (1980). A feature-integration theory of attention. *Cognitive Psychology*, 12(1), 97–136. DOI: 10.1016/0010-0285(80)90005-5

**Standards:**
- W3C. (2018). Web Content Accessibility Guidelines (WCAG) 2.1. SC 1.4.3, 1.4.11. https://www.w3.org/TR/WCAG21/
- W3C. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/

**Last verified:** 2024-01-01
