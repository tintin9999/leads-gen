// Tiny CLI helper on top of node:util parseArgs (zero dependencies).
// Usage:
//   const opts = cli({ name, summary, usage, examples, options: { months: { type: 'string', default: '2', desc: '...' } } });
import { parseArgs } from 'node:util';

export function cli({ name, summary = '', usage = '', examples = [], options = {}, positionals = '' }) {
  const parseOpts = { help: { type: 'boolean', short: 'h' } };
  for (const [key, o] of Object.entries(options)) {
    parseOpts[key] = { type: o.type || 'string' };
    if (o.short) parseOpts[key].short = o.short;
    if (o.multiple) parseOpts[key].multiple = true;
  }

  const printHelp = () => {
    const lines = [];
    lines.push(`${name} — ${summary}`, '');
    lines.push(`Usage: ${usage || `node scripts/${name}.mjs [options] ${positionals}`}`, '');
    lines.push('Options:');
    const rows = Object.entries(options).map(([key, o]) => {
      const flag = `${o.short ? `-${o.short}, ` : '    '}--${key}${o.type === 'boolean' ? '' : ` <${o.arg || 'value'}>`}`;
      const def = o.default !== undefined && o.type !== 'boolean' ? ` (default: ${o.default})` : '';
      return [flag, `${o.desc || ''}${def}`];
    });
    rows.push(['-h, --help', 'Show this help']);
    const w = Math.max(...rows.map((r) => r[0].length)) + 2;
    for (const [f, d] of rows) lines.push(`  ${f.padEnd(w)}${d}`);
    if (examples.length) {
      lines.push('', 'Examples:');
      for (const ex of examples) lines.push(`  ${ex}`);
    }
    lines.push('');
    console.log(lines.join('\n'));
  };

  let parsed;
  try {
    parsed = parseArgs({ options: parseOpts, allowPositionals: true, strict: true });
  } catch (err) {
    console.error(`${name}: ${err.message}\n`);
    printHelp();
    process.exit(2);
  }
  if (parsed.values.help) {
    printHelp();
    process.exit(0);
  }
  const values = { ...parsed.values };
  for (const [key, o] of Object.entries(options)) {
    if (values[key] === undefined && o.default !== undefined) values[key] = o.default;
    if (values[key] === undefined && o.type === 'boolean') values[key] = false;
  }
  return { ...values, _: parsed.positionals, printHelp };
}

export function toInt(value, fallback) {
  const n = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) ? n : fallback;
}

export function splitList(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
