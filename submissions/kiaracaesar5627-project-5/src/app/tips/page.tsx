import type { Metadata } from "next";
import Link from "next/link";
import { INTERVIEW_TIP_GROUPS } from "@/lib/interview-tips";

export const metadata: Metadata = { title: "Pro tips" };

export default function ProTipsPage() {
  return (
    <article className="section prose-page" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <p className="eyebrow">Simple advice for interview day</p>
      <h1>Pro tips for interviews</h1>
      <p className="support">
        How to start, tell a clear story, use one real example, and handle a hard question. This is
        the same kind of advice you get when you tap Review my answer in a practice room — written
        here so you can read it before you speak.
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
