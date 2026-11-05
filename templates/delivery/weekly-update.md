# Weekly Update (send every Friday)

> **When to use:** Send it every week of every project, including retainers (monthly version in [../contracts/retainer-agreement.md](../contracts/retainer-agreement.md)). Clients who get an update every Friday say "great to work with" in testimonials, and they also pay on time and dispute less.
>
> **How to fill:** 10 minutes, no more. Put a status colour at the top, link to work instead of describing it, and say clearly what you need from the client and by when. Add a 2–3 minute Loom demo when there's something visual.
>
> **Never remove:** the "Needed from you" box (with dates), and the scope/budget line.

---

**Subject:** {{PROJECT_NAME}} — Week {{N}} update ({{DATE}}) — 🟢 On track

**Status:** 🟢 On track · 🟡 At risk: {{why + plan}} · 🔴 Off track: {{why + options}}
**Milestone:** {{M2 — Fixes deployed}} · due {{date}} · {{65}}% done

**✅ Done this week**
- {{Outcome-focused bullet}} — [PR #{{n}}]({{link}}) / [preview]({{link}})
- {{…}}

**🎬 Demo:** {{Loom link (2–3 min)}} or "Live demo Tuesday 4 pm"

**➡️ Next week**
- {{…}}
- {{…}}

**🙋 Needed from you** (dates move day-for-day if these slip)
| What | Who | By |
|---|---|---|
| {{e.g. feedback on staging checkout}} | {{name}} | {{Tue}} |

**🧭 Decisions needed**
- {{Question}} → my recommendation: {{option + reason}}. If I don't hear back by {{date}}, I'll go with my recommendation.

**📦 Scope & budget**
- Change requests: CR-{{n}} {{approved/pending}} · Hours/budget used: {{x}} of {{y}} (fixed-price: "on budget")

**⚠️ Risks**
- {{Risk}} — likelihood {{L/M/H}} — mitigation {{…}}

Have a good weekend,
{{YOUR_NAME}}

---

## Example (Track A — Shopify custom app)

**Subject:** Inventory Sync App — Week 3 update (7 Nov) — 🟡 At risk

**Status:** 🟡 At risk. Shopify webhook delivery for `inventory_levels/update` is delayed by up to 2 min during bulk imports. Plan: add the nightly reconciliation job planned for M3 one week early. Launch date unchanged if you approve below.

**✅ Done**
- Products publish from Shopify admin to marketplace; variant mapping covers size/colour ([PR #18](#)).
- HMAC verification + idempotent processing for webhooks; 24 new tests on the sync path, all green in CI.

**🎬 Demo:** 3-min Loom: publish → sync → order flows back to Shopify.

**🙋 Needed from you**
| What | Who | By |
|---|---|---|
| Approve moving reconciliation job into this sprint (no cost change) | Riya | Mon |
| 10 test SKUs with edge-case variants | Ops team | Tue |

**🧭 Decision:** Oversold item handling. My recommendation: auto-cancel with apology email + coupon. If I don't hear back by Wed, I'll go with this.

**📦 Scope:** CR-01 (size-chart sync) approved, +₹18,000, +3 days. Budget otherwise on track.
