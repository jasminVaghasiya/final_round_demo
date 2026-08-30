# L03-P01 — Hick–Hyman Law

**Layer:** 03-decision-psychology
**Evidence level:** A
**Type:** Empirical law
**Domain:** Choice reaction time, decision-making

---

## Definition

Choice reaction time increases logarithmically with the number of equally probable, equally familiar alternatives from which a selection must be made.

---

## Research Basis

W. E. Hick (1952) and R. Hyman (1953) independently published experiments demonstrating that reaction time in choice tasks is a logarithmic function of the number of stimulus-response alternatives. The mathematical relationship describes information-theoretic uncertainty (measured in bits) and response time.

**Hick's formulation:**
`RT = b × log₂(n + 1)`
where RT = reaction time, n = number of equally probable alternatives, b = empirically determined constant.

**Evidence level A:** One of the most replicated findings in experimental psychology. Original experiments are well-documented and the logarithmic relationship has been reproduced extensively.

---

## Critical Qualification

**The Hick–Hyman Law describes a specific experimental condition:**
- Equally probable alternatives
- Equally familiar alternatives
- Simple choice reaction tasks

Real interface navigation does not typically satisfy these conditions. Users:
- Have unequal familiarity with options
- Use search strategies and visual scanning rather than uniform sampling
- Have option probabilities shaped by prior experience
- Benefit from hierarchical organization that reduces effective choice set

**Therefore:** Hick–Hyman does not justify a maximum menu item count. It does support the general principle that reducing the effective choice set for a given decision reduces decision time — with the important caveat that how choices are organized matters more than raw count.

---

## Why It Matters

As the number of independent, equally unfamiliar choices increases, the time to decide increases. For users in a hurry, in stress, or with cognitive impairments, high choice counts increase error rates and abandonment — even if each individual choice is simple.

---

## UI Implications

1. **Reduce the effective number of independent choices per decision.** Not total features, but the number of unfamiliar options a user must distinguish between at each decision point.
2. **Use hierarchy to reduce per-level choice count.** Navigation systems that organize many destinations into a few top-level categories reduce choice count at the first level.
3. **Make the most probable choice visually prominent.** Reducing visual search for the likely choice reduces effective decision time even without reducing item count.
4. **Separate frequently used from rarely used options.** Surfacing the 20% of options used 80% of the time reduces effective choice count for typical use.
5. **Do not mechanically limit menus to 7 items.** This misapplies both Hick–Hyman and Miller. The relevant variable is cognitive distinctiveness, not raw count.

---

## Anti-Patterns

❌ A navigation menu with 20 equally weighted items with no visual grouping or hierarchy — effective choice count is high.

❌ A settings screen with 50 equally prominent options — violates the priority of reducing per-decision choice count.

❌ Citing Hick's Law to justify removing features that are frequently needed by users — reduced count without prioritization does not reduce decision difficulty.

---

## Exceptions and Limitations

- Hick–Hyman specifically models choice reaction time. Browsing, exploring, and scanning interfaces do not follow simple choice reaction models.
- Familiarity strongly modulates the effect. Familiar items are responded to faster regardless of set size.
- Sequential presentation or search reduces effective choice size below the visible set count.

---

## Accessibility Considerations

- Users with cognitive disabilities, anxiety, or processing speed differences may experience stronger effects from high choice counts. Reducing effective choice count supports cognitive accessibility.
- Users who navigate by keyboard must traverse items sequentially — order and grouping matter significantly for keyboard navigation efficiency.

---

## Sources

**Primary:**
- Hick, W. E. (1952). On the rate of gain of information. *Quarterly Journal of Experimental Psychology*, 4(1), 11–26. DOI: 10.1080/17470215208416600
- Hyman, R. (1953). Stimulus information as a determinant of reaction time. *Journal of Experimental Psychology*, 45(3), 188–196. DOI: 10.1037/h0056940

**Last verified:** 2024-01-01
