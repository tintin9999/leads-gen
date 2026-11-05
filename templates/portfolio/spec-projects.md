# Spec project briefs

> **When to use:** when an offer has no client case study yet. Each brief is scoped to under a week and designed to **start conversations**, not just sit in a portfolio.
> **Never:** test or probe systems you don't own without written permission. Public homepage speed tests are fine; security probing of other people's apps is not.

---

## 1. The Indian D2C Store Speed Report (Track A · A1) · 2–3 days

**Goal:** a credible, shareable report + 100 personalised reasons to contact brands.

**Steps**
1. Build a list of ~100 Indian D2C brand sites (Cultus partners, D2C lists, Shopify store directories). See `../../lists/lead-sources.md`.
2. Run `node scripts/site-audit.mjs --input brands.txt --psi` (needs a free `PSI_API_KEY`). It captures stack, apps, checkout provider and mobile Core Web Vitals.
3. Aggregate: median mobile performance score, LCP distribution, % passing CWV, most common third-party scripts/apps, checkout stacks (Razorpay Magic, GoKwik, Shiprocket…), image weight.
4. Publish **aggregates only**: no league tables naming slow brands. Include the method and dates.
5. Message each brand privately with **their** numbers + one specific fix (template: `../outreach/cold-email.md`, A1).

**Deliverables:** web page + PDF, 3 LinkedIn posts, a CSV of 100 prospects in the CRM with personal hooks.

**Watch out:** lab data (Lighthouse) differs from field data (CrUX). Say which you used. Re-run the slowest sites twice.

---

## 2. Supabase Production-Readiness Kit (Track B · B1) · 4–5 days

**Goal:** prove you know how AI-built apps fail in production, and give founders a reason to talk to you.

**Scope**
- `CHECKLIST.md`: RLS enabled on every table in exposed schemas; policies tested for anon/authenticated/owner; storage buckets private by default with policies; service-role key never shipped to the client; auth redirect URLs and email templates locked; rate limits; backups/PITR; environment separation; logging and alerts; payment webhooks verified and idempotent.
- A small Node CLI that founders run **against their own project** using their own credentials: lists tables without RLS, policies per table, public buckets, functions with `security definer`, and prints a red/amber/green summary.
- A demo Next.js + Supabase app with **RLS tests in CI** (e.g., pgTAP or integration tests that try forbidden reads/writes).
- A blog post: "Before you launch your Lovable app: 9 things to check in Supabase."

**Use it in outreach:** "I built an open-source checklist + CLI for this. Happy to run it with you on a call; the full audit is $850 if you want the fixes planned."

---

## 3. Admin Dashboard Starter (Track B · B2) · 5–7 days (month 2)

**Scope:** Next.js App Router + Supabase + shadcn/ui. Roles and permissions (RBAC), an approval workflow with comments, an audit log of every write, filters/search/CSV export, a form builder driven by a JSON schema (your Twinntax strength), Vitest + Playwright tests, seeded demo data, a live demo URL.

**Use it:** case study "how I'd build your ops panel"; a starting point that shortens real B2 projects (keep client code separate; the starter is your own background IP, licensed to clients via the contract).

---

## 4. Angular → React Strangler Demo (Track B · B3) · 3–4 days (month 3)

**Scope:** a small AngularJS app; mount React components per route with a bridge for shared state and events; Vitest for the React side; a migration plan document (inventory, risk map, sequencing, test harness, rollback). Write-up: "Migrating Angular to React without a rewrite."

**Use it:** attach the plan document as a sample deliverable of the $1.5k–3k assessment.

---

## Selection rule

Only build a spec project if you can name **20 prospects** you'll send it to the week it ships.
