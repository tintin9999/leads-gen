# AI Usage Policy

> **When to use:** Link it from your website, proposals and MSA (cl. 3.5 India / 2.5 international). Clients increasingly ask "Do you use AI?", and some fear leaks or low-quality generated code. A clear policy turns AI from a worry into a selling point: faster delivery, with an engineer who reviews every line and owns the result.
>
> **How to fill:** Keep the tool list current and check vendor privacy settings each quarter, since they change. Use the client-facing section as-is, and treat the internal rules as your own checklist.

---

## Part 1 — Client-facing policy ({{BUSINESS_NAME}})

**Why I use AI tools.** I use AI-assisted development tools to work faster on routine tasks: boilerplate, refactors, test scaffolding, documentation drafts, code search and first-pass reviews. That leaves more of your budget for the hard parts: architecture, edge cases, payments, security and talking to your users.

**What I use (as of {{MONTH YEAR}}):** {{Cursor (Privacy Mode on) · Claude (business/API terms) · ChatGPT (business tier or training opt-out) · Gemini · v0}}. I only use tools or plans that **don't train on your inputs**, either by default on business or API terms, or because I've switched training off in settings. I re-check those settings regularly.

**My rules:**
1. **I review and own every line.** Nothing AI-generated reaches your codebase without my review, local testing and passing CI. "The AI wrote it" is never an excuse. I am accountable for all code I deliver.
2. **No secrets or personal data in prompts.** API keys, passwords, `.env` files, customer data, payment data and production database dumps are never pasted into AI tools. Sensitive files are excluded through each tool's ignore or deny settings.
3. **No training on your code.** I only use configurations where your code isn't used to train models.
4. **Licence hygiene.** I don't paste large verbatim snippets from unknown sources. Dependencies are checked for licence compatibility. I won't introduce copyleft code (AGPL/GPL) without your approval.
5. **Tests on what matters.** AI speeds up writing tests. I use it to cover more paths, especially money paths like pricing, checkout, refunds and inventory sync.
6. **Your call.** If your company prohibits AI tools, or allows only specific ones, tell me before we start. I'll comply. It may affect the timeline and price, and the SOW will say so.
7. **AI features in your product** (chatbots, recommendations, RAG, AI-assisted admin) are a separate topic. They're scoped with you in the SOW, covering data flows, providers, costs, evaluation and failure modes.

**Ownership.** You receive all rights I hold in the deliverables (see our agreement). For awareness: the US Copyright Office's January 2025 report concluded that purely AI-generated material without meaningful human authorship isn't protected by copyright. My workflow involves substantial human design, selection, modification and review. For most clients, contracts and trade secrets matter more than copyright in individual lines of code.

**Questions?** Ask me at any time and I'll explain which tools were used on your project.

---

## Part 2 — Internal rules (your checklist)

### Tool configuration (review quarterly)
- [ ] Cursor: **Privacy Mode** on; `.cursorignore` excludes `.env*`, `*.pem`, `*.key`, `secrets/`, DB dumps, `customer-data/`
- [ ] Claude Code / Claude: business or API terms, or consumer settings with training **off**; deny-read rules for `.env*` and key files in project settings
- [ ] ChatGPT: business tier, or "Improve the model for everyone" **off**; no client code in shared or public links
- [ ] Gemini Code Assist: `.aiexclude` for sensitive paths; check whether you're on the consumer or Workspace terms
- [ ] v0 / Lovable / Bolt: only for UI prototypes with **dummy data**; never connect them to client production keys
- [ ] Record the tool + plan + key setting per client in the project doc (useful if the client asks)

### Daily rules
- Paste **minimal context**: the function, not the repo; the error message, not the customer record.
- Replace real identifiers with fakes in prompts (`order_123`, `user@example.com`).
- Read every diff before accepting. Run tests locally. Never auto-merge agent output.
- **Agents and MCP:** don't give AI agents production credentials or write access to production systems. Run agent commands in a sandbox or container. Be wary of prompt injection from untrusted content (issues, web pages, client-supplied files) instructing the agent to run commands or reveal secrets.
- Generated SQL or migrations, especially **Supabase RLS policies**, get manual review plus a test that proves the policy blocks cross-tenant reads.
- Security-sensitive code (auth, webhooks, payments, crypto) needs extra human review. Prefer well-known libraries over generated implementations.

### When things go wrong
- If you pasted a secret into an AI tool: treat it as leaked. Rotate it immediately, tell the client within 24 hours (the credentials policy applies), and note it in the incident log.
- If generated code caused a bug in production: fix it, add a test that would have caught it, and mention it in the weekly update. Don't blame the tool.

### Selling point (for proposals)
> "I use AI-assisted tooling with strict privacy settings, which lets me deliver about {{20–40%}} faster on routine work. Every line is still reviewed and tested by me, and I'm accountable for it. You get senior-engineer judgement on the parts that matter: payments, data and security."
