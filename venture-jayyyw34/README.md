# LocalPlate

Neighborhood micro-marketplace: home cooks and bakers list a daily menu; neighbors reserve plates for pickup.

**Founder:** jayyyw34 · Hult Cohort Summer Pilot 2026 · Week 5 venture

## Production

Deploy this folder as a Vercel Next.js project (`venture-jayyyw34/` is the app root).

- App URL: https://localplate-jayyyw34.vercel.app
- Health: `/api/health`
- Metrics: `/api/metrics` · `/metrics`
- Deck: `/investors/deck` (print to PDF)
- One-pager: `/investors`
- Privacy: `/privacy`

## Fresh clone

```bash
cd venture-jayyyw34
cp .env.example .env.local   # optional; no secrets required for the MVP
npm install
npm test
npm run dev
```

Open http://localhost:3000 — browse menus, join (name + email + role), list a dish or reserve a plate.

## Docs

| Artifact | Path |
|----------|------|
| Business plan | [docs/business-plan.md](docs/business-plan.md) |
| Market research | [docs/market-research.md](docs/market-research.md) |
| Pitch deck | [docs/pitch-deck.md](docs/pitch-deck.md) |
| One-pager | [docs/one-pager.md](docs/one-pager.md) |
| Investor log | [INVESTOR_LOG.md](INVESTOR_LOG.md) |

## Notes

- Seeded Greater Boston kitchens keep the board from being empty. They are demo listings, not claimed live vendors.
- Accounts are email + name + role. No password flow (founder MVP preference).
- Serverless persistence uses a temporary JSON store and can reset. Do not put secrets in the forms.
- Metrics exclude user ids/emails containing `jayyyw34`.
