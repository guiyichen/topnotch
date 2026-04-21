/**
 * api/landing.tsx — Edge-rendered landing pages for the 5 interactive
 * category tools: yijing, zodiac, bazi, tarot, huangli.
 *
 * Why this exists: the previous static HTML files (public/yijing.html
 * etc) hard-coded English meta title/description. Googlebot fetches the
 * canonical URL at crawl time and doesn't always execute client JS, so
 * the English <title> was indexed for all 6 languages — a clear SEO
 * loss. This function server-renders the correct <title>, <meta
 * description>, <html lang>, OG tags, and full hreflang set based on
 * the ?lang= query, so each locale's crawl shows locale-correct meta.
 *
 * Body structure mirrors the existing static HTMLs (the JS files still
 * hydrate interactive content client-side, and also re-localize body
 * strings). Keeping the same IDs and class names means we don't touch
 * the client JS at all — only the <head> changes.
 *
 * vercel.json rewrites map:
 *   /yijing.html   → /api/landing?page=yijing
 *   /zodiac.html   → /api/landing?page=zodiac
 *   /bazi.html     → /api/landing?page=bazi
 *   /tarot.html    → /api/landing?page=tarot
 *   /huangli.html  → /api/landing?page=huangli
 * The static HTML files are kept on disk as a fallback during local
 * development but the rewrite intercepts them in production.
 */

export const config = { runtime: 'edge' };

const SITE_URL = 'https://oracleday.xyz';

