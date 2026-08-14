import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Pitch deck" };

const SLIDES: { title: string; body: string[] }[] = [
  {
    title: "Title",
    body: [
      `${SITE.name} — practice the interview for the job you applied to.`,
      "Founder: GitHub @kiaracaesar5627 · Hult Cohort Summer Pilot 2026",
      "Live: https://kiaracaesar5627-project-4.vercel.app",
    ],
  },
  {
    title: "Problem",
    body: [
      "Interview prep is either generic (puzzle sites) or expensive (1:1 coaches).",
      "Hiring conversations are role-specific. A CS loop is not an FP&A loop.",
      "Candidates waste cycles on the wrong prompt set, then freeze in the real room.",
    ],
  },
  {
    title: "Why now",
    body: [
      "December 2025: 6.5M US job openings vs 7.5M unemployed looking (BLS JOLTS; Indeed Hiring Lab).",
      "More applicants per seat → interview performance is a sharper filter.",
      "Remote / structured interviews made “what will they actually ask?” searchable — and still poorly served.",
    ],
  },
  {
    title: "Solution",
    body: [
      "A practice room organized by job application, not by algorithm topic.",
      "25 tracks × 20 interviewer questions, each with scenario, playbook, debrief.",
      "Session events so practice is measurable (lesson_started / completed / quiz_submitted).",
    ],
  },
  {
    title: "Product",
    body: [
      "Public practice at /practice — guest cookie identity, no signup wall.",
      "Ludwitt/Hult JWT launch at /launch for platform-counted learners.",
      "Privacy notice at /privacy. Metrics at /metrics from the same-origin /v1 API.",
    ],
  },
  {
    title: "Market",
    body: [
      "TAM (broad): interview preparation tools ~$3.8B in 2025 (Dataintelo estimate — commercial report, not audited).",
      "SAM: mock interview services ~$0.74B in 2025 (Dataintelo).",
      "SOM year-1 planning: English-speaking applicants for the 25 shipped roles, acquired via career centers — see business plan, not a claimed revenue run-rate.",
    ],
  },
  {
    title: "Traction (honest)",
    body: [
      "Production app is live. Catalog is complete (500 questions).",
      "Qualified external users are whatever the dated /v1 metrics snapshot says — not a self-reported number.",
      "No revenue. No invented logos, customers, or waitlist counts.",
    ],
  },
  {
    title: "Business model",
    body: [
      "B2C: $12/month for saved tracks and progress (not billed yet).",
      "B2B: career-center / bootcamp seats at $8–15 per active learner / term (assumption).",
      "Platform: Ludwitt/Hult distribution for cohort and directory traffic.",
    ],
  },
  {
    title: "Go-to-market",
    body: [
      "Week 0–4: share the live room in job-seeker communities (no fake users).",
      "Month 2–6: career-center pilots (one campus at a time, contract before logo).",
      "Month 6–12: bootcamp partnerships for the business tracks already in the catalog.",
    ],
  },
  {
    title: "Competition",
    body: [
      "LeetCode / HackerRank: technical puzzles, not role interviews.",
      "Big Interview / Pramp: coaching or peer mock — broader, less job-track depth.",
      "HireVue et al.: employer-side assessment, not candidate practice.",
      "Wedge: interviewer-phrased prompts mapped 1:1 to the job being applied for.",
    ],
  },
  {
    title: "Team",
    body: [
      "Solo founder @kiaracaesar5627 — shipped PM, comms, and this learning app in the Hult pilot.",
      "No invented advisors. Hiring plan in the business plan (content + campus AE) is contingent on a round.",
    ],
  },
  {
    title: "The ask",
    body: [
      "Conversation, not a priced round: $150k pre-seed for 12 months of distribution and a durable event store.",
      "Use of funds (plan): 50% distribution, 30% product (persistence, accounts), 20% runway.",
      "Deck URL: /investors/deck — print to PDF from the browser.",
    ],
  },
];

export default function PitchDeckPage() {
  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <p className="eyebrow">Pitch deck · 12 slides · print to PDF</p>
      <h1>{SITE.name}</h1>
      {SLIDES.map((slide, i) => (
        <article key={slide.title} className="slide">
          <p className="meta">
            {i + 1} / {SLIDES.length}
          </p>
          <h2>{slide.title}</h2>
          <ul>
            {slide.body.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
