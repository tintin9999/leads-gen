# Master Services Agreement — India

> **Template — have a lawyer review for high-value deals** (₹5 lakh+, unlimited-liability asks, health/finance data, equity or revenue-share). Not legal advice. Law as understood in Nov 2026.
>
> **When to use:** Any Indian client where you expect repeat work, or the first project is ₹50,000+. Sign the MSA once; each project then needs only a short SOW ([sow-template.md](sow-template.md)). One-off job under ₹50,000? Use [one-page-agreement.md](one-page-agreement.md).
>
> **How to fill:** Replace every `{{…}}` and `[bracketed choice]`. Delete `[guidance]` notes. Keep price, scope and dates in the SOW, not here. Pay stamp duty (₹500 in Maharashtra, Art. 5(h)(B)) on or before the signing date, then e-sign. Delete clause 7.2 if you are not Udyam-registered. Register on Udyam *before* signing: courts are split on whether registration after the contract counts.
>
> **Never remove:** 6.2 (no work before the deposit), 7.3 (stop-work), 8.4 (deemed acceptance), 9.3–9.4 (IP passes only on full payment, with full-term, worldwide, no-lapse wording; Copyright Act s.19 defaults otherwise cut the assignment to 5 years and India only), 13 (liability cap), 16.4 (payment on termination), 17.2 (no non-compete).

---

**This Master Services Agreement** ("**Agreement**") is made on **{{EFFECTIVE_DATE}}** ("**Effective Date**") at **{{PLACE_OF_SIGNING — e.g. Pune}}**

**BETWEEN**

**{{BUSINESS_NAME}}**, a sole proprietorship of {{YOUR_NAME}}, PAN {{YOUR_PAN}}, GSTIN {{YOUR_GSTIN}} [or "not registered under GST"], Udyam Registration No. {{UDYAM_NUMBER}}, of {{YOUR_ADDRESS}} ("**Consultant**");

**AND**

**{{CLIENT_LEGAL_NAME}}**, a [private limited company / LLP / partnership / proprietorship] [CIN/LLPIN {{CLIENT_CIN}}], PAN {{CLIENT_PAN}}, GSTIN {{CLIENT_GSTIN}}, having its registered office at {{CLIENT_ADDRESS}} ("**Client**").

Consultant and Client are each a "**Party**".

---

## 1. Definitions

**1.1 "Acceptance Criteria"**: the objective tests in a SOW that a Deliverable must meet.

**1.2 "Background IP"**: code, libraries, components, templates, tools, know-how and documentation that Consultant owned or licensed before the start of a SOW, or develops independently of the Services. This includes generic utilities reused across clients, and improvements to them that are not specific to Client.

**1.3 "Business Day"**: any day except Saturday, Sunday or a public holiday in Maharashtra.

**1.4 "Change Request"**: a written request to change a SOW, handled under clause 5.

**1.5 "Client Materials"**: content, data, designs, trademarks, credentials, accounts and other materials that Client provides or that are provided on its behalf.

**1.6 "Deliverables"**: the work product listed in a SOW. This includes source code written specifically for Client ("**Project Code**") and its documentation. It does not include Background IP, Third-Party Components or Client Materials.

**1.7 "Fees"**: the fees set out in a SOW.

**1.8 "Personal Data", "Data Fiduciary", "Data Processor", "Data Principal"**: these have the meanings given in the Digital Personal Data Protection Act, 2023 ("**DPDP Act**").

**1.9 "SOW"**: a statement of work that refers to this Agreement and is signed by both Parties.

**1.10 "Third-Party Components"**: open-source software, SaaS platforms, APIs, themes, apps, plugins, fonts and other materials licensed from third parties (for example Shopify, Razorpay, Vercel, Supabase, npm packages).

## 2. Structure

**2.1** This Agreement sets the terms for every SOW. Each SOW is a separate contract that incorporates this Agreement.

**2.2** If documents conflict, this order applies: (a) an approved Change Request; (b) the SOW; (c) this Agreement. A SOW overrides a clause of this Agreement only if it names that clause expressly.

