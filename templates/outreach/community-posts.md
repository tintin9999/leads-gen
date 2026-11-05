# Community Post Templates (HN, Reddit, Indie Hackers, Discord)

**Rules before posting:** read the thread or sub rules every time, because they change. Post in designated threads only. Reply to every response within a few hours. Log each lead in the CRM (`source=hn-thread`, `reddit`, or `community`).

Placeholders: `{{YOUR_EMAIL}}` `{{PORTFOLIO_URL}}` `{{CAL_LINK}}` `{{MONTH}}`

---

## 1. Hacker News: monthly "Ask HN: Freelancer? Seeking freelancer?"

**When:** the thread goes up on the **first weekday of each month** (find it at `news.ycombinator.com/submitted?id=whoishiring`). Post within the first few hours, while it's still being read.
**Format rule:** the post must start with **SEEKING WORK**, followed by your location and whether you work remote. HN comments are plain text, separated by blank lines, and URLs auto-link. Markdown doesn't render.

```
SEEKING WORK | Pune, India (IST, overlaps EU mornings & US evenings) | Remote

Product engineer: React/Next.js/TypeScript, Node, Supabase/Postgres, Shopify, payments.

I help with:
- Taking AI-built or rushed MVPs to production: Supabase RLS/auth audit, payments, tests, CI, monitoring
- Internal tools & admin dashboards: RBAC, approval flows, audit logs, complex forms
- Frontend modernization: Angular/AngularJS to React, incrementally, with tests first

Recent work:
- Built a live marketplace end to end (Next.js + Supabase, custom Shopify Sales Channel app, Razorpay checkout; 115 test files on money paths)
- 4 years on the back-office of a crypto derivatives exchange (Coinbase's Deribit): React/TS admin modules, Angular-to-React migration, Vitest in CI, some Erlang/OTP
- Tax-filing module used by 100k+ people (schema-driven forms, i18n, versioned by tax year)

Engagements: fixed-price audits from $600, sprints from $3k, or hourly.

Email: {{YOUR_EMAIL}}
Work: {{PORTFOLIO_URL}}
```

**Replying to a SEEKING FREELANCER post:** don't reply in the thread. Email the address in their post within 24 hours:
```
Subject: Re: your HN freelancer post ({{THEIR_TOPIC}})

Hi {{FIRST_NAME}}, saw your post in this month's HN freelancer thread about {{THEIR_DETAIL}}.

{{ONE-LINE MATCHING PROOF}}. I'd approach it by {{2-STEP MINI PLAN}}.

Two questions: {{Q1}}? {{Q2}}?

If it's a fit, I can start {{DATE}}. Portfolio: {{PORTFOLIO_URL}}

{{YOUR_NAME}}
```

**"Ask HN: Who is hiring?":** search the thread for `contract`, `part-time`, `freelance`, `Next.js`, `Supabase`. Email them offering a scoped contract while they hire full-time (use the B-track cold email with `{{SIGNAL}}` = their HN post).

---

## 2. Reddit: r/forhire `[For Hire]` post

**Before posting:** re-read the r/forhire sidebar (title format, posting frequency, required info). The sub is for individuals, not agencies. Post about once every 1–2 weeks. Answer `[Hiring]` posts fast.

**Title:**
```
[For Hire] Next.js/Supabase engineer: I take AI-built MVPs to production (audits from $600) | Remote, IST
```

**Body:**
```
Hi! I'm Parth, a product engineer in Pune, India (remote, IST).

**What I do**
- Production-readiness for AI-built / rushed MVPs (Lovable, Bolt, v0, Cursor): Supabase RLS & auth, payments, tests, CI, monitoring
- Admin dashboards & internal tools (RBAC, approvals, audit logs)
- Shopify custom apps and Razorpay checkout for e-commerce brands

**Proof**
- Built a live marketplace end to end: Next.js + Supabase, custom Shopify Sales Channel app, Razorpay checkout w/ partial COD, 115 test files on money paths
- 4 yrs on Coinbase's Deribit back-office (React/TS admin modules, Angular→React migration)
- Discord bot I ran solo: 10k+ servers, 2.4M members, 10 shards

**Rates**
- Fixed-price audit: $600–1,200 (3–4 days, written report + fix plan)
- Sprints from $3k · hourly $40–60

**Portfolio:** {{PORTFOLIO_URL}}
**Contact:** DM here or {{YOUR_EMAIL}}
```

**Reply to a `[Hiring]` post** (comment if the post asks for comments, otherwise DM):
```
Hi! This matches my recent work closely: {{ONE-LINE PROOF}}. Portfolio: {{PORTFOLIO_URL}}. Sent you a DM with how I'd approach it.
```

---

## 3. Indie Hackers: intro post (your own post, once)

**Title:** `Hi IH: I help founders get AI-built MVPs production-ready (and I built a marketplace on the side)`

```
Hey everyone 👋

I'm Parth, a product engineer from Pune, India. For 4 years I built back-office tools for a crypto derivatives exchange (Coinbase's Deribit). On the side, I co-built Cultus, a swipe-based fashion marketplace for Indian homegrown brands. It went live in April 2026, and in the first 4 months it reached 890+ users, 180+ orders, ₹2.9L GMV and 12 brands.

What I learned shipping it as a tiny team:
- Write tests for money paths first (we have 115 test files; pricing/refunds/coupons/Shopify sync never break silently)
- ADRs (we have 17) save you from re-arguing decisions at 2am
- Webhooks lie: process them idempotently and reconcile nightly

I'm now freelancing, mostly helping founders take Lovable/Bolt/v0/Cursor apps to production (Supabase RLS, auth, payments, tests, CI).

Happy to answer questions about Supabase security, Shopify apps, or Razorpay. And I'd love to hear what's breaking in your stack.
```

---

## 4. Discord / Slack community intro (Supabase, Next.js, Lovable, Reactiflux)

Only post in the **#introductions** channel (or equivalent), and only if the server allows it.
```
Hi all! Parth here, a product engineer from Pune 🇮🇳. I mostly work with Next.js + Supabase (built a live marketplace on it) and Shopify/Razorpay integrations. Happy to help with RLS policies, auth flows, and webhook/payment edge cases. Ping me if you're stuck.
```
Then **help in the help channels for weeks** before you mention any services. Your profile bio carries the link.

---

## 5. "Show HN" / open-source launch (optional authority play)

If you open-source a useful tool (e.g., a Shopify store speed auditor CLI, a Supabase RLS checker *for your own projects*, or a Razorpay webhook test harness):

**Title:** `Show HN: {{TOOL_NAME}}, {{one-line what it does}}`
```
I built {{TOOL_NAME}} after {{the real problem you hit — e.g., "debugging duplicate Razorpay webhooks on a marketplace I built"}}.

It {{what it does in 2 sentences}}. It's open source (MIT): {{REPO_URL}}

How it works: {{3 bullets of technical substance}}

I'd love feedback on {{specific question}}.
```
*Show HN is for things people can try. No landing pages, no sales pitch. One good Show HN can bring inbound for months.*
