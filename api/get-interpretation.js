const Stripe = require('stripe');
const path = require('path');
const fs = require('fs');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id, sign_num } = req.query;

  if (!session_id || !sign_num) {
    return res.status(400).json({ error: 'session_id and sign_num required' });
  }

  try {
    // Verify payment first
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(403).json({ error: 'Payment not completed' });
    }

    if (session.metadata.type !== 'interpretation' || session.metadata.signNum !== sign_num) {
      return res.status(403).json({ error: 'Session does not match requested sign' });
    }

    // Load interpretation data
    const dataPath = path.join(process.cwd(), 'data', 'interpretations.json');
    const interpretations = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const data = interpretations[sign_num];

    if (!data) {
      return res.status(404).json({ error: 'Sign not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Get interpretation error:', err.message);
    res.status(500).json({ error: 'Failed to get interpretation' });
  }
};
