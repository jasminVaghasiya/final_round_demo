# UX Psychology AI — Knowledge Repository

**A 3-level knowledge system for psychologically-informed, accessible UI design.**

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    AI REQUEST                       │
└──────────────────────┬──────────────────────────────┘
                       │
          ┌────────────▼────────────┐
          │      LEVEL 1 — CORE     │  ← Load every request
          │  core/principles.yaml   │    ~100 lines
          │  core/decision-engine.yaml  ~120 lines
          │  core/evidence-levels.yaml  ~40 lines
          │  ai/core.md             │    ~100 lines
          └────────────┬────────────┘
                       │
                 CLASSIFY TASK
                       │
         ┌─────────────┼──────────────┐
         ▼             ▼              ▼
       forms        dashboard      motion
         │             │              │
         └─────────────┼──────────────┘
                       ▼
          ┌────────────▼────────────┐
          │    LEVEL 2 — KNOWLEDGE  │  ← Load task-relevant files only
          │  knowledge/psychology.yaml  perception, cognition, decision
          │  knowledge/ui.yaml          layout, color, typography
          │  knowledge/interaction.yaml forms, states, keyboard
          │  knowledge/motion.yaml      animation decision matrix
          │  knowledge/accessibility.yaml WCAG compact reference
          │  knowledge/development.yaml HTML/CSS/ARIA patterns
          │  patterns-yaml/components.yaml
          │  patterns-yaml/animations.yaml
          │  patterns-yaml/websites.yaml
          └────────────┬────────────┘
                       │
          ┌────────────▼────────────┐
          │  LEVEL 3 — RESEARCH     │  ← Load only for deep reference
          │  layers/01-08/          │    Full principle documents
          │  research/              │    Primary sources + citations
          │  patterns/              │    Verbose pattern guides
          │  ui/                    │    Full UI documentation
          │  checklists/            │    Human-facing checklists
          └─────────────────────────┘
