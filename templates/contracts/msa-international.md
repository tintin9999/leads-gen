# Master Services Agreement — International Clients (USD)

> **Template — have a lawyer review for high-value deals** ($10k+, unlimited liability, regulated data such as health/HIPAA or payments/PCI, or any dispute clause outside India and Singapore). Not legal advice. Law as understood in Nov 2026.
>
> **When to use:** Clients outside India (US, UK, EU, Singapore, UAE, Australia…) where you expect repeat work or the first project is ≥ $1,000. Per-project details go in a SOW ([sow-template.md](sow-template.md)). If the client sends its own contractor agreement, review it with [red-flag-clauses.md](red-flag-clauses.md) rather than forcing this one on them.
>
> **How to fill:** Replace every `{{…}}`. In clause 18, choose **one** dispute option and delete the others. Delete `[guidance]`. Indian stamp duty matters only if you might ever enforce the contract in an Indian court. Paying ₹500 for Maharashtra stamping is cheap insurance on larger deals.
>
> **Never remove:** 5.2 (no work before the deposit), 6.3 (stop-work), 7.4 (deemed acceptance), 8.3–8.4 (IP transfers only on full payment; the full-term, worldwide, no-lapse wording guards against Indian Copyright Act s.19 defaults, since you are the author in India), 11 (liability cap), 14.4 (payment on termination), 15.2 (no non-compete).
>
> **Reality check:** Suing across borders for less than about $25k is rarely worth it. Your real protection is the deposit, milestone billing, and stop-work rights. Clause 18 is a backstop.

---

**This Master Services Agreement** ("**Agreement**") is entered into on **{{EFFECTIVE_DATE}}** ("**Effective Date**") between:

**{{BUSINESS_NAME}}**, a sole proprietorship of {{YOUR_NAME}}, organised under the laws of India, with its principal place of business at {{YOUR_ADDRESS}}, India ("**Consultant**"); and

**{{CLIENT_LEGAL_NAME}}**, a {{Delaware corporation / UK private limited company / …}} with its principal place of business at {{CLIENT_ADDRESS}} ("**Client**").

---

## 1. Definitions

**1.1** "**Acceptance Criteria**", "**Background IP**", "**Client Materials**", "**Deliverables**", "**Project Code**", "**Third-Party Components**" and "**SOW**" have the meanings below:
- **Acceptance Criteria** — the objective tests in a SOW that a Deliverable must meet.
- **Background IP** — code, libraries, components, templates, tools and know-how that Consultant owned or licensed before a SOW, or develops independently of it. Includes generic utilities reused across clients.
- **Client Materials** — content, data, designs, trademarks, credentials and accounts provided by or for Client.
- **Deliverables** — the work product specified in a SOW, including code written specifically for Client ("**Project Code**") and its documentation. Excludes Background IP, Third-Party Components and Client Materials.
- **Third-Party Components** — open-source software, SaaS, APIs, themes, apps, plugins and other third-party materials.
- **SOW** — a statement of work referencing this Agreement, signed by both parties.

**1.2** "**Business Day**" means Monday to Friday, excluding public holidays in India. Consultant works in **IST (UTC+5:30)**, with at least {{2–3}} hours of overlap with Client's working hours as set out in the SOW.

## 2. Structure; services

**2.1** Each SOW is a separate contract incorporating this Agreement. An approved Change Request prevails over the SOW, and the SOW prevails over this Agreement, but only where the SOW expressly names the clause it overrides.

**2.2** Consultant will perform the Services with reasonable skill and care, consistent with good industry practice. Consultant controls the method, tools, hours and place of work.

**2.3** Consultant may use subcontractors only with Client's prior written consent. Consultant remains responsible for their work.

**2.4** The relationship is non-exclusive. Consultant may serve other clients, including in Client's industry, subject to clause 9.

**2.5 AI-assisted development.** Consultant may use AI-assisted development tools under its AI Usage Policy ({{LINK}}). Consultant will review and test all output, will not input Client secrets, credentials or personal data, and will use only tools or plans that do not train on Client inputs. Client may restrict tools in a SOW, which may affect timeline and Fees.

## 3. Client responsibilities

**3.1** Client will:
- (a) name one decision-maker: **{{CLIENT_CONTACT_NAME}} ({{CLIENT_EMAIL}})**;
- (b) provide materials, access and decisions within {{2}} Business Days of a request, or by the dates in the SOW;
- (c) review Deliverables under clause 7;
- (d) own and pay for production accounts (cloud, domains, app stores, payment processors, SaaS) in its own name;
- (e) ensure it holds the necessary rights to Client Materials.

**3.2** If Client's delays total more than {{5}} Business Days in a SOW, Consultant may move dates accordingly and reschedule work. If capacity was reserved and cannot be reused, Consultant may also bill idle time at the SOW day rate after written notice, capped at {{2}} days per week of delay.

