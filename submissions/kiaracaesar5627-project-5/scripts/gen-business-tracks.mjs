/**
 * One-shot generator for major business interview tracks.
 * Run: node scripts/gen-business-tracks.mjs
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @typedef {{ slug: string, stage: string, title: string, minutes: number, summary: string, scenario: string, interviewer: string, playbook: string[], prompt: string, choices: string[], answer: number, explain: string }} Sc */

/** @type {Array<{ slug: string, role: string, setting: string, blurb: string, scenarios: Sc[] }>} */
const tracks = [
  {
    slug: "finance-fpa",
    role: "Finance / FP&A",
    setting: "Corporate finance at a growth company",
    blurb: "Forecasting, variance analysis, board packs, and partnering with operators.",
    scenarios: [
      sc("variance-deep-dive", "Technical", "Unexplained opex variance", 18, "Find the story behind the number.", "FP&A interview after a noisy close.", "Gross margin is fine but opex is 12% over plan. How do you investigate before the CFO meeting?", ["Pull by cost center and account.", "Separate timing vs true run-rate.", "Talk to budget owners with specifics.", "Quantify recurring vs one-time.", "Recommend actions, not just charts."], "Before the CFO meeting you should:", ["Only apologize", "Segment the variance and separate timing vs run-rate", "Hide the miss", "Average last year"], 1, "Diagnosis beats panic."),
      sc("forecast-challenge", "Case", "Build a 12-month forecast", 20, "Driver-based planning under uncertainty.", "FP&A screen for planning maturity.", "Leadership wants a 12-month P&L forecast in two days. Approach?", ["Clarify decision the forecast supports.", "Driver model: volume, price, headcount, CAC.", "Scenarios: base / downside / upside.", "Document assumptions explicitly.", "Sensitivity on the 2–3 biggest levers."], "A credible fast forecast includes:", ["One fake precise number", "Drivers, scenarios, and explicit assumptions", "No sensitivities", "Only last year’s actuals copied"], 1, "Assumptions are the product."),
      sc("headcount-roi", "Case", "Justify new headcount", 15, "Investment framing for people costs.", "Finance partnering with a GTM leader.", "Sales wants 8 new AEs. How do you evaluate?", ["Ramp curves and productivity assumptions.", "Fully loaded cost vs contribution.", "Capacity vs pipeline reality.", "Payback and risk if ramp slips.", "Phased hire recommendation."], "Headcount cases need:", ["Rubber-stamp the ask", "Cost, ramp, capacity, and payback logic", "Ignore pipeline", "Only competitor bench marks"], 1, "People are capex in disguise."),
      sc("board-deck", "Communication", "Board pack under time pressure", 12, "Exec storytelling with numbers.", "FP&A close to the CFO.", "You have 24 hours to refresh the board finance appendix. Priorities?", ["North-star metrics and variance vs plan.", "Cash runway / liquidity.", "Risks and asks.", "Cut vanity detail.", "Align narrative with CEO story."], "Board packs should emphasize:", ["Every journal entry", "Performance vs plan, cash, risks, and asks", "Only logos", "Raw ERP dumps"], 1, "Decision support, not data exhaust."),
      sc("bad-news-cfo", "Behavioral", "Miss the quarter early", 12, "Courageous finance communication.", "FP&A culture interview.", "Week 6 you see the quarter will miss. What do you do?", ["Quantify the gap with evidence.", "Escalate early with options.", "No sandbag surprises later.", "Partner on levers to close.", "Document the forecast change."], "Early miss visibility requires:", ["Waiting until final week", "Evidence, options, and early escalation", "Blaming Sales in Slack", "Changing actuals"], 1, "Trust is a finance KPI."),
      sc("unit-economics", "Case", "Are we unit-economic?", 18, "Contribution and payback literacy.", "SaaS finance interview.", "Define and assess unit economics for our subscription product.", ["Define unit (customer / cohort).", "Contribution margin after variable costs.", "CAC and payback.", "Cohort retention sensitivity.", "When scale helps vs hides problems."], "Unit economics start with:", ["Only vanity ARR", "Clear unit, contribution, CAC/payback", "Ignoring retention", "Gross revenue only"], 1, "Contribution + payback matter."),
      sc("capex-vs-opex", "Technical", "Build vs buy decision", 12, "Accounting and cash framing.", "Finance partnering with IT.", "IT wants to capitalize a large software project. How do you advise?", ["Policy and accounting rules.", "Cash vs P&L optics.", "Useful life and impairment risk.", "Operational ownership.", "Transparent disclosure to leadership."], "Capitalization advice should include:", ["Whatever makes EBITDA look best only", "Policy, cash reality, and risk", "Ignoring auditors", "Always expense everything"], 1, "Integrity over optics."),
      sc("cash-runway", "Case", "Runway scare", 15, "Liquidity management.", "Growth-stage finance interview.", "Cash runway dropped from 18 to 11 months. Walk me through your plan.", ["Re-forecast cash weekly.", "Identify controllable burns.", "Scenario hiring and vendor cuts.", "Fundraising timeline realism.", "Comms to leadership with triggers."], "Runway pressure needs:", ["Ignore until zero", "Cash forecast, burn levers, and trigger plan", "Only optimism", "Secret cuts with no owners"], 1, "Cash is oxygen."),
      sc("partner-conflict", "Behavioral", "Operator rejects the forecast", 12, "Influence without authority.", "FP&A embedded in a business unit.", "A GM says your forecast is ‘Finance fiction.’ How do you respond?", ["Seek their drivers and evidence.", "Reconcile models side by side.", "Agree on shared assumptions.", "Escalate only with a joint view.", "Keep the relationship usable."], "Best response:", ["Win the argument publicly", "Reconcile drivers and agree shared assumptions", "Ignore the GM", "Change numbers silently"], 1, "Partnership > scorekeeping."),
      sc("why-finance", "Closing", "Why FP&A here", 8, "Motivation close.", "Hiring manager final.", "Why corporate finance at this company, and what would you improve in 90 days?", ["Business model hook.", "A process/insight win.", "How you partner with operators.", "Ask how decisions use finance.", "Avoid ‘I like Excel’ alone."], "Strong closes cite:", ["Only spreadsheet love", "Business hook + concrete 90-day win", "No partnership mindset", "Guaranteed perfect forecasts"], 1, "Impact over tools."),
    ],
  },
  {
    slug: "management-consulting",
    role: "Management Consultant",
    setting: "Strategy consulting firm case interviews",
    blurb: "Case structure, quantitative speed, and client-ready recommendations.",
    scenarios: [
      sc("market-entry", "Case", "Market entry", 25, "Classic strategy case.", "First-round case interview.", "A PE-backed retailer wants to enter Country X. Should they? Structure your approach.", ["Clarify goals and constraints.", "Market size / growth / competition.", "Customer and capability fit.", "Economics and risks.", "Clear go / no-go with next steps."], "Market entry cases start with:", ["Random brainstorming", "Clarifying objective then a MECE structure", "Only gut feel", "Listing buzzwords"], 1, "Structure first."),
      sc("profitability", "Case", "Profit drop", 25, "Profit tree fluency.", "Case interview.", "Client profits fell 20% YoY. Diagnose.", ["Revenue vs cost split.", "Price / volume / mix.", "Fixed vs variable costs.", "Isolate the biggest driver.", "2–3 actionable recommendations."], "Profit cases usually:", ["Jump to marketing ideas", "Separate revenue and cost drivers systematically", "Ignore mix", "Only blame macro"], 1, "Trees beat guesses."),
      sc("sizing", "Case", "Estimate market size", 12, "Guesstimate discipline.", "Consulting fit + quant.", "Estimate the annual market for electric scooters in a mid-size US city.", ["Clarify scope.", "Top-down or bottom-up.", "State assumptions aloud.", "Sense-check magnitude.", "Express as a range."], "Good sizing includes:", ["A single fake precise number with no logic", "Clear assumptions and a sense-check", "Silence while calculating", "Only memorized facts"], 1, "Logic > precision theater."),
      sc("exhibit", "Case", "Read this exhibit", 10, "Chart interpretation under pressure.", "Case with a table of margins by segment.", "Margins look high in Segment A but growth is in B. What do you notice and what would you ask next?", ["Read axes and units.", "Compare absolute vs relative.", "Spot mix shifts.", "Ask for volumes / trends.", "Link insight to decision."], "Exhibit reads should:", ["Ignore units", "Check units, compare, and ask decision-relevant follow-ups", "Memorize every cell", "Change the client’s data"], 1, "Insight + next question."),
      sc("recommendation", "Case", "Final recommendation", 8, "Synthesis skill.", "End of a case.", "Give a 60-second recommendation as if to the CEO.", ["Answer first.", "2–3 supporting points.", "Risks and mitigations.", "Immediate next steps.", "No rambling recap of every branch."], "CEO synth should:", ["Recap the whole case tree", "Lead with the answer, support, risks, next steps", "Ask for more time forever", "Only list analyses"], 1, "Answer first."),
      sc("client-pushback", "Behavioral", "Client hates the answer", 12, "Presence under challenge.", "Behavioral for consulting.", "A partner’s client rejects your recommendation in the room. What do you do?", ["Stay calm; clarify concerns.", "Separate facts from preferences.", "Offer alternatives with tradeoffs.", "Don’t invent analysis.", "Align with partner privately after."], "Under pushback:", ["Double down rudely", "Clarify concerns and offer tradeoff alternatives", "Change the answer instantly with no reason", "Blame the partner"], 1, "Composure is the product."),
      sc("prioritize-work", "Behavioral", "Three deadlines", 10, "Staffing and prioritization.", "Consulting lifestyle screen.", "You have three deliverables due tomorrow and one is blocked. How do you manage?", ["Clarify true deadlines and critical path.", "Escalate blockers early.", "Renegotiate scope with the manager.", "Protect sleep/quality on the must-win piece.", "Communicate status without drama."], "Best move:", ["Suffer silently", "Clarify priorities, escalate blockers, renegotiate", "Miss all three quietly", "Only work the easiest"], 1, "Managers can’t help what they don’t know."),
      sc("team-conflict", "Behavioral", "Teammate not delivering", 12, "Team leadership without formal power.", "Consulting PEI-style.", "A teammate repeatedly misses analysis. Approach?", ["Private direct conversation.", "Understand blocker vs commitment.", "Offer help / re-scope.", "Escalate with facts if needed.", "Protect client quality."], "Healthy handling:", ["Complain on Slack first", "Direct conversation, then escalate with facts if needed", "Do all their work forever", "Public humiliation"], 1, "Direct then escalate."),
      sc("why-consulting", "Fit", "Why consulting", 8, "Motivation authenticity.", "Fit interview.", "Why consulting, and why our firm?", ["Problem-solving craft.", "Specific firm/practice hook.", "How you’ll handle the lifestyle.", "A 1-year learning goal.", "Avoid ‘prestige only’."], "Weak answers are usually:", ["Specific craft + firm hook", "Prestige-only with no substance", "A learning goal", "Lifestyle awareness"], 1, "Substance over status."),
      sc("why-mba-case", "Case", "Implementation risk", 15, "From answer to change.", "Second-round case twist.", "Your strategy is right but the client can’t execute. What do you add?", ["Capabilities and change costs.", "Phased roadmap.", "Quick wins for momentum.", "Governance and owners.", "KPIs to track adoption."], "Implementation-aware cases include:", ["Only the strategy slogan", "Phasing, owners, capabilities, and KPIs", "Ignoring change cost", "A 200-page deck dump"], 1, "Strategy without adoption fails."),
    ],
  },
  {
    slug: "investment-banking",
    role: "Investment Banking",
    setting: "Bulge / elite boutique analyst interviews",
    blurb: "Accounting, valuation, deal process, and stamina under technical fire.",
    scenarios: [
      sc("three-statements", "Technical", "Walk the three statements", 12, "Accounting linkage.", "IB technical screen.", "Walk me through how the three financial statements link.", ["IS → net income to CFS and RE.", "CFS bridges to cash on BS.", "BS balances: assets = L+E.", "Example: depreciation / capex / working capital.", "Keep it crisp."], "The statements link primarily through:", ["Marketing budgets", "Net income, cash, and balance sheet accounts", "Only footnotes", "HR headcount"], 1, "NI and cash are the bridges."),
      sc("dcf", "Technical", "Build a DCF verbally", 15, "Valuation mechanics.", "IB interview.", "Walk me through a DCF. What are the key sensitivities?", ["Project FCF.", "WACC and terminal value.", "Enterprise to equity bridge.", "Sensitivities: growth, margin, WACC.", "Sanity-check vs comps."], "DCF sensitivity usually hits:", ["Office snacks", "WACC, growth, and margins", "Font size", "Only the cover page"], 1, "Drivers, not decoration."),
      sc("comps", "Technical", "Trading comps", 12, "Relative valuation.", "IB technical.", "How do you select comps and which multiples matter?", ["Business model / growth / margins peers.", "Clean for nonrecurring items.", "EV/EBITDA, P/E, etc. by sector.", "Explain outliers.", "Use as a range, not a point."], "Comps fail when you:", ["Match business quality thoughtfully", "Force unrelated peers to fit a narrative", "Clean nonrecurring items", "Explain outliers"], 1, "Peer quality matters."),
      sc("lbo-lite", "Technical", "LBO intuition", 12, "PE / sponsor literacy.", "IB coverage interview.", "In plain English, how does an LBO create returns?", ["Buy with debt + equity.", "Operate / grow / delever.", "Exit proceeds after debt.", "Returns from EBITDA growth, multiple, and debt paydown.", "Risks: leverage and cycle."], "LBO returns come from:", ["Only logo prestige", "EBITDA growth, multiple change, and deleveraging", "Ignoring debt", "Only cutting all investment"], 1, "Three levers."),
      sc("deal-process", "Behavioral", "Live deal chaos", 12, "Process under pressure.", "IB behavioral.", "Tell me about a time you managed competing deadlines on a live process.", ["Prioritize with the associate/VP.", "Protect the critical path (CIM, model, buyer Q).", "Communicate delays early.", "Quality bar on client-facing work.", "What you’d systematize."], "Live deals need:", ["Heroics with no communication", "Clear prioritization and early status", "Silent misses", "Only perfect formatting forever"], 1, "Process saves deals."),
      sc("attention-detail", "Behavioral", "Catch a model error", 10, "Detail orientation.", "IB screen.", "Describe catching a material error before it reached a client.", ["What the error was.", "How you found it.", "Who you told.", "Fix and prevention checklist.", "No blame theater."], "Interviewers want:", ["Hiding the error", "Detection, escalation, fix, and prevention", "Public shaming", "Ignoring materiality"], 1, "Controls beat luck."),
      sc("pitch-why", "Fit", "Why banking / why us", 8, "Motivation.", "Fit interview.", "Why investment banking, and why this group?", ["Specific coverage interest.", "Skills you want to build.", "Evidence you’ve done the homework.", "Honest view of hours.", "Ask a sharp group question."], "Weak fit answers:", ["Specific group + skills + realism", "Only ‘I like money’", "Homework signals", "A thoughtful question"], 1, "Specificity wins."),
      sc("accretion-dilution", "Technical", "Accretion / dilution", 12, "M&A literacy.", "IB technical.", "What makes a deal accretive to EPS?", ["Buyer P/E vs target.", "Synergies and interest expense.", "Share issuance / cash mix.", "One-time costs.", "Not the same as value creation."], "Accretion is mainly about:", ["Office location", "Earnings math vs financing and synergies", "Only the press release", "Culture fit alone"], 1, "Math ≠ strategy, but know the math."),
      sc("working-capital", "Technical", "Working capital in a deal", 10, "NWC diligence.", "IB / PE hybrid.", "Why does net working capital matter in a purchase agreement?", ["Normalized NWC peg.", "Cash free / debt free.", "Seasonality.", "Protects buyer/seller economics.", "Diligence on definitions."], "NWC pegs exist to:", ["Ignore seasonality", "Normalize operating cash needs in the deal economics", "Hide debt", "Replace all accounting"], 1, "Definitions move millions."),
      sc("strength-weakness", "Fit", "Strength and weakness", 8, "Self-awareness.", "IB fit.", "What’s your greatest strength and a real weakness you’re improving?", ["Strength with banking evidence.", "Weakness that’s real but not fatal.", "Concrete improvement habit.", "No humblebrag weakness.", "Tie to team impact."], "Avoid:", ["A real weakness with a fix plan", "‘I work too hard’ as the only weakness", "Evidence for strength", "Team impact"], 1, "Self-awareness is diligence."),
    ],
  },
];

