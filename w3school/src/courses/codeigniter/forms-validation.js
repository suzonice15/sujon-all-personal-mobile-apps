// CodeIgniter chapter: Forms & Validation.

export default {
  id: 'forms-validation',
  title: 'Forms & Validation',
  description: 'Validation rules, CSRF and error display',
  icon: 'edit-note',
  lessons: [
    {
      id: 'ci-validation',
      title: 'Validation',
      blocks: [
        { type: 'text', value: 'Validate with a rule set in the controller. Codes use pipe syntax: required|min_length[3]|integer. On failure, redirect back with the errors and old input.' },
        { type: 'code', lang: 'php', tryIt: false, value: `$rules = [
    'title' => 'required|min_length[3]|max_length[200]',
    'price' => 'required|integer|greater_than_equal_to[0]',
];

if (!$this->validate($rules)) {
    return redirect()->back()
        ->withInput()
        ->with('errors', $this->validator->getErrors());
}` },
        { type: 'note', value: 'Client-side validation improves the experience, but the server rule is the one that protects the data.' },
      ],
    },
    {
      id: 'ci-csrf',
      title: 'CSRF and forms',
      blocks: [
        { type: 'text', value: 'CodeIgniter can add a CSRF token to forms automatically. Enable the filter globally for state-changing requests and use the form helper to render the token.' },
        { type: 'code', lang: 'php', tryIt: false, value: `// app/Config/Filters.php
public $globals = [
    'before' => ['csrf' => ['except' => ['api/*']]],
];

// View
<form method="post" action="<?= site_url('courses') ?>">
  <?= csrf_field() ?>
  <input name="title" value="<?= old('title') ?>">
  <button>Save</button>
</form>` },
        { type: 'note', value: 'Exempt only API routes that authenticate with a token, not ordinary browser forms.' },
      ],
    },
    {
      id: 'ci-errors',
      title: 'Errors and old input',
      blocks: [
        { type: 'text', value: 'Show errors next to the field and keep the submitted values. A form that clears on error makes users retype everything.' },
        { type: 'code', lang: 'php', tryIt: false, value: `<?php if (session('errors')): ?>
  <ul class="errors">
    <?php foreach (session('errors') as $error): ?>
      <li><?= esc($error) ?></li>
    <?php endforeach; ?>
  </ul>
<?php endif; ?>` },
        { type: 'list', items: [
          'Show one clear message per field',
          'Preserve old input',
          'Redirect after a successful POST',
          'Log the validation failure, not the password',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'forms-validation',
      q: 'How are rules written?',
      options: ['As JSON', 'As pipe-separated strings', 'As CSS', 'As SQL'],
      answer: 1,
      explain: 'Rules use pipe syntax.',
    },
    {
      chapterId: 'forms-validation',
      q: 'Where is validation enforced?',
      options: ['Only in the browser', 'On the server', 'In CSS', 'In the database only'],
      answer: 1,
      explain: 'The server is the trust boundary.',
    },
    {
      chapterId: 'forms-validation',
      q: 'What does csrf_field() add?',
      options: ['A password', 'A CSRF token field', 'A database key', 'A CSS class'],
      answer: 1,
      explain: 'It protects the form from CSRF.',
    },
    {
      chapterId: 'forms-validation',
      q: 'Why keep old input?',
      options: ['For style', 'So the user does not retype everything', 'To speed up SQL', 'To cache'],
      answer: 1,
      explain: 'Preserving input improves UX.',
    },
  ],
};
