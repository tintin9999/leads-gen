# Discovery call script (30 minutes)

**Goal:** find out whether there's a valuable problem you can solve, what solving it is worth, and agree the next step. **Not** to pitch, and **not** to solve the problem for free.
**Rule of thumb:** you talk less than 40% of the time. Take notes in the client's own words, because they go straight into the proposal.

Before the call (5 min):
- [ ] Open their site/app on your phone. Run PageSpeed Insights (mobile) if it's a store. Skim their LinkedIn and recent news.
- [ ] Check the CRM entry: source, what they wrote, any audit notes (`scripts/site-audit.mjs` output).
- [ ] Pick the 1–2 offers this is likely to be (A1–A4, B1–B3, C1) and open the matching question block below.
- [ ] Have your proof snippets ready (Cultus · Deribit · Twinntax), two lines each.

---

## 0–2 min · Frame

> "Thanks for making time, {{CLIENT_NAME}}. Here's my plan for the 30 minutes: I'll ask a few questions to understand what's going on, then I'll tell you honestly whether I'm a good fit and what I'd suggest as a next step. If I'm not the right person, I'll say so and point you somewhere better. Sound good?"

## 2–12 min · Situation and pain

- "What's prompting this **now**?" ← the most important question. Write the answer down word for word.
- "Walk me through how it works today."
- "What have you already tried? What happened?"
- "What does this cost you right now, in orders, hours, risk or stress?"
- "Who else is affected?"

Follow-ups that open people up: "Tell me more about that." · "What do you mean by *slow*?" · "How often?" · "And then what happens?"

## 12–18 min · The outcome

- "If we're talking in 3 months and this went really well, what changed?"
- "How would you measure that? What number moves?"
- "What would that be worth to you?" (Or work it out together: orders × AOV × lift.)

## 18–23 min · Constraints

- **Timeline:** "Is there a date this needs to be live by? What's driving that date?" (Sale season? Launch? Investor demo?)
- **Decision:** "Apart from you, who's involved in deciding? How do decisions like this usually get made?"
- **Budget:**
  - India: "Projects like this usually land between ₹40k and ₹1.2L depending on scope. Where would you want this to sit?"
  - Global: "Engagements like this typically run $3k–8k depending on scope. Is that in the range you were expecting?"
  - If they won't say: "No problem. I'll send three options: lean, recommended and complete. You pick."
- **Access:** "Who can give me access to the store, repo or analytics? Any agency or other developer involved?"

## 23–28 min · Reflect, then suggest the next step

> "Let me play back what I heard: [problem in their words], it matters now because [why now], and success looks like [metric]. Did I get that right?"

> "Here's what I'd suggest as a first step: [paid audit / A1 Essential sprint / B3 assessment]. It usually runs [price range] and takes [days]. You'd get [deliverable]. If you go ahead with the full project within 14 days, half of the audit fee is credited."

## 28–30 min · Lock in the next step

> "I'll send three options by {{DAY}} {{TIME}}. Can we take 15 minutes on {{DAY}} to walk through them together?" → **Send the calendar invite before you hang up.**

---

## Question bank by offer

### A1 · Store Speed & Conversion Sprint (Shopify)
- Orders per month? AOV? Share of mobile traffic? Current conversion rate (Shopify Analytics)?
- Which theme? When was it last updated? How many apps are installed? Any added "for one campaign"?
- Where do people drop off: home, collection, product, cart, checkout?
- Next big sale date? (Plan a **code freeze 7 days before**.)

### A2 · Shopify custom app / integrations
- What's synced by hand today (inventory, orders, marketplaces, ERP, 3PL, WhatsApp)? Hours per week? Error rate?
- Inventory source of truth? SKUs × locations? Peak order volume?
- Public app or custom (private) app? Who owns the Shopify Partner account?

### A3 · Razorpay checkout, COD and payments
- Current checkout: native, Razorpay Magic Checkout, GoKwik, Shiprocket Fastrr, Simpl?
- COD share? RTO %? Worst pincodes or states? Do you charge for COD today? Partial COD?
- Refund flow: how long do refunds take, and how many fail? Reconciliation pain?

### A4 · Headless Next.js storefront
- Why headless? What can't the theme do? (If the answer is vague → steer back to A1 or A2.)
- Content team: who edits pages, and in which CMS? SEO risk tolerance during the migration?

### B1 · Prototype → Production (AI-built / rushed MVPs)
- Built with what (Lovable, v0, Bolt, Cursor, an agency)? Live users? Live payments?
- Supabase: RLS on every table? Where's the service-role key? Any secrets in the client bundle?
- Auth: magic link, OTP, OAuth? Who has admin? Backups?
- Deploys: how? Tests? Monitoring? What broke last?
- Who maintains it after me?

### B2 · Internal tools & admin dashboards
- Who uses it daily? What do they do in spreadsheets because the tool can't?
- Roles, permissions, approvals, audit log? Data sources (Postgres, APIs, Sheets)?
- "What's the one screen that would save the ops team the most hours?"

### B3 · Frontend modernisation (Angular → React/Next)
- Angular version (AngularJS 1.x reached end of life in January 2022)? Lines of code / number of modules?
- Can features keep shipping while we migrate module by module?
- Tests and CI today? (Vitest in GitLab CI is your Deribit proof.)

### C1 · Care plan / retainer
- What breaks most often? Who fixes it today, and how fast?
- Expected monthly change volume? Response time you need?

---

## Phrases to avoid

- ❌ "That's easy." (It makes your price look absurd.) ✅ "That's very doable."
- ❌ "I can do anything." ✅ "This is exactly the kind of thing I do. Here's a similar example."
- ❌ Solving it live, step by step. ✅ Name the category of fix, then sell the audit.
- ❌ "My rate is ₹1,200/hr" (your floor). ✅ "Most of my work is fixed-price. You'll get three options."

## After the call (within 1 hour)

- [ ] Send the recap email (`post-call-recap.md`).
- [ ] CRM: stage → `call`, qualification score, value estimate, `nextAction` = "Send proposal", `nextDate` = tomorrow.
- [ ] 2-minute self-review: talk ratio, metric captured, budget discussed, decision process known, next meeting booked.
