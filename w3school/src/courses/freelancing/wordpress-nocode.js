// Freelancing chapter: WordPress and No-Code.

export default {
  id: 'wordpress-nocode',
  title: 'WordPress & No-Code',
  description: 'Freelancing with WordPress and no-code tools',
  icon: 'web',
  lessons: [
    {
      id: 'fl-wordpress',
      title: 'WordPress freelancing',
      blocks: [
        { type: 'text', value: 'WordPress powers a huge share of the web. Many small businesses need a site and will pay for it. You do not need to be a developer to build WordPress sites, but knowing some code makes you faster and more valuable.' },
        { type: 'list', items: [
          'Themes: Astra, GeneratePress, Kadence',
          'Page builders: Elementor, Beaver Builder, Gutenberg',
          'Plugins: WooCommerce, Yoast, Contact Form 7',
          'Hosting: shared hosting, managed WordPress',
          'Maintenance: updates, backups, security',
        ] },
        { type: 'note', value: 'A WordPress site with a custom theme or a few custom plugins is worth much more than a stock theme with text changed.' },
      ],
    },
    {
      id: 'fl-nocode',
      title: 'No-code tools',
      blocks: [
        { type: 'text', value: 'No-code tools let you build apps and automations without writing code. They are fast for simple projects and are a good entry point for freelancing while you learn to code.' },
        { type: 'list', items: [
          'Webflow - visual website builder with CMS',
          'Bubble - full web apps without code',
          'Zapier / Make - automation between apps',
          'Airtable - database with views and forms',
          'Notion - docs, wikis and light databases',
        ] },
        { type: 'note', value: 'No-code is a starting point, not a ceiling. Clients with growing needs will pay more for custom code.' },
      ],
    },
    {
      id: 'fl-maintenance',
      title: 'Maintenance retainers',
      blocks: [
        { type: 'text', value: 'A retainer is a monthly fee for ongoing work: updates, backups, small changes and support. Retainers turn one-off projects into steady income and are the fastest way to stable revenue.' },
        { type: 'list', items: [
          'Offer a monthly maintenance plan after every project',
          'Include: updates, backups, uptime monitoring, small changes',
          'Price it at 10-20 percent of the build cost per month',
          'Automate backups and updates where possible',
          'Review the retainer quarterly and adjust the scope',
        ] },
        { type: 'note', value: 'A client on a retainer is a client who trusts you. Trust is the most valuable asset in freelancing.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'wordpress-nocode',
      q: 'Why is WordPress popular for freelancing?',
      options: ['It is free for clients', 'Many small businesses need a site and will pay for it', 'It requires no skills', 'It is only for blogs'],
      answer: 1,
      explain: 'Demand for WordPress sites is high and ongoing.',
    },
    {
      chapterId: 'wordpress-nocode',
      q: 'What is a retainer?',
      options: ['A one-time payment', 'A monthly fee for ongoing work and support', 'A contract type', 'A discount'],
      answer: 1,
      explain: 'Retainers provide steady monthly income.',
    },
    {
      chapterId: 'wordpress-nocode',
      q: 'What does no-code help you do?',
      options: ['Write faster code', 'Build apps and automations without writing code', 'Remove the need for clients', ' Encrypt data'],
      answer: 1,
      explain: 'No-code tools build without traditional coding.',
    },
    {
      chapterId: 'wordpress-nocode',
      q: 'How should you price a maintenance retainer?',
      options: ['Free', '10-20 percent of the build cost per month', 'The full build cost', 'A flat 100 dollars always'],
      answer: 1,
      explain: 'Retainers are a fraction of the build cost.',
    },
  ],
};
