#!/usr/bin/env node
// Funding-news radar: public RSS/Atom feeds → startups that just raised → CRM prospects ("why now: just raised").
import { cli, splitList, toInt } from './lib/args.mjs';
import { crmRow, inferSegmentOffer, localDate, OFFER_VALUE, stableId } from './lib/crm.mjs';
import { fetchText, hostOf, sleep } from './lib/http.mjs';
import { mdCell, outDir, writeOutputs } from './lib/out.mjs';
import { decodeEntities, htmlToText, truncate } from './lib/text.mjs';

// Editable feed list. All verified reachable in Nov 2026; feeds change — if one 404s, the script skips it.
export const FEEDS = [
  { name: 'Inc42', region: 'india', url: 'https://inc42.com/feed/' },
  { name: 'Inc42 Buzz', region: 'india', url: 'https://inc42.com/buzz/feed/' },
  { name: 'Entrackr', region: 'india', url: 'https://entrackr.com/rss' },
  { name: 'YourStory', region: 'india', url: 'https://yourstory.com/feed' },
  { name: 'ET Tech (startups)', region: 'india', url: 'https://economictimes.indiatimes.com/tech/funding/rssfeeds/78570540.cms' },
  { name: 'TechCrunch Venture', region: 'global', url: 'https://techcrunch.com/category/venture/feed/' },
  { name: 'Crunchbase News', region: 'global', url: 'https://news.crunchbase.com/feed/' },
  { name: 'EU-Startups', region: 'global', url: 'https://www.eu-startups.com/feed/' },
  { name: 'Tech.eu', region: 'global', url: 'https://tech.eu/feed/' },
];

const opts = cli({
  name: 'funding-feed',
  summary: 'Turn startup-funding news (RSS) into "just raised" prospects for the CRM.',
  options: {
    since: { type: 'string', default: '14', arg: 'days', desc: 'Only items published in the last N days' },
    region: { type: 'string', default: 'all', arg: 'india|global|all', desc: 'Which feeds to read' },
    keywords: { type: 'string', arg: 'list', desc: 'Only keep items mentioning any of these, e.g. "d2c,saas,fintech"' },
    feed: { type: 'string', multiple: true, arg: 'url', desc: 'Use this feed URL instead of the built-in list (repeatable)' },
    'min-score': { type: 'string', default: '25', arg: 'n', desc: 'Drop items scoring below this (0–100)' },
    out: { type: 'string', arg: 'dir', desc: 'Output directory (default: <repo>/out)' },
  },
  examples: [
    'node scripts/funding-feed.mjs --region india --since 7',
    'node scripts/funding-feed.mjs --keywords "d2c,consumer,ecommerce" --since 30',
    'node scripts/funding-feed.mjs --feed https://inc42.com/feed/ --since 3',
  ],
});

// ---------------------------------------------------------------- feed parsing (regex — feeds are simple XML)
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return m ? m[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1').trim() : '';
}

export function parseFeed(xml) {
  const items = [];
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks) {
    const title = oneLineText(tag(b, 'title'));
    let link = tag(b, 'link');
    if (!link || /^\s*$/.test(link)) link = (b.match(/<link[^>]*href=["']([^"']+)["']/i) || [])[1] || '';
    const date = tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date');
    const desc = htmlToText(tag(b, 'description') || tag(b, 'summary') || tag(b, 'content:encoded') || tag(b, 'content'));
    const cats = [...b.matchAll(/<category[^>]*>([\s\S]*?)<\/category>/gi)].map((m) => oneLineText(m[1]));
    items.push({ title, link: decodeEntities(link.trim()), date: date ? new Date(date) : null, desc, cats });
  }
  return items;
}

