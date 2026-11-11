// Laravel chapter: Installation and Setup. Lessons plus this chapter's quiz questions.

export default {
  id: 'installation',
  title: 'Installation & Setup',
  description: 'Set up a professional Laravel development environment',
  icon: 'download',
  lessons: [
    {
      id: 'laravel-requirements',
      title: 'Requirements',
      blocks: [
        { type: 'text', value: 'Before installing Laravel, confirm that your machine has a supported PHP version and the extensions the framework expects. Most installers check this for you, but knowing the list helps when a shared host or a Docker image fails.' },
        { type: 'list', items: [
          'PHP 8.2 or newer for Laravel 11 and 12 (Laravel 12 also supports newer PHP releases).',
          'Required extensions: Ctype, cURL, DOM, Fileinfo, Filter, Hash, Mbstring, OpenSSL, PCRE, PDO, Session, Tokenizer and XML.',
          'A database: SQLite is bundled and perfect for learning; MySQL, PostgreSQL, SQL Server and MariaDB are supported.',
          'Composer 2, which manages PHP packages and autoloading.',
          'Node.js and npm if you want Vite assets, Tailwind or a JavaScript frontend.',
          'Git, so every change is reviewable and deployable.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`# See the PHP version and loaded extensions
php -v
php -m

# Check specific extensions on Linux
php -m | grep -E "mbstring|pdo|openssl|tokenizer|xml"

# Composer version
composer -V` },
        { type: 'note', value: 'The CLI PHP and the PHP that runs under Nginx or Apache can be different builds with different extensions. If a browser request fails while the terminal works, check the php.ini used by PHP-FPM.' },
      ],
    },
    {
      id: 'laravel-composer',
      title: 'Composer and the Laravel Installer',
      blocks: [
        { type: 'text', value: 'Composer is the PHP package manager. Laravel projects list their dependencies in composer.json and lock exact versions in composer.lock. You can create projects with Composer alone or install the global Laravel installer as a convenience.' },
        { type: 'code', lang: 'text', value: String.raw`# Install Composer globally (Unix example)
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Global Laravel installer
composer global require laravel/installer

# Make sure Composer global binaries are on PATH, then:
laravel --version
laravel new my-app` },
        { type: 'list', items: [
          'composer create-project downloads a project skeleton and runs its post-create scripts, including key:generate.',
          'composer require adds a runtime package and updates composer.json and composer.lock.',
          'composer install on a fresh clone installs exactly the locked versions; use it in CI and on servers.',
          'composer dump-autoload regenerates the class map after adding classes outside PSR-4 paths.',
          'Never commit vendor/. Every teammate and server rebuilds it from composer.lock.',
        ] },
        { type: 'note', value: 'The Laravel installer is just a friendly wrapper. If it is unavailable, composer create-project laravel/laravel my-app produces the same project and is equally valid.' },
      ],
    },
    {
      id: 'laravel-new-project',
      title: 'Creating a Project',
      blocks: [
        { type: 'text', value: 'Create the project once, at the start, with the options you actually need. The installer can add a starter kit, choose a testing framework and configure the database, which saves manual wiring later.' },
        { type: 'code', lang: 'text', value: String.raw`# Composer approach
composer create-project laravel/laravel academy

# Laravel installer with interactive choices
laravel new academy

# Create with SQLite and Pest non-interactively (installer options vary by version)
laravel new academy --database=sqlite --pest

# Move into the project and inspect it
cd academy
php artisan about
php artisan route:list` },
        { type: 'list', items: [
          'Use a lowercase, hyphenated folder name such as inventory-api, matching the Git repository name.',
          'Decide the database before writing migrations: SQLite for local development is fine, but production should match the real engine.',
          'Starter kits add authentication, layouts and frontend tooling. Skip them while learning so you see each piece.',
          'Run php artisan about to confirm the environment, cache drivers, database connection and versions.',
        ] },
        { type: 'note', value: 'A common mistake is creating the project inside a web server document root and editing files there. Keep the code anywhere on disk and let php artisan serve or a virtual host point at the public directory.' },
      ],
    },
    {
      id: 'laravel-env',
      title: 'The .env File and App Key',
      blocks: [
        { type: 'text', value: 'Laravel reads environment-specific settings from .env at the project root. That file is never committed; .env.example documents the keys and is committed instead. Configuration files read these values and expose them through the config helper.' },
        { type: 'code', lang: 'text', value: String.raw`APP_NAME=Academy
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_TIMEZONE=UTC
APP_LOCALE=en

DB_CONNECTION=sqlite

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database

MAIL_MAILER=log
LOG_CHANNEL=stack
LOG_LEVEL=debug` },
        { type: 'list', items: [
          'Copy .env.example to .env on every new checkout, then run php artisan key:generate.',
          'APP_KEY encrypts cookies, sessions and encrypted values. Changing it invalidates existing encrypted data.',
          'APP_DEBUG=true shows detailed errors locally; it must be false in production.',
          'Never commit .env or paste real secrets into a chat, issue or screenshot.',
          'Only read env() inside config files. In application code use config("app.name"), because config caching stops env() from working.',
        ] },
        { type: 'note', value: 'If a page shows "No application encryption key has been specified", run php artisan key:generate. If configuration changes do not appear, clear the cache with php artisan config:clear.' },
      ],
    },
    {
      id: 'laravel-dev-server',
      title: 'Serving the App',
      blocks: [
        { type: 'text', value: 'Laravel ships an Artisan development server. It is ideal locally and must not be used in production. For a realistic setup use Herd, Valet, Laragon, Docker through Sail, or Nginx with PHP-FPM.' },
        { type: 'code', lang: 'text', value: String.raw`# Development server, default 127.0.0.1:8000
php artisan serve

# Custom host and port
php artisan serve --host=0.0.0.0 --port=8080

# Watch frontend assets in another terminal
npm install
npm run dev

# Production build
npm run build

# Local Docker alternative
php artisan sail:install
./vendor/bin/sail up -d` },
        { type: 'list', items: [
          'The server reloads PHP files automatically, but .env changes may need a restart and a config:clear.',
          'Correct document root is the public directory, not the project root: public/index.php is the only entry point.',
          'php artisan serve is single-threaded in older versions; slow requests can block others. Use Sail, Herd or Valet for parallel work.',
          'Add APP_URL and any asset URLs to match the host and port you actually open.',
        ] },
        { type: 'note', value: 'If routes return 404 behind Nginx, the usual cause is a missing try_files rule that sends unknown paths to index.php. Point the virtual host document root at public/.' },
      ],
    },
    {
      id: 'laravel-editor',
      title: 'Editor and Debug Setup',
      blocks: [
        { type: 'text', value: 'A good editor setup turns Laravel conventions into autocompletion and early errors. Debugging tools then show what the framework is actually doing instead of guessing from blank pages.' },
        { type: 'list', items: [
          'VS Code: install PHP Intelephense, Laravel Blade Snippets, Laravel Extra Intellisense, DotENV and EditorConfig.',
          'PhpStorm: enable the Laravel plugin and the Laravel Idea plugin for route, view and config completion.',
          'Install Laravel Pint so code style is automatic: ./vendor/bin/pint.',
          'Add barryvdh/laravel-debugbar in development to inspect queries, views, routes and session data.',
          'Use Laravel Telescope locally for requests, jobs, mail, exceptions and cache activity.',
          'Enable Xdebug with step debugging and set a breakpoint when a stack trace is not enough.',
          'Read logs in storage/logs/laravel.log and tail them while testing.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`# Development-only debugging packages
composer require --dev barryvdh/laravel-debugbar
composer require --dev laravel/telescope
php artisan telescope:install
php artisan migrate

# Format the codebase
./vendor/bin/pint

# Show environment details
php artisan about

# Follow the log while reproducing a bug
tail -f storage/logs/laravel.log` },
        { type: 'note', value: 'Guard debug packages with APP_DEBUG or the local environment. Debugbar and Telescope can leak SQL, secrets and request data if exposed in production.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'installation', q: 'Which minimum PHP version do Laravel 11 and 12 require?', options: ['7.4', '8.0', '8.1', '8.2'], answer: 3, explain: 'Both releases require PHP 8.2 or newer.' },
    { chapterId: 'installation', q: 'What is the role of composer.lock?', options: ['It stores environment secrets', 'It pins exact package versions for reproducible installs', 'It lists routes', 'It caches compiled views'], answer: 1, explain: 'composer install uses the lock file so every machine gets identical dependency versions.' },
    { chapterId: 'installation', q: 'Which command generates the application encryption key?', options: ['php artisan key:generate', 'php artisan app:key', 'composer key:generate', 'php artisan env:key'], answer: 0, explain: 'key:generate writes a random APP_KEY into .env, used for encryption and session security.' },
    { chapterId: 'installation', q: 'Where should env() be called?', options: ['Anywhere in the app', 'Only inside config files', 'Only in Blade views', 'Only in migrations'], answer: 1, explain: 'Configuration caching stops env() from loading, so application code should use config().' },
    { chapterId: 'installation', q: 'Which directory should be the web server document root?', options: ['The project root', 'resources/views', 'public', 'storage'], answer: 2, explain: 'Only public/index.php should be reachable; other folders contain code, secrets and logs.' },
    { chapterId: 'installation', q: 'What must be true of APP_DEBUG in production?', options: ['It must be true', 'It must be false', 'It does not matter', 'It must be set to local'], answer: 1, explain: 'Debug pages expose stack traces, SQL, paths and environment details; keep it false in production.' },
  ],
};
