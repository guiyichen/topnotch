/**
 * tarot.js — Tarot landing page logic.
 *
 * Responsibilities:
 *   1. Localize UI (zh/en only).
 *   2. Render the 78-card browse index grouped by arcana/suit.
 *   3. Draw cards for the chosen spread client-side (crypto.getRandomValues
 *      where available; falls back to Math.random) with reversed-position
 *      probability 50%.
 *   4. Render the drawn spread with positional labels.
 *   5. Offer an AI upgrade; handle Stripe redirect + SSE stream on return.
 */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var lang = (urlLang || (navigator.language || 'en')).slice(0, 2).toLowerCase();
  if (SUPPORTED.indexOf(lang) === -1) lang = 'en';

  var STRINGS = {
    en: {
      title: 'Free Tarot Reading',
      intro: 'Focus on your question, choose a spread, and draw from the full 78-card deck.',
      questionLabel: 'Your question',
      placeholder: 'What should I focus on right now?',
      three: 'Three-card (Past / Present / Future) — free draw, $0.99 AI reading',
      celtic: 'Celtic Cross (10 cards) — free draw, $4.99 AI reading',
      draw: 'Draw cards',
      drawing: 'Drawing...',
      redraw: 'Draw again',
      threeLabels: ['Past', 'Present', 'Future'],
      celticLabels: ['Present', 'Challenge', 'Past', 'Future', 'Above (Goal)', 'Below (Root)', 'Advice', 'External', 'Hopes/Fears', 'Outcome'],
      upright: 'Upright',
      reversed: 'Reversed',
      aiBtnThree: '🔓 Unlock AI reading $0.99',
      aiBtnCeltic: '🔓 Unlock AI reading $4.99',
      aiHeading: 'AI Reading',
      generating: 'Generating your tarot reading...',
      checkout: 'Redirecting to checkout...',
      errNetwork: 'Network error, please retry.',
      errAi: 'Reading failed. Please contact support with your session id.',
      groupMajor: 'Major Arcana', grpWands: 'Wands', grpCups: 'Cups', grpSwords: 'Swords', grpPentacles: 'Pentacles',
      browse: 'All 78 cards',
    },
    zh: {
      title: '免费塔罗占卜',
      intro: '想清楚问题，选择牌阵，从完整的 78 张牌中抽取。',
      questionLabel: '你想问的问题',
      placeholder: '我现在应该把精力放在哪里？',
      three: '三张牌（过去/现在/未来）— 免费抽牌，$0.99 AI 解读',
      celtic: '凯尔特十字（10 张）— 免费抽牌，$4.99 AI 深度解读',
      draw: '开始抽牌',
      drawing: '抽牌中...',
      redraw: '重新抽牌',
      threeLabels: ['过去', '现在', '未来'],
      celticLabels: ['现况', '挑战', '过去', '未来', '目标', '根源', '建议', '外在', '期盼与恐惧', '结果'],
      upright: '正位',
      reversed: '逆位',
      aiBtnThree: '🔓 解锁 AI 解读 $0.99',
      aiBtnCeltic: '🔓 解锁 AI 深度解读 $4.99',
      aiHeading: 'AI 塔罗解读',
      generating: '正在生成塔罗解读...',
      checkout: '正在跳转到支付...',
      errNetwork: '网络错误，请重试。',
      errAi: '解读失败，请联系客服并提供支付编号。',
      groupMajor: '大阿卡那', grpWands: '权杖', grpCups: '圣杯', grpSwords: '宝剑', grpPentacles: '钱币',
      browse: '完整 78 张牌',
    },
  };

  var T;
  if (STRINGS[lang]) {
    T = STRINGS[lang];
  } else {
    var common = window.getPageStrings('common', lang);
    var page = window.getPageStrings('tarot', lang);
    T = Object.assign({}, common, page);
    Object.keys(STRINGS.en).forEach(function (k) { if (T[k] == null) T[k] = STRINGS.en[k]; });
  }

  var HTML_LANG_MAP = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko', es: 'es', fr: 'fr' };
  document.documentElement.lang = HTML_LANG_MAP[lang] || 'en';
  var brand = window.getPageStrings('nav', lang).brand || 'Oracle Day';
  document.title = T.title + ' | ' + brand;
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
  set('page-title', T.title);
  set('page-intro', T.intro);
  set('lbl-question', T.questionLabel);
  set('lbl-three', T.three);
  set('lbl-celtic', T.celtic);
  set('btn-draw', T.draw);
  set('index-title', T.browse);
  set('grp-major', T.groupMajor);
  set('grp-wands', T.grpWands);
  set('grp-cups', T.grpCups);
  set('grp-swords', T.grpSwords);
  set('grp-pentacles', T.grpPentacles);
  var ta = document.querySelector('#tarot-form textarea[name=question]');
  if (ta) ta.placeholder = T.placeholder;
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

  // Embedded card index (name + slug + suit; meanings live on SEO pages).
  var MAJOR = [
    ['the-fool','愚者','The Fool'], ['the-magician','魔术师','The Magician'],
    ['the-high-priestess','女祭司','The High Priestess'], ['the-empress','皇后','The Empress'],
    ['the-emperor','皇帝','The Emperor'], ['the-hierophant','教皇','The Hierophant'],
    ['the-lovers','恋人','The Lovers'], ['the-chariot','战车','The Chariot'],
    ['strength','力量','Strength'], ['the-hermit','隐者','The Hermit'],
    ['wheel-of-fortune','命运之轮','Wheel of Fortune'], ['justice','正义','Justice'],
    ['the-hanged-man','倒吊人','The Hanged Man'], ['death','死神','Death'],
    ['temperance','节制','Temperance'], ['the-devil','恶魔','The Devil'],
    ['the-tower','高塔','The Tower'], ['the-star','星星','The Star'],
    ['the-moon','月亮','The Moon'], ['the-sun','太阳','The Sun'],
    ['judgement','审判','Judgement'], ['the-world','世界','The World'],
  ];
  var SUITS = {
    wands:     ['ace','two','three','four','five','six','seven','eight','nine','ten','page','knight','queen','king'],
    cups:      ['ace','two','three','four','five','six','seven','eight','nine','ten','page','knight','queen','king'],
    swords:    ['ace','two','three','four','five','six','seven','eight','nine','ten','page','knight','queen','king'],
    pentacles: ['ace','two','three','four','five','six','seven','eight','nine','ten','page','knight','queen','king'],
  };
  var RANK_ZH = { ace:'王牌', two:'二', three:'三', four:'四', five:'五', six:'六', seven:'七', eight:'八', nine:'九', ten:'十', page:'侍从', knight:'骑士', queen:'皇后', king:'国王' };
  var RANK_EN = { ace:'Ace', two:'Two', three:'Three', four:'Four', five:'Five', six:'Six', seven:'Seven', eight:'Eight', nine:'Nine', ten:'Ten', page:'Page', knight:'Knight', queen:'Queen', king:'King' };
  var SUIT_ZH = { wands:'权杖', cups:'圣杯', swords:'宝剑', pentacles:'钱币' };
  var SUIT_EN = { wands:'Wands', cups:'Cups', swords:'Swords', pentacles:'Pentacles' };

  function allCards() {
    var out = [];
    for (var i = 0; i < MAJOR.length; i++) {
      var m = MAJOR[i];
      out.push({ slug: m[0], zh: m[1], en: m[2], major: true });
    }
    Object.keys(SUITS).forEach(function (suit) {
      SUITS[suit].forEach(function (rank) {
        out.push({
          slug: rank + '-of-' + suit,
          zh: SUIT_ZH[suit] + (rank === 'ace' ? RANK_ZH.ace : (rank === 'page' || rank === 'knight' || rank === 'queen' || rank === 'king' ? RANK_ZH[rank] : RANK_ZH[rank])),
          en: RANK_EN[rank] + ' of ' + SUIT_EN[suit],
          major: false,
          suit: suit,
        });
      });
    });
    return out;
  }

  var DECK = allCards();

  // --- render index ---
  (function renderIndex() {
    function fill(listId, filterFn) {
      var list = document.getElementById(listId); if (!list) return;
      var html = '';
      DECK.filter(filterFn).forEach(function (c) {
        html += '<li><a href="/tarot/' + lang + '/' + c.slug + '.html">' + (c[lang] || c.en) + '</a></li>';
      });
      list.innerHTML = html;
    }
    fill('list-major', function (c) { return c.major; });
    fill('list-wands', function (c) { return c.suit === 'wands'; });
    fill('list-cups', function (c) { return c.suit === 'cups'; });
    fill('list-swords', function (c) { return c.suit === 'swords'; });
    fill('list-pentacles', function (c) { return c.suit === 'pentacles'; });
  })();

  // --- drawing ---
  function randInt(n) {
    if (window.crypto && window.crypto.getRandomValues) {
      var buf = new Uint32Array(1);
      window.crypto.getRandomValues(buf);
      return buf[0] % n;
    }
    return Math.floor(Math.random() * n);
  }
  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = randInt(i + 1);
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function drawSpread(n) {
    return shuffle(DECK).slice(0, n).map(function (c) {
      return { slug: c.slug, zh: c.zh, en: c.en, reversed: randInt(2) === 1 };
    });
  }

  var resultEl = document.getElementById('tarot-result');

  function renderSpread(spread, cards, question) {
    var labels = spread === 'celtic' ? T.celticLabels : T.threeLabels;
    var aiBtnText = spread === 'celtic' ? T.aiBtnCeltic : T.aiBtnThree;
    var sku = spread === 'celtic' ? 'tarot-celtic' : 'tarot-three';

    var html = '<div class="tarot-spread tarot-spread-' + spread + '">';
    cards.forEach(function (c, i) {
      html += '<div class="tarot-drawn' + (c.reversed ? ' is-reversed' : '') + '">' +
        '<div class="tarot-pos">' + labels[i] + '</div>' +
        '<a class="tarot-drawn-card" href="/tarot/' + lang + '/' + c.slug + '.html" target="_blank">' +
        '<span class="tarot-drawn-name">' + (c[lang] || c.en) + '</span>' +
        '<span class="tarot-drawn-dir">' + (c.reversed ? T.reversed : T.upright) + '</span>' +
        '</a></div>';
    });
    html += '</div>';

    html += '<section class="hex-section hex-upgrade">' +
      '<h2>' + T.aiHeading + '</h2>' +
      '<button class="unlock-btn" data-sku="' + sku + '">' + aiBtnText + '</button>' +
      '<div id="tarot-ai-output" aria-live="polite"></div>' +
      '</section>';

    resultEl.innerHTML = html;
    resultEl.hidden = false;
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Persist draw in sessionStorage for post-payment replay.
    try {
      sessionStorage.setItem('tarotDraw', JSON.stringify({ spread: spread, cards: cards, question: question }));
    } catch (_) {}

    var btn = resultEl.querySelector('button[data-sku]');
    if (btn) btn.addEventListener('click', function () { startCheckout(btn.getAttribute('data-sku')); });
  }

  function startCheckout(sku) {
    var out = document.getElementById('tarot-ai-output');
    if (out) out.textContent = T.checkout;
    fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sku: sku,
        payload: { lang: lang },
        returnPath: '/tarot.html?lang=' + lang,
      }),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.url) window.location.href = d.url;
        else if (out) out.textContent = T.errNetwork;
      })
      .catch(function () { if (out) out.textContent = T.errNetwork; });
  }

  document.getElementById('tarot-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var spread = document.querySelector('input[name=spread]:checked').value;
    var question = (ta && ta.value || '').trim();
    var btn = document.getElementById('btn-draw');
    btn.textContent = T.drawing;
    var count = spread === 'celtic' ? 10 : 3;
    var cards = drawSpread(count);
    setTimeout(function () {
      renderSpread(spread, cards, question);
      btn.textContent = T.redraw;
    }, 400);
  });

  // Post-payment auto-stream.
  (function () {
    var params = new URLSearchParams(window.location.search);
    if (params.get('payment') !== 'success') return;
    var sku = params.get('sku');
    var sid = params.get('session_id');
    if (!sid || (sku !== 'tarot-three' && sku !== 'tarot-celtic')) return;

    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem('tarotDraw') || 'null'); } catch (_) {}
    if (!saved) return;

    renderSpread(saved.spread, saved.cards, saved.question || '');
    var out = document.getElementById('tarot-ai-output');
    if (out) out.textContent = T.generating + '\n\n';

    fetch('/api/ai-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sid, sku: sku,
        payload: { spread: saved.spread, cards: saved.cards, question: saved.question, lang: lang },
      }),
    })
      .then(function (res) {
        if (!res.ok || !res.body) return res.text().then(function (t) { throw new Error(t); });
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buf = '';
        if (out) out.textContent = '';
        function pump() {
          return reader.read().then(function (r) {
            if (r.done) return;
            buf += decoder.decode(r.value, { stream: true });
            var lines = buf.split('\n');
            buf = lines.pop() || '';
            lines.forEach(function (line) {
              var t = line.trim();
              if (!t.startsWith('data:')) return;
              var d = t.slice(5).trim();
              if (!d || d === '[DONE]') return;
              try { var token = JSON.parse(d); if (typeof token === 'string' && out) out.textContent += token; } catch (_) {}
            });
            return pump();
          });
        }
        return pump();
      })
      .catch(function () { if (out) out.textContent = T.errAi; });
  })();
})();
