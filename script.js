/* ==========================================================================
   WEBSAKU — SCRIPT.JS
   Vanilla JavaScript sederhana, dibagi per fitur agar mudah diedit.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* === MOBILE MENU === */
  var navbarToggle = document.getElementById('navbarToggle');
  var navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function () {
      var isOpen = navbarMenu.classList.toggle('is-open');
      navbarToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navbarToggle.setAttribute(
        'aria-label',
        isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
      );
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Tutup menu saat salah satu link diklik (mobile) */
    var navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navbarMenu.classList.remove('is-open');
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarToggle.setAttribute('aria-label', 'Buka menu navigasi');
        document.body.style.overflow = '';
      });
    });
  }

  /* === NAVBAR SCROLL STATE === */
  var navbar = document.getElementById('navbar');

  function updateNavbarOnScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  if (navbar) {
    updateNavbarOnScroll();
    window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
  }

  /* === FAQ ACCORDION === */
  var faqQuestions = document.querySelectorAll('.faq-item__question');

  faqQuestions.forEach(function (button) {
    button.addEventListener('click', function () {
      var isExpanded = button.getAttribute('aria-expanded') === 'true';
      var answer = button.closest('.faq-item').querySelector('.faq-item__answer');

      /* Tutup semua item lain (accordion style: satu terbuka dalam satu waktu) */
      faqQuestions.forEach(function (otherButton) {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          var otherAnswer = otherButton.closest('.faq-item').querySelector('.faq-item__answer');
          otherAnswer.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* === SCROLL REVEAL === */
  var revealElements = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    /* Langsung tampilkan semua elemen tanpa animasi */
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback jika IntersectionObserver tidak didukung */
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

});
