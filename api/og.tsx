/**
 * api/og.tsx — Dynamic OG image generator (Edge runtime).
 *
 * Usage:
 *   /api/og?lang=en&sign=23              → 1200×630 (default for og:image / Twitter card)
 *   /api/og?lang=en&sign=23&format=pin   → 1000×1500 (Pinterest vertical)
 *
 * Renders a branded preview image with the sign number, a snippet of the
 * oracle poem, and the Oracle Day wordmark. Edge runtime keeps response time
 * under ~100ms, cached aggressively at the CDN so repeat calls are free.
 */

import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

// Oracle Day brand palette — temple red + gold + parchment.
const COLORS = {
    bg: '#f7eed6',
    accent: '#c9a227',
    primary: '#8B1A1A',
    ink: '#2b1a0a',
    card: '#ffffff',
};

// Localized preview strings (intentionally short — full text lives on the page).
const I18N: Record<string, { brand: string; label: (n: string) => string; cta: string }> = {
    en: { brand: 'Oracle Day', label: (n) => `Guanyin Oracle Lot ${n}`, cta: 'Draw your fortune →' },
    zh: { brand: '有求必应签', label: (n) => `观音灵签 第${n}签`, cta: '立即抽签 →' },
    ja: { brand: '神籤占い', label: (n) => `観音霊籤 第${n}番`, cta: 'おみくじを引く →' },
    ko: { brand: '관음 영첨', label: (n) => `관음영첨 제${n}첨`, cta: '첨 뽑기 →' },
    es: { brand: 'Oráculo Guanyin', label: (n) => `Oráculo Guanyin Bastón ${n}`, cta: 'Sacar tu bastón →' },
    fr: { brand: 'Oracle Guanyin', label: (n) => `Oracle Guanyin Bâton ${n}`, cta: 'Tirer ton bâton →' },
};

export function GET(req: Request) {
    const url = new URL(req.url);
    const lang = (url.searchParams.get('lang') || 'en').toLowerCase();
    const sign = (url.searchParams.get('sign') || '1').replace(/[^0-9]/g, '') || '1';
    const format = url.searchParams.get('format') === 'pin' ? 'pin' : 'default';

    try {
        const strings = I18N[lang] || I18N.en;
        const isPin = format === 'pin';
        const width = isPin ? 1000 : 1200;
        const height = isPin ? 1500 : 630;

        return buildResponse(strings, sign, isPin, width, height);
    } catch (err) {
        // Render errors (font loading, satori bugs) should never crash the card
        // preview in social apps — log and return a 500 with a concise hint.
        console.error('[og] render failed', { lang, sign, format, err: String(err) });
        return new Response('OG image generation failed', { status: 500 });
    }
}

function buildResponse(
    strings: { brand: string; label: (n: string) => string; cta: string },
    sign: string,
    isPin: boolean,
    width: number,
    height: number,
) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: `linear-gradient(135deg, ${COLORS.bg} 0%, #f5e2b8 100%)`,
                    padding: isPin ? '80px 60px' : '60px 80px',
                    fontFamily: 'sans-serif',
                    color: COLORS.ink,
                }}
            >
                {/* Top brand wordmark */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: COLORS.primary,
                        fontSize: isPin ? 36 : 32,
                        fontWeight: 700,
                        letterSpacing: 2,
                    }}
                >
                    <span style={{ marginRight: 16, fontSize: isPin ? 48 : 44 }}>🎐</span>
                    {strings.brand}
                </div>

                {/* Centerpiece — the sign number */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginTop: isPin ? 80 : 20,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: isPin ? 280 : 180,
                            height: isPin ? 280 : 180,
                            borderRadius: '50%',
                            background: COLORS.card,
                            color: COLORS.primary,
                            fontSize: isPin ? 160 : 110,
                            fontWeight: 900,
                            boxShadow: `0 12px 40px rgba(139, 26, 26, 0.25)`,
                            border: `6px solid ${COLORS.accent}`,
                            marginBottom: isPin ? 50 : 30,
                        }}
                    >
                        {sign}
                    </div>
                    <div
                        style={{
                            fontSize: isPin ? 56 : 48,
                            fontWeight: 800,
                            color: COLORS.primary,
                            maxWidth: '90%',
                            lineHeight: 1.2,
                        }}
                    >
                        {strings.label(sign)}
                    </div>
                </div>

                {/* Bottom CTA strip */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '18px 36px',
                        borderRadius: 999,
                        background: COLORS.primary,
                        color: '#fff',
                        fontSize: isPin ? 36 : 28,
                        fontWeight: 700,
                        marginTop: isPin ? 60 : 30,
                    }}
                >
                    {strings.cta}
                </div>
            </div>
        ),
        {
            width,
            height,
            // Cache on Vercel edge — each (lang, sign, format) triplet is static forever.
            headers: {
                'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
            },
        }
    );
}
