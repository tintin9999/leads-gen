# Invoice checklist: mandatory fields for every invoice type (India)

*As of Nov 2026. Based on CGST Rules 46/47 and current practice. Confirm with your CA once, before your first GST invoice.* Build invoices in the [Invoice Generator](../../tools/invoice-generator.html). Background: [Tax & Money → GST](../../memos/03-tax-and-money.html#gst).

> **BLUF.** Pick the row that matches you, fill every field and never improvise the tax lines. **Unregistered:** a plain "Invoice" with your PAN and no GST anywhere. **Registered, domestic:** a "Tax Invoice" with GSTINs, SAC 998314, and CGST+SGST (Maharashtra client) or IGST (other state). **Registered, foreign:** a "Tax Invoice" with the LUT endorsement, LUT ARN, country of destination, currency, and IGST at 0%. Issue within **30 days** of finishing the work. Numbering: **unique per financial year, ≤16 characters**.

## 1. Numbering scheme (all types)

| Rule | Your scheme |
|---|---|
| Consecutive, unique per financial year (Apr–Mar) | `PK/26-27/001`, `PK/26-27/002` … |
| At most **16 characters**; letters, digits, `-` and `/` only | `PK/26-27/001` = 12 characters ✔ |
| A separate series is allowed (e.g. for exports) | `PK/EXP/26-27/001` = 16 characters ✔ (the limit) |
| Restart every 1 April | `PK/27-28/001` |
| Never delete or reuse a number | Mark it cancelled (or issue a credit note if registered) and keep the record |
| File name | `PK-26-27-001.pdf`, matched to `PK-26-27-001-FIRA.pdf` |

## 2. Which invoice do I issue?

| You are… | Client is… | Title | Tax line |
|---|---|---|---|
| **Not GST-registered** | Indian | **Invoice** (never "Tax Invoice") | None. Optional note: "Not registered under GST" |
| **Not GST-registered** | Foreign | **Invoice** | None. Note: "Export of services" |
| **GST-registered** | Indian, in Maharashtra | **Tax Invoice** | CGST 9% + SGST 9% |
| **GST-registered** | Indian, in another state | **Tax Invoice** | IGST 18% + place of supply |
| **GST-registered** | Foreign, LUT filed | **Tax Invoice** | IGST 0% under LUT + endorsement |

## 3. Field checklists

### Type A: not GST-registered (domestic or foreign)
- [ ] "INVOICE", plus invoice number, invoice date and **due date** (Net 7)
- [ ] Your name / trade name {{BUSINESS_NAME}}, city and state (full {{YOUR_ADDRESS}} if the client needs it), {{YOUR_EMAIL}}, {{YOUR_PHONE}}
- [ ] **PAN** (without it Indian clients deduct 20% TDS)
- [ ] **Udyam No.** and "(Micro)", if registered
- [ ] Client's legal name, address, PO/reference, and GSTIN if they have one (optional for you)
- [ ] Line items: deliverable or milestone, period, quantity or hours, rate, amount
- [ ] Currency (INR or USD) and total
- [ ] Domestic note: "TDS, if applicable, to be deducted under the Income-tax Act 2025; please share the TDS certificate."
- [ ] Foreign note: "Export of services from India. Payable in convertible foreign exchange." Purpose: software development services (P0802)
- [ ] Payment details block (bank/UPI or local USD details). See [Payment rails](../../lists/payment-rails.md)
- [ ] Late-payment line for Indian B2B, if Udyam-registered: "Payments beyond the agreed term attract interest under s.16 of the MSMED Act, 2006."
- [ ] **Do not** write "GST", "CGST", "IGST", a GSTIN field or "Tax Invoice"

### Type B: GST tax invoice, domestic (Rule 46)
- [ ] "TAX INVOICE"
- [ ] Your name, address and **GSTIN**
- [ ] Serial number (≤16 characters, unique per FY) and date of issue
- [ ] Recipient's name, address and **GSTIN** (if registered). If unregistered and the value is above ₹50,000: name, address, and state name with code
- [ ] **SAC code**: `998314` (IT design & development) or `998313` (IT consulting & support)
- [ ] Description of service
- [ ] Taxable value (after any discount)
- [ ] Tax rate and amount: **CGST 9% + SGST 9%** (client in Maharashtra, state code 27) **or IGST 18%** (client in another state)
- [ ] **Place of supply** with state name and code (needed for inter-state)
- [ ] "Tax payable on reverse charge: No"
- [ ] Total invoice value (figures; words optional)
- [ ] Signature or digital signature of you / authorised signatory
- [ ] PAN, Udyam number and payment details (good practice)
- [ ] Issued **within 30 days** of completing the service (Rule 47)

### Type C: export of services under LUT (GST-registered)
Everything in Type B, adapted, plus:
- [ ] Endorsement, **verbatim**:
  > SUPPLY MEANT FOR EXPORT/SUPPLY TO SEZ UNIT OR SEZ DEVELOPER FOR AUTHORISED OPERATIONS UNDER BOND OR LETTER OF UNDERTAKING WITHOUT PAYMENT OF INTEGRATED TAX
- [ ] **LUT ARN and date** (from RFD-11 for the current FY): "LUT ARN {{LUT_ARN}} dated {{LUT_DATE}}"
- [ ] Recipient's name and address, **address of delivery**, **country of destination**
- [ ] Place of supply: outside India (GST portal code **96 – Other Countries**)
- [ ] IGST shown as **0% / Nil (zero-rated under LUT)**
- [ ] Invoice **currency** (USD/GBP/EUR) **and the INR equivalent** at the invoice-date exchange rate (CGST Rule 34; note the source of the rate your CA prefers)
- [ ] Payment in convertible foreign exchange, with purpose code (P0802 default)
- [ ] Keep the **FIRA** for this invoice. It is your proof of export

### Type D: export, not registered
- [ ] Type A fields, plus "Export of services from India", currency and purpose code
- [ ] No LUT and no endorsement (they apply only to registered persons)

## 4. Line-item descriptions that prevent disputes

Good:
- "Milestone 2: Shopify Sales Channel app, inventory webhook sync and nightly reconciliation (SOW-02, 10–24 Nov 2026)"
- "Prototype→Production audit (B1): Supabase RLS and auth review, written report and 60-min walkthrough"
- "Care plan (C1), December 2026: up to 12 hrs maintenance, dependency updates, uptime monitoring"

Bad: "Development work", "Services", "As discussed".

## 5. Sample layout: export under LUT

```
TAX INVOICE                                      Invoice No: PK/26-27/014
{{YOUR_NAME}} ({{BUSINESS_NAME}})                Date: 05-12-2026   Due: 12-12-2026
{{YOUR_ADDRESS}}, Pune, Maharashtra (27)         GSTIN: {{GSTIN}}   PAN: {{PAN}}
{{YOUR_EMAIL}} · {{YOUR_PHONE}}                  Udyam: {{UDYAM_NO}} (Micro)

Bill to: {{CLIENT_NAME}}, {{CLIENT_ADDRESS}}, United States
Place of supply: Outside India (96 – Other Countries) · Country of destination: USA

SUPPLY MEANT FOR EXPORT/SUPPLY TO SEZ UNIT OR SEZ DEVELOPER FOR AUTHORISED OPERATIONS
UNDER BOND OR LETTER OF UNDERTAKING WITHOUT PAYMENT OF INTEGRATED TAX
LUT ARN: {{LUT_ARN}} dated {{LUT_DATE}}

#  Description (SAC 998314)                          Qty  Rate (USD)  Amount (USD)
1  Milestone 2 – Admin dashboard: RBAC + audit log    1    3,000.00    3,000.00
                                        Taxable value:  USD 3,000.00
                                        IGST @ 0% (LUT): USD 0.00
                                        Total:          USD 3,000.00
                         (≈ ₹2,85,000 at ₹95.00/USD, {{RATE_SOURCE}}, invoice date)
Reverse charge: No
Payment: see PAYMENT DETAILS · Purpose: software development services (P0802)
Authorised signatory: {{YOUR_NAME}}
```

## 6. Sample layout: not registered, Indian client

```
INVOICE                                          Invoice No: PK/26-27/003
{{YOUR_NAME}}                                    Date: 20-11-2026   Due: 27-11-2026
Pune, Maharashtra · {{YOUR_EMAIL}}               PAN: {{PAN}} · Udyam: {{UDYAM_NO}} (Micro)

Bill to: {{CLIENT_NAME}}, {{CLIENT_ADDRESS}} (GSTIN: {{CLIENT_GSTIN}})

#  Description                                                   Amount (₹)
1  A1 Store Speed & Conversion Sprint — fixed fee (SOW-01)        45,000.00
                                                   Total:         ₹45,000.00
Not registered under GST; no GST charged.
TDS, if applicable, under the Income-tax Act 2025 — please share the certificate.
Payments beyond the agreed term attract interest under s.16 of the MSMED Act, 2006.
Pay to: {{BANK_ACCOUNT_NAME}} · A/c {{ACCOUNT_NUMBER}} · IFSC {{IFSC}} · UPI {{UPI_ID}}
```

## 7. Common mistakes

- "Tax Invoice" or GST lines while **unregistered**. Collecting GST without a GSTIN is illegal.
- No PAN, so the client deducts **20%** TDS.
- A registered exporter forgetting the **LUT ARN and endorsement**, so the export can be treated as taxable at 18%.
- Numbers without the FY (`INV-14`) that collide next April.
- Netting TDS off the invoice yourself. Always invoice gross.
- Vague descriptions that invite "what exactly did we pay for?" disputes.
- Invoicing more than 30 days after finishing the milestone.

## Sources

1. [CGST Rules: export invoice endorsement and country of destination (Rule 46)](https://chemexcil.in/gst/gst--amendments-in-cgst-rules--2017--invoice-description--exchange----rate--monthly-return--form-tran--1-etc-/2865/700163ade0960d5587d59c0a1603d8f8.html) and [CAclubindia: export procedures under GST](https://www.caclubindia.com/articles/export-procedures-under-gst-51369.asp)
2. [GST Council master circular on LUT/bond](https://gstcouncil.gov.in/sites/default/files/2024-06/final_master_circular_lut_bond_04102017.pdf)
3. [SAC 998314 (Busy)](https://busy.in/sac-code-998314.md) and [RegisterKaro: 998314 vs 998313](https://www.registerkaro.in/post/gst-registration-for-software-it-services)
4. [TDS s.393(1): 10%/2%, ₹50,000 threshold (TDSMAN)](https://blog.tdsman.com/2026/07/tds-on-fees-for-professional-and-technical-services-section-3931-194j/)
5. [Export of services conditions (Xflow)](https://www.xflowpay.com/blog/export-of-services-under-gst)
