// WordPress chapter: WooCommerce.

export default {
  id: 'woocommerce',
  title: 'WooCommerce',
  description: 'Products, payments, shipping and orders',
  icon: 'shopping-cart',
  lessons: [
    {
      id: 'wp-woo-products',
      title: 'Products',
      blocks: [
        { type: 'text', value: 'WooCommerce products have a type, price, inventory and category. Simple products have one price. Variable products have variations, such as size and colour, each with its own price and stock.' },
        { type: 'list', items: [
          'Simple: one price and stock level',
          'Variable: variations with different prices',
          'Virtual: no shipping, such as a download',
          'Grouped: a bundle of existing products',
          'Set SKUs for inventory tracking',
        ] },
        { type: 'note', value: 'Use a consistent naming and category structure from the start. Renaming hundreds of products later is painful.' },
      ],
    },
    {
      id: 'wp-woo-payments',
      title: 'Payments and shipping',
      blocks: [
        { type: 'text', value: 'Enable one or two payment gateways that your customers actually use. Set up shipping zones with methods and rates. Test both with sandbox credentials before launch.' },
        { type: 'list', items: [
          'Stripe and PayPal are the most common global gateways',
          'Local gateways: bKash, Nagad, SSLCommerz for Bangladesh',
          'Shipping zones: country, region or postcode',
          'Methods: flat rate, free shipping, local pickup',
          'Offer free shipping over a threshold to raise order value',
        ] },
        { type: 'note', value: 'Never store card numbers yourself. Use a hosted payment field or a redirect so the gateway handles the sensitive data.' },
      ],
    },
    {
      id: 'wp-woo-orders',
      title: 'Orders and fulfilment',
      blocks: [
        { type: 'text', value: 'Orders move through statuses: pending, processing, on-hold, completed, cancelled and refunded. Configure emails for each step so customers know what is happening.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Pending payment  -> customer has not paid yet
Processing       -> payment received, preparing order
On hold          -> waiting for confirmation
Completed        -> delivered or fulfilled
Cancelled        -> order cancelled
Refunded         -> money returned` },
        { type: 'note', value: 'Send a shipping notification with a tracking number. It reduces support messages more than any other email.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'woocommerce',
      q: 'Which product type has variations with different prices?',
      options: ['Simple', 'Variable', 'Virtual', 'Grouped'],
      answer: 1,
      explain: 'Variable products have variations such as size and colour.',
    },
    {
      chapterId: 'woocommerce',
      q: 'Why never store card numbers yourself?',
      options: ['It is slow', 'PCI compliance risk; use the gateway hosted fields', 'It uses disk space', 'It is optional'],
      answer: 1,
      explain: 'Handling card data yourself is a serious compliance risk.',
    },
    {
      chapterId: 'woocommerce',
      q: 'What is a shipping zone?',
      options: ['A warehouse', 'A geographic area with its own shipping methods and rates', 'A product category', 'A payment method'],
      answer: 1,
      explain: 'Shipping zones group locations for rates.',
    },
    {
      chapterId: 'woocommerce',
      q: 'Which order status means payment received and order being prepared?',
      options: ['Pending', 'Processing', 'Completed', 'Refunded'],
      answer: 1,
      explain: 'Processing means paid and being prepared.',
    },
  ],
};
