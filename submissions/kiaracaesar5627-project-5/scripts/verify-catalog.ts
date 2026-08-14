/**
 * Verifies catalog invariants via TypeScript source (build-time also asserts).
 * Run: npx tsx scripts/verify-catalog.ts
 */
import { TRACK_DEFS } from "../src/lib/track-defs";
import { buildScenarios } from "../src/lib/build-scenarios";
import { TRACK_FAMILY_ORDER } from "../src/lib/track-family";

const byFamily = new Map<string, number>();
for (const fam of TRACK_FAMILY_ORDER) byFamily.set(fam, 0);

const slugs = new Set<string>();
for (const def of TRACK_DEFS) {
  if (slugs.has(def.slug)) throw new Error(`Duplicate slug ${def.slug}`);
  slugs.add(def.slug);
  byFamily.set(def.family, (byFamily.get(def.family) ?? 0) + 1);

  const scenarios = buildScenarios(def);
  if (scenarios.length !== 25) {
    throw new Error(`${def.slug} has ${scenarios.length} scenarios`);
  }
  for (const s of scenarios) {
    if (!s.interviewer.endsWith("?")) {
      throw new Error(`${def.slug}/${s.slug} interviewer missing ?`);
    }
  }
  const scenarioSlugs = new Set(scenarios.map((s) => s.slug));
  if (scenarioSlugs.size !== 25) {
    throw new Error(`${def.slug} has duplicate scenario slugs`);
  }
}

if (TRACK_DEFS.length !== 320) throw new Error(`Expected 320 defs, got ${TRACK_DEFS.length}`);

for (const fam of TRACK_FAMILY_ORDER) {
  const n = byFamily.get(fam) ?? 0;
  if (n !== 20) throw new Error(`${fam} has ${n} tracks, need 20`);
  console.log(`${fam}: ${n}`);
}

console.log("total_tracks", TRACK_DEFS.length);
console.log("questions_per_track", 25);
console.log("OK");
