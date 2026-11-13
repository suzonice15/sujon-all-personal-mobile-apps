// WordPress chapter: Hosting & Maintenance.

export default {
  id: 'hosting-maintenance',
  title: 'Hosting & Maintenance',
  description: 'Hosting types, staging, migration and updates',
  icon: 'cloud',
  lessons: [
    {
      id: 'wp-hosting',
      title: 'Hosting types',
      blocks: [
        { type: 'text', value: 'Shared hosting is cheap and simple but slow under load. Managed WordPress hosting costs more and handles caching, updates and backups. VPS gives control but you manage the server. Choose based on traffic and budget.' },
        { type: 'list', items: [
          'Shared: cheap, limited resources, good for small sites',
          'Managed WordPress: caching, staging and support included',
          'VPS: full control, you handle security and updates',
          'Check PHP version, MySQL version and SSL support',
          'Look for daily backups and a staging environment',
        ] },
        { type: 'note', value: 'The cheapest host often costs more in lost sales and support time. Pick a host with a staging site and daily backups.' },
      ],
    },
    {
      id: 'wp-staging-migration',
      title: 'Staging and migration',
      blocks: [
        { type: 'text', value: 'A staging site is a copy where you test updates and changes. Migration moves a site from one host to another. Both need the files and the database, plus a search-replace for the site URL.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Export the database and files
wp db export site.sql
tar -czf site-files.tar.gz wp-content

# On the new host: import, then fix URLs
wp db import site.sql
wp search-replace 'https://old.example.com' 'https://new.example.com' --all-tables` },
        { type: 'note', value: 'A URL search-replace must handle serialized data. WP-CLI does this safely; a plain SQL REPLACE can corrupt serialized values.' },
      ],
    },
    {
      id: 'wp-updates',
      title: 'Updates and maintenance',
      blocks: [
        { type: 'text', value: 'Updates fix bugs and security holes. Test them on staging first, then apply to production. Keep a schedule: weekly plugin checks, monthly core updates, and an immediate patch for security releases.' },
        { type: 'list', items: [
          'Back up before every update',
          'Test on staging',
          'Update in small batches to isolate problems',
          'Check the site after each batch',
          'Keep a changelog of what changed and when',
        ] },
        { type: 'note', value: 'Automatic minor core updates are safe for most sites. Major updates and plugin updates deserve a test on staging.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'hosting-maintenance',
      q: 'Which hosting type includes caching and staging?',
      options: ['Shared', 'Managed WordPress', 'VPS', 'Free hosting'],
      answer: 1,
      explain: 'Managed hosting bundles those features.',
    },
    {
      chapterId: 'hosting-maintenance',
      q: 'Why use a staging site?',
      options: ['To save money', 'To test updates and changes before production', 'To host images', 'To replace backups'],
      answer: 1,
      explain: 'Staging lets you test safely.',
    },
    {
      chapterId: 'hosting-maintenance',
      q: 'Why use WP-CLI for a URL search-replace?',
      options: ['It is faster to type', 'It handles serialized data safely', 'It is required', 'It compresses data'],
      answer: 1,
      explain: 'Plain SQL replace can corrupt serialized values.',
    },
    {
      chapterId: 'hosting-maintenance',
      q: 'What should you do before every update?',
      options: ['Nothing', 'Back up', 'Delete plugins', 'Change the theme'],
      answer: 1,
      explain: 'A backup lets you roll back.',
    },
  ],
};
