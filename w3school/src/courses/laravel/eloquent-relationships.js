// Laravel chapter: Eloquent Relationships. Lessons plus this chapter's quiz questions.

export default {
  id: 'eloquent-relationships',
  title: 'Eloquent Relationships',
  description: 'Model every real-world relationship without N+1 bugs',
  icon: 'account-tree',
  lessons: [
    {
      id: 'laravel-one-to-one',
      title: 'One to One',
      blocks: [
        { type: 'text', value: 'A one-to-one relationship links one row to exactly one other row: a user has one profile, an order has one invoice. The table that holds the foreign key is the child, and its model declares belongsTo while the parent declares hasOne.' },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }
}

class Profile extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`Schema::create('profiles', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
    $table->string('phone', 30)->nullable();
    $table->date('birthday')->nullable();
    $table->timestamps();
});` },
        { type: 'list', items: [
          'The unique() on user_id is what makes it truly one-to-one at the database level.',
          'hasOne returns null when no related row exists, so use optional chaining or a null check: $user->profile?->phone.',
          'belongsTo uses the foreign key on the current table; hasOne uses the foreign key on the related table.',
          'Pass explicit keys when names do not follow convention: hasOne(Profile::class, "owner_id", "id").',
          'Eager load the pair with User::with("profile")->get() when a list needs profile data.',
        ] },
        { type: 'note', value: 'hasOne without a unique constraint is really a one-to-many with an assumption. Enforce the rule in the migration, not only in application code.' },
      ],
    },
    {
      id: 'laravel-one-to-many',
      title: 'One to Many',
      blocks: [
        { type: 'text', value: 'A one-to-many relationship is the most common: a user writes many posts, a post has one author. The foreign key lives on the many side (posts.user_id), so Post belongsTo User and User hasMany Post.' },
        { type: 'code', lang: 'php', value: String.raw`class User extends Model
{
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}

class Post extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`$user = User::findOrFail(1);

$posts = $user->posts()->where('status', 'published')->latest()->get();

$post = $user->posts()->create([
    'title' => 'A new post',
    'body' => 'Created through the relationship.',
]);

$post->user()->associate($user);
$post->save();

$post->user()->dissociate();
$post->save();` },
        { type: 'list', items: [
          'Calling $user->posts returns a Collection; calling $user->posts() returns a query builder you can filter before running.',
          'create() through the relationship sets user_id automatically, but the related attributes must still pass mass assignment rules.',
          'associate() sets the foreign key in memory; save() writes it. dissociate() clears it when the column is nullable.',
          'Use with("posts") to load many authors and their posts in a fixed number of queries.',
          'Order relation queries when displaying them: $user->posts()->latest()->get().',
        ] },
        { type: 'note', value: 'Never filter a loaded collection with $user->posts->where(...) inside a loop. Query the relationship instead, or eager load a constrained relationship, so the database does the work.' },
      ],
    },
    {
      id: 'laravel-many-to-many',
      title: 'Many to Many',
      blocks: [
        { type: 'text', value: 'A many-to-many relationship needs a pivot table because neither side owns the foreign key: a post has many tags and a tag belongs to many posts. Laravel expects the pivot table to combine both singular table names in alphabetical order with underscores.' },
        { type: 'code', lang: 'php', value: String.raw`class Post extends Model
{
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }
}

class Tag extends Model
{
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`Schema::create('post_tag', function (Blueprint $table) {
    $table->foreignId('post_id')->constrained()->cascadeOnDelete();
    $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
    $table->primary(['post_id', 'tag_id']);
    $table->timestamps();
});` },
        { type: 'code', lang: 'php', value: String.raw`$post = Post::findOrFail(1);

$post->tags()->attach([1, 3]);
$post->tags()->detach(2);
$post->tags()->sync([1, 4, 7]);
$post->tags()->syncWithoutDetaching([2]);
$post->tags()->toggle([3, 5]);

$post->tags()->updateExistingPivot($tagId, ['featured' => true]);

foreach ($post->tags as $tag) {
    echo $tag->name . ' added ' . $tag->pivot->created_at;
}` },
        { type: 'list', items: [
          'attach adds rows, detach removes them, sync makes the pivot match the given ids exactly, and toggle flips membership.',
          'withPivot("featured") exposes extra pivot columns, and withTimestamps fills created_at and updated_at.',
          'Use a custom Pivot model with using() when pivot rows need behaviour, casts or events.',
          'The composite primary key prevents the same pair twice; sync relies on that behaviour to stay correct.',
          'Both belongsToMany models are equal: choose whichever reads best in your domain language.',
        ] },
        { type: 'note', value: 'Custom pivot table names are passed as the second argument: belongsToMany(Post::class, "post_tag"). Keep the naming predictable so other developers can follow the schema.' },
      ],
    },
    {
      id: 'laravel-has-many-through',
      title: 'Has Many Through',
      blocks: [
        { type: 'text', value: 'hasManyThrough reaches models through an intermediate model without writing a join by hand. A country has many posts through its users: countries has users, and users has posts. The intermediate table holds the key to the parent, and the final table holds the key to the intermediate model.' },
        { type: 'code', lang: 'php', value: String.raw`class Country extends Model
{
    public function posts(): HasManyThrough
    {
        return $this->hasManyThrough(
            Post::class,
            User::class,
            'country_id',
            'user_id',
            'id',
            'id',
        );
    }
}

$posts = Country::find(1)->posts()->latest()->get();
$count = Country::withCount('posts')->get();` },
        { type: 'list', items: [
          'The signature is hasManyThrough(finalModel, intermediateModel, foreignKeyOnIntermediate, foreignKeyOnFinal, localKey, secondLocalKey).',
          'hasManyThrough is read-oriented: it does not provide create, attach or save helpers for the far model.',
          'Use it for reporting and nested listings, not as a replacement for clear relationship names.',
          'It does not support polymorphic relationships; use morph relationships or explicit joins there.',
          'Eager loading with with("posts") and counting with withCount("posts") work normally.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`$countries = Country::query()
    ->withCount('posts')
    ->having('posts_count', '>', 10)
    ->orderByDesc('posts_count')
    ->get();` },
        { type: 'note', value: 'If the query gets complex, a join or a subquery may be clearer than a custom through key setup. Prefer the relationship when the schema genuinely has the intermediate hop.' },
      ],
    },
    {
      id: 'laravel-polymorphic',
      title: 'Polymorphic Relationships',
      blocks: [
        { type: 'text', value: 'A polymorphic relationship lets one model belong to several other models through a single association. Comments can belong to posts, videos or products using commentable_id and commentable_type, instead of three separate foreign keys.' },
        { type: 'code', lang: 'php', value: String.raw`class Comment extends Model
{
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }
}

class Post extends Model
{
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

class Video extends Model
{
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`Schema::create('comments', function (Blueprint $table) {
    $table->id();
    $table->morphs('commentable');
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->text('body');
    $table->timestamps();
});` },
        { type: 'list', items: [
          'morphs() creates both commentable_id and commentable_type, plus a composite index for lookups.',
          'morphMany is the one-to-many polymorphic relation; morphOne and morphToMany cover the other shapes.',
          'The type column stores a class name by default. Register a morph map so database rows stay stable when classes move.',
          'Filter polymorphic queries with whereHasMorph or constraint the relation before loading.',
          'Foreign key constraints are harder with polymorphism because the parent table varies; clean up orphans deliberately.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`use Illuminate\Database\Eloquent\Relations\Relation;

// AppServiceProvider::boot()
Relation::enforceMorphMap([
    'post' => Post::class,
    'video' => Video::class,
]);

$comments = Comment::with('commentable')->latest()->get();
$postComments = Post::find(1)->comments()->latest()->get();` },
        { type: 'note', value: 'Always constrain polymorphic queries by type. A missing type filter can load unrelated rows and expose data across models that happen to share an id.' },
      ],
    },
    {
      id: 'laravel-eager-loading',
      title: 'Eager Loading and N+1',
      blocks: [
        { type: 'text', value: 'Lazy loading fetches a relationship the first time you access it. In a loop over 50 posts, that becomes 1 query for the posts plus 50 queries for authors: the N+1 problem. Eager loading fetches all related rows in one or two queries before the loop starts.' },
        { type: 'code', lang: 'php', value: String.raw`// Bad: one query for posts, then one per post
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->user->name;
}

// Good: two queries total
$posts = Post::with('user')->get();
foreach ($posts as $post) {
    echo $post->user->name;
}` },
        { type: 'code', lang: 'php', value: String.raw`$posts = Post::query()
    ->with([
        'user:id,name',
        'comments' => fn ($query) => $query->latest()->limit(5),
        'tags',
    ])
    ->withCount('comments')
    ->withSum('comments', 'votes')
    ->latest()
    ->paginate(20);

$post = Post::find(1);
$post->loadMissing(['user', 'tags']);` },
        { type: 'list', items: [
          'with() eager loads for a query; load() eager loads on an existing model or collection; loadMissing() skips already loaded relations.',
          'Select only the columns you need: with("user:id,name") reduces transfer and memory, but always include the key.',
          'withCount() adds a comments_count attribute without loading every comment row.',
          'Nested eager loading uses dot notation: with("comments.user").',
          'Enable Model::preventLazyLoading() in local and testing environments so N+1 bugs fail loudly.',
        ] },
        { type: 'note', value: 'Eager loading everything is also a bug: loading huge relations you never render wastes memory. Load exactly the relations the screen uses and prefer withCount for totals.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'eloquent-relationships', q: 'In a one-to-one relationship, which model holds the foreign key?', options: ['The parent', 'The child that declares belongsTo', 'Both', 'Neither'], answer: 1, explain: 'The child table stores the foreign key and its model declares belongsTo; the parent declares hasOne.' },
    { chapterId: 'eloquent-relationships', q: 'User hasMany Post means the foreign key lives on which table?', options: ['users', 'posts', 'both', 'a pivot table'], answer: 1, explain: 'In one-to-many the many side stores the foreign key, so posts.user_id references users.id.' },
    { chapterId: 'eloquent-relationships', q: 'What is the default pivot table name for Post and Tag?', options: ['post_tag', 'posts_tags', 'post_tags', 'tag_post'], answer: 0, explain: 'Laravel joins the singular table names in alphabetical order with an underscore.' },
    { chapterId: 'eloquent-relationships', q: 'Which method makes a belongsToMany relation match an exact set of ids?', options: ['attach', 'detach', 'sync', 'toggle'], answer: 2, explain: 'sync adds missing ids, removes ids not in the list, and leaves the pivot matching the given set.' },
    { chapterId: 'eloquent-relationships', q: 'When is hasManyThrough useful?', options: ['Two models share a pivot', 'Reaching far models through an intermediate model', 'You need polymorphic rows', 'You need a one-to-one'], answer: 1, explain: 'It reaches models two hops away, such as a country posts through its users, without a manual join.' },
    { chapterId: 'eloquent-relationships', q: 'Which relation types form a polymorphic pair?', options: ['hasOne and belongsTo', 'morphMany and morphTo', 'belongsToMany and hasMany', 'hasMany and hasOne'], answer: 1, explain: 'The owning side declares morphMany (or morphOne) and the child declares morphTo.' },
    { chapterId: 'eloquent-relationships', q: 'What is the N+1 problem?', options: ['Too many columns', 'One query per row for related data', 'A missing foreign key', 'A join with N tables'], answer: 1, explain: 'A list query plus one relationship query per row turns 1 query into N+1 queries.' },
    { chapterId: 'eloquent-relationships', q: 'Which call fixes N+1 when each post needs its author?', options: ['Post::all()', 'Post::with("user")->get()', 'Post::find(1)', 'Post::count()'], answer: 1, explain: 'with("user") loads all authors in a single additional query before the loop.' },
  ],
};
