# Setu (working name), Investor Deck

Exploratory draft, week one of a cohort pilot. "Setu" (Hindi for "bridge") is a placeholder name, not finalized. This is a test run to see what's possible, not a polished final document. All traction claims are honest as of this writing: no real users yet.

---

## 1. Title

**Setu**, a bridge out of the scarcity trap

Small loans. Cheap insurance. Forced savings. Income smoothing. One relationship with the household, built on distribution India already trusts.

Working name, not finalized. Pre-seed, pilot stage.

---

## 2. Problem

Rural and informal-economy households in India routinely earn near or below **$2 to $3 a day** and hold almost no buffer against small shocks: a sick cow, a slow work week, a medical bill.

- Without cheap, fast, small-scale credit or insurance, a shock costing only a few dollars forces a high-interest informal loan.
- That loan starts a debt spiral, the "scarcity trap" described in behavioral-economics research on poverty.
- Existing formal digital credit in India is priced and sized for salaried urban borrowers, not sub-$10 emergency needs. The gap is a **product-design gap**, not a pure access gap. For example, livestock-insurance penetration is only **about 0.98%** of India's roughly 104.5 million cattle-owning rural households (Swiss Re, PIB), despite subsidized government schemes existing.

---

## 3. Solution

A tech platform, not a direct lender, that bundles four income-smoothing products around one household relationship, distributed through the rural finance networks (SHGs, MFIs, NGOs) that already hold trust in these communities.

Instead of competing on cold-start consumer credit scoring, the approach used by Tala, Branch, and similar apps, Setu's wedge is **bundling plus trusted distribution**: no single existing competitor combines all four product lines below into one relationship with the same household.

---

## 4. Product: four lines

1. **Small emergency loans**, sized for people earning about $1 a day, sub-$10 tickets, reasonable interest, fast approval for genuine shocks.
2. **Cheap shock micro-insurance**, for sick or dead livestock and fluctuating daily-wage work hours, priced and distributed to close the roughly 99% livestock-insurance coverage gap.
3. **Fee-into-savings loans**, a higher-fee loan product where the fee itself is deposited into a savings account opened in the borrower's own name, so the cost of credit builds an asset instead of just extracting one.
4. **Harvest-to-stipend converter**, turning an irregular lump-sum harvest payout into a predictable monthly stipend, smoothing income across the agricultural cycle.

All four are built around the same insight: informal-economy income isn't just low, it's irregular, and irregularity is what triggers the scarcity trap.

---

## 5. How it works (regulatory model)

**Setu is a technology platform, not a licensed lender.** Real consumer lending in India requires RBI or NBFC registration, or operation as a **Lending Service Provider (LSP)** on behalf of a registered NBFC, under RBI's **September 2022 digital lending guidelines**.

- Setu originates and services loans and other products in partnership with a **licensed NBFC** partner (and a licensed insurer for the microinsurance line), operating strictly within the LSP framework.
- Setu's own build this week does not move real money. The product experience, underwriting logic, and distribution model are what's being tested. The regulated balance-sheet functions sit with licensed partners.
- This is the same structural approach used by comparable players. Jai Kisan, for example, operates via its own NBFC, Kushal Finnovation, to stay compliant while iterating quickly on product.

---

## 6. Market size

- **TAM, India's agri-fintech and rural credit market:** about ₹1,200 billion (about $14.4B) (Ken Research). For growth-rate context only, the global agri-fintech market was $7.29B in 2024, projected to reach $64.69B by 2035 (21.27% CAGR).
- **SAM, households reachable via existing rural finance rails:** NABARD's **SHG-Bank Linkage Programme**, the world's largest microfinance program by client base: about **91 lakh (9.1 million) self-help groups**, about **10 crore (100 million) women**, about $25B in FY2024 loan disbursement, $7.8B in aggregate SHG savings. This is the realistic distribution channel, SHGs and MFI field agents, not a cold-start consumer app.
- **SOM, pilot-realistic, this cohort window:** a handful of villages or SHGs reachable through one MFI, NGO, or SHG federation partner, realistically **dozens to low hundreds of households** for a first pilot, not a market-wide launch.
- **Insurance-specific angle:** 104.52 million of India's 195.6 million rural households own cattle, yet livestock-insurance penetration is only about 0.98%, a large, cited coverage gap that product line 2 targets directly.

Sources: Ken Research (India Agri Fintech Market), Agri-Fintech Market Insights Report 2026, NABARD SHG-BLP coverage data, Swiss Re "Livestock in India," and the PIB Livestock Insurance Scheme release. Full citations are in `market-research.md`.

---

## 7. Competition and positioning

| Competitor | Focus | Gap vs. this idea |
|---|---|---|
| **Jai Kisan** (Bharat Khata) | Rural and agri lending, own NBFC | Loan-only. No bundled insurance or forced savings |
| **Samunnati** | Agri value-chain financing | B2B and value-chain, not direct consumer income-smoothing |
| **Farmeasy Technologies** | Loans and insurance bundle | Farmer-only. No coverage for non-farm daily-wage workers |
| **Tala and Branch International** | Smartphone micro-loans ($10 and up) | General-purpose credit only. No insurance or savings bundle. The loan floor sits at the top of the need this idea targets |
| **Traditional MFIs** (CreditAccess Grameen, Bandhan, Spandana, Fusion) | Group-lending microfinance | Massive trust and reach, but field-agent heavy, not app-first, and loan sizes are typically larger than a $10 emergency need |
| **UIIC and PMFBY** (formal insurers) | Crop and livestock micro-insurance | Government-backed but about 1% uptake, a distribution and claims-friction problem, not a product-design one |

