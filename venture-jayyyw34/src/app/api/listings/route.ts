import { NextResponse } from "next/server";
import { id, todayISO } from "@/lib/format";
import { daypartFromWindow, islandForTown } from "@/lib/place";
import { addEvent, addListing, getDb } from "@/lib/store";
import { validateListingInput } from "@/lib/validate";
import { visualFromTitle } from "@/lib/visual";
import type { Listing, Pepper } from "@/lib/types";

export function GET() {
  return NextResponse.json({ ok: true, listings: getDb().listings });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<Listing> & {
    cookId?: string;
    cookName?: string;
  };
  const error = validateListingInput({
    title: body.title,
    description: body.description,
    priceCents: body.priceCents,
    servingsLeft: body.servingsLeft,
    neighborhood: body.neighborhood,
    pickupWindow: body.pickupWindow,
    pepper: body.pepper,
  });
  if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
  if (!body.cookId || !body.cookName) {
    return NextResponse.json({ ok: false, error: "Join as a cook first." }, { status: 400 });
  }

  const listing: Listing = {
    id: id("dish"),
    cookId: body.cookId,
    cookName: body.cookName,
    cookLine: (body.cookLine || "").trim().slice(0, 80) || undefined,
    neighborhood: body.neighborhood!,
    island: islandForTown(body.neighborhood!),
    title: body.title!.trim(),
    description: body.description!.trim(),
    priceCents: Number(body.priceCents),
    servingsLeft: Number(body.servingsLeft),
    tags: Array.isArray(body.tags) ? body.tags.slice(0, 6) : [],
    pepper: (body.pepper as Pepper) || "slight",
    daypart: daypartFromWindow(body.pickupWindow!.trim()),
    visual: visualFromTitle(body.title!.trim()),
    availableDate: body.availableDate || todayISO(),
    pickupWindow: body.pickupWindow!.trim(),
  };
  addListing(listing);
  addEvent({ type: "listing_created", userId: listing.cookId });
  return NextResponse.json({ ok: true, listing });
}
