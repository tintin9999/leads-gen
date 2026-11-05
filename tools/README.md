# Tools

Five single-file web apps. No install, no build, no network calls. Plain HTML, CSS and JavaScript. Data stays in your browser (`localStorage`). Each tool has a "How to use" panel and a JSON backup/restore button.

| Tool | What it's for | Storage key |
|---|---|---|
| [`crm.html`](crm.html): **Pipeline CRM** | Every lead from first touch to won/lost. Board (drag and drop, or <kbd>Alt</kbd>+<kbd>←</kbd>/<kbd>→</kbd>), Table (search, filters, sorting, quick edit), Follow-ups (Overdue / Today / Next 7 days / no next step), Dashboard (funnel conversion, by-source results, weighted pipeline, won revenue in INR and USD, time in stage, this week vs your targets). Also has a 6-question lead-score rubric, CSV import/export, and demo data. | `fos.crm.v1` |
| [`outreach-composer.html`](outreach-composer.html): **Outreach Composer** | 19 message templates: warm announcements, LinkedIn, cold emails per offer, HN replies, agencies, referrals, follow-ups #1/#2/breakup, after a proposal, 90-day re-engage. Picks a lead from the CRM, fills in its details, and flags unfilled `{{variables}}`, spam-trigger words, length and LinkedIn character limits. **Log touch** writes back to the CRM: it adds an activity, sets the last-touch date and the next follow-up date, and moves Prospect → Contacted. Also includes a cadence planner and your own custom templates. | `fos.outreach.v1` (also reads/writes `fos.crm.v1`) |
| [`rate-calculator.html`](rate-calculator.html): **Rate, Tax & Runway** | Works out your minimum rate from the take-home you want, after costs, platform fees (including the 18% GST charged on fees in India), FX costs and income tax. It checks that rate against market numbers. Also has an Indian tax estimator for tax year 2026-27 (presumptive s.58 vs actual profit, new vs old regime, rebate and marginal relief, surcharge, cess, TDS credit, advance-tax note), a 12-month runway chart, and a PERT project quote that produces 3 tiers and a deposit. | `fos.rates.v1` |
| [`proposal-builder.html`](proposal-builder.html): **Proposal Builder** | Presets for offers A1–A4, B1–B3 and C1, plus a blank one. Includes situation, goals, approach, scope, milestones, 3 priced options, terms (50/50 or 40/40/20, Net 7, IP transfers on full payment, GST/LUT line), assumptions, exclusions and an acceptance block. Live A4 preview, print to PDF. Unfilled `[placeholders]` are highlighted and counted. | `fos.proposals.v1` |
| [`invoice-generator.html`](invoice-generator.html): **Invoice Generator** | Three modes: **GST India** (CGST+SGST within your state, IGST across states), **No GST** (not registered), and **Export under LUT** (zero-rated, verbatim Rule 46 endorsement with LUT ARN and date, place of supply 96 "Foreign Country", purpose code). Numbers run per financial year, are capped at 16 characters, and duplicates are blocked. Also: amount in words (lakh/crore for INR), GSTIN format and checksum check, an optional TDS note, and a register with paid / overdue tracking and a CSV export for your CA. | `fos.invoices.v1` |

## Open them

- **Simplest:** double-click any `.html` file. Each one works on its own.
- **Recommended:** run the repo's static server so every tool shares one origin. Then the Composer ↔ CRM link and your data behave the same in every browser:
  ```bash
  node site/serve.mjs            # http://localhost:4321/tools/crm.html
  ```
  Some browsers keep `localStorage` separate per file when you open pages from `file://`. When that happens, the Composer can't see your CRM leads.
- **GitHub Pages:** go to repo Settings → Pages → Deploy from a branch → pick your branch and the `/ (root)` folder. The tools will be at `https://<user>.github.io/<repo>/tools/crm.html`. Each browser and device keeps its own data. Nothing syncs.

## Back up your data (weekly)

Your data lives in this browser only. Clearing site data, using a private window, or switching browser or device loses it.