## 4. Change control

**4.1** Changes to a SOW require a written Change Request approved by Client's decision-maker (email is sufficient). Consultant will quote the impact on scope, timeline and Fees within {{3}} Business Days. Unless the SOW states otherwise, changes are billed at **USD {{RATE_PER_HOUR}}/hour**.

## 5. Fees and payment

**5.1** Fees are stated in the SOW in **US dollars (USD)**. If the SOW is silent:
- SOWs up to USD 5,000: 50% on signing (the "**Deposit**") and 50% on acceptance.
- SOWs above USD 5,000: 40% / 40% / 20% (signing / mid-project milestone / acceptance).
- Retainers: monthly in advance.

**5.2** Work begins when the Deposit is received in cleared funds. Delivery dates run from that date.

**5.3** Invoices are due within **{{7}} days** of issue. Payment is by bank transfer to the account shown on the invoice: {{USD_RECEIVING_ACCOUNT_DETAILS / payment link}}. Client pays its own bank's charges and any intermediary or wire fees, so that Consultant receives the full invoiced amount. [For large amounts, prefer bank transfer to card payments, since card payments can be charged back months later.]

**5.4 Taxes.** Fees exclude sales, use, VAT, GST and similar taxes. If any such tax applies, Client pays it, including under any reverse-charge mechanism. Each party bears its own income taxes.
- If Client is required by law to withhold tax, Client will notify Consultant before payment, pay the net amount, and provide official receipts so Consultant can claim credit.
- Consultant performs all Services from India. [US clients: Consultant will provide IRS Form W-8BEN on request. Consultant is a non-US person performing services outside the US.]

**5.5 Disputed invoices.** Client must notify any good-faith dispute in writing within {{5}} days of the invoice and pay the undisputed portion on time. Undisputed invoices are final. No set-off is allowed without Consultant's written consent.

## 6. Late payment; suspension

**6.1** Overdue amounts bear interest at **1.5% per month**, or the maximum rate permitted by applicable law if lower, from the due date until paid. Client also reimburses reasonable costs of collection.

**6.2** [Reserved.]

**6.3 Stop-work.** If any amount is more than **{{14}} days** overdue, Consultant may suspend all Services under all SOWs on 3 Business Days' written notice, until all overdue amounts are paid. Deadlines extend by the suspension period plus reasonable remobilisation time. Consultant is not liable for consequences of the suspension.

**6.4** If any amount is more than 30 days overdue, Consultant may revoke by notice the licence under clause 8.4 for unpaid Deliverables.

## 7. Acceptance

**7.1** Consultant notifies Client when a Deliverable is ready for review, for example on a staging or preview URL.

**7.2** Within **{{5}} Business Days** (the "**Review Period**"), Client either accepts in writing or sends a written list of specific, reproducible non-conformities with the Acceptance Criteria.

**7.3** Consultant fixes the listed items and resubmits. Only the resubmitted parts are re-reviewed. Anything beyond the Acceptance Criteria is a Change Request.

**7.4 Deemed acceptance.** A Deliverable is accepted on the earliest of:
- (a) written acceptance;
- (b) the end of the Review Period without a compliant rejection; or
- (c) use in production for business purposes.

Minor defects that do not prevent production use do not block acceptance; Consultant fixes them under the warranty.

**7.5** Design and content items include **2 revision rounds** unless the SOW states otherwise.

## 8. Intellectual property

**8.1 Background IP.** Consultant retains all rights in Background IP. Upon full payment, Consultant grants Client a non-exclusive, perpetual, irrevocable, worldwide, royalty-free licence to use, reproduce, modify and distribute Background IP incorporated into the Deliverables, solely as part of the Deliverables and derivatives of them.

**8.2 Client Materials.** Client retains all rights in Client Materials. Client grants Consultant a limited licence to use them only to perform the Services.

**8.3 Assignment upon full payment.** Effective automatically on Consultant's receipt of all Fees due under a SOW, Consultant **hereby assigns** to Client all right, title and interest, including all copyrights and other intellectual property rights, in the Project Code and other Deliverables created under that SOW. The assignment covers:
- all rights of reproduction, adaptation, distribution, communication to the public and licensing;
- all media and modes, whether now known or later developed;
- the **full term** of those rights;
- **worldwide** effect.

The assignment **will not lapse** for non-exercise of rights, including under section 19(4) of India's Copyright Act, 1957. The Fees are the full consideration; no royalty is payable. Ownership passes only under this clause, and only upon full payment.

**8.4 Before full payment.** Until clause 8.3 takes effect, Consultant retains title. Client has a non-exclusive, revocable licence to use the Deliverables for evaluation and, while no payment is overdue, in production.

**8.5 Moral rights.** To the extent permitted by law, Consultant waives, or agrees not to assert, moral rights in the Deliverables against Client and its successors.

