/* ==========================================================================
   contact-form.js — inquiry form validation + submission
   ---------------------------------------------------------------------------
   SETUP: create a form at https://formspree.io, then paste your endpoint into
   FORM_ENDPOINT below (it looks like https://formspree.io/f/abcdwxyz).
   Until that is done the form validates normally and shows the success state
   in clearly-labelled demo mode without sending anything.
   ========================================================================== */
(function () {
  'use strict';

  var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // <-- replace me
  var ENDPOINT_CONFIGURED = FORM_ENDPOINT.indexOf('YOUR_FORM_ID') === -1;

  var form = document.getElementById('inquiry-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');
  var submitBtn = form.querySelector('[type="submit"]');
  var validated = false; // only re-validate on input after the first submit

  /* ---------------------------------------------------------- validation */
  var RULES = {
    name: function (value) {
      if (!value.trim()) return 'Please enter your name.';
      if (value.trim().length < 2) return 'Please enter your full name.';
      return '';
    },
    company: function (value) {
      return value.trim() ? '' : 'Please enter your company or organisation.';
    },
    email: function (value) {
      if (!value.trim()) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
        return 'Please enter a valid email address, for example name@company.com.';
      }
      return '';
    },
    phone: function (value) {
      if (!value.trim()) return 'Please enter a phone number we can reach you on.';
      var digits = value.replace(/[^\d]/g, '');
      if (digits.length < 7 || digits.length > 15) {
        return 'Please enter a valid phone number including country code.';
      }
      return '';
    },
    product: function (value) {
      return value ? '' : 'Please choose the product you are interested in.';
    },
    quantity: function (value) {
      if (!value.trim()) return 'Please enter an approximate order quantity.';
      var quantity = Number(value);
      if (!Number.isFinite(quantity) || quantity < 1) {
        return 'Quantity must be a number of 1 or more.';
      }
      return '';
    },
    message: function (value) {
      if (!value.trim()) return 'Please tell us a little about your requirement.';
      if (value.trim().length < 10) return 'Please add a few more details (at least 10 characters).';
      return '';
    }
  };

  function fieldWrapper(input) {
    return input.closest('.field');
  }

  function setFieldError(input, message) {
    var wrapper = fieldWrapper(input);
    var errorEl = document.getElementById(input.id + '-error');
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateField(input) {
    var rule = RULES[input.name];
    if (!rule) return true;
    var message = rule(input.value);
    setFieldError(input, message);
    return !message;
  }

  function validateForm() {
    var firstInvalid = null;
    Object.keys(RULES).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    return firstInvalid;
  }

  /* -------------------------------------------------------------- status */
  function showStatus(type, title, text) {
    if (!statusEl) return;
    statusEl.className = 'form-status form-status--' + type;
    statusEl.innerHTML = '';
    var strong = document.createElement('strong');
    strong.textContent = title;
    var span = document.createElement('span');
    span.textContent = text;
    statusEl.appendChild(strong);
    statusEl.appendChild(span);
    statusEl.hidden = false;
  }

  function clearStatus() {
    if (statusEl) statusEl.hidden = true;
  }

  function setBusy(busy) {
    if (!submitBtn) return;
    submitBtn.disabled = busy;
    submitBtn.textContent = busy ? 'Sending…' : 'Send inquiry';
  }

  /* ---------------------------------------------------------- submission */
  function sendInquiry(data) {
    if (!ENDPOINT_CONFIGURED) {
      // Demo mode — no endpoint configured yet.
      return new Promise(function (resolve) { window.setTimeout(resolve, 600); });
    }
    return fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    }).then(function (response) {
      if (!response.ok) throw new Error('Request failed with status ' + response.status);
      return response;
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    validated = true;
    clearStatus();

    // Honeypot: a filled hidden field means a bot. Fail quietly.
    if (form.elements.website && form.elements.website.value) return;

    var firstInvalid = validateForm();
    if (firstInvalid) {
      showStatus('error', 'Please check the highlighted fields.',
        'A few details are missing or look incorrect — correct them and send again.');
      firstInvalid.focus();
      return;
    }

    setBusy(true);
    sendInquiry(new FormData(form))
      .then(function () {
        form.reset();
        showStatus('success', 'Thank you — your inquiry has been sent.',
          ENDPOINT_CONFIGURED
            ? 'Our team will get back to you within one working day. For anything urgent, call +91 98760 45457.'
            : 'Demo mode: no form endpoint is configured yet, so nothing was actually sent. Add your Formspree endpoint in js/contact-form.js.');
        statusEl.focus();
      })
      .catch(function (error) {
        showStatus('error', 'Sorry — we could not send your inquiry.',
          'Please try again, or email us directly at [add-real-email@panwarknitwear.com].');
        if (window.console) window.console.error(error);
      })
      .finally(function () {
        setBusy(false);
      });
  });

  // Live re-validation once the visitor has tried to submit.
  form.addEventListener('input', function (event) {
    if (validated && RULES[event.target.name]) validateField(event.target);
  });
  form.addEventListener('blur', function (event) {
    if (validated && RULES[event.target.name]) validateField(event.target);
  }, true);

  /* --------------------------------------- prefill from a catalogue link */
  (function prefillFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var category = params.get('product');
    var item = params.get('item');
    var select = form.elements.product;
    var message = form.elements.message;

    if (category && select) {
      var match = Array.prototype.some.call(select.options, function (option) {
        return option.value === category;
      });
      if (match) select.value = category;
    }
    if (item && message && !message.value) {
      message.value = 'I would like a quotation for: ' + item + '.\n\n';
    }
  })();
})();
