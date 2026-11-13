// UI/UX chapter: Design Principles.

export default {
  id: 'design-principles',
  title: 'Design Principles',
  description: 'Hierarchy, contrast, alignment, proximity and whitespace',
  icon: 'grid-view',
  lessons: [
    {
      id: 'ux-hierarchy',
      title: 'Visual hierarchy',
      blocks: [
        { type: 'text', value: 'Hierarchy tells the eye what to read first, second and third. Use size, weight, colour and space to rank information. A screen where everything is bold has no hierarchy at all.' },
        { type: 'code', lang: 'css', tryIt: false, value: `.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
}
.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #334155;
}
.body-text {
  font-size: 15px;
  font-weight: 400;
  color: #475569;
}` },
        { type: 'note', value: 'One primary action per screen. If two buttons compete, the user hesitates. Make the main action obvious and the secondary one quieter.' },
      ],
    },
    {
      id: 'ux-contrast-spacing',
      title: 'Contrast and whitespace',
      blocks: [
        { type: 'text', value: 'Contrast makes elements distinguishable: dark text on a light background, a filled primary button next to a text link. Whitespace groups and separates. Space is a design tool, not empty room.' },
        { type: 'list', items: [
          'Use contrast for importance, not decoration',
          'Group related items with less space between them',
          'Separate unrelated sections with more space',
          'Leave breathing room around text and buttons',
          'Avoid pure black on pure white for long reading',
        ] },
        { type: 'note', value: 'If a layout feels crowded, add space before adding lines or boxes. Space usually solves it.' },
      ],
    },
    {
      id: 'ux-alignment-proximity',
      title: 'Alignment and proximity',
      blocks: [
        { type: 'text', value: 'Alignment creates order: elements share an edge or a centre line. Proximity says things close together belong together. Misalignment makes a clean design look broken.' },
        { type: 'code', lang: 'css', tryIt: false, value: `/* Good: a consistent 8px spacing scale */
.stack > * + * { margin-top: 8px; }
.card { padding: 16px; border-radius: 12px; }
.card + .card { margin-top: 12px; }

/* Label and input are one unit */
.field { display: grid; gap: 6px; }
.field + .field { margin-top: 16px; }` },
        { type: 'note', value: 'Use a spacing scale (4, 8, 12, 16, 24, 32) instead of random values. Consistency is what makes a design feel professional.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'design-principles',
      q: 'What does visual hierarchy do?',
      options: ['Adds colour', 'Tells the eye what to read first, second and third', 'Removes whitespace', 'Creates animations'],
      answer: 1,
      explain: 'Hierarchy ranks information.',
    },
    {
      chapterId: 'design-principles',
      q: 'Why use whitespace?',
      options: ['To fill the screen', 'To group and separate content and improve readability', 'To save space', 'It is decorative only'],
      answer: 1,
      explain: 'Space groups and separates.',
    },
    {
      chapterId: 'design-principles',
      q: 'What does proximity suggest?',
      options: ['Nothing', 'Items close together belong together', 'Items far apart are important', 'Colour meaning'],
      answer: 1,
      explain: 'Proximity groups related items.',
    },
    {
      chapterId: 'design-principles',
      q: 'Why use a spacing scale?',
      options: ['To be slow', 'Consistent spacing looks professional and speeds decisions', 'It is required by CSS', 'To avoid grids'],
      answer: 1,
      explain: 'A scale keeps spacing consistent.',
    },
  ],
};
