# L02-P01 — Cognitive Load

**Layer:** 02-cognitive-psychology
**Evidence level:** B
**Type:** Cognitive theory
**Domain:** Cognition, working memory, information processing

---

## Definition

Cognitive load is the total mental effort required to process, understand, and operate an interface at any given moment. When cognitive load exceeds working memory capacity, comprehension fails, errors increase, and user satisfaction decreases.

---

## Research Basis

Cognitive Load Theory was developed by John Sweller (1988) in educational psychology. It describes how the limited capacity of working memory is distributed across different types of mental work. The framework has substantial empirical support in educational research.

**Important qualification:** The three-type classification (intrinsic, extraneous, germane) was developed for learning contexts. Its direct application to interface design requires interpretation. Cognitive load as a general concept — that mental work has limits — is robustly supported. The specific three-way classification should be applied cautiously in UX contexts.

**Evidence level B:** Strong theoretical and empirical basis from cognitive science; the direct mapping to UI design is established practice rather than experimentally validated in that form.

---

## Why It Matters

Every interface interaction consumes cognitive resources. When those resources are exhausted by irrelevant complexity — poor layout, unclear labels, forced recall, ambiguous status — users cannot devote attention to the actual task. High extraneous cognitive load increases errors, reduces task completion, and degrades user satisfaction.

---

## Three Load Types (Interpreted for UX)

### Intrinsic load
Complexity inherent to the task itself. A tax calculator is inherently more complex than a simple search.

*Design response:* You cannot eliminate intrinsic load. Match your interface's complexity to the task's actual complexity.

### Extraneous load
Complexity introduced by how the interface presents information — not by the task itself.

*Design response:* This is always reducible. Poor layout, unclear hierarchy, inconsistent interaction patterns, and unnecessary choices all add extraneous load.

### Germane load
Mental effort devoted to building useful understanding or skill.

*Design response:* Some germane load is productive for power users learning a complex tool. Excessive germane load in simple consumer applications indicates poor design.

---

## When to Apply

- Evaluating complex forms, settings, and configuration screens
- Designing dashboards with high information density
- Creating onboarding experiences for complex products
- Any screen where task error rates are high
- Any screen where users report confusion or frustration

---

## UI Implications

1. **Reduce extraneous load first.** Clarify labels, improve hierarchy, remove redundant information, and simplify layout before adding onboarding tutorials or tooltips.
2. **Do not require users to remember information across screens.** Display relevant context on the current screen. ("You selected 3 items" at the top of a confirmation step eliminates recall demand.)
3. **Do not make users mentally transform or calculate.** Show calculated results, not inputs that require calculation. ("$45 off" not "15% of your $300 total.")
4. **Group related information.** Chunking reduces the number of working memory units required.
5. **Expose system status.** Users tracking mental state ("what mode is this in?") spend cognitive resources that should go to the task.
6. **Use recognition instead of recall.** Offer selections rather than requiring entry from memory.

---

## Anti-Patterns

❌ Requiring users to copy information from one step of a flow and paste it into another.

❌ Long, dense forms without section grouping — all fields feel equally important with no processing order.

❌ Error messages that describe what went wrong technically rather than what the user should do next.

❌ Progress indicators that do not show current step — users must track position mentally.

---

## Exceptions and Limitations

- Some cognitive load is intentional in security contexts (e.g., CAPTCHA, confirmation dialogs for destructive actions). Friction that prevents errors is not always a design failure.
- Expert users have higher effective working memory capacity for domain-specific information due to chunked long-term memory. Interfaces designed for experts can present more density.
- Cognitive load varies significantly across users, contexts, and concurrent demands (stress, multitasking, interruption).

---

## Accessibility Considerations

- High cognitive load disproportionately affects users with cognitive disabilities, attention-related conditions, and anxiety. Cognitive accessibility is not a separate category — it is the outcome of reducing cognitive load. (WCAG 3.1 Readable; WCAG 3.3 Input Assistance)
- Plain language, clear labeling, and error prevention reduce cognitive load for all users and are especially important for users with cognitive disabilities.
- The Cognitive Accessibility Guidance from W3C (COGA) provides extended guidance beyond WCAG. (See `layers/07-accessibility/cognitive-accessibility.md`)

---

## Related Principles

- L02-P02 Working Memory — Cognitive load is constrained by working memory capacity
- L02-P03 Chunking — Primary strategy for reducing extraneous cognitive load
- L02-P04 Recognition vs. Recall — Recognition-based interaction reduces recall load
- L06-P08 Aesthetic and Minimalist Design — Reduces extraneous cognitive load
- L06-P06 Recognition Rather Than Recall — Direct heuristic derived from cognitive load reduction

---

## Sources

**Primary:**
- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science*, 12(2), 257–285. DOI: 10.1207/s15516709cog1202_4

**Secondary:**
- Paas, F., Renkl, A., & Sweller, J. (2003). Cognitive load theory and instructional design: Recent developments. *Educational Psychologist*, 38(1), 1–4.
- van Merriënboer, J. J. G., & Sweller, J. (2005). Cognitive load theory and complex learning: Recent developments and future directions. *Educational Psychology Review*, 17(2), 147–177.

**Last verified:** 2024-01-01
