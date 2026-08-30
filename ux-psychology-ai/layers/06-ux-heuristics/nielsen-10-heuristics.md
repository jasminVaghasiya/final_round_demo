# Nielsen's 10 Usability Heuristics

**Layer:** 06-ux-heuristics
**Evidence level:** C (Design heuristics — expert-derived, not experimentally derived)
**Type:** Design heuristics
**Origin:** Molich & Nielsen (1990); Nielsen & Molich (1990); Nielsen (1994)

---

## What These Heuristics Are

Nielsen's 10 heuristics emerged from analysis of usability problems and were refined through expert review processes. They are the most widely used set of usability evaluation criteria. They function as a structured vocabulary for identifying and classifying interface problems.

**They are heuristics — not laws.** They represent expert judgment distilled into reusable principles, not experimentally derived predictions.

---

## Heuristic 1: Visibility of System Status

> The design should always keep users informed about what is going on, through appropriate feedback within reasonable time.

### UI Rules
- Show feedback within 100ms for direct manipulation actions
- Show a loading state for operations that take longer than 1 second
- Communicate progress for operations > 3 seconds (progress bar, estimated time)
- Show success and error states explicitly
- Indicate the current page/location in navigation
- Show the current mode, filter, or selection state

### Anti-Patterns
❌ Silent form submission with no loading indicator
❌ Navigation with no active state indicator
❌ File uploads with no progress indication

---

## Heuristic 2: Match Between System and Real World

> The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal system terms.

### UI Rules
- Use user-facing terminology, not technical or internal vocabulary
- Use real-world metaphors where they aid understanding (folder, cart, inbox)
- Present information in the order users expect to encounter it
- Match the user's mental model of the domain (Layer 02-P06)
- Write labels, headings, and error messages in plain language

### Anti-Patterns
❌ Error code: "HTTP 403 Forbidden" shown to a non-technical user
❌ Labels: "Payload", "Entity", "Instance" in a consumer interface
❌ Date format: "2024-01-15T14:30:00Z" displayed without formatting

---

## Heuristic 3: User Control and Freedom

> Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended process.

### UI Rules
- Provide undo for all reversible actions
- Provide a "back" or "cancel" path from every non-destructive state
- Confirm before destructive/irreversible actions
- Allow users to exit multi-step processes without losing completed work (or with an explicit warning)
- Support browser back button in single-page applications

### Anti-Patterns
❌ Multi-step wizard with no way to cancel mid-flow
❌ Destructive action (delete, archive) with no undo
❌ Modal dialog with no close button and no Escape key support

---

## Heuristic 4: Consistency and Standards

> Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.

### UI Rules
- Use the same label for the same action throughout the interface
- Use platform-standard interaction patterns (e.g., tap to select, long-press for context menu)
- Maintain consistent visual treatment for the same type of element
- Follow industry conventions unless there is a clear improvement
- Use consistent terminology across UI, documentation, and error messages

### Anti-Patterns
❌ "Save", "Update", and "Confirm" used for the same action on different screens
❌ Blue underline used for both links and non-interactive highlighted text
❌ Left-to-right navigation on one page, right-to-left on another

---

## Heuristic 5: Error Prevention

> Good design carefully prevents a problem from occurring in the first place. Eliminate error-prone conditions or present users with a confirmation option.

*See Layer 05 — Error Prevention (L05-P05) for full detail.*

### UI Rules
- Validate progressively; show requirements before errors occur
- Constrain inputs to valid formats where possible
- Confirm before irreversible actions
- Disable actions that cannot succeed in the current state
- Use smart defaults to reduce error-prone input

---

## Heuristic 6: Recognition Rather Than Recall

> Minimize the user's memory load by making elements, actions, and options visible. Users should not have to remember information from one part of the interface to another.

*See Layer 02 — Recognition vs. Recall (L02-P04) for full detail.*

### UI Rules
- Show options rather than requiring users to type them from memory
- Display current state, selection, and context persistently
- Provide search suggestions and autocomplete
- Show recently used items
- Keep labels visible on all form fields (never remove labels on focus/fill)

---

## Heuristic 7: Flexibility and Efficiency of Use

> Accelerators — unseen by the novice user — may often speed up the interaction for the expert user. Allow users to tailor frequent actions.

### UI Rules
- Provide keyboard shortcuts for frequently used actions
- Support multiple interaction paths (mouse/touch/keyboard)
- Allow customization of frequent workflows
- Provide power-user features without burdening novice flows
- Consider command palettes for expert access to many functions

---

## Heuristic 8: Aesthetic and Minimalist Design

> Interfaces should not contain irrelevant or rarely needed information. Extra information competes with relevant information and diminishes its relative visibility.

*See Layer 02 — Cognitive Load (L02-P01) for the cognitive basis.*

### UI Rules
- Remove information that is not needed for the current task
- Do not show advanced options in default views if they are rarely used
- Avoid decorative elements that add visual noise without adding meaning
- Every element should earn its place on the screen
- Reduce visual competition between elements

### Qualification
This heuristic concerns information density and relevance — not visual style. A minimal-looking interface that hides essential information violates this heuristic. A "dense" interface that organizes information effectively does not.

---

## Heuristic 9: Help Users Recognize, Diagnose, and Recover from Errors

> Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.

*See Layer 05 — Error Recovery (L05-P06) for full detail.*

### UI Rules
- Write error messages in plain language
- Identify the specific problem
- Explain what the user should do to resolve it
- Place error messages near the problem location
- Do not display error codes to non-technical users

---

## Heuristic 10: Help and Documentation

> It is best if the system can be used without documentation, but it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large.

### UI Rules
- Design interfaces to minimize the need for documentation
- Provide contextual help (tooltips, inline instructions) near the point of need
- If a help system is needed, make it searchable and task-oriented
- Do not rely on documentation to compensate for poor UX
- Provide accessible help for complex or regulated workflows

---

## Sources

**Primary:**
- Molich, R., & Nielsen, J. (1990). Improving a human-computer dialogue. *Communications of the ACM*, 33(3), 338–348. DOI: 10.1145/77481.77486
- Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. *CHI '90 Proceedings*, 249–256. DOI: 10.1145/97243.97281
- Nielsen, J. (1994). *Usability Engineering*. Morgan Kaufmann.

**Last verified:** 2024-01-01
