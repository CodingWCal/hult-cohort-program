import Link from "next/link";
import { DishCard } from "@/components/DishCard";
import { todayISO, weekdayName } from "@/lib/format";
import { isOnNow } from "@/lib/place";
import { getDb } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const day = todayISO();
  const listings = getDb().listings;
  const onNow = listings.filter((listing) => isOnNow(listing)).slice(0, 3);
  const onNowIds = new Set(onNow.map((listing) => listing.id));
  const featured = listings.filter((listing) => !onNowIds.has(listing.id)).slice(0, 6);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--sage)]">
            Trinidad & Tobago · {weekdayName(day)}’s pot · {day}
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-5xl leading-[1.05] md:text-6xl">
            Tonight’s pelau, from a kitchen on your street.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
            LocalPlate is the wrap paper for homemade food: doubles in St. James,
            roti in San Fernando, crab and dumpling in Scarborough. Cooks post
            today’s pot. Neighbours reserve pickup — no delivery app in the
            middle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/browse"
              className="rounded-full bg-[var(--clay)] px-5 py-2.5 text-sm text-white"
            >
              Browse tonight’s menus
            </Link>
            <Link
              href="/join"
              className="rounded-full border border-[var(--ink)] px-5 py-2.5 text-sm"
            >
              Join as cook or neighbour
            </Link>
          </div>
        </div>
        <aside className="wrap-card rounded-3xl p-6">
          <p className="text-sm text-[var(--muted)]">How it works</p>
          <ol className="mt-4 space-y-4 text-sm leading-relaxed">
            <li>
              <strong>1. Cooks list today.</strong> A dish, pepper, a pickup
              window, how many servings.
            </li>
            <li>
              <strong>2. Neighbours reserve.</strong> Filter Trinidad or Tobago
              and place a simple order.
            </li>
            <li>
              <strong>3. Collect with a plate code.</strong> No driver network.
              Tell the cook your code and take the wrap home.
            </li>
          </ol>
        </aside>
      </section>

      {onNow.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <h2 className="font-serif text-3xl">On the fire now</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Pickup windows that are open in Trinidad & Tobago time.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {onNow.map((listing) => (
              <DishCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl">{weekdayName(day)}’s plates</h2>
          <Link href="/browse" className="text-sm text-[var(--clay)]">
            See all menus
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <DishCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
