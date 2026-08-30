# L02-P06 — Mental Models

**Layer:** 02-cognitive-psychology
**Evidence level:** B
**Type:** Cognitive theory
**Domain:** Cognition, human-computer interaction

---

## Definition

A mental model is an internal, simplified representation of how a system works that a user maintains in memory. Users interact with interfaces based on their mental models, not the system's actual design — when the two diverge, errors and frustration result.

---

## Research Basis

Mental model research in HCI is grounded in cognitive psychology, particularly the work of Johnson-Laird (1983) on mental models and Norman's application of the concept to design (1988). The concept has broad empirical support in cognitive science and has been extensively studied in HCI contexts.

**Evidence level B:** Well-established theoretical concept with strong empirical grounding in cognitive science and HCI.

---

## Why It Matters

Users arrive at an interface with pre-existing expectations about how systems work, drawn from previous software experience, physical world analogies, and learned conventions. When an interface violates these expectations, users must construct a new mental model — a cognitively expensive process that increases error rates and reduces satisfaction.

---

## When to Apply

- Evaluating whether an interaction pattern matches user expectations
- Designing navigation architecture
- Designing file management, settings, and account systems
- Evaluating the appropriateness of metaphors used in the interface
- Planning new interaction paradigms

---

## UI Implications

1. **Design with dominant mental models in mind.** If 90% of users expect a settings icon to open a settings panel, violating that expectation has a high cost.
2. **Do not introduce novel interaction metaphors without strong user value.** The cognitive cost of building a new mental model must be justified by the benefit.
3. **Make the system model match the user model as closely as possible.** The more the interface structure corresponds to how users think about the domain, the lower the mental model gap.
4. **Use familiar labels and terminology.** Domain-specific jargon creates mental model gaps for non-expert users.
5. **Provide conceptual models through onboarding when necessary.** When a system has no obvious analog, explain the conceptual structure explicitly.
6. **Jakob's Law** (L06): Most time users spend on other interfaces. Design to match dominant conventions rather than innovate unnecessarily.

---

## Anti-Patterns

❌ Designing a file system with non-hierarchical structure when users have a strong hierarchical folder mental model.

❌ Using different terminology for the same concept across different parts of the interface — "Account", "Profile", "User Settings" for the same destination.

❌ Violating the mental model of destructive actions (trash → permanently deletes immediately, not after confirmation).

---

## Exceptions and Limitations

- Mental models are not universal. Novice and expert users, users from different cultural backgrounds, and users of different ages may have significantly different mental models.
- Existing mental models can be wrong. If the domain is new to users (blockchain wallets, AI systems), there may be no stable pre-existing mental model to match.
- Some innovation requires deliberately reshaping mental models. When doing so, invest in clear explanation and progressive onboarding.

---

## Accessibility Considerations

- Consistent navigation and predictable behavior reduce the cognitive load of model-building for users with cognitive disabilities. (WCAG 3.2 Predictable)
- Terminology and conceptual complexity should be accessible. (WCAG 3.1 Readable)

---

## Related Principles

- L06-P07 Jakob's Law — Interfaces should match the mental models users have formed from other interfaces
- L06-P04 Consistency and Standards — Consistency reinforces mental model formation
- L02-P01 Cognitive Load — Mental model mismatch increases cognitive load

---

## Sources

**Primary:**
- Johnson-Laird, P. N. (1983). *Mental Models*. Harvard University Press.
- Norman, D. A. (1988). *The Design of Everyday Things*. Basic Books.

**Last verified:** 2024-01-01
