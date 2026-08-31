# CLAUDE.md

Guidance for Claude (via Claude Code or any Claude session) when working on this project.

## Project overview

Redesign of the **Panwar Knitwear** company website (panwarknitwear.com) — a static
frontend rebuild. The goal is a modern visual refresh of an existing knitwear
manufacturer/exporter site, plus a couple of new features (product catalog, inquiry
form). This is **not** a full application rebuild — no backend, no framework, no
build tooling unless explicitly requested.

## Tech stack

- Plain **HTML5, CSS3, vanilla JavaScript** — no React, Vue, Next.js, or build step
- No npm dependencies unless the task genuinely requires one (e.g. a lightweight
  lightbox library) — prefer hand-rolled solutions first
- Static hosting target (Netlify / GitHub Pages / Vercel static / any file host)

## File structure

```
/
├── index.html
├── about.html
├── products.html
├── gallery.html
├── contact.html
├── css/
│   ├── styles.css          # global styles, variables, layout
│   └── components.css      # reusable component styles (cards, nav, forms)
├── js/
│   ├── main.js             # nav toggle, shared behaviors
│   ├── catalog.js          # product catalog filtering/rendering
│   └── contact-form.js     # form validation + submission handling
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

Keep this structure unless there's a good reason to deviate — flag it if so.

## Design system

- Define all colors, spacing, and font choices as **CSS custom properties** in
  `:root` inside `css/styles.css` so the palette can be changed in one place.
- Use a consistent spacing scale (e.g. 4px/8px increments) rather than arbitrary
  pixel values.
- Typography: one heading font, one body font, loaded via a fast method (system
  font stack preferred, or a single Google Fonts import if a custom look is needed).
- Mobile-first responsive CSS using flexbox/grid; avoid float-based layouts.

## Conventions

- Semantic HTML: proper `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`;
  one `<h1>` per page; descriptive `alt` text on every image; `<label>` on every
  form input.
- JS: vanilla, no inline `onclick` in HTML — attach listeners in `js/*.js`.
  Keep functions small and named for what they do.
- CSS class naming: simple BEM-ish convention (`.card`, `.card__title`,
  `.card--featured`) — nothing overly clever.
- Every new page should reuse the same header/nav/footer markup for consistency
  (duplicate across files is fine since there's no templating engine — just keep
  them in sync).

## Content rules

- Never invent claims about certifications, certifications, factory size, client
  names, or capacity numbers. If real content isn't provided, use clearly marked
  placeholder text like `[Replace with real capacity figures]` rather than
  fabricating specifics that could mislead a business audience.
- If asked to draft placeholder copy, keep it generic and clearly a placeholder.

## New features to build

1. **Product catalog** (`products.html` + `js/catalog.js`) — grid of product
   cards (image, name, short description, category tag), with client-side
   category filtering. Data can live in a simple JS array/object in
   `catalog.js` for easy editing later.
2. **Inquiry form** (`contact.html` + `js/contact-form.js`) — fields: name,
   company, email, phone, product interest (select), quantity, message.
   Client-side validation (required fields, email format). Ask the user how
   submissions should be handled (Formspree endpoint, mailto fallback, or a
   backend to wire up later) before assuming one.

## What to check before finishing a task

- Test responsive behavior at mobile (~375px), tablet (~768px), and desktop
  (~1280px) widths.
- Validate that all nav links and internal links point to real files.
- Confirm forms have working client-side validation and a visible
  success/error state.
- Confirm no broken image paths and that images have `alt` text.
- Note in the response if any content is placeholder and needs to be swapped
  for real copy/images from the client.

## Out of scope (unless explicitly asked)

- Backend/server code, databases, CMS integration
- Payment processing or e-commerce cart functionality
- Analytics/tracking scripts
- SEO deep-dives beyond basic meta tags
