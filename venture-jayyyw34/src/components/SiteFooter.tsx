import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-[var(--muted)]">
        <p>LocalPlate · neighborhood plates, not delivery apps.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-[var(--ink)]">
            Privacy
          </Link>
          <Link href="/metrics" className="hover:text-[var(--ink)]">
            Metrics
          </Link>
          <Link href="/investors/deck" className="hover:text-[var(--ink)]">
            Deck
          </Link>
        </div>
      </div>
    </footer>
  );
}
