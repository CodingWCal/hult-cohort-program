import type { Metadata } from "next";
import Link from "next/link";
import { SITE, siteUrl } from "@/lib/site";
import { EnsurePracticeSession } from "@/components/EnsurePracticeSession";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE.name} · Mock interviews`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=figtree:400,500,600,700|fraunces:600,650,700|ibm-plex-mono:400,500"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="shell">
          <header className="site-header">
            <Link href="/" className="brand">
              {SITE.name}
            </Link>
            <nav className="nav" aria-label="Primary">
              <Link href="/practice">Practice</Link>
              <Link href="/investors">Investors</Link>
              <Link href="/metrics">Metrics</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/launch">Launch</Link>
            </nav>
          </header>
          <main>
            <EnsurePracticeSession />
            {children}
          </main>
          <footer className="site-footer">
            {SITE.name} · mock interview practice · @{SITE.handle} ·{" "}
            <Link href="/privacy">Privacy</Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
