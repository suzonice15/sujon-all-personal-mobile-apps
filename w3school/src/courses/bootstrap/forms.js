// Bootstrap chapter: Forms.

export default {
  id: 'forms',
  title: 'Forms',
  description: 'Inputs, selects, validation and layout',
  icon: 'edit-note',
  lessons: [
    {
      id: 'bs-forms-basics',
      title: 'Form controls',
      blocks: [
        { type: 'text', value: 'Bootstrap styles inputs, selects and textareas with form-control. Labels use form-label. Group related fields with mb-3 for spacing.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<form>
  <div class="mb-3">
    <label class="form-label" for="title">Title</label>
    <input class="form-control" id="title" name="title" required>
  </div>
  <div class="mb-3">
    <label class="form-label" for="price">Price</label>
    <input class="form-control" id="price" name="price" type="number" min="0">
  </div>
  <button class="btn btn-primary">Save</button>
</form>` },
        { type: 'note', value: 'Always connect the label to the input with for and id. A placeholder is not a label.' },
      ],
    },
    {
      id: 'bs-validation',
      title: 'Validation',
      blocks: [
        { type: 'text', value: 'Use is-valid and is-invalid for visual states, plus invalid-feedback for the message. Client validation is for UX; the server still validates.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<input class="form-control is-invalid" name="email">
<div class="invalid-feedback">
  Enter a valid email address.
</div>` },
        { type: 'list', items: [
          'is-invalid plus invalid-feedback',
          'Validate on the server too',
          'Show errors after blur, not on every keystroke',
          'Keep the old value in the field',
        ] },
      ],
    },
    {
      id: 'bs-form-layout',
      title: 'Form layout',
      blocks: [
        { type: 'text', value: 'Use the grid for multi-column forms. On mobile, stack the fields; on desktop, place related fields side by side.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<div class="row g-3">
  <div class="col-12 col-md-6">
    <label class="form-label">First name</label>
    <input class="form-control">
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label">Last name</label>
    <input class="form-control">
  </div>
  <div class="col-12">
    <label class="form-label">Email</label>
    <input type="email" class="form-control">
  </div>
</div>` },
        { type: 'note', value: 'Short forms are easier to complete. If a field is optional, say so instead of leaving the user guessing.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'forms',
      q: 'Which class styles an input?',
      options: ['form-input', 'form-control', 'input-group', 'form-field'],
      answer: 1,
      explain: 'form-control styles inputs.',
    },
    {
      chapterId: 'forms',
      q: 'Why connect label and input?',
      options: ['For style', 'For accessibility and click-to-focus', 'To validate', 'To add a border'],
      answer: 1,
      explain: 'The for/id link helps screen readers.',
    },
    {
      chapterId: 'forms',
      q: 'Which class shows an error message?',
      options: ['invalid-feedback', 'error-text', 'text-danger only', 'alert-error'],
      answer: 0,
      explain: 'invalid-feedback pairs with is-invalid.',
    },
    {
      chapterId: 'forms',
      q: 'Where must validation run?',
      options: ['Only in the browser', 'On the server', 'In CSS', 'In the database only'],
      answer: 1,
      explain: 'The server is the trust boundary.',
    },
  ],
};
