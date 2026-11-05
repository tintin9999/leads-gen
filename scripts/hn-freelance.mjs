#!/usr/bin/env node
// HN lead miner: monthly "Ask HN: Freelancer? Seeking freelancer?" threads (+ "Who is hiring?" with --hiring)
// via the public HN Algolia API → CRM CSV + Markdown digest in ./out/.
import { cli, splitList, toInt } from './lib/args.mjs';
import { crmRow, inferSegmentOffer, OFFER_VALUE, localDate } from './lib/crm.mjs';
import { fetchJson, sleep } from './lib/http.mjs';
import { mdCell, outDir, writeOutputs } from './lib/out.mjs';
import { opener } from './lib/pitch.mjs';
import { DEFAULT_KEYWORDS, extractEmails, extractUrls, geoSignals, htmlToText, parseKeywords, scoreKeywords, truncate } from './lib/text.mjs';

const API = 'https://hn.algolia.com/api/v1';

const opts = cli({
  name: 'hn-freelance',
  summary: 'Find freelance/contract leads in Hacker News monthly threads (Algolia API, no key needed).',
  options: {
    months: { type: 'string', default: '2', arg: 'n', desc: 'How many latest monthly threads of each type to scan' },
    hiring: { type: 'boolean', desc: 'Also scan "Ask HN: Who is hiring?" and keep CONTRACT / freelance / part-time posts (recommended)' },
    'only-hiring': { type: 'boolean', desc: 'Scan only "Who is hiring?" threads' },
    'all-roles': { type: 'boolean', desc: 'With --hiring: keep full-time roles too (bridge-income hunting)' },
    keywords: { type: 'string', arg: 'list', desc: 'Replace default keywords, e.g. "react,next.js:5,shopify:5" (word:weight)' },
    'add-keywords': { type: 'string', arg: 'list', desc: 'Add keywords to the defaults, e.g. "erlang:4,elixir:3"' },
    'min-score': { type: 'string', default: '5', arg: 'n', desc: 'Drop posts with fewer raw keyword/signal points' },
    'include-restricted': { type: 'boolean', desc: 'Keep onsite-only and US/EU/UK-resident-only posts (dropped by default)' },
    limit: { type: 'string', default: '200', arg: 'n', desc: 'Max leads to write' },
    out: { type: 'string', arg: 'dir', desc: 'Output directory (default: <repo>/out)' },
  },
  examples: [
    'node scripts/hn-freelance.mjs --hiring',
    'node scripts/hn-freelance.mjs --only-hiring --months 1 --add-keywords "erlang:4,elixir:3"',
    'NODE_USE_ENV_PROXY=1 node scripts/hn-freelance.mjs --hiring   # behind an HTTPS proxy (Node >= 22.21)',
  ],
});

const months = Math.max(1, toInt(opts.months, 2));
const minScore = toInt(opts['min-score'], 3);
let keywords = opts.keywords ? parseKeywords(splitList(opts.keywords)) : [...DEFAULT_KEYWORDS];
if (opts['add-keywords']) keywords = keywords.concat(parseKeywords(splitList(opts['add-keywords'])));
const scanFreelancer = !opts['only-hiring'];
const scanHiring = opts.hiring || opts['only-hiring'];

async function findThreads(kind) {
  const isHiring = kind === 'hiring';
  const q = isHiring ? '"Who is hiring"' : '"Freelancer? Seeking freelancer?"';
  const tags = isHiring ? 'story,author_whoishiring' : 'story';
  const url = `${API}/search_by_date?query=${encodeURIComponent(q)}&tags=${tags}&hitsPerPage=60`;
  const res = await fetchJson(url);
  if (!res.ok) throw new Error(`HN Algolia search failed (${res.status || res.error}) for ${url}`);
  const re = isHiring ? /^Ask HN: Who is hiring\? \(([A-Za-z]+ \d{4})\)/i : /^Ask HN: Freelancer\? Seeking freelancer\? \(([A-Za-z]+ \d{4})\)/i;
  // Since Nov 2025 the freelancer thread is community-posted; duplicates happen → keep the busiest per month.
  const byMonth = new Map();
  for (const h of res.data.hits || []) {
    const m = (h.title || '').match(re);
    if (!m) continue;
    const prev = byMonth.get(m[1]);
    if (!prev || (h.num_comments || 0) > (prev.num_comments || 0)) byMonth.set(m[1], h);
  }
  return [...byMonth.values()].sort((a, b) => b.created_at_i - a.created_at_i).slice(0, months).map((h) => ({ id: h.objectID, title: h.title, kind, comments: h.num_comments || 0 }));
}

