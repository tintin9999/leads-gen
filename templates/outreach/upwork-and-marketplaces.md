# Upwork and Marketplace Templates

**Facts that shape these templates (as of Nov 2026, see [platforms.md](../../lists/platforms.md)):**
- The fee is **variable, 0–15% per contract**, shown before you bid. Add **18% GST on the fee** if you're India-based. Gross up your rates.
- **Connects** cost $0.15 each. You get 10 free per month, or 100/month with Freelancer Plus ($19.99/mo). Each job shows its own Connect cost.
- **Never move a client off-platform**, and don't ask for contact details before a contract. Upwork's 24-month conversion-fee rule applies, and breaking it can get your account suspended.
- Clients mostly read the **first 2 lines** of a proposal and of your overview before deciding to open it. Put the proof there.

Placeholders: `{{CLIENT_NAME}}` `{{THEIR_DETAIL}}` `{{PRICE}}` `{{DAYS}}` `{{PORTFOLIO_URL}}` `{{LOOM_LINK}}`

---

## 1. Profile

### Title options (keep under ~70 characters)
- `Next.js + Supabase Engineer | AI-Built MVPs → Production-Ready`
- `Shopify App & Razorpay Checkout Developer | Next.js | D2C`
- `React/TypeScript Engineer | Admin Dashboards & Internal Tools`
- `Angular → React Migration | Vitest | Incremental, No Rewrite`

Use the main profile for B1/B2. If specialized profiles are available, add one for Shopify/Razorpay (A2/A3) and one for migrations (B3).

### Overview (main profile — B1/B2)
```
I take MVPs (including Lovable, Bolt, v0 and Cursor builds) to production, and I build the admin tools that run your business: auth, database security, payments, tests, CI, and dashboards your ops team will trust.

Proof:
• Built Cultus (cultus.co.in), a live marketplace, end to end: Next.js + Supabase (Postgres), OTP login, Razorpay checkout with partial COD, a custom Shopify Sales Channel app, 115 test files on money paths, 17 architecture decision records. First 4 months: 890+ users, 180+ orders.
• 4 years on Coinbase's Deribit back-office (crypto derivatives exchange): admin modules in React/TypeScript, Angular→React migration, Vitest in GitLab CI, and 4 months on the Erlang/OTP backend.
• Tax-filing module for a Belgian platform used by 100,000+ people: schema-driven dynamic forms, recursive validation, i18n, tax-year versioning.

What I do most:
→ Production-readiness audit (fixed price, 3–4 days): Supabase RLS & auth review, payments, error handling, performance, CI/monitoring gaps, with a prioritized fix plan
→ Hardening sprints: implement the plan, add tests, set up CI/CD and monitoring
→ Internal tools: RBAC, approval flows, audit logs, complex forms

How I work: fixed-price milestones, daily async updates, clean handover in your repo. IST hours overlap with US evenings and UK/EU mornings.

Send me your repo or a 2-minute Loom of the app and I'll reply with what I'd check first.
```

### Overview (specialized — Shopify & Razorpay for D2C)
```
I build the Shopify and payments plumbing that D2C brands lose money on: custom apps and integrations, Razorpay checkout and COD rules, and store speed.

• Built a custom Shopify Sales Channel app (Cultus marketplace): brands publish from Shopify admin, inventory syncs via webhooks every minute plus a nightly reconciliation, and orders flow back to the brand's store.
• Integrated Razorpay Magic Checkout with partial COD for high-risk pincodes, signature-verified webhooks, and scheduled retries for failed refunds.
• Next.js storefronts and admin panels on Vercel + Supabase.

Fixed-price packages: Store Speed Sprint · Custom/Private App · Razorpay & COD setup · Headless storefront.
```

### Portfolio items (minimum 3 before you send proposals)
1. **Cultus marketplace**: screenshots, architecture diagram, metrics, your role.
2. **Shopify Sales Channel app**: sync-flow diagram (webhooks + reconciliation).
3. **Production-readiness audit sample**: a redacted audit of your own demo app. Build one for this ([memo 09](../../memos/09-portfolio-and-brand.html)).
4. **Bro Discord bot**: 10k+ servers, 10 shards, Prometheus/Grafana.
5. **Admin dashboard demo**: RBAC + approval flow demo app (spec project).

