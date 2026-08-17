"use client";

import { useEffect } from "react";
import { DEMO_STEPS, markTourSeen, type DemoStep } from "@/lib/demo-tour";

export function DemoWalkthrough({
  stepIndex,
  onGo,
  onSkip,
}: {
  stepIndex: number;
  onGo: (nextIndex: number) => void;
  onSkip: () => void;
}) {
  const step: DemoStep = DEMO_STEPS[stepIndex] ?? DEMO_STEPS[0]!;
  const n = stepIndex + 1;
  const total = DEMO_STEPS.length;
  const last = stepIndex >= total - 1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (last) {
          markTourSeen();
        } else {
          onGo(stepIndex + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (stepIndex > 0) onGo(stepIndex - 1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        markTourSeen();
        onSkip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepIndex, last, onGo, onSkip]);

  return (
    <aside className="demo-coach" aria-label="Demo walkthrough">
      <p className="meta">
        Step {n} of {total} · presenter notes
      </p>
      <h2 className="demo-coach-title">{step.title}</h2>
      <p className="demo-say">
        <span className="meta">Say this</span>
        {step.say}
      </p>
      <div className="demo-coach-actions">
        <button
          type="button"
          className="btn compact"
          disabled={stepIndex === 0}
          onClick={() => onGo(stepIndex - 1)}
        >
          Back
        </button>
        <button
          type="button"
          className="btn compact primary"
          onClick={() => {
            if (last) {
              markTourSeen();
              onSkip();
            } else {
              onGo(stepIndex + 1);
            }
          }}
        >
          {last ? "Finish" : "Next"}
        </button>
        <button
          type="button"
          className="btn compact"
          onClick={() => {
            markTourSeen();
            onSkip();
          }}
        >
          Skip
        </button>
      </div>
      <p className="kbd-hint meta">
        Shortcuts: <kbd>→</kbd> next · <kbd>←</kbd> back · <kbd>Esc</kbd> exit
      </p>
    </aside>
  );
}
