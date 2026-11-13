// jQuery chapter: Plugins & Modern jQuery.

export default {
  id: 'plugins-modern',
  title: 'Plugins & Modern Use',
  description: 'Plugin pattern, security and migration',
  icon: 'extension',
  lessons: [
    {
      id: 'jq-plugins',
      title: 'The plugin pattern',
      blocks: [
        { type: 'text', value: 'A jQuery plugin adds a method to $.fn. Keep it small, support options and return this for chaining. Do not add global state.' },
        { type: 'code', lang: 'js', tryIt: false, value: `(function ($) {
  $.fn.highlight = function (color) {
    return this.each(function () {
      $(this).css('background', color || '#fef3c7');
    });
  };
}(jQuery));

$('.note').highlight('#fde68a');` },
        { type: 'note', value: 'Check a plugin is maintained before adding it. An abandoned plugin is a security and upgrade risk.' },
      ],
    },
    {
      id: 'jq-security',
      title: 'Security',
      blocks: [
        { type: 'list', items: [
          'Never pass user input to html()',
          'Build elements and use text()',
          'Escape server-rendered values',
          'Keep jQuery updated; old versions have known XSS issues',
          'Do not eval or inject scripts from AJAX responses',
        ] },
        { type: 'code', lang: 'js', tryIt: false, value: `// Unsafe
$('#out').html(userInput);

// Safe
$('#out').text(userInput);` },
        { type: 'note', value: 'jQuery 1.x and 2.x are unsupported. Upgrade to 3.7 or later, or migrate off jQuery.' },
      ],
    },
    {
      id: 'jq-migration',
      title: 'Migrating off jQuery',
      blocks: [
        { type: 'text', value: 'Modern native APIs replace most jQuery calls. Migrate one component at a time and keep tests around the behaviour.' },
        { type: 'code', lang: 'text', tryIt: false, value: `$('#x')            -> document.querySelector('#x')
$('.x').addClass()  -> el.classList.add()
$.get(url)          -> fetch(url).then(r => r.json())
$(el).on('click')   -> el.addEventListener('click', fn)
$(el).text(v)       -> el.textContent = v` },
        { type: 'note', value: 'Do not rewrite a working legacy app for its own sake. Migrate the parts you actively change.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'plugins-modern',
      q: 'What does $.fn do?',
      options: ['Adds a method to the jQuery prototype', 'Creates a database', 'Routes URLs', 'Adds CSS'],
      answer: 0,
      explain: 'Plugins extend $.fn.',
    },
    {
      chapterId: 'plugins-modern',
      q: 'Which is safe for user input?',
      options: ['html()', 'text()', 'append with HTML', 'eval()'],
      answer: 1,
      explain: 'text() does not parse markup.',
    },
    {
      chapterId: 'plugins-modern',
      q: 'What replaces $.get?',
      options: ['fetch', 'document.write', 'setTimeout', 'alert'],
      answer: 0,
      explain: 'fetch is the native equivalent.',
    },
    {
      chapterId: 'plugins-modern',
      q: 'Which jQuery versions are unsupported?',
      options: ['3.7', '1.x and 2.x', '4.x', 'All'],
      answer: 1,
      explain: '1.x and 2.x are EOL.',
    },
  ],
};
