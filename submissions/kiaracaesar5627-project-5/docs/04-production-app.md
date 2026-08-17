# Production application

## URL

https://interviewroom-kiaracaesar5627.vercel.app/  

Same Vercel project as Week 4 (`kiaracaesar5627-project-4`), aliased as `interviewroom-kiaracaesar5627`. This venture extends that app; it is not a second invented product.

## Stack

Next.js 15 App Router, TypeScript, Tailwind 4, `jose` JWTs, same-origin Ludwitt `/v1`.

## Production-grade checklist

| Item | Where |
|------|--------|
| Auth / identity | Ludwitt JWT launch **or** guest cookie (`pf_anon` / `pf_session`) |
| Error handling | `src/app/error.tsx` + JSON 4xx on API routes |
| Mobile | existing responsive CSS; 44px-ish buttons in `.choice` / `.btn` |
| Privacy | `/privacy` |
| Monitoring | `/health` JSON (`ok`, `persist_mode`, `app_id`); Vercel deployment logs |
| Tests | `npm test` — blocklist + metrics (≥5 cases) |
| Metrics source | **own reference API** (`/v1` on this host), not hosted Ludwitt |

## User-count source (Week 5 gate)

- **Source:** own instance of the reference API (same origin `/v1`)  
- **Snapshot file:** `docs/metrics-snapshot.json` (date-stamped by `npm run snapshot -- <url>`)  
- **Public JSON:** `/api/metrics-public`  
- **Exclusions:** cohort handles in `qualify.ts`; any user id containing `kiaracaesar5627`  
- **Persistence:** JSON file at `data/events.json` locally; `/tmp/interview-room-events.json` on Vercel. Cold starts on new instances can drop in-memory+/tmp state — the committed snapshot is the grader artifact.

Self-reported counts are not used.
