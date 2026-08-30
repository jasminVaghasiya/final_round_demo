# L02-P02 & L02-P03 — Working Memory and Chunking

**Layer:** 02-cognitive-psychology
**Evidence level:** A (Working Memory) / B (Chunking as design strategy)
**Type:** Empirical phenomenon / Cognitive design strategy
**Domain:** Memory, information processing

---

## Working Memory (L02-P02)

### Definition
Working memory is the cognitive system responsible for temporarily holding and manipulating a limited amount of information while performing a mental task.

### Research Basis
Working memory as a construct has extensive empirical support. Baddeley and Hitch (1974) proposed the influential multi-component model. Research on capacity limits suggests approximately 4±1 chunks for novel, unrelated items in typical adults (Cowan, 2001), though capacity varies by item complexity, familiarity, and individual differences.

**Important correction:** The popular "7±2 items" rule derives from Miller (1956), who was describing limits on information transmission, not a hard limit on menu items. Modern research (Cowan, 2001) suggests a more conservative estimate of approximately 3–4 chunks for complex, unrelated items. Neither should be mechanically applied as a design rule.

### UI Implications
1. **Do not require users to hold information in working memory across navigation.** Surfacing context at each step — "You are editing: Invoice #2024-1045" — eliminates working memory demand.
2. **Do not present multiple pieces of information that must be mentally combined.** Show the combined result.
3. **Reduce the number of decisions required within a single screen.** Each unresolved choice occupies working memory.

---

## Chunking (L02-P03)

### Definition
Chunking is the organization of individual information elements into meaningful groups that can be processed as a single unit, effectively expanding the functional capacity of working memory.

### Research Basis
The concept of chunking was explored extensively in memory research (Miller, 1956; Chase & Simon, 1973). Chase and Simon's research on chess expertise demonstrated that experts perceive chess positions as meaningful chunks rather than individual pieces — a key insight about how domain knowledge reorganizes memory.

### Why Chunking Matters
The functional limit of working memory is not on individual items but on **chunks**. A meaningful chunk can contain multiple items of related information. This is why grouping interface information meaningfully — not just reducing it — is the correct design response to working memory limitations.

### UI Implications
1. **Organize forms into named sections.** "Account", "Contact", "Payment" sections reduce the form from 20 fields to 3 chunks.
2. **Format structured data consistently.** Phone numbers (555-867-5309), credit card numbers (4111 1111 1111 1111), and account numbers (UK12 3456 7890 1234) chunk digit sequences into meaningful units.
3. **Group navigation items into categories.** 3 categories of 4 items is cognitively lighter than 12 equal items.
4. **Use headings, dividers, and visual grouping to create chunks** — not just fewer items.
5. **Do not chunk arbitrarily.** Groups must be semantically meaningful. Arbitrary visual separation without meaningful grouping does not create genuine chunks.

### Anti-Patterns
❌ Splitting a 12-item navigation into 3 arbitrary groups of 4 without meaningful categories — the grouping provides visual separation but no semantic chunking benefit.

❌ Formatting a credit card number as 16 continuous digits — unchunked number strings are significantly harder to verify.

❌ Presenting a multi-attribute comparison table without column grouping — users must hold all attributes in memory simultaneously.

---

## Exceptions and Limitations

- Working memory capacity varies significantly with: age (generally declines), anxiety, distraction, fatigue, domain expertise.
- Chunking is most beneficial when users are unfamiliar with content. Expert users have chunked knowledge in long-term memory that effectively bypasses working memory limits for domain-specific content.
- Chunking via grouping does not substitute for chunking via meaning. Visual containers without semantic relationships do not create genuine memory chunks.

---

## Accessibility Considerations

- Chunking supports cognitive accessibility and plain language comprehension. (WCAG 3.1 Readable)
- Structured identifiers (chunked phone numbers, account numbers) must also be read correctly by screen readers — ensure the formatting does not cause garbled reading.
- Users with cognitive disabilities particularly benefit from chunked, step-by-step presentation. (W3C Cognitive Accessibility Guidance)

---

## Sources

**Primary:**
- Baddeley, A. D., & Hitch, G. J. (1974). Working memory. In G. H. Bower (Ed.), *The Psychology of Learning and Motivation* (Vol. 8, pp. 47–89).
- Miller, G. A. (1956). The magical number seven, plus or minus two. *Psychological Review*, 63(2), 81–97. DOI: 10.1037/h0043158
- Cowan, N. (2001). The magical number 4 in short-term memory. *Behavioral and Brain Sciences*, 24(1), 87–114. DOI: 10.1017/S0140525X01003922
- Chase, W. G., & Simon, H. A. (1973). Perception in chess. *Cognitive Psychology*, 4(1), 55–81.

**Last verified:** 2024-01-01
