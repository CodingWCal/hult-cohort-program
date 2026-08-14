import { readFileSync, writeFileSync } from "node:fs";

const text = readFileSync("src/lib/lessons.ts", "utf8");
const start = text.indexOf("export const JOB_TRACKS");
const idx = text.indexOf("export type InterviewRound", start);
let core = text.slice(start, idx);
core = core.replace(
  "export const JOB_TRACKS: JobTrack[] = [",
  "const CORE_JOB_TRACKS: JobTrack[] = [",
);
core = core.trimEnd();
if (!core.endsWith("];")) {
  throw new Error("unexpected core ending: " + JSON.stringify(core.slice(-40)));
}

const header = `import { q, d, type Debrief, type InterviewScenario, type JobTrack } from "./track-model";
import { BUSINESS_JOB_TRACKS } from "./business-tracks";

export type { Debrief, InterviewScenario, JobTrack } from "./track-model";

`;

const footer = `
export const JOB_TRACKS: JobTrack[] = [...CORE_JOB_TRACKS, ...BUSINESS_JOB_TRACKS];

export type InterviewRound = InterviewScenario & {
  trackSlug: string;
  role: string;
  setting: string;
};

export const ROUNDS: InterviewRound[] = JOB_TRACKS.flatMap((track) =>
  track.scenarios.map((s) => ({
    ...s,
    trackSlug: track.slug,
    role: track.role,
    setting: track.setting,
  })),
);

export function getTrack(slug: string): JobTrack | undefined {
  return JOB_TRACKS.find((t) => t.slug === slug);
}

export function getRound(trackSlug: string, scenarioSlug: string): InterviewRound | undefined {
  return ROUNDS.find((r) => r.trackSlug === trackSlug && r.slug === scenarioSlug);
}

export function roundPath(round: InterviewRound): string {
  return \`/practice/\${round.trackSlug}/\${round.slug}\`;
}

export const LESSONS = ROUNDS;
export function getLesson(slug: string) {
  return ROUNDS.find((r) => r.slug === slug);
}
`;

writeFileSync("src/lib/lessons.ts", header + core + "\n" + footer);
console.log("rewrote lessons.ts");
