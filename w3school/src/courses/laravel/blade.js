// Laravel chapter: Blade Templates. Lessons plus this chapter's quiz questions.

export default {
  id: 'blade',
  title: 'Blade Templates',
  description: 'Build layouts, components and safe views with Blade',
  icon: 'web',
  lessons: [
    {
      id: 'laravel-blade-syntax',
      title: 'Blade Syntax and Escaping',
      blocks: [
        { type: 'text', value: 'Blade is the template engine that ships with Laravel. A Blade file is HTML with a small set of tags: double braces print escaped values, directives start with an at sign, and comments use double-brace dash blocks. Blade compiles to plain PHP and caches the result.' },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/posts/show.blade.php --}}
<h1>{{ $post->title }}</h1>

<p>{{ $post->body }}</p>

{{-- This prints raw HTML. Only use it on trusted, sanitised content. --}}
<div class="content">{!! $post->renderedHtml !!}</div>

{{-- A Blade comment is not sent to the browser. --}}
@php
    $published = $post->published_at?->isPast();
@endphp

@if ($published)
    <p>Published {{ $post->published_at->diffForHumans() }}</p>
@endif` },
        { type: 'list', items: [
          '{{ }} escapes HTML entities, so a title containing a script tag is displayed as text, not executed.',
          '{!! !!} prints raw output and is the main source of XSS in Blade apps. Avoid it for user input.',
          'Blade comments are removed at compile time; HTML comments remain visible in the page source.',
          'Use @php blocks sparingly. Heavy logic belongs in the controller, a view model or a component class.',
          'Compiled views live in storage/framework/views; run php artisan view:clear if a stale view confuses you.',
        ] },
        { type: 'note', value: 'If a symbol such as @ appears in text and Blade tries to parse it as a directive, prefix it with an at sign or wrap the block in @verbatim. For example, an email address or a JavaScript decorator.' },
      ],
    },
    {
      id: 'laravel-blade-layouts',
      title: 'Layouts, Sections and Yields',
      blocks: [
        { type: 'text', value: 'Most pages share a header, navigation and footer. Blade layouts let a child view fill named sections of a parent. This avoids copying markup and keeps a change to the navigation in one file.' },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
  <title>@yield('title', config('app.name'))</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  @stack('styles')
</head>
<body>
  <header>@include('partials.nav')</header>

  <main>
    @yield('content')
  </main>

  <footer>@include('partials.footer')</footer>
  @stack('scripts')
</body>
</html>` },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')

@section('title', 'All posts')

@section('content')
  <h1>Posts</h1>

  @foreach ($posts as $post)
    <article>
      <a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a>
    </article>
  @endforeach

  {{ $posts->links() }}
@endsection

@push('scripts')
  <script src="{{ asset('js/posts.js') }}" defer></script>
@endpush` },
        { type: 'list', items: [
          '@extends must be the first directive in a child view.',
          '@section defines content; @yield prints it in the layout; @show prints and keeps it available.',
          '@parent appends or prepends the parent section content when a child extends an existing section.',
          '@push adds to a stack, and @stack renders everything pushed there, useful for per-page CSS and scripts.',
          'Modern Laravel also supports component-based layouts, which many teams now prefer over @extends.',
        ] },
        { type: 'note', value: 'Keep section names consistent across a project. A typo in @section silently produces an empty area because the layout yields a different name.' },
      ],
    },
    {
      id: 'laravel-blade-control',
      title: 'Conditionals and Loops',
      blocks: [
        { type: 'text', value: 'Blade provides readable directives for conditions and loops. They compile to PHP, so the same rules apply, but the templates stay close to HTML and avoid brace noise.' },
        { type: 'code', lang: 'html', value: String.raw`@if ($posts->isEmpty())
  <p>No posts yet.</p>
@elseif ($posts->count() === 1)
  <p>One post.</p>
@else
  <p>{{ $posts->count() }} posts.</p>
@endif

@unless ($user->isAdmin())
  <p>Read-only access.</p>
@endunless

@isset($post)
  <p>{{ $post->title }}</p>
@endisset

@forelse ($posts as $post)
  <article>
    <h2>{{ $loop->iteration }}. {{ $post->title }}</h2>
    @if ($loop->first)
      <span>Newest</span>
    @endif
  </article>
@empty
  <p>Nothing to show.</p>
@endforelse` },
        { type: 'list', items: [
          '@forelse is a foreach with a built-in empty state; it handles the common list case cleanly.',
          'Inside a loop, $loop exposes index (zero-based), iteration (one-based), first, last, count, remaining and depth.',
          '@auth and @guest check authentication; @can and @cannot check policies and abilities.',
          '@switch, @case and @break are available, but match expressions in a controller are often clearer.',
          'Use @continue and @break inside loops instead of writing nested conditions.',
        ] },
        { type: 'note', value: 'Do not perform queries inside loops in a Blade template. Load the data with eager loading in the controller; a view that queries the database is slow and hard to test.' },
      ],
    },
    {
      id: 'laravel-blade-components',
      title: 'Components, Slots and Attributes',
      blocks: [
        { type: 'text', value: 'Components are reusable pieces of UI with a clear interface: props go in, a slot goes between the tags, and extra HTML attributes are forwarded. Laravel supports class-based components and simpler anonymous components.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan make:component Alert
php artisan make:component Alert --view` },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/components/alert.blade.php --}}
@props(['type' => 'info', 'dismissible' => false])

