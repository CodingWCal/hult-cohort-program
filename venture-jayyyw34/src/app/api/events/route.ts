import { NextResponse } from "next/server";
import { addEvent } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    type?: "browse";
    userId?: string;
  };
  if (body.type !== "browse" || !body.userId) {
    return NextResponse.json({ ok: false, error: "browse event requires userId" }, { status: 400 });
  }
  addEvent({ type: "browse", userId: body.userId });
  return NextResponse.json({ ok: true });
}
