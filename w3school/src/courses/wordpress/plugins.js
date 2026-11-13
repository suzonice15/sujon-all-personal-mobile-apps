// WordPress chapter: Plugins.

export default {
  id: 'plugins',
  title: 'Plugins',
  description: 'Essential plugins, WooCommerce and forms',
  icon: 'extension',
  lessons: [
    {
      id: 'wp-essential-plugins',
      title: 'Essential plugins',
      blocks: [
        { type: 'text', value: 'Plugins add features without writing code. Install only what you need. Every plugin is code that must be updated and can conflict with others. Fewer, better plugins is the rule.' },
        { type: 'list', items: [
          'SEO: Rank Math or Yoast SEO',
          'Forms: WPForms or Contact Form 7',
          'Caching: WP Super Cache or LiteSpeed Cache',
          'Security: Wordfence or Solid Security',
          'Backups: UpdraftPlus',
          'Images: ShortPixel or Smush',
        ] },
        { type: 'note', value: 'Check a plugin\'s last update, active installs and reviews before installing. An abandoned plugin is a security risk.' },
      ],
    },
    {
      id: 'wp-plugin-hooks',
      title: 'How plugins work',
      blocks: [
        { type: 'text', value: 'Plugins hook into WordPress with actions and filters. An action runs code at a point in the request. A filter changes a value. This is how plugins extend WordPress without editing core files.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// Action: run when the footer loads
add_action('wp_footer', function () {
    echo '<p>Powered by CodeNest</p>';
});

// Filter: change the excerpt length
add_filter('excerpt_length', function () {
    return 30;
});

// Filter: add a body class
add_filter('body_class', function ($classes) {
    $classes[] = 'codenest-theme';
    return $classes;
});` },
        { type: 'note', value: 'Never edit WordPress core files. Changes are lost on update, and the site becomes impossible to maintain.' },
      ],
    },
    {
      id: 'wp-woocommerce',
      title: 'WooCommerce basics',
      blocks: [
        { type: 'text', value: 'WooCommerce turns WordPress into a store. It adds products, cart, checkout, orders and payment gateways. Start with physical or digital products, a shipping zone and one payment method.' },
        { type: 'list', items: [
          'Products: simple, variable, grouped and virtual',
          'Payments: Stripe, PayPal, bKash via a gateway plugin',
          'Shipping: zones, methods and rates',
          'Taxes: enable and configure per country',
          'Orders: statuses track fulfilment',
          'Emails: order confirmation and shipping notices',
        ] },
        { type: 'note', value: 'Test the full checkout with a test payment before launch. A broken checkout costs real money.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'plugins',
      q: 'What is the rule for plugins?',
      options: ['Install as many as possible', 'Install only what you need, from trusted sources', 'Never install any', 'Only free plugins'],
      answer: 1,
      explain: 'Fewer, well-maintained plugins are safer.',
    },
    {
      chapterId: 'plugins',
      q: 'What is the difference between an action and a filter?',
      options: ['They are the same', 'An action runs code; a filter changes a value', 'A filter runs code; an action changes a value', 'Both delete data'],
      answer: 1,
      explain: 'Actions run code; filters modify values.',
    },
    {
      chapterId: 'plugins',
      q: 'Why never edit WordPress core files?',
      options: ['They are encrypted', 'Changes are lost on update', 'It is illegal', 'They are read-only'],
      answer: 1,
      explain: 'Updates overwrite core files.',
    },
    {
      chapterId: 'plugins',
      q: 'What does WooCommerce add?',
      options: ['A theme', 'A store with products, cart and checkout', 'A backup tool', 'A cache'],
      answer: 1,
      explain: 'WooCommerce adds e-commerce features.',
    },
  ],
};
