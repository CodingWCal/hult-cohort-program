# Business plan: Setu (working name)

**Status: exploratory, week-one draft.** This is a test run for a cohort venture-week assignment, not a polished investor document. There are no real users, no signed partnerships, and no historical financials yet. Every number below is a labeled, illustrative assumption for planning purposes, not a reported result. "Setu" (Hindi for "bridge") is a placeholder name, not finalized.

---

## 1. Executive summary

Rural and informal-economy households in India, daily-wage workers, small farmers, and livestock owners earning roughly $1 to $3 a day equivalent, routinely fall into a "scarcity trap": a small, ordinary shock (a sick animal, a slow work week, a minor medical bill) forces high-interest informal borrowing that spirals into debt, because no formal product is sized or priced for a shock that costs a few dollars.

Setu proposes four bundled product lines aimed at that specific gap:

1. **Emergency micro-loans** under $10, sized and priced to be repayable by someone earning about $1 a day.
2. **Cheap shock micro-insurance** for small, frequent shocks (sick livestock, lost work days), not catastrophic-event insurance.
3. **Fee-into-savings loans**, a higher-fee loan product where the fee itself is redirected into a savings account opened in the borrower's own name, turning a cost into an asset.
4. **Harvest-to-stipend conversion**, turning a lumpy harvest or seasonal payout into a smoothed monthly stipend.

The wedge is **bundling these four products into one existing trust relationship**, distributed through India's Self-Help Group (SHG) and microfinance-institution (MFI) network rather than cold-start digital acquisition (see [market-research.md](market-research.md) for the full competitive analysis). No identified competitor combines all four. Credit-only players (Jai Kisan, Tala, Branch, traditional MFIs) don't sell insurance or forced savings, and insurers (UIIC, PMFBY) don't lend or smooth income.

**Critically, Setu is not a lender.** Real consumer lending in India requires RBI or NBFC registration. Setu is designed from day one as a **technology platform (Lending Service Provider) that originates and services loans on behalf of a partner NBFC**, under RBI's September 2022 digital lending guidelines, not as an unlicensed direct lender. Section 4 details this structure explicitly.

This plan is a modeling exercise for a one-week-old pilot concept. It has not been validated with real users, and no NBFC, insurer, or SHG-federation partnership currently exists.

---

## 2. Problem and solution

### Problem

Per the market research packet, India's roughly 91 lakh (9.1 million) SHGs and 10 crore (100 million) member households (NABARD SHG-Bank Linkage Programme, June 2025) are already inside the formal-finance perimeter in a technical sense; they can access SHG group loans and bank-linked credit. But the products available to them are mismatched to the size and shape of the shocks they actually face:

- Formal loan products (MFI group loans, bank-linked SHG credit) are typically sized in the hundreds to thousands of dollars with multi-month tenors, not the $5 to $10 needed to cover a sick goat or three missed work days.
- Livestock insurance penetration is roughly 0.98% (Swiss Re, PIB) despite about 104.5 million of India's 195.6 million rural households owning cattle. The product exists on paper (PMFBY, UIIC), but distribution and claims friction keep uptake near zero.
- No product converts a lump-sum harvest payout into a predictable monthly income, so households that are cash-rich for one week a season and cash-poor the other fifty-one weeks have no smoothing mechanism.
- When a shock hits and no sized-right formal product exists, the fallback is informal moneylenders at very high effective interest rates, the classic "scarcity trap."

### Solution

Four products, one relationship, delivered through the SHG or MFI channel the household already trusts:

