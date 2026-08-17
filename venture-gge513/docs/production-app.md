# Production app

**URL:** https://latent-nu.vercel.app  
**Repo:** https://github.com/gge513/latent  
**Local:** `cursor-course/week3-vibe/latent/` (own git; gitignored by the course repo)

## Production-grade checklist (curriculum `production-app.md` vs live)

| Requirement | Latent | Evidence |
|---|---|---|
| Auth | Real GitHub OAuth on `/claim` only. Visitors have no account, by lock. | `auth.ts` |
| Error handling | Match degrades to keyword rung; counting failures return the same 204 as success. No site-wide `error.tsx`. Unhandled 500s on the happy path are not the design; degradation is. | `app/api/match`, `app/api/event` |
| Mobile | Sentence frame, space, and cards are usable on a phone (the original visual brief). Not re-audited this session. | Live site |
| Privacy | Live at `/privacy` (deployed 2026-08-16); README states the same policy. Rate-limit table stores **salted IP hashes**, disclosed there. | https://latent-nu.vercel.app/privacy; `lib/rate-limit.ts` |
| Monitoring | No Sentry. PostHog is an aggregate action mirror under one constant identity, not error monitoring. **Disclosed.** | `lib/analytics.ts` |
| Tests | Integration smoke, read-only against the live schema. Well more than 5 assertions, including Lock 4 (events has no handle/user/ip column). | `npm test` → `scripts/integration-smoke.mts` |

## Metrics

**Source (live, deployed 2026-08-16):** `GET https://latent-nu.vercel.app/api/metrics`  
**Human-readable:** `https://latent-nu.vercel.app/proof`

Not Ludwitt. Not a self-report. Neon aggregate of `latent.events` plus claimed/total builders.

`unique_users` and `qualified_users` are **null**. Producing them would require a person column the schema is written to refuse. Cohort-member exclusion cannot be applied to visitors for the same reason.

## What this week will not change on the product

- The substrate
- Ranking
- Visitor identity
- A `/investors` route
- Support
- The `/partners` “this site takes nothing” sentence (true of this instance)
