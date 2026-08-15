export type Role = "cook" | "neighbor";

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
  neighborhood: string;
  title: string;
  description: string;
  priceCents: number;
  servingsLeft: number;
  tags: string[];
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

export const NEIGHBORHOODS = [
  "Port of Spain",
  "St. James",
  "Woodbrook",
  "San Juan",
  "Tunapuna",
  "St. Augustine",
  "Arima",
  "Chaguanas",
  "San Fernando",
  "Diego Martin",
  "Maracas",
  "Scarborough",
  "Crown Point",
] as const;

export type Neighborhood = (typeof NEIGHBORHOODS)[number];
