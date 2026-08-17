import type { Account } from "./types";

export const SESSION_KEY = "localplate.session";

export function readSession(): Account | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Account;
  } catch {
    return null;
  }
}

export function writeSession(account: Account) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(account));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}
