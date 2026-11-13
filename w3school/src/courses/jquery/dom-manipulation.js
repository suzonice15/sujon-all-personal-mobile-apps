// jQuery chapter: DOM Manipulation.

export default {
  id: 'dom-manipulation',
  title: 'DOM Manipulation',
  description: 'Classes, attributes, text and elements',
  icon: 'code',
  lessons: [
    {
      id: 'jq-classes-attrs',
      title: 'Classes and attributes',
      blocks: [
        { type: 'text', value: 'Use addClass, removeClass and toggleClass for styling. Use attr for attributes, prop for properties such as checked, and data for data attributes.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('#panel').toggleClass('open');
$('#link').attr('href', '/courses');
$('#agree').prop('checked', true);
const id = $('#card').data('id');` },
        { type: 'note', value: 'Use prop for checked, disabled and selected. attr does not reliably reflect the live state.' },
      ],
    },
    {
      id: 'jq-text-html',
      title: 'Text and HTML',
      blocks: [
        { type: 'text', value: 'text() reads or sets plain text safely. html() sets markup and can introduce XSS if the value is user input. Prefer text() for user data.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('#title').text(userTitle);      // safe
$('#box').html('<strong>Hello</strong>');

// Build elements instead of concatenating HTML
const $li = $('<li>').text(userTitle);
$('#list').append($li);` },
        { type: 'note', value: 'Never pass unescaped user input to html(). Build elements with text() instead.' },
      ],
    },
    {
      id: 'jq-create-remove',
      title: 'Creating and removing',
      blocks: [
        { type: 'text', value: 'Create elements with $("<tag>"), append or prepend them, and remove with .remove(). Remove also detaches event handlers, which prevents leaks.' },
        { type: 'code', lang: 'js', tryIt: false, value: `function addCourse(title) {
  const $item = $('<li class="course">').text(title);
  $item.append($('<button class="delete">').text('Delete'));
  $('#courses').append($item);
}

$('#courses').on('click', '.delete', function () {
  $(this).closest('li').remove();
});` },
        { type: 'list', items: [
          'Build elements, do not concatenate HTML',
          'Use remove to clean up handlers',
          'Delegate delete clicks',
          'Keep DOM updates small',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dom-manipulation',
      q: 'Which method toggles a class?',
      options: ['addClass', 'toggleClass', 'attr', 'html'],
      answer: 1,
      explain: 'toggleClass adds or removes it.',
    },
    {
      chapterId: 'dom-manipulation',
      q: 'How do you read a checked state?',
      options: ['attr("checked")', 'prop("checked")', 'data("checked")', 'val()'],
      answer: 1,
      explain: 'prop reflects the live state.',
    },
    {
      chapterId: 'dom-manipulation',
      q: 'Which is safe for user text?',
      options: ['html()', 'text()', 'append with HTML', 'attr("onclick")'],
      answer: 1,
      explain: 'text() does not parse markup.',
    },
    {
      chapterId: 'dom-manipulation',
      q: 'Why use remove()?',
      options: ['It is shorter', 'It removes elements and their handlers', 'It hides them', 'It caches them'],
      answer: 1,
      explain: 'It cleans up event handlers.',
    },
  ],
};
