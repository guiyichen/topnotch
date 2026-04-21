/**
 * api/tarot.tsx — Edge function for tarot per-card SEO pages.
 *
 * URL: /tarot/{lang}/{slug}.html — maps via vercel.json rewrite to
 *      /api/tarot?lang={lang}&slug={slug}.
 *
 * 78 × 2 langs = 156 SEO pages covering the full deck. Each page shows
 * the card's keywords, upright meaning, reversed meaning, and links to
 * the spread picker on /tarot.html for an interactive draw.
 *
 * Spread draws + AI readings happen entirely client-side in tarot.js
 * (a random draw has no URL identity worth caching), so this function
 * only serves the canonical card pages.
 */

import tarotData from '../lib/tarot-data.json';

export const config = { runtime: 'edge' };

const SITE_URL = 'https://oracleday.xyz';

type CardBlock = { name: string; keywords: string; upright: string; reversed: string };
type Card = {
    id: number; slug: string; suit?: string; rank?: number;
    zh: CardBlock; en: CardBlock;
    ja?: CardBlock; ko?: CardBlock; es?: CardBlock; fr?: CardBlock;
};
const ALL_CARDS: Card[] = [
    ...(tarotData as { major: Card[]; minor: Card[] }).major,
    ...(tarotData as { major: Card[]; minor: Card[] }).minor,
];
const BY_SLUG: Record<string, Card> = ALL_CARDS.reduce((acc, c) => { acc[c.slug] = c; return acc; }, {} as Record<string, Card>);

const CONTENT_LANGS = ['zh', 'en', 'ja', 'ko', 'es', 'fr'] as const;
type Lang = (typeof CONTENT_LANGS)[number];

