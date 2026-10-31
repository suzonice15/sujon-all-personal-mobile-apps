// PHP chapter: Interview Preparation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'interview',
  title: 'Interview Preparation',
  description: 'The questions PHP employers ask most, with answers',
  icon: 'work',
  lessons: [
    {
      id: 'php-interview-core',
      title: 'Top Core Questions',
      blocks: [
        { type: 'text', value: 'Practise answering each one out loud in two or three sentences, then give a tiny example. Interviewers care about clear understanding more than memorised definitions.' },
        { type: 'heading', value: '1. == vs ===' },
        { type: 'text', value: '== compares after type juggling; === compares value and type. Use === by default. PHP 8 changed number-to-string comparison, so 0 == "a" is now false.' },
        { type: 'heading', value: '2. include vs require (and _once)' },
        { type: 'text', value: 'require stops with a fatal error when the file is missing, include only warns. The _once versions skip files already loaded. Modern code relies on Composer autoloading.' },
        { type: 'heading', value: '3. How does a PHP request work?' },
        { type: 'text', value: 'Nginx receives the request and passes it to PHP-FPM, a worker runs public/index.php, builds the response and returns it. Each request starts with a clean state (shared nothing), so data lives in databases, sessions or caches.' },
        { type: 'heading', value: '4. Sessions vs cookies' },
        { type: 'text', value: 'A cookie is stored in the browser and sent with each request. A session stores data on the server; the browser only holds the session id cookie.' },
        { type: 'heading', value: '5. Abstract class vs interface vs trait' },
        { type: 'text', value: 'An interface is a contract with no code; a class can implement many. An abstract class can hold code and state but a class extends only one. A trait copies methods into classes for horizontal reuse.' },
        { type: 'heading', value: '6. self vs static' },
        { type: 'text', value: 'self:: refers to the class where the code is written; static:: refers to the class that was actually called (late static binding).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Classic output questions: predict, then run
var_dump("10" == "1e1");        // true: both numeric strings equal 10
var_dump(100 == "1e2");         // true
var_dump("abc" == 0);           // false in PHP 8
var_dump(null == false, [] == false);
var_dump(0.1 + 0.2 == 0.3);     // false: floating point
var_dump(intdiv(-7, 2), -7 % 2);
$a = [1, 2, 3];
$b = $a;
$b[] = 4;
echo count($a), "\n";           // 3: arrays are copied by value
$o = new stdClass(); $p = $o; $p->x = 1;
var_dump(isset($o->x));         // true: objects share a handle` },
      ],
    },
    {
      id: 'php-interview-coding',
      title: 'Common Coding Challenges',
      blocks: [
        { type: 'text', value: 'Write them first without looking, explain your approach and complexity, then compare.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// 1. Is it a palindrome? (ignore case, spaces and punctuation)
function isPalindrome(string $s): bool
{
    $clean = preg_replace('/[^a-z0-9]/', '', strtolower($s));
    return $clean === strrev($clean);
}
var_dump(isPalindrome('A man, a plan, a canal: Panama'));

// 2. Count word frequency, most common first
function wordFrequency(string $text): array
{
    $words = str_word_count(strtolower($text), 1);
    $counts = array_count_values($words);
    arsort($counts);
    return $counts;
}
print_r(array_slice(wordFrequency('the cat and the hat and the bat'), 0, 3, true));

// 3. Two sum: indexes of two numbers that add up to a target, O(n)
function twoSum(array $nums, int $target): ?array
{
    $seen = [];
    foreach ($nums as $i => $n) {
        if (isset($seen[$target - $n])) return [$seen[$target - $n], $i];
        $seen[$n] = $i;
    }
    return null;
}
print_r(twoSum([2, 7, 11, 15], 18));

// 4. Flatten a nested array
function flatten(array $items): array
{
    $out = [];
    array_walk_recursive($items, function ($v) use (&$out) { $out[] = $v; });
    return $out;
}
echo implode(',', flatten([1, [2, [3, [4]], 5]])), "\n";

// 5. Group records by a key
function groupBy(array $rows, string $key): array
{
    $groups = [];
    foreach ($rows as $row) $groups[$row[$key]][] = $row['name'];
    return $groups;
}
print_r(groupBy([['name' => 'A', 'dept' => 'IT'], ['name' => 'B', 'dept' => 'HR'], ['name' => 'C', 'dept' => 'IT']], 'dept'));

// 6. Validate balanced brackets with a stack
function balanced(string $s): bool
{
    $pairs = [')' => '(', ']' => '[', '}' => '{'];
    $stack = [];
    foreach (str_split($s) as $ch) {
        if (in_array($ch, $pairs, true)) $stack[] = $ch;
        elseif (isset($pairs[$ch]) && array_pop($stack) !== $pairs[$ch]) return false;
    }
    return $stack === [];
}
var_dump(balanced('{[()()]}'), balanced('([)]'));` },
      ],
    },
    {
      id: 'php-interview-senior',
      title: 'Senior-Level Topics',
      blocks: [
        { type: 'text', value: 'For mid and senior roles, expect design and "how would you" questions. Answer with trade-offs, not only one solution.' },
        { type: 'list', items: [
          'How do you prevent SQL injection, XSS and CSRF? (prepared statements, output escaping, tokens + SameSite cookies)',
          'How would you make a slow page fast? (measure with a profiler, fix N+1 and indexes, cache, queue slow work, OPcache)',
          'Explain dependency injection and why it helps testing.',
          'What are SOLID principles? Give an example of Open/Closed from your own code.',
          'How do you design a REST API: versioning, status codes, pagination, authentication, rate limiting?',
          'How do you deploy without downtime and roll back a bad release?',
          'How does a Laravel request flow? (index.php -> kernel -> middleware -> router -> controller -> response -> terminate)',
          'Active Record vs Data Mapper ORMs: pros and cons.',
          'How do sessions work with several servers behind a load balancer? (shared store: Redis or database)',
          'What happens if two requests buy the last item at the same time? (transactions, SELECT ... FOR UPDATE, unique constraints, idempotency keys)',
        ] },
        { type: 'note', value: 'Prepare two or three stories about real problems you solved: the situation, what you did, the result, and what you learned. Your projects from this course are perfect material.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'interview', q: 'What does var_dump(0.1 + 0.2 == 0.3) print?', options: ['bool(true)', 'bool(false)', 'float(0.3)', 'An error'], answer: 1, explain: 'Binary floating point cannot represent these decimals exactly.' },
    { chapterId: 'interview', q: 'After $b = $a; $b[] = 4; with $a = [1,2,3], what is count($a)?', options: ['3', '4', '0', 'An error'], answer: 0, explain: 'Arrays are assigned by value (copy-on-write).' },
    { chapterId: 'interview', q: 'Which approach solves "two sum" in O(n)?', options: ['Two nested loops', 'A hash map of seen values', 'Sorting then printing', 'Recursion'], answer: 1, explain: 'Look up target - n in a map of values you already saw.' },
    { chapterId: 'interview', q: 'How do two servers share user sessions?', options: ['They cannot', 'Store sessions in a shared store like Redis or the database', 'Copy files every minute', 'Use longer cookies'], answer: 1, explain: 'Default file sessions are local to one server.' },
    { chapterId: 'interview', q: 'Two customers buy the last item at the same moment. What helps?', options: ['A bigger server', 'A transaction with row locking (SELECT ... FOR UPDATE)', 'Caching the stock', 'Sending emails later'], answer: 1, explain: 'Locking makes the second request wait and see the updated stock.' },
  ],
};
