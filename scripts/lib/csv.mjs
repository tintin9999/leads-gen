// CSV read/write helpers (RFC 4180-ish), zero dependencies.

/** Shared CRM schema — keep identical to tools/crm.html import/export. */
export const CRM_HEADER = [
  'id', 'company', 'contact', 'role', 'email', 'linkedin', 'website', 'location',
  'source', 'segment', 'offer', 'stage', 'value', 'currency', 'probability', 'score',
  'nextAction', 'nextDate', 'lastTouch', 'tags', 'notes', 'createdAt', 'updatedAt',
];

const NUMERIC_FIELDS = new Set(['value', 'probability', 'score']);

/**
 * Escape one CSV cell. Text that starts with = + - @ (or tab/CR) gets a leading apostrophe so
 * spreadsheet apps don't execute it as a formula (CSV injection — data here comes from the web).
 */
export function csvCell(value, field = '') {
  if (value === null || value === undefined) return '';
  let s = Array.isArray(value) ? value.join(';') : String(value);
  s = s.replace(/\r\n?/g, '\n');
  if (!NUMERIC_FIELDS.has(field) && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  if (/[",\n]/.test(s) || /^\s|\s$/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function toCsv(rows, header = CRM_HEADER) {
  const lines = [header.join(',')];
  for (const row of rows) lines.push(header.map((h) => csvCell(row[h], h)).join(','));
  return `${lines.join('\n')}\n`;
}

/** Parse CSV text into an array of objects keyed by (trimmed, lower-cased) header names. */
export function parseCsv(text) {
  const src = String(text).replace(/^﻿/, '');
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') { cell += '"'; i++; } else inQuotes = false;
      } else cell += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((v) => v !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); if (row.some((v) => v !== '')) rows.push(row); }
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, (r[i] ?? '').trim()])));
}
