# Layer 08 — Motion and Animation

**Purpose:** Define a motion system focused on communicating interface state and spatial relationships — not on decoration.

---

## Core Principle

> **Motion must explain change, not decorate it.**

Every animation in an interface should answer at least one of these questions:
1. What just happened?
2. What is changing?
3. Where did this object come from?
4. Where did it go?
5. Is the system processing my input?
6. Did my action succeed or fail?
7. What should I pay attention to?
8. Can I interrupt or reverse this?

If motion cannot answer any of these questions in a specific context, it should generally be removed.

---

## Motion Taxonomy

| Category | Purpose | Examples |
|---|---|---|
| **Feedback motion** | Confirm input received | Button press, toggle, checkbox |
| **State-change motion** | Communicate state transition | Loading → loaded, error appear, success |
| **Navigation motion** | Communicate spatial relationship | Page slide, panel open/close, tab switch |
| **Attention motion** | Direct attention to change | Notification badge pulse, alert flash |
| **Spatial motion** | Establish object origin/destination | Modal appear from trigger, element fly-in |
| **Decorative motion** | No functional purpose | Avoid in most contexts |

---

## Principle Index

| File | Coverage |
|---|---|
| `motion-taxonomy.md` | Full classification with guidelines |
| `easing-duration.md` | Timing, easing curves, distance principles |
| `micro-interactions.md` | Feedback, hover, focus, toggle animations |
| `reduced-motion.md` | `prefers-reduced-motion` implementation |

---

## What This Layer Does Not Contain

- Visual styling of animations (colors, shadows) → Layer 01, ui/
- Accessibility foundations for reduced motion → Layer 07 (cross-referenced here)
- State definitions that animations communicate → Layer 05

---

## Cross-References

- **Layer 04-P03** Change Blindness — Motion is a primary tool for overcoming change blindness
- **Layer 07** — Reduced motion requirements (WCAG 2.3.3)
- **Layer 05-P07** — Interaction states that require motion treatment
