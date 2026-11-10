#!/usr/bin/env node
// Freelance OS — page linter. Checks guide pages against site/WRITING.md.
//   node site/lint.mjs                 lint every page in site/src
//   node site/lint.mjs site/src/04-how-upwork-works.html [more files]
//   node site/lint.mjs --quiet         only print pages that fail
// Exit code 1 if any page has a FAIL.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const RULES = {
  words: [850, 1000],
  sentenceTarget: 20, // "about 20 words or fewer"
  sentenceHardMax: 24, // any sentence longer than this fails
  longSentenceShare: 0.1, // at most 10% of sentences may be 21–24 words
  avgSentenceMax: 16,
  paraSentences: 3,
  paraWords: 60,
  itemSentences: 3,
  itemWords: 50,
  h2: [3, 7],
  headingWords: 10,
  tableCols: 4,
  tableRows: 7,
  cellWords: 14,
  checklistItems: [3, 6],
  summaryWords: 14,
  titleChars: 60,
  exampleBy: 0.5, // first example must start in the first half of the page
};
export const GROUPS = ['Start here', 'Fix a problem', 'Money', 'Direct clients', 'Proof'];

// Short forms that need no definition for this reader.
const KNOWN = new Set(('OK AI API UI UX URL PDF CSV JSON HTML CSS JS TS SQL ID OTP PAN UPI FAQ USD INR EUR GBP US UK EU USA UAE IST UTC GMT ' +
  'CEO CTO OS PC SMS QR ATM SIM AWS VS II III IV PS').split(' '));
const BANNED = [
  [/\be\.g\./gi, 'write "for example" instead of "e.g."'],
  [/\bi\.e\./gi, 'write "that is" instead of "i.e."'],
  [/\betc\.?(?=[\s,.)]|$)/gi, 'avoid "etc." — name the items or stop the list'],
  [/\bvs\.?(?=\s)/gi, 'write "or" / "against" / "compared with" instead of "vs"'],
  [/\b(leverag\w*|utili[sz]\w*|facilitat\w*|synerg\w*|holistic\w*|seamless\w*|robust\w*|paradigm\w*|aforementioned|henceforth|pursuant|notwithstanding|whilst|herein|thereof)\b/gi, 'use a plainer word'],
];
const BLOCKS = new Set(['p', 'li', 'td', 'th', 'h2', 'h3', 'h4', 'pre', 'dt', 'dd', 'summary', 'caption', 'figcaption']);
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'col', 'wbr']);

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&rarr;/g, '→').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
const words = (t) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
const squash = (t) => t.replace(/\s+/g, ' ').trim();
export function sentences(text) {
  const t = squash(text);
  if (!t) return [];
  return t.split(/(?<=[.!?…]["”’)]?)\s+(?=["“‘(]?[\p{Lu}\p{N}₹$€£])/u).map((s) => s.trim()).filter((s) => words(s).length);
}
function syllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const m = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '').match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}

