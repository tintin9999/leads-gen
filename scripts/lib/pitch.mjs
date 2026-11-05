// One-line, factual proof statements from Parth's real work, per CRM segment.
// Used in digests to draft the first line of a personalised reply. Edit freely — keep them true.

export const PROOF = {
  'd2c-shopify':
    'I built Cultus end to end — a live Next.js + Supabase marketplace with a custom Shopify Sales Channel app (webhook inventory sync) and Razorpay Magic Checkout with partial COD.',
  'ai-mvp-rescue':
    'I take rushed or AI-built MVPs to production — auth, Supabase RLS, payments, tests, CI. Cultus runs 115 test files on its money-critical paths.',
  'internal-tools':
    "I built back-office admin modules (Block RFQ, user management) for Coinbase's Deribit derivatives exchange in React + TypeScript.",
  migration:
    "I migrated Deribit's (Coinbase) admin features from Angular to React module by module and introduced Vitest into their GitLab CI.",
  'startup-mvp':
    'I built and run Cultus (Next.js, Supabase, Razorpay, Shopify): 890+ users, 180+ orders and ₹2.9L+ GMV in its first four months.',
  'agency-partner':
    "Senior React/Next.js engineer available for white-label overflow — 4 years on client engagements (Coinbase's Deribit, a 100k-user tax-filing platform).",
  other:
    "Product engineer (React/Next.js/TypeScript, Node, Postgres) — shipped for Coinbase's Deribit and a 100k-user Belgian tax-filing platform.",
};

export const QUESTION = {
  'd2c-shopify': 'Is this on your current Shopify theme, or are you open to an app/integration approach?',
  'ai-mvp-rescue': 'Is the app already live with users, or are you hardening it before launch?',
  'internal-tools': 'Is this greenfield, or extending an existing admin app?',
  migration: 'Are you migrating incrementally alongside feature work, or planning a freeze-and-rewrite?',
  'startup-mvp': "What's the one outcome that makes this project a success in 60 days?",
  'agency-partner': 'Do you have overflow now, or are you building a bench for upcoming projects?',
  other: "What's driving the timing on this?",
};

export function opener(segment) {
  return `${PROOF[segment] || PROOF.other} ${QUESTION[segment] || QUESTION.other}`;
}
