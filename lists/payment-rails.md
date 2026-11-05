# Payment rails: getting paid from abroad (and at home) as an India-based freelancer

*As of Nov 2026. Fees change often and several figures come from competitors' comparison pages (marked ⚠). Get a live quote before choosing. INR figures use the repo-wide planning rate **₹95 = $1**; check the live rate.*

> **BLUF.** Use one **RBI-authorised cross-border payment aggregator** (PA-CB) that gives clients *local* US/UK/EU account details, charges a flat or low fee with no FX markup, and issues a **free FIRA per payment**. Today that means **Skydo** or **BriskPe**, with **Razorpay MoneySaver** as backup. That costs about **1% (≈₹2,000 on $2,000)**. PayPal costs about **8–9% (≈₹16,000)** on the same payment. Use bank SWIFT only for big invoices at a negotiated FX rate. For marketplaces, use the platform's own INR withdrawal or Payoneer. Indian clients pay by NEFT/IMPS/RTGS. Tax and GST context: [Tax & Money → payment rails](../memos/03-tax-and-money.html#payment-rails).

## TL;DR picks

| Situation | Use | Why |
|---|---|---|
| Direct foreign client, invoice < $10k | **Skydo** or **BriskPe** (compare live) | Flat fee, no FX markup, free e-FIRA, local account details |
| Backup / Razorpay fan | **Razorpay MoneySaver Export Account** | 1% + GST, no FX markup, FIRA included |
| Invoice ≥ $10k | Skydo 0.3% tier **or** bank SWIFT at a pre-negotiated margin | Flat fees stop scaling; banks negotiate on size |
| Upwork / Contra / Toptal payouts | Platform's direct INR withdrawal **or** Payoneer | Test once and keep whichever nets more |
| Client insists on card/PayPal | Razorpay international cards or a PayPal invoice, **with the fee priced in** | Don't absorb 5–9% |
| Indian client | NEFT/IMPS/RTGS to business account; UPI for small amounts | Free, traceable, TDS-friendly |

## Comparison: receiving $2,000 (≈ ₹1,90,000)

| Rail | Published fee | FX markup | All-in ≈ | ≈ ₹ lost | Settles | FIRA | Notes |
|---|---|---|---|---|---|---|---|
| **Skydo** | $19 + 18% GST (≤$2k); $29 ($2k–10k); 0.3% (>$10k) | 0 (claims mid-market) | **1.1%** | ₹2,130 | ~1–2 days | Free e-FIRA | US/UK/EU/CA/AU virtual accounts; EDF helper tool |
| **BriskPe** ⚠ | $16 + GST (≤$2k); $25 (≤$10k); 0.25% above | 0 claimed | 0.9–1% | ₹1,790 | ~1–2 days | Free | RBI PA-CB authorisation (Dec 2025) per BriskPe |
| **Razorpay MoneySaver** | 1% + 18% GST (₹1,000 minimum on small payments) | 0 claimed | 1.2% | ₹2,240 | ~T+1–2 | Free | Marketed to freelancers since 2024 |
| **Xflow** | ~1% or flat plans (custom above $10k/mo) | Low | 1–1.2% | ₹1,900–2,280 | Next day | e-FIRA | Get a quote |
| **Wise Business (India)** ⚠ | ~1.5–1.8% + ~$2 FIRA (third-party estimates) | Mid-market | 1.6–1.9% | ₹3,050–3,610 | ~1–2 days | e-FIRC | Onboards Indian sole traders/freelancers; personal accounts reportedly lost receiving in Apr 2026 |
| **Payoneer** | 1% (ACH receive) + up to ~1–2% conversion/withdrawal; $29.95/yr if <$6k received in 12 months | ~1.5–2% | ~3% | ₹5,700 | ~1–3 days | On request | Best for marketplace payouts |
| **Bank SWIFT** | Sender $15–50 + intermediary $10–30 + your bank ₹0–500 | 0.5–2% | 2–4% | ₹3,800–7,600 | 1–5 days | From your bank | Ask the client to send with "OUR" charges |
| **PayPal** | 4.40% + fixed fee, + 18% GST on fees | ~3–4% | **8–9%** | ₹15,200–17,100 | 1–3 days | Monthly | Last resort |
| **Stripe India** | Invite-only for new Indian accounts since May 2024 | — | — | — | — | — | Not an option unless invited |

