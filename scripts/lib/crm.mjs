// Build rows that match the shared CRM schema (see lib/csv.mjs CRM_HEADER).
import { createHash } from 'node:crypto';
import { CRM_HEADER } from './csv.mjs';

/** Local calendar date as YYYY-MM-DD (not UTC — matters in IST evenings). */
export function localDate(d = new Date()) {
  const shifted = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return shifted.toISOString().slice(0, 10);
}

export function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + days);
  return localDate(d);
}

/** Stable id so re-running a script and re-importing doesn't create duplicates. */
export function stableId(prefix, key) {
  const h = createHash('sha1').update(String(key)).digest('hex').slice(0, 10);
  return `${prefix}-${h}`;
}

export const ENUMS = {
  stage: ['prospect', 'contacted', 'replied', 'call', 'proposal', 'won', 'lost', 'nurture'],
  segment: ['d2c-shopify', 'ai-mvp-rescue', 'internal-tools', 'migration', 'agency-partner', 'startup-mvp', 'other'],
  source: ['warm-network', 'referral', 'cultus-network', 'linkedin', 'cold-email', 'upwork', 'contra', 'talent-network',
    'hn-thread', 'reddit', 'community', 'agency', 'inbound', 'content', 'event', 'other'],
  offer: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'custom'],
  currency: ['INR', 'USD', 'EUR', 'GBP'],
};

/** Typical first-deal value per offer (midpoint of the entry price) — used as pipeline value estimate. */
export const OFFER_VALUE = {
  A1: { value: 40000, currency: 'INR' },
  A2: { value: 200000, currency: 'INR' },
  A3: { value: 80000, currency: 'INR' },
  A4: { value: 500000, currency: 'INR' },
  B1: { value: 900, currency: 'USD' },
  B2: { value: 8000, currency: 'USD' },
  B3: { value: 2000, currency: 'USD' },
  C1: { value: 40000, currency: 'INR' },
  custom: { value: '', currency: 'USD' },
};

/**
 * Create a full CRM row. Unknown fields are dropped; enums are validated (invalid → sensible default).
 * probability and score are integers 0–100.
 */
export function crmRow(partial) {
  const today = localDate();
  const row = {
    id: '', company: '', contact: '', role: '', email: '', linkedin: '', website: '', location: '',
    source: 'other', segment: 'other', offer: 'custom', stage: 'prospect', value: '', currency: 'USD',
    probability: 5, score: 0, nextAction: 'Research + personalise first touch', nextDate: today, lastTouch: '',
    tags: '', notes: '', createdAt: today, updatedAt: today,
    ...partial,
  };
  for (const [field, allowed] of Object.entries(ENUMS)) {
    if (!allowed.includes(row[field])) {
      row[field] = { stage: 'prospect', segment: 'other', source: 'other', offer: 'custom', currency: 'USD' }[field];
    }
  }
  if (Array.isArray(row.tags)) row.tags = [...new Set(row.tags.filter(Boolean).map((t) => String(t).replace(/;/g, ',').trim()))].join(';');
  row.score = clamp(Math.round(Number(row.score) || 0), 0, 100);
  row.probability = clamp(Math.round(Number(row.probability) || 0), 0, 100);
  if (!row.id) row.id = stableId('lead', `${row.company}|${row.website}|${row.email}|${row.notes}`);
  return Object.fromEntries(CRM_HEADER.map((h) => [h, row[h] ?? '']));
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Infer segment + offer from free text (job post, headline, stack signals).
 * Order matters: the most specific signal wins.
 */
export function inferSegmentOffer(text) {
  const t = String(text || '').toLowerCase();
  if (/shopify|woocommerce|d2c|dtc|e-?commerce|storefront|razorpay|checkout/.test(t)) {
    if (/razorpay|checkout|payment|cod\b|cash on delivery/.test(t)) return { segment: 'd2c-shopify', offer: 'A3' };
    if (/headless|hydrogen|storefront api|next\.?js/.test(t)) return { segment: 'd2c-shopify', offer: 'A4' };
    if (/speed|performance|core web vitals|page ?speed|lighthouse|slow/.test(t)) return { segment: 'd2c-shopify', offer: 'A1' };
    return { segment: 'd2c-shopify', offer: 'A2' };
  }
  if (/lovable|bolt\.new|\bv0\b|vibe.?cod|ai[- ]generated|ai[- ]built|replit agent|(prototype|mvp).{0,40}(to production|harden|productioni[sz]|scale it)/.test(t)) return { segment: 'ai-mvp-rescue', offer: 'B1' };
  if (/angular|legacy|migrat|moderni[sz]|rewrite|jquery|backbone/.test(t)) return { segment: 'migration', offer: 'B3' };
  if (/internal tool|admin|dashboard|back-?office|crm|erp|portal|retool|ops tool/.test(t)) return { segment: 'internal-tools', offer: 'B2' };
  if (/\bagency\b|white[- ]label|studio|subcontract/.test(t)) return { segment: 'agency-partner', offer: 'custom' };
  if (/\bmvp\b|startup|founder|saas|marketplace|launch/.test(t)) return { segment: 'startup-mvp', offer: 'custom' };
  return { segment: 'other', offer: 'custom' };
}
