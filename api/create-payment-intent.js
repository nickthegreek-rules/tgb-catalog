import Stripe from 'stripe';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { amount, currency, description } = req.body;

    if (!amount || !currency) {
      res.status(400).json({ error: 'amount and currency required' });
      return;
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      description: description || 'AstraSync agentic commerce test purchase',
      automatic_payment_methods: { enabled: true },
      metadata: {
        source: 'astrasync-mcp-bridge',
        merchant: 'thegroundbetween.com'
      }
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      amount: amountInCents,
      currency: currency.toLowerCase(),
      status: paymentIntent.status
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
