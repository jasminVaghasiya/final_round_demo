# L08 — Easing and Duration

**Layer:** 08-motion-animation

---

## Why Easing Matters

Linear motion — constant speed throughout — feels mechanical and unnatural. Human motion and physical objects decelerate as they reach a resting position and accelerate from rest. Easing curves simulate this natural behavior, making interface motion feel physical and intentional rather than robotic.

---

## Core Easing Types

### Ease-out (Decelerate)

```css
animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
/* or: ease-out */
```

**Use for:** Elements entering the screen.

Rationale: Objects entering from outside decelerate as they arrive. This mirrors physical objects landing in a position.

### Ease-in (Accelerate)

```css
animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
/* or: ease-in */
```

**Use for:** Elements exiting the screen.

Rationale: Objects leaving accelerate as they depart. This mirrors physical objects being thrown or released.

### Ease-in-out (Accelerate then decelerate)

```css
animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
/* or: ease-in-out */
```

**Use for:** Elements moving from one position to another within the screen (reordering, repositioning).

### Standard ease

```css
animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
```

**Use for:** Most state changes that occur entirely within the visible area (color change, size change, opacity change).

### Spring / bounce (use carefully)

Simulates spring physics. Appropriate for:
- Drag-and-drop settling
- Playful confirmation animations
- NOT appropriate for: error messages, destructive confirmations, business-critical workflows

---

## Duration Guidelines

Duration communicates importance and weight. Short = light, responsive. Long = considered, significant.

| Motion type | Recommended duration |
|---|---|
| Micro-interaction feedback (hover, press) | 80–150ms |
| State change (visible transition) | 150–250ms |
| Navigation (within-page) | 200–300ms |
| Navigation (between pages) | 250–350ms |
| Large modal / drawer appear | 250–400ms |
| Attention animation | 300–600ms |
| Loading animations | Continuous (not duration-bounded) |

**Rule:** Do not use durations over 500ms for any interactive response. Users begin to perceive delay above 300ms.

---

## Distance and Scale

- Elements traveling larger distances need longer durations (but not proportionally — the relationship is not linear).
- Small elements should use shorter durations than large elements (they feel faster visually at the same duration).
- Scale changes for micro-interactions should be subtle (96–98% compressed, 101–102% expanded). Large scale jumps feel jarring.

---

## Sequencing

- When multiple elements animate in sequence, use staggered delays of 20–50ms between items.
- Do not animate all elements simultaneously with the same timing — it creates a pulsing effect.
- Lead with the most important element; follow with supporting content.

---

## Sources

**Secondary:**
- Google Material Design 3 — Motion. https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- IBM Design Language — Motion. https://www.ibm.com/design/language/animation/overview/

**Last verified:** 2024-01-01
