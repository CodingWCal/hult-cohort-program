export function collectToken(orderId: string): string {
  const compact = orderId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return (compact.slice(-4) || "PLATE").padStart(4, "0");
}

export function collectCode(orderId: string, cookName: string): string {
  const first = cookName.trim().split(/\s+/)[0] || "the cook";
  return `Tell ${first}: plate ${collectToken(orderId)}`;
}
