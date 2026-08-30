# Layer 07 — Understandable

**WCAG Principle 3:** Understandable — Information and the operation of the user interface must be understandable.

---

## 3.1 Readable

### 3.1.1 Language of Page (Level A)
The default human language of each web page can be programmatically determined.

**UI Rule:** All pages must have a valid `lang` attribute on the `<html>` element. Example: `<html lang="en">`.

### 3.1.2 Language of Parts (Level AA)
The human language of each passage or phrase in the content can be programmatically determined.

**UI Rule:** Mark up content that switches language. Example: `<span lang="fr">Merci</span>` within an English page.

---

## 3.2 Predictable

### 3.2.1 On Focus (Level A)
Receiving focus does not initiate a change of context.

**UI Rule:** Do not automatically submit forms, navigate pages, or open dialogs when an element receives focus. Focus must be stable.

### 3.2.2 On Input (Level A)
Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised beforehand.

**UI Rule:** Selecting a radio button or dropdown must not automatically navigate to a new page. Navigation-by-select requires an explicit submit/go button, or must be clearly communicated in advance.

### 3.2.3 Consistent Navigation (Level AA)
Navigation mechanisms that are repeated across pages occur in the same relative order.

**UI Rule:** Navigation components (nav bars, sidebars, breadcrumbs, footers) must appear in the same position and same order across pages.

### 3.2.4 Consistent Identification (Level AA)
Components that have the same functionality across pages are identified consistently.

**UI Rule:** "Search" must always be labeled "Search" and use a consistent icon. An icon/label combination used for one function must not be reused for a different function.

---

## 3.3 Input Assistance

### 3.3.1 Error Identification (Level A)
If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.

**UI Rules:**
- Error messages must identify the specific field with the error
- Error messages must be text (not just color change, not just icon)
- Error messages must describe the specific problem

### 3.3.2 Labels or Instructions (Level A)
Labels or instructions are provided when content requires user input.

**UI Rules:**
- All form fields have visible, persistent labels (not placeholder-only)
- Format requirements are communicated before errors occur
- Required fields are identified before form submission

### 3.3.3 Error Suggestion (Level AA)
If an input error is automatically detected and suggestions for correction are known, then the suggestion is provided to the user.

**UI Rule:** "Email address is invalid" is insufficient. "Please enter an email address in the format name@example.com" meets this criterion.

### 3.3.4 Error Prevention — Legal, Financial, Data (Level AA)
For pages that cause legal commitments, financial transactions, or test submissions: submissions are reversible, checked, or confirmed.

**UI Rules:**
- Provide review step before financial transactions
- Provide undo or cancellation for legal commitments
- Provide confirmation dialogs for permanent data deletion

### 3.3.7 Redundant Entry (Level A, WCAG 2.2)
Information previously entered by or provided to the user that is required again in the same process is auto-populated or available for selection.

**UI Rule:** In multi-step forms, do not ask the user to re-enter information they have already provided in the same session.

---

## Sources

**Standards:**
- W3C. (2018). WCAG 2.1. https://www.w3.org/TR/WCAG21/
- W3C. (2023). WCAG 2.2. https://www.w3.org/TR/WCAG22/

**Last verified:** 2024-01-01
