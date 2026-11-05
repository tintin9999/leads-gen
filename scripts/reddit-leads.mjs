#!/usr/bin/env node
// Reddit "hiring" radar: r/forhire [Hiring] + optional builder/founder subs → CRM CSV + digest.
// Order of attempts per subreddit: OAuth API (if REDDIT_TOKEN) → public JSON → public RSS (Atom) → helpful error.
import { cli, splitList, toInt } from './lib/args.mjs';
import { crmRow, inferSegmentOffer, localDate, OFFER_VALUE } from './lib/crm.mjs';
import { fetchJson, fetchText, sleep } from './lib/http.mjs';
import { mdCell, outDir, writeOutputs } from './lib/out.mjs';
import { opener } from './lib/pitch.mjs';
import { decodeEntities, DEFAULT_KEYWORDS, extractEmails, geoSignals, htmlToText, parseKeywords, scoreKeywords, truncate } from './lib/text.mjs';

const OPTIONAL_SUBS = ['shopify', 'SaaS', 'startups', 'nextjs', 'reactjs', 'Supabase', 'lovable', 'vibecoding'];

const opts = cli({
  name: 'reddit-leads',
  summary: 'Find people hiring on Reddit (r/forhire [Hiring] + founder/builder subs). Best-effort, low volume.',
  options: {
    subs: { type: 'string', default: 'forhire', arg: 'list|all', desc: `Subreddits (comma list) or "all" = forhire + ${OPTIONAL_SUBS.join(', ')}` },
    since: { type: 'string', default: '14', arg: 'days', desc: 'Only posts from the last N days' },
    keywords: { type: 'string', arg: 'list', desc: 'Replace default keywords ("word:weight" allowed)' },
    'min-score': { type: 'string', default: '3', arg: 'n', desc: 'Drop posts with fewer raw points' },
    'include-restricted': { type: 'boolean', desc: 'Keep US/EU/UK-only posts (dropped by default)' },
    out: { type: 'string', arg: 'dir', desc: 'Output directory (default: <repo>/out)' },
  },
  examples: [
    'node scripts/reddit-leads.mjs',
    'node scripts/reddit-leads.mjs --subs all --since 7',
    'REDDIT_TOKEN=xxxx node scripts/reddit-leads.mjs --subs forhire,shopify   # only with approved Reddit API credentials',
  ],
});

const keywords = opts.keywords ? parseKeywords(splitList(opts.keywords)) : DEFAULT_KEYWORDS;
const subs = opts.subs === 'all' ? ['forhire', ...OPTIONAL_SUBS] : splitList(opts.subs);
const cutoff = Date.now() - toInt(opts.since, 14) * 86400000;

const HIRE_RE = /\b(hiring|to hire|looking for (a |an )?(freelance |contract |experienced |senior |good )?(developer|dev|engineer|programmer|freelancer|contractor|someone|help|cto|technical co-?founder)|need (a |an )?(developer|dev|engineer|programmer|freelancer|help with)|freelancer needed|contract(or)? (role|work|position|gig)|paid (gig|project|work|task))\b/i;
// r/forhire [Hiring] is mostly editors/designers/VAs — keep only software work.
const NON_DEV = /\b(video edit\w*|editors?|graphic|designers?|animat\w+|voice|writers?|copywrit\w+|virtual assistant|\bva\b|sales|bd lead|business development|outreach|marketing|seo|social media|ugc|creators?|tutors?|translat\w+|data entry|models?|photograph\w*|thumbnail|recruit\w*|intern(ship)?)\b/i;
const DEV = /\b(developer|dev|engineer|programmer|coder|full[- ]?stack|front[- ]?end|back[- ]?end|web ?app|website|shopify|react|next\.?js|node|typescript|supabase|api|saas|mvp|app\b|automation|integration|bug|fix)\b/i;
const TECH_KEYWORDS = new Set(['react', 'next.js', 'typescript', 'node', 'supabase', 'postgres', 'shopify', 'razorpay', 'stripe', 'dashboard', 'admin', 'internal tool', 'angular', 'migration', 'mvp', 'frontend', 'full-stack', 'e-commerce', 'vibe-coded']);
const SELF_PROMO = /\[for hire\]|\bfor hire\b|\bhire me\b|available for (work|hire|projects)|offering (my )?services|showcase|feedback on my|roast my/i;

// ---------------------------------------------------------------- fetchers
async function viaOAuth(sub) {
  const token = process.env.REDDIT_TOKEN;
  if (!token) return null;
  const res = await fetchJson(`https://oauth.reddit.com/r/${sub}/new?limit=100&raw_json=1`, { headers: { Authorization: `bearer ${token}` }, retries: 1 });
  if (!res.ok) return { error: `oauth ${res.status || res.error}` };
  return { via: 'oauth', posts: fromListing(res.data, sub) };
}

