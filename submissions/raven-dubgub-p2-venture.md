# Phase 2 Venture Submission — @raven-dubgub

**RAVEN** (@raven-dubgub) · Hult Cohort Developer Program · Summer 2026 · Week 6 (`phase-2-venture`)

**Production URL:** https://venture-raven-dubgub.vercel.app  
**Repo:** https://github.com/RAVEN-dubgub/venture-raven-dubgub  
**Reviewer smoke test:** [docs/REVIEWER.md](https://github.com/RAVEN-dubgub/venture-raven-dubgub/blob/main/docs/REVIEWER.md)

## Production URL

https://venture-raven-dubgub.vercel.app

Per Ludwitt cohort clarification: this Vercel URL is the production listing URL (no Ludwitt app directory entry for the venture product).

## App namespace / metrics

Venture metrics use a **separate namespace** from the learning app Ludwitt registration.

| Field | Value |
|-------|-------|
| `app_namespace` | `venture-agent-git-lab-teams` |
| Metrics endpoint | `GET https://venture-raven-dubgub.vercel.app/api/metrics` |
| Health check | `GET https://venture-raven-dubgub.vercel.app/api/health` |
| Learning app (connected) | https://learning-raven-dubgub.vercel.app |

Qualified actions: `TEAM_CREATED`, `DEMO_LESSON_STARTED` (unique users counted in `qualified_users`).

## Metrics API snapshot (date-stamped)

Captured **2026-08-13T22:18:39Z** from production:

```json
{
  "snapshot_at": "2026-08-13T22:18:39.820Z",
  "app_namespace": "venture-agent-git-lab-teams",
  "total_users": 0,
  "total_teams": 0,
  "unique_users": 0,
  "qualified_users": 0,
  "events_by_type": {},
  "recent_teams": []
}
```

**Pass gate note:** `qualified_users` must reach ≥25 before merge deadline (Aug 19, 2026 17:00 ET). Joshua is promoting external signups on `/app` using `docs/USER-PUSH.md`. Re-capture snapshot before final review.

## Submission artifacts (repo paths)

| Artifact | Path | Status |
|----------|------|--------|
| Market research | `docs/market-research.md` | Secondary research complete; 5 external interviews **PENDING (Joshua)** |
| Business plan | `docs/business-plan.md` | Complete |
| Business plan PDF | `docs/business-plan.pdf` | Complete |
| Financial model | `docs/financial-model.md`, `docs/financial-model.csv` | Complete |
| Pitch deck PDF | `docs/pitch-deck.pdf` | Complete (10 slides) |
| One-pager PDF | `docs/one-pager.pdf` | Complete |
| Pitch preview (web) | `/pitch` | Live |
| Investor log | `INVESTOR_LOG.md` | 20 firms named; ≥1 touch **PENDING (Joshua)** |
| User promotion copy | `docs/USER-PUSH.md` | Ready to post |
| Interview script | `docs/INTERVIEW-SCRIPT.md` | Ready |
| Investor email variants | `docs/investor-emails/` (5 files) | Templates ready |
| Week plan | `WEEK-PLAN.md` | Aug 14–19 checklist |
| Human-only checklist | `JOSHUA-TODO.md` | Documented |

Regenerate PDFs: `npm run export:pdfs` in venture repo.

## Venture thesis

**Agent Git Lab Teams** — B2B team onboarding for bootcamps and cohort programs. Operators create a workspace, launch learners into [Agent Git Lab](https://learning-raven-dubgub.vercel.app), and track qualified product actions. Built on RAVEN's existing cohort stack (PM, comms, showcase, learning app).

## Summary

| Requirement | Shipped |
|-------------|---------|
| Production venture app | Yes — Next.js 16 on Vercel |
| Team workspace + demo lesson flow | Yes — `/app` |
| Venture metrics namespace | Yes — `venture-agent-git-lab-teams` |
| Market research packet | Secondary complete; interviews pending |
| Business plan + financial model | Yes |
| Pitch deck + one-pager PDFs | Yes — in `docs/` |
| Investor materials | Template + email draft; touch log pending |
| Automated tests | Yes — 6 tests on critical helpers |

## Architecture

Next.js 16 · Prisma · Neon · JWT auth · Vercel

```
Browser → Next.js (Vercel) → Neon (users, teams, product events)
              │
              ├─ Launch learners → learning-raven-dubgub.vercel.app
              └─ GET /api/metrics → qualified_users snapshot
```

## Connected cohort products

| Product | URL |
|---------|-----|
| Agent Git Lab (learner) | https://learning-raven-dubgub.vercel.app |
| Cohort PM | https://pm-raven-dubgub.vercel.app |
| Cohort comms | https://comms-raven-dubgub.vercel.app |
| Public showcase | https://showcase-raven-dubgub.vercel.app |

## Agent usage

- Scaffolded venture repo, team portal, metrics API, docs set
- Generated PDF exports via `scripts/export-pdfs.mjs`
- Financial model and submission checklist aligned to pass gates
- Did **not** fabricate user metrics, interviews, or investor log entries

## How to review

1. Open https://venture-raven-dubgub.vercel.app
2. Sign up at `/app`, create a team, start demo lesson
3. Check `GET /api/metrics` for namespace + snapshot
4. Skim `docs/pitch-deck.pdf`, `docs/one-pager.pdf`, `docs/business-plan.pdf`
5. Read `docs/market-research.md` and `INVESTOR_LOG.md` for human-pending gates

## Known limitations (human gates)

- `qualified_users` is 0 at Aug 13 snapshot — external promotion in progress toward ≥25 (see `docs/USER-PUSH.md`)
- Five external customer interviews not yet completed (template ready)
- Zero qualified investor touchpoints logged (target list + outreach pending)
- PR merge requires staff review after pass gates met

## Test plan

- [x] Production URL returns 200
- [x] `/api/metrics` returns namespace + date-stamped snapshot
- [x] `/api/health` returns ok
- [x] PDF artifacts committed in `docs/`
- [x] `npm run test` passes (6 tests)
- [x] `npm run build` passes
- [x] `npm run lint` passes (Aug 13, 2026)
- [x] PDFs re-exported Aug 13, 2026
- [x] Promotion + investor + interview docs ready
- [ ] Joshua: ≥25 qualified external users on metrics snapshot
- [ ] Joshua: ≥1 verified investor touch in `INVESTOR_LOG.md`
- [ ] Joshua: 5 external customer interviews in `docs/market-research.md`
