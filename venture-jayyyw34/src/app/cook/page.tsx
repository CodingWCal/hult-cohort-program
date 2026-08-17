"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readSession } from "@/lib/session";
import { formatPrice } from "@/lib/format";
import { islandForTown, townsForIsland } from "@/lib/place";
import { NEIGHBORHOODS, type Account, type Island, type Listing, type Pepper } from "@/lib/types";

export default function CookPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("40");
  const [servings, setServings] = useState("6");
  const [neighborhood, setNeighborhood] = useState<string>(NEIGHBORHOODS[0]);
  const [island, setIsland] = useState<Island>("trinidad");
  const [pickupWindow, setPickupWindow] = useState("5:30–7:30pm");
  const [tags, setTags] = useState("lunch");
  const [pepper, setPepper] = useState<Pepper>("slight");
  const [cookLine, setCookLine] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<Listing | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const session = readSession();
    setAccount(session);
    if (session?.neighborhood) {
      setNeighborhood(session.neighborhood);
      setIsland(islandForTown(session.neighborhood));
    }
  }, []);

  if (!account) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <h1 className="font-serif text-4xl">List today’s menu</h1>
        <p className="mt-3 text-[var(--muted)]">
          Join as a cook first. The MVP does not use passwords.
        </p>
        <Link href="/join" className="mt-6 inline-block text-[var(--clay)]">
          Join LocalPlate
        </Link>
      </div>
    );
  }

  if (account.role !== "cook") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <h1 className="font-serif text-4xl">Switch to cook</h1>
        <p className="mt-3 text-[var(--muted)]">
          You’re signed in as a neighbour. Join again with the cook role to post a
          dish.
        </p>
        <Link href="/join" className="mt-6 inline-block text-[var(--clay)]">
          Update your role
        </Link>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!account) return;
    const cook = account;
    setPending(true);
    setError("");
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        cookId: cook.id,
        cookName: cook.name,
        title,
        description,
        priceCents: Math.round(Number(price) * 100),
        servingsLeft: Number(servings),
        neighborhood,
        pickupWindow,
        pepper,
        cookLine,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string; listing?: Listing };
    setPending(false);
    if (!data.ok || !data.listing) {
      setError(data.error || "Could not list dish.");
      return;
    }
    setSaved(data.listing);
  }

  if (saved) {
    return (
      <div className="mx-auto max-w-lg px-4 py-14">
        <div className="wrap-card rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--sage)]">
            Listed
          </p>
          <h1 className="mt-2 font-serif text-4xl">It’s on today’s menu.</h1>
          <p className="mt-3 text-[var(--muted)]">
            Neighbours can see this plate and reserve pickup. No payment in this
            MVP.
          </p>
          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
            <h2 className="font-serif text-2xl">{saved.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {saved.neighborhood} · {saved.pickupWindow} · {saved.servingsLeft}{" "}
              plates · {formatPrice(saved.priceCents)}
            </p>
            {saved.description ? (
              <p className="mt-3 text-sm leading-relaxed">{saved.description}</p>
            ) : null}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/dish/${saved.id}`}
              className="inline-flex justify-center rounded-full bg-[var(--clay)] px-5 py-2.5 text-sm text-white"
            >
              View the listing
            </Link>
            <Link
              href="/browse"
              className="inline-flex justify-center rounded-full border border-[var(--ink)] px-5 py-2.5 text-sm"
            >
              See today’s menus
            </Link>
            <button
              type="button"
              className="text-sm text-[var(--sage)]"
              onClick={() => {
                setSaved(null);
                setTitle("");
                setDescription("");
              }}
            >
              List another dish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14">
      <h1 className="font-serif text-4xl">List today’s menu</h1>
      <p className="mt-3 text-[var(--muted)]">
        One dish, today’s pickup window, how many plates you can actually make.
      </p>
      <form
        onSubmit={onSubmit}
        className="wrap-card mt-8 space-y-4 rounded-3xl p-6"
      >
        <label className="block text-sm">
          Dish
          <input
            required
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="block text-sm">
          Description
          <textarea
            required
            rows={4}
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            Price (TTD)
            <input
              required
              type="number"
              min="1"
              step="0.5"
              className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
          <label className="block text-sm">
            Servings
            <input
              required
              type="number"
              min="1"
              className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
              value={servings}
              onChange={(event) => setServings(event.target.value)}
            />
          </label>
        </div>
        <label className="block text-sm">
          One-line cook story
          <input
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={cookLine}
            onChange={(event) => setCookLine(event.target.value)}
            placeholder="St. James, wrapping since savannah days"
          />
        </label>
        <label className="block text-sm">
          Island
          <select
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={island}
            onChange={(event) => {
              const next = event.target.value as Island;
              setIsland(next);
              setNeighborhood(townsForIsland(next)[0]);
            }}
          >
            <option value="trinidad">Trinidad</option>
            <option value="tobago">Tobago</option>
          </select>
        </label>
        <label className="block text-sm">
          Town / area
          <select
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={neighborhood}
            onChange={(event) => setNeighborhood(event.target.value)}
          >
            {townsForIsland(island).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Pepper
          <select
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={pepper}
            onChange={(event) => setPepper(event.target.value as Pepper)}
          >
            <option value="slight">Slight</option>
            <option value="slight-plus">Slight-plus</option>
            <option value="plenty">Plenty</option>
            <option value="none">No pepper</option>
          </select>
        </label>
        <label className="block text-sm">
          Pickup window
          <input
            required
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={pickupWindow}
            onChange={(event) => setPickupWindow(event.target.value)}
          />
        </label>
        <label className="block text-sm">
          Tags (comma-separated)
          <input
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          disabled={pending}
          className="w-full rounded-full bg-[var(--clay)] py-2.5 text-sm text-white disabled:opacity-60"
        >
          {pending ? "Posting…" : "Post today’s dish"}
        </button>
      </form>
    </div>
  );
}
