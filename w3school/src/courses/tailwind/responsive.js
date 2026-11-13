// Tailwind chapter: Responsive Design.

export default {
  id: 'responsive',
  title: 'Responsive Design',
  description: 'Mobile-first breakpoints and container behavior',
  icon: 'devices',
  lessons: [
    {
      id: 'tw-breakpoints',
      title: 'Breakpoints',
      blocks: [
        { type: 'text', value: 'Tailwind is mobile-first: a base class applies everywhere, and sm:, md:, lg: apply from that width upward. Start with the mobile layout, then add columns.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="p-4">One</div>
  <div class="p-4">Two</div>
  <div class="p-4">Three</div>
</div>` },
        { type: 'note', value: 'A class without a prefix applies at every size. Adding md: overrides only from md upward.' },
      ],
    },
    {
      id: 'tw-containers',
      title: 'Containers and max width',
      blocks: [
        { type: 'text', value: 'Tailwind has no container component. Use mx-auto max-w-6xl px-4 on a wrapper to center content with a max width and safe padding.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<main class="mx-auto max-w-6xl px-4 py-8">
  <h1 class="text-2xl font-bold">Dashboard</h1>
</main>` },
        { type: 'list', items: [
          'mx-auto centers the block',
          'max-w-* caps the width',
          'px-4 prevents edge-to-edge text on mobile',
          'py-8 gives vertical breathing room',
        ] },
      ],
    },
    {
      id: 'tw-show-hide',
      title: 'Show and hide',
      blocks: [
        { type: 'text', value: 'hidden and block combine with breakpoints: hidden md:flex shows a desktop nav only. Do not hide essential actions on small screens.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<nav class="hidden items-center gap-6 md:flex">
  <a href="/">Home</a>
  <a href="/courses">Courses</a>
</nav>

<button class="md:hidden rounded-lg border px-3 py-2">Menu</button>` },
        { type: 'note', value: 'Test at 360px, 768px and 1280px. A layout that works at two sizes often breaks at the third.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'responsive',
      q: 'How does Tailwind apply breakpoints?',
      options: ['Desktop-first', 'Mobile-first, upward', 'Randomly', 'Only on hover'],
      answer: 1,
      explain: 'Base styles apply, then larger breakpoints.',
    },
    {
      chapterId: 'responsive',
      q: 'What does md:grid-cols-2 do?',
      options: ['Always two columns', 'Two columns from md upward', 'Two rows', 'Hides on md'],
      answer: 1,
      explain: 'The variant applies from md.',
    },
    {
      chapterId: 'responsive',
      q: 'How do you center a container?',
      options: ['mx-auto with max-w-*', 'text-center', 'items-center', 'justify-center'],
      answer: 0,
      explain: 'Auto margins center a block with a max width.',
    },
    {
      chapterId: 'responsive',
      q: 'Why test three widths?',
      options: ['For fun', 'Layouts break at intermediate sizes', 'It is required', 'To load faster'],
      answer: 1,
      explain: 'Intermediate widths reveal bugs.',
    },
  ],
};
