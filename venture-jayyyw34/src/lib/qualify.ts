import type { Account, Order, PlatformEvent } from "./types";

const FOUNDER_HANDLE = "jayyyw34";

export function isFounderOrCohortId(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (!v) return true;
  if (v.includes(FOUNDER_HANDLE)) return true;
  return false;
}

export function uniqueExternalUsers(accounts: Account[]): Account[] {
  const seen = new Set<string>();
  const out: Account[] = [];
  for (const account of accounts) {
    if (isFounderOrCohortId(account.id) || isFounderOrCohortId(account.email)) {
      continue;
    }
    const key = account.email.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(account);
  }
  return out;
}

export function isQualifiedUser(
  account: Account,
  orders: Order[],
  events: PlatformEvent[],
): boolean {
  if (isFounderOrCohortId(account.id) || isFounderOrCohortId(account.email)) {
    return false;
  }
  const ordered = orders.some((order) => order.buyerId === account.id);
  const listed = events.some(
    (event) => event.userId === account.id && event.type === "listing_created",
  );
  const browsed = events.some(
    (event) => event.userId === account.id && event.type === "browse",
  );
  return ordered || listed || browsed;
}

export function metricsSnapshot(input: {
  accounts: Account[];
  orders: Order[];
  events: PlatformEvent[];
  asOf?: string;
}) {
  const external = uniqueExternalUsers(input.accounts);
  const qualified = external.filter((account) =>
    isQualifiedUser(account, input.orders, input.events),
  );
  return {
    unique_users: external.length,
    qualified_users: qualified.length,
    orders: input.orders.length,
    as_of: input.asOf ?? new Date().toISOString(),
    excluded: "Cohort/founder ids containing jayyyw34 are excluded.",
  };
}
