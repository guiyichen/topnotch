/**
 * Centralized Stripe SKU catalog.
 *
 * All API routes that touch Stripe (create-checkout, verify-session,
 * ai-reading) import from here so SKUs, prices and AI-reading eligibility
 * stay in sync.
 *
 * Adding a new SKU:
 *   1. Add an entry to SKUS below.
 *   2. If it should unlock an AI reading, set `aiPrompt` to a key in
 *      /lib/prompts/{key}.md (see api/ai-reading.js).
 *   3. Wire the frontend button to POST /api/create-checkout { sku }.
 *
 * Why amounts here (not Stripe Price IDs):
 *   create-checkout.js uses `price_data` inline, so we don't need to
 *   pre-create Products/Prices in the Stripe dashboard. Trade-off: no
 *   Stripe-side analytics per SKU. Acceptable for the current scale.
 */

const SKUS = {
  // Legacy (kept for backwards compatibility with existing UI flow).
  draw: {
    name: 'Extra Fortune Draw',
    amount: 99,
    category: 'sign',
    aiPrompt: null,
  },
  interpretation: {
    name: 'Detailed Fortune Reading',
    amount: 199,
    category: 'sign',
    aiPrompt: null, // existing static interpretation, no LLM
  },

  // Phase 2 — Yijing / I Ching
  'yijing-reading': {
    name: 'I Ching Deep Reading',
    amount: 99,
    category: 'yijing',
    aiPrompt: 'yijing-reading',
  },

  // Phase 3 — Zodiac / Chinese zodiac
  'zodiac-yearly': {
    name: 'Yearly Zodiac Forecast',
    amount: 199,
    category: 'zodiac',
    aiPrompt: 'zodiac-yearly',
  },

  // Phase 4 — BaZi / Four Pillars
  'bazi-basic': {
    name: 'BaZi Basic AI Reading',
    amount: 299,
    category: 'bazi',
    aiPrompt: 'bazi-basic',
  },
  'bazi-full': {
    name: 'BaZi + Luck Pillars AI Reading',
    amount: 499,
    category: 'bazi',
    aiPrompt: 'bazi-full',
  },

  // Phase 5 — Tarot / Huangli
  'tarot-three': {
    name: 'Tarot Three-Card Reading',
    amount: 99,
    category: 'tarot',
    aiPrompt: 'tarot-three',
  },
  'tarot-celtic': {
    name: 'Tarot Celtic Cross Reading',
    amount: 499,
    category: 'tarot',
    aiPrompt: 'tarot-celtic',
  },
  'huangli-picker': {
    name: 'Auspicious Date Picker',
    amount: 199,
    category: 'huangli',
    aiPrompt: 'huangli-picker',
  },
};

function getSku(key) {
  return SKUS[key] || null;
}

function isValidSku(key) {
  return Object.prototype.hasOwnProperty.call(SKUS, key);
}

module.exports = { SKUS, getSku, isValidSku };
