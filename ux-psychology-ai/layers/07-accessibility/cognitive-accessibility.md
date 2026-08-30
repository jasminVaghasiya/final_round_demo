# Layer 07 — Cognitive Accessibility

**Purpose:** Extended guidance for designing interfaces that are usable by people with cognitive, language, and learning disabilities.

**Source authority:** W3C Cognitive Accessibility (COGA) Task Force. (2021). *Making Content Usable for People with Cognitive and Learning Disabilities*. W3C Working Group Note. https://www.w3.org/TR/coga-usable/

---

## What Cognitive Accessibility Covers

Cognitive accessibility addresses the needs of users with:
- Memory impairments (including age-related decline)
- Attention-related conditions (ADHD)
- Executive function difficulties
- Language and learning disabilities (dyslexia, dyscalculia)
- Mental health conditions affecting concentration
- Autism spectrum conditions

---

## Core Design Patterns for Cognitive Accessibility

### 1. Support memory

- Do not require users to memorize information across steps
- Persist selections and inputs across navigation
- Provide reminders and progress summaries in multi-step processes
- Allow users to save and resume tasks
- Provide undo for all reversible actions

### 2. Use clear and understandable language

- Use the simplest language appropriate for the audience
- Avoid jargon, technical terms, and abbreviations without explanation
- Use active voice and short sentences
- Supplement text with icons and images where helpful
- Define unusual or technical terms inline

### 3. Prevent and correct mistakes

- Validate inputs progressively with clear, plain-language error messages
- Provide format hints and examples before errors occur
- Allow undo of all reversible actions
- Confirm before all destructive or irreversible actions
- Provide a review step before final submission of important forms

### 4. Make navigation predictable

- Keep navigation consistent across pages and sections
- Use descriptive labels for navigation, headings, and links
- Provide a site map or search capability for complex sites
- Clearly indicate current location

### 5. Reduce distractions

- Avoid auto-playing media
- Avoid persistent animation (especially in peripheral areas)
- Reduce visual noise and unnecessary UI complexity
- Allow users to pause, stop, or hide moving content

### 6. Support users who use symbols and AAC

Where the audience includes users who use augmentative and alternative communication (AAC):
- Support symbol-based communication where applicable
- Avoid images of text for essential content

---

## Relationship to WCAG

Cognitive accessibility extends beyond WCAG. Key WCAG criteria that directly support cognitive accessibility:

| WCAG Criterion | Cognitive Benefit |
|---|---|
| 3.1.1–3.1.2 Language | Screen readers read content in correct language; plain language is readable |
| 3.2.3–3.2.4 Consistency | Reduces mental model demand |
| 3.3.1–3.3.4 Input Assistance | Reduces memory and attention demand in forms |
| 3.3.7 Redundant Entry (2.2) | Reduces re-entry burden |
| 2.4.6 Headings and Labels | Supports navigation and orientation |
| 2.4.3 Focus Order | Predictable focus reduces disorientation |

---

## Sources

**Primary:**
- W3C Cognitive Accessibility Task Force. (2021). *Making Content Usable for People with Cognitive and Learning Disabilities*. https://www.w3.org/TR/coga-usable/

**Standards:**
- W3C. (2023). WCAG 2.2. https://www.w3.org/TR/WCAG22/

**Last verified:** 2024-01-01
