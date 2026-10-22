// PHP chapter: Testing and Code Quality. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'testing',
  title: 'Testing & Code Quality',
  description: 'PHPUnit, test doubles, TDD, static analysis and debugging',
  icon: 'fact-check',
  lessons: [
    {
      id: 'php-why-tests',
      title: 'Why Automated Tests',
      blocks: [
        { type: 'text', value: 'A test is code that runs your code and checks the result. With a good test suite you can refactor, upgrade PHP or add features and know in seconds that nothing broke. Every serious team expects it.' },
        { type: 'list', items: [
          'Unit tests: one class or function in isolation, no database or network. Fast, thousands per second.',
          'Integration tests: several parts together, for example a repository against a real test database.',
          'Feature/HTTP tests: send a request to your app and check the response.',
          'End-to-end tests: a real browser clicking through the site (Playwright, Laravel Dusk). Few and slow.',
          'The test pyramid: many unit tests, fewer integration tests, very few end-to-end tests.',
        ] },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// The idea behind every test framework: arrange, act, assert
function applyCoupon(int $total, string $code): int
{
    return match ($code) {
        'SAVE10' => (int) round($total * 0.9),
        'FLAT100' => max(0, $total - 100),
        default => $total,
    };
}

function assertSame(mixed $expected, mixed $actual, string $name): void
{
    echo ($expected === $actual ? "PASS" : "FAIL") . " $name"
        . ($expected === $actual ? '' : " (expected " . var_export($expected, true) . ", got " . var_export($actual, true) . ")") . "\n";
}

assertSame(900, applyCoupon(1000, 'SAVE10'), 'ten percent off');
assertSame(0, applyCoupon(50, 'FLAT100'), 'never below zero');
assertSame(1000, applyCoupon(1000, 'BOGUS'), 'unknown code ignored');
assertSame(901, applyCoupon(1001, 'SAVE10'), 'rounding');` },
      ],
    },
    {
      id: 'php-phpunit',
      title: 'PHPUnit',
      blocks: [
        { type: 'text', value: 'PHPUnit is the standard testing framework (Pest is a popular, friendlier syntax built on top of it). Tests live in tests/, extend TestCase, and each public test method checks one behaviour.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// tests/Unit/CartTest.php
declare(strict_types=1);

namespace Tests\Unit;

use App\Cart;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class CartTest extends TestCase
{
    private Cart $cart;

    protected function setUp(): void          // runs before EACH test
    {
        $this->cart = new Cart();
    }

    #[Test]
    public function it_starts_empty(): void
    {
        $this->assertCount(0, $this->cart->items());
        $this->assertSame(0, $this->cart->total());
    }

    #[Test]
    public function it_adds_quantities_of_the_same_product(): void
    {
        $this->cart->add('KB-01', price: 1500, qty: 1);
        $this->cart->add('KB-01', price: 1500, qty: 2);

        $this->assertSame(4500, $this->cart->total());
    }

    #[Test]
    public function it_rejects_a_zero_quantity(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->cart->add('KB-01', price: 1500, qty: 0);
    }

    #[Test]
    #[DataProvider('discounts')]
    public function it_applies_discounts(int $total, string $code, int $expected): void
    {
        $this->assertSame($expected, $this->cart->applyDiscount($total, $code));
    }

    public static function discounts(): array
    {
        return [
            'ten percent' => [1000, 'SAVE10', 900],
            'flat amount' => [1000, 'FLAT100', 900],
            'unknown code' => [1000, 'NOPE', 1000],
        ];
    }
}` },
        { type: 'code', lang: 'text', value: String.raw`$ composer require --dev phpunit/phpunit
$ vendor/bin/phpunit
PHPUnit 11.x
......                                     6 / 6 (100%)
OK (6 tests, 7 assertions)

$ vendor/bin/phpunit --filter it_applies_discounts
$ XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-html coverage/` },
      ],
    },
    {
      id: 'php-test-doubles',
      title: 'Mocks, Stubs and Fakes',
      blocks: [
        { type: 'text', value: 'Unit tests must not send real SMS or charge real cards. Replace dependencies with test doubles: a stub returns canned answers, a mock checks it was called correctly, a fake is a simple working implementation (an in-memory repository).' },
        { type: 'code', lang: 'php', value: String.raw`<?php
final class OrderServiceTest extends TestCase
{
    #[Test]
    public function it_sends_a_receipt_after_payment(): void
    {
        // Stub: the gateway always succeeds
        $gateway = $this->createStub(PaymentGateway::class);
        $gateway->method('charge')->willReturn('txn_123');

        // Mock: we expect exactly one email to the customer
        $mailer = $this->createMock(Mailer::class);
        $mailer->expects($this->once())
            ->method('send')
            ->with('nadia@example.com', $this->stringContains('txn_123'));

        // Fake: an in-memory repository
        $orders = new InMemoryOrderRepository();

        $service = new OrderService($gateway, $mailer, $orders);
        $service->pay(orderId: 7, email: 'nadia@example.com', amount: 2500);

        $this->assertSame('paid', $orders->find(7)->status);
    }
}` },
        { type: 'note', value: 'This only works because OrderService receives its dependencies through the constructor (dependency injection). Code that calls new SmtpMailer() inside its methods is very hard to test.' },
      ],
    },
    {
      id: 'php-tdd',
      title: 'Test-Driven Development',
      blocks: [
        { type: 'text', value: 'TDD is a rhythm: RED write a small failing test, GREEN write the simplest code that passes, REFACTOR clean up while the tests stay green. It forces small steps and testable design.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// Step 3 result: a password strength checker built test-first
final class PasswordPolicy
{
    /** @return list<string> problems, empty when the password is acceptable */
    public function problems(string $password): array
    {
        $problems = [];
        if (mb_strlen($password) < 10) $problems[] = 'at least 10 characters';
        if (!preg_match('/\d/', $password)) $problems[] = 'a number';
        if (!preg_match('/[A-Z]/', $password)) $problems[] = 'an uppercase letter';
        if (in_array(strtolower($password), ['password123', 'qwerty12345'], true)) $problems[] = 'not a common password';
        return $problems;
    }
}

$cases = [                       // the tests we wrote first, one at a time
    ['short', ['at least 10 characters', 'a number', 'an uppercase letter']],
    ['longenough1', ['an uppercase letter']],
    ['Password123', ['not a common password']],
    ['Correct-Horse-7', []],
];
$policy = new PasswordPolicy();
foreach ($cases as [$input, $expected]) {
    $ok = $policy->problems($input) === $expected;
    echo ($ok ? 'PASS' : 'FAIL'), " '$input'\n";
}` },
      ],
    },
    {
      id: 'php-static-analysis',
      title: 'Static Analysis and Code Style',
      blocks: [
        { type: 'text', value: 'Static analysers read your code without running it and find bugs: calling methods on null, wrong types, dead code. Teams run them in CI on every pull request.' },
        { type: 'code', lang: 'text', value: String.raw`$ composer require --dev phpstan/phpstan
$ vendor/bin/phpstan analyse src --level=8

 ------ ----------------------------------------------------------
  Line   src/Service/OrderService.php
 ------ ----------------------------------------------------------
  42     Cannot call method getEmail() on App\Model\User|null.
  57     Method OrderService::total() should return int but returns float.
 ------ ----------------------------------------------------------

$ composer require --dev friendsofphp/php-cs-fixer
$ vendor/bin/php-cs-fixer fix src --rules=@PER-CS

$ composer require --dev rector/rector     # automated upgrades and refactors
$ vendor/bin/rector process src` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Generics in docblocks: PHPStan and Psalm understand them
/**
 * @template T
 * @param list<T> $items
 * @param callable(T): bool $predicate
 * @return T|null
 */
function firstWhere(array $items, callable $predicate): mixed
{
    foreach ($items as $item) {
        if ($predicate($item)) return $item;
    }
    return null;
}` },
        { type: 'list', items: [
          'PHPStan or Psalm: start at a low level and raise it over time; level 8+ on new code.',
          'PHP-CS-Fixer or PHP_CodeSniffer: consistent formatting, no style debates in code review.',
          'Rector: upgrades code automatically (for example PHP 7.4 -> 8.3 syntax).',
          'Run everything in CI (GitHub Actions) together with the tests.',
        ] },
      ],
    },
    {
      id: 'php-debugging',
      title: 'Debugging Like a Pro',
      blocks: [
        { type: 'list', items: [
          'var_dump() / print_r() and dd() (dump and die, in Laravel and Symfony VarDumper) for quick checks.',
          'Xdebug: set breakpoints in VS Code or PhpStorm, step through code, inspect every variable. Much faster than guessing.',
          'Read the full error message and stack trace from top to bottom: the first line in YOUR code is usually the cause.',
          'Log context (ids, inputs) around the failing code in production instead of guessing.',
          'Reproduce the bug in a failing test first, then fix it, so it never comes back.',
        ] },
        { type: 'code', lang: 'php', tryIt: true, expectErrors: true, value: String.raw`<?php
function level3(array $order): int { return $order['items'][0]['price'] * $order['qty']; }
function level2(array $order): int { return level3($order); }
function level1(): int { return level2(['qty' => 2, 'items' => []]); }

// 1. By default PHP only prints warnings and carries on with a WRONG result
$total = level1();
echo "Total: $total (should never be 0!)\n\n";

// 2. Make warnings throw, to stop at the real problem and get a stack trace
set_error_handler(fn($sev, $msg, $file, $line) => throw new ErrorException($msg, 0, $sev, $file, $line));
try {
    level1();
} catch (ErrorException $e) {
    echo $e->getMessage(), "\n";
    echo $e->getTraceAsString(), "\n";     // read it: level3 <- level2 <- level1
}` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'testing', q: 'Which kind of test should you have the most of?', options: ['End-to-end', 'Manual', 'Unit', 'Load'], answer: 2, explain: 'Unit tests are fast and pinpoint failures (the test pyramid).' },
    { chapterId: 'testing', q: 'What does setUp() do in a PHPUnit test class?', options: ['Runs once for the whole suite', 'Runs before each test method', 'Installs PHPUnit', 'Runs after a failure'], answer: 1, explain: 'Each test gets a fresh state.' },
    { chapterId: 'testing', q: 'What is the difference between a stub and a mock?', options: ['No difference', 'A stub returns canned values; a mock also verifies how it was called', 'A mock is faster', 'A stub talks to the database'], answer: 1, explain: 'Mocks have expectations like $this->once().' },
    { chapterId: 'testing', q: 'What is the order of the TDD cycle?', options: ['Green, red, refactor', 'Refactor, red, green', 'Red, green, refactor', 'Write code, then tests'], answer: 2, explain: 'Failing test, simplest passing code, then clean up.' },
    { chapterId: 'testing', q: 'What does PHPStan do?', options: ['Runs tests', 'Finds bugs by analysing code without running it', 'Formats code', 'Deploys code'], answer: 1, explain: 'It is a static analyser.' },
    { chapterId: 'testing', q: 'Which tool lets you set breakpoints and step through PHP code?', options: ['Composer', 'Xdebug', 'OPcache', 'Monolog'], answer: 1, explain: 'Xdebug integrates with VS Code and PhpStorm.' },
  ],
};
