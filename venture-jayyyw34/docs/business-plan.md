# LocalPlate — business plan

**Founder handle:** jayyyw34  
**Program:** Hult Cohort Developer Program, Summer Pilot 2026, Week 5 venture  
**Product:** Neighborhood micro-marketplace for homemade plates  
**Status:** Assumptions labeled. Traction numbers are not invented here — see the live `/api/metrics` snapshot in the submission PR.

---

## Executive summary

LocalPlate is a same-day marketplace where home cooks and bakers list a short daily menu and neighbors reserve plates for pickup on the block. The product is not a national delivery network and not a ghost-kitchen operating system. It is a thin coordination layer on top of cooking that already happens in apartments and side-street kitchens.

The informal homemade channel already exists in Instagram DMs, WhatsApp groups, and Nextdoor posts. That channel has demand and almost no inventory, payments, or neighborhood browse. Delivery incumbents (DoorDash, Uber Eats) take 15–30% and optimize for restaurants that can absorb fees and courier coverage. LocalPlate’s first metro is Greater Boston. The revenue model, once payments exist, is a 12–15% fee on reserved plates plus optional featured placement. This MVP ships browse, join, list, order, privacy, and a public metrics snapshot. It does not process cards and does not claim a priced financing round.

---

## Problem and solution

**Who hurts — cooks.** People who already cook extra trays for coworkers, church, or campus have no public board. They repeat the same DM thread every Thursday. They cannot see whether six plates or two will move. They eat the no-show risk.

**Who hurts — neighbors.** People who want food that tastes like someone’s house, not a heat lamp, cannot see what is actually being made tonight within a walk. Search is social, not geographic. They over-order delivery because the homemade option is invisible.

**Solution.** A cook posts one dish, a price, remaining servings, a neighborhood, and a pickup window. A neighbor filters the live board and reserves. Pickup is walking-distance by design. LocalPlate records the reservation and decrements servings so the board does not oversell.

**What “done” looks like in a first session.** A visitor browses tonight’s plates, joins with name / email / role / neighborhood (no password maze), and either lists a dish or reserves a plate.

---

## Market and competition

See `docs/market-research.md` for TAM/SAM/SOM, sources, and the interview status (founder-conducted interviews are not fabricated here).

**Positioning matrix (summary)**

| Player | Strength | Weakness vs LocalPlate |
|--------|----------|------------------------|
| DoorDash / Uber Eats | Demand density, payments, logistics | High take rate; built for restaurants, not six-plate menus |
| Shef and similar | Homemade brand, some compliance | National, heavier onboarding; less “tonight on your block” |
| Instagram / WhatsApp / Nextdoor | Where demand already lives | No inventory, no remaining-servings, no neighborhood browse |
| Meal-kit / ghost kitchen OS | Ops software | Wrong customer; not a neighborhood plate board |

**Wedge:** same-day neighborhood inventory + pickup. Win the three-block radius before pretending to be a logistics company.

---

## Business model and pricing

| Line | Assumption (labeled) |
|------|----------------------|
| Take rate | 12–15% of reservation GMV once payments exist |
| Featured cook | $15–40 / week in a neighborhood (optional) |
| Average plate | $12–18 (seed menu sits in this band) |
| Cook payout | 85–88% of plate price |
| Payments in MVP | None. Reservations only. |

No courier payroll. Gross margin, at software scale, should look like a marketplace take-rate, not a delivery P&L. Until payments ship, the product is a coordination MVP used to test whether cooks will post and neighbors will reserve.

---

## Go-to-market

1. **Density before ads.** Twenty cooks in 3–4 adjacent neighborhoods (Cambridge / Somerville / Allston / Brookline) before paid buyer acquisition.
2. **Cook-led demand.** First buyers are the cook’s existing group chat. The public board is the second surface.
3. **Cottage + shared kitchen.** Lead with operators who already bake under cottage-food rules or rent a licensed kitchen. Do not onboard unpermitted full-meal cooks as if the law were optional.
4. **Campus / cohort adjacency.** Hult and nearby campuses are a distribution channel for the pilot, not the long-term ICP.

---

## Unit economics

Labeled assumptions, not measured cohort data.

| Metric | Assumption | Note |
|--------|------------|------|
| AOV | $14 | Midpoint of seed prices |
| Take rate | 13% | After payments |
| Revenue / order | $1.82 | 0.13 × $14 |
| CAC (buyer) | $4–8 | If paid; $0 if cook-referred |
| CAC (cook) | $20–60 | Time + first featured week |
| Orders / buyer / month | 3 | Habit, not one-off |
| Monthly buyer contribution | ~$5.50 | 3 × $1.82 |
| LTV (buyer, 8 months) | ~$44 | Crude; churn unknown |
| LTV/CAC | >3 if cook-referred | Breaks if we buy random traffic |

These numbers are a model, not a dashboard.

---

## Product roadmap (12 months)

| Quarter | Focus |
|---------|--------|
| Q1 | Payments (Stripe), cook attestations, neighborhood waitlists |
| Q2 | Shared-kitchen partner onboarding; allergy + ingredient fields |
| Q3 | Ratings after pickup; no-show policy; SMS pickup reminders |
| Q4 | Second metro only if Boston density is real (repeat-order proof) |

Out of scope for the 12-month plan: courier fleet, nationwide SEO play, dark-kitchen financing.

---

## Team and hiring plan

- **Now:** jayyyw34, founder-builder. Agent-assisted product and docs for the Hult venture week.
- **If the pilot holds:** part-time food-safety / cottage-law counsel; part-time cook success (onboarding, photo, menu coaching).
- **Not hired in this plan:** a delivery ops team, a 12-person “platform org,” or a C-suite.

---

## Financial projections (3 years)

**All figures are hypothetical and labeled.** They assume payments exist, one metro in Y1, a second in Y3, and no invented current GMV.

| | Year 1 | Year 2 | Year 3 |
|--|--------|--------|--------|
| Active cooks (avg) | 40 | 120 | 280 |
| Plates / cook / week | 8 | 10 | 12 |
| AOV | $14 | $15 | $15 |
| GMV | ~$230k | ~$940k | ~$2.6M |
| Take rate | 13% | 13% | 14% |
| Net revenue | ~$30k | ~$122k | ~$365k |
| OpEx (contractor + tools + legal) | $40k | $90k | $180k |
| Result | Loss | Thin | Path to modest profit |

Costs include hosting, payments fees, insurance quotes, and counsel. They do not include a venture-scale burn.

---

## Risks

1. **Food law.** Many cottage-food statutes allow baked goods and prohibit meals that need refrigeration. Selling “homemade dinner” without a license is a legal risk. Mitigation: permitted SKUs first; shared commercial kitchens for meals; cook attestations; geo-fenced rules.
2. **Liability.** Foodborne illness. Mitigation: insurance before paid GMV; clear cook-as-merchant language.
3. **Trust / no-shows.** Mitigation: remaining-servings, later: deposits and ratings.
4. **Incumbent copy.** Delivery apps can add “homemade” tabs. Mitigation: neighborhood density and cook relationships, not feature checklists.
5. **Persistence on serverless.** This MVP may store demo data in a temporary store. Mitigation: move to a durable DB before charging money.

---

## Open items (not invented)

- Production URL and user snapshot: recorded at PR open from the live deploy, not here.
- Qualified investor touch: not invented. See `INVESTOR_LOG.md`.
