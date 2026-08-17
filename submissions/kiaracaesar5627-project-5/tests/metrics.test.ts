import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { computeMetrics, type StoredEvent } from "../src/lib/platform/qualify.ts";

const APP = "app-1";

function ev(
  user: string,
  event: StoredEvent["event"],
  extra: Partial<StoredEvent> = {},
): StoredEvent {
  return {
    app_id: APP,
    event,
    user_id: user,
    session_id: "s1",
    ts: 1,
    sandbox: false,
    ...extra,
  };
}

describe("computeMetrics", () => {
  it("counts unique users across all events", () => {
    const metrics = computeMetrics(
      [ev("a", "session_heartbeat"), ev("b", "lesson_started"), ev("a", "lesson_completed")],
      APP,
      new Date("2026-08-13T21:00:00.000Z"),
    );
    assert.equal(metrics.unique_users, 2);
    assert.equal(metrics.qualified_users, 2);
    assert.equal(metrics.as_of, "2026-08-13T21:00:00.000Z");
  });

  it("does not qualify heartbeat-only users", () => {
    const metrics = computeMetrics([ev("a", "session_heartbeat")], APP);
    assert.equal(metrics.unique_users, 1);
    assert.equal(metrics.qualified_users, 0);
  });

  it("ignores sandbox events and other apps", () => {
    const metrics = computeMetrics(
      [
        ev("a", "lesson_started", { sandbox: true }),
        ev("b", "lesson_started", { app_id: "other" }),
        ev("c", "quiz_submitted"),
      ],
      APP,
    );
    assert.equal(metrics.unique_users, 1);
    assert.equal(metrics.qualified_users, 1);
  });
});
