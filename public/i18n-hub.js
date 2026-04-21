/**
 * i18n-hub.js — Fortune Hub strings for all 6 locales.
 *
 * Extends the I18N object already populated by i18n.js + i18n-extra.js.
 * Keeps hub strings isolated from the bulky `signs` arrays so future
 * category launches only touch this file.
 *
 * Load order (in index.html):
 *   1. i18n.js        — zh, en (+ signs[])
 *   2. i18n-extra.js  — ja, ko, es, fr (+ signs[])
 *   3. i18n-hub.js    — hub.* on every locale
 */
(function () {
  if (typeof I18N === 'undefined') return;

  var HUB = {
    zh: {
      title: '命理服务',
      subtitle: '一签之外，四大命理工具，助你看清当下、定心前行',
      cards: {
        sign:    { title: '观音灵签',   desc: '摇签问卜，百签灵验' },
        yijing:  { title: '周易起卦',   desc: '三枚铜钱，六爻问事' },
        zodiac:  { title: '星座生肖',   desc: '每日运势与流年指引' },
        bazi:    { title: '八字命盘',   desc: '四柱十神，AI 深度解读' },
        tarot:   { title: '塔罗牌',     desc: '78 张牌阵与 AI 解读' },
        huangli: { title: '黄历择日',   desc: '每日宜忌与 AI 择吉日' }
      },
      cta: '进入',
      comingSoon: '即将上线',
      disclaimer: '本站内容仅供娱乐参考'
    },
    en: {
      title: 'Fortune Services',
      subtitle: 'Beyond a single draw — four tools to help you see clearly and move forward.',
      cards: {
        sign:    { title: 'Guanyin Oracle',  desc: '100 classic fortune sticks' },
        yijing:  { title: 'I Ching',         desc: 'Three coins, six-line hexagram' },
        zodiac:  { title: 'Zodiac & Sheng Xiao', desc: 'Daily forecast & yearly outlook' },
        bazi:    { title: 'BaZi (Four Pillars)', desc: 'AI-powered destiny reading' },
        tarot:   { title: 'Tarot',           desc: '78-card spreads with AI reading' },
        huangli: { title: 'Huang Li · Almanac', desc: 'Favorable days & AI date picker' }
      },
      cta: 'Open',
      comingSoon: 'Coming soon',
      disclaimer: 'For entertainment purposes only.'
    },
    ja: {
      title: '占いメニュー',
      subtitle: 'おみくじだけじゃない。四つの占術であなたの今を照らす。',
      cards: {
        sign:    { title: '観音おみくじ',   desc: '100本の霊籤' },
        yijing:  { title: '易経占い',       desc: '三枚の銅銭で六爻を立てる' },
        zodiac:  { title: '星座・十二支',   desc: '今日・今年の運勢' },
        bazi:    { title: '四柱推命',       desc: 'AI による命盤解読' },
        tarot:   { title: 'タロット',       desc: '78 枚の展開と AI 解読' },
        huangli: { title: '黄暦・吉日',     desc: '毎日の吉凶と AI 吉日選び' }
      },
      cta: '開く',
      comingSoon: '近日公開',
      disclaimer: '本サイトの内容は娯楽目的です。'
    },
    ko: {
      title: '명리 서비스',
      subtitle: '하나의 점괘를 넘어, 네 가지 도구로 당신의 지금을 비춥니다.',
      cards: {
        sign:    { title: '관음 영첨',      desc: '100개의 고전 영첨' },
        yijing:  { title: '주역 점괘',      desc: '세 닢의 동전, 육효' },
        zodiac:  { title: '별자리・띠 운세', desc: '오늘의 운세와 연간 운세' },
        bazi:    { title: '사주 명리',      desc: 'AI 기반 사주 해석' },
        tarot:   { title: '타로',           desc: '78장 타로와 AI 해석' },
        huangli: { title: '황력・길일',     desc: '일일 길흉과 AI 택일' }
      },
      cta: '열기',
      comingSoon: '곧 공개',
      disclaimer: '본 사이트는 오락 목적으로만 제공됩니다.'
    },
    es: {
      title: 'Servicios de adivinación',
      subtitle: 'Más allá de la varilla: cuatro herramientas para ver con claridad.',
      cards: {
        sign:    { title: 'Oráculo de Guanyin',    desc: '100 varillas clásicas' },
        yijing:  { title: 'I Ching',               desc: 'Tres monedas, seis líneas' },
        zodiac:  { title: 'Zodiaco y Sheng Xiao',  desc: 'Previsión diaria y anual' },
        bazi:    { title: 'BaZi (Cuatro Pilares)', desc: 'Lectura del destino con IA' },
        tarot:   { title: 'Tarot',                 desc: 'Tiradas de 78 cartas con IA' },
        huangli: { title: 'Almanaque Huang Li',    desc: 'Días favorables y selector IA' }
      },
      cta: 'Abrir',
      comingSoon: 'Próximamente',
      disclaimer: 'Solo con fines de entretenimiento.'
    },
    fr: {
      title: 'Services divinatoires',
      subtitle: 'Au-delà du simple tirage : quatre outils pour y voir clair.',
      cards: {
        sign:    { title: 'Oracle de Guanyin',  desc: '100 bâtons classiques' },
        yijing:  { title: 'Yi Jing',            desc: 'Trois pièces, six lignes' },
        zodiac:  { title: 'Zodiaque & Sheng Xiao', desc: 'Horoscope quotidien et annuel' },
        bazi:    { title: 'BaZi (Quatre Piliers)', desc: 'Lecture du destin par IA' },
        tarot:   { title: 'Tarot',              desc: 'Tirages de 78 cartes avec IA' },
        huangli: { title: 'Almanach Huang Li',  desc: 'Jours favorables et sélecteur IA' }
      },
      cta: 'Ouvrir',
      comingSoon: 'Bientôt',
      disclaimer: 'À titre de divertissement uniquement.'
    }
  };

  Object.keys(HUB).forEach(function (lang) {
    if (!I18N[lang]) I18N[lang] = {};
    I18N[lang].hub = HUB[lang];
  });
})();
