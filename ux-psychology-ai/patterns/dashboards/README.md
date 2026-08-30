# Pattern — Dashboards

## User Goal
Understand the current state of a system or dataset; identify issues requiring action; complete monitoring tasks efficiently.

---

## Information Architecture

### Hierarchy
Apply visual hierarchy ruthlessly on dashboards (L01-P06):
- One primary metric or status per dashboard (the number the user checks first)
- Secondary metrics: 2–4 supporting the primary
- Tertiary: detailed data tables, historical views, less-used metrics

Do not present 20 metrics at equal visual weight. Users must spend time scanning to find what matters.

### Chunking
Group metrics into named sections (L02-P03):
- Revenue (ARR, MRR, churn)
- Activity (DAU, sessions, conversions)
- Health (error rates, response times, uptime)

### Information Density
Match density to the user's expertise:
- Analysts / power users: higher density acceptable; use tables and detailed charts
- Executives / monitors: lower density; large numbers, sparklines, status indicators

---

## Live Data and Change Blindness

Live-updating dashboards are the primary context where change blindness (L04-P03) causes problems:

- When a value updates, animate the transition briefly (subtle highlight or number change animation)
- For critical alerts (error rates spike, service down), use attention-capturing motion (L08 Attention Motion)
- Announce live updates to screen readers using `aria-live="polite"` for routine updates, `aria-live="assertive"` for alerts
- Show "last updated" timestamp to communicate data freshness

---

## Status Indicators

- Use consistent iconography: ✓ success, ⚠ warning, ✕ error
- Never use color alone for status (WCAG 1.4.1)
- Status indicators must have a text label or tooltip
- Critical status (service down, errors) must not be in peripheral visual areas — place in primary hierarchy

---

## Accessibility

- All charts and data visualizations need text alternatives: data tables, summary text, or aria-label with key values (WCAG 1.1.1)
- Color in charts: use patterns or labels, not color alone (WCAG 1.4.1)
- Live data regions: `aria-live` (WCAG 4.1.3)
- Date/time pickers for range filters: keyboard accessible

---

## Common Mistakes

❌ Equal visual weight for all metrics — no clear hierarchy; users scan everything
❌ Color-only status indicators — inaccessible and fails WCAG 1.4.1
❌ Live data that updates silently — change blindness causes users to miss important changes
❌ Charts with no data table alternative — inaccessible to screen reader users
❌ No empty state for widgets with no data — users cannot tell if no data exists or data failed to load
