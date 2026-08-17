import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEMO_STEPS,
  parseStepParam,
  parseTrackParam,
  DEFAULT_DEMO_TRACK,
} from "../src/lib/demo-tour.ts";

describe("demo-tour", () => {
  it("clamps step query to 1..length", () => {
    assert.equal(parseStepParam(null), 1);
    assert.equal(parseStepParam("4"), 4);
    assert.equal(parseStepParam("0"), 1);
    assert.equal(parseStepParam("99"), DEMO_STEPS.length);
  });

  it("only allows featured demo tracks", () => {
    assert.equal(parseTrackParam("software-engineer"), "software-engineer");
    assert.equal(parseTrackParam("not-a-track"), DEFAULT_DEMO_TRACK);
  });
});
