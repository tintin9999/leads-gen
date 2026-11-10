# How to write pages for this site

Every guide page in `site/src/` follows these rules. `node site/lint.mjs` checks most of them.

## The reader's rules (keep these exactly)

### Length
- Aim for 850–1,000 words of visible text: one idea, about 10 minutes.
- The reader acted on every page of this size.
- Pages of 3,700–4,700 words worked less well. The reader called one overwhelming, and went through another only in chat.
- If the content needs more, split it.

### Language
- Use simple English. The reader rejected "big blocky text" and "jargon / too fast".
- Write paragraphs of 1–3 short sentences, with one point each.
- Keep sentences to about 20 words or fewer.
- Give the everyday word first, then the technical term.
- Define each term at first use, then use it the same way every time.
- Do not use unexplained abbreviations.

### Structure
- Present one new idea at a time.
- Give a concrete example with real values before the general statement.
- Show every step of a calculation or procedure.

## How we apply them

### One page, one idea
The title names the idea. If you need a second idea, it is a second page. Link to it.

### Page skeleton

```html
<!--meta {"title":"How Upwork works","group":"Start here","order":4,"summary":"Follow one real job's money from the client to your bank.","time":"10 min"} -->
<p class="lede">Two or three short sentences that say what this page gives you.</p>

<h2 id="kebab-id">A plain heading</h2>
<div class="example">
  <p>Real names, real numbers, first. (The page adds the word "Example" above this box for you.)</p>
</div>
<p>Then the general point, in one to three short sentences.</p>

<h2 id="do-this-now">Do this now</h2>
<ul class="checklist">
  <li>Three to five small actions.</li>
</ul>

<details class="sources"><summary>Sources and dates</summary>
<ol><li><a href="https://…">Name of source</a>: what it supports. Checked Nov 2026.</li></ol>
</details>
```

- `group` is one of: `Start here`, `Fix a problem`, `Money`, `Direct clients`, `Proof`.
- `order` is the number in the file name (`04-how-upwork-works.html` → 4).
- `summary` is at most 14 words. `time` is always `10 min`.
- No `<html>`, `<head>`, `<body>`, `<style>` or `<script>`. No `<h1>`: the build adds it from `title`.

### Blocks you may use

| Block | Use it for |
|---|---|
| `<p class="lede">` | The 2–3 sentence opening. Exactly one per page. |
| `<h2 id="…">` | 3 to 7 per page. Plain words. |
| `<div class="example">` | A concrete case with real values. At least one, in the first half. Do not type the label "Example": the page adds it. |
| `<ol class="steps">` | A procedure. One action per step, in order, no step skipped. |
| `<pre class="calc">` | A calculation. One line per step, with the numbers. |
| `<blockquote class="say">` | Words to say or paste (a message, a proposal line). |
| `<div class="note">` | One helpful aside. |
| `<div class="warn">` | One real danger. |
| `<ul>` / `<ol>` | Short lists. Each item is one or two short sentences. |
| `<table>` | Small only: up to 4 columns, 7 rows, 14 words a cell. Needs `<thead>`. |
| `<ul class="checklist">` | The "Do this now" actions. Up to 6 items on the page. |
| `<details class="sources">` | Sources. Closed by default. Not counted as visible text. |

Do not use other `<details>`, nested lists, or long tables. They make text blocky.

### Terms and abbreviations
- Everyday words first, then the term: "the tokens you spend to apply (<dfn>Connects</dfn>)".
- Short forms too: "the tax your client holds back (<dfn>TDS</dfn>)". After that, use "TDS".
- Each page stands alone. Define a term again on every page that uses it.
- These need no definition: OK, AI, API, UI, URL, PDF, CSV, JSON, HTML, CSS, JS, SQL, ID, OTP, PAN, UPI, FAQ, USD, INR, EUR, GBP, US, UK, EU, IST, and product names.
- Write "for example", not "e.g.". Write "that is", not "i.e.". Avoid "etc.".

### Numbers
- Rupees: `₹45,000` or `₹2.4 lakh` (write "lakh", not "L"). Dollars: `$850`.
- Say the exchange rate when you convert: "at ₹95 to $1".
- Laws, fees and limits carry a date: "as of November 2026".

### Made-up people
- Use the same two made-up clients everywhere, and say they are made up.
- Upwork pages: Maya, a founder in the US, whose app "Fernleaf" was built with an AI app builder on Next.js and Supabase.
- Direct-client pages: Asha, who runs "Indigo Thread", a Pune clothing brand on Shopify.

### Links
- Another guide page: `NN-slug.html`.
- A tool: `../tools/crm.html`. A template or list: `../templates/outreach/cold-email.md`, `../lists/platforms.md`.

## Check your page

```bash
node site/lint.mjs site/src/04-how-upwork-works.html
```

It reports words, sentence length, paragraph length, undefined short forms, table size and the example position. Fix every `FAIL` line.
