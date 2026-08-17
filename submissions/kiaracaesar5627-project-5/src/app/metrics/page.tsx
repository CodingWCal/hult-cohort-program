import type { Metadata } from "next";
import { getMetrics, SEEDED_APP } from "@/lib/platform/store";
import { persistMode } from "@/lib/platform/persist";

export const metadata: Metadata = { title: "Metrics" };
export const dynamic = "force-dynamic";

export default function MetricsPage() {
  const metrics = getMetrics(SEEDED_APP.app_id);
  const mode = persistMode();
  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <p className="eyebrow">Pass-gate snapshot (this instance)</p>
      <h1>Learner metrics</h1>
      <p className="support">
        Source: <strong>own reference API</strong> at same-origin{" "}
        <code>/v1/apps/{SEEDED_APP.app_id}/metrics</code>. Counts exclude cohort
        handles and any user id containing <code>{SEEDED_APP.student_handle}</code>.
      </p>
      <dl className="metric-grid">
        <div>
          <dt>Qualified users</dt>
          <dd>{metrics.qualified_users}</dd>
        </div>
        <div>
          <dt>Unique users</dt>
          <dd>{metrics.unique_users}</dd>
        </div>
        <div>
          <dt>As of</dt>
          <dd>{metrics.as_of}</dd>
        </div>
        <div>
          <dt>Persist</dt>
          <dd>{mode}</dd>
        </div>
      </dl>
      <p className="meta">
        JSON: <a href="/api/metrics-public">/api/metrics-public</a>
      </p>
    </section>
  );
}
