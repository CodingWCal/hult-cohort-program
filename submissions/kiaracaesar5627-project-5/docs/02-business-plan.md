# Business plan — Interview Room

**Date:** 13 August 2026  
**Stage:** pre-revenue production app  
**Entity:** not incorporated in this packet (operating as a founder project under GitHub @kiaracaesar5627)

## Executive summary

Interview Room is a mock-interview product organized by **job application track**. The production catalog is 25 roles × 20 interviewer questions. Distribution today is a public Vercel app plus a Ludwitt-compatible `/v1` API on the same origin. There is **no revenue**. User counts come only from the dated API snapshot, never from a self-report.

## Product

- Live: https://kiaracaesar5627-project-4.vercel.app  
- Practice: `/practice` (guest cookie identity)  
- Platform launch: `/launch?token=` (Ludwitt JWT)  
- Privacy: `/privacy`  
- Metrics: `/metrics` and `/api/metrics-public`  
- Investor one-pager: `/investors` · deck: `/investors/deck` (print to PDF)

## Customers

1. **Job seekers in-process** (B2C) — need role-matched prompts this week.  
2. **Career centers / bootcamps** (B2B) — need a catalog they can point a class at.  
3. **Ludwitt/Hult directory learners** — JWT-launched sessions.

No signed customer is claimed here.

## Model

| Motion | Price (assumption) | Status |
|--------|--------------------|--------|
| B2C subscription | $12 / month | Not billed |
| Campus / bootcamp seat | $8–15 / active learner / term | No contracts |
| Platform listing | distribution, not a fee | Live catalog |

## Unit economics (labeled assumptions, not actuals)

- Gross margin on software: ~85% if hosting stays on Vercel hobby/pro and content is already written.  
- CAC: unknown until a paid channel is run. Do not invent a CAC.  
- Contribution: cannot be computed without CAC and conversion.

## Three-year plan (plan, not forecast)

| | Year 1 | Year 2 | Year 3 |
|--|--------|--------|--------|
| Focus | Distribution + durable metrics | First campus contracts | Repeatable B2B |
| Revenue (assumption) | $0–40k if a pilot converts | $120k if 2–3 campuses | $400k if seats compound |
| Team | founder | +1 content/campus | +1 AE |
| Headcount cost | $0 salary in Y1 plan | $80k | $180k |

These rows are a **planning sketch**. They are not historical results.

## Use of a $150k conversation

- 50% distribution (career-center travel, landing pages, not ads until CAC is measured)  
- 30% product (durable event store, saved progress, email-linked accounts)  
- 20% runway (hosting, legal, incorporation)

## Risks

- **User-gate risk:** serverless event log is instance-local (`/tmp` on Vercel). Counts reset on cold instances unless a hosted DB is attached. Snapshot in `docs/metrics-snapshot.json` is the evidence, not a dashboard screenshot.  
- **Discovery risk:** five customer interviews are not done.  
- **Category risk:** LeetCode owns “practice” mindshare for SWE.  
- **Solo-founder risk:** no bench.

## Milestones

1. Keep the production app up and the `/v1` metrics endpoint authenticatable.  
2. Fill five interview rows in `01-market-research.md`.  
3. Land ≥25 qualified external users on a dated snapshot (cohort / own-handle excluded).  
4. Document one qualified investor touch in `INVESTOR_LOG.md` (redact PII).
