"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/practice", label: "Practice" },
  { href: "/demo", label: "Demo" },
  { href: "/tips", label: "Pro tips" },
] as const;

const SETTINGS_LINKS = [
  { href: "/investors", label: "Investors" },
  { href: "/metrics", label: "Metrics" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  function closeNav() {
    setOpen(false);
    setSettingsOpen(false);
  }

  useEffect(() => {
    if (!settingsOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSettingsOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (!settingsRef.current?.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [settingsOpen]);

  return (
    <nav className="nav" aria-label="Primary">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => {
          setOpen((v) => !v);
          setSettingsOpen(false);
        }}
      >
        {open ? "Close" : "Menu"}
      </button>
      <div id="primary-nav" className={open ? "nav-links open" : "nav-links"}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={closeNav}>
            {link.label}
          </Link>
        ))}
        <div className="settings-menu" ref={settingsRef}>
          <button
            type="button"
            className="settings-toggle"
            aria-expanded={settingsOpen}
            aria-controls="settings-nav"
            onClick={() => setSettingsOpen((v) => !v)}
          >
            Settings
            <span aria-hidden="true">{settingsOpen ? "▴" : "▾"}</span>
          </button>
          <div
            id="settings-nav"
            className={settingsOpen ? "settings-panel open" : "settings-panel"}
          >
            {SETTINGS_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeNav}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
