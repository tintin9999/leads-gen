# Freelance OS: Parth Kulkarni

A short, step-by-step guide to starting as a freelancer, with the tools and templates to run it.

The plan is **freelancer first, business later**: start on Upwork, earn the first reviews, and add the business parts in small steps when real money asks for them.

> **Start here:** open [`index.html`](index.html) in a browser, or run `npm start` and visit http://localhost:4321.
> Then read step 1: [The plan](memos/01-the-plan.html).

## How the guide is built

Every guide page follows the same rules, written down in [`site/WRITING.md`](site/WRITING.md):

- One idea a page, 850–1,000 words, about 10 minutes.
- Simple English, short sentences, short paragraphs.
- A real example first, then the general point.
- Every term explained where it first appears.
- Every calculation and procedure shown step by step.
- Each page ends with three to five small actions. Your ticks are saved in your browser.

`npm run lint` checks every page against those rules.

## What is inside

| Part | Where | What it is for |
|---|---|---|
| **The map** | [`index.html`](index.html) | Search, the start path, your progress |
| **Start here** | [`memos/01` to `11`](memos/) | Eleven steps: the plan, your Upwork profile, picking jobs, proposals, the first job, your first 8 weeks |
| **Fix a problem** | [`memos/20` to `30`](memos/) | One page per problem: no replies, scams, price pressure, extra work, non-payment, a bad review |
| **For later** | [`memos/40` to `62`](memos/) | Money and tax, clients from outside Upwork, your website and LinkedIn |
| **Tools** | [`tools/`](tools/) | Pipeline tracker, message writer, proposal builder, rate and tax calculator, invoice maker |
| **Templates** | [`templates/`](templates/) | Upwork profile and proposal kits, messages, contracts, delivery emails, finance checklists |
| **Lists** | [`lists/`](lists/) | Portals, rates, payment services, lead sources, communities, a compliance calendar |
| **Scripts** | [`scripts/`](scripts/) | Small Node programs that collect possible clients into a file the tracker can import |

## Run it

```bash
npm start
```

That builds the site and serves it at http://localhost:4321. No dependencies to install; you need Node 18 or newer.

```bash
npm run dev
```

That rebuilds while you edit pages in `site/src/` or Markdown in `templates/` and `lists/`.

```bash
npm run check
```

That builds in strict mode. It fails on a broken link or on a page that breaks the writing rules.

## Editing a page

1. Edit the file in `site/src/` (for example `site/src/07-write-proposals.html`).
2. Run `node site/lint.mjs site/src/07-write-proposals.html` and fix any `FAIL` line.
3. Run `npm run build` and commit the result. The built pages in `memos/` and `library/` are committed, so the site works straight after cloning.

## Privacy

- No phone number, email address, PAN, tax number or bank detail is stored in this repo. Templates use `{{PLACEHOLDERS}}`.
- The tools keep their data in your browser only. Export a backup every Friday.
- Keep this repo private once you add personal details.

## A note on accuracy

This is general information, not legal or tax advice. Facts were checked in November 2026, and each page lists its sources. Laws, fees and portal rules change, so confirm anything important with a chartered accountant or a lawyer before you act.
