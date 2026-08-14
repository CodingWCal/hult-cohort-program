/** Local-only practice journal (browser). Never invents server metrics. */

export type SelfScore = {
  structure: number; // 1–5
  evidence: number;
  clarity: number;
};

export type JournalEntry = {
  id: string;
  trackSlug: string;
  role: string;
  scenarioSlug: string;
  title: string;
  at: string; // ISO
  mode: "single" | "loop";
  scores?: SelfScore;
  debriefCorrect?: boolean;
};

export type JournalState = {
  version: 1;
  entries: JournalEntry[];
  recentTracks: string[];
};

const KEY = "interview-room-journal-v1";
const MAX_ENTRIES = 80;

function empty(): JournalState {
  return { version: 1, entries: [], recentTracks: [] };
}

export function readJournal(): JournalState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as JournalState;
    if (parsed?.version !== 1 || !Array.isArray(parsed.entries)) return empty();
    return parsed;
  } catch {
    return empty();
  }
}

export function writeJournal(state: JournalState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function recordPractice(entry: Omit<JournalEntry, "id" | "at"> & { at?: string }): JournalState {
  const state = readJournal();
  const full: JournalEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: entry.at ?? new Date().toISOString(),
  };
  state.entries = [full, ...state.entries].slice(0, MAX_ENTRIES);
  state.recentTracks = [entry.trackSlug, ...state.recentTracks.filter((s) => s !== entry.trackSlug)].slice(
    0,
    8,
  );
  writeJournal(state);
  return state;
}

export function averageScores(entries: JournalEntry[]): SelfScore | null {
  const scored = entries.filter((e) => e.scores);
  if (!scored.length) return null;
  const n = scored.length;
  const sum = scored.reduce(
    (acc, e) => ({
      structure: acc.structure + (e.scores?.structure ?? 0),
      evidence: acc.evidence + (e.scores?.evidence ?? 0),
      clarity: acc.clarity + (e.scores?.clarity ?? 0),
    }),
    { structure: 0, evidence: 0, clarity: 0 },
  );
  return {
    structure: Math.round((sum.structure / n) * 10) / 10,
    evidence: Math.round((sum.evidence / n) * 10) / 10,
    clarity: Math.round((sum.clarity / n) * 10) / 10,
  };
}
