// PHP chapter: Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Each project is a complete program that runs in Try it; extend it with the challenges.

export default {
  id: 'projects',
  title: 'Projects',
  description: 'Complete programs that combine everything you learned',
  icon: 'construction',
  lessons: [
    {
      id: 'php-project-results',
      title: 'Project 1: Student Result Processor',
      blocks: [
        { type: 'text', value: 'Arrays, functions, match and formatting together: calculate GPA on the Bangladeshi grading scale, rank students and print a report card.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

function gradePoint(int $marks): array
{
    return match (true) {
        $marks >= 80 => ['A+', 5.0],
        $marks >= 70 => ['A', 4.0],
        $marks >= 60 => ['A-', 3.5],
        $marks >= 50 => ['B', 3.0],
        $marks >= 40 => ['C', 2.0],
        $marks >= 33 => ['D', 1.0],
        default => ['F', 0.0],
    };
}

function gpa(array $subjects): float
{
    $points = array_map(fn($m) => gradePoint($m)[1], $subjects);
    return in_array(0.0, $points, true) ? 0.0 : round(array_sum($points) / count($points), 2);
}

$students = [
    'Nadia' => ['Bangla' => 85, 'English' => 78, 'Math' => 92, 'Science' => 88],
    'Rafi' => ['Bangla' => 72, 'English' => 65, 'Math' => 58, 'Science' => 70],
    'Mim' => ['Bangla' => 90, 'English' => 30, 'Math' => 95, 'Science' => 91],
    'Arif' => ['Bangla' => 80, 'English' => 82, 'Math' => 79, 'Science' => 85],
];

$results = [];
foreach ($students as $name => $subjects) {
    $results[] = ['name' => $name, 'gpa' => gpa($subjects), 'total' => array_sum($subjects)];
}
usort($results, fn($a, $b) => [$b['gpa'], $b['total']] <=> [$a['gpa'], $a['total']]);

printf("%-4s %-6s %5s %6s  %s\n", 'Rank', 'Name', 'GPA', 'Total', 'Status');
foreach ($results as $i => $r) {
    printf("%-4d %-6s %5.2f %6d  %s\n", $i + 1, $r['name'], $r['gpa'], $r['total'], $r['gpa'] > 0 ? 'Passed' : 'Failed');
}

echo "\nReport card: Nadia\n";
foreach ($students['Nadia'] as $subject => $marks) {
    [$letter, $point] = gradePoint($marks);
    printf("  %-8s %3d  %-2s %.1f\n", $subject, $marks, $letter, $point);
}` },
        { type: 'list', items: [
          'Challenge: read the marks from a CSV file with fgetcsv().',
          'Challenge: output the report as an HTML table, escaping every value.',
          'Challenge: add the class average and highest marks per subject.',
        ] },
      ],
    },
    {
      id: 'php-project-cart',
      title: 'Project 2: Shopping Cart and Checkout',
      blocks: [
        { type: 'text', value: 'OOP, enums, readonly value objects and exceptions: a cart that handles stock, coupons and VAT with exact integer money.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final readonly class Product
{
    public function __construct(public string $sku, public string $name, public int $price, public int $stock) {}
}

enum Coupon: string
{
    case Save10 = 'SAVE10';
    case Flat200 = 'FLAT200';

    public function discount(int $subtotal): int
    {
        return match ($this) {
            self::Save10 => intdiv($subtotal, 10),
            self::Flat200 => min(200 * 100, $subtotal),
        };
    }
}

final class OutOfStock extends DomainException {}

final class Cart
{
    /** @var array<string, array{product: Product, qty: int}> */
    private array $lines = [];
    private ?Coupon $coupon = null;

    public function add(Product $p, int $qty = 1): void
    {
        $current = $this->lines[$p->sku]['qty'] ?? 0;
        if ($qty < 1) throw new InvalidArgumentException('Quantity must be at least 1');
        if ($current + $qty > $p->stock) throw new OutOfStock("Only {$p->stock} {$p->name} in stock");
        $this->lines[$p->sku] = ['product' => $p, 'qty' => $current + $qty];
    }

    public function applyCoupon(string $code): void
    {
        $this->coupon = Coupon::tryFrom(strtoupper($code)) ?? throw new InvalidArgumentException("Invalid coupon $code");
    }

    public function totals(): array
    {
        $subtotal = array_sum(array_map(fn($l) => $l['product']->price * $l['qty'], $this->lines));
        $discount = $this->coupon?->discount($subtotal) ?? 0;
        $vat = intdiv(($subtotal - $discount) * 5, 100);           // 5% VAT
        return compact('subtotal', 'discount', 'vat') + ['total' => $subtotal - $discount + $vat];
    }

    public function lines(): array { return $this->lines; }
}

$tk = fn(int $paisa) => number_format($paisa / 100, 2) . ' Tk';

$keyboard = new Product('KB-01', 'Keyboard', 150000, 5);
$mouse = new Product('MS-02', 'Mouse', 45000, 2);

$cart = new Cart();
$cart->add($keyboard);
$cart->add($mouse, 2);
try {
    $cart->add($mouse);
} catch (OutOfStock $e) {
    echo "! ", $e->getMessage(), "\n";
}
$cart->applyCoupon('save10');

foreach ($cart->lines() as ['product' => $p, 'qty' => $q]) {
    printf("%-10s x%d %15s\n", $p->name, $q, $tk($p->price * $q));
}
foreach ($cart->totals() as $label => $amount) {
    printf("%-13s %15s\n", ucfirst($label), $tk($amount));
}` },
        { type: 'list', items: [
          'Challenge: persist the cart in the session as an array of SKU => qty.',
          'Challenge: add a FreeShipping coupon and a minimum order amount for coupons.',
          'Challenge: write PHPUnit tests for every rule.',
        ] },
      ],
    },
    {
      id: 'php-project-blog',
      title: 'Project 3: Mini Blog with SQLite',
      blocks: [
        { type: 'text', value: 'PDO, a repository, slugs, validation and an escaped HTML template: the core of every content site. Try it renders the generated page.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class PostRepository
{
    public function __construct(private PDO $db)
    {
        $db->exec('CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, body TEXT NOT NULL,
            published_at TEXT NOT NULL)');
    }

    public function create(string $title, string $body, string $date): int
    {
        $errors = [];
        if (mb_strlen(trim($title)) < 3) $errors[] = 'Title is too short';
        if (mb_strlen(trim($body)) < 20) $errors[] = 'Body is too short';
        if ($errors) throw new InvalidArgumentException(implode(', ', $errors));

        $slug = $this->uniqueSlug($title);
        $this->db->prepare('INSERT INTO posts (title, slug, body, published_at) VALUES (?, ?, ?, ?)')
            ->execute([trim($title), $slug, trim($body), $date]);
        return (int) $this->db->lastInsertId();
    }

    public function latest(int $limit = 10): array
    {
        $stmt = $this->db->prepare('SELECT * FROM posts ORDER BY published_at DESC LIMIT ?');
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    private function uniqueSlug(string $title): string
    {
        $base = trim(preg_replace('/[^a-z0-9]+/', '-', strtolower($title)), '-');
        $slug = $base; $n = 2;
        $check = $this->db->prepare('SELECT 1 FROM posts WHERE slug = ?');
        while ($check->execute([$slug]) && $check->fetchColumn()) $slug = $base . '-' . $n++;
        return $slug;
    }
}

$db = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$posts = new PostRepository($db);
$posts->create('Hello PHP!', 'This is my first post written with PDO and SQLite.', '2026-03-01');
$posts->create('Hello PHP!', 'Same title, so the slug gets a number to stay unique.', '2026-03-02');
$posts->create('<script>XSS</script> test', 'The title will be escaped in the template safely.', '2026-03-03');
try {
    $posts->create('Hi', 'short', '2026-03-04');
} catch (InvalidArgumentException $e) {
    echo "<!-- validation: {$e->getMessage()} -->\n";
}

$e = fn(string $s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
?>
<h1>My Blog</h1>
<?php foreach ($posts->latest() as $post): ?>
  <article>
    <h2><a href="/posts/<?= $e($post['slug']) ?>"><?= $e($post['title']) ?></a></h2>
    <small><?= date('j M Y', strtotime($post['published_at'])) ?> · /posts/<?= $e($post['slug']) ?></small>
    <p><?= $e($post['body']) ?></p>
  </article>
<?php endforeach; ?>` },
        { type: 'list', items: [
          'Challenge: add comments (a second table with post_id) and show the count per post without N+1 queries.',
          'Challenge: add pagination with LIMIT/OFFSET and "Older posts" links.',
          'Challenge: move to MySQL by changing only the DSN, and add a login so only admins can write posts.',
        ] },
      ],
    },
    {
      id: 'php-project-api',
      title: 'Project 4: URL Shortener API',
      blocks: [
        { type: 'text', value: 'A small but realistic JSON API: routing, validation, random codes, SQLite storage, click counting and proper status codes. Requests are simulated so it runs here; drop the classes into public/index.php to serve it for real.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class Shortener
{
    private const ALPHABET = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    public function __construct(private PDO $db)
    {
        $db->exec('CREATE TABLE IF NOT EXISTS links (code TEXT PRIMARY KEY, url TEXT NOT NULL, clicks INTEGER DEFAULT 0)');
    }

    public function shorten(string $url): string
    {
        if (!filter_var($url, FILTER_VALIDATE_URL) || !preg_match('#^https?://#', $url)) {
            throw new InvalidArgumentException('A valid http(s) URL is required');
        }
        do {
            $code = '';
            for ($i = 0; $i < 6; $i++) $code .= self::ALPHABET[random_int(0, strlen(self::ALPHABET) - 1)];
            $exists = $this->db->prepare('SELECT 1 FROM links WHERE code = ?');
            $exists->execute([$code]);
        } while ($exists->fetchColumn());
        $this->db->prepare('INSERT INTO links (code, url) VALUES (?, ?)')->execute([$code, $url]);
        return $code;
    }

    public function resolve(string $code): ?string
    {
        $stmt = $this->db->prepare('SELECT url FROM links WHERE code = ?');
        $stmt->execute([$code]);
        $url = $stmt->fetchColumn();
        if ($url === false) return null;
        $this->db->prepare('UPDATE links SET clicks = clicks + 1 WHERE code = ?')->execute([$code]);
        return $url;
    }

    public function stats(string $code): ?array
    {
        $stmt = $this->db->prepare('SELECT code, url, clicks FROM links WHERE code = ?');
        $stmt->execute([$code]);
        return $stmt->fetch() ?: null;
    }
}

function handle(Shortener $app, string $method, string $path, array $body = []): array
{
    try {
        return match (true) {
            $method === 'POST' && $path === '/api/links' => [201, ['code' => $app->shorten($body['url'] ?? '')]],
            $method === 'GET' && (bool) preg_match('#^/api/links/(\w+)$#', $path, $m) =>
                ($s = $app->stats($m[1])) ? [200, $s] : [404, ['error' => 'Not found']],
            $method === 'GET' && (bool) preg_match('#^/(\w+)$#', $path, $m) =>
                ($url = $app->resolve($m[1])) ? [302, ['Location' => $url]] : [404, ['error' => 'Not found']],
            default => [404, ['error' => 'Not found']],
        };
    } catch (InvalidArgumentException $e) {
        return [422, ['error' => $e->getMessage()]];
    }
}

$db = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$app = new Shortener($db);

[$status, $res] = handle($app, 'POST', '/api/links', ['url' => 'https://codenest.app/courses/php']);
echo "POST /api/links -> $status ", json_encode($res, JSON_UNESCAPED_SLASHES), "\n";
$code = $res['code'];

foreach ([['GET', "/$code"], ['GET', "/$code"], ['GET', "/api/links/$code"], ['GET', '/nope42']] as [$m, $p]) {
    [$status, $res] = handle($app, $m, $p);
    echo str_pad("$m $p", 24), " -> $status ", json_encode($res, JSON_UNESCAPED_SLASHES), "\n";
}
[$status, $res] = handle($app, 'POST', '/api/links', ['url' => 'javascript:alert(1)']);
echo "POST bad url -> $status ", json_encode($res), "\n";` },
        { type: 'list', items: [
          'Challenge: add an expiry date and return 410 Gone for expired links.',
          'Challenge: rate limit link creation per IP address.',
          'Challenge: require an API token (Authorization: Bearer ...) to create links.',
        ] },
      ],
    },
    {
      id: 'php-project-auth',
      title: 'Project 5: Secure Registration and Login',
      blocks: [
        { type: 'text', value: 'The security chapter in one program: validation, unique emails, password hashing, rehashing, login throttling and generic error messages. $session stands in for $_SESSION.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class AuthService
{
    private array $failures = [];

    public function __construct(private PDO $db, private array &$session)
    {
        $db->exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE, password_hash TEXT)');
    }

    public function register(string $name, string $email, string $password): int
    {
        $email = strtolower(trim($email));
        $errors = [];
        if (mb_strlen(trim($name)) < 2) $errors[] = 'name too short';
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'invalid email';
        if (mb_strlen($password) < 10) $errors[] = 'password needs 10+ characters';
        if ($errors) throw new InvalidArgumentException(implode(', ', $errors));

        try {
            $this->db->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
                ->execute([trim($name), $email, password_hash($password, PASSWORD_DEFAULT)]);
        } catch (PDOException) {
            throw new InvalidArgumentException('email already registered');
        }
        return (int) $this->db->lastInsertId();
    }

    public function attempt(string $email, string $password): bool
    {
        $email = strtolower(trim($email));
        if (($this->failures[$email] ?? 0) >= 3) {
            throw new RuntimeException('Too many attempts, try again in 15 minutes');
        }
        $stmt = $this->db->prepare('SELECT id, password_hash FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            $this->failures[$email] = ($this->failures[$email] ?? 0) + 1;
            return false;                                  // same answer for "no user" and "wrong password"
        }
        if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
            $this->db->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
                ->execute([password_hash($password, PASSWORD_DEFAULT), $user['id']]);
        }
        unset($this->failures[$email]);
        $this->session['user_id'] = (int) $user['id'];     // + session_regenerate_id(true) on a real server
        return true;
    }
}

$session = [];
$db = new PDO('sqlite::memory:', options: [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
$auth = new AuthService($db, $session);

echo "Registered user #", $auth->register('Nadia', 'Nadia@Example.com', 'Correct-Horse-7'), "\n";
foreach ([['x', 'bad', 'short'], ['Rafi', 'nadia@example.com', 'Another-Pass-9']] as [$n, $em, $pw]) {
    try { $auth->register($n, $em, $pw); } catch (InvalidArgumentException $e) { echo "Rejected: {$e->getMessage()}\n"; }
}

var_dump($auth->attempt('nadia@example.com', 'wrong'));
var_dump($auth->attempt('ghost@example.com', 'whatever'));
var_dump($auth->attempt('NADIA@example.com', 'Correct-Horse-7'));
echo "Session: ", json_encode($session), "\n";

foreach (range(1, 4) as $i) {
    try {
        $auth->attempt('ghost@example.com', "guess$i");
        echo "attempt $i failed\n";
    } catch (RuntimeException $e) {
        echo "attempt $i: ", $e->getMessage(), "\n";
    }
}` },
        { type: 'list', items: [
          'Challenge: add email verification with a random token that expires after 24 hours.',
          'Challenge: add a password reset flow (store only the hash of the reset token).',
          'Challenge: store failed attempts in the database so they survive between requests.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'Why does the cart store money in paisa (integers)?', options: ['To save memory', 'To avoid floating point rounding errors', 'Because PHP has no floats', 'For faster sorting'], answer: 1, explain: 'Integers of the smallest unit are exact; format only when displaying.' },
    { chapterId: 'projects', q: 'In the blog project, why is the slug checked in a loop?', options: ['To make it lowercase', 'To keep slugs unique by adding a number', 'To validate the title', 'To sort posts'], answer: 1, explain: 'Two posts with the same title get hello-php and hello-php-2.' },
    { chapterId: 'projects', q: 'Which status does the URL shortener return for an invalid URL?', options: ['200', '302', '404', '422'], answer: 3, explain: 'The request was understood but the input is invalid.' },
    { chapterId: 'projects', q: 'Why does the login return the same result for an unknown email and a wrong password?', options: ['It is simpler', 'So attackers cannot discover which emails are registered', 'PHP requires it', 'To save a query'], answer: 1, explain: 'Different messages leak which accounts exist.' },
    { chapterId: 'projects', q: 'Why does the shortener use random_int() for codes?', options: ['It is the fastest', 'Codes must be unpredictable', 'rand() does not exist', 'It returns strings'], answer: 1, explain: 'Predictable codes let people enumerate private links.' },
  ],
};
