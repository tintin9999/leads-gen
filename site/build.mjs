#!/usr/bin/env node
// Freelance OS — zero-dependency static site build.
//   node site/build.mjs           build once
//   node site/build.mjs --watch   rebuild on changes
// Inputs : site/src/*.html (memo fragments), templates/**/*.md, lists/*.md, scripts/README.md, tools/README.md
// Outputs: index.html (hub), memos/*.html, library/**/*.html — all self-contained (CSS/JS inlined).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderMarkdown, esc, slugify } from './lib/markdown.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...p) => path.join(ROOT, ...p);
const posix = path.posix;
const GROUP_ORDER = ['Strategy', 'Foundation', 'Revenue', 'Operations', 'Growth', 'Execution'];
const LIB_DIRS = ['templates', 'lists'];
const LIB_EXTRA = { 'scripts/README.md': 'Prospecting scripts', 'tools/README.md': 'Tools guide' };
const TOOL_INFO = {
  'crm.html': { name: 'Pipeline CRM', ico: '◎', desc: 'Kanban pipeline, follow-up queue, lead scoring, dashboard. Imports CSVs from the prospecting scripts.' },
  'outreach-composer.html': { name: 'Outreach Composer', ico: '✉', desc: 'Personalised messages from proven templates; logs every touch back into the CRM.' },
  'proposal-builder.html': { name: 'Proposal Builder', ico: '✎', desc: 'Three-option proposals from your offer presets → print to PDF.' },
  'rate-calculator.html': { name: 'Rate, Tax & Runway', ico: '₹', desc: 'Minimum viable rate, India tax under the presumptive scheme, runway and project quotes.' },
  'invoice-generator.html': { name: 'Invoice Generator', ico: '⎙', desc: 'GST, non-GST and export-under-LUT invoices with numbering and an invoice register.' },
};
const TOOL_ORDER = Object.keys(TOOL_INFO);
const FOLDER_LABELS = { contracts: 'Contracts', delivery: 'Delivery', finance: 'Finance', outreach: 'Outreach', sales: 'Sales', portfolio: 'Portfolio & brand' };

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

