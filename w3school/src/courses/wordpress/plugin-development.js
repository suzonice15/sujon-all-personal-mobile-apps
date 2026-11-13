// WordPress chapter: Plugin Development.

export default {
  id: 'plugin-development',
  title: 'Plugin Development',
  description: 'Plugin structure, hooks, shortcodes and the REST API',
  icon: 'build',
  lessons: [
    {
      id: 'wp-plugin-structure',
      title: 'Plugin structure',
      blocks: [
        { type: 'text', value: 'A plugin is a folder in wp-content/plugins with a PHP file that has a header comment. Keep files small and organised. Prefix every function and class to avoid collisions with other plugins.' },
        { type: 'code', lang: 'php', tryIt: false, value: `<?php
/*
Plugin Name: CodeNest Courses
Description: Adds a courses custom post type.
Version: 1.0.0
Author: CodeNest
*/

if (!defined('ABSPATH')) {
    exit; // no direct access
}

register_activation_hook(__FILE__, 'codenest_courses_activate');` },
        { type: 'note', value: 'Always check ABSPATH at the top of a plugin file. It blocks direct access to the PHP file.' },
      ],
    },
    {
      id: 'wp-custom-post-type',
      title: 'Custom post types',
      blocks: [
        { type: 'text', value: 'A custom post type lets WordPress manage a new kind of content, such as courses or testimonials, with its own admin menu and URLs. Register it on init.' },
        { type: 'code', lang: 'php', tryIt: false, value: `add_action('init', function () {
    register_post_type('course', [
        'labels' => ['name' => 'Courses', 'singular_name' => 'Course'],
        'public' => true,
        'has_archive' => true,
        'rewrite' => ['slug' => 'courses'],
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,   // enables the block editor and REST API
    ]);
});` },
        { type: 'note', value: 'Set show_in_rest to true so the post type works with the block editor and is available through the REST API.' },
      ],
    },
    {
      id: 'wp-shortcodes-rest',
      title: 'Shortcodes and the REST API',
      blocks: [
        { type: 'text', value: 'A shortcode lets an editor place dynamic content with [my_shortcode]. The REST API exposes data as JSON for apps and JavaScript. Both are ways for a plugin to serve content beyond the default templates.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// Shortcode: list the latest courses
add_shortcode('latest_courses', function ($atts) {
    $query = new WP_Query([
        'post_type' => 'course',
        'posts_per_page' => 5,
    ]);
    $html = '<ul>';
    while ($query->have_posts()) {
        $query->the_post();
        $html .= '<li>' . esc_html(get_the_title()) . '</li>';
    }
    wp_reset_postdata();
    return $html . '</ul>';
});

// REST route: /wp-json/codenest/v1/courses
add_action('rest_api_init', function () {
    register_rest_route('codenest/v1', '/courses', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => fn() => get_posts(['post_type' => 'course']),
    ]);
});` },
        { type: 'note', value: 'Always set a permission_callback on a REST route. Returning true makes it public; check a capability for private data.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'plugin-development',
      q: 'Why check ABSPATH at the top of a plugin?',
      options: ['To speed it up', 'To block direct access to the PHP file', 'To register a menu', 'To load CSS'],
      answer: 1,
      explain: 'ABSPATH blocks direct file access.',
    },
    {
      chapterId: 'plugin-development',
      q: 'What does show_in_rest enable?',
      options: ['The admin menu', 'The block editor and REST API for the post type', 'A shortcode', 'Caching'],
      answer: 1,
      explain: 'It exposes the post type in REST.',
    },
    {
      chapterId: 'plugin-development',
      q: 'What is a shortcode?',
      options: ['A CSS class', 'A tag that renders dynamic content in content areas', 'A plugin header', 'A database table'],
      answer: 1,
      explain: 'Shortcodes render dynamic output in posts.',
    },
    {
      chapterId: 'plugin-development',
      q: 'Why set a permission_callback on a REST route?',
      options: ['It is optional decoration', 'To control who can access the endpoint', 'To cache the response', 'To register the route'],
      answer: 1,
      explain: 'It protects the endpoint.',
    },
  ],
};
