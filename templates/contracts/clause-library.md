# Clause Library — pick, adapt, defend

> **Template — have a lawyer review for high-value deals.** Not legal advice. Indian law as understood in Nov 2026.
>
> **How to use:** Each clause has four parts: **Default**, the wording you propose; **Fallback**, what you concede if pushed; **Walk away**, the point where the deal costs more than it pays; and **Why**, the plain-English reason. Copy wording into the MSA/SOW, or into your redline of a client's paper. For the client-side mirror of this list, see [red-flag-clauses.md](red-flag-clauses.md).
>
> **Golden rule:** when you're new it's tempting to give in on everything. Concede on **governing law, notice periods and formality**. Hold firm on **money, IP-on-payment, liability cap and non-compete**.

**Index:** [1 Deposit](#1-deposit-and-payment-schedule) · [2 Payment terms](#2-payment-terms-and-method) · [3 Late interest/MSMED](#3-late-payment-interest-and-msmed-act) · [4 Stop-work](#4-stop-work) · [5 GST/TDS](#5-gst-and-tds-india) · [6 International tax/FX](#6-international-taxes-currency-bank-fees) · [7 IP on payment](#7-ip-assignment-on-full-payment) · [8 Background IP](#8-background-ip-licence) · [9 Open source](#9-open-source) · [10 Portfolio](#10-portfolio-and-publicity) · [11 Acceptance](#11-acceptance-and-deemed-acceptance) · [12 Revisions](#12-revisions) · [13 Warranty](#13-warranty) · [14 Liability cap](#14-limitation-of-liability) · [15 Indemnity](#15-indemnity-narrow) · [16 Termination/kill fee](#16-termination-and-kill-fee) · [17 Non-solicit](#17-non-solicitation) · [18 No non-compete](#18-no-non-compete-and-exclusivity) · [19 Confidentiality](#19-confidentiality-and-residuals) · [20 Independent contractor](#20-independent-contractor) · [21 AI disclosure](#21-ai-assisted-development) · [22 Third-party costs/accounts](#22-third-party-costs-and-accounts-in-clients-name) · [23 Security](#23-security-and-credentials) · [24 DPDP/GDPR](#24-data-protection-dpdp-and-gdpr) · [25 Force majeure](#25-force-majeure) · [26 Disputes](#26-dispute-resolution-variants) · [27 E-sign](#27-e-signature-and-counterparts) · [28 Client delays](#28-client-delays-and-idle-time) · [29 Change control](#29-change-control) · [30 Availability](#30-availability-and-response-times) · [31 After-care](#31-after-care-and-maintenance) · [32 Equity deals](#32-equity-or-revenue-share)

---

## 1. Deposit and payment schedule
- **Default:** "50% of the Fees on signing, 50% on acceptance. For Fees above ₹2,00,000 / USD 5,000: 40% on signing, 40% at [named mid-project milestone], 20% on acceptance. Work starts when the deposit clears." Jobs ≤ ₹25k / $500: **100% upfront**.
- **Fallback:** 30% upfront, then monthly or bi-weekly milestone billing, so you're never owed more than ~2 weeks of work. Large corporate client with a slow vendor process: start only after the PO is issued, bill monthly in arrears on Net 15, and cap your exposure at one month.
- **Walk away:** 0% upfront from an unknown client; "pay on completion" for anything longer than 2 weeks; "we'll pay after our funding round".
- **Why:** The deposit filters out non-serious clients, funds your time, and is the only collection tool that actually works across borders. Never start work on a promise.

## 2. Payment terms and method
- **Default:** "Invoices are due within 7 days. Payment by bank transfer/UPI/payment link. Client bears its own bank charges [international: and intermediary fees, so that Consultant receives the full amount]."
- **Fallback:** Net 15. For Indian buyers, never beyond 45 days (MSMED Act s.15 caps credit to Udyam-registered micro/small suppliers at 45 days from acceptance).
- **Walk away:** Net 60/90, or "payment upon client's satisfaction".
- **Why:** Short terms plus a deposit keep cash flowing. Card or PayPal payments can be reversed by chargeback for months, so take larger amounts by bank transfer.

## 3. Late-payment interest and MSMED Act
- **Default (India):** "Overdue amounts bear interest at 1.5% per month. Consultant is a micro enterprise registered under Udyam (No. __). Sections 15–16 of the MSMED Act, 2006 apply: payment within the agreed period (not exceeding 45 days from acceptance), failing which compound interest with monthly rests at three times the RBI bank rate is payable."
- **Fallback:** Drop the 1.5% contractual rate and keep only the MSMED reference. The statutory interest applies anyway; you're just reminding them.
- **International default:** "1.5% per month or the maximum lawful rate, whichever is lower, plus reasonable collection costs."
- **Why:** With the RBI bank rate at **5.75% (Oct 2026)**, MSMED interest is about **17.25% p.a., compounded monthly**. Buyers also lose their income-tax deduction for late payments to micro/small suppliers (old s.43B(h), now **s.37(2)(g)** of the Income-tax Act 2025) until they actually pay. Say this politely in reminders and it works. **Register on Udyam before you sign:** *Silpi Industries* (SC 2021) denied MSMED remedies for post-contract registration, while *NBCC v State of WB* (SC 2025) took a broader view. Until a larger bench settles it, don't rely on registering after the contract.

## 4. Stop-work
- **Default:** "If any amount is overdue by more than 14 days, Consultant may, on 3 Business Days' notice, suspend all Services under all SOWs until paid. Deadlines extend accordingly; Consultant is not liable for consequences of suspension."
- **Fallback:** 21 days overdue, 5 days' notice.
- **Walk away:** any wording that obliges you to keep working while unpaid.
- **Why:** Without this clause, stopping work can itself be argued as your breach.

## 5. GST and TDS (India)
- **Default:** "Fees exclude GST, which will be charged at the applicable rate [if registered]. Client may deduct TDS as required by the Income-tax Act, 2025 (currently s.393) on the Fees excluding GST, deposit it on time and issue the TDS certificate; amounts deducted but not reflected in Consultant's tax credit statement within 60 days of quarter-end remain payable."
- **Notes:** In late 2026 the TDS rates are 10% for professional services and 2% for "fees for technical services", above a ₹50,000 annual threshold per payee. Many clients classify software work as technical services (2%), others as professional (10%). Ask early so your cash forecast is right. TDS applies to the fee *excluding* GST when GST is shown separately (CBDT Circular 23/2017 under the old Act; confirm it carries over with your CA). If you're **not** GST-registered, say so on the invoice and in the contract. Details: [03-tax-and-money](../../memos/03-tax-and-money.html).

## 6. International: taxes, currency, bank fees
- **Default:** "Fees are in USD and exclude VAT/GST/sales taxes, which Client bears (including by reverse charge). If Client must withhold tax by law, it will notify Consultant in advance and provide receipts. Client bears its own and intermediary bank charges. Consultant will provide Form W-8BEN on request."
- **Why:** You pay Indian income tax on this income. US clients shouldn't withhold for services performed outside the US: a W-8BEN, not a W-9, documents that.

## 7. IP assignment on full payment
- **Default:** "Subject to receipt of all Fees due under the SOW, Consultant assigns to Client all copyright and other IP rights in the Project Code and Deliverables. In accordance with s.19 of the Copyright Act, 1957, this assignment covers all rights in all media and modes now known or later developed, for the full term of copyright, worldwide, shall not lapse under s.19(4), and is made in consideration of the Fees. Until full payment, Client has a revocable licence to use the Deliverables for review and, while payments are current, in production."
- **Fallback:** Assignment per milestone, on payment of that milestone (works well for long projects).
- **Walk away:** "All IP vests in Client upon creation" *combined with* no deposit. Accept "upon creation" only if you're paid upfront or in arrears weekly.
- **Why this exact wording:** In India a freelancer working under a contract *for* service is the **first owner** of the code (s.17). Ownership moves only by a **written, signed** assignment (s.18–19). If the assignment doesn't state its duration it **defaults to 5 years**; if it doesn't state territory it **defaults to India only** (s.19(5)–(6)). The Delhi High Court applied exactly these defaults to a software assignment in *Pine Labs v Gemalto*. An assignment also **lapses if not exercised within 1 year** unless the contract says otherwise (s.19(4)). Clients' lawyers will appreciate that you've fixed this. US-style: "Effective upon full payment, Consultant hereby assigns…" (the "hereby" creates a present assignment).

## 8. Background IP licence
- **Default:** "Consultant retains Background IP (pre-existing or independently developed code, libraries, templates, tools, know-how). On full payment, Client receives a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use, modify and distribute Background IP as part of the Deliverables."
- **Fallback:** List the material Background IP in the SOW so the client sees exactly what's excluded. Offer an exclusive licence for a fee.
- **Walk away:** assignment of your starter kits, utilities or reusable components, since that would stop you reusing them for every future client.
- **Why:** Reusing your own toolkit is how fixed-price work becomes profitable.

## 9. Open source
- **Default:** "Third-Party Components (including open-source software) remain under their licences. Consultant will not include components whose licences require disclosure of Client's proprietary source code (e.g., AGPL; GPL in distributed software) without Client's approval. Material components are listed in the handover documentation."
- **Why:** Clients' due-diligence (fundraising, acquisition) checks licences. MIT/Apache/BSD are fine. Strong copyleft needs a conscious decision.

## 10. Portfolio and publicity
- **Default:** "Consultant may name Client and show its logo as a client and describe the work at a high level (no Confidential Information) unless Client opts out by email. Detailed case studies, metrics or screenshots require Client's prior written approval, not unreasonably withheld."
- **Fallback:** Anonymised description only ("a D2C fashion brand doing ₹X Cr GMV").
- **Why:** Your portfolio is your lead engine ([09-portfolio-and-brand](../../memos/09-portfolio-and-brand.html)). Clients rarely object if you ask up front, and many will refuse if you ask after the fact.

## 11. Acceptance and deemed acceptance
- **Default:** "Client tests each Deliverable against the Acceptance Criteria within 5 Business Days and either accepts or lists specific, reproducible non-conformities. A Deliverable is accepted on written acceptance, on expiry of the review period without a compliant rejection, or on production use."
- **Fallback:** 10 Business Days. Keep within MSMED's 15-day deemed-acceptance window for Indian buyers.
- **Walk away:** "acceptance at Client's sole discretion" with no criteria and no deadline. That gives the client an unlimited free revision loop and an indefinitely delayed final payment.

## 12. Revisions
- **Default:** "Design/content items include 2 revision rounds; further rounds are Change Requests." For code, the acceptance criteria take the place of revision rounds.
- **Walk away:** "unlimited revisions".

## 13. Warranty
- **Default:** "For 30 days after acceptance, Deliverables will materially conform to the Acceptance Criteria; sole remedy is correction or refund of the affected Deliverable's Fees. Excludes third-party changes, platform/API changes, hosting, misuse. No other warranties; no guarantee of business results."
- **Fallback:** 60–90 days for larger projects; price it in (+5–10%).
- **Walk away:** "warrants the software is error-free", or open-ended warranties.

## 14. Limitation of liability
- **Default:** "Neither party is liable for indirect/consequential loss or lost profits/revenue/data. Each party's total liability per SOW is capped at the Fees paid and payable under that SOW in the 12 months before the claim. The cap does not apply to Client's payment obligations or to fraud/wilful misconduct."
- **Fallback:** Breach of confidentiality or data protection capped at **2×** Fees. Or a fixed cap (₹10–25 lakh / $25–50k), if the client's lawyer insists on a number and you can get professional-indemnity insurance.
- **Walk away:** uncapped liability or uncapped indemnities on a ₹50k project. One incident (a checkout outage during a sale, or a data leak) could bankrupt you.
- **Why:** Indian law (Contract Act s.73) already excludes remote losses, but an explicit cap removes the arguments. A cap tied to fees is the market norm for small vendors.

## 15. Indemnity (narrow)
- **Default:** You defend only third-party **copyright** claims about code you wrote, excluding client materials, open source, third-party components, and modifications by others. The client indemnifies you for its materials and its business. Both indemnities are subject to the cap.
- **Walk away:** "indemnify and hold harmless against any and all losses arising from the Services", which is effectively insurance you're giving away for free.

## 16. Termination and kill fee
- **Default:** "Either party may terminate for convenience on 15 days' notice. Client pays for work done (pro-rated milestones), non-cancellable costs, and — on Client's convenience termination — 25% of the uninvoiced Fees of the current milestone as a genuine pre-estimate of loss from reserved capacity. Deposit applies; unearned balance refunded."
- **Fallback:** Drop the 25% fee and keep payment for work done plus the notice period.
- **Why:** In India, a pre-agreed sum is enforceable only as **reasonable compensation** up to the named amount (Contract Act s.74; *Kailash Nath v DDA*, SC 2015). Hence the "genuine pre-estimate" wording and a modest percentage rather than a penalty.

## 17. Non-solicitation
- **Default:** mutual, people only: "During a SOW and 6 months after, neither party will directly solicit for employment the other's personnel it worked with. General ads excluded."
- **Agency variant:** a narrow End-Client non-solicit (12 months, only clients you worked with) with a **release fee**. See [subcontractor-white-label-agreement.md](subcontractor-white-label-agreement.md) cl. 6.
- **Why:** Courts treat narrow, time-limited non-solicits more kindly than non-competes, but enforceability in India is uncertain (s.27). Keep yours modest so it isn't a reason to stall the deal.

## 18. No non-compete (and exclusivity)
- **Default:** "Nothing restricts Consultant from providing services to any person, including Client's competitors, during or after the term, subject to confidentiality."
- **If the client asks for a non-compete:** "Post-term non-competes are void in India under s.27 of the Contract Act. What I can offer is strict confidentiality, no use of your code or data, and a 6-month non-solicit of your team."
- **If the client wants exclusivity *during* the engagement:** price it. Exclusivity in a named niche (for example "no direct competitor of yours in Indian ethnic-wear D2C") for the term only, for a retainer premium of +25–50%.
- **Walk away:** any industry-wide restraint, especially in your core niche (D2C/Shopify). It would kill Track A.

## 19. Confidentiality and residuals
- **Default:** mutual; 3 years post-term (credentials, personal data and trade secrets for as long as they remain such); standard exclusions; return/delete on request with a backup carve-out; **residual-knowledge clause** (general skills and know-how retained in unaided memory may be used).
- **Walk away:** perpetual confidentiality over "all information" with no exclusions. That's impossible to comply with.

## 20. Independent contractor
- **Default:** "Consultant is an independent contractor… responsible for its own taxes, insurance and compliance; no authority to bind Client; controls method, tools, hours and place of work."
- **Why:** Protects both sides from employment-law reclassification (PF, gratuity, labour codes in India; misclassification rules abroad). Don't accept fixed office hours, company equipment or "reporting manager" language. Those signal employment.

## 21. AI-assisted development
- **Default:** "Consultant may use AI-assisted tools under its AI Usage Policy; reviews and tests all output; does not input Client secrets, credentials or personal data; uses only tools/plans that do not train on Client inputs. Client may restrict tools in the SOW (may affect timeline and Fees)." Link [../delivery/ai-usage-policy.md](../delivery/ai-usage-policy.md).
- **Optional IP sentence (for sophisticated clients):** "Consultant assigns all rights it holds in the Deliverables. Consultant does not warrant that portions generated with AI assistance without material human authorship are protectable by copyright."
- **Why:** In Jan 2025 the US Copyright Office said prompts alone don't make you the author of AI output; human selection, arrangement and modification can be protected. Disclosing tool use upfront builds trust and stops "you used ChatGPT!" disputes later.

## 22. Third-party costs and accounts in client's name
- **Default:** "Client owns and pays for production accounts (hosting, domains, app stores, payment gateways, SaaS, APIs) in its own name. Third-party costs are paid by Client directly or reimbursed at cost with prior approval."
- **Why:** If production runs on *your* Vercel/Supabase/AWS card, you're the client's unpaid bank and their single point of failure. Clean ownership also makes handover and firing simple.

## 23. Security and credentials
- **Default:** "Client grants individual, least-privilege, MFA-protected access; credentials are shared only via a password manager; access is revoked at completion. Consultant keeps devices encrypted and up to date." Link [../delivery/credentials-and-access-policy.md](../delivery/credentials-and-access-policy.md).

## 24. Data protection (DPDP and GDPR)
- **Default (India):** "Where Consultant processes Personal Data on Client's behalf, Client is Data Fiduciary and Consultant is Data Processor under the DPDP Act, 2023: instructions-only processing; reasonable security safeguards (Rule 6); breach notice to Client within 24 hours; no sub-processors without consent beyond listed infrastructure; deletion/return at end; assistance with requests at the change rate."
- **International:** process on instructions; appropriate technical and organisational measures; 24-hour breach notice; sign the client's reasonable DPA (GDPR Art. 28; SCCs where needed).
- **Timing:** The DPDP Rules were notified on **13 Nov 2025**. Most obligations, including security safeguards, breach reporting and processor contracts, apply from **about 13 May 2027**. Clients are writing these terms into contracts now; accept the reasonable ones.
- **Walk away:** unlimited liability for any data incident, or obligations to hold cyber insurance you don't have, on small deals.

## 25. Force majeure
- **Default:** events beyond reasonable control (disasters, epidemics, war, government action, widespread internet, power or cloud outages). **Payment for work done is never excused.** Either party may terminate after 30 days without the kill fee.

## 26. Dispute resolution variants
Indian law requires **pre-institution mediation** before a commercial suit (Commercial Courts Act s.12A, mandatory per *Patil Automation*, SC 2022; applies at ₹3 lakh+). Unilateral arbitrator appointment clauses are suspect after the Supreme Court Constitution Bench in *CORE v ECI-SPIC-SMO-MCML* (Nov 2024), so always provide for **mutual** appointment.

| Variant | Wording (short) | Use when |
|---|---|---|
| **A. Courts only** | "Subject to escalation and the MSMED Act, courts at Pune have exclusive jurisdiction." | Small Indian deals (< ₹5 lakh). The cheapest to draft, and you'd use MSME Samadhaan or a legal notice first anyway. |
| **B. Fast-track arbitration** (MSA default) | "Sole arbitrator by mutual agreement (failing which under s.11); fast-track procedure under s.29B (written submissions, award within 6 months); seat Pune; online hearings." | Indian deals ₹2–50 lakh where the client wants arbitration. |
| **C. Institutional (MCIA)** | "Arbitration administered by the Mumbai Centre for International Arbitration under its Rules (Expedited Procedure where eligible); sole arbitrator; seat Mumbai." | Larger Indian or cross-border deals. Note MCIA charges filing and administration fees. |
| **D. SIAC** | "SIAC Rules; sole arbitrator; seat Singapore; Streamlined Procedure where eligible (≤ S$1M)." | Foreign clients, $5k+. Neutral and enforceable in 170+ New York Convention countries. |
| **E. Client's courts** | "Laws of [State]; courts of [City]." | Foreign deals under ~$10k. Accept it, because you'll rely on the deposit, not litigation. |

**Always add:** "Nothing limits Consultant's rights under the MSMED Act." The MSMED Act's facilitation council route overrides private arbitration clauses for registered micro/small suppliers.

## 27. E-signature and counterparts
- **Default:** "May be executed in counterparts and by electronic signature, including Aadhaar-based eSign or any reputable e-signature platform, which the Parties agree is valid and binding."
- **Why:** IT Act s.10A validates contracts formed electronically. Aadhaar eSign is a Second-Schedule "electronic signature" and the strongest form. Click-to-sign platforms and email acceptance also form valid contracts (*Trimex*, SC 2010). Keep the audit trail. In court, electronic records need a certificate under **s.63 of the Bharatiya Sakshya Adhiniyam, 2023** (formerly s.65B of the Evidence Act).

## 28. Client delays and idle time
- **Default:** "Client provides inputs within 2 Business Days of request. If Client delays total more than 5 Business Days, dates move at least day-for-day and Consultant may invoice idle reserved capacity at the day rate (capped at 2 days per week of delay) after notice."
- **Why:** Most "late" projects are late because of the client. This clause makes that visible without a fight.

## 29. Change control
- **Default:** "Changes require a written Change Request approved by Client's contact (email suffices). Consultant quotes impact within 3 Business Days; no obligation to start before approval; priced at [rate]." Template: [change-request.md](change-request.md).

## 30. Availability and response times
- **Default:** "Business hours 10:00–19:00 IST, Mon–Fri; response within 1 Business Day; urgent production issues within 4 business hours; [N] hours overlap with Client's time zone." Out-of-hours emergencies are billed at 1.5×.
- **Walk away:** "available 24/7" without a Priority care-plan fee.

## 31. After-care and maintenance
- **Default:** "Post-warranty support is available under a Care Plan ([retainer-agreement.md](retainer-agreement.md)). Without a Care Plan, requests are quoted at the hourly rate, subject to availability."
- **Why:** This turns "small favours forever" into recurring revenue.

## 32. Equity or revenue share
- **Default:** decline as the *sole* payment. If you're genuinely excited about the client: cash at ≥ 70% of your rate, plus equity documented properly (SAFE / ESOP / share subscription with a vesting schedule, reviewed by a lawyer), plus a cash fallback if no funding round happens within 12 months.
- **Why:** Most early startups fail, and "sweat equity" without paperwork is worth nothing. Revenue share needs audit rights and a minimum guarantee.
