import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/track-defs.ts", "utf8");
const families = [...src.matchAll(/family: '([^']+)'/g)].map((m) => m[1]);
const slugs = [...src.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1]);

const by = {};
for (const f of families) by[f] = (by[f] || 0) + 1;

console.log("total_tracks", slugs.length);
console.log("unique_slugs", new Set(slugs).size);
console.log("families", Object.keys(by).length);
for (const [k, v] of Object.entries(by).sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`${k}: ${v}`);
}

const bad = Object.entries(by).filter(([, v]) => v !== 20);
if (slugs.length !== 320 || new Set(slugs).size !== 320 || bad.length) {
  console.error("FAIL", { bad });
  process.exit(1);
}
console.log("OK 16×20=320");
