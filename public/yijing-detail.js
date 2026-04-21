/**
 * yijing-detail.js — Client logic on the hexagram reading page.
 *
 * Two responsibilities:
 *   1. If the URL has ?q=... (carried from the casting page), pre-fill
 *      the question textarea so the user doesn't retype it.
 *   2. Form submit -> create Stripe checkout -> on payment success
 *      redirect back with ?payment=success&session_id=... ; then
 *      automatically stream the AI reading from /api/ai-reading.
 *
 * SSE parsing: /api/ai-reading emits `data: <json-string-token>\n\n`
 * frames and a final `data: [DONE]\n\n`. We use the streaming fetch API
 * rather than EventSource so we can POST a body.
 */
(function () {
  'use strict';

  var form = document.getElementById('yijing-ai-form');
  var output = document.getElementById('yijing-ai-output');
  if (!form || !output) return;

  var hexId = form.getAttribute('data-hex-id');
  var lang = form.getAttribute('data-lang') || 'en';
  var params = new URLSearchParams(window.location.search);

  // Prefill question from ?q= (came from the coin-toss page).
  var preQ = params.get('q');
  if (preQ) form.querySelector('textarea[name=question]').value = preQ;

  // Post-payment: auto-run the reading.
  var paymentOk = params.get('payment') === 'success';
  var sessionId = params.get('session_id');
  var paidSku = params.get('sku');

  if (paymentOk && sessionId && paidSku === 'yijing-reading') {
    runReading(sessionId, preQ || '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var question = form.querySelector('textarea[name=question]').value.trim();
    if (!question) return;

    output.textContent = lang === 'zh' ? '正在跳转到支付...' : 'Redirecting to checkout...';

    var here = window.location.pathname + '?q=' + encodeURIComponent(question.slice(0, 200));

    fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sku: 'yijing-reading',
        payload: { hexId: Number(hexId), question: question.slice(0, 300) },
        returnPath: here,
      }),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.url) window.location.href = data.url;
        else {
          output.textContent = lang === 'zh' ? '支付创建失败，请重试' : 'Checkout failed, please retry.';
        }
      })
      .catch(function () {
        output.textContent = lang === 'zh' ? '网络错误，请重试' : 'Network error, please retry.';
      });
  });

  function runReading(sid, question) {
    output.textContent = lang === 'zh' ? '正在生成深度解读...\n\n' : 'Generating your reading...\n\n';

    fetch('/api/ai-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sid,
        sku: 'yijing-reading',
        payload: { hexId: Number(hexId), question: question },
      }),
    })
      .then(function (res) {
        if (!res.ok || !res.body) {
          return res.text().then(function (t) { throw new Error(t || 'AI error'); });
        }
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
              var trimmed = line.trim();
              if (!trimmed.startsWith('data:')) return;
              var data = trimmed.slice(5).trim();
              if (!data || data === '[DONE]') return;
              try {
                var token = JSON.parse(data);
                if (typeof token === 'string') output.textContent += token;
              } catch (_) {}
            });
            return pump();
          });
        }
        return pump();
      })
      .catch(function (err) {
        console.error('AI reading failed:', err);
        output.textContent = lang === 'zh'
          ? '解读生成失败，请联系客服并提供支付编号。'
          : 'Reading failed. Please contact support with your session id.';
      });
  }
})();
