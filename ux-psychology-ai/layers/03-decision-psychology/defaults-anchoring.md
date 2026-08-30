# L03-P03 & L03-P06 — Default Effect and Anchoring

---

## Default Effect (L03-P03)

**Evidence level:** A | **Type:** Empirical effect | **Domain:** Choice behavior, behavioral economics

### Definition
People disproportionately retain pre-selected options (defaults) even when they have the ability and opportunity to change them. The default option has an outsized influence on final choices.

### Research Basis
The default effect has been demonstrated across multiple domains including organ donation rates (Johnson & Goldstein, 2003), retirement savings (Madrian & Shea, 2001), and consumer choice. It is one of the most replicated findings in behavioral economics.

### Why It Matters
Default settings in interfaces are not neutral. They represent a choice the designer makes on behalf of the user. The majority of users will never change defaults. Therefore, defaults encode policy decisions with large real-world consequences.

### UI Implications
1. **Design defaults for the majority use case.** The default must serve most users well, not just avoid harm.
2. **Do not use defaults to steer users toward options that benefit the product at the user's expense.** Pre-checked newsletter subscriptions, data-sharing opt-outs, and auto-renewal defaults are ethically problematic applications of the default effect.
3. **Make changing defaults easy and discoverable.** Users who want non-default options must be able to find and change them.
4. **Document why each default was chosen.** Defaults should be deliberate design decisions, not arbitrary.
5. **Review defaults for accessibility implications.** Default font size, contrast mode, and motion settings should not disadvantage users with disabilities.

### Anti-Patterns
❌ Pre-checking a marketing email subscription checkbox — exploits the default effect to benefit the product at the user's expense.

❌ Setting a high-cost subscription tier as the default selection — default does not serve most users' interests.

❌ "Opt-out by default" data sharing — ethically problematic application of the default effect.

---

## Anchoring (L03-P06)

**Evidence level:** A | **Type:** Empirical effect | **Domain:** Judgment and decision-making

### Definition
When making numerical estimates or judgments, people are disproportionately influenced by an initially presented value (the anchor), adjusting insufficiently from it.

### Research Basis
Anchoring was demonstrated by Tversky and Kahneman (1974) in their influential work on heuristics and biases. It has been replicated extensively and is considered one of the most robust cognitive biases.

### UI Implications
1. **Pricing pages use anchors.** Presenting a high-priced tier first establishes an anchor that makes lower tiers seem more reasonable.
2. **Initial form field values function as anchors.** A suggested donation amount anchors user contributions. Design these deliberately.
3. **Progress indicators anchor perceived effort.** A progress bar starting at 10% (not 0%) creates a more positive anchor for task completion.
4. **Comparison tables are anchored by column order.** The leftmost or most prominent column anchors evaluation.
5. **Use anchoring ethically.** Anchors should set reasonable expectations, not manipulate users into suboptimal choices.

### Anti-Patterns
❌ Pre-filling a donation amount 10× higher than the typical donation to inflate contributions — manipulation rather than assistance.

❌ Showing an inflated "original price" next to a "sale price" without accurate pricing history — deceptive anchor.

---

## Sources

**Default Effect:**
- Johnson, E. J., & Goldstein, D. G. (2003). Do defaults save lives? *Science*, 302(5649), 1338–1339. DOI: 10.1126/science.1091721
- Madrian, B. C., & Shea, D. F. (2001). The power of suggestion: Inertia in 401(k) participation and savings behavior. *Quarterly Journal of Economics*, 116(4), 1149–1187.

**Anchoring:**
- Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. *Science*, 185(4157), 1124–1131. DOI: 10.1126/science.185.4157.1124

**Last verified:** 2024-01-01
