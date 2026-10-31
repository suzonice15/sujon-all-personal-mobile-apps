// PHP chapter: Building REST APIs. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it has no real HTTP server, so the router samples dispatch simulated requests.

export default {
  id: 'rest-api',
  title: 'Building REST APIs',
  description: 'JSON APIs, routing, status codes, auth and calling other APIs',
  icon: 'api',
  lessons: [
    {
      id: 'php-rest-design',
      title: 'REST API Design',
      blocks: [
        { type: 'text', value: 'Mobile apps and JavaScript frontends (like the React and Vue courses) talk to a PHP backend through a JSON API. REST maps resources to URLs and actions to HTTP methods.' },
        { type: 'code', lang: 'text', value: String.raw`GET    /api/products          list (with ?page=2&search=mouse)
GET    /api/products/42       one product
POST   /api/products          create            -> 201 Created + Location header
PUT    /api/products/42       replace
PATCH  /api/products/42       partial update
DELETE /api/products/42       delete            -> 204 No Content
GET    /api/users/7/orders    nested resource

Errors: 400 bad JSON, 401 not logged in, 403 not allowed, 404 not found,
        409 conflict, 422 validation failed, 429 too many requests, 500 bug` },
        { type: 'list', items: [
          'Use plural nouns for resources, never verbs (/api/createProduct is not REST).',
          'Return a consistent shape: { "data": ... } on success, { "error": { "message", "fields" } } on failure.',
          'Version your API: /api/v1/... so old mobile app versions keep working.',
        ] },
      ],
    },
    {
      id: 'php-json-endpoint',
      title: 'A JSON Endpoint',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// public/api/products.php
declare(strict_types=1);
require __DIR__ . '/../../bootstrap.php';     // gives $pdo

header('Content-Type: application/json; charset=utf-8');

function respond(mixed $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $page = max(1, (int) ($_GET['page'] ?? 1));
    $stmt = $pdo->prepare('SELECT id, name, price FROM products ORDER BY id LIMIT 20 OFFSET ?');
    $stmt->execute([($page - 1) * 20]);
    respond(['data' => $stmt->fetchAll(), 'page' => $page]);
}

if ($method === 'POST') {
    // JSON bodies are NOT in $_POST: read the raw input
    try {
        $input = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        respond(['error' => ['message' => 'Invalid JSON']], 400);
    }
    $errors = [];
    if (trim($input['name'] ?? '') === '') $errors['name'] = 'Required';
    if (!is_int($input['price'] ?? null) || $input['price'] < 0) $errors['price'] = 'Must be a positive integer';
    if ($errors) respond(['error' => ['message' => 'Validation failed', 'fields' => $errors]], 422);

    $pdo->prepare('INSERT INTO products (name, price) VALUES (?, ?)')->execute([$input['name'], $input['price']]);
    $id = (int) $pdo->lastInsertId();
    header("Location: /api/products/$id");
    respond(['data' => ['id' => $id, ...$input]], 201);
}

header('Allow: GET, POST');
respond(['error' => ['message' => 'Method not allowed']], 405);` },
        { type: 'code', lang: 'text', value: String.raw`$ curl -X POST http://localhost:8000/api/products.php \
       -H "Content-Type: application/json" -d '{"name":"Webcam","price":2500}'
{"data":{"id":4,"name":"Webcam","price":2500}}` },
      ],
    },
    {
      id: 'php-router',
      title: 'Writing a Router',
      blocks: [
        { type: 'text', value: 'A front controller (one public/index.php) receives every request, and a router maps method + path to a handler. Here is a compact router with path parameters, the same idea used by every framework.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

final class Router
{
    private array $routes = [];

    public function add(string $method, string $pattern, callable $handler): void
    {
        // /products/{id} -> #^/products/(?<id>[^/]+)$#
        $regex = '#^' . preg_replace('#\{(\w+)\}#', '(?<$1>[^/]+)', $pattern) . '$#';
        $this->routes[] = [$method, $regex, $handler];
    }

    public function dispatch(string $method, string $uri): array
    {
        $path = parse_url($uri, PHP_URL_PATH);
        $allowed = [];
        foreach ($this->routes as [$m, $regex, $handler]) {
            if (!preg_match($regex, $path, $matches)) continue;
            if ($m !== $method) { $allowed[] = $m; continue; }
            $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
            return [200, $handler(...$params)];
        }
        return $allowed ? [405, ['error' => 'Method not allowed']] : [404, ['error' => 'Not found']];
    }
}

$products = [1 => ['id' => 1, 'name' => 'Keyboard'], 2 => ['id' => 2, 'name' => 'Mouse']];

$router = new Router();
$router->add('GET', '/api/products', fn() => ['data' => array_values($products)]);
$router->add('GET', '/api/products/{id}', fn(string $id) => isset($products[(int) $id])
    ? ['data' => $products[(int) $id]]
    : ['error' => "Product $id not found"]);
$router->add('DELETE', '/api/products/{id}', fn(string $id) => ['deleted' => (int) $id]);

foreach ([['GET', '/api/products'], ['GET', '/api/products/2?x=1'], ['DELETE', '/api/products/1'],
          ['POST', '/api/products/1'], ['GET', '/nope']] as [$method, $uri]) {
    [$status, $body] = $router->dispatch($method, $uri);
    echo str_pad("$method $uri", 28), " $status ", json_encode($body), "\n";
}` },
        { type: 'note', value: 'In production use a tested router such as nikic/fast-route or a framework. Writing one teaches you exactly what they do.' },
      ],
    },
    {
      id: 'php-api-auth',
      title: 'API Authentication with Tokens',
      blocks: [
        { type: 'text', value: 'APIs usually do not use cookies. The client sends a token in the Authorization header on every request. Two common choices: opaque tokens stored (hashed) in your database, or signed JWTs.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// A minimal HS256 JWT, to understand what libraries like firebase/php-jwt do
function b64url(string $data): string { return rtrim(strtr(base64_encode($data), '+/', '-_'), '='); }

function jwtEncode(array $claims, string $secret): string
{
    $header = b64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = b64url(json_encode($claims));
    $signature = b64url(hash_hmac('sha256', "$header.$payload", $secret, true));
    return "$header.$payload.$signature";
}

function jwtDecode(string $token, string $secret, int $now): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$h, $p, $s] = $parts;
    $expected = b64url(hash_hmac('sha256', "$h.$p", $secret, true));
    if (!hash_equals($expected, $s)) return null;                 // tampered
    $claims = json_decode(base64_decode(strtr($p, '-_', '+/')), true);
    return ($claims['exp'] ?? 0) > $now ? $claims : null;          // expired
}

$secret = 'change-me-to-32-random-bytes';
$now = 1_800_000_000;
$token = jwtEncode(['sub' => 42, 'role' => 'student', 'exp' => $now + 3600], $secret);
echo $token, "\n\n";

print_r(jwtDecode($token, $secret, $now));
var_dump(jwtDecode($token, 'wrong-secret', $now));
var_dump(jwtDecode($token, $secret, $now + 7200));   // after expiry

// The client sends: Authorization: Bearer <token>
$header = "Bearer $token";
if (preg_match('/^Bearer\s+(\S+)$/', $header, $m)) echo "\nToken extracted, length ", strlen($m[1]), "\n";` },
        { type: 'note', value: 'A JWT payload is only base64, not encrypted: never put secrets in it. Keep access tokens short-lived and use refresh tokens. For first-party apps, Laravel Sanctum style database tokens are simpler and can be revoked.' },
      ],
    },
    {
      id: 'php-cors-rate-limit',
      title: 'CORS, Rate Limiting and Pagination',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// CORS: allow a browser app on another origin to call the API
$allowedOrigins = ['https://app.codenest.app', 'http://localhost:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {   // preflight request
    http_response_code(204);
    exit;
}` },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
// Fixed-window rate limiter (in production keep counters in Redis with INCR + EXPIRE)
final class RateLimiter
{
    private array $hits = [];

