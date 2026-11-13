// Tailwind chapter: Layout, Flex and Grid.

export default {
  id: 'layout-flex-grid',
  title: 'Layout & Flexbox',
  description: 'Flex, grid, gap and alignment',
  icon: 'view-quilt',
  lessons: [
    {
      id: 'tw-flex',
      title: 'Flexbox',
      blocks: [
        { type: 'text', value: 'flex creates a flex container. items-center aligns vertically, justify-between spreads horizontally, and gap controls the space between children.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="flex items-center justify-between gap-4 rounded-xl border p-4">
  <div>
    <h3 class="font-bold text-slate-900">SQL</h3>
    <p class="text-sm text-slate-500">12 lessons</p>
  </div>
  <button class="rounded-lg bg-teal-700 px-4 py-2 text-white">Start</button>
</div>` },
        { type: 'note', value: 'Use gap instead of margins between flex children. It removes the last-child margin problem.' },
      ],
    },
    {
      id: 'tw-grid',
      title: 'Grid',
      blocks: [
        { type: 'text', value: 'grid with grid-cols-* builds columns. gap sets both row and column gaps. Use grid-cols-2 md:grid-cols-3 for a responsive card grid.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-xl border p-4">Card 1</div>
  <div class="rounded-xl border p-4">Card 2</div>
  <div class="rounded-xl border p-4">Card 3</div>
</div>` },
        { type: 'note', value: 'Grid is better for two-dimensional layouts. Flex is better for a single row or column.' },
      ],
    },
    {
      id: 'tw-position',
      title: 'Position and overflow',
      blocks: [
        { type: 'list', items: [
          'relative and absolute for badges and menus',
          'fixed for a sticky header or floating button',
          'sticky for a table header',
          'overflow-hidden to clip rounded corners',
          'inset-0 to fill a positioned parent',
        ] },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="relative rounded-xl border p-4">
  <span class="absolute right-2 top-2 rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-800">
    New
  </span>
  <h3 class="font-bold">GraphQL</h3>
</div>` },
        { type: 'note', value: 'An absolute child needs a relative parent. A missing relative is the most common positioning bug.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'layout-flex-grid',
      q: 'What does items-center do in flex?',
      options: ['Centres horizontally', 'Aligns items on the cross axis', 'Adds gap', 'Wraps items'],
      answer: 1,
      explain: 'It aligns on the cross axis.',
    },
    {
      chapterId: 'layout-flex-grid',
      q: 'Why use gap instead of margins?',
      options: ['It is shorter', 'It avoids the last-child margin problem', 'It is required', 'It adds a border'],
      answer: 1,
      explain: 'Gap handles spacing cleanly.',
    },
    {
      chapterId: 'layout-flex-grid',
      q: 'When is grid better than flex?',
      options: ['For one row', 'For two-dimensional layouts', 'For text only', 'Never'],
      answer: 1,
      explain: 'Grid handles rows and columns.',
    },
    {
      chapterId: 'layout-flex-grid',
      q: 'What does absolute need?',
      options: ['A relative parent', 'A grid parent', 'A flex parent', 'A fixed width'],
      answer: 0,
      explain: 'It positions against the nearest positioned ancestor.',
    },
  ],
};
