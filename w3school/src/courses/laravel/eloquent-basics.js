// Laravel chapter: Eloquent Basics. Lessons plus this chapter's quiz questions.

export default {
  id: 'eloquent-basics',
  title: 'Eloquent Basics',
  description: 'Models, CRUD, casts and safe mass assignment',
  icon: 'dataset',
  lessons: [
    {
      id: 'laravel-models',
      title: 'Models and Conventions',
      blocks: [
        { type: 'text', value: 'Eloquent is the Active Record ORM that ships with Laravel. Each model class represents one table, each instance represents one row, and each property represents a column. Convention over configuration means a model named Post automatically uses the posts table without any extra setup.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'body', 'published_at'];

    protected function casts(): array
    {
        return [
            'published_at' => 'immutable_datetime',
            'is_featured' => 'boolean',
        ];
    }
}` },
        { type: 'list', items: [
          'Class Post maps to table posts, primary key id, and the created_at and updated_at columns.',
          'Override $table, $primaryKey, $keyType or $incrementing only when your schema does not follow the convention.',
          '$fillable lists attributes that may be filled from an array; mass assignment protection is covered later in this chapter.',
          'Route model binding resolves {post} to a Post by key and returns 404 automatically when no row exists.',
          'Set public $timestamps = false when a table has no created_at and updated_at columns.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`php artisan make:model Post -mfc
php artisan make:model Post --all` },
        { type: 'code', lang: 'php', value: String.raw`use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::get('/posts/{post}', function (Post $post) {
    return view('posts.show', ['post' => $post]);
});` },
        { type: 'note', value: 'Keep models focused on data and relationships. Put multi-step business logic in a service or action class, and keep controllers thin.' },
      ],
    },
    {
      id: 'laravel-crud',
      title: 'Create, Read, Update, Delete',
      blocks: [
        { type: 'text', value: 'Every database operation starts with a model query. Eloquent returns model instances from reads and gives you save(), update() and delete() for writes. Reads return a model or null for single rows, and an Eloquent Collection for many rows.' },
        { type: 'code', lang: 'php', value: String.raw`use App\Models\Post;

// Create
$post = Post::create([
    'title' => 'Eloquent basics',
    'body' => 'Models map to tables.',
]);

// Read one or many
$post = Post::find(1);
$post = Post::findOrFail(1);
$post = Post::where('slug', 'eloquent-basics')->first();
$posts = Post::where('published', true)->latest()->get();

// Update
$post->title = 'Updated title';
$post->save();

$post->update(['published' => true]);

// Delete
$post->delete();
Post::destroy([2, 3]);` },
        { type: 'list', items: [
          'create() fills the model from the array and saves it in one call; make() fills without saving.',
          'find() returns null when missing; findOrFail() throws ModelNotFoundException, which Laravel renders as 404.',
          'first() returns one model or null; get() returns a collection; paginate() is preferred for long lists.',
          'update() returns a boolean and only writes dirty attributes; it still fires model events.',
          'destroy() loads each model and fires events, while a query builder delete() skips models and events.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`$posts = Post::query()
    ->where('status', 'published')
    ->whereNotNull('published_at')
    ->orderByDesc('published_at')
    ->paginate(15);

foreach ($posts as $post) {
    echo $post->title;
}

echo $posts->total();` },
        { type: 'note', value: 'Never call Post::all() in a controller for a screen that can grow. Use paginate() or a scoped query so production does not load thousands of rows into memory.' },
      ],
    },
    {
      id: 'laravel-mass-assignment',
      title: 'Mass Assignment and Security',
      blocks: [
        { type: 'text', value: 'Mass assignment means filling a model from an array, usually request input. Without a guard, a user could add is_admin to a form and set a field you never intended to expose. Eloquent blocks this unless attributes are explicitly allowed.' },
        { type: 'code', lang: 'php', value: String.raw`class User extends Model
{
    protected $fillable = ['name', 'email', 'password'];

    protected $guarded = ['id'];
}` },
        { type: 'list', items: [
          '$fillable is a whitelist of attributes that create() and fill() may set. This is the safest option.',
          '$guarded is a blacklist. Setting protected $guarded = [] disables protection entirely, which is dangerous.',
          'Never pass $request->all() into create(). Read only validated fields instead.',
          'Validation and mass assignment solve different problems: validation checks values, fillable controls which keys exist.',
          'Privilege fields such as is_admin, role, balance or owner_id must never be mass assignable from public forms.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Post::class);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'body' => ['required', 'string'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}

// Controller
$post = $request->user()->posts()->create($request->validated());` },
        { type: 'note', value: 'Even with $guarded = [], validated() keeps unexpected keys out. Use both: a tight $fillable list and a FormRequest that returns only approved data.' },
      ],
    },
    {
      id: 'laravel-casts',
      title: 'Casts and Dates',
      blocks: [
        { type: 'text', value: 'A cast tells Eloquent how to convert a database value when reading and writing an attribute. Casts keep your PHP code using real types such as booleans, arrays, dates and enums instead of raw strings from the driver.' },
        { type: 'code', lang: 'php', value: String.raw`class Order extends Model
{
    protected function casts(): array
    {
        return [
            'total' => 'decimal:2',
            'is_paid' => 'boolean',
            'options' => 'array',
            'shipped_at' => 'immutable_datetime',
            'status' => OrderStatus::class,
            'secret_note' => 'encrypted',
        ];
    }
}

$order = Order::find(1);
$order->options = ['gift' => true];
$order->is_paid = '1';
$order->save();

echo gettype($order->is_paid);` },
        { type: 'list', items: [
          'Casts change PHP types and JSON output, not the database column type. The migration still needs a correct column.',
          'array and json casts encode on write and decode on read; collection casts return a Collection.',
          'datetime casts return Carbon instances; immutable_datetime returns CarbonImmutable, which is safer for accidental mutation.',
          'decimal:2 returns a string to preserve precision, so format it for display and never rely on float math.',
          'enum casts validate on write and expose the enum object, which keeps invalid statuses out of the model.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`use App\Enums\OrderStatus;

$orders = Order::where('status', OrderStatus::Paid)->get();

$order->status = OrderStatus::Shipped;
$order->shipped_at = now();
$order->save();` },
        { type: 'note', value: 'Store timestamps in UTC and convert for display at the edge. Configure APP_TIMEZONE for local display only; mixing time zones in stored data causes reports and sorting bugs.' },
      ],
    },
    {
      id: 'laravel-accessors',
      title: 'Accessors, Mutators and Serialization',
      blocks: [
        { type: 'text', value: 'An accessor transforms an attribute when you read it; a mutator transforms a value when you assign it. Laravel 11 and 12 define them in one method returning an Attribute object, which keeps the getter and setter together.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Model
{
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn () => trim($this->first_name . ' ' . $this->last_name),
            set: fn (string $value) => [
                'first_name' => str($value)->before(' ')->toString(),
                'last_name' => str($value)->after(' ')->toString(),
            ],
        );
    }

    protected function email(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => strtolower($value),
            set: fn (string $value) => strtolower(trim($value)),
        );
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`class User extends Model
{
    protected $appends = ['full_name'];

    protected $hidden = ['password', 'remember_token'];
}

$user->makeHidden(['email']);
$array = $user->toArray();` },
        { type: 'list', items: [
          'Accessors run every time the attribute is read in PHP; cache expensive calculations instead of repeating queries.',
          'appended attributes are included in toArray() and JSON responses, which is useful for computed fields.',
          '$hidden removes sensitive attributes from serialization; $visible is the allow-list alternative.',
          'API Resources give explicit control over response shape and are preferred over exposing models directly.',
          'Never hide a password only in the model and assume it is safe: also select only needed columns and scope queries.',
        ] },
        { type: 'note', value: 'Do not run database queries inside an accessor used in a loop. That creates an N+1 bug; load the data with with(), withCount() or a single query first.' },
      ],
    },
    {
      id: 'laravel-soft-deletes',
      title: 'Soft Deletes and Local Scopes',
      blocks: [
        { type: 'text', value: 'Soft deletes mark a row as deleted instead of removing it. The row stays in the table with a deleted_at timestamp, ordinary queries ignore it, and you can restore it later. A local scope packages a reusable query filter so controllers stay readable.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;
}

// Migration
$table->softDeletes();` },
        { type: 'code', lang: 'php', value: String.raw`$posts = Post::all();
$withTrashed = Post::withTrashed()->get();
$onlyTrashed = Post::onlyTrashed()->get();

$post->delete();
$post->restore();
$post->forceDelete();` },
        { type: 'code', lang: 'php', value: String.raw`class Post extends Model
{
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at');
    }

    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }
}

$posts = Post::published()->recent(30)->latest()->get();` },
        { type: 'list', items: [
          'Soft deleted rows still occupy unique indexes; a unique email cannot be reused after a soft delete unless you include deleted_at in the index.',
          'withTrashed() includes deleted rows, onlyTrashed() returns only deleted rows, and restore() clears deleted_at.',
          'forceDelete() permanently removes the row; database foreign keys still apply, so decide between cascade and restrict.',
          'Local scopes are prefixed with scope and called without the prefix: scopePublished becomes published().',
          'Soft deletes are not an archive strategy. Define retention rules and hard-delete old data when policy requires it.',
        ] },
        { type: 'note', value: 'Route model binding excludes soft deleted rows by default. Use withTrashed() in the route binding or query when an admin screen must view deleted records.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'eloquent-basics', q: 'By default, the model class Post maps to which table?', options: ['post', 'posts', 'Post', 'posts_table'], answer: 1, explain: 'Eloquent pluralises the snake_case class name, so Post maps to posts.' },
    { chapterId: 'eloquent-basics', q: 'Which method throws a 404 when no record matches?', options: ['find', 'first', 'findOrFail', 'where'], answer: 2, explain: 'findOrFail throws ModelNotFoundException, which Laravel converts into an HTTP 404 response.' },
    { chapterId: 'eloquent-basics', q: 'What does $fillable protect against?', options: ['SQL injection', 'Mass assignment of unexpected attributes', 'N+1 queries', 'Invalid casts'], answer: 1, explain: '$fillable is a whitelist that limits which array keys fill() and create() may set.' },
    { chapterId: 'eloquent-basics', q: 'What does a cast like published_at => datetime change?', options: ['The database column type', 'How the attribute is read and written in PHP', 'The table name', 'The primary key'], answer: 1, explain: 'Casts convert values in PHP and JSON output; the database schema is defined by migrations.' },
    { chapterId: 'eloquent-basics', q: 'Which method defines a modern accessor and mutator together in Laravel 11+?', options: ['getFullNameAttribute', 'protected function fullName(): Attribute', 'public function getFullName', 'protected $fullName'], answer: 1, explain: 'An Attribute object with get and set callbacks replaces the old separate get and set methods.' },
    { chapterId: 'eloquent-basics', q: 'Which trait enables soft deletes?', options: ['SoftDeletes', 'Trashable', 'Archivable', 'SoftDelete'], answer: 0, explain: 'The SoftDeletes trait adds deleted_at behaviour and the withTrashed, onlyTrashed and restore methods.' },
    { chapterId: 'eloquent-basics', q: 'What does $hidden control?', options: ['Which columns are indexed', 'Which attributes are excluded from array and JSON output', 'Which fields may be mass assigned', 'Which events fire'], answer: 1, explain: '$hidden keeps sensitive attributes such as passwords out of toArray() and JSON responses.' },
    { chapterId: 'eloquent-basics', q: 'What is the difference between create() and fill()->save()?', options: ['create persists immediately, fill()->save() needs save()', 'They are identical', 'fill() does not validate', 'create() bypasses casts'], answer: 0, explain: 'create() fills the model and saves it; fill() only sets attributes, so you must call save() yourself.' },
  ],
};
