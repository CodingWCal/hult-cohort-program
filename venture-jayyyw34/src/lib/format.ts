export function formatPrice(cents: number): string {
  if (!Number.isFinite(cents) || cents < 0) return "TT$0.00";
  return `TT$${(cents / 100).toFixed(2)}`;
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
