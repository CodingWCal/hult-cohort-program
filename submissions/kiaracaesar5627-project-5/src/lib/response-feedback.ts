import type { SelfScore } from "@/lib/practice-journal";

export type ResponseSignals = {
  wordCount: number;
  hasAnswer: boolean;
  starHits: number;
  hasNumber: boolean;
  hasIAction: boolean;
  hedging: boolean;
  weHeavy: boolean;
};

export type ResponseFeedback = {
  headline: string;
  strengths: string[];
  improvements: string[];
  interviewTips: string[];
  signals: ResponseSignals;
};

const ACTION =
  /\bi\s+(led|own(?:ed)?|decid(?:ed|e)|built|fix(?:ed)?|ask(?:ed)?|escalat(?:ed|e)|measur(?:ed|e)|negotiat(?:ed|e)|protect(?:ed|e)|refus(?:ed|e)|taught|shipped|cut|chose|prioritiz(?:ed|e)|document(?:ed|e)|stopped|clarif(?:ied|y))\b/i;

const HEDGE =
  /\b(maybe|i guess|kind of|sort of|i think i would|probably just|not sure)\b/i;

const STAR = {
  situation: /\b(when|while at|in my role|on a (team|shift|project)|last (year|quarter|month)|situation)\b/i,
  task: /\b(my job was|i was asked|the goal|the ask|needed to|responsible for)\b/i,
  action: ACTION,
  result: /\b(result|outcome|so we|that cut|that saved|patients?|customers?|error rate|on time|hired|passed)\b/i,
};

function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9%\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function playbookHits(notes: string, playbook: string[]): number {
  const noteSet = new Set(words(notes));
  const keys = playbook
    .join(" ")
    .toLowerCase()
    .match(/\b[a-z]{5,}\b/g);
  if (!keys) return 0;
  const uniq = [...new Set(keys)].filter(
    (w) => !["would", "should", "about", "their", "there", "which", "first"].includes(w),
  );
  return uniq.filter((w) => noteSet.has(w)).length;
}

function starHits(notes: string): number {
  return (
    Number(STAR.situation.test(notes)) +
    Number(STAR.task.test(notes)) +
    Number(STAR.action.test(notes)) +
    Number(STAR.result.test(notes))
  );
}

function weVsI(notes: string): boolean {
  const we = (notes.match(/\bwe\b/gi) ?? []).length;
  const i = (notes.match(/\bi\b/gi) ?? []).length;
  return we >= 3 && we > i;
}