| Product | What it does | Why it's different from what exists |
|---|---|---|
| Emergency micro-loan | Under $10, short tenor, capped reasonable interest | Below the floor of every credit competitor identified in research (Tala's floor is $10) |
| Shock micro-insurance | Small, cheap policies for small, frequent shocks | Existing insurers (PMFBY, UIIC) target catastrophic crop loss, not a sick cow or a slow week |
| Fee-into-savings loan | The fee charged on the loan is deposited into the borrower's own savings account rather than pocketed as pure cost | Converts an expense households already accept (loan fees) into an asset-building mechanism |
| Harvest-to-stipend converter | The borrower deposits a seasonal lump sum, and Setu (via a partner) disburses it back as a fixed monthly stipend | No identified competitor offers this at all |

The bet is that bundling reduces acquisition cost (one onboarding, four products) and increases retention (a household that only needs one product this month still has three reasons to stay), while distribution through existing SHG or MFI field trust solves the cold-start credit-scoring problem that pure fintech competitors (Tala, Branch) have to solve with expensive alternative-data modeling.

---

## 3. Market and competition

Full sourced market sizing, the competitor table, ICP, and wedge analysis live in [market-research.md](market-research.md). Summary, reconciled with those figures, no new numbers introduced here:

- **TAM:** India's agri-fintech and rural credit market is about ₹1,200B (about $14.4B) (Ken Research).
- **SAM:** NABARD's SHG-Bank Linkage Programme: about 9.1 million SHGs, about 100 million member households, about $25B annual disbursement (FY2024), $7.8B aggregate SHG savings. This is the realistic distribution rail, not a market-wide digital TAM.
- **SOM (this pilot):** dozens to low hundreds of households reachable through one MFI, NGO, or SHG-federation partner, not a launch-scale figure.
- **Insurance-side gap:** about 0.98% livestock-insurance penetration against about 104.5 million cattle-owning rural households, cited evidence of a distribution gap, not a product-design gap.

Competitively, the closest analogues are Jai Kisan (which solved the licensing problem by acquiring its own NBFC, Kushal Finnovation, but doesn't bundle insurance or forced savings), Farmeasy Technologies (bundles credit and insurance but is farmer-only, missing non-farm daily-wage workers), and Tala and Branch (proven small-ticket smartphone lending, but their loan floors and product scope don't reach sub-$10 or insurance and savings). Traditional MFIs (CreditAccess Grameen, Bandhan, Spandana) have the trust and distribution but not the app-first, sub-$10, bundled product design. See the research packet's full table for weaknesses relative to this idea on each.

---

## 4. Business model and pricing

### 4.1 Regulatory structure (read this first)

Setu will **not** hold or lend its own capital to consumers. RBI regulation requires either NBFC registration or operation as a **Lending Service Provider (LSP)** under a licensed NBFC partner, per RBI's digital lending guidelines (effective September 2022). Over 1,100 NBFCs are registered with RBI as of 2026, giving a real, if unvalidated, pool of potential partners.

Under this structure:
- The **partner NBFC is the lender of record**. Loans are booked on the NBFC's balance sheet, the NBFC bears credit risk (or shares it via a co-lending or FLDG arrangement, subject to RBI limits), and the NBFC holds the regulatory license.
- **Setu is the technology and servicing layer**: borrower sourcing, SHG or MFI-channel onboarding, alternative-data underwriting inputs (SHG repayment history, group-guarantee signals), the app or servicing interface, collections support, and the insurance and savings product integrations.
- Insurance products are distributed as a **corporate agent or point-of-sale person arrangement** with a licensed insurer (for example, a general insurer already active in the livestock or crop space, such as UIIC), not underwritten by Setu.
- Savings accounts (for the fee-into-savings and harvest-to-stipend products) are held at a **partner bank or the NBFC's own deposit-linked product**, not by Setu directly. Setu has no license to hold customer deposits.

No NBFC, insurer, or bank partnership currently exists. This is a structural design choice for the pilot's legal framing, not a claim of an executed agreement.

### 4.2 Illustrative pricing (all figures are planning assumptions, not filed rate cards)

| Product | Illustrative terms | Illustrative revenue split |
|---|---|---|
| Emergency micro-loan | ₹500 to ₹800 (about $6 to $10), 30 to 60 day tenor, about a 24 to 26% reducing-balance APR (in line with existing MFI rate bands cited in research) | NBFC earns interest income. Setu earns an LSP servicing or origination fee, assumed at about 30% of gross interest income (or a flat ₹15 to ₹25 per loan, whichever the eventual contract specifies) |
| Fee-into-savings loan | ₹1,000 loan, about a 10% flat fee (₹100); of that fee, about 70% (₹70) is deposited into the borrower's own savings account, and about 30% (₹30) covers NBFC and Setu cost and margin | Setu takes a share of the retained ₹30 as its servicing fee. The exact split is TBD with the NBFC partner |
| Shock micro-insurance | ₹50 to ₹150 a year in premium per policy (livestock or income-shock cover) | Setu earns a corporate-agent commission, assumed at about 15 to 20% of premium, per standard insurance-distribution norms |
| Harvest-to-stipend converter | The household deposits a seasonal lump sum, and Setu or its partner disburses it as a fixed monthly amount over 6 to 12 months | Setu earns a conversion or service fee, assumed at about 2 to 3% of the lump sum, charged once at deposit |

These rates are chosen to be directionally consistent with the existing MFI and NBFC rate environment described in the research packet, so the plan isn't proposing something regulators or partners would reject out of hand, not derived from a signed term sheet.

### 4.3 Revenue summary

Setu's revenue is entirely **fee and commission based**: origination and servicing fees from the NBFC partner, insurance commissions, and conversion fees. Setu never marks up interest itself and never touches customer principal directly (loan disbursement and collection flow through the NBFC and bank rails). This keeps Setu's own balance sheet simple and reinforces the "technology platform, not lender" framing.

---

## 5. Go-to-market

The go-to-market leans entirely on the SHG and MFI distribution wedge identified in the research packet, not on cold-start consumer acquisition:

1. **The channel partner, not the end user, is the first sale.** The initial commercial target is a single SHG federation, NGO, or MFI field partner, not individual households. That partner already has field agents, group-meeting cadences, and trust with members.
2. **Pilot cohort:** one partner, a small number of SHGs (realistically dozens to low hundreds of member households, matching the SOM in the research packet), starting with the two lowest-friction products (emergency micro-loan and shock micro-insurance) before adding the fee-into-savings and harvest-to-stipend products, which need deposit-holding infrastructure via the NBFC or bank partner.
3. **Onboarding rides existing group meetings.** SHGs already meet regularly for savings and loan bookkeeping. Setu's field enrollment is designed to piggyback on that cadence rather than requiring a separate acquisition touchpoint.
4. **Underwriting signal comes from the group, not a credit bureau.** SHG repayment history and group-guarantee dynamics substitute for the alternative-data modeling that cold-start players like Tala and Branch have to build from scratch. This is the core efficiency the bundling and channel wedge is meant to unlock.
5. **Expansion path:** federation by federation, geography by geography, with each new SHG federation partnership functioning as a new distribution channel rather than paid digital acquisition.

No channel partner is currently signed. This is the intended motion, to be tested, not yet validated, in subsequent pilot weeks.

---

## 6. Unit economics

All figures below are **illustrative planning assumptions**, explicitly labeled, for a pilot with zero real users to date. They exist to sanity-check the business model's shape, not to represent measured results.

**Assumptions:**
- CAC channel: commission paid to the SHG or MFI field partner per enrolled household, assumed at **₹100 (about $1.20) per household**, low because acquisition rides existing group infrastructure rather than paid digital marketing.
- Cross-sell: an enrolled household is assumed to take, on average, **1.5 products in year one**, rising toward the full four-product bundle over about 3 years as trust and product availability (savings and stipend infrastructure) build out.
- Revenue per household: using the illustrative pricing in Section 4, a household taking one emergency loan (about ₹600 principal, about 2 cycles a year) plus one insurance policy (about ₹100 a year in premium) generates roughly **₹150 to ₹250 a year in Setu revenue** in year one (LSP fee plus insurance commission), assumed to grow toward **₹400 to ₹600 a year** by year three as the fee-into-savings and harvest-stipend products layer on.
- Retention: assumed at **about 60% annual household retention**, consistent with typical MFI and SHG group-lending retention patterns cited in the research packet's competitive table, not a Setu-specific measurement.
- **Illustrative LTV** (3-year horizon, undiscounted, retention-weighted): roughly **₹600 to ₹900 (about $7 to $11)** per household, against a **CAC of about ₹100 (about $1.20)**, an illustrative LTV to CAC ratio in the range of 6x to 9x.

**Caveat:** this ratio looks attractive mainly because CAC is assumed low (channel-piggybacked, not paid acquisition) and per-transaction dollar values are inherently small. It has not been tested against real default rates, real channel-partner commission negotiations, or real cross-sell behavior, and default or credit-loss costs (borne primarily by the NBFC, not Setu, under the LSP structure) are not netted into this figure.

---

## 7. Product roadmap (12 months)

| Phase | Months | Milestones |
|---|---|---|
| 0. Pilot validation | 0 to 2 | Real user interviews (5 or more, per the program's evidence standard, not yet conducted); identify one candidate SHG or MFI channel partner; identify one candidate NBFC and one candidate insurer for LSP and corporate-agent discussions |
| 1. MVP: emergency loan only | 2 to 4 | App or field tool for loan application plus SHG-signal-based underwriting input; manual or semi-manual servicing; no live capital movement until an NBFC agreement is in place |
| 2. Add shock insurance | 4 to 6 | Corporate-agent integration with one insurer; bundle the insurance offer into the same onboarding flow as the loan |
| 3. NBFC partnership formalized | 6 to 8 | Signed LSP agreement; first real, non-simulated loan disbursements on the NBFC's book |
| 4. Fee-into-savings product | 8 to 10 | Partner-bank or NBFC deposit account integration; live forced-savings mechanic |
| 5. Harvest-to-stipend converter | 10 to 12 | Seasonal lump-sum deposit and scheduled disbursement logic; first cohort tied to a harvest cycle |
| Ongoing | throughout | Field-partner expansion beyond the first SHG federation; compliance and audit readiness for RBI digital lending guideline requirements |

This roadmap assumes partnerships (NBFC, insurer, bank) that do not yet exist are secured on this timeline, a significant and explicitly flagged assumption, not a commitment.

---

## 8. Team and hiring plan

**Current state: solo founder and builder.** There is no team beyond one person doing product, research, and, for this pilot week, the build itself. This is stated plainly, not softened.

Realistic near-term hiring priorities, in order, once the venture has validated enough to justify hires (not committed hires, a plan):

1. **Compliance or NBFC-partnerships lead**, the first hire, given the regulatory structure is load-bearing for the entire model. Needs direct experience with RBI digital lending guidelines, NBFC partnership or LSP agreements, or prior work at an MFI or NBFC.
2. **Field operations or SHG-channel partnerships manager**, who owns the relationship with the first SHG federation or MFI partner and any subsequent ones. This role is where the distribution wedge either works or doesn't.
3. **Engineer (generalist, full-stack)**, to take the pilot build beyond a founder-built prototype. Rural-context constraints (low bandwidth, basic smartphones, possibly agent-assisted rather than self-serve UX) matter more here than typical consumer-app engineering.
4. **Credit or risk analyst**, once real loan volume exists, to work with the NBFC partner on underwriting signal quality and default tracking. This can be a shared or consulting role initially rather than a full-time hire.

No advisors, co-founders, or hires are currently in place. Sequencing compliance before engineering scale-up reflects that the regulatory relationship is the harder, slower dependency, not the software.

---

## 9. Financial projections (3 years)

**These are modeled, illustrative projections for a venture that is one week old with no real users, no revenue, and no signed partnerships, not historicals, and not a forecast anyone should rely on for a real investment decision.** Every input is a labeled assumption.

**Assumptions used:**
- SOM-consistent household growth: the pilot starts with dozens of households (per the research packet's SOM), scaling through additional SHG-federation partnerships.
- Households onboarded (cumulative, illustrative): **about 150 in year 1, about 2,000 in year 2, and about 12,000 in year 3**, a roughly order-of-magnitude annual scale-up, consistent with SHG-federation-by-federation expansion rather than viral or paid growth. This is a planning target, not a projection grounded in any signed distribution agreement.
- Revenue per household: **₹200 in year 1, ₹350 in year 2, and ₹500 in year 3**, per the unit-economics assumptions in Section 6 (the product mix deepens over time as savings and stipend products come online).
- Operating costs dominated by: field-partner commissions (CAC, Section 6), the compliance and partnerships hire (Section 8, from year 1), the engineering hire (from year 2), and NBFC and insurer integration and compliance overhead (assumed disproportionately high in year 1 as a fixed cost of the licensing structure).

| | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Households onboarded (cumulative) | about 150 | about 2,000 | about 12,000 |
| Illustrative revenue (₹) | about ₹30,000 (about $360) | about ₹700,000 (about $8,400) | about ₹6,000,000 (about $72,000) |
| Illustrative headcount (incl. founder) | 2 | 4 | 6 to 8 |
| Estimated cost base | Founder plus 1 compliance hire; NBFC and insurer integration costs dominate | Plus an engineering hire; field-partner commissions scale with volume | Plus a credit or risk role; costs still likely exceed revenue |
| Net position | Loss (pre-revenue-scale, licensing-cost-heavy) | Loss narrowing | Approaching breakeven at best, under these assumptions |

**Explicit caveat:** the household-growth curve is the single biggest lever in this table and is entirely unvalidated. It assumes each SHG-federation partnership can be replicated faster than the first one took to establish, which has not been tested. Actual year 1 economics are more likely to be dominated by one-time licensing and compliance setup costs than by these illustrative revenue figures. Treat this table as a shape check on the model, not a budget.

---

## 10. Risks

1. **Regulatory and licensing risk (primary).** The entire model depends on securing an NBFC partnership under the LSP structure (or, for insurance, a corporate-agent arrangement). RBI's September 2022 digital lending guidelines govern this closely, and no partnership currently exists. If no NBFC will partner on these terms (sub-$10 tickets, an unusual fee-into-savings structure), the loan and savings products cannot legally operate as designed. This risk is structural, not incidental, and is why Section 4 states the regulatory framing explicitly rather than glossing over it.
2. **Rural distribution and trust risk.** The entire go-to-market depends on SHG and MFI field partners extending their existing member trust to a new app-based product. That trust is not automatically transferable. If a channel partner won't vouch for Setu, or if households don't trust a new digital layer on top of a relationship they already have with their SHG, the CAC and adoption assumptions in Section 6 collapse.
3. **Zero validated traction.** This is a one-week-old pilot concept with no real users, no interviews conducted yet (the market-research packet's interview section is explicitly marked TBD), no signed channel partner, and no signed NBFC, insurer, or bank partner. Every number in Sections 6 and 9 is a planning assumption, not evidence.
4. **Credit and default risk.** Even though default risk sits primarily with the NBFC partner under the LSP structure, high default rates would make the partnership commercially unattractive to any NBFC and could unwind the entire model. Setu's revenue depends on the NBFC continuing to find the partnership worthwhile.
5. **Product-bundling execution risk.** The wedge is bundling four products that each have their own operational and regulatory complexity (lending, insurance distribution, deposit-holding, scheduled disbursement). A sequencing failure on any one of them, for example the savings or deposit infrastructure, could stall the whole roadmap in Section 7.
6. **Partner concentration risk.** Early reliance on a single NBFC, single insurer, and single SHG-federation partner (by design, for a pilot) means the loss of any one partner in year one is not a diversifiable event.
7. **Technology and access risk.** Rural connectivity and basic-smartphone (or feature-phone-adjacent) usage patterns may not support a conventional app-first UX. Field-agent-assisted flows may be required, adding cost not modeled in Section 9.

---

*Companion document: [market-research.md](market-research.md) for full sourced market sizing, competitor analysis, ICP, and wedge rationale. See [README.md](README.md) for overall submission status.*
