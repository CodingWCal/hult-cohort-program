## Summary
**Setu** (working name, Hindi for "bridge") — a small-loan, micro-insurance, and income-smoothing app for rural India, aimed at the scarcity trap that daily-wage and small-farm households fall into: sub-$10 emergency loans sized for ~$1/day earners, cheap shock insurance for things like a sick cow or a slow work week, high-fee loans whose fees route into a savings account in the borrower's name, and a harvest-lump-sum-to-monthly-stipend conversion. This is an exploratory pilot this week, not a finished venture — the goal is to see what's possible, not to force every pass-gate closed by Sunday.

## Investor deck
See [pitch-deck.md](pitch-deck.md) (14 sections) and [one-pager.md](one-pager.md). Traction slide is honest: no real users yet. PDF export still TBD.

## Business plan
See [business-plan.md](business-plan.md). All financials are labeled illustrative planning assumptions for a one-week-old pilot, not results.

## App URL + user metrics
**Production app:** https://setu-ramyatolety.vercel.app (repo: [RamyaTolety/setu-ramyatolety](https://github.com/RamyaTolety/setu-ramyatolety))
**Metrics source:** self-hosted, first-party analytics with UTM tracking (own Firestore, no Ludwitt/third-party integration — accepted per the program's "self-hosted Plausible with UTM" alternate metrics path)
**Snapshot:** TBD — 0 users as of 2026-08-11; not yet promoted to anyone
**Known blocker:** Firebase project isn't provisioned yet (deployed with placeholder env vars), so sign-in and data calls will fail until a real Firebase project is created and `firebase login` is run locally — that step needs a human, not an agent.

## Investor prospect list (research only, not outreach)
See [investor-prospects.md](investor-prospects.md) — 20 researched firms/angels, none contacted yet.

## Investor touch log
_TBD — in progress. Nothing logged yet; `INVESTOR_LOG.md` only gets an entry after a real, verifiable investor conversation._

## Notes on real-world constraints
Real consumer lending in India requires RBI/NBFC registration (or operating as a Lending Service Provider on behalf of a registered NBFC under RBI's Sep 2022 digital lending guidelines). This pilot is scoped as a tech platform that would originate/service loans in partnership with a licensed NBFC, not as a direct lender — the app itself won't move real money this week.

## Market research
See [market-research.md](market-research.md) for the competitive landscape and market sizing (interviews section still TBD — those need real conversations, not desk research).

## Test plan
- [ ] ≥25 qualified external users, date-stamped snapshot
- [ ] At least one documented investor engagement (PII redacted)
- [x] Investor deck committed in repo
- [x] Business plan committed in repo
