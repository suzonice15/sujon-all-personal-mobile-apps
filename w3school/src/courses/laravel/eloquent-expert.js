// Laravel chapter: Advanced Eloquent.

export default {
  id: 'laravel-eloquent-expert',
  title: 'Advanced Eloquent',
  description: 'Scopes, observers, casts, performance and query optimization',
  icon: 'insights',
  lessons: [
    {
      id: 'laravel-scopes-observers',
      title: 'Scopes & Observers',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// Global scope
class ActiveScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $builder->where('active', true);
    }
}

// Local scope
public function scopePublished(Builder $q): Builder
{
    return $q->whereNotNull('published_at');
}

// Observer
class ProductObserver
{
    public function creating(Product $p): void { $p->slug = Str::slug($p->name); }
    public function deleted(Product $p): void { Storage::delete($p->image); }
}` },
      ],
    },
    {
      id: 'laravel-performance',
      title: 'Query Performance',
      blocks: [
        { type: 'list', items: [
          'Use select() to limit columns.',
          'Avoid N+1 with with() and withCount().',
          'Use chunk()/lazy() for large datasets.',
          'Index foreign keys and search columns.',
          'Use DB::transaction for consistency.',
          'Cache hot queries with Cache::remember.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
$products = Product::select('id', 'name', 'price')
    ->withCount('reviews')
    ->with('category:id,name')
    ->latest()
    ->paginate(50);

// Chunk
Product::where('active', true)->chunk(500, function ($rows) {
    foreach ($rows as $r) { /* process */ }
});` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'laravel-eloquent-expert', q: 'Global scope is?', options: ['Applied to all queries automatically', 'Manual filter', 'Cache', 'Middleware'], answer: 0, explain: 'Global scopes apply automatically.' },
  ],
};
