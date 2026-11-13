// Bootstrap chapter: Layout & Grid.

export default {
  id: 'layout-grid',
  title: 'Layout & Grid',
  description: 'Containers, rows, columns and breakpoints',
  icon: 'grid-view',
  lessons: [
    {
      id: 'bs-grid',
      title: 'The grid',
      blocks: [
        { type: 'text', value: 'A row holds columns. Columns use a 12-unit width. Breakpoints (sm, md, lg, xl, xxl) change the layout at different screen sizes. The gutter class controls the gap.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">One</div>
    <div class="col-12 col-md-6 col-lg-4">Two</div>
    <div class="col-12 col-md-12 col-lg-4">Three</div>
  </div>
</div>` },
        { type: 'note', value: 'Design mobile-first: base classes for small screens, then md/lg overrides. That matches how the grid applies styles.' },
      ],
    },
    {
      id: 'bs-containers',
      title: 'Containers and flex',
      blocks: [
        { type: 'text', value: 'A container centers content and sets a max width. Use container-fluid for full width. Flex utilities align and justify items without custom CSS.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="d-flex justify-content-between align-items-center gap-3">
  <h2 class="m-0">Courses</h2>
  <button class="btn btn-primary">New course</button>
</div>` },
        { type: 'list', items: [
          'container: responsive max width',
          'container-fluid: full width',
          'd-flex and gap for rows',
          'justify-content-between for space',
          'align-items-center for vertical alignment',
        ] },
      ],
    },
    {
      id: 'bs-responsive',
      title: 'Responsive helpers',
      blocks: [
        { type: 'text', value: 'Show or hide elements per breakpoint with d-* classes. Stack columns on mobile and switch to a row on desktop. Test at 360px, 768px and 1280px.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<nav class="d-none d-md-flex gap-3">
  <a href="/">Home</a>
  <a href="/courses">Courses</a>
</nav>

<button class="d-md-none btn btn-outline-secondary">Menu</button>` },
        { type: 'note', value: 'Do not hide essential actions on mobile. A hidden checkout button is a lost sale.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'layout-grid',
      q: 'How wide is a full grid row?',
      options: ['6 columns', '12 columns', '16 columns', '24 columns'],
      answer: 1,
      explain: 'The grid is 12 columns wide.',
    },
    {
      chapterId: 'layout-grid',
      q: 'What does col-md-6 do?',
      options: ['Always 6 columns', '6 columns from md and up', '6 rows', 'Hides on md'],
      answer: 1,
      explain: 'It applies at the md breakpoint and above.',
    },
    {
      chapterId: 'layout-grid',
      q: 'What does container-fluid do?',
      options: ['Fixes the width', 'Uses the full width', 'Removes padding', 'Adds a sidebar'],
      answer: 1,
      explain: 'It spans the full viewport.',
    },
    {
      chapterId: 'layout-grid',
      q: 'Why design mobile-first?',
      options: ['It is faster', 'Base styles target small screens and breakpoints add complexity', 'It is required', 'To avoid flex'],
      answer: 1,
      explain: 'The grid applies upward from the base.',
    },
  ],
};
