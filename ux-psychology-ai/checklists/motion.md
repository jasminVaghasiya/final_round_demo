# Motion Pre-Release Checklist

---

## Purpose

- [ ] Every animation answers at least one motion taxonomy question (what happened, where did it come from, is the system working, etc.)
- [ ] No decorative motion in primary interaction areas
- [ ] Attention motion used sparingly — only for genuinely urgent updates

## Timing

- [ ] Micro-interaction feedback: ≤ 150ms
- [ ] State change transitions: ≤ 300ms
- [ ] Navigation transitions: ≤ 350ms
- [ ] No animation causes perceivable delay in task completion
- [ ] Loading animations appear within 300ms of trigger

## Easing

- [ ] Elements entering screen: ease-out (decelerate to rest)
- [ ] Elements exiting screen: ease-in (accelerate to departure)
- [ ] Elements moving within screen: ease-in-out
- [ ] No linear motion for elements that simulate physical movement

## Spatial Consistency

- [ ] Navigation motion is directionally consistent (forward = right, back = left, or consistent alternative)
- [ ] Elements enter from the direction that makes spatial sense
- [ ] Elements exit toward their spatial destination
- [ ] Shared element transitions maintain object identity

## Reduced Motion

- [ ] `prefers-reduced-motion: reduce` is implemented for ALL animations
- [ ] Reduced motion alternatives still communicate the state change (typically via opacity)
- [ ] No content flashes more than 3 times per second — WCAG 2.3.1 (A)
- [ ] Motion from interactions can be disabled — WCAG 2.3.3 (AAA, best practice)

## Interruptibility

- [ ] All animations can be interrupted by user input
- [ ] Interface remains responsive during transition animations
- [ ] No animation blocks interaction or input

## Screen Reader Compatibility

- [ ] Animations do not interfere with screen reader announcements
- [ ] Decorative animations are hidden from accessibility tree where appropriate
