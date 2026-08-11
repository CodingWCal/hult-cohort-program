import type { Metadata } from "next";
import { academyMeta } from "@/content/academy";

export const metadata: Metadata = {
  title: `Privacy · ${academyMeta.name}`,
  description: "Privacy practices for AI Prompting Academy.",
};

export default function PrivacyPage() {
  return (
    <article className="module-page">
      <p className="kicker">{academyMeta.name}</p>
      <h1>Privacy</h1>
      <p className="muted">Last updated: 10 August 2026</p>

      <div className="panel">
        <h2>What this MVP stores</h2>
        <ul className="beats">
          <li>
            Course progress and quiz answers may be stored in your browser
            (localStorage) on this device.
          </li>
          <li>
            If you launch via Ludwitt/Hult, session and learning events may be
            sent to the configured events API for cohort metrics.
          </li>
          <li>
            Team seat requests sent by email include whatever you put in that
            message.
          </li>
        </ul>
      </div>

      <div className="panel">
        <h2>What we do not do</h2>
        <ul className="beats">
          <li>We do not sell personal data.</li>
          <li>We do not require account creation for the basic course walk.</li>
          <li>
            Cohort program anti-gaming rules apply to metrics — do not inflate
            counts with fake users.
          </li>
        </ul>
      </div>

      <div className="panel">
        <h2>Contact</h2>
        <p className="muted">
          Questions about this MVP: use your cohort placement channel or the
          team seats email on the{" "}
          <a href="/pricing">pricing</a> page.
        </p>
      </div>
    </article>
  );
}
