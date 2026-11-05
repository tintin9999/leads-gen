# Client Onboarding Questionnaire

> **When to use:** Send this right after the contract is signed and the deposit invoice is out, ideally 2–3 days before kickoff. Use a Google Form, a Notion page, or paste it into an email. Tell the client it takes about 15 minutes and saves a week of back-and-forth.
>
> **How to fill:** Delete the track section that doesn't apply (A = Indian D2C/Shopify, B = global startup/SaaS). Anything left blank becomes an agenda item for the [kickoff](kickoff-agenda.md). Store answers in the client folder and copy key facts into the CRM ([../../tools/crm.html](../../tools/crm.html)).
>
> **Never remove:** the billing/tax block (it stops invoices bouncing) or the "personal data" question (it determines DPDP/GDPR obligations).

---

**Project:** {{PROJECT_NAME}} · **Please return by:** {{DATE}} · **Questions?** {{YOUR_EMAIL}}

## 1. Goals & success
1. In one or two sentences, what problem are we solving, and why now?
2. What does success look like 30 and 90 days after launch? Give a number if you can, e.g. "mobile conversion from 1.1% to 1.5%", "admin approvals in < 1 day", "launch before {{event}}".
3. What would make this project a failure in your eyes?
4. Are there hard deadlines (sale events, investor demos, campaigns, audits)? Please list dates.

## 2. People & decisions
5. Who is the **single decision-maker** for scope and approvals? (Name, role, email, phone.)
6. Who else needs to review work, and what do they review (design, copy, legal, tech)?
7. Who handles **payments/accounts payable**? (Name, email.)
8. Have you worked with freelancers or agencies before? What went well, and what didn't?

## 3. Billing & legal (for invoices)
9. Legal entity name exactly as it should appear on invoices:
10. Billing address · GSTIN (if any) · PAN (Indian clients, for TDS):
11. Is a **Purchase Order** required before invoicing? If yes, who issues it and how long does it take?
12. Indian clients: will you deduct **TDS**, and under which category (professional services 10% / technical services 2%)?
13. Preferred payment method: bank transfer / UPI / payment link / card (international: wire / ACH / other).
14. Any vendor onboarding forms we need to complete?

## 4. Data & compliance
15. Will I see or handle **personal data** (customer names, phones, addresses, orders, health, financial data)? Which systems hold it?
16. Do you have security or privacy policies I must follow (access rules, VPN, device policy, no-AI-tools policy)?
17. Are there regulatory constraints, e.g. RBI or payment-aggregator rules, PCI, HIPAA, GDPR (EU customers), sector rules?

## 5. Access checklist (please grant before kickoff)
Use **individual access for {{YOUR_EMAIL}}**, never a shared login. Credentials only through a password manager ([our policy](credentials-and-access-policy.md)).

| System | What's needed | Done? |
|---|---|---|
| Code repository | Invite to GitHub/GitLab org or repo (write access) | ☐ |
| Hosting | Vercel / AWS / other: team member (developer role) | ☐ |
| Database / backend | Supabase / Firebase: developer role (not owner) | ☐ |
| Shopify | Approve my **collaborator request** (I'll send it from my Partner account; share your 4-digit collaborator code if you've set one) | ☐ |
| Payments | Razorpay / Stripe: team member with developer access (test mode first) | ☐ |
| Analytics | GA4 / Shopify analytics / Mixpanel: viewer | ☐ |
| Domain / DNS | Only if the scope needs it; otherwise you make changes on my instructions | ☐ |
| Design | Figma: view/comment | ☐ |
| Communication | Shared Slack channel / email group | ☐ |

## 6A. Track A — D2C / Shopify brands
18. Store URL · Shopify plan · theme name/version · when was the theme last updated?
19. Installed apps (list, or a screenshot of Apps), and which ones you can't live without.
20. Monthly sessions, orders and conversion rate (approximate is fine). Share of mobile traffic.
21. Payments: Razorpay / Shopify Payments / other? COD share of orders? RTO (return-to-origin) rate?
22. Marketplaces and integrations (Cultus, Myntra, Amazon, Meesho, ERP, WMS, logistics like Shiprocket/Delhivery)?
23. Known pain points from customers or your team (slow pages, checkout drop-off, inventory mismatch, failed refunds)?
24. Upcoming sale calendar (Diwali, EOSS, Republic Day, brand anniversary) — dates when **no risky deploys** should happen.

## 6B. Track B — Startups / SaaS / internal tools
18. Product URL and staging URL · tech stack (framework, DB, auth, hosting) · how it was built (in-house / agency / Lovable/v0/Bolt/Cursor)?
19. Number of users today and expected in 6 months; any enterprise customers or security questionnaires on the horizon?
20. Existing tests, CI/CD, monitoring and error tracking?
21. Known incidents or security worries (exposed keys, Supabase RLS, auth bugs, payment webhooks)?
22. Who will own the code after me (in-house dev, future hire, another agency)? This determines how much documentation you need.
23. Time zone and best overlap hours for calls.

## 7. Working style
25. Preferred channel (Slack / email / WhatsApp for quick pings) and preferred meeting day/time.
26. How often do you want updates? (Default: written update every Friday + demo every 1–2 weeks.)
27. Holidays or blackout dates on your side during the project?
28. Anything else I should know?
