"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { track } from "@/components/SessionHeartbeat";

type Debrief = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function InterviewRoundClient({
  slug,
  trackSlug,
  role,
  setting,
  stage,
  title,
  minutes,
  scenario,
  interviewer,
  playbook,
  debrief,
  canTrack,
  roundIndex,
  roundTotal,
  nextHref,
}: {
  slug: string;
  trackSlug: string;
  role: string;
  setting: string;
  stage: string;
  title: string;
  minutes: number;
  scenario: string;
  interviewer: string;
  playbook: string[];
  debrief: Debrief;
  canTrack: boolean;
  roundIndex: number;
  roundTotal: number;
  nextHref: string | null;
}) {
  const lessonId = `${trackSlug}/${slug}`;
  const budget = Math.max(1, minutes) * 60;
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [showPlaybook, setShowPlaybook] = useState(false);
  const [notes, setNotes] = useState("");
  const [remaining, setRemaining] = useState(budget);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    if (!canTrack) return;
    void track("lesson_started", { lesson_id: lessonId, role, stage });
  }, [lessonId, role, stage, canTrack]);

  useEffect(() => {
    setRemaining(budget);
    setTimerOn(false);
    setChoice(null);
    setSubmitted(false);
    setDone(false);
    setShowPlaybook(false);
    setNotes("");
  }, [lessonId, budget]);

  useEffect(() => {
    if (!timerOn) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerOn]);

  function submitDebrief() {
    if (choice === null) return;
    startTransition(async () => {
      if (canTrack) {
        await track("quiz_submitted", {
          lesson_id: lessonId,
          role,
          stage,
          correct: choice === debrief.answerIndex,
          choice,
        });
      }
      setSubmitted(true);
    });
  }

  function endRound() {
    startTransition(async () => {
      if (canTrack) {
        await track("lesson_completed", { lesson_id: lessonId, role, stage });
      }
      setDone(true);
      setTimerOn(false);
    });
  }

  const timedOut = remaining === 0;

  return (
    <div className="lesson-flow">
      <header className="lesson-head">
        <div className="round-meta-row">
          <p className="eyebrow">
            {role} · {stage}
          </p>
          <p className="meta">
            Question {roundIndex + 1} of {roundTotal}
          </p>
        </div>
        <h1>{title}</h1>
        <p className="setting-line">{setting}</p>
        <div className="timer-bar" aria-live="polite">
          <span className={timedOut ? "timer danger" : "timer"}>
            {formatClock(remaining)}
          </span>
          <div className="timer-actions">
            {!timerOn ? (
              <button type="button" className="btn compact" onClick={() => setTimerOn(true)}>
                Start {minutes}-min timer
              </button>
            ) : (
              <button type="button" className="btn compact" onClick={() => setTimerOn(false)}>
                Pause
              </button>
            )}
            <button
              type="button"
              className="btn compact"
              onClick={() => {
                setRemaining(budget);
                setTimerOn(false);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${((roundIndex + 1) / Math.max(roundTotal, 1)) * 100}%` }} />
        </div>
      </header>

      <aside className="scenario-box">
        <p className="meta">Application scenario</p>
        <p>{scenario}</p>
      </aside>

      <blockquote className="interviewer">
        <p className="meta">Interviewer</p>
        <p>{interviewer}</p>
      </blockquote>

      <label className="notes-panel">
        <span className="meta">Your scratch answer (stays on this device)</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Outline STAR beats or case structure before you speak…"
        />
      </label>

      <div className="lesson-body">
        <div className="playbook-toggle-row">
          <h2 className="round-subhead">How you work this question</h2>
          <button
            type="button"
            className="btn compact"
            onClick={() => setShowPlaybook((v) => !v)}
          >
            {showPlaybook ? "Hide playbook" : "Reveal playbook"}
          </button>
        </div>
        {showPlaybook ? (
          <ol className="playbook">
            {playbook.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        ) : (
          <p className="support tight">
            Try answering from the interviewer prompt first. Reveal the playbook when you want a
            coach’s structure.
          </p>
        )}
      </div>

      <section className="quiz" aria-labelledby="debrief-title">
        <h2 id="debrief-title">Debrief</h2>
        <p className="quiz-prompt">{debrief.prompt}</p>
        <ul className="choices">
          {debrief.choices.map((c, i) => (
            <li key={c}>
              <button
                type="button"
                className={choice === i ? "choice selected" : "choice"}
                onClick={() => !submitted && setChoice(i)}
                disabled={submitted}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
        {!submitted ? (
          <button
            type="button"
            className="btn primary"
            disabled={choice === null || pending}
            onClick={submitDebrief}
          >
            Lock answer
          </button>
        ) : (
          <p className={choice === debrief.answerIndex ? "feedback ok" : "feedback bad"}>
            {choice === debrief.answerIndex ? "Strong read. " : "Rehearse this. "}
            {debrief.explain}
          </p>
        )}
      </section>

      <footer className="lesson-foot">
        {!done ? (
          <button type="button" className="btn" disabled={pending} onClick={endRound}>
            End this question
          </button>
        ) : (
          <p className="feedback ok">Question complete — practice event recorded.</p>
        )}
        {done && nextHref ? (
          <Link href={nextHref} className="btn primary">
            Next question
          </Link>
        ) : null}
        <Link href={`/practice/${trackSlug}`} className="text-link">
          More {role} questions
        </Link>
      </footer>
    </div>
  );
}

export const LessonClient = InterviewRoundClient;
