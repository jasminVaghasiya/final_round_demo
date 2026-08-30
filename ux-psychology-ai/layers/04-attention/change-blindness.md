# L04-P03 — Change Blindness

**Layer:** 04-attention
**Evidence level:** A
**Type:** Empirical phenomenon
**Domain:** Visual attention, perception

---

## Definition

Change blindness is the failure to notice visual changes in a scene when those changes occur during a moment of attentional disruption (such as a blink, saccade, or visual interruption), or when they occur gradually or in peripherally attended areas.

---

## Research Basis

Change blindness was extensively demonstrated by Simons and Levin (1997), Rensink, O'Regan, and Clark (1997), and others. The phenomenon is remarkably robust: people frequently fail to notice large, meaningful changes — even swapping a person in a scene — when the change occurs during a brief disruption.

**Evidence level A:** One of the most striking and replicated findings in attention research.

---

## Why It Matters

Interface state changes — updated data, status transitions, error messages appearing, notifications — can occur entirely without the user's awareness. This creates situations where a critical change happened, the interface correctly displayed it, but the user never noticed. This is not a user error — it is a design failure.

---

## When to Apply

- Real-time data interfaces (dashboards, live feeds)
- Form validation feedback appearing during or after input
- Status transitions (loading → complete, saving → saved)
- Notifications appearing in non-primary areas
- Page content updating after user action
- Background processes completing

---

## UI Implications

1. **Do not place status changes in locations the user is not currently attending.** If the user is entering data in a form field, they are not watching the top of the page.
2. **Use motion to signal change.** Motion captures involuntary attention and can direct attention to a changed element. (See Layer 08 — Attention Motion)
3. **Provide an explicit confirmation of success/failure near the user's point of focus.** Inline validation, localized success messages, and focus-managed error announcements combat change blindness.
4. **Toast notifications and status bars are vulnerable to change blindness.** They appear in peripheral locations. Use them for low-priority updates; use modal or inline feedback for critical status.
5. **After a page or significant view update, direct focus to the most important new content.** Screen reader announcements and visual focus management both help.

---

## Anti-Patterns

❌ Showing a success toast notification at the top-right corner after a form submission while the user is looking at the form's submit button.

❌ Updating a data table silently after a filter change — users may not notice which rows changed.

❌ Displaying an error below a long form that requires scrolling — the user cannot see it and is not attending to that area.

---

## Accessibility Considerations

- Screen reader users experience a form of change blindness for visual changes not announced programmatically. Use ARIA live regions (`aria-live`, `aria-atomic`) for important status updates. (WCAG 4.1.3 Status Messages)
- Focus management after state transitions should direct users to relevant new content. (WCAG 2.4.3 Focus Order)
- Motion used to attract attention to changes must also have non-motion alternatives for users with reduced motion preferences. (WCAG 2.3.3 Animation from Interactions, WCAG 2.2 AAA)

---

## Sources

**Primary:**
- Simons, D. J., & Levin, D. T. (1997). Change blindness. *Trends in Cognitive Sciences*, 1(7), 261–267. DOI: 10.1016/S1364-6613(97)01080-2
- Rensink, R. A., O'Regan, J. K., & Clark, J. J. (1997). To see or not to see: The need for attention to perceive changes in scenes. *Psychological Science*, 8(5), 368–373.

**Last verified:** 2024-01-01
