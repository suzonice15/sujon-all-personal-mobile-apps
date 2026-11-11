// Laravel chapter: Routing. Lessons plus this chapter's quiz questions.

export default {
  id: 'routing',
  title: 'Routing',
  description: 'URLs, parameters, groups and route model binding',
  icon: 'route',
  lessons: [
    {
      id: 'laravel-basic-routes',
      title: 'Defining Routes',
      blocks: [
        { type: 'text', value: 'A route maps an HTTP method and URI to an action. The action can be a closure, a controller method or an invokable class. Laravel supports the methods browsers and APIs use every day: GET, POST, PUT, PATCH, DELETE, OPTIONS and HEAD.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::put('/posts/{post}', [PostController::class, 'update']);
Route::patch('/posts/{post}', [PostController::class, 'update']);
Route::delete('/posts/{post}', [PostController::class, 'destroy']);

// Shortcuts for simple pages
Route::view('/about', 'pages.about');
Route::redirect('/old', '/new', 301);

// One handler for several methods
Route::match(['get', 'post'], '/contact', [ContactController::class, 'handle']);
Route::any('/webhook', [WebhookController::class, 'receive']);` },
        { type: 'list', items: [
          'GET reads data, POST creates, PUT replaces, PATCH partially updates, DELETE removes. Using the right method keeps your app predictable and cache-friendly.',
          'Route::view is a shortcut for a closure that returns view(). Route::redirect avoids writing a closure for simple moves.',
          'Route order matters: a catch-all route placed too early can hide more specific routes.',
          'Use api.php for stateless endpoints and web.php for browser pages with sessions and CSRF.',
        ] },
        { type: 'note', value: 'A browser form can only send GET and POST. Use the Blade @method directive to spoof PUT, PATCH or DELETE in a POST form.' },
      ],
    },
    {
      id: 'laravel-route-params',
      title: 'Route Parameters and Constraints',
      blocks: [
        { type: 'text', value: 'Curly braces mark a dynamic segment. Laravel passes matched values to the action in order, and you can constrain what a parameter accepts so invalid URLs return 404 before reaching your code.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\Route;

// Required parameters
Route::get('/posts/{post}/comments/{comment}', function (string $post, string $comment) {
    return "Post {$post}, comment {$comment}";
});

// Optional parameter with a default: must come last
Route::get('/search/{term?}', function (string $term = 'all') {
    return "Searching for {$term}";
});

// Constraints
Route::get('/users/{id}', fn (string $id) => $id)->whereNumber('id');
Route::get('/slugs/{slug}', fn (string $slug) => $slug)->whereAlphaNumeric('slug');
Route::get('/categories/{category}', fn (string $category) => $category)
    ->whereIn('category', ['news', 'tutorials', 'reviews']);
Route::get('/files/{path}', fn (string $path) => $path)->where('path', '.*');` },
        { type: 'list', items: [
          'Type-hinted controller arguments can use int, string, bool or an enum; Laravel converts them where possible.',
          'whereNumber, whereAlpha, whereAlphaNumeric and whereUuid are readable shortcuts in modern Laravel.',
          'Allow encoded slashes with ->where("path", ".*") when a parameter must contain separators, for example file paths.',
          'Global patterns can be registered when many routes share the same constraint, avoiding repetition.',
          'Optional parameters cannot be followed by required ones in the same URI.',
        ] },
        { type: 'note', value: 'Always constrain numeric IDs. Without a constraint, /users/abc reaches your controller and fails later with a confusing database error instead of a clean 404.' },
      ],
    },
    {
      id: 'laravel-named-routes',
      title: 'Named Routes and URLs',
      blocks: [
        { type: 'text', value: 'A named route gives you a stable identifier for a URL. Instead of hardcoding strings in controllers and views, you generate URLs by name. When the URI changes, every generated link keeps working.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/profile/{user}', [ProfileController::class, 'show'])
    ->name('profile.show');

// Generate URLs
$url = route('profile.show', ['user' => 42]);
$absolute = route('profile.show', ['user' => 42], absolute: false);

// Redirects by name
return redirect()->route('profile.show', ['user' => $user]);

// Current route in a controller
$name = request()->route()->getName();` },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/nav.blade.php --}}
<a href="{{ route('profile.show', $user) }}">Profile</a>

<a href="{{ route('profile.show', ['user' => $user, 'tab' => 'security']) }}">Security</a>

<form method="POST" action="{{ route('profile.update', $user) }}">
  @csrf
  @method('PUT')
  <button>Save</button>
</form>` },
        { type: 'list', items: [
          'Extra array keys not present in the URI become query string parameters automatically.',
          'Use route names in tests: assertRedirect(route("profile.show", $user)) is clearer than a raw path.',
          'For JavaScript, Ziggy exposes named Laravel routes to the frontend; it is optional but very useful in SPAs.',
          'Route::currentRouteName() and request()->route()->getName() are handy for active navigation states.',
        ] },
        { type: 'note', value: 'Naming every route is a small habit with a large payoff: route:list becomes readable and a URI refactor becomes a one-line change.' },
      ],
    },
    {
      id: 'laravel-route-groups',
      title: 'Groups, Prefixes and Middleware',
      blocks: [
        { type: 'text', value: 'Groups apply shared settings to many routes without repeating them. This is how Laravel applications keep authentication, prefixes, names and domain constraints consistent across a feature.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'can:access-admin'])
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', UserController::class);
    });

Route::domain('{account}.example.com')
    ->middleware('auth')
    ->group(function () {
        Route::get('/', [WorkspaceController::class, 'show']);
    });` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Route groups can share a controller
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index')->name('orders.index');
    Route::post('/orders', 'store')->name('orders.store');
    Route::get('/orders/{order}', 'show')->name('orders.show');
});` },
        { type: 'list', items: [
          'prefix() changes the URI, name() prefixes route names, middleware() adds layers, domain() constrains the host.',
          'Middleware runs in the order listed; the auth check should come before authorization that assumes a user.',
          'Route::controller groups actions that belong to one controller while keeping each route explicit.',
          'Groups can be nested: an outer auth group plus an inner admin prefix is normal and readable.',
        ] },
        { type: 'note', value: 'The name prefix is applied only when you actually call name() inside the group. A route without a name gets no name, not a prefixed one.' },
      ],
    },
    {
      id: 'laravel-route-model-binding',
      title: 'Route Model Binding',
      blocks: [
        { type: 'text', value: 'Model binding lets Laravel turn a URL segment into an Eloquent model instance. If the record does not exist, the framework returns a 404 automatically, so controllers stay focused on behaviour instead of lookups.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Implicit binding: {post} plus a Post type-hint
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::put('/posts/{post}', [PostController::class, 'update']);

// app/Http/Controllers/PostController.php
public function show(Post $post)
{
    return view('posts.show', ['post' => $post]);
}

// Custom database column
Route::get('/posts/{post:slug}', [PostController::class, 'show']);

// app/Models/Post.php
public function getRouteKeyName(): string
{
    return 'slug';
}` },
        { type: 'list', items: [
          'The parameter name must match the variable name in the controller signature.',
          'Use {post:slug} for a one-off custom column, or getRouteKeyName() to make it the default for the model.',
          'Nested bindings are scoped automatically only when you ask for it with ->scopeBindings() or in a resource route.',
          'Soft-deleted models are not resolved; add withTrashed() on the route or a custom binding to include them.',
          'Explicit bindings are registered with Route::bind() in a service provider for special cases.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Scoped nested binding: the comment must belong to the post
Route::get('/posts/{post}/comments/{comment}', [CommentController::class, 'show'])
    ->scopeBindings();

// Include soft-deleted records
Route::get('/posts/{post}/restore', [PostController::class, 'restore'])
    ->withTrashed();` },
        { type: 'note', value: 'Model binding is not authorization. It proves the record exists, not that the current user may view it. Add a policy check before returning or changing sensitive data.' },
      ],
    },
    {
      id: 'laravel-route-advanced',
      title: 'Fallbacks, Rate Limiting and Patterns',
      blocks: [
        { type: 'text', value: 'Production routes need a plan for unknown URLs, abusive clients and repeated constraints. Laravel provides fallback routes, named rate limiters and global patterns for exactly these cases.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\Route;

// A fallback at the end of the file
Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});

// Global pattern, often in AppServiceProvider::boot()
Route::pattern('id', '[0-9]+');
Route::pattern('slug', '[a-z0-9-]+');

// Throttle a group
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/search', [SearchController::class, 'index']);
});` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// app/Providers/AppServiceProvider.php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

public function boot(): void
{
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    });

    RateLimiter::for('login', function (Request $request) {
        return Limit::perMinute(5)->by($request->input('email').'|'.$request->ip());
    });
}` },
        { type: 'list', items: [
          'Fallback routes catch everything unmatched, so register them after all real routes.',
          'throttle:60,1 means 60 requests per minute; a named limiter gives you per-user logic.',
          'Return a JSON body from a fallback when the request expects JSON: use $request->expectsJson().',
          'Signed URLs protect temporary links such as email verification and password resets.',
          'Route caching in production requires that routes contain no unsupported closures in older versions.',
        ] },
        { type: 'note', value: 'Rate limiting is not a security boundary by itself. Combine it with authentication, authorization and proper logging when protecting login or payment endpoints.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'routing', q: 'Which HTTP method should replace a resource completely?', options: ['GET', 'POST', 'PUT', 'PATCH'], answer: 2, explain: 'PUT replaces the resource representation; PATCH applies a partial update.' },
    { chapterId: 'routing', q: 'How do you make a route parameter optional?', options: ['{id?}', '[id]', '{id=null}', ':id'], answer: 0, explain: 'A trailing question mark marks the parameter optional, and it must come last in the URI.' },
    { chapterId: 'routing', q: 'What does ->whereNumber("id") do?', options: ['Casts id to int', 'Restricts the id segment to digits', 'Makes id optional', 'Renames the parameter'], answer: 1, explain: 'It constrains the route so non-numeric values do not match and produce a 404.' },
    { chapterId: 'routing', q: 'Why use named routes?', options: ['They run faster', 'They generate stable URLs that survive URI changes', 'They add authentication', 'They replace middleware'], answer: 1, explain: 'route() builds URLs from the name, so moving a path does not break every link.' },
    { chapterId: 'routing', q: 'What does the name prefix in Route::name("admin.")->group do?', options: ['Renames controllers', 'Prefixes names of routes that define names inside the group', 'Changes the domain', 'Adds a URI prefix'], answer: 1, explain: 'Nested names such as users.index become admin.users.index; the URI is not affected.' },
    { chapterId: 'routing', q: 'What happens when implicit model binding cannot find the record?', options: ['It returns an empty model', 'It returns null', 'Laravel aborts with a 404', 'It throws a SQL error'], answer: 2, explain: 'The framework resolves the model or sends a 404, keeping controllers free of manual lookups.' },
    { chapterId: 'routing', q: 'What is a fallback route for?', options: ['Serving static files', 'Handling URLs that match no other route', 'Caching responses', 'Redirecting after login'], answer: 1, explain: 'Route::fallback runs for unmatched requests, typically rendering a custom 404.' },
    { chapterId: 'routing', q: 'What does throttle:60,1 allow?', options: ['60 requests per second', '60 requests per minute', '1 request per minute', '60 requests per hour'], answer: 1, explain: 'The first number is the max attempts and the second is the decay window in minutes.' },
  ],
};
