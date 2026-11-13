// CodeIgniter chapter: Views & Templates.

export default {
  id: 'views-templates',
  title: 'Views & Layouts',
  description: 'PHP views, escaping and layout sections',
  icon: 'code',
  lessons: [
    {
      id: 'ci-views',
      title: 'Views',
      blocks: [
        { type: 'text', value: 'A view is a PHP file that outputs HTML. Pass data from the controller as an array. Escape output with esc() to prevent XSS.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// Controller
return view('courses/list', ['courses' => $courses]);

// app/Views/courses/list.php
<h1>Courses</h1>
<?php foreach ($courses as $course): ?>
  <a href="<?= site_url('courses/' . $course['id']) ?>">
    <?= esc($course['title']) ?>
  </a>
<?php endforeach; ?>` },
        { type: 'note', value: 'esc() is not optional. A title containing a script tag would otherwise execute in the browser.' },
      ],
    },
    {
      id: 'ci-layouts',
      title: 'Layouts',
      blocks: [
        { type: 'text', value: 'CodeIgniter has no built-in template engine. Use a layout view with sections, or a view cell, to share the header and footer without repeating them.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// app/Views/layouts/main.php
<!doctype html>
<html>
<body>
  <?= $this->include('partials/nav') ?>
  <?= $this->renderSection('content') ?>
</body>
</html>

// A page
<?= $this->extend('layouts/main') ?>
<?= $this->section('content') ?>
  <h1>Courses</h1>
<?= $this->endSection() ?>` },
        { type: 'note', value: 'Keep view files small. Logic in a view is hard to test and easy to break.' },
      ],
    },
    {
      id: 'ci-assets',
      title: 'Assets',
      blocks: [
        { type: 'text', value: 'Static assets live in public/. Build URLs with base_url() so the app works in a subfolder. In production, serve assets from the web server or a CDN.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<link rel="stylesheet" href="<?= base_url('css/app.css') ?>">
<script src="<?= base_url('js/app.js') ?>" defer></script>` },
        { type: 'list', items: [
          'Use base_url for every asset',
          'Version files to bust cache',
          'Serve static files outside PHP',
          'Keep public/ as the only web root',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'views-templates',
      q: 'What does esc() do?',
      options: ['Compresses output', 'Escapes HTML to prevent XSS', 'Creates a URL', 'Loads a model'],
      answer: 1,
      explain: 'Escaping protects against injected HTML.',
    },
    {
      chapterId: 'views-templates',
      q: 'How do you share a layout?',
      options: ['Copy the header', 'Extend a layout view with sections', 'Use CSS', 'Use a model'],
      answer: 1,
      explain: 'Layout sections keep views DRY.',
    },
    {
      chapterId: 'views-templates',
      q: 'Where do assets live?',
      options: ['app/', 'public/', 'writable/', 'vendor/'],
      answer: 1,
      explain: 'Public assets live in public/.',
    },
    {
      chapterId: 'views-templates',
      q: 'Why use base_url()?',
      options: ['For style', 'So URLs work in a subfolder or another host', 'To cache', 'To escape'],
      answer: 1,
      explain: 'It builds absolute app URLs.',
    },
  ],
};
