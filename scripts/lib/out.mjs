// Output helpers: everything goes to <repo>/out/ (gitignored) unless --out is given.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toCsv } from './csv.mjs';
import { localDate } from './crm.mjs';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function outDir(custom) {
  return custom ? resolve(process.cwd(), custom) : join(REPO_ROOT, 'out');
}

/** Write <prefix>-YYYY-MM-DD.csv and .md, return the paths. */
export async function writeOutputs({ dir, prefix, rows, markdown }) {
  await mkdir(dir, { recursive: true });
  const stamp = localDate();
  const csvPath = join(dir, `${prefix}-${stamp}.csv`);
  const mdPath = join(dir, `${prefix}-${stamp}.md`);
  await writeFile(csvPath, toCsv(rows), 'utf8');
  await writeFile(mdPath, markdown, 'utf8');
  const show = (p) => relative(process.cwd(), p) || p;
  console.log(`\n✔ ${rows.length} lead(s) → ${show(csvPath)}`);
  console.log(`✔ digest      → ${show(mdPath)}`);
  console.log('  Next: open tools/crm.html → Import CSV. Personalise every message; never bulk-send.\n');
  return { csvPath, mdPath };
}

/** Escape text for a Markdown table cell. */
export function mdCell(s = '') {
  return String(s).replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
}