**2.3** Neither Party has to sign any SOW. Without a signed SOW, Consultant has no obligation to do any work.

## 3. Services

**3.1** Consultant will perform the Services in each SOW with reasonable skill, care and diligence, in line with good industry practice.

**3.2** Consultant decides the method, tools, working hours and place of work. This is subject to the milestones, communication plan and security requirements in the SOW.

**3.3** Consultant may use subcontractors only with Client's prior written consent (email is enough) and stays responsible for their work.

**3.4 Non-exclusive.** Consultant may work for anyone else, including businesses in Client's industry, as long as it complies with clause 10.

**3.5 AI-assisted development.** Consultant may use AI-assisted development tools in line with its AI Usage Policy ({{LINK_TO_AI_USAGE_POLICY}}). Consultant will: (a) review and test all output before delivering it; (b) not put Client secrets, credentials or Personal Data into such tools; and (c) use only tools or plans configured not to train on Client inputs. Client may restrict specific tools in a SOW. Doing so may affect timeline and Fees.

## 4. Client responsibilities

**4.1** Client will:
- (a) appoint one point of contact who can make decisions and approve Change Requests: **{{CLIENT_CONTACT_NAME}}, {{CLIENT_EMAIL}}**;
- (b) provide Client Materials, access and decisions within {{2}} Business Days of a request, or by the dates in the SOW;
- (c) review and test Deliverables under clause 8;
- (d) own and pay for production accounts (hosting, domains, app stores, payment gateways, SaaS) in its own name, unless a SOW says otherwise;
- (e) make sure it has the rights to Client Materials, and that using them under this Agreement is lawful.

**4.2** If Client's delays add up to more than {{5}} Business Days under a SOW, Consultant may:
- (a) move affected dates by at least the length of the delay;
- (b) reschedule work to fit its availability; and
- (c) if it reserved capacity it cannot reuse, invoice idle time at the SOW day rate after giving written notice. This is capped at {{2}} days for each week of delay.

## 5. Change control

**5.1** Either Party may propose a change in writing. Within {{3}} Business Days, Consultant will reply with the impact on scope, timeline and Fees, using its Change Request form.

**5.2** A change binds the Parties only once Client's point of contact approves it in writing (email is enough). Consultant does not have to start changed work before approval.

**5.3** Unless the SOW says otherwise, changes are priced at Consultant's current rate of **{{₹ RATE_PER_HOUR}} per hour / {{₹ RATE_PER_DAY}} per day**.

## 6. Fees, invoicing and payment

**6.1** Fees and payment milestones are set out in each SOW. If the SOW says nothing:
- Fees up to ₹2,00,000: 50% on signing (the "**Deposit**") and 50% on acceptance;
- Fees above ₹2,00,000: 40% on signing (the Deposit), 40% at the mid-project milestone named in the SOW, and 20% on acceptance.

**6.2** Work starts once the Deposit is received in cleared funds. Delivery dates run from that day.

**6.3** Invoices are payable within **{{7}} days** of the invoice date. [Never agree to more than 45 days. That is the MSMED Act ceiling for micro and small suppliers.] Payment is by NEFT/RTGS/IMPS, UPI or a payment link, to the account on the invoice. Client pays its own bank charges.

**6.4 GST.** Fees exclude GST. [If registered:] GST at the applicable rate (currently 18% for IT services) will be added to each invoice. [If not registered:] Consultant is not registered under GST, so no GST is charged.

**6.5 TDS.** Client may deduct tax at source where the Income-tax Act, 2025 requires it (currently section 393). Deduction applies only to Fees excluding GST, where GST is shown separately on the invoice. Client will:
- (a) deposit the tax on time;
- (b) issue the TDS certificate within the statutory period; and
- (c) make sure the credit appears against Consultant's PAN.

If an amount is deducted but not reflected against Consultant's PAN within 60 days of the end of the quarter, Client still owes it.

