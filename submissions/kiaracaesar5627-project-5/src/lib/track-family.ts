import { TRACK_DEFS } from "./track-defs";

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

const FAMILY_BY_SLUG: Record<string, TrackFamily> = Object.fromEntries(
  TRACK_DEFS.map((d) => [d.slug, d.family]),
) as Record<string, TrackFamily>;

export function trackFamily(slug: string): TrackFamily {
  return FAMILY_BY_SLUG[slug] ?? "Business and Finance";
}
