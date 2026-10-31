// PHP chapter: Clean Architecture and DDD. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'clean-architecture',
  title: 'Clean Architecture & DDD',
  description: 'Value objects, entities, DTOs, use cases, domain events and layers',
  icon: 'hub',
  lessons: [
    {
      id: 'php-layers',
      title: 'Layers and the Dependency Rule',
      blocks: [
        { type: 'text', value: 'As apps grow, mixing SQL, HTTP and business rules in one place becomes painful. Clean (hexagonal / onion) architecture separates them into layers. The dependency rule: inner layers know nothing about outer layers.' },
        { type: 'code', lang: 'text', value: String.raw`┌──────────────────────────────────────────────┐
│ Infrastructure: controllers, PDO repositories, │  frameworks, DB, HTTP, queues
│ mailers, payment gateway adapters               │
│  ┌──────────────────────────────────────────┐  │
│  │ Application: use cases (PlaceOrder,       │  │  orchestrates one action
│  │ RegisterStudent), DTOs, ports (interfaces)│  │
│  │  ┌──────────────────────────────────────┐ │  │
│  │  │ Domain: entities, value objects,      │ │  │  pure PHP business rules,
│  │  │ domain events, domain exceptions      │ │  │  no framework, no SQL
│  │  └──────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
Dependencies point INWARD only.` },
        { type: 'list', items: [
          'The domain can be unit tested in milliseconds: no database, no framework.',
          'You can switch MySQL for PostgreSQL, or bKash for Stripe, by writing a new adapter.',
          'Not every app needs this. A small CRUD site is fine with plain framework MVC; use layers when business rules are complex and long-lived.',
        ] },
      ],
    },
    {
      id: 'php-value-objects',
      title: 'Value Objects',
      blocks: [
        { type: 'text', value: 'A value object represents a concept defined by its value (Email, Money, PhoneNumber, DateRange). It is immutable, validates itself in the constructor, and two with the same value are equal. Invalid data becomes impossible to pass around.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final readonly class Email
{
    public string $value;

    public function __construct(string $value)
    {
        $value = strtolower(trim($value));
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Invalid email: $value");
        }
        $this->value = $value;
    }

    public function domain(): string { return substr($this->value, strpos($this->value, '@') + 1); }
    public function equals(self $other): bool { return $this->value === $other->value; }
}

final readonly class BdPhone
{
    public string $e164;
    public function __construct(string $raw)
    {
        $digits = preg_replace('/\D/', '', $raw);
        $digits = preg_replace('/^(?:880|0)/', '', $digits);
        if (!preg_match('/^1[3-9]\d{8}$/', $digits)) throw new InvalidArgumentException("Invalid BD mobile: $raw");
        $this->e164 = '+880' . $digits;
    }
}

$a = new Email('  Nadia@CodeNest.app ');
var_dump($a->equals(new Email('nadia@codenest.app')));
echo $a->domain(), "\n";

foreach (['01712-345678', '+8801812345678', '0123'] as $raw) {
    try {
        echo (new BdPhone($raw))->e164, "\n";
    } catch (InvalidArgumentException $e) {
        echo $e->getMessage(), "\n";
    }
}

// A function that accepts Email can never receive an invalid one
function sendWelcome(Email $to): string { return "Welcome mail to {$to->value}"; }
echo sendWelcome($a), "\n";` },
      ],
    },
    {
      id: 'php-entities-aggregates',
      title: 'Entities and Aggregates',
      blocks: [
        { type: 'text', value: 'An entity has an identity that stays the same while its data changes (an Order, a Student). Put the business rules INSIDE the entity, instead of setting fields from outside ("anemic model"). An aggregate is a cluster (Order with its lines) changed only through its root.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

enum OrderStatus: string { case Draft = 'draft'; case Placed = 'placed'; case Cancelled = 'cancelled'; }

final class OrderLine
{
    public function __construct(public readonly string $sku, public readonly int $unitPrice, public int $qty) {}
    public function total(): int { return $this->unitPrice * $this->qty; }
}

final class Order                       // aggregate root
{
    private array $lines = [];
    private OrderStatus $status = OrderStatus::Draft;
    private array $events = [];

    public function __construct(public readonly string $id, public readonly int $customerId) {}

    public function addItem(string $sku, int $unitPrice, int $qty): void
    {
        $this->assertDraft();
        if ($qty < 1 || $qty > 10) throw new DomainException('Quantity must be 1-10');
        if (isset($this->lines[$sku])) {
            $this->lines[$sku]->qty += $qty;
        } else {
            $this->lines[$sku] = new OrderLine($sku, $unitPrice, $qty);
        }
    }

    public function place(): void
    {
        $this->assertDraft();
        if (!$this->lines) throw new DomainException('Cannot place an empty order');
        $this->status = OrderStatus::Placed;
        $this->events[] = ['order.placed', $this->id, $this->total()];
    }

    public function total(): int { return array_sum(array_map(fn($l) => $l->total(), $this->lines)); }
    public function status(): OrderStatus { return $this->status; }
    public function releaseEvents(): array { [$e, $this->events] = [$this->events, []]; return $e; }

    private function assertDraft(): void
    {
        if ($this->status !== OrderStatus::Draft) throw new DomainException("Order is {$this->status->value}");
    }
}

$order = new Order('ORD-1', customerId: 7);
$order->addItem('KB-01', 150000, 1);
$order->addItem('MS-02', 45000, 2);
$order->place();
echo $order->status()->value, ", total ", $order->total() / 100, " Tk\n";
print_r($order->releaseEvents());

try {
    $order->addItem('HD-03', 200000, 1);     // the rule protects itself
} catch (DomainException $e) {
    echo "Rejected: ", $e->getMessage(), "\n";
}` },
      ],
    },
    {
      id: 'php-use-cases-dto',
      title: 'Use Cases, DTOs and Ports',
      blocks: [
        { type: 'text', value: 'A use case (application service) performs one action: it receives a DTO (a simple data carrier), loads entities through a repository port (interface), calls domain methods, saves, and dispatches events. Controllers, CLI commands and queue jobs all call the same use case.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// --- Application layer
final readonly class EnrollStudentCommand            // DTO: input data, no behaviour
{
    public function __construct(public int $studentId, public string $courseId, public ?string $coupon = null) {}
}

interface EnrollmentRepository { public function exists(int $studentId, string $courseId): bool; public function add(array $enrollment): void; }
interface PriceList { public function priceOf(string $courseId): int; }
interface EventBus { public function publish(string $name, array $data): void; }

final class EnrollStudent                            // use case
{
    public function __construct(private EnrollmentRepository $enrollments, private PriceList $prices, private EventBus $events) {}

    public function __invoke(EnrollStudentCommand $cmd): int
    {
        if ($this->enrollments->exists($cmd->studentId, $cmd->courseId)) {
            throw new DomainException('Already enrolled');
        }
        $price = $this->prices->priceOf($cmd->courseId);
        if ($cmd->coupon === 'FREE100') $price = 0;
        $this->enrollments->add(['student' => $cmd->studentId, 'course' => $cmd->courseId, 'paid' => $price]);
        $this->events->publish('student.enrolled', ['student' => $cmd->studentId, 'course' => $cmd->courseId]);
        return $price;
    }
}

// --- Infrastructure layer (in-memory adapters here; PDO/Redis in production)
final class InMemoryEnrollments implements EnrollmentRepository
{
    public array $rows = [];
    public function exists(int $s, string $c): bool { return (bool) array_filter($this->rows, fn($r) => $r['student'] === $s && $r['course'] === $c); }
    public function add(array $e): void { $this->rows[] = $e; }
}
final class FixedPrices implements PriceList { public function priceOf(string $c): int { return ['php' => 99900, 'vue' => 79900][$c] ?? throw new DomainException("No course $c"); } }
final class EchoBus implements EventBus { public function publish(string $n, array $d): void { echo "event $n ", json_encode($d), "\n"; } }

// --- Wiring (a controller would build the DTO from the request)
$enroll = new EnrollStudent($repo = new InMemoryEnrollments(), new FixedPrices(), new EchoBus());
$charged = $enroll(new EnrollStudentCommand(7, 'php'));
echo "Charged $charged\n";
$charged = $enroll(new EnrollStudentCommand(8, 'php', coupon: 'FREE100'));
echo "Charged $charged\n";
try {
    $enroll(new EnrollStudentCommand(7, 'php'));
} catch (DomainException $e) {
    echo "Error: ", $e->getMessage(), "\n";
}
echo count($repo->rows), " enrollments stored\n";` },
        { type: 'note', value: 'CQRS in its simple form: commands (EnrollStudent) change state and return little; queries (ListMyCourses) only read and may use optimised SQL that skips the domain model.' },
      ],
    },
    {
      id: 'php-domain-events',
      title: 'Domain Events and Side Effects',
      blocks: [
        { type: 'text', value: 'When something important happens (OrderPlaced, StudentEnrolled), record an event. Listeners react: send email, award points, update statistics. The core logic stays small, and new reactions do not touch it.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final readonly class StudentCompletedCourse
{
    public function __construct(public int $studentId, public string $course, public int $score, public string $at) {}
}

final class Dispatcher
{
    private array $listeners = [];
    public function on(string $event, callable $l): void { $this->listeners[$event][] = $l; }
    public function dispatch(object $event): void
    {
        foreach ($this->listeners[$event::class] ?? [] as $l) $l($event);
    }
}

$bus = new Dispatcher();
$bus->on(StudentCompletedCourse::class, fn($e) => print("Generate certificate for student {$e->studentId} ({$e->course})\n"));
$bus->on(StudentCompletedCourse::class, fn($e) => print("Award " . ($e->score >= 90 ? 500 : 200) . " coins\n"));
$bus->on(StudentCompletedCourse::class, function ($e) {
    if ($e->score >= 90) echo "Unlock badge: {$e->course} expert\n";
});

$bus->dispatch(new StudentCompletedCourse(7, 'PHP', 94, '2026-03-10'));` },
        { type: 'list', items: [
          'Dispatch events AFTER the database transaction commits, or listeners may act on data that was rolled back.',
          'Slow listeners (email, PDF) should be queued.',
          'For reliability across services, store events in an "outbox" table in the same transaction and publish them from a worker (the outbox pattern).',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'clean-architecture', q: 'What is the dependency rule of clean architecture?', options: ['Outer layers must not depend on inner layers', 'Inner layers (domain) must not depend on outer layers (framework, database)', 'Every layer depends on every other', 'Only controllers have dependencies'], answer: 1, explain: 'Dependencies point inward, toward the domain.' },
    { chapterId: 'clean-architecture', q: 'What characterises a value object?', options: ['It has an id', 'Immutable, self-validating, equal by value', 'It is stored in its own table', 'It has setters for every field'], answer: 1, explain: 'Email, Money and PhoneNumber are classic value objects.' },
    { chapterId: 'clean-architecture', q: 'What is an "anemic domain model"?', options: ['A model with too many methods', 'Entities with only getters/setters while all rules live in services', 'A database without indexes', 'A small app'], answer: 1, explain: 'Rich entities protect their own rules instead.' },
    { chapterId: 'clean-architecture', q: 'What is a DTO?', options: ['A database table', 'A simple object that carries data between layers, without behaviour', 'A design pattern for logging', 'A type of exception'], answer: 1, explain: 'Commands and API responses are typical DTOs.' },
    { chapterId: 'clean-architecture', q: 'When should domain events be dispatched to side-effect listeners?', options: ['Before validation', 'After the transaction commits', 'Before saving', 'Never'], answer: 1, explain: 'Otherwise emails may be sent for orders that were rolled back.' },
    { chapterId: 'clean-architecture', q: 'What is a "port" in hexagonal architecture?', options: ['A network port', 'An interface the application defines, implemented by infrastructure adapters', 'A Docker setting', 'A controller'], answer: 1, explain: 'PaymentGateway or EnrollmentRepository interfaces are ports.' },
  ],
};
