import { cookies } from "next/headers";
import { JOB_TRACKS } from "@/lib/lessons";
import { SessionHeartbeat } from "@/components/SessionHeartbeat";
import { TrackPicker } from "@/components/TrackPicker";
import type { LearnerSession } from "@/lib/session-types";

export default async function PracticeIndexPage() {
  const jar = await cookies();
  const raw = jar.get("pf_session")?.value;
  let session: LearnerSession | null = null;
  if (raw) {
    try {
      session = JSON.parse(raw) as LearnerSession;
    } catch {
      session = null;
    }
  }

  const tracks = JOB_TRACKS.map((t) => ({
    slug: t.slug,
    role: t.role,
    setting: t.setting,
    blurb: t.blurb,
    count: t.scenarios.length,
  }));

  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <SessionHeartbeat />
      <p className="eyebrow">
        {session
          ? `Candidate session · ${session.email}`
          : "Guest practice · counted after first question"}
      </p>
      <h2>Job application tracks</h2>
      <p className="support">
        Search or filter by family, then open the role you’re interviewing for.
      </p>
      <TrackPicker tracks={tracks} />
    </section>
  );
}
