/**
 * hreflang-regions.js — shared regional variant map for SEO hreflang.
 *
 * Rationale: we serve the same content under 6 base languages (en, zh,
 * ja, ko, es, fr), but real search engines index by regional locale
 * (en-US vs en-GB, zh-CN vs zh-TW, fr-FR vs fr-CA, es-ES vs es-MX).
 * Emitting regional alternates tells Google / Bing "serve this URL to
 * users in these regions too," widening capture without splitting the
 * content graph.
 *
 * Google's hreflang rule: multiple regional variants may point at the
 * same URL if the content is identical. We list the base language first
 * (acts as the macro-language fallback) followed by regional variants.
 *
 * Used by:
 *   - Edge templates (api/sign.tsx, api/yijing.tsx, api/zodiac.tsx,
 *     api/tarot.tsx, api/landing.tsx) — emits <link rel="alternate"> tags
 *   - scripts/generate-pages.js — emits <xhtml:link hreflang> entries
 *     in sitemap.xml
 *
 * Consumed via JSON import to keep Edge runtime bundle small (no
 * TypeScript type acrobatics needed on the consumer side).
 */

/** @type {Record<string, string[]>} */
const REGIONAL_VARIANTS = {
  // English — the de facto default. x-default falls back to en.
  en: ['en-US', 'en-GB', 'en-CA', 'en-AU'],
  // Chinese — Simplified (mainland) vs Traditional (TW/HK).
  // We only render Simplified for now; zh-TW/zh-HK users get the same
  // Simplified page until a Traditional translation pass lands.
  zh: ['zh-CN', 'zh-SG', 'zh-TW', 'zh-HK'],
  // Japanese — one region in practice.
  ja: ['ja-JP'],
  // Korean — one region in practice.
  ko: ['ko-KR'],
  // Spanish — Spain vs Latin America. es-419 is the broad LatAm tag.
  es: ['es-ES', 'es-MX', 'es-AR', 'es-419'],
  // French — France vs Canada (Quebec).
  fr: ['fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
};

/** Base language codes, in the order we prefer to emit. */
const BASE_LANGS = ['en', 'zh', 'ja', 'ko', 'es', 'fr'];

/**
 * All (hreflang, base-lang) pairs to emit, in the order Google prefers
 * (base first, then regional variants).
 *
 * @returns {Array<{ hreflang: string, baseLang: string }>}
 */
function allHreflangPairs() {
  const out = [];
  for (const base of BASE_LANGS) {
    out.push({ hreflang: base, baseLang: base });
    for (const region of (REGIONAL_VARIANTS[base] || [])) {
      out.push({ hreflang: region, baseLang: base });
    }
  }
  return out;
}

module.exports = { REGIONAL_VARIANTS, BASE_LANGS, allHreflangPairs };
