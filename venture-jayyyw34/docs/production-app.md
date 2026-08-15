# Production app

| Requirement | How LocalPlate meets it |
|-------------|-------------------------|
| Auth | Join creates a named account (email + role + neighborhood). No password maze, per founder MVP preference. Not a demo-only ghost user. |
| Error handling | `error.tsx` + `/api/errors` client reporter. Happy-path APIs return JSON errors instead of unhandled 500s. |
| Mobile | Single-column layout, large tap targets, no hover-only actions. |
| Privacy | `/privacy` |
| Monitoring | `POST /api/errors` (Sentry-equivalent for this MVP; no third-party DSN invented). |
| Tests | `npm test` — qualify + validate critical path (≥ 5 cases). |

Health: `GET /api/health`  
Metrics: `GET /api/metrics` and `/metrics`

Deploy root: `venture-jayyyw34/` on Vercel (Next.js).
