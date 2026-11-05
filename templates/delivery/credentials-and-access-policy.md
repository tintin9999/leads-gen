# Credentials & Access Policy

> **When to use:** Attach to proposals and MSAs (as an annexure) and send at onboarding. Security-conscious clients (fintech, SaaS, larger D2C brands) will trust you more once they've read it. It also protects *you*. If something leaks, you can show you followed a written policy, held least-privilege access and never kept shared passwords.
>
> **How to fill:** The first part is client-facing; publish it as is. The second part is your internal checklist.

---

## Part 1 — Client-facing policy ({{BUSINESS_NAME}})

**1. You own everything.** Production accounts (code repos, hosting, databases, Shopify, payment gateways, domains, analytics, SaaS) are created in **your** name and billed to **your** card. I work inside them as an invited member. I never run your production on my personal accounts.

**2. Individual, named access, never shared logins.** Invite my own account ({{YOUR_EMAIL}}) with the **least privilege** needed. Please don't send me the owner's password or OTPs. I will never ask for them.

**3. MFA everywhere.** My accounts use multi-factor authentication (authenticator app or hardware key). Please enable it on owner accounts as well.

**4. Secrets travel only through a password manager.** API keys, database passwords and webhook secrets are shared through {{1Password / Bitwarden}} or a one-time, expiring link (e.g. Bitwarden Send). They are never sent over WhatsApp, Slack, email or in tickets. Secrets live in your hosting provider's environment variables, never in code or Git history.

**5. Test before live.** I build payment and other money-related flows in **test/sandbox mode** first (Razorpay test keys, Shopify development stores, Stripe test mode). Live keys are created and set by you, or together with you on a call.

**6. Your data stays in your systems.** I don't download production customer data to my laptop. When debugging needs real data, I use the minimum, anonymised where possible, and delete it afterwards. Under India's DPDP Act I act as your **data processor**: I follow your instructions, keep reasonable security safeguards and tell you within **24 hours** of any suspected breach.

**7. My devices** have full-disk encryption, auto-lock, current OS and security updates, a password manager, and a separate browser profile for each client.

**8. AI tools** follow my [AI Usage Policy](ai-usage-policy.md). No secrets, credentials or personal data go into AI tools.

**9. Offboarding.** At the end of a project or care plan, my access is removed and you rotate the secrets I had access to. I confirm in writing that local copies are deleted ([handover checklist](handover-checklist.md)).

**10. Incidents.** If I suspect a credential leak or breach, I tell you immediately (within 24 hours at the latest), help contain it (rotate keys, revoke sessions), and write a short incident report.

---

## Part 2 — Internal checklist (platform-by-platform)

| Platform | Ask the client for | Notes |
|---|---|---|
| **GitHub / GitLab** | Invite to org/repo with **Write** (not Admin) | Use SSH keys with passphrase; fine-grained tokens scoped to one repo with expiry; enable branch protection on `main` |
| **Vercel** | Team member (Developer role) on the client's **Pro/Enterprise** team | Vercel's Hobby plan is for **non-commercial personal use only**. A client's store or SaaS must run on Pro or Enterprise, so flag this at onboarding. Hobby also can't add members. Alternative: push to the client's GitHub repo and let their Vercel project deploy it, so you never need Vercel access |
| **Supabase** | Org member with **Developer** role (not Owner) | Developer can work with project content but can't change project settings. Ask for Administrator only while you change auth providers or secrets, then downgrade. Service-role key only in server env vars; RLS on every table; separate dev/staging project for experiments |
| **Shopify** | Approve your **collaborator request** sent from your Partner / Dev Dashboard (they may need to share a 4-digit collaborator request code) | The owner chooses permissions. Build on a **development store** first. The owner removes you at the end |
| **Razorpay** | Team-member invite with the least-privileged role that covers API keys/webhooks; **test mode** first | Owner generates live keys and webhook secrets; verify webhook signatures; never log full payment payloads |
| **Stripe** (global) | Team member with Developer role; test mode | Restricted API keys where possible |
| **AWS / GCP** | IAM Identity Center / IAM user or role with scoped policy + MFA | Never accept root credentials or long-lived admin keys |
| **Domain / DNS** | Usually nothing: send them the DNS records to add. Or a Cloudflare member with DNS-only role | Registrar login stays with the client |
| **Analytics (GA4, Shopify, Mixpanel)** | Viewer | — |
| **Email/SMS (Resend, SendGrid, MSG91)** | Developer/limited key | Sending domains verified in the client's account |
| **Figma / Notion / Slack** | Guest or member in a shared channel | Slack Connect channel preferred over joining their workspace |

### Personal setup (do once)
- [ ] Password manager with separate vaults per client (or tags); emergency kit stored offline
- [ ] Authenticator app + backup codes; hardware security key for email, GitHub and password manager
- [ ] Full-disk encryption (FileVault / BitLocker / LUKS); auto-lock ≤ 5 min; firmware/OS auto-updates
- [ ] Separate browser profile per client; no client data in personal Google Drive/WhatsApp backups
- [ ] Encrypted backups of *your* work machine (client data excluded or encrypted)
- [ ] Unknown repos (take-home tests, "fix our bug" from strangers) only in a disposable VM/container. Fake-recruiter malware targets developers ([11-risks-and-scams](../../memos/11-risks-and-scams.html))
- [ ] Separate email aliases: `hello@` for sales, `billing@` for invoices, personal email never on contracts

### Offboarding script (end of each engagement)
1. List every system you had access to (keep this list from onboarding).
2. Ask the client to remove you, or remove yourself where possible; screenshot the confirmation.
3. Send the client the list of secrets to rotate.
4. Delete local clones containing secrets, `.env` files, DB dumps and downloaded exports; empty the trash.
5. Revoke personal access tokens and OAuth apps created for the project.
6. Confirm in writing: "Access removed from X, Y, Z; local copies deleted on {{date}}."