function oneLineText(s) {
  return htmlToText(String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')).replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------- extraction
const FUNDING_RE = /\b(raises?|raised|raising|secures?|secured|bags?|bagged|nets?|netted|mops? up|lands?|gets|receives?|closes?|announces?)\b[^.]{0,60}?(\$|usd|us\$|₹|rs\.?|inr|€|£|eur|funding|seed|series|round|investment|capital)|\b(pre-seed|seed|series [a-h]|pre-series [a-h])\b[^.]{0,30}\b(round|funding)\b|\bfunding\b/i;
const NOT_STARTUP_RE = /\b(launches|closes|announces|unveils|marks)\b[^.]{0,40}\b(fund|vehicle)\b(?!ing)|\b(fund (i{1,3}|iv|v|vi)|vc firm|venture firm|ipo|qip|ofs|rights issue|bonds?|stock sales?|share sale|layoffs?|shuts? down|acquires?|acquisition|merger|lawsuit|net profit|net loss|revenue|q[1-4]|fy\d{2}|quarterly|results|valuation drops?)\b|&\s*more\b|round-?up|funding galore|this week|weekly funding|top \d+/i;
const VERB_RE = /\s(raises?|raised|secures?|secured|bags?|bagged|nets?|netted|mops? up|lands?|gets|receives?|closes?|announces?|picks up|scores?)\b/i;
const DESCRIPTOR_RE = /^(startup|start-up|brand|platform|company|firm|maker|unicorn|soonicorn|exclusive|marketplace|app|d2c|dtc|saas|b2b|b2c|fintech|edtech|healthtech|agritech|insurtech|proptech|spacetech|deeptech|cleantech|climatetech|legaltech|gaming|ai|genai|ev|quick|commerce|ecommerce|e-commerce|logistics|beauty|fashion|food|apparel|jewellery|jewelry|personal|care|skincare|wellness|furniture|footwear|eyewear|electronics|consumer|robotics|drone|biotech|medtech|the|a|an|and|&|its|india's|indian|us|uk|european|german|french|based|backed|led|funded|stealth|cybersecurity|security|data|analytics|agentic|software|developer|infra|infrastructure|payments|lending|neobank|wealthtech|crypto|web3|blockchain|hrtech|martech|adtech|traveltech|mobility|media|content|creator|social|dating|music|sports|pet|baby|kids|home|decor|kitchen|tea|coffee|snacks|beverage|nutrition|fitness|health|mental|clinic|hospital|pharmacy)$/i;

export function extractCompany(title) {
  const m = title.split(VERB_RE)[0];
  if (!m || m === title) return '';
  const prefix = m.replace(/^(exclusive|breaking|funding alert|funding roundup)\s*[:|–—-]\s*/i, '').trim();
  const tokens = prefix.split(/\s+/);
  const out = [];
  for (let i = tokens.length - 1; i >= 0 && out.length < 4; i--) {
    const tok = tokens[i].replace(/[,:;'"“”‘’()]+$/g, '').replace(/^[,:;'"“”‘’(]+/g, '');
    if (!tok) continue;
    if (/-based$/i.test(tok) || DESCRIPTOR_RE.test(tok.replace(/[’']s$/i, ''))) {
      if (out.length) break;
      continue;
    }
    if (/[’']s$/.test(tok) && out.length) break; // possessive place/parent prefix: "Oxford’s FluoRok"
    if (!/^[A-Z0-9&.@]/.test(tok) && !/[A-Z]/.test(tok)) {
      if (out.length) break;
      continue;
    }
    out.unshift(tok);
  }
  return out.join(' ').replace(/[’']s$/, '');
}

export function extractAmount(text) {
  const m = text.match(/(\$|us\$|usd|₹|rs\.?|inr|€|eur|£)\s?([\d,]+(?:\.\d+)?)\s?(mn|million|m\b|bn|billion|b\b|cr|crore|crores|lakh|lakhs|k\b)?/i);
  if (!m) return '';
  const cur = /\$|usd/i.test(m[1]) ? '$' : /₹|rs|inr/i.test(m[1]) ? '₹' : /€|eur/i.test(m[1]) ? '€' : '£';
  const unit = (m[3] || '').toLowerCase();
  const u = /^(mn|million|m)$/.test(unit) ? 'M' : /^(bn|billion|b)$/.test(unit) ? 'B' : /^cr/.test(unit) ? ' Cr' : /^lakh/.test(unit) ? ' L' : unit === 'k' ? 'K' : '';
  return `${cur}${m[2]}${u}`;
}

function amountUsd(amount) {
  const m = amount.match(/^([$₹€£])([\d,.]+)\s?(M|B|K| Cr| L)?$/);
  if (!m) return null;
  let n = Number(m[2].replace(/,/g, ''));
  const unit = m[3] || '';
  if (unit === 'M') n *= 1e6;
  else if (unit === 'B') n *= 1e9;
  else if (unit === 'K') n *= 1e3;
  else if (unit === ' Cr') n *= 1e7;
  else if (unit === ' L') n *= 1e5;
  const fx = { $: 1, '₹': 1 / 95, '€': 1.08, '£': 1.27 }[m[1]]; // repo-wide assumption ₹95 = $1 — check the live rate
  return n * fx;
}

const ROUND_RE = /\b(pre-seed|seed|angel|pre-series [a-h]|series [a-h]\+?|bridge|debt|venture debt|growth round)\b/i;
const SECTORS = [
  ['d2c', /\b(d2c|dtc|direct-to-consumer|consumer brand|apparel|fashion|beauty|skincare|personal care|jewel(le)?ry|footwear|eyewear|snacks|beverages?|coffee|tea|nutrition|home decor|furniture|fmcg)\b/i],
  ['ecommerce', /\b(e-?commerce|quick commerce|q-?commerce|marketplace|shopify|retail|omnichannel|social commerce)\b/i],
  ['fintech', /\b(fintech|payments?|lending|neobank|insurtech|wealthtech|credit|bnpl|upi|banking)\b/i],
  ['saas', /\b(saas|b2b software|enterprise software|workflow|platform for|api|developer tools?|devtools)\b/i],
  ['ai', /\b(ai|genai|generative ai|llm|agentic|ai agents?|machine learning|artificial intelligence)\b/i],
  ['logistics', /\b(logistics|supply chain|fulfil(l)?ment|shipping|warehous)/i],
  ['healthtech', /\b(healthtech|health ?care|clinic|diagnostic|medtech|pharma)\b/i],
  ['edtech', /\b(edtech|education|upskilling|learning platform)\b/i],
];
const INDIA_RE = /\b(india|indian|bengaluru|bangalore|mumbai|pune|delhi|ncr|gurugram|gurgaon|noida|hyderabad|chennai|kolkata|ahmedabad|jaipur|kochi)\b/i;

function scoreItem(item, feed, kwList) {
  const text = `${item.title} ${item.desc.slice(0, 300)} ${item.cats.join(' ')}`;
  const sectors = SECTORS.filter(([, re]) => re.test(text)).map(([k]) => k);
  const round = (text.match(ROUND_RE) || [])[1] || '';
  const amount = extractAmount(item.title) || extractAmount(item.desc);
  const usd = amount ? amountUsd(amount) : null;
  const india = feed.region === 'india' || INDIA_RE.test(text);
  let s = 20;
  const why = [];
  if (india) { s += 15; why.push('India'); }
  if (sectors.includes('d2c') || sectors.includes('ecommerce')) { s += 25; why.push('D2C/e-commerce → Track A'); }
  else if (sectors.includes('fintech')) { s += 20; why.push('fintech → back-office/internal tools (Deribit proof)'); }
  else if (sectors.includes('saas')) { s += 15; why.push('SaaS → internal tools/dashboards'); }
  else if (sectors.includes('ai')) { s += 10; why.push('AI → prototype-to-production'); }
  if (/^(pre-seed|seed|angel|pre-series a|series a|bridge)$/i.test(round)) { s += 15; why.push(`${round} = small team, needs extra hands`); }
  else if (/series [c-h]/i.test(round)) { s -= 10; why.push(`${round} = big team/procurement`); }
  if (usd !== null && usd <= 20e6) s += 5;
  if (usd !== null && usd >= 100e6) s -= 10;
  if (/\b(in talks|looks to raise|plans to raise|set to raise)\b/i.test(item.title)) why.push('raising soon (in talks)');
  if (kwList.length) {
    const hit = kwList.filter((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(text));
    s += hit.length * 10;
  }
  return { score: Math.max(0, Math.min(100, s)), sectors, round, amount, india, why };
}

// ---------------------------------------------------------------- main
async function main() {
  const sinceDays = toInt(opts.since, 14);
  const cutoff = Date.now() - sinceDays * 86400000;
  const kwList = splitList(opts.keywords);
  const feeds = opts.feed?.length
    ? opts.feed.map((url) => ({ name: hostOf(url), region: /\.in\b|inc42|yourstory|entrackr|indiatimes/i.test(url) ? 'india' : 'global', url }))
    : FEEDS.filter((f) => opts.region === 'all' || f.region === opts.region);

  const all = [];
  const stats = [];
  for (const feed of feeds) {
    const res = await fetchText(feed.url, { timeoutMs: 25000, retries: 1, headers: { Accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.5' } });
    if (!res.ok) {
      console.log(`  ✖ ${feed.name}: ${res.status || res.error} — skipped`);
      stats.push({ feed, items: 0, funding: 0, error: res.status || res.error });
      continue;
    }
    const items = parseFeed(res.text);
    let funding = 0;
    for (const item of items) {
      if (item.date && !Number.isNaN(item.date.getTime()) && item.date.getTime() < cutoff) continue;
      const hay = `${item.title} ${item.desc.slice(0, 400)}`;
      if (!FUNDING_RE.test(item.title) && !/\bfunding\b/i.test(item.cats.join(' '))) continue;
      if (NOT_STARTUP_RE.test(item.title)) continue;
      const company = extractCompany(item.title);
      if (!company) continue;
      const sc = scoreItem(item, feed, kwList);
      const usd = sc.amount ? amountUsd(sc.amount) : null;
      if (usd !== null && usd >= 300e6) continue; // late-stage/corporate money — not a freelancer client
      if (kwList.length && !kwList.some((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(`${hay} ${item.cats.join(' ')}`))) continue;
      funding++;
      all.push({ item, feed, company, ...sc });
    }
    stats.push({ feed, items: items.length, funding });
    console.log(`  ✔ ${feed.name}: ${items.length} items, ${funding} funding matches`);
    await sleep(500);
  }

  // Dedupe by company (same raise is covered by several outlets) — keep the best-scored, merge links.
  const byCompany = new Map();
  for (const e of all) {
    const key = e.company.toLowerCase().replace(/[^a-z0-9]/g, '');
    const prev = byCompany.get(key);
    if (!prev) byCompany.set(key, { ...e, links: [e.item.link] });
    else {
      prev.links.push(e.item.link);
      if (e.score > prev.score) Object.assign(prev, { ...e, links: prev.links });
    }
  }
  const minScore = toInt(opts['min-score'], 25);
  const entries = [...byCompany.values()].filter((e) => e.score >= minScore).sort((a, b) => b.score - a.score || (b.item.date || 0) - (a.item.date || 0));
  const today = localDate();

  const rows = entries.map((e) => {
    const { segment, offer } = inferSegmentOffer(`${e.sectors.join(' ')} ${e.item.title} ${e.item.desc.slice(0, 300)}`);
    let seg = segment;
    let off = offer;
    if (seg === 'other' || seg === 'startup-mvp') {
      if (e.sectors.includes('d2c') || e.sectors.includes('ecommerce')) { seg = 'd2c-shopify'; off = 'A2'; }
      else if (e.sectors.includes('fintech') || e.sectors.includes('saas')) { seg = 'internal-tools'; off = 'B2'; }
      else { seg = 'startup-mvp'; off = 'custom'; }
    }
    const currency = e.india ? 'INR' : 'USD';
    const est = OFFER_VALUE[off] || OFFER_VALUE.custom;
    return crmRow({
      id: stableId('fund', e.company.toLowerCase()),
      company: e.company,
      location: e.india ? 'India' : '',
      source: 'other',
      segment: seg,
      offer: off,
      stage: 'prospect',
      value: est.currency === currency ? est.value : '',
      currency,
      probability: 3,
      score: e.score,
      nextAction: 'Find founder/CTO on LinkedIn; congratulate + one specific idea (no pitch in message 1)',
      nextDate: today,
      tags: ['funding', ...e.sectors, e.round ? e.round.toLowerCase() : '', e.india ? 'india' : 'global', /in talks|looks to raise|plans to raise|set to raise/i.test(e.item.title) ? 'in-talks' : ''],
      notes: `${e.item.title}${e.amount ? ` | ${e.amount}` : ''}${e.round ? ` ${e.round}` : ''} | ${e.links.slice(0, 2).join(' ')} | why now: just raised — hiring/scaling, budget unlocked | fit: ${e.why.join('; ')}`,
    });
  });

  const md = [`# Funding radar — ${today}`, '', `Last ${sinceDays} day(s) · region: ${opts.region}${kwList.length ? ` · keywords: ${kwList.join(', ')}` : ''} · min score ${minScore}. Amount → USD uses ₹95 = $1 (check the live rate).`, ''];
  md.push('| Feed | Items | Funding matches |', '|---|---:|---:|');
  for (const st of stats) md.push(`| ${st.feed.name} | ${st.items} | ${st.funding}${st.error ? ` (error ${st.error})` : ''} |`);
  md.push('');
  if (!entries.length) md.push('_No funding items matched. Try `--since 30` or remove `--keywords`._', '');
  else {
    md.push('| # | Score | Company | Amount | Round | Sectors | Date | Story |', '|---:|---:|---|---|---|---|---|---|');
    entries.forEach((e, i) => md.push(`| ${i + 1} | ${e.score} | ${mdCell(e.company)} | ${e.amount || '—'} | ${e.round || '—'} | ${e.sectors.join(', ') || '—'} | ${e.item.date && !Number.isNaN(e.item.date.getTime()) ? localDate(e.item.date) : '—'} | [${mdCell(truncate(e.item.title, 70))}](${e.item.link}) |`));
    md.push('', '## How to work this list', '');
    md.push('1. Shortlist ≤10 that match your tracks (D2C → A-offers; fintech/SaaS → B2; AI → B1).');
    md.push('2. Find the founder/CTO/Head of Product on LinkedIn. Check their careers page: open engineering roles = pain you can bridge with a contract while they hire.');
    md.push('3. Message 1 = congratulations + one specific, useful observation. No pitch, no deck, no link dump.');
    md.push('4. If they reply, offer a short paid audit/assessment (A1/B1/B3) — not a free call that turns into free consulting.');
    md.push('5. Log every touch in the CRM; follow up on day 3, 7 and 14, then move to nurture.');
  }
  await writeOutputs({ dir: outDir(opts.out), prefix: 'funding-leads', rows, markdown: `${md.join('\n')}\n` });
}

main().catch((err) => {
  console.error(`✖ ${err.stack || err.message}`);
  process.exit(1);
});
