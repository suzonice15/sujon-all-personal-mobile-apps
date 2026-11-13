// WordPress interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is WordPress?',
      a: 'An open-source content management system written in PHP, using MySQL or MariaDB, used to build blogs, business sites and stores.',
      level: 'basic',
    },
    {
      q: 'WordPress.org versus WordPress.com?',
      a: 'WordPress.org is the self-hosted software you install on your own host. WordPress.com is a hosted service with limited customisation.',
      level: 'basic',
    },
    {
      q: 'Posts versus pages?',
      a: 'Posts are dated entries organised by category and tag. Pages are static and sit outside the blog flow.',
      level: 'basic',
    },
    {
      q: 'Why set permalinks to Post name?',
      a: 'It produces readable URLs that help users and search engines.',
      level: 'basic',
    },
  ],
  'content-media': [
    {
      q: 'What is the block editor?',
      a: 'Gutenberg, which builds content from blocks such as paragraphs, images and columns instead of one large text field.',
      level: 'basic',
    },
    {
      q: 'Category versus tag?',
      a: 'A category groups posts broadly. A tag describes a specific topic and is more granular.',
      level: 'basic',
    },
    {
      q: 'How do you add a custom image size?',
      a: 'Use add_image_size in after_setup_theme, then call the_post_thumbnail with that size name.',
      level: 'intermediate',
    },
    {
      q: 'Why compress images before upload?',
      a: 'Large images slow the site and waste bandwidth. Compress and serve modern formats such as WebP.',
      level: 'basic',
    },
  ],
  'themes-customizer': [
    {
      q: 'What is a child theme?',
      a: 'A theme that inherits from a parent and overrides only what you change, so parent updates do not wipe your work.',
      level: 'basic',
    },
    {
      q: 'What must the Template header in a child theme match?',
      a: 'The parent theme folder name, exactly.',
      level: 'basic',
    },
    {
      q: 'What does theme.json do?',
      a: 'It defines design tokens such as colours, spacing and typography for block themes.',
      level: 'intermediate',
    },
    {
      q: 'How do you choose a theme for a client?',
      a: 'Check updates, active installs, performance and mobile layout. Prefer lightweight, maintained themes.',
      level: 'basic',
    },
  ],
  plugins: [
    {
      q: 'Action versus filter?',
      a: 'An action runs code at a point in the request. A filter changes a value and returns it.',
      level: 'basic',
    },
    {
      q: 'Why avoid many plugins?',
      a: 'Each plugin is code to update and a possible conflict. Fewer, well-maintained plugins are safer and faster.',
      level: 'basic',
    },
    {
      q: 'Why never edit core files?',
      a: 'Updates overwrite them, and the site becomes impossible to maintain.',
      level: 'basic',
    },
    {
      q: 'What does WooCommerce add?',
      a: 'Products, cart, checkout, orders, payments and shipping for an online store.',
      level: 'basic',
    },
  ],
  'theme-development': [
    {
      q: 'How does the template hierarchy work?',
      a: 'WordPress picks the most specific template for a request, falling back to index.php. A single post tries single-post.php, then single.php, then index.php.',
      level: 'intermediate',
    },
    {
      q: 'What is the loop?',
      a: 'The while (have_posts()) loop that iterates over posts and sets up the global post for template tags.',
      level: 'basic',
    },
    {
      q: 'Why escape output?',
      a: 'To prevent XSS. Use esc_html for text, esc_url for links and esc_attr for attributes.',
      level: 'intermediate',
    },
    {
      q: 'Why enqueue assets instead of linking them directly?',
      a: 'WordPress manages order, versions and dependencies, which prevents conflicts and caching issues.',
      level: 'intermediate',
    },
  ],
  'plugin-development': [
    {
      q: 'Why check ABSPATH at the top of a plugin?',
      a: 'It blocks direct access to the PHP file and prevents code from running outside WordPress.',
      level: 'basic',
    },
    {
      q: 'What is a custom post type?',
      a: 'A new content type registered by a plugin or theme, with its own admin menu, URLs and fields.',
      level: 'intermediate',
    },
    {
      q: 'What does show_in_rest enable?',
      a: 'It makes the post type available in the block editor and the REST API.',
      level: 'intermediate',
    },
    {
      q: 'Why set a permission_callback on a REST route?',
      a: 'To control who can access the endpoint. Returning true makes it public; a capability check protects private data.',
      level: 'advanced',
    },
  ],
  woocommerce: [
    {
      q: 'What product types does WooCommerce have?',
      a: 'Simple, variable, virtual, downloadable and grouped products.',
      level: 'basic',
    },
    {
      q: 'Why never store card numbers yourself?',
      a: 'It is a serious PCI compliance risk. Use the gateway hosted fields or redirect.',
      level: 'intermediate',
    },
    {
      q: 'What is a shipping zone?',
      a: 'A geographic area with its own shipping methods and rates.',
      level: 'basic',
    },
    {
      q: 'Which order status means paid and preparing?',
      a: 'Processing. Completed means fulfilled.',
      level: 'basic',
    },
  ],
  'performance-security': [
    {
      q: 'What is the biggest performance win for WordPress?',
      a: 'Page caching, which serves static HTML and avoids running PHP and the database for most visitors.',
      level: 'basic',
    },
    {
      q: 'Why exclude cart and checkout from caching?',
      a: 'They contain per-user content. Caching them can leak data between users.',
      level: 'intermediate',
    },
    {
      q: 'What are common causes of WordPress hacks?',
      a: 'Outdated plugins and themes, weak passwords and missing core updates.',
      level: 'basic',
    },
    {
      q: 'Why test a backup restore?',
      a: 'An untested backup may fail when you need it. Only a restore proves it works.',
      level: 'intermediate',
    },
  ],
  'hosting-maintenance': [
    {
      q: 'Shared versus managed WordPress hosting?',
      a: 'Shared is cheap with limited resources. Managed includes caching, staging, backups and support at a higher price.',
      level: 'basic',
    },
    {
      q: 'Why use a staging site?',
      a: 'To test updates and changes before they reach production, without risking the live site.',
      level: 'basic',
    },
    {
      q: 'Why use WP-CLI for a URL search-replace?',
      a: 'It handles serialized data safely, unlike a plain SQL REPLACE which can corrupt it.',
      level: 'advanced',
    },
    {
      q: 'What should you do before every update?',
      a: 'Back up the site, then test on staging before production.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'What should a client handover include?',
      a: 'A short guide to content, updates, backups and who to contact, plus the admin login.',
      level: 'basic',
    },
    {
      q: 'How would you speed up a slow WordPress site?',
      a: 'Measure with PageSpeed, add page caching, compress images, use a CDN, remove unused plugins and defer scripts.',
      level: 'intermediate',
    },
    {
      q: 'How would you secure a new WordPress site?',
      a: 'Strong passwords, 2FA, limited login attempts, HTTPS, backups, updates and no file editing in the admin.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first WordPress step for a beginner?',
      a: 'Install locally, learn the dashboard and content, then themes and plugins.',
      level: 'basic',
    },
  ],
};
