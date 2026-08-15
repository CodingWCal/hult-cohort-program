import Link from "next/link";
import { JOB_TRACKS } from "@/lib/lessons";
import { TRACK_FAMILY_ORDER, TRACK_FAMILY_SHORT, trackFamily } from "@/lib/track-family";
import { SITE } from "@/lib/site";
import { PracticeJournal } from "@/components/PracticeJournal";

const FEATURED = [
  "registered-nurse",
  "software-engineer",
  "high-school-teacher",
  "civil-engineer",
  "attorney",
  "social-worker",
];

export default function HomePage() {
  const featured = FEATURED.map((slug) => JOB_TRACKS.find((t) => t.slug === slug)).filter(
    Boolean,
  ) as typeof JOB_TRACKS;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Not another flashcard bank</p>
          <h1>{SITE.name}</h1>
          <p className="lede">{SITE.tagline}</p>
          <div className="cta-row">
            <Link href="/practice" className="btn primary">
              Open a room
            </Link>
            <a className="btn" href="#difference">
              What makes it different
            </a>
          </div>
        </div>
        <div className="hero-stage" aria-hidden="true">
          <div className="hero-table">
            <div className="hero-card">
              <p className="meta">Interviewer</p>
              <p>
                Walk me through a time you owned a miss — what did you do in the first forty-eight
                hours?
              </p>
            </div>
            <div className="hero-desk">
              <p className="meta">Your side</p>
              <p>Timer · speak aloud · playbook when you need it · honest self-score</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="difference">
        <h2>Built like the interview, not a quiz</h2>
        <p className="support">
          Most prep tools dump generic questions. Interview Room puts you across the table from a
          role-specific interviewer — with a mock loop that feels like interview day.
        </p>
        <ol className="how-steps">
          <li>
            <strong>320 job tracks</strong>
            <span>16 career majors · 30 prompts each · including 5 cutting-edge Edge rooms</span>
          </li>
          <li>
            <strong>Speak mode + timer</strong>
            <span>Answer out loud under the clock — Space, S, and P shortcuts</span>
          </li>
          <li>
            <strong>Answer review + interview tips</strong>
            <span>Marks your scratch draft for structure, evidence, and how to speak in the room</span>
          </li>
          <li>
            <strong>Mock loop</strong>
            <span>Five rooms in one sitting, then a private scorecard on this device</span>
          </li>
        </ol>
      </section>

      <section className="section majors-strip">
        <h2>Sixteen majors</h2>
        <p className="support">From healthcare to trades to government — not only tech and finance.</p>
        <ul className="major-pills">
          {TRACK_FAMILY_ORDER.map((f) => (
            <li key={f}>
              <Link href={`/practice?major=${encodeURIComponent(f)}`}>{TRACK_FAMILY_SHORT[f]}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section journal-home">
        <PracticeJournal compact />
      </section>

      <section className="section" id="tracks">
        <h2>Open a featured room</h2>
        <p className="support">Or browse the full catalog — then run a mock loop on any track.</p>
        <div className="lesson-grid">
          {featured.map((track) => (
            <Link key={track.slug} href={`/practice/${track.slug}`} className="lesson-link">
              <p className="meta">
                {TRACK_FAMILY_SHORT[trackFamily(track.slug)]} · {track.scenarios.length} questions
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