function build() {
  const t0 = Date.now();
  const warnings = [];
  const CSS = read(P('site/assets/style.css'));
  const JS = read(P('site/assets/app.js'));

  /* ---------- load memos ---------- */
  const memos = (exists(P('site/src')) ? fs.readdirSync(P('site/src')) : [])
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
      return {
        file, slug, num,
        body: m ? raw.slice(m.index + m[0].length) : raw,
        title: meta.title || titleCase(slug.replace(/^\d+-/, '')),
        subtitle: meta.subtitle || '',
        order: Number.isFinite(meta.order) ? meta.order : parseInt(num || '99', 10),
        group: meta.group || 'Other',
        summary: meta.summary || '',
        reading: meta.reading || '',
        url: `memos/${slug}.html`,
      };
    })
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
  const memoBySlug = new Map(memos.map((m) => [m.slug, m]));

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
    if (clean.endsWith('.md') && libSet.has(clean)) return libOut(clean);
    if (clean === 'README.md' || clean === '' || clean === '.') return 'index.html';
    if (clean.endsWith('.md')) return clean; // unknown md: leave (link checker reports)
    if (exists(P(clean)) && fs.statSync(P(clean)).isDirectory()) {
      if (LIB_DIRS.some((d) => clean === d || clean.startsWith(d + '/'))) return `index.html#lib-${slugify(clean)}`;
      if (clean === 'memos') return 'index.html#memos';
      if (clean === 'tools') return 'index.html#tools';
      if (clean === 'scripts' && libSet.has('scripts/README.md')) return libOut('scripts/README.md');
    }
    if (/^memos\/[^/]+\.html$/.test(clean)) return clean;
    return clean;
  }
  function targetExists(t) {
    const p = t.split('#')[0];
    if (!p || p === 'index.html') return true;
    if (p.startsWith('memos/')) return memoBySlug.has(p.slice(6).replace(/\.html$/, ''));
    if (p.startsWith('library/')) return libSet.has(p.slice(8).replace(/\.html$/, '.md'));
    return exists(P(p));
  }
  function makeLinker(fromDir, outDir, where) {
    return (url) => {
      if (!url || isExternal(url)) return url;
      const [pathPart, ...rest] = url.split('#');
      const hashPart = rest.length ? '#' + rest.join('#') : '';
      if (!pathPart) return url;
      const [p, q] = pathPart.split('?');
      const target = mapTarget(posix.normalize(posix.join(fromDir, decodeURIComponent(p))));
      const [tPath, tHash] = target.split('#');
      if (!targetExists(tPath)) warnings.push(`${where}: broken link → ${url}`);
      let out = posix.relative(outDir, tPath) || posix.basename(tPath);
      if (q) out += '?' + q;
      return out + (tHash ? '#' + tHash : hashPart);
    };
  }

  /* ---------- shared layout ---------- */
  const mobileSections = (prefix) => `<div class="nav-group mobile-only"><div class="nav-group-title">Sections</div><a class="nav-link" href="${prefix}index.html">Home</a><a class="nav-link" href="${prefix}index.html#memos">Memos</a><a class="nav-link" href="${prefix}index.html#tools">Tools</a><a class="nav-link" href="${prefix}index.html#library">Templates</a><a class="nav-link" href="${prefix}index.html#lists">Lists</a></div>`;
  const navMemos = (prefix, activeSlug) => {
    const groups = [...new Set([...GROUP_ORDER.filter((g) => memos.some((m) => m.group === g)), ...memos.map((m) => m.group)])];
    return mobileSections(prefix) + groups.map((g) => `<div class="nav-group"><div class="nav-group-title">${esc(g)}</div>${memos
      .filter((m) => m.group === g)
      .map((m) => `<a class="nav-link${m.slug === activeSlug ? ' active' : ''}" href="${prefix}${m.url}"${m.slug === activeSlug ? ' aria-current="page"' : ''}><span class="nav-num">${esc(m.num)}</span><span>${esc(m.title.split(':')[0])}</span><span class="nav-prog" data-nav-prog="${m.slug}" data-total="${m.checklistTotal || 0}"></span></a>`)
      .join('')}</div>`).join('');
  };
  const navLibrary = (prefix, activeSrc) => {
    const sections = groupLibrary();
    return mobileSections(prefix) + `<div class="nav-group"><a class="nav-link" href="${prefix}index.html#memos">← All memos</a><a class="nav-link" href="${prefix}index.html#tools">Tools</a></div>` +
      sections.map((s) => `<div class="nav-group"><div class="nav-group-title">${esc(s.label)}</div>${s.items
        .map((it) => `<a class="nav-link${it.src === activeSrc ? ' active' : ''}" href="${prefix}${libOut(it.src)}"><span>${esc(it.title)}</span></a>`)
        .join('')}</div>`).join('');
  };
  const topbar = (prefix, on) => `<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <button class="icon-btn menu-btn" data-action="menu" aria-label="Open navigation"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
  <a class="brand" href="${prefix}index.html"><span class="logo">F</span><span>Freelance OS</span></a>
  <nav class="topnav" aria-label="Sections">
    <a href="${prefix}index.html#memos"${on === 'memos' ? ' class="on"' : ''}>Memos</a>
    <a href="${prefix}index.html#tools"${on === 'tools' ? ' class="on"' : ''}>Tools</a>
    <a href="${prefix}index.html#library"${on === 'library' ? ' class="on"' : ''}>Templates</a>
    <a href="${prefix}index.html#lists">Lists</a>
    <a href="${prefix}index.html#automation">Scripts</a>
  </nav>
  <div class="top-actions">
    <button class="icon-btn" data-action="print" title="Print or save as PDF" aria-label="Print or save as PDF"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg><span>PDF</span></button>
    <button class="icon-btn" data-action="theme" title="Toggle light/dark" aria-label="Toggle light or dark theme"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
  </div>
</header>`;
  const footer = `<footer class="foot"><p>Freelance OS · research current as of November 2026 · General information, not legal or tax advice. Confirm tax and legal items with a CA or lawyer before acting.</p><p>Checklist ticks and tool data are saved in this browser only.</p></footer>`;
  const page = ({ title, description, bodyAttrs, prefix, on, shellInner, extraHead = '', extraBody = '' }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description || '')}">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%233446d4'/%3E%3Ctext x='16' y='22' font-family='Arial' font-weight='700' font-size='17' fill='white' text-anchor='middle'%3EF%3C/text%3E%3C/svg%3E">
