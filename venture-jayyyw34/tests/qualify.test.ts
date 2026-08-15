import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isFounderOrCohortId,
  isQualifiedUser,
  metricsSnapshot,
  uniqueExternalUsers,
} from "../src/lib/qualify";
import type { Account, Order, PlatformEvent } from "../src/lib/types";

const neighbor: Account = {
  id: "usr_ext1",
  name: "Ada Neighbor",
  email: "ada@example.com",
  role: "neighbor",
  neighborhood: "Port of Spain",
  createdAt: "2026-08-14T00:00:00.000Z",
};

const founder: Account = {
  id: "usr_jayyyw34",
  name: "Founder",
  email: "jayyyw34@example.com",
  role: "cook",
  neighborhood: "Port of Spain",
  createdAt: "2026-08-14T00:00:00.000Z",
};

describe("qualify", () => {
  it("excludes founder handle in ids and emails", () => {
    assert.equal(isFounderOrCohortId("usr_jayyyw34"), true);
    assert.equal(isFounderOrCohortId("ada@example.com"), false);
  });

  it("dedupes external users by email and drops founder", () => {
    const users = uniqueExternalUsers([neighbor, founder, { ...neighbor, id: "usr_dup" }]);
    assert.equal(users.length, 1);
    assert.equal(users[0].email, "ada@example.com");
  });

  it("does not qualify a user with only a signup", () => {
    assert.equal(isQualifiedUser(neighbor, [], []), false);
  });

  it("qualifies a user who placed an order", () => {
    const order: Order = {
      id: "ord_1",
      listingId: "seed_jollof",
      listingTitle: "Jollof",
      cookName: "Amara",
      buyerId: neighbor.id,
      buyerName: neighbor.name,
      qty: 1,
      note: "",
      createdAt: "2026-08-14T00:00:00.000Z",
      status: "placed",
    };
    assert.equal(isQualifiedUser(neighbor, [order], []), true);
  });

  it("snapshots unique and qualified counts without inventing users", () => {
    const events: PlatformEvent[] = [
      {
        id: "evt_1",
        type: "browse",
        userId: neighbor.id,
        createdAt: "2026-08-14T00:00:00.000Z",
      },
    ];
    const snap = metricsSnapshot({
      accounts: [neighbor, founder],
      orders: [],
      events,
      asOf: "2026-08-14T12:00:00.000Z",
    });
    assert.equal(snap.unique_users, 1);
    assert.equal(snap.qualified_users, 1);
    assert.equal(snap.as_of, "2026-08-14T12:00:00.000Z");
  });
});
