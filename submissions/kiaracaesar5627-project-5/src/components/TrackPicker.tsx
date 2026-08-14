"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { trackFamily, type TrackFamily } from "@/lib/track-family";

type TrackCard = {
  slug: string;
  role: string;
  setting: string;
  blurb: string;
  count: number;
};

const FAMILIES: Array<TrackFamily | "All"> = [
  "All",
  "Product & tech",
  "Go-to-market",
  "Business & finance",
  "People & ops",
];

export function TrackPicker({ tracks }: { tracks: TrackCard[] }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<(typeof FAMILIES)[number]>("All");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    return tracks.filter((t) => {
      const fam = trackFamily(t.slug);
      if (family !== "All" && fam !== family) return false;
      if (!deferredQuery) return true;
      const hay = `${t.role} ${t.setting} ${t.blurb} ${fam}`.toLowerCase();
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
            placeholder="Search roles — FP&A, consulting, CS…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="family-chips" role="group" aria-label="Track family">
          {FAMILIES.map((f) => (
            <button
              key={f}
              type="button"
              className={family === f ? "chip active" : "chip"}
              onClick={() => setFamily(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <p className="meta track-count">
        {filtered.length} of {tracks.length} tracks
      </p>
      {filtered.length === 0 ? (
        <p className="support">No tracks match. Try another role name or clear the filter.</p>
      ) : (
        <div className="lesson-grid">
          {filtered.map((track) => (
            <Link key={track.slug} href={`/practice/${track.slug}`} className="lesson-link">
              <p className="meta">
                {trackFamily(track.slug)} · {track.setting} · {track.count} questions
              </p>
              <h3>{track.role}</h3>
              <p>{track.blurb}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
