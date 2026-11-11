// Laravel chapter: Project Structure. Lessons plus this chapter's quiz questions.

export default {
  id: 'project-structure',
  title: 'Project Structure',
  description: 'Every important folder in a Laravel application',
  icon: 'folder',
  lessons: [
    {
      id: 'laravel-folders',
      title: 'Top-Level Folders',
      blocks: [
        { type: 'text', value: 'A Laravel project looks large on the first day, but the top level is small and regular. Knowing what belongs where prevents the two classic mistakes: editing vendor code and putting business logic in random folders.' },
        { type: 'list', items: [
          'app/ holds your application code: controllers, models, middleware, requests, policies, jobs and providers.',
          'bootstrap/ contains app.php, which boots the framework, and cache/, which stores generated bootstrap files.',
          'config/ holds configuration files that read values from the environment.',
          'database/ contains migrations, seeders, factories and the SQLite file when used.',
          'public/ is the only web-accessible directory; it holds index.php and compiled assets.',
          'resources/ holds Blade views, CSS, JavaScript and other uncompiled frontend sources.',
          'routes/ defines web, API, console and broadcast entry points.',
          'storage/ holds logs, caches, sessions, compiled views and uploaded files.',
          'tests/ contains feature and unit tests.',
          'vendor/ is Composer dependencies and must never be edited.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`academy/
  app/            your PHP code
  bootstrap/      startup and framework cache
  config/         configuration arrays
  database/       migrations, seeders, factories
  public/         web root: index.php, assets
  resources/      Blade views, CSS, JS
  routes/         web.php, console.php, api.php
  storage/        logs, cache, sessions, uploads
  tests/          Feature and Unit tests
  vendor/         Composer packages (do not edit)
  artisan         CLI entry point
  composer.json   PHP dependencies
  package.json    frontend dependencies
  vite.config.js  asset bundling` },
        { type: 'note', value: 'A useful rule: if you are about to edit a file under vendor/, you are solving the problem in the wrong place. Extend the class, bind your own implementation, or use a package event instead.' },
      ],
    },
    {
      id: 'laravel-app-dir',
      title: 'Inside app/',
      blocks: [
        { type: 'text', value: 'The app directory is where your product lives. Laravel 11 and 12 start with a slim skeleton, so it contains fewer folders than older versions. You create the rest as your application grows, following namespaces that match paths.' },
        { type: 'list', items: [
          'Http/Controllers: request handlers, ideally thin and delegating to services or actions.',
          'Http/Middleware: filters around requests such as authentication or tenant resolution.',
          'Http/Requests: Form Request classes that encapsulate validation and authorization.',
          'Models: Eloquent models, one per database table or domain concept.',
          'Providers: service providers that bind interfaces, register events and boot packages.',
          'Console/Commands: custom Artisan commands.',
          'Exceptions: custom exception classes when the default handling is not enough.',
          'Policies: authorization rules for models.',
          'Events, Listeners, Jobs, Mail, Notifications, Observers, Rules: added by Artisan as needed.',
          'Services, Actions, DTOs, Enums: optional folders many teams add for cleaner architecture.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
// app/Http/Controllers/InvoiceController.php
namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\View\View;

class InvoiceController extends Controller
{
    public function show(Invoice $invoice): View
    {
        return view('invoices.show', compact('invoice'));
    }
}

// The namespace matches the path: App\Http\Controllers maps to app/Http/Controllers.` },
        { type: 'note', value: 'Do not create folder names that do not match namespaces. Composer PSR-4 autoloading maps the App prefix to app/, so a class in app/Services must be namespace App\Services.' },
      ],
    },
    {
      id: 'laravel-config-dir',
      title: 'config/ and Environment Config',
      blocks: [
        { type: 'text', value: 'Every file in config returns a plain PHP array. Configuration is read once and can be cached for production speed. This is why environment values are read here and not sprinkled through application code.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// config/services.php
return [
    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'stripe' => [
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],
];` },
        { type: 'list', items: [
          'Read values with config("services.stripe.secret") using dot notation for nested keys.',
          'Cache configuration in production with php artisan config:cache, and clear it with config:clear after changes.',
          'Laravel 11 ships fewer config files; publish the ones you need with php artisan config:publish queue.',
          'Set the default timezone in config/app.php or through APP_TIMEZONE, and store times in UTC.',
          'Never put secrets directly in config files that are committed. Read them from env().',
          'In tests, override configuration with config([...]) or the Config facade instead of editing files.',
        ] },
        { type: 'note', value: 'A frequent production bug: someone adds an env() call in a controller. It works locally and returns null in production because the config is cached. Always route environment access through config/.' },
      ],
    },
    {
      id: 'laravel-routes-dir',
      title: 'routes/ Explained',
      blocks: [
        { type: 'text', value: 'Routes define the public surface of your application. Laravel 11 and 12 register them in bootstrap/app.php, and each file has a different middleware stack and purpose.' },
        { type: 'list', items: [
          'web.php: browser routes with sessions, cookies, CSRF protection and the web middleware group.',
          'api.php: stateless API routes, prefixed with api and throttled by default; created by php artisan install:api.',
          'console.php: closures and scheduling for Artisan commands, a lightweight alternative to a Console Kernel.',
          'channels.php: authorization callbacks for broadcasting private and presence channels.',
          'health: the /up route registered through withRouting, useful for load balancer checks.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => view('welcome'))->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// routes/console.php
use Illuminate\Support\Facades\Schedule;

Schedule::command('reports:daily')->dailyAt('02:00');` },
        { type: 'note', value: 'Do not put heavy logic in route closures. Closures cannot be cached by route:cache in older projects and are harder to test. Move real work to controllers or invokable classes.' },
      ],
    },
    {
      id: 'laravel-resources-dir',
      title: 'resources/ and public/',
      blocks: [
        { type: 'text', value: 'Resources are the source files you edit; public is what the browser downloads. Vite compiles CSS and JavaScript from resources into public/build with hashed filenames, while Blade views are compiled by Laravel into storage.' },
        { type: 'list', items: [
          'resources/views: Blade templates, often organised in layouts/, components/, partials/ and one folder per feature.',
          'resources/css/app.css: Tailwind or plain CSS entry point.',
          'resources/js/app.js: JavaScript entry point, importing bootstrap and page modules.',
          'public/index.php: the front controller every request goes through.',
          'public/build: compiled assets and the Vite manifest. Generated, do not edit.',
          'public/storage: a symlink to storage/app/public, created with php artisan storage:link.',
          'public/robots.txt, favicon and other genuinely static files.',
        ] },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ $title ?? config('app.name') }}</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
  <main>{{ $slot ?? '' }}</main>
</body>
</html>` },
        { type: 'note', value: 'Never point the web server at resources/ or storage/. Only public/ is designed to be reachable. Uploaded files should be served through the storage symlink or a controller, not by exposing the storage tree.' },
      ],
    },
    {
      id: 'laravel-storage-bootstrap',
      title: 'storage/ and bootstrap/cache',
      blocks: [
        { type: 'text', value: 'These two directories hold generated runtime data. They are not source code, but the application cannot run without write access to them. Deployment mistakes here cause some of the most common Laravel errors.' },
        { type: 'list', items: [
          'storage/app: application files, including private/ and public/ disks.',
          'storage/framework/cache: cache store files when using the file driver.',
          'storage/framework/sessions: session files when using the file driver.',
          'storage/framework/views: compiled Blade templates.',
          'storage/logs: laravel.log and daily log files.',
          'bootstrap/cache: packages.php, services.php, config.php and route cache files.',
          'Both trees are typically gitignored except for .gitignore placeholders that preserve the folders.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`# Fix permissions on a Linux server
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R ug+rwX storage bootstrap/cache

# Clear generated files during development
php artisan optimize:clear

# Build production caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create the public storage link
php artisan storage:link` },
        { type: 'note', value: 'If a change to a Blade view or config file does not appear, a cached copy is usually the reason. Run optimize:clear locally. In production, rebuild the caches as part of deployment rather than clearing them by hand.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'project-structure', q: 'Which directory must be the web server document root?', options: ['app', 'resources', 'public', 'bootstrap'], answer: 2, explain: 'public/index.php is the single entry point; all other directories should stay outside the web root.' },
    { chapterId: 'project-structure', q: 'Where do Form Request classes belong?', options: ['app/Http/Requests', 'app/Models', 'resources/views', 'routes'], answer: 0, explain: 'Form Requests are HTTP-layer classes and live under app/Http/Requests with the matching namespace.' },
    { chapterId: 'project-structure', q: 'What does php artisan config:cache do?', options: ['Deletes configuration', 'Combines config files into one cached file', 'Encrypts env values', 'Publishes all config files'], answer: 1, explain: 'It caches merged configuration for speed; after that env() is not available outside config files.' },
    { chapterId: 'project-structure', q: 'Which routes file receives stateless API routes by default?', options: ['routes/web.php', 'routes/api.php', 'routes/console.php', 'routes/channels.php'], answer: 1, explain: 'api.php is registered with the api middleware group and an api prefix, without sessions or CSRF.' },
    { chapterId: 'project-structure', q: 'Where are compiled Blade templates stored?', options: ['public/build', 'resources/views', 'storage/framework/views', 'bootstrap/cache'], answer: 2, explain: 'Blade compiles views into storage/framework/views; bootstrap/cache holds package and config caches.' },
    { chapterId: 'project-structure', q: 'What creates public/storage?', options: ['npm run build', 'php artisan storage:link', 'composer install', 'php artisan migrate'], answer: 1, explain: 'storage:link creates a symlink from public/storage to storage/app/public for publicly served files.' },
  ],
};
