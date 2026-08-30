# Additional UX Principles

**Layer:** 06-ux-heuristics
**Note:** These principles have varying evidence levels. Each is labeled accurately.

---

## Aesthetic–Usability Effect (L06-P11)

**Evidence level:** B | **Type:** Empirical effect

Aesthetically pleasing interfaces are perceived as more usable, even when objective usability is equivalent.

**Source:** Kurosu, M., & Kashimura, K. (1995). Apparent usability vs. inherent usability. *CHI '95 Conference Companion*, 292–293. DOI: 10.1145/223355.223680

**Critical qualification:** Perceived usability ≠ actual usability. Aesthetics cannot substitute for functional usability. See the distinction: a beautiful interface that is hard to use is still hard to use.

**UI Rule:** Optimize aesthetics and usability independently. Use visual quality to create positive first impressions; use usability research to ensure actual task performance.

---

## Jakob's Law (L06-P12)

**Evidence level:** D | **Type:** Design heuristic / popular principle

Users spend most of their time on other interfaces, and they expect your interface to work the way those interfaces do.

**Source:** Nielsen, J. (2000). End of Web Design. *Nielsen Norman Group*. (Not a peer-reviewed publication — this is a practitioner principle, not an experimental law.)

**Critical note:** "Jakob's Law" is not an empirically tested law. It is a practitioner principle grounded in the established psychological concept of mental models (Johnson-Laird, 1983) and transfer-appropriate processing. Evidence level D because the specific "law" formulation is a popular UX shorthand.

**UI Rule:** Follow dominant platform and industry conventions unless you have strong evidence that a novel pattern significantly outperforms them. Novelty has a real learning cost.

---

## Tesler's Law (L06-P13)

**Evidence level:** D | **Type:** Design principle / folk principle

Every application has an inherent amount of complexity that cannot be reduced — only moved. Either the designer handles it or the user handles it.

**Source:** Attributed to Larry Tesler (1980s, from Apple/Xerox PARC). Not published as a formal law. Often called the "Law of Conservation of Complexity."

**Critical note:** This is a useful design heuristic, not an experimentally validated law. Evidence level D.

**UI Rule:** When simplifying a user interface, ensure complexity has genuinely been removed from the user's experience — not merely hidden in a way that makes it harder to find when needed.

---

## Peak-End Rule (L06-P14)

**Evidence level:** B | **Type:** Empirical effect

People's overall judgment of an experience is disproportionately influenced by how it felt at its most intense moment (peak) and at its end, not by the average experience.

**Source:** Kahneman, D., Fredrickson, B. L., Schreiber, C. A., & Redelmeier, D. A. (1993). When more pain is preferred to less. *Psychological Science*, 4(6), 401–405.

**UI Rule:** Design for positive peaks and a strong ending. An onboarding flow's most satisfying moment and its final screen will be remembered disproportionately. Avoid ending flows on administrative friction (cookie confirmations, legal notices).

---

## Doherty Threshold (L06-P15)

**Evidence level:** D | **Type:** Popular UX claim

The claim that productivity rises significantly when response time is below 400ms.

**Source:** Doherty, W. J., & Thadhani, A. J. (1982). The economic value of rapid response time. *IBM White Paper*. (IBM technical report, not peer-reviewed research.)

**Critical note:** The specific 400ms threshold and the "productivity doubles below 400ms" claim are from a specific 1982 IBM report in a specific context. The general principle — that faster response improves experience — is well-supported. The exact threshold should not be treated as a universal law. Evidence level D.

**UI Rule:** Target interaction response under 100ms for instant-feeling feedback; under 1000ms before users notice delay; provide loading indicators over 1000ms. These thresholds are grounded in human perception research (Miller, 1968), not the Doherty report specifically.

---

## Law of Least Effort (L06-P16)

**Evidence level:** B | **Type:** Behavioral principle

People will tend to choose the path that requires the least physical and cognitive effort to achieve a goal.

**Source:** Zipf, G. K. (1949). *Human Behavior and the Principle of Least Effort*. Addison-Wesley. Also grounded in information foraging theory (Pirolli & Card, 1999).

**UI Rule:** Design the optimal path to be the easiest path. If the correct action (from the user's perspective) requires more effort than an incorrect one, users will take the incorrect one. The "desired path" and the "easiest path" must be the same.

---

## Sources

All sources are cited inline above. Evidence levels are accurate and reflect the actual provenance of each principle.

**Last verified:** 2024-01-01
