import { NextResponse } from "next/server";
import { addError } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    message?: string;
    source?: string;
  };
  if (!body.message) {
    return NextResponse.json({ ok: false, error: "message required" }, { status: 400 });
  }
  const record = addError(body.message, body.source || "client");
  return NextResponse.json({ ok: true, id: record.id });
}
