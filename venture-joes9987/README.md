# EudaLearn — Week 5 Venture (@joes9987)

**Product:** EudaLearn — short builder-skills practice modules on Ludwitt (BYOB credits).  
**Suite GTM:** EudaMarket / EudaPM / EudaChat.

| Item | URL |
|------|-----|
| App | https://learn-joes9987.vercel.app |
| Login | https://learn-joes9987.vercel.app/login |
| Marketplace | https://www.ludwitt.com/dashboard/marketplace/eudalearn |
| Suite | https://showcase-joes9987.vercel.app/suite |
| Client ID | `le_d0e87dbc215bdf4d90eaa7` |

## Metrics source (named for graders)

**Own reference-shaped API** (curriculum host `api.ludwitt.hult` does not resolve):

```bash
curl -sS "https://learn-joes9987.vercel.app/api/platform/v1/apps/le_d0e87dbc215bdf4d90eaa7/metrics" \
  -H "Authorization: Bearer $LUDWITT_API_KEY"
```

Qualified user = unique external `user_id` with ≥1 non-`session_heartbeat` event.  
Ids containing `joes9987` are excluded. Venture events carry `metadata.campaign = "p2-venture"`.

## Docs

| Artifact | Path |
|----------|------|
| Market research | [docs/market-research.md](docs/market-research.md) |
| Business plan | [docs/business-plan.md](docs/business-plan.md) |
| Pitch deck | [docs/pitch-deck.pdf](docs/pitch-deck.pdf) |
| One-pager | [docs/one-pager.pdf](docs/one-pager.pdf) |
| Financial model | [docs/financial-model.md](docs/financial-model.md) |
| Investor log | [INVESTOR_LOG.md](INVESTOR_LOG.md) |
| Distribution | [DISTRIBUTION.md](DISTRIBUTION.md) |
| Outreach pack | [docs/investor-outreach.md](docs/investor-outreach.md) |

## OAuth

Creator app **approved**. Prefer Sign in with Ludwitt. Token endpoint accepts client (probe: `invalid_grant` on fake code).
