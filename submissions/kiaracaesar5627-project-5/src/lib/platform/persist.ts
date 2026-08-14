import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { StoredEvent } from "./qualify";

export type PersistMode = "memory" | "tmp-json" | "file-json";

export function persistMode(): PersistMode {
  if (process.env.EVENTS_PATH?.trim()) return "file-json";
  if (process.env.VERCEL) return "tmp-json";
  return "file-json";
}

export function eventsFilePath(): string {
  const override = process.env.EVENTS_PATH?.trim();
  if (override) return override;
  if (process.env.VERCEL) return "/tmp/interview-room-events.json";
  return join(process.cwd(), "data", "events.json");
}

export function loadPersistedEvents(): StoredEvent[] {
  try {
    const raw = readFileSync(eventsFilePath(), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredEvent);
  } catch {
    return [];
  }
}

export function savePersistedEvents(events: StoredEvent[]): void {
  const path = eventsFilePath();
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(events), "utf8");
  } catch (err) {
    console.error("[interview-room] event persist failed", err);
  }
}

function isStoredEvent(row: unknown): row is StoredEvent {
  if (!row || typeof row !== "object") return false;
  const r = row as Record<string, unknown>;
  return (
    typeof r.app_id === "string" &&
    typeof r.event === "string" &&
    typeof r.user_id === "string" &&
    typeof r.session_id === "string" &&
    typeof r.ts === "number"
  );
}
