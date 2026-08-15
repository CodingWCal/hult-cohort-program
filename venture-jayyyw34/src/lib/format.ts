export function formatPrice(cents: number): string {
  if (!Number.isFinite(cents) || cents < 0) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function id(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
