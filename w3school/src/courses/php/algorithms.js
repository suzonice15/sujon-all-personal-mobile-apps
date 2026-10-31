// PHP chapter: Algorithms and Data Structures. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'algorithms',
  title: 'Algorithms & Data Structures',
  description: 'Big-O, searching, sorting, recursion, linked lists, trees, graphs and DP',
  icon: 'account-tree',
  lessons: [
    {
      id: 'php-big-o',
      title: 'Big-O: Measuring Efficiency',
      blocks: [
        { type: 'text', value: 'Big-O describes how the work grows as the input grows. Interviews test it, and it is the difference between a page that loads in 50 ms and one that times out when your table reaches 100,000 rows.' },
        { type: 'list', items: [
          'O(1) constant: isset($map[$key]), array push/pop.',
          'O(log n): binary search, B-tree database index lookup.',
          'O(n) linear: one loop, in_array(), array_sum().',
          'O(n log n): good sorting (sort() uses a hybrid quicksort/insertion sort).',
          'O(n²) quadratic: a loop inside a loop over the same data. Fine for 100 items, deadly for 100,000.',
          'O(2^n) exponential: naive recursion like fib(n) without memoization.',
        ] },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Find duplicate emails: O(n²) vs O(n)
$emails = [];
for ($i = 0; $i < 3000; $i++) $emails[] = 'user' . ($i % 2900) . '@x.com';

$t = hrtime(true);
$dupesSlow = [];
for ($i = 0; $i < count($emails); $i++) {
    for ($j = $i + 1; $j < count($emails); $j++) {
        if ($emails[$i] === $emails[$j]) { $dupesSlow[] = $emails[$i]; break; }
    }
}
printf("Nested loops O(n²): %d dupes in %.0f ms\n", count($dupesSlow), (hrtime(true) - $t) / 1e6);

$t = hrtime(true);
$seen = [];
$dupesFast = [];
foreach ($emails as $e) {
    if (isset($seen[$e])) $dupesFast[] = $e;
    $seen[$e] = true;
}
printf("Hash map O(n):      %d dupes in %.2f ms\n", count($dupesFast), (hrtime(true) - $t) / 1e6);` },
      ],
    },
    {
      id: 'php-searching',
      title: 'Searching: Linear and Binary Search',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Binary search: the list must be SORTED. Halve the range each step: O(log n)
function binarySearch(array $sorted, int $target): int
{
    $low = 0;
    $high = count($sorted) - 1;
    $steps = 0;
    while ($low <= $high) {
        $steps++;
        $mid = intdiv($low + $high, 2);
        if ($sorted[$mid] === $target) { echo "  found in $steps steps\n"; return $mid; }
        if ($sorted[$mid] < $target) $low = $mid + 1; else $high = $mid - 1;
    }
    echo "  not found after $steps steps\n";
    return -1;
}

$ids = range(1, 1000000, 3);           // 333,334 sorted numbers
echo "Searching ", count($ids), " items\n";
echo binarySearch($ids, 777778), "\n";
echo binarySearch($ids, 5), "\n";

// Lower bound: first position >= target (useful for ranges, e.g. prices >= 500)
function lowerBound(array $a, int $x): int
{
    [$lo, $hi] = [0, count($a)];
    while ($lo < $hi) {
        $mid = intdiv($lo + $hi, 2);
        if ($a[$mid] < $x) $lo = $mid + 1; else $hi = $mid;
    }
    return $lo;
}
$prices = [120, 300, 450, 500, 500, 899, 1200];
echo "First price >= 500 at index ", lowerBound($prices, 500), "\n";` },
      ],
    },
    {
      id: 'php-sorting-algorithms',
      title: 'Sorting Algorithms',
      blocks: [
        { type: 'text', value: 'In real code call sort()/usort(). But interviewers ask you to implement and explain classic algorithms, and writing them builds your recursion and loop skills.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Insertion sort: O(n²), but fast for small or almost-sorted arrays
function insertionSort(array $a): array
{
    for ($i = 1; $i < count($a); $i++) {
        $key = $a[$i];
        $j = $i - 1;
        while ($j >= 0 && $a[$j] > $key) { $a[$j + 1] = $a[$j]; $j--; }
        $a[$j + 1] = $key;
    }
    return $a;
}

// Merge sort: O(n log n) always, stable, divide and conquer
function mergeSort(array $a): array
{
    if (count($a) <= 1) return $a;
    $mid = intdiv(count($a), 2);
    $left = mergeSort(array_slice($a, 0, $mid));
    $right = mergeSort(array_slice($a, $mid));
    $out = [];
    $i = $j = 0;
    while ($i < count($left) && $j < count($right)) {
        $out[] = $left[$i] <= $right[$j] ? $left[$i++] : $right[$j++];
    }
    return array_merge($out, array_slice($left, $i), array_slice($right, $j));
}

// Quick sort: O(n log n) on average, O(n²) worst case
function quickSort(array $a): array
{
    if (count($a) < 2) return $a;
    $pivot = array_shift($a);
    $smaller = array_filter($a, fn($x) => $x < $pivot);
    $larger = array_filter($a, fn($x) => $x >= $pivot);
    return [...quickSort(array_values($smaller)), $pivot, ...quickSort(array_values($larger))];
}

$data = [38, 27, 43, 3, 9, 82, 10, 3];
echo implode(' ', insertionSort($data)), "\n";
echo implode(' ', mergeSort($data)), "\n";
echo implode(' ', quickSort($data)), "\n";

// Counting sort: O(n + k) when values are small integers (e.g. exam marks 0-100)
function countingSort(array $marks): array
{
    $counts = array_fill(0, 101, 0);
    foreach ($marks as $m) $counts[$m]++;
    $out = [];
    foreach ($counts as $value => $n) for ($k = 0; $k < $n; $k++) $out[] = $value;
    return $out;
}
echo implode(' ', countingSort([88, 45, 92, 45, 70, 100, 0])), "\n";` },
      ],
    },
    {
      id: 'php-linked-structures',
      title: 'Linked Lists, Stacks, Queues and LRU Cache',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class Node { public ?Node $next = null; public function __construct(public mixed $value) {} }

final class LinkedList implements IteratorAggregate
{
    private ?Node $head = null;
    public function push(mixed $v): void
    {
        $node = new Node($v);
        if (!$this->head) { $this->head = $node; return; }
        $cur = $this->head;
        while ($cur->next) $cur = $cur->next;
        $cur->next = $node;
    }
    public function reverse(): void                  // classic interview question
    {
        $prev = null; $cur = $this->head;
        while ($cur) { $next = $cur->next; $cur->next = $prev; $prev = $cur; $cur = $next; }
        $this->head = $prev;
    }
    public function getIterator(): Generator { for ($n = $this->head; $n; $n = $n->next) yield $n->value; }
}

$list = new LinkedList();
foreach ([1, 2, 3, 4] as $v) $list->push($v);
$list->reverse();
echo implode(' -> ', iterator_to_array($list)), "\n";

// LRU cache: keep the N most recently used items. PHP arrays keep insertion order,
// so "move to the end" on every access gives O(1) get and put.
final class LruCache
{
    private array $items = [];
    public function __construct(private int $capacity) {}
    public function get(string $k): mixed
    {
        if (!array_key_exists($k, $this->items)) return null;
        $v = $this->items[$k];
        unset($this->items[$k]);
        $this->items[$k] = $v;                        // now most recent
        return $v;
    }
    public function put(string $k, mixed $v): void
    {
        unset($this->items[$k]);
        $this->items[$k] = $v;
        if (count($this->items) > $this->capacity) unset($this->items[array_key_first($this->items)]);
    }
    public function keys(): array { return array_keys($this->items); }
}

$cache = new LruCache(3);
foreach (['a', 'b', 'c'] as $k) $cache->put($k, strtoupper($k));
$cache->get('a');            // a becomes most recent
$cache->put('d', 'D');       // evicts b, the least recently used
echo implode(', ', $cache->keys()), "\n";` },
      ],
    },
    {
      id: 'php-trees-graphs',
      title: 'Trees and Graphs: BFS and DFS',
      blocks: [
        { type: 'text', value: 'Trees appear as category menus, comments with replies and org charts. Graphs appear as routes between cities, friend networks and course prerequisites. Breadth-first search (BFS) finds shortest paths in unweighted graphs; depth-first search (DFS) explores deeply and detects cycles.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Build a tree from flat database rows (id, parent_id): O(n) with references
$rows = [
    ['id' => 1, 'parent' => null, 'name' => 'Programming'],
    ['id' => 2, 'parent' => 1, 'name' => 'Web'],
    ['id' => 3, 'parent' => 2, 'name' => 'PHP'],
    ['id' => 4, 'parent' => 2, 'name' => 'JavaScript'],
    ['id' => 5, 'parent' => 1, 'name' => 'Databases'],
];
$byId = [];
foreach ($rows as $r) $byId[$r['id']] = $r + ['children' => []];
$tree = [];
foreach ($byId as $id => &$node) {
    if ($node['parent'] === null) $tree[] = &$node;
    else $byId[$node['parent']]['children'][] = &$node;
}
unset($node);
function show(array $nodes, int $d = 0): void
{
    foreach ($nodes as $n) { echo str_repeat('  ', $d), $n['name'], "\n"; show($n['children'], $d + 1); }
}
show($tree);

// Graph as an adjacency list: course prerequisites
$prereq = [
    'html' => [], 'css' => ['html'], 'js' => ['html'], 'php' => ['html'],
    'sql' => [], 'laravel' => ['php', 'sql'], 'vue' => ['js', 'css'],
];

// Topological sort (DFS): an order that respects all prerequisites
function studyOrder(array $graph): array
{
    $order = []; $state = [];
    $visit = function (string $n) use (&$visit, &$order, &$state, $graph) {
        if (($state[$n] ?? '') === 'done') return;
        if (($state[$n] ?? '') === 'visiting') throw new LogicException("Cycle at $n");
        $state[$n] = 'visiting';
        foreach ($graph[$n] as $dep) $visit($dep);
        $state[$n] = 'done';
        $order[] = $n;
    };
    foreach (array_keys($graph) as $n) $visit($n);
    return $order;
}
echo "Study order: ", implode(' -> ', studyOrder($prereq)), "\n";

// BFS shortest path on an unweighted graph (bus stops)
$routes = ['A' => ['B', 'C'], 'B' => ['D'], 'C' => ['D', 'E'], 'D' => ['F'], 'E' => ['F'], 'F' => []];
function shortestPath(array $g, string $from, string $to): array
{
    $queue = new SplQueue(); $queue->enqueue([$from]); $seen = [$from => true];
    while (!$queue->isEmpty()) {
        $path = $queue->dequeue();
        $last = end($path);
        if ($last === $to) return $path;
        foreach ($g[$last] as $next) {
            if (!isset($seen[$next])) { $seen[$next] = true; $queue->enqueue([...$path, $next]); }
        }
    }
    return [];
}
echo "Shortest A->F: ", implode(' -> ', shortestPath($routes, 'A', 'F')), "\n";` },
      ],
    },
    {
      id: 'php-dynamic-programming',
      title: 'Recursion and Dynamic Programming',
      blocks: [
        { type: 'text', value: 'Dynamic programming (DP) solves a problem by combining answers to smaller overlapping sub-problems and storing them, so each is solved once. It turns exponential solutions into polynomial ones.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// 1. Coin change: fewest notes/coins to make an amount (Taka denominations)
function minCoins(array $coins, int $amount): int
{
    $dp = array_fill(0, $amount + 1, PHP_INT_MAX);
    $dp[0] = 0;
    for ($a = 1; $a <= $amount; $a++) {
        foreach ($coins as $c) {
            if ($c <= $a && $dp[$a - $c] !== PHP_INT_MAX) $dp[$a] = min($dp[$a], $dp[$a - $c] + 1);
        }
    }
    return $dp[$amount] === PHP_INT_MAX ? -1 : $dp[$amount];
}
echo "Notes for 1,786 Tk: ", minCoins([1, 2, 5, 10, 20, 50, 100, 200, 500, 1000], 1786), "\n";

// 2. Longest common subsequence: the basis of diff tools
function lcs(string $a, string $b): string
{
    $m = strlen($a); $n = strlen($b);
    $dp = array_fill(0, $m + 1, array_fill(0, $n + 1, 0));
    for ($i = 1; $i <= $m; $i++)
        for ($j = 1; $j <= $n; $j++)
            $dp[$i][$j] = $a[$i - 1] === $b[$j - 1] ? $dp[$i - 1][$j - 1] + 1 : max($dp[$i - 1][$j], $dp[$i][$j - 1]);
    $out = '';
    for ($i = $m, $j = $n; $i > 0 && $j > 0;) {
        if ($a[$i - 1] === $b[$j - 1]) { $out = $a[$i - 1] . $out; $i--; $j--; }
        elseif ($dp[$i - 1][$j] >= $dp[$i][$j - 1]) $i--; else $j--;
    }
    return $out;
}
echo "LCS: ", lcs('LARAVEL', 'PARALLEL'), "\n";

// 3. Edit distance ("did you mean?" search suggestions). PHP has it built in:
$courses = ['javascript', 'typescript', 'php', 'python', 'laravel'];
$typed = 'laravle';
usort($courses, fn($x, $y) => levenshtein($typed, $x) <=> levenshtein($typed, $y));
echo "Did you mean: {$courses[0]}?\n";

// 4. 0/1 knapsack: best value within a weight limit (packing a delivery bike)
function knapsack(array $items, int $capacity): int
{
    $dp = array_fill(0, $capacity + 1, 0);
    foreach ($items as [$weight, $value]) {
        for ($w = $capacity; $w >= $weight; $w--) $dp[$w] = max($dp[$w], $dp[$w - $weight] + $value);
    }
    return $dp[$capacity];
}
echo "Best delivery value: ", knapsack([[3, 1500], [4, 2200], [2, 900], [5, 3000]], 9), " Tk\n";` },
        { type: 'note', value: 'For interviews, practise on LeetCode or HackerRank in PHP: two pointers, sliding window, hash maps, BFS/DFS and DP cover most questions.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'algorithms', q: 'What is the time complexity of isset($map[$key])?', options: ['O(n)', 'O(1) on average', 'O(log n)', 'O(n²)'], answer: 1, explain: 'PHP arrays are hash tables.' },
    { chapterId: 'algorithms', q: 'What does binary search require?', options: ['A linked list', 'Sorted data', 'Unique values only', 'A database'], answer: 1, explain: 'It halves the search range by comparing with the middle element.' },
    { chapterId: 'algorithms', q: 'What is the complexity of merge sort?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'], answer: 1, explain: 'Merge sort is O(n log n) in every case.' },
    { chapterId: 'algorithms', q: 'Which algorithm finds the shortest path in an unweighted graph?', options: ['DFS', 'BFS', 'Binary search', 'Quick sort'], answer: 1, explain: 'BFS explores level by level.' },
    { chapterId: 'algorithms', q: 'What does a topological sort produce?', options: ['A sorted list of numbers', 'An order where every item comes after its dependencies', 'The shortest path', 'A balanced tree'], answer: 1, explain: 'Used for build systems, migrations and course prerequisites.' },
    { chapterId: 'algorithms', q: 'What is the key idea of dynamic programming?', options: ['Using more threads', 'Storing answers of overlapping sub-problems so each is solved once', 'Random guessing', 'Sorting first'], answer: 1, explain: 'Memoization (top-down) or tables (bottom-up).' },
  ],
};
