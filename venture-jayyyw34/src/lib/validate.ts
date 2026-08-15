import { NEIGHBORHOODS, type Listing, type Role } from "./types";

export function isRole(value: string): value is Role {
  return value === "cook" || value === "neighbor";
}

export function isNeighborhood(value: string): boolean {
  return (NEIGHBORHOODS as readonly string[]).includes(value);
}

export function validateAccountInput(input: {
  name?: string;
  email?: string;
  role?: string;
  neighborhood?: string;
}): string | null {
  if (!input.name?.trim() || input.name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return "A valid email is required.";
  }
  if (!input.role || !isRole(input.role)) {
    return "Choose cook or neighbour.";
  }
  if (!input.neighborhood || !isNeighborhood(input.neighborhood)) {
    return "Choose a town or area.";
  }
  return null;
}

export function isPepper(value: string): boolean {
  return value === "slight" || value === "slight-plus" || value === "plenty" || value === "none";
}

export function validateListingInput(input: {
  title?: string;
  description?: string;
  priceCents?: number;
  servingsLeft?: number;
  neighborhood?: string;
  pickupWindow?: string;
  pepper?: string;
}): string | null {
  if (!input.title?.trim() || input.title.trim().length < 3) {
    return "Dish title is required.";
  }
  if (!input.description?.trim() || input.description.trim().length < 10) {
    return "Add a short description (10+ characters).";
  }
  if (!Number.isFinite(input.priceCents) || (input.priceCents ?? 0) < 100) {
    return "Price must be at least TT$1.00.";
  }
  if (!Number.isFinite(input.servingsLeft) || (input.servingsLeft ?? 0) < 1) {
    return "List at least one serving.";
  }
  if (!input.neighborhood || !isNeighborhood(input.neighborhood)) {
    return "Choose a town or area.";
  }
  if (!input.pickupWindow?.trim()) {
    return "Add a pickup window.";
  }
  if (input.pepper && !isPepper(input.pepper)) {
    return "Choose a pepper level.";
  }
  return null;
}

export function canFulfill(listing: Listing, qty: number): string | null {
  if (!Number.isInteger(qty) || qty < 1) return "Order at least one serving.";
  if (listing.servingsLeft < qty) {
    return `Only ${listing.servingsLeft} serving(s) left.`;
  }
  return null;
}