export function reviewResponse(input: {
  notes: string;
  playbook: string[];
  role: string;
  stage: string;
  scores: SelfScore;
  debriefCorrect: boolean | null;
}): ResponseFeedback {
  const notes = input.notes.trim();
  const wordCount = notes ? words(notes).length : 0;
  const hasAnswer = wordCount >= 8;
  const stars = hasAnswer ? starHits(notes) : 0;
  const hasNumber = hasAnswer && /\d/.test(notes);
  const hasIAction = hasAnswer && ACTION.test(notes);
  const hedging = hasAnswer && HEDGE.test(notes);
  const weHeavy = hasAnswer && weVsI(notes);
  const overlap = hasAnswer ? playbookHits(notes, input.playbook) : 0;
  const scored =
    input.scores.structure > 0 || input.scores.evidence > 0 || input.scores.clarity > 0;

  const strengths: string[] = [];
  const improvements: string[] = [];
  const interviewTips: string[] = [];

  if (hasAnswer && wordCount >= 40 && wordCount <= 220) {
    strengths.push("Length is in a speakable range — about 60–90 seconds if you say it out loud.");
  }
  if (stars >= 3) {
    strengths.push("The draft has a story shape (context → what you did → what changed).");
  }
  if (hasIAction) {
    strengths.push("You named an action you owned — interviewers hire the person who decided, not the team fog.");
  }
  if (hasNumber) {
    strengths.push("You used a number. Concrete beats “a lot” in the room.");
  }
  if (overlap >= 3) {
    strengths.push(`The notes hit this ${input.role} playbook — you are answering the actual question.`);
  }
  if (input.debriefCorrect === true) {
    strengths.push("Debrief read was right. You already know what “good” looks like on this prompt.");
  }

  if (!hasAnswer) {
    improvements.push(
      "Jot a 4-line skeleton before you speak: situation, your job, the move you made, the result. Empty notes give you nothing to rehearse.",
    );
  } else if (wordCount < 40) {
    improvements.push(
      "This is too thin for a live answer. Add one constraint (time, risk, or stakeholder) and one result.",
    );
  } else if (wordCount > 240) {
    improvements.push(
      "Cut to one story. Open with the decision, then one action and one result — leave the rest for a follow-up.",
    );
  }

  if (input.stage === "Edge") {
    improvements.push(
      "Edge rooms want a tradeoff and a hard stop. Say what you protect, what you defer, and where you will not go.",
    );
  }

  if (hasAnswer && stars < 3) {
    improvements.push(
      "Rebuild it as STAR: 15 seconds of context, the task, your action, then a result the interviewer can repeat.",
    );
  }
  if (hasAnswer && !hasIAction) {
    improvements.push(
      `Swap “we handled it” for what you did as a ${input.role}: decided, escalated, measured, or refused.`,
    );
  }
  if (weHeavy) {
    improvements.push("Too much “we.” Keep the team, but put your name on one decision.");
  }
  if (hasAnswer && !hasNumber) {
    improvements.push(
      "Add one evidence beat: time saved, error caught, people affected, or what you would measure next.",
    );
  }
  if (hedging) {
    improvements.push("Drop hedges (“maybe,” “I guess”). In the room, commit to a first check even if the data is incomplete.");
  }
  if (hasAnswer && overlap < 2 && input.playbook[0]) {
    improvements.push(`Work the first playbook move into the answer: “${input.playbook[0]}”`);
  }
  if (input.debriefCorrect === false) {
    improvements.push("Re-read the debrief explanation, then retell the story so it matches that standard.");
  }
  if (scored && input.scores.structure > 0 && input.scores.structure <= 2) {
    improvements.push("You scored structure low — say the outline out loud before the story: “I’ll cover context, action, result.”");
  }
  if (scored && input.scores.evidence > 0 && input.scores.evidence <= 2) {
    improvements.push("You scored evidence low — one metric or named person beats three adjectives.");
  }
  if (scored && input.scores.clarity > 0 && input.scores.clarity <= 2) {
    improvements.push("You scored clarity low — shorter sentences. Stop after the result and wait.");
  }

  interviewTips.push("Pause two seconds after the question. Restate it in one line so you buy thinking time without filling with “um.”");
  if (input.stage === "Edge" || hedging) {
    interviewTips.push(
      "When the ask is gray, name the risk in plain language, offer a safer path that still moves the goal, then state your hard stop.",
    );
  } else {
    interviewTips.push(
      "End every behavioral answer with a result and a lesson. If they want more, they will ask — do not keep talking into the silence.",
    );
  }
  if (!hasNumber || (scored && input.scores.evidence <= 3)) {
    interviewTips.push("Keep a pocket metric for this role (cycle time, safety catch, conversion, wait, error rate) so evidence is ready, not invented.");
  } else {
    interviewTips.push(
      "Watch the interviewer. If they lean in, go one layer deeper. If they glance at notes, land the result and stop.",
    );
  }
  interviewTips.push(
    `Treat this as a ${input.role} conversation, not a biography. One relevant story beats a tour of your whole career.`,
  );

  let headline = scored
    ? "Use these notes as a rehearsal plan for the next sitting."
    : "Draft a spoken answer so we can mark it.";
  if (hasAnswer && improvements.length <= 2 && strengths.length >= 2) {
    headline = "This would land. Tighten the close and you are interview-ready on this prompt.";
  } else if (hasAnswer && wordCount < 40) {
    headline = "Too light for the room — expand one decision and one result.";
  } else if (hasAnswer) {
    headline = "Usable draft. Fix the gaps below, then say it out loud once under the timer.";
  }

  return {
    headline,
    strengths: strengths.slice(0, 4),
    improvements: improvements.slice(0, 5),
    interviewTips: interviewTips.slice(0, 4),
    signals: {
      wordCount,
      hasAnswer,
      starHits: stars,
      hasNumber,
      hasIAction,
      hedging,
      weHeavy,
    },
  };
}
