/* ==========================================================
   Milestone Infra – Main Script
   ========================================================== */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav    = document.getElementById('nav');

  // --- Header shadow and height change on scroll ---
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile menu ---
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Scroll reveal ---
  var targets = document.querySelectorAll('.reveal, #steps');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  // --- Product filter ---
  var buttons = document.querySelectorAll('.filters button');
  var cards   = document.querySelectorAll('.pcard');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      cards.forEach(function (c) {
        var match = f === 'all' || c.getAttribute('data-cat') === f;
        c.hidden = !match;
        if (match) {
          c.classList.add('in');
          c.classList.remove('show');
          void c.offsetWidth;
          c.classList.add('show');
        }
      });
    });
  });

  // --- Product card navigation ---
  // (Form has been replaced with direct WhatsApp & Email actions)
})();
