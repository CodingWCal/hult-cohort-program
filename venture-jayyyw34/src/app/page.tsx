import Link from "next/link";
import { DishCard } from "@/components/DishCard";
import { getDb } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const listings = getDb().listings.slice(0, 6);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--sage)]">
            Trinidad & Tobago homemade marketplace
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-5xl leading-[1.05] md:text-6xl">
            Tonight’s pelau, from a kitchen on your street.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
            LocalPlate is for Trinidad and Tobago: doubles in St. James, roti in
            San Fernando, crab and dumpling in Scarborough. Home cooks post
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
              Join as cook or neighbor
            </Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
          <p className="text-sm text-[var(--muted)]">How it works</p>
          <ol className="mt-4 space-y-4 text-sm leading-relaxed">
            <li>
              <strong>1. Cooks list today.</strong> A dish, a price, a pickup
              window, how many servings.
            </li>
            <li>
              <strong>2. Neighbours reserve.</strong> Filter by town — Port of
              Spain to Crown Point — and place a simple order.
            </li>
            <li>
              <strong>3. Collect nearby.</strong> No driver network. Walk over
              or send a friend, take the plate home.
            </li>
          </ol>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl">Plates up now</h2>
          <Link href="/browse" className="text-sm text-[var(--clay)]">
            See all menus
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <DishCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
