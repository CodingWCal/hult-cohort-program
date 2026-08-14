import { readFileSync } from "node:fs";

const lessons = readFileSync("src/lib/lessons.ts", "utf8");
const business = readFileSync("src/lib/business-tracks.ts", "utf8");

function first10(src, tracks) {
  const out = {};
  for (const t of tracks) {
    const idx = src.indexOf(`slug: "${t}"`) >= 0 ? src.indexOf(`slug: "${t}"`) : src.indexOf(`slug: '${t}'`);
    if (idx < 0) {
      console.error("no track", t);
      continue;
    }
    const scenIdx = src.indexOf("scenarios:", idx);
    const endIdx = src.indexOf("],\n  },", scenIdx);
    const block = src.slice(scenIdx, endIdx);
    const slugs = [...block.matchAll(/q\(\s*['"]([^'"]+)['"]/g)].slice(0, 10).map((x) => x[1]);
    out[t] = slugs;
  }
  return out;
}

const core = [
  "data-analyst",
  "marketing",
  "customer-success",
  "ux-designer",
  "account-executive",
  "devops-sre",
  "people-ops",
  "operations",
];
const biz = [
  "finance-fpa",
  "management-consulting",
  "investment-banking",
  "business-analyst",
  "project-manager",
  "accounting-audit",
  "supply-chain",
  "corporate-strategy",
  "business-development",
  "risk-compliance",
  "corporate-communications",
  "hr-business-partner",
  "entrepreneur",
  "sales-manager",
  "general-manager",
];
console.log(JSON.stringify({ ...first10(lessons, core), ...first10(business, biz) }, null, 2));
