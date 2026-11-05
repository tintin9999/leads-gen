# Client tax FAQ: copy-paste answers

*As of Nov 2026. Swap in the variant that matches your status (unregistered / GST-registered). Placeholders: {{PAN}}, {{GSTIN}}, {{UDYAM_NO}}, {{LUT_ARN}}, {{YOUR_NAME}}.* Background: [Tax & Money](../../memos/03-tax-and-money.html) · [Invoice checklist](invoice-checklist.md).

> **BLUF.** Answer tax questions in one short, confident message. Hesitating on tax makes a client doubt you on everything else. Most questions are one of these: GST, TDS, W-8BEN/W-9, MSME status, payment terms, payment method, vendor onboarding.

---

### 1. "Will you charge GST?"

**Not registered (below ₹20L):**
> I'm not registered under GST because my turnover is below the ₹20 lakh threshold, so my invoices don't carry GST. The quoted amount is the full amount payable, subject to TDS where applicable.

**Registered, client in Maharashtra:**
> Yes. 18% GST (9% CGST + 9% SGST) is added to the fee and shown separately on the tax invoice. As a registered business you can claim it back as input tax credit. My GSTIN is {{GSTIN}}.

**Registered, client in another state:**
> Yes. 18% IGST is added to the fee and shown separately on the tax invoice. Place of supply is your state. You can claim it as input tax credit. GSTIN: {{GSTIN}}.

**Foreign client:**
> No. Services to clients outside India are exports and are zero-rated under Indian GST. I invoice under a Letter of Undertaking (LUT ARN {{LUT_ARN}}), so there is no Indian tax on my invoices. Any local tax on your side, such as a VAT or GST reverse charge, is handled under your own rules.
*(If unregistered, drop the LUT sentence.)*

### 2. "We'll deduct TDS. Which section?"
> Sure. Please deduct under s.393(1) of the Income-tax Act 2025 (formerly 194J) at the rate your team applies (10% for professional fees, 2% for technical services), on the fee **excluding GST** where GST is shown separately. Please share the quarterly TDS certificate. My PAN is {{PAN}} and it is linked to Aadhaar. The invoice is raised gross, so please pay the net amount after TDS.

### 3. "Please fill in a W-9." / "Do you have a W-8BEN?" (US clients)
> I'm not a US person, so a W-9 doesn't apply. I've attached my Form W-8BEN (India; PAN as foreign tax ID). All services are performed in India, so no US withholding should apply. It is valid until 31 Dec {{W8_VALID_YEAR}}.

### 4. "Do Indian taxes apply to us as a foreign company?"
> No. Indian TDS is deducted only by Indian payers. You simply pay the invoice. I handle my Indian tax, and my bank or payment provider issues the foreign-remittance documents on my side.

### 5. "Are you MSME / Udyam-registered?"
> Yes. I'm a Udyam-registered micro enterprise (services), Udyam No. {{UDYAM_NO}}. I've attached the certificate.

### 6. "Our standard payment terms are Net 45/60/90."
> Understood. My standard term is 7 days, with milestone billing so no single invoice is large. As a Udyam-registered micro enterprise, the MSMED Act caps payment terms at 45 days, and late payment carries statutory interest. Paying within 45 days also keeps your deduction intact under s.37(2)(g) of the Income-tax Act 2025. Could we agree on Net 15 with milestone invoices?

*(Use only with Indian clients. Foreign clients: "My terms are Net 7. Happy to split into milestones or monthly invoices if that helps your AP cycle.")*

### 7. "Can you invoice in INR / USD / EUR?"
> Yes. For international clients I prefer USD, and I'll send **local US bank details**, so it's a domestic ACH transfer on your side with no international wire fees. GBP and EUR local details are available too.

### 8. "Can we pay by PayPal or card?"
> Yes, with a 6% processing surcharge to cover PayPal or card and currency-conversion fees. A bank transfer to my local USD account has no surcharge and usually arrives faster.

### 9. "Please send your vendor onboarding details."
> - Legal name: {{YOUR_NAME}} (sole proprietor), trading as {{BUSINESS_NAME}}
> - PAN: {{PAN}} · GSTIN: {{GSTIN}} *(or "Not registered under GST")*
> - Udyam: {{UDYAM_NO}} (Micro) · certificate attached
> - Bank: {{BANK_ACCOUNT_NAME}}, A/c {{ACCOUNT_NUMBER}}, IFSC {{IFSC}} · cancelled cheque attached
> - Address: {{YOUR_ADDRESS}} · Contact: {{YOUR_EMAIL}}, {{YOUR_PHONE}}

### 10. "Can you send a quote or proforma first?"
> Of course. A proforma invoice is attached (it isn't a tax invoice). I'll issue the final invoice when the milestone is accepted, within 30 days as GST rules require.

### 11. "Your invoice has no tax. Our auditors need documentation." (foreign client)
> This is an export of services from India, invoiced under an LUT (ARN {{LUT_ARN}}), so it is zero-rated. I'm happy to share the foreign inward remittance advice (FIRA) for the payment if your auditors need it.

### 12. "What's your VAT number?" (EU/UK client)
> I don't have an EU or UK VAT number. I'm an Indian business with no establishment in the EU or UK. For B2B services from outside the EU/UK the customer generally accounts for VAT under the reverse charge, but your accountant can confirm for your entity.

### 13. "Can you bill our Indian subsidiary instead?"
> Yes. It then becomes a domestic invoice: GST applies (if I'm registered), and the subsidiary deducts TDS. Please share its legal name, address, GSTIN and PO number.

### 14. "Will you sign a declaration that you're not our employee?"
> Yes. I work as an independent professional (sole proprietor) with my own equipment and multiple clients. I'll invoice as a vendor. No PF, ESI or payroll applies.

### 15. "Can we pay in crypto / gift cards / via a third party?"
> Sorry, I only accept payment from the contracting entity, by bank transfer or my payment provider. It keeps the paperwork clean on both sides.

---

**Tip:** save these as text-expander snippets. For example, `;gst-intl` for answer 1 (foreign) and `;tds` for answer 2.
