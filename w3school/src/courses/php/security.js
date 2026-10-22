// PHP chapter: Security. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'security',
  title: 'Security',
  description: 'XSS, CSRF, passwords, injection and the OWASP Top 10',
  icon: 'security',
  lessons: [
    {
      id: 'php-xss',
      title: 'Cross-Site Scripting (XSS)',
      blocks: [
        { type: 'text', value: 'XSS happens when user input is printed into a page as HTML, so an attacker\'s <script> runs in other users\' browsers and can steal sessions or act as them. The fix: escape on OUTPUT, every time.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$comment = '<script>alert("hacked")</script><b>Nice post!</b>';
$name = 'O\'Brien "Ace"';

function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

echo "Unsafe:  ", $comment, "\n";
echo "Escaped: ", e($comment), "\n";

// Attributes need ENT_QUOTES so quotes cannot break out of value="..."
echo '<input value="' . e($name) . '">', "\n";

// URLs: also validate the scheme (javascript: links are XSS too)
$url = 'javascript:alert(1)';
$safeUrl = preg_match('#^https?://#i', $url) ? $url : '#';
echo '<a href="' . e($safeUrl) . '">link</a>', "\n";

// JSON for a <script> block
$data = ['msg' => '</script><script>alert(1)</script>'];
echo json_encode($data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT), "\n";` },
        { type: 'list', items: [
          'Template engines (Blade {{ }}, Twig {{ }}) escape automatically; raw output ({!! !!}, |raw) must be used only for trusted HTML.',
          'If users may write formatted text, use Markdown or an HTML sanitizer (HTML Purifier, symfony/html-sanitizer), never strip_tags() alone.',
          'Add a Content-Security-Policy header as a second line of defence.',
        ] },
      ],
    },
    {
      id: 'php-passwords',
      title: 'Storing Passwords',
      blocks: [
        { type: 'text', value: 'Never store passwords in plain text or with md5/sha1. password_hash() uses a slow, salted algorithm (bcrypt by default, or Argon2id), and password_verify() checks a login attempt.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$password = 'correct horse battery staple';

$hash = password_hash($password, PASSWORD_DEFAULT);
echo $hash, "\n";                 // includes algorithm, cost and a random salt
echo strlen($hash), " chars (store in VARCHAR(255))\n";

var_dump(password_verify($password, $hash));      // true
var_dump(password_verify('wrong guess', $hash));  // false

// Same password, different hash every time (random salt)
var_dump(password_hash($password, PASSWORD_DEFAULT) === $hash);

// Upgrade old hashes when the user logs in
$old = password_hash($password, PASSWORD_BCRYPT, ['cost' => 4]);
if (password_verify($password, $old) && password_needs_rehash($old, PASSWORD_DEFAULT, ['cost' => 12])) {
    $new = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
    echo "Rehashed with a stronger cost\n";
}

// Secure random tokens (reset links, API keys)
echo bin2hex(random_bytes(32)), "\n";
echo random_int(100000, 999999), " (OTP)\n";` },
        { type: 'note', value: 'Never use rand(), mt_rand() or uniqid() for anything security-related: they are predictable. Use random_bytes() and random_int().' },
      ],
    },
    {
      id: 'php-csrf',
      title: 'Cross-Site Request Forgery (CSRF)',
      blocks: [
        { type: 'text', value: 'CSRF tricks a logged-in user\'s browser into sending a request to your site from another site (for example a hidden form that transfers money). Protect every state-changing form with a secret token the attacker cannot know.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
final class Csrf
{
    public function __construct(private array &$session) {}

    public function token(): string
    {
        return $this->session['_csrf'] ??= bin2hex(random_bytes(32));
    }

    public function field(): string
    {
        return '<input type="hidden" name="_csrf" value="' . $this->token() . '">';
    }

    public function check(?string $submitted): bool
    {
        return is_string($submitted) && hash_equals($this->token(), $submitted);
    }
}

$session = [];                          // $_SESSION in a real app
$csrf = new Csrf($session);

// Rendering the form
echo $csrf->field(), "\n";

// Handling the POST
$legit = $session['_csrf'];
var_dump($csrf->check($legit));         // true: came from our form
var_dump($csrf->check('forged-value')); // false: reject with 419/403
var_dump($csrf->check(null));` },
        { type: 'list', items: [
          'Use SameSite=Lax (or Strict) session cookies as an extra layer.',
          'Never change data with GET requests (links, images): GET must be safe.',
          'Frameworks add this for you: @csrf in Laravel Blade, csrf_token() in Symfony forms.',
        ] },
      ],
    },
    {
      id: 'php-injection-other',
      title: 'Other Injection Risks',
      blocks: [
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// 1. Path traversal: user controls a file name
$requested = '../../etc/passwd';
$base = '/var/www/app/storage/invoices';
$safeName = basename($requested);                 // strips directories
echo "Would read: $base/$safeName\n";
// Better: look the file up by id in the database and never use user input as a path.

// 2. Command injection: never pass input to shell commands unescaped
$file = 'report.pdf; rm -rf /';
echo 'convert ' . escapeshellarg($file) . ' out.png', "\n";
// Best: avoid shell commands entirely, use PHP libraries.

// 3. Header injection in emails and redirects: reject new lines
$subject = "Hello\r\nBcc: victims@example.com";
var_dump(preg_match('/[\r\n]/', $subject) === 1);   // true -> reject

// 4. Open redirect: only redirect to your own paths
$next = 'https://evil.example/phish';
$target = str_starts_with($next, '/') && !str_starts_with($next, '//') ? $next : '/dashboard';
echo "Redirect to: $target\n";

// 5. Unserialize: never unserialize() user input (object injection). Use JSON.
$payload = '{"cart":[1,2,3]}';
print_r(json_decode($payload, true));` },
      ],
    },
    {
      id: 'php-auth-authorization',
      title: 'Authentication vs Authorization',
      blocks: [
        { type: 'text', value: 'Authentication answers "who are you?" (login). Authorization answers "are you allowed to do this?". Many real breaches are authorization bugs: user 5 changes the URL from /orders/12 to /orders/13 and sees someone else\'s order (IDOR).' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class Policy
{
    public function canViewOrder(array $user, array $order): bool
    {
        return $user['role'] === 'admin' || $order['user_id'] === $user['id'];
    }

    public function canDeletePost(array $user, array $post): bool
    {
        return match ($user['role']) {
            'admin' => true,
            'editor' => $post['status'] !== 'published',
            default => $post['author_id'] === $user['id'] && $post['status'] === 'draft',
        };
    }
}

$policy = new Policy();
$alice = ['id' => 5, 'role' => 'customer'];
$admin = ['id' => 1, 'role' => 'admin'];
$order13 = ['id' => 13, 'user_id' => 9];

foreach ([$alice, $admin] as $u) {
    echo "User {$u['id']} can view order 13? ", $policy->canViewOrder($u, $order13) ? 'yes' : 'NO (403)', "\n";
}

// Even safer: scope the query itself
// SELECT * FROM orders WHERE id = ? AND user_id = ?` },
        { type: 'note', value: 'Check authorization on the server for EVERY request. Hiding a button in the UI is not security.' },
      ],
    },
    {
      id: 'php-security-checklist',
      title: 'OWASP Top 10 and a Production Checklist',
      blocks: [
        { type: 'list', items: [
          'Broken access control: check permissions on every request (previous lesson).',
          'Cryptographic failures: HTTPS everywhere, password_hash(), never roll your own crypto (use sodium_* functions).',
          'Injection: prepared statements, escaping, no shell commands with input.',
          'Insecure design: rate limiting on login and OTP endpoints, lockouts, audit logs.',
          'Security misconfiguration: display_errors Off, expose_php Off, no phpinfo() page, no .git or .env reachable from the web.',
          'Vulnerable components: run composer audit and keep PHP and packages updated.',
          'Authentication failures: regenerate session ids, secure cookie flags, MFA for admins.',
          'Integrity failures: verify webhooks with HMAC signatures (hash_hmac + hash_equals).',
          'Logging and monitoring: log logins, permission failures and payments; alert on spikes.',
          'SSRF: when your server fetches a user-supplied URL, allow-list hosts and block internal IPs.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Security headers (or set them in Nginx)
header("Content-Security-Policy: default-src 'self'; img-src 'self' data:; object-src 'none'");
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Frame-Options: DENY');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');

// Verify a webhook signature
$payload = file_get_contents('php://input');
$expected = hash_hmac('sha256', $payload, $_ENV['WEBHOOK_SECRET']);
if (!hash_equals($expected, $_SERVER['HTTP_X_SIGNATURE'] ?? '')) {
    http_response_code(401);
    exit;
}` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'security', q: 'What is the main defence against XSS?', options: ['Prepared statements', 'Escaping output with htmlspecialchars()', 'Using HTTPS', 'Hashing passwords'], answer: 1, explain: 'Escape every value when you print it into HTML.' },
    { chapterId: 'security', q: 'Which function should hash passwords?', options: ['md5()', 'sha1()', 'password_hash()', 'base64_encode()'], answer: 2, explain: 'password_hash() is slow and salted; md5/sha1 are fast and crackable.' },
    { chapterId: 'security', q: 'What does a CSRF token prove?', options: ['The user is logged in', 'The form was rendered by your own site', 'The password is correct', 'The request used HTTPS'], answer: 1, explain: 'Another site cannot read the token, so it cannot forge a valid form.' },
    { chapterId: 'security', q: 'Which function generates a secure random token?', options: ['rand()', 'uniqid()', 'random_bytes()', 'mt_rand()'], answer: 2, explain: 'random_bytes() and random_int() are cryptographically secure.' },
    { chapterId: 'security', q: 'User 5 opens /orders/13 and sees another customer\'s order. What is this bug?', options: ['XSS', 'CSRF', 'Broken access control (IDOR)', 'SQL injection'], answer: 2, explain: 'The server never checked that order 13 belongs to user 5.' },
    { chapterId: 'security', q: 'Why use hash_equals() to compare tokens?', options: ['It is shorter', 'It compares in constant time, preventing timing attacks', 'It ignores case', 'It hashes the values first'], answer: 1, explain: '== can return early at the first different character.' },
    { chapterId: 'security', q: 'Why is unserialize() on user input dangerous?', options: ['It is slow', 'It can create arbitrary objects and trigger code (object injection)', 'It only works with arrays', 'It is deprecated'], answer: 1, explain: 'Use JSON for data that comes from outside.' },
  ],
};
