/**
 * api/yijing.tsx — Edge function that serves 64 I Ching hexagram pages.
 *
 * Maps /yijing/{lang}/{id}.html -> /api/yijing?lang={lang}&id={id} via
 * vercel.json rewrite. Same Edge-only architecture as api/sign.tsx so we
 * avoid the static-file ENOENT class of issues at build time.
 *
 * Phase 2 content scope: canonical hexagram name, classical judgment
 * (卦辞 opening line, public domain), and a one-paragraph free-tier
 * analysis per language. Line-by-line 爻辞 is reserved for a later pass.
 *
 * The $0.99 deep AI reading button on this page POSTs to /api/ai-reading
 * with sku="yijing-reading" once the user has completed Stripe checkout.
 */

import yijingData from '../lib/yijing-data.json';

export const config = { runtime: 'edge' };

const SITE_URL = 'https://oracleday.xyz';
const HEX_COUNT = 64;

type LocaleBlock = { name: string; judgment: string; analysis: string };
type Hex = {
    id: number;
    binary: string;
    upper: string;
    lower: string;
    zh: LocaleBlock; en: LocaleBlock;
    ja?: LocaleBlock; ko?: LocaleBlock; es?: LocaleBlock; fr?: LocaleBlock;
};
const HEXAGRAMS = (yijingData as { hexagrams: Hex[] }).hexagrams;

