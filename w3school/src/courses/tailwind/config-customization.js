// Tailwind chapter: Config & Customization.

export default {
  id: 'config-customization',
  title: 'Config & Customization',
  description: 'Extending the theme, plugins and arbitrary values',
  icon: 'settings',
  lessons: [
    {
      id: 'tw-config',
      title: 'The config file',
      blocks: [
        { type: 'text', value: 'tailwind.config.js holds content paths, theme extensions and plugins. Extend adds to the defaults; override replaces them.' },
        { type: 'code', lang: 'js', tryIt: false, value: `module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: { brand: '#0f766e' },
      borderRadius: { xl: '1rem' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
};` },
        { type: 'note', value: 'Prefer extend over replacing the theme. Replacing removes the default scale you may still need.' },
      ],
    },
    {
      id: 'tw-arbitrary',
      title: 'Arbitrary values',
      blocks: [
        { type: 'text', value: 'Square brackets allow a one-off value: w-[320px], bg-[#123456]. Use them for genuine exceptions, not as the main strategy.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="w-[320px] rounded-[14px] bg-[#0f172a] p-[18px]">
  Arbitrary but intentional
</div>` },
        { type: 'list', items: [
          'Good: one unusual width for a chart',
          'Bad: every spacing value arbitrary',
          'Add a token when a value repeats',
          'Arbitrary values are still scanned at build time',
        ] },
      ],
    },
    {
      id: 'tw-plugins',
      title: 'Plugins and forms',
      blocks: [
        { type: 'text', value: 'Official plugins add component classes such as styled forms and typography. Install, add to plugins, and use the generated classes.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npm install -D @tailwindcss/forms @tailwindcss/typography` },
        { type: 'code', lang: 'js', tryIt: false, value: `plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
],` },
        { type: 'note', value: 'A plugin is a dependency to keep updated. Add one only when it saves meaningful work.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'config-customization',
      q: 'What does extend do?',
      options: ['Replaces the theme', 'Adds to the default theme', 'Deletes classes', 'Creates a plugin'],
      answer: 1,
      explain: 'Extend keeps the defaults.',
    },
    {
      chapterId: 'config-customization',
      q: 'What are square brackets for?',
      options: ['Selectors', 'One-off arbitrary values', 'Comments', 'Plugins'],
      answer: 1,
      explain: 'They allow arbitrary values.',
    },
    {
      chapterId: 'config-customization',
      q: 'When add a token?',
      options: ['For every value', 'When a value repeats', 'Never', 'Only for colours'],
      answer: 1,
      explain: 'Repeated values deserve a token.',
    },
    {
      chapterId: 'config-customization',
      q: 'What does the forms plugin provide?',
      options: ['A database', 'Styled form defaults', 'A router', 'Tests'],
      answer: 1,
      explain: 'It adds form base styles.',
    },
  ],
};
