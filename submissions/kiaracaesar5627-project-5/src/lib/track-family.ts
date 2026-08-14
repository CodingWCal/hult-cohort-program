export type TrackFamily = "Product & tech" | "Go-to-market" | "Business & finance" | "People & ops";

const FAMILY_BY_SLUG: Record<string, TrackFamily> = {
  "software-engineer": "Product & tech",
  "product-manager": "Product & tech",
  "data-analyst": "Product & tech",
  "ux-designer": "Product & tech",
  "devops-sre": "Product & tech",
  marketing: "Go-to-market",
  "customer-success": "Go-to-market",
  "account-executive": "Go-to-market",
  "sales-manager": "Go-to-market",
  "business-development": "Go-to-market",
  "corporate-communications": "Go-to-market",
  "finance-fpa": "Business & finance",
  "management-consulting": "Business & finance",
  "investment-banking": "Business & finance",
  "business-analyst": "Business & finance",
  "project-manager": "Business & finance",
  "accounting-audit": "Business & finance",
  "supply-chain": "Business & finance",
  "corporate-strategy": "Business & finance",
  "risk-compliance": "Business & finance",
  "people-ops": "People & ops",
  operations: "People & ops",
  "hr-business-partner": "People & ops",
  "general-manager": "People & ops",
  entrepreneur: "People & ops",
};

export function trackFamily(slug: string): TrackFamily {
  return FAMILY_BY_SLUG[slug] ?? "Business & finance";
}
