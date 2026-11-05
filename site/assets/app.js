/* Freelance OS — page behaviour (inlined into every generated page by site/build.mjs) */
(() => {
  const root = document.documentElement;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  /* theme */
  const saved = store.get('fos.theme', 'auto');
  if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
  $$('[data-action="theme"]').forEach((b) => b.addEventListener('click', () => {
    const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('fos.theme', next);
  }));
  $$('[data-action="print"]').forEach((b) => b.addEventListener('click', () => window.print()));
  $$('[data-action="menu"]').forEach((b) => b.addEventListener('click', () => document.body.classList.toggle('nav-open')));
  $$('.sidenav a, .topnav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('nav-open')));

  const hash = (s) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const page = document.body.dataset.page || 'page';

  /* persistent checklists */
  const items = $$('.prose ul.checklist > li');
  const seen = new Map();
  items.forEach((li) => {
    const text = li.textContent.trim().replace(/\s+/g, ' ');
    let k = hash(text);
    const n = (seen.get(k) || 0) + 1; seen.set(k, n);
    if (n > 1) k += '-' + n;
    li.dataset.k = k;
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.setAttribute('aria-label', 'Mark as done');
    const span = document.createElement('span');
    span.className = 'chk-text';
    while (li.firstChild) span.appendChild(li.firstChild);
    li.append(box, span);
    box.checked = store.get(`fos.chk.${page}.${k}`, false) === true;
    li.classList.toggle('done', box.checked);
    box.addEventListener('change', () => {
      store.set(`fos.chk.${page}.${k}`, box.checked);
      li.classList.toggle('done', box.checked);
      updateProgress();
    });
  });

  function countDone(slug) {
    let n = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`fos.chk.${slug}.`) && localStorage.getItem(k) === 'true') n++;
      }
    } catch { /* ignore */ }
    return n;
  }

  function updateProgress() {
    const done = items.filter((li) => li.querySelector('input')?.checked).length;
    $$('[data-progress]').forEach((el) => { el.textContent = items.length ? `${done} / ${items.length} actions done` : ''; });
    $$('[data-progress-bar] i').forEach((el) => { el.style.width = items.length ? `${(100 * done) / items.length}%` : '0'; });
    let allDone = 0; let allTotal = 0;
    $$('[data-nav-prog]').forEach((el) => {
      const slug = el.dataset.navProg; const total = +el.dataset.total || 0;
      const d = Math.min(total, slug === page ? done : countDone(slug));
      allDone += d; allTotal += total;
      if (!total) return;
      if (el.classList.contains('mini-bar')) { el.firstElementChild.style.width = `${(100 * d) / total}%`; el.title = `${d}/${total} actions done`; return; }
      el.textContent = `${d}/${total}`;
      el.classList.toggle('full', d === total);
    });
    $$('[data-overall]').forEach((el) => {
      const pct = allTotal ? Math.round((100 * allDone) / allTotal) : 0;
      el.innerHTML = `<b>${allDone}</b> of <b>${allTotal}</b> checklist actions done across all memos (${pct}%)`;
    });
    $$('[data-overall-bar] i').forEach((el) => { el.style.width = allTotal ? `${(100 * allDone) / allTotal}%` : '0'; });
  }
  updateProgress();

  /* reset checklist for this page */
  $$('[data-action="reset-checks"]').forEach((b) => b.addEventListener('click', () => {
    if (!confirm('Clear all ticks on this page?')) return;
    items.forEach((li) => { const box = li.querySelector('input'); box.checked = false; li.classList.remove('done'); store.set(`fos.chk.${page}.${li.dataset.k}`, false); });
    updateProgress();
  }));

  /* copy buttons on code blocks */
  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); return true; } catch {
      const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove(); return ok;
    }
  }
  $$('.prose pre').forEach((pre) => {
    const b = document.createElement('button');
    b.className = 'copy-btn'; b.type = 'button'; b.textContent = 'Copy';
    b.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const ok = await copyText((code || pre).innerText.replace(/\n?Copy(ied)?$/, ''));
      b.textContent = ok ? 'Copied' : 'Press Ctrl+C';
      setTimeout(() => { b.textContent = 'Copy'; }, 1400);
    });
    pre.appendChild(b);
  });
  $$('[data-action="copy-source"]').forEach((b) => b.addEventListener('click', async () => {
    const src = document.getElementById('md-source');
    if (!src) return;
    const ok = await copyText(src.textContent.replace(/<\\\/script/gi, '</script'));
    const old = b.textContent; b.textContent = ok ? 'Copied ✓' : 'Copy failed';
    setTimeout(() => { b.textContent = old; }, 1500);
  }));

  /* scroll spy for the right-hand TOC */
  const tocLinks = $$('.toc a[href^="#"]');
  if (tocLinks.length) {
    const heads = tocLinks.map((a) => document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))).filter(Boolean);
    let ticking = false;
    const spy = () => {
      ticking = false;
      let cur = heads[0];
      for (const h of heads) { if (h.getBoundingClientRect().top < 130) cur = h; else break; }
      tocLinks.forEach((a) => a.classList.toggle('active', cur && a.getAttribute('href') === `#${cur.id}`));
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
    spy();
  }

  /* hub search */
  const input = document.getElementById('hub-search');
  const box = document.getElementById('hub-results');
  if (input && box && Array.isArray(window.FOS_INDEX)) {
    const idx = window.FOS_INDEX.map((d) => ({ ...d, hay: `${d.t} ${d.s || ''} ${(d.h || []).join(' ')} ${d.x || ''}`.toLowerCase() }));
    let sel = -1;
    const render = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { box.classList.remove('on'); box.innerHTML = ''; return; }
      const terms = q.split(/\s+/).filter(Boolean);
      const scored = idx.map((d) => {
        let score = 0;
        for (const t of terms) {
          if (!d.hay.includes(t)) return null;
          if (d.t.toLowerCase().includes(t)) score += 5;
          if ((d.h || []).some((h) => h.toLowerCase().includes(t))) score += 2;
          score += 1;
        }
        return { d, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 14);
      sel = -1;
      box.innerHTML = scored.length
        ? scored.map(({ d }) => {
          const hit = (d.h || []).find((h) => terms.some((t) => h.toLowerCase().includes(t)));
          const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
          return `<a href="${esc(d.u)}">${esc(d.t)}<small>${esc(d.k)}${hit ? ' · ' + esc(hit) : d.s ? ' · ' + esc(d.s) : ''}</small></a>`;
        }).join('')
        : '<div class="none">No matches. Try “GST”, “Upwork”, “contract”, “rate”…</div>';
      box.classList.add('on');
    };
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      const links = $$('a', box);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!links.length) return;
        sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
        links.forEach((a, i) => a.classList.toggle('sel', i === sel));
        links[sel].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        const target = links[sel >= 0 ? sel : 0];
        if (target) location.href = target.href;
      } else if (e.key === 'Escape') { input.value = ''; render(); }
    });
    addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) {
        e.preventDefault(); input.focus();
      }
    });
  }
})();
