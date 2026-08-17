import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isBlockedUserId } from "../src/lib/platform/qualify.ts";

describe("isBlockedUserId", () => {
  it("blocks empty user ids", () => {
    assert.equal(isBlockedUserId("", "kiaracaesar5627"), true);
  });

  it("blocks an exact match on the student handle", () => {
    assert.equal(isBlockedUserId("kiaracaesar5627", "kiaracaesar5627"), true);
  });

  it("blocks user ids that contain the student handle", () => {
    assert.equal(isBlockedUserId("ext_kiaracaesar5627_01", "kiaracaesar5627"), true);
  });

  it("blocks known cohort handles", () => {
    assert.equal(isBlockedUserId("nikjain15", "kiaracaesar5627"), true);
    assert.equal(isBlockedUserId("guest-lorra-v", "kiaracaesar5627"), true);
  });

  it("allows an external uuid that does not contain a cohort handle", () => {
    assert.equal(
      isBlockedUserId("ext_9f3c2a1b-4d5e-6789-abcd-ef0123456789", "kiaracaesar5627"),
      false,
    );
  });
});
