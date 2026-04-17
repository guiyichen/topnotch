/**
 * api/sign.tsx — Edge function that serves sign pages dynamically.
 *
 * Previously each of the 600 sign pages (6 langs × 100 signs) was written
 * as a static HTML file under public/sign/{lang}/{N}.html at build time.
 * Vercel's post-build scan repeatedly failed with ENOENT on a random one
 * of those files (52, 80, 39 — different file each build), even though
 * our generator wrote and fsync'd every single file successfully.
 *
 * The fix moves sign rendering from 600 static files to a single edge
 * function. A vercel.json rewrite maps the SEO-friendly
 * `/sign/{lang}/{N}.html` URLs to `/api/sign?lang={lang}&n={N}` — URLs are
 * unchanged, sitemap still valid, but Vercel only sees one route file.
 *
 * Content is cached at the edge for a year so subsequent requests are
 * served from the CDN without invoking the function.
 */

import signData from '../lib/sign-data.json';

export const config = {
    runtime: 'edge',
};

const SITE_URL = 'https://oracleday.xyz';
const SIGN_COUNT = 100;
const BUILD_DATE = new Date().toISOString().slice(0, 10);

type Sign = { num: string; text: string; freeExplanation?: string };
type Detailed = { career: string; love: string; health: string; wealth: string };
type SignDataShape = {
    signs: Record<string, Sign[]>;
    detailed: Record<string, Detailed>;
};
const data = signData as SignDataShape;

// ---------- Labels per language ----------
type LabelSet = {
    htmlLang: string;
    ogLocale: string;
    siteName: string;
    titleSuffix: string;
    signLabel: (n: number) => string;
    signMetaKeywords: string;
    breadcrumbHome: string;
    breadcrumbAll: string;
    ctaDrawAgain: string;
    poemHeading: string;
    interpretationHeading: string;
    detailedHeading: string;
    careerLabel: string;
    loveLabel: string;
    healthLabel: string;
    wealthLabel: string;
    relatedHeading: string;
    metaDescPrefix: string;
    metaDescSuffix: string;
    backToHome: string;
    unlockCta: string;
    shareHeading: string;
    shareTwitter: string;
    sharePinterest: string;
    shareWhatsApp: string;
    shareLine: string;
    shareWeibo: string;
    shareCopy: string;
    shareCopied: string;
};

