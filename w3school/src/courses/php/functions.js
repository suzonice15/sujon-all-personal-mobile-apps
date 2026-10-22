// PHP chapter: Functions. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'functions',
  title: 'Functions',
  description: 'Parameters, types, scope, closures and callables',
  icon: 'functions',
  lessons: [
    {
      id: 'php-functions-basics',
      title: 'Defining Functions',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

function greet(string $name): string
{
    return "Hello, $name!";
}

function calculateDiscount(float $price, float $percent = 10): float
{
    return $price - ($price * $percent / 100);
}

function logMessage(string $msg): void   // void: returns nothing
{
    echo "[LOG] $msg\n";
}

echo greet("Sumaiya"), "\n";
echo calculateDiscount(500), "\n";        // default 10%
echo calculateDiscount(500, 25), "\n";
logMessage("Order placed");

// Functions can be called before they are defined in the file
echo square(9), "\n";
function square(int $n): int { return $n * $n; }` },
        { type: 'list', items: [
          'Name functions with a verb in camelCase: calculateTotal(), sendEmail().',
          'Parameters with defaults must come after required ones.',
          'Return types: string, int, float, bool, array, void, never, ?string (nullable), static, self, mixed.',
        ] },
      ],
    },
    {
      id: 'php-named-variadic',
      title: 'Named Arguments, Variadics and Spread',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
function createUser(string $name, string $role = 'student', bool $active = true): string
{
    return "$name ($role, " . ($active ? 'active' : 'inactive') . ")";
}

// Named arguments (PHP 8): skip optional ones and make calls readable
echo createUser(name: 'Rafi', active: false), "\n";

// Variadic: collect any number of arguments into an array
function sum(int ...$numbers): int
{
    return array_sum($numbers);
}
echo sum(1, 2, 3, 4), "\n";

// Spread: unpack an array into arguments
$values = [10, 20, 30];
echo sum(...$values), "\n";

// Spread with string keys = named arguments
$options = ['name' => 'Mitu', 'role' => 'teacher'];
echo createUser(...$options), "\n";

// Built-in functions accept named args too
echo str_pad(string: '5', length: 3, pad_string: '0', pad_type: STR_PAD_LEFT), "\n";` },
        { type: 'note', value: 'Named arguments make parameter names part of your public API: renaming a parameter can break callers.' },
      ],
    },
    {
      id: 'php-nullable-union',
      title: 'Nullable, Union and never Types',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// ?Type = Type or null
function findUserName(int $id): ?string
{
    $users = [1 => 'Arif', 2 => 'Tania'];
    return $users[$id] ?? null;
}
var_dump(findUserName(2), findUserName(99));

// Union types: one of several types
function formatId(int|string $id): string
{
    return is_int($id) ? sprintf('#%05d', $id) : strtoupper($id);
}
echo formatId(42), " ", formatId('ab-7'), "\n";

// never: the function always throws or exits
function fail(string $message): never
{
    throw new RuntimeException($message);
}

try {
    fail("Something broke");
} catch (RuntimeException $e) {
    echo "Caught: ", $e->getMessage(), "\n";
}` },
      ],
    },
    {
      id: 'php-scope',
      title: 'Scope, static and References',
      blocks: [
        { type: 'text', value: 'A function has its own scope: it cannot see variables from outside unless you pass them in. Avoid the global keyword; pass values as parameters instead.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$siteName = "CodeNest";

function show()
{
    // echo $siteName;  // Warning: undefined variable (outside scope)
    return "functions have their own scope";
}
echo show(), "\n";

// static: keeps its value between calls
function counter(): int
{
    static $count = 0;
    return ++$count;
}
counter(); counter();
echo "Called ", counter(), " times\n";

// By value (default): the function gets a copy
function addItemCopy(array $list) { $list[] = 'new'; }
// By reference (&): the function changes the caller's variable
function addItemRef(array &$list) { $list[] = 'new'; }

$items = ['a'];
addItemCopy($items);
echo count($items), "\n";   // 1
addItemRef($items);
echo count($items), "\n";   // 2` },
        { type: 'note', value: 'Arrays are copied lazily (copy-on-write), so passing big arrays by value is cheap. Use references only when you really need to modify the caller\'s variable; returning a new value is usually clearer.' },
      ],
    },
    {
      id: 'php-closures',
      title: 'Anonymous Functions, Closures and Arrow Functions',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Anonymous function stored in a variable
$double = function (int $n): int {
    return $n * 2;
};
echo $double(21), "\n";

// Closures capture outer variables with use (by value)
$rate = 0.15;
$withTax = function (float $price) use ($rate): float {
    return $price * (1 + $rate);
};
echo $withTax(200), "\n";

// use by reference to change the outer variable
$total = 0;
$add = function (int $n) use (&$total) { $total += $n; };
$add(5); $add(10);
echo "Total: $total\n";

// Arrow functions (fn) capture outer variables automatically, by value
$discount = 50;
$apply = fn(int $price) => $price - $discount;
echo $apply(300), "\n";

// Factory: a function that returns a function
function multiplier(int $factor): Closure
{
    return fn(int $x) => $x * $factor;
}
$triple = multiplier(3);
echo $triple(7), "\n";

// Used with array functions
print_r(array_map(fn($p) => $p * 2, [1, 2, 3]));` },
      ],
    },
    {
      id: 'php-callables-recursion',
      title: 'Callables and Recursion',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Different ways to pass a function around
function shout(string $s): string { return strtoupper($s) . '!'; }

$words = ['hi', 'bye'];
print_r(array_map('shout', $words));            // string name
print_r(array_map(shout(...), $words));         // PHP 8.1 first-class callable
print_r(array_map(strrev(...), $words));        // works with built-ins too

class Formatter {
    public static function bracket(string $s): string { return "[$s]"; }
}
print_r(array_map([Formatter::class, 'bracket'], $words));

// Recursion: a function calling itself
function factorial(int $n): int
{
    return $n <= 1 ? 1 : $n * factorial($n - 1);
}
echo factorial(10), "\n";

// Walk a nested menu
$menu = ['Home' => [], 'Courses' => ['PHP' => [], 'JS' => ['React' => []]]];
function printMenu(array $items, int $depth = 0): void
{
    foreach ($items as $name => $children) {
        echo str_repeat('  ', $depth), "- $name\n";
        printMenu($children, $depth + 1);
    }
}
printMenu($menu);` },
        { type: 'note', value: 'Every recursive function needs a base case (here $n <= 1) or it recurses forever and crashes. For very deep data, a loop with a stack is safer.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'functions', q: 'What does the return type ?string mean?', options: ['Optional parameter', 'String or null', 'Any type', 'A string reference'], answer: 1, explain: '? makes a type nullable.' },
    { chapterId: 'functions', q: 'How do you call createUser() setting only $active by name?', options: ['createUser($active = false)', 'createUser(active: false)', 'createUser(["active" => false])', 'createUser(->active false)'], answer: 1, explain: 'Named arguments use name: value (PHP 8).' },
    { chapterId: 'functions', q: 'What does int ...$numbers do in a parameter list?', options: ['Spreads an array', 'Collects all remaining arguments into an array', 'Makes the parameter optional', 'Passes by reference'], answer: 1, explain: 'That is a variadic parameter.' },
    { chapterId: 'functions', q: 'How does an anonymous function access an outer variable $rate?', options: ['global $rate', 'use ($rate)', 'It sees it automatically', '$this->rate'], answer: 1, explain: 'Closures import outer variables with use. Arrow functions (fn) capture automatically.' },
    { chapterId: 'functions', q: 'What does a static variable inside a function do?', options: ['Makes it global', 'Keeps its value between calls', 'Makes it constant', 'Shares it with all classes'], answer: 1, explain: 'static variables are initialised once and remember their value.' },
    { chapterId: 'functions', q: 'What does strlen(...) create in PHP 8.1?', options: ['A syntax error', 'A Closure for strlen (first-class callable)', 'A call with no arguments', 'A spread array'], answer: 1, explain: 'The (...) syntax turns any function or method into a Closure.' },
    { chapterId: 'functions', q: 'What does & before a parameter mean?', options: ['The value is copied', 'The parameter is passed by reference', 'The parameter is optional', 'The parameter is a constant'], answer: 1, explain: 'Changes inside the function then affect the caller\'s variable.' },
  ],
};
