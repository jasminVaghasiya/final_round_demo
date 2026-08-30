# Pattern — Ecommerce

## User Goal
Find a product, evaluate it, and complete a purchase with confidence.

---

## Product Discovery

### Search
- Autocomplete suggestions reduce recall demand (L02-P04 Recognition vs. Recall)
- Show recent searches and popular searches
- Handle zero results gracefully: suggest alternatives, broaden search
- Search should be prominently placed (Fitts's Law: L05-P01)

### Filtering and Sorting
- Show active filters persistently — users should not have to recall what filters are applied (L06-P06)
- Allow multiple filters simultaneously
- Show result count as filters are applied (real-time feedback: L06-P01)
- Enable easy filter removal (individual and "clear all")

---

## Product Display

### Product Cards
- Clear hierarchy: image → product name → price → key attributes
- Consistent card size and image aspect ratio across the grid
- Price must be prominent (users scan for price early in evaluation)
- Reviews/rating visible on card (social proof)

### Product Page
- Primary image large and zoomable
- Price immediately visible without scrolling (above the fold)
- "Add to cart" button: primary CTA, large, persistent (sticky on mobile scroll)
- Clear inventory status: "In stock", "Only 3 left", "Out of stock"
- Non-color status indicator for availability (not just green/red color)

---

## Cart and Checkout

### Cart
- Always accessible (cart icon with item count badge: Von Restorff, L03-P05)
- Show product thumbnails in cart — recognition over recall
- Allow quantity change and removal inline
- Show total prominently

### Checkout
Apply form patterns (see `patterns/forms/README.md`) plus:

- Guest checkout option prominent — do not force account creation before purchase
- Show order summary persistently during checkout (reduces recall demand)
- Clear progress indicator for multi-step checkout
- Trust signals (security badges, return policy) near the primary CTA
- Error prevention: validate address and payment fields progressively

### Loss Aversion in Checkout
- Cart abandonment emails reference what the user will lose: "Your cart expires soon"
- Out-of-stock risk shown at cart level: "Only 2 left in stock"
- Ethical use only — do not create artificial urgency

---

## Accessibility

- Product images: descriptive alt text conveying product and key visual attributes
- Price: screen reader accessible (avoid `<span>$</span><span>49</span>` without accessible combined price)
- Add to cart: accessible button with product name: "Add Blue Running Shoe, Size 10 to cart"
- Quantity inputs: accessible label and numeric input
- Checkout forms: full WCAG 3.3 compliance

---

## Common Mistakes

❌ Forcing account creation before checkout — significantly increases abandonment
❌ Showing only a color to indicate availability — fails WCAG 1.4.1
❌ No guest checkout option
❌ Generic "Add to Cart" button without product name in accessible name
❌ Clearing cart after inactivity without warning
