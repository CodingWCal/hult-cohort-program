import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { id } from "./format";
import { seedListings } from "./seed";
import type { Account, ErrorRecord, Listing, Order, PlatformEvent } from "./types";

type Db = {
  accounts: Account[];
  listings: Listing[];
  orders: Order[];
  events: PlatformEvent[];
  errors: ErrorRecord[];
};

const FILE =
  process.env.LOCALPLATE_DB_PATH ||
  (process.env.VERCEL ? "/tmp/localplate.json" : ".data/localplate.json");

let memory: Db | null = null;

function emptyDb(): Db {
  return {
    accounts: [],
    listings: seedListings(),
    orders: [],
    events: [],
    errors: [],
  };
}

function load(): Db {
  if (memory) return memory;
  try {
    const raw = readFileSync(FILE, "utf8");
    const parsed = JSON.parse(raw) as Db;
    if (!parsed.listings?.length) parsed.listings = seedListings();
    memory = parsed;
    return memory;
  } catch {
    memory = emptyDb();
    return memory;
  }
}

function save(db: Db) {
  memory = db;
  try {
    mkdirSync(dirname(FILE), { recursive: true });
    writeFileSync(FILE, JSON.stringify(db, null, 2));
  } catch {
    // Serverless instances may not persist; in-memory still works for the instance.
  }
}

export function getDb(): Db {
  return load();
}

export function upsertAccount(account: Account): Account {
  const db = load();
  const existing = db.accounts.find(
    (row) => row.email.toLowerCase() === account.email.toLowerCase(),
  );
  if (existing) {
    existing.name = account.name;
    existing.role = account.role;
    existing.neighborhood = account.neighborhood;
    save(db);
    return existing;
  }
  db.accounts.push(account);
  save(db);
  return account;
}

export function addListing(listing: Listing): Listing {
  const db = load();
  db.listings.unshift(listing);
  save(db);
  return listing;
}

export function findListing(listingId: string): Listing | undefined {
  return load().listings.find((row) => row.id === listingId);
}

export function addOrder(order: Order): Order {
  const db = load();
  const listing = db.listings.find((row) => row.id === order.listingId);
  if (listing) listing.servingsLeft = Math.max(0, listing.servingsLeft - order.qty);
  db.orders.unshift(order);
  save(db);
  return order;
}

export function addEvent(partial: Omit<PlatformEvent, "id" | "createdAt">): PlatformEvent {
  const db = load();
  const event: PlatformEvent = {
    ...partial,
    id: id("evt"),
    createdAt: new Date().toISOString(),
  };
  db.events.push(event);
  save(db);
  return event;
}

export function addError(message: string, source: string): ErrorRecord {
  const db = load();
  const record: ErrorRecord = {
    id: id("err"),
    message: message.slice(0, 500),
    source: source.slice(0, 120),
    createdAt: new Date().toISOString(),
  };
  db.errors.unshift(record);
  db.errors = db.errors.slice(0, 50);
  save(db);
  return record;
}

export function persistMode(): string {
  return process.env.VERCEL ? "tmp-json" : "local-json";
}
