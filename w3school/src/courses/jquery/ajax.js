// jQuery chapter: AJAX.

export default {
  id: 'ajax',
  title: 'AJAX',
  description: 'GET, POST, promises and error handling',
  icon: 'cloud-download',
  lessons: [
    {
      id: 'jq-ajax-get',
      title: 'GET and POST',
      blocks: [
        { type: 'text', value: 'The $.ajax helper sends requests. $.get and $.post are shortcuts. In modern jQuery, these return a promise-like jqXHR with .done, .fail and .always.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$.get('/api/courses')
  .done(function (courses) {
    render(courses);
  })
  .fail(function (xhr) {
    console.error('failed', xhr.status);
  });

$.post('/api/courses', { title: 'SQL', price: 5000 })
  .done(function (course) {
    console.log('created', course.id);
  });` },
        { type: 'note', value: 'Check the status code in .fail. A 400 is a user error and needs a different message from a 500.' },
      ],
    },
    {
      id: 'jq-ajax-json',
      title: 'JSON and headers',
      blocks: [
        { type: 'text', value: 'Send JSON with contentType and JSON.stringify, or let $.post send form data. For an API, use a token header and handle 401 by redirecting to login.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$.ajax({
  url: '/api/courses',
  method: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({ title: 'SQL', price: 5000 }),
  headers: { Authorization: 'Bearer ' + token },
})
  .done(renderCourse)
  .fail(function (xhr) {
    if (xhr.status === 401) location.href = '/login';
  });` },
        { type: 'list', items: [
          'Set the correct content type',
          'Send the auth header',
          'Handle 401 and 403 differently',
          'Never log tokens',
        ] },
      ],
    },
    {
      id: 'jq-ajax-patterns',
      title: 'Patterns',
      blocks: [
        { type: 'list', items: [
          'Disable the button while the request runs',
          'Show a loading state',
          'Prevent double submits',
          'Parse the response, do not trust it',
          'Use a timeout for slow networks',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `const $btn = $('#save').prop('disabled', true);
$.post('/api/courses', data)
  .done(function () { toast('Saved'); })
  .fail(function () { toast('Failed. Try again.'); })
  .always(function () { $btn.prop('disabled', false); });` },
        { type: 'note', value: 'A button that is not disabled during a request produces duplicate records from impatient clicks.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'ajax',
      q: 'What do $.get and $.post return?',
      options: ['A string', 'A promise-like jqXHR', 'A DOM node', 'A number'],
      answer: 1,
      explain: 'They return jqXHR with done/fail.',
    },
    {
      chapterId: 'ajax',
      q: 'How do you send JSON?',
      options: ['No header needed', 'contentType application/json with stringify', 'Always form data', 'With html()'],
      answer: 1,
      explain: 'Set the content type and stringify.',
    },
    {
      chapterId: 'ajax',
      q: 'Why disable the submit button?',
      options: ['For style', 'To prevent duplicate requests', 'To load faster', 'To add a token'],
      answer: 1,
      explain: 'It stops double submits.',
    },
    {
      chapterId: 'ajax',
      q: 'What should a 401 trigger?',
      options: ['A retry forever', 'A redirect to login', 'A page reload loop', 'Nothing'],
      answer: 1,
      explain: '401 means the session is missing.',
    },
  ],
};
