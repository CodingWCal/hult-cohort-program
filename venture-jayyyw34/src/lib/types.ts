export type Role = "cook" | "neighbor";
export type Island = "trinidad" | "tobago";
export type Pepper = "slight" | "slight-plus" | "plenty" | "none";
export type Daypart = "morning" | "lunch" | "snack" | "dinner" | "night";

export type Account = {
  id: string;
  name: string;
  email: string;
  role: Role;
  neighborhood: string;
  createdAt: string;
};

export type Listing = {
  id: string;
  cookId: string;
  cookName: string;
  cookLine?: string;
  neighborhood: string;
  island: Island;
  title: string;
  description: string;
  priceCents: number;
  servingsLeft: number;
  tags: string[];
  pepper: Pepper;
  daypart: Daypart;
  visual: string;
  availableDate: string;
  pickupWindow: string;
  seeded?: boolean;
};

export type Order = {
  id: string;
  listingId: string;
  listingTitle: string;
  cookName: string;
  buyerId: string;
  buyerName: string;
  qty: number;
  note: string;
  pepper: Pepper;
  collectCode: string;
  createdAt: string;
  status: "placed" | "confirmed";
};

export type PlatformEvent = {
  id: string;
  type: "signup" | "listing_created" | "order_placed" | "browse";
  userId: string;
  createdAt: string;
};

export type ErrorRecord = {
  id: string;
  message: string;
  source: string;
  createdAt: string;
};

export const PEPPERS: Pepper[] = ["slight", "slight-plus", "plenty", "none"];

export const DAYPARTS: { id: Daypart; label: string }[] = [
  { id: "morning", label: "Morning doubles" },
  { id: "lunch", label: "Lunch roti" },
  { id: "snack", label: "Snack run" },
  { id: "dinner", label: "Sunday / dinner" },
  { id: "night", label: "After-fete" },
];

export const TOWNS = [
  { name: "Port of Spain", island: "trinidad" },
  { name: "St. James", island: "trinidad" },
  { name: "Woodbrook", island: "trinidad" },
  { name: "San Juan", island: "trinidad" },
  { name: "Tunapuna", island: "trinidad" },
  { name: "St. Augustine", island: "trinidad" },
  { name: "Arima", island: "trinidad" },
  { name: "Chaguanas", island: "trinidad" },
  { name: "San Fernando", island: "trinidad" },
  { name: "Diego Martin", island: "trinidad" },
  { name: "Maracas", island: "trinidad" },
  { name: "Scarborough", island: "tobago" },
  { name: "Crown Point", island: "tobago" },
] as const;

export const NEIGHBORHOODS = TOWNS.map((town) => town.name);

export type Neighborhood = (typeof NEIGHBORHOODS)[number];