@php
    $classes = [
        'info' => 'bg-blue-50 text-blue-800',
        'success' => 'bg-green-50 text-green-800',
        'error' => 'bg-red-50 text-red-800',
    ][$type] ?? 'bg-gray-50 text-gray-800';
@endphp

<div {{ $attributes->merge(['class' => 'rounded p-4 '.$classes]) }}>
  {{ $slot }}

  @if ($dismissible)
    <button type="button" aria-label="Close">Close</button>
  @endif
</div>` },
        { type: 'code', lang: 'html', value: String.raw`{{-- Using the component --}}
<x-alert type="error" dismissible class="mb-4">
  <strong>Payment failed.</strong> Please try again.
</x-alert>

{{-- Named slots --}}
<x-card>
  <x-slot:title>Order summary</x-slot:title>
  <p>Three items</p>
</x-card>` },
        { type: 'list', items: [
          '@props declares the public interface of an anonymous component and gives defaults.',
          '$slot holds the default content; named slots are accessible as variables such as $title.',
          '$attributes forwards id, class and other HTML attributes; merge() combines them with defaults.',
          'Class-based components in app/View/Components can accept dependencies and expose methods.',
          'Component names use kebab-case in markup: Alert becomes x-alert, UserCard becomes x-user-card.',
        ] },
        { type: 'note', value: 'Do not spread $attributes blindly onto a tag that already has the same attribute. Use merge() so the caller can override classes without producing duplicate attributes.' },
      ],
    },
    {
      id: 'laravel-blade-includes',
      title: 'Includes, Stacks and Subviews',
      blocks: [
        { type: 'text', value: 'Not every reusable fragment needs a component. Includes are simple partials that share the parent variables. Stacks collect assets from anywhere in the render tree so the layout can print them once.' },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/partials/nav.blade.php --}}
<nav>
  <a href="{{ route('home') }}">Home</a>
  <a href="{{ route('posts.index') }}">Posts</a>
</nav>

{{-- Passing extra data to an include --}}
@include('partials.avatar', ['user' => $post->author, 'size' => 48])

{{-- Conditional includes --}}
@includeIf('partials.banner')
@includeWhen($user->isAdmin(), 'partials.admin-tools')
@includeFirst(['partials.custom-footer', 'partials.footer'])

{{-- Rendering one partial for each item --}}
@each('partials.post', $posts, 'post', 'partials.empty')` },
        { type: 'code', lang: 'html', value: String.raw`@once
  <script>
    window.analyticsLoaded = true;
  </script>
@endonce

@push('scripts')
  <script src="{{ asset('js/charts.js') }}" defer></script>
@endpush

@if ($showCharts)
  @push('scripts')
    <script src="{{ asset('js/reports.js') }}" defer></script>
  @endpush
@endif` },
        { type: 'list', items: [
          'Includes inherit all variables from the parent view, which is convenient but can hide dependencies.',
          '@includeIf checks that the view exists; @includeWhen and @includeUnless add a condition.',
          '@each renders a partial for every item and optionally a fallback view when the list is empty.',
          '@once ensures a block is rendered only the first time it is encountered, useful for duplicate scripts.',
          'Stacks can be pushed from components and includes at any depth; the layout renders them with @stack.',
        ] },
        { type: 'note', value: 'Prefer components for UI with a defined interface and includes for static fragments. If a partial needs five variables, it is probably a component in disguise.' },
      ],
    },
    {
      id: 'laravel-blade-safety',
      title: 'Security and Performance in Blade',
      blocks: [
        { type: 'text', value: 'Blade is safe by default, but a few habits matter in real projects. Escaping, CSRF protection, careful raw output and sensible view structure prevent most template-level vulnerabilities.' },
        { type: 'list', items: [
          'Keep {{ }} for user data. Use {!! !!} only for HTML you generated and sanitised yourself.',
          'Add @csrf inside every state-changing form; use @method for PUT, PATCH and DELETE.',
          'Escape values placed in attributes with {{ }} too, not only in text nodes.',
          'When embedding JSON in a script tag, use the @js directive or Js::from() so quotes and closing tags are handled safely.',
          'Never interpolate request data directly into inline JavaScript.',
          'Eager load relationships in the controller to avoid N+1 queries inside loops.',
          'Cache expensive page fragments with @cache where appropriate, and clear the cache when data changes.',
          'Run php artisan view:cache during deployment to precompile templates.',
        ] },
        { type: 'code', lang: 'html', value: String.raw`<form method="POST" action="{{ route('posts.store') }}">
  @csrf

  <label for="title">Title</label>
  <input id="title" name="title" value="{{ old('title') }}" required>

  @error('title')
    <p class="text-red-600">{{ $message }}</p>
  @enderror

  <button type="submit">Save</button>
</form>

{{-- Safe JSON for JavaScript --}}
<script>
  const chartData = @js($chartData);
</script>` },
        { type: 'note', value: 'If you must render rich HTML from users, sanitise it on the server with a maintained library before storing it, and still treat it as untrusted. Escaping is the default; bypassing it should be a deliberate, reviewed decision.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'blade', q: 'What does {{ $name }} do?', options: ['Prints raw HTML', 'Prints the value escaped for HTML', 'Assigns a variable', 'Creates a comment'], answer: 1, explain: 'Double braces escape special characters, preventing injected markup from running.' },
    { chapterId: 'blade', q: 'Which directive starts a child view that fills a layout?', options: ['@layout', '@extends', '@include', '@yield'], answer: 1, explain: '@extends names the parent layout; sections then supply its content.' },
    { chapterId: 'blade', q: 'What is @forelse used for?', options: ['A for loop with a counter', 'A foreach with an empty state', 'A while loop', 'A switch statement'], answer: 1, explain: 'It renders the @empty block when the collection has no items.' },
    { chapterId: 'blade', q: 'Which variable is available inside a Blade loop?', options: ['$index', '$loop', '$iteration', '$cycle'], answer: 1, explain: '$loop exposes index, iteration, first, last, count, remaining and depth.' },
    { chapterId: 'blade', q: 'What does @props do in an anonymous component?', options: ['Loads CSS', 'Declares the component props and defaults', 'Pushes a script', 'Includes a partial'], answer: 1, explain: 'It defines the variables the component accepts and their default values.' },
    { chapterId: 'blade', q: 'Why is {!! $value !!} dangerous?', options: ['It is slower', 'It outputs unescaped HTML and can enable XSS', 'It breaks loops', 'It disables caching'], answer: 1, explain: 'Raw output bypasses escaping, so untrusted input can inject scripts or markup.' },
    { chapterId: 'blade', q: 'What is the safest way to embed data for JavaScript in Blade?', options: ['{!! json_encode($data) !!}', 'Echo it inside a quoted string', 'Use the @js directive', 'Use @php echo'], answer: 2, explain: 'The @js directive escapes the JSON so it is safe inside a script context.' },
  ],
};