**6.6 Expenses.** Only expenses pre-approved in writing are reimbursable, at cost, with receipts. Third-party costs (licences, apps, hosting, paid APIs, stock assets) are either paid by Client directly or reimbursed at cost.

**6.7 Disputed invoices.** Client must raise a specific, good-faith dispute in writing within {{5}} days of the invoice date, and pay the undisputed part on time. Any invoice not disputed this way is accepted.

**6.8** Client may not set off any amount against Fees without Consultant's written agreement.

## 7. Late payment and suspension

**7.1** Overdue amounts carry interest at **1.5% per month (18% per annum)** from the due date until paid. This does not affect Consultant's other rights.

**7.2 MSMED Act.** [Delete if not Udyam-registered.] Consultant is a micro enterprise registered under Udyam (No. {{UDYAM_NUMBER}}). Client acknowledges that sections 15 to 16 of the Micro, Small and Medium Enterprises Development Act, 2006 apply. Under them:
- payment is due by the agreed date, which cannot be more than 45 days after acceptance or deemed acceptance;
- if payment is late, Client owes compound interest with monthly rests at three times the bank rate notified by the Reserve Bank of India; and
- Consultant may refer the dispute to the Micro and Small Enterprises Facilitation Council, including through the MSME Samadhaan portal.

Where statutory interest is higher than interest under 7.1, statutory interest applies.

**7.3 Stop-work.** If any amount is more than **{{14}} days** overdue, Consultant may give 3 Business Days' written notice and then suspend all Services under all SOWs until everything overdue is paid. Delivery dates move by the length of the suspension, plus reasonable time to restart. Consultant is not liable for any consequence of the suspension.

**7.4** If any amount is more than 30 days overdue, Consultant may suspend by notice Client's licence under clause 9.4 to use unpaid Deliverables.

## 8. Delivery and acceptance

**8.1** Consultant will tell Client when a Deliverable is ready for review, for example on a staging or preview environment.

**8.2** Within **{{5}} Business Days** (the "**Review Period**"), Client will test the Deliverable against the Acceptance Criteria and either:
- (a) accept it in writing; or
- (b) send a written list of specific, reproducible ways it fails the Acceptance Criteria.

**8.3** Consultant will fix the listed failures and resubmit. Clause 8.2 then applies only to the resubmitted parts. Any request that goes beyond the Acceptance Criteria is a Change Request.

**8.4 Deemed acceptance.** A Deliverable is accepted at the earliest of:
- (a) written acceptance;
- (b) the end of the Review Period, if no rejection notice that meets clause 8.2(b) has been received; or
- (c) Client, or its customers, using it in production for business purposes.

