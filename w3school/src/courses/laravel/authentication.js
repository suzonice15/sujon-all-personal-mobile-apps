// Laravel chapter: Authentication. Lessons plus this chapter's quiz questions.

export default {
  id: 'authentication',
  title: 'Authentication',
  description: 'Sessions, guards, Breeze, Fortify and secure login flows',
  icon: 'lock',
  lessons: [
    {
      id: 'laravel-auth-overview',
      title: 'How Authentication Works',
      blocks: [
        { type: 'text', value: 'Laravel authentication is built from two ideas. A guard answers "how is this user authenticated for this request?" and a provider answers "where do users come from?". The web guard reads a session cookie; the sanctum guard reads an API token. Both can point at the same Eloquent user provider.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// config/auth.php (Laravel 11 and 12 defaults)
return [
    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
    ],
];` },
        { type: 'list', items: [
          'The web guard uses the session driver, so the logged-in user id is kept server-side and referenced by an encrypted cookie.',
          'The sanctum guard uses token authentication for mobile apps and third-party clients.',
          'The provider is Eloquent here, but the database driver can authenticate against a plain table without a model.',
          'Passwords broker settings control password reset tokens, their lifetime and throttling.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\Auth;

$user = Auth::user();          // App\Models\User|null
$id = Auth::id();              // int|string|null
$loggedIn = Auth::check();     // bool

// A specific guard, useful when web and API sessions coexist
$admin = Auth::guard('admin')->user();` },
        { type: 'note', value: 'Authentication proves identity; authorization decides what that identity may do. Never use Auth::check() as a substitute for a permission check, and never trust a user id posted in a form.' },
      ],
    },
    {
      id: 'laravel-breeze',
      title: 'Laravel Breeze and Fortify',
      blocks: [
        { type: 'text', value: 'Breeze is a starter kit: it scaffolds working registration, login, password reset, email verification and profile pages with Blade, React, Vue or Livewire. Fortify is the headless backend that powers those flows, with no views of its own, for teams that want a custom frontend.' },
        { type: 'code', lang: 'text', value: String.raw`# Fresh Laravel app with a Blade auth scaffold
composer require laravel/breeze --dev
php artisan breeze:install blade
php artisan migrate
npm install && npm run dev

# Headless auth backend, then build your own UI
composer require laravel/fortify
php artisan fortify:install
php artisan migrate` },
        { type: 'list', items: [
          'Breeze includes login, registration, password reset, email verification, password confirmation and profile update.',
          'Breeze publishes routes, controllers and views into your app, so you own and can change every line.',
          'Fortify provides the routes and actions behind login, two-factor authentication and password confirmation.',
          'Jetstream is a larger Breeze alternative with teams, API tokens and two-factor support.',
        ] },
        { type: 'text', value: 'Choose Breeze when you want a simple, readable starting point and will customise it. Choose Fortify when you already have a frontend, such as a React or mobile client, and only need the backend endpoints. Both are safer than writing login from scratch.' },
        { type: 'note', value: 'Run the migrations immediately after installing a starter kit. Breeze and Fortify add columns and tables, and the auth pages fail until the schema matches.' },
      ],
    },
    {
      id: 'laravel-guards',
      title: 'Guards, Providers and Passwords',
      blocks: [
        { type: 'text', value: 'A guard is a named authentication strategy. A provider is a user source. A password broker is the third piece: it creates and validates reset tokens. Keeping them separate lets one app serve customers through a session and staff through a token without duplicating user logic.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// config/auth.php, adding an API guard and a second provider
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'sanctum',
        'provider' => 'users',
    ],
],

'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => App\Models\User::class,
    ],
    'admins' => [
        'driver' => 'database',
        'table' => 'admins',
    ],
],

