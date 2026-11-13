// Payments chapter: Webhooks.

export default {
  id: 'webhooks',
  title: 'Webhooks',
  description: 'Reliable event handling and idempotency',
  icon: 'webhook',
  lessons: [
    {
      id: 'pay-webhook-basics',
      title: 'How webhooks work',
      blocks: [
        { type: 'text', value: 'A webhook is an HTTP request from the provider to your server when an event happens. It is the source of truth for payment status, because the browser can close before the redirect returns.' },
        { type: 'code', lang: 'text', tryIt: false, value: `payment_intent.succeeded
payment_intent.payment_failed
checkout.session.completed
charge.refunded
invoice.paid` },
        { type: 'note', value: 'A webhook can arrive before the user returns to your site, after, or twice. Handle it as an asynchronous event, not as part of the request.' },
      ],
    },
    {
      id: 'pay-webhook-verify',
      title: 'Verify the signature',
      blocks: [
        { type: 'text', value: 'Anyone can POST to your webhook URL. Verify the provider signature with the raw request body and the signing secret. Reject anything that fails.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Raw body is required for signature verification
app.post('/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      return res.status(400).send('Invalid signature');
    }

    if (event.type === 'payment_intent.succeeded') {
      markOrderPaid(event.data.object.metadata.orderId);
    }
    res.json({ received: true });
  });` },
        { type: 'note', value: 'Signature verification needs the raw body. A JSON parser mounted before it will break the check.' },
      ],
    },
    {
      id: 'pay-webhook-idempotent',
      title: 'Idempotency and retries',
      blocks: [
        { type: 'text', value: 'Providers retry webhooks. Store the event id and skip duplicates. Return 2xx quickly, and do slow work asynchronously so the provider does not time out.' },
        { type: 'list', items: [
          'Store processed event ids',
          'Make the handler idempotent',
          'Acknowledge fast, process in a queue',
          'Retry your own failures',
          'Alert on repeated signature failures',
        ] },
        { type: 'note', value: 'Marking an order paid twice is a refund and a support ticket. Idempotency is not optional.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'webhooks',
      q: 'Why are webhooks the source of truth?',
      options: ['They are faster', 'The browser can close before the redirect returns', 'They are cheaper', 'They replace the API'],
      answer: 1,
      explain: 'The server event confirms the payment.',
    },
    {
      chapterId: 'webhooks',
      q: 'What must you verify on a webhook?',
      options: ['The user agent', 'The provider signature', 'The amount', 'The colour'],
      answer: 1,
      explain: 'The signature proves the sender.',
    },
    {
      chapterId: 'webhooks',
      q: 'Why is the raw body required?',
      options: ['It is faster', 'Signature verification uses the exact bytes', 'It compresses', 'It encrypts'],
      answer: 1,
      explain: 'Parsing changes the bytes and breaks the check.',
    },
    {
      chapterId: 'webhooks',
      q: 'Why store event ids?',
      options: ['For analytics only', 'To skip duplicate deliveries', 'To encrypt', 'To paginate'],
      answer: 1,
      explain: 'Retries can deliver the same event twice.',
    },
  ],
};