<style>${CSS}</style>${extraHead}
</head>
<body ${bodyAttrs}>
${topbar(prefix, on)}
${shellInner}
${footer}
${extraBody}<script>${JS}</script>
</body>
</html>
`;
  const tocHtml = (toc) => toc.map((t) => `<a href="#${esc(t.id)}">${esc(t.text)}</a>`).join('');

  /* ---------- memos ---------- */
  for (const m of memos) {
    const toc = [];
    const used = new Set();
    let html = m.body;
    html = html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (all, lvl, attrs = '', inner) => {
      const idm = attrs.match(/\sid="([^"]+)"/);
      let id = idm ? idm[1] : slugify(plain(inner));
      if (used.has(id)) { let n = 2; while (used.has(`${id}-${n}`)) n++; id = `${id}-${n}`; }
      used.add(id);
      const cleanAttrs = attrs.replace(/\sid="[^"]*"/, '');
      if (lvl === '2') toc.push({ id, text: plain(inner) });
      return `<h${lvl}${cleanAttrs} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h${lvl}>`;
    });
    // placeholder links → visible fill-in markers; highlight {{VARS}} in text nodes
    html = html.replace(/<a\b[^>]*?href="([^"]*(?:\{\{|%7B%7B)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (all, url, text) => {
      const ph = decodeURIComponent(url);
      return `<span class="ph-link" title="Placeholder link: replace ${esc(ph)}">${text}</span> <span class="var">${esc(ph)}</span>`;
    });
    html = html.split(/(<[^>]+>)/).map((seg, i, all) => (seg.startsWith('<') || /class="var"/.test(all[i - 1] || '') ? seg : seg.replace(/\{\{\s*([^{}<>]+?)\s*\}\}/g, '<span class="var">{{$1}}</span>'))).join('');
    html = html.replace(/(<div class="table-wrap">\s*)?(<table[\s\S]*?<\/table>)/g, (all, wrapped, table) => (wrapped ? all : `<div class="table-wrap">${table}</div>`));
    const link = makeLinker('memos', 'memos', `site/src/${m.file}`);
    html = html.replace(/\s(href|src)="([^"]*)"/g, (all, attr, url) => ` ${attr}="${esc(link(url.replace(/&amp;/g, '&')))}"`);
    html = html.replace(/<a\s([^>]*?)href="(https?:[^"]+)"([^>]*)>/g, (all, pre, url, post) => (/target=/.test(pre + post) ? all : `<a ${pre}href="${url}"${post} target="_blank" rel="noopener">`));
    let total = 0;
    html.replace(/<ul\s+class="checklist"[^>]*>([\s\S]*?)<\/ul>/g, (all, inner) => { total += (inner.match(/<li[\s>]/g) || []).length; return all; });
    m.checklistTotal = total;
    m.html = html;
    m.toc = toc;
    m.text = plain(html);
  }
  memos.forEach((m, i) => {
    const prev = memos[i - 1];
    const next = memos[i + 1];
    const shellInner = `<div class="shell">
