// jQuery chapter: Effects & Animation.

export default {
  id: 'effects',
  title: 'Effects',
  description: 'Show, hide, fade and slide without abusing animation',
  icon: 'animation',
  lessons: [
    {
      id: 'jq-show-hide',
      title: 'Show, hide and toggle',
      blocks: [
        { type: 'text', value: 'jQuery can animate visibility and size. Use it for small, purposeful transitions such as a menu or a panel. Avoid animating layout on every interaction.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('#menu').slideToggle(200);
$('#panel').fadeIn(150);
$('#notice').fadeOut(150, function () {
  $(this).remove();
});` },
        { type: 'note', value: 'CSS transitions are usually smoother and cheaper than jQuery animation. Use jQuery effects mainly in legacy code.' },
      ],
    },
    {
      id: 'jq-animate',
      title: 'animate()',
      blocks: [
        { type: 'text', value: 'animate() changes numeric CSS properties over time. It is limited to properties with numeric values, so transforms are better handled with CSS.' },
        { type: 'code', lang: 'js', tryIt: false, value: `$('#box').animate({ opacity: 0.5, marginLeft: '40px' }, 300);` },
        { type: 'list', items: [
          'Prefer CSS transitions for transforms and opacity',
          'Use a short duration, 150 to 300 ms',
          'Respect prefers-reduced-motion',
          'Stop animations before starting a new one',
        ] },
      ],
    },
    {
      id: 'jq-effects-qa',
      title: 'Accessibility and performance',
      blocks: [
        { type: 'text', value: 'Motion can cause discomfort. Respect the user setting and keep animations subtle. Avoid animating width and height on large lists.' },
        { type: 'code', lang: 'css', tryIt: false, value: `@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}` },
        { type: 'note', value: 'A 300ms fade is fine. A bouncing page is not. Animation should explain a change, not decorate it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'effects',
      q: 'What does slideToggle do?',
      options: ['Slides the page', 'Toggles visibility with a slide', 'Sorts items', 'Submits a form'],
      answer: 1,
      explain: 'It shows or hides with a slide.',
    },
    {
      chapterId: 'effects',
      q: 'What can animate() change?',
      options: ['Any CSS', 'Numeric CSS properties', 'HTML structure', 'Database rows'],
      answer: 1,
      explain: 'It animates numeric values.',
    },
    {
      chapterId: 'effects',
      q: 'Why respect reduced motion?',
      options: ['For speed', 'Motion can cause discomfort', 'It is required', 'To save CPU'],
      answer: 1,
      explain: 'Accessibility matters.',
    },
    {
      chapterId: 'effects',
      q: 'What is usually smoother?',
      options: ['jQuery animation', 'CSS transitions for transforms and opacity', 'A page reload', 'setTimeout'],
      answer: 1,
      explain: 'CSS transitions are GPU-friendly.',
    },
  ],
};
