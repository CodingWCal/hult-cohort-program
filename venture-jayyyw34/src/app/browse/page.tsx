"use client";

import { useEffect, useMemo, useState } from "react";
import { DishCard } from "@/components/DishCard";
import { DAYPARTS, NEIGHBORHOODS, type Daypart, type Island, type Listing } from "@/lib/types";
import { islandOf, isOnNow, townsForIsland } from "@/lib/place";
import { readSession } from "@/lib/session";

export default function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [island, setIsland] = useState<Island | "all">("all");
  const [neighborhood, setNeighborhood] = useState("all");
  const [daypart, setDaypart] = useState<Daypart | "all" | "now">("all");
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

  const towns = island === "all" ? NEIGHBORHOODS : townsForIsland(island);

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      if (island !== "all" && islandOf(listing) !== island) return false;
      if (neighborhood !== "all" && listing.neighborhood !== neighborhood) return false;
      if (daypart === "now") return isOnNow(listing);
      if (daypart !== "all" && listing.daypart !== daypart) return false;
      return true;
    });
  }, [listings, island, neighborhood, daypart]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl">Tonight’s menus</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Menus change with the Trinidad & Tobago day. Cook-listed dishes stay.
        Filter by island, town, and daypart.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["all", "Both islands"],
            ["trinidad", "Trinidad"],
            ["tobago", "Tobago"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setIsland(id);
              setNeighborhood("all");
            }}
            className={`rounded-full px-4 py-1.5 text-sm ${
              island === id
                ? "bg-[var(--ink)] text-[var(--paper)]"
                : "border border-[var(--line)] bg-[var(--card)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <select
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm"
          value={neighborhood}
          onChange={(event) => setNeighborhood(event.target.value)}
        >
          <option value="all">All towns</option>
          {towns.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm"
          value={daypart}
          onChange={(event) => setDaypart(event.target.value as Daypart | "all" | "now")}
        >
          <option value="all">All dayparts</option>
          <option value="now">On the fire now</option>
          {DAYPARTS.map((part) => (
            <option key={part.id} value={part.id}>
              {part.label}
            </option>
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
