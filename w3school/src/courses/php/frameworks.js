// PHP chapter: Frameworks (Laravel and Symfony). Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Framework code needs a full project, so these samples are read-only.

export default {
  id: 'frameworks',
  title: 'Laravel & Symfony',
  description: 'How modern PHP frameworks map to everything you learned',
  icon: 'layers',
  lessons: [
    {
      id: 'php-why-framework',
      title: 'Why Use a Framework',
      blocks: [
        { type: 'text', value: 'You now know the building blocks: routing, controllers, templates, PDO, validation, sessions, CSRF, DI containers, middleware, queues. A framework gives you all of them, tested and integrated, so you can focus on your product.' },
        { type: 'list', items: [
          'Laravel: the most popular PHP framework. Very productive, elegant syntax, huge ecosystem (Forge, Vapor, Nova, Livewire, Filament, Horizon). Great for startups and most web apps.',
          'Symfony: a set of reusable components plus a full-stack framework. Explicit, highly configurable, common in large enterprise projects. Laravel itself uses many Symfony components.',
          'Others: Slim (micro-framework for APIs), CodeIgniter (simple, light), Laminas (enterprise), and WordPress for content sites.',
          'Learn plain PHP first (this course), then one framework deeply. Most PHP job posts ask for Laravel or Symfony.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ composer create-project laravel/laravel shop
$ cd shop && php artisan serve          # http://127.0.0.1:8000

$ composer create-project symfony/skeleton blog
$ cd blog && symfony server:start` },
      ],
    },
    {
      id: 'php-laravel-routing',
      title: 'Laravel: Routes, Controllers and Blade',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/web.php
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => view('home'));
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show']);   // route model binding

Route::middleware('auth')->group(function () {
    Route::resource('orders', OrderController::class);   // 7 RESTful routes at once
});

// app/Http/Controllers/ProductController.php
class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%$s%"))
            ->latest()
            ->paginate(20);

        return view('products.index', compact('products'));
    }

    public function show(Product $product)   // Laravel loads it from {product} or returns 404
    {
        return view('products.show', ['product' => $product]);
    }
}` },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/products/index.blade.php --}}
@extends('layouts.app')

@section('content')
  <h1>Products</h1>
  @forelse ($products as $product)
    <a href="{{ route('products.show', $product) }}">{{ $product->name }}</a>  {{-- auto-escaped --}}
  @empty
    <p>No products yet.</p>
  @endforelse
  {{ $products->links() }}

  <form method="POST" action="/cart">
    @csrf
    <button>Add to cart</button>
  </form>
@endsection` },
      ],
    },
    {
      id: 'php-laravel-eloquent',
      title: 'Laravel: Eloquent ORM and Migrations',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// database/migrations/2026_03_01_000000_create_products_table.php
return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedInteger('price');
            $table->timestamps();
            $table->index(['category_id', 'price']);
        });
    }
};
// php artisan make:model Product -mfc   (model + migration + factory + controller)
// php artisan migrate

// app/Models/Product.php
class Product extends Model
{
    protected $fillable = ['name', 'price', 'category_id'];   // mass-assignment protection
    protected $casts = ['price' => 'integer'];

    public function category(): BelongsTo { return $this->belongsTo(Category::class); }
    public function reviews(): HasMany { return $this->hasMany(Review::class); }

    public function scopeCheap(Builder $q): void { $q->where('price', '<', 1000); }
}

// Using it
$product = Product::create(['name' => 'Mouse', 'price' => 450, 'category_id' => 2]);
$cheap = Product::cheap()->with('category')->orderBy('price')->get();   // eager loading: no N+1
$top = Product::withCount('reviews')->orderByDesc('reviews_count')->take(5)->get();

DB::transaction(function () use ($order) {
    $order->update(['status' => OrderStatus::Paid]);
    $order->items->each(fn ($item) => $item->product->decrement('stock', $item->qty));
});` },
        { type: 'note', value: 'Eloquent is an Active Record ORM (the model saves itself). Symfony uses Doctrine, a Data Mapper ORM (entities are plain objects, an EntityManager saves them). Both use prepared statements under the hood.' },
      ],
    },
    {
      id: 'php-laravel-features',
      title: 'Laravel: Validation, Auth, Queues and Tests',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// Validation (Form Request): invalid input redirects back with errors, or returns 422 JSON for APIs
public function store(Request $request)
{
    $data = $request->validate([
        'name' => ['required', 'string', 'max:100'],
        'email' => ['required', 'email', 'unique:users,email'],
        'password' => ['required', 'confirmed', Password::min(10)->mixedCase()->numbers()],
    ]);
    $user = User::create($data);   // password is hashed by the model's cast
    Auth::login($user);
    return redirect()->route('dashboard');
}

// Authorization with policies
$this->authorize('update', $post);      // 403 unless PostPolicy::update() allows it

// Queued job
SendInvoice::dispatch($order)->onQueue('emails');   // php artisan queue:work

// Events, notifications, scheduling
Notification::send($user, new OrderShipped($order));
// app/Console/Kernel or routes/console.php: Schedule::command('reports:daily')->dailyAt('02:00');

// API with Sanctum tokens
Route::middleware('auth:sanctum')->get('/api/me', fn (Request $r) => $r->user());

// Feature test
public function test_guests_cannot_see_orders(): void
{
    $this->get('/orders')->assertRedirect('/login');
}

public function test_user_can_place_an_order(): void
{
    $user = User::factory()->create();
    $this->actingAs($user)
        ->post('/orders', ['product_id' => Product::factory()->create()->id, 'qty' => 2])
        ->assertCreated();
    $this->assertDatabaseHas('orders', ['user_id' => $user->id]);
}` },
      ],
    },
    {
      id: 'php-symfony',
      title: 'Symfony at a Glance',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// src/Controller/ProductController.php
namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ProductController extends AbstractController
{
    // Attributes define routes; services are autowired into the constructor or action
    #[Route('/products', name: 'product_index', methods: ['GET'])]
    public function index(ProductRepository $products): Response
    {
        return $this->render('product/index.html.twig', [
            'products' => $products->findBy([], ['price' => 'ASC']),
        ]);
    }

    #[Route('/api/products/{id}', methods: ['GET'])]
    public function show(Product $product): Response     // entity resolved from {id}
    {
        return $this->json($product, context: ['groups' => 'product:read']);
    }
}

// src/Entity/Product.php (Doctrine mapping with attributes)
#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    private string $name;
}` },
        { type: 'list', items: [
          'Everything you learned maps directly: attributes for routes (Modern PHP chapter), autowiring (Architecture chapter), PSR standards (Composer chapter).',
          'Twig templates escape output automatically like Blade.',
          'API Platform (built on Symfony) generates complete REST/GraphQL APIs from entities.',
        ] },
      ],
    },
    {
      id: 'php-roadmap',
      title: 'Your Roadmap After This Course',
      blocks: [
        { type: 'list', items: [
          '1. Build the projects in the next chapter in plain PHP and put them on GitHub.',
          '2. Learn SQL deeper: joins, indexes, EXPLAIN, normalisation and window functions.',
          '3. Pick Laravel (or Symfony) and rebuild one project with it. Read the official docs end to end.',
          '4. Add tests (PHPUnit or Pest) and static analysis (PHPStan) to every project.',
          '5. Learn Git, Linux basics, Docker and deploying to a VPS (DigitalOcean, Hetzner, AWS Lightsail).',
          '6. Learn Redis, queues and a frontend partner (Vue with Inertia, or React) for full-stack roles.',
          '7. Practise interview questions (last chapter and the Interview tab) and explain your projects clearly.',
        ] },
        { type: 'note', value: 'An expert is not someone who memorised every function, but someone who knows the fundamentals deeply, writes secure and tested code, and knows where to look up the rest (php.net is excellent).' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'frameworks', q: 'Which PHP framework is the most popular for new web apps?', options: ['CodeIgniter', 'Laravel', 'CakePHP', 'Zend'], answer: 1, explain: 'Laravel leads; Symfony is the other major choice.' },
    { chapterId: 'frameworks', q: 'What does Laravel\'s Product::with("category")->get() avoid?', options: ['SQL injection', 'The N+1 query problem', 'XSS', 'Mass assignment'], answer: 1, explain: 'Eager loading fetches related rows in one extra query.' },
    { chapterId: 'frameworks', q: 'What does @csrf in a Blade form do?', options: ['Encrypts the form', 'Adds a hidden CSRF token field', 'Validates input', 'Escapes output'], answer: 1, explain: 'Laravel checks the token on every POST.' },
    { chapterId: 'frameworks', q: 'What are database migrations?', options: ['Moving servers', 'Versioned code that creates and changes the schema', 'Backups', 'Query logs'], answer: 1, explain: 'Every developer and server gets the same schema by running them.' },
    { chapterId: 'frameworks', q: 'Which ORM does Symfony use by default?', options: ['Eloquent', 'Doctrine', 'Propel', 'PDO'], answer: 1, explain: 'Doctrine is a Data Mapper ORM; Eloquent is Active Record.' },
    { chapterId: 'frameworks', q: 'What does $fillable protect against in Eloquent?', options: ['XSS', 'Mass assignment of fields the user should not set', 'SQL injection', 'Slow queries'], answer: 1, explain: 'Without it, a user could submit is_admin=1 in a form.' },
  ],
};
