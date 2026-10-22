// PHP chapter: Databases with PDO. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it supports PDO with SQLite (in memory), so the SQL samples really run.
// The same PDO code works with MySQL/PostgreSQL; only the DSN changes.

export default {
  id: 'database',
  title: 'Databases with PDO',
  description: 'SQL, PDO, prepared statements, transactions and repositories',
  icon: 'storage',
  lessons: [
    {
      id: 'php-sql-crash-course',
      title: 'SQL Crash Course',
      blocks: [
        { type: 'text', value: 'Most PHP apps store data in a relational database (MySQL/MariaDB, PostgreSQL or SQLite). Data lives in tables of rows and columns, and you talk to it with SQL. These are the statements you will write every day.' },
        { type: 'code', lang: 'text', value: String.raw`CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('Nadia', 'nadia@example.com');
SELECT id, name FROM users WHERE email = 'nadia@example.com';
SELECT * FROM users ORDER BY created_at DESC LIMIT 10 OFFSET 20;
UPDATE users SET name = 'Nadia K.' WHERE id = 1;
DELETE FROM users WHERE id = 1;

-- Relations
SELECT o.id, o.total, u.name
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.total > 1000;

-- Grouping
SELECT user_id, COUNT(*) AS orders, SUM(total) AS spent
FROM orders GROUP BY user_id HAVING spent > 5000;` },
        { type: 'note', value: 'Use utf8mb4 as the MySQL character set (it supports emoji and every language) and the InnoDB engine (transactions, foreign keys).' },
      ],
    },
    {
      id: 'php-pdo-connect',
      title: 'Connecting with PDO',
      blocks: [
        { type: 'text', value: 'PDO (PHP Data Objects) is the standard database API. The same methods work for MySQL, PostgreSQL and SQLite. Always set these three options.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// db.php: MySQL connection
$dsn = 'mysql:host=127.0.0.1;port=3306;dbname=shop;charset=utf8mb4';

$pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,        // throw on errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,   // rows as associative arrays
    PDO::ATTR_EMULATE_PREPARES => false,                // real prepared statements
]);

// PostgreSQL: 'pgsql:host=localhost;dbname=shop'
// SQLite file: 'sqlite:' . __DIR__ . '/database.sqlite'` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$pdo = new PDO('sqlite::memory:', options: [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$pdo->exec('CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
)');
$pdo->exec("INSERT INTO products (name, price, stock) VALUES
    ('Keyboard', 1500, 12), ('Mouse', 450, 0), ('Monitor', 15500, 4)");

foreach ($pdo->query('SELECT * FROM products ORDER BY price') as $row) {
    echo "{$row['id']}. {$row['name']} - {$row['price']} Tk ({$row['stock']} left)\n";
}
echo $pdo->getAttribute(PDO::ATTR_DRIVER_NAME), "\n";` },
        { type: 'note', value: 'Keep credentials out of code: read them from environment variables or a .env file (vlucas/phpdotenv) that is never committed.' },
      ],
    },
    {
      id: 'php-prepared-statements',
      title: 'Prepared Statements (Stop SQL Injection)',
      blocks: [
        { type: 'text', value: 'NEVER put user input directly into SQL. A prepared statement sends the SQL and the values separately, so input can never change the query. This single habit prevents SQL injection, one of the most damaging web vulnerabilities.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$pdo = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$pdo->exec('CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, role TEXT)');
$pdo->exec("INSERT INTO users (email, role) VALUES ('a@x.com', 'user'), ('admin@x.com', 'admin')");

$input = "' OR '1'='1";   // what an attacker types into the login form

// DANGEROUS: string concatenation
$sql = "SELECT * FROM users WHERE email = '$input'";
echo "Unsafe query returns ", count($pdo->query($sql)->fetchAll()), " users!\n";

// SAFE: positional placeholders
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$stmt->execute([$input]);
echo "Safe query returns ", count($stmt->fetchAll()), " users\n";

// SAFE: named placeholders
$stmt = $pdo->prepare('SELECT id, email FROM users WHERE role = :role AND id > :min');
$stmt->execute(['role' => 'admin', 'min' => 0]);
print_r($stmt->fetch());

// Insert and get the new id
$stmt = $pdo->prepare('INSERT INTO users (email, role) VALUES (:email, :role)');
$stmt->execute(['email' => 'new@x.com', 'role' => 'user']);
echo "New id: ", $pdo->lastInsertId(), "\n";

// Update / delete: check how many rows changed
$stmt = $pdo->prepare('UPDATE users SET role = ? WHERE email = ?');
$stmt->execute(['editor', 'new@x.com']);
echo $stmt->rowCount(), " row updated\n";` },
        { type: 'note', value: 'Placeholders work for VALUES only, not for table or column names. If a user picks the sort column, check it against an allow-list: in_array($col, [\'name\', \'price\'], true).' },
      ],
    },
    {
      id: 'php-fetching',
      title: 'Fetching Data the Right Way',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$pdo = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$pdo->exec('CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, category TEXT, lessons INTEGER)');
$pdo->exec("INSERT INTO courses (title, category, lessons) VALUES
  ('HTML', 'web', 40), ('CSS', 'web', 55), ('PHP', 'backend', 120), ('SQL', 'backend', 35)");

// One row (or false)
$course = $pdo->query("SELECT * FROM courses WHERE title = 'PHP'")->fetch();
echo $course['lessons'], " lessons\n";

// One value
echo $pdo->query('SELECT COUNT(*) FROM courses')->fetchColumn(), " courses\n";

// All rows
$all = $pdo->query('SELECT title FROM courses')->fetchAll(PDO::FETCH_COLUMN);
echo implode(', ', $all), "\n";

// Key => value pairs
print_r($pdo->query('SELECT title, lessons FROM courses')->fetchAll(PDO::FETCH_KEY_PAIR));

// Grouped by the first column
print_r($pdo->query('SELECT category, title FROM courses')->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_COLUMN));

// Into objects of your own class
final class Course { public int $id; public string $title; public string $category; public int $lessons; }
$stmt = $pdo->query('SELECT * FROM courses WHERE lessons > 50');
foreach ($stmt->fetchAll(PDO::FETCH_CLASS, Course::class) as $c) {
    echo get_class($c), ": {$c->title}\n";
}

// Pagination
$perPage = 2; $page = 2;
$stmt = $pdo->prepare('SELECT title FROM courses ORDER BY id LIMIT :limit OFFSET :offset');
$stmt->bindValue('limit', $perPage, PDO::PARAM_INT);
$stmt->bindValue('offset', ($page - 1) * $perPage, PDO::PARAM_INT);
$stmt->execute();
print_r($stmt->fetchAll(PDO::FETCH_COLUMN));` },
      ],
    },
    {
      id: 'php-transactions',
      title: 'Transactions',
      blocks: [
        { type: 'text', value: 'A transaction groups several queries into one all-or-nothing unit. Money transfers, orders with items, and stock updates must use transactions, or a crash halfway leaves corrupted data.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$pdo = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$pdo->exec('CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance INTEGER CHECK (balance >= 0))');
$pdo->exec("INSERT INTO accounts (owner, balance) VALUES ('Rahim', 1000), ('Karim', 200)");

function transfer(PDO $pdo, int $from, int $to, int $amount): void
{
    $pdo->beginTransaction();
    try {
        $pdo->prepare('UPDATE accounts SET balance = balance - ? WHERE id = ?')->execute([$amount, $from]);
        $pdo->prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?')->execute([$amount, $to]);
        $pdo->commit();
        echo "Transferred $amount\n";
    } catch (Throwable $e) {
        $pdo->rollBack();                // undo everything since beginTransaction
        echo "Rolled back: ", $e->getMessage(), "\n";
    }
}

$show = fn() => print_r($pdo->query('SELECT owner, balance FROM accounts')->fetchAll(PDO::FETCH_KEY_PAIR));

transfer($pdo, 1, 2, 300);
$show();
transfer($pdo, 2, 1, 5000);   // violates CHECK (balance >= 0)
$show();                       // unchanged: no money was lost` },
        { type: 'note', value: 'With concurrent users, also lock the rows you read before updating them (SELECT ... FOR UPDATE in MySQL/PostgreSQL), or two requests can both read the old balance.' },
      ],
    },
    {
      id: 'php-repository',
      title: 'Organising Code: The Repository Pattern',
      blocks: [
        { type: 'text', value: 'Keep SQL out of controllers and templates. A repository class owns all queries for one entity and returns plain objects. Controllers become simple and you can swap storage in tests.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final readonly class User
{
    public function __construct(public ?int $id, public string $name, public string $email) {}
}

interface UserRepository
{
    public function find(int $id): ?User;
    public function findByEmail(string $email): ?User;
    public function save(User $user): User;
}

final class PdoUserRepository implements UserRepository
{
    public function __construct(private PDO $pdo) {}

    public function find(int $id): ?User
    {
        $stmt = $this->pdo->prepare('SELECT id, name, email FROM users WHERE id = ?');
        $stmt->execute([$id]);
        return $this->hydrate($stmt->fetch());
    }

    public function findByEmail(string $email): ?User
    {
        $stmt = $this->pdo->prepare('SELECT id, name, email FROM users WHERE email = ?');
        $stmt->execute([$email]);
        return $this->hydrate($stmt->fetch());
    }

    public function save(User $user): User
    {
        if ($user->id === null) {
            $this->pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)')->execute([$user->name, $user->email]);
            return new User((int) $this->pdo->lastInsertId(), $user->name, $user->email);
        }
        $this->pdo->prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')->execute([$user->name, $user->email, $user->id]);
        return $user;
    }

    private function hydrate(array|false $row): ?User
    {
        return $row ? new User((int) $row['id'], $row['name'], $row['email']) : null;
    }
}

$pdo = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$pdo->exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE)');

$repo = new PdoUserRepository($pdo);
$saved = $repo->save(new User(null, 'Tania', 'tania@example.com'));
echo "Saved with id {$saved->id}\n";
$repo->save(new User($saved->id, 'Tania Rahman', $saved->email));
var_dump($repo->findByEmail('tania@example.com'));
var_dump($repo->find(99));` },
      ],
    },
    {
      id: 'php-db-design',
      title: 'Schema Design, Indexes and N+1 Queries',
      blocks: [
        { type: 'list', items: [
          'Normalise: one fact in one place. Orders reference users by user_id with a FOREIGN KEY, instead of copying the user\'s name into every order.',
          'Add an INDEX on columns you filter, join or sort by (email, user_id, created_at). Check slow queries with EXPLAIN.',
          'Use migrations (Phinx, Doctrine Migrations, Laravel migrations) so schema changes are versioned code, not manual clicks.',
          'Choose types carefully: DECIMAL(10,2) or integer paisa for money, never FLOAT.',
        ] },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$pdo = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$pdo->exec('CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT)');
$pdo->exec('CREATE TABLE posts (id INTEGER PRIMARY KEY, author_id INTEGER REFERENCES authors(id), title TEXT)');
$pdo->exec('CREATE INDEX idx_posts_author ON posts(author_id)');
$pdo->exec("INSERT INTO authors (name) VALUES ('Nadia'), ('Rafi')");
$pdo->exec("INSERT INTO posts (author_id, title) VALUES (1, 'PDO tips'), (2, 'Enums'), (1, 'Traits')");

$queries = 0;

// N+1 problem: 1 query for posts + 1 query PER post for its author
$posts = $pdo->query('SELECT * FROM posts')->fetchAll(); $queries++;
foreach ($posts as $p) {
    $stmt = $pdo->prepare('SELECT name FROM authors WHERE id = ?');
    $stmt->execute([$p['author_id']]); $queries++;
}
echo "N+1 approach: $queries queries\n";

// Fix: one JOIN (or load all needed authors with WHERE id IN (...))
$rows = $pdo->query('SELECT p.title, a.name AS author FROM posts p JOIN authors a ON a.id = p.author_id')->fetchAll();
echo "JOIN approach: 1 query\n";
foreach ($rows as $r) echo "{$r['title']} by {$r['author']}\n";

print_r($pdo->query("EXPLAIN QUERY PLAN SELECT * FROM posts WHERE author_id = 1")->fetchAll());` },
        { type: 'note', value: 'N+1 is the most common performance bug in PHP apps, especially with ORMs. In Laravel it is solved with eager loading: Post::with(\'author\')->get().' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'database', q: 'What prevents SQL injection?', options: ['addslashes()', 'Prepared statements with placeholders', 'htmlspecialchars()', 'Using POST instead of GET'], answer: 1, explain: 'Values sent separately from the SQL can never change the query.' },
    { chapterId: 'database', q: 'Which PDO option makes database errors throw exceptions?', options: ['PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION', 'PDO::THROW => true', 'PDO::ATTR_STRICT', 'PDO::ERRMODE_SILENT'], answer: 0, explain: 'Since PHP 8.0 exception mode is the default, but setting it explicitly is good practice.' },
    { chapterId: 'database', q: 'Which method returns a single value, like a COUNT(*)?', options: ['fetch()', 'fetchAll()', 'fetchColumn()', 'rowCount()'], answer: 2, explain: 'fetchColumn() returns the first column of the next row.' },
    { chapterId: 'database', q: 'What does rollBack() do?', options: ['Deletes the table', 'Undoes all changes since beginTransaction()', 'Reconnects to the database', 'Repeats the last query'], answer: 1, explain: 'Transactions are all-or-nothing.' },
    { chapterId: 'database', q: 'Can placeholders be used for column names, like ORDER BY ?', options: ['Yes', 'No: validate column names against an allow-list instead', 'Only in MySQL', 'Only named placeholders'], answer: 1, explain: 'Placeholders bind values only.' },
    { chapterId: 'database', q: 'What is the N+1 query problem?', options: ['Too many tables', 'Running one extra query per row of a list', 'A missing primary key', 'A JOIN with N tables'], answer: 1, explain: 'Load related data with a JOIN or a single IN query instead.' },
    { chapterId: 'database', q: 'Which charset should MySQL tables use for full Unicode and emoji?', options: ['latin1', 'utf8', 'utf8mb4', 'ascii'], answer: 2, explain: 'MySQL\'s old "utf8" stores only 3 bytes per character; utf8mb4 is real UTF-8.' },
  ],
};
