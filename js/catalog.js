/* ==========================================================================
   catalog.js — product catalogue data + client-side category filtering
   ---------------------------------------------------------------------------
   TO EDIT THE CATALOGUE: change the PRODUCTS array below. Nothing else needs
   to be touched. Each product needs:
     id       unique slug (used in the enquiry link)
     name     product name shown on the card
     brand    "ZONIXA" (top wear) or "MSP Sports" (bottom wear)
     category one of the CATEGORIES keys below
     fabric   fabric / construction note shown in the card footer
     moq      minimum order quantity — replace the placeholders with real figures
     image    path under assets/images/
     alt      descriptive alt text for the product photo
     desc     one or two lines of description

   Photographs come from panwarknitwear.com. The five MSP Sports bottom-wear
   styles have no photography on the existing site, so they carry illustrations
   (assets/images/products/illus-*.svg) until real photos are supplied.
   ========================================================================== */
(function () {
  'use strict';

  var CATEGORIES = [
    { key: 'all', label: 'All products' },
    { key: 'hoodies', label: 'Hoodies' },
    { key: 'sweatshirts', label: 'Sweatshirts' },
    { key: 'tshirts', label: 'T-shirts' },
    { key: 'jackets', label: 'Jackets' },
    { key: 'bottoms', label: 'Track pants & lowers' },
    { key: 'shorts', label: 'Shorts & nikkar' }
  ];

  var PHOTO = 'assets/images/products/';

  var PRODUCTS = [
    /* ---------------------------------------------------------- hoodies */
    {
      id: 'heavy-320-logo-hoodie',
      name: 'Heavy 320 GSM hoodie — logo',
      brand: 'ZONIXA', category: 'hoodies', fabric: '320 GSM fleece', moq: '[Add MOQ]',
      image: PHOTO + 'heavy-320-gsm-round-neck-hoodies-with-logo.jpg',
      alt: 'ZONIXA heavy 320 GSM round-neck hoodie laid flat, with folded colour options and branded packing',
      desc: 'Winter-weight pullover hoodie with kangaroo pocket, ribbed cuffs and a small chest logo.'
    },
    {
      id: 'heavy-320-print-hoodie',
      name: 'Heavy 320 GSM hoodie — print',
      brand: 'ZONIXA', category: 'hoodies', fabric: '320 GSM fleece', moq: '[Add MOQ]',
      image: PHOTO + 'heavy-320-gsm-round-neck-hoodies-with-print.jpg',
      alt: 'ZONIXA heavy 320 GSM round-neck hoodie with a printed chest panel',
      desc: 'The same 320 GSM body finished with a printed chest panel.'
    },
    {
      id: 'chest-print-hoodie',
      name: '320 GSM hoodie — chest print',
      brand: 'ZONIXA', category: 'hoodies', fabric: '320 GSM heavy fleece', moq: '[Add MOQ]',
      image: PHOTO + '320-gsm-heavy-round-neck-hoodies-with-chest-print.jpg',
      alt: 'ZONIXA 320 GSM heavy round-neck hoodie with chest print',
      desc: 'Heavy round-neck hood with a full chest print, built for winter retail programmes.'
    },
    {
      id: 'chest-sleeve-print-hoodie',
      name: '320 GSM hoodie — chest & sleeve print',
      brand: 'ZONIXA', category: 'hoodies', fabric: '320 GSM fleece', moq: '[Add MOQ]',
      image: PHOTO + '320-gsm-round-neck-hoodies-with-chest-and-sleeve-print.jpg',
      alt: 'ZONIXA 320 GSM round-neck hoodie with chest and sleeve printing',
      desc: 'Chest and sleeve placement printing on a 320 GSM round-neck hood.'
    },
    {
      id: 'heavy-filice-hood',
      name: '320 GSM heavy filice hood',
      brand: 'ZONIXA', category: 'hoodies', fabric: '320 GSM filice', moq: '[Add MOQ]',
      image: PHOTO + '320-gsm-heavy-round-neck-hood-filice.jpg',
      alt: 'ZONIXA 320 GSM heavy filice round-neck hood',
      desc: 'Filice construction in a heavy 320 GSM weight for colder markets.'
    },
    {
      id: 'heavy-zip-hoodie',
      name: '320 GSM heavy zip hoodie',
      brand: 'ZONIXA', category: 'hoodies', fabric: '320 GSM fleece', moq: '[Add MOQ]',
      image: PHOTO + '320-gsm-heavy-zip-hoodies.jpg',
      alt: 'ZONIXA 320 GSM heavy zip-front hoodie',
      desc: 'Full-zip version of the heavy hood, with pockets and a ribbed hem.'
    },
    {
      id: 'shape-swead-hoodie',
      name: 'Shape swead 320 GSM hoodie',
      brand: 'ZONIXA', category: 'hoodies', fabric: '320 GSM fleece', moq: '[Add MOQ]',
      image: PHOTO + 'shape-swead-320-gsm-round-neck-hoodies.jpg',
      alt: 'ZONIXA shape swead 320 GSM round-neck hoodie',
      desc: 'Shaped panelling on a 320 GSM round-neck hood.'
    },
    {
      id: 'two-thread-filice-hoodie',
      name: 'Two-thread filice hoodie',
      brand: 'ZONIXA', category: 'hoodies', fabric: 'Two-thread filice', moq: '[Add MOQ]',
      image: PHOTO + 'two-thread-filice-round-neck-hoodies.jpg',
      alt: 'ZONIXA two-thread filice round-neck hoodie',
      desc: 'Mid-weight everyday hood in a softer two-thread filice construction.'
    },
    {
      id: 'two-thread-filice-hoodie-2',
      name: 'Two-thread filice hoodie II',
      brand: 'ZONIXA', category: 'hoodies', fabric: 'Two-thread filice', moq: '[Add MOQ]',
      image: PHOTO + 'two-thread-filice-round-neck-hoodies-2.jpg',
      alt: 'ZONIXA two-thread filice round-neck hoodie, second colourway',
      desc: 'Alternate colourway of the two-thread filice hood.'
    },
    {
      id: 'two-thread-chest-print-hoodie',
      name: 'Two-thread hoodie — chest print',
      brand: 'ZONIXA', category: 'hoodies', fabric: 'Two-thread fleece', moq: '[Add MOQ]',
      image: PHOTO + 'two-thread-round-neck-hoodies-with-chest-print.jpg',
      alt: 'ZONIXA two-thread round-neck hoodie with chest print',
      desc: 'Two-thread hood carrying a printed chest placement.'
    },
    {
      id: 'two-thread-chest-print-hoodie-2',
      name: 'Two-thread hoodie — chest print II',
      brand: 'ZONIXA', category: 'hoodies', fabric: 'Two-thread fleece', moq: '[Add MOQ]',
      image: PHOTO + 'two-thread-round-neck-hoodies-with-chest-print-2.jpg',
      alt: 'ZONIXA two-thread round-neck hoodie with chest print, second design',
      desc: 'Second print design on the two-thread round-neck hood.'
    },
    {
      id: 'two-thread-logo-filice-hood',
      name: 'Two-thread logo filice hood',
      brand: 'ZONIXA', category: 'hoodies', fabric: 'Two-thread filice', moq: '[Add MOQ]',
      image: PHOTO + 'two-thread-logo-filice-hood.jpg',
      alt: 'ZONIXA two-thread logo filice hood',
      desc: 'Filice hood finished with an embroidered or printed logo.'
    },

    /* ------------------------------------------------------ sweatshirts */
    {
      id: 'two-thread-hood-logo-sweatshirt',
      name: 'Two-thread hood logo sweatshirt',
      brand: 'ZONIXA', category: 'sweatshirts', fabric: 'Two-thread fleece', moq: '[Add MOQ]',
      image: PHOTO + 'two-thread-hood-logo-sweatshirts.jpg',
      alt: 'ZONIXA two-thread hooded sweatshirt with logo',
      desc: 'Hooded sweatshirt in two-thread fleece with logo branding.'
    },
    {
      id: 'hood-cut-sweatshirt',
      name: 'Round-neck hood-cut sweatshirt',
      brand: 'ZONIXA', category: 'sweatshirts', fabric: 'Fleece', moq: '[Add MOQ]',
      image: PHOTO + 'round-neck-hood-cut-sweatshirts.jpg',
      alt: 'ZONIXA round-neck hood-cut sweatshirt',
      desc: 'Round-neck sweatshirt with hood-cut panelling across the yoke.'
    },
    {
      id: 'feather-bonding-sweatshirt',
      name: 'Feather bonding sweatshirt',
      brand: 'ZONIXA', category: 'sweatshirts', fabric: 'Bonded fleece', moq: '[Add MOQ]',
      image: PHOTO + 'feather-bonding-sweatshirts.jpg',
      alt: 'ZONIXA feather bonding sweatshirt',
      desc: 'Bonded construction giving a heavier hand without extra bulk.'
    },
    {
      id: 'filice-sweatshirt',
      name: 'Round-neck filice sweatshirt',
      brand: 'ZONIXA', category: 'sweatshirts', fabric: 'Filice', moq: '[Add MOQ]',
      image: PHOTO + 'round-neck-filice-sweatshirts.jpg',
      alt: 'ZONIXA round-neck filice sweatshirt',
      desc: 'Classic crew-neck in filice — an easy base for print or embroidery.'
    },

    /* ---------------------------------------------------------- jackets */
    {
      id: 'shape-bonding-jacket',
      name: 'Shape bonding ben-collar jacket',
      brand: 'ZONIXA', category: 'jackets', fabric: 'Bonded knit', moq: '[Add MOQ]',
      image: PHOTO + 'shape-bonding-ben-collar-jackets.jpg',
      alt: 'ZONIXA shape bonding ben-collar jacket',
      desc: 'Bonded jacket with a ben collar and shaped panels.'
    },

    /* --------------------------------------------------------- t-shirts */
    {
      id: 'dry-fit-ben-collar-tee',
      name: 'Dry-fit ben-collar half sleeve tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Dry-fit', moq: '[Add MOQ]',
      image: PHOTO + 'dry-fit-ben-collar-half-sleeve-t-shirts.jpg',
      alt: 'ZONIXA dry-fit ben-collar half sleeve t-shirt',
      desc: 'Moisture-wicking dry-fit knit with a ben collar.'
    },
    {
      id: 'dry-fit-matty-round-neck-tee',
      name: 'Dry-fit matty round-neck tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Dry-fit matty', moq: '[Add MOQ]',
      image: PHOTO + 'dry-fit-matty-round-neck-t-shirts.jpg',
      alt: 'ZONIXA dry-fit matty round-neck t-shirt',
      desc: 'Everyday round-neck in dry-fit matty for teamwear and events.'
    },
    {
      id: 'matty-cut-gulla-tee',
      name: 'Dry-fit matty collar tee — cut gulla',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Dry-fit matty', moq: '[Add MOQ]',
      image: PHOTO + 'dry-fit-matty-collar-half-sleeve-cut-gulla-t-shirts.jpg',
      alt: 'ZONIXA dry-fit matty collar half sleeve t-shirt with cut gulla',
      desc: 'Collared half sleeve with a cut gulla neckline detail.'
    },
    {
      id: 'matty-d-gulla-tee',
      name: 'Dry-fit matty collar tee — D gulla',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Dry-fit matty', moq: '[Add MOQ]',
      image: PHOTO + 'dry-fit-matty-collar-half-sleeve-d-gulla-t-shirts.jpg',
      alt: 'ZONIXA dry-fit matty collar half sleeve t-shirt with D gulla',
      desc: 'Collared half sleeve with a D gulla neckline detail.'
    },
    {
      id: 'matty-lining-double-gulla-tee',
      name: 'Dry-fit matty lining double gulla tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Dry-fit matty', moq: '[Add MOQ]',
      image: PHOTO + 'dry-fit-matty-lining-double-gulla-t-shirt.jpg',
      alt: 'ZONIXA dry-fit matty lining t-shirt with double gulla',
      desc: 'Lining detail with a double gulla finish on the placket.'
    },
    {
      id: 'full-sleeve-button-tee',
      name: 'Full-sleeve ben-collar button tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Knit', moq: '[Add MOQ]',
      image: PHOTO + 'full-sleeve-ben-collar-button-t-shirts.jpg',
      alt: 'ZONIXA full sleeve ben-collar button t-shirt',
      desc: 'Full sleeve with a buttoned ben collar for a smarter finish.'
    },
    {
      id: 'chest-print-tee',
      name: 'Round-neck chest print tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Cotton knit', moq: '[Add MOQ]',
      image: PHOTO + 'round-neck-half-sleeve-chest-print-t-shirts.jpg',
      alt: 'ZONIXA round-neck half sleeve t-shirt with chest print',
      desc: 'Round-neck half sleeve carrying a printed chest placement.'
    },
    {
      id: 'digital-print-tee',
      name: 'Digital print tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Cotton knit', moq: '[Add MOQ]',
      image: PHOTO + 'digital-print-t-shirts.jpg',
      alt: 'ZONIXA digital print t-shirts',
      desc: 'Full-surface digital printing for design-led retail runs.'
    },
    {
      id: 'pc-cotton-tee',
      name: 'PC cotton half sleeve tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'PC cotton', moq: '[Add MOQ]',
      image: PHOTO + 'pc-cotton-half-sleeve-t-shirts.jpg',
      alt: 'ZONIXA PC cotton half sleeve t-shirt',
      desc: 'Poly-cotton blend built for volume wholesale programmes.'
    },
    {
      id: 'pc-dora-pocket-tee',
      name: 'PC colour dora pocket tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'PC cotton', moq: '[Add MOQ]',
      image: PHOTO + 'pc-colour-dora-pocket-half-sleeve-t-shirts.jpg',
      alt: 'ZONIXA PC colour dora pocket half sleeve t-shirt',
      desc: 'Contrast dora detailing with a chest pocket.'
    },
    {
      id: 'bird-eye-collar-tee',
      name: 'Cotton bird-eye 2-piece collar tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Bird-eye cotton', moq: '[Add MOQ]',
      image: PHOTO + 'cotton-bird-eye-half-sleeve-2-piece-collar-t-shirts.jpg',
      alt: 'ZONIXA cotton bird-eye half sleeve t-shirt with two-piece collar',
      desc: 'Bird-eye cotton polo with a two-piece collar for corporate orders.'
    },
    {
      id: 'bird-eye-half-baju-tee',
      name: 'Bird-eye cotton half baju tee',
      brand: 'ZONIXA', category: 'tshirts', fabric: 'Bird-eye cotton', moq: '[Add MOQ]',
      image: PHOTO + 'bird-eye-cotton-half-baju-t-shirt.jpg',
      alt: 'Bird-eye cotton half baju t-shirt',
      desc: 'Breathable bird-eye cotton in a half baju cut.'
    },

    /* --------------------------------- MSP Sports bottom wear (drawings) */
    {
      id: 'track-pant',
      name: 'Track pant',
      brand: 'MSP Sports', category: 'bottoms', fabric: 'NS bonded / dry-fit', moq: '[Add MOQ]',
      image: PHOTO + 'illus-track-pant.svg',
      alt: 'Illustration of a straight-fit track pant in navy — photograph to follow',
      desc: 'Straight-fit track pant with side pockets and elasticated waist with drawcord.'
    },
    {
      id: 'jogger-lower',
      name: 'Jogger lower',
      brand: 'MSP Sports', category: 'bottoms', fabric: 'Spun fleece', moq: '[Add MOQ]',
      image: PHOTO + 'illus-jogger-lower.svg',
      alt: 'Illustration of a cuffed jogger lower in charcoal — photograph to follow',
      desc: 'Cuffed jogger with a tapered leg — our most repeated bottom-wear style.'
    },
    {
      id: 'sports-shorts',
      name: 'Sports shorts',
      brand: 'MSP Sports', category: 'shorts', fabric: 'Dry-fit polyester', moq: '[Add MOQ]',
      image: PHOTO + 'illus-sports-shorts.svg',
      alt: 'Illustration of dry-fit sports shorts in amber — photograph to follow',
      desc: 'Lightweight breathable shorts for training, gym and summer teamwear.'
    },
    {
      id: 'nikkar',
      name: 'Nikkar',
      brand: 'MSP Sports', category: 'shorts', fabric: 'Cotton / poly blend', moq: '[Add MOQ]',
      image: PHOTO + 'illus-nikkar.svg',
      alt: 'Illustration of a knee-length knitted nikkar in off-white — photograph to follow',
      desc: 'Knee-length knitted shorts for domestic wholesale and value retail lines.'
    },
    {
      id: 'capri',
      name: 'Capri',
      brand: 'MSP Sports', category: 'bottoms', fabric: 'Cotton lycra', moq: '[Add MOQ]',
      image: PHOTO + 'illus-capri.svg',
      alt: 'Illustration of a three-quarter length capri in navy — photograph to follow',
      desc: 'Three-quarter length bottom with a comfortable stretch waistband.'
    }
  ];

  /* ------------------------------------------------------------- render */
  var grid = document.getElementById('product-grid');
  if (!grid) return;

  var filterBar = document.getElementById('catalog-filters');
  var countEl = document.getElementById('catalog-count');
  var emptyEl = document.getElementById('catalog-empty');
  var activeCategory = 'all';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function productCard(product) {
    return [
      '<li data-category="', escapeHtml(product.category), '">',
      '<article class="product-card">',
      '<div class="product-card__media">',
      '<img src="', escapeHtml(product.image), '" alt="', escapeHtml(product.alt), '" loading="lazy" width="800" height="934">',
      '<span class="product-card__brand">', escapeHtml(product.brand), '</span>',
      '</div>',
      '<div class="product-card__body">',
      '<h3 class="product-card__title">', escapeHtml(product.name), '</h3>',
      '<p class="product-card__desc">', escapeHtml(product.desc), '</p>',
      '<p class="product-card__meta">',
      '<span>', escapeHtml(product.fabric), '</span>',
      '<span>MOQ: ', escapeHtml(product.moq), '</span>',
      '</p>',
      '<p class="card__footer">',
      '<a class="link-arrow" href="contact.html?product=', encodeURIComponent(product.category),
      '&amp;item=', encodeURIComponent(product.name), '">Enquire about this style',
      '<span class="visually-hidden"> — ', escapeHtml(product.name), '</span></a>',
      '</p>',
      '</div>',
      '</article>',
      '</li>'
    ].join('');
  }

  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = CATEGORIES.map(function (category) {
      var pressed = category.key === activeCategory ? 'true' : 'false';
      return '<button type="button" class="filter-btn" data-category="' + category.key +
        '" aria-pressed="' + pressed + '">' + escapeHtml(category.label) + '</button>';
    }).join('');
  }

  function applyFilter(category) {
    activeCategory = category;

    var visible = 0;
    grid.querySelectorAll('li').forEach(function (item) {
      var match = category === 'all' || item.dataset.category === category;
      item.hidden = !match;
      if (match) visible += 1;
    });

    if (filterBar) {
      filterBar.querySelectorAll('.filter-btn').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.category === category));
      });
    }

    var label = (CATEGORIES.filter(function (c) { return c.key === category; })[0] || {}).label;
    if (countEl) {
      countEl.textContent = 'Showing ' + visible + ' of ' + PRODUCTS.length +
        ' styles' + (category === 'all' ? '' : ' in ' + label);
    }
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  function initialCategory() {
    var requested = new URLSearchParams(window.location.search).get('category');
    var known = CATEGORIES.some(function (c) { return c.key === requested; });
    return known ? requested : 'all';
  }

  grid.innerHTML = PRODUCTS.map(productCard).join('');
  renderFilters();

  if (filterBar) {
    filterBar.addEventListener('click', function (event) {
      var button = event.target.closest('.filter-btn');
      if (button) applyFilter(button.dataset.category);
    });
  }

  applyFilter(initialCategory());
})();
