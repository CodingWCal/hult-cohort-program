import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="section prose-page" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <p className="eyebrow">Legal</p>
      <h1>Privacy</h1>
      <p className="support">
        {SITE.name} is a mock-interview practice app operated by @{SITE.handle}
        for the Hult Cohort Summer Pilot. This page is the public privacy notice.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          A guest identifier in an httpOnly cookie (<code>pf_anon</code>) so
          repeat practice can be tied to one browser.
        </li>
        <li>
          A short-lived session cookie (<code>pf_session</code>) after Ludwitt
          launch or guest start.
        </li>
        <li>
          Learning events (<code>lesson_started</code>,{" "}
          <code>lesson_completed</code>, <code>quiz_submitted</code>, heartbeat)
          with a user id, session id, and scenario metadata. No payment data.
        </li>
        <li>
          Optional email only when you launch through Ludwitt/Hult (JWT{" "}
          <code>email</code> claim). Guest practice uses a non-personal placeholder.
        </li>
      </ul>
      <h2>What we do not collect</h2>
      <ul>
        <li>Passwords, payment cards, or government IDs.</li>
        <li>Microphone or camera — this product is text practice, not video interview.</li>
        <li>Third-party advertising cookies.</li>
      </ul>
      <h2>Why</h2>
      <p>
        Events exist so the hosted Ludwitt-compatible API can report unique and
        qualified learners. Cohort members and user ids containing the operator
        handle are dropped and never counted.
      </p>
      <h2>Retention</h2>
      <p>
        Events are stored in the application’s event log (JSON file locally;{" "}
        <code>/tmp</code> on the current Vercel instance). They are not sold.
        Guest cookies last up to one year; session cookies last up to seven days.
      </p>
      <h2>Contact</h2>
      <p>
        Questions: GitHub @{SITE.handle}. Do not send secrets or extra PII in
        issues.
      </p>
    </article>
  );
}
