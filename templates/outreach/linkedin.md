# LinkedIn Templates — notes, follow-ups, comment-first

**Limits (as of Nov 2026 — LinkedIn doesn't publish them; these are consistent reports):**
- **~100 connection invites per rolling week.** Premium/Sales Navigator don't meaningfully raise it.
- **Free accounts: only a few personalized invite notes per month** (reports say 3–5) **and ≤ 200 characters.** Premium allows ~300 characters and removes the monthly note cap.
- So: **every note below is ≤ 200 characters** (counted with typical fill-ins: 90–180 chars). Keep `{{SPECIFIC_DETAIL}}` under ~25 characters. Save notes for high-value prospects; send other invites blank and do the work in the **post-accept message**.
- **No automation tools** (auto-connect/auto-DM extensions) — they violate LinkedIn's terms and risk restriction of the account you're building your business on.

Placeholders: `{{FIRST_NAME}}` `{{COMPANY}}` `{{SPECIFIC_DETAIL}}` `{{EVENT}}` `{{PORTFOLIO_URL}}` `{{CAL_LINK}}`

Log every invite in the CRM: `source=linkedin`, `stage=prospect` → `contacted` once you message.

---

## 1. Connection notes (≤ 200 chars each)

**N1 — D2C founder (Track A)**
```
Hi {{FIRST_NAME}}, love what {{COMPANY}} is doing with {{SPECIFIC_DETAIL}}. I build Shopify apps & Razorpay checkout for Indian D2C brands (built Cultus). Would be glad to connect.
```

**N2 — Startup CTO / technical founder (Track B)**
```
Hi {{FIRST_NAME}}, saw {{COMPANY}}'s {{SPECIFIC_DETAIL}}. I'm a product engineer (Next.js/Supabase; ex-Deribit back-office). Following your build. Would like to connect.
```

**N3 — Agency owner**
```
Hi {{FIRST_NAME}}, I'm a Next.js/Shopify engineer in Pune who works white-label with agencies when they're over capacity. Your {{SPECIFIC_DETAIL}} work caught my eye. Connect?
```

**N4 — Met at an event**
```
Hi {{FIRST_NAME}}, great chatting at {{EVENT}} about {{SPECIFIC_DETAIL}}. Let's stay in touch!
```

**N5 — Founder who launched an AI-built app (B1)**
```
Hi {{FIRST_NAME}}, congrats on launching {{COMPANY}}! I help founders take Lovable/Bolt/v0 apps to production (auth, RLS, payments, tests). Happy to share my checklist.
```

**N6 — Hiring manager with an open React/Next.js role**
```
Hi {{FIRST_NAME}}, saw you're hiring for {{ROLE}}. While you search, I can ship a scoped project on contract (React/Next.js; ex-Deribit back-office). Open to connect?
```

**N7 — Alumni**
```
Hi {{FIRST_NAME}}, fellow SKNCOE grad here! I'm freelancing in React/Next.js now (built the Cultus marketplace). Would love to connect.
```

---

## 2. Post-accept message (send within 48 h; no hard pitch)

**Track A (D2C founder)**
```
Thanks for connecting, {{FIRST_NAME}}!

I took a quick look at {{STORE_URL}} on mobile — {{ONE_OBSERVATION — e.g., "product images load ~4s on 4G"}}. Not a pitch: if it's useful, I can send a 3-minute Loom with the 3 fixes I'd start with. Want it?
```

**Track B (startup)**
```
Thanks for connecting, {{FIRST_NAME}}! Curious — what's the biggest engineering bottleneck at {{COMPANY}} right now? (I spend most of my time on production-hardening MVPs and building internal tools, so I collect these.)
```

**Agency**
```
Thanks for connecting! Quick one: when projects pile up, do you bring in freelance devs, or keep everything in-house? I do white-label Next.js/Shopify work (NDA, your process, your brand). One-pager here if useful: {{PORTFOLIO_URL}}
```

## 3. Follow-ups (max 2, spaced 5–7 days; add value each time)

**F1 (value-add)**
```
Hi {{FIRST_NAME}} — came across this and thought of {{COMPANY}}: {{RESOURCE — e.g., "a short checklist for Supabase RLS before launch" / "how partial COD cut RTO for a brand I worked with"}}. Hope it helps.
```

**F2 (easy out)**
```
Last nudge from me — if {{PAIN}} isn't a priority right now, totally fine. If it becomes one, here's my calendar: {{CAL_LINK}}. Either way, rooting for {{COMPANY}}!
```
Then stop. CRM: `stage=nurture`, `nextDate` +90 days.

---

## 4. Comment-first approach (the 15-minute daily habit)

Before you ever message someone, be visible on their posts. Target list: 30 people (D2C founders, startup CTOs, agency owners). Each day: **5 substantive comments**.

**A good comment = specific + adds a fact/experience + no link.** Examples:

- On a D2C founder's post about RTO:
  > "We saw the same with COD-heavy pincodes on Cultus. What helped was partial COD (small prepaid token) for high-risk pincodes via Razorpay Magic Checkout — fewer fake orders without killing conversion. Curious what RTO % you're seeing?"
- On a startup post about launching with an AI builder:
  > "Congrats on shipping! One thing worth checking before you scale: Supabase RLS policies on every table — the default trap with AI-generated apps is tables readable with the public anon key. Happy launch week."
- On an engineering-leader post about legacy frontend:
  > "We migrated admin modules from Angular to React one module at a time behind the existing shell — no big-bang rewrite, and Vitest in CI before touching anything. Biggest lesson: migrate the data layer contracts first."

**Bad comments:** "Great post!", "Agreed 💯", anything with your link, anything that pitches.

## 5. Your own posts (2/week — details in [memo 09](../../memos/09-portfolio-and-brand.html))
- Formula: **hook (1 line) → story/specifics → 1 lesson → soft CTA** ("I help X with Y — DMs open").
- Topic bank: Shopify Sales Channel app internals · Razorpay partial COD · 115 test files for money paths · 17 ADRs and why · Angular→React incremental migration · Vitest in GitLab CI · scaling a Discord bot to 10k servers · dynamic tax forms from JSON schemas.

## 6. Profile checklist (do before any outreach)
- Headline: `Product engineer for commerce & internal tools · Shopify · Razorpay · Next.js/Supabase · Built Cultus`
- Banner: one line + `{{PORTFOLIO_URL}}`
- About: first 2 lines = who you help + result; then proof bullets; then CTA with `{{CAL_LINK}}`
- Featured: announcement post, Cultus case study, Loom audit sample
- "Open to" → *Providing services* (lists your services publicly)
