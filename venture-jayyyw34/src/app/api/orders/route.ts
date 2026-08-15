import { NextResponse } from "next/server";
import { collectCode } from "@/lib/collect";
import { id } from "@/lib/format";
import { addEvent, addOrder, findListing, getDb } from "@/lib/store";
import type { Order, Pepper } from "@/lib/types";
import { canFulfill, isPepper } from "@/lib/validate";

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
    pepper?: Pepper;
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

  const pepper: Pepper =
    body.pepper && isPepper(body.pepper) ? body.pepper : listing.pepper || "slight";
  const orderId = id("ord");
  const order: Order = {
    id: orderId,
    listingId: listing.id,
    listingTitle: listing.title,
    cookName: listing.cookName,
    buyerId: body.buyerId,
    buyerName: body.buyerName.trim(),
    qty,
    note: (body.note || "").trim().slice(0, 240),
    pepper,
    collectCode: collectCode(orderId, listing.cookName),
    createdAt: new Date().toISOString(),
    status: "placed",
  };
  addOrder(order);
  addEvent({ type: "order_placed", userId: order.buyerId });
  return NextResponse.json({ ok: true, order });
}
