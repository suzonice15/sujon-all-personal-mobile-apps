// Bootstrap chapter: Components.

export default {
  id: 'components',
  title: 'Components',
  description: 'Navbar, cards, buttons, alerts and badges',
  icon: 'widgets',
  lessons: [
    {
      id: 'bs-navbar',
      title: 'Navbar',
      blocks: [
        { type: 'text', value: 'A navbar holds the brand, links and a collapse menu on mobile. Use navbar-expand-lg so it collapses below the large breakpoint.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="/">CodeNest</a>
    <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="/courses">Courses</a></li>
      </ul>
    </div>
  </div>
</nav>` },
        { type: 'note', value: 'The collapse needs the bundle JavaScript. Without it, the mobile menu button does nothing.' },
      ],
    },
    {
      id: 'bs-cards-buttons',
      title: 'Cards and buttons',
      blocks: [
        { type: 'text', value: 'A card groups content with a body, title and actions. Buttons have variants and sizes. Use one primary action per card to keep the hierarchy clear.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">SQL</h5>
        <p class="card-text text-muted flex-grow-1">Query relational data.</p>
        <a class="btn btn-primary" href="/sql">Start</a>
      </div>
    </div>
  </div>
</div>` },
        { type: 'note', value: 'Use h-100 on cards in a row so they align at the same height.' },
      ],
    },
    {
      id: 'bs-alerts-badges',
      title: 'Alerts, badges and breadcrumbs',
      blocks: [
        { type: 'text', value: 'Alerts show feedback, badges show counts or status, and breadcrumbs show location. Use semantic variants: success, warning, danger.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="alert alert-success" role="alert">
  Course saved successfully.
</div>

<h2>Courses <span class="badge text-bg-secondary">12</span></h2>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item active">Courses</li>
  </ol>
</nav>` },
        { type: 'list', items: [
          'alert-* for feedback',
          'badge for counts and status',
          'breadcrumb for location',
          'role="alert" for screen readers',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'components',
      q: 'What does navbar-expand-lg do?',
      options: ['Makes the navbar large', 'Collapses the menu below lg', 'Hides the brand', 'Adds a search box'],
      answer: 1,
      explain: 'It sets the collapse breakpoint.',
    },
    {
      chapterId: 'components',
      q: 'Why use h-100 on cards?',
      options: ['For colour', 'So cards in a row match height', 'To add a border', 'To hide overflow'],
      answer: 1,
      explain: 'It fills the column height.',
    },
    {
      chapterId: 'components',
      q: 'Which class shows success feedback?',
      options: ['alert-success', 'alert-danger', 'badge-success', 'text-success only'],
      answer: 0,
      explain: 'alert-success is the feedback component.',
    },
    {
      chapterId: 'components',
      q: 'What is a badge for?',
      options: ['A large banner', 'A small count or status', 'A modal', 'A form'],
      answer: 1,
      explain: 'Badges show small labels.',
    },
  ],
};
