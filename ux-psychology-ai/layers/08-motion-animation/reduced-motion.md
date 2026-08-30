# L08 — Reduced Motion

**Layer:** 08-motion-animation
**Evidence level:** C (WCAG requirement; accessibility best practice)

---

## Why Reduced Motion Is Required

Motion in interfaces can cause serious problems for users with:
- **Vestibular disorders** — motion triggers dizziness, nausea, and disorientation
- **Photosensitive conditions** — fast motion can trigger seizures (migraines, epilepsy)
- **Cognitive and attention conditions** — persistent or excessive motion disrupts focus
- **Motion sensitivity** — increased in older adults and others

The `prefers-reduced-motion` CSS media query detects when a user has requested reduced motion in their operating system settings.

---

## WCAG Requirements

### 2.3.1 Three Flashes or Below Threshold (Level A)
Content does not contain anything that flashes more than three times in any one-second period, or the flash is below the general flash and red flash thresholds.

**Rule:** Never create rapidly flashing animations. Auto-playing content should not flash rapidly.

### 2.3.3 Animation from Interactions (Level AAA, WCAG 2.1)
Motion animation triggered by interaction can be disabled by the user, unless the animation is essential to the functionality or the information.

**Rule:** Even at AAA level, this is best practice for all interfaces. Do not require users to file a settings change to stop motion — respond to the OS preference automatically.

---

## Implementation

### CSS media query

```css
/* Default: full motion */
.element {
  transition: transform 300ms ease-out, opacity 200ms ease-out;
}

/* Reduced motion: remove or simplify transitions */
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: opacity 200ms ease-out;
    /* Or: transition: none; */
  }
}
```

### Strategy: Replace, not remove

For reduced motion users, replace motion-based communication with non-motion alternatives:

| Motion effect | Reduced motion alternative |
|---|---|
| Slide in from right | Fade in (opacity) |
| Scale bounce | Instant state change |
| Shake error | Color + border change + text |
| Position transition | Instant reposition |
| Scroll parallax | Static background |

Do not simply `transition: none` everything — state changes still need to be perceivable. Use opacity transitions as a safe, non-vestibular alternative.

### JavaScript detection

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Use simplified animation variants
}
```

---

## Designing for Reduced Motion from the Start

Do not treat reduced motion as a fallback. Design both versions:

1. **Full motion version** — for users without motion sensitivity
2. **Reduced motion version** — for users who have requested it

Both versions must communicate the same information. Motion is a means of communication — when you remove it, ensure the information it was conveying is still present in another form.

---

## What "Essential Motion" Means

WCAG 2.3.3 excepts "essential" motion. Essential motion examples:
- A progress bar showing actual progress (motion is the information)
- A video being played (the content is motion)
- A spinning indicator showing system activity

Not essential:
- Page transition slides
- Micro-interaction scale effects
- Navigation animations

---

## Sources

**Standards:**
- W3C. (2018). WCAG 2.1. SC 2.3.1, 2.3.3. https://www.w3.org/TR/WCAG21/

**Secondary:**
- A11y Project. Reduced Motion. https://www.a11yproject.com/posts/understanding-the-reduce-motion-prefers-user-settings/

**Last verified:** 2024-01-01
