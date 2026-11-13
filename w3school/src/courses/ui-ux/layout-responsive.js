// UI/UX chapter: Layout & Responsive Design.

export default {
  id: 'layout-responsive',
  title: 'Layout & Responsive',
  description: 'Grids, breakpoints and mobile-first thinking',
  icon: 'view-quilt',
  lessons: [
    {
      id: 'ux-grid',
      title: 'Grids and layout',
      blocks: [
        { type: 'text', value: 'A grid gives a page structure. A 12-column grid is common on the web; a 4-column grid works on mobile. Consistent margins and gutters make the layout feel calm and predictable.' },
        { type: 'code', lang: 'css', tryIt: false, value: `.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.card { grid-column: span 4; }   /* 3 per row */` },
        { type: 'note', value: 'A grid is a guide, not a cage. Break it deliberately when the content needs it, not by accident.' },
      ],
    },
    {
      id: 'ux-mobile-first',
      title: 'Mobile-first design',
      blocks: [
        { type: 'text', value: 'Start with the smallest screen and add complexity as space grows. Mobile-first forces you to decide what matters most, because there is no room for everything.' },
        { type: 'code', lang: 'css', tryIt: false, value: `/* Base: mobile */
.cards { display: grid; gap: 12px; }

/* Tablet */
@media (min-width: 640px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}` },
        { type: 'list', items: [
          'Design the smallest screen first',
          'Use breakpoints where the content breaks, not by device name',
          'Tap targets at least 44 by 44 pixels',
          'Keep primary actions reachable with a thumb',
          'Test on a real phone, not only a narrow browser window',
        ] },
      ],
    },
    {
      id: 'ux-responsive-content',
      title: 'Responsive content',
      blocks: [
        { type: 'text', value: 'Layout is not only columns. Text, images and tables must adapt too. Avoid fixed widths, let text wrap, and let images scale. A wide table needs a different pattern on mobile.' },
        { type: 'list', items: [
          'Use relative units such as rem and percentages',
          'Cap reading width instead of stretching text',
          'Switch a wide table to stacked cards on mobile',
          'Load smaller images on small screens',
          'Never hide essential content on mobile',
        ] },
        { type: 'note', value: 'Hiding a column on mobile is sometimes right, but hiding the only way to complete a task is not.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'layout-responsive',
      q: 'Why use a grid?',
      options: ['To add colour', 'To give the page a consistent structure', 'To load faster', 'To avoid CSS'],
      answer: 1,
      explain: 'A grid creates predictable alignment.',
    },
    {
      chapterId: 'layout-responsive',
      q: 'What does mobile-first mean?',
      options: ['Design for desktop then shrink', 'Start with the smallest screen and add complexity', 'Only build mobile', 'Use a phone to code'],
      answer: 1,
      explain: 'Mobile-first starts small and grows.',
    },
    {
      chapterId: 'layout-responsive',
      q: 'How large should a tap target be?',
      options: ['10px', '20px', 'At least 44 by 44 pixels', 'Any size'],
      answer: 2,
      explain: '44px is the common minimum for touch.',
    },
    {
      chapterId: 'layout-responsive',
      q: 'Where should breakpoints come from?',
      options: ['Device names', 'Where the content breaks', 'Random values', 'The designer'],
      answer: 1,
      explain: 'Breakpoints follow content needs.',
    },
  ],
};
