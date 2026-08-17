import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { collectCode, collectToken } from "../src/lib/collect";
import {
  daypartFromWindow,
  islandForTown,
  isOnNow,
  parsePickupWindow,
  townsForIsland,
} from "../src/lib/place";
import { visualFromTitle } from "../src/lib/visual";
import type { Listing } from "../src/lib/types";

describe("place + collect + visual", () => {
  it("maps Scarborough to Tobago and POS to Trinidad", () => {
    assert.equal(islandForTown("Scarborough"), "tobago");
    assert.equal(islandForTown("Port of Spain"), "trinidad");
    assert.equal(islandForTown("Couva"), "trinidad");
    assert.ok(townsForIsland("tobago").includes("Crown Point"));
    assert.ok(townsForIsland("trinidad").includes("Couva"));
    assert.ok(townsForIsland("trinidad").includes("Point Fortin"));
    assert.ok(townsForIsland("trinidad").includes("Sangre Grande"));
  });

  it("parses mixed am/pm pickup windows", () => {
    const window = parsePickupWindow("11:00am–3:00pm");
    assert.equal(window?.start, 11);
    assert.equal(window?.end, 15);
  });

  it("treats early windows as morning doubles", () => {
    assert.equal(daypartFromWindow("6:30–10:00am"), "morning");
    assert.equal(daypartFromWindow("7:00–11:00pm"), "night");
  });

  it("marks a listing on now from the pickup window", () => {
    const listing = {
      pickupWindow: "6:30–10:00am",
      daypart: "morning",
    } as Listing;
    assert.equal(isOnNow(listing, 8), true);
    assert.equal(isOnNow(listing, 14), false);
  });

  it("builds a collect code from the order id", () => {
    assert.equal(collectToken("ord_ab12xy99"), "XY99");
    assert.equal(collectCode("ord_ab12xy99", "Kamla Persad"), "Tell Kamla: plate XY99");
  });

  it("picks a visual from the dish title", () => {
    assert.equal(visualFromTitle("Doubles (bara)"), "doubles");
    assert.equal(visualFromTitle("Crab and dumpling"), "crab");
  });
});
