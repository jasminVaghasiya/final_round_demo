# L05-P05 & L05-P06 — Error Prevention and Error Recovery

---

## Error Prevention (L05-P05)

**Evidence level:** C | **Type:** Design principle | **Domain:** Interaction design, usability

### Definition
Error prevention is the design strategy of eliminating or reducing the conditions under which users are likely to make errors, rather than relying on error detection and recovery.

### Why It Matters
Errors have costs: time to detect, time to correct, risk of data loss, and erosion of user confidence. Prevention is always more efficient than recovery.

### UI Implications

1. **Validate inputs progressively, not only on submission.** Real-time validation (after field blur, not on every keystroke) catches errors before they compound.
2. **Constrain input formats where possible.** Date pickers prevent date format errors. Phone number fields with format hints prevent format mismatches. Dropdowns prevent typos.
3. **Require confirmation for irreversible, high-consequence actions.** "Delete all data" must have a confirmation step. The confirmation should explain the consequence.
4. **Disable actions that cannot succeed in the current state.** A "Submit" button that is disabled until required fields are completed eliminates a class of errors. But: disabled buttons must communicate why they are disabled.
5. **Prevent simultaneous conflicting actions.** Disable the submit button while a submission is in progress to prevent double-submission.
6. **Use smart defaults.** A form that prefills known information reduces user input and therefore reduces input errors.

### Anti-Patterns
❌ Validation that only runs on form submission — users have already completed 10 fields before learning that field 3 was invalid.

❌ A "Delete" button with no confirmation — one accidental tap causes data loss.

❌ Disabled buttons with no explanation of why they are disabled or what the user must do.

---

## Error Recovery (L05-P06)

**Evidence level:** C | **Type:** Design principle | **Domain:** Interaction design, usability

### Definition
Error recovery is the set of mechanisms that allow users to understand what went wrong and take corrective action efficiently.

### UI Implications

1. **Error messages must identify the error specifically.** "Something went wrong" is not an error message. "Email address already registered — sign in or reset your password" is.
2. **Error messages must explain what to do.** Not just what is wrong, but the corrective action.
3. **Error messages must be near the error.** A field-level error appears below that field, not at the top of the page.
4. **Support undo for reversible actions.** "Undo" is the most powerful error recovery mechanism for most actions. Support it wherever feasible.
5. **Preserve user input on error.** If a form fails validation or submission, the user's completed fields must not be cleared.
6. **Log in a way that supports recovery.** Activity logs, version history, and audit trails allow recovery from actions that were not immediately recognized as errors.

### Anti-Patterns
❌ Generic error messages: "An error occurred." "Invalid input." "Request failed."

❌ Form that clears all fields on submission error.

❌ Error messages placed far from the field they describe.

---

## Accessibility Considerations

- Error messages must be programmatically associated with their form fields. (WCAG 3.3.1 Error Identification; WCAG 3.3.3 Error Suggestion)
- Error messages must be announced to screen readers — either through focus management or ARIA live regions.
- Required fields must be identified in a way that does not rely on color alone. (WCAG 1.4.1; WCAG 3.3.2 Labels or Instructions)

---

## Sources

**Secondary:**
- Nielsen, J. (1994). *Usability Engineering*. Morgan Kaufmann. (Chapter 5)
- Cooper, A., Reimann, R., & Cronin, D. (2007). *About Face 3*. Wiley.
- W3C. WCAG 2.1/2.2 SC 3.3 Input Assistance. https://www.w3.org/TR/WCAG21/

**Last verified:** 2024-01-01
