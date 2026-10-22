// PHP chapter: Advanced PHP. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'advanced',
  title: 'Advanced PHP',
  description: 'Generators, iterators, SPL, reflection, closures and memory',
  icon: 'psychology',
  lessons: [
    {
      id: 'php-generators',
      title: 'Generators and yield',
      blocks: [
        { type: 'text', value: 'A generator is a function that yields values one at a time instead of building a whole array. Memory stays tiny even for millions of rows, which makes generators perfect for big files, exports and database cursors.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
function numbersArray(int $n): array
{
    $out = [];
    for ($i = 1; $i <= $n; $i++) {
        echo "  build $i\n";
        $out[] = $i;
    }
    return $out;               // ALL values exist in memory before the loop starts
}

function numbersLazy(int $n): Generator
{
    for ($i = 1; $i <= $n; $i++) {
        echo "  make $i\n";
        yield $i;              // pause here, hand out $i, resume on the next loop
    }
}

echo "Array:\n";
foreach (numbersArray(3) as $n) echo "  use $n\n";

echo "Generator:\n";
foreach (numbersLazy(3) as $n) echo "  use $n\n";   // made and used one at a time

// A million values, but only one exists at any moment
$sum = 0;
foreach ((function () { for ($i = 1; $i <= 1000000; $i++) yield $i; })() as $n) $sum += $n;
echo "Sum of 1..1,000,000 = ", number_format($sum), "\n";

// Keys, and a pipeline of generators
function readRows(): Generator
{
    yield 'r1' => ['name' => 'Nadia', 'score' => 91];
    yield 'r2' => ['name' => 'Rafi', 'score' => 58];
    yield 'r3' => ['name' => 'Mim', 'score' => 77];
}
function onlyPassed(iterable $rows): Generator
{
    foreach ($rows as $key => $row) if ($row['score'] >= 60) yield $key => $row;
}
foreach (onlyPassed(readRows()) as $key => $row) echo "$key {$row['name']}\n";

// yield from delegates to another generator
function all(): Generator { yield 1; yield from [2, 3]; yield 4; }
echo implode(',', iterator_to_array(all(), false)), "\n";` },
        { type: 'note', value: 'Laravel\'s LazyCollection and cursor() are built on generators. Remember: a generator can be iterated only once.' },
      ],
    },
    {
      id: 'php-iterators',
      title: 'Iterator, IteratorAggregate, ArrayAccess, Countable',
      blocks: [
        { type: 'text', value: 'Implementing these SPL interfaces lets your objects behave like arrays: foreach, $obj[\'key\'] and count(). Collection classes in frameworks are built this way.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

/** @implements IteratorAggregate<int, mixed> */
final class Collection implements IteratorAggregate, ArrayAccess, Countable, JsonSerializable
{
    public function __construct(private array $items = []) {}

    public function getIterator(): Generator { yield from $this->items; }
    public function offsetExists(mixed $k): bool { return isset($this->items[$k]); }
    public function offsetGet(mixed $k): mixed { return $this->items[$k] ?? null; }
    public function offsetSet(mixed $k, mixed $v): void { $k === null ? $this->items[] = $v : $this->items[$k] = $v; }
    public function offsetUnset(mixed $k): void { unset($this->items[$k]); }
    public function count(): int { return count($this->items); }
    public function jsonSerialize(): array { return $this->items; }

    // Fluent helpers return NEW collections (immutable style)
    public function map(callable $fn): self { return new self(array_map($fn, $this->items)); }
    public function filter(callable $fn): self { return new self(array_values(array_filter($this->items, $fn))); }
    public function sum(?callable $fn = null): int|float { return array_sum($fn ? array_map($fn, $this->items) : $this->items); }
}

$prices = new Collection([1200, 450, 15500, 800]);
$prices[] = 99;                                         // offsetSet
echo count($prices), " items, first is ", $prices[0], "\n";

$cheap = $prices->filter(fn($p) => $p < 1000)->map(fn($p) => $p * 1.15);
foreach ($cheap as $i => $p) echo "$i: $p\n";
echo json_encode($cheap), "\n";
echo "Total: ", $prices->sum(), "\n";` },
      ],
    },
    {
      id: 'php-spl-structures',
      title: 'SPL Data Structures',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Stack (LIFO)
$stack = new SplStack();
$stack->push('page1'); $stack->push('page2'); $stack->push('page3');
echo "Back to: ", $stack->pop(), " -> now on ", $stack->top(), "\n";

// Queue (FIFO)
$queue = new SplQueue();
foreach (['job A', 'job B', 'job C'] as $job) $queue->enqueue($job);
while (!$queue->isEmpty()) echo "Processing ", $queue->dequeue(), "\n";

// Priority queue: highest priority first
$tasks = new SplPriorityQueue();
$tasks->insert('send newsletter', 1);
$tasks->insert('process payment', 10);
$tasks->insert('resize image', 5);
while ($tasks->valid()) { echo $tasks->extract(), "\n"; }

// Min-heap: always get the smallest
$heap = new SplMinHeap();
foreach ([42, 7, 19, 3] as $n) $heap->insert($n);
echo "Smallest: ", $heap->extract(), ", next: ", $heap->top(), "\n";

// Fixed array: less memory for large integer-indexed lists
$fixed = new SplFixedArray(3);
$fixed[0] = 'a';
echo $fixed->getSize(), "\n";

// Object storage: a set of objects (or object => data map)
$online = new SplObjectStorage();
$u1 = new stdClass(); $u2 = new stdClass();
$online->attach($u1); $online->attach($u2); $online->attach($u1);
echo count($online), " unique users online\n";` },
      ],
    },
    {
      id: 'php-reflection',
      title: 'Reflection',
      blocks: [
        { type: 'text', value: 'The Reflection API lets code inspect classes, methods, parameters and attributes at runtime. Frameworks use it for autowiring, routing, validation and ORMs. You will read it far more than you write it.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
final class Invoice
{
    public const CURRENCY = 'BDT';
    public function __construct(
        public readonly int $id,
        private int $total = 0,
        protected ?string $note = null,
    ) {}

    /** Mark the invoice as paid. */
    public function pay(int $amount, string $method = 'bkash'): bool { return true; }
    private function secret(): string { return 'hidden'; }
}

$ref = new ReflectionClass(Invoice::class);
echo $ref->getShortName(), " is final? ", var_export($ref->isFinal(), true), "\n";

foreach ($ref->getProperties() as $p) {
    $vis = $p->isPublic() ? 'public' : ($p->isPrivate() ? 'private' : 'protected');
    echo "property $vis {$p->getType()} \${$p->getName()}", $p->isReadOnly() ? ' (readonly)' : '', "\n";
}

$pay = $ref->getMethod('pay');
foreach ($pay->getParameters() as $param) {
    echo "param {$param->getType()} \${$param->getName()}",
        $param->isOptional() ? ' = ' . var_export($param->getDefaultValue(), true) : '', "\n";
}
echo trim($pay->getDocComment(), "/* \n"), "\n";
print_r($ref->getConstants());

// Calling a private method (for debugging/tests only!)
$secret = $ref->getMethod('secret');
echo $secret->invoke(new Invoice(1)), "\n";` },
      ],
    },
    {
      id: 'php-closures-advanced',
      title: 'Closure Binding and Memoization',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Closure::bind / call: run a closure with another object's $this
final class Counter { private int $count = 41; }

$peek = fn() => $this->count + 1;
echo Closure::bind($peek, new Counter(), Counter::class)(), "\n";
echo (function () { return $this->count; })->call(new Counter()), "\n";

// Memoization: cache the results of an expensive pure function
function memoize(callable $fn): Closure
{
    $cache = [];
    return function (...$args) use ($fn, &$cache) {
        $key = serialize($args);
        return $cache[$key] ??= $fn(...$args);
    };
}

$calls = 0;
$slowSquare = function (int $n) use (&$calls) { $calls++; return $n * $n; };
$fastSquare = memoize($slowSquare);
foreach ([4, 4, 5, 4, 5] as $n) $fastSquare($n);
echo "Computed $calls times for 5 calls\n";

// Recursive memoized Fibonacci
$fib = memoize(function (int $n) use (&$fib) {
    return $n < 2 ? $n : $fib($n - 1) + $fib($n - 2);
});
echo $fib(40), "\n";   // without memoization this makes over 300 million calls

// Currying and composition
$compose = fn(callable ...$fns) => fn($x) => array_reduce($fns, fn($acc, $f) => $f($acc), $x);
$slug = $compose('trim', 'strtolower', fn($s) => preg_replace('/\s+/', '-', $s));
echo $slug('  Advanced PHP Closures '), "\n";` },
      ],
    },
    {
      id: 'php-memory-internals',
      title: 'Memory, References and Garbage Collection',
      blocks: [
        { type: 'text', value: 'PHP values are reference-counted. Arrays and strings are copied lazily (copy-on-write): assigning a 100 MB array to a new variable is free until one of them is changed. Objects are always handled by reference handle.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Run this with php on your computer (Try it's sandbox does not report memory)
$big = range(1, 200000);
$before = memory_get_usage();
$copy = $big;                                   // no real copy yet
echo "After assignment: +", memory_get_usage() - $before, " bytes\n";
$copy[] = 1;                                    // now it is copied
echo "After modification: +", round((memory_get_usage() - $before) / 1024), " KB\n";

// Output on 64-bit PHP 8.2:
// After assignment: +32 bytes      (only the new variable itself)
// After modification: +6144 KB     (now the 200,000 elements are really copied)` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// The classic foreach-by-reference trap
$list = [1, 2, 3];
foreach ($list as &$v) { $v *= 10; }
foreach ($list as $v) {}                        // $v is still a reference to $list[2]!
print_r($list);                                 // [10, 20, 20]
unset($v);                                      // ALWAYS unset after a by-ref loop

// WeakMap: cache data per object without keeping the object alive
$cache = new WeakMap();
$user = new stdClass();
$cache[$user] = ['permissions' => ['read', 'write']];
echo count($cache), " cached\n";
unset($user);                                   // object is freed...
echo count($cache), " cached\n";                // ...and its cache entry disappears

// Cycles are cleaned by the garbage collector
$a = new stdClass(); $b = new stdClass();
$a->other = $b; $b->other = $a;
unset($a, $b);
echo gc_collect_cycles() >= 0 ? "GC ran\n" : '';` },
        { type: 'note', value: 'Long-running PHP (queue workers, Swoole, RoadRunner, FrankenPHP) keeps objects alive between jobs. Watch for growing static arrays and caches, and restart workers periodically.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'advanced', q: 'What is the main benefit of a generator?', options: ['It runs in parallel', 'It produces values lazily, using little memory', 'It caches results', 'It is faster than arrays for small data'], answer: 1, explain: 'Only one value exists at a time.' },
    { chapterId: 'advanced', q: 'Which interface lets an object be used with $obj["key"]?', options: ['Iterator', 'Countable', 'ArrayAccess', 'JsonSerializable'], answer: 2, explain: 'ArrayAccess defines offsetGet, offsetSet, offsetExists and offsetUnset.' },
    { chapterId: 'advanced', q: 'Which SPL structure returns items in First-In-First-Out order?', options: ['SplStack', 'SplQueue', 'SplMinHeap', 'SplFixedArray'], answer: 1, explain: 'A queue is FIFO; a stack is LIFO.' },
    { chapterId: 'advanced', q: 'What do frameworks mainly use Reflection for?', options: ['Encrypting data', 'Inspecting classes and parameters for autowiring, routing and attributes', 'Speeding up loops', 'Rendering templates'], answer: 1, explain: 'DI containers and routers read constructor types and attributes via Reflection.' },
    { chapterId: 'advanced', q: 'Why unset($v) after foreach ($arr as &$v)?', options: ['To free memory', 'Because $v stays a reference to the last element and later code can overwrite it', 'It is required syntax', 'To reset the array pointer'], answer: 1, explain: 'The leftover reference silently changes the last element.' },
    { chapterId: 'advanced', q: 'What does copy-on-write mean for $b = $a with a big array?', options: ['The array is copied immediately', 'The copy happens only when one of them is modified', 'Both variables become references', 'The array is serialized'], answer: 1, explain: 'Assignment is cheap until a write happens.' },
  ],
};
