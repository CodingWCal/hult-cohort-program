"use client";

import { useEffect } from "react";

export function ErrorReporter() {
  useEffect(() => {
    const send = (message: string, source: string) => {
      void fetch("/api/errors", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, source }),
      });
    };
    const onError = (event: ErrorEvent) => {
      send(event.message || "window error", event.filename || "window");
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      send(String(event.reason ?? "unhandled rejection"), "promise");
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