'passwords' => [
    'users' => [
        'provider' => 'users',
        'table' => 'password_reset_tokens',
        'expire' => 60,
        'throttle' => 60,
    ],
],` },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\Auth;

// Authenticate against a specific guard and keep the session
Auth::guard('web')->attempt($credentials);

// Resolve the guard explicitly when the default is not the one you need
if (Auth::guard('api')->check()) {
    $user = Auth::guard('api')->user();
}

// Log out of one guard only
Auth::guard('web')->logout();` },
        { type: 'list', items: [
          'Common mistake: adding a guard but forgetting to point routes at it with the auth:api middleware.',
          'Common mistake: giving two providers the same model and assuming they are isolated; they share the users table.',
          'The password broker expire value is minutes, and throttle is seconds between reset requests.',
          'Custom providers implement Illuminate\Contracts\Auth\UserProvider when users live outside a database.',
        ] },
        { type: 'note', value: 'Do not create a second users table just to separate roles. A role column or a permissions package is almost always simpler than a parallel guard and provider.' },
      ],
    },
    {
      id: 'laravel-login',
      title: 'Manual Login, Logout and Throttling',
      blocks: [
        { type: 'text', value: 'A safe login flow validates input, attempts authentication, regenerates the session id to stop fixation, and redirects to the intended page. Logout must invalidate the session and rotate the CSRF token, not just forget the user.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Throttle attempts per email and IP, not per session
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

$key = 'login:'.Str::transliterate(Str::lower($request->input('email'))).'|'.$request->ip();

if (RateLimiter::tooManyAttempts($key, maxAttempts: 5)) {
    throw ValidationException::withMessages([
        'email' => __('Too many attempts. Try again in :seconds seconds.', [
            'seconds' => RateLimiter::availableIn($key),
        ]),
    ]);
}

RateLimiter::hit($key, decaySeconds: 60);` },
        { type: 'list', items: [
          'Return one generic message for a wrong email and a wrong password so attackers cannot enumerate accounts.',
          'Call session()->regenerate() after a successful login to prevent session fixation.',
          'On logout, invalidate the session and regenerate the CSRF token.',
          'Throttle by email plus IP so one attacker cannot lock out every account, and one account cannot be brute forced from many IPs.',
        ] },
        { type: 'note', value: 'Laravel Breeze already implements this flow, including throttling through the LoginRequest class. Read that class before replacing it, and keep the same protections.' },
      ],
    },
    {
      id: 'laravel-email-verification',
      title: 'Email Verification and Password Reset',
      blocks: [
        { type: 'text', value: 'Email verification proves that a user controls the address they registered with. Password reset lets them recover an account without support. Laravel ships both: the MustVerifyEmail contract, the verified middleware, and the Password facade with secure signed tokens.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    // ...
}

// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});` },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

// Send a reset link
$status = Password::sendResetLink($request->only('email'));

// Handle the form that the emailed link opens
$status = Password::reset(
    $request->only('email', 'password', 'password_confirmation', 'token'),
    function ($user, string $password) {
        $user->forceFill([
            'password' => $password,
            'remember_token' => Str::random(60),
        ])->save();

        event(new PasswordReset($user));
    }
);

return $status === Password::PASSWORD_RESET
    ? redirect()->route('login')->with('status', __($status))
    : back()->withErrors(['email' => __($status)]);` },
        { type: 'list', items: [
          'Verification links are signed URLs with an expiry, so they cannot be forged by editing the id.',
          'Reset tokens are stored hashed and expire after the broker expire value, 60 minutes by default.',
          'Always rotate remember_token when a password changes, which invalidates old remember cookies.',
          'Rate limit the resend endpoint as well as the login endpoint.',
        ] },
        { type: 'note', value: 'Never reveal whether an email address exists when sending a reset link. Return the same neutral message either way, and let the email be the only signal.' },
      ],
    },
    {
      id: 'laravel-remember-sessions',
      title: 'Remember Me and Session Security',
      blocks: [
        { type: 'text', value: 'Remember me issues a long-lived cookie so a returning visitor stays logged in after the session expires. Laravel stores a hashed remember token on the user row, so the cookie cannot be guessed and can be revoked by rotating the token.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// The second argument to attempt() enables the remember cookie
Auth::attempt($credentials, remember: true);

// Equivalent when logging in an already resolved user
Auth::login($user, remember: true);

// Rotating this value invalidates every existing remember cookie
$user->forceFill(['remember_token' => Str::random(60)])->save();` },
        { type: 'code', lang: 'text', value: String.raw`# .env: secure session defaults behind HTTPS
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax` },
        { type: 'list', items: [
          'Set SESSION_SECURE_COOKIE=true in production so the cookie is never sent over plain HTTP.',
          'SameSite=lax blocks the cookie on most cross-site form posts, adding defence against CSRF.',
          'HttpOnly is enabled by Laravel by default, so JavaScript cannot read the session cookie.',
          'Use the database or Redis session driver when several servers serve the same users.',
          'Regenerate the session on login and invalidate it on logout; a remember cookie is not a session.',
        ] },
        { type: 'note', value: 'If you support a "log out everywhere" button, rotate remember_token and store a session id per device. Deleting only the current session leaves other remember cookies valid.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'authentication', q: 'What does a guard decide in Laravel authentication?', options: ['Which database table to create', 'How a user is authenticated for a request', 'Which Blade layout to render', 'Which queue connection to use'], answer: 1, explain: 'A guard is the authentication strategy, such as session for the web or token for the API.' },
    { chapterId: 'authentication', q: 'What is the role of a user provider?', options: ['It renders the login form', 'It retrieves and stores users, usually through Eloquent or the database', 'It hashes passwords', 'It sends verification emails'], answer: 1, explain: 'The provider tells the guard where users come from; Eloquent and database are the built-in drivers.' },
    { chapterId: 'authentication', q: 'Which package is a headless authentication backend without views?', options: ['Breeze', 'Jetstream', 'Fortify', 'Sanctum'], answer: 2, explain: 'Fortify provides auth routes and actions only, so you can build your own frontend.' },
    { chapterId: 'authentication', q: 'Why call session()->regenerate() after a successful login?', options: ['To clear the database', 'To prevent session fixation', 'To send a cookie to the browser', 'To hash the password again'], answer: 1, explain: 'A new session id means an attacker who planted an id before login cannot reuse it.' },
    { chapterId: 'authentication', q: 'What should logout do besides forgetting the user?', options: ['Delete the user row', 'Invalidate the session and regenerate the CSRF token', 'Drop all database tables', 'Change the app key'], answer: 1, explain: 'Invalidating the session and rotating the token ends the session securely on the server side.' },
    { chapterId: 'authentication', q: 'Why throttle login attempts by email and IP together?', options: ['To make login faster', 'To block brute force without letting one attacker lock out every account', 'To encrypt the password', 'To enable remember me'], answer: 1, explain: 'A combined key limits guessing while avoiding a trivial denial of service against known emails.' },
    { chapterId: 'authentication', q: 'Which middleware requires a verified email address?', options: ['auth', 'verified', 'can', 'guest'], answer: 1, explain: 'The verified middleware checks the MustVerifyEmail contract and redirects unverified users.' },
    { chapterId: 'authentication', q: 'How does Laravel validate a remember me cookie?', options: ['It trusts any cookie value', 'It compares against a hashed remember_token stored on the user', 'It stores the plain password in the cookie', 'It uses the CSRF token'], answer: 1, explain: 'The cookie is matched against the user remember_token, which can be rotated to revoke it.' },
  ],
};
