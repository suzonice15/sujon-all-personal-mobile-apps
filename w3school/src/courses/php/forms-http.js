// PHP chapter: Forms and HTTP. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it has no real web request, so samples fill $_GET / $_POST themselves.

export default {
  id: 'forms-http',
  title: 'Forms & HTTP',
  description: 'Requests, superglobals, form handling and validation',
  icon: 'dynamic-form',
  lessons: [
    {
      id: 'php-http-basics',
      title: 'HTTP in 5 Minutes',
      blocks: [
        { type: 'text', value: 'Every page load is an HTTP request from the browser and a response from the server. A backend developer must understand both.' },
        { type: 'code', lang: 'text', value: String.raw`POST /login HTTP/1.1                 <- method, path, version
Host: codenest.app
Content-Type: application/x-www-form-urlencoded
Cookie: PHPSESSID=abc123

email=nadia%40example.com&password=secret    <- body

HTTP/1.1 302 Found                   <- status code
Location: /dashboard                 <- headers
Set-Cookie: PHPSESSID=xyz789; HttpOnly; Secure` },
        { type: 'list', items: [
          'GET: read data; parameters in the URL (?page=2). Safe to repeat and bookmark.',
          'POST: create or change data; parameters in the body. Use it for forms that change something.',
          'PUT / PATCH / DELETE: update and delete, mostly in APIs.',
          'Status codes: 200 OK, 201 Created, 301/302 redirect, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Validation failed, 500 Server Error.',
        ] },
      ],
    },
    {
      id: 'php-superglobals',
      title: 'Superglobals: $_GET, $_POST, $_SERVER',
      blocks: [
        { type: 'text', value: 'PHP fills special arrays for every request. They are available everywhere, even inside functions.' },
        { type: 'list', items: [
          '$_GET: query string parameters (/search.php?q=php&page=2).',
          '$_POST: form fields sent with method="post".',
          '$_FILES: uploaded files.',
          '$_COOKIE and $_SESSION: cookies and session data.',
          '$_SERVER: request info: REQUEST_METHOD, REQUEST_URI, HTTP_HOST, REMOTE_ADDR, HTTP_USER_AGENT.',
          '$_REQUEST mixes GET, POST and COOKIE: avoid it, be explicit about where data comes from.',
        ] },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Simulate a request to /search.php?q=laravel&page=2
$_SERVER['REQUEST_METHOD'] = 'GET';
$_GET = ['q' => 'laravel', 'page' => '2'];

$query = trim($_GET['q'] ?? '');
$page = max(1, (int) ($_GET['page'] ?? 1));   // query values are ALWAYS strings

echo "Method: {$_SERVER['REQUEST_METHOD']}\n";
echo "Searching for '$query', page $page\n";

// Build URLs with http_build_query (it encodes everything correctly)
$next = '/search.php?' . http_build_query(['q' => $query, 'page' => $page + 1]);
echo "Next page: $next\n";

// Parse a URL
print_r(parse_url('https://codenest.app/courses/php?tab=quiz#q3'));` },
        { type: 'note', value: 'Everything that comes from the request is user input: strings that may be missing, empty or malicious. Validate it, cast it, and escape it when you output it.' },
      ],
    },
    {
      id: 'php-form-handling',
      title: 'Handling a Form',
      blocks: [
        { type: 'text', value: 'The classic pattern: one script shows the form on GET and processes it on POST. On success redirect (Post/Redirect/Get) so refreshing the page does not submit twice.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// contact.php
$errors = [];
$old = ['name' => '', 'email' => '', 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $old = [
        'name' => trim($_POST['name'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'message' => trim($_POST['message'] ?? ''),
    ];

    if ($old['name'] === '') $errors['name'] = 'Name is required.';
    if (!filter_var($old['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Enter a valid email.';
    if (mb_strlen($old['message']) < 10) $errors['message'] = 'Message must be at least 10 characters.';

    if (!$errors) {
        // save to database / send email here...
        header('Location: /contact.php?sent=1');   // Post/Redirect/Get
        exit;
    }
}
$e = fn($v) => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
?>
<?php if (isset($_GET['sent'])): ?>
  <p class="success">Thanks! We will reply soon.</p>
<?php endif; ?>

<form method="post" action="/contact.php">
  <input name="name" value="<?= $e($old['name']) ?>">
  <?php if (isset($errors['name'])): ?><small><?= $errors['name'] ?></small><?php endif; ?>

  <input name="email" type="email" value="<?= $e($old['email']) ?>">
  <?php if (isset($errors['email'])): ?><small><?= $errors['email'] ?></small><?php endif; ?>

  <textarea name="message"><?= $e($old['message']) ?></textarea>
  <button>Send</button>
</form>` },
        { type: 'list', items: [
          'Keep the user\'s input ($old) so they do not retype everything after an error.',
          'Show errors next to each field.',
          'Always escape output with htmlspecialchars() (XSS protection).',
          'exit after header(\'Location: ...\') so nothing else runs.',
        ] },
      ],
    },
    {
      id: 'php-validation',
      title: 'Validating Input',
      blocks: [
        { type: 'text', value: 'filter_var() validates and converts common formats. Server-side validation is mandatory: HTML required attributes and JavaScript checks are easy to bypass.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
var_dump(filter_var('nadia@example.com', FILTER_VALIDATE_EMAIL));   // the email
var_dump(filter_var('not-an-email', FILTER_VALIDATE_EMAIL));        // false
var_dump(filter_var('42', FILTER_VALIDATE_INT));                    // int(42)
var_dump(filter_var('42abc', FILTER_VALIDATE_INT));                 // false
var_dump(filter_var('17', FILTER_VALIDATE_INT, ['options' => ['min_range' => 18]])); // false
var_dump(filter_var('yes', FILTER_VALIDATE_BOOLEAN));               // true
var_dump(filter_var('https://codenest.app', FILTER_VALIDATE_URL));

// A small reusable validator
function validate(array $data, array $rules): array
{
    $errors = [];
    foreach ($rules as $field => $fieldRules) {
        $value = trim((string) ($data[$field] ?? ''));
        foreach (explode('|', $fieldRules) as $rule) {
            [$name, $arg] = array_pad(explode(':', $rule, 2), 2, null);
            $error = match ($name) {
                'required' => $value === '' ? "$field is required" : null,
                'email' => $value !== '' && !filter_var($value, FILTER_VALIDATE_EMAIL) ? "$field must be an email" : null,
                'min' => mb_strlen($value) < (int) $arg ? "$field must be at least $arg characters" : null,
                'numeric' => $value !== '' && !is_numeric($value) ? "$field must be a number" : null,
                default => null,
            };
            if ($error) { $errors[$field] = $error; break; }
        }
    }
    return $errors;
}

$_POST = ['name' => 'Al', 'email' => 'al@', 'age' => 'twenty'];
print_r(validate($_POST, [
    'name' => 'required|min:3',
    'email' => 'required|email',
    'age' => 'required|numeric',
]));` },
        { type: 'note', value: 'This is the same idea as Laravel\'s $request->validate([...]). Writing it once yourself makes frameworks feel obvious.' },
      ],
    },
    {
      id: 'php-headers-redirects',
      title: 'Headers, Status Codes and Redirects',
      blocks: [
        { type: 'text', value: 'header() sends HTTP headers. Headers must be sent BEFORE any output (even a space or a BOM), otherwise you get "headers already sent".' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Redirect
header('Location: /login.php', true, 302);
exit;

// Status code
http_response_code(404);
echo 'Page not found';

// JSON response
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => true]);

// Force a file download
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="report.csv"');
readfile('/path/to/report.csv');

// Caching
header('Cache-Control: no-store');           // never cache (account pages)
header('Cache-Control: public, max-age=3600'); // cache for 1 hour` },
        { type: 'note', value: 'Output buffering (ob_start()) can hide "headers already sent" problems, but the real fix is to do all logic first and output HTML last.' },
      ],
    },
    {
      id: 'php-file-uploads',
      title: 'File Uploads',
      blocks: [
        { type: 'text', value: 'Uploads need method="post" and enctype="multipart/form-data". PHP stores the file in a temporary location and describes it in $_FILES. Never trust the file name or the type the browser sends.' },
        { type: 'code', lang: 'php', value: String.raw`<!-- form -->
<form method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" accept="image/*">
  <button>Upload</button>
</form>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['avatar'] ?? null;

    if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
        exit('Upload failed.');
    }
    if ($file['size'] > 2 * 1024 * 1024) {
        exit('Max 2 MB.');
    }

    // Check the REAL content type, not the browser-supplied one
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    if (!isset($allowed[$mime])) {
        exit('Only JPG, PNG or WEBP.');
    }

    // Generate a safe name; never use $file['name'] directly
    $name = bin2hex(random_bytes(16)) . '.' . $allowed[$mime];
    move_uploaded_file($file['tmp_name'], __DIR__ . '/uploads/' . $name);
    echo 'Saved as ' . $name;
}` },
        { type: 'list', items: [
          'Limit sizes in php.ini too: upload_max_filesize and post_max_size.',
          'Store uploads outside the web root, or make sure the uploads folder cannot execute PHP.',
          'For big apps store files in object storage (Amazon S3, Cloudflare R2) instead of the server disk.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'forms-http', q: 'Which superglobal holds query string values like ?page=2?', options: ['$_POST', '$_GET', '$_SERVER', '$_FILES'], answer: 1, explain: 'URL parameters are in $_GET.' },
    { chapterId: 'forms-http', q: 'What type are values in $_GET and $_POST?', options: ['Whatever the user typed: int, bool...', 'Always strings (or arrays)', 'Always int', 'JSON'], answer: 1, explain: 'Request values arrive as strings: cast and validate them.' },
    { chapterId: 'forms-http', q: 'What is the Post/Redirect/Get pattern for?', options: ['Faster pages', 'Preventing double submission when the user refreshes', 'Encrypting forms', 'Uploading files'], answer: 1, explain: 'After a successful POST, redirect to a GET page.' },
    { chapterId: 'forms-http', q: 'What causes "headers already sent"?', options: ['Calling header() twice', 'Output sent before header() or session_start()', 'A missing semicolon', 'Too many cookies'], answer: 1, explain: 'Headers must be sent before any body output.' },
    { chapterId: 'forms-http', q: 'Which form attribute is required for file uploads?', options: ['method="get"', 'enctype="multipart/form-data"', 'accept="files"', 'upload="true"'], answer: 1, explain: 'Files are only sent with multipart/form-data and POST.' },
    { chapterId: 'forms-http', q: 'How should you check an uploaded file\'s type?', options: ['Trust $_FILES[...]["type"]', 'Check the file extension', 'Inspect the real content with finfo', 'Check the file name'], answer: 2, explain: 'The browser-supplied type and name can be faked.' },
    { chapterId: 'forms-http', q: 'Which status code fits a form that failed validation in an API?', options: ['200', '302', '422', '500'], answer: 2, explain: '422 Unprocessable Content means the input was understood but invalid.' },
  ],
};
