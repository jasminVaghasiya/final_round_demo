# Layer 07 — Accessibility

**Purpose:** Provide WCAG-grounded, evidence-based guidance for designing interfaces that are usable by people with a full range of abilities and disabilities.

---

## Scope

Accessibility is not a separate concern added at the end of design. It is integrated throughout every other layer of this repository. This layer provides:
- The WCAG framework (POUR: Perceivable, Operable, Understandable, Robust)
- Specific success criteria in actionable form
- Cognitive accessibility guidance
- Cross-references to where accessibility appears in other layers

**Source authority:** All requirements in this layer are grounded in:
- Web Content Accessibility Guidelines (WCAG) 2.1 (W3C Recommendation, 2018)
- Web Content Accessibility Guidelines (WCAG) 2.2 (W3C Recommendation, 2023)
- WAI-ARIA 1.2 (W3C Recommendation, 2023)
- Cognitive Accessibility Guidance (W3C COGA, 2021)

Do not invent accessibility requirements. Where a requirement is not in WCAG, identify it as a usability best practice rather than a standard.

---

## WCAG Structure: POUR

WCAG 2.x organizes accessibility into four principles:

| Principle | Question |
|---|---|
| **Perceivable** | Can users perceive all interface content and UI components? |
| **Operable** | Can users operate all functionality of the interface? |
| **Understandable** | Can users understand the information and UI operation? |
| **Robust** | Is content robust enough to be interpreted by assistive technologies? |

---

## Principle Index

| File | Coverage |
|---|---|
| `perceivable.md` | Text alternatives, captions, contrast, layout, sensory instructions |
| `operable.md` | Keyboard access, timing, seizures, navigation, input modalities |
| `understandable.md` | Language, predictability, input assistance, error handling |
| `robust.md` | Parsing, name/role/value, status messages |
| `cognitive-accessibility.md` | Extended guidance for cognitive, language, and learning disabilities |

---

## Conformance Levels

WCAG defines three conformance levels:
- **Level A** — Minimum; failing this excludes significant user groups
- **Level AA** — Standard target for most web content and legal compliance
- **Level AAA** — Enhanced; not required for all content but recommended where feasible

---

## Integration with Other Layers

Every layer in this repository cross-references accessibility. Accessibility is not a checklist applied at the end — it is a property of each design decision:

- **Layer 01 Perception** → Contrast (1.4.3, 1.4.11), non-color indicators (1.4.1)
- **Layer 02 Cognition** → Plain language (3.1), input assistance (3.3), cognitive accessibility
- **Layer 03 Decision** → Ethical use of defaults, framing, and persuasion patterns
- **Layer 04 Attention** → Status messages (4.1.3), focus management (2.4.3)
- **Layer 05 Interaction** → Keyboard access (2.1.1), focus visible (2.4.7/2.4.11), target size (2.5.8)
- **Layer 08 Motion** → Reduced motion (2.3.3), no seizure triggers (2.3.1)
