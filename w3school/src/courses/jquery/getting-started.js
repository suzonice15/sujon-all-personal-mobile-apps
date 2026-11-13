// jQuery chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What jQuery is, setup and the $ function',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'jq-what-is',
      title: 'What is jQuery?',
      blocks: [
        { type: 'text', value: 'jQuery is a small JavaScript library that simplifies selecting elements, handling events, changing the DOM and making AJAX requests. It was essential before modern browser APIs; today it is mostly found in older sites and CMS themes.' },
        { type: 'list', items: [
          'Select elements with CSS selectors',
          'Chain DOM and event operations',
          'Normalized AJAX helpers',
          'Huge plugin ecosystem',
          'Still used in WordPress and legacy apps',
        ] },
        { type: 'note', value: 'For new projects, native querySelector, classList and fetch cover most of what jQuery did. Learn jQuery to maintain existing code, not always to start new code.' },
      ],
    },
    {
      id: 'jq-setup',
      title: 'Setup',
      blocks: [
        { type: 'text', value: 'Add jQuery from a CDN or install with npm. Put scripts before the closing body tag, or wrap the code in a ready callback so the DOM exists.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
  $(function () {
    console.log('DOM is ready');
  });
</script>` },
        { type: 'note', value: 'A ready callback is the old equivalent of DOMContentLoaded. Running before the DOM exists returns empty selections.' },
      ],
    },
    {
      id: 'jq-basics',
      title: 'The $ function',
      blocks: [
        { type: 'text', value: 'The $ function selects elements and returns a jQuery object. Most methods return the same object, so calls chain. Use .length to check how many matched.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('.card')
  .addClass('is-active')
  .find('.title')
  .text('Updated');

console.log($('.card').length);` },
        { type: 'note', value: 'A selector that matches nothing does nothing. Check .length when a change silently fails.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does jQuery simplify?',
      options: ['CSS layout', 'DOM, events and AJAX', 'Databases', 'Compilation'],
      answer: 1,
      explain: 'It wraps DOM, events and AJAX.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a ready callback for?',
      options: ['Loading CSS', 'Running code after the DOM is ready', 'Creating a database', 'Routing'],
      answer: 1,
      explain: 'It waits for the DOM.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why does chaining work?',
      options: ['Methods return the jQuery object', 'It uses async', 'It is magic', 'It creates new elements'],
      answer: 0,
      explain: 'Most methods return this.',
    },
    {
      chapterId: 'getting-started',
      q: 'When is jQuery still reasonable?',
      options: ['Every new project', 'Maintaining legacy sites and CMS themes', 'For databases', 'For CSS grids'],
      answer: 1,
      explain: 'It remains common in legacy code.',
    },
  ],
};