function sc(slug, stage, title, minutes, summary, scenario, interviewer, playbook, prompt, choices, answer, explain) {
  return { slug, stage, title, minutes, summary, scenario, interviewer, playbook, prompt, choices, answer, explain };
}

// Append remaining tracks in a second batch for file size control
tracks.push(
  {
    slug: "business-analyst",
    role: "Business Analyst",
    setting: "Enterprise process & requirements analysis",
    blurb: "Requirements, process mapping, stakeholder alignment, and delivery clarity.",
    scenarios: [
      sc("elicitation", "Case", "Conflicting requirements", 15, "Elicitation under conflict.", "BA interview for a core systems program.", "Sales and Ops want opposite workflow rules. How do you elicit and resolve?", ["Separate needs from solutions.", "Map current vs future process.", "Impact analysis.", "Decision owner and criteria.", "Document and trace requirements."], "Conflict resolution starts with:", ["Picking the louder team", "Needs vs solutions and a decision owner", "Coding immediately", "Ignoring Ops"], 1, "Clarity before code."),
      sc("user-story", "Technical", "Write a better story", 10, "Story quality.", "Agile BA screen.", "Critique: ‘As a user I want a dashboard so that I can see stuff.’ Improve it.", ["Specific persona and job.", "Acceptance criteria.", "Non-functionals if needed.", "Out of scope.", "Testable outcomes."], "Weak stories usually lack:", ["Pretty Jira colors", "Specific persona, job, and acceptance criteria", "A ticket number", "Emojis"], 1, "Testable > vague."),
      sc("process-map", "Case", "Broken handoff", 15, "Process thinking.", "BA for ops transformation.", "Orders stall between Sales and Fulfillment. How do you analyze?", ["SIPOC / swimlane.", "Measure cycle time and error rates.", "Find policy vs system causes.", "Quick wins vs structural fixes.", "Owners for each step."], "Handoff failures need:", ["Only a new Slack channel", "Mapped steps, metrics, and owners", "Blaming individuals first", "Ignoring data"], 1, "See the system."),
      sc("scope-creep", "Behavioral", "Scope creep mid-sprint", 12, "Change control.", "BA behavioral.", "A stakeholder adds ‘small’ asks every day. What do you do?", ["Capture as change requests.", "Impact on timeline/cost.", "Prioritize with product owner.", "Protect sprint goal.", "Communicate tradeoffs."], "Healthy response:", ["Silent acceptance forever", "Change control with impact and prioritization", "Rude refusal only", "Hide from stakeholders"], 1, "Visible tradeoffs."),
      sc("data-req", "Technical", "Data requirements", 12, "Data contracts.", "BA on analytics migration.", "Define requirements for a customer 360 feed.", ["Sources of truth.", "Fields, freshness, quality rules.", "PII / access.", "SLAs and error handling.", "Acceptance tests with samples."], "Data reqs must include:", ["Only a wishlist of charts", "Sources, fields, quality, access, and tests", "Ignoring PII", "No freshness rules"], 1, "Contracts prevent chaos."),
      sc("uat", "Case", "UAT is failing", 12, "Test leadership.", "BA owning UAT.", "UAT users keep rejecting builds as ‘not what we meant.’ Approach?", ["Trace to written acceptance criteria.", "Clarify ambiguous reqs.", "Reproduce with evidence.", "Retest plan.", "Prevent by earlier reviews."], "Failed UAT often means:", ["Developers are lazy only", "Ambiguous criteria need clarification and evidence", "Skip UAT next time", "Ship anyway silently"], 1, "Ambiguity shows up late."),
      sc("stakeholder-map", "Case", "Who decides?", 10, "RACI thinking.", "BA discovery kickoff.", "How do you map stakeholders on a messy program?", ["Power / interest.", "Decision rights.", "Comms cadence.", "Blockers and champions.", "Revisit as org changes."], "Stakeholder maps help you:", ["Email everyone identically", "Target decisions, cadence, and influence", "Avoid talking to users", "Only update once"], 1, "Influence is designed."),
      sc("nonfunctional", "Technical", "Non-functional requirements", 10, "Quality attributes.", "BA for a customer portal.", "What NFRs would you capture and how?", ["Performance, security, availability.", "Measurable targets.", "Accessibility.", "Constraints from architecture.", "Test approach."], "NFRs should be:", ["‘Make it fast’ only", "Measurable quality targets", "Ignored until prod", "Only visual polish"], 1, "If you can’t measure it, you can’t accept it."),
      sc("facilitation", "Behavioral", "Workshop gone sideways", 12, "Facilitation skill.", "BA behavioral.", "A requirements workshop turns into a complaint session. How do you recover?", ["Park issues in a visible list.", "Return to the decision needed today.", "Timebox.", "Assign owners for offline topics.", "End with documented outcomes."], "Facilitation recovery:", ["Let complaints run for hours", "Park, refocus on today’s decision, document outcomes", "Cancel and blame attendees", "Take no notes"], 1, "Outcomes over venting."),
      sc("why-ba", "Closing", "Why BA here", 8, "Motivation.", "Hiring manager.", "Why business analysis on this program?", ["Domain interest.", "Ambiguity you like reducing.", "90-day discovery plan.", "How you partner with eng/product.", "Ask how success is measured."], "Strong closes:", ["Only ‘I like meetings’", "Domain + ambiguity craft + 90-day plan", "No partnership view", "Guaranteed zero change requests"], 1, "Clarity is the craft."),
    ],
  },
  {
    slug: "project-manager",
    role: "Project Manager",
    setting: "Cross-functional delivery / PMO",
    blurb: "Scope, timeline, risk, and stakeholder management for delivery teams.",
    scenarios: [
      sc("late-project", "Case", "Project is red", 15, "Recovery planning.", "PM interview.", "Your critical path slipped three weeks. How do you respond?", ["Re-baseline facts.", "Options: crash, scope cut, sequence change.", "Risks of each.", "Stakeholder decision package.", "Update RAID and comms."], "Red projects need:", ["Hope alone", "Options with tradeoffs for a decision", "Hiding the slip", "Blaming one IC publicly"], 1, "Choices, not surprises."),
      sc("scope-change", "Behavioral", "Executive adds scope", 12, "Change control courage.", "PM behavioral.", "An exec adds a must-have mid-flight. What do you do?", ["Impact analysis.", "Show triangle: scope/time/cost/quality.", "Recommend a path.", "Get explicit approval.", "Document the change."], "Scope adds require:", ["Silent absorption", "Impact analysis and explicit tradeoff approval", "Automatic refusal forever", "Only email CC storms"], 1, "Make tradeoffs visible."),
      sc("risk-register", "Case", "Build a risk approach", 12, "Risk management.", "PM screen.", "How do you identify and manage risks on a 6-month launch?", ["Brainstorm with owners.", "Likelihood × impact.", "Mitigations and triggers.", "Review cadence.", "Escalate early warnings."], "Risk management is:", ["A one-time spreadsheet", "Ongoing identify, score, mitigate, review", "Ignoring unlikely risks", "Only after failure"], 1, "Living register."),
      sc("vendor-delay", "Case", "Vendor slips", 12, "External dependency.", "PM with vendors.", "A key vendor is two weeks late. Plan?", ["Contract levers.", "Parallel workstreams.", "Re-sequence critical path.", "Customer/stakeholder comms.", "Contingency vendor if needed."], "Vendor slips need:", ["Waiting silently", "Contract, re-sequence, comms, contingency", "Public insults", "Absorbing with no plan"], 1, "Dependencies are managed."),
      sc("team-conflict", "Behavioral", "Eng vs design conflict", 12, "Conflict facilitation.", "PM behavioral.", "Engineering and Design disagree on feasibility. How do you unblock?", ["Shared problem statement.", "Timeboxed spike.", "Decision criteria.", "Escalate with options if stuck.", "Protect delivery date clarity."], "Unblocking conflict:", ["Pick a side immediately", "Shared problem, spike, criteria, escalate options", "Ignore until deadline", "Endless debate"], 1, "Decide with evidence."),
      sc("status-report", "Communication", "Honest status", 8, "Status craft.", "PM interview.", "How do you write a weekly status when progress is mixed?", ["RAG with evidence.", "Accomplishments / plans / risks.", "Asks.", "No vanity green.", "Same story to all stakeholders."], "Good status includes:", ["Only green smileys", "Evidence-based RAG, risks, and asks", "Different stories per audience secretly", "No next steps"], 1, "One truth."),
      sc("resource-fight", "Case", "Shared resources", 12, "Prioritization across projects.", "PMO interview.", "Two projects need the same scarce specialist. How do you decide?", ["Company priority criteria.", "Critical path impact.", "Alternatives: train, outsource, sequence.", "Escalate to portfolio owner.", "Communicate decision."], "Resource conflicts need:", ["Whoever yells loudest", "Priority criteria and portfolio decision", "Secret side deals", "Burning out the specialist"], 1, "Portfolio > local optimum."),
      sc("quality-vs-date", "Case", "Quality vs date", 12, "Tradeoff leadership.", "PM screen.", "Leadership wants the original date but QA finds severity-1 bugs. What do you recommend?", ["Risk of shipping.", "Partial release options.", "Hardening window.", "Customer impact.", "Decide explicitly, don’t waffle."], "Severity-1 near launch:", ["Ship silently", "Explicit tradeoff: fix, slip, or limited release", "Ignore QA", "Only blame developers"], 1, "Name the risk."),
      sc("kickoff", "Case", "Run a kickoff", 10, "Start right.", "PM interview.", "What must a project kickoff achieve?", ["Goals and non-goals.", "Roles/RACI.", "Timeline and milestones.", "Risks and comms plan.", "Definition of done."], "Kickoffs fail without:", ["Pizza only", "Goals, roles, plan, risks, done criteria", "A RACI", "Milestones"], 1, "Alignment is the deliverable."),
      sc("why-pm", "Closing", "Why PM here", 8, "Motivation.", "Hiring manager.", "Why project management in this environment?", ["Delivery problem you’re drawn to.", "How you lead without authority.", "90-day stabilize plan.", "Ask how success is measured.", "Avoid ‘I like organizing’ alone."], "Strong closes:", ["Only personality clichés", "Delivery problem + influence + 90-day plan", "No metrics curiosity", "Guaranteed zero risks"], 1, "Outcomes over tidiness."),
    ],
  },
);

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function renderSc(s) {
  const pb = s.playbook.map((p) => `          '${esc(p)}'`).join(",\n");
  const ch = s.choices.map((c) => `            '${esc(c)}'`).join(",\n");
  return `      q(
        '${s.slug}',
        '${esc(s.stage)}',
        '${esc(s.title)}',
        ${s.minutes},
        '${esc(s.summary)}',
        '${esc(s.scenario)}',
        '${esc(s.interviewer)}',
        [
${pb},
        ],
        d(
          '${esc(s.prompt)}',
          [
${ch},
          ],
          ${s.answer},
          '${esc(s.explain)}',
        ),
      )`;
}

