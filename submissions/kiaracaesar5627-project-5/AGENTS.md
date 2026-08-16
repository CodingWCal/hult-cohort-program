# AGENTS.md — Interview Room (Project 5 / Week 5 venture)

## Goal

Ship venture documentation and a production interview app with traceable
external-user metrics. Product stays job-application interview practice.

## Commands

```bash
npm install
npm run dev
npm run build
npm test
npm run smoke
npm run snapshot -- https://interviewroom-kiaracaesar5627.vercel.app
```

## Key paths

- `src/lib/lessons.ts` — job tracks
- `src/lib/platform/**` — own Ludwitt `/v1` instance
- `docs/` — research, plan, investor log, metrics snapshot

## Do not

- Invent users, interviews, or investor meetings
- Count cohort members or user ids containing `kiaracaesar5627`
- Commit `.env.local`
- Re-add an AI coach
