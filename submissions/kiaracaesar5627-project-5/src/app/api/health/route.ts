import { NextResponse } from "next/server";
import { persistMode } from "@/lib/platform/persist";
import { SEEDED_APP } from "@/lib/platform/store";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "ludwitt-hult-api",
    host: "interview-room",
    app_id: SEEDED_APP.app_id,
    persist_mode: persistMode(),
  });
}
