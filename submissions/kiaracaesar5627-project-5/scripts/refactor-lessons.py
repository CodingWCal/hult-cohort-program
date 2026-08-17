from pathlib import Path

p = Path("src/lib/lessons.ts")
text = p.read_text(encoding="utf-8")
start = text.index("export const JOB_TRACKS")
idx = text.index("export type InterviewRound", start)
core = text[start:idx]
core = core.replace(
    "export const JOB_TRACKS: JobTrack[] = [",
    "const CORE_JOB_TRACKS: JobTrack[] = [",
    1,
)
core = core.rstrip()
if not core.endswith("];"):
    raise SystemExit(f"core ending unexpected: {core[-40:]!r}")

header = """import { q, d, type Debrief, type InterviewScenario, type JobTrack } from \"./track-model\";
import { BUSINESS_JOB_TRACKS } from \"./business-tracks\";

export type { Debrief, InterviewScenario, JobTrack } from \"./track-model\";

"""

footer = """
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
  return `/practice/${round.trackSlug}/${round.slug}`;
}

export const LESSONS = ROUNDS;
export function getLesson(slug: string) {
  return ROUNDS.find((r) => r.slug === slug);
}
"""

p.write_text(header + core + "\n" + footer, encoding="utf-8")
print("ok", p.stat().st_size)
