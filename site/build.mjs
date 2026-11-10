#!/usr/bin/env node
// Freelance OS — zero-dependency static site build.
//   node site/build.mjs            build once
//   node site/build.mjs --watch    rebuild on changes
//   node site/build.mjs --strict   exit 1 on broken links or pages that fail the writing checks
// Inputs : site/src/*.html (guide pages), templates/**/*.md, lists/*.md, scripts/README.md, tools/README.md
// Outputs: index.html (map), memos/*.html, library/**/*.html — all self-contained (CSS/JS inlined).
// Writing rules live in site/WRITING.md and are checked by site/lint.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderMarkdown, esc, slugify } from './lib/markdown.mjs';
import { lintPage } from './lint.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...p) => path.join(ROOT, ...p);
const posix = path.posix;

const GROUPS = [
  { name: 'Start here', id: 'start', blurb: 'Short pages, in order. Each takes about 10 minutes and ends with a few small actions.' },
  { name: 'Fix a problem', id: 'problems', blurb: 'Open one of these only when it happens to you.' },
  { name: 'Money', id: 'money', blurb: 'Read after your first payment arrives.' },
  { name: 'Direct clients', id: 'direct', blurb: 'For later, when you add clients from outside Upwork.' },
  { name: 'Proof', id: 'proof', blurb: 'Your website, LinkedIn and other portals.' },
];
const GROUP_BY_NAME = new Map(GROUPS.map((g) => [g.name, g]));
// Old long pages → the short page that replaced them (keeps old links working).
const MOVED = {
  '00-start-here': '01-the-plan', '01-positioning': '02-what-you-sell', '02-business-setup': '46-becoming-a-business',
  '03-tax-and-money': '42-income-tax', '04-pricing': '40-minimum-rate', '05-lead-generation': '11-slow-backup',
  '06-sales-process': '52-first-call', '07-contracts': '54-contract-basics', '08-delivery-ops': '55-run-a-project',
  '09-portfolio-and-brand': '60-your-website', '10-90-day-plan': '10-first-8-weeks', '11-risks-and-scams': '22-is-this-a-scam',
  '12-metrics-and-cadence': '10-first-8-weeks',
};
const LIB_DIRS = ['templates', 'lists'];
const LIB_EXTRA = { 'scripts/README.md': 'Lead-finding scripts', 'tools/README.md': 'Tools guide' };
const TOOLS = [
  { file: 'crm.html', name: 'Pipeline tracker', desc: 'Every lead, proposal and follow-up in one place.' },
  { file: 'outreach-composer.html', name: 'Message writer', desc: 'Fill a tested message and log that you sent it.' },
  { file: 'proposal-builder.html', name: 'Proposal builder', desc: 'A three-option proposal you can save as a PDF.' },
  { file: 'rate-calculator.html', name: 'Rate, tax and savings calculator', desc: 'Your minimum rate, tax estimate and months of savings left.' },
  { file: 'invoice-generator.html', name: 'Invoice maker', desc: 'Correct invoices for Indian and foreign clients.' },
];
const FOLDER_LABELS = { upwork: 'Upwork', outreach: 'Messages and emails', sales: 'Calls and proposals', contracts: 'Contracts', delivery: 'Doing the work', finance: 'Money', portfolio: 'Website and LinkedIn' };

