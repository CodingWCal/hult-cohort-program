"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/practice", label: "Practice" },
  { href: "/investors", label: "Investors" },
  { href: "/metrics", label: "Metrics" },
  { href: "/privacy", label: "Privacy" },
  { href: "/launch", label: "Launch" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Primary">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <div id="primary-nav" className={open ? "nav-links open" : "nav-links"}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
