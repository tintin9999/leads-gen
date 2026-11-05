# Proposal emails

Send within 24 hours of the discovery call. Attach the PDF from `tools/proposal-builder.html`. Never send it without a walk-through booked or offered. Keep the email short, because the proposal does the talking.

---

## 1. Proposal email: Indian D2C client (A1/A3)

**Subject:** {{BRAND}}: 3 options for faster mobile product pages (valid till {{DATE+14}})

Hi {{FIRST_NAME}},

Thanks for the call yesterday. Here's what I heard:

- **Problem:** product pages take {{X}}s to load on mobile, and {{metric}} has dropped since the {{app/theme}} change.
- **Why now:** {{sale name}} starts on {{date}}, and you want this fixed before the code freeze.
- **Success:** mobile LCP under 2.5s on product pages, and conversion tracked weekly for 4 weeks.

The attached proposal has three options:

| | Essential | **Recommended** | Premium |
|---|---|---|---|
| Price | ₹30,000 | **₹48,000** | ₹75,000 |
| Timeline | 7 days | **10 days** | 14 days |

Based on your numbers ({{sessions}} mobile sessions × {{CR}}% × ₹{{AOV}}), each 0.1-point conversion lift is worth about ₹{{value}}/month. Recommended pays for itself in roughly {{weeks}} weeks if we get there.

Terms: 50% to start, 50% on delivery. Prices exclude GST where applicable. Valid until {{DATE+14}}.

Can we take 15 minutes on {{DAY}} at {{TIME}} to go through it? Or reply "Recommended" and I'll send the agreement and deposit invoice today.

Thanks,
{{YOUR_NAME}}
{{BUSINESS_NAME}} · {{YOUR_EMAIL}} · {{CAL_LINK}}

---

## 2. Proposal email: global startup (B1/B2/B3)

**Subject:** {{COMPANY}}: production-readiness plan + options

Hi {{FIRST_NAME}},

Thanks for walking me through {{product}}. To recap:

- **Today:** {{built with Lovable/v0 / rushed MVP}}, live with {{N}} users. RLS isn't enforced on {{tables}}, there are no tests on the payment webhooks, and deploys are manual.
- **Goal:** be confident before {{launch / funding / enterprise pilot}} on {{date}}.
- **Success:** zero critical findings on re-audit, CI green on auth and money paths, alerting live.

The attached proposal starts with a **fixed-price audit ($850, 5 working days)** and then three build options ($3,200 / **$5,400** / $8,500). If you book a build option within 14 days of the audit, 50% of the audit fee is credited.

Relevant proof: I built and run Cultus (Next.js + Supabase + Razorpay + Shopify), with 115 test files on its money-critical paths and 17 architecture decision records. Before that I spent 4 years on client engagements including back-office tooling for Coinbase's Deribit.

Does {{DAY}} {{TIME}} {{THEIR_TZ}} work for a 15-minute walk-through?

Best,
{{YOUR_NAME}}

---

## 3. Paid first step only (qualification score 5–6)

**Subject:** {{COMPANY}}: suggested first step

Hi {{FIRST_NAME}},

Rather than a big proposal, I'd suggest a small first step so we both know exactly what we're dealing with: a **{{audit/assessment}}** for **{{price}}**, delivered in **{{days}}**.

You get: {{3 bullet deliverables}}. If you then go ahead with the build within 14 days, half the fee is credited.

If that works, I'll send a one-page agreement and the invoice. I can start {{date}}.

{{YOUR_NAME}}

---

## 4. After the walk-through ("I need to check with my partner")

Hi {{FIRST_NAME}},

Thanks for the time today. To make it easy to share, here's the one-paragraph version for {{partner name}}:

> {{Problem}} → {{Recommended option}} for {{price}}, live by {{date}}, measured by {{metric}}. 50% to start.

Happy to join a 10-minute call with both of you if that helps. The options are valid until {{DATE+14}}.

{{YOUR_NAME}}

---

## Checklist before you hit send

- [ ] Their words in the problem statement (not your jargon)
- [ ] Three options, middle marked **Recommended**, ratio ≈ 1 : 1.6 : 2.5
- [ ] Value arithmetic uses **their** numbers. No promised outcomes.
- [ ] Out of scope + assumptions listed in the PDF
- [ ] Payment terms + validity date
- [ ] One clear next step (walk-through slot or reply keyword)
- [ ] CRM: stage → `proposal`, value = Recommended price, `nextDate` = walk-through day
