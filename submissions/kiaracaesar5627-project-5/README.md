# Interview Room (Week 5 · venture)

Production interview-practice app plus venture packet (research, plan, deck, investor log).

Extends the Week 4 Ludwitt learning app. Live URL is unchanged:

**https://kiaracaesar5627-project-4.vercel.app**

## Commands

```bash
cp .env.example .env.local
npm install
npm test
npm run dev
npm run build
npm run smoke
npm run snapshot -- https://kiaracaesar5627-project-4.vercel.app
```

## Docs

| File | Contents |
|------|----------|
| `docs/01-market-research.md` | TAM/SAM/SOM citations + interview protocol |
| `docs/02-business-plan.md` | Plan, model, labeled financial assumptions |
| `docs/03-investor-materials.md` | Deck / one-pager index |
| `docs/04-production-app.md` | Production checklist + metrics source |
| `docs/INVESTOR_LOG.md` | Investor touch log (redact PII) |
| `docs/metrics-snapshot.json` | Date-stamped `/v1` snapshot |

## Do not

- Invent user counts, interviews, or investor meetings
- Count cohort handles or ids containing `kiaracaesar5627`
- Commit `.env.local`