**8.6 Open source and third-party components.** Third-Party Components remain subject to their own licences, with which Client agrees to comply. Without Client's approval, Consultant will not incorporate components under licences that would require Client to disclose its proprietary source code (for example AGPL, or GPL in distributed software). Material Third-Party Components will be listed in the handover documentation.

**8.7 Residual know-how.** Consultant may use general skills, experience, ideas and techniques retained in unaided memory, and may build similar functionality for others. This does not extend to Client's Confidential Information or Project Code.

**8.8 Further assurances.** After full payment, Consultant will execute reasonable documents to perfect the assignment, at Client's expense.

## 9. Confidentiality

**9.1** Each party will use the other's non-public information (including source code, credentials, business and customer data) only for this Agreement. It will protect that information with reasonable care and disclose it only to personnel and advisers who need it and are bound by similar duties.

**9.2** Standard exclusions apply: information that is public, already known, independently developed, or lawfully received from a third party.

**9.3** Disclosure required by law is permitted, with prompt notice where lawful.

**9.4** These obligations last during this Agreement and **3 years** after it. For trade secrets, credentials and personal data, they last for as long as the information remains such.

**9.5** On request, each party returns or deletes the other's information, except routine backups and legally required copies, which remain confidential.

## 10. Data protection and security

**10.1** If Consultant processes personal data on Client's behalf, Consultant acts as Client's processor/service provider. This applies under the GDPR/UK GDPR, the CCPA/CPRA or other applicable law, and under India's DPDP Act, 2023. Consultant will:
- (a) process personal data only on Client's documented instructions;
- (b) maintain appropriate technical and organisational security measures (least-privilege access, MFA, encryption where practicable, logging);
- (c) notify Client of a personal data breach without undue delay and **within 24 hours** of becoming aware of it;
- (d) use only the sub-processors listed in the SOW, or others Client approves;
- (e) assist with data-subject requests at the change rate;
- (f) delete or return personal data at the end of the Services.

**10.2** Where the law requires a separate data processing agreement (for example GDPR Article 28 or international transfer clauses), the parties will sign Client's reasonable standard DPA. If the DPA conflicts with this clause, the DPA prevails on data protection matters.

**10.3** Client owns production accounts. Consultant uses individual, least-privilege, MFA-protected access, and access is revoked at the end of the engagement.

## 11. Warranties; limitation of liability

**11.1** For **{{30}} days** after acceptance, each Deliverable will materially conform to its Acceptance Criteria. Client's sole remedy is correction or, if correction is not reasonably possible, a refund of the Fees for that Deliverable.

**11.2** The warranty does not cover issues caused by:
- third-party changes or modifications;
- Third-Party Components or platform API changes;
- hosting;
- misuse;
- unsupported environments.

**11.3** All other warranties, express or implied (including merchantability and fitness for a particular purpose), are disclaimed to the extent permitted by law. Consultant does not guarantee business outcomes.

**11.4** Neither party is liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue, goodwill or data, even if advised of the possibility.

**11.5** Each party's **total liability** under each SOW is limited to the **Fees paid and payable under that SOW in the 12 months** before the claim.

**11.6** Clauses 11.4 and 11.5 do not apply to:
- Client's payment obligations;
- fraud or wilful misconduct;
- liability that cannot be limited by law.

[Fallback: confidentiality and data breaches capped at 2× SOW Fees.]

## 12. Indemnities

**12.1 Consultant's indemnity.** Consultant will defend Client against third-party claims that Project Code, as delivered, infringes a copyright, and pay amounts finally awarded or agreed in settlement. This is conditional on prompt notice, Consultant's control of the defence and reasonable cooperation. The indemnity excludes claims arising from:
- Client Materials;
- Third-Party Components;
- modifications by others;
- combinations with items Consultant did not supply.

Consultant may instead modify the code to be non-infringing, or refund the Fees for the affected Deliverable.

**12.2 Client's indemnity.** Client will defend and indemnify Consultant against third-party claims arising from Client Materials, Client's products or services, or Client's unlawful use of the Deliverables.

**12.3** Indemnities are subject to clause 11.5.

## 13. Term

**13.1** This Agreement continues until terminated under clause 14.

## 14. Termination

**14.1** Either party may terminate this Agreement or a SOW for convenience on **{{15}} days'** written notice.

**14.2** Either party may terminate for material breach not cured within 15 days of notice. Non-payment for more than 30 days is a material breach.

**14.3** Either party may terminate immediately on the other's insolvency.

**14.4 Payment on termination.** On termination for any reason other than Consultant's uncured material breach, Client pays:
- (a) Fees for work performed to the termination date, with milestones pro-rated;
- (b) non-cancellable third-party costs;
- (c) if Client terminates for convenience, a fee of **{{25}}%** of the not-yet-invoiced Fees for the current milestone, as a reasonable estimate of the loss from reserved capacity.