const read = (f) => fs.readFileSync(f, 'utf8');
const exists = (f) => fs.existsSync(f);
const write = (rel, content) => {
  const f = P(rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};
const walk = (dir, out = []) => {
  if (!exists(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else out.push(f);
  }
  return out;
};
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const plain = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const titleCase = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const ICON = {
  menu: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  print: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>',
  theme: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
};

function build() {
  const t0 = Date.now();
  const warnings = [];
  const CSS = read(P('site/assets/style.css'));
  const JS = read(P('site/assets/app.js'));

  /* ---------- load guide pages ---------- */
  const pages = (exists(P('site/src')) ? fs.readdirSync(P('site/src')) : [])
    .filter((f) => /^\d+.*\.html$/.test(f))
    .map((file) => {
      const raw = read(P('site/src', file));
      const slug = file.replace(/\.html$/, '');
      const m = raw.match(/^\s*<!--\s*meta\s+([\s\S]*?)\s*-->/);
      let meta = {};
      if (m) {
        try { meta = JSON.parse(m[1]); } catch (e) { warnings.push(`site/src/${file}: meta JSON invalid (${e.message})`); }
      } else warnings.push(`site/src/${file}: missing <!--meta {...} --> header`);
      const num = (slug.match(/^(\d+)/) || [, ''])[1];
      if (meta.group && !GROUP_BY_NAME.has(meta.group)) warnings.push(`site/src/${file}: unknown group "${meta.group}"`);
      return {
        file, slug, num,
        body: m ? raw.slice(m.index + m[0].length) : raw,
        title: meta.title || titleCase(slug.replace(/^\d+-/, '')),
        order: Number.isFinite(meta.order) ? meta.order : parseInt(num || '99', 10),
        group: GROUP_BY_NAME.has(meta.group) ? meta.group : 'Proof',
        summary: meta.summary || '',
        time: meta.time || '10 min',
        url: `memos/${slug}.html`,
      };
    })
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
  const pageBySlug = new Map(pages.map((p) => [p.slug, p]));
  const inGroup = (name) => pages.filter((p) => p.group === name);

  /* ---------- load library (markdown) ---------- */
  const libFiles = [];
  for (const d of LIB_DIRS) walk(P(d)).filter((f) => f.endsWith('.md')).forEach((f) => libFiles.push(rel(f)));
  for (const f of Object.keys(LIB_EXTRA)) if (exists(P(f))) libFiles.push(f);
  libFiles.sort();
  const libSet = new Set(libFiles);
  const libOut = (src) => `library/${src.replace(/\.md$/, '.html')}`;

  /* ---------- links ---------- */
  const isExternal = (u) => /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u) || u.includes('{{') || u.includes('%7B%7B');
  function mapTarget(t) {
    const clean = t.replace(/\/$/, '');
    if (clean.endsWith('.md') && libSet.has(clean)) return { path: libOut(clean) };
    if (clean === 'README.md' || clean === '' || clean === '.') return { path: 'index.html' };
    const mm = clean.match(/^memos\/([^/]+)\.html$/);
    if (mm) {
      if (pageBySlug.has(mm[1])) return { path: clean };
      if (MOVED[mm[1]] && pageBySlug.has(MOVED[mm[1]])) return { path: `memos/${MOVED[mm[1]]}.html`, moved: true };
      return { path: clean };
    }
    if (exists(P(clean)) && fs.statSync(P(clean)).isDirectory()) {
      if (LIB_DIRS.some((d) => clean === d || clean.startsWith(d + '/'))) return { path: 'index.html', hash: 'library' };
      if (clean === 'memos') return { path: 'index.html', hash: 'start' };
      if (clean === 'tools') return { path: 'index.html', hash: 'tools' };
      if (clean === 'scripts' && libSet.has('scripts/README.md')) return { path: libOut('scripts/README.md') };
    }
    return { path: clean };
  }
  function targetExists(p) {
    if (!p || p === 'index.html') return true;
    if (p.startsWith('memos/')) return pageBySlug.has(p.slice(6).replace(/\.html$/, ''));
    if (p.startsWith('library/')) return libSet.has(p.slice(8).replace(/\.html$/, '.md'));
    return exists(P(p));
  }
  function makeLinker(fromDir, outDir, where) {
    return (url) => {
      if (!url || isExternal(url)) return url;
      const [pathPart, ...rest] = url.split('#');
      let hashPart = rest.length ? '#' + rest.join('#') : '';
      if (!pathPart) return url;
      const [p, q] = pathPart.split('?');
      const target = mapTarget(posix.normalize(posix.join(fromDir, decodeURIComponent(p))));
      if (target.moved) hashPart = '';
      if (target.hash) hashPart = '#' + target.hash;
      if (!targetExists(target.path)) warnings.push(`${where}: broken link → ${url}`);
      let out = posix.relative(outDir, target.path) || posix.basename(target.path);
      if (q) out += '?' + q;
      return out + hashPart;
    };
  }

  /* ---------- prepare guide pages ---------- */
  for (const pg of pages) {
    const used = new Set();
    let html = pg.body;
    const heads = [];
    html = html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (all, lvl, attrs = '', inner) => {
      const idm = attrs.match(/\sid="([^"]+)"/);
      let id = idm ? idm[1] : slugify(plain(inner));
      if (used.has(id)) { let n = 2; while (used.has(`${id}-${n}`)) n++; id = `${id}-${n}`; }
      used.add(id);
      if (lvl === '2') heads.push(plain(inner));
      return `<h${lvl}${attrs.replace(/\sid="[^"]*"/, '')} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h${lvl}>`;
    });
    // placeholder links → visible fill-in markers; highlight {{VARS}} in text
    html = html.replace(/<a\b[^>]*?href="([^"]*(?:\{\{|%7B%7B)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (all, url, text) => {
      const ph = decodeURIComponent(url);
      return `<span class="ph-link" title="Placeholder link: replace ${esc(ph)}">${text}</span> <span class="var">${esc(ph)}</span>`;
    });
    html = html.split(/(<[^>]+>)/).map((seg, i, all) => (seg.startsWith('<') || /class="var"/.test(all[i - 1] || '') ? seg : seg.replace(/\{\{\s*([^{}<>]+?)\s*\}\}/g, '<span class="var">{{$1}}</span>'))).join('');
    html = html.replace(/(<div class="table-wrap">\s*)?(<table[\s\S]*?<\/table>)/g, (all, wrapped, table) => (wrapped ? all : `<div class="table-wrap">${table}</div>`));
    const link = makeLinker('memos', 'memos', `site/src/${pg.file}`);
    html = html.replace(/\s(href|src)="([^"]*)"/g, (all, attr, url) => ` ${attr}="${esc(link(url.replace(/&amp;/g, '&')))}"`);
    html = html.replace(/<a\s([^>]*?)href="(https?:[^"]+)"([^>]*)>/g, (all, pre, url, post) => (/target=/.test(pre + post) ? all : `<a ${pre}href="${url}"${post} target="_blank" rel="noopener">`));
    let total = 0;
    html.replace(/<ul\s+class="checklist"[^>]*>([\s\S]*?)<\/ul>/g, (all, inner) => { total += (inner.match(/<li[\s>]/g) || []).length; return all; });
    pg.checks = total;
    pg.html = html;
    pg.heads = heads;
    pg.text = plain(html.replace(/<details\b[^>]*class="sources"[\s\S]*?<\/details>/g, ' '));
  }

  /* ---------- library docs ---------- */
  const libDocs = libFiles.map((src) => {
    const raw = read(P(src));
    const outRel = libOut(src);
    const link = makeLinker(posix.dirname(src), posix.dirname(outRel), src);
    const { html, headings } = renderMarkdown(raw, { link });
    const h1 = headings.find((h) => h.level === 1);
    const base = posix.basename(src, '.md');
    const title = h1 ? h1.text : LIB_EXTRA[src] || titleCase(base);
    const parts = src.split('/');
    let section; let folder;
    if (LIB_EXTRA[src]) { section = 'Docs'; folder = 'docs'; } else if (parts[0] === 'templates') { section = 'Templates'; folder = parts.length > 2 ? parts[1] : 'general'; } else { section = 'Lists'; folder = 'lists'; }
    const body = h1 ? html.replace(new RegExp(`<h1 id="${h1.id}">[\\s\\S]*?<\\/h1>\\n?`), '') : html;
    const firstPara = (body.match(/<p>([\s\S]*?)<\/p>/) || [, ''])[1];
    const checks = (body.match(/<ul class="checklist">/g) || []).length;
    return { src, outRel, title, section, folder, html: body, heads: headings.filter((h) => h.level === 2).map((h) => h.text), raw, text: plain(body), desc: plain(firstPara).slice(0, 160), checks };
  });
  function groupLibrary() {
    const order = [];
    const map = new Map();
    const push = (key, label, it) => { if (!map.has(key)) { map.set(key, { key, label, items: [] }); order.push(key); } map.get(key).items.push(it); };
    const known = Object.keys(FOLDER_LABELS);
    const rank = (f) => (known.indexOf(f) + 1 || 99);
    const tmplFolders = [...new Set(libDocs.filter((d) => d.section === 'Templates').map((d) => d.folder))].sort((a, b) => rank(a) - rank(b));
    for (const f of tmplFolders) libDocs.filter((d) => d.section === 'Templates' && d.folder === f).forEach((d) => push(`templates/${f}`, FOLDER_LABELS[f] || titleCase(f), d));
    libDocs.filter((d) => d.section === 'Lists').forEach((d) => push('lists', 'Lists', d));
    libDocs.filter((d) => d.section === 'Docs').forEach((d) => push('docs', 'How the tools and scripts work', d));
    return order.map((k) => map.get(k));
  }
  const libGroups = groupLibrary();

  /* ---------- shared shell ---------- */
  const drawer = (prefix, activeSlug) => `<nav class="drawer" id="drawer" aria-label="All pages" hidden>
${GROUPS.filter((g) => inGroup(g.name).length).map((g) => `<h2>${esc(g.name)}</h2>${inGroup(g.name).map((p, i) => `<a href="${prefix}${p.url}" data-slug="${p.slug}" data-total="${p.checks}"${p.slug === activeSlug ? ' class="active" aria-current="page"' : ''}><span class="n">${g.id === 'start' ? i + 1 : '·'}</span><span>${esc(p.title)}</span><span class="tick"></span></a>`).join('')}`).join('\n')}
<h2>More</h2><a href="${prefix}index.html#tools"><span class="n">·</span><span>Tools</span></a><a href="${prefix}index.html#library"><span class="n">·</span><span>Templates and lists</span></a>
</nav>`;
  const topbar = (prefix, on) => `<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <a class="brand" href="${prefix}index.html"><span class="logo">F</span><span>Freelance OS</span></a>
  <nav class="topnav" aria-label="Sections">
    <a href="${prefix}index.html#start"${on === 'start' ? ' class="on"' : ''}>Start</a>
    <a href="${prefix}index.html#problems"${on === 'problems' ? ' class="on"' : ''}>Problems</a>
    <a href="${prefix}index.html#later"${['money', 'direct', 'proof'].includes(on) ? ' class="on"' : ''}>Later</a>
    <a href="${prefix}index.html#tools"${on === 'tools' ? ' class="on"' : ''}>Tools</a>
  </nav>
  <div class="top-actions">
    <button class="icon-btn" data-action="menu" aria-controls="drawer" aria-expanded="false" title="All pages">${ICON.menu}<span>All pages</span></button>
    <button class="icon-btn" data-action="print" title="Print or save as PDF" aria-label="Print or save as PDF">${ICON.print}</button>
    <button class="icon-btn" data-action="theme" title="Light or dark" aria-label="Switch between light and dark">${ICON.theme}</button>
  </div>
</header>`;
  const footer = '<footer class="foot"><p>General information, not legal or tax advice. Facts checked November 2026. Ticks are saved in this browser only.</p></footer>';
  // Guide pages keep page furniture to a minimum so the visible text stays near 1,000 words.
  const shortFooter = '<footer class="foot"><p>Not legal or tax advice.</p></footer>';
  const shell = ({ title, description, bodyAttrs, prefix, on, main, activeSlug = '', extraBody = '', foot = footer }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description || '')}">
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%233446d4'/%3E%3Ctext x='16' y='22' font-family='Arial' font-weight='700' font-size='17' fill='white' text-anchor='middle'%3EF%3C/text%3E%3C/svg%3E">
<style>${CSS}</style>
</head>
<body ${bodyAttrs}>
${topbar(prefix, on)}
${drawer(prefix, activeSlug)}
${main}
${foot}
${extraBody}<script>${JS}</script>
</body>
</html>
`;

  /* ---------- write guide pages ---------- */
  for (const pg of pages) {
    const g = GROUP_BY_NAME.get(pg.group);
    const sibs = inGroup(pg.group);
    const i = sibs.indexOf(pg);
    const prev = sibs[i - 1];
    const next = sibs[i + 1];
    const step = g.id === 'start' ? ` · Step ${i + 1} of ${sibs.length}` : '';
    const nextLabel = g.id === 'start' ? 'Next step' : `Next in “${g.name}”`;
    const pager = `<nav class="pager" aria-label="More pages">${prev ? `<a class="prev" href="${prev.slug}.html" title="${esc(prev.title)}">← Back</a>` : `<a class="prev" href="../index.html#${g.id}" title="The map">← Back</a>`}${next ? `<a class="next" href="${next.slug}.html"><small>${nextLabel} →</small>${esc(next.title)}</a>` : `<a class="next" href="../index.html#${g.id}"><small>${g.id === 'start' ? 'Start path finished' : 'Back to'} →</small>The map</a>`}</nav>`;
    const main = `<main id="main" class="page">
  <p class="crumb"><a href="../index.html#${g.id}">${esc(g.name)}</a>${step} · ${esc(pg.time)}</p>
  <h1>${esc(pg.title)}</h1>
  ${pg.checks ? `<div class="page-meta"><span data-progress></span></div><div class="progress-bar" data-progress-bar><i></i></div>` : ''}
  <article class="prose">${pg.html}</article>
  ${pager}
