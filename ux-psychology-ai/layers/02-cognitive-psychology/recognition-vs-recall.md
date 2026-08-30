# L02-P04 — Recognition vs. Recall

**Layer:** 02-cognitive-psychology
**Evidence level:** A
**Type:** Empirical phenomenon
**Domain:** Memory, cognitive psychology

---

## Definition

Recognition is identifying a correct item when it is presented; recall is retrieving information from memory without a prompt. Recognition is significantly easier than recall and is the interaction mode that well-designed interfaces should prefer.

---

## Research Basis

The recognition–recall distinction is one of the most robust findings in memory research. Recognition memory consistently outperforms recall memory in experimental studies. The superiority of recognition over recall was established by decades of cognitive psychology research and is directly applicable to interface interaction design.

**Evidence level A:** Exceptionally well-supported by memory research.

---

## Why It Matters

Every time an interface forces users to recall information — a command, a keyboard shortcut, a previously chosen setting, an account number — it imposes memory load and risk of error. Every time an interface presents options that users can recognize, it reduces that load. The difference in error rates and task completion between recall and recognition interfaces is large.

---

## UI Implications

1. **Show relevant options rather than requiring users to type them from memory.** Autocomplete, dropdowns, and contextual suggestions convert recall to recognition.
2. **Display previous selections and history.** Recently used items, saved searches, and recent files eliminate recall demand.
3. **Show current state, not just the ability to change it.** If a filter is active, display what filter is active — do not require the user to recall what they set.
4. **Use meaningful, descriptive labels on all controls.** Icon-only interfaces without labels force recall of icon meanings.
5. **Provide preview of consequences.** Before a destructive action, show what will be deleted — the user recognizes rather than recalls the impact.
6. **Persist user choices.** Form defaults from previous sessions, remembered preferences, and saved configurations eliminate repeated recall demand.

---

## Anti-Patterns

❌ Command-line-style interfaces exposed to non-expert users without command discovery mechanisms.

❌ Icon-only toolbars with no tooltips or visible labels — users must recall each icon's function.

❌ Search interfaces that return no suggestions and no error correction — users must recall exact query terms.

❌ Confirmation dialogs that say "Are you sure?" without identifying what will be deleted/lost.

---

## Exceptions and Limitations

- Recall-based interaction (keyboard shortcuts, command palettes) is appropriate for expert users who have already converted learned shortcuts into long-term memory. Providing both modes is correct: recognition for novices, recall shortcuts for experts.
- Recognition itself can be degraded by poor labeling. An option labeled "Optimize data payload transmission parameters" requires interpretation even if the option is visible.

---

## Accessibility Considerations

- Recognition-based interfaces support cognitive accessibility for users with memory impairments. (WCAG 3.3.7 Redundant Entry, WCAG 2.2; WCAG 3.3.5 Help)
- Autocomplete and suggestions must be keyboard-accessible and work with screen readers. (WCAG 4.1.2 Name, Role, Value; ARIA combobox pattern)

---

## Related Principles

- L02-P01 Cognitive Load — Recall increases cognitive load; recognition reduces it
- L06-P06 Recognition Rather Than Recall — Nielsen Heuristic 6 is a direct application of this principle
- L05-P03 Affordances — Visible affordances enable recognition of interactive possibility
- L04-P04 Information Scent — Information scent helps users recognize relevant navigation paths

---

## Sources

**Primary:**
- Tulving, E., & Thomson, D. M. (1973). Encoding specificity and retrieval processes in episodic memory. *Psychological Review*, 80(5), 352–373.

**Secondary:**
- Norman, D. A. (1988). *The Design of Everyday Things*. Basic Books. (Chapter 3: Knowledge in the Head and Knowledge in the World.)

**Last verified:** 2024-01-01
