"use client";

import { useEffect, useRef } from "react";

/** Opens a counted guest session when the visitor did not launch via JWT. */
export function EnsurePracticeSession() {
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    void fetch("/api/session/guest", { method: "POST" });
  }, []);

  return null;
}
