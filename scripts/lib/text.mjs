// Text utilities: HTML → text, entity decoding, contact extraction, keyword scoring, geo signals.

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', rupee: '₹', euro: '€', pound: '£', middot: '·', bull: '•', trade: '™', reg: '®', copy: '©' };

export function decodeEntities(str = '') {
  return String(str).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
      try { return Number.isFinite(n) ? String.fromCodePoint(n) : m; } catch { return m; }
    }
    return NAMED[code.toLowerCase()] ?? m;
  });
}

/** Strip CDATA wrappers, tags, scripts/styles; keep paragraph breaks. */
export function htmlToText(html = '') {
  return decodeEntities(
    String(html)
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<\s*br\s*\/?>/gi, '\n')
      .replace(/<\/?\s*(p|div|li|tr|h[1-6]|pre|blockquote)[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \t\f\v ]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function oneLine(s = '') {
  return String(s).replace(/\s+/g, ' ').trim();
}

export function truncate(s = '', n = 280) {
  const t = oneLine(s);
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}

const IMG_EXT = /\.(png|jpe?g|gif|webp|svg|avif|ico|css|js)$/i;
const JUNK_EMAIL = /(@example\.|@domain\.|@email\.|@yourdomain|@sentry|wixpress\.com|@2x\.|@3x\.|noreply|no-reply|@users\.noreply)/i;

/** Emails incl. common obfuscations: name [at] site [dot] com, name (at) site (dot) com. */
export function extractEmails(text = '') {
  const t = String(text)
    .replace(/\s*[[(]\s*at\s*[\])]\s*/gi, '@')
    .replace(/\s*[[(]\s*dot\s*[\])]\s*/gi, '.')
    .replace(/\s+at\s+(?=[a-z0-9-]+\s*(\.|\s+dot\s+)[a-z]{2,})/gi, '@')
    .replace(/(@[a-z0-9-]+)\s+dot\s+([a-z]{2,})/gi, '$1.$2');
  const found = t.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}/gi) || [];
  return [...new Set(found.map((e) => e.replace(/\.$/, '').toLowerCase()))].filter((e) => !IMG_EXT.test(e) && !JUNK_EMAIL.test(e));
}

export function extractUrls(text = '') {
  const found = String(text).match(/https?:\/\/[^\s<>"')\]]+/gi) || [];
  return [...new Set(found.map((u) => u.replace(/[.,;:!?]+$/, '')))];
}

/** Keyword definitions: { k: label, re: RegExp, w: weight }. */
export const DEFAULT_KEYWORDS = [
  { k: 'react', re: /\breact(\.?js)?\b/i, w: 3 },
  { k: 'next.js', re: /\bnext(\.|\s)?js\b|\bnextjs\b/i, w: 4 },
  { k: 'typescript', re: /\btypescript\b|\bts\b/i, w: 2 },
  { k: 'node', re: /\bnode(\.?js)?\b/i, w: 2 },
  { k: 'supabase', re: /\bsupabase\b/i, w: 4 },
  { k: 'postgres', re: /\bpostgres(ql)?\b/i, w: 2 },
  { k: 'shopify', re: /\bshopify\b/i, w: 5 },
  { k: 'razorpay', re: /\brazorpay\b/i, w: 5 },
  { k: 'stripe', re: /\bstripe\b/i, w: 2 },
  { k: 'dashboard', re: /\bdashboards?\b/i, w: 2 },
  { k: 'admin', re: /\badmin\b|\bback-?office\b/i, w: 2 },
  { k: 'internal tool', re: /\binternal[- ]tools?\b/i, w: 3 },
  { k: 'angular', re: /\bangular(js)?\b/i, w: 3 },
  { k: 'migration', re: /\bmigrat(e|ion|ing)\b|\bmoderni[sz]/i, w: 2 },
  { k: 'mvp', re: /\bmvp\b|\bprototype\b/i, w: 2 },
  { k: 'ai', re: /\bai\b|\bgen-?ai\b|\bartificial intelligence\b/i, w: 1 },
  { k: 'llm', re: /\bllms?\b|\bopenai\b|\banthropic\b|\bclaude\b|\brag\b/i, w: 1 },
  { k: 'frontend', re: /\bfront-?end\b/i, w: 2 },
  { k: 'full-stack', re: /\bfull[- ]?stack\b/i, w: 2 },
  { k: 'remote', re: /\bremote\b/i, w: 1 },
  { k: 'e-commerce', re: /\be-?commerce\b|\bd2c\b|\bdtc\b/i, w: 3 },
  { k: 'vibe-coded', re: /\blovable\b|\bbolt\.new\b|\bv0\b|\bvibe[- ]?cod/i, w: 3 },
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Parse "--keywords react,next.js:5,shopify" → keyword defs. */
export function parseKeywords(list) {
  return list.map((item) => {
    const m = item.match(/^(.*?)(?::(\d+))?$/);
    const k = m[1].trim();
    const w = m[2] ? Number(m[2]) : 2;
    return { k, re: new RegExp(`(?<![\\w])${escapeRegex(k).replace(/\\\./g, '\\.?')}(?![\\w])`, 'i'), w };
  });
}

export function scoreKeywords(text, keywords = DEFAULT_KEYWORDS) {
  const hits = [];
  let points = 0;
  for (const kw of keywords) {
    if (kw.re.test(text)) {
      hits.push(kw.k);
      points += kw.w;
    }
  }
  return { points, hits };
}

/** Signals that matter for an India-based remote freelancer. */
export function geoSignals(text = '') {
  const t = String(text);
  const restricted =
    /\b(us|u\.s\.|usa|united states|eu|uk|canada|north america|americas|europe)[- ]?(only|based( only)?|residents?|time ?zones? only)\b/i.test(t) ||
    /\bremote\s*\((us|usa|u\.s\.|eu|uk|canada|north america|americas|europe|est|pst|cet)[^)]*\)/i.test(t) ||
    /\b(must|need to|should) (be|reside|live) (located |based )?in (the )?(us|usa|united states|eu|uk|canada|europe)\b/i.test(t) ||
    /\b(us|u\.s\.) work authori[sz]ation\b|\bsecurity clearance\b|\bw-?2 only\b/i.test(t);
  const global = /\b(worldwide|anywhere|global(ly)?|any time ?zone|all time ?zones|remote \(global\)|remote \(worldwide\)|remote \(anywhere\))\b/i.test(t);
  const india = /\b(india|indian|bengaluru|bangalore|mumbai|pune|delhi|gurugram|gurgaon|noida|hyderabad|chennai|ist\b|asia)\b/i.test(t);
  const remote = /\bremote\b/i.test(t);
  const onsiteOnly = /\bonsite\b|\bon-site\b|\bin[- ]office\b/i.test(t) && !remote;
  return { restricted, global, india, remote, onsiteOnly };
}
