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
    lead: "A calm start is more useful than a fast start.",
    tips: [
      "Pause for two seconds after they finish. Repeat the question in one short sentence. That gives you time to think without filling the silence with “um.”",
      "If you are not sure what they asked, check once: “Would you like a time I missed a deadline, or a time I disagreed with a coworker?” Answering the wrong question wastes the interview.",
      "Start with one story that fits this job. Do not walk through your whole career.",
    ],
  },
  {
    id: "star",
    title: "Tell a clear story",
    lead: "They need to remember what you did, not every detail.",
    tips: [
      "Use a simple four-part answer: the situation, what you were asked to do, what you did, and what changed. Spend about 15 seconds on the background, then get to your action.",
      "Say what you did. “We handled it” hides your part. “I decided…” is clearer.",
      "Keep the story to about one minute. Then stop. If they want more, they will ask. Do not keep talking into the silence.",
      "Close with the result and what you would do next time. For example: “I now check X before Y.” That is easy for them to write down.",
    ],
  },
  {
    id: "evidence",
    title: "Use one real number",
    lead: "A specific example is stronger than “a lot” or “very hard.”",
    tips: [
      "Bring one fact that fits the job: time saved, a mistake you caught, how many people were affected, wait time, or what you would measure next.",
      "If you do not have a number, name the person who was affected and what changed for them.",
      "Skip extra adjectives. One clear fact is better than saying you are “passionate” or “detail-oriented.”",
    ],
  },
  {
    id: "edge",
    title: "When the question is hard or unclear",
    lead: "Many interviews test how you choose when there is pressure to go fast.",
    tips: [
      "If the request feels wrong or unsafe, say the risk in plain words. Do not hide it.",
      "Offer a safer way that still gets work done. Then say what you will not do.",
      "Say the tradeoff out loud: what you protect, what can wait, and where you draw the line.",
      "You will not have all the facts. Say what you would check first, and what new information would change your plan.",
    ],
  },
  {
    id: "room",
    title: "During the interview",
    lead: "The interviewer is a person with limited time, not a quiz.",
    tips: [
      "Watch them. If they lean in, add one more detail. If they look at their notes, finish with the result and stop.",
      "Answer the question first. Do not give a lecture on method. Keep your outline in your head.",
      "If your mind goes blank, start with the first step: “I would confirm the goal, then…” That still counts as an answer.",
      "Talk as if this job is the job — nurse, teacher, engineer, or whatever you applied for. This is not a generic “tell me about yourself” speech.",
    ],
  },
  {
    id: "avoid",
    title: "What to avoid",
    lead: "These habits make strong experience sound weaker than it is.",
    tips: [
      "Avoid “maybe,” “I guess,” and “kind of.” Choose a first step even if you do not have every fact yet.",
      "If you talk about a mistake, the next sentence should be what you did in the first two days to fix it. Do not stop at blame.",
      "Do not recite a speech you memorized. Speak the main points in a natural way.",
      "Do not invent a number or a job title. An honest gap plus a plan is safer than a story that falls apart when they ask a follow-up.",
    ],
  },
];
