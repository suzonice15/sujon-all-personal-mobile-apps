// WordPress chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a complete client site and prepare for interviews',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'wp-project-site',
      title: 'Project: build a client site',
      blocks: [
        { type: 'text', value: 'Build a complete small business site: home, services, about, contact, a blog and a store with three products. Use a child theme, a few trusted plugins and a caching layer. Deploy it and hand it over with documentation.' },
        { type: 'list', items: [
          'A lightweight block theme with a child theme',
          'Contact form, SEO plugin and caching',
          'WooCommerce with payment and shipping configured',
          'Daily backups and a staging site',
          'A short handover guide for the client',
        ] },
        { type: 'note', value: 'A finished site with a handover guide is a strong portfolio piece. It shows you can deliver, not only build.' },
      ],
    },
    {
      id: 'wp-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How does the template hierarchy work?',
          'What is a child theme and why use one?',
          'Action versus filter?',
          'How do you secure a WordPress site?',
          'How do you speed up a slow site?',
          'What is a custom post type?',
          'How do you migrate a site safely?',
          'How do you handle updates on a client site?',
        ] },
        { type: 'text', value: 'Strong answers name the mechanism and a concrete step. "A child theme loads the parent styles and overrides only the templates I need, so updates do not wipe my changes" is a complete answer.' },
        { type: 'note', value: 'Be ready to explain how you would take a broken or slow site and make it fast, secure and maintainable.' },
      ],
    },
    {
      id: 'wp-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: install locally, learn the dashboard and content',
          'Week 2: themes, child themes and the block editor',
          'Week 3: essential plugins and WooCommerce',
          'Week 4: PHP basics for WordPress',
          'Week 5: theme development and the loop',
          'Week 6: plugin development and the REST API',
          'Week 7: performance, security and hosting',
          'Week 8: build and hand over one complete client site',
        ] },
        { type: 'note', value: 'WordPress freelance work rewards reliability. A fast, secure, well-documented site earns referrals.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should a client handover include?',
      options: ['Only the login', 'A short guide to content, updates and backups', 'The server password only', 'Nothing'],
      answer: 1,
      explain: 'A handover guide makes the site maintainable.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why use a child theme on a client site?',
      options: ['It is faster', 'Customisations survive parent theme updates', 'It removes plugins', 'It is required'],
      answer: 1,
      explain: 'Child themes protect your changes.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a WordPress portfolio strong?',
      options: ['Many installed plugins', 'A finished, fast, secure site with documentation', 'A copied theme', 'A long plugin list'],
      answer: 1,
      explain: 'A complete, documented site shows real skill.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first WordPress step?',
      options: ['Plugin development', 'Install locally and learn content and the dashboard', 'Custom post types', 'Migration'],
      answer: 1,
      explain: 'Start with the basics and build up.',
    },
  ],
};
