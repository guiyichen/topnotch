const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'session_id required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const md = session.metadata || {};
      let payload = null;
      if (md.payload) {
        try { payload = JSON.parse(md.payload); } catch {}
      }
      res.status(200).json({
        verified: true,
        sku: md.sku || md.type || null,
        type: md.type || md.sku || null, // legacy alias
        signNum: md.signNum || null,
        payload,
      });
    } else {
      res.status(200).json({ verified: false });
    }
  } catch (err) {
    console.error('Stripe verify error:', err.message);
    res.status(500).json({ error: 'Failed to verify session' });
  }
};
