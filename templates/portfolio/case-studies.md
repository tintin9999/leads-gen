# Case study drafts

> **When to use:** website case-study pages, proposal "relevant work" sections, LinkedIn Featured, DMs.
> **How to fill:** confirm every number marked `[VERIFY]`, add one architecture diagram and two screenshots per study, then get sign-off where noted.
> **Never:** publish client code, internal screenshots, customer data or internal metrics from employer/client work without written permission.

Each study comes in three lengths: **full** (page), **3-bullet** (proposals) and **one-liner** (DMs, intros).

---

## 1. Cultus: a Shopify-connected marketplace, built end to end

**Sign-off needed:** Cultus co-founders (numbers, screenshots, brand names).

### One-liner
I built Cultus end to end, a live fashion marketplace where 12 Shopify brands sync inventory every minute and checkout runs on Razorpay Magic Checkout with partial COD.

### 3-bullet version
- Built a **custom Shopify Sales Channel app**: brands publish from their Shopify admin, inventory syncs via webhooks processed every minute plus a nightly reconciliation, and orders flow back into each brand's store.
- Integrated **Razorpay Magic Checkout** with **partial COD for high-risk pincodes**, signature-verified webhooks and scheduled retries for failed refunds.
- First 4 months after the April 2026 launch: **890+ users, 180+ orders, ₹2.9L+ GMV, 12 brands, 450+ live products, 48k+ visitors**. Money paths are covered by 115 test files, and key decisions are recorded in 17 ADRs.

### Full version

**Context.** Cultus is a swipe-based marketplace that matches Gen Z shoppers with Indian homegrown fashion brands. It started as a side project with two co-founders. I own the technology and architecture.

**The problem.** A marketplace for independent brands lives or dies on two things:
1. **Onboarding friction.** Brands already run their business in Shopify and won't maintain a second catalogue.
2. **Trust in orders and money.** Overselling, failed payments and refund mistakes destroy a young marketplace's reputation with brands and shoppers.

**Constraints.** Tiny team, side-project budget, brands on different Shopify setups, COD-heavy Indian shoppers, and pincodes with high return-to-origin risk.

**Approach: key decisions**
1. **Shopify Sales Channel app instead of CSV imports.** Brands publish products from their own Shopify admin, so there's no second catalogue. *Trade-off:* app review and API complexity, in exchange for near-zero onboarding work for each brand.
2. **Webhooks for speed, nightly reconciliation for truth.** Inventory webhooks are processed every minute, and a nightly job reconciles against Shopify to catch missed or out-of-order events. *Trade-off:* extra job complexity, in exchange for no silent drift.
3. **Orders flow back into the brand's Shopify store**, so fulfilment stays in tools brands already use.
4. **Razorpay Magic Checkout with partial COD for high-risk pincodes.** Collect a small prepaid amount where RTO risk is high. Signature-verified webhooks and scheduled refund retries make payment state reliable.
5. **Tests where money moves.** 115 test files cover pricing, refunds, coupons and Shopify sync. 17 architecture decision records explain the *why* for future contributors.

**Stack.** Next.js (storefront, brand dashboard, admin), Supabase (PostgreSQL) with OTP login, Vercel (serverless + cron), Razorpay, Shopify Admin API. A Python/FastAPI recommendation service with CLIP embeddings is being integrated `[VERIFY status]`.

**Results (first four months after the April 2026 launch).**
| Metric | Value |
|---|---|
| Registered users | 890+ |
| Orders | 180+ |
| GMV | ₹2.9L+ |
| Brand partners | 12 |
| Live products | 450+ |
| Site visitors | 48,000+ |

**Quote.** `[Ask a brand partner: "Onboarding took us X minutes; inventory has never gone out of sync."]`

**Call to action.** *Running a D2C brand on Shopify and fighting slow pages, flaky integrations or COD losses? Book a 20-minute call.*

---

## 2. Back-office tooling for a crypto derivatives exchange

**Sign-off needed:** check your Noovosoft employment terms and any client NDA. Default to the anonymised version unless you're sure you may name details.

### One-liner
I built admin tooling for Deribit (Coinbase-owned) and migrated legacy Angular modules to React, then introduced Vitest into their CI.

### 3-bullet version
- Built and maintained features across **nearly every module of the back-office admin dashboard** (Block RFQ, user management) in React and TypeScript.
- **Migrated legacy Angular features to React** as independently maintainable modules, improving rendering performance.
- **Introduced Vitest** and wired it into the GitLab CI pipeline. Later shipped backend changes in **Erlang/OTP**, such as integrating an existing approval layer into another app.

### Full version (anonymised by default)

