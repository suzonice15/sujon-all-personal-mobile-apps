// Laravel chapter: Packages & Ecosystem. Composer, Livewire, Inertia,
// admin panels and the visibility tools.

export default {
  id: 'packages-ecosystem',
  title: 'Packages & Ecosystem',
  description: 'Composer, Livewire, Inertia, Filament and the tools that save months',
  icon: 'layers',
  lessons: [
    {
      id: 'laravel-composer-packages',
      title: 'Composer and packages',
      blocks: [
        { type: 'text', value: 'Composer is the dependency manager for PHP and the door to the Laravel ecosystem. Packagist hosts tens of thousands of packages, from authentication and payments to admin panels and PDF generation. Good engineers do not write everything themselves, but they evaluate a package before trusting it with production data.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `composer require laravel/sanctum\ncomposer require --dev laravel/pint phpstan/phpstan\n\ncomposer install --no-dev --optimize-autoloader\ncomposer outdated --direct\ncomposer audit` },
        { type: 'list', items: [
          'Read the version constraint: ^11.0 allows 11.x but not 12.x',
          'Commit composer.lock for applications so every environment installs the same versions',
          'Check maintenance: recent releases, supported Laravel versions, open issues, tests',
          'Package discovery registers service providers automatically',
          'Prefer a maintained package over a fork you must maintain forever',
        ] },
        { type: 'note', value: 'Every dependency is code you ship and must patch. Fewer, better packages beat a huge composer.json.' },
      ],
    },
    {
      id: 'laravel-packages-livewire',
      title: 'Livewire',
      blocks: [
        { type: 'text', value: 'Livewire builds dynamic interfaces with PHP and Blade instead of a separate JavaScript framework. A component is a PHP class plus a Blade view; interactions call methods on the server and Livewire updates the DOM. It is ideal for forms, tables, dashboards and admin screens where server-rendered HTML is enough.' },
        { type: 'code', lang: 'php', tryIt: false, value: `<?php\n\nnamespace App\\Livewire;\n\nuse App\\Models\\Course;\nuse Livewire\\Attributes\\Validate;\nuse Livewire\\Component;\n\nclass CourseSearch extends Component\n{\n    #[Validate('nullable|string|max:100')]\n    public string $term = '';\n\n    public function render()\n    {\n        return view('livewire.course-search', [\n            'courses' => Course::query()\n                ->where('title', 'like', '%' . $this->term . '%')\n                ->orderBy('title')\n                ->limit(20)\n                ->get(),\n        ]);\n    }\n}` },
        { type: 'code', lang: 'html', tryIt: false, value: `<div>\n    <input type="search" wire:model.live.debounce.300ms="term" placeholder="Search courses">\n\n    <p wire:loading>Searching...</p>\n\n    <ul>\n        @foreach ($courses as $course)\n            <li wire:key="course-{{ $course->id }}">{{ $course->title }}</li>\n        @endforeach\n    </ul>\n</div>` },
        { type: 'note', value: 'Livewire sends state to the browser and back, so treat every public property as user input. Never put secrets in public properties.' },
      ],
    },
    {
      id: 'laravel-packages-inertia',
      title: 'Inertia.js',
      blocks: [
        { type: 'text', value: 'Inertia lets you build a single-page application without writing a separate API. Controllers return Inertia responses with props, and a Vue, React or Svelte page renders them. Routing, authentication and validation still live in Laravel.' },
        { type: 'code', lang: 'php', tryIt: false, value: `<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Course;\nuse Inertia\\Inertia;\nuse Inertia\\Response;\n\nclass CourseController extends Controller\n{\n    public function index(): Response\n    {\n        return Inertia::render('Courses/Index', [\n            'courses' => Course::query()\n                ->withCount('lessons')\n                ->orderBy('title')\n                ->paginate(20),\n            'filters' => request()->only('search'),\n        ]);\n    }\n}` },
        { type: 'code', lang: 'js', tryIt: false, value: `import { useForm } from '@inertiajs/vue3';\n\nconst form = useForm({\n  title: '',\n  description: '',\n});\n\nfunction submit() {\n  form.post('/courses', {\n    onSuccess: () => form.reset(),\n  });\n}` },
        { type: 'note', value: 'Inertia is not an API. Do not build a parallel JSON API unless mobile clients or third parties need it.' },
      ],
    },
    {
      id: 'laravel-packages-tools',
      title: 'Admin panels and visibility',
      blocks: [
        { type: 'text', value: 'Filament is an open-source Livewire-based framework for admin panels, forms, tables and dashboards. Nova is the first-party commercial admin tool. Horizon monitors Redis queues, Telescope records debugging detail, and Pulse shows production metrics.' },
        { type: 'code', lang: 'php', tryIt: false, value: `<?php\n\nnamespace App\\Filament\\Resources;\n\nuse App\\Models\\Course;\nuse Filament\\Forms;\nuse Filament\\Resources\\Resource;\nuse Filament\\Tables;\n\nclass CourseResource extends Resource\n{\n    protected static ?string $model = Course::class;\n\n    public static function form(Forms\\Form $form): Forms\\Form\n    {\n        return $form->schema([\n            Forms\\Components\\TextInput::make('title')->required()->maxLength(150),\n            Forms\\Components\\Textarea::make('description')->columnSpanFull(),\n            Forms\\Components\\Toggle::make('is_published'),\n        ]);\n    }\n\n    public static function table(Tables\\Table $table): Tables\\Table\n    {\n        return $table->columns([\n            Tables\\Columns\\TextColumn::make('title')->searchable()->sortable(),\n            Tables\\Columns\\IconColumn::make('is_published')->boolean(),\n        ]);\n    }\n}` },
        { type: 'code', lang: 'bash', tryIt: false, value: `composer require laravel/horizon\nphp artisan horizon:install\nphp artisan horizon\n\nphp artisan telescope:install\nphp artisan telescope:prune --hours=48` },
        { type: 'list', items: [
          'Filament: free and open source with a large plugin ecosystem',
          'Nova: commercial, first-party and mature',
          'Horizon: production queue monitoring for Redis',
          'Telescope: local and staging debugging only, gated and pruned',
          'Pulse: lightweight production metrics',
        ] },
        { type: 'note', value: 'Telescope stores request payloads. Never expose it publicly in production. Gate it and shorten retention.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'packages-ecosystem',
      q: 'What does composer.lock guarantee?',
      options: ['The newest versions', 'Exact tested dependency versions', 'No dev packages', 'Faster autoloading'],
      answer: 1,
      explain: 'composer install uses the lock file for identical versions.',
    },
    {
      chapterId: 'packages-ecosystem',
      q: 'Which package builds interactive UI with PHP and Blade?',
      options: ['Inertia', 'Livewire', 'Sanctum', 'Pennant'],
      answer: 1,
      explain: 'Livewire components are PHP classes rendered by Blade.',
    },
    {
      chapterId: 'packages-ecosystem',
      q: 'What is Inertia primarily used for?',
      options: ['Database migrations', 'SPA pages without a separate API', 'Queue monitoring', 'Payment billing'],
      answer: 1,
      explain: 'It connects controllers to Vue, React or Svelte pages.',
    },
    {
      chapterId: 'packages-ecosystem',
      q: 'Which tool is the production queue dashboard?',
      options: ['Telescope', 'Horizon', 'Pint', 'Scout'],
      answer: 1,
      explain: 'Horizon monitors and balances Redis queues.',
    },
    {
      chapterId: 'packages-ecosystem',
      q: 'Why restrict Telescope in production?',
      options: ['It disables caching', 'It stores and can expose request data', 'It blocks queues', 'It changes routes'],
      answer: 1,
      explain: 'It records payloads and queries, so access must be gated.',
    },
    {
      chapterId: 'packages-ecosystem',
      q: 'What handles OAuth social login in Laravel?',
      options: ['Cashier', 'Socialite', 'Pennant', 'Nova'],
      answer: 1,
      explain: 'Socialite provides OAuth drivers such as GitHub and Google.',
    },
  ],
};
