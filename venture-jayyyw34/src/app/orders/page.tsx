"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readSession } from "@/lib/session";
import type { Account, Order } from "@/lib/types";

export default function OrdersPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const session = readSession();
    setAccount(session);
    void fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const all = (data.orders as Order[]) || [];
        setOrders(session ? all.filter((order) => order.buyerId === session.id) : []);
      });
  }, []);

  if (!account) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <h1 className="font-serif text-4xl">Your orders</h1>
        <p className="mt-3 text-[var(--muted)]">
          <Link href="/join" className="text-[var(--clay)]">
            Join
          </Link>{" "}
          to reserve plates and see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="font-serif text-4xl">Your orders</h1>
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl wrap-card p-5"
          >
            <h2 className="font-serif text-2xl">{order.listingTitle}</h2>
            <p className="mt-3 font-serif text-xl">
              {order.collectCode || "Plate reserved"}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {order.qty} serving(s) from {order.cookName} · {order.status} ·{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            {order.note ? <p className="mt-2 text-sm">Note: {order.note}</p> : null}
          </article>
        ))}
        {orders.length === 0 ? (
          <p className="text-[var(--muted)]">
            No reservations yet.{" "}
            <Link href="/browse" className="text-[var(--clay)]">
              Browse menus
            </Link>
            .
          </p>
        ) : null}
      </div>
    </div>
  );
}
