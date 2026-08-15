import { NextResponse } from "next/server";
import { id } from "@/lib/format";
import { addEvent, addOrder, findListing, getDb } from "@/lib/store";
import type { Order } from "@/lib/types";
import { canFulfill } from "@/lib/validate";

export function GET() {
  return NextResponse.json({ ok: true, orders: getDb().orders });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    listingId?: string;
    buyerId?: string;
    buyerName?: string;
    qty?: number;
    note?: string;
  };
  if (!body.listingId || !body.buyerId || !body.buyerName) {
    return NextResponse.json({ ok: false, error: "Join before ordering." }, { status: 400 });
  }
  const listing = findListing(body.listingId);
  if (!listing) {
    return NextResponse.json({ ok: false, error: "Dish not found." }, { status: 404 });
  }
  const qty = Number(body.qty ?? 1);
  const fulfillError = canFulfill(listing, qty);
  if (fulfillError) {
    return NextResponse.json({ ok: false, error: fulfillError }, { status: 400 });
  }

  const order: Order = {
    id: id("ord"),
    listingId: listing.id,
    listingTitle: listing.title,
    cookName: listing.cookName,
    buyerId: body.buyerId,
    buyerName: body.buyerName.trim(),
    qty,
    note: (body.note || "").trim().slice(0, 240),
    createdAt: new Date().toISOString(),
    status: "placed",
  };
  addOrder(order);
  addEvent({ type: "order_placed", userId: order.buyerId });
  return NextResponse.json({ ok: true, order });
}
