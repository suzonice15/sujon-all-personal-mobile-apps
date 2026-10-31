// PHP chapter: Object-Oriented PHP. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'oop-basics',
  title: 'Object-Oriented PHP',
  description: 'Classes, objects, properties, methods and visibility',
  icon: 'category',
  lessons: [
    {
      id: 'php-classes-objects',
      title: 'Classes and Objects',
      blocks: [
        { type: 'text', value: 'A class is a blueprint; an object is a thing built from it. The class groups data (properties) with the behaviour that works on that data (methods). Every modern PHP framework is built from classes.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
class BankAccount
{
    public string $owner;
    public float $balance = 0;

    public function deposit(float $amount): void
    {
        $this->balance += $amount;     // $this = the current object
    }

    public function describe(): string
    {
        return "{$this->owner} has {$this->balance} Tk";
    }
}

$a = new BankAccount();
$a->owner = 'Rahim';
$a->deposit(500);
$a->deposit(250);
echo $a->describe(), "\n";

$b = new BankAccount();
$b->owner = 'Sadia';
echo $b->describe(), "\n";    // separate object, separate data

var_dump($a instanceof BankAccount);` },
        { type: 'note', value: 'Class names use PascalCase, one class per file, and the file is named after the class (BankAccount.php). Composer\'s autoloader relies on that.' },
      ],
    },
    {
      id: 'php-constructors',
      title: 'Constructors and Property Promotion',
      blocks: [
        { type: 'text', value: '__construct() runs when you call new. Constructor property promotion (PHP 8) declares and assigns properties straight from the parameter list, which removes a lot of boilerplate.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// Old style
class ProductOld
{
    private string $name;
    private float $price;

    public function __construct(string $name, float $price)
    {
        $this->name = $name;
        $this->price = $price;
    }
}

// Modern: promoted properties
class Product
{
    public function __construct(
        public readonly string $name,
        private float $price,
        private int $stock = 0,
    ) {
        if ($price < 0) {
            throw new InvalidArgumentException('Price cannot be negative');
        }
    }

    public function price(): float { return $this->price; }
    public function inStock(): bool { return $this->stock > 0; }
}

$p = new Product('Headphones', 1800, 5);
echo $p->name, " costs ", $p->price(), "\n";
var_dump($p->inStock());

try {
    new Product('Broken', -5);
} catch (InvalidArgumentException $e) {
    echo $e->getMessage(), "\n";
}` },
        { type: 'note', value: 'A constructor should leave the object in a valid state. Validate there, so no code can ever hold a Product with a negative price.' },
      ],
    },
    {
      id: 'php-visibility',
      title: 'Visibility and Encapsulation',
      blocks: [
        { type: 'text', value: 'public: usable everywhere. protected: inside the class and its children. private: only inside this class. Keep properties private and expose behaviour through methods: this is encapsulation.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

class Wallet
{
    private int $balance = 0;          // in paisa, to avoid float rounding
    private array $history = [];

    public function add(int $amount, string $note): void
    {
        if ($amount <= 0) throw new DomainException('Amount must be positive');
        $this->balance += $amount;
        $this->log("+$amount $note");
    }

    public function pay(int $amount, string $note): void
    {
        if ($amount > $this->balance) throw new DomainException('Insufficient balance');
        $this->balance -= $amount;
        $this->log("-$amount $note");
    }

    public function balance(): int { return $this->balance; }
    public function history(): array { return $this->history; }

    private function log(string $line): void
    {
        $this->history[] = $line;
    }
}

$w = new Wallet();
$w->add(10000, 'salary');
$w->pay(2500, 'groceries');
echo $w->balance(), "\n";
print_r($w->history());

try {
    $w->pay(50000, 'laptop');
} catch (DomainException $e) {
    echo "Blocked: ", $e->getMessage(), "\n";
}

// $w->balance = 1000000;  // Error: cannot access private property` },
      ],
    },
    {
      id: 'php-static-constants',
      title: 'Static Members and Class Constants',
      blocks: [
        { type: 'text', value: 'Static properties and methods belong to the class itself, not to an object. Access them with ClassName:: or self:: inside the class. Constants are fixed values on the class.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
class Order
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_PAID = 'paid';
    final public const MAX_ITEMS = 50;      // children cannot override

    private static int $created = 0;

    public function __construct(public string $status = self::STATUS_PENDING)
    {
        self::$created++;
    }

    public static function count(): int
    {
        return self::$created;
    }

    // Named constructor: a static method that builds an object
    public static function paid(): self
    {
        return new self(self::STATUS_PAID);
    }
}

new Order();
new Order();
$o = Order::paid();
echo $o->status, "\n";
echo Order::count(), " orders created\n";
echo Order::MAX_ITEMS, "\n";
echo $o::class, "\n";        // class name from an object` },
        { type: 'note', value: 'Static state is shared across the whole request and makes testing harder. Use it for counters, caches and named constructors, not as a replacement for objects.' },
      ],
    },
    {
      id: 'php-magic-methods-basics',
      title: '__toString, Cloning and Comparing Objects',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
class Money
{
    public function __construct(public int $amount, public string $currency = 'BDT') {}

    public function __toString(): string
    {
        return number_format($this->amount / 100, 2) . ' ' . $this->currency;
    }
}

$price = new Money(150050);
echo "Price: $price\n";          // __toString used automatically

// Objects are passed by handle: both variables point to the SAME object
$a = new Money(100);
$b = $a;
$b->amount = 999;
echo $a->amount, "\n";           // 999

// clone makes a (shallow) copy
$c = clone $a;
$c->amount = 1;
echo $a->amount, " vs ", $c->amount, "\n";

// == compares properties, === compares identity
var_dump(new Money(5) == new Money(5));    // true
var_dump(new Money(5) === new Money(5));   // false
var_dump($a === $b);                       // true` },
        { type: 'note', value: 'For deep copies, implement __clone() and clone the inner objects there. Even better: make value objects immutable (readonly), then copying is never needed.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'oop-basics', q: 'Which keyword refers to the current object inside a method?', options: ['self', 'this', '$this', 'static'], answer: 2, explain: '$this is the current object; self:: refers to the class.' },
    { chapterId: 'oop-basics', q: 'What does constructor property promotion do?', options: ['Makes properties public', 'Declares and assigns properties directly from constructor parameters', 'Calls the parent constructor', 'Makes the class final'], answer: 1, explain: 'public function __construct(private string $name) {} declares and sets $name.' },
    { chapterId: 'oop-basics', q: 'Where can a protected property be used?', options: ['Everywhere', 'Only in the same file', 'In the class and its child classes', 'Only in static methods'], answer: 2, explain: 'protected = class plus subclasses; private = only the class.' },
    { chapterId: 'oop-basics', q: 'How do you access a static property inside its class?', options: ['$this->count', 'self::$count', 'static->count', 'Order.count'], answer: 1, explain: 'Use self::$name (or static::$name for late static binding).' },
    { chapterId: 'oop-basics', q: 'After $b = $a; $b->x = 5; what is $a->x when $a is an object?', options: ['Unchanged', '5', 'null', 'An error'], answer: 1, explain: 'Both variables hold a handle to the same object. Use clone for a copy.' },
    { chapterId: 'oop-basics', q: 'Which magic method lets an object be used as a string?', options: ['__string', '__toString', '__print', '__echo'], answer: 1, explain: '__toString() is called by echo and string interpolation.' },
    { chapterId: 'oop-basics', q: 'Why store money as integer paisa instead of float taka?', options: ['Integers use less memory', 'Floats can produce rounding errors', 'PHP has no floats', 'Databases reject floats'], answer: 1, explain: '0.1 + 0.2 is not exactly 0.3 in floating point; whole numbers of the smallest unit are exact.' },
  ],
};
