# UI Generation Prompt Templates

Reusable prompt templates for common UI generation tasks. Each template integrates the system prompt reasoning workflow.

---

## Template 1: Form Design

```
TASK: Design a [FORM TYPE] form.

USER: [describe the user]
CONTEXT: [describe where and how this form is used]
FIELDS REQUIRED: [list the required fields]
CONSTRAINTS: [any constraints: mobile-only, limited time, high stakes, etc.]

Using the ux-psychology-ai generation framework:

1. Identify cognitive load risks in this form
2. Group fields semantically
3. Select relevant error prevention principles
4. Define all interaction states for each input
5. Apply WCAG 3.3 (Input Assistance) requirements
6. Define motion for validation feedback
7. Produce semantic HTML with ARIA implementation
8. Audit against the accessibility checklist
```

---

## Template 2: Navigation Design

```
TASK: Design the navigation system for [PRODUCT TYPE].

DESTINATIONS: [list the primary destinations]
USER TYPE: [novice / expert / mixed]
DEVICE: [desktop / mobile / both]
CURRENT PAIN POINTS: [if known]

Using the ux-psychology-ai generation framework:

1. Evaluate information scent for each destination label
2. Apply serial position effect for destination ordering
3. Define all interaction states (default, hover, focus, active/current, disabled)
4. Apply Fitts's Law for target sizing
5. Define keyboard navigation pattern (Tab / Arrow key behavior)
6. Apply WCAG 2.4.1 (Bypass Blocks) — skip navigation link
7. Apply WCAG 2.4.3 (Focus Order)
8. Define mobile navigation pattern with accessible implementation
9. Audit against heuristics 1 (status), 4 (consistency), 6 (recognition)
```

---

## Template 3: Dashboard Design

```
TASK: Design a dashboard for [PRODUCT/DOMAIN].

PRIMARY USER TASK: [what does the user need to do most often?]
DATA DISPLAYED: [list key metrics and information types]
UPDATE FREQUENCY: [real-time / periodic / manual refresh]
USER EXPERTISE: [novice / expert / mixed]
DEVICE: [desktop / tablet / mobile]

Using the ux-psychology-ai generation framework:

1. Identify the primary metric / most important information
2. Apply visual hierarchy to metric priority
3. Address change blindness for live data updates
4. Apply chunking to organize information sections
5. Define attention motion for critical status changes
6. Apply WCAG 4.1.3 (Status Messages) for live data
7. Define reduced motion alternatives
8. Audit information density against cognitive load principles
```

---

## Template 4: Onboarding Flow

```
TASK: Design an onboarding flow for [PRODUCT].

USER PROFILE: [new user characteristics]
CORE VALUE TO DEMONSTRATE: [what must the user experience in onboarding?]
STEPS REQUIRED: [list mandatory steps]
DROP-OFF RISK: [where do users typically abandon?]

Using the ux-psychology-ai generation framework:

1. Apply goal-gradient effect: show clear progress toward completion
2. Apply endowed progress: credit any completed steps immediately
3. Apply peak-end rule: design for a positive peak moment and positive end
4. Apply progressive disclosure: reveal complexity in order of necessity
5. Apply serial position effect: strongest value proposition in steps 1 and last
6. Define all interaction states including loading states for async operations
7. Apply WCAG 3.3.7 (Redundant Entry): do not re-ask for known information
8. Define reduced motion for celebration animations
9. Audit for cognitive load at each step
```

---

## Template 5: Error State Design

```
TASK: Design the error states for [COMPONENT/FLOW].

ERROR TYPES: [list the error conditions]
USER CONTEXT: [what task was the user trying to complete?]
RECOVERY PATH: [what must the user do to recover?]

Using the ux-psychology-ai generation framework:

1. Apply Nielsen Heuristic 9: error messages in plain language with specific problem and solution
2. Apply error prevention first: what could prevent this error?
3. Apply proximity (L01-P01): position error messages adjacent to their source
4. Apply contrast and salience (L01-P07): error must be immediately perceivable
5. Define motion for error appearance (localized shake for field errors)
6. Apply WCAG 3.3.1 (Error Identification) and 3.3.3 (Error Suggestion)
7. Implement aria-live="assertive" for error announcements
8. Define reduced motion alternative (color + border + text, no shake)
9. Ensure form input is preserved on error
```

---

## Template 6: Component State Audit

```
TASK: Audit the interaction states of [COMPONENT NAME].

COMPONENT: [describe the component]
CURRENT IMPLEMENTATION: [describe or provide current code]

Evaluate against ux-psychology-ai Layer 05 (Interaction States):

For each state (default, hover, focus, active, disabled, loading, success, error, empty):
1. Is the state defined?
2. Does it visually communicate the correct meaning?
3. Is it perceivable by keyboard users? (focus state)
4. Does it meet WCAG contrast requirements?
5. Is there a motion treatment? Is it appropriate?
6. Is there a reduced-motion alternative?

Identify all missing states and violations. Provide specific fixes.
```
