import { NextResponse } from "next/server";
import { metricsSnapshot } from "@/lib/qualify";
import { getDb, persistMode } from "@/lib/store";

export function GET() {
  const db = getDb();
  return NextResponse.json({
    ok: true,
    persist_mode: persistMode(),
    ...metricsSnapshot({
      accounts: db.accounts,
      orders: db.orders,
      events: db.events,
    }),
  });
}
