# Lead Sources: Where Buyers Show Up, and the Search Strings That Find Them (as of Nov 2026)

> **Bottom line.** Pursue leads that come with a **signal**, meaning a reason they need you *now*. Good signals: a brand just raised money, is hiring a React dev, runs a slow Shopify store while paying for ads, launched an AI-built app, or posted "need a developer". Build lists every **Monday** from the sources below. Pull lists by script where you can ([scripts/README.md](../scripts/README.md)). Save every lead into the CRM using the shared CSV header so it imports cleanly into [the CRM](../tools/crm.html).

Every lead should leave this process with four things: a **source** (CRM `source`), a **segment**, the **offer** you'll pitch (A1–A4, B1–B3, C1), and **one specific detail** to use in the first line of the message.

---

## 1. Warm and owned lists (start here, they convert best)

| Source | How to get it | Use |
|---|---|---|
| **LinkedIn connections export** | LinkedIn → Settings → Data privacy → *Get a copy of your data* → Connections. You get a CSV with names, company, and position. Email is included only when the person allows it. | Tag each row: ex-Noovosoft / mentee / alumni / client-side / founder. Import into the CRM as `source=warm-network`. |
| **Phone + WhatsApp contacts** | Manual. Go through your chat list from top to bottom. | Founders, small-business owners, people who've asked you for tech help before. |
| **Cultus network** | The 12 brand partners, the co-founders' contacts, and vendors (photographers, logistics, agencies). | `source=cultus-network`, `segment=d2c-shopify`. See Play 2 in [memo 05](../memos/05-lead-generation.html#play-cultus-network). |
| **SKNCOE alumni** | `linkedin.com/school/<college-page>/people/`, filtered by "Where they work" and "What they do" (Engineering, Entrepreneurship, Product). | Alumni at startups make good referrers. Alumni who are founders are buyers. |
| **Bro bot community** | Server owners and mods you know, plus any community Discord/GitHub org (`github.com/Bro-Projects`). | Some run businesses or communities that need bots, dashboards, or sites. |
| **Past interview candidates / mentees** | The 10+ developers you mentored, now at other companies. | They hear about contract needs early. Ask them for referrals, not for work. |

## 2. Funding and launch news ("they just got budget")

