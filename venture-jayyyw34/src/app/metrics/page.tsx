"use client";

import { useEffect, useState } from "react";

type Metrics = {
  unique_users?: number;
  qualified_users?: number;
  orders?: number;
  as_of?: string;
  persist_mode?: string;
  excluded?: string;
};

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    void fetch("/api/metrics")
      .then((res) => res.json())
      .then(setMetrics);
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <h1 className="font-serif text-4xl">Platform snapshot</h1>
      <p className="mt-3 text-[var(--muted)]">
        Live counts from this deploy. Founder/handle ids containing jayyyw34 are
        excluded. This page does not invent users.
      </p>
      <pre className="mt-8 overflow-auto rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 text-sm">
        {JSON.stringify(metrics, null, 2)}
      </pre>
    </div>
  );
}
