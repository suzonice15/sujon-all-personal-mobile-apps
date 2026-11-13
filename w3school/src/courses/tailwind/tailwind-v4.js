// Tailwind chapter: Tailwind v4.

export default {
  id: 'tailwind-v4',
  title: 'Tailwind v4',
  description: 'CSS-first config, new engine and migration',
  icon: 'bolt',
  lessons: [
    {
      id: 'tw-v4-changes',
      title: 'What changed in v4',
      blocks: [
        { type: 'text', value: 'Tailwind v4 moves configuration into CSS. A single import pulls in the framework, @theme defines design tokens, and content is detected automatically. The new engine is much faster on large projects.' },
        { type: 'code', lang: 'css', tryIt: false, value: `@import "tailwindcss";\n\n@theme {\n  --color-brand: #0f766e;\n  --font-sans: Inter, system-ui, sans-serif;\n  --radius-card: 1rem;\n}` },
        { type: 'list', items: [
          'CSS-first configuration with @theme',
          'Automatic content detection',
          'No tailwind.config.js required',
          'Native cascade layers',
          'Faster incremental builds',
        ] },
        { type: 'note', value: 'v4 needs a modern browser baseline. If you support very old browsers, stay on v3 or check the compatibility notes.' },
      ],
    },
    {
      id: 'tw-v4-theme',
      title: 'Theme and custom utilities',
      blocks: [
        { type: 'text', value: 'Tokens declared in @theme become utilities. A custom utility is written with @utility, and @source tells Tailwind about templates it cannot detect.' },
        { type: 'code', lang: 'css', tryIt: false, value: `@import "tailwindcss";\n\n@theme {\n  --color-surface: #ffffff;\n  --color-content: #0f172a;\n  --breakpoint-3xl: 120rem;\n}\n\n@utility card {\n  background: var(--color-surface);\n  color: var(--color-content);\n  border-radius: var(--radius-card);\n  padding: 1.25rem;\n}\n\n@source "../templates/**/*.html";` },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="card">\n  <h3 class="text-lg font-bold">Courses</h3>\n  <p class="text-sm opacity-70">Tokens become normal utilities.</p>\n</div>` },
        { type: 'note', value: 'Prefer tokens over arbitrary values. A token gives one place to change the design.' },
      ],
    },
    {
      id: 'tw-v4-migration',
      title: 'Migration and performance',
      blocks: [
        { type: 'text', value: 'The upgrade tool rewrites most imports and config. After that, check custom plugins, safelists and any JavaScript config you still need.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npm install tailwindcss @tailwindcss/cli\nnpx @tailwindcss/upgrade\n\n# Build and measure\nnpx @tailwindcss/cli -i src/app.css -o dist/app.css --minify` },
        { type: 'list', items: [
          'Replace the old directives with one import',
          'Move theme values into @theme',
          'Convert custom plugins or keep @config',
          'Re-check dark mode strategy',
          'Measure the CSS output before and after',
        ] },
        { type: 'note', value: 'A migration is a good time to delete unused tokens. Smaller tokens mean a smaller CSS file.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'tailwind-v4',
      q: 'Where does v4 configuration live?',
      options: ['A JSON file', 'In CSS with @theme', 'In package.json', 'In HTML'],
      answer: 1,
      explain: 'v4 uses CSS-first config.',
    },
    {
      chapterId: 'tailwind-v4',
      q: 'What becomes a utility from a @theme token?',
      options: ['Only colours', 'Tokens such as colours and fonts', 'Only spacing', 'Nothing'],
      answer: 1,
      explain: 'Theme tokens generate utilities.',
    },
    {
      chapterId: 'tailwind-v4',
      q: 'What is @utility for?',
      options: ['Importing files', 'Defining a custom utility class', 'A plugin store', 'A breakpoint'],
      answer: 1,
      explain: 'It declares a custom utility.',
    },
    {
      chapterId: 'tailwind-v4',
      q: 'What does the upgrade tool do?',
      options: ['Nothing', 'Rewrites imports and config for v4', 'Deletes CSS', 'Minifies images'],
      answer: 1,
      explain: 'It automates most of the migration.',
    },
  ],
};
