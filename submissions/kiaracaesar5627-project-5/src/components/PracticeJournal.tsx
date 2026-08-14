"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { averageScores, readJournal, type JournalEntry, type JournalState } from "@/lib/practice-journal";

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

export function PracticeJournal({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<JournalState | null>(null);

  useEffect(() => {
    setState(readJournal());
    const onStorage = () => setState(readJournal());
    window.addEventListener("storage", onStorage);
    window.addEventListener("ir-journal", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ir-journal", onStorage);
    };
  }, []);

  if (!state) {
    return (
      <aside className="journal-panel" aria-busy="true">
        <p className="meta">Your rooms</p>
        <p className="support tight">Loading local journal…</p>
      </aside>
    );
  }

  const recent = state.entries.slice(0, compact ? 4 : 10);
  const avg = averageScores(state.entries);

  return (
    <aside className="journal-panel">
      <div className="journal-head">
        <div>
          <p className="meta">Practice journal</p>
          <h3 className="journal-title">Rooms on this device</h3>
        </div>
        {avg ? (
          <p className="journal-avg meta" title="Average self-scores from completed rooms">
            Avg {avg.structure}/{avg.evidence}/{avg.clarity}
            <span className="sr-only"> structure, evidence, clarity</span>
          </p>
        ) : null}
      </div>
      {recent.length === 0 ? (
        <p className="support tight">
          Finish a question or a mock loop — your local history appears here. Nothing is uploaded.
        </p>
      ) : (
        <ul className="journal-list">
          {recent.map((e: JournalEntry) => (
            <li key={e.id}>
              <Link href={`/practice/${e.trackSlug}/${e.scenarioSlug}`}>
                <span className="journal-when">{formatWhen(e.at)}</span>
                <strong>{e.role}</strong>
                <span className="journal-detail">
                  {e.mode === "loop" ? "Mock loop · " : ""}
                  {e.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {state.recentTracks.length > 0 ? (
        <p className="journal-recents">
          Recent tracks:{" "}
          {state.recentTracks.slice(0, 4).map((slug, i) => (
            <span key={slug}>
              {i > 0 ? " · " : ""}
              <Link href={`/practice/${slug}`}>{slug.replace(/-/g, " ")}</Link>
            </span>
          ))}
        </p>
      ) : null}
    </aside>
  );
}
