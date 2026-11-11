// Laravel chapter: Getting Started. Lessons plus this chapter's quiz questions.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Laravel is, why teams use it, and your first app',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'laravel-intro',
      title: 'What is Laravel?',
      blocks: [
        { type: 'text', value: 'Laravel is a free, open-source PHP web framework created by Taylor Otwell in 2011. It gives you one coherent toolkit for the things almost every web application needs: routing, database access, authentication, validation, sessions, queues, mail, caching, file storage, testing and a command-line tool called Artisan.' },
        { type: 'list', items: [
          'MVC by convention: controllers receive requests, models talk to the database, Blade views render HTML.',
          'Batteries included but replaceable: every component can be swapped for your own or for a Symfony component.',
          'Expressive syntax: the framework favours clear, readable code over configuration files.',
          'A huge ecosystem: first-party packages for APIs, admin panels, real-time events, deployment and monitoring.',
          'Modern baseline: Laravel 11 and 12 target PHP 8.2+ and ship a slim application skeleton with sensible defaults.',
        ] },
        { type: 'heading', value: 'The smallest possible application' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello/{name}', function (string $name) {
    return "Hello, {$name}!";
});` },
        { type: 'note', value: 'That second route already handles URL input safely: Laravel passes the segment as an argument and the framework handles the HTTP details for you. A framework is mostly a set of decisions that are already made well.' },
      ],
    },
    {
      id: 'laravel-why',
      title: 'Why Teams Choose Laravel',
      blocks: [
        { type: 'text', value: 'Teams choose Laravel because it optimises for delivering features. The hard, boring parts of a web app are already solved and tested, so developers spend their time on the product instead of rebuilding authentication, CSRF protection or a query builder.' },
        { type: 'list', items: [
          'Speed of delivery: CRUD screens, forms, auth and APIs are a few Artisan commands away.',
          'One language across the stack: PHP on the server, Blade or Inertia/Vue/React on the front, all deployable as one app.',
          'A real talent pool: Laravel is the most popular PHP framework, so hiring and onboarding are easier.',
          'Conventions reduce arguments: a new developer can open almost any Laravel project and know where things live.',
          'Upgrade path: Laravel publishes upgrades and automated tools (Laravel Shift, Rector) so projects can stay current.',
          'Hosting is cheap and simple: any PHP host works, and Forge, Vapor, Cloud and Sail cover bigger needs.',
        ] },
        { type: 'heading', value: 'When Laravel may not be the best fit' },
        { type: 'list', items: [
          'Tiny static sites: a framework adds unnecessary weight; plain HTML or a static generator is enough.',
          'Teams already deeply invested in Symfony or another framework: switching only for hype is expensive.',
          'Extreme microsecond latency: a full framework boot costs milliseconds; only some edge or embedded cases need something leaner.',
          'Non-web PHP: long-running CLI tools or daemons may be simpler without a full HTTP framework.',
        ] },
        { type: 'note', value: 'The mature answer in an interview is not "Laravel is always best" but "Laravel is excellent when you need a conventional, full-featured web app and the team knows PHP".' },
      ],
    },
    {
      id: 'laravel-install',
      title: 'Installing Laravel',
      blocks: [
        { type: 'text', value: 'You need PHP 8.2 or newer, Composer, and a database (SQLite is fine to start). Laravel 11 and 12 can create a project with the Composer create-project command or with the global Laravel installer.' },
        { type: 'code', lang: 'text', value: String.raw`# Check your tools
php -v
composer -V

# Option 1: Composer, works everywhere
composer create-project laravel/laravel blog

# Option 2: the global Laravel installer
composer global require laravel/installer
laravel new blog

# Then start it
cd blog
php artisan serve` },
        { type: 'list', items: [
          'The installer can set up a database, starter kit and testing framework interactively.',
          'On macOS, Laravel Herd gives you PHP, Composer and a local web server in one install.',
          'On Windows, Herd or Laragon are the smoothest path; a plain XAMPP also works.',
          'Docker users can skip local PHP entirely and run the project with Laravel Sail.',
        ] },
        { type: 'note', value: 'Do not install Laravel by downloading a ZIP from a random site. Composer resolves dependencies and records exact versions in composer.lock, which is what your team and server need.' },
      ],
    },
    {
      id: 'laravel-first-app',
      title: 'Your First App in 10 Minutes',
      blocks: [
        { type: 'text', value: 'After creating a project, open routes/web.php. Every web request starts there. Add a route that returns a view, then create the view in resources/views. That is the shortest useful Laravel app.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home', [
        'title' => 'My First Laravel App',
        'courses' => ['Laravel', 'PHP', 'Blade'],
    ]);
});` },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/home.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{ $title }}</title>
</head>
<body>
  <h1>{{ $title }}</h1>
  <ul>
    @foreach ($courses as $course)
      <li>{{ $course }}</li>
    @endforeach
  </ul>
