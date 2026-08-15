"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearSession, readSession } from "@/lib/session";
import type { Account } from "@/lib/types";

export function SiteHeader() {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    setAccount(readSession());
  }, []);

  return (
    <header className="bg-[var(--paper)]/90 backdrop-blur">
      <div className="flag-rule" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="leading-tight">
          <span className="block font-serif text-2xl tracking-tight text-[var(--ink)]">
            LocalPlate
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--clay)]">
            Today’s Pot
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/browse" className="hover:text-[var(--clay)]">
            Tonight’s menus
          </Link>
          <Link href="/cook" className="hover:text-[var(--clay)]">
            List a dish
          </Link>
          <Link href="/orders" className="hover:text-[var(--clay)]">
            Orders
          </Link>
          <Link href="/investors" className="hover:text-[var(--clay)]">
            Investors
          </Link>
          {account ? (
            <button
              type="button"
              className="rounded-full border border-[var(--line)] px-3 py-1 text-[var(--muted)]"
              onClick={() => {
                clearSession();
                setAccount(null);
              }}
            >
              {account.name.split(" ")[0]} · leave
            </button>
          ) : (
            <Link
              href="/join"
              className="rounded-full bg-[var(--clay)] px-3 py-1.5 text-white"
            >
              Join
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
