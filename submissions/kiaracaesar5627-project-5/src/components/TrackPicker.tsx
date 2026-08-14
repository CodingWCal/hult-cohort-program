"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  TRACK_FAMILY_ORDER,
  TRACK_FAMILY_SHORT,
  trackFamily,
  type TrackFamily,
} from "@/lib/track-family";

type TrackCard = {
  slug: string;
  role: string;
  setting: string;
  blurb: string;
  count: number;
};

const FAMILIES: Array<TrackFamily | "All"> = ["All", ...TRACK_FAMILY_ORDER];

export function TrackPicker({
  tracks,
  initialFamily,
}: {
  tracks: TrackCard[];
  initialFamily?: string;
}) {
  const start: (typeof FAMILIES)[number] =
    initialFamily && (FAMILIES as string[]).includes(initialFamily)
      ? (initialFamily as TrackFamily)
      : "All";
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<(typeof FAMILIES)[number]>(start);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  useEffect(() => {
    setFamily(start);
  }, [start]);

  const filtered = useMemo(() => {
    return tracks.filter((t) => {
      const fam = trackFamily(t.slug);
      if (family !== "All" && fam !== family) return false;
      if (!deferredQuery) return true;
      const hay = `${t.role} ${t.setting} ${t.blurb} ${fam} ${TRACK_FAMILY_SHORT[fam]}`.toLowerCase();
      return hay.includes(deferredQuery);
    });
  }, [tracks, family, deferredQuery]);

  return (
    <div className="track-picker">
      <div className="track-toolbar">
        <label className="track-search">
          <span className="sr-only">Search tracks</span>
          <input
            type="search"
            placeholder="Search roles — nurse, teacher, engineer…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="family-chips" role="group" aria-label="Career major">
          {FAMILIES.map((f) => (
            <button
              key={f}
              type="button"
              className={family === f ? "chip active" : "chip"}
              onClick={() => setFamily(f)}
              title={f === "All" ? "All majors" : f}
            >
              {f === "All" ? "All" : TRACK_FAMILY_SHORT[f]}
            </button>
          ))}
        </div>
      </div>
      <p className="meta track-count">
        {filtered.length} of {tracks.length} tracks
        {family !== "All" ? ` · ${family}` : ""}
      </p>
      {filtered.length === 0 ? (
        <p className="support">No tracks match. Try another role name or clear the filter.</p>
      ) : (
        <div className="lesson-grid">
          {filtered.map((track) => (
            <Link key={track.slug} href={`/practice/${track.slug}`} className="lesson-link">
              <p className="meta">
                {TRACK_FAMILY_SHORT[trackFamily(track.slug)]} · {track.setting} · {track.count}{" "}
                questions
              </p>
              <h3>{track.role}</h3>
              <p>{track.blurb}</p>
              <p className="meta track-loop-hint">Mock loop available</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
