import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Investors" };

export default function InvestorsPage() {
  return (
    <article className="section prose-page" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <p className="eyebrow">One-pager · {SITE.name}</p>
      <h1>Role-specific interview practice for people already in a hiring process</h1>
      <p className="lede">{SITE.tagline}</p>
      <p>
        Most interview products coach a generic “interview.” {SITE.name} coaches
        the <em>job the candidate applied to</em> — 320 tracks, 25 interviewer
        prompts each, with a playbook and a debrief. Production app:{" "}
        <a className="text-link" href="https://kiaracaesar5627-project-4.vercel.app">
          kiaracaesar5627-project-4.vercel.app
        </a>
        .
      </p>
      <h2>Problem</h2>
      <p>
        US job openings were 6.5 million in December 2025 while 7.5 million
        people were unemployed and looking (BLS JOLTS / Indeed Hiring Lab).
        Applicants still prep on LeetCode-style puzzles or $200/hr coaches.
        Neither matches the actual conversation for FP&amp;A, CS, PM, or a
        consulting case.
      </p>
      <h2>Product</h2>
      <ul>
        <li>8,000 interviewer-phrased scenarios across 320 roles</li>
        <li>Guest practice in the browser; Ludwitt/Hult JWT launch for platform learners</li>
        <li>Evented learning API (own /v1 instance) for qualified-user metrics</li>
      </ul>
      <h2>Ask</h2>
      <p>
        Pre-seed conversation: $150k for 12 months of distribution (career
        centers + bootcamps) and a durable metrics store. No term sheet in this
        packet — this is a first meeting.
      </p>
      <p>
        <Link className="btn primary" href="/demo">
          Open product demo
        </Link>{" "}
        <Link className="btn" href="/investors/deck">
          Open pitch deck
        </Link>
      </p>
    </article>
  );
}
