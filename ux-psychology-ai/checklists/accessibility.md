# Accessibility Pre-Release Checklist

All Level A and Level AA items are required. Level AAA items are recommended.

---

## Perceivable

- [ ] All images have alt text (decorative images: `alt=""`) — WCAG 1.1.1 (A)
- [ ] All form inputs have visible, persistent labels — WCAG 1.3.1 (A)
- [ ] Semantic HTML used for structure: headings, landmarks, lists — WCAG 1.3.1 (A)
- [ ] Tables use `<th>` with scope and `<caption>` — WCAG 1.3.1 (A)
- [ ] `<fieldset>` and `<legend>` for grouped inputs — WCAG 1.3.1 (A)
- [ ] No content communicates using color alone — WCAG 1.4.1 (A)
- [ ] Body text contrast ≥ 4.5:1 — WCAG 1.4.3 (AA)
- [ ] Large text contrast ≥ 3:1 — WCAG 1.4.3 (AA)
- [ ] UI component contrast ≥ 3:1 — WCAG 1.4.11 (AA)
- [ ] Text resizes to 200% without loss of content — WCAG 1.4.4 (AA)
- [ ] Content reflows at 400% without horizontal scroll — WCAG 1.4.10 (AA)
- [ ] Text spacing can be adjusted without loss of content — WCAG 1.4.12 (AA)

## Operable

- [ ] All functionality is keyboard accessible — WCAG 2.1.1 (A)
- [ ] No keyboard traps (except intentional modal focus traps with Escape) — WCAG 2.1.2 (A)
- [ ] Skip to main content link is the first focusable element — WCAG 2.4.1 (A)
- [ ] Page title is descriptive — WCAG 2.4.2 (A)
- [ ] Tab order matches reading order — WCAG 2.4.3 (A)
- [ ] Focus is visible — WCAG 2.4.7 (AA)
- [ ] Focus appearance meets area and contrast requirements — WCAG 2.4.11 (AA, WCAG 2.2)
- [ ] Headings and labels are descriptive — WCAG 2.4.6 (AA)
- [ ] Touch targets ≥ 24×24px — WCAG 2.5.8 (AA, WCAG 2.2)
- [ ] Visible label matches accessible name — WCAG 2.5.3 (A)
- [ ] No orientation restriction — WCAG 1.3.4 (AA)
- [ ] Gestures have button alternatives — WCAG 2.5.1 (A)

## Understandable

- [ ] `lang` attribute on `<html>` element — WCAG 3.1.1 (A)
- [ ] Focus does not cause unexpected context change — WCAG 3.2.1 (A)
- [ ] Input does not cause unexpected context change — WCAG 3.2.2 (A)
- [ ] Navigation appears consistently across pages — WCAG 3.2.3 (AA)
- [ ] Components with same function are identified consistently — WCAG 3.2.4 (AA)
- [ ] Error messages identify the problem in text — WCAG 3.3.1 (A)
- [ ] Labels and instructions provided for inputs — WCAG 3.3.2 (A)
- [ ] Error suggestions provided where possible — WCAG 3.3.3 (AA)
- [ ] Confirmations provided for legal/financial transactions — WCAG 3.3.4 (AA)
- [ ] Previously entered information is auto-populated — WCAG 3.3.7 (A, WCAG 2.2)

## Robust

- [ ] All interactive elements have accessible names — WCAG 4.1.2 (A)
- [ ] ARIA roles and states are correct — WCAG 4.1.2 (A)
- [ ] Status messages announced without focus move — WCAG 4.1.3 (AA)
- [ ] Custom components follow WAI-ARIA Authoring Practices patterns
- [ ] Semantic HTML preferred over ARIA where possible

## Screen Reader Testing

- [ ] Tested with NVDA + Chrome (Windows)
- [ ] Tested with VoiceOver + Safari (macOS / iOS)
- [ ] All interactive elements announced with correct name, role, state
- [ ] Forms navigable and completable by screen reader
- [ ] Live regions announce updates appropriately
