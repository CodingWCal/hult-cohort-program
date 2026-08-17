import { Suspense } from "react";
import type { Metadata } from "next";
import { DemoHub } from "@/components/DemoHub";

export const metadata: Metadata = { title: "Demo" };

export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
          <p className="eyebrow">Demo</p>
          <h1>Opening walkthrough…</h1>
        </section>
      }
    >
      <DemoHub />
    </Suspense>
  );
}