const HREFLANG_VARIANTS: Record<Lang, string[]> = {
    en: ['en-US', 'en-GB', 'en-CA', 'en-AU'],
    zh: ['zh-CN', 'zh-SG', 'zh-TW', 'zh-HK'],
    ja: ['ja-JP'], ko: ['ko-KR'],
    es: ['es-ES', 'es-MX', 'es-AR', 'es-419'],
    fr: ['fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
};

function escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function pickLang(url: URL): Lang {
    const q = (url.searchParams.get('lang') || '').toLowerCase();
    return (CONTENT_LANGS as readonly string[]).includes(q) ? (q as Lang) : 'en';
}

type LabelSet = {
    htmlLang: string; ogLocale: string; siteName: string;
    arcana: (isMajor: boolean, suit?: string) => string;
    keywords: string; upright: string; reversed: string;
    aiHeading: string; aiDesc: string; aiCta: string;
    drawBtn: string; backHome: string; disclaimer: string;
};

const SUIT_ZH: Record<string, string> = { wands: '权杖', cups: '圣杯', swords: '宝剑', pentacles: '钱币' };
const SUIT_EN: Record<string, string> = { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' };
const SUIT_JA: Record<string, string> = { wands: 'ワンド', cups: 'カップ', swords: 'ソード', pentacles: 'ペンタクル' };
const SUIT_KO: Record<string, string> = { wands: '완드', cups: '컵', swords: '소드', pentacles: '펜타클' };
const SUIT_ES: Record<string, string> = { wands: 'Bastos', cups: 'Copas', swords: 'Espadas', pentacles: 'Oros' };
const SUIT_FR: Record<string, string> = { wands: 'Bâtons', cups: 'Coupes', swords: 'Épées', pentacles: 'Deniers' };

const LABELS: Record<Lang, LabelSet> = {
    zh: {
        htmlLang: 'zh-CN', ogLocale: 'zh_CN', siteName: '有求必应签',
        arcana: (isMajor, suit) => isMajor ? '大阿卡那' : ('小阿卡那 · ' + (SUIT_ZH[suit || ''] || '')),
        keywords: '关键词', upright: '正位', reversed: '逆位',
        aiHeading: 'AI 塔罗解读', aiDesc: '抽三张或十张，结合你的问题由 AI 整合解读。',
        aiCta: '🪄 开始塔罗占卜', drawBtn: '开始抽牌', backHome: '返回首页',
        disclaimer: '本站内容仅供娱乐参考。',
    },
    en: {
        htmlLang: 'en', ogLocale: 'en_US', siteName: 'Oracle Day',
        arcana: (isMajor, suit) => isMajor ? 'Major Arcana' : ('Minor Arcana · ' + (SUIT_EN[suit || ''] || '')),
        keywords: 'Keywords', upright: 'Upright', reversed: 'Reversed',
        aiHeading: 'AI Tarot Reading', aiDesc: 'Draw a spread and get an AI-crafted reading woven around your question.',
        aiCta: '🪄 Start a tarot reading', drawBtn: 'Start drawing', backHome: 'Back to home',
        disclaimer: 'For entertainment purposes only.',
    },
    ja: {
        htmlLang: 'ja', ogLocale: 'ja_JP', siteName: '神籤占い',
        arcana: (isMajor, suit) => isMajor ? '大アルカナ' : ('小アルカナ · ' + (SUIT_JA[suit || ''] || '')),
        keywords: 'キーワード', upright: '正位置', reversed: '逆位置',
        aiHeading: 'AI タロット解読', aiDesc: 'スプレッドを引き、あなたの質問に沿った AI 解読を受け取れます。',
        aiCta: '🪄 タロット占いを始める', drawBtn: '引き始める', backHome: 'ホームへ戻る',
        disclaimer: '本サイトの内容は娯楽目的です。',
    },
    ko: {
        htmlLang: 'ko', ogLocale: 'ko_KR', siteName: 'Oracle Day',
        arcana: (isMajor, suit) => isMajor ? '메이저 아르카나' : ('마이너 아르카나 · ' + (SUIT_KO[suit || ''] || '')),
        keywords: '키워드', upright: '정방향', reversed: '역방향',
        aiHeading: 'AI 타로 해석', aiDesc: '스프레드를 뽑고 질문에 맞춘 AI 해석을 받으세요.',
        aiCta: '🪄 타로 점 시작', drawBtn: '카드 뽑기 시작', backHome: '홈으로',
        disclaimer: '본 사이트는 오락 목적으로만 제공됩니다.',
    },
    es: {
        htmlLang: 'es', ogLocale: 'es_ES', siteName: 'Oracle Day',
        arcana: (isMajor, suit) => isMajor ? 'Arcanos Mayores' : ('Arcanos Menores · ' + (SUIT_ES[suit || ''] || '')),
        keywords: 'Palabras clave', upright: 'Al derecho', reversed: 'Invertida',
        aiHeading: 'Lectura IA del Tarot', aiDesc: 'Haz una tirada y recibe una lectura IA hecha en torno a tu pregunta.',
        aiCta: '🪄 Comenzar lectura de tarot', drawBtn: 'Empezar a sacar', backHome: 'Volver al inicio',
        disclaimer: 'Solo con fines de entretenimiento.',
    },
    fr: {
        htmlLang: 'fr', ogLocale: 'fr_FR', siteName: 'Oracle Day',
        arcana: (isMajor, suit) => isMajor ? 'Arcanes Majeurs' : ('Arcanes Mineurs · ' + (SUIT_FR[suit || ''] || '')),
        keywords: 'Mots-clés', upright: 'À l\u2019endroit', reversed: 'Inversée',
        aiHeading: 'Lecture IA du Tarot', aiDesc: "Tirez un jeu et recevez une lecture IA tissée autour de votre question.",
        aiCta: '🪄 Commencer une lecture de tarot', drawBtn: 'Commencer le tirage', backHome: "Retour à l'accueil",
        disclaimer: "À titre de divertissement uniquement.",
    },
};

function renderPage(card: Card, lang: Lang): string {
    const labels = LABELS[lang];
    const block = (card[lang] || card.en) as CardBlock;
    const isMajor = card.id < 22;
    const canonical = `${SITE_URL}/tarot/${lang}/${card.slug}.html`;
    const title = `${block.name} · ${labels.arcana(isMajor, card.suit)} - ${labels.siteName}`;
    const metaDesc = `${block.name} — ${block.keywords}. ${block.upright}`.slice(0, 158);

    const hreflangs = CONTENT_LANGS.flatMap((l) => {
        const href = `${SITE_URL}/tarot/${l}/${card.slug}.html`;
        return [
            `<link rel="alternate" hreflang="${l}" href="${href}">`,
            ...HREFLANG_VARIANTS[l].map((r) => `<link rel="alternate" hreflang="${r}" href="${href}">`),
        ];
    }).concat(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/tarot/en/${card.slug}.html">`).join('');

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
<body class="tarot-page">
<nav class="breadcrumbs">
  <a href="/">${lang === 'zh' ? '首页' : 'Home'}</a> /
  <a href="/tarot.html?lang=${lang}">${lang === 'zh' ? '塔罗' : 'Tarot'}</a> /
  <span>${escHtml(block.name)}</span>
</nav>
<article class="tarot-article">
  <header class="tarot-header">
    <div class="tarot-card-visual">
      <div class="tarot-id">${isMajor ? 'M' + card.id : (card.rank || '')}</div>
      <div class="tarot-card-name">${escHtml(block.name)}</div>
      <div class="tarot-arcana">${escHtml(labels.arcana(isMajor, card.suit))}</div>
    </div>
  </header>

  <section class="tarot-section">
    <h2>${escHtml(labels.keywords)}</h2>
    <p class="tarot-keywords">${escHtml(block.keywords)}</p>
  </section>
  <section class="tarot-section">
    <h2>${escHtml(labels.upright)}</h2>
    <p>${escHtml(block.upright)}</p>
  </section>
  <section class="tarot-section">
    <h2>${escHtml(labels.reversed)}</h2>
    <p>${escHtml(block.reversed)}</p>
  </section>

  <section class="hex-section hex-upgrade">
    <h2>${escHtml(labels.aiHeading)}</h2>
    <p>${escHtml(labels.aiDesc)}</p>
    <a class="unlock-btn" href="/tarot.html?lang=${lang}">${escHtml(labels.aiCta)}</a>
  </section>

  <div class="hex-footer-actions">
    <a class="btn" href="/tarot.html?lang=${lang}">${escHtml(labels.drawBtn)}</a>
    <a class="btn btn-secondary" href="/?lang=${lang}">${escHtml(labels.backHome)}</a>
  </div>
  <p class="hex-disclaimer">${escHtml(labels.disclaimer)}</p>
</article>
<script src="/i18n-pages.js?v=1"></script>
<script src="/site-nav.js?v=2"></script>
</body>
</html>`;
}

export default async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const lang = pickLang(url);
    const slug = url.searchParams.get('slug') || '';
    const card = BY_SLUG[slug];
    if (!card) return new Response('Card not found', { status: 404 });

    return new Response(renderPage(card, lang), {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
        },
    });
}
