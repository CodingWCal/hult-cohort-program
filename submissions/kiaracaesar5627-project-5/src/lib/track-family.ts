/** Career majors used as Practice filters (CTE-style fields). */
export type TrackFamily =
  | "Healthcare and Medicine"
  | "Information Technology"
  | "Business and Finance"
  | "Education and Training"
  | "Engineering and Architecture"
  | "Construction and Trades"
  | "Arts and Communication"
  | "Hospitality and Tourism"
  | "Agriculture and Natural Resources"
  | "Law and Public Safety"
  | "Science and Research"
  | "Manufacturing and Production"
  | "Transportation and Logistics"
  | "Sales and Marketing"
  | "Government and Public Admin"
  | "Human Services";

/** Short labels for filter chips (full name remains TrackFamily). */
export const TRACK_FAMILY_ORDER: TrackFamily[] = [
  "Healthcare and Medicine",
  "Information Technology",
  "Business and Finance",
  "Education and Training",
  "Engineering and Architecture",
  "Construction and Trades",
  "Arts and Communication",
  "Hospitality and Tourism",
  "Agriculture and Natural Resources",
  "Law and Public Safety",
  "Science and Research",
  "Manufacturing and Production",
  "Transportation and Logistics",
  "Sales and Marketing",
  "Government and Public Admin",
  "Human Services",
];

export const TRACK_FAMILY_SHORT: Record<TrackFamily, string> = {
  "Healthcare and Medicine": "Healthcare",
  "Information Technology": "IT",
  "Business and Finance": "Business",
  "Education and Training": "Education",
  "Engineering and Architecture": "Engineering",
  "Construction and Trades": "Construction",
  "Arts and Communication": "Arts & Media",
  "Hospitality and Tourism": "Hospitality",
  "Agriculture and Natural Resources": "Agriculture",
  "Law and Public Safety": "Law & Safety",
  "Science and Research": "Science",
  "Manufacturing and Production": "Manufacturing",
  "Transportation and Logistics": "Transportation",
  "Sales and Marketing": "Sales",
  "Government and Public Admin": "Government",
  "Human Services": "Human Services",
};

const FAMILY_BY_SLUG: Record<string, TrackFamily> = {
  // Healthcare and Medicine
  "registered-nurse": "Healthcare and Medicine",
  pharmacist: "Healthcare and Medicine",

  // Information Technology
  "software-engineer": "Information Technology",
  "product-manager": "Information Technology",
  "data-analyst": "Information Technology",
  "devops-sre": "Information Technology",

  // Business and Finance
  "finance-fpa": "Business and Finance",
  "management-consulting": "Business and Finance",
  "investment-banking": "Business and Finance",
  "business-analyst": "Business and Finance",
  "project-manager": "Business and Finance",
  "accounting-audit": "Business and Finance",
  "corporate-strategy": "Business and Finance",
  "risk-compliance": "Business and Finance",
  "general-manager": "Business and Finance",
  entrepreneur: "Business and Finance",
  operations: "Business and Finance",

  // Education and Training
  "high-school-teacher": "Education and Training",
  "instructional-designer": "Education and Training",

  // Engineering and Architecture
  "civil-engineer": "Engineering and Architecture",
  "mechanical-engineer": "Engineering and Architecture",

  // Construction and Trades
  electrician: "Construction and Trades",
  "construction-superintendent": "Construction and Trades",

  // Arts and Communication
  "ux-designer": "Arts and Communication",
  "graphic-designer": "Arts and Communication",
  "corporate-communications": "Arts and Communication",
  "content-producer": "Arts and Communication",

  // Hospitality and Tourism
  "hotel-operations-manager": "Hospitality and Tourism",
  "restaurant-manager": "Hospitality and Tourism",

  // Agriculture and Natural Resources
  agronomist: "Agriculture and Natural Resources",
  "environmental-specialist": "Agriculture and Natural Resources",

  // Law and Public Safety
  attorney: "Law and Public Safety",
  "police-officer": "Law and Public Safety",

  // Science and Research
  "research-scientist": "Science and Research",
  "clinical-lab-scientist": "Science and Research",

  // Manufacturing and Production
  "production-supervisor": "Manufacturing and Production",
  "quality-engineer": "Manufacturing and Production",

  // Transportation and Logistics
  "supply-chain": "Transportation and Logistics",
  "logistics-coordinator": "Transportation and Logistics",

  // Sales and Marketing
  marketing: "Sales and Marketing",
  "customer-success": "Sales and Marketing",
  "account-executive": "Sales and Marketing",
  "sales-manager": "Sales and Marketing",
  "business-development": "Sales and Marketing",

  // Government and Public Admin
  "policy-analyst": "Government and Public Admin",
  "city-administrator": "Government and Public Admin",

  // Human Services
  "social-worker": "Human Services",
  "people-ops": "Human Services",
  "hr-business-partner": "Human Services",
  "career-counselor": "Human Services",
};

export function trackFamily(slug: string): TrackFamily {
  return FAMILY_BY_SLUG[slug] ?? "Business and Finance";
}
