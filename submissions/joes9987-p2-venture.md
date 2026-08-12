# [P2-Venture] Submission — @joes9987

Summer Pilot 2026 · Week 5 · Startup / entrepreneurship

## Production app

**EudaLearn** — https://learn-joes9987.vercel.app  
**Login:** https://learn-joes9987.vercel.app/login  
**Marketplace (approved):** https://www.ludwitt.com/dashboard/marketplace/eudalearn  
**Client ID:** `le_d0e87dbc215bdf4d90eaa7`  
**Build repo:** https://github.com/joes9987/learn-joes9987  

Suite GTM: https://showcase-joes9987.vercel.app/suite

## Metrics source (named)

**Own Ludwitt-shaped reference API** (curriculum host `api.ludwitt.hult` does not resolve in DNS).  
Identity + listing use live Ludwitt Creator (app **approved**; OAuth client accepted — token probe returns `invalid_grant` on fake codes, not `invalid_client`).

```text
GET https://learn-joes9987.vercel.app/api/platform/v1/apps/le_d0e87dbc215bdf4d90eaa7/metrics
Authorization: Bearer $LUDWITT_API_KEY
```

Qualified = unique external `user_id` with ≥1 non-heartbeat event.  
Excluded: ids containing `joes9987`. Venture events tagged `metadata.campaign = "p2-venture"`.

### Snapshot (update before merge Sunday)

See also `venture-joes9987/DISTRIBUTION.md`.

```json
{
  "app_id": "le_d0e87dbc215bdf4d90eaa7",
  "qualified_users": 1,
  "unique_users": 1,
  "snapshot_at": "2026-08-12T18:15:29.709Z",
  "source": "own /api/platform/v1 metrics",
  "note": "Baseline at proof draft; replace with ≥25 pull before Sunday merge"
}
```

## Investor materials (in repo)

| Artifact | Path |
|----------|------|
| Pitch deck PDF | [venture-joes9987/docs/pitch-deck.pdf](../venture-joes9987/docs/pitch-deck.pdf) |
| One-pager PDF | [venture-joes9987/docs/one-pager.pdf](../venture-joes9987/docs/one-pager.pdf) |
| Business plan | [venture-joes9987/docs/business-plan.md](../venture-joes9987/docs/business-plan.md) |
| Market research | [venture-joes9987/docs/market-research.md](../venture-joes9987/docs/market-research.md) |
| Financial model | [venture-joes9987/docs/financial-model.md](../venture-joes9987/docs/financial-model.md) |
| Investor log | [venture-joes9987/INVESTOR_LOG.md](../venture-joes9987/INVESTOR_LOG.md) |
| Outreach pack | [venture-joes9987/docs/investor-outreach.md](../venture-joes9987/docs/investor-outreach.md) |
| Distribution | [venture-joes9987/DISTRIBUTION.md](../venture-joes9987/DISTRIBUTION.md) |

## Investor touch

See `venture-joes9987/INVESTOR_LOG.md`. Qualifying call or written deck feedback to be logged after Wed/Thu outreach batches (PII redacted).

## Thesis

Venture product = **EudaLearn**. Euda suite proves shipping capacity and provides distribution. Revenue = Ludwitt BYOB credit share (70%) + future B2B cohort packs.

## Founder actions remaining before Sunday 5pm ET merge

1. Manual OAuth smoke as a non-self account if possible  
2. Send distribution blasts + investor email batches (templates ready)  
3. Log ≥1 qualified investor touch  
4. Replace metrics snapshot when `qualified_users ≥ 25`  
5. Confirm PR base is `projects/summer26/phase-2-venture`
