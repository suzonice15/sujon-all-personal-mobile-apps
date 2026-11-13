// Bootstrap chapter: JavaScript Components.

export default {
  id: 'js-components',
  title: 'JS Components',
  description: 'Modals, dropdowns, tabs and tooltips',
  icon: 'javascript',
  lessons: [
    {
      id: 'bs-modal',
      title: 'Modal',
      blocks: [
        { type: 'text', value: 'A modal is a dialog built with markup and the Bootstrap bundle. It traps focus and dims the page. Use it for confirmation, not for long forms that could be a page.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
  Delete
</button>

<div class="modal fade" id="deleteModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete course?</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">This action cannot be undone.</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>` },
        { type: 'note', value: 'A destructive action needs a clear label, not “OK”. Say “Delete course”.' },
      ],
    },
    {
      id: 'bs-dropdown-tabs',
      title: 'Dropdowns and tabs',
      blocks: [
        { type: 'text', value: 'Dropdowns hold secondary actions. Tabs switch content in place. Both need the bundle JS and the data-bs-* attributes.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="dropdown">
  <button class="btn btn-outline-secondary" data-bs-toggle="dropdown">Actions</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Edit</a></li>
    <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
  </ul>
</div>

<ul class="nav nav-tabs">
  <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#a">Overview</button></li>
  <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#b">Lessons</button></li>
</ul>` },
        { type: 'note', value: 'Do not put critical actions only inside a dropdown. They become hard to find.' },
      ],
    },
    {
      id: 'bs-tooltips',
      title: 'Tooltips and toasts',
      blocks: [
        { type: 'text', value: 'Tooltips need explicit initialisation in JavaScript. Toasts show temporary feedback and can stack.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltips].forEach((el) => new bootstrap.Tooltip(el));

const toastEl = document.getElementById('savedToast');
bootstrap.Toast.getOrCreateInstance(toastEl).show();` },
        { type: 'list', items: [
          'Tooltips need initialisation',
          'Toasts are for feedback, not errors that need action',
          'Keep tooltip text short',
          'Do not rely on hover on touch devices',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'js-components',
      q: 'What opens a Bootstrap modal?',
      options: ['A CSS class only', 'data-bs-toggle="modal" with the bundle JS', 'A form', 'An iframe'],
      answer: 1,
      explain: 'The data attributes plus JS open it.',
    },
    {
      chapterId: 'js-components',
      q: 'What is a modal best for?',
      options: ['A long form', 'A confirmation or short dialog', 'A whole page', 'Navigation'],
      answer: 1,
      explain: 'Keep modals short and focused.',
    },
    {
      chapterId: 'js-components',
      q: 'Do tooltips work without initialisation?',
      options: ['Yes', 'No, they need JS init', 'Only on mobile', 'Only in modals'],
      answer: 1,
      explain: 'Tooltips require initialisation.',
    },
    {
      chapterId: 'js-components',
      q: 'What is a toast for?',
      options: ['Temporary feedback', 'A whole page', 'A database', 'A form'],
      answer: 0,
      explain: 'Toasts show brief feedback.',
    },
  ],
};