const LABELS: Record<string, LabelSet> = {
    zh: {
        htmlLang: 'zh-CN', ogLocale: 'zh_CN', siteName: '有求必应签', titleSuffix: '观音灵签在线解签',
        signLabel: (n) => `观音灵签第${n}签`, signMetaKeywords: '观音灵签, 抽签, 求签, 灵签解签, 观世音菩萨',
        breadcrumbHome: '首页', breadcrumbAll: '全部签文', ctaDrawAgain: '🙏 点击重新抽签',
        poemHeading: '签诗', interpretationHeading: '签意解读', detailedHeading: '详细解签',
        careerLabel: '事业', loveLabel: '姻缘', healthLabel: '健康', wealthLabel: '财运',
        relatedHeading: '其他签文',
        metaDescPrefix: '观音灵签第', metaDescSuffix: '签诗原文与解签。',
        backToHome: '返回抽签', unlockCta: '🔓 解锁完整解签',
        shareHeading: '分享此签', shareTwitter: 'Twitter', sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp', shareLine: 'LINE', shareWeibo: '微博',
        shareCopy: '复制链接', shareCopied: '已复制',
    },
    en: {
        htmlLang: 'en', ogLocale: 'en_US', siteName: 'Oracle Day', titleSuffix: 'Guanyin Oracle Interpretation',
        signLabel: (n) => `Guanyin Oracle Lot ${n}`, signMetaKeywords: 'guanyin oracle, kau chim, chinese fortune sticks, lot meaning, divination',
        breadcrumbHome: 'Home', breadcrumbAll: 'All Signs', ctaDrawAgain: '🙏 Draw a New Fortune',
        poemHeading: 'Oracle Poem', interpretationHeading: 'Interpretation', detailedHeading: 'Detailed Reading',
        careerLabel: 'Career', loveLabel: 'Love', healthLabel: 'Health', wealthLabel: 'Wealth',
        relatedHeading: 'Other Signs',
        metaDescPrefix: 'Guanyin Oracle Lot ', metaDescSuffix: ' — full poem and meaning.',
        backToHome: 'Back to Oracle', unlockCta: '🔓 Unlock Full Reading',
        shareHeading: 'Share this sign', shareTwitter: 'Twitter', sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp', shareLine: 'LINE', shareWeibo: 'Weibo',
        shareCopy: 'Copy link', shareCopied: 'Copied',
    },
    ja: {
        htmlLang: 'ja', ogLocale: 'ja_JP', siteName: '神籤占い', titleSuffix: '観音霊籤 解説',
        signLabel: (n) => `観音霊籤 第${n}番`, signMetaKeywords: '観音霊籤, おみくじ, 占い, 籤',
        breadcrumbHome: 'ホーム', breadcrumbAll: 'おみくじ一覧', ctaDrawAgain: '🙏 もう一度おみくじを引く',
        poemHeading: '籤詩', interpretationHeading: '解釈', detailedHeading: '詳しい解説',
        careerLabel: '仕事', loveLabel: '恋愛', healthLabel: '健康', wealthLabel: '金運',
        relatedHeading: '他のおみくじ',
        metaDescPrefix: '観音霊籤 第', metaDescSuffix: '番の詩と解説。',
        backToHome: 'トップに戻る', unlockCta: '🔓 詳細を見る',
        shareHeading: 'この籤をシェア', shareTwitter: 'Twitter', sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp', shareLine: 'LINE', shareWeibo: 'Weibo',
        shareCopy: 'リンクをコピー', shareCopied: 'コピーしました',
    },
    ko: {
        htmlLang: 'ko', ogLocale: 'ko_KR', siteName: '관음 영첨', titleSuffix: '관음영첨 해석',
        signLabel: (n) => `관음영첨 제${n}첨`, signMetaKeywords: '관음영첨, 점, 운세, 첨',
        breadcrumbHome: '홈', breadcrumbAll: '전체 첨', ctaDrawAgain: '🙏 다시 뽑기',
        poemHeading: '첨시', interpretationHeading: '해석', detailedHeading: '상세 풀이',
        careerLabel: '커리어', loveLabel: '사랑', healthLabel: '건강', wealthLabel: '재물',
        relatedHeading: '다른 첨',
        metaDescPrefix: '관음영첨 제', metaDescSuffix: '첨 시와 해석.',
        backToHome: '메인으로', unlockCta: '🔓 전체 풀이 보기',
        shareHeading: '이 첨을 공유', shareTwitter: 'Twitter', sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp', shareLine: 'LINE', shareWeibo: 'Weibo',
        shareCopy: '링크 복사', shareCopied: '복사됨',
    },
    es: {
        htmlLang: 'es', ogLocale: 'es_ES', siteName: 'Oráculo Guanyin', titleSuffix: 'Interpretación del Oráculo Guanyin',
        signLabel: (n) => `Oráculo Guanyin Bastón ${n}`, signMetaKeywords: 'oráculo chino, guanyin, bastones de la fortuna, adivinación',
        breadcrumbHome: 'Inicio', breadcrumbAll: 'Todos los bastones', ctaDrawAgain: '🙏 Sacar un nuevo bastón',
        poemHeading: 'Poema del oráculo', interpretationHeading: 'Interpretación', detailedHeading: 'Lectura detallada',
        careerLabel: 'Carrera', loveLabel: 'Amor', healthLabel: 'Salud', wealthLabel: 'Riqueza',
        relatedHeading: 'Otros bastones',
        metaDescPrefix: 'Oráculo Guanyin Bastón ', metaDescSuffix: ' — poema y significado completos.',
        backToHome: 'Volver al oráculo', unlockCta: '🔓 Desbloquear lectura completa',
        shareHeading: 'Comparte este bastón', shareTwitter: 'Twitter', sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp', shareLine: 'LINE', shareWeibo: 'Weibo',
        shareCopy: 'Copiar enlace', shareCopied: 'Copiado',
    },
    fr: {
        htmlLang: 'fr', ogLocale: 'fr_FR', siteName: 'Oracle Guanyin', titleSuffix: "Interprétation de l'Oracle Guanyin",
        signLabel: (n) => `Oracle Guanyin Bâton ${n}`, signMetaKeywords: 'oracle chinois, guanyin, bâtons de divination, divination',
        breadcrumbHome: 'Accueil', breadcrumbAll: 'Tous les bâtons', ctaDrawAgain: '🙏 Tirer un nouveau bâton',
        poemHeading: "Poème de l'oracle", interpretationHeading: 'Interprétation', detailedHeading: 'Lecture détaillée',
        careerLabel: 'Carrière', loveLabel: 'Amour', healthLabel: 'Santé', wealthLabel: 'Richesse',
        relatedHeading: 'Autres bâtons',
        metaDescPrefix: 'Oracle Guanyin Bâton ', metaDescSuffix: ' — poème et signification complets.',
        backToHome: "Retour à l'oracle", unlockCta: '🔓 Débloquer la lecture complète',
        shareHeading: 'Partager ce bâton', shareTwitter: 'Twitter', sharePinterest: 'Pinterest',
        shareWhatsApp: 'WhatsApp', shareLine: 'LINE', shareWeibo: 'Weibo',
        shareCopy: 'Copier le lien', shareCopied: 'Copié',
    },
};

