// Tailwind chapter: Utility First.

export default {
  id: 'utility-first',
  title: 'Utility First',
  description: 'Spacing, colour, type and states',
  icon: 'tune',
  lessons: [
    {
      id: 'tw-spacing-color',
      title: 'Spacing and colour',
      blocks: [
        { type: 'text', value: 'Spacing uses a scale: p-4 is one rem, mt-2 is half a rem. Colour classes follow the pattern bg-{color}-{shade} and text-{color}-{shade}, where shade runs from 50 to 950.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<section class="bg-slate-50 px-6 py-12">
  <h2 class="text-2xl font-bold text-slate-900">Courses</h2>
  <p class="mt-2 text-slate-600">Pick a topic and start learning.</p>
</section>` },
        { type: 'note', value: 'Stay on the scale. Arbitrary values such as p-[13px] work, but a page full of them loses the consistency Tailwind gives you.' },
      ],
    },
    {
      id: 'tw-type',
      title: 'Typography',
      blocks: [
        { type: 'text', value: 'Type utilities cover size, weight, line height, tracking and colour. A clear scale makes hierarchy obvious without custom CSS.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<h1 class="text-3xl font-extrabold tracking-tight text-slate-900">
  Learn to code
</h1>
<p class="mt-2 max-w-prose text-base leading-7 text-slate-600">
  Short lessons, real examples and quizzes.
</p>` },
        { type: 'list', items: [
          'max-w-prose caps the reading width',
          'font-bold for emphasis, not every line',
          'leading-7 for comfortable body text',
          'Use one accent colour',
        ] },
      ],
    },
    {
      id: 'tw-states',
      title: 'States and variants',
      blocks: [
        { type: 'text', value: 'Variants apply a utility in a state: hover:, focus:, active:, disabled:. They keep interaction styles next to the element instead of in a separate block.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<button class="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white
  hover:bg-teal-800 focus:outline-none focus-visible:ring-2
  focus-visible:ring-teal-500 disabled:opacity-50">
  Enroll
</button>` },
        { type: 'note', value: 'Always include a visible focus style. Removing the outline without a replacement makes keyboard use impossible.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'utility-first',
      q: 'What does p-4 do?',
      options: ['Adds margin', 'Adds padding on the spacing scale', 'Sets a colour', 'Adds a border'],
      answer: 1,
      explain: 'p is padding, 4 is the scale step.',
    },
    {
      chapterId: 'utility-first',
      q: 'What does hover:bg-teal-800 do?',
      options: ['Always teal', 'Changes the background on hover', 'Adds a shadow', 'Changes the font'],
      answer: 1,
      explain: 'The hover variant applies the utility on hover.',
    },
    {
      chapterId: 'utility-first',
      q: 'Why use max-w-prose?',
      options: ['To centre text', 'To keep a readable line length', 'To bold text', 'To add padding'],
      answer: 1,
      explain: 'It caps the reading width.',
    },
    {
      chapterId: 'utility-first',
      q: 'Why keep a visible focus ring?',
      options: ['For decoration', 'For keyboard accessibility', 'To add a border', 'To load faster'],
      answer: 1,
      explain: 'Keyboard users need to see focus.',
    },
  ],
};
