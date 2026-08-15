import Link from "next/link";
import { DishVisual } from "@/components/DishVisual";
import { formatPrice } from "@/lib/format";
import { islandOf, pepperLabel } from "@/lib/place";
import type { Listing } from "@/lib/types";
import { visualFromTitle } from "@/lib/visual";

export function DishCard({ listing }: { listing: Listing }) {
  const soldOut = listing.servingsLeft < 1;
  const island = islandOf(listing);
  const visual = listing.visual || visualFromTitle(listing.title);

  return (
    <article className="wrap-card relative flex flex-col overflow-hidden rounded-2xl">
      <DishVisual visual={visual} soldOut={soldOut} />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--sage)]">
          {island === "tobago" ? "Tobago" : "Trinidad"} · {listing.neighborhood} ·{" "}
          {listing.pickupWindow}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-snug">{listing.title}</h3>
        {listing.cookLine ? (
          <p className="mt-1 text-xs italic text-[var(--muted)]">{listing.cookLine}</p>
        ) : null}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {listing.description}
        </p>
        <p className="mt-4 text-sm">
          <span className="font-medium">{listing.cookName}</span>
          <span className="text-[var(--muted)]">
            {" "}
            · {soldOut ? "pot done" : `${listing.servingsLeft} left`} ·{" "}
            {formatPrice(listing.priceCents)} · {pepperLabel(listing.pepper)}
          </span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--chip)] px-2 py-0.5 text-xs text-[var(--sage)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/dish/${listing.id}`}
          className={`mt-5 inline-flex justify-center rounded-full px-4 py-2 text-sm ${
            soldOut
              ? "cursor-not-allowed bg-[var(--line)] text-[var(--muted)]"
              : "bg-[var(--ink)] text-[var(--paper)]"
          }`}
        >
          {soldOut ? "Pot done" : "View & reserve"}
        </Link>
      </div>
    </article>
  );
}
