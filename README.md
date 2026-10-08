# How I AI

Jay Madduru’s publishing home for playbooks, builds and notes on AI products.

**Live site:** https://mjayanth.github.io/jayAI/

## Files that matter

- `index.html` — the homepage, with a readable first-card fallback.
- `playbooks/ai-platform.html` — the standalone AI Platform Playbook.
- `content/catalog.js` — the list of cards. Add new work here without editing the homepage.
- `assets/site.css` — homepage colors, type and layout, drawn from the playbook.
- `assets/library.js` — card rendering, filtering and safe local links.
- `assets/main.js` — homepage interactions.

Plain HTML, CSS and JavaScript. No install, bundler, database or paid service is required. GitHub Pages serves the root of `main`. IBM Plex fonts load from Google Fonts with local fallbacks.

## Add another piece

1. Add the finished HTML file in a folder such as `notes/`, `projects/` or `playbooks/`.
2. Add an entry to the `content` array in `content/catalog.js`. Keep a comma between entries:

```js
{
  id: 'my-next-piece',
  title: 'The title of the piece',
  description: 'A short, specific description of what a reader will find.',
  type: 'Note', // Playbook, Project, Article, Note, or another format
  date: '2026-10-09',
  href: 'notes/my-next-piece.html',
  topics: ['Agents', 'Evals'],
  featured: false,
  visual: ['The problem', 'The approach', 'What I learned'],
  visualCaption: 'An illustrated note',
  cta: 'Read the note',
  links: [
    { label: 'The approach', hash: 'approach' }
  ]
}
```

3. Give the article’s sections matching IDs, for example `<section id="approach">`. Add a link back to `../index.html` and optionally `../index.html#work`.
4. Check the site, then commit and push. The new card appears automatically; the homepage needs no edits or build step.

Cards sort featured-first, then newest-first. Search and format filters appear when the collection grows beyond three published pieces. The collection works with local files too: it reads the catalog as a normal script, without a `fetch` request.

Use relative paths so links work under `/jayAI/` and when opened locally. A file in `notes/` can reuse the homepage stylesheet with `../assets/site.css`. Complete standalone HTML files can keep their own styles.

## Sections and old links

Each piece has its own shareable URL, such as:

- `playbooks/ai-platform.html`
- `playbooks/ai-platform.html#architecture`
- `playbooks/ai-platform.html#observability`

Older homepage links such as `/#architecture` or `/#harness` are redirected to the corresponding playbook section when JavaScript is available. The homepage anchors are `#work`, `#approach` and `#about`.

## Publishing safely

This is a public repository. Do not commit private interview notes, customer files, credentials or company-owned material without permission. `draft: true` only hides a card; it does **not** protect the committed file or URL. Keep genuinely private drafts outside this repo.

The playbook is a proposed approach. Its diagrams and evaluation criteria are not claims about an employer’s internal systems or a compliance certification.

## Checks

With Node 20 or later:

```sh
npm test
npm run check
```

The tests exercise card additions, safe links, escaped text, search, draft filtering and old section URLs. Static checks cover local files and anchors, HTML nesting, JavaScript syntax, accidental private preparation text and principal text-color contrast. Browser layout and interaction still need a visual check.

## Design and copy

The homepage follows an editorial layout, using the original playbook’s teal/gray palette and IBM Plex Sans, Sans Condensed and Mono. Diagrams show relationships and steps; they do not stand in for performance data.

The copy favors concrete explanations and personal decisions. The playbook retains its thirteen sections and interactive nine-layer architecture, with tighter language around evidence, replay, model evaluation, sign-off and cost. Personal experience and proposed design choices remain distinct.
