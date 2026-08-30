# UI — Components

## Component Design Requirements

Every component in a design system must define:

### 1. Anatomy
- All parts of the component (label, icon, container, indicator)
- Which parts are required vs. optional

### 2. States
All applicable states from Layer 05-P07 (Interaction States):
- Default
- Hover
- Focus (must always be visible)
- Active/Pressed
- Disabled (with explanation mechanism)
- Loading (if applicable)
- Success (if applicable)
- Error (if applicable)
- Selected (if applicable)
- Empty (if applicable)

### 3. Variants
- Size variants (sm / md / lg)
- Intent variants (primary / secondary / destructive / ghost)
- State variants (default / loading / success / error)

### 4. Accessibility
- HTML element (prefer native where possible)
- ARIA role (if custom)
- ARIA states required
- Keyboard interaction
- Screen reader announcement behavior

### 5. Motion
- State transition animations
- Entry/exit animations (if applicable)
- Reduced motion alternative

## Core Components Checklist

Every interface must define these components before implementation:

```
□ Button (primary, secondary, destructive, ghost, icon-only)
□ Form input (text, email, password, number, textarea)
□ Select / dropdown
□ Checkbox
□ Radio group
□ Toggle switch
□ Link (inline, standalone)
□ Modal / dialog
□ Toast / notification
□ Loading states (spinner, skeleton, progress bar)
□ Empty state
□ Error state
□ Badge / status indicator
□ Navigation (primary nav, breadcrumb, pagination, tabs)
```