const SEEKING_FREELANCER = /^\W*(seeking|looking for|hiring)\W+(a\W+)?(freelancers?|contractors?|developers?|consultants?)\b|^\W*hiring\b/i;
const SEEKING_WORK = /^\W*seeking\W+(work|clients|projects|contracts?)\b/i;
const CONTRACT_HEAD = /\b(contract(?:or|ors)?|contract[- ]to[- ]hire|freelance(?:rs?)?|part[- ]time|fractional|consult(?:ant|ants|ing)?|1099|c2c)\b/i;
const CONTRACT_BODY = /\b(contract (role|position|basis|work|engagement|opportunit\w*|gig)|contractors? (welcome|wanted|ok|considered)|freelancers? (welcome|wanted|ok|considered)|part[- ]time (role|position|contract)|contract[- ]to[- ]hire|1099|corp[- ]to[- ]corp)\b/i;
// Job-seeker profiles mis-posted in "Who is hiring?" and non-engineering roles are not leads.
const SEEKER_PROFILE = /(r[ée]sum[ée]\s*\/\s*cv\s*:|willing to relocate\s*:|^\W*seeking work)/im;
const DEV_ROLE = /engineer|developer|\bdev\b|programmer|full[- ]?stack|front[- ]?end|back[- ]?end|software|react|next\.?js|typescript|node|\bweb\b|shopify|\bcto\b|tech lead|architect/i;
const NON_DEV = /\b(sales|business development|account (executive|manager)|marketing|recruit(er|ing)|bdm|copywriter|commission[- ]only|ph\.?d|internship|designer)\b/i;

function parseHeader(text) {
  const firstLine = text.split('\n')[0].replace(SEEKING_FREELANCER, '').replace(/^[\s|:–—-]+/, '');
  const segs = firstLine.split('|').map((s) => s.trim()).filter(Boolean);
  const roleRe = /engineer|developer|\bdev\b|designer|lead|architect|cto|full[- ]?stack|front[- ]?end|back[- ]?end|consultant|contractor|freelanc/i;
  const locRe = /remote|onsite|on-site|hybrid|\b[A-Z][a-z]+,\s?[A-Z]{2}\b|london|berlin|paris|amsterdam|new york|nyc|san francisco|sf\b|bay area|toronto|singapore|bangalore|bengaluru|india|europe|\beu\b|\bus\b|\busa\b|\buk\b|worldwide|anywhere/i;
  const company = segs[0] && segs[0].length <= 80 ? segs[0] : '';
  const role = segs.slice(1).find((s) => roleRe.test(s)) || '';
  const location = segs.slice(1).filter((s) => locRe.test(s) && s.length <= 60).join(' / ');
  return { company, role, location };
}

function classify(post, kind) {
  const head = post.text.slice(0, 160);
  if (kind === 'freelancer') {
    if (SEEKING_WORK.test(head)) return null;
    if (!SEEKING_FREELANCER.test(head)) return null;
    return 'seeking-freelancer';
  }
  if (SEEKER_PROFILE.test(post.text.slice(0, 600))) return null;
  const header = post.text.split('\n')[0].slice(0, 400);
  const role = parseHeader(post.text).role || header;
  if (!DEV_ROLE.test(header) || NON_DEV.test(role)) return null;
  const cleaned = post.text.replace(/\bsmart[- ]contracts?\b/gi, '');
  if (CONTRACT_HEAD.test(header.replace(/\bsmart[- ]contracts?\b/gi, '')) || CONTRACT_BODY.test(cleaned)) return 'contract-role';
  return opts['all-roles'] ? 'full-time-role' : null;
}

/** Geo from the header line first (most accurate), falling back to the whole post. */
function headerGeo(text) {
  const header = text.split('\n')[0];
  const geo = geoSignals(text);
  const paren = header.match(/remote\s*[([]\s*([^)\]]+)[)\]]/i);
  if (paren) {
    const inside = paren[1];
    if (/anywhere|worldwide|global|any (country|location|time ?zone)|most countries|india|asia|apac/i.test(inside)) {
      geo.global = true;
      geo.restricted = false;
    } else if (/\b(us|usa|u\.s\.|canada|eu|europe|uk|germany|france|spain|poland|romania|latam|americas|north america|est|pst|cet|gmt|emea)\b/i.test(inside)) {
      geo.restricted = true;
    }
  }
  const headerGlobal = /anywhere|worldwide|global|any (country|location|time ?zone)|most countries/i.test(header);
  if (!headerGlobal && (/remote\s*[-–:]\s*(us|usa|uk|eu|europe|canada|germany|latam)\b/i.test(header) || /\b(us|usa|canada|uk|eu|europe)\b[^|]{0,25}\bremote\b/i.test(header))) {
    geo.restricted = true;
  }
  const headRemote = /\bremote\b/i.test(header);
  if (/\b(onsite|on-site|in[- ]office|hybrid)\b/i.test(header) && !headRemote) geo.onsiteOnly = true;
  geo.remote = headRemote;
  geo.headerNoRemote = !headRemote;
  return geo;
}

