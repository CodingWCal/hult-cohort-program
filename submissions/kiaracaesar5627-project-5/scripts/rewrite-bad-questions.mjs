import { readFileSync, writeFileSync } from "node:fs";

const { JOB_TRACKS } = await import("../src/lib/lessons.ts");

/** Hand-mapped exact replacements for non-question interviewer lines. */
const MAP = new Map();

function set(from, to) {
  MAP.set(from, to);
}

for (const track of JOB_TRACKS) {
  for (const s of track.scenarios) {
    if (/\?\s*$/.test(s.interviewer)) continue;
    const t = s.interviewer.trim();

    let next;
    if (t.startsWith("Design ")) next = `How would you ${t.slice(0, 1).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`.replace("How would you d", "How would you D").replace("How would you Design", "How would you design");
    else if (t.startsWith("Write SQL")) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Explain how")) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Explain ")) next = `Can you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Estimate ")) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Define and assess")) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Define ")) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Describe ")) next = `Tell me about ${t.slice("Describe ".length).replace(/\.?\s*$/, "")}. What happened?`;
    else if (t.startsWith("Critique:")) next = `How would you improve this user story${t.slice("Critique".length).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Map ")) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Assess ")) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Propose ")) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Size ")) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Give a ")) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Walk me through")) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (t.startsWith("Tell me about")) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/Redesign it\.?$/i.test(t)) next = `${t.replace(/\s*Redesign it\.?$/i, "")} How would you redesign it?`;
    else if (/Diagnose\.?$/i.test(t)) next = `${t.replace(/\s*Diagnose\.?$/i, "")} How would you diagnose it?`;
    else if (/Structure your approach\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/justify\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/postmortem\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/your plan\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/your approach\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/public statement\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/feels it most\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/Talk complexity as you go\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/high QPS\.?$/i.test(t)) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (/live process\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/a client\.?$/i.test(t)) next = `Tell me about ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`.replace("Tell me about describe", "Tell me about");
    else if (/success metrics\.?$/i.test(t)) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (/finance systems\.?$/i.test(t)) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (/compliance incident\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/payments business\.?$/i.test(t)) next = `${t.replace(/\.?\s*$/, "")}?`;
    else if (/workflow product\.?$/i.test(t)) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (/is durable\.?$/i.test(t)) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (/our category\.?$/i.test(t)) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (/360 feed\.?$/i.test(t)) next = `How would you ${t.charAt(0).toLowerCase()}${t.slice(1).replace(/\.?\s*$/, "")}?`;
    else if (/Improve it\.?$/i.test(t)) next = `How would you improve this user story: ${t.replace(/^Critique:\s*/i, "").replace(/\s*Improve it\.?$/i, "")}?`;
    else next = `${t.replace(/[.!]\s*$/, "")}?`;

    // normalize "How would you Design" 
    next = next.replace(/^How would you Design/, "How would you design");
    next = next.replace(/^How would you Write/, "How would you write");
    next = next.replace(/^How would you Define/, "How would you define");
    next = next.replace(/^How would you Estimate/, "How would you estimate");
    next = next.replace(/^How would you Map/, "How would you map");
    next = next.replace(/^How would you Assess/, "How would you assess");
    next = next.replace(/^How would you Size/, "How would you size");
    next = next.replace(/^How would you Propose/, "How would you propose");
    next = next.replace(/Tell me about describe /i, "Tell me about ");
    next = next.replace(/\?\?+$/, "?");

    set(t, next);
  }
}

console.log("fixes", MAP.size);
for (const [k, v] of MAP) {
  console.log("FROM:", k);
  console.log("TO:  ", v);
  console.log("");
}

function patchFile(path) {
  let text = readFileSync(path, "utf8");
  let count = 0;
  for (const [from, to] of MAP) {
    const doubleFrom = `"${from}"`;
    const doubleTo = `"${to.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    const singleFrom = `'${from.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
    const singleTo = `'${to.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
    if (text.includes(doubleFrom)) {
      text = text.split(doubleFrom).join(doubleTo);
      count++;
    }
    if (text.includes(singleFrom)) {
      text = text.split(singleFrom).join(singleTo);
      count++;
    }
  }
  writeFileSync(path, text);
  return count;
}

for (const f of ["src/lib/lessons.ts", "src/lib/business-tracks.ts", "src/lib/track-extras.ts"]) {
  console.log("patched", f, patchFile(f));
}
