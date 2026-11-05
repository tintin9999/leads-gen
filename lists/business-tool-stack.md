# Business tool stack

> **BLUF.** Start on the **₹0 stack** below. Pay for a tool only when it saves you an hour a week or a client asks for it. Pricing and free tiers change often: check the vendor page before you buy (as of Nov 2026).

## The ₹0 starter stack

| Job | Use | Why |
|---|---|---|
| Pipeline / CRM | [`tools/crm.html`](../tools/crm.html) | Already built for your offers, stages and scripts. Export a backup weekly. |
| Outreach drafting | [`tools/outreach-composer.html`](../tools/outreach-composer.html) | Templates + logs touches into the CRM |
| Proposals | [`tools/proposal-builder.html`](../tools/proposal-builder.html) → print to PDF | Three-option proposals in minutes |
| Invoices | [`tools/invoice-generator.html`](../tools/invoice-generator.html) | GST, non-GST and export (LUT) formats + register |
| Rates / tax / runway | [`tools/rate-calculator.html`](../tools/rate-calculator.html) | India presumptive-tax maths built in |
| Booking | [Cal.com](https://cal.com) (free tier) | 20-minute discovery slots, buffers, timezone handling |
| Email on your domain | [Zoho Mail](https://www.zoho.com/mail/) (check whether the free plan is available in your region) or Google Workspace | Professional address; Google if clients use Google Meet/Docs heavily |
| Website hosting | [Cloudflare Pages](https://pages.cloudflare.com/) (free) | Free tier allows a business site. **Vercel's Hobby plan is for non-commercial personal use only**, so a business site belongs on Vercel Pro or elsewhere. |
| Time tracking | [Toggl Track](https://toggl.com/track/) or [Clockify](https://clockify.me/) (free tiers) | Effective-hourly-rate reviews on fixed-price work |
| Project boards | GitHub Projects (in the client's org), [Linear](https://linear.app) free tier, or Trello | Clients see progress without asking |
| Async video | [Loom](https://www.loom.com) free tier, or [Cap](https://cap.so) (open source) | Teardowns and weekly demos |
| Passwords & secret sharing | [Bitwarden](https://bitwarden.com) (free) incl. Bitwarden Send | Never paste credentials into chat |
| Docs & notes | Notion or Obsidian | Client wiki, ADRs, meeting notes |
| Diagrams | [Excalidraw](https://excalidraw.com) | Architecture diagrams for case studies and proposals |
| Payment collection (India) | Bank transfer/UPI; [Razorpay](https://razorpay.com) payment links once you need cards | You already know Razorpay well |
| Payment collection (global) | See [payment rails](payment-rails.md) | Low FX fees + FIRA |
| Uptime & errors for client apps | [UptimeRobot](https://uptimerobot.com) / [Better Stack](https://betterstack.com) free tiers, [Sentry](https://sentry.io) developer tier | Part of every care plan |
| Analytics for your site | [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (free) or self-hosted [Umami](https://umami.is) | Privacy-friendly, no cookie banner needed in most setups |
| E-signature | See [Contracts memo](../memos/07-contracts.html) | Free tiers plus Aadhaar eSign options for Indian clients |

## When to upgrade (≈ ₹2–4k/month stack)

| Upgrade | Trigger |
|---|---|
| Google Workspace | Clients expect Google Docs/Meet invites from your domain |
| Vercel Pro or similar | You host anything commercial on Vercel (your site or client demos) |
| Loom paid | More than ~25 teardowns stored, or longer videos needed |
| Accounting software ([Zoho Books](https://www.zoho.com/in/books/), [Refrens](https://www.refrens.com), Vyapar, Tally) | GST-registered with monthly returns, or more than ~10 invoices a month |
| LinkedIn Premium / Sales Navigator | Systematic LinkedIn outbound with saved lead lists (see [lead sources](lead-sources.md)) |
| Email finder ([Hunter](https://hunter.io), [Apollo](https://www.apollo.io)) | Signal-based cold email beyond ~50 contacts/week (follow the deliverability rules in the Lead Generation memo) |
| Coworking day pass/membership | Isolation or home distractions; also a networking channel in Pune |

## Security baseline (non-negotiable)

- 2FA everywhere (GitHub, email, bank, payment rails, domain registrar), preferably an authenticator app or hardware key.
- Separate browser profile for client work; separate OS user or VM for running untrusted code (see [Risks & Scams](../memos/11-risks-and-scams.html)).
- Full-disk encryption on your laptop, automatic OS updates, encrypted backups.
- Client credentials live in the client's password manager or Bitwarden Send, never in Slack/WhatsApp history.
- Run [gitleaks](https://github.com/gitleaks/gitleaks) before making any repo public.

## AI tools at work

Cursor, Claude, ChatGPT, v0 and Lovable speed you up, which is one reason fixed pricing suits you. Follow the rules in [`templates/delivery/ai-usage-policy.md`](../templates/delivery/ai-usage-policy.md): disclose AI-assisted development in contracts, never paste client secrets or personal data into tools without permission, and review everything that ships.

## Sources
- [Vercel — Fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines) and [Hobby plan](https://vercel.com/docs/plans/hobby): Hobby is limited to non-commercial personal use; commercial usage requires Pro or Enterprise.
- Vendor pricing pages linked above (check current free-tier limits before relying on them).
