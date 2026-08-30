# Layer 07 — Perceivable

**WCAG Principle 1:** Perceivable — Information and user interface components must be presentable to users in ways they can perceive.

---

## 1.1 Text Alternatives

### 1.1.1 Non-text Content (Level A)
All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

**UI Rules:**
- All images that convey information must have meaningful `alt` text
- Decorative images must have empty `alt=""` (so screen readers skip them)
- Complex images (charts, graphs) need a full text description or equivalent data table
- Form inputs need accessible names (via `<label>`, `aria-label`, or `aria-labelledby`)
- Icon buttons need accessible names — icon alone is not sufficient

**Anti-patterns:**
❌ `<img src="chart.png" alt="chart"` — meaningless alt text
❌ `<button><svg>...</svg></button>` with no accessible name

---

## 1.3 Adaptable

### 1.3.1 Info and Relationships (Level A)
Information, structure, and relationships conveyed through presentation can be programmatically determined.

**UI Rules:**
- Use semantic HTML: `<h1>`–`<h6>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Form labels must be programmatically associated with their inputs (`for`/`id` or `aria-labelledby`)
- Required fields must be identified beyond color (asterisk with explanation, or `aria-required`)
- Table relationships: use `<th>` with `scope` and `<caption>`
- Visual groupings must correspond to semantic groupings (`<fieldset>`/`<legend>` for form groups)

### 1.3.4 Orientation (Level AA, WCAG 2.1)
Content does not restrict its view and operation to a single display orientation.

**UI Rule:** Do not lock interface to portrait or landscape orientation unless a specific display orientation is essential.

### 1.3.5 Identify Input Purpose (Level AA, WCAG 2.1)
The purpose of each input field that collects personal information can be programmatically determined.

**UI Rule:** Use `autocomplete` attribute values from the HTML specification for personal data fields (name, email, address, etc.).

---

## 1.4 Distinguishable

### 1.4.1 Use of Color (Level A)
Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

**UI Rules:**
- Required field indicators need non-color indicator (asterisk, "(required)" text)
- Error states need non-color indicator (icon, label, text)
- Links in body text need underline or other non-color distinction from body text
- Charts need patterns, labels, or shapes, not color alone

### 1.4.3 Contrast (Minimum) (Level AA)
Text and images of text have a contrast ratio of at least 4.5:1. Large text has a contrast ratio of at least 3:1.

**Thresholds:**
- Normal text (< 18pt or < 14pt bold): **4.5:1 minimum**
- Large text (≥ 18pt or ≥ 14pt bold): **3:1 minimum**
- Text in logotypes: no requirement

### 1.4.4 Resize Text (Level AA)
Text can be resized up to 200% without loss of content or functionality.

**UI Rule:** Use relative units (rem, em) for text. Do not use fixed px for font sizes in a way that prevents browser text zoom from working.

### 1.4.10 Reflow (Level AA, WCAG 2.1)
Content can be presented without loss of information at 400% zoom without horizontal scrolling.

**UI Rule:** Test at 400% zoom. Responsive layout must work at this zoom level.

### 1.4.11 Non-text Contrast (Level AA, WCAG 2.1)
UI components and graphical objects have a contrast ratio of at least 3:1 against adjacent colors.

**UI Rules:**
- Button borders, input borders, checkboxes, radio buttons, sliders: 3:1 against background
- Charts, data visualizations, icons: 3:1 against adjacent colors
- Focus rings: must meet 3:1 against adjacent colors (see 2.4.11 for full requirements)

### 1.4.12 Text Spacing (Level AA, WCAG 2.1)
No loss of content or functionality occurs when the following text spacing is applied: line height ≥ 1.5× font size; letter spacing ≥ 0.12× font size; word spacing ≥ 0.16× font size; paragraph spacing ≥ 2× font size.

---

## Sources

**Standards:**
- W3C. (2018). WCAG 2.1. https://www.w3.org/TR/WCAG21/
- W3C. (2023). WCAG 2.2. https://www.w3.org/TR/WCAG22/

**Last verified:** 2024-01-01
