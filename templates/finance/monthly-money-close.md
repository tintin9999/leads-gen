# Monthly money close: 30 minutes, first working day of the month

*Pairs with [Tax & Money → money routine](../../memos/03-tax-and-money.html#money-routine) and the [compliance calendar](../../lists/compliance-calendar.md).*

> **BLUF.** Once a month, time-boxed to 30 minutes: reconcile the bank against invoices, chase anything overdue, move the **tax reserve** (10% of foreign receipts, 0% of receipts with 10% TDS) and any **GST collected**, file every **FIRA**, update the three registers and write down six numbers. Quarter-ends and March add a few extra steps, listed below.

## The 30-minute routine

| Minutes | Step | Done |
|---|---|---|
| 0–5 | **Bank:** download last month's statements (business + tax reserve). Match every credit to an invoice and every debit to a bill | [ ] |
| 5–10 | **Receivables:** mark invoices paid. List overdue ones. Send reminders: day 1 polite, day 7 firm, day 14 escalate (see [Delivery Ops](../../memos/08-delivery-ops.html)) | [ ] |
| 10–15 | **Move money:** tax reserve % per receipt → reserve account. GST collected (if registered) → GST account. Top up runway. Pay yourself the fixed salary | [ ] |
| 15–20 | **Documents:** save each FIRA as `PK-26-27-0NN-FIRA.pdf`, expense bills to `/Expenses`, client TDS certificates (quarter-ends) to `/Tax` | [ ] |
| 20–25 | **Registers:** update the invoice, receipts (rail, fee, rate vs mid-market) and expense registers | [ ] |
| 25–30 | **Numbers:** fill the row below and check the thresholds | [ ] |

### Reserve rule (year 1)

| Receipt type | Move to tax reserve |
|---|---|
| Foreign or no-TDS receipt | **10%** of the INR credit |
| Indian receipt with 10% TDS | 0% (TDS already prepays your tax) |
| Indian receipt with 2% TDS | 8% |
| GST collected (if registered) | **100%** of the GST amount, to the GST account |

## Numbers sheet (one row per month)

| Month | Gross receipts ₹ | YTD gross ₹ | Foreign % | Rail fees ₹ | TDS deducted ₹ | Tax reserve bal. ₹ | GST collected ₹ | Salary paid ₹ | Runway (months) | Overdue ₹ | Avg days to paid |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 2026 | | | | | | | | | | | |
| Dec 2026 | | | | | | | | | | | |

### Thresholds to watch (YTD gross, current financial year)

| YTD gross | Means | Do |
|---|---|---|
| **₹15L** | Approaching the GST threshold | Start GST registration + LUT ([steps](../../memos/02-business-setup.html#gst-decision)) |
| **₹20L** | GST mandatory (apply within 30 days) | Must already be registered |
| **₹24L** | Deemed income passes ₹12L, so income tax starts | Re-estimate tax and raise the reserve % ([table](../../memos/03-tax-and-money.html#money-routine)) |
| **₹60L** | Approaching the presumptive ceiling | Book an entity conversation with your CA |
| **₹75L** | Presumptive limit (with ≤5% cash) | Books, audit and a structure decision |
| Any client **> 50%** of YTD | Concentration risk | Push pipeline work. See [Metrics](../../memos/12-metrics-and-cadence.html) |

## Quarter-end add-ons (months after Dec, Mar, Jun, Sep)

- [ ] **AIS / Form 168** against your registers. Chase clients whose TDS doesn't show (best in Feb, Jun, Aug, Nov, after their TDS-return deadlines)
- [ ] **GST** (if registered): GSTR-1 by the 13th, GSTR-3B by the 22nd, PMT-06 by the 25th in months 1–2
- [ ] Re-estimate the year's tax in [Rate, Tax & Runway](../../tools/rate-calculator.html) and adjust the reserve %
- [ ] Check every foreign invoice is paid well inside the **9-month** realisation window
- [ ] Raise prices for *new* clients if utilisation is above 80% (see [Pricing](../../memos/04-pricing.html))

## March (year-end) add-ons

- [ ] 1 March: full-year tax estimate. Pay **advance tax by 15 March** from the reserve
- [ ] Invoice all completed work. List year-end debtors, creditors and bank balances (ITR-4 needs them)
- [ ] File the **LUT for next FY** (if GST-registered) by 31 March
- [ ] Archive the `/FY2026-27` folder. Create `/FY2027-28`. Start the new invoice series on 1 April
- [ ] Book the CA hand-over for mid-April ([pack](ca-engagement-brief.md))
