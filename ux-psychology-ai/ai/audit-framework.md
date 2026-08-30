# AI Audit Framework

Use this framework to evaluate any generated or existing interface before presenting results. Identify violations and provide specific, actionable fixes.

---

## How to Use This Framework

1. Work through each section systematically
2. For each item, mark: ✅ Pass / ❌ Fail / ⚠️ Needs review
3. For each failure, provide a specific fix — not a generic recommendation
4. Do not mark an item as passing without evaluating it

---

## Section 1: UX Audit

### 1.1 Task Clarity

- [ ] Is the primary task obvious within 3 seconds of viewing the interface?
- [ ] Is there exactly one primary call to action per view?
- [ ] Does the visual hierarchy match the task importance hierarchy?
- [ ] Are secondary tasks clearly distinguishable from the primary task?

### 1.2 Cognitive Load

- [ ] Is all information on the screen necessary for the current task?
- [ ] Are users required to remember information that could be displayed?
- [ ] Are there calculations or transformations the user must perform mentally that the system could handle?
- [ ] Is information grouped semantically (not just visually)?
- [ ] Does progressive disclosure correctly hide non-essential information?

### 1.3 Information Architecture

- [ ] Is related information visually proximate? (L01-P01 Proximity)
- [ ] Are elements of the same type visually similar? (L01-P02 Similarity)
- [ ] Do visual containers (cards, panels) contain semantically related content? (L01-P03 Common Region)
- [ ] Is the reading path (Z/F pattern) aligned with information priority?

### 1.4 Decision Design

- [ ] Is the number of choices at each decision point reasonable?
- [ ] Are defaults set to the option that serves most users?
- [ ] Is the primary choice visually distinct from alternatives? (L03-P05 Von Restorff)
- [ ] Are high-consequence choices clearly signaled as such?
- [ ] Do error-prone decisions have confirmation steps?

### 1.5 Error Prevention

- [ ] Does the interface constrain input to valid values where possible?
- [ ] Are validation requirements communicated before errors occur?
- [ ] Is the submit/proceed action appropriately gated on completion of required fields?
- [ ] Do destructive actions require confirmation?

### 1.6 System Status Visibility

- [ ] Is the current page/location indicated in navigation?
- [ ] Do loading operations show progress or a loading indicator?
- [ ] Do completed operations confirm success?
- [ ] Do failed operations explain what went wrong?
- [ ] Is the current mode, filter, or selection state visible?

### 1.7 Error Recovery

- [ ] Can users undo their most recent action?
- [ ] Do error messages identify the specific problem?
- [ ] Do error messages explain the corrective action?
- [ ] Are error messages positioned near the relevant element?
- [ ] Is user input preserved after an error?

### 1.8 Conventions

- [ ] Are interaction patterns consistent with platform conventions?
- [ ] Is terminology consistent throughout the interface?
- [ ] Do icon meanings follow established conventions?
- [ ] Does navigation structure match user mental models for this domain?

---

## Section 2: UI Audit

### 2.1 Visual Hierarchy

- [ ] Is there one dominant element per view?
- [ ] Are there no more than 4 distinct hierarchy levels?
- [ ] Does type size correspond to importance hierarchy?
- [ ] Does contrast correspond to importance hierarchy?

### 2.2 Spacing and Layout

- [ ] Is within-group spacing tighter than between-group spacing?
- [ ] Is alignment consistent (single grid alignment, not ad-hoc)?
- [ ] Is whitespace used to separate sections rather than only decorative elements?
- [ ] Are touch targets sufficiently spaced to prevent accidental activation?

### 2.3 Typography

- [ ] Is the typeface readable at the intended sizes?
- [ ] Is line height ≥ 1.5× for body text?
- [ ] Is the typographic scale defined (not arbitrary font sizes)?
- [ ] Are there no more than 2–3 font weights in use?

### 2.4 Color

- [ ] Is there one primary action color used for ONE primary action type?
- [ ] Are error, success, and warning states visually distinct from each other?
- [ ] Are error states reinforced with non-color indicators?
- [ ] Is the color palette limited enough to maintain hierarchy?

### 2.5 Interaction States

- [ ] Are all states defined for every interactive element: default, hover, focus, active, disabled, loading, success, error?
- [ ] Is the focus state visible and clearly distinguishable?
- [ ] Are loading states immediate (appear within 300ms)?
- [ ] Are empty states informative (explain why empty + provide action)?

### 2.6 Responsive Behavior

- [ ] Does the layout reflow correctly at mobile viewport widths?
- [ ] Do touch targets meet minimum size at mobile sizes?
- [ ] Does text reflow correctly at 200% browser zoom?
- [ ] Does content reflow at 400% zoom without horizontal scroll?

