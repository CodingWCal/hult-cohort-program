import { q, d, type InterviewScenario } from "./track-model";
import type { TrackDef } from "./track-defs";

type Template = {
  id: string;
  stage: string;
  title: (def: TrackDef) => string;
  minutes: number;
  summary: string;
  scenario: (def: TrackDef) => string;
  interviewer: (def: TrackDef) => string;
  playbook: (def: TrackDef) => string[];
  debrief: (def: TrackDef) => ReturnType<typeof d>;
};

function t(def: TrackDef, i: number): string {
  return def.themes[i % def.themes.length];
}

/** 30 role-aware templates; last five are cutting-edge interview edges. */
const TEMPLATES: Template[] = [
  {
    id: "q01-core-challenge",
    stage: "Technical",
    title: (def) => `Core ${t(def, 0)} judgment`,
    minutes: 18,
    summary: "Domain depth on a realistic constraint.",
    scenario: (def) =>
      `${def.role} screen at a ${def.setting}. They probe ${t(def, 0)} under real constraints.`,
    interviewer: (def) =>
      `Walk me through how you approach ${t(def, 0)} in a ${def.setting}—what do you check first, and what tradeoff do you refuse to ignore?`,
    playbook: (def) => [
      `Clarify the goal and constraints for ${t(def, 0)}.`,
      `Name the first diagnostic or fact you gather.`,
      `State one tradeoff you would surface early.`,
      `Describe how you verify the outcome.`,
      `Ask what “good” looks like in this ${def.setting}.`,
    ],
    debrief: (def) =>
      d(
        "Strong answers usually lead with:",
        [
          "Vague enthusiasm with no method",
          `A clear first check plus an explicit ${t(def, 0)} tradeoff`,
          "Blaming another team immediately",
          "Skipping verification entirely",
        ],
        1,
        "Method + tradeoff beats buzzwords.",
      ),
  },
  {
    id: "q02-case-pressure",
    stage: "Case",
    title: (def) => `${t(def, 1)} under time pressure`,
    minutes: 20,
    summary: "Structured thinking when the clock is real.",
    scenario: (def) =>
      `Case-style prompt for ${def.role}. Incomplete data; ${t(def, 1)} is the hinge.`,
    interviewer: (def) =>
      `You have twenty minutes and incomplete information about ${t(def, 1)}. How would you structure your approach and decide what to escalate?`,
    playbook: (def) => [
      "Restate the problem and success criteria.",
      `Prioritize the unknowns that block ${t(def, 1)}.`,
      "Propose a first action you can take now.",
      "Name what you would escalate and to whom.",
      "Leave a crisp recommendation, not a novel.",
    ],
    debrief: () =>
      d(
        "Interviewers want to see:",
        [
          "Endless brainstorming with no priority",
          "A structured plan with explicit escalation",
          "Ignoring missing data",
          "A perfect answer with zero assumptions stated",
        ],
        1,
        "Structure + escalation signals judgment.",
      ),
  },
  {
    id: "q03-quality-bar",
    stage: "Technical",
    title: (def) => `Raising the ${t(def, 2)} bar`,
    minutes: 15,
    summary: "Standards without perfectionism theater.",
    scenario: (def) =>
      `${def.role} conversation about quality. ${t(def, 2)} is slipping; leadership wants speed.`,
    interviewer: (def) =>
      `Quality around ${t(def, 2)} is slipping while leadership pushes speed. As a ${def.role}, what do you protect first and how do you negotiate the rest?`,
    playbook: (def) => [
      `Define the non-negotiable ${t(def, 2)} standard.`,
      "Separate must-fix vs can-defer items.",
      "Propose a timeboxed mitigation.",
      "Communicate risk in business or safety language.",
      "Agree on a check-back metric.",
    ],
    debrief: () =>
      d(
        "A credible response includes:",
        [
          "Agreeing to everything to seem flexible",
          "A non-negotiable standard plus a negotiated deferral",
          "Silent resentment",
          "Quitting the thread",
        ],
        1,
        "Protect the floor; negotiate the ceiling.",
      ),
  },
  {
    id: "q04-tools-judgment",
    stage: "Technical",
    title: (def) => `Choosing approach for ${t(def, 3)}`,
    minutes: 16,
    summary: "Tool/method choice with rationale.",
    scenario: (def) =>
      `${def.setting}. Multiple approaches for ${t(def, 3)}; they want your decision framework.`,
    interviewer: (def) =>
      `How do you decide which approach to use for ${t(def, 3)} as a ${def.role}, and how would you explain that choice to a skeptical stakeholder?`,
    playbook: (def) => [
      "List criteria: risk, cost, time, reversibility.",
      `Map options against ${t(def, 3)} needs.`,
      "Pick one and name what you are optimizing for.",
      "State the kill criteria if it fails.",
      "Invite the stakeholder’s constraint you missed.",
    ],
    debrief: () =>
      d(
        "Best answers sound like:",
        [
          "Whatever is trendy",
          "Criteria-first choice with kill criteria",
          "Whatever the boss already likes only",
          "No recommendation at all",
        ],
        1,
        "Decision criteria > brand-name tools.",
      ),
  },
  {
    id: "q05-edge-case",
    stage: "Technical",
    title: (def) => `Edge case in ${t(def, 4)}`,
    minutes: 14,
    summary: "Anticipating failure modes.",
    scenario: (def) =>
      `${def.role} deep dive. They want edge cases around ${t(def, 4)}.`,
    interviewer: (def) =>
      `What edge cases or failure modes worry you most with ${t(def, 4)} in a ${def.setting}, and how do you detect them early?`,
    playbook: (def) => [
      `Name two realistic ${t(def, 4)} failure modes.`,
      "Say how you would detect each early.",
      "Describe the containment step.",
      "Mention documentation or handoff.",
      "Ask how the team currently monitors this.",
    ],
    debrief: () =>
      d(
        "Strong edge-case answers:",
        [
          "Claim nothing ever fails",
          "Specific failures + early detection",
          "Only theoretical physics with no action",
          "Blame users exclusively",
        ],
        1,
        "Detection and containment show maturity.",
      ),
  },
  {
    id: "q06-process-design",
    stage: "Case",
    title: () => "Design a lightweight process",
    minutes: 18,
    summary: "Process that people will actually use.",
    scenario: (def) =>
      `${def.setting} needs a better process for ${t(def, 0)} without bureaucracy.`,
    interviewer: (def) =>
      `Design a lightweight process for ${t(def, 0)} that a busy ${def.role} peer would actually follow—what are the steps and the feedback loop?`,
    playbook: (def) => [
      "Define the trigger and owner.",
      `Keep steps few; center on ${t(def, 0)}.`,
      "Add a check that proves it worked.",
      "Plan how you train and revise it.",
      "Kill steps that don’t reduce risk.",
    ],
    debrief: () =>
      d(
        "Good process design is:",
        [
          "A 40-page policy nobody reads",
          "Few steps, clear owner, real feedback loop",
          "No owners and no checks",
          "Copied from another industry blindly",
        ],
        1,
        "Adoption is part of the design.",
      ),
  },
  {
    id: "q07-metrics",
    stage: "Technical",
    title: (def) => `Measuring ${t(def, 1)}`,
    minutes: 12,
    summary: "Metrics that drive behavior.",
    scenario: (def) =>
      `Leadership asks the ${def.role} how they know ${t(def, 1)} is healthy.`,
    interviewer: (def) =>
      `Which metrics would you track to know ${t(def, 1)} is healthy in this ${def.setting}, and which vanity metric would you ignore?`,
    playbook: (def) => [
      `Pick 2–3 leading indicators for ${t(def, 1)}.`,
      "Name one lagging outcome metric.",
      "Call out a vanity metric you’d ignore.",
      "Explain review cadence.",
      "Tie a metric to a decision you’d make.",
    ],
    debrief: () =>
      d(
        "Interviewers prefer:",
        [
          "Only vanity dashboards",
          "A few decision-linked metrics plus one ignored vanity number",
          "No numbers at all",
          "Tracking everything forever",
        ],
        1,
        "Metrics must change decisions.",
      ),
  },
  {
    id: "q08-handoff",
    stage: "Technical",
    title: () => "Reliable handoff",
    minutes: 12,
    summary: "Continuity across people and shifts.",
    scenario: (def) =>
      `${def.role} handoff moment. ${t(def, 2)} context must not get lost.`,
    interviewer: (def) =>
      `How do you hand off work involving ${t(def, 2)} so the next person can act safely without you in the room?`,
    playbook: (def) => [
      "State status, risks, and next action.",
      `Include the critical ${t(def, 2)} context.`,
      "Confirm understanding (read-back if needed).",
      "Leave pointers to sources of truth.",
      "Set when you’ll check back if relevant.",
    ],
    debrief: () =>
      d(
        "A solid handoff includes:",
        [
          "“It’s all in the system” with no status",
          "Status, risk, next action, and confirmation",
          "Only gossip about people",
          "No next action",
        ],
        1,
        "Actionable continuity prevents surprises.",
      ),
  },
  {
    id: "q09-missed-commitment",
    stage: "Behavioral",
    title: () => "You missed a commitment",
    minutes: 12,
    summary: "Ownership and recovery.",
    scenario: (def) =>
      `Behavioral screen for ${def.role}. They want ownership, not perfection.`,
    interviewer: (def) =>
      `Tell me about a time you missed a commitment related to ${t(def, 0)} as a ${def.role}. What did you do in the first forty-eight hours after you knew?`,
    playbook: (def) => [
      "Situation: what was promised and to whom.",
      "Own the miss early—no blame headline.",
      `Action: recovery plan tied to ${t(def, 0)}.`,
      "Result: what landed and what changed.",
      "One signal you’d watch earlier next time.",
    ],
    debrief: () =>
      d(
        "Interviewers most want:",
        [
          "That it was entirely someone else’s fault",
          "Early ownership plus a concrete recovery plan",
          "That commitments don’t matter",
          "A tool dump with no story",
        ],
        1,
        "Ownership + recovery beats a perfect history.",
      ),
  },
  {
    id: "q10-conflict",
    stage: "Behavioral",
    title: () => "Disagreement with a peer",
    minutes: 12,
    summary: "Conflict without drama.",
    scenario: (def) =>
      `${def.setting}. Disagreement about ${t(def, 1)}; they watch for respect and clarity.`,
    interviewer: (def) =>
      `Describe a time you disagreed with a peer about ${t(def, 1)}. How did you handle it, and what was the outcome?`,
    playbook: () => [
      "Name the shared goal first.",
      "State your view with evidence, not heat.",
      "Invite theirs; look for the real constraint.",
      "Agree on a decision owner or experiment.",
      "Follow through without scorekeeping.",
    ],
    debrief: () =>
      d(
        "Strong conflict stories show:",
        [
          "Winning the argument at any cost",
          "Shared goal, evidence, and a decision path",
          "Avoiding the issue forever",
          "CC’ing leadership as the first move",
        ],
        1,
        "Respect + decision path > theatrics.",
      ),
  },
  {
    id: "q11-ambiguity",
    stage: "Behavioral",
    title: () => "Ambiguous assignment",
    minutes: 12,
    summary: "Moving forward without a perfect brief.",
    scenario: (def) =>
      `${def.role} behavioral. Ambiguous ask involving ${t(def, 2)}.`,
    interviewer: (def) =>
      `Tell me about a time you received an ambiguous assignment involving ${t(def, 2)}. How did you create clarity and still deliver?`,
    playbook: (def) => [
      "Restate the goal in your words.",
      "List assumptions and validate the top ones.",
      `Define a first milestone tied to ${t(def, 2)}.`,
      "Communicate progress and open questions.",
      "Deliver a usable slice, then iterate.",
    ],
    debrief: () =>
      d(
        "Best ambiguity stories include:",
        [
          "Waiting forever for a perfect brief",
          "Assumptions validated plus a first milestone",
          "Silent freelancing with no updates",
          "Only complaining about leadership",
        ],
        1,
        "Clarity is something you create.",
      ),
  },
  {
    id: "q12-feedback",
    stage: "Behavioral",
    title: () => "Hard feedback you used",
    minutes: 10,
    summary: "Coachability under real critique.",
    scenario: (def) =>
      `${def.role} screen. Feedback about ${t(def, 3)} landed hard.`,
    interviewer: (def) =>
      `Tell me about hard feedback you received about ${t(def, 3)}. What changed in your practice afterward?`,
    playbook: () => [
      "Quote the feedback without spinning it.",
      "What you tried differently within two weeks.",
      "Evidence it improved (even small).",
      "What you still work on.",
      "Avoid attacking the messenger.",
    ],
    debrief: () =>
      d(
        "Coachability sounds like:",
        [
          "Disagreeing instantly and forever",
          "Specific change plus evidence of improvement",
          "Saying you never get feedback",
          "Only thanking them with no action",
        ],
        1,
        "Change evidence is the signal.",
      ),
  },
  {
    id: "q13-priority-clash",
    stage: "Behavioral",
    title: () => "Two urgent priorities",
    minutes: 12,
    summary: "Prioritization with stakeholders.",
    scenario: (def) =>
      `${def.setting}. Two leaders want different ${t(def, 4)} outcomes now.`,
    interviewer: (def) =>
      `Two stakeholders need conflicting ${t(def, 4)} outcomes this week. As a ${def.role}, how have you handled that kind of clash?`,
    playbook: () => [
      "Make the conflict visible with facts.",
      "Clarify impact and deadlines for both.",
      "Propose a sequenced plan or cut.",
      "Get a decision from the right owner.",
      "Confirm the plan in writing.",
    ],
    debrief: () =>
      d(
        "Healthy prioritization includes:",
        [
          "Secretly picking favorites",
          "Visible tradeoffs and a decision owner",
          "Working nights forever as the plan",
          "Ignoring both until someone yells",
        ],
        1,
        "Visible tradeoffs beat heroics.",
      ),
  },
  {
    id: "q14-mentorship",
    stage: "Behavioral",
    title: () => "Helping someone level up",
    minutes: 10,
    summary: "Teaching without taking over.",
    scenario: (def) =>
      `${def.role} growth story. Peer struggled with ${t(def, 0)}.`,
    interviewer: (def) =>
      `Describe a time you helped a colleague improve at ${t(def, 0)}. How did you teach without taking over?`,
    playbook: (def) => [
      "Diagnose the gap together.",
      `Model one ${t(def, 0)} technique.`,
      "Let them practice with feedback.",
      "Leave a checklist or example.",
      "Check progress later.",
    ],
    debrief: () =>
      d(
        "Good mentoring stories show:",
        [
          "Doing the work for them silently",
          "Diagnosis, practice, and a lasting aid",
          "Public shaming as motivation",
          "No follow-up",
        ],
        1,
        "Capability transfer is the goal.",
      ),
  },
  {
    id: "q15-ethics",
    stage: "Behavioral",
    title: () => "Pressure to cut a corner",
    minutes: 12,
    summary: "Integrity under pressure.",
    scenario: (def) =>
      `${def.setting}. Pressure to shortcut ${t(def, 1)}.`,
    interviewer: (def) =>
      `Tell me about a time you were pressured to cut a corner on ${t(def, 1)}. What did you do?`,
    playbook: (def) => [
      "Name the risk in concrete terms.",
      `Offer a safer alternative for ${t(def, 1)}.`,
      "Escalate if needed with facts.",
      "Document the decision.",
      "Stay respectful while firm.",
    ],
    debrief: () =>
      d(
        "Integrity answers usually:",
        [
          "Quietly comply and hope",
          "Name risk, offer alternative, escalate if needed",
          "Lecture without options",
          "Resign as the first step every time",
        ],
        1,
        "Alternatives + escalation path matter.",
      ),
  },
  {
    id: "q16-failure-learning",
    stage: "Behavioral",
    title: () => "A failure you owned",
    minutes: 12,
    summary: "Learning loop after a miss.",
    scenario: (def) =>
      `${def.role} behavioral. Failure involving ${t(def, 2)}.`,
    interviewer: (def) =>
      `Tell me about a failure involving ${t(def, 2)}. What did you learn, and what system change did you leave behind?`,
    playbook: () => [
      "Own the failure without melodrama.",
      "Impact in one sentence.",
      "Root cause with evidence.",
      "System change with owner/date.",
      "What you do differently now.",
    ],
    debrief: () =>
      d(
        "Mature failure stories include:",
        [
          "No learning and no change",
          "Ownership, root cause, and a system fix",
          "Only luck as the lesson",
          "Blaming tools exclusively",
        ],
        1,
        "System change proves learning.",
      ),
  },
  {
    id: "q17-stakeholder-update",
    stage: "Communication",
    title: () => "Bad news update",
    minutes: 10,
    summary: "Clear status when things slipped.",
    scenario: (def) =>
      `${def.role} communication screen. ${t(def, 3)} is late.`,
    interviewer: (def) =>
      `You must tell a senior stakeholder that ${t(def, 3)} will slip. How do you structure that update?`,
    playbook: () => [
      "Lead with the headline and impact.",
      "Why, in one breath—no novel.",
      "Options with recommendation.",
      "Ask for the decision you need.",
      "Confirm next update time.",
    ],
    debrief: () =>
      d(
        "Effective bad-news updates:",
        [
          "Bury the slip at the end",
          "Headline, impact, options, ask",
          "Only apologies with no plan",
          "Surprise them in a big meeting",
        ],
        1,
        "Clarity + options build trust.",
      ),
  },
  {
    id: "q18-cross-functional",
    stage: "Communication",
    title: () => "Cross-functional alignment",
    minutes: 12,
    summary: "Getting another function on board.",
    scenario: (def) =>
      `${def.setting}. You need another team for ${t(def, 4)}.`,
    interviewer: (def) =>
      `How do you get a busy cross-functional partner to prioritize help on ${t(def, 4)} without escalating too early?`,
    playbook: () => [
      "Learn their goals and constraints.",
      "Frame the ask as shared outcome.",
      "Make the ask small and timeboxed.",
      "Offer something useful in return.",
      "Escalate only with a clear package.",
    ],
    debrief: () =>
      d(
        "Alignment without early escalation means:",
        [
          "Demanding with no context",
          "Shared outcome, small ask, respect for their constraints",
          "Silent waiting for weeks",
          "Public call-outs",
        ],
        1,
        "Empathy + crisp ask scales influence.",
      ),
  },
  {
    id: "q19-teach-back",
    stage: "Communication",
    title: () => "Explain to a non-expert",
    minutes: 10,
    summary: "Plain language without dumbing down.",
    scenario: (def) =>
      `${def.role} communication. Explain ${t(def, 0)} to a non-expert.`,
    interviewer: (def) =>
      `Explain ${t(def, 0)} to a smart non-expert in this ${def.setting}. What analogy or structure would you use?`,
    playbook: (def) => [
      "Start with why it matters to them.",
      `Define ${t(def, 0)} in one plain sentence.`,
      "Use one analogy, then the real term.",
      "Give one example of good vs bad.",
      "Check understanding with a question.",
    ],
    debrief: () =>
      d(
        "Clear explanations usually:",
        [
          "Flood jargon immediately",
          "Why → plain definition → example → check",
          "Refuse to simplify",
          "Only analogies with no substance",
        ],
        1,
        "Audience-first structure wins.",
      ),
  },
  {
    id: "q20-difficult-conversation",
    stage: "Communication",
    title: () => "Difficult conversation",
    minutes: 12,
    summary: "Direct, kind, specific.",
    scenario: (def) =>
      `${def.role} people skill. Performance issue touching ${t(def, 1)}.`,
    interviewer: (def) =>
      `How would you prepare for a difficult conversation with a colleague whose ${t(def, 1)} work is putting the team at risk?`,
    playbook: () => [
      "Facts and impact, not labels.",
      "Private setting; clear purpose.",
      "Invite their view.",
      "Agree on specific next steps.",
      "Document and follow up.",
    ],
    debrief: () =>
      d(
        "Difficult conversations work when you:",
        [
          "Ambush them in public",
          "Use facts, impact, and agreed next steps",
          "Only hint forever",
          "Skip their perspective",
        ],
        1,
        "Specificity + respect > soft vagueness.",
      ),
  },
  {
    id: "q21-written-brief",
    stage: "Communication",
    title: () => "One-page brief",
    minutes: 10,
    summary: "Executive-ready writing.",
    scenario: (def) =>
      `${def.setting}. Leadership wants a one-pager on ${t(def, 2)}.`,
    interviewer: (def) =>
      `You must write a one-page brief on ${t(def, 2)} for leadership. What sections do you include, and what do you cut?`,
    playbook: () => [
      "Headline recommendation first.",
      "Context in 3–5 lines.",
      "Options and risks.",
      "Ask / decision needed.",
      "Cut anecdotes and raw dumps.",
    ],
    debrief: () =>
      d(
        "Executive briefs should:",
        [
          "Start with a 10-page appendix",
          "Lead with recommendation and a clear ask",
          "Hide the ask",
          "Include every raw data table",
        ],
        1,
        "Recommendation + ask is the product.",
      ),
  },
  {
    id: "q22-why-role",
    stage: "Fit",
    title: (def) => `Why ${def.role}`,
    minutes: 8,
    summary: "Motivation with evidence.",
    scenario: (def) => `Closing / fit for ${def.role} in a ${def.setting}.`,
    interviewer: (def) =>
      `Why ${def.role}, and why this kind of ${def.setting} rather than a neighboring path?`,
    playbook: (def) => [
      "One authentic motivation sentence.",
      `Tie to skills around ${t(def, 0)} and ${t(def, 1)}.`,
      "Show you’ve researched the setting.",
      "Name what you want to learn in year one.",
      "Avoid generic “I love helping people” alone.",
    ],
    debrief: (def) =>
      d(
        "Strong fit answers connect:",
        [
          "Only salary curiosity",
          `Motivation + evidence + this ${def.setting}`,
          "Disparaging other roles",
          "No learning agenda",
        ],
        1,
        "Specificity signals real interest.",
      ),
  },
  {
    id: "q23-strength-weakness",
    stage: "Fit",
    title: () => "Strength and growth edge",
    minutes: 8,
    summary: "Self-awareness without clichés.",
    scenario: (def) => `${def.role} fit. Strength tied to ${t(def, 3)}; real growth edge.`,
    interviewer: (def) =>
      `What’s a strength you bring to ${t(def, 3)} as a ${def.role}, and what’s a growth edge you’re actively working on?`,
    playbook: () => [
      "Strength with a short proof story.",
      "Growth edge that is real, not “I care too much.”",
      "What you’re doing to improve.",
      "How teammates would describe you.",
      "Keep both proportional.",
    ],
    debrief: () =>
      d(
        "Self-awareness looks like:",
        [
          "Fake weaknesses that are strengths",
          "Real strength proof plus an active growth plan",
          "Only weaknesses",
          "No examples",
        ],
        1,
        "Proof + practice plan is credible.",
      ),
  },
  {
    id: "q24-thirty-sixty-ninety",
    stage: "Fit",
    title: () => "First 90 days",
    minutes: 10,
    summary: "Ramp plan that listens first.",
    scenario: (def) =>
      `${def.role} closing. They ask for a 30/60/90 around ${t(def, 4)}.`,
    interviewer: (def) =>
      `Outline a 30/60/90-day plan for succeeding as a ${def.role} here, especially around ${t(def, 4)}—what would you prioritize first?`,
    playbook: (def) => [
      "30: listen, map systems, earn trust.",
      `60: own a small ${t(def, 4)} win.`,
      "90: propose a durable improvement.",
      "Name who you’d learn from.",
      "Ask how success is measured here.",
    ],
    debrief: () =>
      d(
        "Good ramp plans:",
        [
          "Promise transformation in week one",
          "Listen → small win → durable improvement",
          "No stakeholders mentioned",
          "Only courses with no delivery",
        ],
        1,
        "Listening before heroics builds trust.",
      ),
  },
  {
    id: "q25-questions-for-us",
    stage: "Closing",
    title: () => "Your questions for us",
    minutes: 8,
    summary: "Curiosity that shows judgment.",
    scenario: (def) => `End of ${def.role} loop in a ${def.setting}.`,
    interviewer: (def) =>
      `What questions would you ask us to decide if this ${def.role} role and ${def.setting} are a mutual fit—especially regarding ${t(def, 0)}?`,
    playbook: (def) => [
      `Ask how ${t(def, 0)} success is measured.`,
      "Ask about the hardest problem on the team now.",
      "Ask how feedback and growth work.",
      "Avoid only benefits/PTO as your sole question.",
      "Listen; ask a thoughtful follow-up.",
    ],
    debrief: () =>
      d(
        "Strong candidate questions:",
        [
          "Only “What did I do wrong?”",
          "Success metrics, hard problems, and growth",
          "No questions at all",
          "Only perks",
        ],
        1,
        "Judgment shows in what you ask.",
      ),
  },
  // —— Cutting-edge five: modern signals that separate strong candidates ——
  {
    id: "q26-edge-ai-judgment",
    stage: "Edge",
    title: () => "AI tools without losing the craft",
    minutes: 14,
    summary: "Use modern tools; keep accountability and verification.",
    scenario: (def) =>
      `${def.role} edge screen. Interviewers assume AI is available for ${t(def, 0)} work and want judgment, not denial or blind trust.`,
    interviewer: (def) =>
      `How would you use AI or automation as a ${def.role} for ${t(def, 0)} in a ${def.setting}—what would you let it draft, what would you never outsource, and how would you verify before anyone relies on it?`,
    playbook: (def) => [
      `Name a concrete ${t(def, 0)} task AI could accelerate.`,
      "State what stays human: judgment, accountability, relationships.",
      "Describe a verification step before shipping or advising.",
      "Call out a failure mode (hallucination, bias, privacy).",
      "Tie the workflow back to standards in this setting.",
    ],
    debrief: () =>
      d(
        "Cutting-edge answers show:",
        [
          "I never use AI / I always paste whatever it says",
          "Clear divide: accelerate drafts, keep judgment, verify before trust",
          "Only tool brand names",
          "Ignoring privacy or accuracy risk",
        ],
        1,
        "Tool fluency + verification is the modern bar.",
      ),
  },
  {
    id: "q27-edge-ambiguity",
    stage: "Edge",
    title: () => "Vague brief, real deadline",
    minutes: 16,
    summary: "Create clarity when the ask is unfinished.",
    scenario: (def) =>
      `${def.setting}. A stakeholder drops a fuzzy request tied to ${t(def, 1)} with a hard date. Ambiguity is the test.`,
    interviewer: (def) =>
      `A stakeholder says “just make ${t(def, 1)} better by Friday” with almost no detail. As a ${def.role}, what clarifying questions do you ask in the first ten minutes, and what do you deliver if they stay vague?`,
    playbook: (def) => [
      "Restate the decision the work must enable.",
      `Ask how “better” is measured for ${t(def, 1)}.`,
      "Confirm audience, constraints, and non-goals.",
      "Propose a thin first deliverable and a check-in.",
      "Document assumptions if they won’t decide.",
    ],
    debrief: () =>
      d(
        "Under ambiguity you should:",
        [
          "Build a huge solution in silence",
          "Clarify success, ship a thin slice, document assumptions",
          "Wait forever for a perfect brief",
          "Guess and blame them later",
        ],
        1,
        "Clarity creation is a senior skill.",
      ),
  },
  {
    id: "q28-edge-influence",
    stage: "Edge",
    title: () => "Change minds without authority",
    minutes: 14,
    summary: "Cross-functional persuasion with evidence.",
    scenario: (def) =>
      `${def.role} loop. Another function blocks a needed change around ${t(def, 2)}.`,
    interviewer: (def) =>
      `You need another team to change how they handle ${t(def, 2)}, but you don’t manage them. How would you build the case and get to a decision without burning the relationship?`,
    playbook: (def) => [
      "Map their goals and constraints, not just yours.",
      `Bring evidence on ${t(def, 2)} impact—not opinions.`,
      "Offer options with tradeoffs, not a single demand.",
      "Find a shared experiment or pilot.",
      "Escalate with facts only after a good-faith try.",
    ],
    debrief: () =>
      d(
        "Influence without authority looks like:",
        [
          "CC storms and public pressure first",
          "Their goals, evidence, options, then escalate if needed",
          "Giving up immediately",
          "Secret workarounds that hide risk",
        ],
        1,
        "Shared goals beat positional power.",
      ),
  },
  {
    id: "q29-edge-learning-velocity",
    stage: "Edge",
    title: () => "Field moved — you kept up",
    minutes: 12,
    summary: "Prove you can retool when the craft changes.",
    scenario: (def) =>
      `Hiring managers for ${def.role} want learning velocity around ${t(def, 3)}, not a static skill list.`,
    interviewer: (def) =>
      `Tell me about a time the expectations for ${t(def, 3)} in your field shifted and you had to retool quickly. What did you learn, how did you practice it, and how did the quality of your ${def.role} work change?`,
    playbook: (def) => [
      "Name the shift (tool, standard, regulation, or market).",
      "How you diagnosed the gap in your practice.",
      "A deliberate learning loop: source → practice → feedback.",
      `Evidence the ${def.role} outcome improved.`,
      "What you still monitor as the field moves.",
    ],
    debrief: () =>
      d(
        "Learning-velocity stories need:",
        [
          "A course certificate with no application",
          "Shift, practice loop, and a better work outcome",
          "Blaming the industry",
          "Claiming you never need to relearn",
        ],
        1,
        "Applied retooling beats résumé courses.",
      ),
  },
  {
    id: "q30-edge-ethics-pressure",
    stage: "Edge",
    title: () => "Integrity when speed is rewarded",
    minutes: 14,
    summary: "Modern pressure tests: privacy, safety, honesty, shortcuts.",
    scenario: (def) =>
      `${def.setting}. Speed is celebrated; a shortcut would touch ${t(def, 4)} or trust. This is the edge that wins offers—or ends them.`,
    interviewer: (def) =>
      `Leadership wants a faster result on ${t(def, 4)} in a way that feels ethically or professionally gray. As a ${def.role}, how do you respond in the room, what alternative do you offer, and where is your hard stop?`,
    playbook: () => [
      "Name the risk in plain language (people, trust, compliance).",
      "Acknowledge the real deadline pressure.",
      "Offer a safer path that still moves the goal.",
      "State your hard stop without theatrical defiance.",
      "Document and escalate through the right channel if needed.",
    ],
    debrief: () =>
      d(
        "Integrity under pressure means:",
        [
          "Silent compliance with the gray ask",
          "Name the risk, offer a safer path, hold a clear hard stop",
          "Public shaming as the first move",
          "Only saying no with no alternative",
        ],
        1,
        "Hard stops with options earn trust.",
      ),
  },
];

export function buildScenarios(def: TrackDef): InterviewScenario[] {
  if (TEMPLATES.length !== 30) {
    throw new Error(`Expected 30 templates, got ${TEMPLATES.length}`);
  }
  return TEMPLATES.map((tpl) => {
    const interviewer = tpl.interviewer(def).trim();
    if (!interviewer.endsWith("?")) {
      throw new Error(`Interviewer must end with ?: ${tpl.id} / ${def.slug}`);
    }
    return q(
      tpl.id,
      tpl.stage,
      tpl.title(def),
      tpl.minutes,
      tpl.summary,
      tpl.scenario(def),
      interviewer,
      tpl.playbook(def),
      tpl.debrief(def),
    );
  });
}
