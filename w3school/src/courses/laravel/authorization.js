// Laravel chapter: Authorization. Lessons plus this chapter's quiz questions.

export default {
  id: 'authorization',
  title: 'Authorization',
  description: 'Gates, policies, roles and preventing IDOR',
  icon: 'verified-user',
  lessons: [
    {
      id: 'laravel-gates',
      title: 'Gates',
      blocks: [
        { type: 'text', value: 'A gate is a closure that answers one authorization question. Gates are ideal for rules that are not tied to a single model, such as "can this user access the admin dashboard" or "can this user export reports". Register them in a service provider and check them anywhere.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Gate::define('view-admin-dashboard', function (User $user): bool {
            return $user->role === 'admin';
        });

        Gate::define('export-reports', function (User $user): bool {
            return $user->role === 'admin' || $user->role === 'analyst';
        });
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Support\Facades\Gate;

if (Gate::allows('export-reports')) {
    // proceed
}

if (Gate::denies('export-reports')) {
    abort(403);
}

// Throws AuthorizationException when denied, which renders as 403
Gate::authorize('export-reports');

// A richer response lets you choose the status code
Gate::define('view-invoice', function (User $user, Invoice $invoice) {
    return $user->id === $invoice->user_id
        ? Illuminate\Auth\Access\Response::allow()
        : Illuminate\Auth\Access\Response::denyAsNotFound();
});` },
        { type: 'list', items: [
          'Use Gate::before for a super-admin bypass, but return null for everyone else so normal checks still run.',
          'Return a Response object instead of a boolean when the client needs a specific status or message.',
          'Gates receive the authenticated user first, then any extra arguments you pass.',
          'Keep gate names as verbs or clear questions, not vague labels like admin.',
        ] },
        { type: 'note', value: 'Gates are checked on the server. Hiding a button with a gate in Blade is a usability improvement, never a security boundary.' },
      ],
    },
    {
      id: 'laravel-policies',
      title: 'Policies',
      blocks: [
        { type: 'text', value: 'A policy groups the authorization rules for one model. Laravel discovers App\Policies\PostPolicy for App\Models\Post automatically, so you rarely need to register anything. Generate one with Artisan and fill in the methods you need.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Post $post): bool
    {
        return $post->status === 'published' || $user->id === $post->user_id;
    }

    public function create(User $user): bool
    {
        return $user->hasVerifiedEmail();
    }

    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    public function delete(User $user, Post $post): bool
    {
        return $user->id === $post->user_id || $user->role === 'admin';
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// In a controller, with route model binding
public function update(UpdatePostRequest $request, Post $post)
{
    $this->authorize('update', $post);

    $post->update($request->validated());

    return back();
}

// Or using the Gate facade
Gate::authorize('update', $post);` },
        { type: 'list', items: [
          'Methods that receive only the user, like viewAny and create, map to the model class rather than an instance.',
          'A before method on the policy runs first and can grant access to an administrator.',
          'If your models or policies live outside the default namespaces, register them with Gate::policy().',
          'Use authorizeResource in a controller constructor to map resource actions to policy methods.',
        ] },
        { type: 'note', value: 'A policy that returns true for viewAny does not protect view. Every action needs its own rule, and every controller action needs its own authorize call.' },
      ],
    },
    {
      id: 'laravel-roles',
      title: 'Roles and Permissions',
      blocks: [
        { type: 'text', value: 'A role is a named bundle of permissions. Storing an is_admin boolean seems simple until you need an editor, a moderator, a support agent and a billing manager. Model roles explicitly, and prefer permissions for fine-grained decisions.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Enums;

enum Role: string
{
    case Admin = 'admin';
    case Editor = 'editor';
    case Customer = 'customer';

    public function canManageUsers(): bool
    {
        return $this === self::Admin;
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
use App\Enums\Role;

// A migration that stores the role as a string, not a boolean
Schema::table('users', function (Blueprint $table) {
    $table->string('role')->default(Role::Customer->value)->index();
});

// Cast it in the model so you compare enums, not loose strings
protected function casts(): array
{
    return ['role' => Role::class];
}

// Then in a policy
public function update(User $user, Post $post): bool
{
    return match ($user->role) {
        Role::Admin => true,
        Role::Editor => $post->status !== 'published',
        Role::Customer => $user->id === $post->user_id,
    };
}` },
        { type: 'list', items: [
          'Use spatie/laravel-permission when roles and permissions are managed by administrators at runtime.',
          'Keep role checks out of views and controllers; put them in gates, policies or a dedicated service.',
          'Never let a user assign their own role from a mass-assigned form field.',
          'Permissions should be named after actions, such as posts.delete, not after people.',
        ] },
        { type: 'note', value: 'Roles are coarse and permissions are fine-grained. A common production mistake is scattering role string comparisons across the codebase; centralising them makes audits and changes possible.' },
      ],
    },
    {
      id: 'laravel-can-middleware',
      title: 'can Middleware and Blade Directives',
      blocks: [
        { type: 'text', value: 'Laravel can enforce authorization before the controller runs. The can middleware maps a route to a gate or policy method, and Blade offers @can and @cannot for conditional UI. Use both, but remember the middleware is the real check.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::get('/posts/{post}', [PostController::class, 'show'])
    ->middleware('can:view,post');

Route::put('/posts/{post}', [PostController::class, 'update'])
    ->middleware('can:update,post');

// For methods that take a class instead of an instance
Route::post('/posts', [PostController::class, 'store'])
    ->middleware('can:create,'.Post::class);` },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/posts/show.blade.php --}}
<h1>{{ $post->title }}</h1>

@can('update', $post)
  <a href="{{ route('posts.edit', $post) }}">Edit post</a>
@endcan

@cannot('delete', $post)
  <p>You cannot delete this post.</p>
@endcannot

@canany(['update', 'delete'], $post)
  <p>You can manage this post.</p>
@endcanany` },
        { type: 'list', items: [
          'The can middleware returns 403 when the check fails, before the controller body executes.',
          'Route model binding supplies the post argument, so the policy sees the actual record.',
          'Blade directives are for presentation only; a hidden link is still callable by an attacker.',
          'Use @canany when several abilities should reveal one section of the page.',
        ] },
        { type: 'note', value: 'Prefer the middleware or an authorize call in the controller over duplicating the same check in Blade. One server-side check is testable; scattered UI checks are easy to miss.' },
      ],
    },
    {
      id: 'laravel-ownership',
      title: 'Ownership Checks and IDOR',
      blocks: [
        { type: 'text', value: 'Insecure direct object reference, or IDOR, happens when an endpoint accepts an id and returns the record without checking who owns it. Changing /invoices/12 to /invoices/13 must never expose someone else invoice. Authentication alone does not prevent this.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Unsafe: any logged-in user can read any invoice
$invoice = Invoice::findOrFail($id);

// Safe: scope the query to the current user
$invoice = Invoice::where('user_id', $request->user()->id)
    ->findOrFail($id);

// Or authorize through a policy
$this->authorize('view', $invoice);` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php: scope bindings enforce ownership in the query
Route::get('/users/{user}/invoices/{invoice}', function (User $user, Invoice $invoice) {
    return $invoice;
})->scopeBindings();

// If the invoice does not belong to the user, Laravel returns 404
// instead of loading it and relying on a later check.` },
        { type: 'list', items: [
          'Always scope queries by the authenticated user or tenant, not only by the requested id.',
          'Return 404 rather than 403 when a record exists but belongs to someone else, so ids are not confirmed.',
          'Nested resources should use scoped bindings so the child must belong to the parent in the URL.',
          'Bulk endpoints are a common IDOR gap: validate that every submitted id belongs to the user.',
        ] },
        { type: 'note', value: 'Route model binding is convenient, not an authorization mechanism. It proves the record exists; the policy or scoped query proves the current user may access it.' },
      ],
    },
    {
      id: 'laravel-authz-patterns',
      title: 'Authorization Patterns and Testing',
      blocks: [
        { type: 'text', value: 'Good authorization is deny by default, centralised and tested. Put rules in policies, trigger them from FormRequest or middleware, and write feature tests that assert both allowed and forbidden paths. A rule that is never tested is a rule that will eventually regress.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('post'));
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'body' => ['required', 'string'],
        ];
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// tests/Feature/PostAuthorizationTest.php
use App\Models\Post;
use App\Models\User;

it('forbids updating another users post', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $post = Post::factory()->for($owner)->create();

    $this->actingAs($other)
        ->put(route('posts.update', $post), ['title' => 'Hijacked'])
        ->assertForbidden();

    expect($post->fresh()->title)->not->toBe('Hijacked');
});

it('allows the owner to update their post', function () {
    $owner = User::factory()->create();
    $post = Post::factory()->for($owner)->create();

    $this->actingAs($owner)
        ->put(route('posts.update', $post), ['title' => 'Updated', 'body' => 'Body'])
        ->assertRedirect();

    expect($post->fresh()->title)->toBe('Updated');
});` },
        { type: 'list', items: [
          'Test the negative case first: a different user, a guest and an expired account should all be rejected.',
          'Keep a single source of truth for each rule, usually the policy, and call it from every entry point.',
          'Use Gate::before for a deliberate super-admin override and document it.',
          'Log authorization failures; a spike can reveal an enumeration or scraping attempt.',
        ] },
        { type: 'note', value: 'When you add a new endpoint, write its policy method and a forbidden test in the same change. Reviewers should be able to see exactly who is allowed to call it.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'authorization', q: 'When is a gate a better fit than a policy?', options: ['When the rule is tied to one model instance', 'When the rule is not tied to a specific model', 'When you need a database migration', 'When you need to hash a password'], answer: 1, explain: 'Gates are closures for general abilities; policies group rules for a model.' },
    { chapterId: 'authorization', q: 'How does Laravel usually find the policy for App\Models\Post?', options: ['By convention, App\Policies\PostPolicy', 'Only through a config file', 'It scans every class at runtime', 'It must be passed to every route'], answer: 0, explain: 'Laravel discovers the matching policy by namespace and class name convention.' },
    { chapterId: 'authorization', q: 'What does the can:update,post middleware do?', options: ['Hashes the request body', 'Checks the update ability on the bound post before the controller runs', 'Logs the user in', 'Validates the post fields'], answer: 1, explain: 'It calls the gate or policy and returns 403 when the check fails.' },
    { chapterId: 'authorization', q: 'Which Blade directive shows content only when the user may update a post?', options: ['@auth', '@can(update, post)', '@can(update, $post)', '@allowed(update)'], answer: 2, explain: 'The @can directive takes the ability and the model instance.' },
    { chapterId: 'authorization', q: 'What is the safest way to load an invoice for the current user?', options: ['Invoice::findOrFail($id)', 'Invoice::where(user_id, $request->user()->id)->findOrFail($id)', 'Invoice::all()->first()', 'Read the id from the query string without checking'], answer: 1, explain: 'Scoping the query to the user prevents IDOR even if the id is guessed.' },
    { chapterId: 'authorization', q: 'What is Gate::before used for?', options: ['To run a gate after the response', 'To grant a deliberate override such as a super admin', 'To validate form input', 'To cache gate results'], answer: 1, explain: 'before runs first and can allow access; return null for other users so normal checks continue.' },
    { chapterId: 'authorization', q: 'Where can authorization run before the controller body?', options: ['In a FormRequest authorize method or the can middleware', 'In a Blade comment', 'In the CSS file', 'In the composer.json file'], answer: 0, explain: 'Both the FormRequest authorize method and the can middleware reject unauthorized requests early.' },
  ],
};