// ---------- Utils ----------
function escapeHtml(s: string): string {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function truncate(s: string, n: number): string {
    const clean = String(s).replace(/\s+/g, ' ').trim();
    return clean.length <= n ? clean : clean.slice(0, n - 1) + '…';
}

function signPath(lang: string, n: number): string {
    return `/sign/${lang}/${n}.html`;
}

function signUrl(lang: string, n: number): string {
    return `${SITE_URL}${signPath(lang, n)}`;
}

const LANGS = ['zh', 'en', 'ja', 'ko', 'es', 'fr'];

// ---------- HTML fragments ----------
function analyticsHead(): string {
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

function hreflangTags(n: number): string {
    const tags = LANGS.map((l) =>
        `    <link rel="alternate" hreflang="${l}" href="${signUrl(l, n)}">`
    );
    tags.push(`    <link rel="alternate" hreflang="x-default" href="${signUrl('en', n)}">`);
    return tags.join('\n');
}

function jsonLd(lang: string, n: number, sign: Sign, L: LabelSet): string {
    const url = signUrl(lang, n);
    const ogImage = `${SITE_URL}/api/og?lang=${lang}&sign=${n}`;

    const FAQ_I18N: Record<string, { q: string; a: string }[]> = {
        en: [
            { q: `What does Guanyin Oracle Lot ${n} mean?`, a: truncate(sign.freeExplanation || sign.text, 280) },
            { q: `How do I read a Guanyin Oracle poem?`, a: 'Read the four-line poem twice. Notice which image resonates with your specific question. The imagery is a mirror, not a literal forecast.' },
            { q: `Should I draw another stick if I don\'t like this one?`, a: 'Traditionally, no. The first stick is the answer. Re-drawing is considered refusing the answer rather than re-asking the question.' },
        ],
        zh: [
            { q: `观音灵签第${n}签什么意思？`, a: truncate(sign.freeExplanation || sign.text, 280) },
            { q: `观音灵签的签诗怎么读？`, a: '签诗读两遍，留意哪一句或哪一个意象与你的具体问题产生共鸣。签诗是镜子，不是字面的预言。' },
            { q: `抽到不喜欢的签可以重抽吗？`, a: '传统上不可以。第一支签就是答案。重抽等于拒绝答案而不是重新提问。' },
        ],
        ja: [
            { q: `観音霊籤 第${n}番の意味は？`, a: truncate(sign.freeExplanation || sign.text, 280) },
            { q: `おみくじの詩はどう読む？`, a: '四行詩を二度読み、質問と最も共鳴するイメージに注目します。詩は鏡であり、字義通りの予言ではありません。' },
            { q: `気に入らなかったらもう一度引いていい？`, a: '伝統的には不可。最初に引いた籤が答えであり、引き直しは答えを拒否することになります。' },
        ],
        ko: [
            { q: `관음영첨 제${n}첨은 무슨 뜻?`, a: truncate(sign.freeExplanation || sign.text, 280) },
            { q: `첨시는 어떻게 읽나요?`, a: '네 줄의 시를 두 번 읽고, 질문과 가장 공명하는 이미지를 포착합니다. 첨시는 거울이지 문자 그대로의 예언이 아닙니다.' },
            { q: `마음에 안 들면 다시 뽑아도 되나요?`, a: '전통적으로는 안 됩니다. 처음 뽑은 첨이 답이며 재뽑기는 답을 거부하는 것으로 간주됩니다.' },
        ],
        es: [
            { q: `¿Qué significa el Oráculo Guanyin Bastón ${n}?`, a: truncate(sign.freeExplanation || sign.text, 280) },
            { q: `¿Cómo se lee el poema del oráculo?`, a: 'Lee el poema de cuatro líneas dos veces. Observa qué imagen resuena con tu pregunta específica. La imagen es un espejo, no un pronóstico literal.' },
            { q: `¿Puedo sacar otro bastón si este no me gusta?`, a: 'Tradicionalmente no. El primer bastón es la respuesta. Volver a sacar se considera rechazar la respuesta, no reformular la pregunta.' },
        ],
        fr: [
            { q: `Que signifie l'Oracle Guanyin Bâton ${n} ?`, a: truncate(sign.freeExplanation || sign.text, 280) },
            { q: `Comment lire le poème de l'oracle ?`, a: "Lisez le poème de quatre lignes deux fois. Remarquez quelle image résonne avec votre question. L'image est un miroir, pas une prédiction littérale." },
            { q: `Puis-je tirer un autre bâton si celui-ci ne me plaît pas ?`, a: "Traditionnellement non. Le premier bâton est la réponse. Retirer équivaut à refuser la réponse plutôt qu'à reposer la question." },
        ],
    };
    const faq = FAQ_I18N[lang] || FAQ_I18N.en;

    const structured = {
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
                image: ogImage,
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: L.breadcrumbHome, item: `${SITE_URL}/?lang=${lang}` },
                    { '@type': 'ListItem', position: 2, name: L.breadcrumbAll, item: `${SITE_URL}/sign/${lang}/1.html` },
                    { '@type': 'ListItem', position: 3, name: L.signLabel(n), item: url },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: faq.map((item) => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
            },
        ],
    };
    return `<script type="application/ld+json">${JSON.stringify(structured)}</script>`;
}