async function viaJson(sub) {
  const res = await fetchJson(`https://www.reddit.com/r/${sub}/new.json?limit=100&raw_json=1`, { retries: 1 });
  if (!res.ok) return { error: `json ${res.status || res.error}` };
  return { via: 'json', posts: fromListing(res.data, sub) };
}

async function viaRss(sub) {
  const res = await fetchText(`https://www.reddit.com/r/${sub}/new/.rss?limit=100`, { retries: 2, backoffMs: 6000, headers: { Accept: 'application/atom+xml, application/xml;q=0.9' } });
  if (!res.ok) return { error: `rss ${res.status || res.error}` };
  const entries = res.text.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  const posts = entries.map((e) => {
    const get = (t) => (e.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)<\\/${t}>`, 'i')) || [])[1] || '';
    const link = (e.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || '';
    const id = (get('id').match(/t3_([a-z0-9]+)/i) || [])[1] || link;
    const body = htmlToText(decodeEntities(get('content')));
    return {
      id,
      sub,
      title: decodeEntities(get('title')).trim(),
      body: body.replace(/submitted by\s+\/u\/\S+.*$/is, '').trim(),
      author: decodeEntities(get('name')).replace(/^\/u\//, ''),
      created: new Date(get('published') || get('updated')),
      url: decodeEntities(link),
      flair: (e.match(/<category[^>]*label="([^"]+)"/i) || [])[1] || '',
    };
  });
  return { via: 'rss', posts };
}

function fromListing(data, sub) {
  return (data?.data?.children || []).map(({ data: d }) => ({
    id: d.id,
    sub,
    title: d.title || '',
    body: d.selftext || '',
    author: d.author || '',
    created: new Date((d.created_utc || 0) * 1000),
    url: `https://www.reddit.com${d.permalink || ''}`,
    flair: d.link_flair_text || '',
  }));
}

// ---------------------------------------------------------------- filter + score
function isLead(p) {
  const title = p.title;
  if (NON_DEV.test(title) && !/\b(developer|engineer|programmer)\b/i.test(title)) return false;
  if (p.sub.toLowerCase() === 'forhire') return (/\[hiring\]/i.test(title) || /^hiring$/i.test(p.flair)) && DEV.test(`${title} ${p.body.slice(0, 600)}`);
  if (SELF_PROMO.test(title)) return false;
  if (HIRE_RE.test(title)) return true;
  // Body-only matches need a concrete signal that money/contact is involved.
  return HIRE_RE.test(p.body.slice(0, 1500)) && /\$\s?\d|₹\s?\d|\bbudget\b|\bpaid\b|\bdm me\b|\bcontact me\b|\bhourly\b/i.test(p.body);
}

function scorePost(p) {
  const text = `${p.title}\n${p.body}`;
  const { points: kw, hits } = scoreKeywords(text, keywords);
  const geo = geoSignals(text);
  let points = kw;
  const tags = [];
  if (/\$\s?\d|₹\s?\d|\bbudget\b|\bpaid\b|\busd\b|per hour|\/\s?hr\b|\/\s?hour\b|hourly rate/i.test(text)) { points += 3; tags.push('budget-mentioned'); }
  const amounts = [...text.matchAll(/\$\s?(\d[\d,]*)(?!\s?(k|m)\b)/gi)].map((m) => Number(m[1].replace(/,/g, ''))).filter((n) => n > 0);
  if (/\b(equity only|equity-only|rev(enue)?[- ]share only|unpaid|for exposure|no budget)\b/i.test(text) || (amounts.length && Math.max(...amounts) < 200 && !/\/\s?h(ou)?r|per hour|hourly/i.test(text))) {
    points -= 4;
    tags.push('low-budget');
  }
  if (geo.india) points += 3;
  if (geo.global) points += 2;
  if (geo.restricted) { points -= 4; tags.push('geo-restricted'); }
  return { points, hits, geo, tags };
}