```

**Typical AI context per request:**

| Component | Lines |
|---|---|
| Level 1 — Core (always) | ~360 |
| Level 2 — Task-relevant (2–4 files) | ~200–600 |
| **Total runtime context** | **~560–960 lines** |
| Research/evidence (on demand) | Unlimited |

---

## Quick Start for AI Agents

**Minimal setup — load these 4 files for every request:**
1. `core/principles.yaml` — all principles as compact IDs + rules
2. `core/decision-engine.yaml` — task classification + principle routing
3. `core/evidence-levels.yaml` — evidence classification
4. `ai/core.md` — reasoning sequence + context loading map

Then follow the decision engine to load task-specific knowledge files.

---

## Directory Map

| Directory | Purpose | Load |
|---|---|---|
| `core/` | Compact principle index, decision engine, evidence system | Always |
| `knowledge/` | Compact domain YAML — AI runtime rules | Task-specific |
| `patterns-yaml/` | Compact component + animation + page patterns | Task-specific |
| `ai/` | System prompt, generation templates, audit checklist | Always (core.md); on demand |
| `layers/01–08/` | Full principle documentation with research | Deep reference |
| `patterns/` | Verbose pattern guides | Deep reference |
| `ui/` | Full UI system documentation | Deep reference |
| `research/` | Primary sources, books, standards | Citation lookup |
| `checklists/` | Human-facing QA checklists | Pre-release review |
| `schemas/` | YAML schema for principle files | Contributing |

---

**A Human-Centered UI/UX Knowledge System for Designers, Developers, and AI Agents**

---

## What This Repository Is

`ux-psychology-ai` is an evidence-backed knowledge system for designing software and web interfaces that are:

- Psychologically informed
- Cognitively accessible
- Interaction-sound
- Visually coherent
- Accessibility-compliant
- Motion-purposeful

It is **not** a list of "UX laws" copied from the internet.

It is a structured repository of principles drawn from peer-reviewed research, established standards, and expert practice — classified by evidence level, translated into actionable interface guidance, and organized to assist both human practitioners and AI design agents.

---

## Who This Is For

| Audience | How to use this repository |
|---|---|
| **UX Designers** | Use layers 01–06 to ground design decisions in research |
| **Frontend Developers** | Use layers 05, 07, 08 and the `ui/` and `patterns/` directories |
| **AI Coding Agents** | Follow `ai/generation-framework.md` before generating any UI |
| **Accessibility Specialists** | Use layer 07; cross-referenced from all other layers |
| **Researchers** | Use `research/` and source annotations in each principle |
| **Design Systems Teams** | Use `ui/`, `patterns/`, `schemas/`, and `checklists/` |

---

## The Problem This Solves

Most AI-generated interfaces fail in one or more of these ways:

- Apply visual styles without understanding perception
- Ignore cognitive load and information density
- Present choices without understanding decision psychology
- Fail accessibility requirements
- Use animation decoratively rather than communicatively
- Apply "UX laws" mechanically rather than contextually

This repository gives AI agents — and human practitioners — the structured knowledge to reason about interfaces the way a senior UX designer, cognitive psychologist, accessibility specialist, and interaction designer would.

---

## 8-Layer Architecture

```
layers/
├── 01-human-perception/      How users visually perceive and organize interfaces
├── 02-cognitive-psychology/  Mental processing, working memory, cognitive limits
├── 03-decision-psychology/   How users make choices; motivation and behavioral tendencies
├── 04-attention/             How interfaces capture, direct, and maintain attention
├── 05-interaction-usability/ Human interaction with controls; usability models
├── 06-ux-heuristics/         Established usability heuristics and design principles
├── 07-accessibility/         WCAG-grounded accessibility across all dimensions
└── 08-motion-animation/      Purposeful motion as interface communication
```

Each layer has:
- A `README.md` explaining its purpose and scope
- Individual principle files in standardized format
- Evidence classifications
- Cross-references to related layers

---

## Evidence Classification

Every principle carries an evidence level:

| Level | Meaning |
|---|---|
| **A** | Strong empirical/experimental support (replicated research, meta-analyses) |
| **B** | Supported by established research or theory |
| **C** | Established design heuristic from expert practice |
| **D** | Popular UX interpretation or simplified model |
| **E** | Context-dependent, limited, or contested evidence |

**This system does not treat all UX principles as scientific laws.**

Fitts's Law (A) and "use 7 items in a menu" (D) are not equivalent claims.

---

## How AI Agents Should Use This Repository

Follow the workflow in [`ai/generation-framework.md`](ai/generation-framework.md):

```
User Requirements → User Goals → User Context → Task Analysis
        ↓
Cognitive/Perceptual Risks → Information Architecture
        ↓
Relevant Principles (selected, not blindly applied)
        ↓
Interaction Design → Visual Design → Accessibility → Motion
        ↓
Implementation → UX Audit → Accessibility Audit → Iteration
```

An AI must explain *why* each selected principle applies to the specific task, user, and context.

See also:
- [`ai/system-prompt.md`](ai/system-prompt.md) — Full AI designer persona
- [`ai/audit-framework.md`](ai/audit-framework.md) — Self-audit after generation

---

## Directory Structure

```
ux-psychology-ai/
├── README.md
├── CONTRIBUTING.md
├── schemas/
│   └── principle.schema.yaml
├── layers/
│   ├── 01-human-perception/
│   ├── 02-cognitive-psychology/
│   ├── 03-decision-psychology/
│   ├── 04-attention/
│   ├── 05-interaction-usability/
│   ├── 06-ux-heuristics/
│   ├── 07-accessibility/
│   └── 08-motion-animation/
├── ai/
│   ├── system-prompt.md
│   ├── generation-framework.md
│   ├── audit-framework.md
│   └── prompts/
├── ui/
│   ├── layout/ ├── typography/ ├── color/ ├── spacing/
│   ├── components/ ├── responsive/ └── states/
├── patterns/
│   ├── navigation/ ├── forms/ ├── onboarding/ ├── dashboards/
│   ├── ecommerce/ ├── mobile/ └── feedback/
├── research/
│   ├── papers/ ├── books/ ├── standards/ └── sources.md
└── checklists/
    ├── ux.md ├── ui.md ├── accessibility.md └── motion.md
```

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Key rules:
- Never fabricate citations or statistics
- Assign accurate evidence levels (A–E)
- Every principle must be actionable
- Accessibility is integrated throughout, not an afterthought

---

## License

Open knowledge resource for human-centered interface design.

