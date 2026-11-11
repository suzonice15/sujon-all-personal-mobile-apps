// Laravel chapter: Advanced Eloquent. Lessons plus this chapter's quiz questions.

export default {
  id: 'eloquent-advanced',
  title: 'Advanced Eloquent',
  description: 'Scopes, subqueries, transactions and model events',
  icon: 'hub',
  lessons: [
    {
      id: 'laravel-query-scopes',
      title: 'Query Scopes and Reusable Filters',
      blocks: [
        { type: 'text', value: 'A query scope packages a reusable constraint so every screen filters the same way. Local scopes stay on the model and are chained into queries; global scopes apply automatically to every query for that model.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at');
    }

    public function scopeByAuthor(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }
}

$posts = Post::published()->byAuthor(7)->latest()->get();` },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

class Post extends Model
{
    #[Scope]
    protected function recent(Builder $query, int $days = 7): void
    {
        $query->where('created_at', '>=', now()->subDays($days));
    }
}

$posts = Post::recent(30)->get();` },
        { type: 'list', items: [
          'Laravel 11 uses the scopeX naming convention; Laravel 12 also supports the #[Scope] attribute for a cleaner name.',
          'Scopes must return the builder (or modify the parameter) so calls can chain.',
          'Scopes accept parameters after the builder, which makes date ranges and owner filters reusable.',
          'Global scopes are added with addGlobalScope and can be removed with withoutGlobalScope when needed.',
          'Do not hide joins or side effects inside a scope: keep it a predictable WHERE clause or ordering rule.',
        ] },
        { type: 'note', value: 'Prefer scopes over duplicating long where clauses in controllers. For filters that vary per request, a dedicated query object or a scope with validated parameters keeps the logic testable.' },
      ],
    },
    {
      id: 'laravel-where-has',
      title: 'whereHas and Relationship Queries',
      blocks: [
        { type: 'text', value: 'whereHas filters a query by whether a relationship has matching rows. It compiles to an EXISTS subquery, so the parent rows stay unique and the related rows never leak into the result.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Builder;

$posts = Post::whereHas('comments', function (Builder $query) {
    $query->where('approved', true);
})->get();

// Simpler form for one condition on one relation
$posts = Post::whereRelation('user', 'active', true)->get();

$noComments = Post::whereDoesntHave('comments')->get();

$popular = Post::has('comments', '>=', 5)->get();

$nested = Post::whereHas('comments.user', function (Builder $query) {
    $query->where('name', 'Nadia');
})->get();` },
        { type: 'code', lang: 'php', value: String.raw`$posts = Post::query()
    ->withCount('comments')
    ->whereHas('comments', function (Builder $query) {
        $query->where('approved', true);
    })
    ->orderByDesc('comments_count')
    ->paginate(20);` },
        { type: 'list', items: [
          'whereHas runs an EXISTS subquery and is usually faster than loading relations and filtering in PHP.',
          'whereDoesntHave, doesntHave and orWhereHas cover the inverse and OR variants.',
          'Use whereRelation for a single scalar condition; use whereHas for grouped or nested constraints.',
          'Index the foreign key and the filtered column on the related table so the subquery stays fast.',
          'When you only need a count, withCount avoids loading rows just to check existence.',
        ] },
        { type: 'note', value: 'Nested whereHas with dot notation is convenient but can generate deep subqueries. For hot paths, confirm the query plan and consider a join with a distinct or group by.' },
      ],
    },
    {
      id: 'laravel-chunking',
      title: 'Chunking and Lazy Collections',
      blocks: [
        { type: 'text', value: 'Loading a million rows with get() exhausts memory. Chunking processes a large result in fixed-size pieces, while lazy collections stream rows as an iterable. Both keep memory bounded, but they behave differently when the underlying data changes.' },
        { type: 'code', lang: 'php', value: String.raw`use App\Models\Post;

Post::chunk(200, function ($posts) {
    foreach ($posts as $post) {
        $post->update(['checked_at' => now()]);
    }
});

Post::chunkById(200, function ($posts) {
    foreach ($posts as $post) {
        $post->update(['checked_at' => now()]);
    }
});

Post::lazy(200)->each(function (Post $post) {
    $post->update(['checked_at' => now()]);
});

Post::lazyById(200)->each(function (Post $post) {
    $post->update(['checked_at' => now()]);
});` },
        { type: 'list', items: [
          'chunk uses LIMIT and OFFSET, so updating rows that affect the filter can skip or repeat records.',
          'chunkById pages by primary key greater than the last id, which is stable while you modify rows.',
          'lazy and lazyById return LazyCollections and process the same pages without writing nested callbacks.',
          'cursor loads one row at a time with the smallest memory footprint but does not eager load relationships.',
          'Always chunk on a deterministic order and select only the columns the job needs.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`Post::query()
    ->where('status', 'draft')
    ->select(['id', 'title'])
    ->chunkById(500, function ($posts) {
        foreach ($posts as $post) {
            echo $post->title . PHP_EOL;
        }
    });` },
        { type: 'note', value: 'Long-running CLI jobs should also respect memory: unset large variables, avoid collecting all pages into one array, and let the process exit between batches if the work allows it.' },
      ],
    },
    {
      id: 'laravel-transactions',
      title: 'Transactions and Locks',
      blocks: [
        { type: 'text', value: 'A transaction makes several writes succeed or fail together. If any statement throws, everything rolls back, so an order cannot be saved without its items or a payment recorded without a matching balance change.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Support\Facades\DB;

$order = DB::transaction(function () use ($request) {
    $order = Order::create([
        'user_id' => $request->user()->id,
        'total' => 0,
    ]);

    foreach ($request->items as $item) {
        $order->items()->create($item);
    }

    $order->update(['total' => $order->items()->sum('price')]);

    return $order;
}, attempts: 3);` },
        { type: 'code', lang: 'php', value: String.raw`DB::transaction(function () {
    $product = Product::whereKey(1)->lockForUpdate()->firstOrFail();

    if ($product->stock < 1) {
        throw new \RuntimeException('Out of stock');
    }

    $product->decrement('stock');
});

// Conditional update also works without an explicit lock
$affected = Product::whereKey(1)
    ->where('stock', '>', 0)
    ->decrement('stock');

if ($affected === 0) {
    throw new \RuntimeException('Out of stock');
}` },
        { type: 'list', items: [
          'DB::transaction commits when the closure returns and rolls back when it throws, then rethrows the exception.',
          'attempts retries the whole closure on deadlocks, but the closure must be safe to run again.',
          'lockForUpdate prevents other transactions from changing the selected rows until the transaction ends.',
          'Keep transactions short: never send email, call an API or wait inside one, because locks and connections stay held.',
          'Laravel wraps each nested transaction in a savepoint, but avoid deep nesting when a single transaction is clearer.',
        ] },
        { type: 'note', value: 'A lock is only useful inside a transaction. lockForUpdate outside DB::transaction releases immediately and gives a false sense of safety.' },
      ],
    },
    {
      id: 'laravel-model-events',
      title: 'Model Events and Observers',
      blocks: [
        { type: 'text', value: 'Eloquent fires events around model lifecycle operations: creating, created, updating, updated, saving, saved, deleting, deleted and so on. Use them to enforce invariants and trigger side effects that must follow the model consistently.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    protected static function booted(): void
    {
        static::creating(function (Post $post) {
            $post->slug ??= Str::slug($post->title);
            $post->status ??= 'draft';
        });

        static::deleting(function (Post $post) {
            $post->comments()->delete();
        });
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Cache;

class PostObserver
{
    public function created(Post $post): void
    {
        Cache::forget('posts.index');
    }

    public function updated(Post $post): void
    {
        Cache::forget('posts.' . $post->id);
    }

    public function deleted(Post $post): void
    {
        Cache::forget('posts.index');
    }
}

// AppServiceProvider::boot()
Post::observe(PostObserver::class);` },
        { type: 'list', items: [
          'Use creating and saving to normalise or validate data before it reaches the database.',
          'Use created, updated and deleted for side effects such as cache invalidation, notifications or audit logs.',
          'Observers keep model classes small and group all hooks for one model in one class.',
          'Bulk query builder operations and upsert bypass model events; do required work explicitly in those paths.',
          'Events fired inside a transaction may run before the commit, so a listener that reads the row elsewhere can miss it.',
        ] },
        { type: 'note', value: 'Keep event listeners fast and idempotent. For email, webhooks or heavy processing, dispatch a queued job from the event instead of doing the work inline.' },
      ],
    },
    {
      id: 'laravel-advanced-writes',
      title: 'Upserts, insertOrIgnore and Bulk Writes',
      blocks: [
        { type: 'text', value: 'Importing or syncing many rows one model at a time is slow and fires thousands of events. Eloquent and the query builder offer bulk write methods that handle batches in a single statement, at the cost of bypassing model events and casts.' },
        { type: 'code', lang: 'php', value: String.raw`use App\Models\Post;

Post::upsert(
    [
        ['external_id' => 1, 'title' => 'First', 'body' => 'Text'],
        ['external_id' => 2, 'title' => 'Second', 'body' => 'Text'],
    ],
    ['external_id'],
    ['title', 'body', 'updated_at'],
);

Post::updateOrCreate(
    ['external_id' => 3],
    ['title' => 'Third', 'body' => 'Text'],
);

Post::firstOrCreate(
    ['slug' => 'fourth'],
    ['title' => 'Fourth', 'body' => 'Text'],
);

DB::table('posts')->insertOrIgnore([
    ['slug' => 'fifth', 'title' => 'Fifth'],
]);` },
        { type: 'code', lang: 'php', value: String.raw`DB::table('posts')->insert($rows);

DB::table('posts')->where('user_id', 7)->increment('views');

DB::table('counters')->updateOrInsert(
    ['name' => 'orders'],
    ['value' => DB::raw('value + 1')],
);` },
        { type: 'list', items: [
          'upsert needs a unique or primary key on the conflict columns; without it the database cannot decide what to update.',
          'insertOrIgnore silently ignores every database error for the batch, including errors you may want to see.',
          'updateOrCreate fires events and casts; upsert does not, so check timestamps and observers explicitly.',
          'Bulk inserts do not fill created_at and updated_at automatically when using DB::table; include them in the rows.',
          'Chunk big imports into a few hundred rows per statement to avoid packet size limits and long locks.',
        ] },
        { type: 'note', value: 'Add updated_at to the update columns in upsert when downstream code sorts by modification time. A row that changed but kept its old timestamp will appear stale.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'eloquent-advanced', q: 'What does a local query scope return?', options: ['A collection', 'A query builder instance for chaining', 'An array', 'A model'], answer: 1, explain: 'A scope receives and returns the builder so further constraints can be chained.' },
    { chapterId: 'eloquent-advanced', q: 'Which method filters parents by whether related rows match?', options: ['with', 'whereHas', 'hasMany', 'load'], answer: 1, explain: 'whereHas compiles to an EXISTS subquery and keeps only parents with at least one matching related row.' },
    { chapterId: 'eloquent-advanced', q: 'Why prefer chunkById over chunk when updating rows?', options: ['It is faster', 'chunk can skip or repeat rows as the query changes', 'It eager loads automatically', 'It uses less code'], answer: 1, explain: 'chunk uses OFFSET, which shifts when rows are updated or deleted; chunkById pages by primary key instead.' },
    { chapterId: 'eloquent-advanced', q: 'What does DB::transaction do?', options: ['Runs queries in parallel', 'Commits on success and rolls back on exception', 'Caches queries', 'Only works with MySQL'], answer: 1, explain: 'The closure runs inside a transaction, commits when it returns, and rolls back when it throws.' },
    { chapterId: 'eloquent-advanced', q: 'Which method locks selected rows until the transaction ends?', options: ['lockForUpdate()', 'sharedLock()', 'freeze()', 'hold()'], answer: 0, explain: 'lockForUpdate takes an exclusive row lock inside a transaction so concurrent updates wait.' },
    { chapterId: 'eloquent-advanced', q: 'Do bulk updates through the query builder fire model events?', options: ['Yes, always', 'No, they bypass Eloquent events', 'Only on MySQL', 'Only with upsert'], answer: 1, explain: 'Query builder and upsert operations bypass model events, casts and observers.' },
    { chapterId: 'eloquent-advanced', q: 'Why does upsert need a unique index on the conflict columns?', options: ['To run faster', 'To identify conflicting rows to update', 'To cast values', 'To fire events'], answer: 1, explain: 'The database needs a unique constraint to detect a conflict and choose the row to update.' },
  ],
};
