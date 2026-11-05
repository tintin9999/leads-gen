// Tiny zero-dependency Markdown → HTML renderer (GFM subset).
// Supports: headings, paragraphs, emphasis, code spans/fences, links/autolinks,
// images, nested lists, task lists (→ persistent checklists), tables, blockquotes,
// horizontal rules, raw HTML blocks, and {{template_variables}} highlighting.

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function slugify(text) {
  return (
    String(text)
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/&[#\w]+;/g, '')
      .replace(/[`*_~[\]()]/g, '')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80) || 'section'
  );
}

const ALLOWED_INLINE = /&lt;(\/?)(br|kbd|sup|sub|mark|small|u|b|i|s)(\s*\/?)&gt;/gi;

export function inline(src, ctx = {}) {
  const link = ctx.link || ((u) => u);
  const stash = [];
  const keep = (html) => {
    stash.push(html);
    return `\u0001${stash.length - 1}\u0002`;
  };
  let s = String(src);

  // code spans
  s = s.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (_, _t, code) => keep(`<code>${esc(code.trim())}</code>`));
  // backslash escapes
  s = s.replace(/\\([\\`*_{}\[\]()#+\-.!|>~<])/g, (_, ch) => keep(esc(ch)));
  // images
  s = s.replace(/!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"([^"]*)")?\s*\)/g, (_, alt, url, title) =>
    keep(`<img src="${esc(link(url))}" alt="${esc(alt)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy">`),
  );
  // links (text stays in stream so emphasis inside link text still renders)
  s = s.replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\(\s*<?([^)\s>]+)>?(?:\s+"([^"]*)")?\s*\)/g, (_, text, url, title) => {
    if (url.includes('{{') || /%7B%7B/i.test(url)) {
      const ph = decodeURIComponent(url);
      return keep(`<span class="ph-link" title="Placeholder link: replace ${esc(ph)}">`) + text + keep(`</span> <span class="var">${esc(ph)}</span>`);
    }
    const href = link(url);
    const ext = /^https?:/i.test(href);
    return (
      keep(`<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>`) +
      text +
      keep('</a>')
    );
  });
  // autolinks
  s = s.replace(/<(https?:\/\/[^\s>]+)>/g, (_, url) =>
    keep(`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a>`),
  );
  s = s.replace(/<([\w.+-]+@[\w-]+\.[\w.-]+)>/g, (_, em) => keep(`<a href="mailto:${esc(em)}">${esc(em)}</a>`));
  // bare URLs
  s = s.replace(/(^|[\s(\[])(https?:\/\/[^\s<>()\u0001\u0002]+)/g, (m, pre, url) => {
    let trail = '';
    while (/[.,;:!?'"*_]$/.test(url)) {
      trail = url.slice(-1) + trail;
      url = url.slice(0, -1);
    }
    return pre + keep(`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a>`) + trail;
  });

  s = esc(s).replace(ALLOWED_INLINE, '<$1$2$3>');

  // emphasis
  s = s.replace(/\*\*\*(?=\S)([\s\S]*?\S)\*\*\*/g, '<strong><em>$1</em></strong>');
  s = s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^\w])__(?=\S)([\s\S]*?\S)__(?!\w)/g, '$1<strong>$2</strong>');
  s = s.replace(/(^|[^*\w])\*(?=\S)([^*]*?\S)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^_\w])_(?=\S)([^_]*?\S)_(?![_\w])/g, '$1<em>$2</em>');
  s = s.replace(/~~(?=\S)([\s\S]*?\S)~~/g, '<del>$1</del>');
  // template variables
  s = s.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, '<span class="var">{{$1}}</span>');

  for (let k = 0; k < 4 && /\u0001\d+\u0002/.test(s); k++) {
    s = s.replace(/\u0001(\d+)\u0002/g, (_, i) => stash[+i]);
  }
  return s;
}