---

## Section 3: Accessibility Audit

### 3.1 Keyboard Access

- [ ] Can all functionality be completed by keyboard alone?
- [ ] Does tab order match logical reading order?
- [ ] Are all interactive elements reachable by Tab?
- [ ] Can all interactive elements be activated by Enter or Space?
- [ ] Does keyboard interaction within complex widgets follow WAI-ARIA patterns?

### 3.2 Focus Management

- [ ] Is focus always visible? (WCAG 2.4.7)
- [ ] Does the focus indicator meet WCAG 2.4.11 requirements? (WCAG 2.2)
- [ ] Is focus managed correctly when modals open? (focus moves to dialog)
- [ ] Is focus returned to the trigger element when modals close?
- [ ] Is focus not trapped unexpectedly?

### 3.3 Contrast

- [ ] Does all body text meet 4.5:1 contrast ratio? (WCAG 1.4.3)
- [ ] Does all large text meet 3:1 contrast ratio? (WCAG 1.4.3)
- [ ] Do UI components (inputs, buttons) meet 3:1 against adjacent colors? (WCAG 1.4.11)
- [ ] Do focus indicators meet 3:1 against adjacent colors? (WCAG 2.4.11)

### 3.4 Color Independence

- [ ] Is color never the only means of conveying information? (WCAG 1.4.1)
- [ ] Are error states indicated with non-color cues? (icon, text, border style)
- [ ] Are required fields marked with non-color indicators?

### 3.5 Semantic Structure

- [ ] Is there a single `<h1>` per page?
- [ ] Do heading levels correspond to content hierarchy (no skipped levels)?
- [ ] Are page landmarks used correctly? (`<nav>`, `<main>`, `<aside>`, `<footer>`)
- [ ] Are form labels programmatically associated with inputs?
- [ ] Do interactive elements have accessible names?

### 3.6 Screen Reader Behavior

- [ ] Do all images have appropriate alt text? (WCAG 1.1.1)
- [ ] Are decorative images marked with `alt=""`?
- [ ] Do custom components have correct ARIA roles and states?
- [ ] Are status messages announced via aria-live or role="alert"? (WCAG 4.1.3)
- [ ] Is dynamic content insertion announced appropriately?

### 3.7 Error Communication

- [ ] Are errors identified in text? (WCAG 3.3.1)
- [ ] Are corrections suggested where possible? (WCAG 3.3.3)
- [ ] Are error messages programmatically associated with their fields?
- [ ] Are error messages announced to screen readers?

### 3.8 Touch and Input

- [ ] Do touch targets meet 24×24px minimum? (WCAG 2.5.8, WCAG 2.2)
- [ ] Do touch targets have adequate spacing between them?
- [ ] Is there no orientation lock? (WCAG 1.3.4)

---

## Section 4: Motion Audit

### 4.1 Motion Purpose

- [ ] Does each animation answer at least one of the motion taxonomy questions?
- [ ] Is there no decorative motion in primary interaction areas?
- [ ] Is attention motion used sparingly and only for important updates?

### 4.2 Timing

- [ ] Are interactive feedback animations ≤ 150ms?
- [ ] Are state change animations ≤ 300ms?
- [ ] Are navigation animations ≤ 350ms?
- [ ] Is no animation causing perceivable delay in task completion?

### 4.3 Reduced Motion

- [ ] Is a `prefers-reduced-motion: reduce` implementation defined?
- [ ] Does the reduced motion alternative still communicate the state change?
- [ ] Is there no content that flashes rapidly? (WCAG 2.3.1)

### 4.4 Spatial Consistency

- [ ] Does navigation motion maintain spatial consistency? (forward/back direction)
- [ ] Do elements enter from the direction that makes spatial sense?
- [ ] Do elements exit in a direction consistent with their destination?

---

## Audit Output Format

For each identified violation, produce:

```
VIOLATION:
  Section: [UX / UI / Accessibility / Motion]
  Item: [specific audit item]
  Severity: [Critical (blocks task or excludes users) / Major (significantly harms UX) / Minor (reduces quality)]
  Description: [what is wrong]
  Fix: [specific, actionable correction]
  Reference: [WCAG criterion / UX principle / layer reference]
```

---

## Severity Guide

| Severity | Definition |
|---|---|
| **Critical** | Blocks task completion for any user, or fails a Level A WCAG criterion, or excludes a significant user group |
| **Major** | Significantly increases task difficulty, confusion, or error rate; fails a Level AA WCAG criterion |
| **Minor** | Reduces quality or polish; fails a Level AAA criterion; best practice violation |