function renderTrack(t) {
  const body = t.scenarios.map(renderSc).join(",\n");
  return `  {
    slug: '${t.slug}',
    role: '${esc(t.role)}',
    setting: '${esc(t.setting)}',
    blurb: '${esc(t.blurb)}',
    scenarios: [
${body},
    ],
  }`;
}

const header = `import type { JobTrack } from './lessons-types';
import { q, d } from './scenario-factory';

/** Major business-role interview tracks (10 scenarios each). */
export const BUSINESS_JOB_TRACKS: JobTrack[] = [
`;

// Actually avoid circular imports - put types+factory inline in generated file
const betterHeader = `import type { Debrief, InterviewScenario, JobTrack } from './lessons';

function q(
  slug: string,
  stage: string,
  title: string,
  minutes: number,
  summary: string,
  scenario: string,
  interviewer: string,
  playbook: string[],
  debrief: Debrief,
): InterviewScenario {
  return { slug, stage, title, minutes, summary, scenario, interviewer, playbook, debrief };
}

function d(
  prompt: string,
  choices: [string, string, string, string],
  answerIndex: 0 | 1 | 2 | 3,
  explain: string,
): Debrief {
  return { prompt, choices: [...choices], answerIndex, explain };
}

/** Major business-role interview tracks (10 scenarios each). */
export const BUSINESS_JOB_TRACKS: JobTrack[] = [
`;