function faqBlock(lang: string, n: number, sign: Sign): string {
    const packs: Record<string, { heading: string; items: { q: string; a: string }[] }> = {
        en: {
            heading: 'Frequently asked questions',
            items: [
                { q: `What does Guanyin Oracle Lot ${n} mean?`, a: truncate(sign.freeExplanation || sign.text, 280) },
                { q: 'How do I read a Guanyin Oracle poem?', a: 'Read the four-line poem twice. Notice which image resonates with your specific question. The imagery is a mirror, not a literal forecast.' },
                { q: "Should I draw another stick if I don't like this one?", a: 'Traditionally, no. The first stick is the answer. Re-drawing is considered refusing the answer rather than re-asking the question.' },
            ],
        },
        zh: {
            heading: '常见问题',
            items: [
                { q: `观音灵签第${n}签什么意思？`, a: truncate(sign.freeExplanation || sign.text, 280) },
                { q: '观音灵签的签诗怎么读？', a: '签诗读两遍，留意哪一句或哪一个意象与你的具体问题产生共鸣。签诗是镜子，不是字面的预言。' },
                { q: '抽到不喜欢的签可以重抽吗？', a: '传统上不可以。第一支签就是答案。重抽等于拒绝答案而不是重新提问。' },
            ],
        },
        ja: {
            heading: 'よくある質問',
            items: [
                { q: `観音霊籤 第${n}番の意味は？`, a: truncate(sign.freeExplanation || sign.text, 280) },
                { q: 'おみくじの詩はどう読む？', a: '四行詩を二度読み、質問と最も共鳴するイメージに注目します。詩は鏡であり、字義通りの予言ではありません。' },
                { q: '気に入らなかったらもう一度引いていい？', a: '伝統的には不可。最初に引いた籤が答えであり、引き直しは答えを拒否することになります。' },
            ],
        },
        ko: {
            heading: '자주 묻는 질문',
            items: [
                { q: `관음영첨 제${n}첨은 무슨 뜻?`, a: truncate(sign.freeExplanation || sign.text, 280) },
                { q: '첨시는 어떻게 읽나요?', a: '네 줄의 시를 두 번 읽고, 질문과 가장 공명하는 이미지를 포착합니다. 첨시는 거울이지 문자 그대로의 예언이 아닙니다.' },
                { q: '마음에 안 들면 다시 뽑아도 되나요?', a: '전통적으로는 안 됩니다. 처음 뽑은 첨이 답이며 재뽑기는 답을 거부하는 것으로 간주됩니다.' },
            ],
        },
        es: {
            heading: 'Preguntas frecuentes',
            items: [
                { q: `¿Qué significa el Oráculo Guanyin Bastón ${n}?`, a: truncate(sign.freeExplanation || sign.text, 280) },
                { q: '¿Cómo se lee el poema del oráculo?', a: 'Lee el poema de cuatro líneas dos veces. Observa qué imagen resuena con tu pregunta específica. La imagen es un espejo, no un pronóstico literal.' },
                { q: '¿Puedo sacar otro bastón si este no me gusta?', a: 'Tradicionalmente no. El primer bastón es la respuesta. Volver a sacar se considera rechazar la respuesta, no reformular la pregunta.' },
            ],
        },
        fr: {
            heading: 'Questions fréquentes',
            items: [
                { q: `Que signifie l'Oracle Guanyin Bâton ${n} ?`, a: truncate(sign.freeExplanation || sign.text, 280) },
                { q: "Comment lire le poème de l'oracle ?", a: "Lisez le poème de quatre lignes deux fois. Remarquez quelle image résonne avec votre question. L'image est un miroir, pas une prédiction littérale." },
                { q: 'Puis-je tirer un autre bâton si celui-ci ne me plaît pas ?', a: "Traditionnellement non. Le premier bâton est la réponse. Retirer équivaut à refuser la réponse plutôt qu'à reposer la question." },
            ],
        },
    };
    const pack = packs[lang] || packs.en;
    const items = pack.items.map((it) => `
                    <details>
                        <summary>${escapeHtml(it.q)}</summary>
                        <p>${escapeHtml(it.a)}</p>
                    </details>`).join('');
    return `
            <section class="faq-section" aria-labelledby="faq-heading-${n}">
                <h2 id="faq-heading-${n}">${escapeHtml(pack.heading)}</h2>
                ${items}
            </section>`;
}

