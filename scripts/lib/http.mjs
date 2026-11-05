// Polite fetch helpers: timeout, retry with exponential backoff, Retry-After, honest User-Agent.
// Zero dependencies — uses Node's global fetch (Node >= 18).

export const USER_AGENT = 'FreelanceOS-prospector/1.0';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let proxyHintShown = false;
function maybeProxyHint(err) {
  if (proxyHintShown) return;
  const behindProxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (behindProxy && !process.env.NODE_USE_ENV_PROXY) {
    proxyHintShown = true;
    console.error(
      `\n[hint] HTTPS_PROXY is set but Node's fetch ignores it by default.\n` +
        `       On Node >= 22.21 / 24.5 re-run with:  NODE_USE_ENV_PROXY=1 node scripts/<script>.mjs ...\n` +
        `       (network error was: ${err?.cause?.code || err?.message || err})\n`,
    );
  }
}

/**
 * Fetch a URL and return { ok, status, url, text, headers, error } — never throws.
 * Retries network errors, 429 and 5xx (not 403/404) with backoff.
 */
export async function fetchText(url, opts = {}) {
  const {
    timeoutMs = 20000,
    retries = 2,
    backoffMs = 1000,
    headers = {},
    method = 'GET',
    maxBytes = 3 * 1024 * 1024,
    quiet = false,
  } = opts;

  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-IN,en;q=0.9',
          ...headers,
        },
      });

      // Read body with a size cap (protects against huge pages).
      let text = '';
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let received = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.byteLength;
          text += decoder.decode(value, { stream: true });
          if (received > maxBytes) {
            try { await reader.cancel(); } catch { /* ignore */ }
            break;
          }
        }
        text += decoder.decode();
      }

      const retryable = res.status === 429 || res.status >= 500;
      if (retryable && attempt < retries) {
        const ra = Number.parseInt(res.headers.get('retry-after') || '', 10);
        const wait = Number.isFinite(ra) ? Math.min(ra * 1000, 30000) : backoffMs * 2 ** attempt;
        if (!quiet) console.error(`  ↻ ${res.status} from ${hostOf(url)} — retrying in ${Math.round(wait / 1000)}s`);
        await sleep(wait);
        continue;
      }
      return { ok: res.ok, status: res.status, url: res.url || url, text, headers: res.headers, error: null };
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await sleep(backoffMs * 2 ** attempt);
        continue;
      }
    }
  }
  maybeProxyHint(lastError);
  const code = lastError?.name === 'TimeoutError' ? 'timeout' : lastError?.cause?.code || lastError?.message || 'network error';
  return { ok: false, status: 0, url, text: '', headers: null, error: String(code) };
}

export async function fetchJson(url, opts = {}) {
  const res = await fetchText(url, { ...opts, headers: { Accept: 'application/json', ...(opts.headers || {}) } });
  if (!res.ok) return { ...res, data: null };
  try {
    return { ...res, data: JSON.parse(res.text) };
  } catch (err) {
    return { ...res, ok: false, data: null, error: `invalid JSON: ${err.message}` };
  }
}

/** Run async fn over items with limited concurrency and a polite delay between task starts. */
export async function mapLimit(items, limit, delayMs, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    for (;;) {
      const i = next++;
      if (i >= items.length) return;
      if (i > 0 && delayMs) await sleep(delayMs);
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

export function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return String(url);
  }
}
