/**
 * zodiac-landing.js — Populates the sign picker on /zodiac.html.
 *
 * Kept small and self-contained: the 24 sign entries are embedded here so
 * the landing renders without waiting on a data fetch. Source of truth
 * is /lib/zodiac-data.json (keep the two lists in sync when editing).
 */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var lang = (urlLang || (navigator.language || 'en')).slice(0, 2).toLowerCase();
  if (SUPPORTED.indexOf(lang) === -1) lang = 'en';

  var T = window.getPageStrings('zodiac', lang);
  var NAV = window.getPageStrings('nav', lang);
  var HTML_LANG_MAP = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko', es: 'es', fr: 'fr' };
  document.documentElement.lang = HTML_LANG_MAP[lang] || 'en';
  document.title = T.title + ' | ' + NAV.brand;
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
  set('page-title', T.title);
  set('page-intro', T.intro);
  set('group-western', T.groupWestern);
  set('group-chinese', T.groupChinese);
  var sel = document.getElementById('lang-select');
  if (sel) {
    var names = { en: 'English', zh: '中文', ja: '日本語', ko: '한국어', es: 'Español', fr: 'Français' };
    SUPPORTED.forEach(function (L) {
      if (!sel.querySelector('option[value="' + L + '"]')) {
        var opt = document.createElement('option');
        opt.value = L; opt.textContent = names[L];
        sel.appendChild(opt);
      }
    });
    sel.value = lang;
  }

  var WESTERN = [
    { slug: 'aries',       glyph: '♈', zh: '白羊座', en: 'Aries',       ja: '牡羊座',   ko: '양자리',    es: 'Aries',       fr: 'Bélier' },
    { slug: 'taurus',      glyph: '♉', zh: '金牛座', en: 'Taurus',      ja: '牡牛座',   ko: '황소자리',  es: 'Tauro',       fr: 'Taureau' },
    { slug: 'gemini',      glyph: '♊', zh: '双子座', en: 'Gemini',      ja: '双子座',   ko: '쌍둥이자리',es: 'Géminis',     fr: 'Gémeaux' },
    { slug: 'cancer',      glyph: '♋', zh: '巨蟹座', en: 'Cancer',      ja: '蟹座',     ko: '게자리',    es: 'Cáncer',      fr: 'Cancer' },
    { slug: 'leo',         glyph: '♌', zh: '狮子座', en: 'Leo',         ja: '獅子座',   ko: '사자자리',  es: 'Leo',         fr: 'Lion' },
    { slug: 'virgo',       glyph: '♍', zh: '处女座', en: 'Virgo',       ja: '乙女座',   ko: '처녀자리',  es: 'Virgo',       fr: 'Vierge' },
    { slug: 'libra',       glyph: '♎', zh: '天秤座', en: 'Libra',       ja: '天秤座',   ko: '천칭자리',  es: 'Libra',       fr: 'Balance' },
    { slug: 'scorpio',     glyph: '♏', zh: '天蝎座', en: 'Scorpio',     ja: '蠍座',     ko: '전갈자리',  es: 'Escorpio',    fr: 'Scorpion' },
    { slug: 'sagittarius', glyph: '♐', zh: '射手座', en: 'Sagittarius', ja: '射手座',   ko: '사수자리',  es: 'Sagitario',   fr: 'Sagittaire' },
    { slug: 'capricorn',   glyph: '♑', zh: '摩羯座', en: 'Capricorn',   ja: '山羊座',   ko: '염소자리',  es: 'Capricornio', fr: 'Capricorne' },
    { slug: 'aquarius',    glyph: '♒', zh: '水瓶座', en: 'Aquarius',    ja: '水瓶座',   ko: '물병자리',  es: 'Acuario',     fr: 'Verseau' },
    { slug: 'pisces',      glyph: '♓', zh: '双鱼座', en: 'Pisces',      ja: '魚座',     ko: '물고기자리',es: 'Piscis',      fr: 'Poissons' },
  ];
  var CHINESE = [
    { slug: 'rat',     glyph: '🐀', zh: '鼠', en: 'Rat',     ja: '子（ねずみ）', ko: '쥐',    es: 'Rata',    fr: 'Rat' },
    { slug: 'ox',      glyph: '🐂', zh: '牛', en: 'Ox',      ja: '丑（うし）',   ko: '소',    es: 'Buey',    fr: 'Bœuf' },
    { slug: 'tiger',   glyph: '🐅', zh: '虎', en: 'Tiger',   ja: '寅（とら）',   ko: '호랑이',es: 'Tigre',   fr: 'Tigre' },
    { slug: 'rabbit',  glyph: '🐇', zh: '兔', en: 'Rabbit',  ja: '卯（うさぎ）', ko: '토끼',  es: 'Conejo',  fr: 'Lapin' },
    { slug: 'dragon',  glyph: '🐉', zh: '龙', en: 'Dragon',  ja: '辰（たつ）',   ko: '용',    es: 'Dragón',  fr: 'Dragon' },
    { slug: 'snake',   glyph: '🐍', zh: '蛇', en: 'Snake',   ja: '巳（へび）',   ko: '뱀',    es: 'Serpiente',fr: 'Serpent' },
    { slug: 'horse',   glyph: '🐎', zh: '马', en: 'Horse',   ja: '午（うま）',   ko: '말',    es: 'Caballo', fr: 'Cheval' },
    { slug: 'goat',    glyph: '🐐', zh: '羊', en: 'Goat',    ja: '未（ひつじ）', ko: '양',    es: 'Cabra',   fr: 'Chèvre' },
    { slug: 'monkey',  glyph: '🐒', zh: '猴', en: 'Monkey',  ja: '申（さる）',   ko: '원숭이',es: 'Mono',    fr: 'Singe' },
    { slug: 'rooster', glyph: '🐓', zh: '鸡', en: 'Rooster', ja: '酉（とり）',   ko: '닭',    es: 'Gallo',   fr: 'Coq' },
    { slug: 'dog',     glyph: '🐕', zh: '狗', en: 'Dog',     ja: '戌（いぬ）',   ko: '개',    es: 'Perro',   fr: 'Chien' },
    { slug: 'pig',     glyph: '🐖', zh: '猪', en: 'Pig',     ja: '亥（いのしし）',ko: '돼지', es: 'Cerdo',   fr: 'Cochon' },
  ];

  function render(listId, arr, type) {
    var list = document.getElementById(listId);
    if (!list) return;
    var html = '';
    for (var i = 0; i < arr.length; i++) {
      var s = arr[i];
      html += '<li><a class="zodiac-pick-card" href="/zodiac/' + lang + '/' + type + '/' + s.slug + '.html">' +
              '<span class="zodiac-pick-glyph" aria-hidden="true">' + s.glyph + '</span>' +
              '<span class="zodiac-pick-name">' + (s[lang] || s.en) + '</span>' +
              '</a></li>';
    }
    list.innerHTML = html;
  }

  render('list-western', WESTERN, 'western');
  render('list-chinese', CHINESE, 'chinese');
})();