const RATE_FLOOR_USD = 35; // Parth's global floor — see memo 04-pricing

/** "$23-$34 USD/hour", "$60/hr", "USD 50 per hour" → { min, max, label } */
function hourlyRate(text) {
  const m = String(text).match(/(?:\$|usd\s?)(\d{2,3})(?:\s?(?:-|–|to)\s?\$?(\d{2,3}))?\s?(?:usd)?\s?(?:\/|per\s)\s?(?:hr|hour|h)\b/i);
  if (!m) return null;
  const min = Number(m[1]);
  const max = Number(m[2] || m[1]);
  return { min, max, label: m[2] ? `$${min}-${max}/hr` : `$${min}/hr` };
}

function scorePost(post, mode) {
  const { points: kwPoints, hits } = scoreKeywords(post.text, keywords);
  const geo = headerGeo(post.text);
  let points = kwPoints;
  if (mode === 'seeking-freelancer') points += 4;
  if (mode === 'contract-role') points += 2;
  if (geo.headerNoRemote) points -= 3;
  const rate = hourlyRate(post.text);
  if (rate && rate.max < RATE_FLOOR_USD) points -= 3;
  if (geo.india) points += 3;
  if (geo.global) points += 3;
  if (geo.restricted) points -= 4;
  if (geo.onsiteOnly) points -= 4;
  if (post.emails.length) points += 1;
  return { points, hits, geo };
}