function blogLinksBlock(lang: string): string {
    const BLOG: Record<string, { heading: string; posts: { href: string; title: string }[] }> = {
        en: {
            heading: 'Learn more about the Guanyin Oracle',
            posts: [
                { href: '/blog/en/how-to-draw-guanyin-oracle.html', title: "How to Draw a Guanyin Oracle Sign — Complete Beginner's Guide" },
                { href: '/blog/en/chinese-fortune-sticks-meaning.html', title: 'Chinese Fortune Sticks — What the 100 Numbers Actually Mean' },
                { href: '/blog/en/kau-chim-vs-tarot.html', title: 'Kau Chim vs Tarot — Which Oracle is More Accurate?' },
            ],
        },
        zh: {
            heading: '延伸阅读',
            posts: [
                { href: '/blog/zh/guanyin-lingqian-zhun-ma.html', title: '观音灵签准不准？一篇写给半信半疑的人看的文章' },
                { href: '/blog/zh/qiuqian-qian-yao-zuo-shenme.html', title: '求签前要做什么？一份给现代人的简易仪式' },
            ],
        },
    };
    const pack = BLOG[lang] || BLOG.en;
    const items = pack.posts.map((p) => `<li><a href="${p.href}" data-track="sign_to_blog">${escapeHtml(p.title)}</a></li>`).join('');
    return `
            <section class="blog-links-section">
                <h2>${escapeHtml(pack.heading)}</h2>
                <ul class="blog-links">${items}</ul>
            </section>`;
}

