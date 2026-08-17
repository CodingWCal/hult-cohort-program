# Latent — Business Plan

## Executive summary

Latent is a proximity engine. A visitor says one sentence about what they are
trying to do. The engine reads that sentence against what real people have
actually done — in public, verifiably — and develops the two or three whose
work sits closest, each with a written reason. The visitor picks one and leaves
with a message ready to send.

It is live at [latent-nu.vercel.app](https://latent-nu.vercel.app). Visitors
have no accounts and nothing they type is stored. A person becomes reachable
only by claiming their own card.

The business: **operators of bounded groups** — accelerators, fellowships,
residencies, professional associations — **pay $6,000 per season to run an
instance** on their group's public work. Each instance is stood up as a
service (roster seeded from public facts, match reasons written, deployed) and
renewed or not on the operator's own verdict at 90 days.

Latent is pre-revenue. The first deployment is live and producing real usage
data. The sales motion is a warm-introduction demo of that live instance. The
plan carries its own kill condition — five real operator conversations with
zero closes by December 31, 2026, ends the commercial thesis — and no raise is
open: fundraising begins the day the first paid instance passes its 90-day
verdict.

## The problem

Capability exists in greater supply than the infrastructure to reach it. The
person who can most help you is usually someone just ahead of you — who has
already done the adjacent thing and could pull you along. Every existing tool
fails to produce that person:

- **Directories match on claims** — titles, bios, "open to work."
- **Feeds match on recency** — whoever posted last.
- **Marketplaces match on inventory** — which treats people as stock, the
  category's recurring mistake.

The sharing economy made idle physical capacity reachable: cars, rooms,
machines. The equivalent move has not been made for human capability, because
a person is not idle inventory. The skill is latent — present, real, and
invisible until something develops it.

The buyer who feels this concretely is the operator of a bounded group. An
accelerator director with 31 builders cannot point an arriving visitor — a
potential customer, collaborator, or investor for someone in the room — at the
two people whose work actually fits. The answer today is "browse our
directory," and the connection dies there.

## The product

Latent is a darkroom, not a marketplace. The visitor is the photographer: they
bring the sentence. The engine develops the print fast — two or three people,
with written reasons grounded in each person's actual public work. Judgment
stays with the visitor; the site never claims taste. If the match cannot be
explained, it is not shown: an unexplained match is a horoscope.

Four commitments are built into the product's structure, not its settings:

1. **Match on public work, never on bios.** The substrate is what people have
   verifiably done.
2. **Reachability is opted in.** An unclaimed person can be *seen* but not
   *contacted* — latent capacity cannot be mailed. Claiming your card is the
   single consent gate, and it is the person's own.
3. **Count actions, never people.** The events table has no name, handle, or
   IP column. Matches run and messages composed are counted; who did them is
   not stored. A leaderboard — or a surveillance report — cannot be built even
   by accident.
4. **No asymmetric sight.** No customer gets a private view of other people
   that those people cannot see themselves.

These commitments are also the moat: every competitor's business model
requires breaking at least one of them.

## First deployment

The live instance runs on a 31-person summer builder cohort. Production
metrics as of August 16, 2026 (from the public endpoint,
[/api/metrics](https://latent-nu.vercel.app/api/metrics)):

| Signal | Count | Reading |
|---|---|---|
| Composed messages taken to send | 14 | The core demand-side gesture: a visitor left with a specific message to a specific person |
| Picks (a visitor chose a developed match) | 17 | Judgment exercised at the door |
| Builders who claimed their card | 1 of 31 | The honest adverse datum: supply-side consent is the hard part |

Two readings, both true. The instrument works: visitors arrive with a real
sentence and leave with a real message — the "front door" job the operator
would be buying. And the consent gate is currently where connections die: one
claimed card means thirteen of those fourteen messages had nowhere to land.
The commercial bet is that an operator who *wants* the front door to work will
get their members to claim — something a consent-respecting product cannot and
should not force. That bet is tested by the 90-day verdict below, not asserted
here.

Unique-visitor counts are not reported because they are not collected — that
is commitment 3, not a measurement gap.

## Market

**The buyer** is the operator of a bounded group whose members' work is
already public: accelerators, fellowships, residencies, studio programs,
professional associations. Program directories (F6S and similar) put the
population of such programs in the thousands globally; that figure bounds the
opportunity and has not been independently audited for this plan. **The user**
is the visitor with a sentence — and the visitor never pays.

This is deliberately not a play for the professional graph. LinkedIn has a
billion members because it owns identity-as-claims; Latent refuses claims as a
substrate, so the markets do not overlap. One accelerator that renews is worth
more to this plan than any top-down share of a billion-member category.

**One design decision is still open** and disclosed: the exact evidence base
instances match on — the current deployment uses the group's shared public
work, and whether that generalizes as-is, or shifts toward curated or
self-authored material, is under active evaluation. If it moves away from
bounded public work, the target market described here changes with it, and
this plan would be rewritten rather than patched.

## Competition

| Competitor | Matches on | Takes | Why Latent is not them |
|---|---|---|---|
| LinkedIn | Claims, titles, the graph | The graph; reach is rented back | No public-work substrate; ranking and ads |
| Wellfound / talent boards | Applied interest | Applicant flow | A job board, not proximity |
| Contra and talent marketplaces | Portfolios | A take-rate on contracts | People as inventory |
| Lunchclub-style intro products | Calendars and stated interests | The introduction itself | No receipts — unexplained matches |
| X / social search | Recency and follows | Attention | Not a match, not explained |

Positioning on two axes — evidence, and who holds reachability:

- High evidence, platform-held reach → talent marketplaces.
- Low evidence, person-held reach → social intro products.
- Low evidence, platform-held reach → directories.
- **High evidence, person-held reach → Latent.**

## Business model and pricing

**$6,000 per instance, per season** (~13 weeks), invoiced, setup included.
Each instance is stood up, not spun up: roster seeded from the group's public
facts, match reasons generated and reviewed, layout computed, deployed on the
group's own surface.

**What the operator buys: the front door.** Their group becomes the best
answer to "who here should I talk to?" that an arriving outsider has ever
gotten — measured at the door, in matches run and messages taken to send.
Whether a connection ultimately landed is deliberately invisible to the
product (commitment 3), so that evidence comes from the operator's own
check-ins, which is exactly why the success test below belongs to the
operator.

**No free pilots.** The success test is the operator's renewal verdict, and a
$0 instance cannot fail that question — there is nothing to decline to renew.
A deliberately small first invoice is acceptable; zero is not.

**What is never sold:** visitor access to matches, builder visibility,
private instances with asymmetric sight, or a take-rate on connections. These
are commitments, not pricing experiments — several of them are also where the
unit economics of competing products live, which is the point.

## Go-to-market

**The motion: demo the live instance off a warm introduction.** Ten seconds
to a working match, then one sentence: "this, running on your group's public
work, in a season." The sale is showing, not describing.

**Refused, on the record: unsolicited instances.** Standing up an instance of
a target group's real people who never asked, as a sales motion, is the
people-as-inventory move this product exists to reject. This is a commitment,
not a tactic under review.

**The slow channel:** published writing about the proximity thesis continues
in the background with no expectations attached to it this quarter.

## Success test and kill condition

**A paid instance passes or fails on the operator's structured verdict at 30,
60, and 90 days** — did introductions route through it, do members report
being reached, would the operator renew at the stated price. The check-in
questions are written before go-live and written so the instance can *fail*
them ("name an introduction that did NOT route through the front door"),
because a friendly operator answering vague questions produces a verdict that
can only pass.

**The kill condition: five real operator conversations, zero closes, by
December 31, 2026.** If nobody buys after five genuine attempts, the
buyer thesis is falsified and Latent reverts to what it also is — a working
argument and a research instrument. A failed instance verdict triggers
iteration; a market that will not pay triggers exit. The kill sits on the
commercial claim, not the product, on purpose.

## Unit economics

| | First season | Renewal season |
|---|---|---|
| Infrastructure (hosting, database, model spend per explained match) | ~$150–200 | ~$150–200 |
| Founder time (setup: roster, reasons, deploy; then 30/60/90 check-ins) | 3–5 days | ~1 day |
| Contribution at $6,000, after imputed labor ($800/day) | ~+$2,600 | ~+$5,000 |

Infrastructure margin is 94–98% at any plausible price; the estimates come
from public provider pricing. The structural truth: **this is a
founder-time-bound service in season one and a software-margin business at
renewal.** That asymmetry is why the renewal verdict, not the initial sale, is
the metric everything else in this plan points at.

Customer acquisition under the warm-intro motion costs roughly ten
founder-hours per close. Lifetime value depends on per-season renewal, which
cannot be known before a first verdict exists; the financial model runs 50%
and 70% and labels both as assumptions.

## Financial projections

Driver-based, at the set price: conversations → closes → 90-day verdicts →
renewals. Full model with assumptions in `financial-model.md`.

| | Kill case | Conservative | Base |
|---|---|---|---|
| Year 1 | $0 — thesis falsified, revert to research | $6k (1 instance) | $18k (2 instances, 3 seasons) |
| Year 2 | — | $18k | $42k |
| Year 3 | — | $30k | $66k |

The kill case is a real column, and the base case is stated for what it is: a
founder-run instrument company doing tens of thousands, not a venture-scale
curve. Cash costs are ~$1.5k/year at base; cash break-even is a single season,
and founder-time break-even is one instance that renews once. The financing
posture below is consistent with these numbers — that consistency is offered
as evidence the rest of the plan can be believed.

## Roadmap (12 months)

1. **Now:** first operator conversations from a shortlist of warm seats, using
   the live deployment as the demo.
2. **First close:** instance #1 stood up within a month of signature;
   check-in instrument drafted before go-live.
3. **Day 90:** the first verdict. Renewal starts the fundraising conversation;
   failure iterates the instance; five unclosed conversations by year-end ends
   the thesis.
4. **Later, gated:** a mission deployment for patients and families seeking
   help — the founder's long-term motivation for this product — inherits the
   model only after it has survived commercial contact. Nothing ships to that
   audience first.

What the roadmap refuses at any stage: individual-user tracking, ranking
people, private instances, selling reach.

## Team

George Eastwood, founder. The operating model is a solo founder directing a
structured team of chartered AI seats — the model that built and shipped this
product and its predecessors, and the reason instance setup costs days rather
than weeks. No hires in year one unless a signed instance demands one.

## Financing

**No raise is open.** Fundraising begins when the first paid instance passes
its 90-day verdict — on the base case, the first quarter of 2027. Investors
this plan reaches before then are asked for exactly one thing: use the live
instrument, say what you saw, and be the first call when the trigger fires.
Use of funds at that point is instance-setup capacity, the one bottleneck the
unit economics name.

## Risks

| Risk | Why it is real | Response |
|---|---|---|
| Supply side does not claim | 1 of 31 in the first deployment; consent cannot be forced | The operator's incentive to activate their members is part of what is being sold; tested at 30/60/90, not assumed |
| The market will not pay | Pre-revenue; zero closes to date | The kill condition exists for exactly this, with a date |
| The evidence-base decision moves | Disclosed above; the market definition follows the substrate | Rewrite, not patch |
| Category gravity toward marketplace | A take-rate is the obvious business one door over | Refused by commitment; the mission deployment makes the guardrail permanent |
| Founder bottleneck | One person; setup and sales are founder-time-bound | Priced into unit economics; first use of any future funds |
