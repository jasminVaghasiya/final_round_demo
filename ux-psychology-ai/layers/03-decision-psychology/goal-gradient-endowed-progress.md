# L03-P09 & L03-P10 — Goal-Gradient Effect and Endowed Progress

---

## Goal-Gradient Effect (L03-P09)

**Evidence level:** B | **Type:** Behavioral hypothesis | **Domain:** Motivation, behavior

### Definition
The hypothesis that effort or behavior directed toward a goal intensifies as the perceived distance to the goal decreases. People work harder and faster as they get closer to completion.

### Research Basis
Behavioral origins trace to Hull's (1932) animal research. Human consumer applications were studied by Kivetz, Urminsky, and Zheng (2006), who found goal-gradient effects in coffee reward programs and online rating tasks.

**Evidence level B:** Demonstrated in specific consumer and task contexts. The effect appears in well-designed studies but is context-dependent and may not generalize uniformly to all interface tasks.

### UI Implications
1. **Progress indicators accelerate motivation as they approach completion.** The last steps of an onboarding or checkout flow feel less effortful when progress is clearly displayed.
2. **Show distance to a goal explicitly.** "2 of 5 steps complete" or "You need 3 more reviews to reach Level 5" activates goal-gradient motivation.
3. **Design the final stages of a task to feel achievable.** If the last step is perceived as hard, goal-gradient motivation will not compensate.

### Anti-Patterns
❌ Hiding progress toward a goal — users cannot experience goal-gradient motivation without perceiving proximity to the goal.

---

## Endowed Progress Effect (L03-P10)

**Evidence level:** B | **Type:** Empirical effect | **Domain:** Motivation, commitment

### Definition
People who are given an artificial head start on a task (initial progress provided without effort) are more motivated to complete the task than those who start from zero.

### Research Basis
Nunes and Drèze (2006) demonstrated this with a car wash loyalty card study: customers given a card with 2 stamps already filled on a 10-stamp card completed the card at higher rates than customers given an 8-stamp blank card — despite requiring the same 8 additional stamps.

**Evidence level B:** Established in specific loyalty/task contexts. The effect is real but its magnitude and generalizability to complex digital tasks requires contextual judgment.

### UI Implications
1. **Start progress bars at a small initial completion percentage.** A new user's profile at "10% complete" from account creation feels more motivating than 0%.
2. **Show completed system-provided steps on checklists.** If account creation counts toward profile setup, credit it immediately.
3. **New user onboarding: begin with easy, fast wins.** Completing the first 2 steps quickly establishes momentum.
4. **Do not create artificial progress that misrepresents actual task completion.** Endowed progress should reflect real (if system-provided) value, not deception.

### Anti-Patterns
❌ Progress bars that say "40% complete" for a new user when no real progress has been made — creates false expectations.

---

## Sources

- Hull, C. L. (1932). The goal-gradient hypothesis and maze learning. *Psychological Review*, 39(1), 25–43.
- Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The goal-gradient hypothesis resurrected: Purchase acceleration, illusionary goal progress, and customer retention. *Journal of Marketing Research*, 43(1), 39–58.
- Nunes, J. C., & Drèze, X. (2006). The endowed progress effect: How artificial advancement increases effort. *Journal of Consumer Research*, 32(4), 504–512.

**Last verified:** 2024-01-01
