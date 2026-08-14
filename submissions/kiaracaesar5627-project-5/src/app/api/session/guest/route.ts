import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isBlockedUser, SEEDED_APP } from "@/lib/platform/store";
import type { LearnerSession } from "@/lib/session-types";

const SESSION = "pf_session";
const ANON = "pf_anon";

function cookieBase() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

export async function POST() {
  const jar = await cookies();
  const existing = jar.get(SESSION)?.value;
  if (existing) {
    try {
      const session = JSON.parse(existing) as LearnerSession;
      return NextResponse.json({ ok: true, session, created: false });
    } catch {
      jar.delete(SESSION);
    }
  }

  let anon = jar.get(ANON)?.value?.trim() || "";
  if (!anon || isBlockedUser(anon, SEEDED_APP.student_handle)) {
    anon = `ext_${crypto.randomUUID()}`;
  }

  const session: LearnerSession = {
    user_id: anon,
    email: "guest@interview-room.app",
    app_id: SEEDED_APP.app_id,
    session_id: crypto.randomUUID(),
  };

  jar.set(ANON, anon, { ...cookieBase(), maxAge: 60 * 60 * 24 * 365 });
  jar.set(SESSION, JSON.stringify(session), { ...cookieBase(), maxAge: 60 * 60 * 24 * 7 });

  return NextResponse.json({ ok: true, session, created: true });
}
