// Laravel chapter: Security. Lessons plus this chapter's quiz questions.

export default {
  id: 'security',
  title: 'Security',
  description: 'CSRF, XSS, injection, hashing and production hardening',
  icon: 'shield',
  lessons: [
    {
      id: 'laravel-csrf',
      title: 'CSRF Protection',
      blocks: [
        { type: 'text', value: 'Cross-site request forgery makes a logged-in browser send a state-changing request to your app from another site. Laravel protects web routes with the VerifyCsrfToken middleware: every POST, PUT, PATCH and DELETE must carry a token that only your pages can render.' },
        { type: 'code', lang: 'html', value: String.raw`{{-- A normal form: @csrf adds the hidden token --}}
<form method="POST" action="{{ route('posts.store') }}">
  @csrf
  <input type="text" name="title" value="{{ old('title') }}">
  <button type="submit">Publish</button>
</form>

{{-- HTML forms cannot send PUT or DELETE, so spoof the method --}}
<form method="POST" action="{{ route('posts.update', $post) }}">
  @csrf
  @method('PUT')
  <input type="text" name="title" value="{{ $post->title }}">
  <button type="submit">Save</button>
</form>` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// bootstrap/app.php: exclude only endpoints that must be stateless
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'stripe/webhook',
        'api/*',
    ]);
})` },
        { type: 'list', items: [
          'Never disable CSRF globally to "fix" a 419 error; find the request that is missing the token.',
          'JavaScript clients should read the token from a meta tag or the XSRF-TOKEN cookie and send it back.',
          'GET requests must never change data, because they are not protected by a token.',
          'SameSite=lax on the session cookie adds a second layer of defence.',
        ] },
        { type: 'note', value: 'A 419 Page Expired response almost always means the CSRF token was missing, stale, or the session expired. It is a protection working, not a bug to silence.' },
      ],
    },
    {
      id: 'laravel-xss',
      title: 'XSS and Output Escaping',
      blocks: [
        { type: 'text', value: 'Cross-site scripting runs attacker JavaScript in another user browser. The cause is unescaped output, not malicious input by itself. Blade escapes every value printed with double braces, so the default is safe; the risk is raw output.' },
        { type: 'code', lang: 'html', value: String.raw`{{-- Safe: HTML characters are escaped --}}
<p>{{ $comment->body }}</p>

{{-- Dangerous: only use with HTML you fully trust and sanitised --}}
<div>{!! $trustedHtml !!}</div>

{{-- Attributes are escaped too --}}
<input value="{{ $user->name }}">

{{-- Never put user input directly in a script or an event handler --}}
<script>
  window.user = @json($user);
</script>` },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Str;

// If users may write rich text, sanitise it before storing or rendering
$clean = Str::of($request->input('body'))
    ->stripTags('<p><strong><em><ul><li><a>')
    ->toString();

// For anything more complex, use a dedicated HTML sanitiser package
// and allow-list elements, attributes and URL schemes.` },
        { type: 'list', items: [
          'Prefer {{ }} everywhere; every use of {!! !!} needs a written justification.',
          'Sanitise rich HTML with a real sanitiser, not strip_tags alone, which leaves attributes such as onerror.',
          'Add a Content-Security-Policy header to reduce the impact of any missed escape.',
          'Escape values for their context: HTML text, an HTML attribute, a URL and JavaScript each need different handling.',
        ] },
        { type: 'note', value: 'Stored XSS is worse than reflected XSS because the payload is saved and served to every visitor. Treat any user-authored HTML field as hostile until sanitised.' },
      ],
    },
    {
      id: 'laravel-mass-assignment-security',
      title: 'Mass Assignment',
      blocks: [
        { type: 'text', value: 'Mass assignment is passing an array straight into a model. If the model accepts every column, a user can add is_admin=1 to a form and promote themselves. Laravel blocks this by default: only fillable attributes, or everything except guarded attributes, can be assigned.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // Only these fields may be filled from an array
    protected $fillable = [
        'title',
        'body',
        'status',
    ];

    // Or, if the model is small and fully controlled by your code:
    // protected $guarded = ['id', 'user_id', 'created_at'];
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Dangerous: the whole request, including any field the attacker adds
$post = Post::create($request->all());

// Safe: only validated fields, and set ownership explicitly
$data = $request->validate([
    'title' => ['required', 'string', 'max:120'],
    'body' => ['required', 'string'],
]);

$post = $request->user()->posts()->create($data);

// Never allow a role or ownership field to come from the request
$user->update(['role' => 'admin']); // only in trusted server code` },
        { type: 'list', items: [
          'Use validated data, not request->all(), when creating or updating a model.',
          'Keep user_id and role out of fillable; assign them from the authenticated user or server logic.',
          'An empty guarded array means everything is mass assignable, which is effectively no protection.',
          'Review every fillable change in code review; it is a security boundary, not a convenience list.',
        ] },
        { type: 'note', value: 'The classic exploit is a registration form that accepts name and email. An attacker adds is_admin=1. If User has is_admin in fillable, the new account is an administrator.' },
      ],
    },
    {
      id: 'laravel-sql-injection-defense',
      title: 'SQL Injection Defense',
      blocks: [
        { type: 'text', value: 'SQL injection happens when input becomes part of the SQL string. Eloquent and the query builder send values as bound parameters, so the database treats them as data. The danger is raw SQL where you concatenate or interpolate input.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\DB;

// Safe: bound parameters
$user = DB::select('select * from users where email = ?', [$email]);

$orders = DB::table('orders')
    ->where('user_id', $userId)
    ->where('status', $status)
    ->get();

// Safe: raw expression with bindings
$rows = DB::select(
    'select * from orders where created_at > ? and total > ?',
    [$since, $minimum]
);

// Dangerous: input concatenated into SQL
// DB::select("select * from users where email = '$email'");` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Column and direction cannot be bound, so allow-list them
$sortable = ['created_at', 'total', 'status'];
$sort = in_array($request->input('sort'), $sortable, true)
    ? $request->input('sort')
    : 'created_at';

$direction = $request->input('direction') === 'asc' ? 'asc' : 'desc';

$orders = DB::table('orders')
    ->orderBy($sort, $direction)
    ->paginate();` },
        { type: 'list', items: [
          'Never interpolate request data into a query string, even inside quotes.',
          'whereRaw and selectRaw are fine when they use ? placeholders and bindings.',
          'LIKE searches need escaped wildcards; use the query builder or escape percent and underscore.',
          'DB::raw with concatenated input is the same injection risk as raw SQL.',
        ] },
        { type: 'note', value: 'An ORM does not make you immune. Eloquent still runs SQL, and methods that accept raw strings pass your input straight to the database.' },
      ],
    },
    {
      id: 'laravel-hashing-encryption',
      title: 'Hashing and Encryption',
      blocks: [
        { type: 'text', value: 'Hashing is one-way and is for passwords: you store a slow, salted digest and compare on login. Encryption is reversible and is for data you must read back, such as an API secret or a national id number. They are not interchangeable.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

// Passwords: slow, salted, one-way
$hash = Hash::make($password);

if (Hash::check($plain, $user->password)) {
    if (Hash::needsRehash($user->password)) {
        $user->update(['password' => Hash::make($plain)]);
    }
}

// Reversible encryption for data you must display again
$cipher = Crypt::encryptString($apiSecret);
$plain = Crypt::decryptString($cipher);

// Encrypted model casts keep the column encrypted transparently
protected function casts(): array
{
    return ['api_secret' => 'encrypted'];
}` },
        { type: 'list', items: [
          'Use bcrypt or Argon2id through the Hash facade; never md5, sha1 or a custom algorithm.',
          'The APP_KEY encrypts Crypt data; rotating it without re-encrypting makes old values unreadable.',
          'Encrypted values are longer than the plaintext, so size columns generously, for example TEXT.',
          'Hash::check uses a constant-time comparison, so it does not leak timing information.',
        ] },
        { type: 'note', value: 'Never encrypt passwords. If an attacker obtains the key, reversible passwords become readable; a hash stays useless even then.' },
      ],
    },
    {
      id: 'laravel-signed-urls',
      title: 'Signed URLs and Temporary Links',
      blocks: [
        { type: 'text', value: 'A signed URL carries a cryptographic signature that proves your app generated it and that the query string was not altered. Use signed URLs for email verification, one-click unsubscribe, secure downloads and links that should expire.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\URL;

// A link valid for 30 minutes
$url = URL::temporarySignedRoute(
    'downloads.show',
    now()->addMinutes(30),
    ['order' => $order->id]
);

// Protect the route with the signed middleware
Route::get('/downloads/{order}', DownloadController::class)
    ->name('downloads.show')
    ->middleware('signed');

// Or validate manually when you need a custom response
if (! $request->hasValidSignature()) {
    abort(401);
}` },
        { type: 'list', items: [
          'The signature covers the full URL, so changing an id or expiry invalidates it.',
          'Temporary signed URLs include an expires parameter and are rejected after that time.',
          'Signed URLs are safe to email because they do not require a session, but they are still bearer links: anyone with the link can use it.',
          'Do not put secrets in the URL; signatures prove authenticity, not confidentiality.',
        ] },
        { type: 'note', value: 'Email verification and password reset links already use signed or hashed tokens. Reuse those mechanisms instead of inventing a token scheme with predictable ids.' },
      ],
    },
    {
      id: 'laravel-rate-limiting',
      title: 'Rate Limiting and Abuse Prevention',
      blocks: [
        { type: 'text', value: 'Rate limiting caps how often a client may call an endpoint. It protects login, OTP, password reset, search and public APIs from brute force, scraping and accidental floods. Laravel ships a RateLimiter and a throttle middleware.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        RateLimiter::for('login', function (Request $request) {
            return [
                Limit::perMinute(5)->by($request->input('email').'|'.$request->ip()),
                Limit::perMinute(20)->by($request->ip()),
            ];
        });
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
Route::post('/login', [LoginController::class, 'store'])
    ->middleware('throttle:login');

Route::post('/forgot-password', [PasswordController::class, 'email'])
    ->middleware('throttle:5,1');

// routes/api.php
Route::middleware('throttle:api')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
});` },
        { type: 'list', items: [
          'Return 429 Too Many Requests with a Retry-After header, which Laravel does automatically.',
          'Key limits by user id when authenticated and by IP otherwise; behind a proxy, configure trusted proxies.',
          'Use several limits at once, for example per email and per IP, to block both targeted and distributed attacks.',
          'Store limiter counters in Redis or the database when you run more than one server.',
        ] },
        { type: 'note', value: 'Rate limiting is not a substitute for strong passwords or MFA. It raises the cost of guessing; it does not make a weak secret safe.' },
      ],
    },
    {
      id: 'laravel-security-headers',
      title: 'Security Headers and Production Hardening',
      blocks: [
        { type: 'text', value: 'Security headers tell browsers to behave more safely: block inline scripts, refuse framing, avoid MIME sniffing and always use HTTPS. Production hardening also means no debug output, a locked-down environment file and correct proxy and cookie settings.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set(
            'Content-Security-Policy',
            "default-src 'self'; img-src 'self' data:; object-src 'none'; frame-ancestors 'none'"
        );

        return $response;
    }
}` },
        { type: 'code', lang: 'text', value: String.raw`# .env on the production server
APP_ENV=production
APP_DEBUG=false
APP_URL=https://app.example.com
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
LOG_LEVEL=warning` },
        { type: 'list', items: [
          'Set APP_DEBUG=false; debug pages can expose environment variables, queries and file paths.',
          'Terminate TLS at the proxy and enable HSTS only after HTTPS works everywhere.',
          'Configure TrustProxies so the app sees the real client IP and scheme behind a load balancer.',
          'Keep .env, .git and storage directories outside the web root; only public should be reachable.',
          'Run composer audit and keep Laravel and packages updated; known CVEs are a common entry point.',
          'Set a Content-Security-Policy, starting in report-only mode if inline scripts are still required.',
        ] },
        { type: 'note', value: 'Headers are defence in depth, not a replacement for escaping, authorization and validation. A strict CSP reduces the damage of an XSS bug but does not fix the bug.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'security', q: 'Which Blade directive adds the CSRF token to a form?', options: ['@method', '@csrf', '@auth', '@token'], answer: 1, explain: '@csrf renders the hidden _token field checked by VerifyCsrfToken.' },
    { chapterId: 'security', q: 'Why is {!! $value !!} risky in Blade?', options: ['It is slower than {{ }}', 'It prints unescaped HTML, so it can enable XSS', 'It breaks the CSRF token', 'It encrypts the value'], answer: 1, explain: 'Raw output skips escaping and must be reserved for sanitised, trusted HTML.' },
    { chapterId: 'security', q: 'What is mass assignment?', options: ['Assigning a user to many roles', 'Passing an array of untrusted fields straight into a model', 'Sending many HTTP requests', 'Bulk inserting via migrations'], answer: 1, explain: 'Without fillable or guarded protection, extra request fields can set sensitive columns.' },
    { chapterId: 'security', q: 'Which pattern is safe from SQL injection?', options: ['DB::select with input concatenated into the string', 'The query builder with where and bound values', 'DB::raw with request input inside', 'Building SQL with sprintf and quotes'], answer: 1, explain: 'Bound parameters keep input as data, separate from the SQL structure.' },
    { chapterId: 'security', q: 'How should passwords be stored?', options: ['With Crypt::encryptString', 'With Hash::make, using bcrypt or Argon2id', 'With base64_encode', 'In plain text behind a firewall'], answer: 1, explain: 'Passwords need a slow, salted one-way hash, not reversible encryption.' },
    { chapterId: 'security', q: 'What does a signed URL prove?', options: ['That the user is logged in', 'That the URL was generated by your app and was not modified', 'That the data is encrypted', 'That the request is rate limited'], answer: 1, explain: 'The signature covers the URL, so tampering or expiry invalidates it.' },
    { chapterId: 'security', q: 'Which status code should a rate limiter return?', options: ['401', '403', '429', '503'], answer: 2, explain: '429 Too Many Requests, usually with a Retry-After header.' },
    { chapterId: 'security', q: 'Why must APP_DEBUG be false in production?', options: ['It makes pages load faster', 'Debug pages can leak secrets, queries and file paths', 'It disables HTTPS', 'It breaks CSRF protection'], answer: 1, explain: 'Detailed error pages expose internals to attackers.' },
    { chapterId: 'security', q: 'Which header tells the browser not to guess a different content type?', options: ['X-Frame-Options', 'X-Content-Type-Options: nosniff', 'Referrer-Policy', 'Content-Language'], answer: 1, explain: 'nosniff prevents MIME sniffing that can turn an upload into executable content.' },
  ],
};
