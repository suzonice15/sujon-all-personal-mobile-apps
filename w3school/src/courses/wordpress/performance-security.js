// WordPress chapter: Performance & Security.

export default {
  id: 'performance-security',
  title: 'Performance & Security',
  description: 'Caching, images, hardening and backups',
  icon: 'speed',
  lessons: [
    {
      id: 'wp-performance',
      title: 'Performance',
      blocks: [
        { type: 'text', value: 'A slow WordPress site loses visitors and rankings. The biggest wins are page caching, image compression, a CDN and a lightweight theme. Measure before and after with PageSpeed Insights.' },
        { type: 'list', items: [
          'Page caching: serve static HTML to most visitors',
          'Object caching: Redis or Memcached for repeated queries',
          'Image optimisation: compress and serve WebP',
          'CDN: serve static files from locations near the user',
          'Minify and defer CSS and JS',
          'Remove unused plugins',
        ] },
        { type: 'note', value: 'A caching plugin can break a dynamic page if it caches per-user content. Exclude cart, checkout and account pages.' },
      ],
    },
    {
      id: 'wp-security',
      title: 'Security',
      blocks: [
        { type: 'text', value: 'Most WordPress hacks come from outdated plugins, weak passwords and missing updates. Harden the site, limit login attempts and keep everything updated.' },
        { type: 'list', items: [
          'Update WordPress, themes and plugins',
          'Use strong passwords and two-factor authentication',
          'Limit login attempts',
          'Disable file editing in the admin',
          'Use HTTPS everywhere',
          'Remove unused themes and plugins',
          'Take regular backups and test restores',
        ] },
        { type: 'code', lang: 'php', tryIt: false, value: `// wp-config.php hardening
define('DISALLOW_FILE_EDIT', true);
define('WP_DEBUG', false);
define('FORCE_SSL_ADMIN', true);

// Change the default table prefix (do this at install time)
// \$table_prefix = 'cn_';` },
        { type: 'note', value: 'A backup you have never restored is not a backup. Test a restore on a staging site at least once.' },
      ],
    },
    {
      id: 'wp-backups',
      title: 'Backups and recovery',
      blocks: [
        { type: 'text', value: 'Back up files and the database on a schedule, store copies off-site and keep several versions. When something breaks, you need the most recent good copy, not the only one.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Back up the database with WP-CLI
wp db export backup-\$(date +%F).sql

# Back up uploads and the theme
tar -czf uploads-\$(date +%F).tar.gz wp-content/uploads
tar -czf theme-\$(date +%F).tar.gz wp-content/themes/my-theme` },
        { type: 'note', value: 'Schedule backups daily and keep at least seven days. Store them somewhere other than the web server.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'performance-security',
      q: 'Which change usually gives the biggest speed win?',
      options: ['A new logo', 'Page caching', 'More plugins', 'A larger database'],
      answer: 1,
      explain: 'Caching serves static HTML and cuts server work.',
    },
    {
      chapterId: 'performance-security',
      q: 'Why exclude cart and checkout from page caching?',
      options: ['They are slow', 'They contain per-user content', 'They use too much disk', 'They are static'],
      answer: 1,
      explain: 'Caching per-user pages would leak data.',
    },
    {
      chapterId: 'performance-security',
      q: 'What is a common cause of WordPress hacks?',
      options: ['Strong passwords', 'Outdated plugins', 'HTTPS', 'Backups'],
      answer: 1,
      explain: 'Outdated plugins are a common entry point.',
    },
    {
      chapterId: 'performance-security',
      q: 'Why test a backup restore?',
      options: ['It is fun', 'An untested backup may not work when you need it', 'It speeds up the site', 'It is required'],
      answer: 1,
      explain: 'Only a restore proves the backup is usable.',
    },
  ],
};
