/* ==========================================================================
   main.js — shared behaviour on every page
   - light / dark theme toggle
   - mobile navigation toggle
   - sticky-header shadow on scroll
   - subtle scroll-reveal animations
   - current year in the footer
   ========================================================================== */
(function () {
  'use strict';

  var DESKTOP_QUERY = window.matchMedia('(min-width: 900px)');
  var DARK_QUERY = window.matchMedia('(prefers-color-scheme: dark)');
  var THEME_KEY = 'pk-theme';

  /* -------------------------------------------------------------- theme */
  function readStoredTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch (error) {
      return null; // private mode / storage blocked
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      /* not fatal — the choice just will not persist */
    }
  }

  // The theme actually on screen: an explicit choice, else the device setting.
  function effectiveTheme() {
    return readStoredTheme() || (DARK_QUERY.matches ? 'dark' : 'light');
  }

  function initThemeToggle() {
    var toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    var label = toggle.querySelector('[data-theme-toggle-label]');

    function reflect(theme) {
      var next = theme === 'dark' ? 'light' : 'dark';
      var text = 'Switch to ' + next + ' theme';
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('title', text);
      if (label) label.textContent = text;
    }

    function apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      reflect(theme);
    }

    reflect(effectiveTheme());

    toggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      apply(next);
      storeTheme(next);
    });

    // Follow the device setting until the visitor makes their own choice.
    DARK_QUERY.addEventListener('change', function () {
      if (!readStoredTheme()) reflect(effectiveTheme());
    });
  }

  /* ---------------------------------------------------------------- nav */
  function initNavToggle() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close when a link is chosen, on Escape, or when clicking outside.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && !DESKTOP_QUERY.matches) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (DESKTOP_QUERY.matches) return;
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (event.target.closest('.site-header')) return;
      setOpen(false);
    });

    // Reset state when resizing up to the desktop layout.
    DESKTOP_QUERY.addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ------------------------------------------------------------- header */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var ticking = false;
    function update() {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------- scroll reveal */
  function initScrollReveal() {
    var items = document.querySelectorAll('[data-animate]');
    if (!items.length) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------- year */
  function initFooterYear() {
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initNavToggle();
    initStickyHeader();
    initScrollReveal();
    initFooterYear();
  });
})();
