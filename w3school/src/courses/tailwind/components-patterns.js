// Tailwind chapter: Component Patterns.

export default {
  id: 'components-patterns',
  title: 'Component Patterns',
  description: 'Extracting components without losing consistency',
  icon: 'widgets',
  lessons: [
    {
      id: 'tw-extract',
      title: 'Extracting components',
      blocks: [
        { type: 'text', value: 'Utility classes repeat in markup. Extract a Button or Card component in your framework (React, Vue, Blade) instead of inventing CSS classes. The component owns the variants.' },
        { type: 'code', lang: 'js', tryIt: false, value: `function Button({ variant = 'primary', children }) {
  const styles = variant === 'primary'
    ? 'bg-teal-700 text-white hover:bg-teal-800'
    : 'border border-slate-300 text-slate-700 hover:bg-slate-50';

  return (
    <button className={\`rounded-lg px-4 py-2 font-semibold \${styles}\`}>
      {children}
    </button>
  );
}` },
        { type: 'note', value: 'Use a helper such as clsx to combine classes conditionally. String concatenation breaks when a value is undefined.' },
      ],
    },
    {
      id: 'tw-cards',
      title: 'Cards and lists',
      blocks: [
        { type: 'code', lang: 'html', tryIt: false, value: `<article class="group rounded-2xl border border-slate-200 bg-white p-5
  transition hover:-translate-y-0.5 hover:shadow-md">
  <span class="rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700">
    Beginner
  </span>
  <h3 class="mt-3 text-lg font-bold text-slate-900">HTML</h3>
  <p class="mt-1 text-sm text-slate-500">Build the structure of a page.</p>
</article>` },
        { type: 'list', items: [
          'Consistent padding and radius across cards',
          'One hover effect, not three',
          'Keep the text hierarchy: title, subtitle, meta',
          'Use a group for hover on children',
        ] },
      ],
    },
    {
      id: 'tw-forms',
      title: 'Forms',
      blocks: [
        { type: 'code', lang: 'html', tryIt: false, value: `<label class="block text-sm font-medium text-slate-700" for="title">
  Title
</label>
<input id="title" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2
  text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2
  focus:ring-teal-500/30" />

<p class="mt-1 text-sm text-red-600">Title is required.</p>` },
        { type: 'note', value: 'Style focus and error states on every input. A form that only looks good when empty is half-built.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'components-patterns',
      q: 'How should you reuse Tailwind styles?',
      options: ['Copy the class list', 'Extract a component with variants', 'Use inline styles', 'Add !important'],
      answer: 1,
      explain: 'Components own the variants.',
    },
    {
      chapterId: 'components-patterns',
      q: 'Why use clsx?',
      options: ['For speed', 'To combine conditional classes safely', 'To compile CSS', 'To add fonts'],
      answer: 1,
      explain: 'It handles conditional class strings.',
    },
    {
      chapterId: 'components-patterns',
      q: 'What should every input style?',
      options: ['Only the default state', 'Focus and error states', 'Only errors', 'Nothing'],
      answer: 1,
      explain: 'Interaction states are part of the design.',
    },
    {
      chapterId: 'components-patterns',
      q: 'Why limit hover effects?',
      options: ['For performance', 'Too many effects feel noisy', 'It is required', 'To save CSS'],
      answer: 1,
      explain: 'One clear effect is enough.',
    },
  ],
};
