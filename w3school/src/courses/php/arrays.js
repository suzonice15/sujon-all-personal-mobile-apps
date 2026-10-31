// PHP chapter: Arrays. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'arrays',
  title: 'Arrays',
  description: 'Indexed, associative and nested arrays and their functions',
  icon: 'view-list',
  lessons: [
    {
      id: 'php-arrays-basics',
      title: 'Indexed and Associative Arrays',
      blocks: [
        { type: 'text', value: 'A PHP array is an ordered map: every value has a key. Keys are integers (indexed array) or strings (associative array). The same type serves as list, dictionary, stack and queue.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Indexed array: keys 0, 1, 2...
$fruits = ['mango', 'banana', 'jackfruit'];
echo $fruits[0], "\n";
$fruits[] = 'lychee';          // append
echo count($fruits), " fruits\n";

// Associative array: your own keys
$student = [
    'name' => 'Tanvir',
    'age' => 19,
    'courses' => ['PHP', 'MySQL'],
];
echo $student['name'], " studies ", $student['courses'][0], "\n";
$student['email'] = 'tanvir@example.com';  // add a key
unset($student['age']);                    // remove a key
print_r($student);

// Keys keep insertion order
$scores = [];
$scores['math'] = 90;
$scores['english'] = 75;
foreach ($scores as $subject => $score) {
    echo "$subject: $score\n";
}` },
        { type: 'note', value: 'Use the short syntax [] rather than array(). Strings like "5" used as keys become the integer 5.' },
      ],
    },
    {
      id: 'php-multidimensional',
      title: 'Nested (Multidimensional) Arrays',
      blocks: [
        { type: 'text', value: 'Data from a database or an API usually arrives as a list of associative arrays. Learn to loop and pick from it fluently.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$products = [
    ['id' => 1, 'name' => 'Keyboard', 'price' => 1500, 'stock' => 12],
    ['id' => 2, 'name' => 'Mouse', 'price' => 450, 'stock' => 0],
    ['id' => 3, 'name' => 'Monitor', 'price' => 15500, 'stock' => 4],
];

foreach ($products as $p) {
    $state = $p['stock'] > 0 ? "in stock" : "sold out";
    printf("%-9s %6d Tk  %s\n", $p['name'], $p['price'], $state);
}

// array_column: pull one field (optionally keyed by another)
print_r(array_column($products, 'name'));
print_r(array_column($products, 'price', 'name'));

// Destructuring in foreach
foreach ($products as ['name' => $name, 'stock' => $stock]) {
    echo "$name: $stock\n";
}` },
      ],
    },
    {
      id: 'php-array-functions',
      title: 'Searching, Adding and Removing',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$queue = ['Ali', 'Bina', 'Chandra'];

array_push($queue, 'Dipu');     // add to end (same as $queue[] = ...)
array_unshift($queue, 'Zara');  // add to start
$first = array_shift($queue);   // remove from start
$last = array_pop($queue);      // remove from end
echo "$first / $last\n";
print_r($queue);

var_dump(in_array('Bina', $queue));          // value exists?
var_dump(array_search('Chandra', $queue));   // its key
var_dump(array_key_exists(5, $queue));

$a = ['x' => 1, 'y' => 2];
$b = ['y' => 20, 'z' => 30];
print_r(array_merge($a, $b));   // later string keys overwrite
print_r($a + $b);               // + keeps the FIRST value for duplicate keys
print_r([...$a, ...$b]);        // spread (PHP 8.1 supports string keys)

print_r(array_slice([10, 20, 30, 40, 50], 1, 3));
print_r(array_keys($b));
print_r(array_values($b));
print_r(array_unique([1, 2, 2, 3, 3, 3]));
print_r(array_reverse([1, 2, 3]));
print_r(range('a', 'e'));` },
      ],
    },
    {
      id: 'php-map-filter-reduce',
      title: 'array_map, array_filter, array_reduce',
      blocks: [
        { type: 'text', value: 'These three functions replace most hand-written loops. They return new arrays and leave the original untouched.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$orders = [
    ['id' => 101, 'total' => 1200, 'paid' => true],
    ['id' => 102, 'total' => 450, 'paid' => false],
    ['id' => 103, 'total' => 3200, 'paid' => true],
];

// map: transform every element
$totals = array_map(fn($o) => $o['total'], $orders);
print_r($totals);

// filter: keep elements where the callback returns true (keys are preserved!)
$paid = array_filter($orders, fn($o) => $o['paid']);
print_r(array_keys($paid));        // [0, 2]
$paid = array_values($paid);       // reindex to 0..n

// reduce: combine everything into one value
$revenue = array_reduce($orders, fn($sum, $o) => $o['paid'] ? $sum + $o['total'] : $sum, 0);
echo "Revenue: $revenue\n";

// filter by key
$data = ['name' => 'A', 'password' => 'secret', 'email' => 'a@x.com'];
$safe = array_filter($data, fn($key) => $key !== 'password', ARRAY_FILTER_USE_KEY);
print_r($safe);

// map with keys
$prices = ['tea' => 20, 'coffee' => 120];
$labels = array_map(fn($k, $v) => "$k = $v Tk", array_keys($prices), $prices);
print_r($labels);

// PHP 8.4 adds array_find(), array_any(), array_all(). On 8.3 write them yourself:
$expensive = array_values(array_filter($orders, fn($o) => $o['total'] > 3000))[0] ?? null;
echo $expensive['id'], "\n";` },
      ],
    },
    {
      id: 'php-sorting',
      title: 'Sorting Arrays',
      blocks: [
        { type: 'text', value: 'PHP has many sort functions. They sort IN PLACE (they change the variable and return true). The letters tell you what they do: a = keep keys (associative), k = sort by key, r = reverse, u = user callback.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$n = [5, 3, 9, 1];
sort($n);   print_r($n);    // values ascending, keys reset
rsort($n);  print_r($n);    // descending

$ages = ['Rina' => 25, 'Asif' => 31, 'Mim' => 19];
asort($ages);  print_r($ages);   // by value, keep keys
arsort($ages); print_r($ages);   // by value desc, keep keys
ksort($ages);  print_r($ages);   // by key

// usort with the spaceship operator: sort records by a field
$people = [
    ['name' => 'Rina', 'age' => 25],
    ['name' => 'Asif', 'age' => 31],
    ['name' => 'Mim', 'age' => 19],
];
usort($people, fn($a, $b) => $a['age'] <=> $b['age']);
echo implode(", ", array_column($people, 'name')), "\n";

// Sort by two fields: age desc, then name asc
usort($people, fn($a, $b) => [$b['age'], $a['name']] <=> [$a['age'], $b['name']]);
echo implode(", ", array_column($people, 'name')), "\n";

// Natural order for strings with numbers
$files = ['img12.png', 'img10.png', 'img2.png'];
natsort($files);
print_r($files);` },
        { type: 'note', value: 'Because sort functions modify the array, you cannot write $sorted = sort($list). Copy first if you need the original.' },
      ],
    },
    {
      id: 'php-destructuring',
      title: 'Destructuring, compact and extract',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Indexed destructuring
[$lat, $lng] = [23.81, 90.41];
echo "Dhaka: $lat, $lng\n";

// Skip elements
[, $second, , $fourth] = [1, 2, 3, 4];
echo "$second $fourth\n";

// Associative destructuring
['name' => $name, 'role' => $role] = ['name' => 'Rafi', 'role' => 'admin'];
echo "$name is $role\n";

// Swap without a temporary variable
$a = 1; $b = 2;
[$a, $b] = [$b, $a];
echo "$a $b\n";

// Return several values from a function
function minMax(array $values): array
{
    return [min($values), max($values)];
}
[$min, $max] = minMax([7, 2, 9, 4]);
echo "min=$min max=$max\n";

// compact: variables -> array (handy for templates)
$title = 'Home'; $user = 'Nadia';
print_r(compact('title', 'user'));` },
        { type: 'note', value: 'Avoid extract() on user input: it creates variables from array keys and can overwrite your own variables.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'arrays', q: 'How do you append a value to $list?', options: ['$list += "x"', '$list[] = "x"', '$list.push("x")', 'append($list, "x")'], answer: 1, explain: '$list[] = value adds to the end (array_push() works too).' },
    { chapterId: 'arrays', q: 'What does array_filter() do with the original keys?', options: ['Resets them', 'Preserves them', 'Sorts them', 'Removes them'], answer: 1, explain: 'Keys are preserved; wrap with array_values() to reindex.' },
    { chapterId: 'arrays', q: 'Which function sorts by value but keeps the key => value pairs?', options: ['sort', 'asort', 'ksort', 'usort'], answer: 1, explain: 'asort() sorts by value and keeps keys; sort() resets them.' },
    { chapterId: 'arrays', q: 'What does array_column($rows, "email") return?', options: ['The number of rows', 'A list of all email values', 'The first email', 'Rows without email'], answer: 1, explain: 'It extracts one column from a list of arrays.' },
    { chapterId: 'arrays', q: 'For duplicate string keys, which value does $a + $b keep?', options: ['The value from $b', 'The value from $a', 'Both in an array', 'Neither'], answer: 1, explain: '+ keeps the left value; array_merge() keeps the right value.' },
    { chapterId: 'arrays', q: 'What does sort($list) return?', options: ['The sorted array', 'true (it sorts in place)', 'A new array', 'The number of items'], answer: 1, explain: 'Sort functions modify the array itself and return true.' },
    { chapterId: 'arrays', q: 'Which callback works with usort() to sort by price ascending?', options: ['fn($a, $b) => $a["price"] > $b["price"]', 'fn($a, $b) => $a["price"] <=> $b["price"]', 'fn($a) => $a["price"]', 'fn($a, $b) => $a["price"] - "price"'], answer: 1, explain: 'usort needs a negative, zero or positive int: the spaceship operator gives exactly that.' },
  ],
};
