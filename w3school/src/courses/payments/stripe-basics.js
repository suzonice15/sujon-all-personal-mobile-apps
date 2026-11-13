// Payments chapter: Stripe Basics.

export default {
  id: 'stripe-basics',
  title: 'Stripe Basics',
  description: 'PaymentIntents, Checkout and test mode',
  icon: 'credit-card',
  lessons: [
    {
      id: 'pay-stripe-intent',
      title: 'PaymentIntents',
      blocks: [
        { type: 'text', value: 'A PaymentIntent represents one payment and its status. Create it on the server, confirm it on the client, then listen for the final result. Amounts are in the smallest currency unit, such as cents or poisha.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const intent = await stripe.paymentIntents.create({
  amount: 500000,              // 5000.00 in the smallest unit
  currency: 'bdt',
  metadata: { orderId: 'ord_123' },
});

// Send intent.client_secret to the client` },
        { type: 'note', value: 'Never trust an amount sent from the client. Look up the price on the server from the cart or product id.' },
      ],
    },
    {
      id: 'pay-stripe-checkout',
      title: 'Stripe Checkout',
      blocks: [
        { type: 'text', value: 'Stripe Checkout is a hosted payment page. You create a session on the server and redirect the customer. It handles cards, wallets, tax and receipts, which is much less work than building your own form.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: 'https://app.example.com/thanks?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://app.example.com/cart',
});

res.json({ url: session.url });` },
        { type: 'note', value: 'Use price ids from the Stripe dashboard. A hard-coded amount on the server cannot drift from the catalog by accident.' },
      ],
    },
    {
      id: 'pay-stripe-test',
      title: 'Test mode',
      blocks: [
        { type: 'text', value: 'Stripe test mode uses separate keys and test cards. Test success, decline, 3D Secure and network errors before going live. Never mix test and live keys.' },
        { type: 'code', lang: 'text', tryIt: false, value: `4242 4242 4242 4242   success
4000 0000 0000 0002   declined
4000 0025 0000 3155   3D Secure required` },
        { type: 'note', value: 'Keep the test and live keys in separate environments. A live key in development is a real charge waiting to happen.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'stripe-basics',
      q: 'What does a PaymentIntent represent?',
      options: ['A customer', 'One payment and its status', 'A product', 'A webhook'],
      answer: 1,
      explain: 'It tracks one payment lifecycle.',
    },
    {
      chapterId: 'stripe-basics',
      q: 'How are amounts sent to Stripe?',
      options: ['In dollars', 'In the smallest currency unit', 'As a string', 'As a percentage'],
      answer: 1,
      explain: 'Stripe uses the smallest unit, such as cents.',
    },
    {
      chapterId: 'stripe-basics',
      q: 'Why use Stripe Checkout?',
      options: ['It is cheaper', 'It is a hosted page that handles payment methods and receipts', 'It skips webhooks', 'It stores cards'],
      answer: 1,
      explain: 'Checkout reduces payment UI work.',
    },
    {
      chapterId: 'stripe-basics',
      q: 'Why never trust a client amount?',
      options: ['It is slower', 'A client can send any value', 'It breaks the UI', 'It is encrypted'],
      answer: 1,
      explain: 'Look up the price on the server.',
    },
  ],
};
