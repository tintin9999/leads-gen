# Agency Partnership Templates (white-label and overflow)

**Why agencies:** they already have clients and sales teams, and they routinely run out of developer capacity. One good agency partner can send **recurring work for years** without you selling to each end client. Target small agencies (2–49 people): **Shopify agencies**, **design/brand studios with no in-house developers**, **performance-marketing agencies serving D2C** (their clients keep asking them to "fix the site"), and **no-code/AI-build agencies** that hit the limits of their tools.

**Economics:** agencies resell you at a markup, so they expect a **partner rate 20–30% below your direct rate**. In exchange you get volume, no sales cost, and reliable payment. **Never go below your floor** (₹1,200/hr · $35/hr). Price per package where you can.

Placeholders: `{{FIRST_NAME}}` `{{AGENCY}}` `{{SPECIFIC_DETAIL}}` `{{YOUR_NAME}}` `{{PORTFOLIO_URL}}` `{{CAL_LINK}}` `{{PARTNER_RATE}}`

CRM: `segment=agency-partner`, `source=agency`.

---

## 1. First email (or LinkedIn message after connecting)

**Subject:** `overflow dev capacity for {{AGENCY}}`

```
Hi {{FIRST_NAME}},

I've been looking at {{AGENCY}}'s work. {{SPECIFIC_DETAIL — e.g., "the {{CLIENT_PROJECT}} store redesign is lovely"}}.

I'm a product engineer in Pune who partners with agencies when they have more projects than developers. I work white-label: under NDA, inside your process and your PM tools, and your brand faces the client.

What I'm strongest at:
• Shopify: custom apps, integrations, speed work, Razorpay/COD checkout (I built the Cultus marketplace's Shopify Sales Channel app)
• Next.js / React: headless storefronts, web apps, admin dashboards (4 years on Coinbase's Deribit back-office)
• Supabase / Node backends, plus getting AI-built prototypes production-ready

My hours are IST, so I overlap with UK mornings and US evenings, and your client's work moves overnight.

Would a 15-minute call make sense, so I can learn how you staff projects today?

{{YOUR_NAME}} · {{PORTFOLIO_URL}}
```

## 2. Follow-up (day 5)

```
Hi {{FIRST_NAME}}, a simple way to try me with zero risk: send me one small ticket from your backlog (a bug, a section, an integration). I'll do it at a fixed price, and you judge the code and communication before committing to anything bigger.
```

## 3. Discovery call questions (agency-specific)
1. How do you staff development today: in-house, freelancers, offshore teams?
2. When did you last turn down or delay a project because of capacity?
3. Which work do you avoid quoting because nobody on the team can do it? (custom Shopify apps, integrations, headless builds?)
4. How do you run projects: tools, standups, QA, code review, client communication?
5. How do you pay contractors: per project or hourly? What are your payment terms?
6. What would make a partner a "never again" for you?

## 4. Partner one-pager (send after the call; also put it on your site)

```
{{YOUR_NAME}} — White-label engineering partner for agencies

WHAT I BUILD
• Shopify: custom/private apps, Sales Channel integrations, theme performance, Razorpay & COD flows
• Next.js/React: headless storefronts, web apps, admin dashboards
• Backends: Node, Supabase/Postgres, webhooks, background jobs
• Production hardening: auth, RLS, payments, tests (Vitest), CI

HOW I WORK WITH AGENCIES
• White-label: NDA by default; I never contact your clients directly unless you ask
• Your tools: Jira/Linear/ClickUp/Asana, your Git org, your Slack
• Async daily updates; IST hours overlap UK mornings, US evenings
• Fixed-price packages where possible; otherwise hourly at partner rate
• Code: tested, documented, handed over in your repo

PARTNER RATES
• Partner rate: {{PARTNER_RATE}} (20–30% below direct)
• Small-ticket pilot: fixed price, invoiced on completion
• Retainer: reserved hours/month at a further discount

PROOF
• Cultus marketplace: Next.js + Supabase, Razorpay Magic Checkout w/ partial COD, custom Shopify Sales Channel app (890+ users, 180+ orders in 4 months)
• Coinbase's Deribit: back-office admin modules, Angular→React migration, Vitest in CI
• Twinntax: tax-filing module used by 100k+ users

CONTACT: {{YOUR_EMAIL}} · {{CAL_LINK}} · {{PORTFOLIO_URL}}
```

## 5. Working terms to agree up front (put them in a subcontractor agreement, see [memo 07](../../memos/07-contracts.html))
- **Scope per job:** a written ticket or SOW with acceptance criteria.
- **Payment:** net 15 from invoice. 50% upfront on any first project over ₹50k or $1,000. Small pilots are invoiced on completion.
- **IP:** assigned to the agency (or its client) **on full payment**.
- **Non-solicitation of the agency's clients:** reasonable (12 months) and limited to clients you met through the agency. It's fair, and agencies insist on it.
- **Credit:** ask whether you may list the project anonymously in your portfolio ("a D2C fashion brand via a UK agency").
- **Change requests:** anything outside the ticket gets re-quoted before work starts.
- **Communication:** who talks to the end client, and how bugs reported after delivery are handled.

## 6. Retainer pitch (after 2–3 successful jobs)

```
Hi {{FIRST_NAME}}, the last three projects went smoothly, so here's a proposal: I reserve {{HOURS}} hours/month for {{AGENCY}} at {{RETAINER_RATE}}, with priority scheduling and a 1-business-day response time. Unused hours roll over for one month. That way you can quote dev-heavy projects knowing the capacity is there. Want me to draft it?
```

## Where to find agencies
See [lead-sources.md](../../lists/lead-sources.md) → *Agencies to partner with* (Clutch, GoodFirms, Shopify Partner Directory, Dribbble/Behance, LinkedIn). Target: **30 agencies contacted in weeks 2–4, 3 pilots, 1 retainer.**
