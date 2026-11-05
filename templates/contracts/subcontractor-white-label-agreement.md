# Subcontractor / White-Label Agreement (you ↔ an agency)

> **Template — have a lawyer review for high-value deals.** Not legal advice.
>
> **When to use:** An agency (design studio, Shopify agency, marketing agency, dev shop) hires you to build for *their* client (the "End Client"). Agencies make good early clients: they bring the projects and handle the selling, and the work repeats. The trade-offs are lower rates and three structural risks: **pay-when-paid**, **broad client non-solicits** and **flow-down of the End Client's harsh terms**. This template defends against all three. If the agency sends its own contractor agreement, check it against the "Never remove" list below and [red-flag-clauses.md](red-flag-clauses.md).
>
> **How to fill:** Fill `{{…}}`. Each project gets a short **Work Order** (Annex A). Indian agency: keep Indian law and add MSMED wording from [msa-india.md](msa-india.md) cl. 7.2. Foreign agency: use their governing law, or SIAC.
>
> **Never remove:** 3.2 (payment doesn't depend on End Client paying), 6 (narrow non-solicit with a release fee rather than an outright ban), 7 (IP passes on payment), 8 (flow-down limited to terms disclosed in writing), 9 (liability cap).

---

**This Subcontractor Agreement** is made on {{DATE}} between **{{AGENCY_LEGAL_NAME}}**, {{AGENCY_ADDRESS}} ("**Agency**"), and **{{BUSINESS_NAME}}**, sole proprietorship of {{YOUR_NAME}}, {{YOUR_ADDRESS}}, PAN {{YOUR_PAN}}, GSTIN {{YOUR_GSTIN / not registered}}, Udyam {{UDYAM_NUMBER}} ("**Consultant**").

## 1. Engagement
**1.1** Agency may offer Consultant projects for Agency's clients ("**End Clients**") through written Work Orders (Annex A). Each Work Order sets out scope, deliverables, rate or fixed fee, timeline and the End Client's name (or a code name).

**1.2** Consultant may accept or decline any Work Order. Consultant is not exclusive to Agency.

**1.3** Agency is responsible for the End Client relationship, including sales, commercial terms, scope sign-off and collections. Consultant takes technical direction from Agency's named lead: **{{AGENCY_LEAD_NAME}}**.

## 2. White-label conduct
**2.1** Consultant may work under Agency's brand (for example with an Agency email address) and will not present itself to End Clients as a separate vendor, or discuss its own rates with them.

**2.2** Consultant will contact End Clients only through channels that Agency approves.

**2.3** If an End Client asks Consultant to take on work directly, Consultant will refer the request to Agency.

## 3. Fees and payment
**3.1** Rates are set per Work Order. Defaults:
- **₹ / $ {{HOURLY}}/hour**, or **₹ / $ {{DAILY}}/day** (8 hours);
- fixed-fee Work Orders: **{{30–50}}% on start**, the rest on Agency's acceptance.

**3.2 No pay-when-paid.** Consultant invoices Agency {{monthly in arrears / per milestone}}. Agency pays within **{{15}} days of the invoice date**, whether or not the End Client has paid Agency. [Fallback, if you must accept it: payment is due within 15 days of the End Client paying, and in any case **no later than 45 days** after the invoice date.]

**3.3** Agency approves the hours on each timesheet within 3 business days of receiving it. Any hours not disputed in that time are treated as approved.

**3.4** Late payment carries interest at 1.5% per month, plus statutory interest under the MSMED Act where it applies. If any invoice is more than 14 days overdue, Consultant may stop work on all Work Orders after giving 3 business days' notice.

**3.5** GST and TDS are handled under the MSA principles in [msa-india.md](msa-india.md) cl. 6.4–6.5. International agencies follow [msa-international.md](msa-international.md) cl. 5.4.

## 4. Availability
**4.1** Consultant commits up to **{{N}} hours per week** across Agency Work Orders, with **{{2–3}} hours of overlap** with Agency's working hours.

**4.2** Consultant will give **14 days' notice** of planned absences longer than 2 business days.

## 5. Standards
**5.1** Consultant will follow Agency's reasonable coding standards, branching model and security policies, if they are disclosed in writing before the Work Order starts.

**5.2** Consultant's Definition of Done for each Work Order: code reviewed, CI passing, tests for critical paths, and a README or handover note.

## 6. Non-solicitation of End Clients (narrow)
**6.1** During a Work Order and for **{{12}} months** after it ends, Consultant will not solicit an End Client it worked with under that Work Order for the same kind of services.

**6.2** If such an End Client approaches Consultant on its own initiative, Consultant will inform Agency. Consultant may then accept the work, either:
- (a) with Agency's written consent; or
- (b) after paying Agency a **release fee of {{15}}%** of the fees Consultant receives from that End Client during the first 12 months.

**6.3** This clause does **not** restrict Consultant from:
- working with End Clients Consultant did not work with;
- working with any business that was Consultant's client before the Work Order;
- general marketing; or
- working in any industry.

**6.4** The parties agree this clause protects Agency's client relationships and goodwill, and is not a general restraint of trade.

**6.5** Neither party will solicit the other's employees or individual contractors for **12 months** after the last Work Order.

## 7. Intellectual property
**7.1** On Agency's **full payment** for a Work Order, Consultant assigns to Agency all copyright and other IP rights in the deliverables created under it. The assignment is for the full term of copyright, worldwide, in all media, with no lapse under s.19(4) of the Copyright Act, 1957. The fees are full consideration. Agency may in turn assign these rights to the End Client.

**7.2** Before payment, Agency and the End Client may use the deliverables only for review and testing.

**7.3** Consultant keeps its Background IP and grants a perpetual, worldwide, royalty-free, non-exclusive licence to use it as part of the deliverables. This licence passes to the End Client.

**7.4 Portfolio.** Consultant may describe the work anonymously in its portfolio, for example "Shopify app for a European fashion brand, via an agency partner", with no End Client names, logos or confidential details, unless Agency agrees otherwise.

## 8. Flow-down
**8.1** Consultant is bound only by End Client terms that Agency **disclosed in writing before the Work Order was signed**. These are typically confidentiality, security, data protection and acceptable-use terms.

**8.2** Consultant is **not** bound by the End Client contract's pricing, liquidated damages, service credits, unlimited liability, indemnities or exclusivity, unless a Work Order expressly accepts them.

## 9. Liability
**9.1** Neither party is liable for indirect or consequential loss or lost profits.

**9.2** Consultant's total liability under each Work Order is capped at the fees paid under that Work Order in the **{{6–12}} months** before the claim.

**9.3** Agency will not pass End Client penalties or service credits to Consultant, except where they were caused by Consultant's breach, and then only within the cap.

## 10. Confidentiality and data
Each party keeps the other's information, and End Client information, confidential for 3 years. Trade secrets, credentials and personal data stay confidential for as long as they remain confidential. Consultant processes End Client personal data only on documented instructions and with reasonable security safeguards. It notifies Agency of any suspected breach within 24 hours, and deletes data at the end of each Work Order.

## 11. Term and termination
**11.1** This Agreement continues until either party ends it with **14 days' notice**. Work Orders can be ended the same way.

**11.2** Agency pays for all work done up to the end date, and the pro-rated value of fixed-fee milestones.

**11.3** Either party may terminate immediately for an uncured material breach (15 days to cure), or for non-payment that remains more than 30 days overdue.

## 12. Independent contractor
Consultant is an independent contractor and handles its own taxes. Nothing in this Agreement prevents Consultant from working for other agencies or clients, including competitors of Agency.

## 13. Law and disputes
**Indian Agency:** the laws of India apply. Disputes go to a sole arbitrator appointed by mutual agreement, under the fast-track procedure in s.29B of the Arbitration and Conciliation Act, 1996, seated in Pune. The courts at Pune have jurisdiction for interim relief. MSMED Act rights are preserved.

**Foreign Agency:** {{laws of the Agency's country}}, or arbitration under SIAC (sole arbitrator, seated in Singapore, Streamlined Procedure where eligible).

| Agency | Consultant |
|---|---|
| {{AGENCY_SIGNATORY}}, {{TITLE}} · Date ____ · Sign ____ | {{YOUR_NAME}} · Date ____ · Sign ____ |

---

## Annex A — Work Order template
- **WO No.:** {{WO-NN}} · **End Client:** {{name or code name}} · **Agency lead:** {{name}}
- **Scope and deliverables:** {{bullets}} · **Acceptance:** {{criteria; Agency reviews within 5 business days, after which the work is deemed accepted}}
- **Commercials:** {{₹ / $ hourly, capped at N hours}} or {{fixed ₹ / $, with 30–50% upfront}} · **Invoicing:** {{monthly / milestones}} · **Payment:** 15 days
- **Timeline:** {{start}} → {{end}} · **Hours/week:** {{N}}
- **Flow-down terms disclosed:** {{list documents, or "none"}}
- **Tools and access:** {{Agency GitHub / Jira / Slack; End Client repos}}
- **Signed:** Agency ____ · Consultant ____
