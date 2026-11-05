# Freelance OS: Parth Kulkarni

An operating system for running solo software freelancing **as a business**: strategy memos, India-specific setup and tax playbooks, contract and outreach templates, working tools, and prospecting scripts. It's built around real assets: Cultus, Deribit (Coinbase), Twinntax and Bro.

> **Start here:** open [`index.html`](index.html) in a browser, or run `npm start` and visit http://localhost:4321.
> Then read [Memo 00: Start Here](memos/00-start-here.html) and [Memo 10: 90-Day Plan](memos/10-90-day-plan.html).

---

## What's inside

| Part | Where | What it's for |
|---|---|---|
| **Hub** | [`index.html`](index.html) | Search across everything, the business flywheel, progress across all checklists |
| **13 memos** | [`memos/`](memos/) (sources in [`site/src/`](site/src/)) | Decision memos: bottom line first, a checklist at the end |
| **5 tools** | [`tools/`](tools/) | Single-file offline apps: CRM, Outreach Composer, Proposal Builder, Rate/Tax/Runway Calculator, Invoice Generator |
| **Templates** | [`templates/`](templates/) | Contracts, outreach, sales, delivery, finance and portfolio copy, ready to copy, fill and send |
| **Lists** | [`lists/`](lists/) | Platforms, lead sources, communities, market rates, payment rails, bridge income, tool stack, compliance calendar, reading list |
| **Scripts** | [`scripts/`](scripts/) | Zero-dependency Node scripts that turn HN threads, store audits, funding news and Reddit into CRM-ready CSVs |

### The memos

| # | Memo | One-line summary |
|---|---|---|
| 00 | [Start Here](memos/00-start-here.html) | Asset audit, the business on one page, 10 decisions for month one, glossary |
| 01 | [Positioning](memos/01-positioning.html) | Two tracks (D2C/Shopify India + global MVP/internal tools), ICPs, 8 productized offers |
| 02 | [Business Setup](memos/02-business-setup.html) | Sole proprietorship, bank, Udyam, GST decision, professional tax, insurance |
| 03 | [Tax & Money](memos/03-tax-and-money.html) | Presumptive tax (s.58), slabs, TDS, GST/LUT, FIRA, payment rails, money routine |
| 04 | [Pricing](memos/04-pricing.html) | Minimum viable rate, fixed-price formula, value pricing, three-option proposals |
| 05 | [Lead Generation](memos/05-lead-generation.html) | Warm-first playbook, channel scorecard, signal-based outbound, daily outreach system |
| 06 | [Sales Process](memos/06-sales-process.html) | Qualification, discovery calls, proposals, objections, negotiation, closing |
| 07 | [Contracts](memos/07-contracts.html) | MSA + SOW + CR, clause-by-clause, India law specifics, international clients |
| 08 | [Delivery Ops](memos/08-delivery-ops.html) | Client lifecycle SOP, comms cadence, change control, late payments, retainers |
| 09 | [Portfolio & Brand](memos/09-portfolio-and-brand.html) | Case studies, spec projects, one-page site, LinkedIn, content habit |
| 10 | [90-Day Plan](memos/10-90-day-plan.html) | Week-by-week checklists and targets for days 14/30/60/90 |
| 11 | [Risks & Scams](memos/11-risks-and-scams.html) | Fake-recruiter malware, payment scams, NDA traps, concentration risk, safe sandbox |
| 12 | [Metrics & Cadence](memos/12-metrics-and-cadence.html) | Funnel maths, KPI scorecard, Friday CEO review, monthly money close |

---

## Quick start

```bash
npm start
```

That builds the site and serves it at http://localhost:4321. Serving everything from one origin lets the Outreach Composer write into the CRM. Opening `index.html` directly from disk also works.

```bash
npm run dev
```

That rebuilds automatically while you edit memos (`site/src/*.html`) or Markdown (`templates/`, `lists/`).

```bash
npm run hn
```

That finds "SEEKING FREELANCER" posts and contract roles in recent HN threads and writes them to `out/*.csv`, ready to import into the CRM.

```bash
npm run audit -- scripts/sample-domains.txt
```

That detects each store's tech stack, checkout provider and speed opportunities, with a personalised opening line per site. Add `--psi` and set `PSI_API_KEY` for PageSpeed data. `npm run funding` and `npm run reddit` cover funding news and Reddit; see [`scripts/README.md`](scripts/README.md).

No dependencies to install. You need Node 18 or newer.

### Host it privately on GitHub Pages (optional)

Settings → Pages → *Deploy from a branch* → branch `main`, folder `/ (root)`. Everything is static, and `.nojekyll` is included. **Keep the repo private** if you add personal details to templates. Your tool data (CRM, invoices) is stored in each visitor's own browser, so it never ends up in the repo.

---

## How the build works

- `site/src/NN-slug.html` holds the memo content (HTML fragments with a `<!--meta {...} -->` header).
- `site/build.mjs` wraps memos and renders every Markdown file in `templates/` and `lists/` (plus the scripts and tools READMEs) into self-contained pages with navigation, search, persistent checklists, dark mode and print styles. Output goes to `index.html`, `memos/` and `library/`. The build has zero dependencies.
- `npm run check` builds in strict mode and fails on broken internal links.

Generated files are committed so the site works straight after cloning. Re-run `npm run build` after editing.

---

## Privacy and data

- No personal contact details, PAN, GSTIN or bank details are hardcoded anywhere. Templates use `{{PLACEHOLDERS}}`, and tools keep your identity settings in your browser's localStorage.
- Tool data lives in your browser only. Use each tool's **Export** button every Friday and store the JSON somewhere safe (not in a public repo).
- The scripts only read public pages and APIs, politely. Never automate sending messages; personalise every one.

## Disclaimer

General information, not legal or tax advice. Tax and legal facts are researched as of November 2026 with sources cited in each memo; laws, rates and platform fees change. Confirm anything consequential with a chartered accountant or lawyer before acting.
