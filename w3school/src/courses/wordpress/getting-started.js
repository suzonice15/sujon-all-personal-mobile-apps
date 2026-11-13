// WordPress chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What WordPress is, installation and the dashboard',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'wp-what-is',
      title: 'What is WordPress?',
      blocks: [
        { type: 'text', value: 'WordPress is an open-source content management system that powers a huge share of the web. It is written in PHP and uses MySQL or MariaDB. You can build a blog, a business site, a store or a custom application with it.' },
        { type: 'list', items: [
          'Open source and free',
          'Huge theme and plugin ecosystem',
          'Runs on almost any shared hosting',
          'Good for content sites and small businesses',
          'Customisable with PHP, themes and plugins',
        ] },
        { type: 'note', value: 'WordPress is two things: the self-hosted software from wordpress.org, and the hosted service at wordpress.com. This course covers the self-hosted software.' },
      ],
    },
    {
      id: 'wp-install',
      title: 'Install WordPress',
      blocks: [
        { type: 'text', value: 'Most hosts offer a one-click WordPress install. For local development, use a tool such as Local, DevKinsta or Docker. You need a database, PHP and a web server.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Docker: WordPress + MySQL
docker network create wpnet
docker run --name wpdb -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=wordpress \\
  --network wpnet -d mysql:8
docker run --name wp -p 8080:80 -e WORDPRESS_DB_HOST=wpdb \\
  -e WORDPRESS_DB_PASSWORD=secret --network wpnet -d wordpress

# Open http://localhost:8080 and finish the installer` },
        { type: 'note', value: 'For real work, install locally first and test changes there before touching the live site.' },
      ],
    },
    {
      id: 'wp-dashboard',
      title: 'The dashboard',
      blocks: [
        { type: 'text', value: 'The dashboard is the admin area at /wp-admin. It holds posts, pages, media, appearance, plugins, users and settings. Learn where each setting lives before you start building.' },
        { type: 'list', items: [
          'Posts: blog entries with categories and tags',
          'Pages: static pages such as About and Contact',
          'Media: images, PDFs and other uploads',
          'Appearance: themes, menus, widgets and the customizer',
          'Plugins: add features without writing code',
          'Settings: site title, permalinks, reading and discussion',
        ] },
        { type: 'note', value: 'Set permalinks to Post name under Settings > Permalinks. It makes URLs readable and helps SEO.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What language is WordPress written in?',
      options: ['Python', 'PHP', 'Java', 'Ruby'],
      answer: 1,
      explain: 'WordPress runs on PHP with a MySQL or MariaDB database.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the admin area URL?',
      options: ['/admin', '/wp-admin', '/dashboard', '/cms'],
      answer: 1,
      explain: 'The admin area lives at /wp-admin.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which setting makes URLs readable?',
      options: ['Reading', 'Permalinks set to Post name', 'Discussion', 'Media'],
      answer: 1,
      explain: 'Post name permalinks produce readable URLs.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the difference between posts and pages?',
      options: ['Nothing', 'Posts are dated and categorised; pages are static', 'Pages can be categorised', 'Posts are static'],
      answer: 1,
      explain: 'Posts are blog entries; pages are static.',
    },
  ],
};
