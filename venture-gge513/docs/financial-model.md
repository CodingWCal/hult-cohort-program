# Financial model

> Every number below is one of three kinds, and each is labelled:
> **ACTUAL** (read from production or a bill), **EST** (estimated from public
> price sheets or founder time, basis stated), or **ASSUMPTION** (a modeling
> input George has not ruled; scenarios carry it, the plan does not assert it).
> Revenue to date is $0 and no row below pretends otherwise.

## 1. Current state (ACTUAL, as of 2026-08-16)

| Line | Amount | Note |
|---|---|---|
| Revenue | $0 | Live instance takes no fee (`/partners`) |
| Paying customers | 0 | |
| Signed pipeline | 0 | Buyer shortlist drafted, parked until after the substrate sitting |
| Unique users | not produced | Lock 4; see `metrics-snapshot.json` |
| Aggregate actions | match 1 · pick 17 · share 14 · claim 1 | Production `/api/metrics`, 2026-08-16 |
| Supply side | 1 of 31 builders claimed | Adverse datum, carried, not spun |

## 2. The pricing frame

**Ruled (2026-08-14):** program money — per instance, per season, invoiced,
setup included. No free pilots; a deliberately small first invoice is allowed,
zero is not, because the success test is the renewal verdict and a $0 instance
cannot fail it.

**Ruled (George, 2026-08-16): the anchor is M — $6,000 per season.** S and L
remain in the model as sensitivity bounds, not as offers.

| Scenario | Season price | What it represents |
|---|---|---|
| S — small first invoice | $3,000 | Sensitivity floor: the smallest invoice the no-free-pilots ruling allows; knowingly loses on imputed labor in season one |
| **M — the ruled anchor** | **$6,000** | In range of what bounded-group operators pay for one program tool for a season (comparable: program-management software commonly runs $5k–15k/yr — order of magnitude from public pricing pages, not audited this session) |
| L — setup-heavy premium | $12,000 | Sensitivity ceiling: prices the standing-up (roster seeded from public facts, lines written, layout computed) as the service it is |

A season is modeled as ~13 weeks, 2 sellable seasons per operator per year.

## 3. Per-instance unit economics (one season)

**Cost of goods, run (EST from public provider pricing; verify before the
first invoice is drafted):**

| Item | Per season | Basis |
|---|---|---|
| Hosting (Vercel Pro) | ~$60 | $20/mo × 3 months, one project |
| Database (Neon) | ~$60 | ~$19/mo launch tier, one instance schema |
| Model spend, matching | ~$10–40 | ~1–4¢ per explained match (short prompt + short completion); 500–1,000 matches/season; keyword fallback is $0 |
| Model spend, setup | ~$10–30 | One-time line generation for a 30–60 person roster |
| **Infra COGS total** | **~$150–200** | |

**Cost of goods, labor (EST, founder time):**

| Item | Time | Imputed at $800/day |
|---|---|---|
| Instance setup (roster, lines, layout, deploy) | 2–4 days | $1,600–3,200 |
| Season operations (check-ins at 30/60/90, roster corrections) | ~1 day | ~$800 |
| **Labor total, first season** | **3–5 days** | **$2,400–4,000** |

**Contribution per first season (price − infra − imputed labor):**

| | S ($3k) | M ($6k) | L ($12k) |
|---|---|---|---|
| Infra margin | 94% | 97% | 98.5% |
| After imputed labor (midpoint $3.2k) | **−$375** | **+$2,625** | **+$8,625** |
| Renewal season (setup already done, ~1 day labor) | +$2,000 | +$5,000 | +$11,000 |

The honest reading: **this is a software-margin business only at renewal.** The
first season is a service engagement; S-scenario first seasons lose money on
founder time and are justified only as the path to a renewal verdict. That is
an argument for M or L, or for S strictly as the first-invoice wedge.

## 4. LTV and CAC (ASSUMPTION-driven; the inputs are named)

- **CAC:** the ruled motion is a warm-intro demo of the live instance. No paid
  acquisition. Cost per close (EST): 5 conversations × ~2 hrs each ÷ 1 close =
  ~10 founder-hours ≈ **$1,000 imputed** per closed operator.