**Positioning:** nobody in this landscape bundles all four product lines into a single household relationship. Credit players don't sell insurance or forced savings. Insurers don't lend or smooth income. Nobody offers harvest-to-monthly conversion at all. Setu's wedge is bundling, delivered through the SHG and MFI trust layer rather than cold-start digital acquisition.

---

## 8. Business model

Setu earns revenue as the **technology and origination layer**, structured to stay compliant with RBI's LSP framework:

- **Origination and servicing fees** from the licensed NBFC partner for sourcing, underwriting support, and servicing loans (a standard LSP compensation structure).
- **Insurance distribution commission** from a licensed insurer partner for the microinsurance line (an agent or corporate-agent model).
- **A platform fee** on the fee-into-savings product, structured so the borrower's fee funds their own savings account while Setu's margin comes from the servicing arrangement with the NBFC partner, not from extracting the full fee.
- **A small conversion fee** on the harvest-to-stipend product, for the cash-flow-smoothing service.
- Distribution cost stays low by routing acquisition through existing SHG and MFI field relationships rather than paid digital acquisition. This is the core unit-economics bet.

Detailed unit economics and a full financial model are being developed in `business-plan.md`, in progress in parallel with this deck.

---

## 9. Traction

**Honest status, week one of the pilot: no real users yet.** In the interest of not overstating anything to investors:

- Product concept, four-line bundle, and regulatory framing (NBFC-partnership and LSP model) are defined and written up (`market-research.md`, this deck).
- The distribution channel is identified and sized: NABARD's SHG-Bank Linkage Programme (about 91 lakh SHGs, about 10 crore women) as the realistic go-to-market rail, rather than cold-start consumer acquisition.
- The competitive landscape is mapped against 7 direct or adjacent players with sourced strengths and gaps.
- Customer discovery (5 target interviews with SHG or MFI-linked households) has **not yet been conducted**, explicitly flagged as outstanding in `market-research.md` and the immediate next step, not retrofitted after the fact.
- No app is live, no users are onboarded, and no revenue exists. Any future version of this slide will only report numbers that are real and date-stamped.

---

## 10. Go-to-market

1. **Partner-first, not user-first.** Approach one MFI, NGO, or SHG federation as a pilot distribution partner, leveraging the existing field-agent trust relationship rather than building cold-start digital acquisition.
2. **NBFC and insurer partnership in parallel.** Structure the LSP and agent relationships needed to legally originate loans and distribute microinsurance before any product goes live with real money.
3. **Narrow pilot first.** Target dozens to low hundreds of households in a handful of villages or SHGs (the SOM above), not a market-wide launch. Validate the bundle and the scarcity-trap thesis before scaling.
4. **Expand via the SHG federation network effect.** NABARD's SHG-BLP structure means a single successful federation relationship opens a path to many more SHGs within the same state or NGO network.

---

## 11. Team

- **Solo founder and builder, currently.** This is a one-person pilot this week, built as part of the Hult Cohort Program's Phase 2 "Venture" assignment.
- Background and domain depth to be filled in as the venture progresses past this exploratory stage.
- Immediate hiring and partnership gaps once past pilot: an India-based compliance and legal lead for the NBFC-partnership structure, and a field operations lead with SHG and MFI relationships.

---

## 12. Financial highlights (illustrative projections; see `business-plan.md`, Sections 6 and 9, for full assumptions)

These are modeled planning assumptions for a one-week-old, pre-revenue pilot, not historicals, not a forecast to underwrite an investment on.

| | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Households onboarded (cumulative, illustrative) | about 150 | about 2,000 | about 12,000 |
| Illustrative revenue | about ₹30,000 (about $360) | about ₹700,000 (about $8,400) | about ₹6,000,000 (about $72,000) |
| Illustrative headcount (incl. founder) | 2 | 4 | 6 to 8 |
| Net position | Loss (licensing and compliance-cost-heavy) | Loss narrowing | Approaching breakeven at best |

- The revenue model is fee and commission based (LSP origination and servicing fee, insurance distribution commission, savings-product platform fee, stipend-conversion fee). Setu does not carry credit risk or hold customer deposits itself; that sits with the NBFC, bank, and insurer partners.
- Illustrative unit economics: CAC of about ₹100 (about $1.20) per household (channel-piggybacked via SHG and MFI field partners, not paid acquisition) against an illustrative 3-year LTV of about ₹600 to ₹900 (about $7 to $11) per household, an illustrative 6x to 9x LTV to CAC ratio, **not yet tested against real default rates or channel-partner terms**.
- Year 1 costs are likely dominated by one-time NBFC and insurer compliance and integration setup, not by these small illustrative revenue figures.
- **The single biggest lever, household growth via federation replication, is entirely unvalidated.** Full model, assumptions, and caveats are in `business-plan.md`.

---

## 13. The ask

**Raising (illustrative): $150,000 to $250,000 pre-seed**, to fund:

- NBFC and insurer partnership and legal setup (LSP compliance structure under RBI's September 2022 digital lending guidelines)
- MVP app build and a first SHG or MFI-federation pilot (dozens to low hundreds of households)
- Customer discovery and iteration (starting with the 5 outstanding interviews noted above)
- A small founding ops and compliance hire in-market

This figure is illustrative and directional for a pre-seed India fintech pilot, not a firm, modeled ask. It will be revised once `business-plan.md` and real pilot data exist.

---

## 14. Vision (closing)

If the bundle works in one SHG federation, the same trust-based distribution model can scale across NABARD's roughly 91 lakh SHG network, turning "a bridge out of one shock" into a durable, low-cost-of-acquisition financial-inclusion platform, always operating in partnership with licensed NBFC and insurance partners rather than as an unlicensed lender.
