/**
 * zodiac-detail.js — AI yearly forecast client on zodiac reading pages.
 *
 * Flow:
 *   1. User submits birth date.
 *   2. Client POSTs to /api/create-checkout { sku: "zodiac-yearly",
 *      payload: { type, slug, birth, lang } }. Stripe redirects back
 *      with ?payment=success&session_id=...&sku=zodiac-yearly.
 *   3. On return, auto-stream from /api/ai-reading using the saved
 *      payload from Stripe session metadata.
 */
(function () {
  'use strict';
  var form = document.getElementById('zodiac-ai-form');
  var output = document.getElementById('zodiac-ai-output');
  if (!form || !output) return;

  var type = form.getAttribute('data-type');
  var slug = form.getAttribute('data-slug');
  var lang = form.getAttribute('data-lang') || 'en';
  var params = new URLSearchParams(window.location.search);

  if (params.get('payment') === 'success' && params.get('sku') === 'zodiac-yearly' && params.get('session_id')) {
    runReading(params.get('session_id'));
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var birth = form.querySelector('input[name=birth]').value;
    if (!birth) return;
    output.textContent = lang === 'zh' ? '正在跳转到支付...' : 'Redirecting to checkout...';

    fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sku: 'zodiac-yearly',
        payload: { type: type, slug: slug, birth: birth, lang: lang },
        returnPath: window.location.pathname,
      }),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.url) window.location.href = d.url;
        else output.textContent = lang === 'zh' ? '支付创建失败，请重试' : 'Checkout failed, please retry.';
      })
      .catch(function () {
        output.textContent = lang === 'zh' ? '网络错误，请重试' : 'Network error, please retry.';
      });
  });

  function runReading(sid) {
    output.textContent = lang === 'zh' ? '正在生成年度运势...\n\n' : 'Generating yearly forecast...\n\n';

    // The payload was saved into Stripe metadata at checkout time; we
    // resend what we know client-side so the AI prompt gets it too.
    fetch('/api/ai-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sid,
        sku: 'zodiac-yearly',
        payload: { type: type, slug: slug, lang: lang },
      }),
    })
      .then(function (res) {
        if (!res.ok || !res.body) return res.text().then(function (t) { throw new Error(t || 'AI error'); });
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buf = '';
        output.textContent = '';
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
              try { var token = JSON.parse(d); if (typeof token === 'string') output.textContent += token; } catch (_) {}
            });
            return pump();
          });
        }
        return pump();
      })
      .catch(function () {
        output.textContent = lang === 'zh'
          ? '生成失败，请联系客服并提供支付编号。'
          : 'Generation failed. Please contact support with your session id.';
      });
  }
})();
