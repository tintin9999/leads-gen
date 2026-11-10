# Upwork proposal kit

**When to use:** from the 2-minute job check to the review request at the end of a job.
**How to fill:** replace every `{{PLACEHOLDER}}` with the client's own words and facts; keep each proposal under 150 words.
**Never do:** share an email, phone number, chat app or meeting link before a contract, or accept payment outside Upwork.

---

## 1. The 2-minute job check

One point each. 6–8: apply. 4–5: apply only if the fit is perfect. 0–3: skip.

- [ ] Payment verified
- [ ] Client has spent money on Upwork ($1,000+ is good)
- [ ] Hire rate 50% or more
- [ ] Client's reviews of freelancers are kind and specific
- [ ] Posted less than 2 hours ago
- [ ] Fewer than 10 proposals
- [ ] Clear task: named problem, one stack, a price
- [ ] Fits your service: Next.js, React, Supabase, payments, admin, AI-built apps

Skip whatever the score if the post asks for Telegram, WhatsApp or email, free test work, or running their code before a contract.

## 2. Four proposals

### A. Login and data-safety fix on Supabase

> Your users {{SYMPTOM, for example "see other people's orders"}} sounds like missing data-access rules in Supabase (row-level security). It is common in apps made quickly, and it can be fixed safely.
>
> I built Cultus (cultus.co.in), a live Next.js and Supabase marketplace with 890+ users, where each brand sees only its own data.
>
> My plan:
> 1. Day 1: review every table's rules on a test copy and send you a short list of holes.
> 2. Days 2–3: fix them, with a test that proves one user cannot read another's data.
> 3. Day 4: you check it, and I hand over plain-English notes.
>
> One question: {{QUESTION, for example "is there a test copy, or only the live app?"}}
>
> {{PRICE}} fixed, {{DAYS}} days.

### B. A payment bug with Stripe or Razorpay

> {{SYMPTOM, for example "Paid orders staying pending"}} usually means your app misses the message {{Stripe/Razorpay}} sends after payment (the webhook). It is fixable this week.
>
> On Cultus I built Razorpay checkout with part payment on delivery: 180+ paid orders and 115 test files on the money paths.
>
> My plan:
> 1. Day 1: repeat the bug in test mode and send you a short video.
> 2. Days 2–3: fix how payments are confirmed, and add a test for each case.
> 3. Day 4: we run three test payments together, then I hand over notes.
>
> One question: does it happen with every card, or only some?
>
> {{PRICE}} fixed, {{DAYS}} days.

### C. An admin dashboard

> You need a dashboard where {{WHO, for example "your support team"}} can {{TASK, for example "find a customer and refund an order"}} without touching the database.
>
> I have built back-office tools for a large crypto exchange, and the brand dashboards in Cultus.
>
> My plan:
> 1. Days 1–2: agree the 3–5 screens on a simple sketch, and who may see what.
> 2. Days 3–8: build the screens in Next.js on your Supabase data, with login and roles.
> 3. Days 9–10: you test it with real tasks, I fix what you find and hand over.
>
> One question: which one task wastes the most time today?
>
> {{PRICE}} fixed in two milestones, {{DAYS}} days.

### D. AI-built app to production

> Apps built with {{Lovable/Bolt/v0/Cursor}} work well in a demo, then break with real users. The usual gaps are data access, payments and error handling.
>
> I built Cultus, a live Next.js and Supabase marketplace with 890+ users and 115 test files on its money paths.
>
> My plan:
> 1. Days 1–2: check the app and send a ranked list of risks, in plain English.
> 2. Days 3–6: fix the top risks first, with tests.
> 3. Day 7: deploy, check it live with you, and hand over notes.
>
> One question: how many real users do you expect in the first month?
>
> {{PRICE}} fixed, {{DAYS}} days. Step 1 can be a separate small milestone if you prefer.

## 3. Five opening lines

1. "Your {{SYMPTOM}} sounds like {{LIKELY CAUSE}}. It is common, and fixable this week."
2. "I watched your app's {{PAGE}} and I think I see where the {{PROBLEM}} starts."
3. "Before real users arrive, your app needs three things checked: data access, payments and errors."
4. "You want {{RESULT}} by {{DATE}}. Here is a plan that gets there in {{DAYS}} days."
5. "I fixed this exact problem on a live marketplace with 180+ paid orders."

## 4. First reply (after the client answers)

> Thanks, {{NAME}}. {{ONE LINE SHOWING YOU READ THEIR ANSWER}}. Yes, I can start {{DAY}}.
>
> Could we do a 15-minute call here on Upwork first? I am free {{TIME 1}} or {{TIME 2}} your time.

## 5. Five call questions

1. "Can you share your screen and show me what a user sees when it breaks?"
2. "When did it start, and what changed just before?"
3. "Who uses the app today: testers, or paying customers?"
4. "How will you check that it is fixed?"
5. "Is there a test copy of the app, and who gives me access?"

## 6. Start message (after the milestone is funded)

> Thanks, {{NAME}}, the contract is funded and I have started. Today I will {{FIRST TASK}}. You will get a short update by {{TIME}} each working day. I will need {{ACCESS}}; please share it here.

## 7. Daily update

> **Done today:** {{DONE}}
> **Next:** {{NEXT}}
> **Need from you:** {{NEED or "nothing"}}
> **On track for:** {{DATE}}

## 8. Handover message

> {{NAME}}, the work is done and submitted. What changed: {{1–3 LINES}}. How to check it: {{STEPS}}. Notes and test results are attached. I tested {{WHAT}}. If anything looks wrong, tell me in the next {{DAYS}} days and I will fix it.

## 9. Review request

> Thank you for working with me, {{NAME}}. If you were happy, a short review would help me a lot, as I am new on Upwork. One line on what you liked is plenty.

## 10. Polite refusals

**Free test work:**
> Thanks for considering me. I do not do unpaid test work, but I can do a small paid first milestone, for example {{SMALL TASK}} for {{SMALL PRICE}}. That way you see my work with no risk.

**Lower price:**
> I understand the budget. For {{THEIR PRICE}}, I can do {{SMALLER SCOPE}}, and leave {{CUT ITEM}} for later. I cannot do the full scope for less and still test it properly.

**Leaving Upwork:**
> Thanks for thinking of my fees. I take payment only through Upwork, which protects us both. If you want to move off later, Upwork has a proper conversion option and I am open to it.
