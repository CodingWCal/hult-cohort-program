"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { track } from "@/components/SessionHeartbeat";
import { recordPractice, type SelfScore } from "@/lib/practice-journal";

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

function ScoreRow({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="score-row">
      <span>{label}</span>
      <div className="score-pips" role="group" aria-label={label}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={value >= n ? "pip on" : "pip"}
            disabled={disabled}
            onClick={() => onChange(n)}
            aria-pressed={value === n}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
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
  mode = "single",
  onRoomComplete,
  hideTrackLink = false,
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
  mode?: "single" | "loop";
  onRoomComplete?: (result: {
    debriefCorrect: boolean | null;
    scores: SelfScore;
  }) => void;
  hideTrackLink?: boolean;
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
  const [speakMode, setSpeakMode] = useState(false);
  const [scores, setScores] = useState<SelfScore>({ structure: 0, evidence: 0, clarity: 0 });
  const [hint, setHint] = useState("");

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
    setSpeakMode(false);
    setScores({ structure: 0, evidence: 0, clarity: 0 });
    setHint("");
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

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.key === " " && !e.repeat) {
        e.preventDefault();
        setTimerOn((v) => !v);
        setHint(timerOn ? "Timer paused" : "Timer running");
      } else if (e.key === "p" || e.key === "P") {
        setShowPlaybook((v) => !v);
        setHint("Playbook toggled");
      } else if (e.key === "s" || e.key === "S") {
        setSpeakMode((v) => {
          const next = !v;
          if (next) setTimerOn(true);
          setHint(next ? "Speak mode on — answer out loud" : "Speak mode off");
          return next;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    const scored =
      scores.structure > 0 && scores.evidence > 0 && scores.clarity > 0
        ? scores
        : { structure: 3, evidence: 3, clarity: 3 };
    startTransition(async () => {
      if (canTrack) {
        await track("lesson_completed", { lesson_id: lessonId, role, stage });
      }
      if (mode === "single") {
        recordPractice({
          trackSlug,
          role,
          scenarioSlug: slug,
          title,
          mode: "single",
          scores: scored,
          debriefCorrect: submitted ? choice === debrief.answerIndex : undefined,
        });
        window.dispatchEvent(new Event("ir-journal"));
      }
      onRoomComplete?.({
        debriefCorrect: submitted ? choice === debrief.answerIndex : null,
        scores: scored,
      });
      setDone(true);
      setTimerOn(false);
      setSpeakMode(false);
    });
  }

  const timedOut = remaining === 0;
  const pressure = remaining > 0 && remaining <= 60;

  return (
    <div className={speakMode ? "lesson-flow room speak-on" : "lesson-flow room"}>
      <header className="lesson-head">
        <div className="round-meta-row">
          <p className="eyebrow">
            {role} · {stage}
            {stage === "Edge" ? " · Cutting edge" : ""}
            {mode === "loop" ? " · Mock loop" : ""}
          </p>
          <p className="meta">
            Question {roundIndex + 1} of {roundTotal}
          </p>
        </div>
        <h1>{title}</h1>
        <p className="setting-line">{setting}</p>
        <div className="timer-bar" aria-live="polite">
          <span className={timedOut ? "timer danger" : pressure ? "timer warn" : "timer"}>
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
              className={speakMode ? "btn compact primary" : "btn compact"}
              onClick={() => {
                setSpeakMode((v) => !v);
                setTimerOn(true);
              }}
            >
              {speakMode ? "Exit speak mode" : "Speak aloud"}
            </button>
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
        <p className="kbd-hint meta">
          Shortcuts: <kbd>Space</kbd> timer · <kbd>S</kbd> speak · <kbd>P</kbd> playbook
          {hint ? ` · ${hint}` : ""}
        </p>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${((roundIndex + 1) / Math.max(roundTotal, 1)) * 100}%` }} />
        </div>
      </header>

      <div className="room-grid">
        <div className="room-interviewer">
          <p className="meta room-label">Across the table</p>
          <aside className="scenario-box">
            <p className="meta">Application scenario</p>
            <p>{scenario}</p>
          </aside>
          <blockquote className="interviewer">
            <p className="meta">Interviewer</p>
            <p>{interviewer}</p>
          </blockquote>
          {speakMode ? (
            <p className="speak-coach" aria-live="polite">
              Look at the prompt. Answer out loud like the interviewer is waiting. Notes stay private
              on this device.
            </p>
          ) : null}
        </div>

        <div className="room-candidate">
          <p className="meta room-label">Your side of the table</p>
          <label className="notes-panel">
            <span className="meta">Scratch answer (stays on this device)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={speakMode ? 3 : 6}
              placeholder="STAR beats, case structure, or key numbers before you speak…"
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
                Answer from the interviewer prompt first. Reveal the playbook when you want a coach’s
                structure — not before you’ve tried.
              </p>
            )}
          </div>
        </div>
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

      <section className="self-score" aria-labelledby="self-score-title">
        <h2 id="self-score-title">Honest self-score</h2>
        <p className="support tight">
          Grade yourself before you leave the room — structure, evidence, clarity. Saved only on this
          device.
        </p>
        <ScoreRow
          label="Structure"
          value={scores.structure}
          disabled={done}
          onChange={(n) => setScores((s) => ({ ...s, structure: n }))}
        />
        <ScoreRow
          label="Evidence"
          value={scores.evidence}
          disabled={done}
          onChange={(n) => setScores((s) => ({ ...s, evidence: n }))}
        />
        <ScoreRow
          label="Clarity"
          value={scores.clarity}
          disabled={done}
          onChange={(n) => setScores((s) => ({ ...s, clarity: n }))}
        />
      </section>

      <footer className="lesson-foot">
        {!done ? (
          <button type="button" className="btn" disabled={pending} onClick={endRound}>
            {mode === "loop" ? "Complete & continue loop" : "End this question"}
          </button>
        ) : (
          <p className="feedback ok">
            {mode === "loop" ? "Logged for this loop." : "Question complete — saved to your journal."}
          </p>
        )}
        {done && nextHref && mode === "single" ? (
          <Link href={nextHref} className="btn primary">
            Next question
          </Link>
        ) : null}
        {!hideTrackLink ? (
          <Link href={`/practice/${trackSlug}`} className="text-link">
            More {role} questions
          </Link>
        ) : null}
        {mode === "single" ? (
          <Link href={`/practice/${trackSlug}/loop`} className="text-link">
            Run a mock loop
          </Link>
        ) : null}
      </footer>
    </div>
  );
}

export const LessonClient = InterviewRoundClient;
