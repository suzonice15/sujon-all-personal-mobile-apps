// Tailwind chapter: Dark Mode.

export default {
  id: 'dark-mode',
  title: 'Dark Mode',
  description: 'Class strategy, tokens and contrast',
  icon: 'dark-mode',
  lessons: [
    {
      id: 'tw-dark-setup',
      title: 'Enabling dark mode',
      blocks: [
        { type: 'text', value: 'Tailwind supports a media strategy (follows the OS) or a class strategy (a toggle). For an in-app switch, set darkMode: "class" and toggle the dark class on html.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,html}'],
};` },
        { type: 'code', lang: 'js', tryIt: false, value: `document.documentElement.classList.toggle('dark', isDark);
localStorage.setItem('theme', isDark ? 'dark' : 'light');` },
        { type: 'note', value: 'Read the saved theme before first paint to avoid a white flash on a dark page.' },
      ],
    },
    {
      id: 'tw-dark-styles',
      title: 'Styling for dark',
      blocks: [
        { type: 'text', value: 'Add dark: variants next to the light style. Plan both themes together; do not invert colours automatically.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="rounded-xl border border-slate-200 bg-white p-4
  dark:border-slate-700 dark:bg-slate-900">
  <h3 class="text-slate-900 dark:text-slate-100">Course</h3>
  <p class="text-slate-500 dark:text-slate-400">A short description.</p>
</div>` },
        { type: 'list', items: [
          'Use slate or neutral scales for surfaces',
          'Check contrast in both themes',
          'Dark is not just inverted light',
          'Images and charts may need a dark variant',
        ] },
      ],
    },
    {
      id: 'tw-dark-tokens',
      title: 'Tokens instead of repetition',
      blocks: [
        { type: 'text', value: 'Repeating dark: on every element is noisy. Define semantic colours in the config, or use CSS variables, so a component references one token.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// tailwind.config.js
theme: {
  extend: {
    colors: {
      surface: 'rgb(var(--surface) / <alpha-value>)',
      content: 'rgb(var(--content) / <alpha-value>)',
    },
  },
}` },
        { type: 'note', value: 'Semantic names such as surface and content survive a rebrand better than raw slate shades.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dark-mode',
      q: 'Which darkMode strategy allows an in-app toggle?',
      options: ['media', 'class', 'selector', 'none'],
      answer: 1,
      explain: 'The class strategy toggles a class on html.',
    },
    {
      chapterId: 'dark-mode',
      q: 'What does dark:bg-slate-900 do?',
      options: ['Always dark', 'Applies in dark mode', 'Adds a shadow', 'Changes text'],
      answer: 1,
      explain: 'The dark variant applies in dark mode.',
    },
    {
      chapterId: 'dark-mode',
      q: 'Why read the theme before first paint?',
      options: ['For speed', 'To avoid a white flash', 'To enable CSS', 'To add fonts'],
      answer: 1,
      explain: 'It prevents a flash of the wrong theme.',
    },
    {
      chapterId: 'dark-mode',
      q: 'Why use semantic colour tokens?',
      options: ['They are shorter', 'They adapt and survive a rebrand', 'They load faster', 'They are required'],
      answer: 1,
      explain: 'Semantic names describe purpose.',
    },
  ],
};
