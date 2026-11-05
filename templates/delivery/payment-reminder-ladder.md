# Payment Reminder Ladder

> **When to use:** On every invoice. Put each step on a calendar reminder when you send the invoice, or track it in the [CRM](../../tools/crm.html). Most late payments come from process (wrong person, PO missing, lost email), not malice. Stay polite and specific, and move up one step at a time on schedule.
>
> **How to fill:** Replace `{{…}}`. Day numbers are relative to the **due date** (Net 7 → due 7 days after invoice). Send by email, the record that counts. WhatsApp or Slack only *nudges* to read the email. Use the India lines only if you're **Udyam-registered** (the MSMED Act protects registered micro and small suppliers).
>
> **Never:** threaten anything you won't do, add penalties the contract doesn't allow, or stop work without the notice your contract requires (MSA cl. 7.3).

---

## The ladder at a glance

| Day | Step | Tone | Channel |
|---|---|---|---|
| **−2** | Friendly heads-up | Helpful | Email |
| **0** | Due today | Neutral | Email + short WhatsApp/Slack nudge |
| **+3** | Gentle reminder | Neutral | Email |
| **+7** | Firm reminder (late interest + Udyam/MSMED mention) | Firm, polite | Email + call |
| **+14** | **Stop-work notice** (3 business days' notice per MSA) | Formal | Email to contact + signatory |
| **+21** | Work paused; final reminder before escalation | Formal | Email + call to decision-maker |
| **+30** | Final notice → legal notice via advocate / MSME Samadhaan / collections | Legal | Email + registered post/courier (India) |

---

### Day −2 — Heads-up
**Subject:** Invoice {{INV_NO}} — due {{DUE_DATE}}
> Hi {{NAME}}, a quick heads-up that invoice {{INV_NO}} for ₹/$ {{AMOUNT}} ({{milestone}}) is due on {{DUE_DATE}}. Payment details and the link are in the attached PDF: {{PAYMENT_LINK}}. Let me know if your accounts team needs anything from me (PO number, GST details, vendor form). Thanks!

### Day 0 — Due today
**Subject:** Invoice {{INV_NO}} due today
> Hi {{NAME}}, invoice {{INV_NO}} (₹/$ {{AMOUNT}}) is due today. Link: {{PAYMENT_LINK}}. If it's already on its way, please ignore this. Thanks!

*WhatsApp nudge:* "Hi {{NAME}}, just sent a note on invoice {{INV_NO}} due today, sharing here in case email is buried 🙏 {{PAYMENT_LINK}}"

### Day +3 — Gentle reminder
**Subject:** Invoice {{INV_NO}} — 3 days overdue
> Hi {{NAME}}, invoice {{INV_NO}} for ₹/$ {{AMOUNT}} was due on {{DUE_DATE}} and I haven't seen it come through yet. Could you check with your accounts team and share the expected payment date? If something's blocking it (missing PO, details on the invoice), tell me and I'll fix it today.

### Day +7 — Firm reminder
**Subject:** Overdue: invoice {{INV_NO}} ({{AMOUNT}}) — 7 days
> Hi {{NAME}}, invoice {{INV_NO}} is now 7 days overdue. As per our agreement (clause 7), overdue amounts carry interest at 1.5% per month from the due date.
>
> **[India, Udyam-registered]** For your accounts team: {{BUSINESS_NAME}} is a micro enterprise registered under Udyam ({{UDYAM_NUMBER}}). Under the MSMED Act, payments to registered micro/small suppliers are due within the agreed period (max 45 days). Delays attract statutory compound interest at three times the RBI bank rate. Under the Income-tax Act, 2025 (s.37(2)(g), formerly s.43B(h)), the expense isn't deductible for you until it's paid. Clearing it promptly avoids both.
>
> Please confirm a payment date by {{DATE}}. I'd much rather sort this out quickly and keep the project moving.

*Also call the decision-maker:* "Wanted to check if anything's stuck on the invoice. Can you help me find out where it is?"

### Day +14 — Stop-work notice
**Subject:** Notice: work on {{PROJECT_NAME}} will pause on {{DATE + 3 business days}} — invoice {{INV_NO}} overdue
**To:** contact + signatory
> Hi {{NAME}},
>
> Invoice {{INV_NO}} (₹/$ {{AMOUNT}}, due {{DUE_DATE}}) is now 14 days overdue, and I haven't received a payment date despite reminders on {{dates}}.
>
> Under clause 7.3 of our agreement, this is formal notice that work on all ongoing items will be **paused from {{DATE}}** unless payment is received before then. Timelines will move by the length of the pause plus restart time.
>
> I'd really like to avoid this. If there's a genuine cash-flow issue, call me and we'll agree a short payment plan **in writing** today.

### Day +21 — Paused
**Subject:** Work paused — invoice {{INV_NO}} (₹/$ {{AMOUNT}} + interest)
> Hi {{NAME}}, as notified on {{date}}, work is now paused. Outstanding: ₹/$ {{AMOUNT}} plus interest of ₹/$ {{INTEREST}} to date. Staging access remains available. Production handover and the remaining deliverables will resume as soon as payment clears. If I don't receive payment or a written plan by {{DATE}}, I'll have to pursue formal recovery, which I'd prefer not to do.

### Day +30 — Final notice
**Subject:** Final notice before formal recovery — invoice {{INV_NO}}
> Hi {{NAME}}, this is my final reminder. If ₹/$ {{TOTAL}} is not received by {{DATE + 7 days}}, I will proceed with **{{a legal notice through my advocate / a reference to the Micro and Small Enterprises Facilitation Council via MSME Samadhaan / a formal demand and collection process}}**, as provided in our agreement and under law. Paying before then closes this with no further cost.

---

## After Day +30 — escalation paths

### India
1. **Legal notice by an advocate.** Usually ₹2,000–10,000 (the Bar Council's 2025 minimum fee chart reportedly starts at about ₹4,000 for drafting a notice). This alone resolves many cases.
2. **MSME Samadhaan** (samadhaan.msme.gov.in), if you were Udyam-registered when you signed. You file online. The state's Micro & Small Enterprises Facilitation Council tries **conciliation**, then **arbitrates** if that fails; it is supposed to decide within 90 days. To challenge the award, the buyer must first **deposit 75%** of it (s.19). Statutory interest at 3× the bank rate applies.
3. **Pre-institution mediation.** Mandatory before a commercial suit of ₹3 lakh or more (Commercial Courts Act s.12A). It is cheap, and settlements are common.
4. **Arbitration** (if the contract has an arbitration clause) or a **civil/commercial suit**. A summary suit under Order XXXVII CPC suits debts backed by a written contract and invoices. You'll need a lawyer; it's worth it mainly above ~₹2–3 lakh.

### International
1. A **formal demand letter** citing the contract and the late-fee clause.
2. A **platform dispute**: Upwork/Contra escrow disputes, or a PayPal/Stripe case if they paid through it before.
3. A **collections agency** (contingency fees are typically 20–50%) or **small-claims court** in the client's jurisdiction (limits vary by country and state).
4. **Arbitration (SIAC)** if that's in the contract. It's realistic only for larger sums.
5. **Write-off decision.** If recovery would cost more than ~50% of the debt, write it off, record the lesson, and tighten deposits.

## Prevention (do this so you never need the ladder)
- Deposit before work. Exposure capped at one milestone.
- Collect billing details, PO process and the AP contact at onboarding ([questionnaire §3](client-onboarding-questionnaire.md)).
- Invoices go to the decision-maker **and** accounts payable, with a payment link.
- Final code transfer and production go-live happen after the final payment. Use a staging demo for review.
- Thank people when they pay. Clients who get thanked tend to pay on time next round.
