# GitHub profile README

> **When to use:** create a repo named exactly like your GitHub username, add this as `README.md`. Technical buyers (Track B) will look at your GitHub.
> **How to fill:** replace `{{…}}`, pin 4–6 repos (spec projects first).
> **Never:** pin half-finished repos, or repos with committed secrets. Run `git log -p | grep -iE "key|secret|token"` on anything you make public.

```markdown
### Hi, I'm {{YOUR_NAME}} 👋

Product engineer for **commerce & internal tools**: React, Next.js, TypeScript, Supabase/Postgres, Shopify, Razorpay.

- 🛒 Built **[Cultus](https://cultus.co.in)**, a live marketplace with a custom Shopify Sales Channel app and Razorpay Magic Checkout
- 🏦 Built back-office tooling for **Deribit (Coinbase)**: Angular → React migration, Vitest in CI
- 🧾 Built a tax-filing module used by **100k+** people: schema-driven forms, year-versioned
- 🤖 Scaled **Bro** to 10k+ Discord servers and 2.4M members

**Currently helping:** D2C brands with faster stores and reliable checkouts, and founders taking AI-built MVPs to production.

📫 {{YOUR_EMAIL}} · 📅 [Book a call]({{CAL_LINK}}) · 🌐 [{{YOUR_DOMAIN}}](https://{{YOUR_DOMAIN}})

#### Open-source / spec projects
- **[supabase-prod-kit]({{URL}})**: production-readiness checklist + CLI for Supabase apps (RLS, storage, keys, auth)
- **[d2c-speed-report]({{URL}})**: what slows down Indian D2C stores (data + method)
- **[admin-starter]({{URL}})**: Next.js + Supabase admin dashboard with RBAC, approvals, audit log
```

## Pin order
1. Supabase production-readiness kit (B1)
2. D2C speed report method/data (A1)
3. Admin dashboard starter (B2), once built
4. Angular → React strangler demo (B3), once built
5. Bro-Projects org repo (scale story)
6. Spotify Summary (only if polished)

## Hygiene checklist
- [ ] Every pinned repo has a README with a screenshot/GIF, setup steps and a licence (MIT for spec projects).
- [ ] No secrets in history (use `gitleaks` or `trufflehog` before publishing).
- [ ] Profile photo, name, location "Pune, India", website and email filled in.
- [ ] Contribution graph: small, steady commits beat big bursts.
