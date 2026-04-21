/**
 * site-nav.js — Global top navigation shared by every page.
 *
 * Behaviors:
 *   1. Detects current lang from ?lang=, falls back to navigator.language,
 *      then to English. Only zh + en get localized labels; other locales
 *      fall back to English.
 *   2. Highlights the currently-active category based on URL pathname.
 *   3. Propagates the current lang to every outgoing link so switching
 *      pages preserves language.
 *   4. Inserts itself as the first child of <body>. Pages just need:
 *        <script src="/site-nav.js?v=1"></script>
 *
 * Kept dependency-free and inline-safe (no external data file).
 */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var lang = (urlLang || (navigator.language || 'en')).slice(0, 2).toLowerCase();
  if (SUPPORTED.indexOf(lang) === -1) lang = 'en';

  // Labels come from window.getPageStrings (i18n-pages.js). If that isn't
  // loaded yet (e.g. during early page paint), fall back to an English
  // inline table so the nav still renders.
  var FALLBACK_NAV = { brand: 'Oracle Day', menu: 'Menu', sign: 'Oracle', yijing: 'I Ching', zodiac: 'Zodiac', bazi: 'BaZi', tarot: 'Tarot', huangli: 'Huang Li' };
  var NAV = (typeof window.getPageStrings === 'function' ? window.getPageStrings('nav', lang) : null) || FALLBACK_NAV;

  // Each entry: path used for link + which pathnames should highlight it.
  var LINKS = [
    { key: 'home',    href: '/',             label: NAV.brand,   match: function (p) { return p === '/' || p === '/index.html'; } },
    { key: 'sign',    href: '/?from=nav',    label: NAV.sign,    match: function (p) { return p.indexOf('/sign/') === 0; } },
    { key: 'yijing',  href: '/yijing.html',  label: NAV.yijing,  match: function (p) { return p === '/yijing.html' || p.indexOf('/yijing/') === 0; } },
    { key: 'zodiac',  href: '/zodiac.html',  label: NAV.zodiac,  match: function (p) { return p === '/zodiac.html' || p.indexOf('/zodiac/') === 0; } },
    { key: 'bazi',    href: '/bazi.html',    label: NAV.bazi,    match: function (p) { return p === '/bazi.html'; } },
    { key: 'tarot',   href: '/tarot.html',   label: NAV.tarot,   match: function (p) { return p === '/tarot.html' || p.indexOf('/tarot/') === 0; } },
    { key: 'huangli', href: '/huangli.html', label: NAV.huangli, match: function (p) { return p === '/huangli.html'; } },
  ];

  var path = window.location.pathname;

  function withLang(href) {
    if (href === '/' || href.indexOf('/?') === 0) {
      return '/?lang=' + lang + (href.indexOf('?') > 0 ? '&' + href.slice(href.indexOf('?') + 1) : '');
    }
    return href + (href.indexOf('?') > -1 ? '&' : '?') + 'lang=' + lang;
  }

  var nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', lang === 'zh' ? '全站导航' : 'Site navigation');

  var html = '<a class="site-nav-brand" href="' + withLang('/') + '">' + NAV.brand + '</a>';
  html += '<button class="site-nav-toggle" aria-expanded="false" aria-label="' + NAV.menu + '">☰</button>';
  html += '<ul class="site-nav-list">';
  LINKS.forEach(function (l) {
    if (l.key === 'home') return; // brand link covers Home
    var active = l.match(path);
    html += '<li' + (active ? ' class="is-active"' : '') + '>'
          + '<a href="' + withLang(l.href) + '">' + l.label + '</a></li>';
  });
  html += '</ul>';
  nav.innerHTML = html;

  document.body.insertBefore(nav, document.body.firstChild);

  var toggle = nav.querySelector('.site-nav-toggle');
  var list = nav.querySelector('.site-nav-list');
  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