<aside class="sidenav" aria-label="All memos">${navMemos('../', m.slug)}</aside>
<main id="main" class="content">
  <div class="doc-head">
    <div class="eyebrow">${esc(m.group)} · Memo ${esc(m.num)}</div>
    <h1>${esc(m.title)}</h1>
    ${m.subtitle ? `<p class="subtitle">${esc(m.subtitle)}</p>` : ''}
    <div class="doc-meta">${m.reading ? `<span>⏱ ${esc(m.reading)} read</span><span class="sep">·</span>` : ''}<span data-progress></span>${m.checklistTotal ? `<span class="sep">·</span><button class="btn sm" data-action="reset-checks" type="button">Reset ticks</button>` : ''}</div>
    ${m.checklistTotal ? '<div class="progress-bar" data-progress-bar><i></i></div>' : ''}
  </div>
  ${m.toc.length ? `<details class="toc-inline card"><summary><strong>On this page</strong></summary>${tocHtml(m.toc)}</details>` : ''}
  <article class="prose">${m.html}</article>
  <nav class="pager" aria-label="Memo navigation">${prev ? `<a class="prev" href="${prev.slug}.html"><small>← Previous</small>${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="next" href="${next.slug}.html"><small>Next →</small>${esc(next.title)}</a>` : ''}</nav>
</main>
<aside class="toc" aria-label="On this page">${m.toc.length ? `<div class="toc-title">On this page</div>${tocHtml(m.toc)}` : ''}</aside>
</div>`;
    write(m.url, page({
      title: `${m.title} · Freelance OS`,
      description: m.summary,
      bodyAttrs: `data-page="${m.slug}" data-kind="memo"`,
      prefix: '../', on: 'memos', shellInner,
    }));
  });

  /* ---------- library ---------- */
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
    if (LIB_EXTRA[src]) { section = 'Docs'; folder = 'docs'; } else if (parts[0] === 'templates') { section = 'Templates'; folder = parts.length > 2 ? parts[1] : 'general'; } else { section = 'Lists & resources'; folder = 'lists'; }
    const body = h1 ? html.replace(new RegExp(`<h1 id="${h1.id}">[\\s\\S]*?<\\/h1>\\n?`), '') : html;
    const firstPara = (body.match(/<p>([\s\S]*?)<\/p>/) || [, ''])[1];
    const checks = (body.match(/<ul class="checklist">/g) || []).length;
    return { src, outRel, title, section, folder, html: body, toc: headings.filter((h) => h.level === 2), raw, text: plain(body), desc: plain(firstPara).slice(0, 180), checks };
  });
  function groupLibrary() {
    const order = [];
    const map = new Map();
    const push = (key, label, it) => { if (!map.has(key)) { map.set(key, { key, label, items: [] }); order.push(key); } map.get(key).items.push(it); };
    const tmplFolders = [...new Set(libDocs.filter((d) => d.section === 'Templates').map((d) => d.folder))].sort((a, b) => Object.keys(FOLDER_LABELS).indexOf(a) - Object.keys(FOLDER_LABELS).indexOf(b));
    for (const f of tmplFolders) libDocs.filter((d) => d.section === 'Templates' && d.folder === f).forEach((d) => push(`templates/${f}`, `Templates · ${FOLDER_LABELS[f] || titleCase(f)}`, d));
    libDocs.filter((d) => d.section === 'Lists & resources').forEach((d) => push('lists', 'Lists & resources', d));
    libDocs.filter((d) => d.section === 'Docs').forEach((d) => push('docs', 'Docs', d));
    return order.map((k) => map.get(k));
  }
  for (const d of libDocs) {
    const depth = d.outRel.split('/').length - 1;
    const prefix = '../'.repeat(depth);
    const srcLink = posix.relative(posix.dirname(d.outRel), d.src);
    const crumb = d.section === 'Templates' ? `Template · ${FOLDER_LABELS[d.folder] || titleCase(d.folder)}` : d.section === 'Docs' ? 'Documentation' : 'List / resource';
    const shellInner = `<div class="shell">
