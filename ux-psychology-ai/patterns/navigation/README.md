# Pattern — Navigation

## User Goal
Find a destination or understand current location within the application.

---

## Navigation Types

| Type | Use case |
|---|---|
| Top navigation bar | Primary destinations; desktop primary pattern |
| Side navigation | Secondary/tertiary nav; complex apps; dashboard contexts |
| Bottom tab bar | Mobile primary navigation (5 items max) |
| Breadcrumbs | Hierarchical location; file systems; e-commerce categories |
| Tabs | Same-level content switching within a view |
| Pagination | Sequential content access |
| Skip navigation | Accessibility bypass block |

---

## Information Scent

Every navigation item must have strong information scent (L04-P04):
- Use terms your users use, not internal product terminology
- Avoid generic labels: "Resources", "Solutions", "Platform" — too broad to predict destination
- Limit icon-only navigation — icons without labels have weak scent for unfamiliar users
- Tooltips on icon-only items are a minimum; visible labels are preferred

---

## Serial Position

Apply the serial position effect (L03-P04):
- Most important destination: first position
- Second most important: last position  
- Least frequently used: middle positions

---

## Active State

Current location must be visually indicated:
- Active item: distinct visual treatment (filled, bold, color change + non-color indicator)
- Must use `aria-current="page"` on the active navigation item
- Breadcrumbs: final item represents current page (`aria-current="page"`)

---

## Keyboard Navigation

Primary navigation must be keyboard accessible:
- Tab moves between navigation items
- For complex nav (menus with submenus): implement WAI-ARIA Navigation landmark and menu pattern
- Dropdown menus: Arrow keys navigate items; Escape closes; focus returns to trigger
- Skip navigation link: first focusable element on page; visible on focus (WCAG 2.4.1)

---

## Mobile Navigation

Bottom tab bar (≤ 5 items):
- Tab bar items: icon + label (never icon-only for primary navigation)
- Touch target: 44×44px minimum
- Active state clearly indicated

Hamburger/drawer:
- Accessible: button with `aria-expanded` and `aria-controls`
- Drawer closes on Escape
- Focus managed: focus moves to first drawer item on open; returns to trigger on close

---

## Relevant UX Principles

- L04-P04 Information Scent — navigation labels must predict destinations
- L03-P04 Serial Position Effect — most important items first/last
- L02-P03 Chunking — group navigation by semantic category
- L06-P04 Consistency — navigation must appear consistently across pages (WCAG 3.2.3)
- L07 Operable 2.4 — keyboard navigation, bypass blocks, focus order

---

## Common Mistakes

❌ Navigation with no active state indicator — users lose location context
❌ Icon-only navigation without labels or tooltips — weak information scent
❌ Navigation that changes structure between pages — violates WCAG 3.2.3
❌ Mobile hamburger button with no visible label or aria-expanded state
❌ Submenus that do not support keyboard navigation
❌ No skip navigation link — forces keyboard users to tab through navigation on every page
