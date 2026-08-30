# Pattern — Onboarding

## User Goal
Understand the product's value and complete setup to reach the first meaningful use.

---

## Onboarding Principles

### Make the value case immediately
Users who do not perceive value within the first few interactions will abandon. Lead with demonstration, not explanation.

### Minimize required input
Request only information needed for the first experience. Defer non-essential setup.

### Show progress clearly
Apply goal-gradient effect (L03-P09): users who see progress toward a defined goal complete more steps.
Apply endowed progress (L03-P10): credit completed system steps immediately (e.g., "Account created ✓").

### Design for peak-end rule (L06-P14)
- Create at least one "aha moment" — the point where the user experiences the core value
- End the onboarding on a positive, confirming note — not on an administrative task

---

## Onboarding Flow Structure

```
Step 0: Account creation (minimal — email/password only)
Step 1: Welcome + what to expect (30 seconds)
Step 2: First value demonstration (interactive, not tutorial video)
Step 3: Minimal required setup (1–3 questions maximum)
Step 4: Success / "You're ready" moment
```

Avoid front-loading setup. Every additional step before the user sees value reduces completion rate.

---

## Progress Communication

- Show step count: "Step 2 of 4" or progress bar
- Credit completed steps immediately (endowed progress)
- Allow skipping non-essential steps — provide a clear "Skip for now" option
- Allow resuming from the last incomplete step if user exits mid-flow

---

## Interaction States in Onboarding

- Each step: clear primary action button (next, submit, continue)
- Loading states on async operations (account creation, data import)
- Error states with recovery paths (email already registered → "Sign in" link)
- Success states for each significant step

---

## Accessibility

- All onboarding steps navigable by keyboard
- Progress indicators use `aria-valuemin`, `aria-valuenow`, `aria-valuemax` if progress bar; or `aria-current="step"` for step indicators
- Forms meet WCAG 3.3 Input Assistance
- Do not autoplay video or audio (WCAG 1.4.2)
- Celebration animations (confetti, etc.) must have `prefers-reduced-motion` alternative

---

## Common Mistakes

❌ 10-step onboarding before the user sees any value
❌ Required fields for information that could be collected later (full billing info before first use)
❌ No skip option for non-essential steps
❌ Progress percentage that does not start until user takes action (wastes endowed progress opportunity)
❌ Ending onboarding with a generic "Get started" empty state
