"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DishVisual } from "@/components/DishVisual";
import { formatPrice } from "@/lib/format";
import { islandOf, pepperLabel } from "@/lib/place";
import { readSession } from "@/lib/session";
import type { Account, Listing, Order, Pepper } from "@/lib/types";
import { visualFromTitle, whatsappShareUrl } from "@/lib/visual";

export default function DishPage() {
  const params = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [pepper, setPepper] = useState<Pepper>("slight");
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [pending, setPending] = useState(false);
  const [href, setHref] = useState("");

  useEffect(() => {
    setAccount(readSession());
    setHref(window.location.href);
    void fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => {
        const found = (data.listings as Listing[]).find((row) => row.id === params.id);
        setListing(found ?? null);
        if (found?.pepper) setPepper(found.pepper);
      });
  }, [params.id]);

  async function placeOrder(event: React.FormEvent) {
    event.preventDefault();
    if (!account || !listing) return;
    setPending(true);
    setError("");
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        listingId: listing.id,
        buyerId: account.id,
        buyerName: account.name,
        qty,
        note,
        pepper,
      }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string; order?: Order };
    setPending(false);
    if (!data.ok || !data.order) {
      setError(data.error || "Could not place order.");
      return;
    }
    setOrder(data.order);
    setListing({ ...listing, servingsLeft: listing.servingsLeft - qty });
  }

  if (!listing) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <p>Looking for that plate…</p>
      </div>
    );
  }

  const soldOut = listing.servingsLeft < 1;
  const island = islandOf(listing);
  const visual = listing.visual || visualFromTitle(listing.title);
  const share = whatsappShareUrl({
    cookName: listing.cookName,
    title: listing.title,
    neighborhood: listing.neighborhood,
    pickupWindow: listing.pickupWindow,
    href: href || `https://localplate-jayyyw34.vercel.app/dish/${listing.id}`,
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="wrap-card overflow-hidden rounded-3xl">
        <DishVisual visual={visual} soldOut={soldOut} />
        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--sage)]">
            {island === "tobago" ? "Tobago" : "Trinidad"} · {listing.neighborhood} ·{" "}
            {listing.availableDate}
          </p>
          <h1 className="mt-2 font-serif text-4xl">{listing.title}</h1>
          {listing.cookLine ? (
            <p className="mt-2 text-sm italic text-[var(--muted)]">{listing.cookLine}</p>
          ) : null}
          <p className="mt-3 text-lg text-[var(--muted)]">{listing.description}</p>
          <p className="mt-4">
            {listing.cookName} · pickup {listing.pickupWindow} · {formatPrice(listing.priceCents)} ·{" "}
            {soldOut ? "pot done" : `${listing.servingsLeft} left`} · {pepperLabel(listing.pepper)}
          </p>
          <a
            href={share}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-[var(--sage)]"
          >
            Share on WhatsApp
          </a>
        </div>
      </div>

      {order ? (
        <div className="wrap-card mt-8 rounded-2xl p-5">
          <h2 className="font-serif text-2xl">Order placed</h2>
          <p className="mt-3 font-serif text-3xl">{order.collectCode}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {order.qty} × {order.listingTitle}, {pepperLabel(order.pepper)}. Pickup from{" "}
            {listing.cookName} during {listing.pickupWindow}. This MVP does not process
            payments.
          </p>
          <Link href="/orders" className="mt-4 inline-block text-sm text-[var(--clay)]">
            See your orders
          </Link>
        </div>
      ) : soldOut ? (
        <p className="mt-8 text-[var(--muted)]">Pot done. Check another wrap on the board.</p>
      ) : account ? (
        <form onSubmit={placeOrder} className="wrap-card mt-8 space-y-4 rounded-2xl p-5">
          <label className="block text-sm">
            Servings
            <input
              type="number"
              min={1}
              max={listing.servingsLeft}
              className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
              value={qty}
              onChange={(event) => setQty(Number(event.target.value))}
            />
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
            Note for the cook
            <textarea
              className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Allergies, buss-up-shut, doorbell notes…"
            />
          </label>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button
            disabled={pending}
            className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)] disabled:opacity-50"
          >
            {pending ? "Placing…" : "Reserve plate"}
          </button>
        </form>
      ) : (
        <p className="mt-8">
          <Link href="/join" className="text-[var(--clay)]">
            Join as a neighbour
          </Link>{" "}
          to reserve a plate. No password required.
        </p>
      )}
    </div>
  );
}
