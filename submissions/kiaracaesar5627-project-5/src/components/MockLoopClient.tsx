"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { InterviewRoundClient } from "@/components/LessonClient";
import { recordPractice, type SelfScore } from "@/lib/practice-journal";

export type LoopRound = {
  slug: string;
  stage: string;
  title: string;
  minutes: number;
  scenario: string;
  interviewer: string;
  playbook: string[];
  debrief: {
    prompt: string;
    choices: string[];
    answerIndex: number;
    explain: string;
  };
};

type RoundResult = {
  slug: string;
  title: string;
  stage: string;
  debriefCorrect: boolean | null;
  scores: SelfScore;
};

export function MockLoopClient({
  trackSlug,
  role,
  setting,
  rounds,
  canTrack,
}: {
  trackSlug: string;
  role: string;
  setting: string;
  rounds: LoopRound[];
  canTrack: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [finished, setFinished] = useState(false);

  const current = rounds[index];
  const avg = useMemo(() => {
    if (!results.length) return null;
    const n = results.length;
    const sum = results.reduce(
      (a, r) => ({
        structure: a.structure + r.scores.structure,
        evidence: a.evidence + r.scores.evidence,
        clarity: a.clarity + r.scores.clarity,
      }),
      { structure: 0, evidence: 0, clarity: 0 },
    );
    return {
      structure: Math.round((sum.structure / n) * 10) / 10,
      evidence: Math.round((sum.evidence / n) * 10) / 10,
      clarity: Math.round((sum.clarity / n) * 10) / 10,
      correct: results.filter((r) => r.debriefCorrect === true).length,
      answered: results.filter((r) => r.debriefCorrect !== null).length,
    };
  }, [results]);

  function onRoomComplete(result: { debriefCorrect: boolean | null; scores: SelfScore }) {
    if (!current) return;
    const nextResults = [
      ...results,
      {
        slug: current.slug,
        title: current.title,
        stage: current.stage,
        debriefCorrect: result.debriefCorrect,
        scores: result.scores,
      },
    ];
    setResults(nextResults);

    if (index >= rounds.length - 1) {
      recordPractice({
        trackSlug,
        role,
        scenarioSlug: current.slug,
        title: `Mock loop · ${rounds.length} rooms`,
        mode: "loop",
        scores: result.scores,
        debriefCorrect: result.debriefCorrect ?? undefined,
      });
      window.dispatchEvent(new Event("ir-journal"));
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  if (finished && avg) {
    return (
      <section className="loop-scorecard">
        <p className="eyebrow">Mock loop complete</p>
        <h1>{role}</h1>
        <p className="support">
          You sat {rounds.length} rooms in one session — closer to a real interview day than
          single-question drilling.
        </p>
        <div className="scorecard-grid">
          <div>
            <p className="meta">Structure</p>
            <p className="scorecard-num">{avg.structure}</p>
          </div>
          <div>
            <p className="meta">Evidence</p>
            <p className="scorecard-num">{avg.evidence}</p>
          </div>
          <div>
            <p className="meta">Clarity</p>
            <p className="scorecard-num">{avg.clarity}</p>
          </div>
          <div>
            <p className="meta">Debrief reads</p>
            <p className="scorecard-num">
              {avg.correct}/{avg.answered || "—"}
            </p>
          </div>
        </div>
        <ul className="loop-recap">
          {results.map((r, i) => (
            <li key={r.slug}>
              <span className="meta">
                {i + 1}. {r.stage}
              </span>
              <strong>{r.title}</strong>
              <span>
                {r.scores.structure}/{r.scores.evidence}/{r.scores.clarity}
                {r.debriefCorrect === true
                  ? " · strong debrief"
                  : r.debriefCorrect === false
                    ? " · rehearse debrief"
                    : ""}
              </span>
            </li>
          ))}
        </ul>
        <div className="cta-row">
          <Link href={`/practice/${trackSlug}/loop`} className="btn primary">
            Run another loop
          </Link>
          <Link href={`/practice/${trackSlug}`} className="btn">
            All {role} questions
          </Link>
          <Link href="/practice" className="text-link">
            Pick another track
          </Link>
        </div>
      </section>
    );
  }

  if (!current) return null;

  return (
    <InterviewRoundClient
      key={current.slug}
      slug={current.slug}
      trackSlug={trackSlug}
      role={role}
      setting={setting}
      stage={current.stage}
      title={current.title}
      minutes={current.minutes}
      scenario={current.scenario}
      interviewer={current.interviewer}
      playbook={current.playbook}
      debrief={current.debrief}
      canTrack={canTrack}
      roundIndex={index}
      roundTotal={rounds.length}
      nextHref={null}
      mode="loop"
      hideTrackLink
      onRoomComplete={onRoomComplete}
    />
  );
}
