/**
 * generate-pages.js
 *
 * Pre-renders static per-sign landing pages for SEO.
 *
 * For each (language, sign) pair (6 langs × 100 signs = 600 pages) writes:
 *   public/sign/{lang}/{N}.html
 *
 * Also writes daily oracle pages:
 *   public/daily/{lang}.html
 *
 * And produces:
 *   public/sitemap.xml  — full multi-language sitemap with hreflang annotations
 *
 * Data sources (all already in repo, no new dependencies):
 *   public/i18n.js         (zh, en UI strings + 100 signs each)
 *   public/i18n-extra.js   (ja, ko, es, fr UI strings + 100 signs each)
 *   data/interpretations.json (zh-only detailed career/love/health/wealth per sign)
 *
 * Usage: `node scripts/generate-pages.js`
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// ---------- Config ----------
const SITE_URL = 'https://oracleday.xyz';
const LANGS = ['zh', 'en', 'ja', 'ko', 'es', 'fr'];
const SIGN_COUNT = 100;
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SIGN_DIR = path.join(PUBLIC_DIR, 'sign');
const DAILY_DIR = path.join(PUBLIC_DIR, 'daily');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const BUILD_DATE = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const BLOG_DIR = path.join(PUBLIC_DIR, 'blog');

// ---------- Load i18n into a Node context ----------
// Both i18n.js and i18n-extra.js are browser scripts that declare a top-level
// `const I18N = {...}` then attach extra languages. We run them in a vm
// sandbox to extract the I18N object without side effects.
function loadI18N() {
    // i18n.js auto-detects the active language on load using browser APIs;
    // we stub them so the script runs cleanly under Node.
    const noopStorage = {
        _data: {},
        getItem(k) { return this._data[k] || null; },
        setItem(k, v) { this._data[k] = String(v); },
        removeItem(k) { delete this._data[k]; },
    };
    const sandbox = {
        window: {},
        document: {},
        navigator: { language: 'en' },
        localStorage: noopStorage,
    };
    vm.createContext(sandbox);
    const src1 = fs.readFileSync(path.join(PUBLIC_DIR, 'i18n.js'), 'utf8');
    const src2 = fs.readFileSync(path.join(PUBLIC_DIR, 'i18n-extra.js'), 'utf8');
    // i18n.js declares I18N with `const` which is block-scoped in vm contexts
    // and won't attach to the sandbox automatically — export it explicitly.
    const src = src1 + '\n' + src2 + '\n;globalThis.I18N = I18N;';
    vm.runInContext(src, sandbox, { filename: 'i18n-combined.js' });
    if (!sandbox.I18N) throw new Error('I18N not found after running i18n files');
    return sandbox.I18N;
}

// ---------- Per-language static labels ----------
// Short labels used in generated page chrome (title, breadcrumbs, CTA).
// Full UI translations live in public/i18n.js; this is just what we need for the HTML shell.
const LABELS = {
    zh: {
        htmlLang: 'zh-CN',
        ogLocale: 'zh_CN',
        siteName: '有求必应签',
        titleSuffix: '观音灵签在线解签',
        signLabel: (n) => `观音灵签第${n}签`,
        signMetaKeywords: '观音灵签, 抽签, 求签, 灵签解签, 观世音菩萨',
        breadcrumbHome: '首页',
        breadcrumbAll: '全部签文',
        ctaDrawAgain: '🙏 点击重新抽签',
        poemHeading: '签诗',
        interpretationHeading: '签意解读',
        detailedHeading: '详细解签',
        careerLabel: '事业',
        loveLabel: '姻缘',
        healthLabel: '健康',
        wealthLabel: '财运',
        relatedHeading: '其他签文',
        dailyHeading: '今日一签',
        dailyIntro: '每日新签，日日好运。',
        metaDescPrefix: '观音灵签第',
        metaDescSuffix: '签诗原文与解签。',
        backToHome: '返回抽签',
        unlockCta: '🔓 解锁完整解签',
        shareHeading: '分享此签',
        shareTwitter: 'Twitter',
        sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp',
        shareLine: 'LINE',
        shareWeibo: '微博',
        shareCopy: '复制链接',
        shareCopied: '已复制',
    },
    en: {
        htmlLang: 'en',
        ogLocale: 'en_US',
        siteName: 'Oracle Day',
        titleSuffix: 'Guanyin Oracle Interpretation',
        signLabel: (n) => `Guanyin Oracle Lot ${n}`,
        signMetaKeywords: 'guanyin oracle, kau chim, chinese fortune sticks, lot meaning, divination',
        breadcrumbHome: 'Home',
        breadcrumbAll: 'All Signs',
        ctaDrawAgain: '🙏 Draw a New Fortune',
        poemHeading: 'Oracle Poem',
        interpretationHeading: 'Interpretation',
        detailedHeading: 'Detailed Reading',
        careerLabel: 'Career',
        loveLabel: 'Love',
        healthLabel: 'Health',
        wealthLabel: 'Wealth',
        relatedHeading: 'Other Signs',
        dailyHeading: "Today's Oracle",
        dailyIntro: 'A fresh sign, every single day.',
        metaDescPrefix: 'Guanyin Oracle Lot ',
        metaDescSuffix: ' — full poem and meaning.',
        backToHome: 'Back to Oracle',
        unlockCta: '🔓 Unlock Full Reading',
        shareHeading: 'Share this sign',
        shareTwitter: 'Twitter',
        sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp',
        shareLine: 'LINE',
        shareWeibo: 'Weibo',
        shareCopy: 'Copy link',
        shareCopied: 'Copied',
    },
    ja: {
        htmlLang: 'ja',
        ogLocale: 'ja_JP',
        siteName: '神籤占い',
        titleSuffix: '観音霊籤 解説',
        signLabel: (n) => `観音霊籤 第${n}番`,
        signMetaKeywords: '観音霊籤, おみくじ, 占い, 籤',
        breadcrumbHome: 'ホーム',
        breadcrumbAll: 'おみくじ一覧',
        ctaDrawAgain: '🙏 もう一度おみくじを引く',
        poemHeading: '籤詩',
        interpretationHeading: '解釈',
        detailedHeading: '詳しい解説',
        careerLabel: '仕事',
        loveLabel: '恋愛',
        healthLabel: '健康',
        wealthLabel: '金運',
        relatedHeading: '他のおみくじ',
        dailyHeading: '今日のおみくじ',
        dailyIntro: '毎日新しいおみくじで、良い運を引き寄せよう。',
        metaDescPrefix: '観音霊籤 第',
        metaDescSuffix: '番の詩と解説。',
        backToHome: 'トップに戻る',
        unlockCta: '🔓 詳細を見る',
        shareHeading: 'この籤をシェア',
        shareTwitter: 'Twitter',
        sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp',
        shareLine: 'LINE',
        shareWeibo: 'Weibo',
        shareCopy: 'リンクをコピー',
        shareCopied: 'コピーしました',
    },
    ko: {
        htmlLang: 'ko',
        ogLocale: 'ko_KR',
        siteName: '관음 영첨',
        titleSuffix: '관음영첨 해석',
        signLabel: (n) => `관음영첨 제${n}첨`,
        signMetaKeywords: '관음영첨, 점, 운세, 첨',
        breadcrumbHome: '홈',
        breadcrumbAll: '전체 첨',
        ctaDrawAgain: '🙏 다시 뽑기',
        poemHeading: '첨시',
        interpretationHeading: '해석',
        detailedHeading: '상세 풀이',
        careerLabel: '커리어',
        loveLabel: '사랑',
        healthLabel: '건강',
        wealthLabel: '재물',
        relatedHeading: '다른 첨',
        dailyHeading: '오늘의 첨',
        dailyIntro: '매일 새로운 첨, 좋은 운을 불러옵니다.',
        metaDescPrefix: '관음영첨 제',
        metaDescSuffix: '첨 시와 해석.',
        backToHome: '메인으로',
        unlockCta: '🔓 전체 풀이 보기',
        shareHeading: '이 첨을 공유',
        shareTwitter: 'Twitter',
        sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp',
        shareLine: 'LINE',
        shareWeibo: 'Weibo',
        shareCopy: '링크 복사',
        shareCopied: '복사됨',
    },
    es: {
        htmlLang: 'es',
        ogLocale: 'es_ES',
        siteName: 'Oráculo Guanyin',
        titleSuffix: 'Interpretación del Oráculo Guanyin',
        signLabel: (n) => `Oráculo Guanyin Bastón ${n}`,
        signMetaKeywords: 'oráculo chino, guanyin, bastones de la fortuna, adivinación',
        breadcrumbHome: 'Inicio',
        breadcrumbAll: 'Todos los bastones',
        ctaDrawAgain: '🙏 Sacar un nuevo bastón',
        poemHeading: 'Poema del oráculo',
        interpretationHeading: 'Interpretación',
        detailedHeading: 'Lectura detallada',
        careerLabel: 'Carrera',
        loveLabel: 'Amor',
        healthLabel: 'Salud',
        wealthLabel: 'Riqueza',
        relatedHeading: 'Otros bastones',
        dailyHeading: 'Oráculo de hoy',
        dailyIntro: 'Un bastón nuevo, cada día.',
        metaDescPrefix: 'Oráculo Guanyin Bastón ',
        metaDescSuffix: ' — poema y significado completos.',
        backToHome: 'Volver al oráculo',
        unlockCta: '🔓 Desbloquear lectura completa',
        shareHeading: 'Comparte este bastón',
        shareTwitter: 'Twitter',
        sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp',
        shareLine: 'LINE',
        shareWeibo: 'Weibo',
        shareCopy: 'Copiar enlace',
        shareCopied: 'Copiado',
    },
    fr: {
        htmlLang: 'fr',
        ogLocale: 'fr_FR',
        siteName: 'Oracle Guanyin',
        titleSuffix: 'Interprétation de l\'Oracle Guanyin',
        signLabel: (n) => `Oracle Guanyin Bâton ${n}`,
        signMetaKeywords: 'oracle chinois, guanyin, bâtons de divination, divination',
        breadcrumbHome: 'Accueil',
        breadcrumbAll: 'Tous les bâtons',
        ctaDrawAgain: '🙏 Tirer un nouveau bâton',
        poemHeading: 'Poème de l\'oracle',
        interpretationHeading: 'Interprétation',
        detailedHeading: 'Lecture détaillée',
        careerLabel: 'Carrière',
        loveLabel: 'Amour',
        healthLabel: 'Santé',
        wealthLabel: 'Richesse',
        relatedHeading: 'Autres bâtons',
        dailyHeading: 'Oracle du jour',
        dailyIntro: 'Un nouveau bâton, chaque jour.',
        metaDescPrefix: 'Oracle Guanyin Bâton ',
        metaDescSuffix: ' — poème et signification complets.',
        backToHome: 'Retour à l\'oracle',
        unlockCta: '🔓 Débloquer la lecture complète',
        shareHeading: 'Partager ce bâton',
        shareTwitter: 'Twitter',
        sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp',
        shareLine: 'LINE',
        shareWeibo: 'Weibo',
        shareCopy: 'Copier le lien',
        shareCopied: 'Copié',
    },
};

// ---------- Utils ----------
function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function truncate(s, n) {
    const clean = String(s).replace(/\s+/g, ' ').trim();
    return clean.length <= n ? clean : clean.slice(0, n - 1) + '…';
}

function mkdirp(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function writeFile(p, content) {
    mkdirp(path.dirname(p));
    fs.writeFileSync(p, content, 'utf8');
}

function signPath(lang, n) {
    return `/sign/${lang}/${n}.html`;
}

function signUrl(lang, n) {
    return `${SITE_URL}${signPath(lang, n)}`;
}

// ---------- HTML building blocks ----------
function analyticsHead() {
    // Same snippets as public/index.html so generated pages share the GA4/Clarity setup.
    return `
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', { send_page_view: true });
    </script>
    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
    </script>`;
}

function hreflangTags(n) {
    // 6 language alternates + x-default pointing to English.
    const tags = LANGS.map((l) =>
        `    <link rel="alternate" hreflang="${l}" href="${signUrl(l, n)}">`
    );
    tags.push(`    <link rel="alternate" hreflang="x-default" href="${signUrl('en', n)}">`);
    return tags.join('\n');
}

function jsonLd(lang, n, sign, L) {
    const url = signUrl(lang, n);
    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: L.signLabel(n),
                description: truncate(sign.freeExplanation || sign.text, 150),
                inLanguage: L.htmlLang,
                datePublished: BUILD_DATE,
                dateModified: BUILD_DATE,
                author: { '@type': 'Organization', name: L.siteName, url: SITE_URL },
                publisher: {
                    '@type': 'Organization',
                    name: L.siteName,
                    url: SITE_URL,
                    logo: { '@type': 'ImageObject', url: `${SITE_URL}/qtong.png` },
                },
                mainEntityOfPage: { '@type': 'WebPage', '@id': url },
                image: `${SITE_URL}/top_lucky.webp`,
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: L.breadcrumbHome, item: `${SITE_URL}/?lang=${lang}` },
                    { '@type': 'ListItem', position: 2, name: L.breadcrumbAll, item: `${SITE_URL}/sign/${lang}/1.html` },
                    { '@type': 'ListItem', position: 3, name: L.signLabel(n), item: url },
                ],
            },
        ],
    };
    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function relatedLinks(lang, n, L) {
    // Previous 3 and next 3 signs for crawl depth and user discovery.
    const items = [];
    for (let d = -3; d <= 3; d++) {
        if (d === 0) continue;
        const target = n + d;
        if (target < 1 || target > SIGN_COUNT) continue;
        items.push(
            `<li><a href="${signPath(lang, target)}">${escapeHtml(L.signLabel(target))}</a></li>`
        );
    }
    return `<ul class="related-signs">${items.join('')}</ul>`;
}

// Pre-built share links for each sign page. URLs are URL-encoded at build time
// so there's no client-side JS cost and the links still work with JS disabled.
function shareButtons(lang, n, sign, L) {
    const pageUrl = signUrl(lang, n);
    const pinImg = `${SITE_URL}/api/og?lang=${lang}&sign=${n}&format=pin`;
    const shareText = `${L.signLabel(n)} — ${truncate(sign.freeExplanation || sign.text, 110)}`;
    const enc = encodeURIComponent;
    return `
            <section class="share-section">
                <h2>${escapeHtml(L.shareHeading)}</h2>
                <div class="share-buttons">
                    <a class="share-btn share-twitter" target="_blank" rel="noopener"
                       href="https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(pageUrl + '?utm_source=twitter&utm_medium=share&utm_campaign=sign_' + n)}"
                       data-track="share_twitter">🐦 ${escapeHtml(L.shareTwitter)}</a>
                    <a class="share-btn share-pinterest" target="_blank" rel="noopener"
                       href="https://pinterest.com/pin/create/button/?url=${enc(pageUrl + '?utm_source=pinterest&utm_medium=share&utm_campaign=sign_' + n)}&media=${enc(pinImg)}&description=${enc(shareText)}"
                       data-track="share_pinterest">📌 ${escapeHtml(L.sharePinterest)}</a>
                    <a class="share-btn share-whatsapp" target="_blank" rel="noopener"
                       href="https://wa.me/?text=${enc(shareText + ' ' + pageUrl + '?utm_source=whatsapp&utm_medium=share&utm_campaign=sign_' + n)}"
                       data-track="share_whatsapp">💬 ${escapeHtml(L.shareWhatsApp)}</a>
                    <a class="share-btn share-line" target="_blank" rel="noopener"
                       href="https://social-plugins.line.me/lineit/share?url=${enc(pageUrl + '?utm_source=line&utm_medium=share&utm_campaign=sign_' + n)}"
                       data-track="share_line">🟢 ${escapeHtml(L.shareLine)}</a>
                    <a class="share-btn share-weibo" target="_blank" rel="noopener"
                       href="https://service.weibo.com/share/share.php?url=${enc(pageUrl + '?utm_source=weibo&utm_medium=share&utm_campaign=sign_' + n)}&title=${enc(shareText)}"
                       data-track="share_weibo">📣 ${escapeHtml(L.shareWeibo)}</a>
                    <button type="button" class="share-btn share-copy" data-track="share_copy"
                       onclick="navigator.clipboard.writeText('${pageUrl}').then(function(){this.textContent='✅ ${escapeHtml(L.shareCopied)}';}.bind(this))">🔗 ${escapeHtml(L.shareCopy)}</button>
                </div>
            </section>`;
}

// Contextual affiliate block — Amazon Associates products relevant to
// spirituality / meditation / divination. ASINs are placeholders and must be
// replaced with real ones after you're approved. Associate tag is read from
// env var AMAZON_ASSOC_TAG at build time, falling back to a placeholder.
function amazonProducts(lang, L) {
    const tag = process.env.AMAZON_ASSOC_TAG || 'oracledayxyz-20';
    // One product slot per context — kept lightweight to avoid dominating page.
    // Amazon has region-specific sites; use the closest locale match.
    const region = lang === 'ja' ? 'co.jp' : lang === 'fr' ? 'fr' : lang === 'es' ? 'es' : 'com';
    const heading = lang === 'zh' ? '相关开运好物' :
                    lang === 'ja' ? 'おすすめ開運グッズ' :
                    lang === 'ko' ? '추천 개운 아이템' :
                    lang === 'es' ? 'Productos relacionados' :
                    lang === 'fr' ? 'Produits associés' :
                    'Related Products';
    const disclosure = lang === 'zh' ? '（含联盟推广链接）' :
                       lang === 'ja' ? '（アフィリエイトリンクを含みます）' :
                       lang === 'ko' ? '(제휴 링크 포함)' :
                       lang === 'es' ? '(Contiene enlaces de afiliados)' :
                       lang === 'fr' ? '(Contient des liens d\'affiliation)' :
                       'Contains affiliate links';
    const items = [
        { asin: 'REPLACE_ASIN_1', label: lang === 'zh' ? '天然沉香手串' : 'Natural meditation mala beads' },
        { asin: 'REPLACE_ASIN_2', label: lang === 'zh' ? '禅意冥想坐垫' : 'Meditation cushion' },
        { asin: 'REPLACE_ASIN_3', label: lang === 'zh' ? '中式风水摆件' : 'Feng shui decor' },
    ];
    return `
            <section class="amazon-section">
                <h2>${escapeHtml(heading)}</h2>
                <p class="affiliate-disclosure">${escapeHtml(disclosure)}</p>
                <ul class="amazon-grid">
                    ${items.map(p => `<li><a target="_blank" rel="sponsored noopener"
                        href="https://www.amazon.${region}/dp/${p.asin}?tag=${tag}"
                        data-track="amazon_click">${escapeHtml(p.label)}</a></li>`).join('')}
                </ul>
            </section>`;
}

function adSenseBlock(slot) {
    // In-article responsive AdSense unit. Client & slot IDs are placeholders —
    // replace ca-pub-XXXXXXXXXX and data-ad-slot after AdSense approval.
    return `
            <div class="ad-slot" data-ad-slot="${slot}">
                <ins class="adsbygoogle"
                     style="display:block; text-align:center;"
                     data-ad-layout="in-article"
                     data-ad-format="fluid"
                     data-ad-client="ca-pub-XXXXXXXXXX"
                     data-ad-slot="${slot}"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>`;
}

function detailedReadingBlock(lang, signNum, L) {
    // interpretations.json is zh-only and keyed by "第N签".
    // For non-zh we show the four-dimension headers with teaser text and a CTA
    // back to the main SPA (where the paywall + Chinese reading live).
    const zhKey = `第${signNum}签`;
    if (lang === 'zh' && detailedData[zhKey]) {
        const d = detailedData[zhKey];
        return `
                <section class="detailed-reading">
                    <h2>${escapeHtml(L.detailedHeading)}</h2>
                    <div class="detailed-grid">
                        <div><h3>${escapeHtml(L.careerLabel)}</h3><p>${escapeHtml(d.career)}</p></div>
                        <div><h3>${escapeHtml(L.loveLabel)}</h3><p>${escapeHtml(d.love)}</p></div>
                        <div><h3>${escapeHtml(L.healthLabel)}</h3><p>${escapeHtml(d.health)}</p></div>
                        <div><h3>${escapeHtml(L.wealthLabel)}</h3><p>${escapeHtml(d.wealth)}</p></div>
                    </div>
                </section>`;
    }
    // Non-Chinese: show headers only with a CTA (detailed translations not yet available).
    return `
                <section class="detailed-reading">
                    <h2>${escapeHtml(L.detailedHeading)}</h2>
                    <div class="detailed-grid detailed-locked">
                        <div><h3>${escapeHtml(L.careerLabel)}</h3></div>
                        <div><h3>${escapeHtml(L.loveLabel)}</h3></div>
                        <div><h3>${escapeHtml(L.healthLabel)}</h3></div>
                        <div><h3>${escapeHtml(L.wealthLabel)}</h3></div>
                    </div>
                    <a class="cta-link" href="/?lang=${lang}" data-track="sign_page_unlock_cta">${escapeHtml(L.unlockCta)}</a>
                </section>`;
}

// ---------- Templates ----------
function renderSignPage(lang, n, sign) {
    const L = LABELS[lang];
    const title = `${L.signLabel(n)} - ${L.titleSuffix} | ${L.siteName}`;
    const metaDesc = truncate(`${L.metaDescPrefix}${n}${L.metaDescSuffix} ${sign.freeExplanation || sign.text}`, 155);
    const url = signUrl(lang, n);
    // Dynamic OG image — rendered by api/og.tsx on-demand and cached at the edge.
    const ogImage = `${SITE_URL}/api/og?lang=${lang}&sign=${n}`;
    const ogImagePin = `${SITE_URL}/api/og?lang=${lang}&sign=${n}&format=pin`;

    return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="REPLACE_WITH_GSC_TOKEN">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(metaDesc)}">
    <meta name="keywords" content="${escapeHtml(L.signMetaKeywords)}">
    <link rel="canonical" href="${url}">

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(L.signLabel(n))}">
    <meta property="og:description" content="${escapeHtml(truncate(sign.freeExplanation || sign.text, 200))}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="${L.ogLocale}">
    <meta property="og:site_name" content="${escapeHtml(L.siteName)}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(L.signLabel(n))}">
    <meta name="twitter:description" content="${escapeHtml(truncate(sign.freeExplanation || sign.text, 200))}">
    <meta name="twitter:image" content="${ogImage}">

    <!-- Pinterest vertical pin hint -->
    <meta property="og:image" content="${ogImagePin}">
    <meta property="og:image:width" content="1000">
    <meta property="og:image:height" content="1500">

    <!-- hreflang -->
${hreflangTags(n)}

    <link rel="stylesheet" href="/style.css?v=3">

    <!-- AdSense loader (replace ca-pub-XXXXXXXXXX after approval) -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
            crossorigin="anonymous"></script>

    <style>
        /* Minimal layout overrides so the generated static pages render well
           even before we extend style.css. */
        body.sign-page { background:#f7eed6; color:#2b1a0a; font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans",sans-serif; margin:0; line-height:1.7; }
        .sign-container { max-width: 780px; margin: 0 auto; padding: 32px 20px 80px; }
        .sign-container h1 { font-size: 2rem; margin:0 0 8px; color:#8B1A1A; }
        .breadcrumbs { font-size:.9rem; margin-bottom:16px; color:#6b4a2a; }
        .breadcrumbs a { color:#8B1A1A; text-decoration:none; }
        .breadcrumbs a:hover { text-decoration:underline; }
        .poem-block { background:#fff8e1; border-left: 4px solid #c9a227; padding: 16px 20px; margin: 20px 0; white-space: pre-line; font-size:1.05rem; }
        .interpretation-block { margin: 20px 0; }
        .detailed-reading { margin-top: 32px; }
        .detailed-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .detailed-grid > div { background:#fff; border-radius: 10px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,.06); }
        .detailed-grid h3 { margin: 0 0 8px; color: #8B1A1A; }
        .detailed-locked > div { opacity:.55; min-height: 64px; }
        .cta-link, .cta-button { display: inline-block; margin-top: 20px; padding: 12px 22px; background: linear-gradient(145deg,#FFD700,#FFA500); color:#8B4513; border-radius: 999px; text-decoration:none; font-weight: 700; }
        .cta-button:hover, .cta-link:hover { filter: brightness(1.05); }
        .related-signs { list-style:none; padding:0; display:flex; flex-wrap:wrap; gap:8px; }
        .related-signs li a { display:inline-block; padding: 6px 12px; background:#fff; border-radius: 6px; color:#8B1A1A; text-decoration:none; font-size:.92rem; }
        .related-signs li a:hover { background:#ffe8a3; }
        .back-cta { margin-top: 32px; text-align: center; }
        .share-section { margin-top: 32px; }
        .share-buttons { display:flex; flex-wrap:wrap; gap:10px; }
        .share-btn { display:inline-flex; align-items:center; padding:8px 14px; background:#fff; color:#2b1a0a; border:1px solid #e0cc94; border-radius:8px; text-decoration:none; font-size:.92rem; cursor:pointer; font-family:inherit; }
        .share-btn:hover { background:#fff8e1; }
        .amazon-section { margin-top: 32px; }
        .affiliate-disclosure { font-size:.82rem; color:#8b6f3a; margin:4px 0 12px; }
        .amazon-grid { list-style:none; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; }
        .amazon-grid li a { display:block; padding:14px; background:#fff; border-radius:8px; color:#8B4513; text-decoration:none; box-shadow:0 2px 6px rgba(0,0,0,.06); text-align:center; }
        .amazon-grid li a:hover { background:#fff8e1; }
        .ad-slot { margin: 24px 0; min-height: 100px; }
    </style>
${analyticsHead()}

    ${jsonLd(lang, n, sign, L)}
</head>
<body class="sign-page">
    <main class="sign-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="/?lang=${lang}">${escapeHtml(L.breadcrumbHome)}</a>
            &nbsp;›&nbsp;
            <a href="/sign/${lang}/1.html">${escapeHtml(L.breadcrumbAll)}</a>
            &nbsp;›&nbsp;
            <span>${escapeHtml(L.signLabel(n))}</span>
        </nav>

        <article>
            <h1>${escapeHtml(L.signLabel(n))}</h1>

            <section class="poem-section">
                <h2>${escapeHtml(L.poemHeading)}</h2>
                <div class="poem-block">${escapeHtml(sign.text)}</div>
            </section>

            <section class="interpretation-block">
                <h2>${escapeHtml(L.interpretationHeading)}</h2>
                <p>${escapeHtml(sign.freeExplanation || '')}</p>
            </section>

            ${detailedReadingBlock(lang, n, L)}

            ${adSenseBlock('1111111111')}

            <div class="back-cta">
                <a class="cta-button" href="/?lang=${lang}" data-track="sign_page_draw_again">${escapeHtml(L.ctaDrawAgain)}</a>
            </div>

            ${shareButtons(lang, n, sign, L)}

            ${amazonProducts(lang, L)}

            ${adSenseBlock('2222222222')}

            <section>
                <h2>${escapeHtml(L.relatedHeading)}</h2>
                ${relatedLinks(lang, n, L)}
            </section>
        </article>
    </main>
    <script>
        // Track sign page views with sign number for GA4 segmentation.
        (function(){
            if (typeof gtag === 'function') {
                gtag('event', 'view_sign_page', { sign_num: ${n}, lang: '${lang}' });
            }
            document.addEventListener('click', function(e){
                var el = e.target.closest('[data-track]');
                if (el && typeof gtag === 'function') {
                    gtag('event', 'sign_page_cta', { name: el.getAttribute('data-track'), sign_num: ${n}, lang: '${lang}' });
                }
            });
        })();
    </script>
</body>
</html>
`;
}

function renderDailyPage(lang) {
    const L = LABELS[lang];
    const url = `${SITE_URL}/daily/${lang}.html`;
    // Deterministic sign of the day from date string, computed client-side so
    // CDN cache stays friendly and content updates each calendar day without
    // a redeploy.
    return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(L.dailyHeading)} - ${escapeHtml(L.siteName)}</title>
    <meta name="description" content="${escapeHtml(L.dailyIntro + ' ' + L.siteName)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(L.dailyHeading)}">
    <meta property="og:description" content="${escapeHtml(L.dailyIntro)}">
    <meta property="og:image" content="${SITE_URL}/top_lucky.webp">
${LANGS.map((l) => `    <link rel="alternate" hreflang="${l}" href="${SITE_URL}/daily/${l}.html">`).join('\n')}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/daily/en.html">
    <link rel="stylesheet" href="/style.css?v=3">
${analyticsHead()}
</head>
<body>
    <main class="sign-container" style="max-width:780px;margin:0 auto;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
        <h1>${escapeHtml(L.dailyHeading)}</h1>
        <p>${escapeHtml(L.dailyIntro)}</p>
        <p id="daily-target">Loading…</p>
    </main>
    <script>
        // Hash today's date to pick one of ${SIGN_COUNT} signs deterministically per day.
        (function(){
            var date = new Date();
            var key = date.getUTCFullYear() + '-' + (date.getUTCMonth()+1) + '-' + date.getUTCDate();
            var hash = 0;
            for (var i = 0; i < key.length; i++) hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
            var n = (Math.abs(hash) % ${SIGN_COUNT}) + 1;
            window.location.replace('/sign/${lang}/' + n + '.html?src=daily');
        })();
    </script>
</body>
</html>
`;
}

// ---------- Sitemap ----------
function buildSitemap() {
    const urls = [];

    // Root
    urls.push({
        loc: `${SITE_URL}/`,
        alts: LANGS.map((l) => ({ lang: l, href: `${SITE_URL}/?lang=${l}` })),
        lastmod: BUILD_DATE,
        changefreq: 'weekly',
        priority: '1.0',
    });

    // Daily
    LANGS.forEach((l) => {
        urls.push({
            loc: `${SITE_URL}/daily/${l}.html`,
            alts: LANGS.map((ll) => ({ lang: ll, href: `${SITE_URL}/daily/${ll}.html` })),
            lastmod: BUILD_DATE,
            changefreq: 'daily',
            priority: '0.8',
        });
    });

    // Signs
    for (const l of LANGS) {
        for (let n = 1; n <= SIGN_COUNT; n++) {
            urls.push({
                loc: signUrl(l, n),
                alts: LANGS.map((ll) => ({ lang: ll, href: signUrl(ll, n) })),
                lastmod: BUILD_DATE,
                changefreq: 'monthly',
                priority: '0.7',
            });
        }
    }

    // Blog index + posts
    for (const lang of Object.keys(blogPosts)) {
        const indexHref = `${SITE_URL}/blog/${lang}/`;
        urls.push({
            loc: indexHref,
            // Blog content currently differs per language, so hreflang only
            // points at existing language variants of the index — no fake
            // cross-locale promises for posts that don't exist yet.
            alts: Object.keys(blogPosts).map((ll) => ({ lang: ll, href: `${SITE_URL}/blog/${ll}/` })),
            lastmod: BUILD_DATE,
            changefreq: 'weekly',
            priority: '0.6',
        });
        for (const p of blogPosts[lang]) {
            urls.push({
                loc: `${SITE_URL}/blog/${lang}/${p.slug}.html`,
                alts: [{ lang, href: `${SITE_URL}/blog/${lang}/${p.slug}.html` }],
                lastmod: p.meta.date || BUILD_DATE,
                changefreq: 'monthly',
                priority: '0.6',
            });
        }
    }

    const entries = urls
        .map((u) => {
            const alts = u.alts
                .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
                .join('\n');
            // Only emit x-default when multiple locales exist — single-locale
            // entries (e.g. blog posts that only have one translation) would
            // otherwise crash on .find().
            const enAlt = u.alts.find((a) => a.lang === 'en');
            const xDefault = u.alts.length > 1 && enAlt
                ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${enAlt.href}"/>`
                : '';
            return `  <url>
    <loc>${u.loc}</loc>
${alts}${xDefault}
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

// ---------- Blog: front-matter + minimal markdown renderer ----------
// Deliberately tiny — supports the subset of markdown the seed posts actually use:
// H1-H3, bold, italic, inline code, links, unordered lists, tables, paragraphs.
// No remote dep; keeps the build single-file and fast.

function parseFrontMatter(src) {
    const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) return { meta: {}, body: src };
    const meta = {};
    m[1].split(/\n/).forEach((line) => {
        const mm = line.match(/^(\w+):\s*(.*)$/);
        if (mm) meta[mm[1]] = mm[2].replace(/^['"]|['"]$/g, '');
    });
    return { meta, body: m[2] };
}

function inlineMd(s) {
    // Escape first, then restore inline formatting.
    let out = escapeHtml(s);
    // Inline code
    out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
    // Bold (must run before italic)
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italic
    out = out.replace(/(^|\W)\*([^*\n]+)\*/g, '$1<em>$2</em>');
    // Links — external opens in new tab with noopener for safety
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
        const external = /^https?:\/\//.test(href) && !href.includes('oracleday.xyz');
        const attrs = external ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${href}"${attrs}>${text}</a>`;
    });
    return out;
}

function renderMarkdown(md) {
    const lines = md.split(/\n/);
    const out = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        // Heading
        let hm = line.match(/^(#{1,4})\s+(.*)$/);
        if (hm) {
            const level = hm[1].length;
            out.push(`<h${level}>${inlineMd(hm[2])}</h${level}>`);
            i++;
            continue;
        }
        // Table (simple: header row | --- | body rows ... until blank)
        if (line.includes('|') && lines[i + 1] && /^\s*\|?[-\s|:]+\|?\s*$/.test(lines[i + 1])) {
            const header = line.split('|').map((c) => c.trim()).filter(Boolean);
            const rows = [];
            i += 2;
            while (i < lines.length && lines[i].includes('|')) {
                rows.push(lines[i].split('|').map((c) => c.trim()).filter(Boolean));
                i++;
            }
            let table = '<table><thead><tr>';
            header.forEach((h) => (table += `<th>${inlineMd(h)}</th>`));
            table += '</tr></thead><tbody>';
            rows.forEach((r) => {
                table += '<tr>';
                r.forEach((c) => (table += `<td>${inlineMd(c)}</td>`));
                table += '</tr>';
            });
            table += '</tbody></table>';
            out.push(table);
            continue;
        }
        // Unordered list
        if (/^\s*[-*]\s+/.test(line)) {
            const items = [];
            while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
                i++;
            }
            out.push('<ul>' + items.map((it) => `<li>${inlineMd(it)}</li>`).join('') + '</ul>');
            continue;
        }
        // Blockquote
        if (/^>\s?/.test(line)) {
            const chunks = [];
            while (i < lines.length && /^>\s?/.test(lines[i])) {
                chunks.push(lines[i].replace(/^>\s?/, ''));
                i++;
            }
            out.push(`<blockquote>${inlineMd(chunks.join(' '))}</blockquote>`);
            continue;
        }
        // Blank line: flush
        if (/^\s*$/.test(line)) {
            i++;
            continue;
        }
        // Paragraph — collect until blank
        const para = [];
        while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|[-*]\s|>\s|\|)/.test(lines[i])) {
            para.push(lines[i]);
            i++;
        }
        out.push(`<p>${inlineMd(para.join(' '))}</p>`);
    }
    return out.join('\n');
}

function renderBlogPost(lang, slug, post) {
    const L = LABELS[lang];
    const url = `${SITE_URL}/blog/${lang}/${slug}.html`;
    const ogImage = `${SITE_URL}/api/og?lang=${lang}&sign=1`; // Generic brand image
    const title = `${post.meta.title} | ${L.siteName}`;
    const desc = post.meta.description || '';
    const dateIso = post.meta.date || BUILD_DATE;

    const jsonLdData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.meta.title,
        description: desc,
        inLanguage: L.htmlLang,
        datePublished: dateIso,
        dateModified: dateIso,
        author: { '@type': 'Organization', name: L.siteName, url: SITE_URL },
        publisher: {
            '@type': 'Organization',
            name: L.siteName,
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/qtong.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        image: ogImage,
        keywords: post.meta.keywords || '',
    };

    return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="REPLACE_WITH_GSC_TOKEN">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(desc)}">
    <meta name="keywords" content="${escapeHtml(post.meta.keywords || '')}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(post.meta.title)}">
    <meta property="og:description" content="${escapeHtml(desc)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:locale" content="${L.ogLocale}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" href="/style.css?v=3">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
            crossorigin="anonymous"></script>
    <style>
        body.blog-page { background:#f7eed6; color:#2b1a0a; font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans",sans-serif; line-height:1.75; margin:0; }
        .blog-container { max-width: 720px; margin: 0 auto; padding: 40px 20px 80px; }
        .blog-container h1 { font-size: 2rem; color:#8B1A1A; margin-bottom: 12px; }
        .blog-container h2 { font-size: 1.4rem; color:#8B1A1A; margin-top: 2em; }
        .blog-container h3 { font-size: 1.15rem; color:#8B4513; margin-top: 1.6em; }
        .blog-meta { color:#8b6f3a; font-size:.92rem; margin-bottom: 32px; }
        .blog-container p { margin: 1em 0; }
        .blog-container a { color: #8B1A1A; }
        .blog-container blockquote { border-left: 4px solid #c9a227; margin: 1em 0; padding: .4em 1em; background:#fff8e1; color:#4a3010; }
        .blog-container table { border-collapse: collapse; width: 100%; margin: 1.2em 0; font-size:.95rem; }
        .blog-container th, .blog-container td { border: 1px solid #e0cc94; padding: 8px 10px; text-align:left; vertical-align: top; }
        .blog-container th { background:#fff8e1; }
        .blog-container ul { padding-left: 1.4em; }
        .blog-container code { background:#fff8e1; padding: 2px 6px; border-radius: 4px; font-size:.92em; }
        .blog-container .back-link { display:inline-block; margin-top: 24px; color:#8B1A1A; text-decoration:none; }
    </style>
${analyticsHead()}
    <script type="application/ld+json">${JSON.stringify(jsonLdData)}</script>
</head>
<body class="blog-page">
    <main class="blog-container">
        <nav class="breadcrumbs"><a href="/?lang=${lang}">${escapeHtml(L.breadcrumbHome)}</a> › <a href="/blog/${lang}/">Blog</a></nav>
        <h1>${escapeHtml(post.meta.title)}</h1>
        <div class="blog-meta">${escapeHtml(dateIso)} · ${escapeHtml(L.siteName)}</div>
        <article>
            ${renderMarkdown(post.body)}
        </article>
        <a class="back-link" href="/?lang=${lang}" data-track="blog_draw_cta">→ ${escapeHtml(L.ctaDrawAgain)}</a>
    </main>
    <script>
        document.addEventListener('click', function(e){
            var el = e.target.closest('[data-track]');
            if (el && typeof gtag === 'function') {
                gtag('event', 'blog_cta', { name: el.getAttribute('data-track'), lang: '${lang}' });
            }
        });
    </script>
</body>
</html>
`;
}

function renderBlogIndex(lang, posts) {
    const L = LABELS[lang];
    const url = `${SITE_URL}/blog/${lang}/`;
    const indexTitle = lang === 'zh' ? '签文博客 · 求签指南' :
                       lang === 'ja' ? 'おみくじブログ' :
                       lang === 'ko' ? '오라클 블로그' :
                       lang === 'es' ? 'Blog del oráculo' :
                       lang === 'fr' ? 'Blog de l\'oracle' :
                       'Oracle Blog';
    const items = posts.map((p) => `
        <li>
            <a href="/blog/${lang}/${p.slug}.html"><strong>${escapeHtml(p.meta.title)}</strong></a>
            <p class="blog-excerpt">${escapeHtml(p.meta.description || '')}</p>
            <span class="blog-date">${escapeHtml(p.meta.date || '')}</span>
        </li>`).join('');

    return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(indexTitle)} | ${L.siteName}</title>
    <meta name="description" content="${escapeHtml(indexTitle)}">
    <link rel="canonical" href="${url}">
    <link rel="stylesheet" href="/style.css?v=3">
    <style>
        body { background:#f7eed6; color:#2b1a0a; font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans",sans-serif; margin:0; }
        .blog-index { max-width: 720px; margin: 0 auto; padding: 40px 20px; }
        .blog-index h1 { color:#8B1A1A; }
        .blog-index ul { list-style:none; padding:0; }
        .blog-index li { background:#fff; padding: 18px; border-radius: 10px; margin: 14px 0; box-shadow: 0 2px 6px rgba(0,0,0,.06); }
        .blog-index a { color:#8B1A1A; text-decoration:none; font-size:1.1rem; }
        .blog-excerpt { color:#4a3010; font-size:.95rem; margin: 6px 0 0; }
        .blog-date { color:#8b6f3a; font-size:.85rem; }
    </style>
${analyticsHead()}
</head>
<body>
    <main class="blog-index">
        <nav><a href="/?lang=${lang}">← ${escapeHtml(L.backToHome)}</a></nav>
        <h1>${escapeHtml(indexTitle)}</h1>
        <ul>${items}</ul>
    </main>
</body>
</html>
`;
}

function loadBlogPosts() {
    // Returns { [lang]: [{ slug, meta, body }, ...] }
    const out = {};
    if (!fs.existsSync(CONTENT_DIR)) return out;
    for (const lang of fs.readdirSync(CONTENT_DIR)) {
        const dir = path.join(CONTENT_DIR, lang);
        if (!fs.statSync(dir).isDirectory()) continue;
        out[lang] = [];
        for (const file of fs.readdirSync(dir)) {
            if (!file.endsWith('.md')) continue;
            const src = fs.readFileSync(path.join(dir, file), 'utf8');
            const slug = file.replace(/\.md$/, '');
            const { meta, body } = parseFrontMatter(src);
            out[lang].push({ slug, meta, body });
        }
        out[lang].sort((a, b) => String(b.meta.date || '').localeCompare(a.meta.date || ''));
    }
    return out;
}

// ---------- Main ----------
const I18N = loadI18N();
const detailedData = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'data', 'interpretations.json'), 'utf8')
);
const blogPosts = loadBlogPosts();

function main() {
    let signPagesWritten = 0;
    let skipped = 0;

    // Clean any stale directories first to avoid orphan pages after edits.
    if (fs.existsSync(SIGN_DIR)) fs.rmSync(SIGN_DIR, { recursive: true, force: true });
    if (fs.existsSync(DAILY_DIR)) fs.rmSync(DAILY_DIR, { recursive: true, force: true });
    if (fs.existsSync(BLOG_DIR)) fs.rmSync(BLOG_DIR, { recursive: true, force: true });

    for (const lang of LANGS) {
        const pack = I18N[lang];
        if (!pack || !Array.isArray(pack.signs)) {
            console.warn(`[skip] no signs for lang=${lang}`);
            continue;
        }
        for (let n = 1; n <= SIGN_COUNT; n++) {
            const sign = pack.signs[n - 1];
            if (!sign) {
                skipped++;
                continue;
            }
            const html = renderSignPage(lang, n, sign);
            writeFile(path.join(SIGN_DIR, lang, `${n}.html`), html);
            signPagesWritten++;
        }
        writeFile(path.join(DAILY_DIR, `${lang}.html`), renderDailyPage(lang));
    }

    // Blog posts + per-language index
    let blogPagesWritten = 0;
    for (const lang of Object.keys(blogPosts)) {
        for (const post of blogPosts[lang]) {
            const html = renderBlogPost(lang, post.slug, post);
            writeFile(path.join(BLOG_DIR, lang, `${post.slug}.html`), html);
            blogPagesWritten++;
        }
        writeFile(path.join(BLOG_DIR, lang, 'index.html'), renderBlogIndex(lang, blogPosts[lang]));
    }

    const sitemap = buildSitemap();
    writeFile(SITEMAP_PATH, sitemap);

    console.log(`✔ Wrote ${signPagesWritten} sign pages (${skipped} skipped).`);
    console.log(`✔ Wrote ${LANGS.length} daily oracle pages.`);
    console.log(`✔ Wrote ${blogPagesWritten} blog posts + ${Object.keys(blogPosts).length} blog indexes.`);
    console.log(`✔ Wrote sitemap.xml with ${1 + LANGS.length + signPagesWritten + blogPagesWritten + Object.keys(blogPosts).length} URLs.`);
}

main();
