import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { weekdayFromISO, weekdayName } from "../src/lib/format";
import { pickDailyBoard } from "../src/lib/seed";

describe("daily board", () => {
  it("uses Trinidad calendar weekdays", () => {
    assert.equal(weekdayFromISO("2026-08-16"), 0);
    assert.equal(weekdayName("2026-08-16"), "Sunday");
    assert.equal(weekdayName("2026-08-15"), "Saturday");
  });

  it("returns the same eight pots for the same day", () => {
    const a = pickDailyBoard("2026-08-15").map((row) => row.id);
    const b = pickDailyBoard("2026-08-15").map((row) => row.id);
    assert.deepEqual(a, b);
    assert.equal(a.length, 8);
  });

  it("changes the board between Saturday and Sunday", () => {
    const sat = pickDailyBoard("2026-08-15").map((row) => row.id);
    const sun = pickDailyBoard("2026-08-16").map((row) => row.id);
    assert.notDeepEqual(sat, sun);
  });

  it("puts bake and shark on Saturday and Sunday lunch on Sunday", () => {
    const sat = pickDailyBoard("2026-08-15").map((row) => row.title).join(" ");
    const sun = pickDailyBoard("2026-08-16").map((row) => row.title).join(" ");
    assert.match(sat, /Bake and shark/);
    assert.match(sun, /Sunday lunch/);
  });

  it("always includes a Tobago pot", () => {
    for (const day of ["2026-08-15", "2026-08-16", "2026-08-17", "2026-08-19"]) {
      const board = pickDailyBoard(day);
      assert.ok(board.some((row) => row.island === "tobago"), day);
    }
  });
});
