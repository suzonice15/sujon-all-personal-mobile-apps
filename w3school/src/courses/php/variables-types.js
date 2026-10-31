// PHP chapter: Variables and Data Types. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'variables-types',
  title: 'Variables & Data Types',
  description: 'Variables, types, constants and type juggling',
  icon: 'data-object',
  lessons: [
    {
      id: 'php-variables',
      title: 'Variables',
      blocks: [
        { type: 'text', value: 'A variable starts with $, followed by a letter or underscore. It is created the first time you assign to it, and its type comes from the value.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$name = "Nadia";       // string
$age = 24;             // int
$height = 1.62;        // float
$isStudent = true;     // bool

echo "$name is $age years old.\n";        // double quotes interpolate variables
echo 'Single quotes: $name' . "\n";        // single quotes do not

$age = $age + 1;       // reassign
$age++;                // increment
echo "Next year: $age\n";

// Variable names are case-sensitive
$city = "Dhaka";
$City = "Chattogram";
echo $city, " / ", $City, "\n";` },
        { type: 'list', items: [
          'Naming: use camelCase ($firstName) or snake_case ($first_name) and stay consistent.',
          'A variable that was never assigned is undefined: reading it gives a Warning and the value null.',
          'The . operator joins (concatenates) strings.',
        ] },
      ],
    },
    {
      id: 'php-data-types',
      title: 'The Data Types',
      blocks: [
        { type: 'text', value: 'PHP has scalar types (int, float, string, bool), compound types (array, object, callable, iterable) and special types (null, resource). var_dump() shows both the type and the value; it is your best debugging friend.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
var_dump(42);              // int
var_dump(3.14);            // float
var_dump("hello");         // string (with its length)
var_dump(false);           // bool
var_dump(null);            // NULL
var_dump([1, 2, 3]);       // array
var_dump(new DateTime('2026-01-01'));  // object

echo gettype(10), "\n";            // integer
echo get_debug_type(10), "\n";     // int (PHP 8: nicer names)
echo get_debug_type(1.5), "\n";    // float
echo PHP_INT_SIZE * 8, "-bit ints, max ", PHP_INT_MAX, "\n";` },
        { type: 'note', value: 'print_r() prints arrays and objects in a readable form without types; var_export() prints valid PHP code. Use var_dump() when the exact type matters.' },
        { type: 'note', value: 'Try it runs a 32-bit build of PHP on your phone, so PHP_INT_MAX shows 2147483647 here. Real servers are 64-bit: PHP_INT_MAX is 9223372036854775807. An int that grows past the maximum silently becomes a float.' },
      ],
    },
    {
      id: 'php-type-juggling',
      title: 'Type Juggling and Casting',
      blocks: [
        { type: 'text', value: 'PHP converts types automatically when an operation needs it ("type juggling"). This is convenient but can surprise you, so learn the rules and cast explicitly when it matters.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
var_dump("10" + 5);        // int(15): numeric string becomes a number
var_dump("2.5" * 2);       // float(5)
var_dump(10 . "");         // string "10"
var_dump(7 / 2);           // float(3.5): / always may return float
var_dump(intdiv(7, 2));    // int(3)

// Explicit casts
var_dump((int) "42abc");   // int(42): reads leading digits
var_dump((int) 9.99);      // int(9): truncates toward zero
var_dump((string) 3.0);    // "3"
var_dump((bool) "0");      // false! "0" is falsy
var_dump((bool) "false");  // true: any other non-empty string
var_dump((array) "x");     // ["x"]

// PHP 8: arithmetic with a non-numeric string throws TypeError
try {
    $r = "abc" * 2;
} catch (TypeError $e) {
    echo "TypeError: ", $e->getMessage(), "\n";
}` },
        { type: 'heading', value: 'Falsy values' },
        { type: 'text', value: 'These are false in a boolean context: false, 0, 0.0, "" (empty string), "0", null and [] (empty array). Everything else is true.' },
      ],
    },
    {
      id: 'php-constants',
      title: 'Constants',
      blocks: [
        { type: 'text', value: 'A constant holds a value that never changes. It has no $ and is global. Use const at the top level or in classes, and define() when the name or value is computed at runtime.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
const APP_NAME = "CodeNest";
const TAX_RATE = 0.15;
define('UPLOAD_DIR', __DIR__ . '/uploads');

echo APP_NAME, "\n";
echo 1000 * TAX_RATE, "\n";

// Built-in constants
echo PHP_VERSION, "\n";
echo PHP_EOL === "\n" ? "Unix line endings\n" : "Windows line endings\n";
echo M_PI, "\n";

// Magic constants change depending on where they are used
echo __LINE__, "\n";       // current line number
echo basename(__FILE__), "\n";
function where() { return __FUNCTION__; }
echo where(), "\n";` },
        { type: 'note', value: 'Constant names are UPPER_SNAKE_CASE by convention. Since PHP 8.3 class constants can also have types: const string VERSION = "1.0";' },
      ],
    },
    {
      id: 'php-null-and-isset',
      title: 'null, isset() and empty()',
      blocks: [
        { type: 'text', value: 'null means "no value". Before you read something that may not exist (an array key, a form field), check it.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$user = ['name' => 'Rahim', 'phone' => null, 'score' => 0];

var_dump(isset($user['name']));    // true
var_dump(isset($user['phone']));   // false: isset is false for null
var_dump(isset($user['email']));   // false: missing key, no warning
var_dump(array_key_exists('phone', $user)); // true: key exists even if null

var_dump(empty($user['score']));   // true: 0 is "empty"
var_dump(is_null($user['phone'])); // true

// Null coalescing: use a default when missing or null
$email = $user['email'] ?? 'not set';
echo $email, "\n";

$settings = [];
$settings['theme'] ??= 'dark';    // assign only if not set
echo $settings['theme'], "\n";` },
        { type: 'list', items: [
          'isset(): exists and is not null.',
          'empty(): does not exist or is falsy (so 0 and "0" count as empty, careful with numbers).',
          '?? is the clean way to read optional input: $_GET[\'page\'] ?? 1',
        ] },
      ],
    },
    {
      id: 'php-strict-types',
      title: 'Type Declarations and strict_types',
      blocks: [
        { type: 'text', value: 'Modern PHP code declares types for parameters, return values and properties. By default PHP still converts compatible scalars; declare(strict_types=1) at the top of a file turns that off so a wrong type throws a TypeError. Professional projects use strict types everywhere.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

function addTax(float $price, float $rate = 0.15): float
{
    return round($price * (1 + $rate), 2);
}

echo addTax(100), "\n";       // int 100 is allowed for float (the only widening allowed)

try {
    echo addTax("100"), "\n"; // string is rejected in strict mode
} catch (TypeError $e) {
    echo get_class($e), ": ", $e->getMessage(), "\n";
}` },
        { type: 'note', value: 'declare(strict_types=1) must be the very first statement in the file, and it applies to calls made FROM that file.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'variables-types', q: 'How does every PHP variable name start?', options: ['@', '$', '#', '&'], answer: 1, explain: 'Variables start with $, like $name.' },
    { chapterId: 'variables-types', q: 'What does echo \'Hi $name\'; print?', options: ['Hi and the value of $name', 'Hi $name', 'An error', 'Nothing'], answer: 1, explain: 'Single-quoted strings do not interpolate variables.' },
    { chapterId: 'variables-types', q: 'Which value is falsy in PHP?', options: ['"false"', '"0"', '" "', '[0]'], answer: 1, explain: 'The string "0" is falsy; "false", a space and a non-empty array are truthy.' },
    { chapterId: 'variables-types', q: 'What does isset($a[\'x\']) return when $a[\'x\'] is null?', options: ['true', 'false', 'null', 'It throws'], answer: 1, explain: 'isset() is false for null values. Use array_key_exists() to test only the key.' },
    { chapterId: 'variables-types', q: 'What does $x = $input ?? \'guest\'; do?', options: ['Compares $input to guest', 'Uses guest when $input is missing or null', 'Uses guest when $input is falsy', 'Throws when $input is null'], answer: 1, explain: '?? returns the left side unless it is undefined or null.' },
    { chapterId: 'variables-types', q: 'What is the effect of declare(strict_types=1)?', options: ['Variables must be declared before use', 'Scalar arguments are no longer converted; a wrong type throws TypeError', 'Disables warnings', 'Makes all properties readonly'], answer: 1, explain: 'In strict mode, passing "100" to a float parameter throws a TypeError.' },
    { chapterId: 'variables-types', q: 'Which function shows the type and value of a variable?', options: ['echo', 'print', 'var_dump', 'printf'], answer: 2, explain: 'var_dump() prints type, length and value.' },
  ],
};
