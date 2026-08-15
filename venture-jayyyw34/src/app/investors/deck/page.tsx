const slides = [
  {
    kicker: "01 · Title",
    title: "LocalPlate",
    body: "Tonight’s dinner, from a kitchen on your block. A micro-marketplace connecting home cooks and bakers with neighborhood buyers.",
  },
  {
    kicker: "02 · Problem",
    title: "The homemade economy is stuck in DMs.",
    body: "Cooks already sell extra trays through Instagram, WhatsApp, and Nextdoor. Buyers cannot browse what’s actually available tonight. National delivery apps optimize for chains and 25–30% take rates, not a six-plate home menu.",
  },
  {
    kicker: "03 · Solution",
    title: "Daily menus. Neighborhood pickup.",
    body: "Cooks post one dish, a price, a pickup window, and remaining servings. Neighbors filter by block and reserve a plate. LocalPlate coordinates demand. It does not run a driver network.",
  },
  {
    kicker: "04 · Product",
    title: "What shipped in this pilot",
    body: "Browse tonight’s boards, join as cook or neighbor (no password maze), list a dish, reserve a plate, privacy + metrics + error logging. Seeded Greater Boston kitchens keep the board alive for first-time visitors.",
  },
  {
    kicker: "05 · Market",
    title: "Food away from home is huge. Our wedge is small on purpose.",
    body: "USDA ERS tracks well over $1T in food-away-from-home spending. Delivery incumbents already tax that flow. LocalPlate’s SAM is informal / cottage / shared-kitchen supply in one metro — starting with Greater Boston — not a claim on all restaurant GMV.",
  },
  {
    kicker: "06 · Competition",
    title: "We are not DoorDash with a gingham filter.",
    body: "DoorDash / Uber Eats: logistics + chain menus. Shef / similar: nationwide personal-chef marketplaces with heavier compliance. Facebook/Nextdoor: demand exists, no inventory, no trust layer. LocalPlate: same-day neighborhood inventory.",
  },
  {
    kicker: "07 · Model",
    title: "Take rate on reserved plates.",
    body: "Assumed 12–15% per paid reservation once payments exist. Featured cook placement as a second line. No courier payroll. Gross margin follows software, not last-mile labor. MVP does not process cards yet.",
  },
  {
    kicker: "08 · Traction",
    title: "Honest snapshot — do not invent users.",
    body: "Pilot live as a Hult Week 5 venture. Metrics are read from /api/metrics on the production deploy. Founder/handle ids containing jayyyw34 are excluded. Cohort peers can join during review week.",
  },
  {
    kicker: "09 · GTM",
    title: "One metro. Cook-led density.",
    body: "Onboard 20 cooks in 3–4 adjacent neighborhoods before spending on buyer ads. Church/group-chat cooks and bakery cottage operators first. Buyers come from the cook’s existing circle, then the public board.",
  },
  {
    kicker: "10 · Team",
    title: "Founder-built, agent-assisted.",
    body: "Built by jayyyw34 for the Hult Cohort Developer Program Summer Pilot 2026. Next hires if the pilot holds: food-safety / cottage-law counsel and a part-time cook success lead — not a 12-person org chart.",
  },
  {
    kicker: "11 · Risks",
    title: "Food law is the real boss.",
    body: "Cottage-food statutes often allow baked goods and block full meals. LocalPlate’s path is permitted items + licensed shared kitchens + clear cook attestations. Insurance and foodborne-illness liability are first-class risks, not footnotes.",
  },
  {
    kicker: "12 · Ask",
    title: "A conversation, not a fake priced round.",
    body: "Looking for one qualified investor or food-tech angel conversation: feedback on the Boston wedge, introductions to shared-kitchen operators, and whether a pre-seed check is even the right instrument. Deck lives in-repo and at /investors/deck.",
  },
];

export default function DeckPage() {
  return (
    <div className="bg-[var(--paper)] px-4 py-10 print:px-0 print:py-0">
      <div className="mx-auto max-w-3xl space-y-8 print:max-w-none print:space-y-0">
        {slides.map((slide) => (
          <section
            key={slide.kicker}
            className="min-h-[420px] break-after-page rounded-3xl border border-[var(--line)] bg-[var(--card)] p-10 print:min-h-[100vh] print:rounded-none print:border-0"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--sage)]">
              {slide.kicker}
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-tight">{slide.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              {slide.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
