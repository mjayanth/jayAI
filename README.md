# Enterprise AI Playbooks

A library of frameworks, architectures and playbooks for putting AI to work across the enterprise. The content connects business outcomes, cross-functional workflows and shared capabilities to delivery and operating decisions.

**Live site:** https://mjayanth.github.io/jayAI/

## Files that matter

- `index.html` — the homepage, with a readable first-card fallback.
- `playbooks/ai-platform.html` — the standalone AI Platform Playbook.
- `content/catalog.js` — the list of cards. Add new resources here without editing the homepage.
- `assets/site.css` — homepage colors, type and layout, drawn from the playbook.
- `assets/library.js` — card rendering, filtering and safe local links.
- `assets/main.js` — homepage interactions.
- `assets/enterprise-ai-architecture.svg` — full enterprise AI reference architecture.
- `assets/architecture.css` and `assets/diagram-viewer.js` — playbook diagram layout, zoom and expanded view.

Plain HTML, CSS and JavaScript. No install, bundler, database or paid service is required. GitHub Pages serves the root of `main`. IBM Plex fonts load from Google Fonts with local fallbacks.

## Add another piece

1. Add the finished HTML file in a folder such as `frameworks/`, `architectures/` or `playbooks/`.
2. Add an entry to the `content` array in `content/catalog.js`. Keep a comma between entries:

```js
{
  id: 'next-resource',
  title: 'The title of the piece',
  description: 'A short, specific description of what a reader will find.',
  type: 'Framework', // Playbook, Architecture, Framework, Note, or another format
  date: '2026-10-09',
  href: 'notes/next-resource.html',
  topics: ['Agents', 'Evals'],
  featured: false,
  visual: ['Problem', 'Approach', 'Decisions'],
  visualTitle: 'Decision flow',
  visualHref: 'notes/next-resource.html#approach', // optional clickable diagram
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

Older homepage links such as `/#architecture` or `/#harness` are redirected to the corresponding playbook section when JavaScript is available. The homepage anchors are `#work` (the library; retained for existing links) and `#frameworks`.

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

The homepage contains the resource library and concise links into the current playbook. Use enterprise language in headings, navigation, metadata and descriptions. Avoid personal branding, biographies, employer lists, sales pitches and repeated summaries. Keep individual permissions, employee concerns and accountable approval roles explicit: enterprise-wide outcomes do not imply enterprise-wide access. Framework links are labeled as sections within the playbook, not separate publications. The full nine-layer architecture is visible in the card preview and opens the original interactive diagram. The thirteen playbook sections lead with business outcomes, function workflows, adoption, investment and the roadmap. Technical material explains reuse, delivery efficiency and the cost of change. Preserve all section IDs so existing links continue to work.

The playbook’s Architecture section opens with the end-to-end diagram from the original Claude artifact, followed by eight numbered flows, seven security checkpoints, then the nine-layer capability view. The SVG is also embedded inline for accessible text and the site fonts. If its layout changes, update both the inline SVG and the standalone SVG file. The diagram is a proposed reference design, not a representation of a company’s deployed systems. Labels were clarified around human approval, accountable owners, intended use and evaluation; the original component layout and flow connections remain.

Diagram controls support fit, actual size, zoom in/out and a native dialog. Escape closes the expanded view and returns keyboard focus to its trigger. Without JavaScript, the inline diagram and standalone SVG remain available. Use `#architecture-flows`, `#architecture-controls` and `#architecture-layers` for direct links into this section.

The playbook is a general, vendor-neutral publication. Keep employer names, career stories and private conversations out of the content. Label hypothetical scenarios and avoid presenting suggested metrics as measured results. The October 9 outcome-led edition connects business needs to workflow changes, adoption, a funded delivery plan and reusable architecture. Supplier onboarding illustrates cross-functional work; it is not a customer case study. Distinguish business benefit from the platform's contribution and include review, rework, support and shared overhead in the investment case. `assets/playbook-editorial.css` styles expandable detail without changing the architecture diagram. Business functions, the roadmap and architecture are directly accessible from the opening reading guide.
