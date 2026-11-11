// Laravel chapter: Caching and Performance. Lessons plus this chapter quiz questions.

export default {
  id: 'caching-performance',
  title: 'Caching & Performance',
  description: 'Make Laravel fast with caches, Redis, indexes and Octane',
  icon: 'speed',
  lessons: [
    {
      id: 'laravel-cache',
      title: 'The Cache API',
      blocks: [
        { type: 'text', value: 'The cache is the highest-leverage performance tool in Laravel. A cache stores an expensive result under a key so the next request can read it in microseconds instead of repeating a database query, an API call or a heavy computation. Laravel gives every driver the same API, so code does not change when you move from a file cache in development to Redis in production.' },
        { type: 'heading', value: 'The remember pattern' },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Illuminate\Support\Facades\Cache;

$courses = Cache::remember('courses:published', now()->addMinutes(10), function () {
    return Course::query()
        ->where('is_published', true)
        ->orderBy('title')
        ->get();
});

Cache::put('stats:dashboard', $stats, now()->addHour());
$stats = Cache::get('stats:dashboard', ['views' => 0]);
Cache::forget('stats:dashboard');

Cache::increment('downloads:today');
Cache::increment('downloads:today', 5);` },
        { type: 'list', items: [
          'remember() reads the key, and only runs the closure on a miss. This is the pattern you will use most.',
          'Use descriptive, namespaced keys such as courses:published or user:42:permissions. Vague keys collide and are hard to invalidate.',
          'Always set a TTL with now()->addMinutes() or an integer number of seconds. rememberForever() is only for data you can invalidate explicitly.',
          'Forget the key whenever the underlying data changes, usually in the same model observer or action that writes it.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Illuminate\Support\Facades\Cache;

// Only one worker rebuilds the expensive report; others wait briefly or skip
$lock = Cache::lock('report:rebuild', 30);

if ($lock->get()) {
    try {
        rebuildReport();
    } finally {
        $lock->release();
    }
}` },
        { type: 'note', value: 'A cache stampede happens when a popular key expires and hundreds of requests rebuild it at the same time. Atomic locks, short jitter on TTLs and Cache::flexible() reduce that spike. Also cache the final shape you need, not a huge Eloquent collection that you filter again later.' },
      ],
    },
    {
      id: 'laravel-cache-drivers',
      title: 'Redis and Cache Drivers',
      blocks: [
        { type: 'text', value: 'Laravel ships with several cache stores: array for tests, file for a single small server, database for simple shared storage, and Redis or Memcached for serious production traffic. The driver is selected with CACHE_STORE, so the same Cache calls work everywhere. Redis is the usual choice because it is fast, supports atomic operations, locks and tags, and can also back queues and sessions.' },
        { type: 'code', lang: 'text', value: String.raw`CACHE_STORE=redis
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Separate logical databases keep cache and queues from evicting each other
REDIS_DB=0
REDIS_CACHE_DB=1` },
        { type: 'list', items: [
          'array: data lives only for one request or test. Never use it in production.',
          'file: no extra service, but each server has its own cache and invalidation is slow on large stores.',
          'database: shared between servers and easy to inspect, but it adds load to the same database you are trying to protect.',
          'redis or memcached: shared, fast and the right default for multiple app servers.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Illuminate\Support\Facades\Cache;

Cache::store('redis')->put('settings:site', $settings, 3600);
$settings = Cache::store('redis')->get('settings:site');

// Tags group related keys so one call clears all of them.
// Tagging works with redis, memcached and array, not with file or database.
Cache::tags(['courses', 'catalog'])->put('courses:list', $courses, 600);
Cache::tags(['courses'])->flush();` },
        { type: 'note', value: 'In production run Redis with persistence and a memory limit plus an eviction policy. For a pure cache, allkeys-lru is sensible; never mix a queue Redis database with a cache that can evict jobs. Configure Redis authentication and keep it on a private network, never exposed to the internet.' },
      ],
    },
    {
      id: 'laravel-app-caches',
      title: 'Route, Config and View Caches',
      blocks: [
        { type: 'text', value: 'Laravel can compile parts of the framework ahead of time. On every request it normally reads config files, registers routes and compiles Blade templates. In production you cache that work once during deployment, which removes a large amount of filesystem and parsing overhead from every request.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
php artisan optimize

# Clear everything when debugging or after changing cached files
php artisan optimize:clear` },
        { type: 'list', items: [
          'config:cache merges all config files into one cached array. After this, env() outside config files returns null, so only call env() inside config/*.php.',
          'route:cache speeds up route registration but fails if any route uses a Closure. Move closure routes into controllers.',
          'view:cache precompiles Blade templates. Clear it after changing templates if your deploy does not rebuild it.',
          'event:cache caches event and listener discovery. optimize runs config, route, view and event caching together.',
        ] },
        { type: 'note', value: 'The classic production bug is a page that works locally but shows stale values after deploy because config:cache was not rerun. Every deploy must rebuild these caches, and every local change to .env or config should be followed by optimize:clear.' },
      ],
    },
    {
      id: 'laravel-query-performance',
      title: 'Query and Eloquent Performance',
      blocks: [
        { type: 'text', value: 'Most slow Laravel endpoints are slow because of the database. The most common cause is the N+1 query problem: you load a list, then access a relationship inside a loop, producing one extra query per row. Eloquent makes this easy to write and just as easy to fix with eager loading.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

use App\Models\Course;

// N+1: one query for courses, then one per course for the instructor
$courses = Course::all();
foreach ($courses as $course) {
    echo $course->instructor->name;
}

// Eager loading: two queries total
$courses = Course::with('instructor')->get();

// Count relations without loading them, and select only needed columns
$courses = Course::withCount('lessons')
    ->with('instructor:id,name')
    ->select('id', 'title', 'instructor_id')
    ->get();` },
        { type: 'code', lang: 'php', value: String.raw`<?php

use App\Models\Lesson;

// Large exports should stream instead of loading millions of rows at once
Lesson::query()->chunkById(500, function ($lessons) {
    foreach ($lessons as $lesson) {
        $lesson->update(['indexed_at' => now()]);
    }
});

// In AppServiceProvider::boot(), catch N+1 bugs before production
// Model::preventLazyLoading(! app()->isProduction());` },
        { type: 'list', items: [
          'Add indexes for every column used in where, order by, join and foreign keys. Check slow queries with EXPLAIN.',
          'Avoid select * on wide tables. Select the columns you use, especially for API responses.',
          'Use withCount() instead of loading a relation only to call count(). Use exists() instead of count() when you only need a boolean.',
          'Use chunkById() or lazyById() for background work; plain chunk() can skip rows when data changes during the loop.',
        ] },
        { type: 'note', value: 'Turn on preventLazyLoading in non-production environments so tests fail loudly when someone introduces an N+1. In production, log queries over 100 ms and review them weekly; a missing index on a growing table is a silent outage waiting to happen.' },
      ],
    },
    {
      id: 'laravel-octane',
      title: 'Laravel Octane',
      blocks: [
        { type: 'text', value: 'Traditional PHP boots the framework for every request. Octane keeps the application booted in long-lived workers using FrankenPHP, Swoole or RoadRunner, so routing, the container and config are reused. The result is much lower latency and higher throughput, but it changes the programming model: your application is no longer shared-nothing.' },
        { type: 'code', lang: 'text', value: String.raw`composer require laravel/octane
php artisan octane:install

php artisan octane:start --server=frankenphp --workers=4 --max-requests=500
php artisan octane:reload
php artisan octane:stop` },
        { type: 'list', items: [
          'Long-lived workers mean static properties, globals and singleton state can leak from one request to another.',
          'Do not store the current user or request data in singletons. Resolve them from the container per request.',
          'Config is loaded once. Run config:cache and restart or reload workers after changing environment values.',
          'Set max-requests so workers recycle and memory does not grow forever. Watch memory in production.',
          'Reload workers on every deploy; otherwise old code keeps serving traffic.',
        ] },
        { type: 'note', value: 'Octane is not automatically faster for database-bound apps. Profile first: if queries dominate, fix indexes and caching. When you do adopt Octane, audit every singleton, static cache and service provider for request-specific state before going live.' },
      ],
    },
    {
      id: 'laravel-profiling',
      title: 'Profiling and Monitoring',
      blocks: [
        { type: 'text', value: 'Optimisation without measurement is guessing. Profile the real request path, find the slowest query or function, fix that, then measure again. Laravel has excellent built-in visibility through Telescope and Pulse, and external profilers give you function-level detail when you need it.' },
        { type: 'list', items: [
          'Laravel Telescope: requests, queries, jobs, mail, cache and exceptions. Great locally and in staging; protect or disable it in production.',
          'Laravel Pulse: production dashboard for slow queries, slow endpoints, cache hits, queue wait and server stats.',
          'Laravel Debugbar: per-request query count and timeline during development.',
          'Blackfire, Tideways and Xdebug profilers: flame graphs that show exactly where CPU time goes.',
          'Database slow query log plus EXPLAIN for indexes and full table scans.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Illuminate\Support\Facades\DB;

// Register in a service provider: log every query slower than 100 ms
DB::listen(function ($query) {
    if ($query->time > 100) {
        logger()->warning('Slow query', [
            'sql' => $query->sql,
            'bindings' => $query->bindings,
            'ms' => $query->time,
        ]);
    }
});` },
        { type: 'note', value: 'Track p95 and p99 latency, not averages: a few very slow requests hurt users far more than the mean suggests. Alert on error rate, queue wait time and slow queries, and connect errors to a tool such as Sentry so you see the stack trace, user and release that caused them.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'caching-performance', q: 'What does Cache::remember() do on a cache hit?', options: ['Runs the closure again', 'Returns the stored value without running the closure', 'Deletes the key', 'Rebuilds the database table'], answer: 1, explain: 'remember() returns the cached value on a hit and only runs the closure on a miss.' },
    { chapterId: 'caching-performance', q: 'Which cache driver shares data across several application servers?', options: ['array', 'file', 'redis', 'apc per process'], answer: 2, explain: 'Redis and Memcached are shared services; array and file are local to one process or server.' },
    { chapterId: 'caching-performance', q: 'Why can route:cache fail?', options: ['Routes use closures', 'Routes have names', 'Routes use middleware', 'Routes return JSON'], answer: 0, explain: 'Routes defined with Closure cannot be serialised; move them into controller classes.' },
    { chapterId: 'caching-performance', q: 'How do you fix an N+1 query in Eloquent?', options: ['Call count() in the loop', 'Use eager loading with with()', 'Disable the query log', 'Use select * everywhere'], answer: 1, explain: 'with() loads the relation in one extra query instead of one query per row.' },
    { chapterId: 'caching-performance', q: 'What is the main risk of long-lived Octane workers?', options: ['They cannot use Redis', 'State can leak between requests', 'They disable Blade', 'They prevent migrations'], answer: 1, explain: 'Static and singleton state persists across requests, so request-specific data must not be stored globally.' },
    { chapterId: 'caching-performance', q: 'After running config:cache, where must env() be called?', options: ['In any controller', 'Only inside config files', 'Only in Blade', 'Only in routes'], answer: 1, explain: 'Configuration is frozen; env() outside config files returns null once config is cached.' },
    { chapterId: 'caching-performance', q: 'What is a cache stampede?', options: ['A queue retry storm', 'Many requests rebuilding the same expired key at once', 'A Redis restart', 'A failed deployment'], answer: 1, explain: 'Locks, jittered TTLs and flexible caching protect the backend from the rebuild spike.' },
  ],
};
