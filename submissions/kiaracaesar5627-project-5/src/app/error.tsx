"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section" style={{ borderTop: "none", paddingTop: "2rem" }}>
      <h1>Something broke in the room</h1>
      <p className="support">
        The practice surface hit an unexpected error. Your progress cookie is
        still here — try again.
      </p>
      {error.digest ? (
        <p className="meta">Reference {error.digest}</p>
      ) : null}
      <button type="button" className="btn primary" onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
}
