/**
 * Rewrites interviewer prompts that are not phrased as interview questions.
 * Patches src/lib/lessons.ts and src/lib/business-tracks.ts by exact string replace.
 */
import { readFileSync, writeFileSync } from "node:fs";

/** old interviewer → new interview question */
const FIXES = [
  [
    "Design notifications for email, push, and in-app at 5M MAU. Start from requirements; I’ll push on fan-out and failure modes.",
    "How would you design notifications across email, push, and in-app at about 5M MAU, and where would fan-out or failure modes get hard?",
  ],
  [
    "Given an array of integers and a target, return whether any two numbers sum to the target. Talk complexity as you go.",
    "Given an array of integers and a target, how would you determine whether any two numbers sum to the target, and what is the time and space complexity?",
  ],
  [
    "Design a URL shortener like bit.ly. Cover create, redirect, and scale to high QPS.",
    "How would you design a URL shortener like bit.ly, covering create, redirect, and scale to high QPS?",
  ],
  [
    "Write SQL (or describe it) for signup → verify email → first action conversion by week.",
    "How would you write SQL (or describe the query) for signup to verify-email to first-action conversion by week?",
  ],
  [
    "Explain how you’d measure Day-1 / Day-7 / Day-30 retention and what would worry you in the chart.",
    "How would you measure Day-1, Day-7, and Day-30 retention, and what patterns in the chart would worry you?",
  ],
  [
    "We’re launching in two cities. Pick one primary paid channel and justify.",
    "We’re launching in two cities—which primary paid channel would you pick, and how would you justify it?",
  ],
  [
    "Your last campaign missed CPA by 30%. Walk me through the postmortem.",
    "Your last campaign missed CPA by 30%—walk me through how you would run the postmortem?",
  ],
  [
    "Describe a long deal you advanced without forcing a premature close.",
    "Tell me about a long deal you advanced without forcing a premature close. What did you do?",
  ],
  [
    "New hires say week one is chaotic. Redesign it.",
    "New hires say week one is chaotic—how would you redesign onboarding?",
  ],
  [
    "Define and assess unit economics for our subscription product.",
    "How would you define and assess unit economics for our subscription product?",
  ],
  [
    "Cash runway dropped from 18 to 11 months. Walk me through your plan.",
    "Cash runway dropped from 18 to 11 months—walk me through your plan?",
  ],
  [
    "A PE-backed retailer wants to enter Country X. Should they? Structure your approach.",
    "A PE-backed retailer wants to enter Country X—should they? How would you structure your approach?",
  ],
  [
    "Client profits fell 20% YoY. Diagnose.",
    "Client profits fell 20% YoY—how would you diagnose the drop?",
  ],
  [
    "Estimate annual electric scooter market in a mid-size US city.",
    "How would you estimate the annual electric scooter market in a mid-size US city?",
  ],
  [
    "Give a 60-second recommendation as if to the CEO.",
    "Give me a 60-second recommendation as if you were speaking to the CEO—what do you recommend and why?",
  ],
  [
    "Walk me through how the three financial statements link.",
    "Walk me through how the three financial statements link?",
  ],
  [
    "Tell me about managing competing deadlines on a live process.",
    "Tell me about managing competing deadlines on a live deal process. What did you prioritize?",
  ],
  [
    "Describe catching a material error before it reached a client.",
    "Tell me about a time you caught a material error before it reached a client. What happened?",
  ],
  [
    "Critique: As a user I want a dashboard so that I can see stuff. Improve it.",
    "How would you improve this user story: “As a user I want a dashboard so that I can see stuff”?",
  ],
  [
    "Define requirements for a customer 360 feed.",
    "How would you define requirements for a customer 360 data feed?",
  ],
  [
    "Bank recon will not tie by $47k. Walk me through your approach.",
    "Bank recon will not tie by $47k—walk me through your approach?",
  ],
  [
    "Design a control for user access reviews in finance systems.",
    "How would you design a control for user access reviews in finance systems?",
  ],
  [
    "Size the opportunity for a new B2B workflow product.",
    "How would you size the opportunity for a new B2B workflow product?",
  ],
  [
    "Assess whether our advantage is durable.",
    "How would you assess whether our competitive advantage is durable?",
  ],
  [
    "Design a 60-day partnership pilot with clear success metrics.",
    "How would you design a 60-day partnership pilot with clear success metrics?",
  ],
  [
    "Map who we should partner with in our category.",
    "How would you map who we should partner with in our category?",
  ],
  [
    "Walk me through handling a compliance incident.",
    "Walk me through how you would handle a compliance incident?",
  ],
  [
    "Propose 5 key risk indicators for a payments business.",
    "What five key risk indicators would you propose for a payments business, and why those?",
  ],
  [
    "A product outage hits enterprise customers. Outline the first public statement.",
    "A product outage hits enterprise customers—what would your first public statement include?",
  ],
  [
    "Explain the problem in plain language and who feels it most.",
    "Can you explain the problem you solve in plain language, and who feels it most?",
  ],
];

// Remaining from the 34 — fetch any still missing after first pass via optional extras
const MORE = [
  [
    "Show traction honestly—what is real vs still unproven?",
    "What traction do you have, and what is still unproven?",
  ],
  [
    "What traction do you have, and what is still unproven?",
    "What traction do you have, and what is still unproven?",
  ],
];

const files = ["src/lib/lessons.ts", "src/lib/business-tracks.ts", "src/lib/track-extras.ts"];
let total = 0;
for (const file of files) {
  let text = readFileSync(file, "utf8");
  let n = 0;
  for (const [from, to] of [...FIXES, ...MORE]) {
    if (!from || from === to) continue;
    const before = text;
    // Replace both single and double quoted forms
    text = text.split(`'${from.replace(/'/g, "\\'")}'`).join(`'${to.replace(/'/g, "\\'")}'`);
    text = text.split(`"${from}"`).join(`"${to}"`);
    if (text !== before) n++;
  }
  if (n) {
    writeFileSync(file, text);
    console.log(file, "patched", n);
    total += n;
  } else {
    console.log(file, "no patches");
  }
}
console.log("done", total);
