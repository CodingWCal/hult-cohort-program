"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { markTourSeen, tourWasSeen } from "@/lib/demo-tour";

export function FirstVisitTour() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!tourWasSeen());
  }, []);

  if (!show) return null;

  return (
    <aside className="tour-invite" aria-label="Product walkthrough">
      <div>
        <p className="meta">New here?</p>
        <p>Walk through the product in a few steps — catalog, live room, speak mode, and journal.</p>
      </div>
      <div className="tour-invite-actions">
        <Link href="/demo" className="btn primary compact">
          Take the tour
        </Link>
        <button
          type="button"
          className="btn compact"
          onClick={() => {
            markTourSeen();
            setShow(false);
          }}
        >
          Skip
        </button>
      </div>
    </aside>
  );
}
