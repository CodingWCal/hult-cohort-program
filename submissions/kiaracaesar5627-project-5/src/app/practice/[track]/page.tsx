import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack, JOB_TRACKS } from "@/lib/lessons";
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

  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <SessionHeartbeat />
      <p className="eyebrow">
        {trackFamily(track.slug)} · {track.setting}
      </p>
      <h2>{track.role}</h2>
      <p className="support">{track.blurb}</p>
      <p className="meta" style={{ marginBottom: "1.25rem" }}>
        {track.scenarios.length} interviewer questions
      </p>
      <div className="lesson-grid">
        {track.scenarios.map((s, i) => (
          <Link
            key={s.slug}
            href={`/practice/${track.slug}/${s.slug}`}
            className="lesson-link"
          >
            <p className="meta">
              {i + 1}/{track.scenarios.length} · {s.stage} · {s.minutes} min
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
