"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { writeSession } from "@/lib/session";
import { NEIGHBORHOODS, type Account, type Role } from "@/lib/types";

export default function JoinPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("neighbor");
  const [neighborhood, setNeighborhood] = useState<string>(NEIGHBORHOODS[0]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, role, neighborhood }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string; account?: Account };
    setPending(false);
    if (!data.ok || !data.account) {
      setError(data.error || "Could not join.");
      return;
    }
    writeSession(data.account);
    router.push(data.account.role === "cook" ? "/cook" : "/browse");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14">
      <h1 className="font-serif text-4xl">Join LocalPlate</h1>
      <p className="mt-3 text-[var(--muted)]">
        MVP accounts are just a name, email, role, and town — no password
        flow. Use a real email so reviewers can tell users apart.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
        <label className="block text-sm">
          Name
          <input
            required
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="block text-sm">
          Email
          <input
            required
            type="email"
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="block text-sm">
          I am a
          <select
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            <option value="neighbor">Neighbor (I want to order)</option>
            <option value="cook">Home cook / baker (I want to list)</option>
          </select>
        </label>
        <label className="block text-sm">
          Town / area
          <select
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={neighborhood}
            onChange={(event) => setNeighborhood(event.target.value)}
          >
            {NEIGHBORHOODS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          disabled={pending}
          className="w-full rounded-full bg-[var(--clay)] py-2.5 text-sm text-white disabled:opacity-60"
        >
          {pending ? "Joining…" : "Join and continue"}
        </button>
      </form>
    </div>
  );
}
