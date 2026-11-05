# Care Plan / Retainer Agreement

> **Template — have a lawyer review for high-value deals.** Not legal advice.
>
> **When to use:** Use this after a project ends, as the upsell at closeout (see [../delivery/project-closeout.md](../delivery/project-closeout.md)), or for any client who wants you "on call". It sits under the MSA ([msa-india.md](msa-india.md) / [msa-international.md](msa-international.md)), so add it as a SOW. It converts one-off revenue into predictable monthly income, the most valuable revenue a solo business can have.
>
> **How to fill:** Pick a tier, then fill `{{…}}`. Suggested starting tiers are below; align them with [04-pricing](../../memos/04-pricing.html) before sending. Keep the hours bank. "Unlimited small tasks" retainers are how solo devs burn out.
>
> | Tier | India (₹/month) | Global (USD/month) | Hours bank | Typical response | Best for |
> |---|---|---|---|---|---|
> | Essential | ₹25,000 | $1,000 | 6 hrs + monitoring and updates | P1 next business day | Store or app in steady state, small fixes, updates |
> | Growth | ₹45,000 | $1,800 | 12 hrs | 1 business day (P1 within 4 business hrs) | Monthly small features, CRO experiments |
> | Priority | ₹75,000 | $3,000 | 24 hrs + monthly roadmap call | Same day (P1 within 2 business hrs, weekend emergency line) | Revenue-critical stores and apps, sale seasons |
>
> These numbers match the C1 Care plan in [04-pricing](../../memos/04-pricing.html). Monitoring, updates and guaranteed response times are what make the effective hourly rate higher than project work. You're selling reserved capacity, not hours.
>
> **Never remove:** fee in advance (3.1), hours cap and rollover limit (2.3–2.4), the out-of-scope line (2.6), minimum term (6.1), planned-absence clause (5.4).

---

**Care Plan SOW No. {{SOW_NUMBER}}** under the Master Services Agreement dated {{MSA_DATE}} between **{{BUSINESS_NAME}}** ("Consultant") and **{{CLIENT_LEGAL_NAME}}** ("Client").

**Systems covered:** {{e.g. Shopify store {{store}}.myshopify.com + custom app "{{app}}" + Next.js admin at {{url}}}} ("**Covered Systems**").
**Start date:** {{DATE}} · **Tier:** {{Essential / Growth / Priority}}

## 1. What's included
1. **Monitoring:** uptime, error tracking ({{Sentry / Vercel / Supabase logs}}) and checkout or webhook health checks, reviewed {{weekly / daily on Priority}}.
2. **Maintenance:** dependency and security updates, Shopify API version upgrades, Razorpay/third-party API changes, renewing expiring tokens and certificates.
3. **Fixes:** bugs in Covered Systems, whether or not Consultant built the affected part.
4. **Small improvements:** changes under {{8}} hours each, prioritised by Client within the hours bank.
5. **Advice:** async questions, plus a {{30}}-minute monthly call (Growth), or a monthly roadmap call (Priority).
6. **Monthly report:** hours used, work done, incidents, risks, recommendations.

## 2. Hours bank
**2.1** The monthly fee includes **{{HOURS}} hours** of work, tracked in 15-minute increments.

**2.2** Consultant shares a live time log on request ({{Toggl / Clockify shared report}}).

**2.3 Rollover.** Unused hours roll over to the **next month only**, up to **50%** of the monthly allowance. Hours not used then expire. Expired hours are not refunded, because the fee pays for reserved capacity and response times as well as hours worked.

**2.4 Overage.** Once the bank is used up, Consultant asks before continuing. If Client approves, extra hours are billed at **{{₹ / $ RATE}}/hour**. Urgent P1 work may go ahead without prior approval, up to {{4}} hours, and Consultant will notify Client.

**2.5 Bigger work.** A task likely to exceed {{8}} hours is quoted as a separate SOW or Change Request. Client may instead choose to use bank hours for it.

**2.6 Out of scope:** new products or major features (quoted separately), design work, content entry, marketing or ads, and support for systems not listed above.

## 3. Fee and payment
**3.1** The fee of **₹ / $ {{FEE}}** per month {{+ GST if applicable}} is invoiced on the **1st of each month, in advance**, and due within **7 days**.

**3.2** Stop-work and late-payment interest apply as in the MSA (cl. 7). Response times are suspended while any invoice is overdue.

**3.3 Price review.** Fees may be revised once every 12 months, with 30 days' notice. If Client does not accept the revision, it may end the plan at the next renewal.

## 4. Response times (business hours: {{10:00–19:00 IST, Mon–Fri, excluding Indian public holidays}})

| Severity | Definition | Essential | Growth | Priority |
|---|---|---|---|---|
| **P1 — Critical** | Production down, checkout/payments broken, data leak suspected | Next business day | 4 business hrs | 2 business hrs; weekend emergency line at 1.5× |
| **P2 — High** | Major feature broken, no workaround | 2 business days | 1 business day | Same business day |
| **P3 — Normal** | Minor bug, small change request | 5 business days | 1 business day (first response) | Same business day (first response) |

"Response" means a human acknowledgement with a first diagnosis or plan. Consultant will make reasonable efforts to resolve issues but cannot guarantee resolution times, especially where third-party platforms (Shopify, Razorpay, Vercel, Supabase, AWS) are the cause.

**Reporting an issue:** email {{SUPPORT_EMAIL}} or the shared channel {{#channel}}. For P1, also call or WhatsApp {{SUPPORT_PHONE}}. Issues raised outside these channels (for example a personal DM on the weekend) are not covered by the response times.

## 5. Access, security, absences
**5.1** Client keeps Consultant's individual access to Covered Systems active and least-privilege, per the [Credentials & Access Policy](../delivery/credentials-and-access-policy.md).

**5.2** Consultant may make routine changes without approval (dependency patches, bug fixes). Changes that affect customers or revenue (checkout, pricing, inventory sync) go to staging first and need Client approval before production, except emergency fixes for P1 issues.

**5.3** Client is responsible for backups unless they are listed in section 1.

**5.4 Planned absences.** Consultant will give **14 days' notice** of planned absences longer than 2 business days, and no more than {{10}} business days per quarter. During a notified absence, response times are paused unless a backup developer is named here: {{BACKUP_DEV_NAME / none}}. **Sale seasons:** Client should share critical dates (for example Diwali, EOSS, BFCM) at least 30 days ahead. Consultant will not schedule planned absences then.

## 6. Term and ending
**6.1** **Minimum term: 3 months.** After that the plan continues month to month.

**6.2** Either party may end the plan with **30 days' written notice**, effective at the end of a billing month.

**6.3** On ending, Consultant hands over updated documentation and access in line with [../delivery/handover-checklist.md](../delivery/handover-checklist.md).

## 7. Sign-off
| Consultant | Client |
|---|---|
| {{YOUR_NAME}} · Date ____ · Sign ____ | {{CLIENT_SIGNATORY_NAME}}, {{TITLE}} · Date ____ · Sign ____ |

---

### Monthly report skeleton (send with each invoice)
- **Hours:** used {{x}} / {{HOURS}} · rolled over {{y}} · expiring {{z}}
- **Done:** {{bulleted list with links to PRs and tickets}}
- **Incidents:** {{P1/P2 with time to respond and resolve}}
- **Health:** uptime {{%}} · error rate {{…}} · Lighthouse mobile {{…}} · dependencies outdated {{n}}
- **Risks and recommendations:** {{e.g. "Shopify API 2027-01 deprecates X; 6 hrs to migrate before {{date}}"}}
- **Next month's plan:** {{top 3}}
