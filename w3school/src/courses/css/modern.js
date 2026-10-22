// CSS chapter: Modern CSS. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'modern',
  title: 'Modern CSS',
  description: 'Variables, functions, nesting and dark mode',
  icon: 'bolt',
  lessons: [
    {
      id: 'css-variables',
      title: 'Custom Properties (Variables)',
      blocks: [
        { type: 'text', value: 'Custom properties store a value once and reuse it everywhere. Their names start with two dashes, and var() reads them. Change the variable and every use updates, even live from JavaScript.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  :root {
    --brand: #2965f1;
    --radius: 10px;
    --space: 12px;
  }
  .btn { background: var(--brand); color: white; border: 0; padding: var(--space); border-radius: var(--radius); }
  .card { border: 2px solid var(--brand); border-radius: var(--radius); padding: var(--space); margin-top: var(--space); }
  .danger { --brand: crimson; }   /* override inside one element */
</style>

<button class="btn">Brand button</button>
<div class="card">Brand card</div>
<div class="card danger"><button class="btn">Same CSS, red brand</button></div>
<p><button onclick="document.documentElement.style.setProperty('--brand', '#10b981')">Change brand color</button></p>` },
        { type: 'list', items: [
          'Define global variables on :root.',
          'var(--size, 16px): the second value is a fallback.',
          'Variables are inherited, so you can override them for one section.',
        ] },
      ],
    },
    {
      id: 'css-math',
      title: 'calc(), min() and max()',
      blocks: [
        { type: 'text', value: 'CSS can do math, even mixing units.' },
        { type: 'list', items: [
          'calc(100% - 40px): full width minus a fixed gap',
          'min(600px, 90%): whichever is smaller, so it never overflows',
          'max(16px, 1vw): whichever is bigger, a minimum size',
          'clamp(min, value, max): both limits at once',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .sidebar-layout { display: flex; gap: 10px; }
  .side { width: 100px; background: #e2e8f0; }
  .content { width: calc(100% - 110px); background: #dbeafe; padding: 8px; }
  .container { width: min(500px, 100%); margin: 12px auto; background: #fef3c7; padding: 8px; }
  .text { font-size: max(14px, 2.5vw); }
</style>

<div class="sidebar-layout"><div class="side">100px</div><div class="content">calc(100% - 110px)</div></div>
<div class="container">min(500px, 100%)</div>
<p class="text">This text is at least 14px.</p>` },
        { type: 'note', value: 'Inside calc() you must put spaces around + and -. calc(100%-40px) does not work.' },
      ],
    },
    {
      id: 'css-nesting',
      title: 'Native Nesting',
      blocks: [
        { type: 'text', value: 'Modern browsers support nesting rules inside each other, like in SASS. It keeps related styles together and avoids repeating the parent selector.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .card {
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px;

    h3 { margin: 0 0 6px; color: #2965f1; }
    p { color: #475569; }

    &.featured { border-color: gold; background: #fffbeb; }

    @media (min-width: 600px) {
      padding: 24px;
    }
  }
</style>

<div class="card"><h3>Normal card</h3><p>Nested styles.</p></div>
<div class="card featured"><h3>Featured card</h3><p>Uses &amp;.featured</p></div>` },
        { type: 'list', items: [
          '& means "the parent selector": &.featured becomes .card.featured',
          '& :hover with a space would mean a hovered child, so be careful',
          'Keep nesting shallow, 2 to 3 levels at most',
        ] },
      ],
    },
    {
      id: 'css-dark-mode',
      title: 'Dark Mode',
      blocks: [
        { type: 'text', value: 'Combine variables with the prefers-color-scheme media query and your whole site switches theme with the user\'s phone setting.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  :root {
    color-scheme: light dark;
    --bg: #ffffff;
    --text: #0f172a;
    --card: #f1f5f9;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0f172a; --text: #e2e8f0; --card: #1e293b; }
  }
  .dark { --bg: #0f172a; --text: #e2e8f0; --card: #1e293b; }

  body { background: var(--bg); color: var(--text); font-family: sans-serif; transition: background 0.3s; }
  .card { background: var(--card); padding: 12px; border-radius: 10px; }
</style>

<div class="card">
  <p>This follows your phone's theme.</p>
  <button onclick="document.body.classList.toggle('dark')">Toggle dark mode</button>
</div>` },
        { type: 'note', value: 'color-scheme: light dark also makes form fields and scrollbars match the theme automatically.' },
      ],
    },
    {
      id: 'css-logical',
      title: 'Logical Properties',
      blocks: [
        { type: 'text', value: 'Logical properties describe sides by text direction instead of physical left and right. The same CSS then works for left-to-right languages like English and Bangla and right-to-left languages like Arabic.' },
        { type: 'list', items: [
          'margin-inline-start instead of margin-left',
          'padding-block instead of padding-top + padding-bottom',
          'inline-size instead of width, block-size instead of height',
          'inset: 0 instead of top: 0; right: 0; bottom: 0; left: 0',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  .note { border-inline-start: 4px solid #2965f1; padding-inline: 12px; padding-block: 6px; background: #eff6ff; margin-block: 8px; }
</style>

<p class="note" dir="ltr">Left-to-right: the border is on the left.</p>
<p class="note" dir="rtl">من اليمين إلى اليسار: the border moves to the right.</p>` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'modern', q: 'How do you read a custom property named --brand?', options: ['$brand', 'var(--brand)', 'get(--brand)', '--brand()'], answer: 1, explain: 'var() reads a custom property.' },
    { chapterId: 'modern', q: 'Where are global CSS variables usually defined?', options: ['body', ':root', 'html head', '@global'], answer: 1, explain: ':root matches the <html> element, so every element inherits them.' },
    { chapterId: 'modern', q: 'Which is valid?', options: ['calc(100%-20px)', 'calc(100% - 20px)', 'calc[100% - 20px]', 'calc(100% minus 20px)'], answer: 1, explain: 'Spaces around + and - are required.' },
    { chapterId: 'modern', q: 'In native nesting, what does & represent?', options: ['Any element', 'The parent selector', 'An id', 'The :root'], answer: 1, explain: '&.featured inside .card becomes .card.featured.' },
    { chapterId: 'modern', q: 'Which media feature detects the phone\'s dark theme?', options: ['prefers-dark', 'color-mode: dark', 'prefers-color-scheme: dark', 'theme: dark'], answer: 2, explain: '@media (prefers-color-scheme: dark) { ... }' },
  ],
};
