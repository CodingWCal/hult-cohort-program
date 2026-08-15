import Link from "next/link";

export default function InvestorsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--sage)]">One-pager</p>
      <h1 className="mt-2 font-serif text-5xl">LocalPlate</h1>
      <p className="mt-4 text-xl text-[var(--muted)]">
        A Trinidad & Tobago wrap-paper marketplace — doubles, roti, pelau, crab
        and dumpling. Cooks list today’s pot; neighbours reserve pickup by island
        and town.
      </p>
      <dl className="mt-8 grid gap-5 text-sm md:grid-cols-2">
        <div>
          <dt className="text-[var(--muted)]">Problem</dt>
          <dd className="mt-1">
            Home cooks already sell through WhatsApp status and Instagram DMs.
            Neighbours want real Trini and Tobago food, not another delivery fee.
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Wedge</dt>
          <dd className="mt-1">
            Daily menus + Trinidad | Tobago pickup. Not a ghost-kitchen OS and not
            a 30% delivery take-rate. WhatsApp remains the share button.
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Model</dt>
          <dd className="mt-1">
            12–15% platform fee on reserved plates. Optional featured placement
            for cooks. No driver payroll.
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Ask</dt>
          <dd className="mt-1">
            Angel conversation for a Trinidad & Tobago pilot, food-safety
            counsel, and cook onboarding — not a priced round in this package.
          </dd>
        </div>
      </dl>
      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/investors/deck" className="text-[var(--clay)]">
          Open pitch deck
        </Link>
        <Link href="/browse" className="text-[var(--clay)]">
          Use the product
        </Link>
      </div>
    </div>
  );
}
