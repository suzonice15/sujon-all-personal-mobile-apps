// PHP chapter: Namespaces and Composer. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'namespaces-composer',
  title: 'Namespaces & Composer',
  description: 'Namespaces, PSR-4 autoloading, Composer and PSR standards',
  icon: 'inventory',
  lessons: [
    {
      id: 'php-namespaces',
      title: 'Namespaces',
      blocks: [
        { type: 'text', value: 'Namespaces are like folders for class names. Two libraries can both have a class called Client as long as they live in different namespaces. The namespace must be the first statement in the file (after declare).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

namespace App\Billing {
    final class Invoice
    {
        public function __construct(public int $total) {}
    }

    function format(Invoice $i): string { return "Invoice: {$i->total} Tk"; }
}

namespace App\Http {
    use App\Billing\Invoice;                 // import a class
    use App\Billing\Invoice as Bill;         // with an alias
    use function App\Billing\format;         // import a function

    $a = new Invoice(1200);
    $b = new Bill(800);
    echo format($a), "\n";
    echo $b::class, "\n";                    // fully qualified name

    // Global functions and classes: prefix with \ (or rely on fallback for functions)
    echo \strlen('php'), "\n";
    $d = new \DateTimeImmutable('2026-01-01');
    echo $d->format('Y'), "\n";
}` },
        { type: 'note', value: 'Real projects use one namespace per file (namespace App\\Billing; at the top) instead of the braces used here to fit several in one example.' },
      ],
    },
    {
      id: 'php-autoloading',
      title: 'Autoloading and PSR-4',
      blocks: [
        { type: 'text', value: 'Instead of writing require for every class, an autoloader loads a class file the first time the class is used. PSR-4 is the standard rule: namespace prefix maps to a base folder, the rest of the namespace maps to sub-folders.' },
        { type: 'code', lang: 'text', value: String.raw`Namespace prefix  App\          ->  src/
App\Models\User                  ->  src/Models/User.php
App\Http\Controllers\HomeController -> src/Http/Controllers/HomeController.php` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// What Composer's autoloader does, simplified
spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/src/';

    if (!str_starts_with($class, $prefix)) {
        return;                                   // not ours, let other autoloaders try
    }
    $relative = substr($class, strlen($prefix));
    $file = $baseDir . str_replace('\\', '/', $relative) . '.php';

    if (is_file($file)) {
        require $file;
    }
});

$user = new App\Models\User();   // loads src/Models/User.php automatically` },
      ],
    },
    {
      id: 'php-composer',
      title: 'Composer: Dependency Management',
      blocks: [
        { type: 'text', value: 'Composer installs libraries (packages) from packagist.org, resolves their versions and generates the autoloader. Every professional PHP project uses it.' },
        { type: 'code', lang: 'text', value: String.raw`$ composer init                       # create composer.json
$ composer require guzzlehttp/guzzle   # add a library
$ composer require --dev phpunit/phpunit phpstan/phpstan
$ composer install                     # install exactly what composer.lock says
$ composer update                      # upgrade within your version rules
$ composer dump-autoload -o            # rebuild an optimized autoloader
$ composer outdated                    # what can be upgraded
$ composer audit                       # known security vulnerabilities` },
        { type: 'code', lang: 'text', value: String.raw`{
    "name": "codenest/shop",
    "require": {
        "php": "^8.3",
        "guzzlehttp/guzzle": "^7.8",
        "monolog/monolog": "^3.5"
    },
    "require-dev": {
        "phpunit/phpunit": "^11.0"
    },
    "autoload": {
        "psr-4": { "App\\": "src/" }
    },
    "autoload-dev": {
        "psr-4": { "Tests\\": "tests/" }
    },
    "scripts": {
        "test": "phpunit",
        "analyse": "phpstan analyse src --level=8"
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// public/index.php: one line loads every package and your own classes
require __DIR__ . '/../vendor/autoload.php';

use GuzzleHttp\Client;

$http = new Client(['timeout' => 5]);
$response = $http->get('https://api.github.com/repos/php/php-src');
$repo = json_decode((string) $response->getBody(), true);
echo $repo['stargazers_count'];` },
        { type: 'list', items: [
          'Commit composer.json AND composer.lock; never commit the vendor/ folder.',
          'On servers run composer install --no-dev --optimize-autoloader.',
          'Version constraints: ^7.8 means >=7.8 and <8.0 (compatible updates only).',
        ] },
      ],
    },
    {
      id: 'php-semver-packages',
      title: 'Semantic Versioning and Choosing Packages',
      blocks: [
        { type: 'text', value: 'Packages follow semantic versioning MAJOR.MINOR.PATCH: PATCH fixes bugs, MINOR adds features without breaking anything, MAJOR may break your code.' },
        { type: 'list', items: [
          '^1.2.3 means >=1.2.3 and <2.0.0 (the most common choice).',
          '~1.2 means >=1.2 and <2.0, while ~1.2.3 is stricter: >=1.2.3 and <1.3.0 (patch updates only).',
          'Before adding a package, check: downloads, recent releases, open issues, licence, PHP version support.',
          'Fewer dependencies mean fewer security updates; do not install a package for a three-line function.',
          'Popular, trusted packages: guzzlehttp/guzzle (HTTP), monolog/monolog (logs), vlucas/phpdotenv (.env), nesbot/carbon (dates), symfony/console (CLI), league/flysystem (storage), ramsey/uuid.',
        ] },
      ],
    },
    {
      id: 'php-psr-standards',
      title: 'PSR Standards and Coding Style',
      blocks: [
        { type: 'text', value: 'PHP-FIG publishes PSRs (PHP Standards Recommendations) so libraries and frameworks work together. Knowing the important ones is expected of a senior developer.' },
        { type: 'list', items: [
          'PSR-1 / PSR-12 (now PER Coding Style): formatting rules. Enforce them with PHP-CS-Fixer or PHP_CodeSniffer.',
          'PSR-3: LoggerInterface.',
          'PSR-4: autoloading.',
          'PSR-6 / PSR-16: caching interfaces.',
          'PSR-7: HTTP message objects (Request, Response) that are immutable.',
          'PSR-11: ContainerInterface for dependency injection containers.',
          'PSR-14: event dispatcher.',
          'PSR-15: HTTP middleware and request handlers.',
          'PSR-17 / PSR-18: HTTP factories and HTTP client interface.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php

declare(strict_types=1);

namespace App\Service;

use App\Repository\UserRepository;
use Psr\Log\LoggerInterface;

final class UserService
{
    public function __construct(
        private readonly UserRepository $users,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function deactivate(int $id): void
    {
        $user = $this->users->find($id) ?? throw new \RuntimeException('User not found');

        if ($user->isAdmin()) {
            throw new \DomainException('Admins cannot be deactivated');
        }

        $this->users->save($user->deactivate());
        $this->logger->info('User deactivated', ['id' => $id]);
    }
}` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'namespaces-composer', q: 'What problem do namespaces solve?', options: ['Speed', 'Name collisions between classes from different code', 'Security', 'Memory usage'], answer: 1, explain: 'App\\Http\\Client and Vendor\\Client can coexist.' },
    { chapterId: 'namespaces-composer', q: 'Under PSR-4 with App\\ -> src/, where is App\\Models\\User?', options: ['src/User.php', 'src/Models/User.php', 'App/Models/User.php', 'models/user.php'], answer: 1, explain: 'The rest of the namespace becomes sub-folders.' },
    { chapterId: 'namespaces-composer', q: 'Which file must be committed so every machine installs the same versions?', options: ['vendor/', 'composer.lock', 'autoload.php', '.env'], answer: 1, explain: 'composer.lock pins exact versions; composer install reads it.' },
    { chapterId: 'namespaces-composer', q: 'What does the constraint ^7.8 allow?', options: ['Exactly 7.8', '>=7.8 and <8.0', 'Any version', '>=7.8 including 8.x'], answer: 1, explain: 'Caret allows non-breaking updates within the same major version.' },
    { chapterId: 'namespaces-composer', q: 'Which command installs packages for production?', options: ['composer update', 'composer install --no-dev --optimize-autoloader', 'composer require', 'composer dump'], answer: 1, explain: 'Install from the lock file, skip dev tools, and optimise the autoloader.' },
    { chapterId: 'namespaces-composer', q: 'Which PSR defines HTTP middleware?', options: ['PSR-3', 'PSR-4', 'PSR-7', 'PSR-15'], answer: 3, explain: 'PSR-15 defines MiddlewareInterface and RequestHandlerInterface (built on PSR-7 messages).' },
  ],
};