const RE = {
  fence: /^(\s{0,3})(`{3,}|~{3,})\s*([^`\s]*)[^`]*$/,
  heading: /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/,
  hr: /^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/,
  bq: /^\s{0,3}>\s?/,
  li: /^(\s*)([-*+]|\d{1,9}[.)])(\s+|$)/,
  html: /^\s{0,3}<\/?(details|summary|div|section|table|thead|tbody|tr|td|th|p|img|br|hr|figure|figcaption|aside|blockquote|ul|ol|li|h[1-6]|pre|dl|dt|dd|center|kbd|span|a)\b[^>]*>/i,
  tableDelim: /^\s*\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)*\|?\s*$/,
  blank: /^\s*$/,
};

function isTableStart(lines, i) {
  const a = lines[i];
  const b = lines[i + 1];
  return a != null && b != null && a.includes('|') && b.includes('|') && RE.tableDelim.test(b);
}

function isBlockStart(lines, i) {
  const l = lines[i];
  return (
    RE.fence.test(l) ||
    RE.heading.test(l) ||
    RE.hr.test(l) ||
    RE.bq.test(l) ||
    RE.li.test(l) ||
    RE.html.test(l) ||
    isTableStart(lines, i)
  );
}

function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
  const cells = [];
  let cur = '';
  let inCode = false;
  for (let k = 0; k < s.length; k++) {
    const ch = s[k];
    if (ch === '\\' && s[k + 1] === '|') {
      cur += '|';
      k++;
      continue;
    }
    if (ch === '`') inCode = !inCode;
    if (ch === '|' && !inCode) {
      cells.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  cells.push(cur.trim());
  return cells;
}

function parseTable(lines, i, ctx) {
  const head = splitRow(lines[i]);
  const aligns = splitRow(lines[i + 1]).map((c) =>
    c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : '',
  );
  i += 2;
  const rows = [];
  while (i < lines.length && lines[i].includes('|') && !RE.blank.test(lines[i])) {
    rows.push(splitRow(lines[i]));
    i++;
  }
  const cell = (tag, c, k) => `<${tag}${aligns[k] ? ` style="text-align:${aligns[k]}"` : ''}>${inline(c, ctx)}</${tag}>`;
  const html =
    `<div class="table-wrap"><table><thead><tr>${head.map((c, k) => cell('th', c, k)).join('')}</tr></thead>` +
    `<tbody>${rows.map((r) => `<tr>${head.map((_, k) => cell('td', r[k] ?? '', k)).join('')}</tr>`).join('')}</tbody></table></div>`;
  return { html, next: i };
}

function parseList(lines, start, ctx) {
  const m0 = lines[start].match(RE.li);
  const base = m0[1].length;
  const ordered = /\d/.test(m0[2]);
  const startNum = ordered ? parseInt(m0[2], 10) : 1;
  const items = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(RE.li);
    if (m && m[1].length === base && /\d/.test(m[2]) === ordered) {
      items.push([line.slice(m[0].length)]);
      i++;
      continue;
    }
    if (m && m[1].length <= base) break;
    if (RE.blank.test(line)) {
      let j = i + 1;
      while (j < lines.length && RE.blank.test(lines[j])) j++;
      if (j >= lines.length) {
        i = j;
        break;
      }
      const ind = lines[j].match(/^\s*/)[0].length;
      const mj = lines[j].match(RE.li);
      if (ind > base || (mj && ind === base && /\d/.test(mj[2]) === ordered)) {
        if (items.length) items[items.length - 1].push('');
        i = j;
        continue;
      }
      break;
    }
    const ind = line.match(/^\s*/)[0].length;
    if (ind > base && items.length) {
      items[items.length - 1].push(line.slice(Math.min(ind, base + 2)));
      i++;
      continue;
    }
    if (items.length && !isBlockStart(lines, i)) {
      items[items.length - 1].push(line.trim());
      i++;
      continue;
    }
    break;
  }

  let allTasks = items.length > 0;
  const lis = items.map((itemLines) => {
    let first = itemLines[0];
    let task = null;
    const tm = first.match(/^\[([ xX])\]\s+/);
    if (tm) {
      task = tm[1].toLowerCase() === 'x';
      first = first.slice(tm[0].length);
    } else allTasks = false;
    const html = renderBlocks([first, ...itemLines.slice(1)], ctx).replace(/^<p>([\s\S]*?)<\/p>/, '$1');
    return { html, task };
  });

  if (allTasks && !ordered) {
    return { html: `<ul class="checklist">${lis.map((l) => `<li>${l.html}</li>`).join('')}</ul>`, next: i };
  }
  const tag = ordered ? 'ol' : 'ul';
  const startAttr = ordered && startNum !== 1 ? ` start="${startNum}"` : '';
  const body = lis
    .map((l) => `<li>${l.task !== null ? `<input type="checkbox" disabled${l.task ? ' checked' : ''}> ` : ''}${l.html}</li>`)
    .join('');
  return { html: `<${tag}${startAttr}>${body}</${tag}>`, next: i };
}

