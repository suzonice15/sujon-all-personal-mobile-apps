// PHP chapter: WordPress Development. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// WordPress code needs a WordPress install; the hooks lesson includes a runnable model.

export default {
  id: 'wordpress',
  title: 'WordPress Development',
  description: 'Hooks, plugins, themes, custom post types, WP_Query and WP security',
  icon: 'web',
  lessons: [
    {
      id: 'php-wp-intro',
      title: 'WordPress for PHP Developers',
      blocks: [
        { type: 'text', value: 'WordPress runs a huge share of all websites and is one of the largest sources of PHP freelance and agency work (custom themes, plugins, WooCommerce stores, speed and security fixes). With the PHP you know, you can go far beyond "installing themes".' },
        { type: 'code', lang: 'text', value: String.raw`wordpress/
├── wp-config.php            database credentials, salts, WP_DEBUG
├── wp-admin/  wp-includes/  WordPress core (never edit!)
└── wp-content/
    ├── themes/
    │   └── codenest-child/  style.css, functions.php, templates
    ├── plugins/
    │   └── codenest-courses/codenest-courses.php
    └── uploads/             media files

# WP-CLI: manage sites from the terminal
$ wp core download && wp config create --dbname=wp --dbuser=root
$ wp plugin install woocommerce --activate
$ wp user create editor1 editor@example.com --role=editor
$ wp search-replace 'http://old.test' 'https://new.com'` },
        { type: 'list', items: [
          'Never edit core files or a third-party theme directly: updates overwrite your changes. Use a child theme or your own plugin.',
          'Turn on WP_DEBUG and WP_DEBUG_LOG in development.',
          'Use a local environment: LocalWP, DDEV or Docker.',
        ] },
      ],
    },
    {
      id: 'php-wp-hooks',
      title: 'Hooks: Actions and Filters',
      blocks: [
        { type: 'text', value: 'Everything in WordPress is extended through hooks. An action runs your code at a moment ("a post was saved", "the footer is printing"). A filter lets you change a value before WordPress uses it ("the post title", "the price"). This runnable model shows exactly how they work inside.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// A simplified copy of WordPress' hook system
$wp_hooks = [];

function add_filter(string $hook, callable $cb, int $priority = 10, int $args = 1): void
{
    global $wp_hooks;
    $wp_hooks[$hook][$priority][] = [$cb, $args];
}
function add_action(string $hook, callable $cb, int $priority = 10, int $args = 1): void
{
    add_filter($hook, $cb, $priority, $args);
}
function apply_filters(string $hook, mixed $value, mixed ...$extra): mixed
{
    global $wp_hooks;
    $callbacks = $wp_hooks[$hook] ?? [];
    ksort($callbacks);                                   // lower priority number runs first
    foreach ($callbacks as $list) {
        foreach ($list as [$cb, $args]) $value = $cb(...array_slice([$value, ...$extra], 0, $args));
    }
    return $value;
}
function do_action(string $hook, mixed ...$args): void
{
    global $wp_hooks;
    $callbacks = $wp_hooks[$hook] ?? [];
    ksort($callbacks);
    foreach ($callbacks as $list) foreach ($list as [$cb, $n]) $cb(...array_slice($args, 0, $n));
}

// --- Plugin code: what you write
add_filter('the_title', fn($t) => ucwords($t));
add_filter('the_title', fn($t) => "★ $t", 20);          // runs after priority 10
add_filter('product_price', fn($price, $user) => $user === 'student' ? $price * 0.8 : $price, 10, 2);
add_action('save_post', function ($postId, $post) {
    echo "Clearing cache for post $postId ({$post['status']})\n";
}, 10, 2);

// --- Core code: what WordPress does
echo apply_filters('the_title', 'learn php the right way'), "\n";
echo apply_filters('product_price', 1000, 'student'), "\n";
do_action('save_post', 42, ['status' => 'publish']);` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Real WordPress examples (in a plugin or functions.php)
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('codenest', get_stylesheet_directory_uri() . '/build/app.css', [], '1.2.0');
    wp_enqueue_script('codenest', get_stylesheet_directory_uri() . '/build/app.js', [], '1.2.0', ['in_footer' => true]);
});

add_filter('excerpt_length', fn() => 25);

add_action('woocommerce_thankyou', function (int $orderId) {
    $order = wc_get_order($orderId);
    // send an SMS, award points, notify Slack...
});` },
      ],
    },
    {
      id: 'php-wp-plugin',
      title: 'Writing a Plugin',
      blocks: [
        { type: 'text', value: 'A plugin is a folder in wp-content/plugins with a PHP file that has a header comment. Use a namespace or a unique prefix, and organise bigger plugins in classes with Composer autoloading.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
/**
 * Plugin Name: CodeNest Courses
 * Description: Course post type, enrolment shortcode and REST endpoint.
 * Version: 1.0.0
 * Requires PHP: 8.1
 * Text Domain: codenest-courses
 */

namespace CodeNest\Courses;

defined('ABSPATH') || exit;              // block direct access to the file

// Custom post type "course" with its own admin menu, archive and REST support
add_action('init', function () {
    register_post_type('course', [
        'label' => __('Courses', 'codenest-courses'),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,          // enables the block editor and /wp-json/wp/v2/course
        'rewrite' => ['slug' => 'courses'],
    ]);
    register_post_meta('course', 'lesson_count', ['type' => 'integer', 'single' => true, 'show_in_rest' => true]);
});

// Shortcode: [course_list limit="3"]
add_shortcode('course_list', function (array $atts): string {
    $atts = shortcode_atts(['limit' => 5], $atts);
    $query = new \WP_Query([
        'post_type' => 'course',
        'posts_per_page' => (int) $atts['limit'],
        'orderby' => 'date',
        'no_found_rows' => true,          // skip counting rows: faster when no pagination
    ]);
    $html = '<ul class="courses">';
    foreach ($query->posts as $post) {
        $lessons = (int) get_post_meta($post->ID, 'lesson_count', true);
        $html .= sprintf('<li><a href="%s">%s</a> (%d lessons)</li>',
            esc_url(get_permalink($post)), esc_html(get_the_title($post)), $lessons);
    }
    return $html . '</ul>';
});

register_activation_hook(__FILE__, fn() => flush_rewrite_rules());` },
      ],
    },
    {
      id: 'php-wp-security',
      title: 'WordPress Security: Sanitize, Escape, Nonces, Capabilities',
      blocks: [
        { type: 'text', value: 'Most hacked WordPress sites are hacked through insecure plugins. Every plugin you write must follow four rules: sanitize input, escape output, verify nonces, and check capabilities.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Settings form in the admin
function render_settings_form(): void
{
    if (!current_user_can('manage_options')) wp_die('Not allowed');   // capability check
    ?>
    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="codenest_save">
        <?php wp_nonce_field('codenest_save_settings'); ?>             <!-- CSRF token -->
        <input name="welcome_text" value="<?php echo esc_attr(get_option('codenest_welcome', '')); ?>">
        <button class="button button-primary">Save</button>
    </form>
    <?php
}

add_action('admin_post_codenest_save', function () {
    if (!current_user_can('manage_options')) wp_die('Not allowed');
    check_admin_referer('codenest_save_settings');                    // verify nonce

    $text = sanitize_text_field(wp_unslash($_POST['welcome_text'] ?? ''));   // sanitize INPUT
    update_option('codenest_welcome', $text);
    wp_safe_redirect(admin_url('options-general.php?page=codenest&saved=1'));
    exit;
});

// Escape OUTPUT for the context
echo esc_html($title);             // text inside HTML
echo esc_attr($value);             // inside an attribute
echo esc_url($link);               // URLs
echo wp_kses_post($content);       // allow safe post HTML only

// Database: always prepare
global $wpdb;
$rows = $wpdb->get_results($wpdb->prepare(
    "SELECT ID, post_title FROM {$wpdb->posts} WHERE post_type = %s AND post_author = %d",
    'course', get_current_user_id()
));` },
        { type: 'list', items: [
          'Sanitize: sanitize_text_field, sanitize_email, absint, sanitize_key, wp_kses for HTML.',
          'Escape late, right where you print: esc_html, esc_attr, esc_url, esc_js, wp_json_encode.',
          'Nonces: wp_nonce_field / check_admin_referer for forms, wp_create_nonce / check_ajax_referer for AJAX.',
          'Capabilities: current_user_can(\'edit_post\', $id), never check roles by name.',
          'Keep WordPress, themes and plugins updated; remove unused plugins.',
        ] },
      ],
    },
    {
      id: 'php-wp-rest-blocks',
      title: 'Custom REST Endpoints and Headless WordPress',
      blocks: [
        { type: 'text', value: 'WordPress has a built-in REST API at /wp-json. Add your own endpoints for mobile apps or a React/Vue frontend ("headless WordPress").' },
        { type: 'code', lang: 'php', value: String.raw`<?php
add_action('rest_api_init', function () {
    register_rest_route('codenest/v1', '/courses/(?P<id>\d+)/enroll', [
        'methods' => 'POST',
        'callback' => function (WP_REST_Request $request) {
            $courseId = (int) $request['id'];
            if (get_post_type($courseId) !== 'course') {
                return new WP_Error('not_found', 'Course not found', ['status' => 404]);
            }
            $userId = get_current_user_id();
            add_user_meta($userId, 'enrolled_course', $courseId);
            return new WP_REST_Response(['enrolled' => true, 'course' => $courseId], 201);
        },
        'permission_callback' => fn() => is_user_logged_in(),   // REQUIRED: never use __return_true for writes
        'args' => ['id' => ['validate_callback' => fn($v) => is_numeric($v)]],
    ]);
});

// GET  /wp-json/wp/v2/course?per_page=5     (from show_in_rest)
// POST /wp-json/codenest/v1/courses/12/enroll  (authenticate with an application password or cookie + nonce)` },
        { type: 'note', value: 'Performance tips: use object caching (Redis), page caching, avoid queries inside loops (use WP_Query with the right args), store large data in custom tables, and profile with Query Monitor.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'wordpress', q: 'What is the difference between an action and a filter?', options: ['No difference', 'An action runs code at a moment; a filter receives a value and returns a (modified) value', 'Filters only work in themes', 'Actions return values'], answer: 1, explain: 'add_action for side effects, add_filter to change data.' },
    { chapterId: 'wordpress', q: 'With the same hook, which callback runs first?', options: ['Priority 20', 'Priority 5', 'The one added last', 'Random'], answer: 1, explain: 'Lower priority numbers run earlier (default 10).' },
    { chapterId: 'wordpress', q: 'Where should site-specific changes to a theme go?', options: ['Edit the theme files', 'A child theme or a custom plugin', 'wp-includes', 'wp-config.php'], answer: 1, explain: 'Updates would overwrite edits to the parent theme.' },
    { chapterId: 'wordpress', q: 'What protects a WordPress form against CSRF?', options: ['esc_html', 'A nonce (wp_nonce_field + check_admin_referer)', 'sanitize_text_field', 'WP_Query'], answer: 1, explain: 'Nonces are WordPress\' CSRF tokens.' },
    { chapterId: 'wordpress', q: 'Which function escapes a value printed inside an HTML attribute?', options: ['esc_html', 'esc_attr', 'esc_url', 'sanitize_key'], answer: 1, explain: 'Pick the escaping function for the output context.' },
    { chapterId: 'wordpress', q: 'What must every register_rest_route() have for write endpoints?', options: ['A shortcode', 'A permission_callback that checks the user', 'A child theme', 'WP_DEBUG enabled'], answer: 1, explain: 'Without it anyone can call the endpoint.' },
  ],
};
