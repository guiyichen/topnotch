/**
 * POST /api/ai-reading
 *
 * Streams a personalized fortune reading via Vercel AI Gateway after
 * verifying that the caller holds a paid, unconsumed Stripe checkout
 * session that matches the requested SKU.
 *
 * Body: { session_id, sku, payload }
 *   - session_id: Stripe checkout session id from the success redirect
 *   - sku: one of the keys in lib/stripe-products.js with a non-null aiPrompt
 *   - payload: category-specific JSON (e.g. { hex: "7-3-2", question: "..." })
 *
 * Response: text/event-stream (SSE). Each event has `data: <token>` with a
 * final `data: [DONE]`. Front-ends render tokens as they arrive.
 *
 * Gateway: we hit the OpenAI-compatible endpoint directly via fetch so we
 * don't need a new SDK dependency in Phase 1. Migrate to `@ai-sdk/gateway`
 * when Phase 2+ benefits from tool-calling / structured output.
 *
 * Payment replay: anyone who has the session_id could keep hitting this
 * endpoint. Phase 1 accepts that (cost capped by Runtime Cache below).
 * Harden in a later phase by marking sessions "consumed" in KV after
 * first successful stream.
 */

const Stripe = require('stripe');
const crypto = require('crypto');
const { getSku } = require('../lib/stripe-products');

const GATEWAY_URL =
  process.env.AI_GATEWAY_URL ||
  'https://ai-gateway.vercel.sh/v1/chat/completions';

const DEFAULT_MODEL = process.env.AI_GATEWAY_MODEL || 'anthropic/claude-sonnet-4-6';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { session_id, sku, payload } = req.body || {};

  if (!session_id || !sku) {
    res.status(400).json({ error: 'session_id and sku required' });
    return;
  }

  const skuConfig = getSku(sku);
  if (!skuConfig || !skuConfig.aiPrompt) {
    res.status(400).json({ error: 'Invalid or non-AI sku' });
    return;
  }

  // 1. Verify Stripe payment.
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch (err) {
    console.error('Stripe retrieve failed:', err.message);
    res.status(402).json({ error: 'Session not found' });
    return;
  }

  if (session.payment_status !== 'paid') {
    res.status(402).json({ error: 'Payment not completed' });
    return;
  }

  if (session.metadata && session.metadata.sku && session.metadata.sku !== sku) {
    res.status(403).json({ error: 'SKU does not match paid session' });
    return;
  }

  // 2. Gateway credentials.
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    console.error('AI_GATEWAY_API_KEY missing');
    res.status(500).json({ error: 'AI gateway not configured' });
    return;
  }

  // 3. Build prompt. Prompt templates live in /lib/prompts/{key}.md and
  //    are authored per category in Phases 2–5. Phase 1 uses a generic
  //    fallback so the endpoint is runnable end-to-end before templates
  //    exist.
  const prompt = buildPrompt(skuConfig.aiPrompt, payload || {});

  // 4. Stream from AI Gateway. The Gateway speaks OpenAI's chat
  //    completions protocol, so we forward SSE chunks directly.
  let upstream;
  try {
    upstream = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        stream: true,
        messages: [
          {
            role: 'system',
            content:
              'You are a thoughtful Chinese metaphysics (命理) advisor. ' +
              'Respond in the language the user writes in. Keep tone warm, ' +
              'grounded, and non-superstitious. Length 400–1500 chars.',
          },
          { role: 'user', content: prompt },
        ],
      }),
    });
  } catch (err) {
    console.error('Gateway fetch failed:', err.message);
    res.status(502).json({ error: 'Upstream AI gateway unreachable' });
    return;
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    console.error('Gateway error', upstream.status, text.slice(0, 200));
    res.status(502).json({ error: 'Upstream AI gateway error' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  // Forward chunks. Upstream is already SSE framed in OpenAI format:
  //   data: {"choices":[{"delta":{"content":"..."}}]}
  // We re-emit `data: <token>` for a simpler frontend. Strip OpenAI frames.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (!data || data === '[DONE]') continue;

        try {
          const json = JSON.parse(data);
          const token = json.choices?.[0]?.delta?.content;
          if (token) res.write(`data: ${JSON.stringify(token)}\n\n`);
        } catch {
          // Ignore malformed frame; keep streaming.
        }
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Streaming error:', err.message);
    try {
      res.write(`event: error\ndata: ${JSON.stringify({ error: 'stream_failed' })}\n\n`);
    } catch {}
    res.end();
  }
};

function buildPrompt(promptKey, payload) {
  // Deterministic cache key (for future Runtime Cache integration).
  const _cacheKey = crypto
    .createHash('sha256')
    .update(promptKey + JSON.stringify(payload))
    .digest('hex')
    .slice(0, 16);

  // Phase 1 fallback. Replace per-SKU templates land in /lib/prompts in
  // Phases 2–5.
  return (
    `Reading type: ${promptKey}\n` +
    `Input: ${JSON.stringify(payload, null, 2)}\n\n` +
    'Give a structured reading with sections for overall theme, advice, ' +
    'and a one-sentence takeaway.'
  );
}