## What makes a rail "good" (use this to judge any new one)

- [ ] **RBI-authorised** as a Payment Aggregator – Cross Border (PA-CB), or a bank.
- [ ] Gives clients **local account details** (US ACH/wire, UK FPS, EU SEPA), so they pay a cheap domestic transfer, not an international wire.
- [ ] **Flat or low % fee** and **0 FX markup**. Compare against the mid-market rate on the same minute.
- [ ] **Free FIRA per payment**, downloadable, with your purpose code on it.
- [ ] Lets you set the **purpose code** (P0802 / P0807) and supports the new **EDF** data flow.
- [ ] Settles to **your Indian bank account in your name** within 1–2 business days.
- [ ] Clear chargeback/reversal policy, especially if it offers card links.

## Rail-by-rail

### Skydo
- **What:** Indian cross-border collections for freelancers and SMBs. Virtual accounts in major currencies; converts and settles INR to your bank.
- **Fees:** $19 per invoice up to $2,000, $29 for $2,001–10,000, 0.3% above $10,000, plus 18% GST on the fee. Payment links and ACH debit are separate products (~2%, $9 minimum).
- **FIRA:** free, per transaction (Skydo cites 24–72 hours).
- **Setup (≈30 min):** sign up → PAN + Aadhaar KYC → add your bank account → describe your services (software development) → get account details per currency → share them on invoices.
- **Watch-outs:** a flat fee hurts on small invoices (a $200 invoice loses about 11%), so batch small invoices monthly. Confirm KYC requirements; GST registration is not needed below the threshold.
- **Link:** https://www.skydo.com

### BriskPe
- **What:** cross-border collections, similar model to Skydo.
- **Fees ⚠:** a competitor's page lists $16 (≤$2k), $25 (≤$10k), 0.25% above, plus GST, no FX markup and free FIRA. Confirm on BriskPe's site.
- **Setup:** KYC (PAN, Aadhaar, bank). Business documents (GST/Udyam) may be asked for proprietorships.
- **Link:** https://www.briskpe.com

### Razorpay MoneySaver Export Account
- **What:** virtual foreign-currency accounts for exporters and freelancers from Razorpay.
- **Fees:** about 1% + 18% GST, no FX markup, with a ₹1,000 minimum reported for payments under about ₹1L.
- **FIRA:** included at no extra cost.
- **Setup:** Razorpay account → international collections / MoneySaver → KYC → account details.
- **Watch-outs:** a percentage fee scales with invoice size. Above about $2,900, Skydo's flat $29 is cheaper ($34.22 with GST against 1.18% of the invoice).
- **Link:** https://razorpay.com/accept-international-payments/money-saver/

### Xflow
- **What:** cross-border collections, next-day payouts and e-FIRA, with plan-based pricing for SMB exporters.
- **Fees:** about 1% or a flat plan. Custom pricing above $10k/month. Ask for a quote with your expected volume.
- **Link:** https://www.xflowpay.com/pricing

### Wise Business (India)
- **What:** Wise launched international account details for Indian businesses in Feb 2026 (USD, GBP, EUR, AUD, NZD, SGD, CAD, HUF), converting to INR.
- **Eligibility:** Wise onboards **sole traders/freelancers** (PAN and bank account in your own name, no proof of business needed) and **sole proprietorships** (GSTIN/Udyam/IEC as proof). The PAN is used for tax residency and the e-FIRC.
- **Fees ⚠:** third parties cite about 1.5–1.8% plus about $2 per FIRA. Check Wise's India pricing page.
- **Watch-out:** a competitor reports Wise *personal* accounts in India stopped receiving and holding funds from 5 Apr 2026. Use a business profile.
- **Link:** https://wise.com/help/articles/6Kpm9pXlJW79OGAktSnHos

