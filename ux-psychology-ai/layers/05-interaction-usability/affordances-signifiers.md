# L05-P02 — Affordances and Signifiers

**Layer:** 05-interaction-usability
**Evidence level:** B
**Type:** Design theory
**Domain:** Interaction design, human-computer interaction

---

## Affordances

### Definition
An affordance is a relationship between a physical or digital object and an agent that specifies how that object can be used. The button affords pressing; the slider affords dragging; the text field affords text entry.

### Original Concept
Gibson (1979) introduced affordances in ecological psychology. Norman (1988) applied the concept to design. Norman (2013) later clarified the distinction between actual affordances and *perceived* affordances — what matters for design is whether the affordance is *perceivable*.

---

## Signifiers

### Definition
A signifier is a perceptible signal that communicates what action is possible and how to perform it. Signifiers make affordances apparent.

### Why Signifiers Matter
An affordance without a signifier is invisible. A button that looks like flat text affords clicking but does not signal it. A text field without a border or placeholder affords text entry but does not communicate that it is editable.

Signifiers are the design tools that make affordances functional.

---

## UI Implications

1. **Every interactive element must have a clear signifier of its interactivity.** Buttons: raised, colored, or bordered. Links: colored and underlined. Text fields: bordered or underlined with cursor response. Sliders: visible thumb and track.
2. **Non-interactive elements must not have interactive signifiers.** A non-clickable card with a hover shadow confuses users who then try to click it.
3. **Platform conventions are the primary source of affordance signifiers.** Users have learned what buttons, links, inputs, and dropdowns look like on their platform. Deviate from these conventions only with strong justification.
4. **State changes must update signifiers.** A disabled button should lose its interactive signifier (reduced contrast, no hover effect). A loading state should replace the interactive signifier with a loading indicator.
5. **Touch interfaces require explicit signifiers.** Physical objects have tactile affordance cues that screens do not. Every touchable element needs visible signifiers.

---

## Anti-Patterns

❌ "Ghost button" (text only, no border, no background) that has insufficient visual distinction from non-interactive text.

❌ Image grid where every image is potentially clickable but only some are — inconsistent affordance signaling.

❌ Flat design that removes all signifiers from interactive elements in the name of aesthetics.

---

## Accessibility Considerations

- Interactive elements must be identifiable without relying on color alone. (WCAG 1.4.1)
- All interactive elements must have an accessible name that screen readers can announce. (WCAG 4.1.2 Name, Role, Value)
- Signifiers for interactive elements must meet contrast requirements. (WCAG 1.4.11 Non-text Contrast)

---

## Sources

**Primary:**
- Gibson, J. J. (1979). *The Ecological Approach to Visual Perception*. Houghton Mifflin.
- Norman, D. A. (1988). *The Design of Everyday Things*. Basic Books.
- Norman, D. A. (2013). *The Design of Everyday Things* (Revised ed.). Basic Books.

**Last verified:** 2024-01-01