export function lintPage(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const name = path.basename(file);
  const fails = [];
  const warns = [];
  const fail = (m) => fails.push(m);
  const warn = (m) => warns.push(m);

  /* ---- meta ---- */
  const mm = raw.match(/^\s*<!--\s*meta\s+([\s\S]*?)\s*-->/);
  let meta = {};
  if (!mm) fail('missing <!--meta {...} --> on line 1');
  else {
    try { meta = JSON.parse(mm[1]); } catch (e) { fail(`meta is not valid JSON (${e.message})`); }
  }
  const prefix = Number((name.match(/^(\d+)/) || [])[1]);
  if (mm) {
    if (!meta.title) fail('meta.title missing');
    else if (meta.title.length > RULES.titleChars) fail(`title is ${meta.title.length} characters (max ${RULES.titleChars})`);
    if (!GROUPS.includes(meta.group)) fail(`meta.group must be one of: ${GROUPS.join(' | ')}`);
    if (meta.order !== prefix) fail(`meta.order (${meta.order}) must equal the file-name number (${prefix})`);
    if (!meta.summary) fail('meta.summary missing');
    else if (words(meta.summary).length > RULES.summaryWords) fail(`summary is ${words(meta.summary).length} words (max ${RULES.summaryWords})`);
    if (meta.time !== '10 min') fail('meta.time must be "10 min"');
  }

  /* ---- body ---- */
  let body = mm ? raw.slice(mm.index + mm[0].length) : raw;
  body = body.replace(/<!--[\s\S]*?-->/g, '');
  if (/<(html|head|body|style|script|h1)\b/i.test(body)) fail('remove <html>/<head>/<body>/<style>/<script>/<h1>: the build adds the page shell and the title');
  const detailsAll = body.match(/<details\b[^>]*>/gi) || [];
  const detailsSources = body.match(/<details\b[^>]*class="[^"]*\bsources\b[^"]*"[^>]*>/gi) || [];
  if (detailsAll.length > detailsSources.length) fail('only <details class="sources"> is allowed; do not hide body text in <details>');
  const visibleHtml = body.replace(/<details\b[^>]*class="[^"]*\bsources\b[^"]*"[^>]*>[\s\S]*?<\/details>/gi, '');

  // tokenise into blocks
  const blocks = [];
  const stack = [];
  let cur = null; // current text block
  const tables = [];
  let table = null;
  let exampleDepth = 0;
  let firstExampleAt = -1;
  let wordCount = 0;
  let checklistDepth = 0;
  let checklistItems = 0;
  let codeDepth = 0;
  let abbrText = '';
  const open = (tag, attrs) => {
    const cls = (attrs.match(/class="([^"]*)"/) || [, ''])[1];
    stack.push({ tag, cls });
    if (tag === 'div' && /\bexample\b/.test(cls)) { exampleDepth++; if (firstExampleAt < 0) firstExampleAt = wordCount; }
    if (tag === 'ul' && /\bchecklist\b/.test(cls)) checklistDepth++;
    if (tag === 'li') {
      if (checklistDepth) checklistItems++;
    }
    if ((tag === 'ul' || tag === 'ol') && stack.slice(0, -1).some((s) => s.tag === 'li')) fail('nested list found: flatten it');
    if (tag === 'table') { table = { cols: 0, rows: 0, hasHead: false, rowCells: 0, inHead: false }; tables.push(table); }
    if (table && tag === 'thead') { table.hasHead = true; table.inHead = true; }
    if (table && tag === 'tr') { table.rowCells = 0; if (!table.inHead) table.rows++; }
    if (table && (tag === 'td' || tag === 'th')) { table.rowCells++; table.cols = Math.max(table.cols, table.rowCells); }
    if (tag === 'code') codeDepth++;
    if (tag === 'dfn' || tag === 'abbr') abbrText += '⟦';
    if (BLOCKS.has(tag)) { cur = { tag, cls, text: '', parent: cur }; blocks.push(cur); }
  };
  const close = (tag) => {
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].tag === tag) {
        const s = stack.splice(i)[0];
        if (tag === 'div' && /\bexample\b/.test(s.cls)) exampleDepth--;
        if (tag === 'ul' && /\bchecklist\b/.test(s.cls)) checklistDepth--;
        break;
      }
    }
    if (table && tag === 'thead') table.inHead = false;
    if (tag === 'table') table = null;
    if (tag === 'code') codeDepth = Math.max(0, codeDepth - 1);
    if (tag === 'dfn' || tag === 'abbr') abbrText += '⟧';
    if (BLOCKS.has(tag) && cur) { cur = cur.parent; }
    abbrText += ' ';
  };
  const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>|([^<]+)/g;
  let m;
  while ((m = re.exec(visibleHtml))) {
    if (m[3] != null) {
      const t = decode(m[3]);
      if (!t.trim()) { if (cur) cur.text += ' '; continue; }
      if (!cur) { cur = { tag: 'stray', cls: '', text: '', parent: null, stray: true }; blocks.push(cur); }
      cur.text += t;
      wordCount += words(t).length;
      if (!codeDepth) abbrText += t;
      if (cur.stray) cur = null;
    } else {
      const tag = m[1].toLowerCase();
      if (m[0][1] === '/') close(tag);
      else if (VOID.has(tag) || /\/>$/.test(m[0])) { if (cur && tag === 'br') cur.text += ' '; } else open(tag, m[2]);
    }
  }

  /* ---- counts ---- */
  const [wMin, wMax] = RULES.words;
  if (wordCount < wMin || wordCount > wMax) fail(`${wordCount} visible words (need ${wMin}–${wMax})`);

  const lede = (visibleHtml.match(/<p\b[^>]*class="[^"]*\blede\b[^"]*"/g) || []).length;
  if (lede !== 1) fail(`needs exactly one <p class="lede"> (found ${lede})`);

  const h2s = blocks.filter((b) => b.tag === 'h2');
  if (h2s.length < RULES.h2[0] || h2s.length > RULES.h2[1]) fail(`${h2s.length} <h2> sections (need ${RULES.h2[0]}–${RULES.h2[1]})`);
  for (const h of blocks.filter((b) => /^h[234]$/.test(b.tag))) {
    const n = words(h.text).length;
    if (n > RULES.headingWords) fail(`heading too long (${n} words): "${squash(h.text)}"`);
  }
  if ((visibleHtml.match(/<h2\b(?![^>]*\bid=)/g) || []).length) fail('every <h2> needs an id="kebab-case"');

  if (firstExampleAt < 0) fail('no <div class="example"> on the page: give a concrete example with real values');
  else if (firstExampleAt > wordCount * RULES.exampleBy) fail(`first example starts at word ${firstExampleAt}: move a concrete example into the first half`);

  if (checklistItems < RULES.checklistItems[0] || checklistItems > RULES.checklistItems[1]) fail(`${checklistItems} checklist items (need ${RULES.checklistItems[0]}–${RULES.checklistItems[1]} in <ul class="checklist">)`);

  /* ---- sentences and paragraphs ---- */
  const allSentences = [];
  for (const b of blocks) {
    if (b.tag === 'pre' || /^h[234]$/.test(b.tag) || b.tag === 'summary') continue;
    const text = squash(b.text);
    if (!text) continue;
    const n = words(text).length;
    if (b.tag === 'td' || b.tag === 'th') {
      if (n > RULES.cellWords) fail(`table cell has ${n} words (max ${RULES.cellWords}): "${text.slice(0, 60)}…"`);
      continue;
    }
    const ss = sentences(text);
    ss.forEach((s) => allSentences.push(s));
    const isItem = b.tag === 'li' || b.tag === 'dd' || b.tag === 'dt';
    const maxS = isItem ? RULES.itemSentences : RULES.paraSentences;
    const maxW = isItem ? RULES.itemWords : RULES.paraWords;
    if (ss.length > maxS) fail(`${isItem ? 'list item' : 'paragraph'} has ${ss.length} sentences (max ${maxS}): "${text.slice(0, 70)}…"`);
    if (n > maxW) fail(`${isItem ? 'list item' : 'paragraph'} has ${n} words (max ${maxW}): "${text.slice(0, 70)}…"`);
    if (b.stray && n > 3) warn(`text outside a <p> or list item: "${text.slice(0, 60)}…"`);
  }
  const lens = allSentences.map((s) => words(s).length);
  const tooLong = allSentences.filter((s) => words(s).length > RULES.sentenceHardMax);
  tooLong.forEach((s) => fail(`sentence has ${words(s).length} words (max ${RULES.sentenceHardMax}): "${s.slice(0, 90)}…"`));
  const longish = allSentences.filter((s) => { const n = words(s).length; return n > RULES.sentenceTarget && n <= RULES.sentenceHardMax; });
  if (allSentences.length && longish.length / allSentences.length > RULES.longSentenceShare) {
    fail(`${longish.length} of ${allSentences.length} sentences are over ${RULES.sentenceTarget} words (max ${Math.round(RULES.longSentenceShare * 100)}%). Longest: "${longish.sort((a, b) => words(b).length - words(a).length)[0].slice(0, 90)}…"`);
  }
  const avg = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
  if (avg > RULES.avgSentenceMax) fail(`average sentence is ${avg.toFixed(1)} words (max ${RULES.avgSentenceMax})`);

  /* ---- tables ---- */
  tables.forEach((t, i) => {
    if (!t.hasHead) fail(`table ${i + 1} needs a <thead>`);
    if (t.cols > RULES.tableCols) fail(`table ${i + 1} has ${t.cols} columns (max ${RULES.tableCols})`);
    if (t.rows > RULES.tableRows) fail(`table ${i + 1} has ${t.rows} rows (max ${RULES.tableRows})`);
  });

  /* ---- short forms and banned words ---- */
  const visibleText = decode(visibleHtml.replace(/<[^>]+>/g, ' '));
  for (const [rx, msg] of BANNED) {
    const hit = visibleText.match(rx);
    if (hit) fail(`${msg} (found "${hit[0]}"${hit.length > 1 ? ` ×${hit.length}` : ''})`);
  }
  if (/\b[ABC][1-4]\b/.test(visibleText.replace(/\b[ABC][1-4]\s*(?:size|paper)\b/gi, ''))) fail('offer codes like "A1" or "B1" are jargon: use the offer\'s name');
  const checkAbbr = (text, where) => {
    const seen = new Set();
    const rx = /(^|[^\p{L}\p{N}])([A-Z][A-Z0-9&]{1,})(?:s|'s|’s)?(?![\p{L}\p{N}])/gu;
    let a;
    while ((a = rx.exec(text))) {
      const tok = a[2];
      if (seen.has(tok) || KNOWN.has(tok) || /^[A-Z]\d+$/.test(tok) || /^\d/.test(tok)) continue;
      seen.add(tok);
      const before = text.slice(Math.max(0, a.index + a[1].length - 1), a.index + a[1].length);
      if (before !== '⟦' && before !== '(') fail(`"${tok}" is used ${where} before it is explained: write the everyday words first, then (${tok}) or <dfn>${tok}</dfn>`);
    }
  };
  if (meta.title) checkAbbr(meta.title, 'in the title');
  checkAbbr(abbrText, 'in the page');

  /* ---- readability (info) ---- */
  const allWords = words(allSentences.join(' '));
  const syl = allWords.reduce((n, w) => n + syllables(w), 0);
  const flesch = allSentences.length && allWords.length ? 206.835 - 1.015 * (allWords.length / allSentences.length) - 84.6 * (syl / allWords.length) : 0;
  if (flesch && flesch < 55) warn(`reading ease is ${flesch.toFixed(0)} (aim for 60+): use shorter, more common words`);

  return { file: path.relative(ROOT, file), words: wordCount, sentences: allSentences.length, avg, max: Math.max(0, ...lens), flesch, fails, warns };
}

/* ---- cli ---- */
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  const quiet = args.includes('--quiet');
  let files = args.filter((a) => !a.startsWith('--')).map((f) => path.resolve(f));
  if (!files.length) {
    const dir = path.join(ROOT, 'site/src');
    files = fs.readdirSync(dir).filter((f) => /^\d+.*\.html$/.test(f)).sort().map((f) => path.join(dir, f));
  }
  let bad = 0;
  for (const f of files) {
    const r = lintPage(f);
    const ok = !r.fails.length;
    if (!ok) bad++;
    if (quiet && ok) continue;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.file}  — ${r.words} words · ${r.sentences} sentences · avg ${r.avg.toFixed(1)} · longest ${r.max} · reading ease ${r.flesch.toFixed(0)}`);
    r.fails.forEach((m) => console.log(`   FAIL  ${m}`));
    r.warns.forEach((m) => console.log(`   warn  ${m}`));
  }
  console.log(`\n${files.length - bad} of ${files.length} pages pass.`);
  process.exit(bad ? 1 : 0);
}
