// Laravel chapter: Deployment. Lessons plus this chapter quiz questions.

export default {
  id: 'deployment',
  title: 'Deployment',
  description: 'Ship Laravel safely with CI/CD and zero downtime',
  icon: 'publish',
  lessons: [
    {
      id: 'laravel-production-env',
      title: 'Production Environment',
      blocks: [
        { type: 'text', value: 'Production is a different world from local development: real users, real money and no debug screens. Your .env file controls the most important safety switches. The single most dangerous setting is APP_DEBUG=true, because it exposes stack traces, environment values and sometimes database credentials to visitors when an error occurs.' },
        { type: 'code', lang: 'text', value: String.raw`APP_NAME=CodeNest
APP_ENV=production
APP_KEY=base64:generated-by-artisan-key-generate
APP_DEBUG=false
APP_URL=https://codenest.app

LOG_CHANNEL=stack
LOG_LEVEL=warning

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=codenest
DB_USERNAME=codenest
DB_PASSWORD=change-me

CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
FILESYSTEM_DISK=s3` },
        { type: 'list', items: [
          'Never commit .env. Keep it outside version control and provide a .env.example with empty secrets for new developers.',
          'Generate APP_KEY once with php artisan key:generate. Changing it later breaks encrypted data and sessions.',
          'Set APP_DEBUG=false and LOG_LEVEL=warning or error. Use a real log channel and ship logs to a central service.',
          'Use managed databases and object storage for uploads so app servers stay stateless and replaceable.',
          'Rotate credentials by changing the secret and reloading config and workers, not by editing code.',
        ] },
        { type: 'note', value: 'Many teams keep secrets in a manager such as AWS Secrets Manager, Vault or the platform environment store instead of a file. Laravel reads them the same way through config. The rule is unchanged: secrets never enter git, and only config files read env().' },
      ],
    },
    {
      id: 'laravel-optimize',
      title: 'Deployment Optimization Commands',
      blocks: [
        { type: 'text', value: 'A Laravel deploy is a short, repeatable sequence of commands. Run them in the same order every time so builds are predictable. Dependencies and assets are built first, the database is migrated, caches are rebuilt, and only then is traffic sent to the new code.' },
        { type: 'code', lang: 'text', value: String.raw`composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
php artisan migrate --force
php artisan storage:link
php artisan optimize
php artisan queue:restart` },
        { type: 'list', items: [
          'composer install --no-dev skips testing and development packages and keeps the production vendor folder small.',
          '--optimize-autoloader builds a class map so PHP does not search the filesystem for every class.',
          'migrate --force skips the interactive confirmation that production normally requires.',
          'optimize caches config, routes, views and events. optimize:clear reverses all of it.',
          'queue:restart signals workers to finish their current job and restart with the new code.',
        ] },
        { type: 'note', value: 'Do not run composer update on the server. The lock file defines exactly what was tested; composer install respects it. Build frontend assets in CI or on the server with npm ci and npm run build, and commit the lock files for both PHP and JavaScript.' },
      ],
    },
    {
      id: 'laravel-servers',
      title: 'Servers, Forge and Ploi',
      blocks: [
        { type: 'text', value: 'You can run Laravel on a traditional virtual private server, a container platform or a managed service. Tools such as Laravel Forge, Ploi and Laravel Cloud automate provisioning, TLS certificates, deployments, queue workers and scheduled tasks. Under the hood a classic server still runs Nginx, PHP-FPM, a database, Redis and Supervisor.' },
        { type: 'list', items: [
          'Nginx serves static files and forwards PHP requests to PHP-FPM. The web root must be public/, never the project root.',
          'PHP-FPM runs a pool of workers. Size pm.max_children from available RAM divided by average memory per worker.',
          'Supervisor or systemd keeps queue workers alive and restarts them after crashes.',
          'The scheduler needs one cron entry: php artisan schedule:run every minute, or schedule:work under a process manager.',
          'Open only 80, 443 and your SSH port. Keep the database and Redis on a private network.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`server {
    listen 443 ssl http2;
    server_name codenest.app;
    root /var/www/codenest/current/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }

    location ~ /\.(?!well-known) { deny all; }
}` },
        { type: 'note', value: 'Managed platforms remove server maintenance but not application mistakes. You still own indexes, queue failures, backups and monitoring. Pick the option your team can operate at 3 a.m., not only the one that is cheapest on day one.' },
      ],
    },
    {
      id: 'laravel-docker',
      title: 'Docker and Laravel Sail',
      blocks: [
        { type: 'text', value: 'Laravel Sail is a light Docker setup for local development. It gives every developer the same PHP version, database, Redis and mail service without installing them globally. For production, build a dedicated image instead of using the development compose file, because it mounts source code and runs with development defaults.' },
        { type: 'code', lang: 'text', value: String.raw`# Start the local environment
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm run dev
./vendor/bin/sail test` },
        { type: 'code', lang: 'text', value: String.raw`# Production Dockerfile, simplified
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader
COPY . .
RUN composer dump-autoload --optimize

FROM php:8.3-fpm-alpine
RUN docker-php-ext-install pdo_mysql opcache
WORKDIR /var/www/html
COPY --from=vendor /app /var/www/html
RUN chown -R www-data:www-data storage bootstrap/cache
USER www-data` },
        { type: 'list', items: [
          'Use multi-stage builds so Composer and Node do not ship in the runtime image.',
          'Run as a non-root user and keep writable directories limited to storage and bootstrap/cache.',
          'Do not bake .env or secrets into the image. Inject them at runtime.',
          'Run migrations as a separate release step, not from every container start, or several replicas will race.',
        ] },
        { type: 'note', value: 'Sail is for development only. A production container should be immutable, built once per commit, scanned for vulnerabilities and deployed by tag or digest. If two environments behave differently, compare the image and the environment values before blaming the framework.' },
      ],
    },
    {
      id: 'laravel-ci-cd',
      title: 'CI/CD Pipelines',
      blocks: [
        { type: 'text', value: 'Continuous integration proves every change builds and passes tests before it reaches main. Continuous delivery adds an automated, repeatable release. A Laravel pipeline typically installs PHP and Node, caches dependencies, runs the test suite and static analysis, builds assets, then deploys only if every gate is green.' },
        { type: 'code', lang: 'text', value: String.raw`name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.4
        env:
          MYSQL_DATABASE: testing
          MYSQL_ROOT_PASSWORD: secret
        ports: ['3306:3306']
        options: --health-cmd="mysqladmin ping" --health-interval=10s
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: pdo_mysql, redis
          coverage: none
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: composer install --prefer-dist --no-progress --no-interaction
      - run: cp .env.example .env && php artisan key:generate
      - run: npm ci && npm run build
      - run: vendor/bin/pint --test
      - run: vendor/bin/phpstan analyse --no-progress
      - run: php artisan test` },
        { type: 'list', items: [
          'Run the same PHP and Node versions in CI and production. Version drift causes bugs that only appear after deploy.',
          'Cache Composer and npm downloads to keep pipelines fast, but never cache secrets.',
          'Make formatting and static analysis blocking checks, not suggestions.',
          'Deploy from CI with short-lived credentials and environment protection rules, not from a laptop.',
          'Tag or record the deployed commit so you can roll back to an exact known-good version.',
        ] },
        { type: 'note', value: 'A pipeline that is slow gets bypassed, and a pipeline that is flaky gets ignored. Keep the fast checks first, run slower integration and browser tests after them, and fix flaky tests immediately instead of retrying until green.' },
      ],
    },
    {
      id: 'laravel-zero-downtime',
      title: 'Zero-Downtime Releases and Monitoring',
      blocks: [
        { type: 'text', value: 'Zero-downtime deployment means users never hit an error or an empty page during a release. The classic pattern is releases with a symlink: each build goes into a timestamped folder, shared storage and .env stay outside it, and a single atomic symlink switch points current to the new release. Tools such as Envoyer, Deployer and Laravel Cloud implement this for you.' },
        { type: 'list', items: [
          '1. Clone or upload the new release into releases/<timestamp>.',
          '2. Link shared folders: storage, .env and any uploaded files.',
          '3. Install dependencies and build assets for that release only.',
          '4. Run backward-compatible migrations before switching traffic.',
          '5. Switch the current symlink atomically, then reload PHP-FPM and restart queue workers.',
          '6. Keep the previous releases so rollback is another symlink switch.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`ln -sfn /var/www/codenest/releases/20261110_120000 /var/www/codenest/current
php artisan queue:restart

# Health check after the switch
curl -fsS https://codenest.app/up || echo "rollback now"` },
        { type: 'text', value: 'Migrations are the hardest part of zero downtime. The old code and the new code run at the same time during the switch, so every migration must be backward compatible. Add nullable columns or new tables first, deploy code that writes both shapes, backfill in a job, then remove the old column in a later release.' },
        { type: 'note', value: 'Monitor after every release: error rate, p95 latency, queue wait, failed jobs and uptime checks on /up. Have a written rollback plan and practise it. A deploy without a rollback path is not a professional deploy.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'deployment', q: 'Which setting must be false in production?', options: ['APP_ENV', 'APP_DEBUG', 'APP_URL', 'LOG_CHANNEL'], answer: 1, explain: 'APP_DEBUG=true exposes stack traces and sensitive values to visitors.' },
    { chapterId: 'deployment', q: 'Why run composer install instead of composer update on the server?', options: ['install is faster', 'install respects composer.lock', 'update removes dev packages', 'install skips autoloading'], answer: 1, explain: 'The lock file pins the exact versions that were tested.' },
    { chapterId: 'deployment', q: 'What should the Nginx web root point to?', options: ['The project root', 'The public folder', 'The storage folder', 'The vendor folder'], answer: 1, explain: 'Only public/ is web-accessible; everything else stays private.' },
    { chapterId: 'deployment', q: 'What is Laravel Sail used for?', options: ['Production orchestration', 'Local Docker development', 'Database backups', 'SSL certificates'], answer: 1, explain: 'Sail is a development environment; production should use a dedicated image.' },
    { chapterId: 'deployment', q: 'Which command makes queue workers load new code after a deploy?', options: ['queue:flush', 'queue:restart', 'queue:clear', 'queue:retry'], answer: 1, explain: 'queue:restart tells workers to finish the current job and restart.' },
    { chapterId: 'deployment', q: 'What makes zero-downtime migrations safe?', options: ['Running them at midnight', 'Backward-compatible schema changes', 'Deleting old columns first', 'Skipping migrations'], answer: 1, explain: 'Old and new code run together, so each schema change must work for both.' },
    { chapterId: 'deployment', q: 'What is the fastest way to roll back a symlink release?', options: ['Rebuild from git', 'Point current back to the previous release', 'Restore the database', 'Restart the server'], answer: 1, explain: 'Keeping previous release folders makes rollback an atomic symlink switch.' },
  ],
};
