"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-serif text-4xl">Something spilled.</h1>
      <p className="mt-3 text-[var(--muted)]">
        {error.message || "The kitchen hit an unexpected error."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
      >
        Try again
      </button>
    </div>
  );
}
