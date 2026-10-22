// PHP chapter: Operators and Control Flow. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'operators-control',
  title: 'Operators & Control Flow',
  description: 'Comparisons, conditions, match and loops',
  icon: 'call-split',
  lessons: [
    {
      id: 'php-operators',
      title: 'Arithmetic and Assignment Operators',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$a = 17;
$b = 5;

echo $a + $b, "\n";   // 22
echo $a - $b, "\n";   // 12
echo $a * $b, "\n";   // 85
echo $a / $b, "\n";   // 3.4
echo $a % $b, "\n";   // 2 (remainder)
echo $a ** 2, "\n";   // 289 (power)
echo fmod(7.5, 2), "\n"; // 1.5 (remainder for floats)

$total = 100;
$total += 50;   // 150
$total -= 20;   // 130
$total *= 2;    // 260
$total /= 4;    // 65
$total .= " Tk"; // string append
echo $total, "\n";

$i = 5;
echo $i++, " ", $i, "\n";   // 5 6 (post-increment returns the old value)
echo ++$i, "\n";            // 7` },
      ],
    },
    {
      id: 'php-comparison',
      title: 'Comparison: == vs ===',
      blocks: [
        { type: 'text', value: '== compares after type juggling; === compares value AND type. Use === by default. PHP 8 made == safer (comparing a number with a non-numeric string now compares them as strings), but surprises remain.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
var_dump(5 == "5");        // true  (string converted)
var_dump(5 === "5");       // false (different types)
var_dump(0 == "a");        // false in PHP 8 (was true in PHP 7!)
var_dump("1" == "01");     // true  (both numeric strings)
var_dump("abc" == "ABC");  // false
var_dump(null == false);   // true
var_dump(null === false);  // false
var_dump([1, 2] == [2 => 1]); // false

// Spaceship operator: -1, 0 or 1 (great for sorting)
echo 1 <=> 2, " ", 2 <=> 2, " ", 3 <=> 2, "\n";
echo "apple" <=> "banana", "\n";

// Logical operators
$age = 20; $hasId = true;
var_dump($age >= 18 && $hasId);
var_dump(!$hasId || $age > 60);` },
        { type: 'note', value: 'Prefer && and || over and / or: the word versions have lower precedence than =, so $x = true and false; sets $x to true.' },
      ],
    },
    {
      id: 'php-conditions',
      title: 'if, elseif, else and the Ternary',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$marks = 78;

if ($marks >= 80) {
    $grade = 'A+';
} elseif ($marks >= 70) {
    $grade = 'A';
} elseif ($marks >= 60) {
    $grade = 'A-';
} else {
    $grade = 'Below A-';
}
echo "Grade: $grade\n";

// Ternary for short choices
$status = $marks >= 33 ? 'Passed' : 'Failed';
echo $status, "\n";

// Short ternary ?: uses the left side if it is truthy
$nickname = '';
echo $nickname ?: 'Anonymous', "\n";

// Null coalescing ?? only checks for null/undefined
$input = ['qty' => 0];
echo $input['qty'] ?? 1, "\n";   // 0 (kept)
echo $input['qty'] ?: 1, "\n";   // 1 (0 is falsy)` },
        { type: 'note', value: 'Never nest ternaries without parentheses; PHP 8 even forbids it. Use if/elseif or match instead.' },
      ],
    },
    {
      id: 'php-match-switch',
      title: 'match and switch',
      blocks: [
        { type: 'text', value: 'match (PHP 8) is an expression that returns a value, compares strictly (===), needs no break and throws UnhandledMatchError if nothing matches. Prefer it over switch.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$status = 404;

$message = match ($status) {
    200, 201 => 'OK',
    301, 302 => 'Redirect',
    404 => 'Not Found',
    500 => 'Server Error',
    default => 'Unknown',
};
echo $message, "\n";

// match(true) replaces long if/elseif chains
$temp = 34;
$feel = match (true) {
    $temp >= 35 => 'Very hot',
    $temp >= 28 => 'Hot',
    $temp >= 18 => 'Pleasant',
    default => 'Cold',
};
echo $feel, "\n";

// switch: loose comparison (==) and fall-through, so break is required
$day = 'fri';
switch ($day) {
    case 'fri':
    case 'sat':
        echo "Weekend in Bangladesh\n";
        break;
    default:
        echo "Working day\n";
}

try {
    echo match ('xyz') { 'a' => 1 };
} catch (\UnhandledMatchError $e) {
    echo $e->getMessage(), "\n";
}` },
      ],
    },
    {
      id: 'php-loops',
      title: 'Loops: for, while, do-while, foreach',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// for: when you know how many times
for ($i = 1; $i <= 5; $i++) {
    echo $i, " ";
}
echo "\n";

// while: while a condition is true
$balance = 1000;
$months = 0;
while ($balance < 1500) {
    $balance *= 1.1;   // 10% growth
    $months++;
}
echo "Reached 1500 after $months months\n";

// do-while: runs at least once
$n = 10;
do {
    echo "do runs once even though n = $n\n";
} while ($n < 5);

// foreach: the main loop for arrays
$prices = ['tea' => 20, 'coffee' => 120, 'juice' => 80];
foreach ($prices as $item => $price) {
    echo "$item costs $price Tk\n";
}

// break and continue
foreach (range(1, 10) as $x) {
    if ($x % 2 === 0) continue;  // skip even numbers
    if ($x > 7) break;           // stop the loop
    echo $x, " ";
}
echo "\n";` },
        { type: 'note', value: 'Use the alternative syntax (foreach (...): ... endforeach;) inside HTML templates; it reads better than braces between tags.' },
      ],
    },
    {
      id: 'php-loop-practice',
      title: 'Practice: Nested Loops and Patterns',
      blocks: [
        { type: 'text', value: 'Loops inside loops are common for tables and grids. Read the examples, then change the numbers in Try it.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Multiplication table
for ($row = 1; $row <= 5; $row++) {
    for ($col = 1; $col <= 5; $col++) {
        echo str_pad($row * $col, 4, " ", STR_PAD_LEFT);
    }
    echo "\n";
}

// Pyramid
$height = 4;
for ($i = 1; $i <= $height; $i++) {
    echo str_repeat(" ", $height - $i) . str_repeat("*", 2 * $i - 1), "\n";
}

// FizzBuzz with match
foreach (range(1, 15) as $n) {
    echo match (true) {
        $n % 15 === 0 => "FizzBuzz",
        $n % 3 === 0 => "Fizz",
        $n % 5 === 0 => "Buzz",
        default => $n,
    }, " ";
}
echo "\n";` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'operators-control', q: 'What is the result of 5 === "5"?', options: ['true', 'false', 'null', 'An error'], answer: 1, explain: '=== also compares types: int vs string.' },
    { chapterId: 'operators-control', q: 'What does 10 % 3 return?', options: ['3', '1', '3.33', '0'], answer: 1, explain: '% gives the remainder: 10 = 3 * 3 + 1.' },
    { chapterId: 'operators-control', q: 'What does the spaceship operator 3 <=> 5 return?', options: ['true', '-1', '1', '2'], answer: 1, explain: 'It returns -1, 0 or 1: here the left side is smaller.' },
    { chapterId: 'operators-control', q: 'How does match compare values?', options: ['Loosely (==)', 'Strictly (===)', 'By reference', 'Case-insensitively'], answer: 1, explain: 'match uses strict comparison and returns a value.' },
    { chapterId: 'operators-control', q: 'What happens when no arm of a match fits and there is no default?', options: ['It returns null', 'It throws UnhandledMatchError', 'It returns false', 'The first arm runs'], answer: 1, explain: 'match is exhaustive: unmatched values throw.' },
    { chapterId: 'operators-control', q: 'Which loop always runs its body at least once?', options: ['for', 'while', 'do-while', 'foreach'], answer: 2, explain: 'do-while checks the condition after the body.' },
    { chapterId: 'operators-control', q: 'What does $qty ?: 1 return when $qty is 0?', options: ['0', '1', 'null', 'false'], answer: 1, explain: '?: uses the right side when the left is falsy; ?? would keep 0.' },
  ],
};