</body>
</html>` },
        { type: 'list', items: [
          '1. Run php artisan serve and open http://127.0.0.1:8000.',
          '2. Edit the route or the Blade file and refresh the browser; no build step is required for this page.',
          '3. Run php artisan route:list to see every route Laravel knows about.',
          '4. Change the app name in .env (APP_NAME) to see how configuration is read.',
        ] },
        { type: 'note', value: 'Notice that {{ $title }} escaped the value automatically. Blade protects you from XSS by default; this is one of the reasons not to print raw PHP in views.' },
      ],
    },
    {
      id: 'laravel-mvc',
      title: 'MVC and the Request Lifecycle',
      blocks: [
        { type: 'text', value: 'Laravel follows the Model-View-Controller pattern. A model represents data and rules, a view renders output, and a controller coordinates the two for one request. Understanding the lifecycle turns framework magic into a predictable pipeline.' },
        { type: 'list', items: [
          '1. The web server sends every request to public/index.php, the single front controller.',
          '2. Composer autoloads classes and bootstrap/app.php builds the application.',
          '3. Service providers register bindings and boot framework features.',
          '4. Global middleware runs, then the router matches a route and its route middleware.',
          '5. The controller (or closure) runs, usually reading models and returning a response.',
          '6. The response travels back out through middleware and is sent to the browser.',
          '7. Terminable middleware and queued work may run after the response is sent.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
// bootstrap/app.php (Laravel 11 and 12 style)
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'subscribed' => \App\Http\Middleware\EnsureUserIsSubscribed::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();` },
        { type: 'note', value: 'Laravel 11 removed app/Http/Kernel.php and app/Exceptions/Handler.php. Middleware and exception configuration now live in bootstrap/app.php, so tutorials that edit the Kernel are usually for Laravel 10 or older.' },
      ],
    },
    {
      id: 'laravel-ecosystem',
      title: 'The Laravel Ecosystem',
      blocks: [
        { type: 'text', value: 'Laravel is more than the framework. A set of first-party packages covers the features most production apps eventually need, all designed to work together and documented on laravel.com.' },
        { type: 'list', items: [
          'Eloquent: the ORM, with migrations, factories, seeders and relationships.',
          'Blade: the template engine, plus anonymous and class-based components.',
          'Artisan: the command-line tool for code generation, migrations, queues and scheduling.',
          'Sanctum and Passport: API tokens and OAuth2 for mobile apps and third parties.',
          'Breeze, Jetstream and Fortify: authentication scaffolding and backend auth logic.',
          'Livewire and Inertia: dynamic frontends without writing a separate SPA API.',
          'Horizon and Telescope: queue monitoring and deep debugging for local development.',
          'Pulse: application performance and usage monitoring in production.',
          'Sail, Forge, Vapor and Cloud: local Docker and managed deployment options.',
          'Pint, Pest and Dusk: code style, testing and browser automation.',
        ] },
        { type: 'heading', value: 'Where to go next' },
        { type: 'text', value: 'Learn the core framework first: routing, controllers, Blade, Eloquent, validation and testing. Then pick ecosystem packages based on a real need. Installing every package on day one creates complexity you cannot yet debug.' },
        { type: 'note', value: 'The official documentation is unusually good and versioned. When you search for an answer, check the version selector: Laravel 11 and 12 differ from older releases in important structural details.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'What is Laravel?', options: ['A JavaScript frontend library', 'A PHP web framework', 'A database engine', 'A CSS framework'], answer: 1, explain: 'Laravel is a PHP framework that bundles routing, ORM, views, auth, validation, queues and more.' },
    { chapterId: 'getting-started', q: 'Which PHP version do Laravel 11 and 12 require at minimum?', options: ['PHP 7.4', 'PHP 8.0', 'PHP 8.2', 'PHP 8.4'], answer: 2, explain: 'Laravel 11 and 12 require PHP 8.2 or newer and use modern language features.' },
    { chapterId: 'getting-started', q: 'Which file receives every web request in a Laravel app?', options: ['routes/web.php', 'public/index.php', 'bootstrap/app.php', 'artisan'], answer: 1, explain: 'public/index.php is the front controller; it boots the application and dispatches the request.' },
    { chapterId: 'getting-started', q: 'What does the MVC pattern separate?', options: ['HTML, CSS and JavaScript', 'Models, views and controllers', 'Routes, queues and caches', 'Users, roles and permissions'], answer: 1, explain: 'Model holds data and rules, view renders output, controller coordinates the request.' },
    { chapterId: 'getting-started', q: 'Where is routing configured when using Laravel 11 or 12?', options: ['AppServiceProvider only', 'bootstrap/app.php using withRouting', 'public/index.php directly', 'composer.json'], answer: 1, explain: 'The slim skeleton registers route files in bootstrap/app.php through withRouting.' },
    { chapterId: 'getting-started', q: 'Why does Blade escape output by default?', options: ['To make pages smaller', 'To prevent cross-site scripting', 'To speed up the database', 'To hide code from the browser'], answer: 1, explain: 'Escaping user input in HTML prevents injected scripts from running in other users browsers.' },
    { chapterId: 'getting-started', q: 'Which Artisan command lists all registered routes?', options: ['php artisan route:list', 'php artisan routes', 'php artisan show:routes', 'php artisan make:route'], answer: 0, explain: 'route:list prints method, URI, name, action and middleware for every route.' },
  ],
};
