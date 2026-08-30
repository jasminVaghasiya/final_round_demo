# L05-P03 & L05-P04 — Feedback and Constraints

---

## Feedback (L05-P03)

**Layer:** 05-interaction-usability
**Evidence level:** B
**Type:** Design principle
**Domain:** Interaction design, human-computer interaction

### Definition
Feedback is information provided by the system that communicates the result of a user action, the current state of the system, or the outcome of a process — allowing users to understand what happened and what they should do next.

### Research Basis
The role of feedback in closed-loop motor control and skill learning has extensive experimental support in psychology and motor learning research. In HCI, feedback as a design principle is established through foundational work by Norman (1988) and usability research. Without feedback, users cannot model the system's state and cannot determine whether their actions succeeded.

**Evidence level B:** Feedback as a design requirement is strongly supported by both cognitive science (mental model formation) and established usability research.

### Why Feedback Matters
Without feedback, users must guess whether:
- Their action was received
- The system is working
- Their action succeeded or failed
- The system is in the state they intended to create

This uncertainty leads to repeated actions (double-clicking, multiple form submissions), incorrect assumptions, and abandonment.

### Feedback Timing Requirements

Based on human perception research (Miller, 1968):

| Response time | User experience | Required feedback |
|---|---|---|
| < 100ms | Feels instantaneous | None required — feels direct |
| 100–300ms | Slight but perceivable | Micro-interaction (hover, press state) |
| 300ms–1s | Clearly delayed | Loading indicator recommended |
| 1–3s | Significant wait | Spinner / loading state required |
| > 3s | Long wait | Progress bar + estimated time if possible |
| > 10s | Very long | Background processing + completion notification |

### UI Implications

1. **Acknowledge every user action within 100ms.** Button press states, hover states, and loading states that appear immediately confirm the input was received.
2. **Communicate ongoing operations with appropriate indicators.** Spinner for indeterminate operations; progress bar for determinate ones.
3. **Confirm outcomes explicitly.** Success is not self-evident — tell the user what completed. Failure must be described specifically.
4. **Locate feedback near the action that triggered it.** Inline feedback (below a field, next to a button) is more effective than distal feedback (top of page, notification area) for localized actions.
5. **System status must be continuously visible, not just visible on events.** Current page, current mode, active filters, selected items — all are forms of persistent feedback. (Nielsen Heuristic 1)
6. **Provide progress for multi-step processes.** Users need to know where they are and how far they have to go.

### Anti-Patterns

❌ A button that does nothing visibly for 2 seconds after being clicked — user presses again, submitting twice.

❌ A form that navigates to a success page after submission without explaining what was submitted or what happens next.

❌ An operation that silently fails — no error state, no indication that anything went wrong.

❌ Success feedback positioned at the top of the screen while the user's attention is at the bottom after clicking a submit button below a long form.

### Accessibility

- Feedback must be available to screen readers, not just visual. Use `role="alert"` for errors, `role="status"` for success/info. (WCAG 4.1.3)
- Loading states: `aria-busy="true"` on the element being updated; announce completion.
- Progress bars: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

## Constraints (L05-P04)

**Evidence level:** C | **Type:** Design principle

### Definition
Constraints are design mechanisms that restrict the possible actions available to users, preventing errors before they can occur by making incorrect actions impossible or clearly inadvisable.

### Types of Constraints

| Type | Description | Example |
|---|---|---|
| **Physical** | Object limits what is possible | A date picker that only shows valid dates |
| **Semantic** | Meaning limits what makes sense | Disabling "submit" until required fields are filled |
| **Cultural** | Convention limits expectations | Red stop / green go conventions |
| **Logical** | Logic limits valid combinations | Departure date cannot be before arrival date |

### UI Implications

1. **Disable actions that cannot succeed.** A submit button that is disabled until required fields are completed is a constraint that prevents a class of errors. Always explain why a constraint exists (disabled button tooltip).
2. **Constrain input formats.** Date pickers constrain date entry; number inputs constrain to numeric values; masked inputs constrain format. Each constraint removes a class of input errors.
3. **Logical constraints:** Prevent contradictory selections. If "end date" cannot be before "start date", either disable invalid dates in the end-date picker or validate immediately on selection.
4. **Use constraints that preserve user autonomy.** Constraints should prevent errors, not restrict legitimate choices. A constraint that prevents users from doing something they need to do is a design failure.
5. **Communicate constraints before they become errors.** "Password must contain at least 8 characters and one number" shown before input, not after a failed attempt.

### Anti-Patterns

❌ No constraint on a file upload field that only accepts specific formats — the error only appears after a slow upload completes.

❌ A constraint that is too strict, preventing valid input ("Phone numbers must contain exactly 10 digits" failing on a UK number with spaces).

❌ Disabled state with no explanation — users cannot determine what action would enable the control.

### Accessibility

- Disabled controls remain identifiable to screen readers with `aria-disabled="true"` and an accessible name.
- Constraints communicated visually must also be communicated in text — format requirements, length limits, valid value ranges. (WCAG 3.3.2 Labels or Instructions)
- Logical constraints (e.g., date range validation) should be announced to screen readers when the constraint triggers. (WCAG 3.3.1 Error Identification)

---

## Sources

**Primary:**
- Norman, D. A. (1988). *The Design of Everyday Things*. Basic Books. (Chapter 4: Knowing What to Do)
- Miller, R. B. (1968). Response time in man-computer conversational transactions. *AFIPS Fall Joint Computer Conference*, 33, 267–277.

**Last verified:** 2024-01-01