### Payoneer
- **What:** global receiving accounts; strong with marketplaces.
- **Fees:** 1% to receive via ACH (US) or from UK/EU bank accounts; conversion/withdrawal to INR up to about 1–2% depending on route; **$29.95 annual fee** if you receive under $6,000 in 12 months. Realistic all-in is about 3%.
- **Best for:** marketplace payouts where the platform pays Payoneer for free.
- **Link:** https://payoneer.com/fees

### PayPal
- **What:** what clients reach for by habit.
- **Fees:** 4.40% + fixed fee for international receipts, 18% GST on PayPal's fees, plus about 3–4% currency conversion spread. Realistically 8–9% all-in.
- **If you must:** add a "PayPal +6%" line, withdraw promptly and download the monthly FIRA.
- **Link:** https://www.paypal.com/in/webapps/mpp/merchant-fees

### Direct bank SWIFT
- **What:** the client wires money to your Indian bank account (SWIFT/BIC + account number).
- **Costs:** sender fee $15–50 (client side), intermediary/correspondent deductions $10–30, your bank's inward charge ₹0–500 + GST, and an FX spread of 0.5–2% that you can negotiate on large amounts.
- **Tips:** ask the client to choose **"OUR"** charges so you receive the full amount. Give the exact beneficiary name as on the bank account and your bank's SWIFT code. Request a FIRA/FIRC from the bank for each credit, and state the purpose code when the bank calls or emails.
- **Best for:** invoices over $10k with a pre-agreed rate ("card rate minus X paise").

### Stripe (India)
- Invite-only for new Indian accounts since May 2024, and still not open for general sign-up as of this writing. Use Razorpay for cards instead.
- **Link:** https://support.stripe.com/questions/stripe-accounts-are-invite-only-in-india

### Marketplace payouts (Upwork, Contra, Toptal, Arc)
- **Upwork:** variable 0–15% service fee per contract **plus 18% GST on that fee** for India-based freelancers. Compare its direct-to-local-bank (INR) withdrawal with Payoneer on a real payout.
- **Others:** each has its own payout options. Check whether it issues a FIRA or whether your receiving bank/aggregator does.
- Platform fees are a cost of sale. Your FIRA should show the **gross amount** that reached India.

### Domestic (Indian clients)
- **NEFT/IMPS/RTGS** to the business account: free and the default. Put account name, number, IFSC and UPI ID on every invoice.
- **UPI:** fine for small amounts. Use the business account's UPI ID.
- **Razorpay payment links:** about 2% + GST for cards/netbanking. Use them only if the client asks, and price the fee in.

## Setup steps (45 minutes, do once)

1. Pick a **primary** rail (Skydo or BriskPe) and a **backup** (Razorpay MoneySaver).
2. Complete KYC on both: PAN, Aadhaar, and your **business-only** bank account.
3. Set your default **purpose code**: P0802 software consultancy/implementation (or P0807 if your bank/CA prefers it for remote development). Use it consistently.
4. Generate local account details (USD at minimum, plus GBP/EUR if relevant).
5. Paste the details into the [Invoice Generator](../tools/invoice-generator.html) payment block.
6. Run a **test payment** (e.g. $50 from a friend abroad, or your first small invoice) and check the fee, the rate you got against mid-market, and that the FIRA arrived.
7. Save each FIRA as `Receipts-FIRA/PK-26-27-001-FIRA.pdf` (named after the invoice).

## Payment instructions block (copy into invoices)

```
PAYMENT DETAILS
Preferred: USD bank transfer (ACH or domestic wire), no conversion on your side
  Beneficiary:   {{YOUR_NAME}}
  Bank:          {{RAIL_BANK_NAME}}  (collected via {{RAIL}})
  Routing (ABA): {{ROUTING_NUMBER}}    Account: {{ACCOUNT_NUMBER}}   Type: Checking
  Reference:     {{INVOICE_NUMBER}}
GBP (UK FPS):    Sort code {{SORT_CODE}}  Account {{UK_ACCOUNT}}
EUR (SEPA):      IBAN {{IBAN}}  BIC {{BIC}}
International wire (SWIFT): please choose "OUR" charges so the full amount arrives.
Terms: due in 7 days. Purpose: software development services (export of services from India).
```