The Deposit is applied first. Any unearned balance is refunded within 15 days.

**14.5** On payment, Consultant delivers work in progress, and clause 8.3 applies to it.

**14.6** Clauses 5, 6, 8, 9, 10 (as to retained data), 11, 12, 14.4–14.6, 15, 17, 18 and 19 survive.

## 15. Non-solicitation; no non-compete

**15.1** During a SOW and for **6 months** after it, neither party will directly solicit for employment the other's personnel it worked with under that SOW. General advertisements are excluded.

**15.2 No non-compete.** Nothing restricts Consultant from providing services to any third party, including Client's competitors, during or after the term.

## 16. Independent contractor; compliance

**16.1** Consultant is an independent contractor and is not Client's employee, partner, agent or joint venturer. Consultant is responsible for its own taxes, benefits, insurance and statutory obligations.

**16.2** Each party will comply with anti-bribery and sanctions laws applicable to it. Client confirms it is not a sanctioned person and will not use the Deliverables in breach of export-control or sanctions laws.

## 17. Publicity

**17.1** Consultant may list Client's name and logo and describe the engagement at a high level, without Confidential Information, unless Client opts out by email. Detailed case studies, metrics or screenshots require Client's prior written approval, not to be unreasonably withheld.

## 18. Governing law and disputes — choose ONE option

**18.1 Escalation (all options).** Before starting proceedings, the parties' decision-makers will negotiate in good faith for 15 days after a written dispute notice.

**Option A — Neutral arbitration (recommended default for USD 5k+):**
**18.2A** This Agreement is governed by the laws of **{{Singapore / India}}**. Any dispute will be finally resolved by arbitration administered by the **Singapore International Arbitration Centre (SIAC)** under the SIAC Rules in force when proceedings start, as follows:
- a sole arbitrator;
- seat: Singapore;
- language: English;
- hearings online where possible;
- the parties agree to the Streamlined Procedure where the amount in dispute permits.

Judgment on the award may be entered in any court with jurisdiction.

**Option B — Client's home law (accept for smaller deals):**
**18.2B** This Agreement is governed by the laws of **{{STATE/COUNTRY — e.g. the State of Delaware / England and Wales}}**. The courts of **{{CITY}}** have exclusive jurisdiction. Consultant may nevertheless bring a claim for unpaid Fees in any court with jurisdiction over Client.

**Option C — Indian law (rarely accepted abroad):**
**18.2C** This Agreement is governed by the laws of India. The courts at Pune, Maharashtra have exclusive jurisdiction. [Alternatively: arbitration seated in Pune under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by mutual agreement.]

**18.3** Either party may seek urgent injunctive relief in any competent court.

## 19. General

**19.1 Notices** are given by email to the addresses below and are effective the next Business Day.

**19.2 Entire agreement.** This Agreement and its SOWs are the entire agreement and supersede prior discussions. Any signed NDA survives.

**19.3 Amendments** must be in writing signed by both parties (e-signature is fine). An approved Change Request may amend a SOW.

**19.4 Assignment.** Neither party may assign without consent, except Client to a successor of its whole business, with notice and all amounts paid.

**19.5 Force majeure.** Neither party is liable for delays caused by events beyond its reasonable control, including:
- natural disasters and epidemics;
- war;
- government action;
- widespread internet, power or cloud outages.

Payment for work already performed is not excused. After 30 days, either party may terminate the affected SOW under clause 14.4 without the convenience fee.

**19.6** Severability. No waiver.

**19.7 Counterparts and e-signature.** This Agreement may be executed in counterparts and electronically. Electronic signatures are binding.

**19.8 Language.** This Agreement is in English, which prevails over any translation.

---

**Consultant** — {{YOUR_NAME}}, Proprietor, {{BUSINESS_NAME}} · {{YOUR_EMAIL}} · Date ________ · Signature ________

**Client** — {{CLIENT_SIGNATORY_NAME}}, {{TITLE}}, {{CLIENT_LEGAL_NAME}} · {{CLIENT_SIGNATORY_EMAIL}} · Date ________ · Signature ________

---

### Notes for you (delete before sending)
- **W-8BEN:** US clients may ask for it. It certifies you are a non-US person. Services performed in India are generally not US-source income, so no US withholding should apply. Don't fill out a W-9; that form is for US persons.
- **Currency and FX:** invoice in USD. Agree on who bears conversion and receiving fees with your payment rail; see [03-tax-and-money](../../memos/03-tax-and-money.html).
- **Indian tax paperwork:** export-of-services invoices, LUT, purpose codes and FIRA are covered in the tax memo, not in this contract.
- **If the client insists on its own paper:** accept the governing law they want for deals under about $10k. Fight instead for the deposit, IP on payment, the liability cap and no non-compete.
