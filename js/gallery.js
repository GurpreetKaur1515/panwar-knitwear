/* ==========================================================================
   gallery.js — accessible image lightbox for gallery.html
   Each gallery button carries data-full (large image) and data-caption.
   Built on <dialog> so focus trapping, Escape and focus restore are native.
   ========================================================================== */
(function () {
  'use strict';

  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (!buttons.length) return;

  var supportsDialog = typeof window.HTMLDialogElement === 'function' &&
    typeof document.createElement('dialog').showModal === 'function';

  var current = 0;

  /* ------------------------------------------------------- build markup */
  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Gallery image viewer');
  dialog.innerHTML = [
    '<button type="button" class="lightbox__btn lightbox__btn--close" data-close>',
    '<span aria-hidden="true">&times;</span><span class="visually-hidden">Close image viewer</span></button>',
    '<button type="button" class="lightbox__btn lightbox__btn--prev" data-prev>',
    '<span aria-hidden="true">&#8249;</span><span class="visually-hidden">Previous image</span></button>',
    '<button type="button" class="lightbox__btn lightbox__btn--next" data-next>',
    '<span aria-hidden="true">&#8250;</span><span class="visually-hidden">Next image</span></button>',
    '<figure class="lightbox__figure">',
    '<img alt="" data-lightbox-image>',
    '<figcaption class="lightbox__caption">',
    '<span data-lightbox-caption></span>',
    '<span class="lightbox__counter" data-lightbox-counter></span></figcaption>',
    '</figure>'
  ].join('');
  document.body.appendChild(dialog);

  var image = dialog.querySelector('[data-lightbox-image]');
  var caption = dialog.querySelector('[data-lightbox-caption]');
  var counter = dialog.querySelector('[data-lightbox-counter]');

  /* ------------------------------------------------------------ behaviour */
  function show(index) {
    current = (index + buttons.length) % buttons.length;
    var button = buttons[current];
    var thumb = button.querySelector('img');

    image.src = button.dataset.full || (thumb ? thumb.src : '');
    image.alt = button.dataset.caption || (thumb ? thumb.alt : '');
    caption.textContent = button.dataset.caption || '';
    counter.textContent = 'Image ' + (current + 1) + ' of ' + buttons.length;
  }

  function open(index) {
    show(index);
    if (supportsDialog) {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (supportsDialog) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    document.body.style.overflow = '';
  }

  buttons.forEach(function (button, index) {
    button.addEventListener('click', function () { open(index); });
  });

  dialog.addEventListener('click', function (event) {
    if (event.target.closest('[data-close]')) return close();
    if (event.target.closest('[data-prev]')) return show(current - 1);
    if (event.target.closest('[data-next]')) return show(current + 1);
    // Click on the backdrop area (the dialog itself) closes the viewer.
    if (event.target === dialog) close();
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });

  // Return focus to the thumbnail that was last viewed.
  dialog.addEventListener('close', function () {
    document.body.style.overflow = '';
    if (buttons[current]) buttons[current].focus();
  });
})();
