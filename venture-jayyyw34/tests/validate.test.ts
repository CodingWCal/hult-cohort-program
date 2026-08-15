import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canFulfill, validateAccountInput, validateListingInput } from "../src/lib/validate";
import { formatPrice } from "../src/lib/format";
import type { Listing } from "../src/lib/types";

const listing: Listing = {
  id: "seed_doubles",
  cookId: "seed_kamla",
  cookName: "Kamla Persad",
  neighborhood: "St. James",
  island: "trinidad",
  title: "Doubles",
  description: "Bara and channa",
  priceCents: 1200,
  servingsLeft: 2,
  tags: ["breakfast"],
  pepper: "slight",
  daypart: "morning",
  visual: "doubles",
  availableDate: "2026-08-14",
  pickupWindow: "6:30–10:00am",
};

describe("validate + format", () => {
  it("rejects a bad email on join", () => {
    const error = validateAccountInput({
      name: "Ada",
      email: "not-an-email",
      role: "neighbor",
      neighborhood: "Port of Spain",
    });
    assert.ok(error);
  });

  it("accepts a complete cook listing", () => {
    const error = validateListingInput({
      title: "Chicken pelau",
      description: "Browned-sugar pelau with pigeon peas.",
      priceCents: 4500,
      servingsLeft: 6,
      neighborhood: "Chaguanas",
      pickupWindow: "12:00–6:00pm",
    });
    assert.equal(error, null);
  });

  it("blocks overselling servings", () => {
    assert.ok(canFulfill(listing, 3));
    assert.equal(canFulfill(listing, 2), null);
  });

  it("formats cents as TTD", () => {
    assert.equal(formatPrice(1600), "TT$16.00");
    assert.equal(formatPrice(-5), "TT$0.00");
  });
});