<aside class="sidenav" aria-label="Library">${navLibrary(prefix, d.src)}</aside>
<main id="main" class="content">
  <div class="doc-head">
    <div class="eyebrow">${esc(crumb)}</div>
    <h1>${esc(d.title)}</h1>
    <div class="doc-meta"><span><code>${esc(d.src)}</code></span>${d.checks ? '<span class="sep">·</span><span data-progress></span>' : ''}</div>
    <div class="doc-actions"><button class="btn sm primary" type="button" data-action="copy-source">Copy as Markdown</button><a class="btn sm" href="${esc(srcLink)}">Open .md source</a><button class="btn sm" type="button" data-action="print">Print / PDF</button></div>
  </div>
  ${d.toc.length > 1 ? `<details class="toc-inline card"><summary><strong>On this page</strong></summary>${tocHtml(d.toc)}</details>` : ''}
  <article class="prose">${d.html}</article>
</main>
<aside class="toc" aria-label="On this page">${d.toc.length > 1 ? `<div class="toc-title">On this page</div>${tocHtml(d.toc)}` : ''}</aside>
</div>`;
    write(d.outRel, page({
      title: `${d.title} · Freelance OS`,
      description: d.desc,
      bodyAttrs: `data-page="lib-${slugify(d.src)}" data-kind="library"`,
      prefix, on: d.section === 'Templates' ? 'library' : '', shellInner,
      extraBody: `<script type="text/markdown" id="md-source">${d.raw.replace(/<\/script/gi, '<\\/script')}</script>\n`,
    }));
  }

  /* ---------- tools ---------- */
  const toolFiles = exists(P('tools')) ? fs.readdirSync(P('tools')).filter((f) => f.endsWith('.html')) : [];
  const tools = toolFiles
    .sort((a, b) => (TOOL_ORDER.indexOf(a) + 1 || 99) - (TOOL_ORDER.indexOf(b) + 1 || 99))
    .map((f) => {
      const raw = read(P('tools', f));
      const t = (raw.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1].replace(/\s*[·|—-]\s*Freelance OS\s*$/i, '').trim();
      const d = (raw.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [, ''])[1];
      const info = TOOL_INFO[f] || {};
      return { file: f, url: `tools/${f}`, name: info.name || t || titleCase(f.replace(/\.html$/, '')), desc: info.desc || d, ico: info.ico || '◆' };
    });

  /* ---------- hub ---------- */
  const groupsPresent = [...new Set([...GROUP_ORDER.filter((g) => memos.some((m) => m.group === g)), ...memos.map((m) => m.group)])];
  const memoCards = groupsPresent.map((g) => `<div class="group-title">${esc(g)}</div><div class="cards">${memos.filter((m) => m.group === g).map((m) => `
    <a class="mcard" href="${m.url}"><span class="num">MEMO ${esc(m.num)}</span><h3>${esc(m.title)}</h3><p>${esc(m.summary || m.subtitle)}</p>
    <span class="meta"><span>${m.reading ? `⏱ ${esc(m.reading)}` : ''}${m.checklistTotal ? ` · ${m.checklistTotal} actions` : ''}</span>${m.checklistTotal ? `<span class="mini-bar" data-nav-prog="${m.slug}" data-total="${m.checklistTotal}"><i></i></span>` : ''}</span></a>`).join('')}</div>`).join('');
  const toolCards = tools.map((t) => `<a class="mcard tool-card" href="${t.url}"><span class="ico">${esc(t.ico)}</span><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p><span class="meta"><span>Opens in your browser · data stays local</span></span></a>`).join('');
  const libGroups = groupLibrary();
  const libBox = (g) => `<div class="lib-box" id="lib-${slugify(g.key)}"><h3>${esc(g.label.replace(/^Templates · /, ''))}<small>${g.items.length}</small></h3><ul>${g.items.map((it) => `<li><a href="${it.outRel}">${esc(it.title)}</a></li>`).join('')}</ul></div>`;
  const tmplBoxes = libGroups.filter((g) => g.key.startsWith('templates/')).map(libBox).join('');
  const listBoxes = libGroups.filter((g) => !g.key.startsWith('templates/')).map(libBox).join('');
  const memoLink = (slug, label, sub, step) => {
    const m = memos.find((x) => x.slug.startsWith(slug));
    return m ? `<a href="${m.url}"><i>${step}</i><b>${esc(label)}</b><span>${esc(sub)}</span></a>` : `<a aria-disabled="true"><i>${step}</i><b>${esc(label)}</b><span>${esc(sub)}</span></a>`;
  };
  const baseLink = (slug, label, sub) => {
    const m = memos.find((x) => x.slug.startsWith(slug));
    return m ? `<a href="${m.url}">${esc(label)}<span>${esc(sub)}</span></a>` : '';
  };
  const flow = [
    ['01', 'Position', 'Pick offers & a niche', '1'], ['04', 'Price', 'Rates, packages, tiers', '2'], ['05', 'Find leads', 'Warm, outbound, platforms', '3'],
    ['06', 'Sell', 'Call → proposal → yes', '4'], ['07', 'Contract', 'MSA + SOW + deposit', '5'], ['08', 'Deliver', 'Kickoff → handover', '6'],
    ['03', 'Get paid', 'Invoices, GST, tax', '7'], ['09', 'Compound', 'Proof, referrals, retainers', '8'],
  ].map(([s, l, sub, n]) => memoLink(s, l, sub, n)).join('');
  const flowBase = [
    baseLink('00', 'Start here', 'How this OS works'), baseLink('02', 'Business setup', 'Entity, bank, GST, Udyam, insurance'),
    baseLink('10', '90-day launch plan', 'Week-by-week execution'), baseLink('11', 'Risks & scams', 'Protect money, code, identity'),
    baseLink('12', 'Metrics & cadence', 'Daily / weekly / monthly rhythm'),
  ].join('');

  const index = [
    ...memos.map((m) => ({ t: m.title, u: m.url, k: `Memo ${m.num}`, s: m.summary, h: m.toc.map((t) => t.text), x: m.text.slice(0, 900) })),
    ...libDocs.map((d) => ({ t: d.title, u: d.outRel, k: d.section === 'Templates' ? `Template · ${FOLDER_LABELS[d.folder] || titleCase(d.folder)}` : d.section, s: d.desc, h: d.toc.map((t) => t.text), x: d.text.slice(0, 600) })),
    ...tools.map((t) => ({ t: t.name, u: t.url, k: 'Tool', s: t.desc, h: [], x: '' })),
  ];
  const nTemplates = libDocs.filter((d) => d.section === 'Templates').length;
  const nLists = libDocs.filter((d) => d.section === 'Lists & resources').length;
  const first = memos[0];
  const plan = memos.find((m) => m.slug.startsWith('10'));
  const hubInner = `<main id="main" class="hub">
  <section class="hero">
    <div>
      <div class="eyebrow">Freelance OS · Parth Kulkarni</div>
      <h1>Run your freelancing like a business — from day one.</h1>
      <p class="lede">An operating system for going from zero leads to a steady, well-paid pipeline: positioning, India-specific setup and tax, pricing, lead generation, sales, contracts, delivery — plus the tools and scripts to run it. Built around what you've already shipped: Cultus, Deribit, Twinntax and Bro.</p>
      <div class="cta">${first ? `<a class="btn primary" href="${first.url}">Start here →</a>` : ''}${plan ? `<a class="btn" href="${plan.url}">90-day plan</a>` : ''}${tools.some((t) => t.file === 'crm.html') ? '<a class="btn" href="tools/crm.html">Open the CRM</a>' : ''}</div>
    </div>
    <div class="hero-side">
      <div class="stat-grid">
        <div class="stat"><b>${memos.length}</b><span>strategy memos</span></div>
        <div class="stat"><b>${tools.length}</b><span>working tools</span></div>
        <div class="stat"><b>${nTemplates}</b><span>copy-paste templates</span></div>
        <div class="stat"><b>${nLists}</b><span>resource lists</span></div>
      </div>
      <div class="overall"><div data-overall>Tick actions inside memos to track progress.</div><div class="progress-bar" data-overall-bar><i></i></div></div>
    </div>
  </section>

  <div class="search-wrap" role="search">
    <span class="s-ico" aria-hidden="true">⌕</span>
    <input id="hub-search" type="search" placeholder="Search memos, templates, lists and tools…  e.g. GST, Upwork, kill fee, LUT" autocomplete="off" aria-label="Search">
    <kbd>/</kbd>
  </div>
  <div id="hub-results" class="results" aria-live="polite"></div>

  <div class="section-head"><h2>How the business works</h2><p>Each step links to its memo. It's a loop: step 8 feeds step 3.</p></div>
  <div class="flow">${flow}</div>
  <div class="flow-base">${flowBase}</div>

  <div class="section-head" id="memos"><h2>Memos</h2><p>Decision memos with checklists — ticks are saved in this browser.</p></div>
  ${memoCards || '<p>No memos built yet.</p>'}

  <div class="section-head" id="tools"><h2>Tools</h2><p>Single-file apps. No install, no server, nothing leaves your machine. Export backups weekly.</p></div>
  <div class="cards">${toolCards || '<p>No tools yet.</p>'}</div>

  <div class="section-head" id="library"><h2>Templates</h2><p>Contracts, outreach, sales, delivery and finance templates. Each page has “Copy as Markdown”.</p></div>
  <div class="lib-cols">${tmplBoxes || '<p>No templates yet.</p>'}</div>

  <div class="section-head" id="lists"><h2>Lists & resources</h2><p>Platforms, lead sources, communities, rates, payment rails and more.</p></div>
  <div class="lib-cols">${listBoxes || '<p>No lists yet.</p>'}</div>

  <div class="section-head" id="automation"><h2>Prospecting scripts</h2><p>Node ≥ 18, zero dependencies. Output CSVs import straight into the CRM.</p></div>
  <div class="lib-cols">
    <div class="lib-box"><h3>Run</h3><div class="cmd">npm run hn        # HN "Seeking freelancer" + contract roles