## Documents & codes, one line each

- **FIRA:** proof of a foreign inward remittance. Get one per payment and file it against the invoice.
- **Purpose code:** P0802 (software consultancy/implementation) as the default; P0807 (off-site software exports) if your bank classifies it so. Never "family maintenance" or "gift".
- **Realisation:** within **9 months** of the invoice date (12 if invoiced in INR) under the FEMA 2026 regulations.
- **EDF:** resident individuals are *deemed* to have filed once they give the bank the remittance details (RBI amendment of 2 Nov 2026). Firms and companies get the same treatment for amounts up to ₹10L.
- **W-8BEN:** for US clients; PAN as foreign TIN. See [Tax & Money](../memos/03-tax-and-money.html#foreign-income).

## Red flags (walk away)

- A client wants to pay by **cheque from abroad**, crypto, gift cards, or "overpay so you can refund the difference to our vendor".
- Payment from a third party you never contracted with, or from a country that doesn't match the client.
- A "platform" asks you to pay a fee to *release* your payment.
- Pressure to use a personal account or label the payment as a gift.
- More: [Risks & Scams](../memos/11-risks-and-scams.html).

## Sources

1. [Skydo fees breakdown (Xflow blog)](https://www.xflowpay.com/blog/skydo-fees) and [Skydo vs Payoneer (Skydo)](https://www.skydo.com/compare/skydo-vs-payoneer): Skydo $19/$29/0.3% + GST, free FIRA
2. [BriskPe pricing (Skydo comparison page)](https://www.skydo.com/compare/briskpe-pricing): $16/$25/0.25% + GST (competitor-published ⚠)
3. [Razorpay MoneySaver Export Account](https://razorpay.com/accept-international-payments/money-saver/) and [Xflow on Razorpay charges](https://www.xflowpay.com/blog/razorpay-international-payment-gateway-charges): 1% + GST, no FX markup
4. [Xflow pricing](https://www.xflowpay.com/pricing)
5. [Wise Help: verify your Indian business to receive payments](https://www.wise.com/help/articles/6Kpm9pXlJW79OGAktSnHos/how-to-verify-your-indian-business-to-receive-payments), [Wise newsroom, Feb 2026](https://newsroom.wise.com/en-CAS/249593-wise-doubles-down-in-india-announces-new-hub-in-hyderabad-and-launches-international-account-details-for-businesses-to-get-paid-from-a/) and [Winvesta: Wise vs Winvesta 2026](https://www.winvesta.in/blog/businesses/wise-vs-winvesta-which-is-actually-better-for-indian-freelancers-in-2026) (personal-account change ⚠)
6. [Payoneer fees](https://payoneer.com/fees) and [Payoneer India pricing](https://payoneer.com/en-in/about/pricing)
7. [PayPal India merchant fees](https://www.paypal.com/in/webapps/mpp/merchant-fees) and [Skydo on PayPal charges](https://skydo.com/blog/paypal-transaction-fees-india) (conversion spread estimate ⚠)
8. [Stripe Support: invite-only in India](https://support.stripe.com/questions/stripe-accounts-are-invite-only-in-india)
9. [Upwork Help: GST for India-based freelancers](https://support.upwork.com/hc/en-us/articles/360041114713): 18% GST on Upwork's fee
10. [Purpose code P0802 (Skydo)](https://www.skydo.com/rbi-purpose-codes/P0802-software-consultancy-and-implementation) and [P0807 (Razorpay)](https://razorpay.com/blog/p0807-purpose-code-software-exports/)
11. [FIRC vs FIRA vs e-BRC (Winvesta)](https://www.winvesta.in/blog/businesses/firc-vs-fira-vs-e-brc-which-proof-of-foreign-payment-do-you-actually-need)
12. [RBI relaxes EDF filing (TaxGuru)](https://taxguru.in/rbi/rbi-relaxes-edf-filing-rs-10-lakh-limit-service-exporters-fema-2026.html) and [FEMA 2026: 9-month realisation (TaxGuru)](https://taxguru.in/rbi/rbi-fema-export-rules-2026-9-month-realisation-12-month-inr-deadline.html)
