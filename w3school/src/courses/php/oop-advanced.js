// PHP chapter: Inheritance, Interfaces and Traits. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'oop-advanced',
  title: 'Inheritance, Interfaces & Traits',
  description: 'Polymorphism, abstract classes, interfaces, traits and magic methods',
  icon: 'account-tree',
  lessons: [
    {
      id: 'php-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'A child class extends a parent: it inherits its public and protected members and can override methods. parent:: calls the parent version.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
class User
{
    public function __construct(protected string $name, protected string $email) {}

    public function permissions(): array
    {
        return ['read'];
    }

    public function describe(): string
    {
        return static::class . " {$this->name}: " . implode(', ', $this->permissions());
    }
}

class Admin extends User
{
    public function __construct(string $name, string $email, private string $level = 'full')
    {
        parent::__construct($name, $email);   // run the parent constructor
    }

    public function permissions(): array
    {
        return [...parent::permissions(), 'write', 'delete'];
    }
}

final class Guest extends User
{
    public function permissions(): array { return []; }
}

$people = [new User('Mina', 'm@x.com'), new Admin('Kamal', 'k@x.com'), new Guest('Visitor', '')];
foreach ($people as $p) {
    echo $p->describe(), "\n";    // the right permissions() runs for each object
}` },
        { type: 'note', value: 'final class cannot be extended; final method cannot be overridden. Prefer composition (objects that hold other objects) over deep inheritance trees: more than two levels is a warning sign.' },
      ],
    },
    {
      id: 'php-abstract-classes',
      title: 'Abstract Classes',
      blocks: [
        { type: 'text', value: 'An abstract class cannot be instantiated. It provides shared code and declares abstract methods that every child MUST implement. This is the Template Method pattern.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
abstract class Report
{
    // The algorithm is fixed here...
    public function render(): string
    {
        $rows = array_map(fn($r) => $this->formatRow($r), $this->rows());
        return $this->title() . "\n" . implode("\n", $rows) . "\n";
    }

    // ...while children fill in the steps
    abstract protected function title(): string;
    abstract protected function rows(): array;

    protected function formatRow(array $row): string
    {
        return implode(' | ', $row);
    }
}

class SalesReport extends Report
{
    protected function title(): string { return '== Sales =='; }
    protected function rows(): array { return [['Jan', 120000], ['Feb', 98000]]; }
}

class StudentReport extends Report
{
    protected function title(): string { return '== Students =='; }
    protected function rows(): array { return [['Nadia', 'A+'], ['Rafi', 'A']]; }
    protected function formatRow(array $row): string { return "* {$row[0]} got {$row[1]}"; }
}

echo (new SalesReport())->render();
echo (new StudentReport())->render();
// new Report();  // Error: cannot instantiate abstract class` },
      ],
    },
    {
      id: 'php-interfaces',
      title: 'Interfaces and Polymorphism',
      blocks: [
        { type: 'text', value: 'An interface is a contract: a list of public methods a class promises to have, with no code. Code that depends on an interface works with ANY class that implements it. A class can implement many interfaces.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

interface PaymentGateway
{
    public function charge(int $amountPaisa, string $reference): string;
}

final class BkashGateway implements PaymentGateway
{
    public function charge(int $amountPaisa, string $reference): string
    {
        return "bKash charged " . ($amountPaisa / 100) . " Tk for $reference";
    }
}

final class CardGateway implements PaymentGateway
{
    public function charge(int $amountPaisa, string $reference): string
    {
        return "Card charged " . ($amountPaisa / 100) . " Tk for $reference";
    }
}

final class FakeGateway implements PaymentGateway   // perfect for tests
{
    public array $charges = [];
    public function charge(int $amountPaisa, string $reference): string
    {
        $this->charges[] = $amountPaisa;
        return 'fake-ok';
    }
}

// The checkout only knows the interface, not the concrete class
final class Checkout
{
    public function __construct(private PaymentGateway $gateway) {}

    public function pay(int $amountPaisa, string $orderId): string
    {
        return $this->gateway->charge($amountPaisa, $orderId);
    }
}

echo (new Checkout(new BkashGateway()))->pay(150000, 'ORD-1'), "\n";
echo (new Checkout(new CardGateway()))->pay(99900, 'ORD-2'), "\n";
$fake = new FakeGateway();
(new Checkout($fake))->pay(500, 'TEST');
print_r($fake->charges);` },
        { type: 'note', value: '"Program to an interface, not an implementation." Swapping bKash for a card gateway, or for a fake in tests, needs no change to Checkout. This is the heart of clean architecture.' },
      ],
    },
    {
      id: 'php-traits',
      title: 'Traits',
      blocks: [
        { type: 'text', value: 'A trait is a reusable bundle of methods (and properties) copied into classes with use. It solves "I need the same helper in unrelated classes" without inheritance.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
trait HasTimestamps
{
    public ?string $createdAt = null;
    public ?string $updatedAt = null;

    public function touch(string $now): void
    {
        $this->createdAt ??= $now;
        $this->updatedAt = $now;
    }
}

trait SoftDeletes
{
    private ?string $deletedAt = null;

    public function delete(string $now): void { $this->deletedAt = $now; }
    public function trashed(): bool { return $this->deletedAt !== null; }
}

class Post
{
    use HasTimestamps, SoftDeletes;
    public function __construct(public string $title) {}
}

class Comment
{
    use HasTimestamps;
}

$post = new Post('Traits in PHP');
$post->touch('2026-03-01 10:00');
$post->touch('2026-03-02 09:30');
echo "$post->title created {$post->createdAt}, updated {$post->updatedAt}\n";
$post->delete('2026-03-05');
var_dump($post->trashed());
print_r(class_uses($post));` },
        { type: 'note', value: 'Laravel uses traits everywhere (HasFactory, SoftDeletes, Notifiable). Keep traits small and focused; a trait that needs many properties of the host class is a hidden dependency.' },
      ],
    },
    {
      id: 'php-late-static-binding',
      title: 'self vs static (Late Static Binding)',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
class Model
{
    public static function create(): static     // returns an instance of the CALLED class
    {
        return new static();
    }

    public static function nameWithSelf(): string { return self::class; }
    public static function nameWithStatic(): string { return static::class; }
}

class Product extends Model {}

echo get_class(Product::create()), "\n";   // Product
echo Product::nameWithSelf(), "\n";        // Model  (where the code is written)
echo Product::nameWithStatic(), "\n";      // Product (the class that was called)` },
        { type: 'note', value: 'self:: is resolved where the method is written; static:: is resolved at runtime to the class you called. Active Record ORMs (User::create(), Post::find()) depend on static.' },
      ],
    },
    {
      id: 'php-magic-methods',
      title: 'Magic Methods: __get, __set, __call, __invoke',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
class Config
{
    private array $data = [];

    public function __get(string $key): mixed       // reading an inaccessible property
    {
        return $this->data[$key] ?? null;
    }

    public function __set(string $key, mixed $value): void
    {
        $this->data[$key] = $value;
    }

    public function __isset(string $key): bool { return isset($this->data[$key]); }

    public function __call(string $method, array $args): mixed   // unknown method
    {
        if (str_starts_with($method, 'get')) {
            return $this->data[lcfirst(substr($method, 3))] ?? null;
        }
        throw new BadMethodCallException("Method $method does not exist");
    }
}

$c = new Config();
$c->appName = 'CodeNest';           // __set
echo $c->appName, "\n";             // __get
echo $c->getAppName(), "\n";        // __call
var_dump(isset($c->debug));         // __isset

// __invoke: call an object like a function
class Multiplier
{
    public function __construct(private int $by) {}
    public function __invoke(int $x): int { return $x * $this->by; }
}
print_r(array_map(new Multiplier(10), [1, 2, 3]));` },
        { type: 'note', value: 'Magic methods are powerful (Eloquent models use them) but hide what a class can do from your editor and static analysis. Use them sparingly and document them with @property and @method tags.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'oop-advanced', q: 'How do you call the parent class constructor?', options: ['super()', 'parent::__construct()', '$this->parent()', 'self::__construct()'], answer: 1, explain: 'parent:: refers to the parent class.' },
    { chapterId: 'oop-advanced', q: 'Can you create an object of an abstract class?', options: ['Yes', 'No', 'Only with static', 'Only once'], answer: 1, explain: 'Abstract classes must be extended; only concrete children are instantiated.' },
    { chapterId: 'oop-advanced', q: 'How many interfaces can a class implement?', options: ['One', 'Two', 'Any number', 'None if it extends a class'], answer: 2, explain: 'A class extends one parent but can implement many interfaces.' },
    { chapterId: 'oop-advanced', q: 'What is a trait?', options: ['A type of interface', 'A reusable set of methods copied into classes with use', 'An abstract class', 'A namespace'], answer: 1, explain: 'Traits share code horizontally between unrelated classes.' },
    { chapterId: 'oop-advanced', q: 'In a parent method, what does static::class return when called on a child?', options: ['The parent class name', 'The child class name', 'static', 'Nothing'], answer: 1, explain: 'static:: uses late static binding: the class that was called.' },
    { chapterId: 'oop-advanced', q: 'Which magic method runs when an object is called like a function?', options: ['__call', '__invoke', '__run', '__function'], answer: 1, explain: '__invoke makes $object($arg) work.' },
    { chapterId: 'oop-advanced', q: 'Why type-hint against an interface instead of a concrete class?', options: ['It is faster', 'Any implementation (real or fake) can be swapped in without changing the code', 'Interfaces are required by PHP', 'It hides errors'], answer: 1, explain: 'Depending on abstractions makes code flexible and testable.' },
  ],
};
