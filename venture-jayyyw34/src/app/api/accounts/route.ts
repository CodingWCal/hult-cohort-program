import { NextResponse } from "next/server";
import { id, normalizeEmail } from "@/lib/format";
import { addEvent, getDb, upsertAccount } from "@/lib/store";
import type { Account, Role } from "@/lib/types";
import { validateAccountInput } from "@/lib/validate";

export function GET() {
  return NextResponse.json({
    ok: true,
    count: getDb().accounts.length,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
    role?: Role;
    neighborhood?: string;
  };
  const error = validateAccountInput(body);
  if (error) return NextResponse.json({ ok: false, error }, { status: 400 });

  const account: Account = {
    id: id("usr"),
    name: body.name!.trim(),
    email: normalizeEmail(body.email!),
    role: body.role!,
    neighborhood: body.neighborhood!,
    createdAt: new Date().toISOString(),
  };
  const saved = upsertAccount(account);
  addEvent({ type: "signup", userId: saved.id });
  return NextResponse.json({ ok: true, account: saved });
}
