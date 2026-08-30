# L05-P01 — Fitts's Law

**Layer:** 05-interaction-usability
**Evidence level:** A
**Type:** Empirical law
**Domain:** Human motor behavior, pointing, target acquisition

---

## Definition

The time to acquire a pointing target is a logarithmic function of the ratio of the distance to the target divided by the width of the target.

---

## Mathematical Model

A common formulation (Shannon formulation):

```
MT = a + b × log₂(1 + D/W)
```

Where:
- MT = movement time
- D = distance from starting point to target center
- W = effective width of the target (in the direction of movement)
- a = y-intercept (empirical constant)
- b = slope (empirical constant)

The index of difficulty: `ID = log₂(1 + D/W)` (in bits)

---

## Research Basis

Fitts (1954) derived this model from information theory and validated it experimentally using a reciprocal tapping paradigm. The model has been extensively replicated and extended to mouse pointing (MacKenzie, 1992), touchscreens, and other input modalities.

**Evidence level A:** One of the most robustly validated quantitative models in HCI. The logarithmic distance-width relationship is directly traceable to Fitts's original 1954 experiments and subsequent replications.

---

## Why It Matters

Fitts's Law predicts that:
- Targets that are small OR far away require more time to acquire and have higher error rates
- Targets that are large AND nearby are the fastest and most reliable to acquire

This has direct implications for button sizing, touch target sizing, and control placement.

---

## UI Implications

1. **Increase the size of high-frequency, high-consequence targets.** Primary action buttons, form submit buttons, and navigation items should be large enough to be acquired reliably.
2. **Reduce distance to frequently used controls.** Place common actions near the content they act on, not in a remote toolbar.
3. **Touch targets should have adequate size for the input modality.** Pointer-based (mouse) targets can be smaller than touch targets because touch has higher spatial variability.
4. **Screen edges and corners are effectively infinite-width targets** on pointer-based interfaces — the cursor cannot overshoot them. This makes edge/corner placement effective for frequently used actions on desktop.
5. **Avoid placing multiple small targets close together.** Fitts's Law applies to the intended target, but closely packed small targets increase accidental selection of adjacent targets.

---

## Platform Touch Target Guidance

These are widely-used design system recommendations, not directly stated in Fitts's original law:

| Platform | Recommended minimum touch target |
|---|---|
| Apple Human Interface Guidelines | 44×44 pt (not px) |
| Material Design | 48×48 dp |
| WCAG 2.5.5 (AAA) | 44×44 CSS px |
| WCAG 2.5.8 (AA, WCAG 2.2) | 24×24 CSS px minimum |

Note: These sizes are design recommendations derived from motor accuracy research, not directly from Fitts's 1954 experiment.

---

## Anti-Patterns

❌ Icon-only toolbar buttons at 16×16px — far below reliable motor acquisition for mouse and touch.

❌ Placing "Delete" and "Confirm" buttons adjacent with no spacing — accidental selection risk is high.

❌ Placing primary actions in the far corner of a large screen — maximum distance penalty.

---

## Exceptions and Limitations

- Fitts's Law models aimed pointing in a single direction. Two-dimensional target acquisition (Accot & Zhai, 1997) follows different dynamics.
- The model does not account for visual identification time, target ambiguity, or cognitive load — only motor movement time.
- Touchscreen Fitts models differ from mouse models in constants and in how effective width is measured.

---

## Accessibility Considerations

- WCAG 2.5.8 (Target Size — Minimum, WCAG 2.2 Level AA) requires 24×24 CSS px for pointer targets, with exceptions.
- WCAG 2.5.5 (Target Size — Enhanced, AAA) requires 44×44 CSS px.
- Users with motor impairments have higher motor variability, requiring larger effective targets. Fitts's Law effect is stronger for this population.

---

## Sources

**Primary:**
- Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6), 381–391. DOI: 10.1037/h0055392
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. *Human-Computer Interaction*, 7(1), 91–139.

**Standards:**
- W3C. (2023). WCAG 2.2 SC 2.5.8 Target Size (Minimum). https://www.w3.org/TR/WCAG22/

**Last verified:** 2024-01-01
