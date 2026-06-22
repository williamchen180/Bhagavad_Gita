# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build website presenting the **Bhagavad Gītā** in **18 chapters / 701 verses**, each verse shown with Devanagari Sanskrit, IAST transliteration, a Traditional-Chinese plain-sense translation, a word-by-word gloss, and a philosophical commentary. There is no framework, bundler, package manager, or test suite — just hand-/agent-authored HTML plus one shared CSS and one shared JS file. Open `index.html` in a browser to view; to serve locally, run a static server from the repo root (e.g. `python3 -m http.server`).

All user-facing text is **Traditional Chinese (繁體中文)**, and replies about this project are expected in Traditional Chinese.

## File layout

- `index.html` — table of contents; cards linking to each chapter (also carries chapter titles + verse counts).
- `chapter_01.html` … `chapter_18.html` — one file per chapter, all verses inline.
- `gita.css` — the single shared stylesheet for every page (parchment/serif theme via CSS variables in `:root`).
- `gita.js` — the single shared script, linked only by chapter pages (not by `index.html`).
- `bhagavad_gita_sanskrit.md` — the pristine Devanagari source text (Markdown), reference data only; not part of the website.
- `implementation-notes.html` — running log of design decisions, deviations, and open questions. **Git-ignored / private** (see `.gitignore`). Append a dated entry here after substantive changes.
- `resume.sh` — local convenience script to resume a Claude session; not part of the site.

## Per-verse HTML structure

Every verse is one `<article class="verse" id="vN">` and follows this exact shape — preserve it when editing:

```html
<article class="verse" id="v16">
  <div class="vnum">2.16</div>
  <div class="sanskrit"> … Devanagari, optional <span class="speaker">…उवाच</span>, lines joined by <br> … </div>
  <div class="iast"> … IAST transliteration … </div>
  <h3 class="sec">逐字詳細翻譯</h3>
  <div class="gloss"> … whole-verse plain-Chinese translation (整節意譯) … </div>
  <ul class="words"><li><b>term</b>　gloss</li> … </ul>   <!-- 逐詞對照, word-by-word -->
  <h3 class="sec">白話解說與哲學寓意</h3>
  <div class="commentary"> … prose commentary … </div>
</article>
```

`gita.js` finds every `ul.words` and injects a collapse/expand toggle button before it, and wires the page's `#toggleAll` toolbar button to collapse/expand all word-lists at once. So any chapter page must include `<button id="toggleAll">` in its `.toolbar` and link both `gita.css` and `gita.js`.

Chapter pages also carry a `<nav class="chapter">` with prev / 目錄 / next links — keep these consistent when adding or reordering.

## Editorial conventions (important — these are deliberate, not bugs)

- **701-verse recension**, not the common 700: chapter 13 has 35 verses including an extra invocatory verse. Kept intentionally.
- **Neutral / academic stance**, non-sectarian. Use neutral name renderings, NOT devotional ones — e.g. 奎師那 (Krishna, not 黑天), 阿周那 (Arjuna), 毗濕摩 (Bhishma), 難敵 (Duryodhana), 桑賈亞 (Sanjaya), 持國 (Dhritarashtra). Reuse whatever name/epithet already appears in the file.
- **IAST has been hand-corrected** to standard scholarly form (ś/ṣ/c/ṛ/ṁ), realigned to the Devanagari per verse; do not "restore" it to the raw source style.
- **Merged verses** (speaker-split or sense-continuous) appear as a single article with a ranged number, e.g. `2.42–2.43`. Do not split or renumber them — verse counts per chapter are fixed.
- The `.gloss` (整節意譯) is written to read as self-contained modern Traditional Chinese: expand condensed/technical terms (with short parentheticals), spell out implied subjects and connectives, fluent and dignified but not literary 對仗腔 and not slangy. Keep faithful to the verse's word-list + commentary; do not introduce new doctrine.

## Editing workflow for bulk changes

When changing one field across many/all verses (the project's common task), the established and verified pattern is:

1. Do **one verse first as a golden sample**, get user approval of the wording/style.
2. Roll out across chapters with **one subagent per chapter file**, each told to edit **only** the target element and to leave every other byte identical.
3. **Verify** afterward: the count of the edited element must be unchanged per chapter, and `git diff` should show changed lines *only* for the targeted element (no Sanskrit/IAST/heading/nav/structure drift). Baseline element counts can be captured with `grep -c '<div class="gloss">' chapter_*.html` before starting.

Per-chapter `<div class="gloss">` / `<ul class="words">` / `<div class="commentary">` counts must always stay equal to each other and to the chapter's verse-article count.

## Git

Published to a **public** repo (github.com/williamchen180/Bhagavad_Gita). Only commit when the user asks. `implementation-notes.html` is intentionally git-ignored and must not be committed.
