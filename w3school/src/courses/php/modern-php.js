// PHP chapter: Modern PHP 8. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'modern-php',
  title: 'Modern PHP 8.x',
  description: 'Enums, readonly, nullsafe, attributes and other PHP 8 features',
  icon: 'auto-awesome',
  lessons: [
    {
      id: 'php-enums',
      title: 'Enums',
      blocks: [
        { type: 'text', value: 'An enum (PHP 8.1) is a type with a fixed set of possible values. Instead of magic strings like "pending", the compiler and your editor know every valid status.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// Backed enum: each case has a string (or int) value, ideal for databases and JSON
enum OrderStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Waiting for payment',
            self::Paid => 'Paid',
            self::Shipped => 'On the way',
            self::Cancelled => 'Cancelled',
        };
    }

    public function canTransitionTo(self $next): bool
    {
        return in_array($next, match ($this) {
            self::Pending => [self::Paid, self::Cancelled],
            self::Paid => [self::Shipped, self::Cancelled],
            self::Shipped, self::Cancelled => [],
        }, true);
    }
}

$status = OrderStatus::from('paid');         // from a database value
echo $status->name, " / ", $status->value, " / ", $status->label(), "\n";
var_dump($status->canTransitionTo(OrderStatus::Shipped));
var_dump($status->canTransitionTo(OrderStatus::Pending));
var_dump(OrderStatus::tryFrom('unknown'));   // null instead of an exception
echo implode(', ', array_column(OrderStatus::cases(), 'value')), "\n";

// Pure enum: no values, just cases
enum Suit { case Hearts; case Spades; }
var_dump(Suit::Hearts === Suit::Hearts);` },
        { type: 'note', value: 'Type-hint enums in function parameters (function ship(OrderStatus $s)) and invalid values become impossible. Enums can also implement interfaces and have constants.' },
      ],
    },
    {
      id: 'php-readonly',
      title: 'Readonly Properties and Classes',
      blocks: [
        { type: 'text', value: 'A readonly property can be written once (inside the class) and never changed again. readonly class (PHP 8.2) makes every property readonly. Together they give you immutable value objects.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final readonly class Money
{
    public function __construct(
        public int $amount,
        public string $currency,
    ) {}

    public function add(Money $other): static
    {
        if ($other->currency !== $this->currency) {
            throw new LogicException('Currency mismatch');
        }
        return new static($this->amount + $other->amount, $this->currency);  // new object
    }

    // "wither": copy with one change
    public function withAmount(int $amount): static
    {
        return new static($amount, $this->currency);
    }
}

$a = new Money(500, 'BDT');
$b = $a->add(new Money(250, 'BDT'));
echo $a->amount, " + 250 = ", $b->amount, "\n";   // $a is unchanged

try {
    $a->amount = 1;
} catch (Error $e) {
    echo get_class($e), ": ", $e->getMessage(), "\n";
}` },
      ],
    },
    {
      id: 'php-nullsafe-named',
      title: 'Nullsafe Operator and Other Small Wins',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
class Address { public function __construct(public ?string $city) {} }
class Profile { public function __construct(public ?Address $address) {} }
class User { public function __construct(public ?Profile $profile) {} }

$u1 = new User(new Profile(new Address('Sylhet')));
$u2 = new User(null);

// ?-> stops and returns null if the left side is null
echo $u1->profile?->address?->city ?? 'unknown', "\n";
echo $u2->profile?->address?->city ?? 'unknown', "\n";

// new in initializers (8.1): objects as default values
class Logger { public function log(string $m): void { echo "log: $m\n"; } }
class Service
{
    public function __construct(private Logger $logger = new Logger()) {}
    public function run(): void { $this->logger->log('running'); }
}
(new Service())->run();

// throw is an expression (8.0)
function requireEnv(array $env, string $key): string
{
    return $env[$key] ?? throw new RuntimeException("Missing $key");
}
echo requireEnv(['APP_ENV' => 'local'], 'APP_ENV'), "\n";

// Typed class constants (8.3) and dynamic class constant fetch
class Version { public const string CURRENT = '8.3'; }
$name = 'CURRENT';
echo Version::{$name}, "\n";

// array_is_list (8.1)
var_dump(array_is_list([1, 2]), array_is_list([1 => 'a']));` },
      ],
    },
    {
      id: 'php-attributes',
      title: 'Attributes',
      blocks: [
        { type: 'text', value: 'Attributes (#[...]) attach structured metadata to classes, methods, properties and parameters. Frameworks read them with Reflection: Symfony routes, Doctrine columns, validation rules.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
#[Attribute(Attribute::TARGET_METHOD)]
final class Route
{
    public function __construct(public string $method, public string $path) {}
}

final class ProductController
{
    #[Route('GET', '/products')]
    public function index(): string { return 'all products'; }

    #[Route('GET', '/products/{id}')]
    public function show(int $id): string { return "product $id"; }

    public function helper(): void {}       // no attribute: not a route
}

// A tiny router that discovers routes from attributes
$routes = [];
foreach ((new ReflectionClass(ProductController::class))->getMethods() as $method) {
    foreach ($method->getAttributes(Route::class) as $attr) {
        $route = $attr->newInstance();
        $routes[] = "$route->method $route->path -> {$method->getName()}()";
    }
}
print_r($routes);

// Built-in attributes
class Base { public function save(): void {} }
class Child extends Base
{
    #[\Override]                // 8.3: error if the parent has no save()
    public function save(): void {}
}
echo "Override checked\n";` },
      ],
    },
    {
      id: 'php-types-advanced',
      title: 'Advanced Types: union, intersection, DNF, mixed',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// Union: one of several types
function toCents(int|float|string $value): int
{
    return (int) round((float) $value * 100);
}
echo toCents('12.5'), "\n";

// Intersection (8.1): must satisfy ALL interfaces
function countAndLoop(Countable&Traversable $items): void
{
    echo count($items), " items: ";
    foreach ($items as $i) echo $i, ' ';
    echo "\n";
}
countAndLoop(new ArrayIterator(['a', 'b', 'c']));

// DNF types (8.2): combine union and intersection
function process((Countable&Traversable)|array|null $data): int
{
    return $data === null ? 0 : count($data);
}
echo process([1, 2, 3]), " ", process(null), "\n";

// true, false and null as standalone types (8.2)
function alwaysTrue(): true { return true; }
var_dump(alwaysTrue());

// mixed = any type (use rarely; prefer something specific)
function dump(mixed $v): string { return get_debug_type($v); }
echo dump(1.5), " ", dump(null), " ", dump(new stdClass()), "\n";` },
        { type: 'note', value: 'Precise types are documentation that the engine checks for you. Tools like PHPStan go further with generics in docblocks: @param list<User> $users, @return array<string, int>.' },
      ],
    },
    {
      id: 'php-versions',
      title: 'What Changed in Each PHP 8 Version',
      blocks: [
        { type: 'list', items: [
          '8.0 (2020): JIT, named arguments, match, nullsafe ?->, union types, constructor promotion, attributes, str_contains, throw expression, saner string-number comparison.',
          '8.1 (2021): enums, readonly properties, first-class callables strlen(...), new in initializers, intersection types, never, fibers, array_is_list.',
          '8.2 (2022): readonly classes, DNF types, true/false/null types, deprecated dynamic properties, Random extension.',
          '8.3 (2023): typed class constants, #[\\Override], json_validate(), mb_str_pad(), dynamic class constant fetch, readonly cloning fixes.',
          '8.4 (2024): property hooks (get/set on properties), asymmetric visibility (public private(set)), array_find/array_any/array_all, new without parentheses, HTML5 DOM parser.',
          '8.5 (2025): the pipe operator |> for chaining calls, array_first() and array_last(), clone with property changes.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
// PHP 8.4 property hooks and asymmetric visibility (not runnable on 8.3)
class User
{
    public private(set) string $email;     // anyone reads, only the class writes

    public string $name {
        set => trim($value);               // runs on every assignment
    }

    public string $initials {
        get => strtoupper($this->name[0]); // computed property
    }
}

// PHP 8.5 pipe operator
$slug = ' Hello World ' |> trim(...) |> strtolower(...) |> (fn($s) => str_replace(' ', '-', $s));` },
        { type: 'note', value: 'Check php.net/supported-versions: each version gets 2 years of active support and 2 years of security fixes. Keep production on a supported version.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'modern-php', q: 'What does OrderStatus::from("paid") do with a backed enum?', options: ['Creates a new case', 'Returns the case whose value is "paid", or throws if none', 'Returns a string', 'Returns null if missing'], answer: 1, explain: 'from() throws ValueError for unknown values; tryFrom() returns null.' },
    { chapterId: 'modern-php', q: 'What happens when you assign to a readonly property a second time?', options: ['It is ignored', 'The value changes', 'An Error is thrown', 'A warning is shown'], answer: 2, explain: 'Readonly properties can be initialised once, from inside the class.' },
    { chapterId: 'modern-php', q: 'What does $user?->profile return when $user is null?', options: ['An error', 'null', 'false', 'An empty object'], answer: 1, explain: 'The nullsafe operator short-circuits to null.' },
    { chapterId: 'modern-php', q: 'How do frameworks read attributes like #[Route(...)]?', options: ['With regex on the source code', 'With the Reflection API', 'They run automatically', 'From comments'], answer: 1, explain: 'ReflectionMethod::getAttributes() returns them; newInstance() builds the object.' },
    { chapterId: 'modern-php', q: 'What does the type Countable&Traversable mean?', options: ['Either Countable or Traversable', 'A value implementing both interfaces', 'A Countable array', 'Nothing'], answer: 1, explain: '& is an intersection type: all of the listed types.' },
    { chapterId: 'modern-php', q: 'What does #[\\Override] (PHP 8.3) check?', options: ['That the method is public', 'That a parent or interface really has this method', 'That the class is final', 'That the method returns a value'], answer: 1, explain: 'It catches typos and removed parent methods at compile time.' },
  ],
};
