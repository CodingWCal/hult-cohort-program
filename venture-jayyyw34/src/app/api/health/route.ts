import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "localplate",
    time: new Date().toISOString(),
  });
}
