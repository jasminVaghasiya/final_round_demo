# L04-P04 — Information Scent

**Layer:** 04-attention
**Evidence level:** B
**Type:** Cognitive design theory
**Domain:** Navigation, information foraging

---

## Definition

Information scent is the set of cues — labels, icons, descriptions, surrounding context — that allow users to predict whether following a navigation path will lead them closer to their goal. Strong scent guides confident navigation; weak scent causes uncertainty, backtracking, and abandonment.

---

## Research Basis

Information foraging theory (Pirolli & Card, 1999) draws an analogy between animals foraging for food and users foraging for information. Users follow paths that they predict will yield the highest information gain relative to cost. The "scent" metaphor describes the strength of these predictive cues.

**Evidence level B:** Grounded in information foraging theory with empirical support from web navigation studies. The metaphorical framing is established but the precise measurement of "scent strength" is complex.

---

## Why It Matters

Users cannot confidently navigate when navigation labels are vague, jargon-heavy, or ambiguous. When users cannot predict where a link leads, they may click speculatively and backtrack — increasing interaction cost and reducing trust. Strong information scent enables users to navigate without trial and error.

---

## UI Implications

1. **Use descriptive navigation labels.** "Product Updates" is stronger scent than "What's New?" for a user seeking release notes.
2. **Avoid internal jargon in navigation.** If your product calls a feature "WorkflowX" but users call it "automation", the scent is broken.
3. **Provide contextual descriptions for ambiguous destinations.** Search result snippets, hover descriptions, and subtitle text all strengthen scent.
4. **Show breadcrumbs and current location.** Users need to know where they are to judge whether they are getting closer to their goal.
5. **Avoid labels that could match too many destinations.** "General" as a settings category has weak scent — users cannot predict what is in it.
6. **Use familiar conventions for iconography.** An icon whose meaning is unclear provides no scent.

---

## Anti-Patterns

❌ Navigation labeled with internal team names ("Platform", "Stack", "Core") that have no meaning to users.

❌ Icon-only navigation without tooltip or label — icons without labels have weak or unreliable scent.

❌ Generic category names ("Resources", "Tools", "More") that do not narrow the prediction space for the user.

---

## Sources

**Primary:**
- Pirolli, P., & Card, S. (1999). Information foraging. *Psychological Review*, 106(4), 643–675. DOI: 10.1037/0033-295X.106.4.643

**Secondary:**
- Nielsen, J., & Loranger, H. (2006). *Prioritizing Web Usability*. New Riders.

**Last verified:** 2024-01-01
