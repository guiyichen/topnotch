/**
 * huangli.js — Client logic for /huangli.html.
 *
 * - Single-date lookup: GET /api/huangli?date=... and render.
 * - Auspicious date picker: client POSTs the date range to
 *   /api/create-checkout (sku: "huangli-picker"), then on return
 *   fetches /api/ai-reading which receives the pre-scanned almanac
 *   for each day in the range (server-side) + the event type.
 *
 * For Phase 5 we keep the picker simple: client passes the range, and
 * /api/ai-reading's generic prompt wrapper asks the model to reason
 * over the dates. In a follow-up pass /api/ai-reading can be taught to
 * pre-fetch the almanac for each date via /api/huangli before prompting.
 */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var lang = (urlLang || (navigator.language || 'en')).slice(0, 2).toLowerCase();
  if (SUPPORTED.indexOf(lang) === -1) lang = 'en';

  var STRINGS = {
    en: {
      title: 'Chinese Almanac · Huang Li',
      intro: 'See the lunar-date attributes, what is favorable and what to avoid on any date.',
      date: 'Date', lookup: 'Look up', looking: 'Looking up...',
      resultTitle: 'Almanac',
      yi: 'Favorable (宜)', ji: 'Unfavorable (忌)',
      chong: 'Clash', naYin: 'Na Yin',
      ganZhi: 'Day Pillar', lunar: 'Lunar Date',
      jiShen: 'Auspicious deities', xiongSha: 'Inauspicious deities',
      pengZu: 'Peng Zu taboos', positions: 'Directional deities',
      pickerHeading: 'AI Auspicious Date Picker',
      pickerDesc: "Tell us what you're planning — marriage, moving house, opening a business — and a date range. Our AI checks the almanac for each day and recommends the three most favorable.",
      event: 'Event type', start: 'Start', end: 'End',
      pickerCta: '🔓 Unlock AI Date Picker $1.99',
      checkout: 'Redirecting to checkout...',
      generating: 'Finding auspicious dates...',
      errNetwork: 'Network error, please retry.',
      errAi: 'Generation failed. Please contact support with your session id.',
      events: { wedding: 'Wedding (嫁娶)', moving: 'Moving (入宅)', business: 'Open business (开市)', travel: 'Travel (出行)', signing: 'Signing contract (立券)', renovation: 'Renovation (动土)' },
    },
    zh: {
      title: '中国黄历',
      intro: '查看任意日期的农历属性、宜与忌。',
      date: '日期', lookup: '查询', looking: '查询中...',
      resultTitle: '黄历',
      yi: '宜', ji: '忌',
      chong: '冲煞', naYin: '纳音',
      ganZhi: '日干支', lunar: '农历',
      jiShen: '吉神宜趋', xiongSha: '凶煞宜忌',
      pengZu: '彭祖百忌', positions: '神煞方位',
      pickerHeading: 'AI 择日助手',
      pickerDesc: '告诉我们你计划做什么（嫁娶、入宅、开市）与时间段，AI 将查阅每一天的黄历并推荐最吉利的三天。',
      event: '事件类型', start: '开始日期', end: '结束日期',
      pickerCta: '🔓 解锁 AI 择日 $1.99',
      checkout: '正在跳转到支付...',
      generating: '正在为你挑选吉日...',
      errNetwork: '网络错误，请重试。',
      errAi: '生成失败，请联系客服并提供支付编号。',
      events: { wedding: '嫁娶', moving: '入宅', business: '开市', travel: '出行', signing: '立券', renovation: '动土' },
    },
  };

  var T;
  if (STRINGS[lang]) {
    T = STRINGS[lang];
  } else {
    var common = window.getPageStrings('common', lang);
    var page = window.getPageStrings('huangli', lang);
    T = Object.assign({}, common, page);
    // Map i18n-pages "findingDates" to the legacy "generating" key used
    // in this file, and fill any missing keys from English.
    if (!T.generating && page.findingDates) T.generating = page.findingDates;
    Object.keys(STRINGS.en).forEach(function (k) { if (T[k] == null) T[k] = STRINGS.en[k]; });
  }

  var HTML_LANG_MAP = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko', es: 'es', fr: 'fr' };
  document.documentElement.lang = HTML_LANG_MAP[lang] || 'en';
  var brand = window.getPageStrings('nav', lang).brand || 'Oracle Day';
  document.title = T.title + ' | ' + brand;
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
  set('page-title', T.title);
  set('page-intro', T.intro);
  set('lbl-date', T.date);
  set('btn-lookup', T.lookup);
  set('picker-heading', T.pickerHeading);
  set('picker-desc', T.pickerDesc);
  set('lbl-event', T.event);
  set('lbl-start', T.start);
  set('lbl-end', T.end);
  set('btn-picker', T.pickerCta);
  var eventSel = document.querySelector('#picker-form select[name=event]');
  if (eventSel) Array.prototype.forEach.call(eventSel.options, function (opt) { if (T.events[opt.value]) opt.textContent = T.events[opt.value]; });

  // Default the date input to today.
  var today = new Date().toISOString().slice(0, 10);
  var dateInput = document.querySelector('input[name=date]');
  if (dateInput) dateInput.value = today;

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

  var resultEl = document.getElementById('huangli-result');

  function escHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function chips(arr) {
    return (arr || []).map(function (x) { return '<span class="chip">' + escHtml(x) + '</span>'; }).join('');
  }

  function renderAlmanac(a) {
    resultEl.hidden = false;
    resultEl.innerHTML =
      '<h2>' + T.resultTitle + ' · ' + a.solar.year + '-' + a.solar.month + '-' + a.solar.day + '</h2>' +
      '<div class="huangli-grid">' +
      '<div><strong>' + T.lunar + ':</strong> ' + escHtml(a.lunar.lunarString) + '</div>' +
      '<div><strong>' + T.ganZhi + ':</strong> ' + escHtml(a.lunar.dayGanZhi) + '</div>' +
      '<div><strong>' + T.naYin + ':</strong> ' + escHtml(a.naYin) + '</div>' +
      '<div><strong>' + T.chong + ':</strong> ' + escHtml(a.chong) + '</div>' +
      '</div>' +
      '<div class="huangli-yiji">' +
      '<div class="huangli-yi"><h3>' + T.yi + '</h3>' + chips(a.yi) + '</div>' +
      '<div class="huangli-ji"><h3>' + T.ji + '</h3>' + chips(a.ji) + '</div>' +
      '</div>' +
      (a.jiShen && a.jiShen.length ? '<div class="huangli-extra"><strong>' + T.jiShen + ':</strong> ' + chips(a.jiShen) + '</div>' : '') +
      (a.xiongSha && a.xiongSha.length ? '<div class="huangli-extra"><strong>' + T.xiongSha + ':</strong> ' + chips(a.xiongSha) + '</div>' : '');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function lookup(date) {
    fetch('/api/huangli?date=' + encodeURIComponent(date))
      .then(function (r) { return r.json(); })
      .then(function (a) { if (a && a.solar) renderAlmanac(a); });
  }

  // Auto-lookup for today on load.
  lookup(today);

  document.getElementById('huangli-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = document.querySelector('input[name=date]').value;
    if (v) lookup(v);
  });

  // AI picker checkout + post-payment stream.
  document.getElementById('picker-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var event = document.querySelector('#picker-form select[name=event]').value;
    var start = document.querySelector('#picker-form input[name=start]').value;
    var end = document.querySelector('#picker-form input[name=end]').value;
    var out = document.getElementById('picker-output');
    if (!event || !start || !end) return;
    if (out) out.textContent = T.checkout;
    try { sessionStorage.setItem('huangliPicker', JSON.stringify({ event: event, start: start, end: end })); } catch (_) {}

    fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sku: 'huangli-picker',
        payload: { event: event, start: start, end: end, lang: lang },
        returnPath: '/huangli.html?lang=' + lang,
      }),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.url) window.location.href = d.url;
        else if (out) out.textContent = T.errNetwork;
      })
      .catch(function () { if (out) out.textContent = T.errNetwork; });
  });

  (function () {
    var params = new URLSearchParams(window.location.search);
    if (params.get('payment') !== 'success' || params.get('sku') !== 'huangli-picker') return;
    var sid = params.get('session_id');
    if (!sid) return;
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem('huangliPicker') || 'null'); } catch (_) {}
    if (!saved) return;

    var out = document.getElementById('picker-output');
    if (out) out.textContent = T.generating + '\n\n';

    fetch('/api/ai-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sid, sku: 'huangli-picker',
        payload: { event: saved.event, start: saved.start, end: saved.end, lang: lang },
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
