// PHP chapter: Architecture and Design Patterns. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'architecture',
  title: 'Architecture & Design Patterns',
  description: 'MVC, SOLID, dependency injection, middleware and patterns',
  icon: 'architecture',
  lessons: [
    {
      id: 'php-mvc',
      title: 'MVC and the Front Controller',
      blocks: [
        { type: 'text', value: 'MVC splits an app into Models (data and business rules), Views (templates) and Controllers (handle a request, call models, choose a view). Every request enters through one front controller: public/index.php.' },
        { type: 'code', lang: 'text', value: String.raw`project/
├── public/
│   └── index.php          front controller (the ONLY web-accessible PHP file)
├── src/
│   ├── Controller/        HomeController.php, ProductController.php
│   ├── Model/             Product.php (entities, value objects)
│   ├── Repository/        ProductRepository.php (SQL)
│   ├── Service/           CheckoutService.php (business logic)
│   └── Http/              Router, Request, Response, Middleware
├── templates/             home.php, products/show.php
├── config/                routes.php, services.php
├── storage/               logs, cache, uploads
├── tests/
├── vendor/                (Composer)
├── .env
└── composer.json` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// --- A template file (normally templates/products/index.php, written by hand)
file_put_contents(__DIR__ . '/products.php', <<<'PHP'
<h1><?= $e($title) ?></h1>
<ul>
<?php foreach ($products as $p): ?>
  <li><?= $e($p->name) ?> - <?= $p->price ?> Tk</li>
<?php endforeach; ?>
</ul>
PHP);

// --- View helper: render a template file with variables, return the HTML
function render(string $file, array $vars): string
{
    $e = fn($v) => htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
    extract($vars);                          // safe here: our own controller data
    ob_start();                              // capture output instead of printing it
    include $file;
    return ob_get_clean();
}

// --- Model
final class Product
{
    public function __construct(public int $id, public string $name, public int $price) {}
}

// --- Controller: thin, delegates and returns a response
final class ProductController
{
    public function __construct(private array $products) {}

    public function index(): string
    {
        return render(__DIR__ . '/products.php', ['title' => 'Products', 'products' => $this->products]);
    }
}

// --- Front controller
$controller = new ProductController([new Product(1, 'Keyboard', 1500), new Product(2, 'Mouse <Pro>', 450)]);
echo $controller->index();` },
        { type: 'note', value: 'Fat models/services, thin controllers: a controller method should read input, call one service, and return a response. Business rules in controllers cannot be reused by an API, a CLI command or a queue job.' },
      ],
    },
    {
      id: 'php-solid',
      title: 'SOLID Principles',
      blocks: [
        { type: 'list', items: [
          'S - Single Responsibility: a class has one reason to change. InvoicePdfRenderer should not also send emails.',
          'O - Open/Closed: add behaviour by adding new classes (a new PaymentGateway) instead of editing a growing switch.',
          'L - Liskov Substitution: a subclass must work anywhere its parent works, without surprises.',
          'I - Interface Segregation: many small interfaces (Readable, Writable) beat one huge one.',
          'D - Dependency Inversion: depend on interfaces, and receive dependencies from outside (dependency injection).',
        ] },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// Open/Closed with the Strategy pattern: new shipping rules = new classes, no edits
interface ShippingRule
{
    public function supports(string $zone): bool;
    public function cost(int $weightGrams): int;
}

final class InsideDhaka implements ShippingRule
{
    public function supports(string $zone): bool { return $zone === 'dhaka'; }
    public function cost(int $weightGrams): int { return 60 + intdiv($weightGrams, 1000) * 15; }
}

final class OutsideDhaka implements ShippingRule
{
    public function supports(string $zone): bool { return $zone !== 'dhaka'; }
    public function cost(int $weightGrams): int { return 120 + intdiv($weightGrams, 1000) * 20; }
}

final class ShippingCalculator
{
    /** @param ShippingRule[] $rules */
    public function __construct(private array $rules) {}

    public function cost(string $zone, int $weight): int
    {
        foreach ($this->rules as $rule) {
            if ($rule->supports($zone)) return $rule->cost($weight);
        }
        throw new DomainException("No shipping to $zone");
    }
}

$calc = new ShippingCalculator([new InsideDhaka(), new OutsideDhaka()]);
echo $calc->cost('dhaka', 2500), " Tk\n";
echo $calc->cost('rajshahi', 2500), " Tk\n";` },
      ],
    },
    {
      id: 'php-dependency-injection',
      title: 'Dependency Injection and Containers',
      blocks: [
        { type: 'text', value: 'Dependency injection means a class receives what it needs (through the constructor) instead of creating it with new or reaching for globals. A DI container builds these object graphs automatically, using Reflection to read constructor types (autowiring).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class Container
{
    private array $bindings = [];
    private array $instances = [];

    public function bind(string $abstract, callable|string $concrete): void
    {
        $this->bindings[$abstract] = $concrete;
    }

    public function get(string $id): object
    {
        if (isset($this->instances[$id])) return $this->instances[$id];   // shared (singleton)

        $concrete = $this->bindings[$id] ?? $id;
        $object = is_callable($concrete) ? $concrete($this) : $this->autowire($concrete);
        return $this->instances[$id] = $object;
    }

    private function autowire(string $class): object
    {
        $ref = new ReflectionClass($class);
        if (!$ref->isInstantiable()) throw new LogicException("Cannot build $class: bind an implementation");
        $args = [];
        foreach ($ref->getConstructor()?->getParameters() ?? [] as $param) {
            $type = $param->getType();
            $args[] = $type instanceof ReflectionNamedType && !$type->isBuiltin()
                ? $this->get($type->getName())
                : $param->getDefaultValue();
        }
        return $ref->newInstanceArgs($args);
    }
}

interface Mailer { public function send(string $to, string $msg): string; }
final class SmtpMailer implements Mailer
{
    public function __construct(private string $host = 'smtp.example.com') {}
    public function send(string $to, string $msg): string { return "SMTP($this->host) -> $to: $msg"; }
}
final class UserRepository { public function emailOf(int $id): string { return "user$id@example.com"; } }
final class WelcomeService
{
    public function __construct(private UserRepository $users, private Mailer $mailer) {}
    public function welcome(int $id): string { return $this->mailer->send($this->users->emailOf($id), 'Welcome!'); }
}

$c = new Container();
$c->bind(Mailer::class, SmtpMailer::class);          // interface -> implementation
echo $c->get(WelcomeService::class)->welcome(7), "\n";
var_dump($c->get(Mailer::class) === $c->get(Mailer::class));` },
        { type: 'note', value: 'This is how Laravel\'s service container and Symfony\'s DependencyInjection work (with caching and compilation for speed). PSR-11 standardises get() and has().' },
      ],
    },
    {
      id: 'php-middleware',
      title: 'Middleware Pipelines',
      blocks: [
        { type: 'text', value: 'Middleware wraps the request handling like layers of an onion: authentication, CSRF, logging, CORS, rate limiting. Each layer can stop the request or pass it to the next one ($next).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class Pipeline
{
    /** @param list<callable(array, callable): string> $middleware */
    public function __construct(private array $middleware) {}

    public function handle(array $request, callable $core): string
    {
        $next = array_reduce(
            array_reverse($this->middleware),
            fn(callable $next, callable $mw) => fn(array $req) => $mw($req, $next),
            $core,
        );
        return $next($request);
    }
}

$log = function (array $req, callable $next): string {
    $start = hrtime(true);
    $res = $next($req);
    return $res . sprintf(' [logged %s in %.0f µs]', $req['path'], (hrtime(true) - $start) / 1000);
};
$auth = function (array $req, callable $next): string {
    return isset($req['user']) ? $next($req) : '401 Unauthorized';
};
$maintenance = function (array $req, callable $next): string {
    return ($req['maintenance'] ?? false) ? '503 Back soon' : $next($req);
};

$app = new Pipeline([$log, $maintenance, $auth]);
$controller = fn(array $req) => "200 Hello {$req['user']}";

echo $app->handle(['path' => '/dashboard', 'user' => 'Nadia'], $controller), "\n";
echo $app->handle(['path' => '/dashboard'], $controller), "\n";
echo $app->handle(['path' => '/dashboard', 'user' => 'Rafi', 'maintenance' => true], $controller), "\n";` },
      ],
    },
    {
      id: 'php-patterns',
      title: 'Patterns You Will Meet Every Day',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// 1. Factory: one place decides which class to build
interface Notifier { public function send(string $msg): string; }
final class SmsNotifier implements Notifier { public function send(string $msg): string { return "SMS: $msg"; } }
final class EmailNotifier implements Notifier { public function send(string $msg): string { return "Email: $msg"; } }
final class NotifierFactory
{
    public static function make(string $channel): Notifier
    {
        return match ($channel) {
            'sms' => new SmsNotifier(),
            'email' => new EmailNotifier(),
        };
    }
}
echo NotifierFactory::make('sms')->send('Order shipped'), "\n";

// 2. Observer / Events: decouple "what happened" from "who reacts"
final class EventDispatcher
{
    private array $listeners = [];
    public function listen(string $event, callable $listener): void { $this->listeners[$event][] = $listener; }
    public function dispatch(string $event, array $payload): void
    {
        foreach ($this->listeners[$event] ?? [] as $l) $l($payload);
    }
}
$events = new EventDispatcher();
$events->listen('order.paid', fn($p) => print("Send receipt for #{$p['id']}\n"));
$events->listen('order.paid', fn($p) => print("Reduce stock for #{$p['id']}\n"));
$events->dispatch('order.paid', ['id' => 1042]);

// 3. Adapter: wrap a third-party API in your own interface
final class LegacySmsApi { public function sendText(array $o): bool { echo "legacy -> {$o['n']}\n"; return true; } }
final class LegacySmsAdapter implements Notifier
{
    public function __construct(private LegacySmsApi $api, private string $number) {}
    public function send(string $msg): string { $this->api->sendText(['n' => $this->number, 't' => $msg]); return 'sent'; }
}
echo (new LegacySmsAdapter(new LegacySmsApi(), '01712345678'))->send('Hi'), "\n";

// 4. Decorator: add behaviour without changing the original
final class LoggingNotifier implements Notifier
{
    public function __construct(private Notifier $inner) {}
    public function send(string $msg): string { $r = $this->inner->send($msg); echo "[log] $r\n"; return $r; }
}
(new LoggingNotifier(new EmailNotifier()))->send('Password changed');` },
        { type: 'note', value: 'Learn patterns to recognise them in frameworks, not to force them into simple code. A plain function is often the best design.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'architecture', q: 'In MVC, where should business rules live?', options: ['In views', 'In controllers', 'In models/services', 'In the router'], answer: 2, explain: 'Controllers stay thin so the same logic can serve web, API and CLI.' },
    { chapterId: 'architecture', q: 'What is a front controller?', options: ['A controller for the homepage', 'A single entry script that receives every request', 'A JavaScript framework', 'A database controller'], answer: 1, explain: 'public/index.php boots the app and routes the request.' },
    { chapterId: 'architecture', q: 'Which SOLID principle says "depend on abstractions"?', options: ['Single responsibility', 'Open/closed', 'Liskov substitution', 'Dependency inversion'], answer: 3, explain: 'High-level code depends on interfaces, not concrete classes.' },
    { chapterId: 'architecture', q: 'What does a DI container\'s autowiring use to build objects?', options: ['Global variables', 'Reflection on constructor parameter types', 'Config files only', 'Random guessing'], answer: 1, explain: 'It reads the types of constructor parameters and builds them recursively.' },
    { chapterId: 'architecture', q: 'What can a middleware do?', options: ['Only log requests', 'Inspect or change the request, stop it, or pass it to the next layer', 'Only render views', 'Only run after the response'], answer: 1, explain: 'Auth, CSRF, CORS and rate limiting are all middleware.' },
    { chapterId: 'architecture', q: 'Which pattern wraps a third-party class behind your own interface?', options: ['Factory', 'Observer', 'Adapter', 'Singleton'], answer: 2, explain: 'Adapters convert one interface into another.' },
  ],
};