const SUPPORTED_LANGS = ['en', 'zh', 'ja', 'ko', 'es', 'fr'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const HREFLANG_VARIANTS: Record<Lang, string[]> = {
    en: ['en-US', 'en-GB', 'en-CA', 'en-AU'],
    zh: ['zh-CN', 'zh-SG', 'zh-TW', 'zh-HK'],
    ja: ['ja-JP'], ko: ['ko-KR'],
    es: ['es-ES', 'es-MX', 'es-AR', 'es-419'],
    fr: ['fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
};

const HTML_LANG: Record<Lang, string> = {
    en: 'en', zh: 'zh-CN', ja: 'ja', ko: 'ko', es: 'es', fr: 'fr',
};
const OG_LOCALE: Record<Lang, string> = {
    en: 'en_US', zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', es: 'es_ES', fr: 'fr_FR',
};

// ---------- per-page meta (server-rendered for SEO) ----------
type PageMeta = {
    slug: string;                           // also the URL path stem
    bodyClass: string;
    titles: Record<Lang, string>;
    descriptions: Record<Lang, string>;
    bodyHtml: string;                       // the interactive container HTML
    scripts: string[];                      // page-specific JS files
};

const PAGES: Record<string, PageMeta> = {
    yijing: {
        slug: 'yijing.html',
        bodyClass: 'yijing-page yijing-cast',
        titles: {
            en: 'I Ching Online · Three-Coin Casting | Oracle Day',
            zh: '周易起卦·三枚铜钱在线占卜 | 有求必应签',
            ja: '易経オンライン・三枚銅銭占い | 神籤占い',
            ko: '주역 온라인·세 동전 점괘 | Oracle Day',
            es: 'I Ching Online · Tirada de Tres Monedas | Oracle Day',
            fr: 'Yi Jing en ligne · Tirage à Trois Pièces | Oracle Day',
        },
        descriptions: {
            en: 'Free online I Ching divination. Cast three coins six times to generate your hexagram and receive a reading from the 64 classical hexagrams.',
            zh: '免费在线周易起卦占卜。投掷三枚铜钱六次生成你的本卦，从 64 卦经典中获得指引。',
            ja: '無料のオンライン易経占い。三枚の銅銭を六回投げて本卦を立て、64 卦の古典から示唆を得ます。',
            ko: '무료 온라인 주역 점괘. 세 동전을 여섯 번 던져 본괘를 얻고 64괘 고전에서 해석을 받습니다.',
            es: 'Adivinación gratis con I Ching en línea. Lanza tres monedas seis veces para generar tu hexagrama y recibe una lectura de los 64 hexagramas clásicos.',
            fr: "Divination gratuite Yi Jing en ligne. Lancez trois pièces six fois pour générer votre hexagramme et recevoir une lecture issue des 64 hexagrammes classiques.",
        },
        bodyHtml: `
<main class="yijing-main">
  <h1 id="page-title">I Ching · Three-Coin Casting</h1>
  <p id="page-intro">Focus on a question, then toss three coins six times. Each toss becomes one line of your hexagram, from bottom to top.</p>
  <section class="cast-area" aria-live="polite">
    <div class="cast-coins" id="cast-coins">
      <span class="coin" data-coin="0">?</span>
      <span class="coin" data-coin="1">?</span>
      <span class="coin" data-coin="2">?</span>
    </div>
    <div class="cast-progress">
      <span id="cast-step-label">Toss 1 of 6</span>
      <div class="cast-lines" id="cast-lines" aria-label="Building hexagram"></div>
    </div>
    <button id="cast-btn" class="unlock-btn cast-btn">🪙 <span id="cast-btn-label">Cast the coins</span></button>
    <form id="question-form" class="cast-question">
      <label for="cast-question"><span id="cast-question-label">Your question (optional)</span></label>
      <textarea id="cast-question" maxlength="300" rows="2" placeholder="What should I focus on this week?"></textarea>
    </form>
  </section>
  <nav class="hex-index" aria-label="All 64 hexagrams">
    <h2 id="index-title">Browse all 64 hexagrams</h2>
    <ul id="hex-index-list"></ul>
  </nav>
</main>`,
        scripts: ['i18n.js?v=6', 'i18n-extra.js?v=6', 'i18n-hub.js?v=1', 'yijing.js?v=1'],
    },

    zodiac: {
        slug: 'zodiac.html',
        bodyClass: 'zodiac-page zodiac-landing',
        titles: {
            en: 'Zodiac & Sheng Xiao Horoscopes | Oracle Day',
            zh: '星座 & 生肖运势 | 有求必应签',
            ja: '星座 & 干支運勢 | 神籤占い',
            ko: '별자리 & 띠 운세 | Oracle Day',
            es: 'Horóscopos Zodiaco & Sheng Xiao | Oracle Day',
            fr: 'Horoscopes Zodiaque & Sheng Xiao | Oracle Day',
        },
        descriptions: {
            en: 'Free daily and weekly horoscopes for 12 Western zodiac signs and 12 Chinese sheng xiao signs. Career, love, health, wealth.',
            zh: '免费每日和每周运势：12 星座与 12 生肖。事业、爱情、健康、财运。',
            ja: '12 星座と 12 干支の無料の毎日・週間運勢。仕事、恋愛、健康、金運。',
            ko: '12 별자리와 12띠의 무료 매일·주간 운세. 직업, 애정, 건강, 재물.',
            es: 'Horóscopos diarios y semanales gratuitos para los 12 signos del zodiaco y los 12 sheng xiao. Carrera, amor, salud, dinero.',
            fr: "Horoscopes gratuits quotidiens et hebdomadaires pour les 12 signes du zodiaque et les 12 sheng xiao. Carrière, amour, santé, argent.",
        },
        bodyHtml: `
<main class="zodiac-landing-main">
  <h1 id="page-title">Zodiac & Sheng Xiao Horoscopes</h1>
  <p id="page-intro">Pick your sign to see today's forecast and this week's outlook.</p>
  <section class="zodiac-picker">
    <h2 id="group-western">Western Zodiac</h2>
    <ul class="zodiac-list" id="list-western"></ul>
    <h2 id="group-chinese">Chinese Sheng Xiao</h2>
    <ul class="zodiac-list" id="list-chinese"></ul>
  </section>
</main>`,
        scripts: ['zodiac-landing.js?v=2'],
    },

    bazi: {
        slug: 'bazi.html',
        bodyClass: 'bazi-page',
        titles: {
            en: 'BaZi (Four Pillars) Calculator · AI Destiny Reading | Oracle Day',
            zh: '八字命盘·四柱计算·AI 深度解读 | 有求必应签',
            ja: '四柱推命・AI 命盤解読 | 神籤占い',
            ko: '사주팔자·AI 명리 해석 | Oracle Day',
            es: 'Calculadora BaZi (Cuatro Pilares) · Lectura IA | Oracle Day',
            fr: 'Calculateur BaZi (Quatre Piliers) · Lecture IA | Oracle Day',
        },
        descriptions: {
            en: 'Free BaZi / Four Pillars calculator. Enter your birth date and time to see your four pillars, ten gods, and five-element balance. Optional AI deep reading.',
            zh: '免费八字四柱在线排盘。输入生辰查看四柱、十神与五行分布。可选 AI 深度解读。',
            ja: '無料の四柱推命ツール。生年月日時を入力して四柱・十神・五行のバランスを確認。AI 詳細解読オプション。',
            ko: '무료 사주팔자 계산기. 생년월일시를 입력해 사주·십신·오행을 확인. 선택형 AI 심화 해석.',
            es: 'Calculadora gratuita BaZi / Cuatro Pilares. Ingresa fecha y hora de nacimiento para ver tus cuatro pilares, diez dioses y los cinco elementos. Lectura IA opcional.',
            fr: "Calculateur BaZi / Quatre Piliers gratuit. Entrez date et heure de naissance pour voir vos quatre piliers, dix dieux et les cinq éléments. Lecture IA optionnelle.",
        },
        bodyHtml: `
<main class="bazi-main">
  <header class="bazi-intro">
    <h1 id="page-title">BaZi (Four Pillars) Calculator</h1>
    <p id="page-intro">Enter your Solar (Gregorian) birth date and time. We compute your four pillars, ten gods, and five-element distribution. All computation happens on demand — nothing is stored.</p>
  </header>
  <form id="bazi-form" class="bazi-form" autocomplete="off">
    <div class="bazi-form-row">
      <label><span id="lbl-birth">Birth date</span>
        <input type="date" name="date" required />
      </label>
      <label><span id="lbl-time">Birth time</span>
        <input type="time" name="time" value="12:00" required />
      </label>
    </div>
    <div class="bazi-form-row">
      <label class="radio-group">
        <span id="lbl-gender">Gender</span>
        <label><input type="radio" name="gender" value="male" checked><span id="lbl-male">Male</span></label>
        <label><input type="radio" name="gender" value="female"><span id="lbl-female">Female</span></label>
      </label>
    </div>
    <button type="submit" class="unlock-btn bazi-submit"><span id="btn-submit">Compute chart</span></button>
    <p class="bazi-privacy" id="bazi-privacy">Birth data is not stored on our server. If you later unlock an AI reading, only the chart (not your raw birth date) is sent to the AI provider.</p>
  </form>
  <section id="bazi-result" class="bazi-result" hidden></section>
</main>`,
        scripts: ['bazi.js?v=2'],
    },

    tarot: {
        slug: 'tarot.html',
        bodyClass: 'tarot-page tarot-landing',
        titles: {
            en: 'Free Tarot Reading · Three-Card & Celtic Cross | Oracle Day',
            zh: '免费塔罗占卜·三张牌阵与凯尔特十字 | 有求必应签',
            ja: '無料タロット占い・スリーカード & ケルト十字 | 神籤占い',
            ko: '무료 타로 해석·세 장 스프레드 & 켈틱 크로스 | Oracle Day',
            es: 'Lectura de Tarot Gratis · Tres Cartas & Cruz Celta | Oracle Day',
            fr: 'Lecture du Tarot Gratuite · Trois Cartes & Croix Celtique | Oracle Day',
        },
        descriptions: {
            en: 'Free online tarot reading. Draw a three-card or Celtic Cross spread from the full 78-card deck and optionally unlock a personalized AI interpretation.',
            zh: '免费在线塔罗占卜。从完整 78 张牌中抽取三张或凯尔特十字牌阵，可选解锁个性化 AI 解读。',
            ja: '無料のオンラインタロット。78 枚フルデッキからスリーカードやケルト十字を引き、任意で AI 解読を解除できます。',
            ko: '무료 온라인 타로. 78장 전체 덱에서 세 장 또는 켈틱 크로스 스프레드를 뽑고, 선택형 AI 해석을 해제할 수 있습니다.',
            es: 'Lectura de tarot en línea gratuita. Saca tres cartas o una tirada de Cruz Celta de la baraja completa de 78 cartas y desbloquea una interpretación IA personalizada opcional.',
            fr: "Lecture gratuite de tarot en ligne. Tirez trois cartes ou une Croix Celtique depuis le jeu complet de 78 cartes et débloquez en option une interprétation IA personnalisée.",
        },
        bodyHtml: `
<main class="tarot-main">
  <h1 id="page-title">Free Tarot Reading</h1>
  <p id="page-intro">Focus on your question, choose a spread, and draw from the full 78-card deck.</p>
  <form id="tarot-form" class="tarot-form">
    <label><span id="lbl-question">Your question</span>
      <textarea name="question" rows="2" maxlength="300" placeholder="What should I focus on right now?"></textarea>
    </label>
    <div class="tarot-spread-choice">
      <label><input type="radio" name="spread" value="three" checked><span id="lbl-three">Three-card (Past / Present / Future) — free draw, $0.99 AI reading</span></label>
      <label><input type="radio" name="spread" value="celtic"><span id="lbl-celtic">Celtic Cross (10 cards) — free draw, $4.99 AI reading</span></label>
    </div>
    <button type="submit" class="unlock-btn tarot-draw-btn"><span id="btn-draw">Draw cards</span></button>
  </form>
  <section id="tarot-result" class="tarot-result" hidden></section>
  <nav class="tarot-index" aria-label="All 78 tarot cards">
    <h2 id="index-title">All 78 cards</h2>
    <div class="tarot-index-groups">
      <div><h3 id="grp-major">Major Arcana</h3><ul id="list-major"></ul></div>
      <div><h3 id="grp-wands">Wands</h3><ul id="list-wands"></ul></div>
      <div><h3 id="grp-cups">Cups</h3><ul id="list-cups"></ul></div>
      <div><h3 id="grp-swords">Swords</h3><ul id="list-swords"></ul></div>
      <div><h3 id="grp-pentacles">Pentacles</h3><ul id="list-pentacles"></ul></div>
    </div>
  </nav>
</main>`,
        scripts: ['tarot.js?v=2'],
    },

    huangli: {
        slug: 'huangli.html',
        bodyClass: 'huangli-page',
        titles: {
            en: 'Chinese Almanac · Auspicious Date Finder | Oracle Day',
            zh: '中国黄历·吉日选择器 | 有求必应签',
            ja: '中国黄暦・吉日選び | 神籤占い',
            ko: '중국 황력·길일 선택 | Oracle Day',
            es: 'Almanaque Chino · Selector de Fechas Auspiciosas | Oracle Day',
            fr: 'Almanach Chinois · Sélecteur de Dates Fastes | Oracle Day',
        },
        descriptions: {
            en: 'Free Chinese almanac (huangli) — see what is favorable (宜) and unfavorable (忌) on any date. Optional AI picker for marriage, moving, opening a business.',
            zh: '免费中国黄历查询 — 查看任意日期的宜忌。可选 AI 择日助手：嫁娶、入宅、开市。',
            ja: '無料の中国黄暦 — 任意の日付の宜（吉事）と忌（凶事）を確認。結婚・引っ越し・開業の AI 吉日選びも。',
            ko: '무료 중국 황력 — 임의 날짜의 의(길사)와 기(흉사)를 확인. 결혼·이사·개업을 위한 AI 택일도 제공.',
            es: 'Almanaque chino gratis (huangli) — ve lo favorable (宜) y lo desfavorable (忌) en cualquier fecha. Selector IA opcional para boda, mudanza, apertura de negocio.',
            fr: "Almanach chinois gratuit (huangli) — voyez le favorable (宜) et le défavorable (忌) un jour donné. Sélecteur IA optionnel pour mariage, déménagement, ouverture d'entreprise.",
        },
        bodyHtml: `
<main class="huangli-main">
  <header class="huangli-intro">
    <h1 id="page-title">Chinese Almanac · Huang Li</h1>
    <p id="page-intro">See the lunar-date attributes, what is favorable and what to avoid on any date.</p>
  </header>
  <form id="huangli-form" class="huangli-form">
    <label><span id="lbl-date">Date</span>
      <input type="date" name="date" required />
    </label>
    <button type="submit" class="unlock-btn"><span id="btn-lookup">Look up</span></button>
  </form>
  <section id="huangli-result" class="huangli-result" hidden></section>
  <section class="hex-section hex-upgrade" id="picker-section">
    <h2 id="picker-heading">AI Auspicious Date Picker</h2>
    <p id="picker-desc">Tell us what you're planning — marriage, moving house, opening a business — and a date range. Our AI checks the almanac for each day and recommends the three most favorable.</p>
    <form id="picker-form">
      <label><span id="lbl-event">Event type</span>
        <select name="event">
          <option value="wedding">Wedding (嫁娶)</option>
          <option value="moving">Moving (入宅)</option>
          <option value="business">Open business (开市)</option>
          <option value="travel">Travel (出行)</option>
          <option value="signing">Signing contract (立券)</option>
          <option value="renovation">Renovation (动土)</option>
        </select>
      </label>
      <div class="huangli-range">
        <label><span id="lbl-start">Start</span><input type="date" name="start" required /></label>
        <label><span id="lbl-end">End</span><input type="date" name="end" required /></label>
      </div>
      <button type="submit" class="unlock-btn"><span id="btn-picker">🔓 Unlock AI Date Picker $1.99</span></button>
      <div id="picker-output" aria-live="polite"></div>
    </form>
  </section>
</main>`,
        scripts: ['huangli.js?v=2'],
    },
};

// ---------- rendering ----------
function escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function pickLang(url: URL): Lang {
    const q = (url.searchParams.get('lang') || '').toLowerCase();
    return (SUPPORTED_LANGS as readonly string[]).includes(q) ? (q as Lang) : 'en';
}

function buildHreflangs(pageSlug: string): string {
    const base = `${SITE_URL}/${pageSlug}`;
    const lines: string[] = [];
    for (const l of SUPPORTED_LANGS) {
        const href = l === 'en' ? base : `${base}?lang=${l}`;
        lines.push(`<link rel="alternate" hreflang="${l}" href="${href}">`);
        for (const region of HREFLANG_VARIANTS[l]) {
            lines.push(`<link rel="alternate" hreflang="${region}" href="${href}">`);
        }
    }
    lines.push(`<link rel="alternate" hreflang="x-default" href="${base}">`);
    return lines.join('\n');
}

function renderLanding(meta: PageMeta, lang: Lang): string {
    const title = meta.titles[lang];
    const desc = meta.descriptions[lang];
    const canonical = lang === 'en'
        ? `${SITE_URL}/${meta.slug}`
        : `${SITE_URL}/${meta.slug}?lang=${lang}`;
    const canonicalBase = `${SITE_URL}/${meta.slug}`;

    // Language-select options (keep parity with static page, but list all 6)
    const langOptions = [
        { v: 'en', label: 'English' },
        { v: 'zh', label: '中文' },
        { v: 'ja', label: '日本語' },
        { v: 'ko', label: '한국어' },
        { v: 'es', label: 'Español' },
        { v: 'fr', label: 'Français' },
    ].map((o) => `<option value="${o.v}"${o.v === lang ? ' selected' : ''}>${o.label}</option>`).join('');

    const scripts = meta.scripts.map((s) => `<script src="/${s}"></script>`).join('\n');

    return `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(desc)}">
<link rel="canonical" href="${canonical}">
${buildHreflangs(meta.slug)}
<meta property="og:type" content="website">
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${OG_LOCALE[lang]}">
<meta property="og:image" content="${SITE_URL}/qtong.png">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escHtml(title)}">
<meta name="twitter:description" content="${escHtml(desc)}">
<meta name="robots" content="index, follow">
<link rel="stylesheet" href="/style.css?v=6">
</head>
<body class="${meta.bodyClass}">
<select id="lang-select" class="lang-select" onchange="window.location.search='?lang='+this.value" aria-label="Select language">${langOptions}</select>
${meta.bodyHtml}
<script src="/i18n-pages.js?v=1"></script>
<script src="/site-nav.js?v=2"></script>
${scripts}
</body>
</html>`;
}

export default async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') || '';
    const meta = PAGES[page];
    if (!meta) return new Response('Unknown landing page', { status: 404 });

    const lang = pickLang(url);
    const html = renderLanding(meta, lang);

    return new Response(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            // Short CDN cache since these are crawled pages + interactive —
            // we want the meta to update quickly if we re-translate.
            'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
            // Vary on the lang query via a custom header hint for CDNs that
            // honor it; Vercel's edge cache keys off the full URL already.
            'Vary': 'Accept-Language',
        },
    });
}
