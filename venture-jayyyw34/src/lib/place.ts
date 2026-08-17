import { TOWNS, type Daypart, type Island, type Listing } from "./types";

export function islandForTown(town: string): Island {
  const row = TOWNS.find((item) => item.name === town);
  return row?.island ?? "trinidad";
}

export function townsForIsland(island: Island | "all"): string[] {
  if (island === "all") return TOWNS.map((town) => town.name);
  return TOWNS.filter((town) => town.island === island).map((town) => town.name);
}

export function islandOf(listing: Listing): Island {
  return listing.island || islandForTown(listing.neighborhood);
}

function toHour(raw: string, mer: string | undefined): number | null {
  const match = /^(\d{1,2})(?::(\d{2}))?(am|pm)?$/.exec(raw);
  if (!match) return null;
  let hour = Number(match[1]);
  const suffix = (match[3] || mer) as string | undefined;
  if (hour === 12) hour = suffix === "am" ? 0 : 12;
  else if (suffix === "pm") hour += 12;
  return hour;
}

export function parsePickupWindow(window: string): { start: number; end: number } | null {
  const cleaned = window
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(/[–—]/g, "-");
  const [left, right] = cleaned.split("-");
  if (!left || !right) return null;
  const endMer = /(am|pm)$/.exec(right)?.[1];
  const startMer = /(am|pm)$/.exec(left)?.[1] ?? endMer;
  const start = toHour(left.replace(/(am|pm)$/, ""), startMer);
  const end = toHour(right.replace(/(am|pm)$/, ""), endMer);
  if (start == null || end == null) return null;
  return { start, end };
}

export function currentHourAST(now = new Date()): number {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Port_of_Spain",
    hour: "numeric",
    hourCycle: "h23",
  }).format(now);
  return Number(hour);
}

export function daypartFromWindow(window: string): Daypart {
  const parsed = parsePickupWindow(window);
  const start = parsed?.start ?? 12;
  if (start < 11) return "morning";
  if (start < 14) return "lunch";
  if (start < 17) return "snack";
  if (start < 19) return "dinner";
  return "night";
}

export function isOnNow(listing: Listing, hour = currentHourAST()): boolean {
  const parsed = parsePickupWindow(listing.pickupWindow);
  if (parsed) {
    if (parsed.end > parsed.start) return hour >= parsed.start && hour < parsed.end;
    return hour >= parsed.start || hour < parsed.end;
  }
  const buckets: Record<Daypart, [number, number]> = {
    morning: [5, 11],
    lunch: [11, 16],
    snack: [14, 19],
    dinner: [16, 21],
    night: [19, 24],
  };
  const [start, end] = buckets[listing.daypart || "lunch"];
  return hour >= start && hour < end;
}

export function pepperLabel(pepper: Listing["pepper"] | undefined): string {
  if (!pepper || pepper === "none") return "No pepper";
  if (pepper === "slight") return "Slight";
  if (pepper === "slight-plus") return "Slight-plus";
  return "Plenty";
}
