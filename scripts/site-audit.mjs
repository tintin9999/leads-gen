#!/usr/bin/env node
// Site auditor: homepage → stack / payments / apps / analytics / contacts (+ optional PageSpeed Insights)
// → opportunity score, suggested offer and a one-line personalised hook. Output: CRM CSV + Markdown report.
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { cli, toInt } from './lib/args.mjs';
import { parseCsv } from './lib/csv.mjs';
import { clamp, crmRow, localDate, OFFER_VALUE } from './lib/crm.mjs';
import { fetchJson, fetchText, hostOf, mapLimit } from './lib/http.mjs';
import { mdCell, outDir, writeOutputs } from './lib/out.mjs';
import { decodeEntities, extractEmails, truncate } from './lib/text.mjs';

const opts = cli({
  name: 'site-audit',
  summary: 'Audit store/app homepages for stack, checkout, speed signals → scored leads with a hook.',
  usage: 'node scripts/site-audit.mjs <domains.txt | leads.csv | domain ...> [options]',
  options: {
    psi: { type: 'boolean', desc: 'Also run Google PageSpeed Insights (mobile). Set PSI_API_KEY for reliable quota' },
    concurrency: { type: 'string', default: '3', arg: 'n', desc: 'Parallel homepage fetches' },
    delay: { type: 'string', default: '700', arg: 'ms', desc: 'Pause between request starts' },
    timeout: { type: 'string', default: '20000', arg: 'ms', desc: 'Homepage fetch timeout' },
    limit: { type: 'string', default: '200', arg: 'n', desc: 'Max sites to audit' },
    out: { type: 'string', arg: 'dir', desc: 'Output directory (default: <repo>/out)' },
  },
  examples: [
    'node scripts/site-audit.mjs scripts/sample-domains.txt',
    'PSI_API_KEY=xxxx node scripts/site-audit.mjs scripts/sample-domains.txt --psi --concurrency 2',
    'node scripts/site-audit.mjs snitch.co.in bluetokaicoffee.com',
    'node scripts/site-audit.mjs out/hn-leads-2026-11-05.csv   # any CSV with a website/url/domain column',
  ],
});

