# L08 — Micro-Interactions

**Layer:** 08-motion-animation

---

## Definition

Micro-interactions are small, single-purpose animations that communicate the outcome of a single user action or system event. They are the primary mechanism through which an interface feels responsive and alive.

---

## Why Micro-Interactions Matter

An interface without micro-interactions feels static and inert. Each micro-interaction is a moment of communication between the system and the user: "I noticed what you did; here is what happened."

Micro-interactions at the correct scale and duration are invisible to conscious attention — they are felt as responsiveness rather than seen as animation.

---

## Core Micro-Interaction Patterns

### Button press feedback
- On pointer down: scale to 97–98%, subtle shadow reduction
- On pointer up: scale returns to 100%, shadow returns
- Duration: 80–100ms press, 100–150ms release

### Hover state transition
- Opacity or color shift, or subtle elevation increase
- Duration: 150ms
- Easing: ease-out
- Rule: Hover transitions must be fast enough not to feel sluggish during normal cursor movement

### Toggle switch
- Thumb translates from off to on position
- Background color transitions simultaneously
- Duration: 150–200ms
- Easing: ease-in-out

### Checkbox
- Fill or checkmark appears on check
- Disappears on uncheck
- Duration: 100–150ms

### Form field focus
- Border color or underline transitions to active state
- Duration: 150ms
- Rule: Label float (if using floating label pattern) should use ease-out, 150–200ms

### Success confirmation
- Element briefly scales up 4–6% then returns
- Color transitions to success state
- Optional: checkmark draws in
- Duration: 200–300ms total
- Rule: Keep subtle. A large success animation is appropriate only for significant accomplishments (completing an onboarding, making a first purchase).

### Error shake
- Horizontal oscillation (shake left-right)
- 3 oscillations, total duration 300–400ms
- Amplitude: 4–8px
- Rule: The shake is localized to the field with the error, not the whole page

### Loading spinner
- Continuous, smooth rotation
- Not duration-bounded
- Rule: Appears within 300ms of a triggered operation; replaced by result state when complete

---

## What Micro-Interactions Are Not

❌ Page transitions — those are navigation motion
❌ Onboarding animations — those are instructional/introduction motion
❌ Background animations — those are decorative and should be avoided or minimal

---

## Accessibility

- All micro-interactions must have no motion equivalent under `prefers-reduced-motion: reduce` — typically a simple opacity or color change without movement.
- Do not use the error shake as the only error indicator — the field still needs a text error message and color change. (WCAG 1.4.1, 3.3.1)

---

## Sources

**Secondary:**
- Saffer, D. (2013). *Microinteractions: Designing with Details*. O'Reilly Media.
- Apple Human Interface Guidelines — Animation. https://developer.apple.com/design/human-interface-guidelines/motion

**Last verified:** 2024-01-01
