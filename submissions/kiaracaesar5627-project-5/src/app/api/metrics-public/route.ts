import { NextResponse } from "next/server";
import { getMetrics, SEEDED_APP } from "@/lib/platform/store";
import { persistMode } from "@/lib/platform/persist";

export async function GET() {
  const metrics = getMetrics(SEEDED_APP.app_id);
  return NextResponse.json({
    ...metrics,
    app_id: SEEDED_APP.app_id,
    source: "own-reference-api",
    instance: "same-origin /v1 on Interview Room",
    persist_mode: persistMode(),
    note: "Cohort handles and user ids containing the student handle are not counted.",
  });
}
