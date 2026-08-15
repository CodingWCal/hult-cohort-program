export type TipGroup = {
  id: string;
  title: string;
  lead: string;
  tips: string[];
};

/** Static interview-day advice. Not generated, not an AI coach. */
export const INTERVIEW_TIP_GROUPS: TipGroup[] = [
  {
    id: "open",
    title: "The first ten seconds",
    lead: "Most answers fail before the story starts.",
    tips: [
      "Pause two seconds after the question. Restate it in one line so you buy thinking time without filling with “um.”",
      "If you did not hear the ask, say so once: “Do you want a time I missed a commitment, or a time I disagreed with a peer?” Guessing the wrong prompt wastes the room.",
      "Open with the decision, not your résumé. One relevant story beats a tour of your whole career.",
    ],
  },
  {
    id: "star",
    title: "Make the story speakable",
    lead: "Interviewers need a shape they can repeat to the hiring panel.",
    tips: [
      "Use STAR out loud: ~15 seconds of context, the task, the move you made, then a result.",
      "Put your name on one decision. “We handled it” hides the person they would hire.",
      "Aim for 60–90 seconds, then stop. If they want more, they will ask — do not talk into the silence.",
      "End with a result and a lesson. “So I now check X before Y” is a close they can write down.",
    ],
  },
  {
    id: "evidence",
    title: "Bring one number",
    lead: "Concrete beats “a lot.”",
    tips: [
      "Keep a pocket metric for the role you applied to: time, error caught, people affected, wait, conversion, or what you would measure next.",
      "If you do not have a number, name a stakeholder and what changed for them.",
      "Skip adjectives. One evidence beat outperforms three claims about being “passionate” or “detail-oriented.”",
    ],
  },
  {
    id: "edge",
    title: "Gray asks and Edge rooms",
    lead: "Modern interviews test judgment when speed is rewarded.",
    tips: [
      "When the ask is ethically or professionally gray, name the risk in plain language.",
      "Offer a safer path that still moves the goal, then state your hard stop without theatrical defiance.",
      "Say the tradeoff out loud: what you protect, what you defer, and where you will not go.",
      "Incomplete data is the job. Structure the unknown, pick a first check, and say what would change your mind.",
    ],
  },
  {
    id: "room",
    title: "While they are watching",
    lead: "The interviewer is a person with a clock, not a quiz machine.",
    tips: [
      "Watch them. If they lean in, go one layer deeper. If they glance at notes, land the result and stop.",
      "Do not dump the playbook. Answer the prompt first; structure is for you, not a lecture.",
      "If you blank, narrate the first check: “I would clarify the constraint, then…” That is still an answer.",
      "Treat it as a conversation for that job — nurse, teacher, engineer — not a generic “tell me about yourself” loop.",
    ],
  },
  {
    id: "avoid",
    title: "Leave these at the door",
    lead: "These patterns read as unready even when the experience is real.",
    tips: [
      "Hedges: “maybe,” “I guess,” “kind of.” Commit to a first move even if the data is incomplete.",
      "Blame with no recovery. If you tell a miss, the next sentence is what you did in the first forty-eight hours.",
      "Memorized essays. Speak the beats; do not recite a paragraph you wrote last night.",
      "Lying about a metric or a title. One honest gap plus a plan beats a story that falls apart on the follow-up.",
    ],
  },
];
