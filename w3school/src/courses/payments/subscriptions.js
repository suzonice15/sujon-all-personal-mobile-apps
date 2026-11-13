// Payments chapter: Subscriptions.

export default {
  id: 'subscriptions',
  title: 'Subscriptions',
  description: 'Plans, billing cycles and dunning',
  icon: 'autorenew',
  lessons: [
    {
      id: 'pay-plans',
      title: 'Plans and prices',
      blocks: [
        { type: 'text', value: 'A subscription charges on a schedule. Define plans and prices in the provider, then attach a customer to a price. Store the subscription id and status, not only the current payment.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent'],
});` },
        { type: 'note', value: 'Use provider price ids. Duplicating amounts in your code drifts from the dashboard and breaks upgrades.' },
      ],
    },
    {
      id: 'pay-billing-events',
      title: 'Billing events',
      blocks: [
        { type: 'text', value: 'Subscriptions generate events: created, renewed, payment failed, cancelled. Handle them through webhooks, and keep a local record of the status so your app can decide access without calling the provider on every request.' },
        { type: 'list', items: [
          'invoice.paid: extend access',
          'invoice.payment_failed: start dunning',
          'customer.subscription.deleted: revoke access',
          'customer.subscription.updated: plan change',
          'Always verify the event signature',
        ] },
        { type: 'note', value: 'Access should follow the local subscription status that webhooks update, not a client claim.' },
      ],
    },
    {
      id: 'pay-dunning',
      title: 'Dunning and retention',
      blocks: [
        { type: 'text', value: 'A failed renewal should retry, notify the customer and eventually downgrade. That process is called dunning. A good dunning flow recovers revenue without annoying the customer.' },
        { type: 'list', items: [
          'Retry the charge on a schedule',
          'Email before and after a failure',
          'Offer a grace period',
          'Downgrade instead of deleting data',
          'Make cancellation easy and respectful',
        ] },
        { type: 'note', value: 'A surprise lockout on the renewal date feels like a scam. Warn first, then restrict slowly.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'subscriptions',
      q: 'What should you store for a subscription?',
      options: ['Only the card', 'The subscription id and status', 'The password', 'The webhook secret'],
      answer: 1,
      explain: 'The id and status drive access.',
    },
    {
      chapterId: 'subscriptions',
      q: 'Which event means a renewal was paid?',
      options: ['invoice.paid', 'invoice.created', 'customer.created', 'charge.refunded'],
      answer: 0,
      explain: 'invoice.paid confirms payment.',
    },
    {
      chapterId: 'subscriptions',
      q: 'What is dunning?',
      options: ['A discount', 'The process of retrying and recovering failed payments', 'A refund', 'A webhook'],
      answer: 1,
      explain: 'Dunning recovers failed renewals.',
    },
    {
      chapterId: 'subscriptions',
      q: 'What should drive access?',
      options: ['A client flag', 'The local status updated by verified webhooks', 'The URL', 'A cookie'],
      answer: 1,
      explain: 'Never trust a client claim.',
    },
  ],
};
