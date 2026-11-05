# Handover Checklist

> **When to use:** At the end of every project (after the final payment) and whenever a care plan ends. A clean handover is a selling point ("another engineer can pick this up in a day"). It's also your legal protection: it records what was delivered, who owns what, and that your access is gone.
>
> **How to fill:** Copy this into the project doc, tick the items, and send the completed checklist to the client with the handover email at the bottom. Store the signed or acknowledged copy in the client folder.
>
> **Never skip:** credential rotation, removal of your own access, and the written acknowledgement.

---

**Project:** {{PROJECT_NAME}} · **Handover date:** {{DATE}} · **Warranty ends:** {{DATE + 30 days}}

## 1. Code & repositories
- [ ] All code merged to the default branch in the **client-owned** repo ({{org/repo}}); no work left only on personal forks or branches
- [ ] Release tagged (`v1.0.0`) with changelog
- [ ] CI green on default branch; test suite documented (`npm test`), including money-path tests (pricing, payments, refunds, coupons, inventory sync)
- [ ] Dependencies up to date; `npm audit` / `pnpm audit` reviewed; lockfile committed
- [ ] Licence inventory of third-party / open-source components (MIT/Apache etc.; no unapproved AGPL/GPL)

## 2. Documentation
- [ ] **README:** what it is, architecture diagram, local setup in < 30 min, scripts, deploy steps
- [ ] **ADRs** for key decisions (why X over Y). Cultus-style: short, numbered, in `/docs/adr`
- [ ] **Runbook:** common operations (redeploy, rotate keys, re-run sync/reconciliation, handle failed refunds/webhooks), with who to call
- [ ] **Environment variables:** list of names, purpose and where they're set (**never values**)
- [ ] Known issues & recommended backlog (prioritised, with estimates)
- [ ] Loom walkthrough(s) of codebase and admin flows (5–15 min)

## 3. Environments, accounts & ownership
| Item | Owner should be | Status |
|---|---|---|
| Domain & DNS (registrar, Cloudflare) | Client | ☐ |
| Hosting (Vercel/AWS/Render) project + billing | Client | ☐ |
| Database (Supabase/Postgres) org + billing; backups/PITR configured | Client | ☐ |
| Shopify app: if it lives in **your** Partner/Dev Dashboard org, transfer it to the client's org or document why it stays (and the maintenance terms) | Client | ☐ |
| Shopify collaborator access: client removes / you release | — | ☐ |
| Payment gateway (Razorpay/Stripe): webhooks pointing to production URLs, secrets set by client, test vs live keys separated | Client | ☐ |
| Email/SMS providers, analytics, error tracking (Sentry), uptime monitoring alerts routed to the client's team | Client | ☐ |
| App store / Play Console accounts (if any) | Client | ☐ |
| Third-party SaaS subscriptions in client's name & card | Client | ☐ |

## 4. Security
- [ ] All secrets you ever saw are **rotated** by the client (API keys, webhook secrets, DB passwords, service-role keys)
- [ ] Supabase RLS enabled on every table / storage bucket; policies documented
- [ ] Admin users reviewed; MFA on for owners
- [ ] **Your access removed** from: repo, hosting, database, Shopify, payment gateway, analytics, Figma, Slack, email groups, password-manager shares
- [ ] Local copies of client data deleted; confirm in writing (DPDP/GDPR processor duty)

## 5. Knowledge transfer
- [ ] Handover call held (recorded) with client and/or their next developer
- [ ] Questions log answered
- [ ] Warranty scope explained: defects vs new features, how to report, response time

## 6. Commercial
- [ ] Final invoice paid (handover follows payment)
- [ ] Warranty start/end dates confirmed
- [ ] Care plan offered ([retainer-agreement.md](../contracts/retainer-agreement.md))
- [ ] Closeout steps scheduled ([project-closeout.md](project-closeout.md))

---

## Handover email

**Subject:** {{PROJECT_NAME}} — handover complete ✅

Hi {{CLIENT_FIRST_NAME}},

{{PROJECT_NAME}} is now fully handed over. Everything lives in your accounts:

- **Code:** {{repo link}} (release v1.0.0) · **Docs:** README, ADRs, runbook in `/docs` · **Walkthrough:** {{Loom links}}
- **Ownership:** all accounts and billing are in your name (list attached). Per our agreement, IP in the project code is now yours.
- **Security:** please rotate the keys listed in the attached sheet if you haven't yet. I've removed my access to {{systems}} and deleted local copies of your data.
- **Warranty:** until **{{date}}**. If something doesn't work as specified, email me with steps to reproduce and I'll fix it.

If you'd like me to stay on for updates, monitoring and small improvements, my Care Plan starts at {{₹25,000 / $1,000}}/month. Details attached.

Could you reply "Handover received" so we both have a record?

Thank you, it's been a great project.
{{YOUR_NAME}}
