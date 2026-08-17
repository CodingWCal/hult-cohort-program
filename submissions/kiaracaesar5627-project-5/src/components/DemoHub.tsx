"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InterviewRoundClient } from "@/components/LessonClient";
import { PracticeJournal } from "@/components/PracticeJournal";
import { DemoWalkthrough } from "@/components/DemoWalkthrough";
import { getTrack } from "@/lib/lessons";
import { isPressureStage } from "@/lib/track-model";
import { TRACK_FAMILY_ORDER, TRACK_FAMILY_SHORT, trackFamily } from "@/lib/track-family";
import {
  DEMO_FEATURED_SLUGS,
  DEMO_STEPS,
  SAMPLE_STAR_DRAFT,
  markTourSeen,
  parseStepParam,
  parseTrackParam,
} from "@/lib/demo-tour";

const FEATURE_JUMP_IDS = ["room", "speak", "track", "review", "loop", "journal"] as const;

export function DemoHub() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const stepN = parseStepParam(params.get("step"));
  const stepIndex = stepN - 1;
  const trackSlug = parseTrackParam(params.get("track"));
  const track = getTrack(trackSlug) ?? getTrack("software-engineer");
  const step = DEMO_STEPS[stepIndex] ?? DEMO_STEPS[0]!;

  const replaceQuery = useCallback(
    (nextStep: number, nextTrack = trackSlug) => {
      const q = new URLSearchParams();
      q.set("step", String(nextStep));
      q.set("track", nextTrack);
      if (params.get("demo") === "1") q.set("demo", "1");
      router.replace(`${pathname}?${q.toString()}`, { scroll: false });
    },
    [params, pathname, router, trackSlug],
  );

  const onGo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(DEMO_STEPS.length - 1, nextIndex));
      replaceQuery(clamped + 1);
    },
    [replaceQuery],
  );

  const onSkip = useCallback(() => {
    markTourSeen();
  }, []);

  if (!track) return null;

  const first = track.scenarios[0];
  const pressure = track.scenarios.filter((s) => isPressureStage(s.stage));
  const featured = DEMO_FEATURED_SLUGS.map((slug) => getTrack(slug)).filter(Boolean);
  const showRoom = ["room", "speak", "review", "playbook"].includes(step.id);

  return (
    <section className="section demo-hub" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <p className="eyebrow">Live product · presenter walkthrough</p>
      <h1>Demo Interview Room</h1>
      <p className="lede">
        Click through while you talk. This is the real catalog and a live room — not a slide deck.
      </p>
      <div className="cta-row" style={{ marginBottom: "1.25rem" }}>
        <button type="button" className="btn primary" onClick={() => replaceQuery(1, trackSlug)}>
          Start walkthrough
        </button>
        <Link href={`/practice/${track.slug}`} className="btn">
          Open {track.role} live
        </Link>
        <Link href={`/practice/${track.slug}/loop`} className="btn">
          Start a mock loop
        </Link>
        <Link href="/tips" className="btn">
          Pro tips
        </Link>
      </div>

      <div className="demo-jump-grid" aria-label="Jump to a feature">
        {FEATURE_JUMP_IDS.map((id) => {
          const s = DEMO_STEPS.find((x) => x.id === id);
          const idx = DEMO_STEPS.findIndex((x) => x.id === id);
          if (!s || idx < 0) return null;
          return (
            <button
              key={s.id}
              type="button"
              className={step.id === s.id ? "demo-jump on" : "demo-jump"}
              onClick={() => replaceQuery(idx + 1)}
            >
              {s.jumpLabel}
            </button>
          );
        })}
      </div>

      <label className="demo-track-pick">
        <span className="meta">Role for this demo</span>
        <select
          value={track.slug}
          onChange={(e) => replaceQuery(stepN, e.target.value)}
        >
          {featured.map((t) =>
            t ? (
              <option key={t.slug} value={t.slug}>
                {t.role}
              </option>
            ) : null,
          )}
        </select>
      </label>

      <DemoWalkthrough stepIndex={stepIndex} onGo={onGo} onSkip={onSkip} />

      <div className="demo-preview" data-highlight={step.highlight}>
        {step.id === "catalog" ? (
          <div data-tour="catalog">
            <h3 className="track-section-label">Sixteen majors</h3>
            <p className="support tight">
              320 tracks · 30 interviewer questions each · including 5 pressure questions
            </p>
            <ul className="major-pills">
              {TRACK_FAMILY_ORDER.map((f) => (
                <li key={f}>
                  <Link href={`/practice?major=${encodeURIComponent(f)}`}>
                    {TRACK_FAMILY_SHORT[f]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {step.id === "track" ? (
          <div data-tour="track">
            <p className="meta">
              {TRACK_FAMILY_SHORT[trackFamily(track.slug)]} · {track.setting}
            </p>
            <h3>{track.role}</h3>
            <p className="support tight">{track.blurb}</p>
            <p className="meta" style={{ margin: "0.75rem 0" }}>
              {track.scenarios.length} interviewer questions · {pressure.length} pressure questions
            </p>
            <h4 className="track-section-label">Pressure questions</h4>
            <ul className="demo-pressure-list">
              {pressure.map((s, i) => (
                <li key={s.slug}>
                  <Link href={`/practice/${track.slug}/${s.slug}`}>
                    Pressure {i + 1}/{pressure.length} · {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showRoom && first ? (
          <>
            {step.id === "review" ? (
              <details className="demo-sample">
                <summary>STAR skeleton to paste into scratch notes</summary>
                <pre>{SAMPLE_STAR_DRAFT}</pre>
                <p className="support tight">
                  Example outline only — not a recorded answer from a person.
                </p>
              </details>
            ) : null}
            <InterviewRoundClient
              slug={first.slug}
              trackSlug={track.slug}
              role={track.role}
              setting={track.setting}
              stage={first.stage}
              title={first.title}
              minutes={first.minutes}
              scenario={first.scenario}
              interviewer={first.interviewer}
              playbook={first.playbook}
              debrief={first.debrief}
              canTrack={false}
              roundIndex={0}
              roundTotal={track.scenarios.length}
              nextHref={null}
              hideTrackLink
            />
          </>
        ) : null}

        {step.id === "loop" ? (
          <div data-tour="loop" className="demo-loop-card">
            <h3>Mock loop</h3>
            <p className="support">
              Five rooms in one sitting for {track.role}, including pressure questions — timer,
              speak mode, answer review, debrief, and a private scorecard on this device.
            </p>
            <Link href={`/practice/${track.slug}/loop`} className="btn primary">
              Open {track.role} mock loop
            </Link>
          </div>
        ) : null}

        {step.id === "journal" ? (
          <div data-tour="journal">
            <PracticeJournal compact />
          </div>
        ) : null}
      </div>
    </section>
  );
}