function renderBlocks(lines, ctx) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (RE.blank.test(line)) {
      i++;
      continue;
    }
    let m = line.match(RE.fence);
    if (m) {
      const fence = m[2];
      const lang = m[3];
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(fence)) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      out.push(`<pre><code${lang ? ` class="lang-${esc(lang)}"` : ''}>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }
    m = line.match(RE.heading);
    if (m) {
      const level = m[1].length;
      const html = inline(m[2], ctx);
      const plain = html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
      let id = slugify(plain);
      let n = 2;
      const baseId = id;
      while (ctx.ids.has(id)) id = `${baseId}-${n++}`;
      ctx.ids.add(id);
      ctx.headings.push({ level, id, text: plain });
      out.push(`<h${level} id="${id}">${html}</h${level}>`);
      i++;
      continue;
    }
    if (RE.hr.test(line)) {
      out.push('<hr>');
      i++;
      continue;
    }
    if (isTableStart(lines, i)) {
      const t = parseTable(lines, i, ctx);
      out.push(t.html);
      i = t.next;
      continue;
    }
    if (RE.bq.test(line)) {
      const buf = [];
      while (i < lines.length && !RE.blank.test(lines[i]) && (RE.bq.test(lines[i]) || buf.length)) {
        if (!RE.bq.test(lines[i]) && isBlockStart(lines, i)) break;
        buf.push(lines[i].replace(RE.bq, ''));
        i++;
      }
      out.push(`<blockquote>${renderBlocks(buf, ctx)}</blockquote>`);
      continue;
    }
    if (RE.li.test(line)) {
      const l = parseList(lines, i, ctx);
      out.push(l.html);
      i = l.next;
      continue;
    }
    if (RE.html.test(line)) {
      const buf = [];
      while (i < lines.length && !RE.blank.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      out.push(buf.join('\n'));
      continue;
    }
    const buf = [];
    while (i < lines.length && !RE.blank.test(lines[i]) && (buf.length === 0 || !isBlockStart(lines, i))) {
      buf.push(lines[i]);
      i++;
    }
    const html = buf
      .map((l, k) => inline(l.trim(), ctx) + (k < buf.length - 1 && /( {2,}|\\)$/.test(l) ? '<br>' : ''))
      .join('\n');
    out.push(`<p>${html}</p>`);
  }
  return out.join('\n');
}

export function renderMarkdown(md, opts = {}) {
  let src = String(md).replace(/\r\n?/g, '\n');
  src = src.replace(/^---\n[\s\S]*?\n---\n/, ''); // strip front matter
  const ctx = { link: opts.link || ((u) => u), headings: [], ids: new Set() };
  const html = renderBlocks(src.split('\n'), ctx);
  return { html, headings: ctx.headings };
}
