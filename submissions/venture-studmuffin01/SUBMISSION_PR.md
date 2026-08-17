# Submission PR checklist — Project 5

## GitHub PR

- **Title:** `[P2-Venture] Submission — studmuffin01`
- **Base:** `projects/summer26/phase-2-venture` (**not** `main`)
- **Head:** `participants/summer26/phase-2-venture/studmuffin01`
- **Merge by:** Sunday 16 August 2026, 17:00 Eastern
- **Open PR:** https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/296

## PR body must include

- [x] Investor deck link/path in repo (`docs/pitch-deck.pdf`)
- [x] Business plan path (`docs/business-plan.md`)
- [ ] App URL + user metrics (source named + date-stamped) — see `docs/METRICS.md`
- [ ] Investor touch log path (`INVESTOR_LOG.md`, redact PII) — placeholder until real send
- [x] Note if using reference API because Ludwitt portal/host failed
- [x] Customer discovery summary path

## Suggested PR body draft (paste into #296)

```markdown
## Summary
AI Prompting Academy — MVP workplace AI LMS for professional prompt craft (SCORE / Prompt Like a Pro), with individual + team pricing.

## Investor deck
`submissions/venture-studmuffin01/docs/pitch-deck.pdf`

## One-pager
`submissions/venture-studmuffin01/docs/one-pager.pdf`

## Business plan
`submissions/venture-studmuffin01/docs/business-plan.md`

## Customer discovery
`submissions/venture-studmuffin01/docs/survey-summary.md` — 35 survey responses (13–15 Aug 2026); 11 pilot leads. Validates problem + soft WTP. Not counted as product users or investor engagement.

## App URL + user metrics
- App: https://prompt-like-a-pro-red.vercel.app
- Metrics source: self-hosted Ludwitt reference API (venture app id: TBD)
- Snapshot (date): TBD — filling before merge (≥25 qualified external users)
- Note: survey respondents are not counted toward the ≥25 user gate

## Investor touch log
`submissions/venture-studmuffin01/INVESTOR_LOG.md` (PII redacted) — entry pending qualified investor send

## Notes
Used reference API for venture metrics per staff guidance (Week 4 Ludwitt host/docs issues).
Discovery packet and PDFs added after PR open; requesting staff review of evidence pack.
```

## Push pack (local)

```powershell
powershell -ExecutionPolicy Bypass -File submissions/venture-studmuffin01/scripts/push-pack.ps1
```
