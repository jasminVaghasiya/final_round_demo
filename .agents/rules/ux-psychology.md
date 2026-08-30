# UX Psychology AI — Design & Development Rule

Whenever building, designing, refactoring, or auditing UI components, web pages, applications, forms, or interaction flows in this repository, you MUST apply the **UX Psychology AI Knowledge System** located in [`ux-psychology-ai`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai).

---

## 1. Mandatory Pre-Generation Sequence

Before generating or modifying any UI code or visual design, follow the **9-step reasoning sequence** defined in [`ux-psychology-ai/ai/core.md`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/ai/core.md):

1. **CLASSIFY TASK**: Identify the task type (`form`, `navigation`, `dashboard`, `landing_page`, `onboarding`, `ecommerce`, `modal_dialog`, `component`, `data_visualization`, `mobile`, `motion_design`, `audit`).
2. **DEFINE CONTEXT**: Identify User, Task Goal, Risk Level (`high_stakes` / `low_stakes`), and Device (`touch_mobile` / `pointer_desktop` / `both`).
3. **SELECT PRINCIPLES**: Consult [`ux-psychology-ai/core/principles.yaml`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/core/principles.yaml) and [`ux-psychology-ai/core/decision-engine.yaml`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/core/decision-engine.yaml). State why each selected principle applies.
4. **INFORMATION HIERARCHY**: Define 4 clear levels (Level 1 Primary to Level 4 Metadata). Group content using proximity, chunking, and common region.
5. **INTERACTION STATES**: Explicitly design all interactive states: `default`, `hover`, `focus`, `active`, `loading`, `success`, `error`, `disabled`, `empty`. Focus rings must NEVER be suppressed (`outline: none` without focus visible replacement is strictly forbidden).
6. **ACCESSIBILITY (WCAG Level AA Min)**:
   - Text contrast >= 4.5:1 (3:1 for large text / UI controls).
   - Touch targets >= 44x44px.
   - Complete keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`, arrow keys where appropriate).
   - Proper ARIA semantics (`aria-live`, `aria-expanded`, `aria-invalid`, `role`, etc.).
7. **PURPOSEFUL MOTION**: Every animation must serve a clear communicative purpose (e.g. feedback, state transition). Provide `@media (prefers-reduced-motion: reduce)` alternatives.
8. **STRUCTURED CODE**: Produce accessible HTML5, CSS custom properties, and robust JavaScript logic.
9. **AUDIT**: Self-audit against [`ux-psychology-ai/ai/audit-framework.md`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/ai/audit-framework.md).

---

## 2. Priority Hierarchy

When design trade-offs occur, strictly enforce this priority order:
1. WCAG Level A compliance
2. WCAG Level AA compliance
3. Task completion (Usability)
4. Error prevention & recovery
5. Cognitive load reduction (Working memory limit 3–4 chunks, Cowan 2001)
6. Visual aesthetics
7. Motion & micro-interactions

---

## 3. Strict Prohibitions (Never Do)

- **Never** suppress focus indicators (`outline: none`).
- **Never** rely on color alone as the sole indicator of error, status, or selection.
- **Never** validate form fields on keystroke (validate on `blur` or submit; show requirements upfront).
- **Never** use deceptive dark patterns (pre-selected optional costs/data sharing, artificial scarcity, manipulative loss aversion).
- **Never** treat Miller's 7±2 as a menu item limit (menu choices rely on recognition, not short-term memory).

---

## 4. Key Reference Files

- Core principles index: [`ux-psychology-ai/core/principles.yaml`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/core/principles.yaml)
- Task decision routing: [`ux-psychology-ai/core/decision-engine.yaml`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/core/decision-engine.yaml)
- AI Reasoning core: [`ux-psychology-ai/ai/core.md`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/ai/core.md)
- Full generation framework: [`ux-psychology-ai/ai/generation-framework.md`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/ai/generation-framework.md)
- Domain knowledge files: [`ux-psychology-ai/knowledge/`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/knowledge)
- Component & layout patterns: [`ux-psychology-ai/patterns-yaml/`](file:///c:/Users/01/OneDrive/Desktop/all/helpdesk/ux-psychology-ai/patterns-yaml)
