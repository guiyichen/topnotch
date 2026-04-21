/**
 * yijing.js — Landing page logic for /yijing.html.
 *
 * Responsibilities:
 *   1. Localize static UI labels from a tiny built-in string table
 *      (English + Chinese only; other locales fall back to English).
 *   2. Three-coin, six-toss casting animation. Each toss produces a
 *      Yin/Yang line; after six tosses we have a 6-bit binary and
 *      redirect to /yijing/{lang}/{id}.html for the reading.
 *   3. Render a browsable list of all 64 hexagrams at the bottom.
 *
 * The static hexagram catalog is embedded here (name only) so this page
 * does not need an extra network round-trip. The authoritative data
 * still lives in /lib/yijing-data.json and drives the Edge reading page.
 *
 * Coin mapping (classic yarrow equivalent via 3 coins):
 *   Heads = 3, Tails = 2. Sum of 3 coins:
 *     6 (三阴)  -> old yin  = 0 (changing, rendered as yin)
 *     7 (二阴一阳) -> young yang = 1
 *     8 (一阴二阳) -> young yin  = 0
 *     9 (三阳)  -> old yang = 1 (changing, rendered as yang)
 *   Changing lines ignored in Phase 2 — we only render the primary hex.
 */
(function () {
  'use strict';

  // --- language detection (URL ?lang= takes priority; else navigator) ---
  var SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var lang = (urlLang || (navigator.language || 'en')).slice(0, 2).toLowerCase();
  if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
  // Content (hexagrams) lives in zh/en only — other locales render UI
  // localized but fall back to English hex text on the reading page.
  var contentLang = (lang === 'zh') ? 'zh' : 'en';

  var T = window.getPageStrings('yijing', lang);
  var HTML_LANG_MAP = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko', es: 'es', fr: 'fr' };
  document.documentElement.lang = HTML_LANG_MAP[lang] || 'en';
  document.title = T.titleTag;

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }
  setText('page-title', T.title);
  setText('page-intro', T.intro);
  setText('cast-btn-label', T.castBtn);
  setText('cast-step-label', T.step(1));
  setText('cast-question-label', T.questionLabel);
  var qTextarea = document.getElementById('cast-question');
  if (qTextarea) qTextarea.placeholder = T.questionPlaceholder;
  setText('index-title', T.indexTitle);

  var langSel = document.getElementById('lang-select');
  if (langSel) {
    // Ensure the dropdown has options for all 6 langs (static HTML only
    // listed en/zh initially). Add missing ones lazily so we don't need
    // to touch the HTML file.
    var needed = { en: 'English', zh: '中文', ja: '日本語', ko: '한국어', es: 'Español', fr: 'Français' };
    SUPPORTED.forEach(function (L) {
      if (!langSel.querySelector('option[value="' + L + '"]')) {
        var opt = document.createElement('option');
        opt.value = L; opt.textContent = needed[L];
        langSel.appendChild(opt);
      }
    });
    langSel.value = lang;
  }

  // --- 64 hexagrams (name only; full content on reading page) ---
  var HEX_NAMES_ZH = ['乾为天','坤为地','水雷屯','山水蒙','水天需','天水讼','地水师','水地比','风天小畜','天泽履','地天泰','天地否','天火同人','火天大有','地山谦','雷地豫','泽雷随','山风蛊','地泽临','风地观','火雷噬嗑','山火贲','山地剥','地雷复','天雷无妄','山天大畜','山雷颐','泽风大过','坎为水','离为火','泽山咸','雷风恒','天山遁','雷天大壮','火地晋','地火明夷','风火家人','火泽睽','水山蹇','雷水解','山泽损','风雷益','泽天夬','天风姤','泽地萃','地风升','泽水困','水风井','泽火革','火风鼎','震为雷','艮为山','风山渐','雷泽归妹','雷火丰','火山旅','巽为风','兑为泽','风水涣','水泽节','风泽中孚','雷山小过','水火既济','火水未济'];
  var HEX_NAMES_EN = ['The Creative','The Receptive','Difficulty at the Beginning','Youthful Folly','Waiting','Conflict','The Army','Holding Together','The Taming Power of the Small','Treading','Peace','Standstill','Fellowship','Possession in Great Measure','Modesty','Enthusiasm','Following','Work on the Decayed','Approach','Contemplation','Biting Through','Grace','Splitting Apart','Return','Innocence','The Taming Power of the Great','Nourishment','Preponderance of the Great','The Abysmal','The Clinging','Influence','Duration','Retreat','The Power of the Great','Progress','Darkening of the Light','The Family','Opposition','Obstruction','Deliverance','Decrease','Increase','Breakthrough','Coming to Meet','Gathering Together','Pushing Upward','Oppression','The Well','Revolution','The Caldron','The Arousing','Keeping Still','Development','The Marrying Maiden','Abundance','The Wanderer','The Gentle','The Joyous','Dispersion','Limitation','Inner Truth','Preponderance of the Small','After Completion','Before Completion'];
  // Canonical King-Wen-ordered binary map (pos 0 = bottom line).
  var HEX_BINARIES = ['111111','000000','100010','010001','111010','010111','010000','000010','111011','110111','111000','000111','101111','111101','001000','000100','100110','011001','110000','000011','100101','101001','000001','100000','100111','111001','100001','011110','010010','101101','001110','011100','001111','111100','000101','101000','101011','110101','001010','010100','110001','100011','111110','011111','000110','011000','010110','011010','101110','011101','100100','001001','001011','110100','101100','001101','011011','110110','010011','110010','110011','001100','101010','010101'];

  var binToId = {};
  for (var i = 0; i < HEX_BINARIES.length; i++) binToId[HEX_BINARIES[i]] = i + 1;

  // --- populate hex index list ---
  (function renderIndex() {
    var list = document.getElementById('hex-index-list');
    if (!list) return;
    var names = lang === 'zh' ? HEX_NAMES_ZH : HEX_NAMES_EN;
    var html = '';
    for (var n = 1; n <= 64; n++) {
      html += '<li><a href="/yijing/' + lang + '/' + n + '.html">' +
              (lang === 'zh' ? ('第' + n + '卦 ' + names[n - 1]) : (n + '. ' + names[n - 1])) +
              '</a></li>';
    }
    list.innerHTML = html;
  })();

  // --- casting logic ---
  var tossCount = 0;
  var binary = ''; // built in toss order, position 0 = bottom = first toss
  var casting = false;

  var coinsEl = document.getElementById('cast-coins');
  var linesEl = document.getElementById('cast-lines');
  var btn = document.getElementById('cast-btn');
  var btnLabel = document.getElementById('cast-btn-label');
  var stepLabel = document.getElementById('cast-step-label');

  function renderLines() {
    // Render bottom-up: latest toss visible, then newest above if tossed.
    // Display top=top-line, bottom=first-toss. So iterate from latest down.
    var html = '';
    for (var pos = 5; pos >= 0; pos--) {
      if (pos >= binary.length) {
        html += '<div class="hex-line hex-line-empty">' + '━ ━ ━'.replace(/./g, '·') + '</div>';
      } else {
        var bit = binary[pos];
        html += '<div class="hex-line ' + (bit === '1' ? 'hex-line-yang' : 'hex-line-yin') + '">' +
                (bit === '1' ? '━━━━━━━' : '━━━   ━━━') + '</div>';
      }
    }
    linesEl.innerHTML = html;
  }

  function coinToBit() {
    // Three coins. Heads=3, Tails=2. Sum 6/9 = "changing" but treated as its parity yin/yang.
    var sum = 0;
    var results = [];
    for (var c = 0; c < 3; c++) {
      var heads = Math.random() < 0.5;
      results.push(heads);
      sum += heads ? 3 : 2;
    }
    // 6,8 -> yin (0); 7,9 -> yang (1).
    var bit = (sum === 7 || sum === 9) ? '1' : '0';
    return { bit: bit, coins: results };
  }

  function animateCoins(coins, done) {
    // Flip animation: 600ms of spinning faces, then settle on result.
    var nodes = coinsEl.querySelectorAll('.coin');
    var ticks = 0;
    var interval = setInterval(function () {
      nodes.forEach(function (n) {
        n.textContent = Math.random() < 0.5 ? 'H' : 'T';
      });
      ticks++;
      if (ticks >= 8) {
        clearInterval(interval);
        nodes.forEach(function (n, i) {
          n.textContent = coins[i] ? 'H' : 'T';
        });
        done();
      }
    }, 80);
  }

  function onCastClick() {
    if (casting) return;

    // Reset on a 7th click (after a complete hex had been shown during redirect).
    if (tossCount === 6) {
      tossCount = 0;
      binary = '';
      renderLines();
      stepLabel.textContent = T.step(1);
      btnLabel.textContent = T.castBtn;
      return;
    }

    casting = true;
    btnLabel.textContent = T.castingBtn;

    var r = coinToBit();
    animateCoins(r.coins, function () {
      binary += r.bit;
      tossCount++;
      renderLines();
      casting = false;

      if (tossCount < 6) {
        stepLabel.textContent = T.step(tossCount + 1);
        btnLabel.textContent = T.castBtn;
      } else {
        stepLabel.textContent = T.stepDone;
        btnLabel.textContent = T.againBtn;
        var id = binToId[binary];
        if (!id) {
          // Should never happen (64 binaries are complete), but guard just in case.
          console.error('Unknown binary', binary);
          return;
        }
        var q = qTextarea && qTextarea.value.trim();
        var qParam = q ? ('?q=' + encodeURIComponent(q.slice(0, 200))) : '';
        setTimeout(function () {
          window.location.href = '/yijing/' + lang + '/' + id + '.html' + qParam;
        }, 900);
      }
    });
  }

  if (btn) btn.addEventListener('click', onCastClick);
  renderLines();
})();
