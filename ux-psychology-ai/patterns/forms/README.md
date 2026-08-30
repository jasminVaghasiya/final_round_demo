# Pattern — Forms

## User Goal
Complete a data input task accurately and efficiently.

---

## When to Use

Apply these patterns when collecting user input — registration, checkout, settings, search filters, contact forms, surveys.

---

## Form Structure

### Layout
- Single-column layout for most forms (prevents visual scanning across multiple columns)
- Multi-column acceptable for adjacent short fields (first name / last name, city / state / zip)
- Left-aligned labels above inputs (best readability and scanability)
- Avoid placeholder-only patterns — placeholders disappear on input and do not meet WCAG 2.4.6

### Sections
- Group related fields into named sections (Chunking: L02-P03)
- Use section headings (`<h2>` or `<h3>`) to label groups
- Use `<fieldset>` and `<legend>` for radio groups and checkbox groups (WCAG 1.3.1)

### Field Order
- Match the mental model and real-world order (e.g., first name before last name; address before city before state)
- Most important / most used fields first (Primacy: L03-P04)

---

## Input Design

### Labels
- All inputs must have persistent, visible labels — never remove the label on focus
- Labels must be programmatically associated: `<label for="input-id">` or `aria-labelledby`
- Required fields: asterisk (*) with a note "* required" at the top of the form
- `aria-required="true"` on required inputs

### Placeholders
- Use placeholders for format examples only ("name@example.com"), not as a label substitute
- Ensure placeholder text meets 4.5:1 contrast if used for essential information (WCAG 1.4.3)

### Help Text
- Position below the input field
- Use `aria-describedby` to associate help text with the input
- Show before errors, not instead of them

### Validation
- Validate on blur (when user leaves a field), not on every keystroke
- Do not validate on page load before user interaction
- Show validation requirements before errors occur when format is non-obvious

---

## Error Design

### Error Messages
- Appear immediately below the field in error (Proximity: L01-P01)
- Written in plain language: what went wrong + what to do (WCAG 3.3.1 / 3.3.3)
- Red border + error icon + red text (non-color indicators: WCAG 1.4.1)
- Announced to screen readers: `aria-invalid="true"` + `role="alert"` or `aria-describedby`
- Preserve all valid user input when showing errors

### Summary Error
- For long forms, provide an error summary at the top listing all fields with errors
- Each error in the summary links to the affected field
- Shift focus to the error summary on submission attempt

---

## Form Submission

### Submit Button
- One primary submit button per form
- Disable on submission in progress to prevent double-submit (show loading state)
- Label describes the action: "Submit Application", "Create Account", "Save Changes" — not generic "Submit"

### Success State
- Confirm what happened: "Your application has been submitted. Reference: #2024-1045"
- If navigating away, include the confirmation in the destination page
- Do not clear the form silently — confirm before clearing

---

## Relevant UX Principles

- L01-P01 Proximity — labels adjacent to inputs
- L02-P01 Cognitive Load — chunking reduces mental effort
- L02-P03 Chunking — section grouping
- L02-P04 Recognition vs. Recall — autocomplete, suggestions
- L05-P05 Error Prevention — progressive validation
- L05-P06 Error Recovery — localized, actionable error messages
- L06-P05 Nielsen Heuristic 5 — Error prevention
- L06-P09 Nielsen Heuristic 9 — Error recovery
- L07 Understandable (3.3) — All WCAG input assistance criteria

---

## Common Mistakes

❌ Placeholder-only fields (no label) — placeholders disappear and are not accessible
❌ Validating on every keystroke — shows errors before the user has finished typing
❌ Error messages at the top of the form for a field at the bottom — violates proximity
❌ Clearing the form on error — forces users to re-enter all valid data
❌ Submit button that does nothing visibly on click — no loading state, no feedback
❌ Generic error messages: "Invalid input" or "Something went wrong"
