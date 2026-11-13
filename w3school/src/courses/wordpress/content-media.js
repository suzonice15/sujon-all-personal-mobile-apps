// WordPress chapter: Content & Media.

export default {
  id: 'content-media',
  title: 'Content & Media',
  description: 'Posts, pages, categories, the block editor and media',
  icon: 'article',
  lessons: [
    {
      id: 'wp-posts-pages',
      title: 'Posts, pages and categories',
      blocks: [
        { type: 'text', value: 'Posts are dated entries organised by category and tag. Pages are static and sit outside the blog flow. A good site uses pages for About, Contact and Services, and posts for news or articles.' },
        { type: 'list', items: [
          'Categories group related posts',
          'Tags describe specific topics',
          'A post can have one or more categories',
          'Pages can be nested under a parent page',
          'Use a clear slug for every post and page',
        ] },
        { type: 'note', value: 'Do not mix content types. A page named "Blog" that holds posts confuses both users and search engines.' },
      ],
    },
    {
      id: 'wp-block-editor',
      title: 'The block editor',
      blocks: [
        { type: 'text', value: 'The block editor (Gutenberg) builds content from blocks: paragraphs, headings, images, columns, buttons and more. Reusable blocks and patterns keep pages consistent.' },
        { type: 'list', items: [
          'Blocks can be nested inside Cover, Group and Columns blocks',
          'Patterns are prebuilt groups of blocks',
          'Reusable blocks sync across pages',
          'The block editor stores content as HTML comments plus markup',
          'Use the List View to navigate a complex page',
        ] },
        { type: 'note', value: 'Keep pages simple. A wall of blocks is hard to edit and easy to break when the theme changes.' },
      ],
    },
    {
      id: 'wp-media',
      title: 'Media and images',
      blocks: [
        { type: 'text', value: 'The media library stores uploads. WordPress creates several image sizes on upload. Compress images before uploading, use descriptive file names and alt text, and pick the right size in the block.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// Add a custom image size in the theme
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_image_size('course-card', 640, 360, true);
});

// Use it in a template
the_post_thumbnail('course-card', ['alt' => get_the_title()]);` },
        { type: 'note', value: 'Alt text is required for accessibility and also helps SEO. Describe the image, not the file name.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'content-media',
      q: 'What is the difference between a category and a tag?',
      options: ['They are the same', 'A category groups broadly; a tag describes a specific topic', 'Tags are pages', 'Categories are static'],
      answer: 1,
      explain: 'Categories are broad groups; tags are specific.',
    },
    {
      chapterId: 'content-media',
      q: 'What does the block editor build content from?',
      options: ['Shortcodes only', 'Blocks', 'HTML files', 'CSS classes'],
      answer: 1,
      explain: 'Gutenberg builds content from blocks.',
    },
    {
      chapterId: 'content-media',
      q: 'Why compress images before upload?',
      options: ['To make them blurry', 'To keep pages fast and save disk space', 'It is required', 'To remove alt text'],
      answer: 1,
      explain: 'Large images slow the site down.',
    },
    {
      chapterId: 'content-media',
      q: 'Why is alt text important?',
      options: ['It changes the file name', 'It helps accessibility and SEO', 'It compresses the image', 'It creates a thumbnail'],
      answer: 1,
      explain: 'Alt text describes the image for screen readers and search.',
    },
  ],
};
