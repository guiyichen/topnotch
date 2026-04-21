/**
 * api/zodiac.tsx — Edge function for Western zodiac + Chinese sheng xiao
 * daily / weekly forecast pages.
 *
 * URL:   /zodiac/{lang}/{type}/{slug}.html
 *   type = "western" | "chinese"
 *   slug = sign slug (aries..pisces, or rat..pig)
 *
 * Forecast generation is **deterministic** by (date × sign × category):
 * the same day returns the same advice every time, across regions, with
 * no storage or Cron dependency. This keeps the Phase 3 surface small.
 * If we later want human-curated daily copy, swap pickPhrase() with a
 * lookup into KV written by a Cron job.
 *
 * The yearly AI forecast is an add-on: the page embeds a form that POSTs
 * to /api/create-checkout with sku "zodiac-yearly" ($1.99). After
 * payment, /api/ai-reading streams the long-form reading.
 */

import zodiacData from '../lib/zodiac-data.json';

export const config = { runtime: 'edge' };

const SITE_URL = 'https://oracleday.xyz';

type SignEntry = {
    slug: string;
    glyph: string;
    element?: string;
    dates_en?: string; dates_zh?: string; dates_ja?: string; dates_ko?: string; dates_es?: string; dates_fr?: string;
    zh: { name: string }; en: { name: string };
    ja?: { name: string }; ko?: { name: string }; es?: { name: string }; fr?: { name: string };
};

type PhrasePack = {
    overall: string[]; career: string[]; love: string[]; health: string[]; wealth: string[];
    lucky_color: string[]; lucky_number: string[];
};

type ZodiacData = {
    western: SignEntry[];
    chinese: SignEntry[];
    phrases: Record<string, PhrasePack>;
};
const D = zodiacData as ZodiacData;

const TYPES = ['western', 'chinese'] as const;
type ZType = (typeof TYPES)[number];
const PERIODS = ['daily', 'weekly'] as const;
type Period = (typeof PERIODS)[number];

const CONTENT_LANGS = ['zh', 'en', 'ja', 'ko', 'es', 'fr'] as const;
type Lang = (typeof CONTENT_LANGS)[number];

