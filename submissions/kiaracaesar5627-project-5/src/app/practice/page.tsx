import { cookies } from "next/headers";
import { JOB_TRACKS } from "@/lib/lessons";
import { SessionHeartbeat } from "@/components/SessionHeartbeat";
import { TrackPicker } from "@/components/TrackPicker";
import { PracticeJournal } from "@/components/PracticeJournal";
import type { LearnerSession } from "@/lib/session-types";

type Props = { searchParams: Promise<{ major?: string }> };

export default async function PracticeIndexPage({ searchParams }: Props) {
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

  const { major } = await searchParams;

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
      <h2>Open a room</h2>
      <p className="support">
        Filter by career major, pick the role you applied for, then drill a single prompt or start a
        five-room mock loop.
      </p>
      <div className="practice-layout">
        <div className="practice-main">
          <TrackPicker tracks={tracks} initialFamily={major} />
        </div>
        <PracticeJournal />
      </div>
    </section>
  );
}
