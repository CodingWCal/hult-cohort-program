# Distribution log — EudaLearn (≥25 external users)

**Ask:** Sign in with Ludwitt → finish one module (~8 min).  
**Links to share:**

- Marketplace: https://www.ludwitt.com/dashboard/marketplace/eudalearn  
- Direct login: https://learn-joes9987.vercel.app/login  
- Suite CTA: https://showcase-joes9987.vercel.app/suite  

**Do not ask cohort peers.** Do not use accounts containing `joes9987`.

## Copy (paste-ready)

> Quick favor — I’m shipping EudaLearn (builder-skills practice on Ludwitt) for a Hult pilot venture gate.  
> Takes ~8 minutes: open https://learn-joes9987.vercel.app/login → Sign in with Ludwitt → complete any module.  
> Marketplace listing: https://www.ludwitt.com/dashboard/marketplace/eudalearn  
> Thanks — that session counts as a real external user for our metrics.

## Channels

| Date | Channel | Action | Owner | Notes |
|------|---------|--------|-------|-------|
| 2026-08-12 | EudaMarket `/suite` | CTA live: Practice on EudaLearn + Sign in | eng | Deployed with venture polish |
| 2026-08-12 | Product | Privacy page + venture campaign tag on events | eng | `campaign=p2-venture` |
| 2026-08-12 | LinkedIn / X / email | Founder blast #1 (non-cohort) | joes9987 | **Send today** using copy above |
| 2026-08-13 | Builder Discords / communities | Soft ask, no spam | joes9987 | Target 10 completions |
| 2026-08-13–15 | Friends-of-friends | 8-min module asks | joes9987 | Aim overshoot to 35 |

## Metrics checkpoints

Pull daily:

```bash
curl -sS "https://learn-joes9987.vercel.app/api/platform/v1/apps/le_d0e87dbc215bdf4d90eaa7/metrics" \
  -H "Authorization: Bearer $LUDWITT_API_KEY"
```

| When | Target `qualified_users` | Actual | Notes |
|------|--------------------------|--------|-------|
| 2026-08-12 start | — | 1 | Baseline before venture push |
| 2026-08-13 EOD | ≥10 | _TBD_ | Escalate Fri if short |
| 2026-08-14 EOD | ≥18 | _TBD_ | |
| 2026-08-15 EOD | ≥25 | _TBD_ | Commit snapshot JSON to proof PR |
| 2026-08-16 pre-merge | ≥25 | _TBD_ | Final stamp |

## Snapshot (update before merge)

```json
{
  "note": "Replace with live metrics pull before Sunday merge",
  "app_id": "le_d0e87dbc215bdf4d90eaa7",
  "qualified_users": 1,
  "snapshot_at": "2026-08-12T18:15:29.709Z",
  "source": "https://learn-joes9987.vercel.app/api/platform/v1/apps/le_d0e87dbc215bdf4d90eaa7/metrics"
}
```
