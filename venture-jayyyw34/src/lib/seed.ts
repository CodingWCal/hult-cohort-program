import { CATALOG, potToListing } from "./catalog";
import { todayISO, weekdayFromISO } from "./format";
import type { Listing } from "./types";

const BOARD_SIZE = 8;

export function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededShuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  let state = seed || 1;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickDailyBoard(day: string): Listing[] {
  const weekday = weekdayFromISO(day);
  const eligible = CATALOG.filter((pot) => pot.days.length === 0 || pot.days.includes(weekday));
  const pool = eligible.length ? eligible : CATALOG;
  const shuffled = seededShuffle(pool, hashString(`localplate:${day}`));
  const picked: typeof CATALOG = [];

  const take = (predicate: (pot: (typeof CATALOG)[number]) => boolean) => {
    const next = shuffled.find(
      (pot) => predicate(pot) && !picked.some((row) => row.id === pot.id),
    );
    if (next) picked.push(next);
  };

  take((pot) => pot.island === "tobago");
  take((pot) => pot.daypart === "morning");
  if (weekday === 6) take((pot) => pot.id === "seed_bake_shark");
  if (weekday === 0) take((pot) => pot.id === "seed_sunday_lunch");
  if (weekday === 5) take((pot) => pot.id === "seed_corn_soup" || pot.id === "seed_fried_rice");
  for (const pot of shuffled) {
    if (picked.length >= BOARD_SIZE) break;
    if (!picked.some((row) => row.id === pot.id)) picked.push(pot);
  }

  return picked.map((pot) => potToListing(pot, day));
}

export function seedListings(day = todayISO()): Listing[] {
  return pickDailyBoard(day);
}