- CRM: **Data → Backup (JSON)**. Restore with **Data → Restore backup…** (replace or merge).
- Rate calculator, proposals, invoices, composer: use the **Export / Backup** button in each header.
- Keep the backups in a private folder (they contain client names and money). Don't commit them to a public repo.

## CSV import format (CRM)

Header, in this order (the prospecting scripts in `/scripts` output exactly this):

```
id,company,contact,role,email,linkedin,website,location,source,segment,offer,stage,value,currency,probability,score,nextAction,nextDate,lastTouch,tags,notes,createdAt,updatedAt
```

| Field | Allowed values |
|---|---|
| `stage` | `prospect` `contacted` `replied` `call` `proposal` `won` `lost` `nurture` |
| `segment` | `d2c-shopify` `ai-mvp-rescue` `internal-tools` `migration` `agency-partner` `startup-mvp` `other` |
| `source` | `warm-network` `referral` `cultus-network` `linkedin` `cold-email` `upwork` `contra` `talent-network` `hn-thread` `reddit` `community` `agency` `inbound` `content` `event` `other` |
| `offer` | `A1` `A2` `A3` `A4` `B1` `B2` `B3` `C1` `custom` |
| `currency` | `INR` `USD` `EUR` `GBP` |
| dates | `YYYY-MM-DD` (`DD/MM/YYYY` is also accepted on import) |
| `tags` | separated by `;` |

The import is forgiving:

- Other headers are mapped automatically: `Name`, `First Name` + `Last Name`, `Organization`, `URL`, `Status`, `Follow-up date`, LinkedIn exports, and so on. You can adjust the mapping before importing.
- Comma, semicolon and tab separators all work.
- Money like `₹1,20,000`, `1.2L`, `$5k` is parsed.
- Unknown enum values are kept as tags.
- Duplicates are matched on id, email, website or profile URL, or company name. You can choose to skip, merge, or import them anyway, and you see a preview first. Platform URLs such as HN items or LinkedIn profiles are compared in full, not just by domain.

Exported CSVs guard against spreadsheet formula injection: cells starting with `=` or `@` are prefixed with `'`.

## Data shape (for scripts / other tools)

`fos.crm.v1` = `{ version: 1, leads: [ { …CSV fields…, activities: [{date, type, text}], history: [{stage, at}], scoreParts } ], settings: { targets, fx, probs, ui } }`

- Activity types: `email` `dm` `linkedin` `call` `meeting` `proposal` `followup` `note`.
- "Touches" = `email`, `dm`, `linkedin`, `followup`, `call`.
- Moving a lead into Call or Proposal logs an activity automatically. That keeps the weekly calls and proposals counts honest.

## Constants you should review

- `rate-calculator.html` → `TAX_CONFIG` (slabs, rebate s.156, presumptive s.58 limits, surcharge, cess, advance tax s.408(2), TDS s.393) and `ANCHORS` (your rate bands). It is set for **tax year 2026-27**, so update it after each Budget (1 February). Checks: gross ₹24 L → ₹0 · ₹25 L → ₹52,000 · ₹30 L → ₹1,09,200 · ₹36 L → ₹1,66,400 · ₹60 L → ₹4,99,200 · ₹75 L → ₹7,33,200 (presumptive, new regime).
- `invoice-generator.html` → `GST_CONFIG` (rates, export endorsement, SAC codes, state codes, purpose codes).
- FX defaults are about ₹95 per $1 (mid-2026). Change them in the CRM Settings, the rate calculator and on each invoice to today's rate.

These tools are helpers. They are not tax or legal advice: have a CA check your first invoice of each type and your first tax estimate.

## Keyboard

- CRM: <kbd>Ctrl/⌘ K</kbd> quick add · <kbd>/</kbd> search · <kbd>Alt</kbd>+<kbd>←/→</kbd> move the focused card · <kbd>Esc</kbd> close.
- Tabs everywhere: <kbd>←/→</kbd> when a tab is focused.
- Activity note in the CRM drawer: <kbd>Enter</kbd> adds it.
