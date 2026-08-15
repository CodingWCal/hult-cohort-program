export const SITE = {
  name: "Interview Room",
  tagline: "Sit across the table from the interview for the job you applied to.",
  description:
    "Role-specific mock interviews across 16 career majors and 320 tracks — 30 prompts each including 5 cutting-edge Edge rooms, speak mode, mock loops, answer review with interview tips, and a private on-device journal.",
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