const SUPPORTED_LANGS = ['zh', 'en', 'ja', 'ko', 'es', 'fr'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
// All 6 languages now have hex content; keep a fallback to en for safety.
const CONTENT_LANGS = new Set<Lang>(['zh', 'en', 'ja', 'ko', 'es', 'fr']);

// Regional hreflang variants — see lib/hreflang-regions.js for rationale.
// Duplicated here (not imported) to keep the Edge bundle self-contained.
const HREFLANG_VARIANTS: Record<Lang, string[]> = {
    en: ['en-US', 'en-GB', 'en-CA', 'en-AU'],
    zh: ['zh-CN', 'zh-SG', 'zh-TW', 'zh-HK'],
    ja: ['ja-JP'],
    ko: ['ko-KR'],
    es: ['es-ES', 'es-MX', 'es-AR', 'es-419'],
    fr: ['fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
};

type Labels = {
    htmlLang: string;
    ogLocale: string;
    siteName: string;
    titleSuffix: string;
    hexagramLabel: (id: number) => string;
    breadcrumbHome: string;
    breadcrumbAll: string;
    judgmentHeading: string;
    analysisHeading: string;
    lineHeading: string;
    deepReadingHeading: string;
    deepReadingDesc: string;
    deepReadingCta: string;
    drawAgainCta: string;
    backHome: string;
    disclaimer: string;
    metaDescPrefix: string;
};

const L: Record<Lang, Labels> = {
    zh: {
        htmlLang: 'zh-CN', ogLocale: 'zh_CN', siteName: '有求必应签', titleSuffix: '周易 64 卦在线解卦',
        hexagramLabel: (id) => `周易第${id}卦`,
        breadcrumbHome: '首页', breadcrumbAll: '64 卦总览',
        judgmentHeading: '卦辞', analysisHeading: '简析', lineHeading: '六爻',
        deepReadingHeading: 'AI 深度解读',
        deepReadingDesc: '输入你正在思考的问题，由 AI 结合此卦给出 500–1500 字的深度解读。',
        deepReadingCta: '🔓 解锁 AI 深度解读 $0.99',
        drawAgainCta: '🪙 重新起卦',
        backHome: '返回首页',
        disclaimer: '本站内容仅供娱乐参考，不构成任何医疗、法律或投资建议。',
        metaDescPrefix: '周易第',
    },
    en: {
        htmlLang: 'en', ogLocale: 'en_US', siteName: 'Oracle Day', titleSuffix: 'I Ching 64 Hexagrams Online',
        hexagramLabel: (id) => `I Ching Hexagram ${id}`,
        breadcrumbHome: 'Home', breadcrumbAll: 'All 64 Hexagrams',
        judgmentHeading: 'Judgment', analysisHeading: 'Reading', lineHeading: 'Six Lines',
        deepReadingHeading: 'AI Deep Reading',
        deepReadingDesc: 'Enter the question on your mind and get a 500–1500-word personalized interpretation.',
        deepReadingCta: '🔓 Unlock AI Deep Reading $0.99',
        drawAgainCta: '🪙 Cast Again',
        backHome: 'Back to Home',
        disclaimer: 'For entertainment only. Not medical, legal or investment advice.',
        metaDescPrefix: 'I Ching Hexagram ',
    },
    ja: {
        htmlLang: 'ja', ogLocale: 'ja_JP', siteName: '神籤占い', titleSuffix: '易経 64 卦オンライン',
        hexagramLabel: (id) => `易経 第${id}卦`,
        breadcrumbHome: 'ホーム', breadcrumbAll: '64 卦一覧',
        judgmentHeading: '卦辞', analysisHeading: '解説', lineHeading: '六爻',
        deepReadingHeading: 'AI 詳細解読',
        deepReadingDesc: 'ご質問を入力すると、この卦に基づく 500〜1500 字のパーソナライズ解読をお届けします。',
        deepReadingCta: '🔓 AI 詳細解読を解除 $0.99',
        drawAgainCta: '🪙 もう一度占う',
        backHome: 'ホームへ戻る',
        disclaimer: '本サイトの内容は娯楽目的です。医療・法律・投資の助言ではありません。',
        metaDescPrefix: '易経 第',
    },
    ko: {
        htmlLang: 'ko', ogLocale: 'ko_KR', siteName: 'Oracle Day', titleSuffix: '주역 64괘 온라인',
        hexagramLabel: (id) => `주역 제${id}괘`,
        breadcrumbHome: '홈', breadcrumbAll: '64괘 전체',
        judgmentHeading: '괘사', analysisHeading: '해석', lineHeading: '육효',
        deepReadingHeading: 'AI 심화 해석',
        deepReadingDesc: '질문을 입력하시면 이 괘에 기반한 500–1500자 맞춤 해석을 제공합니다.',
        deepReadingCta: '🔓 AI 심화 해석 해제 $0.99',
        drawAgainCta: '🪙 다시 점치기',
        backHome: '홈으로',
        disclaimer: '본 사이트는 오락 목적이며, 의료·법률·투자 조언이 아닙니다.',
        metaDescPrefix: '주역 제',
    },
    es: {
        htmlLang: 'es', ogLocale: 'es_ES', siteName: 'Oracle Day', titleSuffix: 'I Ching 64 Hexagramas Online',
        hexagramLabel: (id) => `I Ching Hexagrama ${id}`,
        breadcrumbHome: 'Inicio', breadcrumbAll: 'Los 64 Hexagramas',
        judgmentHeading: 'Sentencia', analysisHeading: 'Lectura', lineHeading: 'Seis Líneas',
        deepReadingHeading: 'Lectura Profunda IA',
        deepReadingDesc: 'Ingrese su pregunta y reciba una interpretación personalizada de 500–1500 palabras basada en este hexagrama.',
        deepReadingCta: '🔓 Desbloquear Lectura Profunda $0.99',
        drawAgainCta: '🪙 Tirar de nuevo',
        backHome: 'Volver al inicio',
        disclaimer: 'Solo con fines de entretenimiento. No es consejo médico, legal ni de inversión.',
        metaDescPrefix: 'I Ching Hexagrama ',
    },
    fr: {
        htmlLang: 'fr', ogLocale: 'fr_FR', siteName: 'Oracle Day', titleSuffix: 'Yi Jing 64 Hexagrammes en Ligne',
        hexagramLabel: (id) => `Yi Jing Hexagramme ${id}`,
        breadcrumbHome: 'Accueil', breadcrumbAll: 'Les 64 Hexagrammes',
        judgmentHeading: 'Sentence', analysisHeading: 'Lecture', lineHeading: 'Six Lignes',
        deepReadingHeading: 'Lecture Approfondie IA',
        deepReadingDesc: "Entrez votre question et recevez une interprétation personnalisée de 500–1500 caractères basée sur cet hexagramme.",
        deepReadingCta: '🔓 Débloquer la Lecture Approfondie $0.99',
        drawAgainCta: '🪙 Relancer',
        backHome: "Retour à l'accueil",
        disclaimer: "À titre de divertissement uniquement. Pas un avis médical, légal ou d'investissement.",
        metaDescPrefix: 'Yi Jing Hexagramme ',
    },
};

function escHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Render a hexagram as six stacked ASCII-art lines (top = pos 5, bottom = pos 0).
function renderHexagramAscii(binary: string): string {
    const lines: string[] = [];
    for (let pos = 5; pos >= 0; pos--) {
        lines.push(binary[pos] === '1' ? '━━━━━━━━━' : '━━━   ━━━');
    }
    return lines.join('\n');
}

function contentLang(lang: Lang): Lang {
    return CONTENT_LANGS.has(lang) ? lang : 'en';
}

function pickLangFromRequest(url: URL): Lang {
    const q = (url.searchParams.get('lang') || '').toLowerCase();
    if ((SUPPORTED_LANGS as readonly string[]).includes(q)) return q as Lang;
    return 'en';
}

function renderPage(hex: Hex, lang: Lang): string {
    const labels = L[lang];
    const cLang = contentLang(lang);
    const block = (hex[cLang] || hex.en) as LocaleBlock;
    const canonical = `${SITE_URL}/yijing/${lang}/${hex.id}.html`;
    const title = `${labels.hexagramLabel(hex.id)}・${block.name} - ${labels.titleSuffix}`;
    const metaDesc = `${block.name} — ${block.judgment} ${block.analysis}`.slice(0, 158);
    const ascii = renderHexagramAscii(hex.binary);

    // Emit base-language alternate + all regional variants pointing at
    // the same URL. Google uses these to serve locale-matched users.
    const hreflangs = SUPPORTED_LANGS.flatMap((l) => {
        const href = `${SITE_URL}/yijing/${l}/${hex.id}.html`;
        return [
            `<link rel="alternate" hreflang="${l}" href="${href}">`,
            ...HREFLANG_VARIANTS[l].map((r) => `<link rel="alternate" hreflang="${r}" href="${href}">`),
        ];
    }).concat(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/yijing/en/${hex.id}.html">`).join('');

    const related = [hex.id - 1, hex.id + 1]
        .filter((n) => n >= 1 && n <= HEX_COUNT)
        .map((n) => {
            const h = HEXAGRAMS[n - 1];
            const hBlock = (h[cLang] || h.en) as LocaleBlock;
            return `<li><a href="/yijing/${lang}/${n}.html">${labels.hexagramLabel(n)}・${escHtml(hBlock.name)}</a></li>`;
        })
        .join('');

    return `<!DOCTYPE html>
<html lang="${labels.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(metaDesc)}">
<link rel="canonical" href="${canonical}">
${hreflangs}
<meta property="og:type" content="article">
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(metaDesc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${labels.ogLocale}">
<meta name="robots" content="index, follow">
<link rel="stylesheet" href="/style.css?v=6">
<script type="application/ld+json">
${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: metaDesc,
    inLanguage: labels.htmlLang,
    url: canonical,
    publisher: { '@type': 'Organization', name: labels.siteName, url: SITE_URL },
})}
</script>
</head>
<body class="yijing-page">
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/">${escHtml(labels.breadcrumbHome)}</a> /
  <a href="/yijing.html?lang=${lang}">${escHtml(labels.breadcrumbAll)}</a> /
  <span>${escHtml(labels.hexagramLabel(hex.id))}</span>
</nav>

<article class="hex-article">
  <header class="hex-header">
    <h1>${escHtml(labels.hexagramLabel(hex.id))}・${escHtml(block.name)}</h1>
    <pre class="hex-ascii" aria-label="hexagram lines">${ascii}</pre>
    <p class="hex-trigrams">${escHtml(hex.upper)} / ${escHtml(hex.lower)}</p>
  </header>

  <section class="hex-section">
    <h2>${escHtml(labels.judgmentHeading)}</h2>
    <p class="hex-judgment">${escHtml(block.judgment)}</p>
  </section>

  <section class="hex-section">
    <h2>${escHtml(labels.analysisHeading)}</h2>
    <p>${escHtml(block.analysis)}</p>
  </section>

  <section class="hex-section hex-upgrade">
    <h2>${escHtml(labels.deepReadingHeading)}</h2>
    <p>${escHtml(labels.deepReadingDesc)}</p>
    <form id="yijing-ai-form" data-hex-id="${hex.id}" data-lang="${lang}">
      <textarea name="question" required maxlength="300" placeholder="${lang === 'zh' ? '你想问的事...' : 'Your question...'}" rows="3"></textarea>
      <button type="submit" class="unlock-btn">${escHtml(labels.deepReadingCta)}</button>
    </form>
    <div id="yijing-ai-output" aria-live="polite"></div>
  </section>

  <nav class="hex-related" aria-label="Related hexagrams">
    <ul>${related}</ul>
  </nav>

  <div class="hex-footer-actions">
    <a class="btn" href="/yijing.html?lang=${lang}">${escHtml(labels.drawAgainCta)}</a>
    <a class="btn btn-secondary" href="/?lang=${lang}">${escHtml(labels.backHome)}</a>
  </div>

  <p class="hex-disclaimer">${escHtml(labels.disclaimer)}</p>
</article>

<script src="/i18n-pages.js?v=1"></script>
<script src="/site-nav.js?v=2"></script>
<script src="/yijing-detail.js?v=1"></script>
</body>
</html>`;
}

export default async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const lang = pickLangFromRequest(url);
    const idStr = url.searchParams.get('id') || url.searchParams.get('n') || '1';
    const id = parseInt(idStr, 10);

    if (!Number.isFinite(id) || id < 1 || id > HEX_COUNT) {
        return new Response('Hexagram not found', { status: 404 });
    }

    const hex = HEXAGRAMS[id - 1];
    const html = renderPage(hex, lang);

    return new Response(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
        },
    });
}
