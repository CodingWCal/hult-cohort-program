import Link from "next/link";
import { JOB_TRACKS } from "@/lib/lessons";
import { trackFamily } from "@/lib/track-family";
import { SITE } from "@/lib/site";

const FEATURED = [
  "software-engineer",
  "product-manager",
  "finance-fpa",
  "management-consulting",
  "customer-success",
  "investment-banking",
];

export default function HomePage() {
  const featured = FEATURED.map((slug) => JOB_TRACKS.find((t) => t.slug === slug)).filter(
    Boolean,
  ) as typeof JOB_TRACKS;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Mock interviews by job application</p>
          <h1>{SITE.name}</h1>
          <p className="lede">{SITE.tagline}</p>
          <div className="cta-row">
            <Link href="/practice" className="btn primary">
              Start practicing
            </Link>
            <a className="btn" href="#how">
              How it works
            </a>
          </div>
        </div>
        <div className="hero-stage" aria-hidden="true">
          <div className="hero-card">
            <p className="meta">Interviewer</p>
            <p>
              Walk me through a time you owned a miss — what did you do in the first forty-eight
              hours?
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <h2>How a room works</h2>
        <p className="support">
          Pick the role you applied for. Answer the interviewer prompt on a timer. Debrief with a
          structured check — no generic puzzle dump.
        </p>
        <ol className="how-steps">
          <li>
            <strong>Choose a track</strong>
            <span>25 roles · 20 interviewer questions each</span>
          </li>
          <li>
            <strong>Answer under time</strong>
            <span>Scratch notes + optional playbook reveal</span>
          </li>
          <li>
            <strong>Debrief</strong>
            <span>Lock the strongest read, then take the next question</span>
          </li>
        </ol>
      </section>

      <section className="section" id="tracks">
        <h2>Start with a common loop</h2>
        <p className="support">
          Featured tracks — open any, or browse the full catalog on Practice.
        </p>
        <div className="lesson-grid">
          {featured.map((track) => (
            <Link key={track.slug} href={`/practice/${track.slug}`} className="lesson-link">
              <p className="meta">
                {trackFamily(track.slug)} · {track.scenarios.length} questions
              </p>
              <h3>{track.role}</h3>
              <p>{track.blurb}</p>
            </Link>
          ))}
        </div>
        <p className="section-cta">
          <Link href="/practice" className="btn primary">
            Browse all {JOB_TRACKS.length} tracks
          </Link>
        </p>
      </section>
    </>
  );
}
