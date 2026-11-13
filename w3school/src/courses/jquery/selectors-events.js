// jQuery chapter: Selectors & Events.

export default {
  id: 'selectors-events',
  title: 'Selectors & Events',
  description: 'CSS selectors, delegation and event data',
  icon: 'ads-click',
  lessons: [
    {
      id: 'jq-selectors',
      title: 'Selectors',
      blocks: [
        { type: 'text', value: 'jQuery uses CSS selectors plus a few extensions such as :first and :visible. Prefer standard CSS selectors for speed and clarity.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('#main');                 // id
$('.card');                 // class
$('ul li');                 // descendant
$('input[type="email"]');   // attribute
$('.card').first();         // method instead of :first` },
        { type: 'note', value: 'Custom selectors such as :visible are slower than native ones. Use a class when you control the markup.' },
      ],
    },
    {
      id: 'jq-events',
      title: 'Events',
      blocks: [
        { type: 'text', value: 'Bind events with .on(). Use delegated events for elements added later. Always unbind or use .off() when a component is removed.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('#save').on('click', function (event) {
  event.preventDefault();
  save();
});

// Delegation: works for future items
$('#list').on('click', '.delete', function () {
  $(this).closest('li').remove();
});` },
        { type: 'note', value: 'Direct binding on a list item that does not exist yet does nothing. Delegate from a stable parent.' },
      ],
    },
    {
      id: 'jq-forms-events',
      title: 'Forms and input',
      blocks: [
        { type: 'text', value: 'Read values with .val(), set them with .val(value), and listen for input or change. Trim and validate before sending.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('#title').on('input', function () {
  const value = $(this).val().trim();
  $('#preview').text(value || 'Untitled');
});

$('#course-form').on('submit', function (event) {
  event.preventDefault();
  const title = $('#title').val().trim();
  if (!title) return;
  $.post('/api/courses', { title });
});` },
        { type: 'list', items: [
          'Always preventDefault on handled forms',
          'Trim input before validation',
          'Use change for selects and checkboxes',
          'Debounce input for search',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'selectors-events',
      q: 'Which selector picks an id?',
      options: ['.main', '#main', 'main', '*main'],
      answer: 1,
      explain: '# selects an id.',
    },
    {
      chapterId: 'selectors-events',
      q: 'Why use delegated events?',
      options: ['They are shorter', 'They work for elements added later', 'They are faster', 'They are required'],
      answer: 1,
      explain: 'Delegation handles dynamic elements.',
    },
    {
      chapterId: 'selectors-events',
      q: 'What does .val() do?',
      options: ['Reads or sets a form value', 'Validates', 'Submits', 'Styles'],
      answer: 0,
      explain: 'It gets or sets input values.',
    },
    {
      chapterId: 'selectors-events',
      q: 'What should a submit handler do first?',
      options: ['Reload', 'preventDefault', 'Clear the DOM', 'Style the button'],
      answer: 1,
      explain: 'It stops the default navigation.',
    },
  ],
};
