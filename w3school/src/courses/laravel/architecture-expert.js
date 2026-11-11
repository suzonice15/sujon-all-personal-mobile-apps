// Laravel chapter: Multi-tenancy & Architecture.

export default {
  id: 'laravel-architecture-expert',
  title: 'Multi-tenancy & Architecture',
  description: 'SaaS patterns, domains, DDD and scaling',
  icon: 'apartment',
  lessons: [
    {
      id: 'laravel-multitenancy',
      title: 'Multi-tenancy',
      blocks: [
        { type: 'list', items: [
          'Single DB with tenant_id (simple, shared).',
          'Database per tenant (isolation, backups).',
          'Subdomain routing: {tenant}.app.com.',
          'Packages: stancl/tenancy, spatie/laravel-multitenancy.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
Route::domain('{tenant}.example.com')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);
});` },
      ],
    },
    {
      id: 'laravel-ddd',
      title: 'Clean Architecture',
      blocks: [
        { type: 'list', items: [
          'Separate Domain, Application, Infrastructure.',
          'Use DTOs and Actions instead of fat controllers.',
          'Repository pattern for data access.',
          'Domain events for side effects.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`<?php
class CreateOrderAction
{
    public function execute(CreateOrderData $data): Order
    {
        return DB::transaction(function () use ($data) {
            $order = Order::create($data->toArray());
            event(new OrderCreated($order));
            return $order;
        });
    }
}` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'laravel-architecture-expert', q: 'Multi-tenant isolation option?', options: ['Database per tenant', 'Shared cache only', 'Single route', 'One user'], answer: 0, explain: 'DB per tenant gives isolation.' },
  ],
};