function relatedLinks(lang: string, n: number, L: LabelSet): string {
    const items: string[] = [];
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

function shareButtons(lang: string, n: number, sign: Sign, L: LabelSet): string {
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
                </div>
            </section>`;
}

function amazonProducts(lang: string): string {
    // Associate tag and ASINs are placeholders; replace after Amazon Associates approval.
    const tag = 'oracledayxyz-20';
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
                       lang === 'fr' ? "(Contient des liens d'affiliation)" :
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

function adSenseBlock(slot: string): string {
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

function detailedReadingBlock(lang: string, signNum: number, L: LabelSet): string {
    const zhKey = `第${signNum}签`;
    if (lang === 'zh' && data.detailed[zhKey]) {
        const d = data.detailed[zhKey];
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

function renderSignPage(lang: string, n: number, sign: Sign): string {
    const L = LABELS[lang];
    const title = `${L.signLabel(n)} - ${L.titleSuffix} | ${L.siteName}`;
    const metaDesc = truncate(`${L.metaDescPrefix}${n}${L.metaDescSuffix} ${sign.freeExplanation || sign.text}`, 155);
    const url = signUrl(lang, n);
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

    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(L.signLabel(n))}">
    <meta property="og:description" content="${escapeHtml(truncate(sign.freeExplanation || sign.text, 200))}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeHtml(L.signLabel(n))}">
    <meta property="og:locale" content="${L.ogLocale}">
    <meta property="og:site_name" content="${escapeHtml(L.siteName)}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(L.signLabel(n))}">
    <meta name="twitter:description" content="${escapeHtml(truncate(sign.freeExplanation || sign.text, 200))}">
    <meta name="twitter:image" content="${ogImage}">

    <meta name="pinterest:image" content="${ogImagePin}">

    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
    <link rel="preconnect" href="https://www.clarity.ms" crossorigin>
    <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>

${hreflangTags(n)}

    <link rel="stylesheet" href="/style.css?v=4">

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
            crossorigin="anonymous"></script>

    <style>
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
        .faq-section { margin-top: 32px; }
        .faq-section details { background:#fff; border:1px solid #e0cc94; border-radius:8px; padding:10px 14px; margin:8px 0; }
        .faq-section summary { cursor:pointer; font-weight:600; color:#8B4513; list-style:none; padding:4px 0; }
        .faq-section summary::-webkit-details-marker { display:none; }
        .faq-section details[open] summary { margin-bottom:8px; }
        .faq-section details p { margin:4px 0; color:#4a3010; font-size:.95rem; }
        .blog-links-section { margin-top:32px; }
        .blog-links { list-style:none; padding:0; }
        .blog-links li { background:#fff; padding:12px 16px; border-radius:8px; margin:8px 0; box-shadow:0 2px 6px rgba(0,0,0,.06); }
        .blog-links li a { color:#8B1A1A; text-decoration:none; font-weight:600; }
        .blog-links li a:hover { text-decoration:underline; }
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

            ${faqBlock(lang, n, sign)}

            ${blogLinksBlock(lang)}

            ${amazonProducts(lang)}

            ${adSenseBlock('2222222222')}

            <section>
                <h2>${escapeHtml(L.relatedHeading)}</h2>
                ${relatedLinks(lang, n, L)}
            </section>
        </article>
    </main>
    <script>
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
</html>`;
}

// ---------- Edge handler ----------
export function GET(req: Request) {
    const url = new URL(req.url);
    const lang = (url.searchParams.get('lang') || 'en').toLowerCase();
    const nRaw = url.searchParams.get('n') || '';
    const n = parseInt(nRaw, 10);

    if (!LABELS[lang] || !data.signs[lang] || isNaN(n) || n < 1 || n > SIGN_COUNT) {
        return new Response('Not found', {
            status: 404,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
    }

    const sign = data.signs[lang][n - 1];
    if (!sign) {
        return new Response('Sign not found', {
            status: 404,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
    }

    try {
        const html = renderSignPage(lang, n, sign);
        return new Response(html, {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                // Cache aggressively — sign content is effectively immutable.
                // stale-while-revalidate lets us push content updates via
                // redeploy without a cold miss for users.
                'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=604800',
            },
        });
    } catch (err) {
        console.error('[sign] render failed', { lang, n, err: String(err) });
        return new Response('Internal error', { status: 500 });
    }
}
