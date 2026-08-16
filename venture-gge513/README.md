# Latent — Phase 2 venture package (@gge513)

**Latent is a proximity engine.** One sentence about what you are trying to do;
two or three people whose public work sits closest, each with a written reason;
a pick; a message to send.

| | |
|---|---|
| Live product | https://latent-nu.vercel.app |
| Repo | https://github.com/gge513/latent |
| Public metrics | https://latent-nu.vercel.app/api/metrics |
| Privacy | https://latent-nu.vercel.app/privacy |

## The package

| Artifact | Path |
|---|---|
| Business plan | [docs/business-plan.md](docs/business-plan.md) |
| Pitch deck (12 slides) | [docs/pitch-deck.md](docs/pitch-deck.md) |
| One-pager | [docs/one-pager.md](docs/one-pager.md) |
| Market research | [docs/market-research.md](docs/market-research.md) |
| Financial model | [docs/financial-model.md](docs/financial-model.md) |
| Investor materials index | [docs/investor-materials.md](docs/investor-materials.md) |
| Investor log | [INVESTOR_LOG.md](INVESTOR_LOG.md) |
| Production app checklist | [docs/production-app.md](docs/production-app.md) |
| Metrics snapshot (from production) | [docs/metrics-snapshot.json](docs/metrics-snapshot.json) |

## One thing to know before grading the user count

Latent does not produce a unique-user number, and that is a design commitment,
not a gap: the events table has no person, handle, or IP column, so the count
cannot exist without betraying the product. The metrics snapshot reports
`unique_users: null` with the reason, plus the real aggregates the schema does
allow (matches, picks, shares, claims), date-stamped from the production
endpoint. The full argument is in the business plan.
