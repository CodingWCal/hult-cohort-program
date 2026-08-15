import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Listing } from "@/lib/types";

export function DishCard({ listing }: { listing: Listing }) {
  return (
    <article className="flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_1px_0_rgba(28,25,20,0.04)]">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--sage)]">
        {listing.neighborhood} · {listing.pickupWindow}
      </p>
      <h3 className="mt-2 font-serif text-2xl leading-snug">{listing.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {listing.description}
      </p>
      <p className="mt-4 text-sm">
        <span className="font-medium">{listing.cookName}</span>
        <span className="text-[var(--muted)]">
          {" "}
          · {listing.servingsLeft} left · {formatPrice(listing.priceCents)}
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
        className="mt-5 inline-flex justify-center rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-[var(--paper)]"
      >
        View & order
      </Link>
    </article>
  );
}
