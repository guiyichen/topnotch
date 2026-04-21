const Stripe = require('stripe');
const { getSku } = require('../lib/stripe-products');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.SITE_URL || 'https://oracleday.xyz';

  // Backwards compat: legacy callers send { type, signNum } for the two
  // original SKUs. New callers send { sku, payload, returnPath }.
  const body = req.body || {};
  const sku = body.sku || body.type;
  const signNum = body.signNum;
  const payload = body.payload || (signNum ? { signNum } : {});
  const returnPath = body.returnPath || '/';

  const skuConfig = getSku(sku);
  if (!skuConfig) {
    return res.status(400).json({ error: 'Invalid sku' });
  }

  // Legacy constraint: interpretation SKU needs a signNum for the redirect.
  if (sku === 'interpretation' && !signNum) {
    return res.status(400).json({ error: 'signNum required for interpretation' });
  }

  // Build success URL. Keep legacy query-string for old flow; new flow
  // uses returnPath + session_id so category pages can self-route.
  const isLegacy = sku === 'draw' || sku === 'interpretation';
  const successUrl = isLegacy
    ? `${siteUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}&type=${sku}${signNum ? '&sign=' + encodeURIComponent(signNum) : ''}`
    : `${siteUrl}${returnPath}${returnPath.includes('?') ? '&' : '?'}payment=success&session_id={CHECKOUT_SESSION_ID}&sku=${encodeURIComponent(sku)}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: skuConfig.name },
          unit_amount: skuConfig.amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: `${siteUrl}${returnPath}${returnPath.includes('?') ? '&' : '?'}payment=cancelled`,
      // `type` kept for legacy verify-session.js; `sku` is the new canonical field.
      metadata: {
        sku,
        type: sku,
        signNum: signNum || '',
        payload: JSON.stringify(payload).slice(0, 450), // Stripe metadata value cap ~500 chars
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
