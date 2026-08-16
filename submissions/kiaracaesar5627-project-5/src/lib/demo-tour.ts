export const TOUR_SEEN_KEY = "ir-tour-seen";

export const DEFAULT_DEMO_TRACK = "software-engineer";

/** Same six featured roles as the home page. */
export const DEMO_FEATURED_SLUGS = [
  "registered-nurse",
  "software-engineer",
  "high-school-teacher",
  "civil-engineer",
  "attorney",
  "social-worker",
] as const;

export type DemoHighlight =
  | "catalog"
  | "track"
  | "interviewer"
  | "timer"
  | "review"
  | "playbook"
  | "loop"
  | "journal";

export type DemoStep = {
  id: string;
  title: string;
  say: string;
  highlight: DemoHighlight;
  jumpLabel: string;
};

export const DEMO_STEPS: DemoStep[] = [
  {
    id: "catalog",
    title: "The catalog is the job they applied to",
    say: "Sixteen career majors, 320 tracks. This is not a generic interview coach — the prompts match the role on the application.",
    highlight: "catalog",
    jumpLabel: "Catalog",
  },
  {
    id: "track",
    title: "Thirty prompts, five of them pressure",
    say: "Each track has thirty interviewer questions. The last five are pressure questions: unclear asks, speed versus quality, and where you draw the line.",
    highlight: "track",
    jumpLabel: "Pressure questions",
  },
  {
    id: "room",
    title: "You sit across the table",
    say: "Left side is the interviewer and the application scenario. Right side is the candidate. This is the live room, not a mockup.",
    highlight: "interviewer",
    jumpLabel: "The room",
  },
  {
    id: "speak",
    title: "Speak aloud under the clock",
    say: "Start the timer and hit Speak aloud. Shortcuts: Space for the timer, S to speak, P for the playbook. Answer out loud like the interviewer is waiting.",
    highlight: "timer",
    jumpLabel: "Speak mode",
  },
  {
    id: "review",
    title: "Scratch notes, then Review my answer",
    say: "Notes stay on this device. Review my answer is a local checklist for structure and evidence — not a model rewrite, and not an AI coach. Paste the STAR skeleton if you want to show the review live.",
    highlight: "review",
    jumpLabel: "Answer review",
  },
  {
    id: "playbook",
    title: "Playbook, then debrief",
    say: "Try the prompt first. Reveal the playbook when you want structure. The debrief is a judgment check — lock an answer and read the explanation.",
    highlight: "playbook",
    jumpLabel: "Playbook",
  },
  {
    id: "loop",
    title: "Mock loop is interview day",
    say: "Five rooms in one sitting, including pressure questions, then a private scorecard on this device. Open the live loop when you want the full run.",
    highlight: "loop",
    jumpLabel: "Mock loop",
  },
  {
    id: "journal",
    title: "Journal stays on this device",
    say: "Finished rooms land in the practice journal here in the browser. If it is empty, that is honest — we do not seed fake sessions. Nothing is uploaded.",
    highlight: "journal",
    jumpLabel: "Journal",
  },
];

/** Labeled example draft — not a person, not a fake interview. */
export const SAMPLE_STAR_DRAFT = `Situation: the constraint I walked into (time, risk, or stakeholder).
Task: what I owned in that moment.
Action: the first check I ran and the decision I made.
Result: what changed, and what I would measure next.`;

export function parseStepParam(raw: string | null | undefined): number {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) return 1;
  return Math.min(n, DEMO_STEPS.length);
}

export function parseTrackParam(raw: string | null | undefined): string {
  if (raw && (DEMO_FEATURED_SLUGS as readonly string[]).includes(raw)) return raw;
  return DEFAULT_DEMO_TRACK;
}

export function markTourSeen(): void {
  try {
    window.localStorage.setItem(TOUR_SEEN_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function tourWasSeen(): boolean {
  try {
    return window.localStorage.getItem(TOUR_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}