    public function __construct(private int $max, private int $windowSeconds) {}

    public function attempt(string $key, int $now): bool
    {
        $window = intdiv($now, $this->windowSeconds);
        $bucket = "$key:$window";
        $this->hits[$bucket] = ($this->hits[$bucket] ?? 0) + 1;
        return $this->hits[$bucket] <= $this->max;
    }
}

$limiter = new RateLimiter(max: 3, windowSeconds: 60);
foreach ([0, 5, 10, 15, 61] as $t) {
    $ok = $limiter->attempt('login:192.0.2.7', 1_800_000_000 + $t);
    echo "t+{$t}s: ", $ok ? '200 OK' : '429 Too Many Requests', "\n";
}

// Pagination metadata that clients love
function paginate(int $total, int $page, int $perPage): array
{
    $last = max(1, (int) ceil($total / $perPage));
    return ['total' => $total, 'per_page' => $perPage, 'current_page' => $page,
            'last_page' => $last, 'next_page' => $page < $last ? $page + 1 : null];
}
print_r(paginate(95, 3, 20));` },
      ],
    },
    {
      id: 'php-consuming-apis',
      title: 'Calling Other APIs',
      blocks: [
        { type: 'text', value: 'Backends often call external services: payment gateways, SMS providers, maps. Use cURL or, better, the Guzzle library. Always set timeouts and handle failures.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// With cURL (built into PHP)
$ch = curl_init('https://api.example.com/sms');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode(['to' => '01712345678', 'text' => 'Your OTP is 482913']),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Authorization: Bearer ' . $_ENV['SMS_KEY']],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_TIMEOUT => 10,
]);
$body = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($body === false || $status >= 400) {
    error_log('SMS failed: ' . curl_error($ch) . " status $status");
}
curl_close($ch);

// With Guzzle (composer require guzzlehttp/guzzle)
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

$client = new Client(['base_uri' => 'https://api.example.com/', 'timeout' => 10]);
try {
    $res = $client->post('sms', ['json' => ['to' => '01712345678', 'text' => 'Hi']]);
    $data = json_decode((string) $res->getBody(), true);
} catch (RequestException $e) {
    // retry later with a queue, or show a friendly message
}` },
        { type: 'note', value: 'Slow external calls should not block the user: push them to a queue (Redis, RabbitMQ, Laravel queues) and process them in a background worker.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'rest-api', q: 'Which HTTP method and status fit creating a resource?', options: ['GET 200', 'POST 201', 'PUT 204', 'DELETE 201'], answer: 1, explain: 'POST creates; 201 Created (with a Location header) confirms it.' },
    { chapterId: 'rest-api', q: 'Where is a JSON request body in PHP?', options: ['$_POST', '$_GET', 'php://input', '$_SERVER["BODY"]'], answer: 2, explain: '$_POST is only filled for form encodings; read JSON from php://input.' },
    { chapterId: 'rest-api', q: 'Which status code means "too many requests"?', options: ['403', '409', '429', '503'], answer: 2, explain: '429 is returned by rate limiters, often with a Retry-After header.' },
    { chapterId: 'rest-api', q: 'Is the payload of a JWT encrypted?', options: ['Yes, always', 'No, it is only base64-encoded and signed', 'Only with HS256', 'Only on HTTPS'], answer: 1, explain: 'Anyone can read it; the signature only proves it was not changed.' },
    { chapterId: 'rest-api', q: 'What is a CORS preflight request?', options: ['A login request', 'An OPTIONS request the browser sends to ask permission before a cross-origin call', 'A cached GET', 'A server-to-server call'], answer: 1, explain: 'The server answers with Access-Control-Allow-* headers.' },
    { chapterId: 'rest-api', q: 'Which is a RESTful URL to delete product 42?', options: ['GET /deleteProduct?id=42', 'POST /products/delete/42', 'DELETE /products/42', 'DELETE /product-delete'], answer: 2, explain: 'The method expresses the action; the URL names the resource.' },
  ],
};