npm run audit -- scripts/sample-domains.txt   # stack + speed hooks
npm run funding   # fresh funding news → "just raised" prospects
npm run reddit    # r/forhire &amp; builder subs (best effort)</div></div>
    <div class="lib-box"><h3>Then</h3><ul><li>Open <code>out/*.csv</code> → <a href="tools/crm.html">CRM</a> → Import CSV</li><li>Personalise each message in the <a href="tools/outreach-composer.html">Outreach Composer</a></li>${libSet.has('scripts/README.md') ? `<li><a href="${libOut('scripts/README.md')}">Read the scripts guide</a></li>` : ''}</ul></div>
  </div>
</main>`;
  write('index.html', page({
    title: 'Freelance OS — Parth Kulkarni',
    description: 'Operating system for a solo software freelancing business: memos, tools, templates and lists.',
    bodyAttrs: 'data-page="hub" data-kind="hub"',
    prefix: '', on: '', shellInner: hubInner,
    extraBody: `<script>window.FOS_INDEX=${JSON.stringify(index).replace(/</g, '\\u003c')};</script>\n`,
  }));

  // directory index fallbacks (GitHub Pages has no directory listing)
  const redirect = (to) => `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${to}"><title>Redirect</title><a href="${to}">Continue</a>`;
  write('memos/index.html', redirect('../index.html#memos'));
  write('library/index.html', redirect('../index.html#library'));

  // remove stale generated files
  const keep = new Set(['index.html', ...memos.map((m) => m.url), 'memos/index.html', 'library/index.html', ...libDocs.map((d) => d.outRel)]);
  for (const dir of ['memos', 'library']) for (const f of walk(P(dir))) if (!keep.has(rel(f))) fs.unlinkSync(f);

  const uniq = [...new Set(warnings)];
  console.log(`✓ built ${memos.length} memos, ${libDocs.length} library pages, hub (${tools.length} tools) in ${Date.now() - t0} ms`);
  if (uniq.length) console.log(`⚠ ${uniq.length} warning(s):\n  - ${uniq.join('\n  - ')}`);
  return uniq;
}

const warnings = build();
if (process.argv.includes('--strict') && warnings.length) process.exit(1);
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