| Source | URL | Cadence | How to use |
|---|---|---|---|
| Inc42 "Funding Galore" (India) | [inc42.com/buzz](https://inc42.com/buzz/) (search "Funding Galore" / "Indian startups raised") | Weekly | D2C, consumer, and SaaS rounds. Reach out 2–8 weeks after the announcement. |
| Entrackr weekly funding report | [entrackr.com/report/weekly-funding-report](https://entrackr.com/report/weekly-funding-report/) | Weekly | Lists every deal, including small seed rounds. That's the sweet spot. |
| YourStory weekly funding roundup | [yourstory.com](https://yourstory.com/) (search "weekly funding roundup") | Weekly | Cross-check. Founder names usually appear in the article. |
| Tracxn / Crunchbase | [tracxn.com](https://tracxn.com) · [crunchbase.com](https://www.crunchbase.com) | Ad hoc | Free tiers are limited. Use them to look up a company you already found, not to browse. |
| TechCrunch funding | [techcrunch.com/category/startups](https://techcrunch.com/category/startups/) | Daily | Global seed/Series A for Track B. |
| YC company directory | [ycombinator.com/companies](https://www.ycombinator.com/companies) | Each batch | Filter by batch, "Is hiring", and region. Recent batches mean small teams that ship fast. |
| Product Hunt | [producthunt.com](https://www.producthunt.com) | Daily | Launches by non-technical founders are B1 candidates. Look for "built with Lovable/Bolt/v0" in maker comments. |
| Lovable Launched (Lovable-run showcase) | `launched.lovable.dev` (status: verify) | Ongoing | B1 candidates. **Never probe their apps.** See the ethics rule below. |
| Indie Hackers products | [indiehackers.com](https://www.indiehackers.com) | Ongoing | Solo founders at revenue. B1/B2. |

Automate: [`scripts/funding-feed.mjs`](../scripts/README.md) → CSV with the CRM header.

## 3. Hiring signals ("they need capacity")

| Source | URL | How to use |
|---|---|---|
| HN "Ask HN: Freelancer? Seeking freelancer?" | [news.ycombinator.com/submitted?id=whoishiring](https://news.ycombinator.com/submitted?id=whoishiring) · RSS [hnrss.org/whoishiring/freelance](https://hnrss.org/whoishiring/freelance) | Posted on the **first weekday of each month**. Post your own SEEKING WORK; reply to SEEKING FREELANCER within 24 h. |
| HN "Ask HN: Who is hiring?" | same account · RSS [hnrss.org/whoishiring/jobs](https://hnrss.org/whoishiring/jobs) | Search the thread for `contract`, `part-time`, `freelance`, `REMOTE`, `Next.js`, `React`. Offer to ship a scoped project while they hire full-time. |
| Wellfound | [wellfound.com/remote](https://wellfound.com/remote) | Filter: Remote, India-OK. Look for "Contract" job types or teams without an Indian entity, which often hire contractors. |
| YC Work at a Startup | [workatastartup.com](https://www.workatastartup.com) | "First frontend engineer" posts: offer interim capacity. |
| RemoteOK / We Work Remotely / Himalayas / Remotive | [remoteok.com](https://remoteok.com) · [weworkremotely.com](https://weworkremotely.com) · [himalayas.app](https://himalayas.app) · [remotive.com](https://remotive.com) | Contract roles open worldwide. Read location rules, since many "remote" roles mean "remote within the US". |
| LinkedIn Jobs | Jobs → filters: *Job type: Contract*, *Remote*, location *Worldwide* or *India* | Save searches for "Next.js contract", "React contract", "Shopify developer". |
| Upwork job feed | Saved searches (below) | Fresh posts (< 2 h old) get read. Older ones are buried under 50 proposals. |
| Cutshort / Instahyre | [cutshort.io](https://cutshort.io) · [instahyre.com](https://www.instahyre.com) | Indian startups. Mostly FT; pitch contract-to-hire. |
| Reddit hiring posts | r/forhire `[Hiring]` · r/developersIndia hiring threads (check rules) | Automate: [`scripts/reddit-leads.mjs`](../scripts/README.md). |

Automate: [`scripts/hn-freelance.mjs`](../scripts/README.md) parses both monthly HN threads into CSV.

## 4. Tech-stack and store discovery ("they're on the stack you fix")

| Tool | Cost (as of Nov 2026) | Use |
|---|---|---|
| **StoreLeads** | Premium $75 · Pro $250 · Elite $450 · Enterprise $950 /mo (15% off yearly). CSV export reportedly starts at Pro (third-party) | Filter Shopify stores by country = India, category, apps installed, estimated sales. Worth one month at most, once your A1 offer is proven. |
| **StoreCensus** | Free pages + paid | Shows ~60,445 active India Shopify stores (Sep 2026). Category lists such as Fashion & Apparel and Home & Garden. |
| **Bootleads** | Free pages + paid | Shows ~101,663 active India Shopify stores, with 15,005 added in the 30 days to Apr 27, 2026. Counts differ by crawler. |
| **BuiltWith** | Free single-site lookup; lead lists are paid | Confirm the stack on a shortlist: Shopify theme, apps, Angular/AngularJS, Next.js. |
| **Wappalyzer** | Free browser extension | One-click stack check while you browse. |
| **PageSpeed Insights** | Free (also an API) | Mobile score + LCP make the A1 hook. [`scripts/site-audit.mjs`](../scripts/README.md) batches it. |
| **Meta Ad Library** | Free: [facebook.com/ads/library](https://www.facebook.com/ads/library/) | Brands **running ads** have revenue and care about conversion, so a slow store means wasted ad spend. A strong A1 qualifier. |
| **Shopify App Store reviews** | Free: [apps.shopify.com](https://apps.shopify.com) | Read the 1–2★ reviews on India-relevant apps (COD, checkout, shipping, marketplace sync). Complaints like "doesn't support X" or "breaks Y" are A2 and A3 openings. |

**Shopify-India discovery workflow (A1/A2/A3):** pick a category (fashion, beauty, home, food) → pull 50 domains from StoreCensus/Bootleads/StoreLeads → run `site-audit.mjs` (stack + PageSpeed + checkout app detection: GoKwik / Shiprocket / Razorpay Magic) → keep stores with **mobile score < 50**, **active Meta ads**, and **50+ products** → record a Loom for the top 10 → email or Instagram-DM the founder.

## 5. Agencies to partner with (they have clients, you have capacity)

| Source | How |
|---|---|
| [Clutch](https://clutch.co) | Filter: Shopify / e-commerce development or web design; team size 2–49; India, US, UK, AU. Small agencies outsource the most. |
| [GoodFirms](https://www.goodfirms.co) | Same filters. Lots of Indian agencies. |
| Shopify Partner Directory | [shopify.com/partners/directory](https://www.shopify.com/partners/directory). Agencies listed here are established, so pitch white-label overflow. |
| Dribbble / Behance | Design studios that show web work but have no developers on the team. |
| LinkedIn | "Shopify agency" / "D2C growth agency" / "performance marketing agency" founders in India. Marketing agencies get asked to fix sites all the time. |

## 6. AI-built app signals (B1)

- Product Hunt / Indie Hackers launches that mention Lovable, Bolt, v0, Cursor, Replit, or Supabase.
- `site:lovable.app` in Google. Lovable's default hosting domain shows live projects, so use it to **find the founder**, not to inspect the app.
- Founders posting "need a developer to take my Lovable app to production" on LinkedIn, X, or Reddit (r/lovable, r/vibecoding, r/Supabase; read each sub's rules).
- **Why it matters (proof point you can cite):** CVE-2025-48757. In 2025, a researcher found ~170 Lovable showcase apps (~10% of those checked) with Supabase tables readable or writable by anyone. The cause was missing or weak Row Level Security. Lovable's scanner checked that a policy *existed*, not that it *worked*.
- **Ethics and law, non-negotiable:** do **not** test, scan, or query a prospect's app, API, or database without **written authorization**. Unauthorized access is a crime (IT Act 2000 in India, CFAA in the US) and ends your reputation. Your outreach offers an *authorized* audit. It never says "I found a hole in your app".

## 7. Ready-made search strings

### LinkedIn (main search bar → People or Posts)
```
("founder" OR "co-founder") AND ("D2C" OR "DTC" OR "Shopify") AND ("India")
("head of ecommerce" OR "ecommerce manager" OR "growth lead") AND "Shopify"
("CTO" OR "technical co-founder" OR "founding engineer") AND ("seed" OR "pre-seed" OR "YC")
("founder") AND ("Lovable" OR "Bolt" OR "v0" OR "no-code" OR "vibe coding")
("Shopify agency" OR "Shopify partner" OR "ecommerce agency") AND ("founder" OR "director")
("operations" OR "COO") AND ("spreadsheets" OR "Retool" OR "internal tools")
```
Posts tab, sorted by *Latest*:
```
"looking for a developer" OR "need a developer" OR "looking for a freelancer" (Next.js OR React OR Shopify)
"Lovable" ("production" OR "developer" OR "help")
"Razorpay" ("integration" OR "COD" OR "RTO") developer
```

### Google
```
inurl:collections "₹" ("cash on delivery" OR "COD") -amazon -flipkart -myntra
"powered by shopify" "₹" (saree OR skincare OR "home decor") 
site:lovable.app
site:linkedin.com/jobs ("Next.js" OR "React") "contract" remote
site:wellfound.com/jobs "Next.js" contract
site:linkedin.com/jobs "AngularJS" "React"            ← migration candidates
"internal tools" ("contract" OR "freelance") ("React" OR "Next.js")
```

### X / Twitter (search)
```
("need a developer" OR "looking for a dev") (Next.js OR Supabase OR Shopify) -is:retweet
("built with lovable" OR "built on lovable") -is:retweet
```

### Upwork saved searches (one per offer)
```
"Next.js" Supabase                 → B1
Lovable OR Bolt OR "v0"            → B1
"admin dashboard" OR "internal tool" React → B2
"Angular to React" OR "AngularJS" migration → B3
Shopify "custom app" OR "private app"      → A2
Razorpay OR "cash on delivery"             → A3
"Core Web Vitals" Shopify OR "page speed"  → A1
```

### Reddit
```
site:reddit.com/r/forhire "[Hiring]" (Next.js OR React OR Supabase)
site:reddit.com (r/startups OR r/SaaS) "technical co-founder" OR "need a developer"
```

## 8. Lead hygiene rules
- **One row per person** in the CRM, with company, website, source, segment, offer, and `nextDate`.
- **No bought lists** and no scraped personal emails. Find business emails through the company site, the founder's own posts, or a polite LinkedIn ask.
- Store only what you need. Delete on request. India's DPDP Rules phase in through ~May 2027, and EU/UK contacts are covered by GDPR/PECR (see [memo 05 → Compliance](../memos/05-lead-generation.html#compliance)).
- **Deduplicate weekly.** The same founder will show up on HN, Wellfound, and LinkedIn.

## Sources
1. [Inc42 — weekly funding](https://inc42.com/buzz/from-the-indus-valley-to-incuspaze-indian-startups-raised-105-mn-this-week/): "Indian startups raised" weekly series.
2. [Entrackr — weekly funding report](https://entrackr.com/report/weekly-funding-report/funding-and-acquisitions-in-indian-startup-this-week-feb-23-feb-28-11163180): format and deal coverage.
3. [YourStory — weekly funding roundup](https://yourstory.com/2026/01/weekly-funding-roundup-jan-10-16-sharp-rise-in-vc-inflow-into-indian-startups).
4. [hnrss — whoishiring/freelance](https://hnrss.org/whoishiring/freelance): RSS for the monthly freelancer thread.
5. [HN mirror — Freelancer? Seeking freelancer? (Oct 2026)](https://zeli.app/story/49922572): thread format (SEEKING WORK / SEEKING FREELANCER, location, remote).
6. [Wellfound — remote](https://wellfound.com/remote): "Remote • India" listings.
7. [StoreLeads pricing (ColdIQ)](https://coldiq.com/blog/storeleads-pricing) and [Store Leads review (SyncGTM)](https://syncgtm.com/blog/store-leads-review-2026): tiers, CSV at Pro (third-party).
8. [StoreCensus — India](https://api.storecensus.com/stores/country/india?page=560): ~60,445 active India stores (Sep 2026).
9. [Bootleads — Shopify India](https://bootleads.com/stores/shopify/countries/in/): ~101,663 stores; +15,005 in 30 days (Apr 2026).
10. [Superblocks — Lovable RLS exposure](https://www.superblocks.com/blog/lovable-rls-breach) and [CVE-2025-48757 (Intruder)](https://cvemon.intruder.io/cves/CVE-2025-48757).
11. [AlternativeTo — Lovable Launched](https://alternativeto.net/news/2025/2/lovable-announces-lovable-launched--a-platform-for-lovable-apps-discovery): Lovable's showcase.
12. [The D2C Pulse — Shopify apps for Indian D2C 2026](https://thed2cpulse.com/d2c-tech-stack/best-shopify-apps-indian-d2c-brands-2026/): checkout/COD app landscape.
13. [Razorpay Docs — Magic Checkout](https://razorpay.com/docs/payments/magic-checkout.md): COD + RTO features.
14. [HeroDevs — Is AngularJS still supported in 2026](https://www.herodevs.com/blog-posts/is-angularjs-still-supported-in-2026): AngularJS EOL (Dec 31, 2021) and paid extended support, i.e. legacy apps still exist.
