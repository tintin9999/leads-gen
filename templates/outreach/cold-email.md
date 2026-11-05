# Cold Email Templates (signal-based, one offer per email)

**Use:** send these only to prospects who have a **signal**: slow store + ad spend, a fresh funding round, a hiring post, an AI-built launch, or a legacy stack. Never send to generic scraped lists. Write each email for one person and one offer, and reference something specific about them in the first line.

**Benchmarks (as of 2026):** average B2B cold-email reply rate is roughly **2–3.5%** (Instantly 2026 avg 3.43%, top quartile 5.5%+, top 10% >10.7%; another 28k-lead study found a 2.1% median). Signal-based, Loom-backed emails like these should land in the **5–10%** range. If you're under 2% after 100 sends, change the list or the offer before you touch the copy.

Placeholders: `{{FIRST_NAME}}` `{{COMPANY}}` `{{STORE_URL}}` `{{PSI_SCORE}}` `{{LCP}}` `{{LOOM_LINK}}` `{{PRICE}}` `{{SIGNAL}}` `{{PRODUCT}}` `{{TOOL}}` `{{ROLE}}` `{{YOUR_NAME}}` `{{BUSINESS_NAME}}` `{{PORTFOLIO_URL}}` `{{CAL_LINK}}` `{{POSTAL_ADDRESS}}`

---

## 0. Before the first send: deliverability and legal setup (one-time)

- [ ] **Use a secondary domain** for cold email, e.g. `get{{BUSINESS_NAME}}.com`, so your main domain's reputation stays safe. Forward its web traffic to your main site.
- [ ] Set up **SPF, DKIM, DMARC** (start with `p=none`) on the sending domain. Gmail requires SPF or DKIM for all senders and all three for bulk senders. Since Nov 2025 it rejects non-compliant mail.
- [ ] **Warm up the inbox for 2–3 weeks.** Send real conversations first, then ramp from 5/day to **≤ 30–40/day per inbox**. You'll stay far below Gmail's 5,000/day bulk threshold, but low volume protects your reputation anyway.
- [ ] **Keep the spam-complaint rate < 0.1%.** Gmail's hard line is 0.3%. Personal, relevant emails sent in low volume stay well under it.
- [ ] Use **plain text**, a maximum of 1–2 links, and no images or tracking pixels in the first email. Pixels hurt deliverability, and your replies are the metric anyway.
- [ ] Add a footer: who you are, a **postal address** (CAN-SPAM requires one with no B2B exemption; a business address or registered PO box works, not your home address), and a clear opt-out. Honor opt-outs immediately. The legal maximum is 10 business days under CAN-SPAM; Gmail expects 48 hours for bulk mail.
- [ ] **UK/EU:** emailing corporate addresses (name@company) is allowed under UK PECR with identification and an opt-out. Sole traders count as individuals and need consent. GDPR still applies: keep a one-paragraph legitimate-interest note and a privacy notice link. **Canada (CASL):** email only addresses that are published conspicuously, are relevant to the person's role, and don't say "no solicitations". **India:** DPDP consent rules phase in by ~May 2027, so collect minimal data and honor every opt-out.

**Standard footer (paste under every cold email):**
```
—
{{YOUR_NAME}} · {{BUSINESS_NAME}} · {{PORTFOLIO_URL}}
{{POSTAL_ADDRESS}}
Not relevant? Reply "no thanks" and I won't email again.
```

---

## A1 — Store Speed & Conversion Sprint (slow Shopify store + running ads)

**Subject options:** `{{COMPANY}} on mobile — 3 quick fixes` · `Loom for {{FIRST_NAME}}: {{COMPANY}} product page` · `your product page takes {{LCP}}s on 4G`

