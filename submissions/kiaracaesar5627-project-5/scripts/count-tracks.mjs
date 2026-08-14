import { readFileSync } from "node:fs";

const famSrc = readFileSync("src/lib/track-family.ts", "utf8");
const mapBlock = famSrc.slice(
  famSrc.indexOf("const FAMILY_BY_SLUG"),
  famSrc.indexOf("export function trackFamily"),
);
const familyLines = [...mapBlock.matchAll(/["']?([a-z0-9-]+)["']?:\s*"([^"]+)"/g)];
const by = {};
for (const m of familyLines) {
  by[m[2]] = (by[m[2]] || 0) + 1;
}
console.log("mapped_roles", familyLines.length);
console.log("families", Object.keys(by).length);
for (const [k, v] of Object.entries(by).sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`${k}: ${v}`);
}

const core = readFileSync("src/lib/lessons.ts", "utf8").match(/slug: "[^"]+"/g) || [];
const biz = readFileSync("src/lib/business-tracks.ts", "utf8").match(/slug: '[^']+'/g) || [];
const career = readFileSync("src/lib/career-major-tracks.ts", "utf8").match(/slug: '[^']+'/g) || [];
const trackSlugs = [...core, ...biz, ...career].filter((s) => !s.includes("/") && s.includes("slug:"));
// track-level slugs only appear as `slug: 'x'` at indent of track objects — count unique from JOB merge
console.log("core_slugs", new Set(core).size);
console.log("business_slugs", new Set(biz).size);
console.log("career_major_slugs", new Set(career.filter((s) => !s.includes("prioritize") && true)).size);

// Better: count track objects via role lines adjacent — use top-level export arrays
function trackCount(file) {
  const src = readFileSync(file, "utf8");
  return [...src.matchAll(/^\s{2}\{\s*$/gm)].length || [...src.matchAll(/slug: ['"][a-z0-9-]+['"],\n\s+role:/g)].length;
}
const cCore = [...readFileSync("src/lib/lessons.ts", "utf8").matchAll(/slug: "([a-z0-9-]+)",\n\s+role:/g)].map((m) => m[1]);
const cBiz = [...readFileSync("src/lib/business-tracks.ts", "utf8").matchAll(/slug: '([a-z0-9-]+)',\n\s+role:/g)].map((m) => m[1]);
const cCareer = [...readFileSync("src/lib/career-major-tracks.ts", "utf8").matchAll(/slug: '([a-z0-9-]+)',\n\s+role:/g)].map((m) => m[1]);
console.log("core", cCore.length, cCore.join(", "));
console.log("business", cBiz.length);
console.log("career_major", cCareer.length);
console.log("total_track_slugs", cCore.length + cBiz.length + cCareer.length);

const missing = [...cCore, ...cBiz, ...cCareer].filter((s) => !familyLines.some((m) => m[1] === s));
if (missing.length) console.log("UNMAPPED", missing.join(", "));
else console.log("UNMAPPED none");
