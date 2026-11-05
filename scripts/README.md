# Prospecting scripts

Four small Node scripts that turn public signals into **ranked, CRM-ready lead lists** — so your daily outreach block starts with "who and why" already answered.

| Script | Finds | Best for | Typical yield (Nov 2026) |
|---|---|---|---|
| `hn-freelance.mjs` | Contract / freelance roles in Hacker News monthly threads | Track B (global startups) | 2–8 relevant contract roles/month with `--hiring` |
| `site-audit.mjs` | Stack, checkout, apps, speed signals on store/app homepages → offer + hook | Track A (Indian D2C/Shopify), B3 (Angular) | 1 scored lead per domain you feed it |
| `funding-feed.mjs` | Startups that just raised (Inc42, Entrackr, YourStory, ET, TechCrunch, Crunchbase News, EU-Startups, Tech.eu) | "Why now" outreach to founders | 15–40 items per 2 weeks before your filtering |
| `reddit-leads.mjs` | People hiring on r/forhire + founder/builder subs | Opportunistic, B1 (vibe-coded apps) | Low (0–3/week) — use it for listening, not volume |

Everything writes two files to `out/` (gitignored): a **CSV in the shared CRM schema** and a **Markdown digest** you can read in 2 minutes.

> **Rule zero:** these scripts *find and rank*. They never send anything. Every message you send is written (or at least edited) by you, for one person, with one specific observation. That’s what makes the 5–10% reply-rate target in memo 05 realistic — and what keeps you on the right side of anti-spam norms.

---

## Setup

- **Node 20+** (Node 18 works; 22 LTS recommended). No `npm install` — zero dependencies.
- Run from the repo root: `node scripts/<name>.mjs --help`
- **Behind a corporate/VPN proxy?** Node's built-in `fetch` ignores `HTTPS_PROXY` unless you opt in (Node ≥ 22.21 / 24.5):
  ```bash
  NODE_USE_ENV_PROXY=1 node scripts/hn-freelance.mjs --hiring
  ```
- Optional keys (both free):
  - `PSI_API_KEY` — Google PageSpeed Insights. Google Cloud Console → create project → *APIs & Services → Library* → enable **PageSpeed Insights API** → *Credentials → Create API key* (restrict it to that API). Default quota is reported as ~25,000 requests/day (check *Quotas* in your project). Without a key, Google usually answers `429` after a call or two — the script detects this and stops calling PSI for the rest of the run.
  - `REDDIT_TOKEN` — only if you **already** hold approved Reddit API credentials. Since Nov 2025 Reddit's *Responsible Builder Policy* requires manual approval for new OAuth apps; the script works without a token via public JSON → RSS fallback.

```bash
export PSI_API_KEY="your-key"        # macOS/Linux; on Windows PowerShell: $env:PSI_API_KEY="your-key"
```

---

## 1. `hn-freelance.mjs` — Hacker News contract roles

```bash
node scripts/hn-freelance.mjs --hiring                    # recommended
node scripts/hn-freelance.mjs --only-hiring --months 1
node scripts/hn-freelance.mjs --hiring --add-keywords "erlang:4,elixir:3,vitest:2"
node scripts/hn-freelance.mjs --hiring --all-roles        # also full-time remote roles (bridge income)
```

