import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack, JOB_TRACKS } from "@/lib/lessons";
import { isPressureStage, stageLabel } from "@/lib/track-model";
import { trackFamily } from "@/lib/track-family";
import { SessionHeartbeat } from "@/components/SessionHeartbeat";

type Props = { params: Promise<{ track: string }> };

export function generateStaticParams() {
  return JOB_TRACKS.map((t) => ({ track: t.slug }));
}

export default async function TrackPage({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  if (!track) notFound();
  const first = track.scenarios[0];
  const pressure = track.scenarios.filter((s) => isPressureStage(s.stage));
  const core = track.scenarios.filter((s) => !isPressureStage(s.stage));

  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <SessionHeartbeat />
      <p className="eyebrow">
        {trackFamily(track.slug)} · {track.setting}
      </p>
      <h2>{track.role}</h2>
      <p className="support">{track.blurb}</p>
      <div className="track-cta-row">
        <Link href={`/practice/${track.slug}/loop`} className="btn primary">
          Start mock loop (5 rooms)
        </Link>
        {pressure[0] ? (
          <Link href={`/practice/${track.slug}/${pressure[0].slug}`} className="btn">
            Jump to pressure questions
          </Link>
        ) : null}
        {first ? (
          <Link href={`/practice/${track.slug}/${first.slug}`} className="btn">
            Start from Q1
          </Link>
        ) : null}
      </div>
      <p className="meta" style={{ marginBottom: "1.25rem" }}>
        {track.scenarios.length} interviewer questions · {pressure.length} pressure questions
      </p>

      <h3 className="track-section-label">Pressure questions</h3>
      <p className="support tight" style={{ marginBottom: "1rem" }}>
        Five harder prompts: unclear asks, going fast vs doing it right, and where you draw the
        line.
      </p>
      <div className="lesson-grid" style={{ marginBottom: "2rem" }}>
        {pressure.map((s, i) => (
          <Link
            key={s.slug}
            href={`/practice/${track.slug}/${s.slug}`}
            className="lesson-link edge-link"
          >
            <p className="meta">
              {stageLabel(s.stage)} {i + 1}/{pressure.length} · {s.minutes} min
            </p>
            <h3>{s.title}</h3>
            <p>{s.summary}</p>
          </Link>
        ))}
      </div>

      <h3 className="track-section-label">Full bank</h3>
      <div className="lesson-grid">
        {core.map((s, i) => (
          <Link
            key={s.slug}
            href={`/practice/${track.slug}/${s.slug}`}
            className="lesson-link"
          >
            <p className="meta">
              {i + 1}/{core.length} · {stageLabel(s.stage)} · {s.minutes} min
            </p>
            <h3>{s.title}</h3>
            <p>{s.summary}</p>
          </Link>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem" }}>
        <Link href="/practice" className="text-link">
          All job tracks
        </Link>
      </p>
    </section>
  );
}
