# L08 — Motion Taxonomy and Guidelines

**Layer:** 08-motion-animation
**Evidence level:** C (Motion as communication is established UX practice; specific timing recommendations derive from perceptual research with moderate evidence)
**Type:** Design principle system

---

## Motion Categories

### 1. Feedback Motion

**Purpose:** Confirm the system received user input.

**When to use:** On every user-initiated action that has a perceivable outcome.

| Trigger | Motion |
|---|---|
| Button press | Scale down 2–4% on press, release on lift |
| Toggle switch | Thumb slides to new position with easing |
| Checkbox | Fill or mark appears with brief duration |
| Drag initiation | Element lifts (shadow increase, slight scale) |

**Duration:** 80–150ms. Fast enough to feel immediate; slow enough to be perceivable.

**Key rule:** Feedback motion communicates "I received your input." It is not optional for touch interfaces.

---

### 2. State-Change Motion

**Purpose:** Communicate that an element has transitioned between states.

| Transition | Motion |
|---|---|
| Button loading | Content fades, spinner appears |
| Success | Scale bounce + color transition |
| Error | Horizontal shake (localized to element) |
| Element disabled | Opacity/contrast reduction |
| Dropdown open | Height/opacity expand from anchor point |

**Duration:** 150–250ms for most state changes.

**Key rule:** State changes without motion are vulnerable to change blindness (Layer 04-P03). Motion is the mechanism that makes state transitions noticeable.

---

### 3. Navigation Motion

**Purpose:** Communicate spatial relationship and preserve mental model during navigation.

| Transition | Motion |
|---|---|
| Page forward | Slide in from right |
| Page back | Slide in from left |
| Drill-down | Slide in from right, push previous left |
| Modal open | Fade + scale up from center or trigger |
| Modal close | Fade + scale down |
| Drawer open | Slide in from edge |
| Tab switch | Content cross-fades or slides to tab direction |

**Duration:** 200–350ms for navigation transitions.

**Key rule:** Navigation motion must communicate direction and hierarchy. Slides should be directionally consistent with the navigation direction. Arbitrary transitions (random direction, random type) break spatial mental model.

---

### 4. Attention Motion

**Purpose:** Direct attention to a change that has occurred in a location the user is not currently attending.

| Trigger | Motion |
|---|---|
| New notification | Badge pulse/scale |
| Status update | Element highlight fade-in |
| Live data update | Row or value flash |

**Duration:** 300–600ms for attention-capture motion (longer to be perceivable in peripheral vision).

**Key rule:** Use attention motion sparingly. Excessive attention-directing motion desensitizes users and is highly disruptive for users with attention disorders. Only use for information that requires immediate attention.

---

### 5. Spatial Motion

**Purpose:** Establish where objects come from and where they go, maintaining the user's spatial model.

| Pattern | Motion |
|---|---|
| Element enters from trigger | Scales/fades in from the element that created it |
| Element exits to destination | Scales/fades in the direction of its destination |
| Items reorder | Animate position change, not jump |
| Shared element transitions | Object travels between its state in source and destination |

**Key rule:** Spatial motion should feel physically plausible. Objects should not teleport. Movement should respect directionality.

---

### 6. Decorative Motion

**Purpose:** None functional.

**When to use:** Almost never in software interfaces. Background animations, ambient effects, and animated illustrations fall into this category.

**Rule:** If decorative motion is used, it must:
- Be very subtle (slow, low-amplitude)
- Pause or stop when the user is not interacting
- Be disabled for users with `prefers-reduced-motion`
- Not be in areas where it competes with interactive content

---

## Motion System Rules

1. **Motion has a vocabulary.** Define it and use it consistently. A "slide right" should always mean "going deeper"; a "slide left" should always mean "going back."
2. **Motion should never increase task completion time.** If a transition makes the interface feel slower, it is harming usability.
3. **Motion must be interruptible.** If a user interacts during a transition, the interface must respond, not wait for animation to complete.
4. **Reduce motion for users who need it.** All motion must degrade gracefully under `prefers-reduced-motion: reduce`.

---

## Sources

**Secondary:**
- Issara, R. (Ed.). (2017). Material Design Motion Guidelines. Google. https://m3.material.io/styles/motion/overview
- Apple Inc. Human Interface Guidelines — Animation. https://developer.apple.com/design/human-interface-guidelines/motion

**Last verified:** 2024-01-01
