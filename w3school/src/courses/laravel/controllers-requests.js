// Laravel chapter: Controllers and Requests. Lessons plus this chapter's quiz questions.

export default {
  id: 'controllers-requests',
  title: 'Controllers & Requests',
  description: 'Thin controllers, request data and clean responses',
  icon: 'api',
  lessons: [
    {
      id: 'laravel-controllers',
      title: 'Controllers',
      blocks: [
        { type: 'text', value: 'A controller groups related request handlers. You generate one with Artisan, and it extends the base controller class that gives you convenient traits such as authorization and validation. Keep actions thin: read input, call a service or model, return a response.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan make:controller PostController
php artisan make:controller Admin/PostController
php artisan make:controller PostController --resource
php artisan make:controller PostController --invokable` },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PostController extends Controller
{
    public function index(): View
    {
        return view('posts.index', [
            'posts' => Post::latest()->paginate(15),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'body' => ['required', 'string'],
        ]);

        $post = Post::create($data);

        return redirect()
            ->route('posts.show', $post)
            ->with('status', 'Post created.');
    }
}` },
        { type: 'list', items: [
          'Controllers are resolved from the container, so constructor and method dependencies are injected automatically.',
          'Return a View, RedirectResponse, JsonResponse or Response; Laravel understands them all.',
          'Use route model binding instead of manual find() calls; let the framework return 404.',
          'Keep database queries and business rules in models, actions or services when an action grows beyond a few lines.',
          'Never echo inside a controller. Return a response so middleware and tests can work with it.',
        ] },
        { type: 'note', value: 'Laravel 11 and 12 do not have app/Http/Kernel.php. The base controller still exists at app/Http/Controllers/Controller.php, but middleware is registered in bootstrap/app.php.' },
      ],
    },
    {
      id: 'laravel-resource-controllers',
      title: 'Resource Controllers',
      blocks: [
        { type: 'text', value: 'Resource controllers follow REST conventions: seven actions for a set of records. One route declaration creates the whole set, and the names and URIs follow a consistent pattern that other developers can predict.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::resource('posts', PostController::class);

// Only some actions
Route::resource('posts', PostController::class)->only(['index', 'show']);

// Everything except destructive actions
Route::resource('posts', PostController::class)->except(['destroy']);

// API routes: no create or edit forms
Route::apiResource('posts', PostController::class);

// Nested resources
Route::resource('posts.comments', CommentController::class);` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// The generated actions
class PostController extends Controller
{
    public function index() {}    // GET /posts
    public function create() {}   // GET /posts/create
    public function store() {}    // POST /posts
    public function show(Post $post) {}     // GET /posts/{post}
    public function edit(Post $post) {}     // GET /posts/{post}/edit
    public function update(Post $post) {}   // PUT/PATCH /posts/{post}
    public function destroy(Post $post) {}  // DELETE /posts/{post}
}` },
        { type: 'list', items: [
          'The create and edit actions show forms; store, update and destroy perform writes.',
          'Resource route names are posts.index, posts.create, posts.store, posts.show, posts.edit, posts.update and posts.destroy.',
          'Use apiResource for JSON APIs; it omits create and edit because there are no forms.',
          'Customise names or parameters with ->names() and ->parameters() only when a resource truly differs.',
          'Nested resources can be scoped with ->scoped() so a child must belong to the parent.',
        ] },
        { type: 'note', value: 'Do not reach for a full resource when you only need two endpoints. A partial resource is clearer than a controller with five empty methods that confuse readers and route:list output.' },
      ],
    },
    {
      id: 'laravel-di',
      title: 'Dependency Injection in Controllers',
      blocks: [
        { type: 'text', value: 'Laravel has a service container that builds classes and resolves their constructor dependencies. Instead of newing up services inside a controller, you declare them as parameters and let the framework provide them. This makes code testable and swappable.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Controllers;

use App\Services\InvoiceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function __construct(
        private readonly InvoiceService $invoices,
    ) {}

    public function store(Request $request): JsonResponse
    {
        $invoice = $this->invoices->createFor(
            $request->user(),
            $request->validate([
                'amount' => ['required', 'integer', 'min:1'],
                'currency' => ['required', 'string', 'size:3'],
            ]),
        );

        return response()->json($invoice, 201);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// app/Providers/AppServiceProvider.php
use App\Contracts\PaymentGateway;
use App\Services\StripeGateway;

public function register(): void
{
    $this->app->bind(PaymentGateway::class, StripeGateway::class);

    // One shared instance for the whole request
    $this->app->singleton(InvoiceService::class);
}` },
        { type: 'list', items: [
          'Constructor injection is for dependencies the whole controller needs.',
          'Method injection is for per-action dependencies such as Request, a model binding or a service used once.',
          'Bind an interface in a service provider so tests can swap in a fake implementation.',
          'singleton() returns the same instance within a request; bind() creates a new one each time it is resolved.',
          'Avoid resolving the container manually with app() or resolve() when a type-hint would do.',
        ] },
        { type: 'note', value: 'In tests, Laravel can inject fakes through the container: $this->mock(PaymentGateway::class)->shouldReceive(...). This only works cleanly when the controller depends on the interface, not a concrete class created internally.' },
      ],
    },
    {
      id: 'laravel-request',
      title: 'The Request Object',
      blocks: [
        { type: 'text', value: 'The Illuminate\Http\Request object wraps the incoming HTTP request and adds many helpers for reading input, files, headers, the authenticated user and route parameters. Type-hint it in an action and Laravel injects it.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Http\Request;

public function search(Request $request)
{
    $term = $request->string('q')->trim()->toString();
    $page = $request->integer('page', 1);
    $tags = $request->input('tags', []);
    $published = $request->boolean('published');

    $data = $request->validate([
        'q' => ['nullable', 'string', 'max:100'],
    ]);

    $posts = Post::query()
        ->when($data['q'] ?? null, fn ($query, $q) => $query->where('title', 'like', "%{$q}%"))
        ->paginate(15);

    return view('posts.index', compact('posts', 'term', 'page', 'tags', 'published'));
}` },
        { type: 'list', items: [
          'input() reads body or query data; query() reads only the query string; all() returns everything.',
          'only() and except() create focused arrays; safe() returns only validated input in newer Laravel.',
          'Typed helpers such as string(), integer(), boolean() and date() reduce manual casting.',
          'has() means present, filled() means present and not empty. hasAny() checks several keys at once.',
          'file() returns an UploadedFile; user() returns the authenticated user; ip(), method(), is() inspect the request.',
          'Request data is untrusted input. Validate before using it in queries, storage or HTML.',
        ] },
        { type: 'note', value: 'Prefer $request->validate() or a Form Request over reading all() directly. Mass assigning unvalidated input is how hidden fields become privilege escalation bugs.' },
      ],
    },
    {
      id: 'laravel-responses',
      title: 'Responses, Redirects and JSON',
      blocks: [
        { type: 'text', value: 'A controller always returns a response. Laravel can build HTML views, redirects, JSON, files, downloads and streamed output. Choosing the right response type makes the frontend predictable and the HTTP contract honest.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

public function store(Request $request): RedirectResponse
{
    $post = Post::create($request->validate([
        'title' => ['required', 'string', 'max:120'],
    ]));

    return redirect()
        ->route('posts.show', $post)
        ->with('status', 'Saved.');
}

public function apiIndex(): JsonResponse
{
    return response()->json([
        'data' => Post::latest()->get(),
    ], 200, ['X-App' => 'academy']);
}

public function download(): mixed
{
    return Storage::download('exports/report.csv', 'report.csv');
}

public function noContent(): mixed
{
    return response()->noContent();
}` },
        { type: 'list', items: [
          'redirect() goes back to a previous page; back() is the shortcut; route() and away() target named or external URLs.',
          'with() flashes data to the session for the next request, often used for success messages.',
          'withErrors() flashes a MessageBag; withInput() restores old form values.',
          'response()->json() sets the content type and encodes arrays safely with json_encode options.',
          'Use 201 for created resources, 204 for empty successes, 422 for validation failures and 403 for authorization failures.',
          'For big files, use streamDownload() or response()->file() instead of loading everything into memory.',
        ] },
        { type: 'note', value: 'Returning an array or a model directly from a controller produces JSON automatically. That is handy for quick APIs, but explicit response types make status codes and headers visible.' },
      ],
    },
    {
      id: 'laravel-single-action',
      title: 'Single-Action and Invokable Controllers',
      blocks: [
        { type: 'text', value: 'Some actions do not belong to a group of seven. A single-action controller has one __invoke method and is registered as a class instead of an array. It keeps the action focused and its name obvious.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan make:controller ProvisionServer --invokable` },
        { type: 'code', lang: 'php', value: String.raw`<?php
namespace App\Http\Controllers;

use App\Models\Server;
use App\Services\Provisioner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProvisionServer extends Controller
{
    public function __invoke(Request $request, Provisioner $provisioner): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:60'],
            'region' => ['required', 'string', 'in:eu,us,asia'],
        ]);

        $server = Server::create($data);
        $provisioner->provision($server);

        return redirect()
            ->route('servers.show', $server)
            ->with('status', 'Provisioning started.');
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use App\Http\Controllers\ProvisionServer;
use Illuminate\Support\Facades\Route;

Route::post('/servers', ProvisionServer::class)->name('servers.store');` },
        { type: 'list', items: [
          'Use an invokable controller for one distinct operation: provision, export, approve, import.',
          'The class name should read like a verb or a command, not like a generic resource controller.',
          'Dependencies still come through the constructor or the __invoke signature.',
          'If an action grows to three or four related endpoints, a normal resource controller is clearer.',
        ] },
        { type: 'note', value: 'Invokable controllers are also easy to test with a single call: $this->post(action(ProvisionServer::class), $data). The intent of the test is obvious from the class name.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'controllers-requests', q: 'Which Artisan command creates a resource controller?', options: ['make:controller PostController --resource', 'make:resource PostController', 'make:controller PostController --api', 'make:model PostController'], answer: 0, explain: 'The resource flag generates the seven RESTful actions and their docblocks.' },
    { chapterId: 'controllers-requests', q: 'Which actions are omitted by apiResource?', options: ['index and show', 'create and edit', 'store and update', 'destroy'], answer: 1, explain: 'APIs do not serve HTML forms, so create and edit are not generated.' },
    { chapterId: 'controllers-requests', q: 'What is constructor injection used for?', options: ['Passing route parameters', 'Resolving dependencies the whole controller needs', 'Validating requests', 'Caching views'], answer: 1, explain: 'The container resolves constructor type-hints, giving the controller its services or interfaces.' },
    { chapterId: 'controllers-requests', q: 'Which method returns only validated request data in newer Laravel?', options: ['$request->all()', '$request->input()', '$request->safe()', '$request->query()'], answer: 2, explain: 'safe() returns only data covered by validation rules; validate() also returns the validated array.' },
    { chapterId: 'controllers-requests', q: 'What does ->with("status", "Saved.") do on a redirect?', options: ['Adds a query string', 'Flashes data to the session for the next request', 'Sets an HTTP header', 'Writes a log entry'], answer: 1, explain: 'Flashed data is available once, typically for a success message after redirect.' },
    { chapterId: 'controllers-requests', q: 'Which status code means a resource was created?', options: ['200', '201', '204', '302'], answer: 1, explain: '201 Created is the correct response after creating a resource; include a Location header when useful.' },
    { chapterId: 'controllers-requests', q: 'What is the method name of an invokable controller?', options: ['handle', 'run', '__invoke', 'execute'], answer: 2, explain: 'Invokable classes define __invoke and can be registered as a route action directly.' },
  ],
};
