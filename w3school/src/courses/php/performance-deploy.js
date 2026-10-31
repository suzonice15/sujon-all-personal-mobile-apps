// PHP chapter: Performance and Deployment. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'performance-deploy',
  title: 'Performance & Deployment',
  description: 'OPcache, caching, queues, Nginx + PHP-FPM, Docker and CI/CD',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'php-measure-first',
      title: 'Measure Before You Optimise',
      blocks: [
        { type: 'text', value: 'Most slow PHP pages are slow because of the database (missing indexes, N+1 queries) or external HTTP calls, not because of PHP code. Measure, find the bottleneck, then fix that one thing.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
function benchmark(string $label, callable $fn, int $times = 200000): void
{
    $start = hrtime(true);
    for ($i = 0; $i < $times; $i++) $fn($i);
    printf("%-28s %6.1f ms\n", $label, (hrtime(true) - $start) / 1e6);
}

$data = range(1, 1000);
$lookup = array_flip($data);

benchmark('in_array (scans the list)', fn($i) => in_array($i % 1000, $data, true), 20000);
benchmark('isset on keys (hash lookup)', fn($i) => isset($lookup[$i % 1000]), 20000);
benchmark('string concat with .', fn($i) => 'id-' . $i);
benchmark('sprintf', fn($i) => sprintf('id-%d', $i));

// On a server, also watch memory: memory_get_peak_usage() returns bytes
// (Try it's sandbox does not track memory, so it would show 0 here).` },
        { type: 'list', items: [
          'Profilers: Xdebug profiler, Blackfire, Tideways show exactly which functions and queries take the time.',
          'Turn arrays you search often into key => true maps: isset() is O(1), in_array() is O(n).',
          'Log slow queries in MySQL (slow_query_log) and check them with EXPLAIN.',
        ] },
      ],
    },
    {
      id: 'php-opcache-jit',
      title: 'OPcache, JIT and Preloading',
      blocks: [
        { type: 'text', value: 'Without OPcache, PHP parses and compiles every file on every request. OPcache keeps the compiled bytecode in shared memory, often making apps 2-3x faster. It must be enabled in production.' },
        { type: 'code', lang: 'text', value: String.raw`; php.ini (production)
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0      ; do not check files for changes (restart PHP-FPM on deploy)
opcache.jit_buffer_size=100M       ; JIT: helps CPU-heavy code (math, image processing), little for typical web apps
opcache.preload=/var/www/app/preload.php

realpath_cache_size=4096K
memory_limit=256M
expose_php=Off
display_errors=Off
log_errors=On` },
      ],
    },
    {
      id: 'php-caching',
      title: 'Caching Strategies',
      blocks: [
        { type: 'text', value: 'The fastest query is the one you do not run. Cache results that are expensive and change rarely (settings, category menus, statistics) in APCu (one server) or Redis (shared by all servers).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// A tiny cache with TTL and the "remember" helper used by frameworks
final class ArrayCache
{
    private array $store = [];
    public function __construct(private Closure $clock) {}

    public function remember(string $key, int $ttl, callable $compute): mixed
    {
        $now = ($this->clock)();
        if (isset($this->store[$key]) && $this->store[$key]['expires'] > $now) {
            return $this->store[$key]['value'];             // HIT
        }
        $value = $compute();                                 // MISS: do the slow work
        $this->store[$key] = ['value' => $value, 'expires' => $now + $ttl];
        return $value;
    }

    public function forget(string $key): void { unset($this->store[$key]); }
}

$time = 0;
$cache = new ArrayCache(function () use (&$time) { return $time; });
$queries = 0;
$loadMenu = function () use (&$queries) { $queries++; return ['Courses', 'Quiz', 'Interview']; };

foreach ([0, 10, 59, 61, 70] as $t) {
    $time = $t;
    $cache->remember('menu', 60, $loadMenu);
}
echo "5 page views, $queries database queries\n";

$cache->forget('menu');                 // invalidate when an admin edits the menu
$cache->remember('menu', 60, $loadMenu);
echo "After invalidation: $queries queries\n";` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// The same with Redis (phpredis extension)
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$key = 'stats:dashboard';
$stats = $redis->get($key);
if ($stats === false) {
    $stats = json_encode(computeDashboardStats($pdo));   // slow
    $redis->setex($key, 300, $stats);                    // 5 minutes
}
$stats = json_decode($stats, true);` },
        { type: 'note', value: '"There are only two hard things in computer science: cache invalidation and naming things." Prefer short TTLs plus explicit forget() when data changes.' },
      ],
    },
    {
      id: 'php-queues',
      title: 'Queues and Background Jobs',
      blocks: [
        { type: 'text', value: 'Do not make users wait for slow work: sending emails, generating PDFs, resizing images, calling webhooks. Push a job to a queue and let a background worker (a long-running PHP CLI process) handle it.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

interface Job { public function handle(): void; }

final class SendWelcomeEmail implements Job
{
    public function __construct(public int $userId) {}
    public function handle(): void { echo "  email sent to user {$this->userId}\n"; }
}

final class GenerateInvoicePdf implements Job
{
    public function __construct(public int $orderId, public int $attempts = 0) {}
    public function handle(): void
    {
        if ($this->attempts++ < 1) throw new RuntimeException('PDF service timeout');
        echo "  invoice for order {$this->orderId} generated\n";
    }
}

// The web request just enqueues (instant response for the user)
$queue = new SplQueue();
$queue->enqueue(serialize(new SendWelcomeEmail(7)));     // Redis/DB in real life
$queue->enqueue(serialize(new GenerateInvoicePdf(1042)));
echo "Request finished, ", count($queue), " jobs queued\n";

// The worker: php artisan queue:work / a supervisor-managed loop
while (!$queue->isEmpty()) {
    $job = unserialize($queue->dequeue());               // only for data YOU serialized
    try {
        echo "Running ", $job::class, "\n";
        $job->handle();
    } catch (Throwable $e) {
        echo "  failed: {$e->getMessage()}, retrying later\n";
        $queue->enqueue(serialize($job));                // retry with backoff in real systems
    }
}` },
        { type: 'note', value: 'Run workers under Supervisor or systemd so they restart if they crash, and restart them on every deploy so they load the new code.' },
      ],
    },
    {
      id: 'php-deploy',
      title: 'Deploying: Nginx + PHP-FPM',
      blocks: [
        { type: 'text', value: 'The standard production stack: Nginx serves static files and passes .php requests to PHP-FPM (a pool of PHP worker processes). Only the public/ folder is the web root.' },
        { type: 'code', lang: 'text', value: String.raw`server {
    listen 443 ssl http2;
    server_name codenest.app;
    root /var/www/codenest/current/public;     # never the project root!
    index index.php;

    ssl_certificate     /etc/letsencrypt/live/codenest.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/codenest.app/privkey.pem;

    location / {
        try_files $uri $uri/ /index.php?$query_string;   # front controller
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }

    location ~ /\.(?!well-known) { deny all; }   # hide .env, .git
}` },
        { type: 'list', items: [
          'Deploy steps: pull code -> composer install --no-dev -o -> run migrations -> build assets -> clear/warm caches -> switch the "current" symlink -> reload PHP-FPM -> restart queue workers.',
          'Zero-downtime tools: Deployer (deployer.org), Envoyer, or containers behind a load balancer.',
          'HTTPS for free with Let\'s Encrypt (certbot).',
          'PHP-FPM tuning: pm = dynamic, pm.max_children based on RAM / average memory per process.',
        ] },
      ],
    },
    {
      id: 'php-docker-ci',
      title: 'Docker and CI/CD',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`# Dockerfile
FROM php:8.3-fpm-alpine
RUN docker-php-ext-install pdo_mysql opcache
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader
COPY . .

# docker-compose.yml (development)
services:
  app:   { build: ., volumes: [".:/var/www/app"], depends_on: [db, redis] }
  web:   { image: nginx:alpine, ports: ["8080:80"], volumes: [".:/var/www/app", "./nginx.conf:/etc/nginx/conf.d/default.conf"] }
  db:    { image: mysql:8.4, environment: { MYSQL_DATABASE: shop, MYSQL_ROOT_PASSWORD: secret } }
  redis: { image: redis:7-alpine }` },
        { type: 'code', lang: 'text', value: String.raw`# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with: { php-version: '8.3', coverage: none }
      - run: composer install --prefer-dist --no-progress
      - run: vendor/bin/php-cs-fixer fix --dry-run --diff
      - run: vendor/bin/phpstan analyse --no-progress
      - run: vendor/bin/phpunit` },
        { type: 'note', value: 'Modern runtimes such as FrankenPHP, RoadRunner and Swoole keep your app booted in memory between requests (worker mode) for big speed gains; Laravel Octane supports them.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'performance-deploy', q: 'What usually makes PHP pages slow?', options: ['The echo statement', 'Database queries and external HTTP calls', 'Comments in code', 'Using classes'], answer: 1, explain: 'Measure first: queries and network calls dominate.' },
    { chapterId: 'performance-deploy', q: 'What does OPcache store?', options: ['Database results', 'Compiled PHP bytecode in shared memory', 'Sessions', 'Images'], answer: 1, explain: 'It skips parsing and compiling files on every request.' },
    { chapterId: 'performance-deploy', q: 'Which is faster for checking membership in a large set?', options: ['in_array($x, $list)', 'isset($map[$x]) with values as keys', 'array_search', 'A foreach loop'], answer: 1, explain: 'isset on keys is a hash lookup (O(1)).' },
    { chapterId: 'performance-deploy', q: 'Why use a queue for sending emails?', options: ['Emails are free then', 'The user does not wait for the slow work', 'Queues encrypt emails', 'PHP cannot send emails otherwise'], answer: 1, explain: 'A background worker processes the job after the response is sent.' },
    { chapterId: 'performance-deploy', q: 'Which folder should be the Nginx web root?', options: ['The project root', 'public/', 'src/', 'vendor/'], answer: 1, explain: 'Only public/ is web-accessible; config, .env and source stay private.' },
    { chapterId: 'performance-deploy', q: 'What is PHP-FPM?', options: ['A PHP framework', 'A FastCGI process manager running pools of PHP workers', 'A database driver', 'A template engine'], answer: 1, explain: 'Nginx passes PHP requests to PHP-FPM workers.' },
  ],
};
