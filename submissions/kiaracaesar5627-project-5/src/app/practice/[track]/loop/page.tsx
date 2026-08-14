import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTrack, JOB_TRACKS } from "@/lib/lessons";
import { trackFamily } from "@/lib/track-family";
import { SessionHeartbeat } from "@/components/SessionHeartbeat";
import { MockLoopClient } from "@/components/MockLoopClient";

type Props = { params: Promise<{ track: string }> };

/** Mix core bank + cutting-edge Edge rooms so a loop trains modern signals. */
function pickLoopScenarios<T extends { stage: string }>(all: T[], count: number): T[] {
  const edge = all.filter((s) => s.stage === "Edge");
  const core = all.filter((s) => s.stage !== "Edge");
  const edgeTake = Math.min(2, edge.length, count);
  const coreTake = count - edgeTake;
  const corePicks: T[] = [];
  if (core.length && coreTake > 0) {
    const step = Math.max(1, Math.floor(core.length / coreTake));
    for (let i = 0; i < coreTake; i++) {
      corePicks.push(core[Math.min(i * step, core.length - 1)]!);
    }
  }
  const edgePicks = edge.slice(0, edgeTake);
  return [...corePicks, ...edgePicks].slice(0, count);
}

export function generateStaticParams() {
  return JOB_TRACKS.map((t) => ({ track: t.slug }));
}

export default async function MockLoopPage({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  if (!track) notFound();

  const jar = await cookies();
  const canTrack = Boolean(jar.get("pf_session")?.value || jar.get("pf_anon")?.value);

  const selected = pickLoopScenarios(track.scenarios, 5);
  const rounds = selected.map((s) => ({
    slug: s.slug,
    stage: s.stage,
    title: s.title,
    minutes: s.minutes,
    scenario: s.scenario,
    interviewer: s.interviewer,
    playbook: s.playbook,
    debrief: s.debrief,
  }));

  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <SessionHeartbeat />
      <p className="eyebrow">
        Mock loop · {trackFamily(track.slug)} · {track.setting}
      </p>
      <h2 className="loop-intro-title">{track.role} interview day</h2>
      <p className="support" style={{ marginBottom: "1.5rem" }}>
        Five rooms in one sitting — including cutting-edge Edge prompts — with timer, speak mode,
        debrief, and self-score after each.
      </p>
      <MockLoopClient
        trackSlug={track.slug}
        role={track.role}
        setting={track.setting}
        rounds={rounds}
        canTrack={canTrack}
      />
      <p style={{ marginTop: "1.75rem" }}>
        <Link href={`/practice/${track.slug}`} className="text-link">
          Back to {track.role} question list
        </Link>
      </p>
    </section>
  );
}
