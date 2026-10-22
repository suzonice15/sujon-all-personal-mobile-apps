// PHP chapter: Errors and Exceptions. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'errors',
  title: 'Errors & Exceptions',
  description: 'try/catch, custom exceptions, error handling and logging',
  icon: 'error-outline',
  lessons: [
    {
      id: 'php-error-levels',
      title: 'Errors vs Exceptions',
      blocks: [
        { type: 'text', value: 'PHP has two systems. Old-style errors (warnings, notices, deprecations) are reported and the script continues. Exceptions are thrown objects that stop the current code until something catches them. Since PHP 7, most fatal errors are thrown as Error objects too.' },
        { type: 'code', lang: 'text', value: String.raw`Throwable                       (interface: catch-all)
├── Error                       (engine problems: bugs in code)
│   ├── TypeError
│   ├── ValueError
│   ├── ArithmeticError
│   │   └── DivisionByZeroError
│   └── UnhandledMatchError
└── Exception                   (conditions your code can handle)
    ├── RuntimeException
    │   ├── UnexpectedValueException
    │   └── ...
    ├── LogicException
    │   ├── InvalidArgumentException
    │   └── DomainException
    └── JsonException, PDOException, ...` },
        { type: 'list', items: [
          'Development: error_reporting(E_ALL) and display_errors=On so you see every problem.',
          'Production: display_errors=Off (never show errors to visitors) and log_errors=On.',
          'Treat warnings as bugs: a modern codebase converts them into exceptions (next lessons).',
        ] },
      ],
    },
    {
      id: 'php-try-catch',
      title: 'try, catch and finally',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
function divide(int $a, int $b): float
{
    if ($b === 0) {
        throw new InvalidArgumentException('Cannot divide by zero');
    }
    return $a / $b;
}

foreach ([[10, 2], [5, 0]] as [$a, $b]) {
    try {
        echo "$a / $b = ", divide($a, $b), "\n";
    } catch (InvalidArgumentException $e) {
        echo "Error: ", $e->getMessage(), "\n";
    } finally {
        echo "(finally always runs)\n";
    }
}

// Catch several types in one block
try {
    json_decode('{oops', flags: JSON_THROW_ON_ERROR);
} catch (JsonException | ValueError $e) {
    echo get_class($e), ": ", $e->getMessage(), "\n";
}

// Engine errors are catchable too
try {
    echo intdiv(1, 0);
} catch (DivisionByZeroError $e) {
    echo "Caught ", $e::class, "\n";
}

// Useful exception methods
try {
    throw new RuntimeException('Disk full', 507);
} catch (RuntimeException $e) {
    echo $e->getCode(), " at line ", $e->getLine(), "\n";
}` },
        { type: 'note', value: 'Only catch what you can handle. An empty catch block hides bugs; let unexpected exceptions bubble up to a global handler that logs them.' },
      ],
    },
    {
      id: 'php-custom-exceptions',
      title: 'Custom Exceptions',
      blocks: [
        { type: 'text', value: 'Your own exception classes describe business problems precisely and can carry extra data. Callers then catch exactly the case they care about.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

class DomainError extends RuntimeException {}

final class InsufficientStock extends DomainError
{
    public static function for(string $sku, int $wanted, int $available): self
    {
        $e = new self("Only $available of $sku left, $wanted requested");
        $e->sku = $sku;
        return $e;
    }
    public string $sku = '';
}

final class PaymentDeclined extends DomainError {}

function placeOrder(string $sku, int $qty): string
{
    $stock = ['KB-01' => 3];
    if (($stock[$sku] ?? 0) < $qty) {
        throw InsufficientStock::for($sku, $qty, $stock[$sku] ?? 0);
    }
    return "Order for $qty x $sku placed";
}

try {
    echo placeOrder('KB-01', 2), "\n";
    echo placeOrder('KB-01', 5), "\n";
} catch (InsufficientStock $e) {
    echo "Stock problem with {$e->sku}: {$e->getMessage()}\n";
} catch (DomainError $e) {
    echo "Other business error: ", $e->getMessage(), "\n";
}

// Wrapping: keep the original cause with $previous
try {
    try {
        throw new PDOException('SQLSTATE[HY000] connection refused');
    } catch (PDOException $e) {
        throw new RuntimeException('Could not load the order', previous: $e);
    }
} catch (RuntimeException $e) {
    echo $e->getMessage(), " <- caused by: ", $e->getPrevious()->getMessage(), "\n";
}` },
      ],
    },
    {
      id: 'php-global-handlers',
      title: 'Global Handlers: Never Show a Blank Page',
      blocks: [
        { type: 'text', value: 'set_exception_handler() catches anything nothing else caught; set_error_handler() turns warnings into exceptions. Together they make errors consistent: log the details, show a friendly page.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// 1. Turn every warning/notice into an ErrorException
set_error_handler(function (int $severity, string $message, string $file, int $line): bool {
    if (!(error_reporting() & $severity)) return false;   // respect @ and error_reporting
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// 2. Last line of defence for uncaught exceptions
$handler = function (Throwable $e): void {
    // In production: write to a log, return a 500 page or JSON
    $ref = substr(md5($e->getMessage() . microtime()), 0, 8);
    echo "[log] $ref ", $e::class, ": {$e->getMessage()} (line {$e->getLine()})\n";
    echo "Sorry, something went wrong. Reference: $ref\n";
};
set_exception_handler($handler);

// A warning now becomes a catchable exception
try {
    $arr = [];
    echo $arr['missing'];
} catch (ErrorException $e) {
    echo "Converted warning: ", $e->getMessage(), "\n";
}

// On a real server, an exception nobody catches is passed to the handler and the
// script stops: throw new LogicException('Unexpected state');
// (Try it runs PHP in a sandbox that reports uncaught exceptions itself, so here
// we call the handler the way PHP would.)
$handler(new LogicException('Unexpected state'));` },
        { type: 'note', value: 'Frameworks (Laravel, Symfony) install these handlers for you and render a pretty debug page in development. In plain PHP, register them in your front controller (public/index.php).' },
      ],
    },
    {
      id: 'php-logging',
      title: 'Logging with PSR-3 and Monolog',
      blocks: [
        { type: 'text', value: 'Logs are how you debug production. PSR-3 defines a standard LoggerInterface (debug, info, notice, warning, error, critical, alert, emergency). Monolog is the library almost everyone uses.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// composer require monolog/monolog
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\RotatingFileHandler;

$log = new Logger('shop');
$log->pushHandler(new RotatingFileHandler(__DIR__ . '/../storage/logs/app.log', 14, Logger::INFO));

$log->info('Order placed', ['order_id' => 1042, 'user_id' => 7, 'total' => 2599]);
$log->warning('Payment slow', ['gateway' => 'bkash', 'ms' => 4200]);
$log->error('Payment failed', ['exception' => $e]);

// Output: [2026-03-10T12:00:00+06:00] shop.INFO: Order placed {"order_id":1042,"user_id":7,"total":2599}` },
        { type: 'list', items: [
          'Log context as structured arrays, not by concatenating strings: you can search and filter later.',
          'Never log passwords, tokens or full card numbers.',
          'Send errors to a service like Sentry or Bugsnag so you are alerted when production breaks.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'errors', q: 'Which block always runs, whether an exception was thrown or not?', options: ['catch', 'finally', 'else', 'always'], answer: 1, explain: 'finally runs after try/catch in every case.' },
    { chapterId: 'errors', q: 'Which type catches both Exception and Error?', options: ['Exception', 'Error', 'Throwable', 'RuntimeException'], answer: 2, explain: 'Both implement the Throwable interface.' },
    { chapterId: 'errors', q: 'What should display_errors be in production?', options: ['On', 'Off, with log_errors On', 'E_ALL', 'It does not matter'], answer: 1, explain: 'Error details can leak paths, queries and secrets to visitors.' },
    { chapterId: 'errors', q: 'How do you keep the original exception when throwing a new one?', options: ['Concatenate the messages', 'Pass it as the $previous argument', 'Use global $e', 'You cannot'], answer: 1, explain: 'new RuntimeException("msg", 0, $e) or previous: $e; read it with getPrevious().' },
    { chapterId: 'errors', q: 'What does set_error_handler() commonly do in modern apps?', options: ['Disables errors', 'Converts warnings into ErrorException', 'Sends emails', 'Restarts PHP'], answer: 1, explain: 'Throwing on warnings makes hidden problems visible and catchable.' },
    { chapterId: 'errors', q: 'Which PSR standard defines the logger interface?', options: ['PSR-1', 'PSR-3', 'PSR-4', 'PSR-12'], answer: 1, explain: 'PSR-3 LoggerInterface is implemented by Monolog and frameworks.' },
  ],
};