---

## 2. Project Catalog listings (fixed-price packages)

### Catalog A1 — "Speed up your Shopify store on mobile (Core Web Vitals)"
| Tier | Price (USD, global buyers) | Delivery | Includes |
|---|---|---|---|
| Starter | $150 | 3 days | PageSpeed/CWV audit of 3 templates, 10-point fix list, Loom walkthrough |
| Standard | $450 | 7 days | Starter + implementation of the top 5 fixes (images, app scripts, fonts, lazy-loading) + before/after report |
| Advanced | $900 | 12 days | Standard + theme code cleanup, app audit (remove or replace), checkout friction review |

*For Indian brands, sell A1 direct in ₹ (₹25k–60k). Use the Catalog for global Shopify merchants.*

### Catalog B1 — "Production-readiness audit for your Lovable / Bolt / v0 / Supabase app"
| Tier | Price | Delivery | Includes |
|---|---|---|---|
| Quick check | $300 | 2 days | Supabase RLS & auth review, secrets exposure, top-10 risk list |
| Full audit | $900 | 4 days | Quick check + payments/webhooks, error handling, performance, tests/CI/monitoring gaps, prioritized fix plan with estimates |
| Audit + fixes | $2,500 | 10 days | Full audit + implementation of the critical/high fixes + a basic test suite + CI |

*Every tier includes a call, and testing only happens on environments the client authorizes in writing.*

---

## 3. Proposal templates (120–180 words; the first 2 lines decide everything)

**Formula:** (1) their problem restated with a detail from the post → (2) the most relevant proof → (3) a mini-plan → (4) one smart question → (5) the price/timeline frame.

### P-A2 — Shopify custom app / integration job
```
You need {{THEIR_DETAIL — e.g., "Shopify orders pushed to your warehouse system with inventory kept in sync"}}. I built almost exactly this for the Cultus marketplace: a Shopify Sales Channel app with webhook-driven inventory sync (processed every minute) plus a nightly reconciliation job to catch drift.

How I'd approach yours:
1. Map the data flow (products, inventory, orders, refunds) and failure cases
2. Build the app with idempotent webhook handlers + a reconciliation job
3. Test against a dev store, then roll out with monitoring

Question: is {{SYSTEM}}'s API real-time, or will we need polling?

Fixed price for v1 after a 20-min scoping call: typically {{PRICE_RANGE}}, {{DAYS}} days. Portfolio: {{PORTFOLIO_URL}}
```

### P-A3 — Razorpay / payments job
```
Payments are the one thing you can't half-build. I integrated Razorpay Magic Checkout on a live marketplace (partial COD for high-risk pincodes, signature-verified webhooks, scheduled retries for failed refunds), with automated tests on every money path.

For {{THEIR_DETAIL}}, I'd:
1. Set up the checkout + webhook verification in test mode
2. Handle the edge cases (duplicate events, partial captures, refunds, timeouts)
3. Add reconciliation so your dashboard matches Razorpay's settlement reports

Question: do you need COD rules (by pincode or order value), or prepaid only?

{{PRICE}} fixed, {{DAYS}} days.
```

### P-B1 — "Fix/finish my Lovable/Bolt/AI-built app"
```
Your app works in the demo. Now it needs to survive real users. I'd start with a 2-day audit before writing any code: Supabase RLS policies on every table (the #1 issue in AI-built apps; a 2025 CVE found ~10% of Lovable showcase apps exposed), auth flows, secrets, and payment edge cases.

Then I'd fix in priority order: security first, then the bugs you listed ({{THEIR_DETAIL}}), then tests + CI so future changes don't break things.

Relevant: I built a live Next.js + Supabase marketplace with 115 test files on payment paths, and spent 4 years on Coinbase's Deribit back-office.

Question: who are your users right now: internal testers, or paying customers?

Milestone 1 (audit + fix plan): ${{PRICE}}. Milestone 2 (fixes): quoted from the audit.
```