// Circular: business-tracks imports from lessons which imports business-tracks.
// Fix: export types from lessons-types OR define types only in lessons and use duplicate local types in business-tracks without importing JobTrack from lessons.

const standaloneHeader = `export type Debrief = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

export type InterviewScenario = {
  slug: string;
  stage: string;
  title: string;
  minutes: number;
  summary: string;
  scenario: string;
  interviewer: string;
  playbook: string[];
  debrief: Debrief;
};

export type JobTrack = {
  slug: string;
  role: string;
  setting: string;
  blurb: string;
  scenarios: InterviewScenario[];
};

function q(
  slug: string,
  stage: string,
  title: string,
  minutes: number,
  summary: string,
  scenario: string,
  interviewer: string,
  playbook: string[],
  debrief: Debrief,
): InterviewScenario {
  return { slug, stage, title, minutes, summary, scenario, interviewer, playbook, debrief };
}

function d(
  prompt: string,
  choices: [string, string, string, string],
  answerIndex: 0 | 1 | 2 | 3,
  explain: string,
): Debrief {
  return { prompt, choices: [...choices], answerIndex, explain };
}

/** Major business-role interview tracks (10 scenarios each). */
export const BUSINESS_JOB_TRACKS: JobTrack[] = [
`;

console.log("partial tracks", tracks.length);
writeFileSync(join(__dirname, "business-tracks-partial.json"), JSON.stringify(tracks, null, 2));
console.log("wrote partial json — continuing in second script");
