# Changelog

All substantive changes to the repository are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] — 2024-01-01

### Added

#### Layer 01 — Human Perception
- `common-fate.md` — Gestalt common fate principle with motion design application
- `pragnanz.md` — Law of Good Form / Prägnanz with composition implications
- `connectedness.md` — Palmer & Rock (1994) connectedness principle for lines and visual linking

#### Layer 03 — Decision Psychology
- `choice-overload.md` — Choice overload with Scheibehenne et al. (2010) meta-analysis qualification and conditions

#### Layer 04 — Attention
- `visual-salience-capture.md` — Feature Integration Theory applied to UI salience hierarchy
- `visual-scanning.md` — F-pattern, Z-pattern, layer-cake pattern with appropriate evidence qualification (C)

#### Layer 05 — Interaction & Usability
- `feedback-constraints.md` — Feedback timing thresholds; constraint types with UI implications

#### UI Knowledge Base
- `ui/color/dark-mode.md` — Complete dark mode color system (elevation via lightness, token patterns, contrast verification, CSS implementation)

#### Root
- `CHANGELOG.md` — This file

### Changed

- Layer 01 README index updated to reflect all 10 principles now having backing files
- Layer 03 README index updated to include choice-overload.md
- Layer 04 README index updated to include visual-salience-capture.md and visual-scanning.md
- Layer 05 README index updated to include feedback-constraints.md

---

## [1.0.0] — 2024-01-01

### Added

Initial repository build:

- Root: README.md, CONTRIBUTING.md
- Schema: schemas/principle.schema.yaml
- Layers 01–08: full README and principle files
- AI system: system-prompt.md, generation-framework.md, audit-framework.md, prompts/ui-generation.md
- UI knowledge base: layout, typography, color, spacing, components, responsive, states
- Pattern library: navigation, forms, onboarding, dashboards, ecommerce, mobile, feedback
- Research: sources.md, books/README.md, papers/README.md, standards/README.md
- Checklists: ux.md, ui.md, accessibility.md, motion.md

---

## Evidence Update Policy

When a principle's evidence classification changes due to new research:
1. Update the principle file's `evidence_level` field
2. Update the principle's `research_basis` section with the new findings
3. Note the change in this changelog with the source
4. Update `research/sources.md` with the new citation

## Source Verification Policy

All sources should be re-verified every 12 months. When verification is done, update `last_verified` in the relevant principle files and add a log entry here.
