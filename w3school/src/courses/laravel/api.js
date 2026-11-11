// Laravel chapter: REST APIs.

export default {
  id: 'laravel-api',
  title: 'REST APIs',
  description: 'API resources, versioning, pagination and rate limiting',
  icon: 'api',
  lessons: [
    {
      id: 'laravel-api-resources',
      title: 'API Resources',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// app/Http/Resources/ProductResource.php
class ProductResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'category' => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}

// controller
return ProductResource::collection(Product::paginate(20));` },
      ],
    },
    {
      id: 'laravel-api-versioning',
      title: 'Versioning & Rate Limiting',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
// routes/api.php
Route::prefix('v1')->group(function () {
    Route::apiResource('products', V1\ProductController::class);
});

// Rate limit in bootstrap/app.php
$middleware->throttleApi(); // 60/min default
RateLimiter::for('api', fn (Request $r) => Limit::perMinute(60)->by($r->user()?->id ?: $r->ip()));` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'laravel-api', q: 'API Resource transforms?', options: ['Model to JSON', 'DB schema', 'Route to controller', 'View to HTML'], answer: 0, explain: 'Resources shape JSON output.' },
  ],
};