- **Renewal:** unknowable until a 90-day verdict exists. Modeled at 50%
  (conservative) and 70% (base) per season — the check-in questions are
  designed so an instance can fail, so these are not vanity retention numbers.
- **LTV** = season price × expected seasons. At 70% per-season renewal,
  expected seasons ≈ 3.3: S → ~$10k · M → ~$20k · L → ~$40k.
- **LTV:CAC** at M-base: ~20:1 on imputed founder cost. The ratio is high
  because the channel is the founder's network — which is also why it does not
  scale past the network without a channel this model refuses to invent.

## 5. Three-year scenarios (driver-based, not curve-fit)

Drivers: operator conversations → close rate → instances → 90-day verdicts →
renewals. All figures at the **M price ($6k/season)**; multiply by 0.5 / 2 for
S / L. Revenue is recognized per season invoiced.

| | Kill case | Conservative | Base |
|---|---|---|---|
| **Yr 1 (to Aug 2027)** conversations | 5 | 5 | 8 |
| closes | 0 | 1 | 2 |
| seasons invoiced | 0 | 1 | 3 |
| **Yr 1 revenue** | **$0 → revert to argument/lab** | **$6k** | **$18k** |
| **Yr 2** instances (renewals + new, same motion) | — | 2 | 4 |
| seasons invoiced | — | 3 | 7 |
| **Yr 2 revenue** | — | **$18k** | **$42k** |
| **Yr 3** instances | — | 3 | 6 |
| seasons invoiced | — | 5 | 11 |
| **Yr 3 revenue** | — | **$30k** | **$66k** |

**The kill case is a real column.** Five real operator conversations with zero
closes un-rules "product with a buyer" (ruling 5); the model reverts to $0 and
Latent to a lab. Deadline for those five conversations: **2026-12-31, confirmed
by George 2026-08-16.**

What the base case is **not**: a venture-scale curve. Eleven invoiced seasons
in year 3 is ~$66k — a real business only as a founder-run instrument company,
or the proof layer under a later thesis (Support). The model says so instead
of drawing the hockey stick, and the fundraising posture (§7) is consistent
with that.

## 6. Operating costs and break-even

| Line | Annual (EST) | Basis |
|---|---|---|
| Infra floor (live cohort instance) | ~$500–700 | Current Vercel + Neon + light model spend |
| Per paying instance | ~$300–400 | §3 infra, 2 seasons |
| Tools (GitHub, misc) | ~$100 | |
| **Cash cost, base case Yr 1** | **~$1.5k** | |
| Founder time | dominant | The real cost; imputed throughout, never billed to the model as $0 |

**Cash break-even is one S-priced season.** The model's real break-even is
founder-time-adjusted: **one M-priced instance that renews once** (~$11k
contribution against ~5 days setup + sales time).

## 7. Financing (ruled 2026-08-14: no raise now, trigger named)

No raise is open. The trigger: **the first paid instance passes its 90-day
verdict.** On the base case timeline — first close in fall 2026, go-live within
a month, verdict at +90 days — the trigger lands **Q1 2027**. This week's
investor touch is framed exactly that way: use the instrument now, and when
the trigger fires you are the first call. Use of funds at that point is
instance-setup capacity (the §3 labor line is the bottleneck), not marketing.

## 8. What this model refuses

- Presenting the sensitivity bounds as offers. The ruled price is $6,000/season
  (2026-08-16); S and L exist so the economics of a discount or a premium are
  visible before either is ever discussed with a buyer.
- Revenue from unique users, ads, take-rates, or private-instance sight —
  excluded by commitment (Lock 4, C3, the doctrine kill), not by pricing taste.
- Top-down SAM arithmetic ("1% of thousands of programs"). The driver is named
  conversations from a real shortlist, currently parked until the substrate
  sitting rules.
- Interview-backed willingness-to-pay. Five operator interviews are pending
  (George); until they exist, §2's comparables are the only external anchor
  and are labelled as unaudited.
