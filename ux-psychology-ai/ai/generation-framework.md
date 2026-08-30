# AI UI Generation Framework

This document defines the step-by-step reasoning process an AI agent must execute before generating any interface element. It is derived from the system prompt and provides expanded guidance for each step.

---

## The Core Workflow

```
User Requirements
       ↓
User Goals
       ↓
User Context
       ↓
Task Analysis
       ↓
Cognitive / Perceptual Risk Assessment
       ↓
Information Architecture
       ↓
Principle Selection (contextual, not exhaustive)
       ↓
Interaction Design
       ↓
Visual Design
       ↓
Accessibility
       ↓
Motion
       ↓
Implementation
       ↓
UX Audit
       ↓
Accessibility Audit
       ↓
Iteration
```

---

## Phase 1: Requirements and Context

### 1.1 User Requirements Parsing

Transform the input request into structured requirements:

```
INTERFACE TYPE: [form / dashboard / navigation / onboarding / content / other]
USER TASK: [one sentence: the user wants to X in order to Y]
USER TYPE: [novice / intermediate / expert / mixed]
DEVICE CONTEXT: [desktop / mobile / both / unknown]
USE CONTEXT: [high-focus / distracted / high-stakes / casual]
FREQUENCY: [daily / occasional / one-time]
```

### 1.2 User Goals

Separate goals by priority:

```
PRIMARY GOAL: What the user fundamentally needs to accomplish
SECONDARY GOALS: What else the user may want to accomplish simultaneously
TERMINAL GOALS: The underlying objective behind the task goal
```

### 1.3 Risk Assessment

Identify which of these risks apply:

| Risk Category | Relevant Principles |
|---|---|
| High cognitive load | L02-P01 Cognitive Load, L02-P03 Chunking |
| Complex decisions | L03-P01 Hick-Hyman, L03-P02 Choice Overload |
| Error-prone input | L05-P05 Error Prevention, L06-P05 Heuristic 5 |
| Irreversible actions | L06-P03 User Control, L05-P06 Error Recovery |
| Attention management | L04-P01 Selective Attention, L04-P03 Change Blindness |
| Motor accessibility | L05-P01 Fitts's Law, L07 Operable |
| Cognitive accessibility | L07 Cognitive Accessibility |

---

## Phase 2: Information Architecture

### 2.1 Content Inventory

List all information elements required for the user's task. Then:

1. Identify which elements are **required** for task completion
2. Identify which are **supporting** (help text, context, labels)
3. Identify which are **optional** or rarely needed → candidates for progressive disclosure
4. Identify which elements **relate to each other** → candidates for grouping

### 2.2 Hierarchy Assignment

Assign each element to a hierarchy level:
- **Level 1**: Primary action or most important information — 1 per view
- **Level 2**: Secondary actions or important context — 2–4 per view
- **Level 3**: Supporting information and tertiary actions
- **Level 4**: Optional, metadata, help text

### 2.3 Grouping

Apply grouping principles:
- Proximity (L01-P01): elements that must be read or used together
- Common Region (L01-P03): elements that form a logical section
- Similarity (L01-P02): elements of the same type

---

## Phase 3: Principle Selection

### Selection Criteria

For each available UX principle, evaluate:

1. **Does this user's task have the conditions this principle addresses?**
2. **Is the risk this principle mitigates present in this design?**
3. **Can this principle be applied without conflicting with a higher-priority principle?**

### Contextual Examples

**For a checkout form:**
- ✅ Cognitive Load — high complexity, many fields
- ✅ Error Prevention — financial transaction, high consequence
- ✅ Serial Position Effect — CTA placement
- ✅ Loss Aversion — abandonment prevention
- ❌ Goal-Gradient Effect — may not apply if only 1–2 steps
- ❌ Von Restorff — low relevance to form field design

**For a data dashboard:**
- ✅ Selective Attention — multiple data points competing
- ✅ Change Blindness — live data updates
- ✅ Chunking — information density management
- ✅ Visual Hierarchy — most important metrics must be primary
- ❌ Endowed Progress — not a task-completion context

---

## Phase 4: Interaction Design

For every interactive element, define:

### Interaction Specification Template

```
COMPONENT: [name]
TYPE: [button / input / dropdown / toggle / etc.]
PURPOSE: [what it does]

STATES:
  default: [visual description]
  hover: [visual change + duration]
  focus: [focus indicator description]
  active: [press state]
  loading: [if applicable]
  success: [if applicable]
  error: [if applicable]
  disabled: [if applicable]

MOTION:
  enter: [animation if element appears]
  transition: [animation on state change]
  exit: [animation if element disappears]
  reduced-motion: [alternative]

ACCESSIBILITY:
  element: [semantic HTML element]
  accessible-name: [how it is labeled]
  role: [if custom]
  states: [ARIA states]
```

---

## Phase 5: Visual Design

### Typography System

Define a typographic scale appropriate to the context:

```
Scale: [defined rem values — e.g., 0.75 / 0.875 / 1 / 1.125 / 1.25 / 1.5 / 2 / 2.5]
Weights: [regular=400, medium=500, semibold=600, bold=700]

H1: [scale-value], [weight], [contrast-level]
H2: [scale-value], [weight], [contrast-level]
Body: [scale-value], [weight], [contrast-level]
Caption: [scale-value], [weight], [contrast-level]
```

### Color Usage

```
Primary action: [color] — highest salience, used for ONE primary action per view
Secondary action: [color] — lower salience, clear visual distinction from primary
Destructive: [color, typically red family] — distinct from primary
Text/primary: [color] — must meet 4.5:1 against background
Text/secondary: [color] — must meet 4.5:1 against background
Text/disabled: [color] — no contrast requirement but must be perceivably different
Error: [color] — must be reinforced with non-color indicator (icon/text)
Success: [color] — must be reinforced with non-color indicator
```

---

## Phase 6: Accessibility Verification

Before finalizing, verify each of these:

```
□ All interactive elements are keyboard-accessible
□ Tab order matches reading order
□ Focus indicators are visible (WCAG 2.4.7 / 2.4.11)
□ All interactive elements have accessible names (4.1.2)
□ Contrast meets 1.4.3 (text) and 1.4.11 (components)
□ No color-only information (1.4.1)
□ Error messages identify problem and suggest correction (3.3.1 / 3.3.3)
□ Required fields identified (3.3.2)
□ ARIA roles and states are correct and necessary
□ Status messages use aria-live or role="alert" (4.1.3)
□ Touch targets meet minimum size (2.5.8)
□ Reduced motion alternative is defined
□ Language is set (3.1.1)
```

---

## Phase 7: Motion Verification

For each animation in the design:

```
□ What does this motion communicate? (must answer at least one motion taxonomy question)
□ Is the duration ≤ 500ms for interactive feedback?
□ Is the easing curve appropriate (ease-out for entry, ease-in for exit)?
□ Is there a prefers-reduced-motion alternative?
□ Is the motion interruptible?
□ Does the motion conflict with any accessibility requirement?
```

---

## Output Format

The AI should produce:

1. **UX reasoning** — Completed Phase 1–3 analysis
2. **Interaction specification** — Phase 4 component definitions
3. **Visual system** — Phase 5 design tokens
4. **Implementation** — Semantic HTML, CSS (states and motion), ARIA
5. **Audit results** — Audit framework results with any violations identified and addressed

---

## Reference

- System prompt: `ai/system-prompt.md`
- Audit framework: `ai/audit-framework.md`
- Prompt templates: `ai/prompts/ui-generation.md`
- Layers 01–08 for principle reference
