export type LearningEventName =
  | "lesson_started"
  | "lesson_completed"
  | "quiz_submitted"
  | "session_heartbeat";

export type StoredEvent = {
  app_id: string;
  event: LearningEventName;
  user_id: string;
  session_id: string;
  metadata?: Record<string, unknown>;
  ts: number;
  sandbox: boolean;
};

/** Qualifying learning actions for the Week 5 user gate. */
export const QUALIFYING_EVENTS = new Set<LearningEventName>([
  "lesson_started",
  "lesson_completed",
  "quiz_submitted",
]);

/**
 * Known Summer Pilot handles. User ids that equal or contain these never count.
 * Source: cohort submission paths in this repository — not a live roster API.
 */
export const COHORT_HANDLES = [
  "kiaracaesar5627",
  "codingwcal",
  "arjun-singh2127",
  "artira",
  "celiciakitty-creator",
  "divyaprakash04",
  "frankgomezdev",
  "gge513",
  "godwinkamau",
  "jayyyw34",
  "jiaxinaspenlin-dotcom",
  "joes9987",
  "josie-ctrl",
  "kperpignant",
  "kureen-cyber",
  "lorra-v",
  "lvcasmadeit",
  "mitchelldante99-create",
  "nikjain15",
  "paramjeet-singh-neu",
  "priyanshshahh",
  "r3s0lv343vr",
  "ramyatolety",
  "raven-dubgub",
  "rebekah-dev",
  "rogersuperbuilderalpha",
  "solzco1",
  "studmuffin01",
  "supercuda",
  "zukhriddingit",
  "ryanroper79-alt",
] as const;

export function isBlockedUserId(
  userId: string,
  studentHandle: string,
  extraHandles: readonly string[] = COHORT_HANDLES,
): boolean {
  const normalizedUser = String(userId ?? "").trim().toLowerCase();
  if (!normalizedUser) return true;

  const handle = String(studentHandle ?? "").trim().toLowerCase();
  if (handle && normalizedUser.includes(handle)) return true;

  for (const raw of extraHandles) {
    const n = String(raw ?? "").trim().toLowerCase();
    if (!n) continue;
    if (normalizedUser === n || normalizedUser.includes(n)) return true;
  }
  return false;
}

export function computeMetrics(
  events: readonly StoredEvent[],
  appId: string,
  now = new Date(),
): {
  unique_users: number;
  qualified_users: number;
  as_of: string;
} {
  const appEvents = events.filter((e) => e.app_id === appId && !e.sandbox);
  const users = new Set(appEvents.map((e) => e.user_id));
  const qualified = new Set(
    appEvents.filter((e) => QUALIFYING_EVENTS.has(e.event)).map((e) => e.user_id),
  );
  return {
    unique_users: users.size,
    qualified_users: qualified.size,
    as_of: now.toISOString(),
  };
}