**Context.** A leading crypto derivatives exchange, owned by a major US exchange group, runs its operations through an internal admin dashboard: user management, request-for-quote workflows, permissions and approvals. I worked on it for several years as part of a 3–5 person team alongside the client's own engineer, following their code standards through merge requests and reviews.

**The problem.** Ops staff depend on the back office for high-stakes actions. Parts of it ran on a legacy Angular codebase that was slow to change and hard to test, and there was no frontend test framework in CI.

**Approach.**
1. **Module-by-module migration (strangler pattern).** Legacy Angular features were rebuilt in React as decoupled modules, so the migration never blocked feature work.
2. **Testing as infrastructure.** Introduced Vitest as the frontend test framework and integrated it into GitLab CI, so every merge request ran the suite.
3. **Working inside someone else's standards.** All work went through the client's review process. Mention this in proposals: it's exactly how agencies and larger clients work.
4. **Crossing the stack when needed.** Moved to the Erlang/OTP backend for the final four months: integrated an existing approval layer into another app, and converted permission data from binaries to records for easier management.

**Results.** `[VERIFY what you can share: modules migrated, test count, CI adoption, performance improvement, without internal metrics.]`

**What this proves for you:** high-stakes internal tools (B2) and incremental frontend modernization (B3).

---

## 3. Dynamic tax-filing forms for 100,000+ users

**Sign-off needed:** same as above; anonymise if unsure ("a Belgian tax-filing platform").

### One-liner
I built the personal-income-tax filing module for a Belgian tax platform used by 100k+ clients: 15 dynamic sections, generated from official JSON schemas, versioned by tax year.

### 3-bullet version
- Built an **ETL-style pipeline** that extracted the return's JSON schemas, transformed tax-code data and loaded it into **dynamic form components** for all 15 sections (10–30 questions each).
- Wrote **recursive validation logic** for cross-field checks, and **versioned form definitions by tax year**, so every year stays usable and each year's changes ship without breaking earlier ones.
- Added **i18n across the full return** and owned features through the full SDLC, including production releases and hotfixes.

### Full version

**Context.** A Belgian tax-filing platform helps 100,000+ people file their personal income-tax return online.

**The problem.** Tax forms change every year, have hundreds of interdependent fields, and must be correct. Hand-coding each form doesn't scale and breaks older years.

**Approach.**
1. **Schemas as the source of truth.** Extracted the official JSON schemas and transformed tax-code data into a form definition format.
2. **Dynamic components.** One renderer covers all 15 sections, with recursive validation for cross-field rules.
3. **Versioning by tax year.** Definitions and data are versioned so last year's returns still open correctly while this year's rules ship.
4. **i18n everywhere,** because Belgium is multilingual.

**What this proves for you:** complex, rule-heavy forms (B2) for fintech, insurance, HR and compliance products.

---

## 4. Rescuing and scaling a legacy bot to 2.4M members

**Sign-off needed:** none (your own project).

### One-liner
I took over a poorly built Discord bot, rewrote it end to end and scaled it to 10,000+ servers and 2.4M members with <60 ms gateway latency.

### 3-bullet version
- **Took over a messy legacy codebase** and rewrote it end to end, including a **database migration** and a modernized architecture.
- **Scaled horizontally across 10 shards in 10 clusters**, keeping gateway latency under 60 ms, on Node.js + MongoDB + Redis, deployed with Docker on AWS EC2.
- Ran it as **sole developer from 2019 to 2024**: 20+ mini-games, 40,000+ active players, monitored with Prometheus and Grafana.

### Full version

**Context.** Bro was a Discord bot with 20+ mini-games. I took it over as sole developer in 2019.

**The problem.** The inherited code was fragile and couldn't scale, and every new feature risked breaking old ones. That's the same situation many founders are in today with AI-built or rushed MVPs.

**Approach.**
1. **Stabilise first:** monitoring (Prometheus/Grafana) to see what actually broke.
2. **Rewrite behind the same interface,** module by module, so users didn't notice.
3. **Migrate the data** to a new schema with a reversible process.
4. **Scale out:** sharding across 10 clusters, Redis caching, Dockerised deploys on EC2.

**Results.** 10,000+ servers, 2.4M+ combined members, 40,000+ active players, gateway latency under 60 ms.

**What this proves for you:** B1 Prototype → Production, which is exactly "take over messy code, make it reliable, scale it".

---

## Testimonial request (for any of the above)

> Hi {{NAME}}, I'm putting together case studies for my freelance practice and would love one or two sentences from you about working together on {{PROJECT}}: what problem we solved, and what it was like working with me. If it helps, here's a draft you can edit or replace: "{{DRAFT_QUOTE}}". Totally fine to say no. Thank you!
