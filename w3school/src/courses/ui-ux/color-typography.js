// UI/UX chapter: Colour & Typography.

export default {
  id: 'color-typography',
  title: 'Colour & Typography',
  description: 'Palettes, contrast and readable type',
  icon: 'palette',
  lessons: [
    {
      id: 'ux-color',
      title: 'Colour systems',
      blocks: [
        { type: 'text', value: 'A palette needs a primary colour, a neutral scale and semantic colours for success, warning and error. Use tints and shades of a few hues instead of many unrelated colours.' },
        { type: 'list', items: [
          'Primary: the brand action colour',
          'Neutral: backgrounds, borders and text at several levels',
          'Semantic: success green, warning amber, error red',
          'Use colour to support meaning, never as the only signal',
          'Check contrast, not only beauty',
        ] },
        { type: 'code', lang: 'css', tryIt: false, value: `:root {
  --primary: #0f766e;
  --primary-soft: #ccfbf1;
  --text: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --bg: #f8fafc;
  --danger: #dc2626;
}` },
        { type: 'note', value: 'Never rely on colour alone to show status. Add an icon or a label so colour-blind users get the same information.' },
      ],
    },
    {
      id: 'ux-contrast-ratio',
      title: 'Contrast and accessibility',
      blocks: [
        { type: 'text', value: 'Text needs enough contrast with its background. WCAG requires 4.5:1 for normal text and 3:1 for large text. Low-contrast grey text is one of the most common accessibility failures.' },
        { type: 'list', items: [
          'Normal text: at least 4.5:1',
          'Large text (18px bold or 24px): at least 3:1',
          'UI components and icons: at least 3:1',
          'Test with a contrast checker, not by eye',
          'Dark mode needs its own checks',
        ] },
        { type: 'note', value: 'Grey-on-grey looks elegant on a mockup and fails for real users in daylight. Check the ratio.' },
      ],
    },
    {
      id: 'ux-typography',
      title: 'Typography',
      blocks: [
        { type: 'text', value: 'Typography carries most of the information. Use one or two font families, a clear size scale and comfortable line height. Long lines are hard to read; 45 to 75 characters is a good target.' },
        { type: 'code', lang: 'css', tryIt: false, value: `body {
  font-family: Inter, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #0f172a;
}

h1 { font-size: 32px; line-height: 1.2; }
h2 { font-size: 24px; line-height: 1.3; }
p  { max-width: 68ch; }` },
        { type: 'note', value: 'Use system fonts or one well-chosen web font. Every extra font family costs load time and visual consistency.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'color-typography',
      q: 'What is a semantic colour?',
      options: ['A random colour', 'A colour with meaning such as success or error', 'A brand colour only', 'A gradient'],
      answer: 1,
      explain: 'Semantic colours carry meaning.',
    },
    {
      chapterId: 'color-typography',
      q: 'What contrast ratio is required for normal text?',
      options: ['1:1', '2:1', '4.5:1', '10:1'],
      answer: 2,
      explain: 'WCAG asks for at least 4.5:1.',
    },
    {
      chapterId: 'color-typography',
      q: 'Why not use colour alone to show status?',
      options: ['It is expensive', 'Colour-blind users need another signal', 'It is slower', 'It is not allowed'],
      answer: 1,
      explain: 'Add an icon or label as well.',
    },
    {
      chapterId: 'color-typography',
      q: 'What is a comfortable line length for body text?',
      options: ['10 to 20 characters', '45 to 75 characters', '200 characters', 'No limit'],
      answer: 1,
      explain: 'About 45 to 75 characters reads well.',
    },
  ],
};
