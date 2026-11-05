# Statement of Work (SOW)

> **Template — have a lawyer review for high-value deals.** Not legal advice.
>
> **When to use:** Use one SOW for every project or phase under a signed MSA ([msa-india.md](msa-india.md) / [msa-international.md](msa-international.md)). The SOW is the document clients actually read, so most disputes are won or lost here.
>
> **How to fill:** Replace every `{{…}}`, swap each `[e.g. …]` example for real content, and delete the other `[guidance]`. Each deliverable needs **testable** acceptance criteria, meaning a neutral person could check pass or fail. The out-of-scope list should be longer than you think it needs to be. Two worked examples at the end cover the A1 Speed Sprint and the B1 Prototype→Production audit.
>
> **Never remove:** the Out-of-scope list, Client dependencies with dates, acceptance criteria, the payment schedule (deposit first), and the Change Request rate.

---

**SOW No. {{SOW_NUMBER}}** under the Master Services Agreement dated {{MSA_DATE}} between **{{BUSINESS_NAME}}** ("Consultant") and **{{CLIENT_LEGAL_NAME}}** ("Client").

**Project:** {{PROJECT_NAME}} · **SOW date:** {{SOW_DATE}} · **Valid for signature until:** {{SOW_DATE + 14 days}}

## 1. Background and objective
[2–4 sentences on the problem in the client's own words, and why now.]
**Objective:** [the business outcome, e.g. "Cut mobile checkout drop-off by fixing speed and checkout-flow issues before the Diwali sale on 20 Oct"].
**Success signals (not guarantees):** [metrics you'll both watch, e.g. mobile LCP, checkout completion rate, admin task time].

## 2. Scope of services
[One line per capability. Write user-visible outcomes, not tech jargon.]
1. [e.g. Audit the storefront's performance on the 3 highest-traffic templates]
2. {{…}}
3. {{…}}

## 3. Deliverables and acceptance criteria

| ID | Deliverable | Description | Acceptance criteria (pass/fail) |
|---|---|---|---|
| D1 | {{e.g. Audit report}} | {{PDF/Notion doc}} | [Covers sections X, Y, Z; every finding has severity, evidence, fix, estimate] |
| D2 | {{e.g. Implemented fixes}} | {{Merged PRs in client repo}} | [All items in fix-list marked "in scope" deployed to production; CI green; no new console errors on the 3 templates] |
| D3 | {{Handover}} | {{README, ADRs, Loom walkthrough}} | [Another developer can run the project locally from README in < 30 min] |

[Avoid acceptance criteria tied to business results you can't control, like "revenue +20%". Use lab metrics, delivered functionality, or tests passing instead.]

## 4. Out of scope (anything here, or not listed in §2–3, is a Change Request)
- [e.g. New features not listed in §2]
- [e.g. Content writing, copywriting, product photography, translations]
- [e.g. Third-party app/plugin bugs or vendor-side outages]
- [e.g. Ongoing maintenance after the 30-day warranty — see Care Plan]
- [e.g. Data migration beyond {{N}} records / SEO / paid ads / design system]
- [e.g. Support for browsers older than the last 2 versions of Chrome, Safari, Firefox, Edge]

## 5. Assumptions
- [e.g. Client is on Shopify {{plan}} and has admin access to grant a collaborator request]
- [e.g. Client's existing design/brand assets will be used as-is]
- [e.g. Third-party APIs (Razorpay, Shopify Admin API) behave as documented]
- [e.g. Up to {{2}} revision rounds per design/content item]
If an assumption proves false, Consultant will raise a Change Request.

## 6. Client responsibilities and dependencies

| # | Client provides | By (date) | If late |
|---|---|---|---|
| C1 | Access: [GitHub org invite / Shopify collaborator approval / Vercel / Supabase / Razorpay team member] | {{date}} | Dates move day-for-day |
| C2 | Decision-maker available for {{30-min}} weekly review | Weekly | — |
| C3 | Feedback on each deliverable within the 5-business-day Review Period | Per delivery | Deemed acceptance (MSA cl. 8.4) |
| C4 | [Content / test accounts / sample data] | {{date}} | Dates move day-for-day |

## 7. Timeline and milestones

| Milestone | Deliverables | Target date* | Payment |
|---|---|---|---|
| M0 — Signing | SOW signed, deposit paid | {{date}} | **{{50% / 40%}} — ₹/$ {{amount}}** |
| M1 — {{e.g. Audit complete}} | D1 | {{date}} | {{— / 40%}} |
| M2 — {{e.g. Fixes deployed}} | D2, D3 | {{date}} | **{{50% / 20%}} — ₹/$ {{amount}}** on acceptance |

*Dates assume the deposit clears by {{date}} and Client dependencies in §6 arrive on time.

## 8. Fees
- **Type:** [Fixed price / Time & materials capped at {{N}} hours / Retainer]
- **Total:** **₹/$ {{TOTAL}}** [+ GST @ 18% if registered / "Export of services — zero-rated"]
- **Payment terms:** invoices due in {{7}} days (MSA cl. 6). Stop-work if any invoice is more than {{14}} days overdue (MSA cl. 7.3).
- **Change requests:** ₹{{RATE}}/hr or ${{RATE}}/hr; quoted before work starts.
- **Third-party costs** (apps, hosting, APIs, fonts) are paid by Client directly: [list known costs, e.g. "Shopify app X ~$20/mo"].

## 9. Ways of working
- **Channel of record:** {{email / shared Slack channel}}. WhatsApp is for quick pings only; decisions get confirmed in the channel of record.
- **Weekly update:** every {{Friday}} by {{6 pm IST}} ([weekly-update.md](../delivery/weekly-update.md)).
- **Demo:** every {{1–2}} weeks on a staging/preview link.
- **Response time:** within 1 Business Day; urgent production issues within {{4}} business hours.
- **Working hours:** {{10:00–19:00 IST, Mon–Fri}}; overlap with Client {{hours/time zone}}.
- **Environments:** local → preview (per PR) → staging → production. Production deploys need Client approval.
- **Repository and accounts:** in Client's name ({{GitHub org}}, {{hosting}}). Consultant has individual access, which is revoked at closeout.

## 10. Warranty and after-care
- **Warranty:** {{30}} days after acceptance; fixes for deviations from the acceptance criteria (MSA cl. 12).
- **After warranty:** optional Care Plan from ₹{{25,000}}/month or ${{1,000}}/month ([retainer-agreement.md](retainer-agreement.md)).

## 11. Background IP and third-party components (known now)
- Background IP: [e.g. Consultant's Next.js starter, test utilities, Razorpay webhook verification helper]. Licensed to Client under MSA cl. 9.1.
- Key open-source/third-party components: [e.g. Next.js (MIT), Supabase JS (MIT), Shopify Polaris (custom licence)].

## 12. Sign-off
| | Consultant | Client |
|---|---|---|
| Name | {{YOUR_NAME}} | {{CLIENT_SIGNATORY_NAME}} |
| Title | Proprietor, {{BUSINESS_NAME}} | {{TITLE}} |
| Date | | |
| Signature | | |

---

## Worked example 1 — A1 Store Speed & Conversion Sprint (Indian D2C, ₹45,000, 2 weeks)

**Objective:** Make the Shopify storefront feel fast on mid-range Android phones over 4G before the sale on {{date}}.

**Scope**
1. Baseline: PageSpeed Insights (mobile, median of 3 runs) plus WebPageTest on home, top collection and top product templates; inventory of apps and scripts.
2. Fix list: theme code (render-blocking assets, image sizing/lazy loading, font loading, Liquid loops), app audit (remove or defer), third-party script loading.
3. Implement agreed fixes in a duplicate theme; preview link; publish after Client approval.
4. Checkout and cart smoke test (including COD and Razorpay flows) after publish.
5. Report and 30-min walkthrough call; Loom of changes.

**Deliverables and acceptance**
| ID | Deliverable | Acceptance criteria |
|---|---|---|
| D1 | Baseline + fix-list doc | Lists every app/script with load cost; each fix has expected impact and effort |
| D2 | Optimised theme (published) | Mobile Lighthouse Performance on the 3 templates is ≥ 20 points above baseline **or** ≥ 70, whichever is lower (median of 3 runs); no broken sections; add-to-cart → checkout works on Android Chrome and iOS Safari |
| D3 | Report + Loom | Before/after table, list of changes, recommendations not done |

**Out of scope:** redesign, new sections, app replacement purchases, checkout customisation (Shopify-controlled), field Core Web Vitals (CrUX needs ~28 days of real-user data, so it can't be accepted inside a 2-week sprint).

**Payment:** ₹22,500 on signing · ₹22,500 on acceptance. (For anything ≤ ₹25,000, take 100% upfront.)

---

## Worked example 2 — B1 Prototype → Production Audit (global startup, $900, 5 business days)

**Objective:** Find out whether the founder's Lovable/v0/Cursor-built app is safe to launch, and what it would take to get there.

**Scope**
1. Read-only access to repo, Supabase project and hosting.
2. Review: Supabase Row Level Security on every table and storage bucket; auth flows; secrets exposure (client bundle, repo history); payments/webhooks (signature verification, idempotency); error handling; tests and CI; deploy and rollback; monitoring; performance hot spots.
3. Findings prioritised by severity (Critical / High / Medium / Low), with evidence and fix estimates.
4. 60-min walkthrough call plus a fixed-price quote for a hardening sprint ($3k–8k).

**Deliverables and acceptance**
| ID | Deliverable | Acceptance criteria |
|---|---|---|
| D1 | Audit report | Covers all 10 areas above; every table's RLS status listed; each finding has severity, reproduction steps or evidence, fix and estimate |
| D2 | Walkthrough call | Held within 2 Business Days of report delivery (recording shared) |
| D3 | Sprint proposal | Fixed-price options for Critical + High fixes |

**Rules of engagement:** no testing against production user data; no exploitation beyond proving a finding (for example, reading one test row with the anon key); Critical findings are reported immediately, not at the end.

**Payment:** 100% upfront ($900). The audit fee is credited against the hardening sprint if it is signed within 14 days.
