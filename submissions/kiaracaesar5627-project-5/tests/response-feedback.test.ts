import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { reviewResponse } from "../src/lib/response-feedback.ts";

const playbook = [
  "Clarify the goal and constraints for triage.",
  "Name the first safety check.",
  "Offer a safer path that still moves the goal.",
];

describe("reviewResponse", () => {
  it("asks for a skeleton when notes are empty", () => {
    const fb = reviewResponse({
      notes: "",
      playbook,
      role: "Registered nurse",
      stage: "Core",
      scores: { structure: 0, evidence: 0, clarity: 0 },
      debriefCorrect: null,
    });
    assert.equal(fb.signals.hasAnswer, false);
    assert.match(fb.improvements[0] ?? "", /skeleton/i);
    assert.ok(fb.interviewTips.length >= 3);
  });

  it("flags a thin answer and missing ownership", () => {
    const fb = reviewResponse({
      notes: "We handled the situation and things got better for the team.",
      playbook,
      role: "Registered nurse",
      stage: "Core",
      scores: { structure: 2, evidence: 2, clarity: 3 },
      debriefCorrect: false,
    });
    assert.equal(fb.signals.hasAnswer, true);
    assert.ok(fb.improvements.some((l) => /thin|STAR|I did|your name/i.test(l)));
  });

  it("recognizes a STAR answer with a number", () => {
    const fb = reviewResponse({
      notes:
        "When I was on night shift last quarter the goal was safer handoff. I decided to add a two-minute acuity check and that cut missed flags from 6 to 1 in a month.",
      playbook,
      role: "Registered nurse",
      stage: "Core",
      scores: { structure: 4, evidence: 4, clarity: 4 },
      debriefCorrect: true,
    });
    assert.ok(fb.signals.starHits >= 3);
    assert.equal(fb.signals.hasNumber, true);
    assert.equal(fb.signals.hasIAction, true);
    assert.ok(fb.strengths.length >= 2);
    assert.match(fb.headline, /land|Usable|ready/i);
  });

  it("adds an Edge tradeoff cue", () => {
    const fb = reviewResponse({
      notes:
        "I guess maybe we would just go faster. I think I would probably just ship it.",
      playbook,
      role: "Software engineer",
      stage: "Edge",
      scores: { structure: 3, evidence: 3, clarity: 3 },
      debriefCorrect: null,
    });
    assert.equal(fb.signals.hedging, true);
    assert.ok(fb.improvements.some((l) => /hard stop|tradeoff/i.test(l)));
    assert.ok(fb.interviewTips.some((l) => /hard stop|gray/i.test(l)));
  });
});
