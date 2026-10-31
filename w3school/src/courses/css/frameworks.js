// CSS chapter: Sass, Tailwind and Bootstrap. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'frameworks',
  title: 'Sass, Tailwind and Bootstrap',
  description: 'The tools most CSS jobs ask for',
  icon: 'construction',
  lessons: [
    {
      id: 'css-sass',
      title: 'Sass (SCSS)',
      blocks: [
        { type: 'text', value: 'Sass is a CSS preprocessor: you write .scss files with extra features, and a build step turns them into normal CSS. Native CSS has caught up on variables and nesting, but Sass mixins, functions, loops and partials are still widely used in existing projects.' },
        { type: 'code', lang: 'text', value: `npm install -D sass        # Vite compiles .scss files automatically` },
        { type: 'code', lang: 'css', value: `// _variables.scss (a partial: imported, not compiled alone)
$brand: #2965f1;
$radius: 10px;
$breakpoints: (sm: 600px, lg: 1024px);

// _mixins.scss
@mixin respond($size) {
  @media (min-width: map-get($breakpoints, $size)) { @content; }
}
@mixin button-variant($bg) {
  background: $bg;
  &:hover { background: darken($bg, 8%); }
}

// main.scss
@use 'variables' as *;
@use 'mixins' as *;

.card {
  border-radius: $radius;
  padding: 12px;

  &__title { font-weight: 700; }      // BEM with nesting → .card__title
  &--featured { border: 2px solid $brand; }

  @include respond(lg) { padding: 24px; }
}

.btn-primary { @include button-variant($brand); }

@each $name, $color in (success: #16a34a, danger: #dc2626) {
  .text-#{$name} { color: $color; }    // generates .text-success and .text-danger
}` },
        { type: 'list', items: [
          '$variables are replaced at build time (CSS custom properties work at runtime).',
          '@mixin / @include: reusable groups of declarations with parameters.',
          '@use loads other files with a namespace; partial file names start with _.',
          '@each and @for generate many classes from lists.',
        ] },
      ],
    },
    {
      id: 'css-tailwind',
      title: 'Tailwind CSS',
      blocks: [
        { type: 'text', value: 'Tailwind is a utility-first framework: instead of writing CSS, you combine small classes directly in HTML. It is the most popular way to style new React, Vue and Next.js projects.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<script src="https://cdn.tailwindcss.com/3.4.16"></script>

<div class="max-w-sm mx-auto p-4">
  <div class="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200">
    <div class="flex items-center gap-3">
      <img class="h-12 w-12 rounded-full" src="https://picsum.photos/id/64/96/96" alt="">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Nadia Rahman</h2>
        <p class="text-sm text-slate-500">Frontend developer</p>
      </div>
      <span class="ml-auto rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-800">PRO</span>
    </div>
    <p class="mt-4 text-slate-600 leading-relaxed">Learning CSS frameworks on CodeNest.</p>
    <button class="mt-4 w-full rounded-xl bg-teal-600 py-2.5 font-semibold text-white active:scale-95 transition md:w-auto md:px-6">
      Follow
    </button>
  </div>
</div>` },
        { type: 'list', items: [
          'p-4 / mt-4 / gap-3: spacing on a consistent scale',
          'text-lg, font-bold, text-slate-500: typography and colors',
          'flex, items-center, grid grid-cols-3: layout',
          'md:w-auto: responsive prefix, applies from the md breakpoint up',
          'hover:, active:, focus:, dark: : state and theme variants',
        ] },
        { type: 'note', value: 'The CDN script is only for learning and prototypes. Real projects install Tailwind with npm so unused classes are removed and the CSS file stays tiny.' },
      ],
    },
    {
      id: 'css-bootstrap',
      title: 'Bootstrap',
      blocks: [
        { type: 'text', value: 'Bootstrap is the most widely used component framework: ready-made, responsive components (navbars, cards, modals, forms) and a 12-column grid. It is common in company dashboards, admin panels and older projects.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container py-3">
  <div class="row g-3">
    <div class="col-12 col-md-6">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">HTML Course</h5>
          <p class="card-text text-muted">52 lessons from zero to expert.</p>
          <a href="#" class="btn btn-primary">Start</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="card h-100 border-success">
        <div class="card-body">
          <h5 class="card-title">CSS Course <span class="badge text-bg-success">New</span></h5>
          <p class="card-text text-muted">Including Sass, Tailwind and Bootstrap.</p>
          <a href="#" class="btn btn-outline-success">Start</a>
        </div>
      </div>
    </div>
  </div>
  <div class="alert alert-info mt-3 mb-0">Resize: cards stack on phones and sit side by side on tablets.</div>
</div>` },
        { type: 'heading', value: 'Tailwind or Bootstrap?' },
        { type: 'list', items: [
          'Bootstrap: fastest way to a consistent standard look; many sites look alike.',
          'Tailwind: full design freedom with no custom CSS; more classes in the markup.',
          'Learn the CSS underneath first (this course). Then either framework takes days, not months.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'frameworks', q: 'What is Sass?', options: ['A JavaScript library', 'A CSS preprocessor compiled to normal CSS', 'A browser', 'A font'], answer: 1, explain: '.scss files are compiled at build time.' },
    { chapterId: 'frameworks', q: 'In Sass, what does @include do?', options: ['Imports a font', 'Inserts the declarations of a mixin', 'Loads JavaScript', 'Creates a variable'], answer: 1, explain: '@mixin defines, @include uses.' },
    { chapterId: 'frameworks', q: 'What does md:w-auto mean in Tailwind?', options: ['Medium width always', 'w-auto applies from the md breakpoint and up', 'A margin', 'A media query for print'], answer: 1, explain: 'Tailwind is mobile-first; prefixes apply upward.' },
    { chapterId: 'frameworks', q: 'How many columns does the Bootstrap grid have?', options: ['10', '12', '16', '24'], answer: 1, explain: 'col-6 is half width, col-4 a third.' },
  ],
};
