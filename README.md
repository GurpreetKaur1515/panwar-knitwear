# Panwar Knitwear — website

A static, framework-free rebuild of panwarknitwear.com: plain HTML5, CSS3 and vanilla
JavaScript, ready to drop onto any static host (Netlify, GitHub Pages, Vercel, cPanel,
S3 — anything that serves files).

No build step. No dependencies. No backend.

---

## Quick start

Open `index.html` in a browser to look around, or run a tiny local server so that page
links and query strings (`products.html?category=hoodies`) behave exactly as they will
in production:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

To deploy, upload the whole folder as-is. `index.html` must sit at the root.

---

## Deployment (Vercel)

The site is live at **https://panwar-knitwear-eta.vercel.app**
(project `panwar-knitwear`, dashboard:
<https://vercel.com/gurpreetkaur15151-3771/panwar-knitwear>).

There is no build step — Vercel serves the files as they are. `vercel.json` sets cache
headers for `/assets`, `/css` and `/js` plus two security headers.

The cache policy is deliberately `max-age=0, must-revalidate, s-maxage=31536000`: Vercel's
CDN holds the files (fast) and purges them on every deploy, while browsers always
revalidate. That matters here because you replace images **keeping the same filename** —
with a plain `max-age`, returning visitors would keep seeing the old photo for hours after
you swapped it.

To redeploy after editing content:

```bash
vercel deploy --prod
```

Preview (a throwaway URL, does not touch the live site):

```bash
vercel deploy
```

Two things to know:

- **`robots.txt` currently blocks all search engines** (`Disallow: /`) because the site is
  full of placeholder copy. **Delete `robots.txt` when the real content is in**, otherwise
  Google will never index the site.
- The first deployment of a new Vercel project always becomes production, whatever flags
  are passed — so this URL is publicly reachable by anyone who has it. To restrict it while
  the content is being finished, turn on **Settings → Deployment Protection → Vercel
  Authentication** in the dashboard; then only people logged into your Vercel account can
  view it.

To connect a custom domain (e.g. panwarknitwear.com), use **Settings → Domains** in the
dashboard and follow the DNS instructions it gives you.

## File structure

```
/
├── index.html               Home
├── about.html               About / company story / leadership
├── manufacturing.html       Manufacturing & capabilities
├── products.html            Product catalogue (cards + category filter)
├── gallery.html             Photo gallery with lightbox
├── contact.html             Contact details + bulk inquiry form
├── css/
│   ├── styles.css           Design tokens, reset, typography, layout, sections
│   └── components.css       Nav, buttons, cards, catalogue, forms, lightbox, footer
├── js/
│   ├── main.js              Theme toggle, mobile nav, sticky header, scroll reveal, year
│   ├── catalog.js           Product data + category filtering
│   ├── contact-form.js      Inquiry form validation + submission
│   └── gallery.js           Accessible image lightbox
├── assets/
│   ├── images/              Photos, logo, placeholder artwork
│   ├── icons/               favicon
│   └── panwar-knitwear-catalogue.pdf   Downloadable catalogue (placeholder)
└── README.md
```

Header, nav and footer markup are duplicated in each HTML file — there is no templating
engine, so **if you change a nav link, change it in all six pages.**

---

## Light and dark themes

The site ships with both. Which one a visitor sees:

1. If they have used the sun/moon button in the header, their choice wins — it is saved in
   `localStorage` under `pk-theme` and applies on every page and every later visit.
2. Otherwise the site follows their device setting (`prefers-color-scheme`).

A tiny inline script in each page's `<head>` applies the saved choice before first paint,
so there is no flash of the wrong theme. The button itself lives in `.header-actions`
next to the hamburger, and the logic is `initThemeToggle()` in `js/main.js`.

**Editing the dark palette:** the dark theme re-declares only the semantic tokens, and it
does so in two places in `css/styles.css` that must stay identical:

```css
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }  /* device setting */
:root[data-theme="dark"] { … }                                                 /* toggle choice */
```

Change a colour in one and change it in the other — that duplication is the price of
supporting both without JavaScript being required.

**To ship light-only:** delete both of those blocks, and delete the `.theme-toggle`
`<button>` from the six HTML files. Nothing else depends on them.
**To ship dark-only:** move the dark values into `:root` itself and do the same removals.

Sections that are deliberately dark in *both* themes — the hero, page banners,
`.section--inverse`, the footer, the lightbox and the WhatsApp button — keep their own
colours on purpose, so the brand navy stays present in light mode.

## Customising the colours

Every colour, font, spacing step and radius is a CSS custom property declared once at the
top of `css/styles.css`, in the `:root` block. Change it there and the light theme follows
(see the section above for the dark counterpart).

```css
:root {
  --color-navy-800: #0e2038;   /* headers, footer, dark sections */
  --color-accent:   #c8912b;   /* buttons, eyebrows, hover states */
  --color-cream:    #f7f5f0;   /* page background */
  ...
}
```

The palette is navy + off-white + an amber accent. To change the accent to, say, teal,
edit these three values and nothing else:

```css
--color-accent:      #1f7a72;
--color-accent-dark: #14574f;
--color-accent-soft: #d9ecea;
```

Other useful knobs in the same block:

| Property | Controls |
| --- | --- |
| `--font-heading` / `--font-body` | The two typefaces (loaded from Google Fonts in each page's `<head>`) |
| `--container-max` | Maximum content width (currently 1200px) |
| `--section-pad` | Vertical whitespace between sections |
| `--radius-md`, `--radius-lg` | Corner rounding on cards and images |
| `--duration`, `--ease` | Speed and feel of every hover/scroll transition |

To swap the fonts, change `--font-heading` / `--font-body` **and** the Google Fonts
`<link>` in the `<head>` of each HTML file. For a faster site with no external request,
delete the Google Fonts link and set both variables to
`system-ui, -apple-system, "Segoe UI", sans-serif`.

---

## Editing content

### Products

`js/catalog.js` holds a single `PRODUCTS` array near the top. Add, remove or edit entries —
the grid, the filter buttons and the result count all update automatically.

```js
{
  id: 'heavy-hoodie-320',
  name: 'Heavy hoodie — 320 GSM',
  brand: 'ZONIXA',            // shown as the badge on the photo
  category: 'hoodies',        // must match a key in CATEGORIES
  fabric: '320 GSM fleece',
  moq: '[Add MOQ]',           // <- replace the placeholders
  image: 'assets/images/product-1.svg',
  alt: 'Heavy 320 GSM pullover hoodie',
  desc: 'Structured winter-weight pullover hoodie…'
}
```

Categories live in the `CATEGORIES` array just above it. If you add a category, also add a
matching `<option>` in the "Product interest" select in `contact.html` so catalogue links
keep pre-filling the form.

### Gallery

Each image in `gallery.html` is a `<button>` carrying `data-full` (the large image) and
`data-caption`. Copy an existing `<li>` block to add one. Keep the `alt` text and the
caption describing what the photo actually shows.

### Images

Replace the files in `assets/images/` with real photographs, keeping the same filenames,
and nothing else needs editing. Recommended sizes:

| File | Size | Used on |
| --- | --- | --- |
| `hero.svg` | ~1600 × 1000 | Home hero |
| `product-1…12.svg` | ~900 × 1125 (4:5) | Catalogue cards |
| `gallery-1…9.svg` + `-thumb` | ~1200 × 900 / 600 × 450 | Gallery + lightbox |
| `process-1…6.svg` | ~1000 × 750 | Manufacturing steps |

If you switch to `.jpg` or `.webp`, update the `src` paths in the HTML (or in the
`PRODUCTS` array for catalogue images). JPEG/WebP at 70–80% quality is recommended;
keep each file under ~200 KB so pages stay fast.

### PDF catalogue

`assets/panwar-knitwear-catalogue.pdf` is a one-page placeholder. Overwrite it with your
real catalogue, keeping the filename, and the three download buttons keep working.

### Phone, WhatsApp and email

These appear in the footer of every page, on `contact.html`, and in the floating WhatsApp
button at the bottom-right of every page. To change the WhatsApp number, find and replace
`919876045457` across all six HTML files (country code, no `+`, no spaces).

---

## Wiring up the inquiry form

The form validates on the client and shows real success/error states, but it does not send
anywhere until you give it an endpoint:

1. Create a free form at <https://formspree.io> and copy your endpoint
   (`https://formspree.io/f/xxxxxxx`).
2. Open `js/contact-form.js` and replace the first line of the config:

   ```js
   var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

3. Save and re-upload. That is the only change needed.

Until then the form runs in **demo mode**: it validates, clears, and shows a success
message that clearly states nothing was sent.

The form includes a hidden honeypot field (`website`) that silently rejects most bot
submissions. Formspree also has its own spam filtering.

Prefer a different handler? `sendInquiry()` in the same file is the only function that
touches the network — point it at Netlify Forms, Getform, Web3Forms or your own endpoint
and everything else keeps working.

---

## Accessibility and performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `<h1>` per page, skip link.
- Every image has `alt` text; decorative logos use `alt=""`.
- Every input has a `<label>`; errors are announced via `role="alert"` and
  `aria-invalid`; the form status uses `role="status"`.
- The mobile menu button uses `aria-expanded` / `aria-controls`; the filter buttons and the
  theme toggle use `aria-pressed`; the result count is an `aria-live` region.
- The theme toggle carries a visually hidden label that updates ("Switch to dark theme" /
  "Switch to light theme"), so it is not an icon-only control for screen readers.
- Both themes were checked for text contrast on their own backgrounds.
- The lightbox is a native `<dialog>`, so focus trapping, `Escape` and focus restore come
  from the browser. Arrow keys move between images.
- All motion is wrapped in `prefers-reduced-motion` guards — animations turn off for
  visitors who ask for that.
- No frameworks, no trackers, ~30 KB of CSS + JS total. Images below the fold are
  `loading="lazy"`; the hero image is `fetchpriority="high"`.

Tested at 375 px (mobile), 768 px (tablet) and 1280 px+ (desktop).

---

## Placeholder content — read before going live

Anything wrapped in `[square brackets]`, and every block styled as a
**"placeholder note"** (the amber-bordered boxes), is placeholder text written from your
existing site. None of it should be published as-is. The list:

| Where | What to supply |
| --- | --- |
| Home — stats band | Years in business, monthly capacity, machine count, active accounts |
| Home — testimonials | Real, permission-granted buyer quotes — or delete the section |
| About — story | Founding year and milestones |
| About — certifications | Any certifications, audits or export registrations you hold |
| Manufacturing — capabilities | Capacity, machinery, MOQ, lead times, size range, markets |
| Manufacturing — quality | Your AQL inspection standard |
| Products | `[Add MOQ]` on all 12 product cards |
| Contact + footers | Real email address, street address, PIN code, working hours |
| Contact — map | Google Maps embed link from your own business listing |
| All pages | Real photographs in place of the generated placeholder images |
| PDF | The real catalogue file |

No certifications, capacity figures, client names or awards have been invented anywhere in
this site — the gaps are marked rather than filled.
