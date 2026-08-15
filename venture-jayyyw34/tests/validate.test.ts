import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canFulfill, validateAccountInput, validateListingInput } from "../src/lib/validate";
import { formatPrice } from "../src/lib/format";
import type { Listing } from "../src/lib/types";

const listing: Listing = {
  id: "seed_jollof",
  cookId: "seed_amara",
  cookName: "Amara Cole",
  neighborhood: "Cambridge",
  title: "Jollof",
  description: "Tomato-pepper jollof",
  priceCents: 1600,
  servingsLeft: 2,
  tags: ["dinner"],
  availableDate: "2026-08-14",
  pickupWindow: "5:30–7:30pm",
};

describe("validate + format", () => {
  it("rejects a bad email on join", () => {
    const error = validateAccountInput({
      name: "Ada",
      email: "not-an-email",
      role: "neighbor",
      neighborhood: "Cambridge",
    });
    assert.ok(error);
  });

  it("accepts a complete cook listing", () => {
    const error = validateListingInput({
      title: "Jollof rice",
      description: "Tomato-pepper jollof with plantain.",
      priceCents: 1600,
      servingsLeft: 6,
      neighborhood: "Cambridge",
      pickupWindow: "5:30–7:30pm",
    });
    assert.equal(error, null);
  });

  it("blocks overselling servings", () => {
    assert.ok(canFulfill(listing, 3));
    assert.equal(canFulfill(listing, 2), null);
  });

  it("formats cents as USD", () => {
    assert.equal(formatPrice(1600), "$16.00");
    assert.equal(formatPrice(-5), "$0.00");
  });
});
