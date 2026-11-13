// Bootstrap chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Bootstrap is, setup and the basics',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'bs-what-is',
      title: 'What is Bootstrap?',
      blocks: [
        { type: 'text', value: 'Bootstrap 5 is a CSS framework with a responsive grid, ready-made components and utility classes. You copy classes instead of writing CSS for every layout and button.' },
        { type: 'list', items: [
          '12-column responsive grid',
          'Components: navbar, card, modal, dropdown',
          'Utility classes for spacing and display',
          'No jQuery required in version 5',
          'Works with any backend or framework',
        ] },
        { type: 'note', value: 'Bootstrap is fast for admin panels and MVPs. It is harder to make a truly unique brand on top of the defaults.' },
      ],
    },
    {
      id: 'bs-setup',
      title: 'Setup',
      blocks: [
        { type: 'text', value: 'Add the compiled CSS and the bundle JavaScript from a CDN, or install with npm for a build step. The bundle includes Popper for dropdowns and tooltips.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container py-4">
    <h1>Hello, Bootstrap</h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>` },
        { type: 'note', value: 'The viewport meta tag is required, or the grid will not be responsive on phones.' },
      ],
    },
    {
      id: 'bs-basics',
      title: 'The basics',
      blocks: [
        { type: 'text', value: 'Use container, row and col to lay out. Buttons, cards and alerts are classes. Utility classes handle spacing and colour without custom CSS.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="container">
  <div class="row g-3">
    <div class="col-12 col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">HTML</h5>
          <p class="card-text text-muted">The structure of every page.</p>
          <a href="#" class="btn btn-primary">Start</a>
        </div>
      </div>
    </div>
  </div>
</div>` },
        { type: 'note', value: 'Prefer Bootstrap utility classes before writing custom CSS. Custom CSS is for the exceptions, not the layout.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does Bootstrap provide?',
      options: ['A backend', 'A responsive CSS framework with components', 'A database', 'A test runner'],
      answer: 1,
      explain: 'It is a CSS component framework.',
    },
    {
      chapterId: 'getting-started',
      q: 'Does Bootstrap 5 need jQuery?',
      options: ['Yes', 'No', 'Only for modals', 'Only for forms'],
      answer: 1,
      explain: 'Version 5 dropped the jQuery dependency.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which meta tag is required?',
      options: ['description', 'viewport', 'author', 'theme-color'],
      answer: 1,
      explain: 'The viewport tag enables responsive layout.',
    },
    {
      chapterId: 'getting-started',
      q: 'How many grid columns?',
      options: ['6', '12', '16', '24'],
      answer: 1,
      explain: 'Bootstrap uses a 12-column grid.',
    },
  ],
};