### P-B2 — Admin dashboard / internal tool
```
For 4 years I built admin dashboards for Coinbase's Deribit exchange: user management, Block RFQ, permission and approval layers. That's exactly the "must never be wrong" kind of tool you're describing in {{THEIR_DETAIL}}.

Plan: (1) workshop your workflows + roles, (2) data model + RBAC first, (3) screens with audit logs and approvals, (4) tests on permission logic.

Question: which actions need a second person's approval today?

Phase 1 (workflow map + clickable prototype): ${{PRICE}}, 1 week.
```

### P-B3 — Angular → React migration
```
I migrated Deribit's (Coinbase) back-office admin features from Angular to React module by module, without a rewrite and without freezing feature work, and introduced Vitest into GitLab CI first, so every step was covered.

For {{THEIR_DETAIL}}, I'd start with a 1-week assessment: module inventory, shared-state map, a strangler plan (React inside the Angular shell or vice versa), and a risk-ordered sequence.

Question: AngularJS (1.x) or modern Angular? The path differs a lot.

Assessment: ${{PRICE}} fixed.
```

### P-GEN — Next.js app build (generic)
```
{{THEIR_DETAIL}}: I've built exactly this stack in production (Next.js + Supabase on Vercel, OTP auth, Razorpay, cron jobs) for a live marketplace with 890+ users. I'll ship it in milestones with a demo at the end of each, so you're never guessing.

Question: {{ONE_SHARP_QUESTION}}

Milestone 1 ({{DELIVERABLE}}): ${{PRICE}}, {{DAYS}} days.
```

---

## 4. Screening-question answers (adapt, don't paste blindly)

**"Describe your recent experience with similar projects."**
```
Most relevant: {{ONE PROJECT THAT MATCHES}}. I owned it end to end: {{2 specifics}}. Result: {{metric}}. Happy to walk you through the code structure on a call.
```

**"What questions do you have about the project?"**
Ask 1–2 that show expertise: *"Are webhooks idempotent today, or do duplicate events cause double-processing?"* · *"Is RLS enabled on all tables, or are you relying on API routes?"* · *"What's the acceptance test for done?"*

**"Include a link to your GitHub / work."**
Link the case study page (`{{PORTFOLIO_URL}}`) plus a public repo of a spec project. Never share client code.

**"What's your availability / when can you start?"**
`I can start {{DATE}} and dedicate {{HOURS}} hrs/week. I post daily async updates and overlap with your morning/evening ({{TIMEZONE}}).`

**"Do you agree to a free test task?"**
`Happy to do a short paid trial (fixed price, 2–4 hours) so you can judge my work on something real.` Never do free work longer than ~30 minutes. Malicious "test repos" are a real attack vector ([memo 11](../../memos/11-risks-and-scams.html)): run unknown code only in a VM or devcontainer.

---

## 5. Contra profile (copy for the bio)
```
Product engineer for commerce & internal tools. I take AI-built and rushed MVPs to production and build Shopify/Razorpay plumbing for D2C brands. Built the Cultus marketplace end to end · 4 yrs on Coinbase's Deribit back-office. Fixed-price audits and sprints.
```
Add the same 3 portfolio items plus the A1/B1 packages as Contra "services".

## 6. Talent-network applications (Arc, Flexiple, Braintrust, Toptal)
- **Resume headline:** `Product engineer — React/Next.js/TypeScript, Supabase/Postgres, Node · Shopify & payments · 4 yrs incl. Coinbase's Deribit`
- **Prep for live screens:** 10–14 days of timed problems (arrays, hashing, BFS/DFS, intervals) + build a small React feature live while narrating trade-offs.
- **Rate to state:** $45–55/hr. The network adds its markup, so don't undercut yourself.
- **Availability:** say "20–40 hrs/week, contract". Being flexible gets you matched faster.
