// PHP chapter: Files, JSON and Includes. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it has a small in-memory file system, so file samples really run.

export default {
  id: 'files',
  title: 'Files, JSON & Includes',
  description: 'Read and write files, CSV, JSON and split code into files',
  icon: 'folder-open',
  lessons: [
    {
      id: 'php-include-require',
      title: 'include and require',
      blocks: [
        { type: 'text', value: 'Real projects are split into many files. require loads another PHP file and stops with a fatal error if it is missing; include only warns. The _once versions load a file only one time.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// config.php
return [
    'db_host' => 'localhost',
    'app_name' => 'CodeNest',
];

// functions.php
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

// index.php
require_once __DIR__ . '/functions.php';
$config = require __DIR__ . '/config.php';   // a file can return a value
include __DIR__ . '/partials/header.php';    // template parts

echo e($config['app_name']);` },
        { type: 'list', items: [
          'Always build paths from __DIR__ (the folder of the current file), never from the current working directory.',
          'Use require for code your app needs; include is mostly for optional template pieces.',
          'In modern projects Composer\'s autoloader loads classes automatically (Namespaces chapter), so you rarely write require for classes.',
        ] },
      ],
    },
    {
      id: 'php-read-write-files',
      title: 'Reading and Writing Files',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$file = __DIR__ . '/notes.txt';

// Write (creates or overwrites)
file_put_contents($file, "First line\n");

// Append, with a lock so two requests do not mix their writes
file_put_contents($file, "Second line\n", FILE_APPEND | LOCK_EX);
file_put_contents($file, "Third line\n", FILE_APPEND | LOCK_EX);

// Read everything
echo file_get_contents($file);

// Read into an array of lines
$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
echo count($lines), " lines, last: ", end($lines), "\n";

// File info
var_dump(file_exists($file), is_file($file), is_dir(__DIR__));
echo filesize($file), " bytes\n";
echo basename($file), " | ", pathinfo($file, PATHINFO_EXTENSION), "\n";

unlink($file);              // delete
var_dump(file_exists($file));` },
      ],
    },
    {
      id: 'php-streams-big-files',
      title: 'Line by Line: fopen and Big Files',
      blocks: [
        { type: 'text', value: 'file_get_contents() loads the whole file into memory. For big logs or exports, open a handle and process one line at a time.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$path = __DIR__ . '/access.log';
$h = fopen($path, 'w');
foreach (['GET /home 200', 'GET /login 200', 'POST /login 302', 'GET /admin 403', 'GET /missing 404'] as $line) {
    fwrite($h, $line . PHP_EOL);
}
fclose($h);

// Count status codes reading one line at a time
$counts = [];
$h = fopen($path, 'r');
while (($line = fgets($h)) !== false) {
    $status = (int) substr(trim($line), -3);
    $counts[$status] = ($counts[$status] ?? 0) + 1;
}
fclose($h);
ksort($counts);
print_r($counts);

// SplFileObject: the object-oriented way
foreach (new SplFileObject($path) as $no => $line) {
    if (str_contains($line, '40')) echo "Line ", $no + 1, ": ", $line;
}` },
        { type: 'note', value: 'Modes: r read, w write (truncate), a append, x create only if missing, r+ read and write. Always fclose(), or use SplFileObject which closes itself.' },
      ],
    },
    {
      id: 'php-csv',
      title: 'CSV Import and Export',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$students = [
    ['name', 'email', 'score'],
    ['Nadia', 'nadia@example.com', 91],
    ['Arif, Jr.', 'arif@example.com', 78],     // the comma is quoted automatically
];

$path = __DIR__ . '/students.csv';
$h = fopen($path, 'w');
foreach ($students as $row) {
    fputcsv($h, $row);
}
fclose($h);
echo file_get_contents($path), "\n";

// Read it back as associative arrays
$h = fopen($path, 'r');
$header = fgetcsv($h);
$rows = [];
while (($data = fgetcsv($h)) !== false) {
    $rows[] = array_combine($header, $data);
}
fclose($h);
print_r($rows);
echo "Average: ", array_sum(array_column($rows, 'score')) / count($rows), "\n";` },
        { type: 'note', value: 'Excel likes a UTF-8 BOM ("\\xEF\\xBB\\xBF") at the start of the file to show Bangla and other Unicode text correctly.' },
      ],
    },
    {
      id: 'php-json',
      title: 'JSON',
      blocks: [
        { type: 'text', value: 'JSON is the language of APIs. json_encode() turns PHP values into JSON; json_decode() turns JSON back into PHP. Use JSON_THROW_ON_ERROR so mistakes throw instead of silently returning null.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$course = [
    'id' => 7,
    'title' => 'PHP for Experts',
    'tags' => ['backend', 'web'],
    'price' => 0,
    'published' => true,
    'author' => null,
];

echo json_encode($course), "\n";
echo json_encode($course, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), "\n";

$json = '{"name":"Nadia","skills":["php","sql"],"address":{"city":"Dhaka"}}';

$obj = json_decode($json);                 // stdClass objects
echo $obj->address->city, "\n";

$arr = json_decode($json, true);           // associative arrays (usually easier)
echo $arr['skills'][1], "\n";

try {
    json_decode('{bad json}', true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    echo "Invalid JSON: ", $e->getMessage(), "\n";
}

var_dump(json_validate('{"ok":true}'));     // PHP 8.3

// Lists vs objects: [] encodes as [] but an associative array as {}
echo json_encode([1, 2]), " ", json_encode(['a' => 1]), " ", json_encode((object) []), "\n";` },
      ],
    },
    {
      id: 'php-json-storage',
      title: 'Practice: A JSON File Store',
      blocks: [
        { type: 'text', value: 'Small tools can keep data in a JSON file. This class reads, adds and saves records safely with a lock. Later you will replace it with a real database.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class JsonStore
{
    public function __construct(private string $path) {}

    public function all(): array
    {
        if (!is_file($this->path)) return [];
        return json_decode(file_get_contents($this->path), true, 512, JSON_THROW_ON_ERROR);
    }

    public function add(array $record): array
    {
        $items = $this->all();
        $record['id'] = (max(array_column($items, 'id') ?: [0]) + 1);
        $items[] = $record;
        file_put_contents($this->path, json_encode($items, JSON_PRETTY_PRINT), LOCK_EX);
        return $record;
    }

    public function find(int $id): ?array
    {
        foreach ($this->all() as $item) {
            if ($item['id'] === $id) return $item;
        }
        return null;
    }
}

$store = new JsonStore(__DIR__ . '/todos.json');
$store->add(['title' => 'Learn arrays', 'done' => true]);
$store->add(['title' => 'Learn PDO', 'done' => false]);
print_r($store->find(2));
echo file_get_contents(__DIR__ . '/todos.json'), "\n";` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'files', q: 'What is the difference between require and include when the file is missing?', options: ['No difference', 'require stops with a fatal error, include only warns', 'include stops, require warns', 'Both silently continue'], answer: 1, explain: 'Use require for files the app cannot work without.' },
    { chapterId: 'files', q: 'Which flag appends to a file with file_put_contents()?', options: ['FILE_ADD', 'FILE_APPEND', 'APPEND_MODE', '"a"'], answer: 1, explain: 'FILE_APPEND adds to the end; combine with LOCK_EX for safety.' },
    { chapterId: 'files', q: 'Why read big files with fgets() instead of file_get_contents()?', options: ['fgets is newer', 'It processes one line at a time without loading the whole file into memory', 'It is the only way to read text', 'It decodes JSON'], answer: 1, explain: 'Streaming keeps memory use small.' },
    { chapterId: 'files', q: 'What does json_decode($json, true) return for a JSON object?', options: ['A stdClass object', 'An associative array', 'A string', 'A JsonObject'], answer: 1, explain: 'The second argument true returns arrays instead of objects.' },
    { chapterId: 'files', q: 'What does JSON_THROW_ON_ERROR do?', options: ['Prints errors as JSON', 'Throws JsonException on invalid JSON instead of returning null', 'Ignores errors', 'Validates the schema'], answer: 1, explain: 'Without it, json_decode() returns null and you must call json_last_error().' },
    { chapterId: 'files', q: 'How should file paths in includes be built?', options: ['Relative to the browser URL', 'With __DIR__', 'With $_SERVER["PHP_SELF"]', 'With a hard-coded C:\\ path'], answer: 1, explain: '__DIR__ is the folder of the current file and always correct.' },
  ],
};
