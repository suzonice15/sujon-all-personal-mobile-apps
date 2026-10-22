// PHP chapter: Sessions and Cookies. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Sessions need a real browser round trip, so most samples here are read-only.

export default {
  id: 'sessions-cookies',
  title: 'Sessions & Cookies',
  description: 'Remembering users between requests, login and logout',
  icon: 'cookie',
  lessons: [
    {
      id: 'php-cookies',
      title: 'Cookies',
      blocks: [
        { type: 'text', value: 'HTTP is stateless. A cookie is a small piece of text the server asks the browser to store and send back with every request to the same site. Use cookies for small, non-secret preferences.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Set a cookie (before any output!)
setcookie('theme', 'dark', [
    'expires' => time() + 60 * 60 * 24 * 30,   // 30 days
    'path' => '/',
    'secure' => true,       // only over HTTPS
    'httponly' => true,     // JavaScript cannot read it
    'samesite' => 'Lax',    // not sent on most cross-site requests (CSRF protection)
]);

// Read it on the NEXT request
$theme = $_COOKIE['theme'] ?? 'light';

// Delete: set an expiry in the past
setcookie('theme', '', ['expires' => time() - 3600, 'path' => '/']);` },
        { type: 'list', items: [
          'Cookies are limited to about 4 KB each.',
          'The user can see and edit cookies: never store passwords, roles or prices in them.',
          'A cookie set now appears in $_COOKIE only on the next request.',
        ] },
      ],
    },
    {
      id: 'php-sessions',
      title: 'Sessions',
      blocks: [
        { type: 'text', value: 'A session keeps data on the SERVER. The browser only holds a random session id in a cookie (PHPSESSID). That makes sessions the right place for the logged-in user, a cart or flash messages.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
session_start();            // must run before any output, on every page that uses the session

// Write
$_SESSION['user_id'] = 42;
$_SESSION['cart'][] = ['product_id' => 7, 'qty' => 2];

// Read
$userId = $_SESSION['user_id'] ?? null;
$items = count($_SESSION['cart'] ?? []);

// Remove one value
unset($_SESSION['cart']);

// Destroy the whole session (logout)
$_SESSION = [];
session_destroy();` },
        { type: 'heading', value: 'Secure session settings (php.ini or before session_start)' },
        { type: 'code', lang: 'php', value: String.raw`<?php
ini_set('session.use_strict_mode', '1');     // reject ids the server did not create
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_secure', '1');       // HTTPS only
ini_set('session.cookie_samesite', 'Lax');
session_start();` },
        { type: 'note', value: 'By default sessions are files on the server. With several servers behind a load balancer, store sessions in Redis or the database so every server sees them.' },
      ],
    },
    {
      id: 'php-login-logout',
      title: 'Login and Logout Flow',
      blocks: [
        { type: 'text', value: 'The complete, secure login flow: verify the password hash, regenerate the session id, store only the user id, and check it on protected pages.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// login.php
session_start();
require __DIR__ . '/db.php';   // gives $pdo

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        session_regenerate_id(true);          // prevents session fixation
        $_SESSION['user_id'] = $user['id'];
        header('Location: /dashboard.php');
        exit;
    }
    $error = 'Wrong email or password.';     // same message for both cases
}

// auth.php: include at the top of every protected page
session_start();
if (empty($_SESSION['user_id'])) {
    header('Location: /login.php');
    exit;
}

// logout.php (use a POST form with a CSRF token, not a plain link)
session_start();
$_SESSION = [];
setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => '/']);
session_destroy();
header('Location: /login.php');
exit;` },
        { type: 'list', items: [
          'Never tell attackers which part was wrong ("email not found" vs "wrong password").',
          'Store the user id, not the whole user row; load fresh data from the database when needed.',
          'Add rate limiting (for example 5 attempts per 15 minutes) against password guessing.',
        ] },
      ],
    },
    {
      id: 'php-flash-messages',
      title: 'Flash Messages',
      blocks: [
        { type: 'text', value: 'A flash message is shown once on the next page ("Profile saved!") and then removed. It is a tiny pattern you will see in every framework. Here $session stands in for $_SESSION so you can run it.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
final class Flash
{
    public function __construct(private array &$session) {}

    public function set(string $type, string $message): void
    {
        $this->session['_flash'][$type][] = $message;
    }

    /** Returns all messages and removes them. */
    public function pull(): array
    {
        $messages = $this->session['_flash'] ?? [];
        unset($this->session['_flash']);
        return $messages;
    }
}

$session = [];                // in a real app: $_SESSION after session_start()
$flash = new Flash($session);

// Request 1: after saving the form
$flash->set('success', 'Profile saved!');
$flash->set('info', 'Check your email to confirm the change.');

// Request 2: the page after the redirect
foreach ($flash->pull() as $type => $messages) {
    foreach ($messages as $m) echo "[$type] $m\n";
}

// Request 3: nothing left
var_dump($flash->pull());` },
      ],
    },
    {
      id: 'php-remember-me',
      title: 'Remember Me Tokens',
      blocks: [
        { type: 'text', value: 'Sessions end when the browser closes or after a timeout. "Remember me" uses a long-lived cookie with a random token, while the database stores only the HASH of that token.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// On login with "remember me" checked
$selector = bin2hex(random_bytes(9));        // public lookup key
$validator = bin2hex(random_bytes(32));      // secret
$pdo->prepare('INSERT INTO auth_tokens (selector, hashed_validator, user_id, expires_at) VALUES (?, ?, ?, ?)')
    ->execute([$selector, hash('sha256', $validator), $userId, date('Y-m-d H:i:s', strtotime('+30 days'))]);

setcookie('remember', "$selector:$validator", [
    'expires' => strtotime('+30 days'), 'path' => '/',
    'secure' => true, 'httponly' => true, 'samesite' => 'Lax',
]);

// On a later visit without a session
[$selector, $validator] = explode(':', $_COOKIE['remember'] ?? '', 2) + [null, null];
$row = /* SELECT ... WHERE selector = ? AND expires_at > NOW() */ null;
if ($row && hash_equals($row['hashed_validator'], hash('sha256', $validator))) {
    session_regenerate_id(true);
    $_SESSION['user_id'] = $row['user_id'];
    // rotate: delete this token and issue a new one
}` },
        { type: 'note', value: 'hash_equals() compares in constant time, so attackers cannot guess the token character by character from response times.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'sessions-cookies', q: 'Where is session data stored?', options: ['In the browser cookie', 'On the server', 'In the URL', 'In localStorage'], answer: 1, explain: 'Only the session id travels in a cookie; the data stays on the server.' },
    { chapterId: 'sessions-cookies', q: 'What must you call before using $_SESSION?', options: ['session_open()', 'session_start()', 'session_begin()', 'Nothing'], answer: 1, explain: 'session_start() loads or creates the session.' },
    { chapterId: 'sessions-cookies', q: 'Why call session_regenerate_id(true) after login?', options: ['To log the user out', 'To prevent session fixation attacks', 'To clear the cart', 'To speed up the session'], answer: 1, explain: 'A fresh id means an attacker cannot reuse an id they planted before login.' },
    { chapterId: 'sessions-cookies', q: 'What does the HttpOnly cookie flag do?', options: ['Only sends over HTTP, not HTTPS', 'Stops JavaScript from reading the cookie', 'Makes the cookie permanent', 'Encrypts the cookie'], answer: 1, explain: 'HttpOnly protects session cookies from theft via XSS.' },
    { chapterId: 'sessions-cookies', q: 'When does a newly set cookie appear in $_COOKIE?', options: ['Immediately', 'On the next request', 'After the session starts', 'Never'], answer: 1, explain: 'The browser sends it back with the following request.' },
    { chapterId: 'sessions-cookies', q: 'What should a "remember me" table store?', options: ['The plain token', 'The user password', 'A hash of the token', 'The session id'], answer: 2, explain: 'Like passwords, tokens are stored hashed so a database leak does not expose them.' },
  ],
};
