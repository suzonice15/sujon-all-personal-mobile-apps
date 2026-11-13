// Tailwind chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Tailwind is, setup and the first classes',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'tw-what-is',
      title: 'What is Tailwind?',
      blocks: [
        { type: 'text', value: 'Tailwind is a utility-first CSS framework. Instead of prebuilt components, it gives small classes such as flex, p-4 and text-slate-700 that you compose directly in the markup.' },
        { type: 'list', items: [
          'Utility classes instead of component classes',
          'Design tokens in a config file',
          'No unused CSS in the build',
          'Easy responsive and dark variants',
          'You build your own components',
        ] },
        { type: 'note', value: 'Tailwind is not “no design”. It moves design decisions into reusable components and tokens, not into a stylesheet of one-off classes.' },
      ],
    },
    {
      id: 'tw-setup',
      title: 'Setup',
      blocks: [
        { type: 'text', value: 'Install Tailwind with your build tool and point it at your template files. The content paths decide which classes are kept. Add the directives to your CSS.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npm install -D tailwindcss
npx tailwindcss init` },
        { type: 'code', lang: 'css', tryIt: false, value: `@tailwind base;
@tailwind components;
@tailwind utilities;` },
        { type: 'note', value: 'If a class is generated dynamically, such as `text-${color}-500`, Tailwind cannot see it. Use a complete class or a safelist.' },
      ],
    },
    {
      id: 'tw-first',
      title: 'Your first component',
      blocks: [
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
  <h3 class="text-lg font-bold text-slate-900">HTML</h3>
  <p class="mt-1 text-sm text-slate-500">The structure of every page.</p>
  <button class="mt-3 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white">
    Start
  </button>
</div>` },
        { type: 'note', value: 'Read the classes as a design: spacing, border, radius, colour and type. That is the whole idea.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is Tailwind?',
      options: ['A JavaScript framework', 'A utility-first CSS framework', 'A database', 'A test runner'],
      answer: 1,
      explain: 'It provides small utility classes.',
    },
    {
      chapterId: 'getting-started',
      q: 'What do content paths control?',
      options: ['Colours', 'Which classes are kept in the build', 'Routing', 'Fonts'],
      answer: 1,
      explain: 'Tailwind scans them for used classes.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why do dynamic class names fail?',
      options: ['They are too long', 'Tailwind cannot detect them at build time', 'They need jQuery', 'They are invalid CSS'],
      answer: 1,
      explain: 'Use complete classes or a safelist.',
    },
    {
      chapterId: 'getting-started',
      q: 'Does Tailwind ship components?',
      options: ['Yes, many', 'No, you build your own', 'Only buttons', 'Only forms'],
      answer: 1,
      explain: 'It is utility-first, not a component kit.',
    },
  ],
};
