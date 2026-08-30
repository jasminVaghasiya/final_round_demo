# AI AUDIT — Pre-Output Checklist
# Run before every output. Fix Critical items before presenting.

## CRITICAL (fix before output)

### Hierarchy
- [ ] At least one Level 1 (primary) element exists per view
- [ ] Not more than 1 primary element per view

### Accessibility — Level A (blocking)
- [ ] All images have alt text (decorative: alt="")
- [ ] All inputs have visible, programmatically associated labels
- [ ] Color is never the only error/status indicator
- [ ] All interactive elements keyboard accessible
- [ ] No keyboard trap (except intentional modal focus trap with Escape)
- [ ] Skip to main content link present on page designs
- [ ] Error messages contain specific problem + correction in text
- [ ] Focus state defined and visible for every interactive element
- [ ] Accessible name on every interactive element
- [ ] lang attribute on html element

### Accessibility — Level AA (blocking)
- [ ] Text contrast ≥ 4.5:1 (body) / 3:1 (large text)
- [ ] UI component contrast ≥ 3:1
- [ ] Focus ring contrast ≥ 3:1 and area ≥ perimeter × 2px
- [ ] Touch targets ≥ 24×24px (WCAG 2.5.8)
- [ ] Status messages use role="alert" or aria-live
- [ ] No color as sole means of conveying information

### Interaction
- [ ] Every interactive element has all applicable states defined
- [ ] Loading state appears within 300ms
- [ ] Form errors preserved on submission failure
- [ ] Destructive irreversible actions have confirmation

---

## MAJOR (report with fix, output allowed)

### UX
- [ ] Primary task identifiable within 3 seconds
- [ ] Related elements grouped (proximity / common region)
- [ ] Navigation uses user-facing terminology (not jargon)
- [ ] Progressive disclosure applied to non-essential content

### Interaction
- [ ] Form validation on blur, not on keystroke
- [ ] Error messages adjacent to error source
- [ ] Undo available for reversible actions

### Accessibility
- [ ] Heading hierarchy correct (no skipped levels)
- [ ] Navigation consistent across pages
- [ ] ARIA roles and states correct
- [ ] Touch target spacing ≥ 8px between adjacent targets

---

## MINOR (note, optional fix)

- [ ] Line height ≥ 1.5× for body text
- [ ] Measure 60–80 characters for reading content
- [ ] Empty states informative (why + action)
- [ ] Decorative motion absent from primary interaction areas
- [ ] Motion duration ≤ 500ms for interactive feedback

---

## Audit Output Format

For each violation found:
```
[CRITICAL|MAJOR|MINOR] [Section]
Problem: [specific issue]
Fix:     [specific corrective action]
WCAG:    [criterion if applicable]
```