// ---------------------------------------------------------------- main
async function main() {
  const stats = [];
  const leads = [];
  let blocked = 0;
  for (const sub of subs) {
    let result = await viaOAuth(sub);
    const errors = [];
    if (!result || result.error) {
      if (result?.error) errors.push(result.error);
      result = await viaJson(sub);
    }
    if (result.error) {
      errors.push(result.error);
      result = await viaRss(sub);
    }
    if (result.error) {
      errors.push(result.error);
      blocked++;
      console.log(`  ✖ r/${sub}: ${errors.join(' → ')}`);
      stats.push({ sub, via: '—', posts: 0, matched: 0, kept: 0, error: errors.join(' → ') });
      await sleep(4000);
      continue;
    }
    let matched = 0;
    let kept = 0;
    for (const p of result.posts) {
      if (Number.isNaN(p.created.getTime()) || p.created.getTime() < cutoff) continue;
      if (!isLead(p)) continue;
      matched++;
      const sc = scorePost(p);
      if (!sc.hits.some((h) => TECH_KEYWORDS.has(h)) && !opts.keywords) continue; // no stack overlap → not for us
      if (sc.points < toInt(opts['min-score'], 3)) continue;
      if (sc.geo.restricted && !opts['include-restricted']) continue;
      kept++;
      leads.push({ p, ...sc });
    }
    const note = errors.length ? ` (fallback after ${errors.join(', ')})` : '';
    console.log(`  ✔ r/${sub} via ${result.via}${note}: ${result.posts.length} recent posts, ${matched} hiring, ${kept} kept`);
    stats.push({ sub, via: result.via, posts: result.posts.length, matched, kept });
    await sleep(4000); // Reddit rate-limits hard (esp. RSS) — stay well under it
  }

  if (blocked === subs.length) {
    console.error(
      '\nReddit refused every request from this network (common on cloud/VPN IPs; Reddit now expects OAuth).\n' +
        'Options: 1) run from your home connection, 2) set REDDIT_TOKEN if you already hold approved API credentials\n' +
        '         (new Reddit apps need manual approval since Nov 2025 — see scripts/README.md),\n' +
        '         3) just open https://www.reddit.com/r/forhire/search/?q=flair%3AHiring&sort=new in a browser.\n',
    );
  }

  leads.sort((a, b) => b.points - a.points);
  const today = localDate();
  const rows = leads.map(({ p, points, hits, geo, tags }) => {
    const { segment, offer } = inferSegmentOffer(`${p.title} ${p.body}`);
    const est = OFFER_VALUE[offer] || OFFER_VALUE.custom;
    const email = extractEmails(p.body)[0] || '';
    return crmRow({
      id: `rd-${p.id}`,
      company: '',
      contact: `u/${p.author}`,
      role: truncate(p.title, 140),
      email,
      location: geo.india ? 'India' : geo.remote ? 'Remote' : '',
      source: 'reddit',
      segment,
      offer,
      stage: 'prospect',
      value: est.currency === 'USD' ? est.value : '',
      currency: 'USD',
      probability: 5,
      score: points * 5,
      nextAction: 'Reply in thread or DM within 24h (read the sub rules first); 1 proof + 1 question',
      nextDate: today,
      tags: ['reddit', `r/${p.sub}`, ...tags, geo.remote ? 'remote' : '', ...hits.slice(0, 5)],
      notes: `${truncate(`${p.title} — ${p.body}`, 420)} | ${p.url}`,
    });
  });

  const md = [`# Reddit leads — ${today}`, '', `Subs: ${subs.map((s) => `r/${s}`).join(', ')} · last ${toInt(opts.since, 14)} day(s).`, ''];
  md.push('| Sub | Via | Recent posts | Hiring | Kept |', '|---|---|---:|---:|---:|');
  for (const s of stats) md.push(`| r/${s.sub} | ${s.via} | ${s.posts} | ${s.matched} | ${s.kept}${s.error ? ` (${mdCell(s.error)})` : ''} |`);
  md.push('');
  if (!rows.length) md.push('_No hiring posts passed the filters. Widen with `--since 30`, `--subs all` or `--min-score 1`._', '');
  else {
    md.push('| # | Score | Title | Sub | Signals | Post |', '|---:|---:|---|---|---|---|');
    leads.forEach((l, i) => md.push(`| ${i + 1} | ${rows[i].score} | ${mdCell(truncate(l.p.title, 90))} | r/${l.p.sub} | ${mdCell([...l.tags, ...l.hits.slice(0, 4)].join(', '))} | [link](${l.p.url}) |`));
    md.push('', '## Details', '');
    leads.slice(0, 30).forEach((l, i) => {
      md.push(`### ${i + 1}. ${mdCell(truncate(l.p.title, 120))} (score ${rows[i].score})`);
      md.push(`- r/${l.p.sub} · u/${l.p.author} · ${localDate(l.p.created)} · ${l.p.url}`);
      md.push('', `> ${truncate(l.p.body || l.p.title, 500)}`, '', `**Draft opener (edit before sending):** ${opener(rows[i].segment)}`, '');
    });
  }
  md.push('---', 'Reddit etiquette: follow each sub\'s rules, reply publicly when the post asks for it, never paste the same message twice, and never move payment off a safe channel. Red flags → memo 11.');
  await writeOutputs({ dir: outDir(opts.out), prefix: 'reddit-leads', rows, markdown: `${md.join('\n')}\n` });
}

main().catch((err) => {
  console.error(`✖ ${err.stack || err.message}`);
  process.exit(1);
});