[This keeps you inside the MSMED Act's 15-day deemed-acceptance window.]

**8.5** Minor defects that do not prevent production use do not block acceptance. Consultant will fix them under the warranty in clause 12.

**8.6** Unless the SOW says otherwise, design and content items include **2 revision rounds**.

## 9. Intellectual property

**9.1 Background IP.** Consultant keeps all rights in Background IP. On full payment, Consultant grants Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use, copy, modify and distribute any Background IP included in the Deliverables. The licence covers use only as part of the Deliverables and later versions of them. Consultant will identify material Background IP in the SOW or the handover notes.

**9.2 Client Materials.** Client keeps all rights in Client Materials and grants Consultant a non-exclusive, royalty-free licence to use them only to perform the Services.

**9.3 Assignment on full payment.** Once Consultant has received all Fees due under a SOW, Consultant assigns to Client all copyright and other intellectual property rights in the Project Code and other Deliverables created under that SOW. Under section 19 of the Copyright Act, 1957, this assignment:
- (a) covers all rights in section 14 of that Act, including the rights to reproduce, adapt, modify, translate, sell, license and communicate to the public, in all media and modes, whether existing now or developed later;
- (b) lasts for the **full term of copyright**;
- (c) is **worldwide**;
- (d) **will not lapse under section 19(4)** if the rights are not exercised within one year; and
- (e) is made in return for the Fees, which Consultant accepts as full consideration, so no royalty is payable.

**9.4 Before full payment.** Until the assignment takes effect, title to the Deliverables stays with Consultant. Consultant grants Client a non-exclusive, revocable licence to use the Deliverables for testing and review, and also for production use as long as no payment is overdue.

**9.5 Moral rights.** As far as the law allows, Consultant will not use its rights under section 57 of the Copyright Act, 1957 to object to Client modifying or adapting the Deliverables, or not crediting Consultant.

**9.6 Third-Party Components.** Third-Party Components stay subject to their own licence terms, and Client agrees to comply with them. Without Client's approval, Consultant will not include open-source components whose licences would require Client to publish its proprietary source code (for example AGPL, or GPL in software distributed to users). Material Third-Party Components will be listed in the handover documents.

**9.7 Know-how.** Consultant remains free to use the general skills, experience, ideas and techniques it gains, and to build similar features for others. It may not use Client's Confidential Information or the Project Code to do so.

**9.8 Further assurance.** After full payment, Consultant will sign any reasonable document needed to record the assignment, at Client's cost.

## 10. Confidentiality

**10.1** "**Confidential Information**" means non-public information that one Party discloses to the other and that is marked confidential or would reasonably be understood to be confidential. It includes business data, source code, credentials, customer data and pricing.

**10.2** The receiving Party will:
- (a) use it only for this Agreement;
- (b) protect it with at least reasonable care; and
- (c) share it only with personnel and advisers who need it and are bound by similar duties.

**10.3** These obligations do not apply to information that:
- (a) is public, or becomes public without a breach;
- (b) the receiving Party already knew;
- (c) the receiving Party developed independently; or
- (d) was lawfully received from a third party without restriction.

**10.4** The receiving Party may disclose information where law, a court or a regulator requires it. It must give prompt notice where the law allows.

**10.5** These obligations last for the term of this Agreement and **3 years** after it ends. For trade secrets, credentials and Personal Data, they last as long as the information keeps that character.

**10.6** After a SOW ends, the receiving Party will return or delete Confidential Information on request. It may keep copies held in routine backups or required by law, and those copies stay confidential.

## 11. Data protection and security

**11.1** Where Consultant processes Personal Data for Client, Client is the Data Fiduciary and Consultant is a Data Processor under the DPDP Act and the Digital Personal Data Protection Rules, 2025. Consultant will:
- (a) process Personal Data only on Client's documented instructions, and only for the Services;
- (b) apply reasonable security safeguards, including access control, encryption where practicable, multi-factor authentication and logging, in line with Rule 6 of those Rules;
- (c) notify Client without undue delay of any personal data breach involving Client data, and in any case **within 24 hours** of becoming aware of it, with the details available. This lets Client meet its own duty to notify the Data Protection Board and affected Data Principals;
- (d) not use any sub-processor other than the infrastructure providers named in the SOW without Client's consent;
- (e) help Client with Data Principal requests and breach response. Effort beyond 2 hours a month is charged at the change rate;
- (f) on completion, delete or return Personal Data and confirm deletion in writing on request, unless law requires it to be kept.

**11.2** Client is responsible for its privacy notices, consents and lawful basis for processing, and for deciding what Personal Data to collect.

**11.3 Accounts and access.** Client owns and controls production accounts. Consultant uses individual, least-privilege access with MFA and never sends credentials in plain text over chat or email. On completion, Consultant hands access back or Client revokes it, under Consultant's Credentials & Access Policy ({{LINK}}).

**11.4** Unless a SOW includes backups, Client is responsible for backing up its own data and systems.

## 12. Warranties

**12.1** Each Party warrants that it has authority to enter into this Agreement.

**12.2** Consultant warrants that each Deliverable will materially meet its Acceptance Criteria for **{{30}} days** after acceptance (the "**Warranty Period**"). If this warranty is breached, Client's only remedy is for Consultant to fix the problem or, if it reasonably cannot, to refund the Fees for that Deliverable.

**12.3** The warranty does not cover problems caused by:
- changes made by anyone other than Consultant;
- Third-Party Components or platform changes (for example Shopify or Razorpay API updates);
- hosting or infrastructure;
- misuse; or
- environments not listed in the SOW.

**12.4** Consultant warrants that, as far as it knows, the Project Code is its original work or properly licensed, and does not knowingly infringe anyone's copyright.

**12.5** The Services and Deliverables come with no warranties other than those in this clause. Consultant does not guarantee business outcomes such as revenue, conversion rate, search ranking or app-store approval.

## 13. Limitation of liability

**13.1** Neither Party is liable for indirect or consequential loss, or for loss of profit, revenue, business, goodwill or data, however it arises. Restoring data from Client's backups is not excluded.

**13.2** Each Party's **total liability** under or in connection with a SOW is **limited to the Fees paid and payable under that SOW in the 12 months** before the event giving rise to the claim.

**13.3** Clauses 13.1 and 13.2 do not limit:
- (a) Client's obligation to pay Fees and interest;
- (b) liability for fraud or wilful misconduct; or
- (c) any liability that the law does not allow to be limited.

[Fallback if Client insists: breaches of clauses 10 and 11 capped at 2× the SOW Fees.]

## 14. Indemnities

**14.1** If a third party claims that Project Code, as delivered, infringes its copyright, Consultant will defend Client and pay any damages finally awarded or agreed in a settlement. To rely on this, Client must:
- (a) notify Consultant promptly;
- (b) give Consultant control of the defence and reasonable cooperation; and
- (c) make no admission.

This indemnity does not cover claims arising from Client Materials, Third-Party Components, changes not made by Consultant, or combinations with items Consultant did not supply. Consultant may instead change the Project Code so it no longer infringes, or refund the Fees for the affected Deliverable.

**14.2** Client will defend and indemnify Consultant against third-party claims arising from Client Materials, Client's products or services, or Client's unlawful use of the Deliverables.

**14.3** Both indemnities are subject to clause 13.

## 15. Term

**15.1** This Agreement starts on the Effective Date and continues until either Party terminates it. Each SOW runs until its Services are completed or it is terminated.

## 16. Termination

**16.1 For convenience.** Either Party may terminate this Agreement or any SOW by giving **{{15}} days'** written notice.

**16.2 For breach.** Either Party may terminate immediately by notice if the other commits a material breach and does not fix it within 15 days of a notice describing it. Non-payment for more than 30 days counts as a material breach.

**16.3 For insolvency.** Either Party may terminate immediately if the other becomes insolvent or stops doing business.

**16.4 Payment on termination.** When a SOW ends for any reason other than Consultant's uncured material breach, Client pays:
- (a) Fees for work done up to termination, with milestones pro-rated by the work completed;
- (b) third-party costs that cannot be cancelled; and
- (c) if Client terminated for convenience, a termination fee of **{{25}}%** of the Fees for the current milestone not yet invoiced. The Parties agree this is a genuine pre-estimate of Consultant's loss from capacity reserved for Client that cannot be resold at short notice.

The Deposit is applied against these amounts. Any unearned balance is refunded within 15 days.

**16.5** Once all amounts under 16.4 are paid, Consultant delivers the work in progress, and clause 9.3 applies to it.

**16.6** These clauses survive termination: 6, 7, 9, 10, 11 (for any data still held), 13, 14, 16.4 to 16.6, 17, 19, 20 and 21.

## 17. Non-solicitation; no non-compete

**17.1** During a SOW and for **6 months** after it ends, neither Party will directly solicit for employment any employee or individual contractor of the other Party it worked with under that SOW, without consent. General job advertisements and unsolicited approaches do not count. [Alternative: a placement fee of 15% of first-year pay instead of a ban.]

**17.2 No non-compete.** Nothing in this Agreement stops Consultant from providing services to anyone, including Client's competitors, during or after the term. (Any such restraint would in any case be void under section 27 of the Indian Contract Act, 1872.)

## 18. Independent contractor

**18.1** Consultant is an independent contractor. Nothing in this Agreement creates employment, partnership, agency or a joint venture. Consultant is responsible for its own taxes, insurance and statutory compliance, and cannot bind Client.

## 19. Publicity

**19.1** Consultant may name Client as a client, show Client's logo, and describe the work at a high level without Confidential Information, in its portfolio, website and proposals, unless Client opts out by email. A detailed case study, metrics or screenshots need Client's prior written approval, which Client will not unreasonably withhold.

## 20. Governing law and disputes

**20.1** This Agreement is governed by the laws of India.

**20.2 Escalation.** The Parties will first try to settle any dispute through good-faith discussion between their decision-makers, for 15 days after a written dispute notice.

**20.3 Arbitration.** If the dispute is not settled, it will be finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, as follows:
- one sole arbitrator, **appointed by mutual agreement**. Neither Party may appoint the arbitrator alone;
- if the Parties do not agree within 15 days, the arbitrator is appointed under section 11 of that Act [or: by the Mumbai Centre for International Arbitration as appointing authority];
- the **fast-track procedure under section 29B** applies: written submissions, with the award within 6 months;
- **seat and venue: Pune**. Language: English. Any hearings may be held online.

**20.4** The courts at Pune have exclusive jurisdiction over interim relief and over supervision of the arbitration. Nothing in this clause limits Consultant's rights under the MSMED Act (clause 7.2).

[**Option B — courts only** (cheaper and simpler for contracts under about ₹5 lakh): replace 20.3 and 20.4 with: "Subject to clause 20.2 and the MSMED Act, the courts at Pune have exclusive jurisdiction."]

## 21. General

**21.1 Notices.** Notices are given in writing by email to the addresses in the signature block, or as updated by notice. They are treated as received the next Business Day unless the email bounces. Notices of breach, termination or dispute must also go to the other Party's signatory.

**21.2 Entire agreement.** This Agreement and its SOWs are the entire agreement on their subject. They replace earlier proposals and discussions, but not any signed NDA, which continues in force.

**21.3 Amendments.** Changes must be in writing and signed (e-signature is fine) by both Parties. A Change Request approved under clause 5 may amend a SOW.

**21.4 Assignment.** Neither Party may assign this Agreement without the other's consent. Client may assign it, with notice, to a buyer of its whole business, as long as everything due has been paid.

**21.5 Force majeure.** Neither Party is liable for delay caused by events beyond its reasonable control. These include natural disasters, epidemics, war, government action, widespread internet or power outages, and failures of major cloud platforms. Payment for work already done is not suspended. If the event lasts 30 days, either Party may terminate the affected SOW under clause 16.4, without the termination fee.

**21.6 Severability and waiver.** If any provision is invalid, the rest stays in force. A failure or delay in exercising a right is not a waiver of it.

**21.7 Stamp duty.** {{Consultant / Client}} will pay any stamp duty payable on this Agreement.

**21.8 Counterparts and e-signature.** This Agreement may be signed in counterparts and by electronic signature, including Aadhaar-based eSign or any reputable e-signature platform. The Parties agree such signatures are valid and binding under the Information Technology Act, 2000.

---

**Signed for Consultant**
Name: {{YOUR_NAME}} · Proprietor, {{BUSINESS_NAME}}
Email: {{YOUR_EMAIL}} · Date: ________ · Signature: ________

**Signed for Client**
Name: {{CLIENT_SIGNATORY_NAME}} · Designation: {{DESIGNATION}}
Email: {{CLIENT_SIGNATORY_EMAIL}} · Date: ________ · Signature: ________

---

### Annexures
- **A. SOW template:** [sow-template.md](sow-template.md)
- **B. AI Usage Policy:** [../delivery/ai-usage-policy.md](../delivery/ai-usage-policy.md)
- **C. Credentials & Access Policy:** [../delivery/credentials-and-access-policy.md](../delivery/credentials-and-access-policy.md)
- **D. Rate card** (change requests, out-of-scope work): ₹{{RATE_PER_HOUR}}/hr · ₹{{RATE_PER_DAY}}/day · out-of-hours emergency 1.5×