async function main() {
  const threads = [];
  if (scanFreelancer) threads.push(...(await findThreads('freelancer')));
  if (scanHiring) threads.push(...(await findThreads('hiring')));
  if (!threads.length) {
    console.error('No matching HN threads found. Check https://news.ycombinator.com/submitted?id=whoishiring');
    process.exit(1);
  }

  const stats = [];
  const leads = [];
  for (const t of threads) {
    process.stdout.write(`• ${t.title} (${t.comments} comments) … `);
    const res = await fetchJson(`${API}/items/${t.id}`, { timeoutMs: 45000 });
    if (!res.ok) {
      console.log(`failed (${res.status || res.error})`);
      stats.push({ ...t, posts: 0, matched: 0, kept: 0, error: res.status || res.error });
      continue;
    }
    const children = (res.data.children || []).filter((c) => c.text);
    let matched = 0;
    let kept = 0;
    for (const c of children) {
      const text = htmlToText(c.text);
      const post = { id: c.id, author: c.author, created: c.created_at, text, emails: extractEmails(text), urls: extractUrls(text) };
      const mode = classify(post, t.kind);
      if (!mode) continue;
      matched++;
      const { points, hits, geo } = scorePost(post, mode);
      if (points < minScore) continue;
      if ((geo.restricted || geo.onsiteOnly) && !opts['include-restricted']) continue;
      kept++;
      leads.push({ post, mode, points, hits, geo, thread: t });
    }
    stats.push({ ...t, posts: children.length, matched, kept });
    console.log(`${children.length} posts, ${matched} matched, ${kept} kept`);
    await sleep(1000); // be polite
  }

  leads.sort((a, b) => b.points - a.points || b.post.id - a.post.id);
  // The same company often reposts every month — keep one row per company+role.
  const seen = new Set();
  const unique = leads.filter((l) => {
    const h = parseHeader(l.post.text);
    const key = `${h.company}|${h.role}`.toLowerCase().replace(/[^a-z0-9|]/g, '');
    if (key !== '|' && seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const limited = unique.slice(0, toInt(opts.limit, 200));
  const today = localDate();

  const rows = limited.map(({ post, mode, points, hits, geo, thread }) => {
    const header = parseHeader(post.text);
    const { segment, offer } = inferSegmentOffer(post.text);
    const est = OFFER_VALUE[offer] || OFFER_VALUE.custom;
    const linkedin = post.urls.find((u) => /linkedin\.com\//i.test(u)) || '';
    const website = post.urls.find((u) => !/ycombinator\.com|linkedin\.com|news\.ycombinator/i.test(u)) || '';
    const hnLink = `https://news.ycombinator.com/item?id=${post.id}`;
    return crmRow({
      id: `hn-${post.id}`,
      company: header.company,
      contact: `HN: ${post.author}`,
      role: header.role,
      email: post.emails[0] || '',
      linkedin,
      website,
      location: header.location || (geo.remote ? 'Remote' : ''),
      source: 'hn-thread',
      segment,
      offer,
      stage: 'prospect',
      value: est.currency === 'USD' ? est.value : '',
      currency: 'USD',
      probability: 5,
      score: points * 5,
      nextAction: post.emails.length ? 'Email within 24h: 1-line proof + 1 question (templates/sales)' : 'Reply on HN / find contact; 1-line proof + 1 question',
      nextDate: today,
      tags: ['hn', mode, hourlyRate(post.text) ? `rate ${hourlyRate(post.text).label}` : '', (hourlyRate(post.text)?.max ?? 999) < RATE_FLOOR_USD ? 'below-floor' : '', geo.remote ? 'remote' : '', geo.global ? 'global' : '', geo.india ? 'india-ok' : '', geo.restricted ? 'geo-restricted' : '', ...hits.slice(0, 6)],
      notes: `${truncate(post.text, 420)} | HN: ${hnLink} | ${thread.title}`,
    });
  });

  // ---------- Markdown digest ----------
  const md = [];
  md.push(`# HN leads — ${today}`, '');
  md.push(`Scanned with \`node scripts/hn-freelance.mjs${process.argv.slice(2).length ? ` ${process.argv.slice(2).join(' ')}` : ''}\`. Min raw score ${minScore}. Keywords: ${keywords.map((k) => k.k).join(', ')}.`, '');
  md.push('| Thread | Posts | Matched | Kept |', '|---|---:|---:|---:|');
  for (const s of stats) md.push(`| [${mdCell(s.title)}](https://news.ycombinator.com/item?id=${s.id}) | ${s.posts} | ${s.matched} | ${s.kept}${s.error ? ` (error ${s.error})` : ''} |`);
  md.push('');
  const freelancerMatched = stats.filter((s) => s.kind === 'freelancer').reduce((a, s) => a + s.matched, 0);
  if (scanFreelancer && freelancerMatched === 0) {
    md.push('> **Heads-up:** the monthly "Freelancer? Seeking freelancer?" thread has been community-posted since Dec 2025 and is ~95% *SEEKING WORK* posts. Contract roles show up in "Who is hiring?" — run with `--hiring`.', '');
  }
  if (!rows.length) md.push('_No leads passed the filters this time. Try `--hiring`, `--months 3`, or `--min-score 1`._', '');
  else {
    md.push('## Ranked leads', '', '| # | Score | Company | Role | Location | Signals | Post |', '|---:|---:|---|---|---|---|---|');
    limited.forEach((l, i) => {
      const r = rows[i];
      md.push(`| ${i + 1} | ${r.score} | ${mdCell(r.company) || '—'} | ${mdCell(r.role) || '—'} | ${mdCell(r.location) || '—'} | ${mdCell(l.hits.slice(0, 5).join(', '))} | [HN](https://news.ycombinator.com/item?id=${l.post.id}) |`);
    });
    md.push('', '## Details', '');
    limited.slice(0, 40).forEach((l, i) => {
      const r = rows[i];
      md.push(`### ${i + 1}. ${r.company || r.contact}${r.role ? ` — ${r.role}` : ''} (score ${r.score})`);
      md.push(`- **Type:** ${l.mode} · **Thread:** ${l.thread.title} · **Posted:** ${String(l.post.created).slice(0, 10)}`);
      md.push(`- **Segment / offer:** ${r.segment} / ${r.offer} · **Keywords:** ${l.hits.join(', ') || '—'}`);
      if (r.email) md.push(`- **Email:** ${r.email}`);
      if (r.website) md.push(`- **Link:** ${r.website}`);
      md.push(`- **Post:** https://news.ycombinator.com/item?id=${l.post.id}`);
      md.push('', `> ${truncate(l.post.text, 600)}`, '');
      md.push(`**Draft opener (edit before sending):** ${opener(r.segment)}`, '');
    });
  }
  md.push('---', 'Rules: reply within 24h, reference one specific line of their post, one proof, one question, no attachments in message 1. Log every touch in the CRM.');

  await writeOutputs({ dir: outDir(opts.out), prefix: 'hn-leads', rows, markdown: `${md.join('\n')}\n` });
}

main().catch((err) => {
  console.error(`✖ ${err.message}`);
  process.exit(1);
});
