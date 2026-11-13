// Bootstrap chapter: Customization.

export default {
  id: 'customization',
  title: 'Customization',
  description: 'Sass variables, themes and avoiding class soup',
  icon: 'palette',
  lessons: [
    {
      id: 'bs-sass',
      title: 'Sass variables',
      blocks: [
        { type: 'text', value: 'Bootstrap is built with Sass. Override variables before importing Bootstrap to change the theme without fighting the defaults. Compile with a bundler or the Sass CLI.' },
        { type: 'code', lang: 'css', tryIt: false, value: `// custom.scss
$primary: #0f766e;
$border-radius: 0.75rem;
$font-family-sans-serif: Inter, system-ui, sans-serif;

@import "bootstrap/scss/bootstrap";` },
        { type: 'note', value: 'Override variables before the import. A CSS override after the import needs more specificity and is harder to maintain.' },
      ],
    },
    {
      id: 'bs-theme',
      title: 'Themes and dark mode',
      blocks: [
        { type: 'text', value: 'Bootstrap 5.3 supports colour modes with data-bs-theme. Set it on the html element to switch light and dark, and use the body-tertiary background utilities that adapt.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<html data-bs-theme="dark">
<body class="bg-body-tertiary text-body">
  <div class="card">
    <div class="card-body">Adapts to the theme</div>
  </div>
</body>
</html>` },
        { type: 'list', items: [
          'Map your brand to a few variables',
          'Use bg-body and text-body, not hard-coded colours',
          'Test both light and dark',
          'Keep one spacing scale',
        ] },
      ],
    },
    {
      id: 'bs-maintainable',
      title: 'Keeping it maintainable',
      blocks: [
        { type: 'list', items: [
          'Prefer utilities over new CSS',
          'Extract repeated markup into a component',
          'Keep a small custom CSS file',
          'Document the theme variables',
          'Audit for unused custom classes',
        ] },
        { type: 'text', value: 'A page with fifty utility classes is hard to read. Extract the repeated card or button into a component or a small custom class.' },
        { type: 'note', value: 'Bootstrap speeds up the first version. Long-term, a small design system on top keeps it consistent.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'customization',
      q: 'When should you override Sass variables?',
      options: ['After the import', 'Before importing Bootstrap', 'In HTML', 'In JavaScript'],
      answer: 1,
      explain: 'Overrides before import apply globally.',
    },
    {
      chapterId: 'customization',
      q: 'How do you switch dark mode?',
      options: ['A CSS class only', 'data-bs-theme on html', 'A script tag', 'A cookie'],
      answer: 1,
      explain: 'The attribute switches the colour mode.',
    },
    {
      chapterId: 'customization',
      q: 'Why use bg-body instead of a hard-coded colour?',
      options: ['It is shorter', 'It adapts to the active theme', 'It is required', 'It loads faster'],
      answer: 1,
      explain: 'Theme-aware utilities adapt.',
    },
    {
      chapterId: 'customization',
      q: 'What reduces class soup?',
      options: ['More utilities', 'Extracting components or small custom classes', 'Inline styles', 'A bigger CSS file'],
      answer: 1,
      explain: 'Reuse keeps markup readable.',
    },
  ],
};
