/* Kedai Rasa Ibu — script.js */
document.addEventListener('DOMContentLoaded', function () {

  /* MENU MOBILE */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    document.body.classList.toggle('no-scroll', open);
  }

  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* NAVBAR SCROLL */
  var navbar = document.getElementById('navbar');
  function onScroll() { navbar.classList.toggle('is-scrolled', window.scrollY > 10); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* SCROLL REVEAL */
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }
});
