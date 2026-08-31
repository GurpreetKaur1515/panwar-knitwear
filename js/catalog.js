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
   ========================================================================== */
(function () {
  'use strict';

  var CATEGORIES = [
    { key: 'all', label: 'All products' },
    { key: 'hoodies', label: 'Hoodies' },
    { key: 'sweatshirts', label: 'Sweatshirts' },
    { key: 'tshirts', label: 'T-shirts' },
    { key: 'bottoms', label: 'Track pants & lowers' },
    { key: 'shorts', label: 'Shorts & nikkar' }
  ];

  var PRODUCTS = [
    {
      id: 'heavy-hoodie-320',
      name: 'Heavy hoodie — 320 GSM',
      brand: 'ZONIXA',
      category: 'hoodies',
      fabric: '320 GSM fleece',
      moq: '[Add MOQ]',
      image: 'assets/images/product-1.svg',
      alt: 'Illustration of a heavy 320 GSM pullover hoodie in navy',
      desc: 'Structured winter-weight pullover hoodie with kangaroo pocket and ribbed cuffs.'
    },
    {
      id: 'two-thread-hoodie',
      name: 'Two-thread fleece hoodie',
      brand: 'ZONIXA',
      category: 'hoodies',
      fabric: 'Two-thread fleece',
      moq: '[Add MOQ]',
      image: 'assets/images/product-2.svg',
      alt: 'Illustration of a two-thread fleece hoodie in off-white',
      desc: 'Mid-weight everyday hoodie in a softer two-thread fleece construction.'
    },
    {
      id: 'sherpa-hoodie',
      name: 'Sherpa-lined hoodie',
      brand: 'ZONIXA',
      category: 'hoodies',
      fabric: 'Sherpa / Russian fleece',
      moq: '[Add MOQ]',
      image: 'assets/images/product-3.svg',
      alt: 'Illustration of a sherpa-lined hoodie in amber with a cream hood',
      desc: 'Warm sherpa or Russian fleece lining for cold-weather export programmes.'
    },
    {
      id: 'round-neck-sweatshirt',
      name: 'Round-neck sweatshirt',
      brand: 'ZONIXA',
      category: 'sweatshirts',
      fabric: 'Spun fleece',
      moq: '[Add MOQ]',
      image: 'assets/images/product-4.svg',
      alt: 'Illustration of a round-neck spun fleece sweatshirt in grey',
      desc: 'Classic crew-neck sweatshirt, an easy base for printed or embroidered branding.'
    },
    {
      id: 'dry-fit-tshirt',
      name: 'Dry-fit sports t-shirt',
      brand: 'MSP Sports',
      category: 'tshirts',
      fabric: 'Dry-fit polyester',
      moq: '[Add MOQ]',
      image: 'assets/images/product-5.svg',
      alt: 'Illustration of a dry-fit sports t-shirt in navy',
      desc: 'Moisture-wicking knit built for training kits, teamwear and event merchandise.'
    },
    {
      id: 'cotton-lycra-tshirt',
      name: 'Cotton lycra t-shirt',
      brand: 'ZONIXA',
      category: 'tshirts',
      fabric: 'Cotton lycra',
      moq: '[Add MOQ]',
      image: 'assets/images/product-6.svg',
      alt: 'Illustration of a cotton lycra t-shirt in off-white',
      desc: 'Soft-handle cotton lycra with good recovery — a strong everyday retail staple.'
    },
    {
      id: 'polo-tshirt',
      name: 'Polo t-shirt',
      brand: 'ZONIXA',
      category: 'tshirts',
      fabric: 'Honeycomb lycra',
      moq: '[Add MOQ]',
      image: 'assets/images/product-7.svg',
      alt: 'Illustration of a honeycomb knit polo t-shirt in amber',
      desc: 'Collared polo in honeycomb knit for corporate, institutional and retail orders.'
    },
    {
      id: 'track-pant',
      name: 'Track pant',
      brand: 'MSP Sports',
      category: 'bottoms',
      fabric: 'NS bonded / dry-fit',
      moq: '[Add MOQ]',
      image: 'assets/images/product-8.svg',
      alt: 'Illustration of a straight-fit track pant in navy',
      desc: 'Straight-fit track pant with side pockets and elasticated waist with drawcord.'
    },
    {
      id: 'jogger-lower',
      name: 'Jogger lower',
      brand: 'MSP Sports',
      category: 'bottoms',
      fabric: 'Spun fleece',
      moq: '[Add MOQ]',
      image: 'assets/images/product-9.svg',
      alt: 'Illustration of a cuffed jogger lower in charcoal',
      desc: 'Cuffed jogger with a tapered leg — our most repeated bottom-wear style.'
    },
    {
      id: 'sports-shorts',
      name: 'Sports shorts',
      brand: 'MSP Sports',
      category: 'shorts',
      fabric: 'Dry-fit polyester',
      moq: '[Add MOQ]',
      image: 'assets/images/product-10.svg',
      alt: 'Illustration of dry-fit sports shorts in amber',
      desc: 'Lightweight breathable shorts for training, gym and summer teamwear.'
    },
    {
      id: 'nikkar',
      name: 'Nikkar',
      brand: 'MSP Sports',
      category: 'shorts',
      fabric: 'Cotton / poly blend',
      moq: '[Add MOQ]',
      image: 'assets/images/product-11.svg',
      alt: 'Illustration of a knee-length knitted nikkar in off-white',
      desc: 'Knee-length knitted shorts for domestic wholesale and value retail lines.'
    },
    {
      id: 'capri',
      name: 'Capri',
      brand: 'MSP Sports',
      category: 'bottoms',
      fabric: 'Cotton lycra',
      moq: '[Add MOQ]',
      image: 'assets/images/product-12.svg',
      alt: 'Illustration of a three-quarter length capri in navy',
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
      '<img src="', escapeHtml(product.image), '" alt="', escapeHtml(product.alt), '" loading="lazy" width="900" height="1125">',
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
