import type { Metadata } from "next";
import Link from "next/link";
import { INTERVIEW_TIP_GROUPS } from "@/lib/interview-tips";

export const metadata: Metadata = { title: "Pro tips" };

export default function ProTipsPage() {
  return (
    <article className="section prose-page" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <p className="eyebrow">Interview day · not a flashcard dump</p>
      <h1>Pro tips for interviews</h1>
      <p className="support">
        How to sit in the room: structure, evidence, gray asks, and what to cut. Same advice the
        practice rooms use when you hit Review my answer — written here so you can read it before
        you speak.
      </p>
      <p className="cta-row" style={{ marginBottom: "2rem" }}>
        <Link href="/practice" className="btn primary">
          Open a room and try them
        </Link>
      </p>
      <ol className="tip-groups">
        {INTERVIEW_TIP_GROUPS.map((group, i) => (
          <li key={group.id} className="tip-card">
            <p className="meta">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2>{group.title}</h2>
            <p className="tip-lead">{group.lead}</p>
            <ul>
              {group.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </article>
  );
}
