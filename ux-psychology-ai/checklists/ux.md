# UX Pre-Release Checklist

Use before shipping any new interface. Mark each item ✅ / ❌ / N/A.

---

## Task Clarity

- [ ] Primary task is identifiable within 3 seconds of viewing the interface
- [ ] One primary call to action per view
- [ ] Visual hierarchy matches task importance hierarchy
- [ ] Secondary tasks are clearly distinguishable from the primary task

## Information Architecture

- [ ] Related elements are visually proximate (Proximity)
- [ ] Elements of the same type are visually similar (Similarity)
- [ ] Visual containers contain semantically related content (Common Region)
- [ ] Progressive disclosure is applied — non-essential information is hidden appropriately
- [ ] Navigation labels have strong information scent (clear, user-facing terminology)

## Cognitive Load

- [ ] No information is displayed that is not needed for the current task
- [ ] Users are not required to remember information that could be displayed
- [ ] No mental calculations required from the user that the system could perform
- [ ] Form fields are chunked into meaningful sections

## Decision Design

- [ ] Default settings serve the majority use case
- [ ] Primary choice is visually distinct from alternatives (Von Restorff)
- [ ] Number of choices at each decision point is manageable
- [ ] Irreversible decisions have confirmation steps

## Error Prevention and Recovery

- [ ] Input validation requirements are communicated before errors occur
- [ ] Destructive actions require confirmation
- [ ] Error messages are specific: name the problem + provide the corrective action
- [ ] Error messages are positioned adjacent to the source
- [ ] User input is preserved on error
- [ ] Undo is available for reversible actions

## System Status

- [ ] Current page/location is indicated in navigation
- [ ] Loading states are shown for async operations
- [ ] Success and failure states are explicitly confirmed
- [ ] Current mode, filter, or selection is always visible

## Conventions

- [ ] Interaction patterns match platform conventions
- [ ] Terminology is consistent throughout the interface
- [ ] Navigation appears in the same position and order on every page
