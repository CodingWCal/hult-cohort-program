import { TRACK_DEFS } from "./track-defs";
import { buildScenarios } from "./build-scenarios";
import type { InterviewScenario, JobTrack } from "./track-model";
import { trackFamily, type TrackFamily } from "./track-family";

export type { Debrief, InterviewScenario, JobTrack } from "./track-model";
export type { TrackFamily };
export { trackFamily };

export const JOB_TRACKS: JobTrack[] = TRACK_DEFS.map((def) => {
  const scenarios = buildScenarios(def);
  if (scenarios.length !== 25) {
    throw new Error(`Track ${def.slug} has ${scenarios.length} scenarios; need exactly 25`);
  }
  return {
    slug: def.slug,
    role: def.role,
    setting: def.setting,
    blurb: def.blurb,
    scenarios,
  };
});

if (JOB_TRACKS.length !== 320) {
  throw new Error(`Expected 320 tracks, got ${JOB_TRACKS.length}`);
}

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

export function nextRoundInTrack(
  trackSlug: string,
  scenarioSlug: string,
): InterviewRound | undefined {
  const track = getTrack(trackSlug);
  if (!track) return undefined;
  const idx = track.scenarios.findIndex((s) => s.slug === scenarioSlug);
  if (idx < 0 || idx >= track.scenarios.length - 1) return undefined;
  const next = track.scenarios[idx + 1];
  return getRound(trackSlug, next.slug);
}

export function roundIndexInTrack(trackSlug: string, scenarioSlug: string): {
  index: number;
  total: number;
} {
  const track = getTrack(trackSlug);
  if (!track) return { index: 0, total: 0 };
  const index = track.scenarios.findIndex((s) => s.slug === scenarioSlug);
  return { index: index < 0 ? 0 : index, total: track.scenarios.length };
}

export const LESSONS = ROUNDS;
export function getLesson(slug: string) {
  return ROUNDS.find((r) => r.slug === slug);
}