// Regional hreflang variants — shared intent with lib/hreflang-regions.js.
const HREFLANG_VARIANTS: Record<Lang, string[]> = {
    en: ['en-US', 'en-GB', 'en-CA', 'en-AU'],
    zh: ['zh-CN', 'zh-SG', 'zh-TW', 'zh-HK'],
    ja: ['ja-JP'], ko: ['ko-KR'],
    es: ['es-ES', 'es-MX', 'es-AR', 'es-419'],
    fr: ['fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
};

function djb2(s: string): number {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
}

function pick<T>(arr: T[], seed: string): T {
    return arr[djb2(seed) % arr.length];
}

function score(seed: string): number {
    // 1–5 stars, biased slightly positive (2–5 more common than 1).
    const v = djb2(seed) % 100;
    if (v < 5) return 1;
    if (v < 20) return 2;
    if (v < 50) return 3;
    if (v < 80) return 4;
    return 5;
}

function dateKey(d: Date): string {
    return d.toISOString().slice(0, 10); // YYYY-MM-DD UTC
}

function weekKey(d: Date): string {
    // ISO week-year + week number, crude: year + week-of-year.
    const firstDay = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const day = Math.floor((d.getTime() - firstDay.getTime()) / 86400000);
    const week = Math.ceil((day + firstDay.getUTCDay() + 1) / 7);
    return `${d.getUTCFullYear()}-W${week}`;
}

function findSign(type: ZType, slug: string): SignEntry | null {
    const list = type === 'western' ? D.western : D.chinese;
    return list.find((s) => s.slug === slug) || null;
}

type Forecast = {
    overall: string; career: string; love: string; health: string; wealth: string;
    score_overall: number; score_career: number; score_love: number;
    score_health: number; score_wealth: number;
    lucky_color: string; lucky_number: string;
};

function buildForecast(lang: Lang, type: ZType, slug: string, period: Period, now: Date): Forecast {
    const pack = D.phrases[lang];
    const key = period === 'weekly' ? weekKey(now) : dateKey(now);
    const base = `${key}|${type}|${slug}`;
    return {
        overall:     pick(pack.overall,     base + '|o'),
        career:      pick(pack.career,      base + '|c'),
        love:        pick(pack.love,        base + '|l'),
        health:      pick(pack.health,      base + '|h'),
        wealth:      pick(pack.wealth,      base + '|w'),
        score_overall: score(base + '|so'),
        score_career:  score(base + '|sc'),
        score_love:    score(base + '|sl'),
        score_health:  score(base + '|sh'),
        score_wealth:  score(base + '|sw'),
        lucky_color:  pick(pack.lucky_color,  base + '|lc'),
        lucky_number: pick(pack.lucky_number, base + '|ln'),
    };
}

function escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function stars(n: number): string { return '★'.repeat(n) + '☆'.repeat(5 - n); }

type L = {
    htmlLang: string; ogLocale: string; siteName: string;
    pageTitle: (sign: string, period: Period) => string;
    hdrDaily: string; hdrWeekly: string;
    overall: string; career: string; love: string; health: string; wealth: string;
    luckyColor: string; luckyNumber: string;
    aiHeading: string; aiDesc: string; aiCta: string;
    switchDaily: string; switchWeekly: string;
    backHome: string; disclaimer: string;
};

const LABEL: Record<Lang, L> = {
    zh: {
        htmlLang: 'zh-CN', ogLocale: 'zh_CN', siteName: '有求必应签',
        pageTitle: (sign, p) => `${sign}${p === 'weekly' ? '本周' : '今日'}运势`,
        hdrDaily: '今日运势', hdrWeekly: '本周运势',
        overall: '综合', career: '事业', love: '爱情', health: '健康', wealth: '财运',
        luckyColor: '幸运色', luckyNumber: '幸运数字',
        aiHeading: 'AI 年度运势深度解读',
        aiDesc: '基于你的生辰与今年星象/流年，生成 1000–2000 字个性化年度运势报告。',
        aiCta: '🔓 解锁年度深度运势 $1.99',
        switchDaily: '查看今日运势', switchWeekly: '查看本周运势',
        backHome: '返回首页',
        disclaimer: '本站内容仅供娱乐参考，不构成任何实质性建议。',
    },
    en: {
        htmlLang: 'en', ogLocale: 'en_US', siteName: 'Oracle Day',
        pageTitle: (sign, p) => `${sign} ${p === 'weekly' ? 'Weekly' : 'Daily'} Horoscope`,
        hdrDaily: "Today's Forecast", hdrWeekly: "This Week's Forecast",
        overall: 'Overall', career: 'Career', love: 'Love', health: 'Health', wealth: 'Wealth',
        luckyColor: 'Lucky Color', luckyNumber: 'Lucky Number',
        aiHeading: 'AI Yearly Deep Forecast',
        aiDesc: 'A 1000–2000-word personalized yearly outlook based on your birth date and current transits.',
        aiCta: '🔓 Unlock Yearly Deep Forecast $1.99',
        switchDaily: 'View today', switchWeekly: 'View this week',
        backHome: 'Back to home',
        disclaimer: 'For entertainment purposes only. Not any form of professional advice.',
    },
    ja: {
        htmlLang: 'ja', ogLocale: 'ja_JP', siteName: '神籤占い',
        pageTitle: (sign, p) => `${sign} ${p === 'weekly' ? '今週' : '今日'}の運勢`,
        hdrDaily: '今日の運勢', hdrWeekly: '今週の運勢',
        overall: '総合', career: '仕事運', love: '恋愛運', health: '健康運', wealth: '金運',
        luckyColor: 'ラッキーカラー', luckyNumber: 'ラッキーナンバー',
        aiHeading: 'AI 年間運勢詳細解読',
        aiDesc: 'あなたの生年月日と現在の星の巡りに基づき、1000〜2000 字のパーソナライズ年間運勢をお届けします。',
        aiCta: '🔓 年間詳細運勢を解除 $1.99',
        switchDaily: '今日の運勢を見る', switchWeekly: '今週の運勢を見る',
        backHome: 'ホームへ戻る',
        disclaimer: '本サイトの内容は娯楽目的です。専門的な助言ではありません。',
    },
    ko: {
        htmlLang: 'ko', ogLocale: 'ko_KR', siteName: 'Oracle Day',
        pageTitle: (sign, p) => `${sign} ${p === 'weekly' ? '이번 주' : '오늘의'} 운세`,
        hdrDaily: '오늘의 운세', hdrWeekly: '이번 주 운세',
        overall: '종합', career: '직업', love: '애정', health: '건강', wealth: '재물',
        luckyColor: '행운의 색', luckyNumber: '행운의 숫자',
        aiHeading: 'AI 연간 심화 운세',
        aiDesc: '생년월일과 현재 별자리 흐름을 바탕으로 1000–2000자 맞춤 연간 운세를 제공합니다.',
        aiCta: '🔓 연간 심화 운세 해제 $1.99',
        switchDaily: '오늘의 운세 보기', switchWeekly: '이번 주 운세 보기',
        backHome: '홈으로',
        disclaimer: '본 사이트는 오락 목적이며 전문적인 조언이 아닙니다.',
    },
    es: {
        htmlLang: 'es', ogLocale: 'es_ES', siteName: 'Oracle Day',
        pageTitle: (sign, p) => `Horóscopo ${p === 'weekly' ? 'Semanal' : 'Diario'} de ${sign}`,
        hdrDaily: 'Pronóstico de hoy', hdrWeekly: 'Pronóstico de la semana',
        overall: 'General', career: 'Carrera', love: 'Amor', health: 'Salud', wealth: 'Dinero',
        luckyColor: 'Color de la suerte', luckyNumber: 'Número de la suerte',
        aiHeading: 'Pronóstico Anual Profundo IA',
        aiDesc: 'Perspectiva anual personalizada de 1000–2000 palabras basada en su fecha de nacimiento y los tránsitos actuales.',
        aiCta: '🔓 Desbloquear Pronóstico Anual $1.99',
        switchDaily: 'Ver hoy', switchWeekly: 'Ver esta semana',
        backHome: 'Volver al inicio',
        disclaimer: 'Solo con fines de entretenimiento. No es consejo profesional.',
    },
    fr: {
        htmlLang: 'fr', ogLocale: 'fr_FR', siteName: 'Oracle Day',
        pageTitle: (sign, p) => `Horoscope ${p === 'weekly' ? 'Hebdomadaire' : 'du Jour'} · ${sign}`,
        hdrDaily: "Prévision du jour", hdrWeekly: "Prévision de la semaine",
        overall: 'Général', career: 'Carrière', love: 'Amour', health: 'Santé', wealth: 'Argent',
        luckyColor: 'Couleur porte-bonheur', luckyNumber: 'Nombre porte-bonheur',
        aiHeading: 'Prévision Annuelle Approfondie IA',
        aiDesc: "Perspective annuelle personnalisée de 1000–2000 caractères basée sur votre date de naissance et les transits actuels.",
        aiCta: '🔓 Débloquer la Prévision Annuelle $1.99',
        switchDaily: "Voir aujourd'hui", switchWeekly: 'Voir cette semaine',
        backHome: "Retour à l'accueil",
        disclaimer: "À titre de divertissement uniquement. Pas un conseil professionnel.",
    },
};

function pickLang(url: URL): Lang {
    const q = (url.searchParams.get('lang') || '').toLowerCase();
    return (CONTENT_LANGS as readonly string[]).includes(q) ? (q as Lang) : 'en';
}

function renderPage(opts: {
    lang: Lang; type: ZType; sign: SignEntry; period: Period; forecast: Forecast; now: Date;
}): string {
    const { lang, type, sign, period, forecast, now } = opts;
    const labels = LABEL[lang];
    const signName = (sign[lang] && sign[lang]!.name) || sign.en.name;
    const canonical = `${SITE_URL}/zodiac/${lang}/${type}/${sign.slug}.html`;
    const fullTitle = `${labels.pageTitle(signName, period)} - ${labels.siteName}`;
    const metaDesc = `${signName} · ${forecast.overall}`.slice(0, 158);

    const hreflangs = CONTENT_LANGS.flatMap((l) => {
        const href = `${SITE_URL}/zodiac/${l}/${type}/${sign.slug}.html`;
        return [
            `<link rel="alternate" hreflang="${l}" href="${href}">`,
            ...HREFLANG_VARIANTS[l].map((r) => `<link rel="alternate" hreflang="${r}" href="${href}">`),
        ];
    }).concat(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/zodiac/en/${type}/${sign.slug}.html">`).join('');

    const altPeriod: Period = period === 'daily' ? 'weekly' : 'daily';
    const altPeriodLabel = altPeriod === 'weekly' ? labels.switchWeekly : labels.switchDaily;
    const altPeriodHref = `${canonical}?period=${altPeriod}${lang !== 'en' ? '&lang=' + lang : ''}`;

    const periodTag = period === 'weekly' ? labels.hdrWeekly : labels.hdrDaily;
    const dateLabel = period === 'weekly' ? weekKey(now) : dateKey(now);

    return `<!DOCTYPE html>
<html lang="${labels.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(fullTitle)}</title>
<meta name="description" content="${escHtml(metaDesc)}">
<link rel="canonical" href="${canonical}">
${hreflangs}
<meta property="og:type" content="article">
<meta property="og:title" content="${escHtml(fullTitle)}">
<meta property="og:description" content="${escHtml(metaDesc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${labels.ogLocale}">
<meta name="robots" content="index, follow">
<link rel="stylesheet" href="/style.css?v=6">
<script type="application/ld+json">
${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fullTitle,
    description: metaDesc,
    datePublished: dateKey(now),
    inLanguage: labels.htmlLang,
    url: canonical,
    publisher: { '@type': 'Organization', name: labels.siteName, url: SITE_URL },
})}
</script>
</head>
<body class="zodiac-page">
<nav class="breadcrumbs">
  <a href="/">${lang === 'zh' ? '首页' : 'Home'}</a> /
  <a href="/zodiac.html?lang=${lang}">${lang === 'zh' ? '星座生肖' : 'Zodiac'}</a> /
  <span>${escHtml(signName)}</span>
</nav>

<article class="zodiac-article">
  <header class="zodiac-header">
    <div class="zodiac-glyph" aria-hidden="true">${sign.glyph}</div>
    <h1>${escHtml(signName)} · ${escHtml(periodTag)}</h1>
    <p class="zodiac-meta">${escHtml(dateLabel)}${sign.element ? ' · ' + escHtml(sign.element) : ''}${(sign as any)['dates_' + lang] ? ' · ' + escHtml((sign as any)['dates_' + lang]) : ''}</p>
  </header>

  <section class="zodiac-overall">
    <h2>${escHtml(labels.overall)} <span class="stars" title="${forecast.score_overall}/5">${stars(forecast.score_overall)}</span></h2>
    <p>${escHtml(forecast.overall)}</p>
  </section>

  <div class="zodiac-grid">
    <div class="zodiac-card"><h3>${escHtml(labels.career)} <span class="stars">${stars(forecast.score_career)}</span></h3><p>${escHtml(forecast.career)}</p></div>
    <div class="zodiac-card"><h3>${escHtml(labels.love)} <span class="stars">${stars(forecast.score_love)}</span></h3><p>${escHtml(forecast.love)}</p></div>
    <div class="zodiac-card"><h3>${escHtml(labels.health)} <span class="stars">${stars(forecast.score_health)}</span></h3><p>${escHtml(forecast.health)}</p></div>
    <div class="zodiac-card"><h3>${escHtml(labels.wealth)} <span class="stars">${stars(forecast.score_wealth)}</span></h3><p>${escHtml(forecast.wealth)}</p></div>
  </div>

  <div class="zodiac-lucky">
    <span><strong>${escHtml(labels.luckyColor)}:</strong> ${escHtml(forecast.lucky_color)}</span>
    <span><strong>${escHtml(labels.luckyNumber)}:</strong> ${escHtml(forecast.lucky_number)}</span>
  </div>

  <section class="hex-section hex-upgrade">
    <h2>${escHtml(labels.aiHeading)}</h2>
    <p>${escHtml(labels.aiDesc)}</p>
    <form id="zodiac-ai-form" data-type="${type}" data-slug="${sign.slug}" data-lang="${lang}">
      <input type="date" name="birth" required />
      <button type="submit" class="unlock-btn">${escHtml(labels.aiCta)}</button>
    </form>
    <div id="zodiac-ai-output" aria-live="polite"></div>
  </section>

  <div class="hex-footer-actions">
    <a class="btn" href="${altPeriodHref}">${escHtml(altPeriodLabel)}</a>
    <a class="btn btn-secondary" href="/?lang=${lang}">${escHtml(labels.backHome)}</a>
  </div>

  <p class="hex-disclaimer">${escHtml(labels.disclaimer)}</p>
</article>
<script src="/i18n-pages.js?v=1"></script>
<script src="/site-nav.js?v=2"></script>
<script src="/zodiac-detail.js?v=1"></script>
</body>
</html>`;
}

export default async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const lang = pickLang(url);
    const type = (url.searchParams.get('type') || '') as ZType;
    const slug = url.searchParams.get('slug') || '';
    const periodQ = (url.searchParams.get('period') || 'daily').toLowerCase() as Period;
    const period: Period = (PERIODS as readonly string[]).includes(periodQ) ? periodQ : 'daily';

    if (!(TYPES as readonly string[]).includes(type)) {
        return new Response('Unknown zodiac type', { status: 404 });
    }
    const sign = findSign(type, slug);
    if (!sign) return new Response('Unknown sign', { status: 404 });

    const now = new Date();
    const forecast = buildForecast(lang, type, slug, period, now);
    const html = renderPage({ lang, type, sign, period, forecast, now });

    return new Response(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            // Daily pages: cache until end-of-day UTC via shorter s-maxage.
            // 6h is a pragmatic balance: new visitors get fresh text when
            // the day rolls over without constant revalidation.
            'Cache-Control': 'public, max-age=1800, s-maxage=21600, stale-while-revalidate=3600',
        },
    });
}
