# AI GENERATION — Prompt Templates
# Task-specific prompts for common requests.
# Each template triggers the correct domain loading from the decision engine.

---

## Template: Component

```
TASK: Design [component name] component.
CONTEXT:
  product: [type]
  device:  [touch_mobile / pointer_desktop / both]
  users:   [novice / mixed / expert]

Load: knowledge/interaction.yaml, knowledge/ui.yaml, knowledge/motion.yaml, knowledge/accessibility.yaml

Required output:
1. Anatomy (all parts labeled)
2. All states: default, hover, focus, active, disabled, loading (if applicable), success (if applicable), error (if applicable), empty (if applicable)
3. Semantic HTML
4. CSS: variables → states → transitions → reduced-motion
5. ARIA: role, name, states
6. Motion spec with taxonomy answer for each animation
7. Audit result
```

---

## Template: Form

```
TASK: Design [form name] form.
FIELDS: [list]
CONTEXT: [high_stakes/low_stakes, device, user_expertise]

Load: knowledge/interaction.yaml, knowledge/accessibility.yaml, patterns-yaml/components.yaml

Required output:
1. Field grouping (fieldsets and sections)
2. Label and help text pattern for each field
3. Validation timing and error format
4. All input states
5. Submission flow (loading → success | error)
6. Full HTML + ARIA implementation
7. WCAG 3.3 audit
```

---

## Template: Page Design

```
TASK: Design [page type] page.
GOAL: [user's primary goal]
USER: [profile]
DEVICE: [device]

Load: knowledge/psychology.yaml, knowledge/ui.yaml, patterns-yaml/websites.yaml

Required output:
1. UX reasoning (which principles apply + why)
2. Information hierarchy (L1–L4 assignments)
3. Page structure with sections named
4. Visual hierarchy spec (size, weight, color per level)
5. Navigation and CTA placement rationale
6. Motion: scroll effects + interactions
7. Accessibility: WCAG criteria applied
8. Semantic HTML structure
```

---

## Template: Motion Design

```
TASK: Design motion system for [product type].
ELEMENTS: [list animated elements]
PRODUCT_STYLE: [luxury / utility / consumer / gaming / financial]
DEVICE: [device]

Load: knowledge/motion.yaml, patterns-yaml/animations.yaml, knowledge/accessibility.yaml

Required output:
1. Motion taxonomy: which question each animation answers
2. Duration spec per animation type
3. Easing per direction
4. Stagger spec for lists
5. State transition animations with CSS
6. prefers-reduced-motion implementation
7. WCAG 2.3.1 and 2.3.3 verification
```

---

## Template: Audit Existing Interface

```
TASK: Audit [interface description or code].
SCOPE: [full_audit / ux_only / accessibility_only / motion_only]

Load: all knowledge files, ai/audit.md

Required output:
1. Critical violations with specific fixes
2. Major violations with specific fixes
3. Minor violations noted
4. Revised implementation with violations fixed
```
