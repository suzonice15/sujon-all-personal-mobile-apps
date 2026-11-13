// WordPress chapter: Custom Theme Development.

export default {
  id: 'theme-development',
  title: 'Theme Development',
  description: 'Template hierarchy, the loop and hooks',
  icon: 'code',
  lessons: [
    {
      id: 'wp-template-hierarchy',
      title: 'The template hierarchy',
      blocks: [
        { type: 'text', value: 'WordPress picks a template file for each request using the template hierarchy. A single post uses single-post.php, then single.php, then singular.php, then index.php. You override only the files you need.' },
        { type: 'code', lang: 'text', tryIt: false, value: `theme/
  style.css
  functions.php
  index.php
  header.php
  footer.php
  sidebar.php
  single.php
  page.php
  archive.php
  search.php
  404.php
  screenshot.png` },
        { type: 'note', value: 'index.php is the fallback and is required. Start from it and add specific templates as you need them.' },
      ],
    },
    {
      id: 'wp-the-loop',
      title: 'The loop',
      blocks: [
        { type: 'text', value: 'The loop is how WordPress outputs posts. while (have_posts()) advances to the next post, and the_post() sets up the global post. Inside the loop you can call the_title(), the_content() and the_permalink().' },
        { type: 'code', lang: 'php', tryIt: false, value: `<?php get_header(); ?>

<main>
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <article <?php post_class(); ?>>
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <?php the_excerpt(); ?>
      </article>
    <?php endwhile; ?>
  <?php else : ?>
    <p>No posts found.</p>
  <?php endif; ?>
</main>

<?php get_footer(); ?>` },
        { type: 'note', value: 'Always escape output: esc_html() for text, esc_url() for links, esc_attr() for attributes. It prevents XSS.' },
      ],
    },
    {
      id: 'wp-hooks-assets',
      title: 'Hooks and assets',
      blocks: [
        { type: 'text', value: 'functions.php registers theme support, menus and assets. Use wp_enqueue_style and wp_enqueue_script so WordPress loads them in the right order and version. Never link styles with raw <link> tags.' },
        { type: 'code', lang: 'php', tryIt: false, value: `<?php
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(['primary' => 'Primary Menu']);
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('codenest-style', get_stylesheet_uri(), [], '1.0');
    wp_enqueue_script('codenest-app', get_template_directory_uri() . '/js/app.js', [], '1.0', true);
});` },
        { type: 'note', value: 'The last argument true loads a script in the footer. Use it for scripts that are not needed before the page renders.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'theme-development',
      q: 'Which template is the required fallback?',
      options: ['single.php', 'index.php', 'page.php', 'header.php'],
      answer: 1,
      explain: 'index.php is required as the fallback.',
    },
    {
      chapterId: 'theme-development',
      q: 'What does the loop do?',
      options: ['Loads CSS', 'Outputs the posts for the current page', 'Creates users', 'Runs tests'],
      answer: 1,
      explain: 'The loop iterates over posts.',
    },
    {
      chapterId: 'theme-development',
      q: 'Why escape output with esc_html and esc_url?',
      options: ['To speed up the site', 'To prevent XSS attacks', 'To compress HTML', 'To cache pages'],
      answer: 1,
      explain: 'Escaping protects against injected scripts.',
    },
    {
      chapterId: 'theme-development',
      q: 'Why use wp_enqueue_style instead of a raw link tag?',
      options: ['It is shorter', 'WordPress manages order, versioning and dependencies', 'It is required by browsers', 'It caches the file'],
      answer: 1,
      explain: 'Enqueueing handles order and versions.',
    },
  ],
};
