/**
 * bazi.js — /bazi.html client logic.
 *
 * Responsibilities:
 *   1. Localize the small set of UI strings (zh/en).
 *   2. POST the birth form to /api/bazi, render the returned chart.
 *   3. Offer two AI upgrade CTAs ($2.99 basic, $4.99 full with 大运).
 *   4. After Stripe success redirect, auto-stream from /api/ai-reading.
 *
 * Privacy note: we never send the raw birth date to /api/ai-reading.
 * Only the computed chart (四柱 + 五行 + 大运) goes to the AI prompt, so
 * the birth timestamp is not retained anywhere after this tab closes.
 */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var lang = (urlLang || (navigator.language || 'en')).slice(0, 2).toLowerCase();
  if (SUPPORTED.indexOf(lang) === -1) lang = 'en';

  var STRINGS = {
    en: {
      title: 'BaZi (Four Pillars) Calculator',
      intro: 'Enter your Solar (Gregorian) birth date and time. We compute your four pillars, ten gods, and five-element distribution. All computation happens on demand — nothing is stored.',
      birth: 'Birth date', time: 'Birth time', gender: 'Gender',
      male: 'Male', female: 'Female',
      submit: 'Compute chart',
      submitting: 'Computing...',
      privacy: 'Birth data is not stored on our server. If you later unlock an AI reading, only the chart (not your raw birth date) is sent to the AI provider.',
      resultTitle: 'Your Four Pillars',
      pillars: ['Year', 'Month', 'Day', 'Time'],
      cols: { gan: 'Heaven Stem', zhi: 'Earth Branch', shiShenGan: '10-God (stem)', hideGan: 'Hidden stems', naYin: 'Na Yin' },
      dayMaster: 'Day Master',
      strength: { strong: 'Strong', balanced: 'Balanced', weak: 'Weak' },
      wuXing: 'Five Elements',
      daYun: 'Luck Pillars',
      ageCol: 'From age', yearCol: 'Year', ganZhiCol: 'Pillar',
      aiBasicHeading: 'AI Basic Reading',
      aiBasicDesc: '800–1500-word personalized reading based on your chart.',
      aiBasicCta: '🔓 Unlock Basic Reading $2.99',
      aiFullHeading: 'AI Full Reading (with Luck Pillars)',
      aiFullDesc: 'Everything in Basic plus a decade-by-decade outlook across your luck pillars.',
      aiFullCta: '🔓 Unlock Full Reading $4.99',
      disclaimer: 'For entertainment purposes only. Not any form of professional advice.',
      errBadInput: 'Please check your birth date and time.',
      errNetwork: 'Network error, please retry.',
      errAi: 'Reading failed. Please contact support with your session id.',
      checkout: 'Redirecting to checkout...',
      generating: 'Generating reading...',
    },
    zh: {
      title: '八字命盘·四柱计算',
      intro: '输入你的公历（阳历）生辰，我们为你排盘并计算四柱、十神与五行分布。所有计算都是按需进行的，服务器不保留任何数据。',
      birth: '出生日期', time: '出生时间', gender: '性别',
      male: '男', female: '女',
      submit: '排盘',
      submitting: '排盘中...',
      privacy: '生辰数据不会存于服务器。若后续解锁 AI 深度解读，仅命盘结构会发送给 AI 提供商，原始生辰不被保留。',
      resultTitle: '你的四柱八字',
      pillars: ['年柱', '月柱', '日柱', '时柱'],
      cols: { gan: '天干', zhi: '地支', shiShenGan: '十神(干)', hideGan: '藏干', naYin: '纳音' },
      dayMaster: '日主',
      strength: { strong: '偏强', balanced: '中和', weak: '偏弱' },
      wuXing: '五行分布',
      daYun: '大运',
      ageCol: '起运年龄', yearCol: '起运年', ganZhiCol: '干支',
      aiBasicHeading: 'AI 基础命盘解读',
      aiBasicDesc: '基于你的命盘，生成 800–1500 字个性化解读。',
      aiBasicCta: '🔓 解锁基础解读 $2.99',
      aiFullHeading: 'AI 深度解读（含大运）',
      aiFullDesc: '在基础解读之上，加上未来大运逐步分析。',
      aiFullCta: '🔓 解锁深度解读 $4.99',
      disclaimer: '本站内容仅供娱乐参考，不构成任何实质性建议。',
      errBadInput: '请检查出生日期和时间。',
      errNetwork: '网络错误，请重试。',
      errAi: '解读生成失败，请联系客服并提供支付编号。',
      checkout: '正在跳转到支付...',
      generating: '正在生成解读...',
    },
  };
  // For ja/ko/es/fr, source from i18n-pages.js (common + page). For zh/en
  // keep the inline STRINGS above to preserve the existing bilingual
  // content exactly. ja/ko/es/fr translations are LLM-assisted and may
  // need native review — see i18n-pages.js header.
  var T;
  if (STRINGS[lang]) {
    T = STRINGS[lang];
  } else {
    var common = window.getPageStrings('common', lang);
    var page = window.getPageStrings('bazi', lang);
    T = Object.assign({}, common, page);
    // Fill in any EN-only keys that aren't present (e.g. fr may lack
    // a newly-added key). Safe fallback to English.
    Object.keys(STRINGS.en).forEach(function (k) { if (T[k] == null) T[k] = STRINGS.en[k]; });
  }
  var HTML_LANG_MAP = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko', es: 'es', fr: 'fr' };
  document.documentElement.lang = HTML_LANG_MAP[lang] || 'en';
  var brand = window.getPageStrings('nav', lang).brand || 'Oracle Day';
  document.title = T.title + ' | ' + brand;
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
  set('page-title', T.title);
  set('page-intro', T.intro);
  set('lbl-birth', T.birth);
  set('lbl-time', T.time);
  set('lbl-gender', T.gender);
  set('lbl-male', T.male);
  set('lbl-female', T.female);
  set('btn-submit', T.submit);
  set('bazi-privacy', T.privacy);
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

  var form = document.getElementById('bazi-form');
  var resultEl = document.getElementById('bazi-result');

  function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function renderChart(chart) {
    var pillarLabels = T.pillars;
    var dm = chart.dayMaster;
    var dmWuXing = lang === 'zh' ? dm.wuXing : dm.wuXingEn;
    var strengthLabel = T.strength[dm.strength];

    var pillarsHtml = chart.pillars.map(function (p, i) {
      var ganWu = lang === 'zh' ? p.ganWuXing : p.ganWuXingEn;
      var zhiWu = lang === 'zh' ? p.zhiWuXing : p.zhiWuXingEn;
      var shiShen = p.shiShenGan === 'self' ? (lang === 'zh' ? '日主' : 'Self') : p.shiShenGan;
      var hide = (p.hideGan || []).join('');
      return '<div class="bazi-pillar">' +
        '<div class="bazi-pillar-label">' + escHtml(pillarLabels[i]) + '</div>' +
        '<div class="bazi-pillar-gan">' + escHtml(p.gan) + '<span class="bazi-wx wx-' + encodeURIComponent(p.ganWuXing) + '">' + escHtml(ganWu) + '</span></div>' +
        '<div class="bazi-pillar-zhi">' + escHtml(p.zhi) + '<span class="bazi-wx wx-' + encodeURIComponent(p.zhiWuXing) + '">' + escHtml(zhiWu) + '</span></div>' +
        '<div class="bazi-pillar-meta"><span>' + escHtml(T.cols.shiShenGan) + ': ' + escHtml(shiShen) + '</span>' +
        '<span>' + escHtml(T.cols.hideGan) + ': ' + escHtml(hide) + '</span>' +
        '<span>' + escHtml(T.cols.naYin) + ': ' + escHtml(p.naYin) + '</span></div>' +
        '</div>';
    }).join('');

    var wxNames = lang === 'zh' ? ['金','木','水','火','土'] : ['Metal','Wood','Water','Fire','Earth'];
    var wxKeys = ['金','木','水','火','土'];
    var wxBars = wxKeys.map(function (k, i) {
      var c = chart.wuXingCounts[k] || 0;
      return '<div class="wx-bar"><span class="wx-label wx-' + encodeURIComponent(k) + '">' + escHtml(wxNames[i]) + '</span>' +
             '<span class="wx-count">×' + c + '</span>' +
             '<span class="wx-fill" style="width:' + Math.min(c * 14, 100) + '%;"></span></div>';
    }).join('');

    var daYunHtml = (chart.yun.daYun || []).map(function (d) {
      return '<tr><td>' + d.startAge + '</td><td>' + d.startYear + '</td><td>' + escHtml(d.ganZhi) + '</td></tr>';
    }).join('');

    resultEl.innerHTML =
      '<h2>' + escHtml(T.resultTitle) + '</h2>' +
      '<div class="bazi-pillars">' + pillarsHtml + '</div>' +
      '<div class="bazi-daymaster"><strong>' + escHtml(T.dayMaster) + ':</strong> ' +
        escHtml(dm.gan) + ' (' + escHtml(dmWuXing) + ') · ' + escHtml(strengthLabel) + '</div>' +
      '<h3>' + escHtml(T.wuXing) + '</h3>' +
      '<div class="wx-grid">' + wxBars + '</div>' +
      '<h3>' + escHtml(T.daYun) + '</h3>' +
      '<table class="bazi-dayun"><thead><tr><th>' + escHtml(T.ageCol) + '</th><th>' + escHtml(T.yearCol) + '</th><th>' + escHtml(T.ganZhiCol) + '</th></tr></thead><tbody>' + daYunHtml + '</tbody></table>' +

      '<section class="hex-section hex-upgrade">' +
        '<h2>' + escHtml(T.aiBasicHeading) + '</h2>' +
        '<p>' + escHtml(T.aiBasicDesc) + '</p>' +
        '<button class="unlock-btn" data-sku="bazi-basic">' + escHtml(T.aiBasicCta) + '</button>' +
      '</section>' +
      '<section class="hex-section hex-upgrade">' +
        '<h2>' + escHtml(T.aiFullHeading) + '</h2>' +
        '<p>' + escHtml(T.aiFullDesc) + '</p>' +
        '<button class="unlock-btn" data-sku="bazi-full">' + escHtml(T.aiFullCta) + '</button>' +
      '</section>' +
      '<div id="bazi-ai-output" aria-live="polite"></div>' +
      '<p class="hex-disclaimer">' + escHtml(T.disclaimer) + '</p>';

    resultEl.hidden = false;
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Persist chart in sessionStorage so the post-payment redirect can
    // resend it without asking the user to re-enter birth date.
    try { sessionStorage.setItem('baziChart', JSON.stringify(chart)); } catch (_) {}

    Array.prototype.forEach.call(
      resultEl.querySelectorAll('button[data-sku]'),
      function (btn) { btn.addEventListener('click', function () { startCheckout(btn.getAttribute('data-sku')); }); }
    );
  }

  function startCheckout(sku) {
    var output = document.getElementById('bazi-ai-output');
    if (output) output.textContent = T.checkout;
    fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Chart is too big for Stripe metadata (~500 char limit); resend
      // from sessionStorage after return. We store only a tiny marker.
      body: JSON.stringify({
        sku: sku,
        payload: { lang: lang, hasChart: true },
        returnPath: '/bazi.html?lang=' + lang,
      }),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.url) window.location.href = d.url;
        else if (output) output.textContent = T.errNetwork;
      })
      .catch(function () { if (output) output.textContent = T.errNetwork; });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var date = form.querySelector('input[name=date]').value;
    var time = form.querySelector('input[name=time]').value;
    var gender = form.querySelector('input[name=gender]:checked').value;
    if (!date) return;
    var parts = date.split('-').map(Number);
    var timeParts = (time || '12:00').split(':').map(Number);
    var btn = document.getElementById('btn-submit');
    var originalLabel = btn.textContent;
    btn.textContent = T.submitting;

    fetch('/api/bazi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        year: parts[0], month: parts[1], day: parts[2],
        hour: timeParts[0], minute: timeParts[1],
        gender: gender, lang: lang,
      }),
    })
      .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      .then(function (chart) { renderChart(chart); })
      .catch(function () { alert(T.errBadInput); })
      .then(function () { btn.textContent = originalLabel; });
  });

  // Post-payment auto-run.
  (function () {
    var params = new URLSearchParams(window.location.search);
    if (params.get('payment') !== 'success') return;
    var sid = params.get('session_id');
    var sku = params.get('sku');
    if (!sid || !(sku === 'bazi-basic' || sku === 'bazi-full')) return;

    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem('baziChart') || 'null'); } catch (_) {}
    if (!saved) return;

    renderChart(saved);
    var output = document.getElementById('bazi-ai-output');
    if (output) output.textContent = T.generating + '\n\n';

    fetch('/api/ai-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid, sku: sku, payload: { chart: saved, lang: lang } }),
    })
      .then(function (res) {
        if (!res.ok || !res.body) return res.text().then(function (t) { throw new Error(t); });
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buf = '';
        if (output) output.textContent = '';
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
              try { var token = JSON.parse(d); if (typeof token === 'string' && output) output.textContent += token; } catch (_) {}
            });
            return pump();
          });
        }
        return pump();
      })
      .catch(function () { if (output) output.textContent = T.errAi; });
  })();
})();