// ---------------------------------------------------------------- signatures
const SIG = [
  // platforms
  ['platform', 'Shopify', /cdn\.shopify\.com|Shopify\.theme|myshopify\.com|shopify-section|window\.Shopify\b/i],
  ['platform', 'WooCommerce', /woocommerce|wc-blocks|wp-content\/plugins\/woocommerce/i],
  ['platform', 'WordPress', /wp-content\/|wp-includes\/|wp-json/i],
  ['platform', 'Magento', /Magento_|mage\/cookies|static\/version\d+\/frontend/i],
  ['platform', 'BigCommerce', /cdn\d*\.bigcommerce\.com|stencil-utils/i],
  ['platform', 'Wix', /static\.parastorage\.com|wixstatic\.com|_wixCIDX/i],
  ['platform', 'Squarespace', /static1\.squarespace\.com|squarespace-cdn\.com|SQUARESPACE_CONTEXT/i],
  ['platform', 'Webflow', /data-wf-page|data-wf-site|webflow\.js|website-files\.com/i],
  ['platform', 'Dukaan', /mydukaan\.io|dukaan\.app|cdn\.dukaan/i],
  ['platform', 'Salesforce Commerce', /demandware\.static|\/on\/demandware/i],
  ['platform', 'PrestaShop', /prestashop/i],
  // frameworks
  ['framework', 'Next.js', /__NEXT_DATA__|\/_next\/static|self\.__next_f/i],
  ['framework', 'Nuxt', /__NUXT__|\/_nuxt\//i],
  ['framework', 'Gatsby', /id="___gatsby"|\/page-data\/app-data\.json/i],
  ['framework', 'Remix/Hydrogen', /__remixContext|__remixManifest/i],
  ['framework', 'Astro', /astro-island|\/_astro\//i],
  ['framework', 'SvelteKit', /__sveltekit|data-sveltekit/i],
  ['framework', 'Angular', /\bng-version="/i],
  // AngularJS: attribute/script based to avoid matching prose. Angular + AngularJS together = hybrid app (great B3 lead).
  ['framework', 'AngularJS', /<[^>]+\sng-(app|controller)(?=[\s=>/])|<script[^>]+src=["'][^"']*angular(\.min)?\.js\b/i],
  ['framework', 'Vue', /data-v-[0-9a-f]{6,8}\b|__VUE__|data-v-app/i],
  ['framework', 'React', /data-reactroot|data-react-helmet|react-dom(\.production)?(\.min)?\.js|_reactListening/i],
  ['framework', 'jQuery', /jquery(\.min)?\.js|jquery-\d|jquery@\d/i],
  // payments & checkout (India-first)
  ['payments', 'Razorpay', /checkout\.razorpay\.com|razorpay/i],
  ['checkout', 'Razorpay Magic Checkout', /magic[-_]?checkout|1cc\.razorpay/i],
  ['checkout', 'Shiprocket Fastrr', /fastrr|shiprocket/i],
  ['checkout', 'GoKwik', /gokwik/i],
  ['checkout', 'Simpl', /getsimpl\.com|simpl-checkout|simplpay|cdn\.getsimpl/i],
  ['checkout', 'Snapmint', /snapmint/i],
  ['payments', 'Cashfree', /cashfree/i],
  ['payments', 'PayU', /payu\.in|payubiz|payumoney/i],
  ['payments', 'Juspay', /juspay|hyperservices/i],
  ['payments', 'PhonePe', /phonepe/i],
  ['payments', 'Paytm', /paytm/i],
  ['payments', 'Stripe', /js\.stripe\.com|stripe\.network/i],
  ['payments', 'PayPal', /paypal\.com\/sdk|paypalobjects\.com/i],
  // messaging
  ['messaging', 'WhatsApp link', /wa\.me\/|api\.whatsapp\.com\/send/i],
  ['messaging', 'Interakt', /interakt/i],
  ['messaging', 'WATI', /wati\.io/i],
  ['messaging', 'Gallabox', /gallabox/i],
  ['messaging', 'AiSensy', /aisensy/i],
  ['messaging', 'Zoko', /zoko\.io/i],
  ['messaging', 'LimeChat', /limechat/i],
  // marketing / CX apps (maturity = budget signal)
  ['apps', 'Klaviyo', /klaviyo/i],
  ['apps', 'CleverTap', /clevertap/i],
  ['apps', 'MoEngage', /moengage/i],
  ['apps', 'WebEngage', /webengage/i],
  ['apps', 'Wigzo', /wigzo/i],
  ['apps', 'Judge.me', /judge\.me|judgeme/i],
  ['apps', 'Yotpo', /yotpo/i],
  ['apps', 'Gorgias', /gorgias/i],
  ['apps', 'Freshchat', /freshchat|wchat\.freshchat/i],
  ['apps', 'Intercom', /widget\.intercom\.io|intercomcdn/i],
  ['apps', 'Tidio', /tidio/i],
  ['apps', 'Hotjar', /static\.hotjar\.com/i],
  // commerce intent (product/cart markup) — lets us treat custom Next.js/React shops as stores
  ['commerce', 'Product/cart markup', /add[ -]to[ -]cart|addtocart|"@type"\s*:\s*"Product"|og:type"\s+content="product|\/collections\/|\/products\/|\/cart\b/i],
  // analytics
  ['analytics', 'GA4', /gtag\/js\?id=G-|['"]G-[A-Z0-9]{6,}['"]/],
  ['analytics', 'GTM', /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{5,}/],
  ['analytics', 'Meta Pixel', /connect\.facebook\.net\/[^"']*fbevents\.js|fbq\(\s*['"]init/i],
  ['analytics', 'Microsoft Clarity', /clarity\.ms/i],
  ['analytics', 'Legacy UA', /['"]UA-\d{4,}-\d+['"]/],
];

const INDIAN_PAY = new Set(['Razorpay', 'Razorpay Magic Checkout', 'Shiprocket Fastrr', 'GoKwik', 'Simpl', 'Snapmint', 'Cashfree', 'PayU', 'Juspay', 'PhonePe', 'Paytm']);
const STORE_PLATFORMS = new Set(['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Dukaan', 'Salesforce Commerce', 'PrestaShop']);
const BUILDERS = new Set(['Wix', 'Squarespace', 'Webflow']);

// ---------------------------------------------------------------- input
async function loadTargets(args) {
  const targets = [];
  for (const arg of args) {
    if (existsSync(arg)) {
      const raw = await readFile(arg, 'utf8');
      if (extname(arg).toLowerCase() === '.csv') {
        for (const row of parseCsv(raw)) {
          const v = row.website || row.url || row.domain || row.site || '';
          if (v) targets.push(v);
        }
      } else {
        for (const line of raw.split(/\r?\n/)) {
          const v = line.replace(/#.*/, '').trim();
          if (v) targets.push(v.split(/[\s,]+/)[0]);
        }
      }
    } else targets.push(arg);
  }
  const seen = new Set();
  return targets
    .map((t) => (/^https?:\/\//i.test(t) ? t : `https://${t.replace(/^\/+/, '')}`))
    .filter((u) => {
      const h = hostOf(u);
      if (!h || seen.has(h)) return false;
      seen.add(h);
      return true;
    });
}

// ---------------------------------------------------------------- analysis
function analyse(html, finalUrl) {
  const found = {};
  for (const [group, label, re] of SIG) if (re.test(html)) (found[group] ||= []).push(label);

  // WordPress is implied by WooCommerce; React implied by Next/Gatsby/Remix.
  if (found.platform?.includes('WooCommerce')) found.platform = found.platform.filter((p) => p !== 'WordPress');
  if (found.framework?.some((f) => ['Next.js', 'Gatsby', 'Remix/Hydrogen'].includes(f))) found.framework = found.framework.filter((f) => f !== 'React');

  const host = hostOf(finalUrl);
  const scriptSrcs = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((m) => m[1]);
  const thirdParty = new Set();
  for (const src of scriptSrcs) {
    try {
      const h = new URL(src, finalUrl).hostname.replace(/^www\./, '');
      if (!h.endsWith(host) && !/shopify(cdn|cloud|svc)?\.com$|(^|\.)shop\.app$|myshopify\.com$/.test(h)) thirdParty.add(h);
    } catch { /* ignore bad src */ }
  }
  const siteName = decodeEntities(
    (html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']*)["']/i) || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:site_name["']/i) || [])[1] || '',
  ).trim();
  const title = decodeEntities((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();
  const description = decodeEntities(
    (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i) || [])[1] || '',
  ).trim();
  const mailtos = [...html.matchAll(/mailto:([^"'?\s>]+)/gi)].map((m) => decodeURIComponent(m[1]));
  const emails = extractEmails(`${mailtos.join(' ')} ${html.replace(/<[^>]+>/g, ' ').slice(0, 400000)}`)
    .sort((a, b) => Number(b.endsWith(host)) - Number(a.endsWith(host)))
    .slice(0, 3);
  const social = {};
  const ig = html.match(/instagram\.com\/(?!p\/|reel|explore|stories|accounts)([A-Za-z0-9_.]{2,30})/i);
  if (ig) social.instagram = `https://instagram.com/${ig[1].replace(/\.$/, '')}`;
  const li = html.match(/linkedin\.com\/company\/([A-Za-z0-9_-]{2,60})/i);
  if (li) social.linkedin = `https://www.linkedin.com/company/${li[1]}`;

  return {
    found,
    host,
    siteName,
    title,
    description,
    emails,
    social,
    htmlKB: Math.round(Buffer.byteLength(html, 'utf8') / 1024),
    scripts: (html.match(/<script\b/gi) || []).length,
    thirdPartyHosts: [...thirdParty],
    images: (html.match(/<img\b/gi) || []).length,
    lazyImages: (html.match(/loading=["']lazy["']/gi) || []).length,
  };
}

let psiDisabled = false;
async function runPsi(url) {
  if (psiDisabled) return { error: 'skipped (quota exceeded earlier — set PSI_API_KEY)' };
  const key = process.env.PSI_API_KEY ? `&key=${encodeURIComponent(process.env.PSI_API_KEY)}` : '';
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance${key}`;
  const res = await fetchJson(api, { timeoutMs: 120000, retries: 1, backoffMs: 5000, quiet: true });
  if (!res.ok) {
    let msg = res.error || `HTTP ${res.status}`;
    if (res.status === 429) {
      msg = 'quota exceeded — set PSI_API_KEY';
      if (!process.env.PSI_API_KEY) psiDisabled = true;
    }
    else if (res.data?.error?.message) msg = res.data.error.message;
    else if (res.text) { try { msg = JSON.parse(res.text).error?.message || msg; } catch { /* keep */ } }
    return { error: truncate(msg, 160) };
  }
  const lr = res.data.lighthouseResult || {};
  const a = lr.audits || {};
  const field = res.data.loadingExperience?.metrics || {};
  return {
    perf: lr.categories?.performance?.score != null ? Math.round(lr.categories.performance.score * 100) : null,
    lcp: a['largest-contentful-paint']?.numericValue != null ? +(a['largest-contentful-paint'].numericValue / 1000).toFixed(1) : null,
    fcp: a['first-contentful-paint']?.numericValue != null ? +(a['first-contentful-paint'].numericValue / 1000).toFixed(1) : null,
    cls: a['cumulative-layout-shift']?.numericValue != null ? +a['cumulative-layout-shift'].numericValue.toFixed(3) : null,
    tbt: a['total-blocking-time']?.numericValue != null ? Math.round(a['total-blocking-time'].numericValue) : null,
    fieldLcp: field.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
    fieldInp: field.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
    fieldCls: field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null ? field.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 : null,
    fieldCategory: res.data.loadingExperience?.overall_category || null,
  };
}

function assess(site) {
  const f = site.a?.found || {};
  const has = (group, label) => (f[group] || []).includes(label);
  const platform = (f.platform || [])[0] || '';
  const fw = f.framework || [];
  const checkout = f.checkout || [];
  const payments = [...(f.payments || []), ...checkout];
  const indianPay = payments.filter((p) => INDIAN_PAY.has(p));
  const apps = f.apps || [];
  const psi = site.psi && !site.psi.error ? site.psi : null;
  const n3p = site.a?.thirdPartyHosts.length || 0;
  const isIndia = /\.in$/i.test(site.a?.host || hostOf(site.url)) || indianPay.length > 0;
  const reasons = [];
  let s = 0;

  if (site.blocked) return { score: 15, offer: 'custom', segment: 'other', reasons: ['homepage blocked automated fetch — review manually in a browser'], isIndia, platform: '', stack: 'unknown', hook: '' };

  const isShopify = platform === 'Shopify';
  const commerce = (f.commerce || []).length > 0;
  const isStore = STORE_PLATFORMS.has(platform) || (fw.some((x) => ['Next.js', 'Nuxt', 'Remix/Hydrogen', 'Gatsby', 'React', 'Vue'].includes(x)) && (payments.length > 0 || commerce));
  const headless = isShopify && fw.some((x) => ['Next.js', 'Remix/Hydrogen', 'Nuxt', 'Gatsby'].includes(x));

  if (isShopify) { s += 25; reasons.push(headless ? 'headless Shopify (has engineering budget)' : 'Shopify store — Track A core fit'); }
  else if (STORE_PLATFORMS.has(platform)) { s += 15; reasons.push(`${platform} store — replatform/speed conversation`); }
  else if (isStore) { s += 12; reasons.push('custom storefront (in-house team likely — pitch as extra capacity or a scoped sprint)'); }
  else if (BUILDERS.has(platform)) { s += 3; reasons.push(`${platform} site — usually low-ticket`); }
  else if (platform === 'WordPress') { s += 3; reasons.push('WordPress site'); }

  if (has('framework', 'AngularJS')) { s += 35; reasons.push('AngularJS (end-of-life since Jan 2022) — B3 migration'); }
  else if (has('framework', 'Angular')) { s += 20; reasons.push('Angular app — B3 modernisation candidate'); }
  if (has('framework', 'jQuery') && !isShopify) { s += 3; reasons.push('jQuery-heavy front end'); }

  if (indianPay.length) { s += 10; reasons.push(`Indian payments/checkout: ${indianPay.join(', ')}`); }
  if (checkout.length) { s += 5; reasons.push(`3rd-party checkout: ${checkout.join(', ')} — A3 conversation (COD/RTO, prepaid share)`); }
  if (apps.length >= 3) { s += 8; reasons.push(`${apps.length} marketing/CX apps — spends on tooling (budget signal)`); }
  if (has('analytics', 'Legacy UA')) { s += 3; reasons.push('legacy Universal Analytics tag still on page (neglect signal)'); }

  if (psi && psi.perf != null) {
    if (psi.perf < 50) { s += 25; reasons.push(`mobile PageSpeed ${psi.perf}/100 (poor)`); }
    else if (psi.perf < 70) { s += 12; reasons.push(`mobile PageSpeed ${psi.perf}/100 (needs work)`); }
    else if (psi.perf >= 90) { s -= 10; reasons.push(`mobile PageSpeed ${psi.perf}/100 (already fast)`); }
    if (psi.lcp != null && psi.lcp > 4) { s += 8; reasons.push(`LCP ${psi.lcp}s (>4s = poor)`); }
    if (psi.tbt != null && psi.tbt > 600) { s += 5; reasons.push(`TBT ${psi.tbt}ms`); }
    if (psi.cls != null && psi.cls > 0.25) { s += 5; reasons.push(`CLS ${psi.cls} (layout jumps)`); }
  } else if (isStore || isShopify) {
    if (n3p >= 20) { s += 10; reasons.push(`${n3p} third-party script domains on homepage`); }
    else if (n3p >= 12) { s += 5; reasons.push(`${n3p} third-party script domains on homepage`); }
    if ((site.a?.htmlKB || 0) > 1000) { s += 5; reasons.push(`homepage HTML ${site.a.htmlKB} KB (heavy)`); }
    if ((site.a?.scripts || 0) >= 80) { s += 5; reasons.push(`${site.a.scripts} <script> tags on homepage`); }
  }
  if (site.a?.emails.length) s += 5;

  // offer + segment
  let offer = 'custom';
  let segment = 'other';
  const slow = psi && psi.perf != null ? psi.perf < 70 : n3p >= 15 || (site.a?.scripts || 0) >= 120 || (site.a?.htmlKB || 0) >= 1500;
  if (has('framework', 'AngularJS') || has('framework', 'Angular')) { offer = 'B3'; segment = 'migration'; }
  else if (isShopify) { segment = 'd2c-shopify'; offer = slow ? 'A1' : checkout.length || indianPay.length ? 'A3' : 'A2'; }
  else if (STORE_PLATFORMS.has(platform)) { segment = 'd2c-shopify'; offer = slow ? 'A1' : 'A4'; }
  else if (isStore) { segment = 'd2c-shopify'; offer = slow ? 'A1' : 'custom'; }
  else if (fw.some((x) => ['Next.js', 'React', 'Vue', 'Nuxt'].includes(x))) { segment = 'startup-mvp'; offer = 'custom'; }

  const stack = [platform, ...fw].filter(Boolean).join(' + ') || 'custom/unknown';
  return { score: clamp(s, 0, 100), offer, segment, reasons, isIndia, platform, stack, hook: hookFor(site, { isShopify, isStore, platform, stack, checkout, indianPay, n3p, psi, offer }) };
}

function hookFor(site, ctx) {
  const host = site.a.host;
  const { psi, n3p, checkout, offer } = ctx;
  const where = ctx.platform || ctx.stack;
  const fw = site.a.found.framework || [];
  if (offer === 'B3' && fw.includes('AngularJS')) {
    return `${host} still ships AngularJS (end-of-life since Jan 2022). I migrated Deribit's (Coinbase) Angular admin features to React module by module, without a feature freeze — happy to share the playbook.`;
  }
  if (offer === 'B3') {
    return `Saw ${host} runs Angular. I've migrated Angular admin modules to React for Deribit (Coinbase) and added Vitest to their CI — if modernisation is on your roadmap, I can scope it in a short paid assessment.`;
  }
  if (offer === 'A1' && psi && psi.perf != null) {
    return `Ran ${host} through PageSpeed (mobile): ${psi.perf}/100${psi.lcp ? `, LCP ${psi.lcp}s` : ''}. On ${where} that's usually fixable in 1–2 weeks without a redesign — want the 3 biggest culprits I found?`;
  }
  if (offer === 'A1') {
    const weight = n3p >= 15 ? `scripts from ${n3p} third-party domains` : `${site.a.scripts} script tags and ${site.a.htmlKB} KB of HTML (before images)`;
    return `${host}'s homepage ships ${weight} — on ${where} that's the usual cause of slow mobile loads. I can show which apps/scripts cost you the most and which are safe to defer.`;
  }
  if (offer === 'A3' && checkout.includes('Razorpay Magic Checkout')) {
    return `Saw ${host} runs Razorpay Magic Checkout — I integrated it end to end for Cultus (partial COD for high-risk pincodes, signature-verified webhooks, automatic refund retries). Happy to compare notes on COD/RTO settings.`;
  }
  if (offer === 'A3') {
    const names = [...new Set([...checkout, ...ctx.indianPay])].slice(0, 2).join(' + ');
    return `Noticed ${host} runs ${names} on Shopify. I built partial-COD for high-risk pincodes with Razorpay Magic Checkout for Cultus (12 brand partners) — if RTO on COD orders hurts, happy to share how we set it up.`;
  }
  if (offer === 'A2') {
    return `I built a custom Shopify Sales Channel app for Cultus (webhook inventory sync + nightly reconciliation, orders flowing back to brands' stores). If ${host} still syncs inventory/orders with marketplaces, ERP or WhatsApp tools by hand, I can automate it.`;
  }
  if (offer === 'A4') {
    return `${host} runs on ${ctx.platform}. I build Shopify apps, integrations and Next.js storefronts for Indian D2C brands (Cultus: custom Shopify Sales Channel app, Razorpay Magic Checkout) — is the current platform slowing the team down?`;
  }
  if (ctx.isStore) {
    return `${host} looks like an in-house ${ctx.stack} storefront. If the team needs extra hands on checkout, Shopify/marketplace integrations or performance, I've built all three for Cultus — happy to help on a scoped sprint.`;
  }
  return `Took a quick look at ${host} (${ctx.stack}). I build Shopify apps and Razorpay checkouts for Indian D2C brands — is anything on the tech side slowing the team down right now?`;
}

function companyName(site) {
  if (site.a?.siteName && site.a.siteName.length <= 40) return site.a.siteName;
  const t = site.a?.title || '';
  const first = t.split(/\s[|–—-]\s|:\s/)[0].trim();
  if (first && first.split(/\s+/).length <= 4 && !/^(home|welcome|shop|official|buy|online)/i.test(first)) return first;
  const h = (site.a?.host || hostOf(site.url)).split('.')[0];
  return h.charAt(0).toUpperCase() + h.slice(1);
}

// ---------------------------------------------------------------- main
async function main() {
  if (!opts._.length) {
    opts.printHelp();
    process.exit(2);
  }
  const targets = (await loadTargets(opts._)).slice(0, toInt(opts.limit, 200));
  if (!targets.length) {
    console.error('No domains/URLs found in input.');
    process.exit(2);
  }
  if (opts.psi && !process.env.PSI_API_KEY) console.log('ℹ --psi without PSI_API_KEY: Google often returns 429 for keyless calls. Get a free key (see scripts/README.md).');
  console.log(`Auditing ${targets.length} site(s)…`);

  const sites = await mapLimit(targets, toInt(opts.concurrency, 3), toInt(opts.delay, 700), async (url) => {
    const res = await fetchText(url, { timeoutMs: toInt(opts.timeout, 20000), retries: 1, quiet: true });
    const site = { url, status: res.status, finalUrl: res.url, error: res.error };
    const challenge = /cf-chl|captcha|access denied|attention required|just a moment/i.test(res.text.slice(0, 5000));
    if (!res.ok || res.text.length < 500 || (res.status === 200 && challenge && res.text.length < 20000)) {
      site.blocked = true;
      site.a = { found: {}, host: hostOf(res.url || url), title: '', description: '', emails: [], social: {}, htmlKB: Math.round(res.text.length / 1024), scripts: 0, thirdPartyHosts: [], images: 0, lazyImages: 0 };
    } else site.a = analyse(res.text, res.url || url);
    if (opts.psi) site.psi = await runPsi(res.url || url);
    site.x = assess(site);
    const label = site.blocked ? `blocked (${res.status || res.error})` : site.x.stack;
    console.log(`  ${String(site.x.score).padStart(3)}  ${site.a.host.padEnd(30)} ${label}${site.psi ? ` · PSI ${site.psi.error ? `n/a (${site.psi.error})` : site.psi.perf}` : ''}`);
    return site;
  });

  sites.sort((a, b) => b.x.score - a.x.score);
  const today = localDate();
  const rows = sites.map((site) => {
    const { x, a, psi } = site;
    const est = OFFER_VALUE[x.offer] || OFFER_VALUE.custom;
    const perfNote = psi ? (psi.error ? `PSI n/a (${psi.error})` : `PSI mobile ${psi.perf}/100, LCP ${psi.lcp}s, TBT ${psi.tbt}ms, CLS ${psi.cls}${psi.fieldInp ? `, field INP ${psi.fieldInp}ms` : ''}`) : `3P script domains ${a.thirdPartyHosts.length}, HTML ${a.htmlKB}KB`;
    const found = a.found || {};
    return crmRow({
      id: `site-${a.host}`,
      company: companyName(site),
      contact: '',
      role: '',
      email: a.emails[0] || '',
      linkedin: a.social.linkedin || '',
      website: `https://${a.host}`,
      location: x.isIndia ? 'India' : '',
      source: 'cold-email',
      segment: x.segment,
      offer: x.offer,
      stage: 'prospect',
      value: est.value,
      currency: est.currency,
      probability: 5,
      score: x.score,
      nextAction: x.offer === 'A1' ? 'Verify on your phone, record a 2-min Loom of the top 3 issues, then send the hook' : 'Find founder / head of e-com on LinkedIn; send the hook (personalise)',
      nextDate: today,
      tags: ['site-audit', ...(found.platform || []), ...(found.framework || []), ...(found.checkout || []), ...(x.isIndia ? ['india-d2c'] : []), ...(site.blocked ? ['blocked'] : []), ...(psi && psi.perf != null && psi.perf < 50 ? ['psi-poor'] : [])],
      notes: `Hook: ${x.hook || '—'} | Stack: ${x.stack} | Payments: ${[...(found.payments || []), ...(found.checkout || [])].join(', ') || '—'} | Apps: ${(found.apps || []).join(', ') || '—'} | ${perfNote} | Why: ${x.reasons.join('; ')}${a.social.instagram ? ` | IG: ${a.social.instagram}` : ''}`,
    });
  });

  // ---------- Markdown report ----------
  const md = [`# Site audit — ${today}`, '', `${sites.length} site(s). Score = fit × opportunity (0–100). Offers: A1 speed sprint · A2 Shopify app/integration · A3 checkout/payments · A4 headless storefront · B3 modernisation.`, ''];
  md.push('| # | Site | Stack | Perf | 3P | Score | Offer | Hook |', '|---:|---|---|---|---:|---:|---|---|');
  sites.forEach((s, i) => {
    const perf = s.psi ? (s.psi.error ? 'n/a' : s.psi.perf) : '—';
    md.push(`| ${i + 1} | ${s.a.host} | ${mdCell(s.blocked ? 'blocked' : s.x.stack)} | ${perf} | ${s.a.thirdPartyHosts.length} | ${s.x.score} | ${s.x.offer} | ${mdCell(truncate(s.x.hook, 140))} |`);
  });
  md.push('', '## Details', '');
  sites.forEach((s, i) => {
    const f = s.a.found || {};
    md.push(`### ${i + 1}. ${companyName(s)} — ${s.a.host} (score ${s.x.score}, offer ${s.x.offer})`);
    if (s.blocked) md.push(`- **Blocked:** HTTP ${s.status || s.error}. Open it in a browser; bot protection is normal for bigger brands.`);
    if (s.a.title) md.push(`- **Title:** ${mdCell(s.a.title)}`);
    for (const g of ['platform', 'framework', 'commerce', 'payments', 'checkout', 'messaging', 'apps', 'analytics']) if (f[g]?.length) md.push(`- **${g === 'checkout' ? 'checkout / BNPL' : g}:** ${f[g].join(', ')}`);
    md.push(`- **Page weight:** HTML ${s.a.htmlKB} KB · ${s.a.scripts} script tags · ${s.a.thirdPartyHosts.length} third-party script domains · ${s.a.images} img (${s.a.lazyImages} lazy)`);
    if (s.psi) md.push(`- **PageSpeed (mobile):** ${s.psi.error ? `n/a — ${s.psi.error}` : `${s.psi.perf}/100 · LCP ${s.psi.lcp}s · FCP ${s.psi.fcp}s · TBT ${s.psi.tbt}ms · CLS ${s.psi.cls}${s.psi.fieldCategory ? ` · field (CrUX): ${s.psi.fieldCategory}${s.psi.fieldInp ? `, INP p75 ${s.psi.fieldInp}ms` : ''}` : ''}`}`);
    if (s.a.emails.length) md.push(`- **Emails on page:** ${s.a.emails.join(', ')}`);
    if (Object.keys(s.a.social).length) md.push(`- **Social:** ${Object.values(s.a.social).join(' · ')}`);
    md.push(`- **Why:** ${s.x.reasons.join('; ') || '—'}`);
    if (s.x.hook) md.push('', `> **Hook (verify before sending):** ${s.x.hook}`);
    md.push('');
  });
  md.push('---', 'Before you send anything: open the site on your own phone, confirm the issue is real, and personalise. A wrong "audit" kills trust instantly.');

  await writeOutputs({ dir: outDir(opts.out), prefix: 'site-audit', rows, markdown: `${md.join('\n')}\n` });
}

main().catch((err) => {
  console.error(`✖ ${err.stack || err.message}`);
  process.exit(1);
});
