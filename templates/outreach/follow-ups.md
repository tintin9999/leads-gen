# Follow-up Sequences, Breakup Email, and 90-Day Re-engagement

Most replies arrive **after** a follow-up, not after the first message. Most freelancers send one message and stop. The other mistake is chasing a cold lead forever. This file sits in between: **a fixed number of follow-ups, each adding something new, then a clean stop and a scheduled check-back.**

**Rules**
1. **Every follow-up adds something**: a tip, a resource, a new angle, or an easy way out. "Just checking in" adds nothing.
2. **Cold: max 3 follow-ups. Warm: max 1–2.** Any "no" or "not interested" means stop immediately and set CRM `stage=lost`, or `nurture` if they said "not now".
3. **Reply in the same thread** so they see the context.
4. Every touch is logged in [the CRM](../../tools/crm.html): `lastTouch` = today, `nextAction` + `nextDate` set. A lead with no `nextDate` is a lead you've forgotten.

Placeholders: `{{FIRST_NAME}}` `{{COMPANY}}` `{{PAIN}}` `{{OFFER}}` `{{CAL_LINK}}` `{{PORTFOLIO_URL}}` `{{RESOURCE}}`

---

## 1. Cadence cheat-sheet

| Situation | Touch 1 | Follow-ups | Then |
|---|---|---|---|
| Cold email | Day 0 | Day 3 (value) · Day 7 (new angle) · Day 14 (breakup) | `nurture`, +90 days |
| LinkedIn after accept | Day 0 | Day 5–7 (value) · Day 12–14 (easy out) | `nurture`, +90 days |
| Warm DM (people you know) | Day 0 | Day 5–7 (one bump) | `nurture`, +60 days |
| After a discovery call | Same day (recap) | Day 2 (proposal sent) | See proposal row |
| Proposal sent | Day 0 | Day 2 (check it arrived / questions) · Day 5 (answer an objection) · Day 10 (deadline / options) · Day 21 (close the loop) | `lost` or `nurture` |
| Met at an event | Within 24 h | Day 7 (value) | `nurture`, +60 days |
| Upwork proposal | — | You can't follow up until the client replies. **Move on.** | — |

Full sales process (calls, proposals, objections): [memo 06](../../memos/06-sales-process.html).

---

## 2. Cold email follow-ups (also in [cold-email.md](cold-email.md))

**Day 3: value**
```
Hi {{FIRST_NAME}}, one more thing that might help regardless: {{MICRO_TIP}}. Happy to send the full list.
```

**Day 7: new angle**
```
{{FIRST_NAME}}, maybe {{OFFER}} isn't the priority right now. Is {{ADJACENT_PAIN}} closer to what's on your plate? It's common at {{COMPANY}}'s stage, and I can help there too.
```

**Day 14: breakup** (often the email that gets the most replies)
```
Hi {{FIRST_NAME}}, I haven't heard back, so I'll assume {{PAIN}} isn't a priority right now and stop emailing.

If that changes, here's my calendar: {{CAL_LINK}}. Good luck with {{SPECIFIC_THING}}!
```

---

## 3. Post-call recap (same day; this is where most freelancers lose deals)

```
Subject: {{COMPANY}} × {{YOUR_NAME}}: recap + next steps

Hi {{FIRST_NAME}}, thanks for the time today. Here's what I heard:

• Goal: {{THEIR_GOAL_IN_THEIR_WORDS}}
• Problem today: {{PAIN}} (costing roughly {{IMPACT}})
• Must-haves: {{REQS}}
• Timeline: {{DEADLINE}} · Decision: {{WHO_DECIDES}}

Next step: I'll send a proposal with 2–3 options by {{DATE}}. If I've missed anything, just reply and correct me.

{{YOUR_NAME}}
```

## 4. Proposal follow-ups

**Day 2: arrived + questions**
```
Hi {{FIRST_NAME}}, checking that the proposal reached you okay. Any questions on the options or the timeline? Happy to jump on a 10-minute call to walk through it.
```

**Day 5: pre-empt the objection**
```
{{FIRST_NAME}}, one thing teams often ask at this point is {{COMMON_OBJECTION — e.g., "whether we can start with a smaller first phase"}}. Yes. Option A is built for exactly that: {{1 line}}.
```

**Day 10: real deadline (only if true)**
```
Hi {{FIRST_NAME}}, a quick heads-up: I'm planning my {{MONTH}} schedule and can hold a start date of {{DATE}} until {{HOLD_DATE}}. After that the earliest start moves to {{LATER_DATE}}. Want me to hold it?
```

**Day 21: close the loop**
```
Hi {{FIRST_NAME}}, I'm guessing timing or priorities have shifted, so I'll close this on my side. If you'd like to pick it up later, the proposal stays valid for 30 days (prices may change after that). Thanks for considering me.
```

---

## 5. LinkedIn follow-ups (after connection accepted)

**Value (day 5–7)**
```
Hi {{FIRST_NAME}}, came across {{RESOURCE}} and thought of {{COMPANY}}. Hope it's useful!
```

**Easy out (day 12–14)**
```
Last nudge from me. If {{PAIN}} isn't a priority right now, totally fine. If it becomes one: {{CAL_LINK}}. Rooting for {{COMPANY}}!
```

## 6. Event follow-up (within 24 hours)

```
Hi {{FIRST_NAME}}, great meeting you at {{EVENT}} yesterday. I enjoyed the chat about {{SPECIFIC_DETAIL}}. As promised, here's {{THING_YOU_PROMISED — e.g., "the Razorpay webhook checklist" / "that Next.js caching article"}}: {{LINK}}. Let's stay in touch!
```

---

## 7. 90-day re-engagement (for `nurture` leads)

Every Monday, filter the CRM for `stage=nurture` and `nextDate ≤ today`. Send **one** of these, picking whichever feels most natural:

**A. Trigger-based (best)**: something changed for them
```
Hi {{FIRST_NAME}}, congrats on {{TRIGGER — funding / launch / new hire / festive sale numbers}}! When we spoke in {{MONTH}}, {{PAIN}} was on your list. Is it still, now that {{CHANGE}}? I've since {{NEW_PROOF — e.g., "shipped the same fix for a fashion brand: LCP from 5.1s to 2.3s"}}.
```

**B. New proof**: something changed for you
```
Hi {{FIRST_NAME}}, a quick share. I just wrapped {{PROJECT}}, which is close to what you described back in {{MONTH}}. Here's the 2-minute case study: {{LINK}}. If {{PAIN}} is back on the table, happy to chat.
```

**C. Pure value**: no ask
```
Hi {{FIRST_NAME}}, saw this and thought of {{COMPANY}}: {{RESOURCE}}. No agenda, just thought it might help.
```

If there's no reply, set `nextDate` +90 days. After **3 silent re-engagements (~9 months)**, move to `lost` and stop.

---

## 8. Referral ask (to happy past contacts or clients, every ~6 months)

```
Hi {{FIRST_NAME}}, hope {{COMPANY}} is doing well! I'm opening up 1–2 slots for {{MONTH}}. If you know a founder or team dealing with {{PAIN_YOU_SOLVED_FOR_THEM}}, an intro would mean a lot. Here's a blurb to forward: {{BLURB}}
```
(Testimonials and case studies after delivery: see [memo 08](../../memos/08-delivery-ops.html).)
