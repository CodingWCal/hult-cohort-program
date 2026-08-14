/**
 * Date-stamp a metrics snapshot from this app's own Ludwitt-compatible API.
 *
 *   node scripts/snapshot-metrics.mjs
 *   node scripts/snapshot-metrics.mjs https://kiaracaesar5627-project-4.vercel.app
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = (process.argv[2] || process.env.SMOKE_BASE || "http://localhost:3000").replace(
  /\/$/,
  "",
);
const APP_ID = process.env.LUDWITT_APP_ID || "7f3e9c2a-4b1d-4e8f-9a6c-2d5e8f1a3b7c";
const DEV_KEY = process.env.LUDWITT_DEV_KEY || "prod_key_demo";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const publicRes = await fetch(`${BASE}/api/metrics-public`);
  const publicBody = await publicRes.json();

  const authRes = await fetch(`${BASE}/v1/apps/${APP_ID}/metrics`, {
    headers: { Authorization: `Bearer ${DEV_KEY}` },
  });
  const authBody = await authRes.json();

  const snapshot = {
    source: "own-reference-api",
    instance: BASE,
    app_id: APP_ID,
    fetched_at: new Date().toISOString(),
    public_status: publicRes.status,
    public: publicBody,
    authenticated_status: authRes.status,
    authenticated: authBody,
    note: "Cohort members and user ids containing kiaracaesar5627 are excluded in the store.",
  };

  const out = join(root, "docs", "metrics-snapshot.json");
  writeFileSync(out, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(JSON.stringify(snapshot, null, 2));
  console.log(`Wrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
