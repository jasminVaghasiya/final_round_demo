# Contributing to ux-psychology-ai

---

## Core Rules

### 1. Never fabricate sources

Do not invent author names, paper titles, DOIs, URLs, statistics, or research conclusions.
If you cannot find a primary source, use evidence level E and note the uncertainty explicitly.

### 2. Assign accurate evidence levels

| Level | When to use |
|---|---|
| **A** | Multiple replicated experiments or meta-analyses support the claim |
| **B** | At least one peer-reviewed empirical study, or strong theoretical grounding |
| **C** | Established practice from expert usability research without direct experimental proof |
| **D** | Widely repeated UX claim that simplifies or extrapolates from research |
| **E** | Contested, context-limited, anecdotal, or unclear evidence |

When uncertain, use E rather than overstating confidence.

### 3. Distinguish types of claims

| Type | Example |
|---|---|
| Empirical law | Fitts's Law — quantitative, predictive, replicated |
| Empirical effect | Aesthetic–Usability Effect — demonstrated, bounded |
| Cognitive theory | Cognitive Load Theory — theoretical framework with empirical basis |
| Design heuristic | Nielsen's 10 heuristics — expert-derived principles |
| Popular UX shorthand | "7±2 items" — oversimplified from Miller's research |

Do not label a heuristic as a "law." Do not label popular shorthand as "established research."

### 4. Every principle must be actionable

A principle that cannot be translated into interface guidance has no place here.
Every principle must contain concrete UI implications: what to do, what not to do, when it applies.

### 5. Accessibility is not optional

Every layer cross-references accessibility. Do not add a principle without addressing its accessibility implications.

### 6. Motion must have purpose

Only recommend animation that communicates information, confirms state, or assists spatial reasoning.

---

## Adding a New Principle

1. Choose the correct layer (01–08)
2. Copy `schemas/principle.schema.yaml` as your template
3. Fill every required field — do not leave evidence or sources blank
4. Assign an accurate evidence level
5. Cite primary sources where they exist; never fabricate
6. Add cross-references to related principles
7. Add the principle to the layer README index table

---

## Adding a Pattern

Each pattern in `patterns/` must explain:
1. **User goal** — what the user is trying to accomplish
2. **When to use** — the context this pattern fits
3. **Structure** — information architecture and layout guidance
4. **Relevant UX principles** — linked to specific principle files
5. **Accessibility** — specific requirements for this pattern
6. **Interaction states** — all states this pattern can be in
7. **Motion** — any animation guidance
8. **Common mistakes** — what designers typically get wrong

---

## Research Quality Standards

Priority order:
1. Original peer-reviewed empirical research
2. Official standards (WCAG, WAI-ARIA, ISO)
3. Academic books with citation trails
4. Reputable UX research organizations (research reports, not blog posts)
5. Secondary sources only when no primary source is available

Do not cite blog posts, vendor marketing, or undated/anonymous content as primary evidence.

---

## File Format

- All files are Markdown (`.md`) except the YAML schema
- Use ATX headings (`#`, `##`, `###`)
- Use tables for structured comparisons
- Use code blocks for examples
- Sentence case for headings

---

## What Not to Add

- Principles that duplicate existing entries
- Principles without actionable UI implication
- Principles sourced only from blog posts
- Animations recommended purely for aesthetic reasons
- Accessibility guidance not grounded in WCAG or established practice
