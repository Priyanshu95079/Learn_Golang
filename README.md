# Get Set GO — Golang Learning Roadmap

A static learning site for the **Get Set GO** 4-day Golang workshop
(IndiaMART · Tech Shubharambh). Thirty-two units mapped 1:1 to the workshop
syllabus, each with the single best free resource, official docs, a video, a
GitHub repo and one thing to build.

**No build step. No dependencies. Two files.**

---

## Publish it to GitHub Pages

### Fastest — one command

If you have the [GitHub CLI](https://cli.github.com) installed and logged in
(`gh auth login`), this creates the repo, pushes, switches on Pages and prints
your live URL:

```bash
./publish.sh
```

That's it. No web UI, no settings to find.

### Without the GitHub CLI

The same script falls back to plain git:

```bash
./publish.sh <your-github-username>
```

It will pause and ask you to create an **empty** repo at
<https://github.com/new> (don't tick "Add a README" — an existing file will
reject the push), then push for you. Afterwards, one click to finish:

**Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → Save**

### Fully manual

```bash
git init
git add .
git commit -m "feat: Golang learning roadmap site"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/go-roadmap.git
git push -u origin main
```

Then the same Pages setting above.

---

Either way, your site lands at:

```
https://<YOUR-USERNAME>.github.io/go-roadmap/
```

The first build takes about a minute. A 404 immediately after pushing is
normal — wait and refresh.

---

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` straight from disk mostly works, but some browsers block
sibling scripts over `file://`. If the page loads but the curriculum is missing,
use the server above — the page will tell you the same thing.

---

## What's in it

| | |
|---|---|
| **32 units** | Day 01 → Day 04, in the syllabus' own order |
| **154 resources** | Official docs, videos, GitHub repos, articles — all free |
| **One 🏆 per unit** | The single best resource, if you only have time for one |
| **32 practice tasks** | Every unit ends in something you build |
| **Progress tracking** | Tick units off; a coverage grid fills in. Saved in your browser. |
| **Search + type filter** | Press `/` to jump to search |
| **Light / dark** | Follows your system by default |
| **Trainer sections** | 4-day scope table, errata for tools that have moved, 30-day plan |

---

## Files

```
index.html         the site — markup, styles, renderer
roadmap-data.js    ← ALL the content lives here
.nojekyll          tells GitHub Pages to serve the files as-is
```

**To change the curriculum, edit `roadmap-data.js` only.** The shape is
documented at the top of that file. Add a unit to a day's `units` array and it
appears in the nav, the coverage grid, the search index and the page — no other
edits needed.

Resource format:

```js
["doc", "Title", "https://url", "source.com", "why it matters", 1]
//  ↑                                                            ↑
//  doc | video | repo | article                    1 = mark as BEST
```

Exactly one resource per unit should carry the `1`.

---

## Accessibility & support

Keyboard navigable with visible focus rings, `prefers-reduced-motion`
respected, responsive to 360px, and printable (the sidebar drops out).
Progress uses `localStorage` behind a `try/catch`, so the site still works
where storage is blocked — it just won't remember between visits.

---

## Related

The full package this came from also includes a 20-question assessment with a
Google Apps Script form generator, the GoShort capstone brief, and an
auto-grader that scores submissions out of 10.