```
Hi {{FIRST_NAME}},

I ran {{STORE_URL}} through Google PageSpeed on mobile. It scores {{PSI_SCORE}}/100, and the main product image appears after ~{{LCP}}s. You're running Meta ads, so every paid click lands on that wait.

I recorded a 3-minute walkthrough of the three fixes I'd make first, with a rough effort estimate for each: {{LOOM_LINK}}

Some context: I build for Indian D2C brands on Shopify. I built the Cultus marketplace end to end, including a custom Shopify Sales Channel app and Razorpay Magic Checkout with partial COD.

I do this as a fixed 1–2 week sprint (₹{{PRICE}}) and send before/after numbers. Worth a 15-minute call?

{{YOUR_NAME}}
```
*Loom recipe (4 min max):* (1) PageSpeed result on mobile and what LCP/CLS mean in plain words. (2) The heaviest thing on the product page: hero image, app scripts, fonts. (3) Checkout/COD friction you can see as a shopper. (4) "Here's what I'd do in week 1." **Don't promise conversion lifts in rupees.** Promise measured before/after speed.

## A2 — Shopify custom app / integration (marketplace, ERP, or ops pain)

**Signals:** sells on Amazon, Myntra, or Ajio too; job posts for "ops executive"; 1★ reviews complaining about an app's missing feature; Cultus-style marketplace listings.

**Subject:** `{{COMPANY}} — syncing orders between Shopify and {{SYSTEM}}`

```
Hi {{FIRST_NAME}},

{{SIGNAL — e.g., "I noticed {{COMPANY}} also sells on Myntra and runs Unicommerce"}}. In my experience the pain is usually inventory drift and manual order re-entry once volume grows.

I built a custom Shopify Sales Channel app for Cultus. Brands publish products from Shopify admin, inventory syncs through webhooks every minute plus a nightly reconciliation, and orders flow back into the brand's Shopify store. A private app for {{COMPANY}} would be a smaller version of the same thing.

If you tell me where the manual work is today, I'll send a 1-page plan with the scope, the timeline, and a fixed price. Open to a 15-minute call?

{{YOUR_NAME}}
```

## A3 — Razorpay checkout & payments (COD/RTO, refunds, reconciliation)

**Signals:** COD-heavy categories (fashion, beauty), complaints about fake orders or RTO, a recent checkout-app switch, failed-refund complaints in reviews.

**Subject:** `partial COD for {{COMPANY}}'s high-RTO pincodes`

```
Hi {{FIRST_NAME}},

Quick one. Fashion brands like {{COMPANY}} often lose the most margin on COD orders that come back. One fix that worked for us on Cultus: **partial COD**, meaning a small prepaid token, only for high-risk pincodes, set up through Razorpay Magic Checkout. We added signature-verified webhooks and automatic retries for failed refunds, so nothing slips through.

I set up and audit Razorpay flows (Magic Checkout, COD rules, webhooks, refunds, reconciliation) as a fixed-price project. If you share roughly what share of orders is COD and what your RTO is, I can tell you in one reply whether it's worth doing.

{{YOUR_NAME}}
```

## B1 — Prototype → Production (AI-built or rushed MVP)

**Signals:** Product Hunt or Indie Hackers launch, "built with Lovable/Bolt/v0/Cursor", a `*.lovable.app` domain, a founder post saying "we're getting our first paying users".

**Subject options:** `before {{PRODUCT}}'s next 1,000 users` · `{{PRODUCT}}: production-readiness checklist`

```
Hi {{FIRST_NAME}},

Congrats on launching {{PRODUCT}}. I saw it on {{WHERE}}. Built with {{TOOL}}, right?

AI builders get you to launch fast. The gaps tend to show up in three places once real users arrive:
1) database access rules. With Supabase, missing or weak RLS can leave tables readable with the public key. A 2025 study found this in ~10% of apps on Lovable's showcase (CVE-2025-48757).
2) auth and payment edge cases
3) no tests, CI, or monitoring, so every change is a gamble

I haven't touched your app, and I'd only ever test it with your written OK. What I offer is a fixed-price production-readiness audit (${{PRICE}}, 3–4 days): a written report and a prioritized fix plan. You can implement it yourself or have me do it.

Background: I shipped money-handling code on Coinbase's Deribit back-office and built a live marketplace with 115 test files covering payments and refunds.

Want me to send the checklist I use? It's free, and useful even if we never talk.

{{YOUR_NAME}}
```

