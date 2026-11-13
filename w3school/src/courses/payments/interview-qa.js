// Payment Integration interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'How does an online card payment work?',
      a: 'The client collects card data through the provider, the server creates a payment with a secret key, and the provider confirms it through a webhook or query.',
      level: 'basic',
    },
    {
      q: 'Why never mark an order paid from the browser?',
      a: 'The browser can be manipulated. Only a server-side verification or verified webhook proves payment.',
      level: 'basic',
    },
    {
      q: 'Which providers fit Bangladesh?',
      a: 'bKash, Nagad and SSLCommerz for local methods, plus Stripe or PayPal for global customers.',
      level: 'basic',
    },
    {
      q: 'Where should secret keys live?',
      a: 'Only on the server, in environment variables or a secret manager. Never in the client or git.',
      level: 'basic',
    },
  ],
  'stripe-basics': [
    {
      q: 'What is a PaymentIntent?',
      a: 'A Stripe object that tracks one payment and its status through creation, confirmation and completion.',
      level: 'basic',
    },
    {
      q: 'How are amounts represented?',
      a: 'In the smallest currency unit, such as cents or poisha.',
      level: 'basic',
    },
    {
      q: 'Why use Stripe Checkout?',
      a: 'It is a hosted page that handles payment methods, tax and receipts, reducing the UI and compliance work.',
      level: 'intermediate',
    },
    {
      q: 'Why look up the price on the server?',
      a: 'A client can send any amount. The server must derive the total from the cart or product.',
      level: 'basic',
    },
  ],
  webhooks: [
    {
      q: 'Why are webhooks the source of truth?',
      a: 'The browser can close or the redirect can be lost. The provider event confirms the final status reliably.',
      level: 'basic',
    },
    {
      q: 'How do you verify a webhook?',
      a: 'Use the provider library with the raw request body, the signature header and the signing secret.',
      level: 'intermediate',
    },
    {
      q: 'Why is the raw body required?',
      a: 'Signature verification uses the exact bytes. Parsing JSON first changes them and breaks the check.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle duplicate webhooks?',
      a: 'Store processed event ids and make the handler idempotent.',
      level: 'advanced',
    },
  ],
  'bd-gateways': [
    {
      q: 'What is bKash?',
      a: 'A mobile wallet used widely in Bangladesh, with a redirect and callback flow.',
      level: 'basic',
    },
    {
      q: 'What is SSLCommerz?',
      a: 'An aggregator that supports cards and local methods such as bKash, Nagad and bank transfer.',
      level: 'basic',
    },
    {
      q: 'How do you confirm a local wallet payment?',
      a: 'Query or execute with the provider API using the transaction id. The redirect parameters are not proof.',
      level: 'intermediate',
    },
    {
      q: 'Why never handle the wallet PIN?',
      a: 'It is entered on the provider page and is highly sensitive. Your app must not see or store it.',
      level: 'basic',
    },
  ],
  paypal: [
    {
      q: 'What happens after PayPal buyer approval?',
      a: 'The server captures the order and checks the final status and amount.',
      level: 'basic',
    },
    {
      q: 'Where is the amount set?',
      a: 'On the server when the order is created.',
      level: 'basic',
    },
    {
      q: 'Why compare the captured amount?',
      a: 'A mismatch signals a bug or tampering and must stop fulfilment.',
      level: 'intermediate',
    },
    {
      q: 'Sandbox versus live?',
      a: 'Sandbox uses test credentials and fake money. Live charges real customers with separate keys.',
      level: 'basic',
    },
  ],
  'checkout-ux': [
    {
      q: 'What causes most abandoned carts?',
      a: 'Surprise costs, forced accounts and long forms.',
      level: 'basic',
    },
    {
      q: 'Where should card data go?',
      a: 'Directly to the provider through hosted fields or a redirect. It should never reach your server.',
      level: 'basic',
    },
    {
      q: 'What is PCI DSS?',
      a: 'The security standard for systems that handle card data. Hosted fields keep you out of scope.',
      level: 'intermediate',
    },
    {
      q: 'Why show the full price early?',
      a: 'Trust. A hidden fee at the last step feels like a trick and loses the sale.',
      level: 'basic',
    },
  ],
  subscriptions: [
    {
      q: 'What should you store for a subscription?',
      a: 'The provider subscription id and status, plus the customer and plan.',
      level: 'basic',
    },
    {
      q: 'Which event renews access?',
      a: 'invoice.paid confirms a successful renewal.',
      level: 'intermediate',
    },
    {
      q: 'What is dunning?',
      a: 'The process of retrying failed payments, notifying the customer and eventually downgrading.',
      level: 'intermediate',
    },
    {
      q: 'Why not call the provider on every request?',
      a: 'It adds latency and a failure point. Keep a local status updated by webhooks.',
      level: 'advanced',
    },
  ],
  'refunds-fraud': [
    {
      q: 'What must you keep after a refund?',
      a: 'The original payment record and the refund details for accounting and disputes.',
      level: 'basic',
    },
    {
      q: 'What is a chargeback?',
      a: 'A payment reversed by the bank after a customer dispute.',
      level: 'basic',
    },
    {
      q: 'What wins a dispute?',
      a: 'Evidence: delivery proof, communication and the accepted refund policy.',
      level: 'intermediate',
    },
    {
      q: 'How do you reduce fraud?',
      a: 'Provider risk rules, 3D Secure, velocity limits, manual review for large orders and clear card descriptors.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you build a checkout?',
      a: 'Server-priced cart, provider session, verified webhook, order status page, refund endpoint and health check.',
      level: 'intermediate',
    },
    {
      q: 'How do you make payment handling idempotent?',
      a: 'Send and store idempotency keys, and skip duplicate webhook events by id.',
      level: 'advanced',
    },
    {
      q: 'How do you test payments?',
      a: 'Use sandbox credentials, test success, decline, 3DS, cancel, retry and refund paths.',
      level: 'basic',
    },
    {
      q: 'What is the best first payments step?',
      a: 'One small sandbox checkout with a verified webhook before adding more providers.',
      level: 'basic',
    },
  ],
};
