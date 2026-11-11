// Laravel chapter: Service Container & Providers. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'service-container',
  title: 'Service Container & Providers',
  description: 'Bindings, providers, facades and clean dependency injection',
  icon: 'extension',
  lessons: [
    {
      id: 'laravel-container-basics',
      title: 'The Service Container',
      blocks: [
        { type: 'text', value: 'The service container is the dependency injection engine at the heart of Laravel. When Laravel needs a class, it reads the constructor, resolves each type-hinted dependency recursively, and builds the whole object graph for you. You rarely call new for application services.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Http\Controllers;

use App\Services\InvoiceService;

class InvoiceController extends Controller
{
    public function __construct(private InvoiceService $invoices)
    {
    }

    public function show(int $id)
    {
        return $this->invoices->find($id);
    }
}` },
        { type: 'list', items: [
          'Autowiring: a concrete class with no unbound scalar arguments can be resolved with no configuration at all.',
          'app(InvoiceService::class) and resolve(InvoiceService::class) fetch an instance from the container; they are handy in tests and in code outside a class.',
          'If a constructor needs an interface or a scalar, the container cannot guess it: you must bind it first.',
          'Laravel resolves controllers, middleware, event listeners, queue jobs, commands and route model bindings through the container.',
        ] },
        { type: 'note', value: 'Autowiring is not magic: it uses PHP Reflection on constructor parameter types. A missing class or an unbound interface throws BindingResolutionException, so read the full message when resolution fails.' },
      ],
    },
    {
      id: 'laravel-container-bindings',
      title: 'Bindings and Singletons',
      blocks: [
        { type: 'text', value: 'A binding tells the container how to build an abstract type. Use bind for a fresh object on every resolution, singleton for one shared object per process, and instance to register an object you already created.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Providers;

use App\Contracts\PaymentGateway;
use App\Services\ExchangeRates;
use App\Services\Settings;
use App\Services\StripeGateway;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // New instance each time it is resolved
        $this->app->bind(PaymentGateway::class, StripeGateway::class);

        // One shared instance per process
        $this->app->singleton(ExchangeRates::class, function ($app) {
            return new ExchangeRates($app['config']->get('services.rates.key'));
        });

        // Register an object you already built
        $this->app->instance(Settings::class, new Settings(['currency' => 'BDT']));
    }
}` },
        { type: 'list', items: [
          'bind: stateful objects such as a request-scoped client, or anything that must not be shared.',
          'singleton: stateless services, caches and clients where one instance is safe and cheaper.',
          'scoped: like singleton, but reset between requests and queue jobs; the safe choice under Laravel Octane.',
          'instance: useful in tests and when a value comes from bootstrap code rather than a factory.',
          'You can bind a closure instead of a class name when construction needs configuration.',
        ] },
        { type: 'note', value: 'A singleton is not the Singleton design pattern: the container simply caches one instance. It is still injected normally, so it stays testable. Do not put mutable per-request state in a singleton.' },
      ],
    },
    {
      id: 'laravel-interfaces',
      title: 'Interfaces, Contextual Binding and Primitives',
      blocks: [
        { type: 'text', value: 'Depend on interfaces in your own code so you can swap implementations. Bind the interface once, and the container injects the concrete class everywhere. Contextual binding handles the case where two classes need different implementations of the same interface.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Providers;

use App\Contracts\NotificationChannel;
use App\Services\EmailChannel;
use App\Services\ReportController;
use App\Services\ReportGenerator;
use App\Services\SmsChannel;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(NotificationChannel::class, SmsChannel::class);

        // ReportController gets a different channel than everyone else
        $this->app->when(ReportController::class)
            ->needs(NotificationChannel::class)
            ->give(EmailChannel::class);

        // A class-specific dependency on a concrete service
        $this->app->when(ReportGenerator::class)
            ->needs(Filesystem::class)
            ->give(fn () => Storage::disk('reports'));

        // A scalar cannot be autowired: bind it by parameter name
        $this->app->when(ReportGenerator::class)
            ->needs('$apiKey')
            ->giveConfig('services.reports.key');
    }
}` },
        { type: 'list', items: [
          'needs() accepts a class, an interface, or a parameter name written with a dollar sign.',
          'give() accepts a class name, a closure, or a value; giveConfig() reads a config key.',
          'Prefer passing configuration through a small config object or value object instead of many scalars.',
          'Contextual bindings are resolved per consumer, so they do not leak into unrelated classes.',
        ] },
        { type: 'note', value: 'Binding every class is a common mistake. Laravel can build concretes automatically; only bind what it cannot infer: interfaces, scalars, third-party clients and values that need configuration.' },
      ],
    },
    {
      id: 'laravel-service-providers',
      title: 'Service Providers',
      blocks: [
        { type: 'text', value: 'Service providers are the bootstrap classes of a Laravel app. register() runs first for every provider and should only add bindings; boot() runs after all providers are registered and is where you hook events, routes, views and other services.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Providers;

use App\Events\OrderPaid;
use App\Listeners\SendReceipt;
use App\Services\BillingClient;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class BillingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(BillingClient::class, function ($app) {
            return new BillingClient(
                $app['config']->get('services.billing.key'),
                $app['config']->get('services.billing.secret'),
            );
        });
    }

    public function boot(): void
    {
        Event::listen(OrderPaid::class, SendReceipt::class);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

// bootstrap/providers.php (Laravel 11 and later)
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\BillingServiceProvider::class,
];` },
        { type: 'list', items: [
          'Never query the database or read a request inside register(): other providers may not be ready yet.',
          'In boot() you can safely use every service because all bindings exist by then.',
          'Use php artisan make:provider BillingServiceProvider to scaffold one.',
          'For expensive bindings used on few requests, implement DeferrableProvider so the provider is skipped until needed.',
        ] },
        { type: 'note', value: 'Keep AppServiceProvider small. As an app grows, move each area into its own provider so bindings stay discoverable. Provider order matters when one provider depends on another.' },
      ],
    },
    {
      id: 'laravel-facades',
      title: 'Facades and Contracts',
      blocks: [
        { type: 'text', value: 'A facade is a static-looking proxy that resolves the real service from the container and forwards the call. Cache::get() really calls the cache repository instance. Contracts are the interfaces behind those facades, such as Illuminate\Contracts\Cache\Repository.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Services;

use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Facades\Cache;
use App\Models\Order;

class DashboardStats
{
    public function quickCount(): int
    {
        return Cache::remember('orders.count', 60, fn () => Order::count());
    }
}

class CachedStats
{
    public function __construct(private Repository $cache)
    {
    }

    public function count(): int
    {
        return $this->cache->remember('orders.count', 60, fn () => Order::count());
    }
}` },
        { type: 'list', items: [
          'Facades are concise and fine in controllers, Blade views and quick scripts.',
          'Constructor injection of a contract makes the dependency explicit and easier to fake in unit tests.',
          'Facades are also easy to test: Cache::spy() and Cache::shouldReceive() let you assert calls.',
          'Every facade exposes getFacadeAccessor(), the container key it resolves; you can build your own facades the same way.',
        ] },
        { type: 'note', value: 'A facade is not a global variable. It resolves from the container each call, so it still respects bindings and can be swapped in tests. Avoid calling facades inside domain models where a real dependency would be clearer.' },
      ],
    },
    {
      id: 'laravel-container-patterns',
      title: 'When to Use the Container',
      blocks: [
        { type: 'text', value: 'The container is a tool for wiring, not a place to hide dependencies. Use constructor injection for anything a class needs to do its job, and use app() only at the edges: tests, service providers, Blade helpers and integration code that cannot receive a constructor.' },
        { type: 'list', items: [
          'Do inject repositories, gateways, mailers and clocks so they can be replaced in tests.',
          'Do bind interfaces at the boundary of your application, not for every trivial helper class.',
          'Do not call app() deep inside business logic: it is a service locator and hides the real dependencies.',
          'Do not make everything a singleton; shared mutable state causes bugs in long-running workers.',
          'Prefer readonly constructor properties for immutable services so accidental reassignment fails loudly.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Services;

use App\Contracts\PaymentGateway;
use App\Contracts\ReceiptMailer;
use App\Models\Order;

class CheckoutService
{
    public function __construct(
        private readonly PaymentGateway $gateway,
        private readonly ReceiptMailer $mailer,
    ) {
    }

    public function pay(Order $order): void
    {
        $transaction = $this->gateway->charge($order->total, $order->currency);
        $order->markPaid($transaction);
        $this->mailer->sendReceipt($order);
    }
}` },
        { type: 'note', value: 'If a class needs more than four or five injected services, it probably has too many responsibilities. Split it instead of growing the constructor; the container will happily build either version.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'service-container', q: 'What does the service container use to build a class automatically?', options: ['A config file for every class', 'Reflection on constructor parameter types', 'Global variables', 'A database table'], answer: 1, explain: 'Autowiring reads constructor types with PHP Reflection and resolves them recursively.' },
    { chapterId: 'service-container', q: 'What is the difference between bind and singleton?', options: ['They are identical', 'bind returns a new instance each time; singleton shares one instance', 'singleton only works for interfaces', 'bind caches forever'], answer: 1, explain: 'bind resolves a fresh object on each call; singleton caches the first resolution.' },
    { chapterId: 'service-container', q: 'Where should bindings normally be registered?', options: ['In routes/web.php', 'In a service provider register method', 'In a Blade view', 'In the model'], answer: 1, explain: 'Providers are the bootstrap place for container bindings.' },
    { chapterId: 'service-container', q: 'Why should register() avoid database queries?', options: ['It is slower than boot', 'Not all providers are registered yet and services may not be ready', 'Queries are forbidden by PHP', 'It breaks Composer'], answer: 1, explain: 'register() only wires bindings; boot() runs after all providers are ready.' },
    { chapterId: 'service-container', q: 'What does contextual binding do?', options: ['Binds a class for one specific consumer', 'Shares one instance globally', 'Loads config from .env', 'Creates database seeds'], answer: 0, explain: 'when(Consumer)->needs(Abstract)->give(Concrete) tailors resolution per consumer.' },
    { chapterId: 'service-container', q: 'What is a facade?', options: ['A static proxy that resolves a service from the container', 'A database migration', 'A type of middleware', 'A Blade component'], answer: 0, explain: 'Cache::get() forwards to the cache repository resolved from the container.' },
    { chapterId: 'service-container', q: 'When is app() a poor choice?', options: ['In a test', 'Deep inside business logic where it hides dependencies', 'In a service provider', 'In an artisan command'], answer: 1, explain: 'Using the container as a service locator makes classes harder to understand and test.' },
  ],
};
