import type { Metadata } from "next";
import Link from "next/link";
import { academyMeta } from "@/content/academy";

export const metadata: Metadata = {
  title: `Pricing · ${academyMeta.name}`,
  description: academyMeta.tagline,
};

export default function PricingPage() {
  return (
    <article className="module-page">
      <p className="kicker">{academyMeta.name}</p>
      <h1>Pricing</h1>
      <p className="muted" style={{ maxWidth: "40rem" }}>
        {academyMeta.tagline} First curriculum:{" "}
        <strong>{academyMeta.methodCourse}</strong>.
      </p>

      <div className="pricing-grid">
        <section className="panel pricing-card">
          <h2>Individual</h2>
          <p className="pricing-amount">{academyMeta.individualPrice}</p>
          <p className="muted">{academyMeta.individualNote}</p>
          <ul className="beats">
            <li>Full SCORE course (~60 min)</li>
            <li>Quizzes, baseline, and retest</li>
            <li>Personal progress on this device</li>
          </ul>
          <Link className="btn" href="/modules">
            Start learning
          </Link>
        </section>

        <section className="panel pricing-card">
          <h2>Team / business</h2>
          <p className="pricing-amount">{academyMeta.teamPrice}</p>
          <p className="muted">{academyMeta.teamNote}</p>
          <ul className="beats">
            <li>Same SCORE curriculum for managers</li>
            <li>Seat pack for department rollouts</li>
            <li>Request seats — we follow up manually in the pilot</li>
          </ul>
          <a
            className="btn btn-secondary"
            href={`mailto:${academyMeta.contactEmail}?subject=AI%20Prompting%20Academy%20—%20Team%20seats`}
          >
            Request team seats
          </a>
        </section>
      </div>

      <p className="faint" style={{ marginTop: "1.5rem" }}>
        Pilot pricing — hypotheses for the venture week. Checkout automation
        (Stripe) is on the roadmap; team requests are handled by email during
        the MVP.
      </p>
    </article>
  );
}
