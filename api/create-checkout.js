const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.SITE_URL || 'https://oracleday.xyz';

  const { type, signNum } = req.body;

  if (!type || !['draw', 'interpretation'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  if (type === 'interpretation' && !signNum) {
    return res.status(400).json({ error: 'signNum required for interpretation' });
  }

  const productConfig = {
    draw: { name: 'Extra Fortune Draw', amount: 99 },
    interpretation: { name: 'Detailed Fortune Reading', amount: 199 },
  };

  const config = productConfig[type];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: config.name },
          unit_amount: config.amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${siteUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}&type=${type}${signNum ? '&sign=' + encodeURIComponent(signNum) : ''}`,
      cancel_url: `${siteUrl}/?payment=cancelled`,
      metadata: { type, signNum: signNum || '' },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
