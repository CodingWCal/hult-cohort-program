"use client";

import { useEffect, useMemo, useState } from "react";
import { DishCard } from "@/components/DishCard";
import { readSession } from "@/lib/session";
import { NEIGHBORHOODS, type Listing } from "@/lib/types";

export default function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [neighborhood, setNeighborhood] = useState("all");
  const [tag, setTag] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    void fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) throw new Error(data.error || "Could not load menus");
        setListings(data.listings as Listing[]);
      })
      .catch((err: Error) => setError(err.message));

    const session = readSession();
    if (session) {
      void fetch("/api/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "browse", userId: session.id }),
      });
    }
  }, []);

  const tags = useMemo(() => {
    return Array.from(new Set(listings.flatMap((listing) => listing.tags))).sort();
  }, [listings]);

  const filtered = listings.filter((listing) => {
    if (neighborhood !== "all" && listing.neighborhood !== neighborhood) return false;
    if (tag !== "all" && !listing.tags.includes(tag)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl">Tonight’s menus</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Filter by neighborhood or dish type. Seeded kitchens are examples so the
        board is never empty; anything you list as a cook appears here too.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <select
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm"
          value={neighborhood}
          onChange={(event) => setNeighborhood(event.target.value)}
        >
          <option value="all">All neighborhoods</option>
          {NEIGHBORHOODS.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        >
          <option value="all">All dishes</option>
          {tags.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing) => (
          <DishCard key={listing.id} listing={listing} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-10 text-[var(--muted)]">No plates match those filters.</p>
      ) : null}
    </div>
  );
}
