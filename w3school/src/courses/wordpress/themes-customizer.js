// WordPress chapter: Themes & Customizer.

export default {
  id: 'themes-customizer',
  title: 'Themes & Customizer',
  description: 'Choosing themes, child themes and site-wide settings',
  icon: 'palette',
  lessons: [
    {
      id: 'wp-themes',
      title: 'Choosing a theme',
      blocks: [
        { type: 'text', value: 'A theme controls the look and layout of a site. Choose a lightweight, well-maintained theme from a trusted source. A bloated theme with dozens of bundled plugins is hard to maintain and slow.' },
        { type: 'list', items: [
          'Check the last update and the number of active installs',
          'Prefer block themes for modern sites',
          'Avoid themes that bundle many required plugins',
          'Test mobile and page speed before committing',
          'Buy from a reputable marketplace for client work',
        ] },
        { type: 'note', value: 'Twenty Twenty-Four and similar default themes are a safe base. They are maintained by the WordPress project and work with the block editor.' },
      ],
    },
    {
      id: 'wp-child-theme',
      title: 'Child themes',
      blocks: [
        { type: 'text', value: 'A child theme inherits from a parent but lets you override styles and templates without losing changes on update. Never edit a parent theme directly for a client site.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// style.css at the top of the child theme
/*
Theme Name: CodeNest Child
Template: twentytwentyfour
*/

// functions.php: load the parent styles
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
});` },
        { type: 'note', value: 'The Template line must match the parent theme folder name exactly, or WordPress will not recognise the child theme.' },
      ],
    },
    {
      id: 'wp-customizer-menus',
      title: 'Customizer, menus and widgets',
      blocks: [
        { type: 'text', value: 'The customizer holds site-wide settings: logo, colours, menus and widgets. Block themes use the Site Editor instead. Either way, set up navigation and a footer before building pages.' },
        { type: 'list', items: [
          'Menus define the main navigation',
          'Widgets add content to sidebars and footers',
          'Site identity sets the logo and site title',
          'Block themes use theme.json for colours and spacing',
          'Save a draft and preview before publishing',
        ] },
        { type: 'note', value: 'Keep the main menu short. Five to seven items is easier to use on mobile than a long list.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'themes-customizer',
      q: 'Why use a child theme?',
      options: ['It is faster', 'To change a parent theme without losing changes on update', 'To avoid plugins', 'It is required by WordPress'],
      answer: 1,
      explain: 'A child theme keeps customisations safe.',
    },
    {
      chapterId: 'themes-customizer',
      q: 'What must the Template line in a child theme match?',
      options: ['The site title', 'The parent theme folder name', 'The plugin name', 'The database name'],
      answer: 1,
      explain: 'It must match the parent theme folder.',
    },
    {
      chapterId: 'themes-customizer',
      q: 'What should you check before choosing a theme?',
      options: ['Only the price', 'Updates, installs, speed and mobile layout', 'The logo', 'The design only'],
      answer: 1,
      explain: 'Maintenance and performance matter.',
    },
    {
      chapterId: 'themes-customizer',
      q: 'What does theme.json control in block themes?',
      options: ['Plugins', 'Colours, spacing and typography', 'The database', 'The users'],
      answer: 1,
      explain: 'theme.json defines design tokens for block themes.',
    },
  ],
};