</main>`;
    write(pg.url, shell({ title: `${pg.title} · Freelance OS`, description: pg.summary, bodyAttrs: `data-page="${pg.slug}" data-kind="guide"`, prefix: '../', on: g.id, main, activeSlug: pg.slug, foot: shortFooter }));
  }
  // old addresses keep working
  const redirect = (to) => `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"><title>Moved</title><a href="${to}">This page moved. Continue</a>`;
  const stubs = [];
  for (const [oldSlug, newSlug] of Object.entries(MOVED)) {
    if (pageBySlug.has(oldSlug) || !pageBySlug.has(newSlug)) continue;
    write(`memos/${oldSlug}.html`, redirect(`${newSlug}.html`));
    stubs.push(`memos/${oldSlug}.html`);
  }

  /* ---------- write library pages ---------- */
  for (const d of libDocs) {
    const depth = d.outRel.split('/').length - 1;
    const prefix = '../'.repeat(depth);
    const srcLink = posix.relative(posix.dirname(d.outRel), d.src);
    const crumb = d.section === 'Templates' ? `Template · ${FOLDER_LABELS[d.folder] || titleCase(d.folder)}` : d.section === 'Docs' ? 'Guide to the tools' : 'List';
    const main = `<main id="main" class="page page--wide">
  <p class="crumb"><a href="${prefix}index.html#library">Templates and lists</a> · ${esc(crumb)}</p>
  <h1>${esc(d.title)}</h1>
  ${d.checks ? '<div class="page-meta"><span data-progress></span></div>' : ''}
  <div class="doc-actions"><button class="btn sm primary" type="button" data-action="copy-source">Copy as Markdown</button><a class="btn sm" href="${esc(srcLink)}">Open the .md file</a><button class="btn sm" type="button" data-action="print">Print / PDF</button></div>
  <article class="prose">${d.html}</article>
</main>`;
    write(d.outRel, shell({
      title: `${d.title} · Freelance OS`, description: d.desc, bodyAttrs: `data-page="lib-${slugify(d.src)}" data-kind="library"`, prefix, on: '', main,
      extraBody: `<script type="text/markdown" id="md-source">${d.raw.replace(/<\/script/gi, '<\\/script')}</script>\n`,
    }));
  }

  /* ---------- the map (index.html) ---------- */
  const tools = TOOLS.filter((t) => exists(P('tools', t.file)));
  const start = inGroup('Start here');
  const problems = inGroup('Fix a problem');
  const pathList = start.map((p) => `<li><a href="${p.url}" data-slug="${p.slug}" data-total="${p.checks}" data-path="start"><b>${esc(p.title)}</b><span>${esc(p.summary)}</span><em></em></a></li>`).join('');
  const linkList = (list, withSummary = false) => `<ul class="links">${list.map((p) => `<li><a href="${p.url}" data-slug="${p.slug}" data-total="${p.checks}">${esc(p.title)}${withSummary && p.summary ? `<span>${esc(p.summary)}</span>` : ''}</a></li>`).join('')}</ul>`;
  const laterGroups = GROUPS.filter((g) => ['money', 'direct', 'proof'].includes(g.id) && inGroup(g.name).length);
  const scriptsDoc = libDocs.find((d) => d.src === 'scripts/README.md');
  const index = [
    ...pages.map((p) => ({ t: p.title, u: p.url, k: p.group, s: p.summary, h: p.heads, x: p.text.slice(0, 1200), w: 3 })),
    ...tools.map((t) => ({ t: t.name, u: `tools/${t.file}`, k: 'Tool', s: t.desc, h: [], x: '', w: 1 })),
    ...libDocs.map((d) => ({ t: d.title, u: d.outRel, k: d.section === 'Templates' ? `Template · ${FOLDER_LABELS[d.folder] || titleCase(d.folder)}` : d.section === 'Lists' ? 'List' : 'Guide to the tools', s: d.desc, h: d.heads, x: d.text.slice(0, 500), w: 0 })),
  ];
  const hub = `<main id="main" class="hub">
  <div class="hero">
    <p class="eyebrow">Freelance OS · Parth Kulkarni</p>
    <h1>Start on Upwork. One short page at a time.</h1>
    <p>You are a freelancer first. The business parts come later, in small steps.</p>
    <p>Read one page a day. Each takes about 10 minutes and ends with a few small actions.</p>
    <div class="cta">${start[0] ? `<a class="btn primary" data-continue href="${start[0].url}">Start: step 1 →</a>` : ''}<a class="btn" href="#problems">I have a problem</a></div>
    <p class="overall" data-overall></p>
    <div class="progress-bar" data-overall-bar><i></i></div>
  </div>

  <div class="search-wrap" role="search">
    <span class="s-ico" aria-hidden="true">⌕</span>
    <input id="hub-search" type="search" placeholder="Search: fee, scam, proposal, tax, review…" autocomplete="off" aria-label="Search all pages">
  </div>
  <div id="hub-results" class="results" aria-live="polite"></div>

  <section id="start">
    <h2>Start here</h2>
    <p class="sub">${esc(GROUP_BY_NAME.get('Start here').blurb)}</p>
    <ol class="path">${pathList}</ol>
  </section>

  <section id="problems">
    <h2>Fix a problem</h2>
    <p class="sub">${esc(GROUP_BY_NAME.get('Fix a problem').blurb)}</p>
    ${linkList(problems)}
  </section>

  <section id="later" class="later">
    <h2>For later</h2>
    <p class="sub">You do not need these in your first weeks. Come back when the moment arrives.</p>
    ${laterGroups.map((g) => `<h3 id="${g.id}">${esc(g.name)} — ${esc(g.blurb.replace(/\.$/, '').toLowerCase())}</h3>${linkList(inGroup(g.name))}`).join('\n    ')}
  </section>

  <section id="tools">
    <h2>Tools</h2>
    <p class="sub">Small apps that run in this browser. Nothing is sent anywhere.</p>
    <ul class="links">${tools.map((t) => `<li><a href="tools/${t.file}">${esc(t.name)}<span>${esc(t.desc)}</span></a></li>`).join('')}${scriptsDoc ? `<li><a href="${scriptsDoc.outRel}">Lead-finding scripts<span>Small programs that collect possible clients into a file.</span></a></li>` : ''}</ul>
  </section>

  <section id="library">
    <h2>Templates and lists</h2>
    <p class="sub">Ready-made messages, contracts and reference lists. The guide pages link to the one you need.</p>
    <details class="more"><summary>Show all ${libDocs.length} documents</summary>
      <div class="lib-cols">${libGroups.map((g) => `<div><h3>${esc(g.label)}</h3><ul>${g.items.map((it) => `<li><a href="${it.outRel}">${esc(it.title)}</a></li>`).join('')}</ul></div>`).join('')}</div>
    </details>
  </section>
</main>`;
  write('index.html', shell({
    title: 'Freelance OS — Parth Kulkarni', description: 'A short, step-by-step guide to starting as a freelancer on Upwork, with tools and templates.',
    bodyAttrs: 'data-page="hub" data-kind="hub"', prefix: '', on: '', main: hub,
    extraBody: `<script>window.FOS_INDEX=${JSON.stringify(index).replace(/</g, '\\u003c')};</script>\n`,
  }));
  write('memos/index.html', redirect('../index.html#start'));
  write('library/index.html', redirect('../index.html#library'));

  // remove stale generated files
  const keep = new Set(['index.html', ...pages.map((p) => p.url), ...stubs, 'memos/index.html', 'library/index.html', ...libDocs.map((d) => d.outRel)]);
  for (const dir of ['memos', 'library']) for (const f of walk(P(dir))) if (!keep.has(rel(f))) fs.unlinkSync(f);

  const uniq = [...new Set(warnings)];
  console.log(`✓ built ${pages.length} guide pages, ${libDocs.length} library pages, map (${tools.length} tools) in ${Date.now() - t0} ms`);
  if (uniq.length) console.log(`⚠ ${uniq.length} warning(s):\n  - ${uniq.join('\n  - ')}`);
  return { warnings: uniq, pages };
}

const { warnings, pages } = build();
if (process.argv.includes('--strict')) {
  let bad = 0;
  for (const p of pages) {
    const r = lintPage(P('site/src', p.file));
    if (r.fails.length) { bad++; console.log(`✗ ${r.file} (${r.words} words)\n   - ${r.fails.join('\n   - ')}`); }
  }
  if (bad) console.log(`✗ ${bad} page(s) fail the writing checks (see site/WRITING.md)`);
  else console.log(`✓ all ${pages.length} guide pages pass the writing checks`);
  if (warnings.length || bad) process.exit(1);
}
if (process.argv.includes('--watch')) {
  let timer = null;
  const targets = ['site', 'templates', 'lists', 'tools', 'scripts'].map((d) => P(d)).filter(exists);
  for (const t of targets) {
    fs.watch(t, { recursive: true }, (_e, f) => {
      if (f && /(^|[\\/])(memos|library|out)[\\/]/.test(f)) return;
      clearTimeout(timer);
      timer = setTimeout(() => { try { build(); } catch (e) { console.error(e); } }, 150);
    });
  }
  console.log('… watching for changes (Ctrl+C to stop)');
}
