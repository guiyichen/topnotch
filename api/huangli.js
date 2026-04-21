/**
 * POST /api/huangli
 * GET  /api/huangli?date=YYYY-MM-DD&lang=zh|en
 *
 * Returns the Chinese almanac (黄历) for a given Gregorian date:
 *   - 干支 (day pillar)
 *   - 农历 date
 *   - 宜 (favorable activities)
 *   - 忌 (unfavorable activities)
 *   - 冲煞 (clash day / unlucky direction)
 *   - 吉神 / 凶煞
 *   - 纳音
 *
 * Powered by `lunar-typescript` — zero-dep, authoritative calendar data.
 * Used both as a lookup endpoint for /huangli.html and as an input source
 * for the AI auspicious-date picker (sku: "huangli-picker").
 */

const { Solar } = require('lunar-typescript');

function fetchAlmanac(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) throw new Error('Invalid date');
  const solar = Solar.fromYmd(y, m, d);
  const lunar = solar.getLunar();
  return {
    solar: { year: y, month: m, day: d, weekday: solar.getWeek() },
    lunar: {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      yearGanZhi: lunar.getYearInGanZhi(),
      monthGanZhi: lunar.getMonthInGanZhi(),
      dayGanZhi: lunar.getDayInGanZhi(),
      lunarString: lunar.toString(),
    },
    naYin: lunar.getDayNaYin(),
    yi: lunar.getDayYi(),
    ji: lunar.getDayJi(),
    chong: lunar.getDayChongDesc(),
    jiShen: typeof lunar.getDayJiShen === 'function' ? lunar.getDayJiShen() : [],
    xiongSha: typeof lunar.getDayXiongSha === 'function' ? lunar.getDayXiongSha() : [],
    pengZu: {
      gan: typeof lunar.getPengZuGan === 'function' ? lunar.getPengZuGan() : '',
      zhi: typeof lunar.getPengZuZhi === 'function' ? lunar.getPengZuZhi() : '',
    },
    xiu: typeof lunar.getXiu === 'function' ? lunar.getXiu() : '',
    positions: {
      xiShen: typeof lunar.getDayPositionXi === 'function' ? lunar.getDayPositionXi() : '',
      fuShen: typeof lunar.getDayPositionFu === 'function' ? lunar.getDayPositionFu() : '',
      caiShen: typeof lunar.getDayPositionCai === 'function' ? lunar.getDayPositionCai() : '',
    },
  };
}

module.exports = async function handler(req, res) {
  let date;
  if (req.method === 'GET') {
    date = req.query && req.query.date;
  } else if (req.method === 'POST') {
    date = req.body && req.body.date;
  } else {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!date) {
    // Default to today (UTC) so callers can just hit /api/huangli.
    const today = new Date();
    date = today.toISOString().slice(0, 10);
  }

  try {
    const almanac = fetchAlmanac(date);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.status(200).json(almanac);
  } catch (err) {
    console.error('Huangli compute failed:', err.message);
    res.status(400).json({ error: 'Failed to compute almanac' });
  }
};