## B2 — Internal tools & admin dashboards (ops pain)

**Signals:** hiring ops or support roles, a job post mentioning "Retool", "Google Sheets", or "admin panel", a new compliance requirement, scaling from 10 to 50 people.

**Subject:** `{{COMPANY}}'s ops team and the spreadsheet`

```
Hi {{FIRST_NAME}},

{{SIGNAL — e.g., "Saw you're hiring 3 ops associates"}}. At that stage the back-office usually lives in spreadsheets and Slack, and approvals or permissions turn into the bottleneck.

I build internal tools for that: admin dashboards with role-based access, approval flows, audit logs, and complex forms. For 4 years I worked on the back-office admin dashboard of Coinbase's Deribit exchange (user management, Block RFQ, approval layers), so I know what "this must never be wrong" feels like.

Typical engagement: 1 week to map the workflows, then 3–6 weeks to ship v1, at a fixed price per phase. Worth a 20-minute call to see if it fits?

{{YOUR_NAME}}
```

## B3 — Frontend modernization (Angular/AngularJS → React/Next.js)

**Signals:** a job post asking for "Angular + React" or "migrate from AngularJS"; BuiltWith or Wappalyzer showing AngularJS; an engineering blog about tech debt.

**Subject:** `{{COMPANY}}: Angular → React without a rewrite`

```
Hi {{FIRST_NAME}},

Your {{ROLE}} post mentions both Angular and React, so I'm guessing a migration is underway or being planned.

I migrated admin modules of Coinbase's Deribit back-office from Angular to React one module at a time, behind the existing app, with no big-bang rewrite. I also introduced Vitest into their GitLab CI first, so every step was covered.

If useful, I run a fixed-price migration assessment (${{PRICE}}, about 1 week): an inventory of modules, a risk map, a target architecture, and a step-by-step plan your team can execute, with or without me.

Open to a quick call?

{{YOUR_NAME}}
```

---

## 3-step follow-up sequence (each a reply in the same thread)

**Day 3: add value**
```
Hi {{FIRST_NAME}}, one more thing that might help: {{MICRO_TIP — e.g., "your collection pages load 2 app scripts from apps you may have uninstalled; removing them is a 10-minute win"}}. Happy to send the full list.
```

**Day 7: different angle**
```
{{FIRST_NAME}}, a different take: if {{OFFER}} isn't a priority this quarter, is {{ADJACENT_PAIN}} on the list? I see that one a lot at {{COMPANY}}'s stage.
```

**Day 14: breakup**
```
Hi {{FIRST_NAME}}, I'll stop here so I'm not cluttering your inbox. If {{PAIN}} becomes a priority, my calendar is {{CAL_LINK}}. Rooting for {{COMPANY}} either way.
```
Then CRM: `stage=nurture`, `nextDate` +90 days (see [follow-ups.md](follow-ups.md) for re-engagement).

---

## Subject-line bank (lowercase, specific, ≤ 6 words)
- `{{COMPANY}} on mobile`
- `quick loom for {{FIRST_NAME}}`
- `partial cod for {{COMPANY}}`
- `{{PRODUCT}} before scale`
- `rls check for {{PRODUCT}}`
- `angular → react, module by module`
- `{{COMPANY}}'s admin panel`
- `idea for {{COMPANY}}'s checkout`

**Avoid:** "Quick question", "Partnership opportunity", ALL CAPS, emojis, "Re:" on a first email (deceptive subject lines violate CAN-SPAM).

## Personalization checklist (60 seconds per email)
- [ ] First line mentions something only they would recognize: a product, a post, a store detail, or a funding round.
- [ ] One offer and one call to action.
- [ ] One proof point that matches the offer: Cultus for A, Deribit for B2/B3, the test suite for B1.
- [ ] Price anchor or "fixed price" stated, which pre-qualifies them.
- [ ] Under 150 words.
- [ ] Logged in the CRM with `nextDate` = +3 days.
