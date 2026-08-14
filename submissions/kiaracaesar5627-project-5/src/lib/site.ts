export const SITE = {
  name: "Interview Room",
  tagline: "Sit across the table from the interview for the job you applied to.",
  description:
    "Role-specific mock interviews across 16 career majors and 320 tracks — speak mode, timers, playbooks, mock loops, and a private on-device practice journal.",
  topic: "Interview prep by role",
  handle: "kiaracaesar5627",
  cohort: "Hult Cohort Summer Pilot 2026",
} as const;

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