- Uses the public [HN Algolia API](https://hn.algolia.com/api) (no key). Finds the latest N monthly threads, reads top-level comments only.
- **Freelancer thread** (`Ask HN: Freelancer? Seeking freelancer?`): keeps `SEEKING FREELANCER` posts, drops `SEEKING WORK`.
- **`--hiring`** adds `Ask HN: Who is hiring?` and keeps only posts that say contract / contractor / freelance / part-time / fractional / 1099 / C2C, are engineering roles, and aren't job-seeker profiles.
- Drops onsite-only and US/EU/UK-resident-only posts (use `--include-restricted` to keep them), penalises posts whose stated rate is below your $35/hr floor (tag `below-floor`), dedupes companies that repost monthly.
- **What the data says (checked Nov 2026):** the freelancer thread stopped being posted by `whoishiring` in Nov 2025; community reposts get 10–35 comments, ~95% of them *SEEKING WORK* (Oct 2025 thread: 116 posts, 0 *SEEKING FREELANCER*). The *Who is hiring?* thread (190–260 top-level posts/month) has ~10% contract-flavoured posts — that's where the leads are.

**Output:** `out/hn-leads-YYYY-MM-DD.csv|.md` — `source=hn-thread`, `stage=prospect`, notes = snippet + HN link, a draft opener tailored to the inferred segment.

**Work it:** reply within 24h. Email if an address is given (most HN hiring posts include one), reference one line of their post, one proof line, one question. No CV attachment in message 1.

---

## 2. `site-audit.mjs` — store/app homepage audit → offer + hook

```bash
node scripts/site-audit.mjs scripts/sample-domains.txt
node scripts/site-audit.mjs my-shortlist.txt --psi --concurrency 2
node scripts/site-audit.mjs snitch.co.in bluetokaicoffee.com
node scripts/site-audit.mjs out/funding-leads-2026-11-05.csv          # any CSV with website/url/domain column
```

Per site it fetches the homepage (honest User-Agent, follows redirects, 20s timeout) and detects:

| Group | Signals |
|---|---|
| Platform | Shopify, WooCommerce, WordPress, Magento, BigCommerce, Wix, Squarespace, Webflow, Dukaan, Salesforce Commerce, PrestaShop |
| Framework | Next.js, Nuxt, Gatsby, Remix/Hydrogen, Astro, SvelteKit, Angular (`ng-version`), AngularJS (`ng-app`, angular.js), Vue, React, jQuery |
| Payments / checkout | Razorpay, Razorpay Magic Checkout, Shiprocket Fastrr, GoKwik, Simpl, Snapmint, Cashfree, PayU, Juspay, PhonePe, Paytm, Stripe, PayPal |
| Messaging | WhatsApp links, Interakt, WATI, Gallabox, AiSensy, Zoko, LimeChat |
| Apps (budget signal) | Klaviyo, CleverTap, MoEngage, WebEngage, Wigzo, Judge.me, Yotpo, Gorgias, Freshchat, Intercom, Tidio, Hotjar |
| Analytics | GA4, GTM, Meta Pixel, Microsoft Clarity, legacy Universal Analytics |
| Page weight | HTML KB, `<script>` count, third-party script domains, images / lazy images |
| `--psi` (mobile) | Performance score, LCP, FCP, TBT, CLS (lab) + CrUX field data (LCP/INP/CLS p75) when Google has it |

Then it scores **fit × opportunity (0–100)**, picks an offer and writes a **one-line hook**:

| Situation | Offer | Hook angle |
|---|---|---|
| Shopify + PSI < 70 (or heavy page without PSI) | **A1** Speed & Conversion Sprint | "PageSpeed mobile 38/100, LCP 6.1s — fixable in 1–2 weeks without a redesign" |
| Shopify + Magic Checkout / GoKwik / Fastrr / Simpl / Snapmint | **A3** Checkout & payments | Partial-COD for high-risk pincodes (Cultus) — COD/RTO conversation |
| Shopify, fast, no checkout signal | **A2** Custom app / integrations | Cultus Sales Channel app: webhook inventory sync, orders back to Shopify |
| WooCommerce / Magento / Dukaan … | **A4** (or A1 if slow) | Replatform / headless conversation |
| Angular or AngularJS | **B3** Modernisation | Deribit Angular→React migration, Vitest in CI |
| Custom Next.js/React storefront | custom | "Extra hands on checkout/integrations/performance" |

Sites that block bots (403/challenge pages — normal for big brands) are kept with tag `blocked` so you can check them by hand.

**Work it:** open the site **on your phone** and confirm the problem is real before you send anything. For A1, record a 2-minute Loom of the top 3 issues — that video *is* the pitch. A wrong "audit" kills trust instantly.

**Where to get domains:** Cultus brand partners and their peers, brands running Meta ads (Meta Ad Library), Inc42/YourStory D2C coverage, `funding-feed.mjs` output, Shopify app-review authors, D2C meetup attendee lists. Target ₹1–30 Cr revenue brands with no in-house engineer — `sample-domains.txt` is big brands, for demo only.

---

## 3. `funding-feed.mjs` — "just raised" radar

```bash
node scripts/funding-feed.mjs --region india --since 7
node scripts/funding-feed.mjs --keywords "d2c,consumer,ecommerce,shopify" --since 30
node scripts/funding-feed.mjs --region global --keywords "fintech,saas,ai"
node scripts/funding-feed.mjs --feed https://inc42.com/feed/ --since 3     # custom feed(s), repeatable
```

- Reads RSS/Atom (list at the top of the file — edit freely; a dead feed is skipped, not fatal).
- Keeps funding headlines (raises / secures / bags / seed / Series X …), drops VC-fund closes, IPOs, earnings, acquisitions, bonds, round-ups, and anything ≥ $300M (not a freelancer client).
- Extracts company, amount (USD conversion assumes **₹95 = $1 — check the live rate**), round, sector (D2C, e-commerce, fintech, SaaS, AI, logistics, healthtech, edtech).
- Scores: India +15 · D2C/e-com +25 · fintech +20 · SaaS +15 · AI +10 · seed/angel/pre-A/Series A +15 · Series C+ −10 · ≤$20M +5.
- Dedupes the same raise across outlets; tags `in-talks` for "in talks to raise" stories.

**Work it:** shortlist ≤10. Find the founder/CTO on LinkedIn, check their careers page (open engineering roles = pain you can bridge with a contract). Message 1 = congratulations + one useful, specific observation — no pitch. Feed the shortlist's domains to `site-audit.mjs` for a hook.

---

## 4. `reddit-leads.mjs` — people hiring on Reddit

```bash
node scripts/reddit-leads.mjs                       # r/forhire [Hiring], last 14 days
node scripts/reddit-leads.mjs --subs all --since 30 # + shopify, SaaS, startups, nextjs, reactjs, Supabase, lovable, vibecoding
```

- Tries OAuth (`REDDIT_TOKEN`) → public JSON → public RSS. Many cloud/VPN IPs get `403` on JSON; RSS usually still works but is rate-limited (the script waits 4s between subreddits and backs off on 429).
- Keeps software work only (r/forhire *[Hiring]* is mostly editors/designers/VAs), flags `low-budget` (equity-only, "$50 for an app"), drops US/EU-only posts.
- **Honest expectation:** in a Nov 2026 test, 0 of the last 100 r/forhire posts were dev roles that fit. Reddit is better for *listening and helping* (answer Supabase/Shopify/Lovable questions well, people DM you) than for scraping leads.

---

## Importing into the CRM

1. Open `tools/crm.html` → **Data → Import CSV** → pick the file from `out/`.
2. Headers already match the schema (`id,company,contact,…,createdAt,updatedAt`). Duplicates are detected by email / website / company; our `id`s are stable (`hn-<comment>`, `site-<domain>`, `fund-<hash>`, `rd-<post>`), so re-running and re-importing is safe.
3. `score` and `probability` are integers 0–100. Values that start with `= + - @` are prefixed with `'` (CSV-injection protection — the data comes from the open web).
4. Only import what you'll actually work this week. A CRM with 400 cold rows is a graveyard; 20 researched rows is a pipeline.

---

## Weekly routine (≈ 90 minutes, Monday)

| When | Do | Time |
|---|---|---|
| Mon 09:30 | `funding-feed.mjs --region india --since 7` + `--region global --keywords "fintech,saas,ai"` | 10 min |
| Mon 09:45 | Shortlist ≤10 funded companies; add their domains + 10–20 D2C brands you found during the week to `this-week.txt` | 20 min |
| Mon 10:05 | `site-audit.mjs this-week.txt --psi` → read the digest, verify the top 10 on your phone | 30 min |
| 1st Monday of the month (HN threads post on the 1st working day) | `hn-freelance.mjs --hiring --months 1` | 10 min |
| Mon 10:45 | `reddit-leads.mjs --subs all --since 7` (skim, don't chase) | 5 min |
| Mon 10:50 | Import into CRM; set `nextDate` so each day Tue–Fri has 5–10 personalised touches queued | 15 min |

Want it automatic? A cron entry (macOS/Linux) that runs Monday 08:30 and leaves fresh digests waiting:

```bash
30 8 * * 1 cd ~/leads-gen && /usr/local/bin/node scripts/funding-feed.mjs --region india --since 7 >> out/cron.log 2>&1
```

---

## Ethics, ToS and the law (read once)

- **Public data, low volume, human sending.** These scripts read public pages/APIs at a few requests per second or less, identify themselves (`User-Agent: FreelanceOS-prospector/1.0`), and back off on 429. Don't crank up concurrency, don't rotate IPs or spoof browsers to get past bot protection — if a site blocks you, look at it in a browser like a human.
- **Respect each platform's terms.** HN Algolia API is public; Reddit's Data API terms apply (new OAuth apps need approval since Nov 2025); RSS feeds are published for syndication; PageSpeed Insights is an official API.
- **Never auto-send.** No mail-merge blasts, no LinkedIn automation tools (they get accounts restricted). Every message is 1:1 and specific.
- **Personal data.** `out/` contains names/emails of real people — it's gitignored for a reason. Don't publish it, don't share it, delete what you won't use. India's DPDP Act applies to how you store personal data; for EU/UK prospects keep cold email B2B, relevant, and honour opt-outs immediately; for US emails include a real postal address / opt-out line per CAN-SPAM if you ever send at volume.
- **Verify before you claim.** A hook built on a wrong detection ("you're on AngularJS" when they're not) is worse than no hook. Check, then send.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `fetch failed` / timeouts on every request | Behind a proxy → `NODE_USE_ENV_PROXY=1` (Node ≥ 22.21). Otherwise check your connection. |
| PSI: `quota exceeded` | Set `PSI_API_KEY`; keep `--concurrency 2`. |
| Reddit: `json 403 → rss 429` | Network is blocked/rate-limited. Wait 10 min, run fewer subs, or use the browser. |
| A feed shows `404` | The outlet moved its feed — edit `FEEDS` at the top of `funding-feed.mjs`. |
| Site shows `blocked` | Bot protection. Check manually; PSI (`--psi`) may still work since Google fetches it. |
| Company name looks wrong | Heuristic from `og:site_name` / `<title>` / headline. Fix it in the CRM. |
