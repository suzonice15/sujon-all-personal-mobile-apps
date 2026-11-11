// Laravel chapter: Packages and Ecosystem. Lessons plus this chapter quiz questions.

export default {
  id: 'packages-ecosystem',
  title: 'Packages & Ecosystem',
  description: 'Livewire, Inertia, Filament and the packages that save months',
  icon: 'layers',
  lessons: [
    {
      id: 'laravel-composer-packages',
      title: 'Composer and Packages',
      blocks: [
        { type: 'text', value: 'Composer is the dependency manager for PHP and the door to the Laravel ecosystem. Packagist hosts tens of thousands of packages, from authentication and payments to admin panels and PDF generation. Good engineers do not write everything themselves, but they do evaluate a package before trusting it with production data.' },
        { type: 'code', lang: 'text', value: String.raw`composer require laravel/sanctum
composer require --dev laravel/pint phpstan/phpstan

composer install --no-dev --optimize-autoloader
composer update --with-all-dependencies
composer outdated --direct
composer audit

composer dump-autoload --optimize` },
        { type: 'list', items: [
          'Read the package constraints: ^11.0 allows 11.x but not 12.x; a bare wildcard is a risk.',
          'Commit composer.lock for applications so every environment installs the same versions.',
          'Check maintenance: recent releases, supported Laravel versions, open critical issues and test coverage.',
          'Laravel package discovery registers service providers automatically; publish config only when you need to change defaults.',
          'Prefer a well-maintained package over a fork you must maintain forever. Budget for upgrades either way.',
        ] },
        { type: 'note', value: 'Every dependency is code you ship and must patch. Before adding one, ask whether it saves more than it costs: security updates, breaking changes, licence, performance and the effort to remove it later. Fewer, better packages beat a huge composer.json.' },
      ],
    },
    {
      id: 'laravel-livewire',
      title: 'Livewire',
      blocks: [
        { type: 'text', value: 'Livewire builds dynamic interfaces with PHP and Blade instead of a separate JavaScript framework. A component is a PHP class plus a Blade view; interactions call methods on the server and Livewire updates the DOM. It is ideal for forms, tables, dashboards and admin screens where server-rendered HTML is enough.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Livewire;

use App\Models\Course;
use Livewire\Attributes\Validate;
use Livewire\Component;

class CourseSearch extends Component
{
    #[Validate('nullable|string|max:100')]
    public string $term = '';

    public function render()
    {
        return view('livewire.course-search', [
            'courses' => Course::query()
                ->where('title', 'like', '%' . $this->term . '%')
                ->orderBy('title')
                ->limit(20)
                ->get(),
        ]);
    }
}` },
        { type: 'code', lang: 'html', value: String.raw`<div>
    <input type="search" wire:model.live.debounce.300ms="term" placeholder="Search courses">

    <p wire:loading>Searching...</p>

    <ul>
        @foreach ($courses as $course)
            <li wire:key="course-{{ $course->id }}">{{ $course->title }}</li>
        @endforeach
    </ul>
</div>` },
        { type: 'list', items: [
          'Use wire:model.live for instant updates and plain wire:model for updates on submit; debounce avoids a request per keystroke.',
          'Always add wire:key in loops so Livewire can track rows correctly.',
          'Validate on the server with attributes or rules; the browser is never trusted.',
          'Use islands or lazy components for expensive sections so the whole page does not re-render.',
          'Livewire is not a replacement for a SPA. For heavy client-side state, Inertia or a JavaScript framework may fit better.',
        ] },
        { type: 'note', value: 'Livewire sends state to the browser and back, so treat every public property as user input. Never put secrets in public properties, and authorise actions inside methods. Large payloads and huge lists hurt performance; paginate and keep components small.' },
      ],
    },
    {
      id: 'laravel-inertia',
      title: 'Inertia.js',
      blocks: [
        { type: 'text', value: 'Inertia lets you build a single-page application without writing a separate API. Laravel controllers return Inertia responses with props, and a Vue, React or Svelte page renders them. Navigation happens client-side, but routing, authentication and validation still live in Laravel. It is the pragmatic bridge between server-side and SPA development.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Courses/Index', [
            'courses' => Course::query()
                ->withCount('lessons')
                ->orderBy('title')
                ->paginate(20),
            'filters' => request()->only('search'),
        ]);
    }
}` },
        { type: 'code', lang: 'js', value: String.raw`import { useForm } from '@inertiajs/vue3';

const form = useForm({
  title: '',
  description: '',
});

function submit() {
  form.post('/courses', {
    onSuccess: () => form.reset(),
  });
}` },
        { type: 'list', items: [
          'Props are the contract between Laravel and the page. Keep them small and shaped for the UI.',
          'Use shared data for auth user, flash messages and app settings instead of repeating them in every controller.',
          'Use partial reloads with only to refresh one section without re-sending everything.',
          'Validation errors arrive automatically in the form helper, but server-side rules are still the source of truth.',
          'Enable server-side rendering for better first paint and SEO when public pages matter.',
        ] },
        { type: 'note', value: 'Inertia is not an API. Do not build a parallel JSON API unless mobile clients or third parties need it. Keep one source of truth for validation and authorisation, and remember that every prop is visible in the page source: never send secrets or unfiltered models.' },
      ],
    },
    {
      id: 'laravel-filament-nova',
      title: 'Filament and Nova',
      blocks: [
        { type: 'text', value: 'Admin panels are expensive to build and easy to get wrong. Filament is an open-source, Livewire-based framework for admin panels, forms, tables and dashboards. Laravel Nova is the official first-party admin tool. Both generate CRUD screens from resources, but they differ in licence, ecosystem and extension model.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseResource\Pages;
use App\Models\Course;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')->required()->maxLength(150),
            Forms\Components\Textarea::make('description')->columnSpanFull(),
            Forms\Components\Toggle::make('is_published'),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')->searchable()->sortable(),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->filters([]);
    }
}` },
        { type: 'list', items: [
          'Filament is free and open source with a large plugin ecosystem; it is built on Livewire and Blade.',
          'Nova is commercial, first-party and has a mature set of official fields and tools.',
          'Both should sit behind strong authorisation. Admin panels are high-value targets.',
          'Use policies and gates for every resource action, not only menu visibility.',
          'Do not expose an admin panel on the same guard as customers without extra protection such as IP allow lists or SSO.',
        ] },
        { type: 'note', value: 'An admin panel is internal software, but it still needs tests, audit logs and backups. Protect destructive actions with confirmation and soft deletes, and log who changed what. A fast admin panel that lets anyone delete production data is not a feature.' },
      ],
    },
    {
      id: 'laravel-horizon-telescope',
      title: 'Horizon, Telescope and Pulse',
      blocks: [
        { type: 'text', value: 'Laravel ships three complementary visibility tools. Horizon is a queue dashboard and supervisor for Redis queues. Telescope records detailed request, query, job and mail activity for debugging. Pulse is a production-friendly metrics dashboard for slow queries, endpoints, cache and queues. Knowing which tool belongs in which environment is part of operating Laravel well.' },
        { type: 'code', lang: 'text', value: String.raw`composer require laravel/horizon
php artisan horizon:install
php artisan horizon
php artisan horizon:pause
php artisan horizon:continue
php artisan horizon:terminate

php artisan telescope:install
php artisan telescope:prune --hours=48` },
        { type: 'list', items: [
          'Horizon: production queue monitoring and balancing. Run it under Supervisor and restart it on deploy.',
          'Telescope: local and staging debugging. Gate it so only trusted users can open it, and prune old entries.',
          'Pulse: lightweight production metrics with cards for slow queries, cache hits, exceptions and queue wait.',
          'Failed jobs belong in the failed_jobs table; review them and retry or discard deliberately.',
          'Alert on queue wait and failure rate, not only on whether workers are running.',
        ] },
        { type: 'note', value: 'Telescope stores a lot of data and can expose request payloads, so it should not be publicly reachable in production. If you need it in production, restrict access with a gate plus network rules and shorten retention. Observability is only useful when someone is responsible for reading it.' },
      ],
    },
    {
      id: 'laravel-socialite-cashier',
      title: 'Socialite, Cashier and Other Packages',
      blocks: [
        { type: 'text', value: 'The ecosystem covers most product features. Socialite handles OAuth login with Google, GitHub, Facebook and others. Cashier manages subscriptions and billing for Stripe or Paddle. Sanctum handles API tokens and SPA authentication, Pennant handles feature flags, Scout adds full-text search, and Spatie packages cover permissions, media, backups and more.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Laravel\Socialite\Facades\Socialite;

Route::get('/auth/github/redirect', function () {
    return Socialite::driver('github')->redirect();
});

Route::get('/auth/github/callback', function () {
    $githubUser = Socialite::driver('github')->user();

    $user = User::updateOrCreate(
        ['email' => $githubUser->getEmail()],
        ['name' => $githubUser->getName(), 'github_id' => $githubUser->getId()],
    );

    auth()->login($user);

    return redirect('/dashboard');
});` },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable;
}

// Start a subscription checkout
$user->newSubscription('default', 'price_monthly')
    ->checkout([
        'success_url' => route('billing.success'),
        'cancel_url' => route('billing.cancel'),
    ]);` },
        { type: 'list', items: [
          'Sanctum: first-party API tokens and SPA cookie authentication. Prefer it over hand-rolled tokens.',
          'Pennant: feature flags for gradual rollouts and A/B tests without deploying twice.',
          'Scout: full-text search with database, Algolia, Meilisearch or Typesense drivers.',
          'Spatie: permissions, media library, activity log, backup and sitemap packages with strong documentation.',
          'Cashier: use webhooks as the source of truth for subscription state, not only the redirect after checkout.',
        ] },
        { type: 'note', value: 'Read the upgrade guides before every major Laravel release and check whether each package supports the new version. For payments, never trust client-side success pages; verify through signed webhooks and test with the provider test mode before going live.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'packages-ecosystem', q: 'What does composer.lock guarantee?', options: ['The newest versions', 'Exact tested dependency versions', 'No dev packages', 'Faster autoloading'], answer: 1, explain: 'composer install uses the lock file so every environment gets identical versions.' },
    { chapterId: 'packages-ecosystem', q: 'Which package builds interactive UI with PHP and Blade?', options: ['Inertia', 'Livewire', 'Sanctum', 'Pennant'], answer: 1, explain: 'Livewire components are PHP classes rendered by Blade and updated over the network.' },
    { chapterId: 'packages-ecosystem', q: 'What is Inertia primarily used for?', options: ['Database migrations', 'SPA pages without a separate API', 'Queue monitoring', 'Payment billing'], answer: 1, explain: 'Inertia connects Laravel controllers to Vue, React or Svelte pages using props.' },
    { chapterId: 'packages-ecosystem', q: 'Which tool is the production queue dashboard?', options: ['Telescope', 'Horizon', 'Pint', 'Scout'], answer: 1, explain: 'Horizon monitors and balances Redis queues; Telescope is mainly for debugging.' },
    { chapterId: 'packages-ecosystem', q: 'Why should Telescope be restricted in production?', options: ['It disables caching', 'It stores and can expose request data', 'It blocks queues', 'It changes routes'], answer: 1, explain: 'Telescope records payloads and queries, so access must be gated and retention limited.' },
    { chapterId: 'packages-ecosystem', q: 'What handles OAuth social login in Laravel?', options: ['Cashier', 'Socialite', 'Pennant', 'Nova'], answer: 1, explain: 'Socialite provides OAuth drivers for providers such as GitHub and Google.' },
    { chapterId: 'packages-ecosystem', q: 'What is the source of truth for subscription state in Cashier?', options: ['The success redirect', 'Signed provider webhooks', 'The browser cookie', 'A local cache'], answer: 1, explain: 'Webhooks from Stripe or Paddle reliably update subscription state on the server.' },
  ],
};
